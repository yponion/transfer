import { formatDuration, getDifTime } from "@/lib/date";
import type { Ticket } from "@/type";

interface Props {
  currentTicket: Ticket | null;
  nextTicket: Ticket | null;
}

export default function Gap({ currentTicket, nextTicket }: Props) {
  return (
    <div className="w-full max-w-[500px] h-[88px] flex">
      {currentTicket &&
      nextTicket &&
      getDifTime(currentTicket.arrplandtime, nextTicket.depplandtime) > 0 ? (
        <div className="flex items-center justify-end flex-1 border-r-2 border-gray-500 border-dotted relative h-[130] top-[-21px] z-10">
          {/* 환승 대기 시간 */}
          <small className="pr-3 font-xs text-gray-500">
            {formatDuration(
              getDifTime(currentTicket.arrplandtime, nextTicket.depplandtime)
            )}
          </small>
        </div>
      ) : null}
      <div className="flex-1"></div>
    </div>
  );
}
