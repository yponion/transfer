"use client";

import { getTicket } from "@/app/api/train";
import type { Platform, Ticket } from "@/type";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

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
  const [filterTimeTicket, setFilterTimeTicket] = useState<Ticket[]>([]);
  const [kind, setKind] = useState<string[]>([]);
  const [selectedKind, setSelectedKind] = useState("");
  const [selectedTicket, setSelectedTicket] = useState("");

  const fetch = async () => {
    setTicket([]);
    setFilterTimeTicket([]);
    setKind([]);
    setSelectedKind("");
    setSelectedTicket("");
    if (!startPlatform || !arrivePlatform) return;
    const depPlaceId = platform.find(
      (v) => v.nodename === startPlatform
    )?.nodeid;
    const arrPlaceId = platform.find(
      (v) => v.nodename === arrivePlatform
    )?.nodeid;
    if (!depPlaceId || !arrPlaceId) return;
    const ticket = await getTicket(depPlaceId, arrPlaceId, date);
    if (!ticket) return;

    setTicket(ticket);
    const targetTime = Number(
      date + selectedHour.padStart(2, "0") + selectedMin.padStart(2, "0") + "00"
    );
    const index = ticket.findIndex((v) => {
      return v.depplandtime >= targetTime;
    });
    if (index === -1) return;

    const filterTimeTicket = ticket.slice(index);
    setFilterTimeTicket(filterTimeTicket);

    const set = new Set<string>();
    filterTimeTicket.forEach((v) => set.add(v.traingradename));
    setKind([...set]);
  };

  useEffect(() => {
    fetch();
  }, [date, startPlatform, arrivePlatform]);

  useEffect(() => {
    setFilterTimeTicket([]);
    setKind([]);
    setSelectedKind("");
    setSelectedTicket("");

    if (ticket.length <= 0) return;
    const targetTime = Number(
      date + selectedHour.padStart(2, "0") + selectedMin.padStart(2, "0") + "00"
    );
    const index = ticket.findIndex((v) => {
      return v.depplandtime >= targetTime;
    });
    if (index === -1) return;

    const filterTimeTicket = ticket.slice(index);
    setFilterTimeTicket(filterTimeTicket);

    const set = new Set<string>();
    filterTimeTicket.forEach((v) => set.add(v.traingradename));
    setKind([...set]);
  }, [selectedHour, selectedMin]);

  const setP = () => {
    if (!startPlatform && !arrivePlatform) return "역을 선택 하세요.";
    if (!startPlatform) return "출발역을 선택 하세요.";
    if (!arrivePlatform) return "도착역을 선택 하세요.";
    return "해당 조건에 맞는 열차가 없습니다.";
  };

  const getTime = (num: number) => {
    const str = num.toString();
    const res = str.slice(-6, -4) + ":" + str.slice(-4, -2);
    return res;
  };

  const mkDate = (num: number) => {
    const str = num.toString();
    return dayjs(`${str.slice(0, 4)}/${str.slice(4, 6)}/${str.slice(6, 8)} 
    ${str.slice(8, 10)}:${str.slice(10, 12)}:${str.slice(12, 14)} `);
  };

  const getDifTime = (start: number, end: number) => {
    const startDate = mkDate(start);
    const endDate = mkDate(end);
    return endDate.diff(startDate, "minute");
  };

  const setT = () => {
    return selectedKind === ""
      ? filterTimeTicket.map((v, i) => (
          <option key={i} value={i}>
            {`${v.traingradename} / 
            ${getTime(v.depplandtime)} ~ 
            ${getTime(v.arrplandtime)} (${getDifTime(
              v.depplandtime,
              v.arrplandtime
            )}분 소요)`}
          </option>
        ))
      : filterTimeTicket
          .filter((v) => v.traingradename === selectedKind)
          .map((v, i) => (
            <option key={i} value={i}>
              {`${getTime(v.depplandtime)} ~ 
              ${getTime(v.arrplandtime)} (${getDifTime(
                v.depplandtime,
                v.arrplandtime
              )}분 소요)`}
            </option>
          ));
  };

  return (
    <div className="w-full max-w-[500px] h-[250px] rounded-xl border border-[rgb(138,138,138)]">
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
      <div className="h-[50px] border-b border-[rgb(232,232,232)]">
        {/* 기차 종류 선택 */}
        {kind.length > 0 ? (
          <select
            className="size-full px-2 bg-transparent rounded-xl"
            value={selectedKind}
            onChange={(e) => {
              setSelectedKind(e.target.value);
              setSelectedTicket("");
            }}
          >
            <option value={""}>열차 전체</option>
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
      <div className="h-[50px]">
        {/* 티켓 선택 */}
        {filterTimeTicket.length > 0 ? (
          <select
            className="size-full px-2 bg-transparent rounded-xl"
            value={selectedTicket}
            onChange={(e) => setSelectedTicket(e.target.value)}
          >
            <option value={""}>선택</option>
            {setT()}
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
