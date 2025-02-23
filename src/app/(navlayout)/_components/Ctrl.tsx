"use client";

import { getTicket } from "@/app/api/train";
import type { Platform, Ticket } from "@/type";
import { useEffect, useState } from "react";

interface Props {
  platform: Platform[];
}

export default function Ctrl({ platform }: Props) {
  const yyyymmdd = (date: Date, addDate = 0) => {
    const newDate = new Date();
    newDate.setDate(date.getDate() + addDate);
    return (
      newDate.getFullYear() +
      (newDate.getMonth() + 1).toString().padStart(2, "0") +
      newDate.getDate().toString().padStart(2, "0")
    );
  };

  const mmdd = (date: Date, addDate = 0) => {
    if (addDate === 0) return "오늘";
    if (addDate === 1) return "내일";
    const newDate = new Date();
    newDate.setDate(date.getDate() + addDate);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return `${newDate.getMonth() + 1}월 ${newDate.getDate()}일 (${
      days[newDate.getDay()]
    })`;
  };

  const now = new Date();
  const [date, setDate] = useState(yyyymmdd(now));
  const [startPlatform, setStartPlatform] = useState("");
  const [arrivePlatform, setArrivePlatform] = useState("");
  const [selectedHour, setSelectedHour] = useState(now.getHours().toString());
  const [selectedMin, setSelectedMin] = useState(now.getMinutes().toString());
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const [FilterTicket, setFilterTicket] = useState<Ticket[]>([]);
  const [kind, setKind] = useState<string[]>([]);
  const [selectedKind, setSelectedKind] = useState("");

  const reset = () => {
    setTicket([]);
    setFilterTicket([]);
    setKind([]);
    setSelectedKind("");
  };

  const fetch = async () => {
    if (!startPlatform || !arrivePlatform) {
      reset();
      return;
    }
    const depPlaceId = platform.find(
      (v) => v.nodename === startPlatform
    )?.nodeid;
    const arrPlaceId = platform.find(
      (v) => v.nodename === arrivePlatform
    )?.nodeid;
    if (!depPlaceId || !arrPlaceId) {
      reset();
      return;
    }
    const ticket = await getTicket(depPlaceId, arrPlaceId, date);
    if (!ticket) {
      reset();
      return;
    }
    setTicket(ticket);
    const targetTime = Number(
      date + selectedHour.padStart(2, "0") + selectedMin.padStart(2, "0") + "00"
    );
    const index = ticket.findIndex((v) => {
      return v.depplandtime >= targetTime;
    });
    if (index === -1) {
      setFilterTicket([]);
      setKind([]);
      return;
    }

    const filterTicket = ticket.slice(index);
    setFilterTicket(filterTicket);

    const set = new Set<string>();
    filterTicket.forEach((v) => set.add(v.traingradename));
    setKind([...set]);
  };

  useEffect(() => {
    fetch();
  }, [date, startPlatform, arrivePlatform]);

  useEffect(() => {
    if (ticket.length <= 0) return;
    const targetTime = Number(
      date + selectedHour.padStart(2, "0") + selectedMin.padStart(2, "0") + "00"
    );
    const index = ticket.findIndex((v) => {
      return v.depplandtime >= targetTime;
    });
    if (index === -1) {
      setFilterTicket([]);
      setKind([]);
      return;
    }
    const filterTicket = ticket.slice(index);
    console.log("filterTicket", filterTicket);
    setFilterTicket(filterTicket);

    const set = new Set<string>();
    filterTicket.forEach((v) => set.add(v.traingradename));
    setKind([...set]);
  }, [selectedHour, selectedMin]);

  const setP = () => {
    if (!startPlatform && !arrivePlatform) return "역을 선택 하세요";
    if (!startPlatform) return "출발역을 선택 하세요";
    if (!arrivePlatform) return "도착역을 선택 하세요";
    return `[ ${startPlatform} ] → [ ${arrivePlatform} ] 직행 열차 없음`;
  };

  return (
    <div className="w-full max-w-[500px] h-[200px] rounded-xl border border-[rgb(138,138,138)]">
      <div className="h-[50px] border-b border-[rgb(232,232,232)]">
        {/* 날짜 */}
        <select
          className="w-1/3 h-full px-2 bg-transparent rounded-xl"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <option key={i} value={yyyymmdd(now, i)}>
              {mmdd(now, i)}
            </option>
          ))}
        </select>

        {/* 시간 */}
        <select
          className="w-1/3 h-full px-2 bg-transparent rounded-xl"
          value={selectedHour}
          onChange={(e) => setSelectedHour(e.target.value)}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <option key={i} value={i}>
              {`${i}시 (${i < 12 ? "오전" : "오후"}${(i % 12)
                .toString()
                .padStart(2, "0")})`}
            </option>
          ))}
        </select>

        {/* 분 */}
        <select
          className="w-1/3 h-full px-2 bg-transparent rounded-xl"
          value={selectedMin}
          onChange={(e) => setSelectedMin(e.target.value)}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <option key={i} value={i}>
              {`${i}분`}
            </option>
          ))}
        </select>
      </div>
      <div className="h-[50px] border-b border-[rgb(232,232,232)]">
        {/* 출발 역 */}
        <input
          className="size-full px-2 bg-transparent rounded-xl"
          type="text"
          list="platform"
          placeholder="출발역"
          value={startPlatform}
          onChange={(e) => setStartPlatform(e.target.value)}
        />
      </div>
      <div className="h-[50px] border-b border-[rgb(232,232,232)]">
        {/* 도착 역 */}
        <input
          className="size-full px-2 bg-transparent rounded-xl"
          type="text"
          list="platform"
          placeholder="도착역"
          value={arrivePlatform}
          onChange={(e) => setArrivePlatform(e.target.value)}
        />
      </div>
      <div className="h-[50px]">
        {/* 기차 종류 선택 */}
        {kind.length > 0 ? (
          <select
            className="size-full px-2 bg-transparent rounded-xl"
            value={selectedKind}
            onChange={(e) => setSelectedKind(e.target.value)}
          >
            <option value={""}>최소 대기</option>
            {kind.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        ) : (
          <p
            className="size-full text-center leading-[50px]"
            style={{ lineHeight: "50px" }} // mac safari 에서 leading-[50px] 안먹혀서 추가
          >
            {setP()}
          </p>
        )}
      </div>
    </div>
  );
}
