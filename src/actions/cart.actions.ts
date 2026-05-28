"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { CartItem } from "@/types/cart";

export async function syncCartToDbAction(userId: string, items: CartItem[]) {
  const session = await auth();
  if (!session?.user?.id || session.user.id !== userId) return { error: "권한이 없습니다" };

  try {
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    // 트랜잭션(Transaction): 안전하게 지우고 새로 쓰기를 한 번에 처리
    await prisma.$transaction([
      // 1) 기존에 DB에 있던 이 사용자의 장바구니 아이템을 모두 삭제
      prisma.cartItem.deleteMany({ where: { cartId: cart.id } }),
      // 2) 브라우저에서 넘어온 최신 장바구니 배열을 DB에 통째로 삽입(Bulk Insert)
      prisma.cartItem.createMany({
        data: items.map((item) => ({
          cartId: cart.id,
          productId: item.id,
          quantity: item.quantity,
        })),
      }),
    ]);

    return { success: true };
  } catch (e) {
    console.error("[syncCartToDbAction]", e);
    return { error: "장바구니 저장에 실패했습니다" };
  }
}

export async function getCartFromDbAction(userId: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.id !== userId) return [];

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: { product: true },
        },
      },
    });

    if (!cart) return [];

    // 프론트엔드의 Zustand(CartItem) 타입에 딱 맞게 변환하여 리턴
    // Map으로 productId 기준 중복 제거 (DB unique 제약 추가 전 생성된 데이터 방어)
    const itemMap = new Map<string, { id: string; name: string; price: number; imageUrl: string | null; quantity: number }>();
    for (const item of cart.cartItems) {
      itemMap.set(item.productId, {
        id: item.productId,
        name: item.product.name,
        price: item.product.price,
        imageUrl: item.product.imageUrl,
        quantity: item.quantity,
      });
    }
    return Array.from(itemMap.values());
  } catch (e) {
    console.error("[getCartFromDbAction]", e);
    return [];
  }
}
