'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

// 컴포넌트 전역에 QueryClientProvider를 제공하는 컴포넌트
// children : layout.tsx에서 감싸는 컴포넌트의 자식 요소들
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // useState로 생성해야 컴포넌트마다 독립적인 QueryClient를 가짐
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1분간 캐시 유지
            retry: 1, // 실패 시 1번만 재시도
          },
        },
      }),
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
