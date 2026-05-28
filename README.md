# 🛍️ Next.js 풀스택 쇼핑몰

Next.js App Router 기반 풀스택 쇼핑몰 학습 프로젝트입니다.  
서버 상태와 클라이언트 UI 상태를 명확히 분리하고, 상품 탐색 → 장바구니 → 주문 결제 → 마이페이지까지 커머스 사이클 전체를 구현합니다.

---

## 기술 스택

| 기술 | 버전 | 역할 |
|------|------|------|
| Next.js (App Router) | 16.2.6 | 풀스택 프레임워크 (서버 컴포넌트, API Route, Server Actions) |
| React | 19.2.4 | UI 라이브러리 |
| TypeScript | - | 전체 타입 안전성 |
| Prisma | 7.8.0 | ORM — DB 스키마 모델링 및 쿼리 |
| PostgreSQL | ^8.21.0 | 관계형 데이터베이스 |
| NextAuth.js | ^5.0.0-beta.31 | 이메일/비밀번호 인증 및 세션 관리 |
| Zustand | ^5.0.13 | 장바구니 클라이언트 전역 상태 관리 |
| TanStack Query | ^5.100.11 | 서버 상태 데이터 페칭 및 캐싱 |
| TailwindCSS | ^4.0.0 | 유틸리티 클래스 스타일링 |
| Shadcn UI | ^4.7.0 | 컴포넌트 라이브러리 |
| React Hook Form | ^7.76.0 | 폼 상태 관리 |
| Zod | ^4.4.3 | 스키마 유효성 검증 |
| bcryptjs | ^3.0.3 | 비밀번호 암호화 |

---

## 주요 기능

- **회원 인증** — 회원가입 / 로그인 / 로그아웃 (NextAuth.js)
- **상품 목록** — 카테고리 필터링, 그리드 뷰
- **상품 상세** — 이미지, 가격, 재고 확인 및 장바구니 담기
- **장바구니** — 수량 조절, 합계 자동 계산 (Zustand + localStorage 영속화)
- **주문 결제** — 배송지 입력 → DB 트랜잭션으로 주문 저장
- **마이페이지** — 내 주문 내역 및 배송 상태 조회
- **관리자 백오피스** — 전체 주문 조회, 배송 상태 변경

---

## 폴더 구조

```
src/
├── app/
│   ├── (auth)/           # 로그인, 회원가입
│   ├── products/         # 상품 목록, 상세
│   ├── cart/             # 장바구니
│   ├── checkout/         # 주문 결제
│   ├── mypage/           # 마이페이지
│   ├── admin/            # 관리자 백오피스
│   └── api/              # API Route
├── components/           # 재사용 UI 컴포넌트
├── store/                # Zustand 스토어
├── actions/              # Server Actions
├── schemas/              # Zod 유효성 스키마
├── lib/                  # 설정 및 유틸리티
└── types/                # TypeScript 타입 정의
```

---

## 상태 관리 원칙

| 상태 종류 | 관리 위치 | 예시 |
|-----------|-----------|------|
| 서버 데이터 (읽기) | TanStack Query | 상품 목록, 주문 내역 |
| 클라이언트 전역 상태 | Zustand | 장바구니 |
| 폼 입력 상태 | React Hook Form | 배송지, 로그인 폼 |
| 컴포넌트 로컬 상태 | useState | 모달 열림/닫힘 |

---

## 시작하기

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local` 파일을 생성하고 아래 항목을 채웁니다.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. DB 마이그레이션 및 시드 데이터 삽입

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. 개발 서버 실행

```bash
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

---

## 유용한 명령어

```bash
npx prisma studio      # Prisma GUI — 브라우저에서 DB 데이터 확인
npx prisma migrate dev # 스키마 변경 후 마이그레이션 적용
```

---

## 문서

| 파일 | 설명 |
|------|------|
| `docs/PRD.md` | 제품 요구사항 정의서 |
| `docs/ARCHITECTURE.md` | 폴더 구조 및 아키텍처 가이드 |
| `docs/WORK.md` | 현재 진행 중인 작업 |
| `docs/HISTORY.md` | 완료된 작업 이력 |
