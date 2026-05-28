import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, '상품명을 입력해 주세요'),
  price: z.number().int('정수로 입력해 주세요').positive('가격은 0보다 커야 합니다'),
  stock: z.number().int('정수로 입력해 주세요').min(0, '재고는 0 이상이어야 합니다'),
  category: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url('올바른 URL 형식이 아닙니다').optional().or(z.literal('')),
});

export type ProductInput = z.infer<typeof productSchema>;
