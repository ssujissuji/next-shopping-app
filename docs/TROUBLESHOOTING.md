# TROUBLESHOOTING.md

이 프로젝트를 진행하면서 마주친 비직관적인 오류와 해결 과정을 기록한다.
공식 문서만 봐서는 알기 어려운 함정 위주로 정리한다.

---

## 목차

- [Prisma 7 + adapter-pg 환경에서 seed 실행 시 @updatedAt null 오류](#prisma-7--adapter-pg-환경에서-seed-실행-시-updatedat-null-오류)

---

## Prisma 7 + adapter-pg 환경에서 seed 실행 시 @updatedAt null 오류

**날짜**: 2026-05-29
**에러 코드**: `P2011 Null constraint violation on the (not available)`

### 증상

`npx prisma db seed` 실행 시 아래 오류가 발생하며 상품 데이터 삽입 실패.

```
PrismaClientKnownRequestError:
Invalid `prisma.product.createMany()` invocation

Null constraint violation on the (not available)
  code: 'P2011'
```

공통코드(`systemCode`) 삽입은 성공하지만 상품(`product`) 삽입에서만 실패.

### 원인

`Product` 모델에 `updatedAt DateTime @updatedAt` 필드가 있는데,
Prisma 7 + `@prisma/adapter-pg`(드라이버 어댑터) 조합에서 `createMany` / `create` 호출 시
`@updatedAt` 필드를 자동으로 채우지 못하는 버그가 있다.

- `@updatedAt`은 DB 기본값이 아니라 **Prisma ORM 레이어**가 INSERT/UPDATE 시 값을 직접 주입하는 방식으로 동작한다.
- 드라이버 어댑터 모드에서는 이 주입 로직이 누락되어 `updatedAt`에 `NULL`이 전달되고, `NOT NULL` 제약에 걸린다.

### 시도했던 방법 (실패)

| 시도 | 결과 | 이유 |
|---|---|---|
| `createMany` → `create` 반복 | ❌ | 동일한 어댑터 레벨 버그 |
| 각 데이터에 `updatedAt: new Date()` 직접 전달 | ❌ | Prisma 7에서 `@updatedAt` 필드는 수동 설정 불가 (`Unknown argument 'updatedAt'`) |
| 어댑터 제거 후 `new PrismaClient()` | ❌ | Prisma 7은 드라이버 어댑터가 필수, 어댑터 없이 초기화 불가 |

### 해결

`$executeRaw`로 원시 SQL을 직접 보내면 Prisma ORM 레이어를 우회하므로,
DB 컬럼의 `DEFAULT NOW()`가 그대로 동작하여 `updatedAt`이 정상 삽입된다.

```ts
// prisma/seed.ts
import { randomUUID } from 'crypto';

for (const p of products) {
  await prisma.$executeRaw`
    INSERT INTO products (id, name, description, price, stock, category, "imageUrl", "createdAt", "updatedAt", "isHidden")
    VALUES (${randomUUID()}, ${p.name}, ${p.description}, ${p.price}, ${p.stock}, ${p.category}, ${p.imageUrl}, NOW(), NOW(), false)
    ON CONFLICT (id) DO NOTHING
  `;
}
```

### 핵심 정리

```
@updatedAt = Prisma가 직접 값을 주입
           ≠ DB DEFAULT

드라이버 어댑터 모드에서 주입 누락
→ DB에 NOT NULL인데 값이 없음 → P2011

$executeRaw 사용 → Prisma 개입 없이 SQL 전달
→ DB의 NOW() 기본값이 정상 작동
```

### 영향 범위

- seed 스크립트에만 해당되는 문제
- 앱 런타임의 `product.create()` 등은 정상 동작 (드라이버 어댑터 + Next.js 환경에서는 재현 안 됨)
- `@updatedAt` 필드가 있는 다른 모델(예: `Order`)의 seed 삽입 시에도 동일하게 `$executeRaw` 사용 필요

---
