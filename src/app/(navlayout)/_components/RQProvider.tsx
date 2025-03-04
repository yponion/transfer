"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type props = {
  children: React.ReactNode;
};

function RQProvider({ children }: props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false, // 다른 탭에 갔다가 돌아오면 refetch
          refetchOnMount: true, // 컴포넌트가 마운트되었을 때(또는 다시 마운트되었을 때) refetch
          refetchOnReconnect: false, // 네트워크 연결이 복구되면 refetch
          retry: false, // 실패시 재시도
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MOD === "local"}
      />
    </QueryClientProvider>
  );
}

export default RQProvider;
