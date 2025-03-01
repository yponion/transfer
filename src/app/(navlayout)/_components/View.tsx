import type { Ticket } from "@/type";
import { getDifTime, getTime } from "@/lib/date";

interface Props {
  ticket: Ticket | null;
}

const trainColor = {
  무궁화호: "",
};

export default function View({ ticket }: Props) {
  return (
    <div className="w-full max-w-[500px] h-64 overflow-hidden">
      {ticket ? (
        <div className="flex h-full">
          <div
            className="flex flex-col items-end pr-3 flex-1 relative bg-red-500
            before:content:[''] before:absolute before:bg-current before:w-0.5 before:h-[calc(100%-58px)] before:top-[29px] before:right-[-1px] before:z-10"
          >
            <time className="h-20">{getTime(ticket.depplandtime)}</time>
            <div className="h-20">
              {getDifTime(ticket.depplandtime, ticket.arrplandtime)}분
            </div>
            <time className="h-20">{getTime(ticket.arrplandtime)}</time>
          </div>
          <div
            className="flex flex-col items-start pl-3 flex-1 relative bg-blue-500
            before:content:[''] before:absolute before:size-[10px] before:border-2 before:border-current before:bg-transparent before:top-[20px] before:left-[-5px] before:rounded-full
            after:content:[''] after:absolute after:size-[10px] after:border-2 after:border-current after:bg-transparent after:bottom-[20px] after:left-[-5px] after:rounded-full"
          >
            <div className="h-20">{ticket.depplacename}역 승차</div>
            <div className="h-20">
              <div>{ticket.traingradename}</div>
              <div>{ticket.adultcharge}원</div>
            </div>
            <div className="h-20">{ticket.arrplacename}역 하차</div>
          </div>
        </div>
      ) : (
        "데이터 없음"
      )}
    </div>
  );
}
