"use client";

import { useEffect, useRef, useState } from "react";
import Ctrl from "../_components/Ctrl";
import View from "../_components/View";
import { getCityCode, getPlatform } from "@/app/api/train";
import type { Platform, CityCode, Schedule } from "@/type";
import { v4 as uuidv4 } from "uuid";
import { getYMDHM } from "@/lib/date";
import Gap from "../_components/Gap";

export default function Home() {
  const [positionY, setPositionY] = useState(0);
  const [pressed, setPressed] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);

  const [platform, setPlatform] = useState<Platform[]>([]);

  /* 일정 */ // todo id, ticket만 있어도 될 듯 한데, 나머지는 자식으로 내릴지 말지 판단
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: uuidv4(),
      startTime: getYMDHM(new Date()),
      startName: "",
      endName: "",
      trainName: "",
      ticket: null,
    },
  ]);

  /** 일정 추가 */
  const addSchedule = (id: string) => {
    const index = schedules.findIndex((schedule) => schedule.id === id);
    if (index === -1) return;
    const value = schedules.toSpliced(index + 1, 0, {
      id: uuidv4(),
      startTime: getYMDHM(new Date()),
      startName: "",
      endName: "",
      trainName: "",
      ticket: null,
    });
    setSchedules(value);
  };

  /** 일정 편집 */
  const updateSchedule = (newSchedule: Schedule) => {
    const index = schedules.findIndex(
      (schedule) => schedule.id === newSchedule.id
    );
    if (index === -1) return;
    const value = schedules.toSpliced(index, 1, newSchedule);
    setSchedules(value);
  };

  /** 일정 제거 */
  const removeSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  /* 기차역 데이터 fetching */
  useEffect(() => {
    async function fetch() {
      const cityCode = await getCityCode();
      const platform = await Promise.all(
        cityCode.map(async (v: CityCode) => {
          return await getPlatform(v.citycode);
        })
      );
      setPlatform(
        platform
          .flat()
          .sort((a, b) => a.nodename.localeCompare(b.nodename, "ko"))
      );
    }
    fetch();
  }, []);

  /* mobile 사이즈 조절 */
  useEffect(() => {
    // 마우스 및 터치 공통 처리 함수
    const handleMove = (y: number) => {
      if (pressed && handleRef.current) {
        const adjustedY = y - handleRef.current.offsetHeight / 2;
        if (80 < adjustedY && adjustedY + 80 < window.innerHeight - 64) {
          setPositionY(adjustedY);
        }
      }
    };

    // 마우스 이벤트 핸들러
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientY);
    };

    const handleMouseUp = () => {
      setPressed(false);
    };

    // 터치 이벤트 핸들러
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientY);
    };

    const handleTouchEnd = () => {
      setPressed(false);
      document.documentElement.style.overscrollBehavior = "auto";
    };

    // 이벤트 등록
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // 클린업
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pressed]);

  return (
    <div className="select-none relative flex w-dvw justify-center max-lg:flex-col max-lg:min-h-[calc(100dvh-4rem)] lg:w-[calc(100dvw-4rem)]">
      {/* Ctrl 영역 */}
      <div
        className="p-3 pb-10 max-lg:w-full lg:min-h-dvh overflow-y-scroll max-lg:h-[calc((100dvh-4rem)/2)] lg:flex-1 lg:overflow-y-hidden"
        style={{
          height: positionY
            ? (window.innerHeight - 64) / 2 +
              (positionY - (window.innerHeight - 64) / 2) +
              24
            : undefined,
        }}
      >
        <div className="flex flex-col items-center">
          <datalist id="platform">
            {platform.map((v) => (
              <option key={v.nodeid} value={v.nodename} />
            ))}
          </datalist>
          {schedules.map((schedule) => (
            <Ctrl
              key={schedule.id}
              schedule={schedule}
              platform={platform}
              addSchedule={addSchedule}
              removeSchedule={removeSchedule}
              updateSchedule={updateSchedule}
            />
          ))}
        </div>
      </div>

      {/* 사이즈 조절 핸들 */}
      <div
        className="absolute bottom-[calc((100dvh-4rem)/2-0.5px)] lg:hidden w-full h-6 bg-white dark:bg-black rounded-t-full flex justify-center items-center cursor-row-resize"
        onMouseDown={() => setPressed(true)}
        onTouchStart={() => {
          setPressed(true);
          document.documentElement.style.overscrollBehavior = "none";
        }}
        ref={handleRef}
        style={{
          top: positionY || undefined,
        }}
      >
        <div className="bg-gray-300 w-10 h-1.5 rounded-full"></div>
      </div>

      {/* View 영역 */}
      <div
        className="max-lg:bg-white dark:max-lg:bg-black p-3 pb-10 max-lg:w-full lg:min-h-dvh overflow-y-scroll max-lg:h-[calc((100dvh-4rem)/2)] lg:flex-1 lg:overflow-y-hidden"
        style={{
          height: positionY
            ? (window.innerHeight - 64) / 2 -
              (positionY - (window.innerHeight - 64) / 2) -
              24
            : undefined,
        }}
      >
        <ol className="flex flex-col items-center">
          {schedules.map((schedule, index) => {
            return (
              <li key={schedule.id} className="w-full max-w-[500px]">
                <View ticket={schedule.ticket} />
                <Gap
                  currentTicket={schedule.ticket}
                  nextTicket={schedules[index + 1]?.ticket}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
