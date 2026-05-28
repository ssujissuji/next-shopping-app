"use client";

import { useCartStore } from "@/store/cartStore";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
}

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    // 디자인 컨셉상 alert 대신 토스트로 바꿀 수 있지만, 기존 동작 유지
    alert(`"${product.name}"을(를) 장바구니에 담았습니다.`);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleAddToCart}
        className="flex-1 py-5 px-7 bg-ink text-bone text-[12px] tracking-[0.22em] uppercase border border-ink hover:bg-ink-soft transition-colors"
      >
        Add to bag — {product.price.toLocaleString("ko-KR")}원
      </button>
      <button
        type="button"
        aria-label="Wishlist"
        className="w-[58px] border border-ink bg-bone flex items-center justify-center hover:bg-bone-2 transition-colors"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          className="text-ink"
        >
          <path d="M12 21s-7-4.5-9-9c-1.5-3.5.5-7 4-7 2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 5.5 3.5 4 7-2 4.5-9 9-9 9z" />
        </svg>
      </button>
    </div>
  );
}
