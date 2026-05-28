"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export function CartSummary() {
  const totalPrice = useCartStore((state) => state.totalPrice());
  const items = useCartStore((state) => state.items);
  const [promo, setPromo] = useState("");

  if (items.length === 0) return null;

  const memberDiscount = Math.floor(totalPrice * 0.05);
  const subtotal = totalPrice;
  const shipping = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal - memberDiscount + shipping;

  return (
    <aside className="bg-bone-2 p-9 self-start sticky top-32">
      <h2 className="font-display text-2xl font-normal m-0 mb-6 pb-4 border-b border-line">
        Order summary
      </h2>

      <SumRow label="Subtotal" value={`${subtotal.toLocaleString("ko-KR")}원`} />
      <SumRow
        label="Member discount"
        value={`−${memberDiscount.toLocaleString("ko-KR")}원`}
        accent="olive"
      />
      <SumRow
        label="Shipping"
        value={shipping === 0 ? "Free" : `${shipping.toLocaleString("ko-KR")}원`}
      />
      <SumRow label="Tax" value="Included" muted />

      {/* 무료배송까지 남은 금액 */}
      {subtotal < 50000 && (
        <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground mt-3">
          {(50000 - subtotal).toLocaleString("ko-KR")}원 more for free shipping
        </p>
      )}

      {/* promo code */}
      <div className="flex mt-5 border border-line bg-bone">
        <input
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="Promo or gift card"
          className="flex-1 border-0 bg-transparent px-4 py-3.5 text-[13px] outline-none placeholder:text-muted-foreground"
        />
        <button className="px-5 text-[11px] tracking-[0.18em] uppercase text-ink">
          Apply
        </button>
      </div>

      {/* total */}
      <div className="flex justify-between items-baseline border-t border-line mt-3.5 pt-5">
        <span className="text-base text-ink">Total</span>
        <span className="font-display text-3xl text-ink">
          {total.toLocaleString("ko-KR")}원
        </span>
      </div>

      {/* checkout */}
      <Link
        href="/checkout"
        className="block w-full text-center mt-6 py-5 bg-ink text-bone text-[12px] tracking-[0.22em] uppercase hover:bg-ink-soft transition-colors"
      >
        Proceed to checkout →
      </Link>

      <p className="mt-4 font-mono text-[11px] text-muted-foreground text-center">
        Free returns within 30 days
      </p>

      <div className="mt-8 pt-6 border-t border-line flex justify-between font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
        <span>Secure checkout</span>
        <span>VISA · MC · TOSS</span>
      </div>
    </aside>
  );
}

function SumRow({
  label,
  value,
  accent,
  muted,
}: {
  label: string;
  value: string;
  accent?: "olive";
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between py-2.5 text-[13px] text-ink-soft">
      <span>{label}</span>
      <span
        className={
          accent === "olive"
            ? "text-olive"
            : muted
            ? "text-muted-foreground"
            : "text-ink-soft"
        }
      >
        {value}
      </span>
    </div>
  );
}
