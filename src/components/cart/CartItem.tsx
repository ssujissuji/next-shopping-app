"use client";

import Image from "next/image";
import { useCartStore, CartItem as CartItemType } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  // 디자인 실습용 가상 메타데이터 — 실제로는 cart store에 함께 저장하면 됩니다.
  const fakeColor = ["Oat", "Black", "Caramel", "Sage"][item.name.length % 4];
  const fakeSize = ["XS", "S", "M", "L"][item.name.length % 4];
  const fakeCategory = "Collection";
  const fakeOriginal = Math.floor(item.price * 1.25);

  return (
    <div className="grid grid-cols-[100px_1fr_auto] md:grid-cols-[120px_1fr_auto] gap-6 py-7 border-b border-line first:border-t first:border-line items-start">
      {/* 썸네일 */}
      <div className="relative aspect-[4/5] bg-bone-2 overflow-hidden">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="120px"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
            없음
          </div>
        )}
      </div>

      {/* 정보 */}
      <div className="flex flex-col gap-1.5 pt-1">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
          {fakeCategory}
        </span>
        <h3 className="font-display text-xl md:text-[22px] font-normal leading-tight">
          {item.name}
        </h3>
        <div className="flex gap-6 text-xs text-muted-foreground mt-1">
          <span>
            Color · <b className="text-ink font-medium">{fakeColor}</b>
          </span>
          <span>
            Size · <b className="text-ink font-medium">{fakeSize}</b>
          </span>
        </div>

        {/* 수량 + 액션 */}
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          <div className="inline-flex items-center border border-line">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 text-ink text-sm hover:bg-bone-2"
              aria-label="수량 감소"
            >
              −
            </button>
            <span className="w-9 text-center font-mono text-[13px]">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 text-ink text-sm hover:bg-bone-2"
              aria-label="수량 증가"
            >
              +
            </button>
          </div>

          <button className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground border-b border-line pb-0.5 hover:text-ink hover:border-ink">
            Save for later
          </button>
          <button
            onClick={() => removeItem(item.id)}
            className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground border-b border-line pb-0.5 hover:text-rust hover:border-rust"
          >
            Remove
          </button>
        </div>
      </div>

      {/* 가격 */}
      <div className="text-right pt-1">
        <div className="font-display text-[22px]">
          {(item.price * item.quantity).toLocaleString("ko-KR")}원
        </div>
        <div className="text-xs text-muted-2 line-through mt-1">
          {(fakeOriginal * item.quantity).toLocaleString("ko-KR")}원
        </div>
      </div>
    </div>
  );
}
