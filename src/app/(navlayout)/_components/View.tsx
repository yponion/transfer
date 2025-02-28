import type { Ticket } from "@/type";
import { getDifTime, getTime } from "@/lib/date";

interface Props {
  ticket: Ticket | null;
}

export default function View({ ticket }: Props) {
  return (
    <div className="w-full max-w-[500px] h-[250px] overflow-hidden">
      {ticket ? (
        <div>
          <div>출발 시간: {getTime(ticket.depplandtime)}</div>
          <div>출발 역: {ticket.depplacename}</div>
          <div>도착 시간: {getTime(ticket.arrplandtime)}</div>
          <div>도착 역: {ticket.arrplacename}</div>
          <div>
            소요 시간: {getDifTime(ticket.depplandtime, ticket.arrplandtime)}
          </div>
          <div>요금: {ticket.adultcharge}</div>
          <div>기차: {ticket.traingradename}</div>
        </div>
      ) : (
        "데이터 없음"
      )}
    </div>
  );
}
