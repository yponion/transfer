import { useQuery } from "@tanstack/react-query";
import { getTicket } from "@/app/api/train";
import type { Ticket } from "@/type";

export const useTicket = (startId: string, endId: string, date: string) => {
  return useQuery<Ticket[]>({
    queryKey: ["ticket", startId, endId, date],
    queryFn: () => getTicket(startId, endId, date),
    enabled: !!startId && !!endId && !!date, // 값 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분 캐싱 유지
  });
};