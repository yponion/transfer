import { formatDuration, getDifTime } from "@/lib/date";
import type { Schedule, Ticket } from "@/type";
import { useEffect, useState } from "react";

interface Props {
  currentTicket: Ticket | null;
  nextTicket: Ticket | null;
  schedules?: Schedule[];
}

export default function Gap({ currentTicket, nextTicket, schedules }: Props) {
  const [totalTime, setTotalTime] = useState(0);
  const [trainTime, setTrainTime] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalTime(0);
    setTotalPrice(0);
    if (!schedules) return;
    const first = schedules.find((v) => v.ticket);
    if (!first?.ticket) return;
    const last = schedules.findLast((v) => v.ticket);
    const totalTime = getDifTime(
      first.ticket.depplandtime,
      last!.ticket!.arrplandtime
    );
    setTotalTime(totalTime);
    const trainTime = schedules.reduce(
      (sum, schedule) =>
        sum +
        getDifTime(
          schedule.ticket?.depplandtime ?? 0,
          schedule.ticket?.arrplandtime ?? 0
        ),
      0
    );
    setTrainTime(trainTime);
    setTotalPrice(
      schedules.reduce(
        (sum, schedule) => sum + (schedule.ticket?.adultcharge ?? 0),
        0
      )
    );
  }, [schedules]);

  return !totalTime ? (
    <div className="w-full max-w-[500px] h-[88px] flex">
      {currentTicket &&
      nextTicket &&
      getDifTime(currentTicket.arrplandtime, nextTicket.depplandtime) > 0 ? (
        <>
          <div className="flex items-center justify-end flex-1 border-r-2 border-gray-500 border-dotted relative h-[130px] top-[-21px] z-10">
            {/* 환승 대기 시간 */}
            <small className="pr-3 font-xs text-gray-500">
              {formatDuration(
                getDifTime(currentTicket.arrplandtime, nextTicket.depplandtime)
              )}
            </small>
          </div>
          <div className="flex-1"></div>
        </>
      ) : null}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="text-sm  text-center">
        총 소요시간:{" "}
        <span className="text-base font-semibold">
          {formatDuration(totalTime)}
        </span>
      </div>
      <div className="text-sm text-center">
        {`기차: ${formatDuration(trainTime)} / 대기: ${formatDuration(
          totalTime - trainTime
        )}`}
      </div>
      <div className="text-sm">
        총 요금:{" "}
        <span className="text-base font-semibold">
          {totalPrice.toLocaleString("ko-KR")}원
        </span>
      </div>
      <div className="text-xs px-3 py-5 text-center">
        공공데이터포털에서 제공하는 API를 사용하며, 일부 승차권 요금이 0원으로
        제공됨에 유의 바랍니다.
      </div>
    </div>
  );
}
