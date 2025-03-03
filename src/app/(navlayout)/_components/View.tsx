import type { Ticket } from "@/type";
import { formatDuration, getDifTime, getTime } from "@/lib/date";
import { trains } from "@/data/trains";
import Image from "next/image";

interface Props {
  ticket: Ticket | null;
}

export default function View({ ticket }: Props) {
  return (
    <div className="w-full max-w-[500px] h-64 overflow-hidden">
      {ticket ? (
        <div className="flex h-full">
          <div
            className="flex flex-col items-end pr-3 flex-1 relative
            before:content:[''] before:absolute before:bg-current before:w-0.5 before:h-[calc(100%-58px)] before:top-[29px] before:right-[-1px] before:z-10"
            style={{ color: trains[ticket.traingradename].color }}
          >
            {/* 출발 시간 */}
            <time className="absolute top-3.5 text-sm text-gray-500 dark:text-gray-400">
              {getTime(ticket.depplandtime)}
            </time>

            {/* 소요 시간 */}
            <div className="absolute top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-500 dark:text-gray-400">
              {formatDuration(
                getDifTime(ticket.depplandtime, ticket.arrplandtime)
              )}
            </div>

            {/* 도착 시간 */}
            <time className="absolute bottom-3.5 text-sm text-gray-500 dark:text-gray-400">
              {getTime(ticket.arrplandtime)}
            </time>
          </div>
          <div
            className="flex flex-col items-start pl-3 flex-1 relative
            before:content:[''] before:absolute before:size-[10px] before:border-2 before:border-current before:bg-transparent before:top-[20px] before:left-[-5px] before:rounded-full
            after:content:[''] after:absolute after:size-[10px] after:border-2 after:border-current after:bg-transparent after:bottom-[20px] after:left-[-5px] after:rounded-full"
            style={{ color: trains[ticket.traingradename].color }}
          >
            {/* 승차 역 */}
            <div className="absolute top-3 text-base font-semibold text-gray-700 dark:text-gray-300">
              {ticket.depplacename}역 승차
            </div>

            <div className="absolute top-1/2 transform -translate-y-1/2">
              {/* 열차 종류 이미지 */}
              <div className="relative h-5 w-32">
                <Image
                  src={trains[ticket.traingradename].img}
                  alt={ticket.traingradename}
                  fill
                  className="object-contain object-left"
                />
              </div>

              {/* 운임 */}
              <div className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                {ticket.adultcharge.toLocaleString("ko-KR")}원
              </div>
            </div>

            {/* 하차 역 */}
            <div className="absolute bottom-3 text-base font-semibold text-gray-700 dark:text-gray-300">
              {ticket.arrplacename}역 하차
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
