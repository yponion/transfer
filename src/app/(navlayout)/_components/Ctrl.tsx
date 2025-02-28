"use client";

import { getTicket } from "@/app/api/train";
import type { Platform, Schedule, Ticket } from "@/type";
import { useEffect, useState } from "react";
import { getDifTime, getTime, getYMDList } from "@/lib/date";

interface Props {
  schedule: Schedule;
  platform: Platform[];
  addSchedule: (id: string) => void;
  removeSchedule: (id: string) => void;
  updateSchedule: (schedule: Schedule) => void;
}

export default function Ctrl({
  schedule,
  addSchedule,
  removeSchedule,
  updateSchedule,
  platform,
}: Props) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTrainName, setSelectedTrainName] = useState<string>("");
  const [selectedTicket, setSelectedTicket] = useState<number>(0);

  /** 날짜 선택 리스트 */
  const ymdList = getYMDList(new Date());

  const [isClicked, setIsClicked] = useState(false);
  /** 스케줄 추가 버튼 눌렀을 때 애니메이션과 함께 스케줄 추가 */
  const onClickAddSchedule = () => {
    setIsClicked(true); // 애니메이션 클래스 추가
    addSchedule(schedule.id); // 스케줄 추가
    setTimeout(() => setIsClicked(false), 200); //  애니메이션 클래스 제거
  };

  /** 역 이름으로 역 ID 반환 */
  const getPlatformId = (startPlatform: string) => {
    return platform.find((v) => v.nodename === startPlatform)?.nodeid;
  };

  /** 출발 시간, 출발역, 도착역 으로 티켓 데이터 가져오기 */
  const fetchData = async () => {
    setTickets([]);
    setSelectedTrainName("");
    setSelectedTicket(0);
    if (!schedule.startName || !schedule.endName) return; // 출발역 또는 도착역 필드가 비어있다면 return
    const startId = getPlatformId(schedule.startName);
    const endId = getPlatformId(schedule.endName);
    if (!startId || !endId) return; // 출발역 또는 도착역 필드가 유효한 값이 아니라면 return
    const ticket = await getTicket(startId, endId, schedule.startTime.ymd);
    if (!ticket) return; // 해당 날짜에 출발역에서 도착역으로 가는 티켓이 없다면 return
    setTickets(ticket);
  };

  /* 날짜, 출발역, 도착역 중에 하나라도 수정되면 데이터 가져옴 */
  useEffect(() => {
    fetchData(); // todo reactquery로 loading 처리
  }, [schedule.startTime.ymd, schedule.startName, schedule.endName]);

  /* 시간 또는 분이 수정되면 선택된 열차, 티켓 초기화 */
  useEffect(() => {
    setSelectedTrainName("");
    setSelectedTicket(0);
  }, [schedule.startTime.hour, schedule.startTime.minute]);

  /* 선택된 열차가 바뀌면 티켓 초기화 */
  useEffect(() => {
    setSelectedTicket(0);
  }, [selectedTrainName]);

  /* 티켓을 선택하면 일정에 추가 */
  useEffect(() => {
    if (!selectedTicket) return;
    const ticket = filterTrainTickets().find(
      (ticket) => ticket.trainno === selectedTicket
    );
    if (!ticket) return;
    updateSchedule({ ...schedule, ticket });
  }, [selectedTicket]);

  /** 시간 필터 */
  const filterTimeTickets = () => {
    const { ymd, hour, minute } = schedule.startTime;
    return tickets.filter(
      (ticket) => ticket.depplandtime.toString() > ymd + hour + minute + "00"
    );
  };

  /** 열차 종류 */
  const trainList = () => {
    const set = new Set<string>();
    filterTimeTickets().forEach((ticket) => set.add(ticket.traingradename));
    return [...set];
  };

  /** 열차 종류 필터 */
  const filterTrainTickets = () => {
    if (selectedTrainName === "") return filterTimeTickets();
    return filterTimeTickets().filter(
      (ticket) => ticket.traingradename === selectedTrainName
    );
  };

  /** 역 선택 여부 + 열차 검색 결과 메시지 반환 */
  const platformSelectionMessage = () => {
    if (!schedule.startName && !schedule.endName) return "역을 선택 하세요.";
    if (!schedule.startName) return "출발역을 선택 하세요.";
    if (!schedule.endName) return "도착역을 선택 하세요.";
    return "조건에 맞는 열차가 없습니다.";
  };

  return (
    <>
      <div className="w-full max-w-[500px] h-64 rounded-xl border border-[rgb(138,138,138)] animate-expand">
        {/* 날짜 선택 */}
        <div className="h-1/5 border-b border-[rgb(232,232,232)]">
          {/* 날짜 */}
          <select
            className="w-1/3 h-full px-2 bg-transparent rounded-xl"
            value={schedule.startTime.ymd}
            onChange={(e) => {
              updateSchedule({
                ...schedule,
                startTime: { ...schedule.startTime, ymd: e.target.value },
              });
            }}
          >
            {ymdList.map((ymd, i) => (
              <option key={ymd} value={ymd}>
                {`${ymd.slice(4, 6)}월 ${ymd.slice(6, 8)}일${
                  i === 0 ? " (오늘)" : ""
                }`}
              </option>
            ))}
          </select>

          {/* 시간 */}
          <select
            className="w-1/3 h-full px-2 bg-transparent rounded-xl"
            value={schedule.startTime.hour}
            onChange={(e) => {
              updateSchedule({
                ...schedule,
                startTime: { ...schedule.startTime, hour: e.target.value },
              });
            }}
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <option key={i} value={i.toString().padStart(2, "0")}>
                {`${i}시 (${i < 12 ? "오전" : "오후"}${(i % 12)
                  .toString()
                  .padStart(2, "0")})`}
              </option>
            ))}
          </select>

          {/* 분 */}
          <select
            className="w-1/3 h-full px-2 bg-transparent rounded-xl"
            value={schedule.startTime.minute}
            onChange={(e) => {
              updateSchedule({
                ...schedule,
                startTime: { ...schedule.startTime, minute: e.target.value },
              });
            }}
          >
            {Array.from({ length: 60 }).map((_, i) => (
              <option key={i} value={i.toString().padStart(2, "0")}>
                {`${i}분`}
              </option>
            ))}
          </select>
        </div>

        {/* 출발 역 선택 */}
        <div className="h-1/5 border-b border-[rgb(232,232,232)]">
          <input
            className="size-full px-2 bg-transparent rounded-xl"
            type="text"
            list="platform"
            placeholder="출발역"
            value={schedule.startName}
            onChange={(e) =>
              updateSchedule({ ...schedule, startName: e.target.value })
            }
          />
        </div>

        {/* 도착 역 선택 */}
        <div className="h-1/5 border-b border-[rgb(232,232,232)]">
          <input
            className="size-full px-2 bg-transparent rounded-xl"
            type="text"
            list="platform"
            placeholder="도착역"
            value={schedule.endName}
            onChange={(e) =>
              updateSchedule({ ...schedule, endName: e.target.value })
            }
          />
        </div>

        {/* 기차 종류 선택 */}
        <div className="h-1/5 border-b border-[rgb(232,232,232)]">
          {trainList().length > 0 ? (
            <select
              className="size-full px-2 bg-transparent rounded-xl"
              value={selectedTrainName}
              onChange={(e) => {
                setSelectedTrainName(e.target.value);
              }}
            >
              <option value={""}>열차 전체</option>
              {trainList().map((trainName) => (
                <option key={trainName} value={trainName}>
                  {trainName}
                </option>
              ))}
            </select>
          ) : (
            <p
              className="size-full text-center leading-[50px]"
              style={{ lineHeight: "50px" }} // mac safari 에서 leading-[50px] 안먹혀서 추가
            >
              {platformSelectionMessage()}
            </p>
          )}
        </div>

        {/* 티켓 선택 */}
        <div className="h-1/5">
          {filterTrainTickets().length > 0 ? (
            <select
              className="size-full px-2 bg-transparent rounded-xl"
              value={selectedTicket}
              onChange={(e) => setSelectedTicket(Number(e.target.value))}
            >
              <option value={0}>선택</option>
              {filterTrainTickets().map((ticket) => (
                <option key={ticket.trainno} value={ticket.trainno}>
                  {`${
                    selectedTrainName === ""
                      ? ticket.traingradename + " / "
                      : ""
                  } 
                    ${getTime(ticket.depplandtime)} ~ 
                    ${getTime(ticket.arrplandtime)} (
                    ${getDifTime(
                      ticket.depplandtime,
                      ticket.arrplandtime
                    )}분 소요)`}
                </option>
              ))}
            </select>
          ) : (
            <p
              className="size-full text-center leading-[50px]"
              style={{ lineHeight: "50px" }} // mac safari 에서 leading-[50px] 안먹혀서 추가
            >
              {platformSelectionMessage()}
            </p>
          )}
        </div>
      </div>
      {/* 일정 추가 버튼 */}
      <button
        className={`w-full my-5 max-w-[500px] h-12 rounded-xl border border-dashed border-gray-300 hover:border-gray-400 group
          ${isClicked ? "animate-expand" : ""}`}
        onClick={onClickAddSchedule}
      >
        <svg
          className="size-8 justify-self-center fill-gray-300 group-hover:fill-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
      </button>

      {/* 일정 제거 버튼 */}
      {/* <button
        className="w-full my-3 max-w-[100px] h-[50px] rounded-full bg-red-300 hover:bg-blue-300"
        onClick={() => removeSchedule(schedule.id)}
      >
        지우기 test
      </button> */}
    </>
  );
}
