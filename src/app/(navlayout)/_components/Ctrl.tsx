"use client";

import type { Platform, Schedule } from "@/type";
import { useEffect, useState } from "react";
import { getTime, getYMDList } from "@/lib/date";
import { useTicket } from "@/app/hooks/useTicket";
import { PropagateLoader } from "react-spinners";
import Send from "@/assets/send.svg";
import Pin from "@/assets/pin.svg";
import Plus from "@/assets/Plus.svg";

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

  /** 역 이름으로 역 ID 화반환 */
  const getPlatformId = (platformName: string) => {
    if (platformName)
      return platform.find((v) => v.nodename === platformName)?.nodeid;
  };

  /** RQ로 티켓들을 받아옴 */
  const { data: tickets = [], isLoading } = useTicket(
    getPlatformId(schedule.startName) ?? "",
    getPlatformId(schedule.endName) ?? "",
    schedule.startTime.ymd ?? ""
  );

  /** 스케줄에 티켓이 있으면 초기화 */
  const resetTicket = () => {
    if (schedule.ticket) updateSchedule({ ...schedule, ticket: null });
  };

  /* 날짜, 출발역, 도착역 중에 하나라도 수정되면 tickets가 바뀜 -> 선택 초기화  */
  useEffect(() => {
    setSelectedTrainName("");
    setSelectedTicket(0);
    resetTicket();
  }, [tickets]);

  /* 시간 또는 분이 수정되면 선택된 열차, 선택된 티켓 초기화 */
  useEffect(() => {
    setSelectedTrainName("");
    setSelectedTicket(0);
    resetTicket();
  }, [schedule.startTime.hour, schedule.startTime.minute]);

  /* 선택된 열차가 바뀌면 선택된 티켓 초기화 */
  useEffect(() => {
    setSelectedTicket(0);
    resetTicket();
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

  const platformSelectionMessage = () => {
    if (!schedule.startName && !schedule.endName) return "역을 선택 하세요.";
    if (!schedule.startName) return "출발역을 선택 하세요.";
    if (!schedule.endName) return "도착역을 선택 하세요.";
    if (isLoading)
      return <PropagateLoader color="rgb(37, 99, 235)" className="pt-5" />;
    return "조건에 맞는 열차가 없습니다.";
  };

  return (
    <>
      <div className="w-full max-w-[500px] h-64 rounded-xl border border-gray-300 dark:border-gray-700 animate-expand">
        {/* 날짜 선택 */}
        <div className="h-1/5 border-b border-gray-200 dark:border-gray-800">
          {/* 날짜 */}
          <select
            className="w-1/3 h-full px-2 bg-transparent rounded-xl cursor-pointer"
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
            className="w-1/3 h-full px-2 bg-transparent rounded-xl cursor-pointer"
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
                {`${i.toString().padStart(2, "0")}시`}
              </option>
            ))}
          </select>

          {/* 분 */}
          <select
            className="w-1/3 h-full px-2 bg-transparent rounded-xl cursor-pointer"
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
        <div className="h-1/5 border-b border-gray-200 dark:border-gray-800">
          <label className="flex items-center cursor-text size-full rounded-xl focus-within:border-2 focus-within:border-blue-500">
            <Send className="size-6 dark:fill-white ml-2" />
            <input
              className="size-full px-2 bg-transparent rounded-xl outline-none"
              type="text"
              list="platform"
              placeholder="출발역"
              value={schedule.startName}
              onChange={(e) =>
                updateSchedule({ ...schedule, startName: e.target.value })
              }
            />
          </label>
        </div>

        {/* 도착 역 선택 */}
        <div className="h-1/5 border-b border-gray-200 dark:border-gray-800">
          <label className="flex items-center cursor-text size-full rounded-xl focus-within:border-2 focus-within:border-blue-500">
            <Pin className="size-6 ml-2" />
            <input
              className="size-full px-2 bg-transparent rounded-xl outline-none"
              type="text"
              list="platform"
              placeholder="도착역"
              value={schedule.endName}
              onChange={(e) =>
                updateSchedule({ ...schedule, endName: e.target.value })
              }
            />
          </label>
        </div>

        {/* 기차 종류 선택 */}
        <div className="h-1/5 border-b border-gray-200 dark:border-gray-800">
          {trainList().length > 0 ? (
            <select
              className="size-full px-2 bg-transparent rounded-xl cursor-pointer"
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
              className="size-full px-2 bg-transparent rounded-xl cursor-pointer"
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
                    ${getTime(ticket.arrplandtime)}`}
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
        className={`w-full my-5 max-w-[500px] h-12 rounded-xl border border-dashed border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 group flex justify-center items-center
          ${isClicked ? "animate-expand" : ""}`}
        onClick={onClickAddSchedule}
      >
        <Plus className="size-8 fill-gray-200 group-hover:fill-gray-300 dark:fill-gray-800 dark:group-hover:fill-gray-700" />
      </button>

      {/* todo dev 일정 제거 버튼 */}
      {/* <button
        className="w-full my-3 max-w-[100px] h-[50px] rounded-full bg-red-300 hover:bg-blue-300"
        onClick={() => removeSchedule(schedule.id)}
      >
        지우기 test
      </button> */}
    </>
  );
}
