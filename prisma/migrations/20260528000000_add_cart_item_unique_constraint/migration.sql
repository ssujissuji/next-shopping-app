-- 기존 중복 행 제거: (cartId, productId)가 같은 행 중 id가 가장 작은 것만 남기고 나머지 삭제
DELETE FROM cart_items
WHERE id NOT IN (
  SELECT MIN(id)
  FROM cart_items
  GROUP BY "cartId", "productId"
);

-- (cartId, productId) 조합에 unique 제약 추가
CREATE UNIQUE INDEX "cart_items_cartId_productId_key" ON "cart_items"("cartId", "productId");
