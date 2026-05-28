import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  imageUrl: string | null;
}

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  // 디자인 실습용 가상 데이터 — 실제 서비스라면 DB에서.
  const discountRate = (product.name.length % 30) + 10;
  const originalPrice = Math.floor(product.price / (1 - discountRate / 100));
  const isSoldOut = product.stock === 0;
  const isNew = product.name.length % 3 === 0;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="flex flex-col gap-3.5">
        {/* 이미지 */}
        <div className="relative aspect-[4/5] bg-bone-2 overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              이미지 없음
            </div>
          )}

          {/* 좌상단 뱃지 */}
          {isSoldOut ? (
            <span className="absolute top-3.5 left-3.5 bg-bone text-muted-foreground font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-1">
              Sold out
            </span>
          ) : isNew ? (
            <span className="absolute top-3.5 left-3.5 bg-ink text-bone font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-1">
              New
            </span>
          ) : null}

          {/* 위시리스트 */}
          <button
            type="button"
            aria-label="Add to wishlist"
            className="absolute top-3.5 right-3.5 w-8 h-8 bg-bone flex items-center justify-center"
            onClick={(e) => e.preventDefault()}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-ink"
            >
              <path d="M12 21s-7-4.5-9-9c-1.5-3.5.5-7 4-7 2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 5.5 3.5 4 7-2 4.5-9 9-9 9z" />
            </svg>
          </button>

          {/* hover quick-add */}
          <div className="absolute inset-x-0 bottom-0 bg-bone text-ink py-3 text-center text-[11px] tracking-[0.18em] uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            + Quick add
          </div>
        </div>

        {/* 카테고리 */}
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
          {product.category ?? "Collection"}
        </div>

        {/* 상품명 */}
        <h3 className="font-display text-lg md:text-xl font-normal text-ink leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* 가격 */}
        <div className="flex items-baseline gap-2.5 text-[13px] text-ink">
          <span>{product.price.toLocaleString("ko-KR")}원</span>
          {!isSoldOut && (
            <span className="line-through text-muted-2 text-xs">
              {originalPrice.toLocaleString("ko-KR")}원
            </span>
          )}
          {!isSoldOut && (
            <span className="ml-auto font-mono text-[11px] text-rust">
              −{discountRate}%
            </span>
          )}
        </div>

        {/* 무료배송 (작게, 텍스트만) */}
        {product.price >= 30000 && !isSoldOut && (
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
            Free shipping · 내일 도착
          </div>
        )}
      </div>
    </Link>
  );
}
