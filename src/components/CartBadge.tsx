'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import {
  syncCartToDbAction,
  getCartFromDbAction,
} from '@/actions/cart.actions';

export function CartBadge({ userId }: { userId?: string }) {
  const items = useCartStore((state) => state.items);
  const totalCount = useCartStore((state) => state.totalCount());
  const setCart = useCartStore((state) => state.setCart);

  // Hydration 에러 방지
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isInitialized = useRef(false);

  // 초기화: userId가 생길 때(로그인) 한 번만 실행 — DB 복원 또는 로컬→DB 동기화
  useEffect(() => {
    if (!userId) return;
    isInitialized.current = false;

    getCartFromDbAction(userId).then((dbItems) => {
      if (dbItems.length > 0 && items.length === 0) {
        setCart(dbItems);
      } else {
        syncCartToDbAction(userId, items);
      }
      isInitialized.current = true;
    });
    // items·setCart는 초기화 시점의 스냅샷만 사용하므로 의도적으로 제외
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // 동기화: 초기화 완료 후 items가 바뀔 때만 DB에 저장
  useEffect(() => {
    if (!userId || !isInitialized.current) return;
    syncCartToDbAction(userId, items);
  }, [userId, items]);

  return (
    <Link
      href="/cart"
      className="text-[12px] tracking-[0.14em] uppercase text-ink hover:text-ink-soft">
      Cart
      {mounted && (
        <sup className="ml-1 font-mono text-[9px] tracking-normal text-muted">
          {String(totalCount).padStart(2, '0')}
        </sup>
      )}
    </Link>
  );
}
