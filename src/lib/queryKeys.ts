export const queryKeys = {
  products: {
    all: ['products'] as const,
    detail: (id: string) => ['products', id] as const,
  },
  orders: {
    byUser: (userId: string) => ['orders', userId] as const,
    all: ['orders'] as const,
  },
  admin: {
    products: ['admin', 'products'] as const,
  },
};
