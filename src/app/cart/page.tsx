'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="text-center py-32">
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
          Shopping bag · 0 items
        </div>
        <h1 className="font-display text-6xl md:text-7xl leading-none tracking-tight font-normal mt-4">
          Your cart is{' '}
          <em className="italic text-ink-soft font-light">empty.</em>
        </h1>
        <p className="text-muted mt-6 max-w-md mx-auto">
          새 컬렉션을 구경하고 마음에 드는 아이템을 담아보세요.
        </p>
        <Link
          href="/"
          className="inline-block mt-10 bg-ink text-bone px-9 py-4 text-[12px] tracking-[0.22em] uppercase border border-ink hover:bg-ink-soft transition-colors">
          Continue shopping →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="pt-4 pb-2">
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
          Shopping cart · {items.length} {items.length === 1 ? 'item' : 'items'}
        </div>
        <h1 className="font-display text-6xl md:text-7xl leading-none tracking-tight font-normal mt-3.5">
          Your <em className="italic text-ink-soft font-light">cart.</em>
        </h1>

        {/* steps */}
        <ol className="flex gap-10 md:gap-14 border-t border-b border-line py-4 mt-9 text-[12px] tracking-[0.16em] uppercase text-muted overflow-x-auto">
          <li className="text-ink">
            <span className="font-mono mr-2">01</span>Bag
          </li>
          <li>
            <span className="font-mono mr-2">02</span>Address
          </li>
          <li>
            <span className="font-mono mr-2">03</span>Payment
          </li>
          <li>
            <span className="font-mono mr-2">04</span>Confirm
          </li>
        </ol>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-16 mt-10">
        {/* 아이템 리스트 */}
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          {/* gift note */}
          <div className="mt-8 px-7 py-6 border border-dashed border-line flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div>
              <div className="font-display text-xl">Add a gift note</div>
              <div className="text-muted text-[13px] mt-1">
                고급 종이에 핸드라이팅으로 동봉됩니다. 무료.
              </div>
            </div>
            <button className="text-[11px] tracking-[0.18em] uppercase text-ink border-b border-ink pb-0.5 w-fit">
              + Add note
            </button>
          </div>
        </div>

        {/* 요약 */}
        <CartSummary />
      </div>
    </div>
  );
}
