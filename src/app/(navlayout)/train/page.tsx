"use client";

import { useEffect, useRef, useState } from "react";
import Ctrl from "../_components/Ctrl";
import View from "../_components/View";
import { getCityCode, getKind, getPlatform } from "@/app/api/train";
import type { Platform, CityCode, Kind } from "@/type";

export default function Home() {
  const [positionY, setPositionY] = useState(0);
  const [pressed, setPressed] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);

  const [kind, setKind] = useState<Kind[]>([]);
  const [platform, setPlatform] = useState<Platform[]>([]);

  useEffect(() => {
    async function fetch() {
      const [kind, cityCode] = await Promise.all([getKind(), getCityCode()]);
      setKind(kind);
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
        className="max-lg:bg-gray-50 p-3 pb-10 max-lg:w-full lg:min-h-dvh overflow-y-scroll max-lg:h-[calc((100dvh-4rem)/2)] lg:flex-1 lg:overflow-y-hidden"
        style={{
          height: positionY
            ? (window.innerHeight - 64) / 2 +
              (positionY - (window.innerHeight - 64) / 2) +
              24
            : undefined,
        }}
      >
        <div className="flex gap-10 flex-col items-center">
          <datalist id="platform">
            {platform.map((v) => (
              <option key={v.nodeid} value={v.nodename} />
            ))}
          </datalist>
          <Ctrl platform={platform} />
          {/* <Ctrl />
          <Ctrl />
          <Ctrl />
          <Ctrl /> */}
          <button className="rounded-full bg-red-300 size-20">+</button>
        </div>
      </div>

      {/* 드래그 핸들 */}
      <div
        className="absolute bottom-[calc((100dvh-4rem)/2-0.5px)] lg:hidden w-full h-6 bg-white rounded-t-full flex justify-center items-center cursor-row-resize"
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
        className="p-3 pb-10 max-lg:w-full lg:min-h-dvh overflow-y-scroll max-lg:h-[calc((100dvh-4rem)/2)] lg:flex-1 lg:overflow-y-hidden"
        style={{
          height: positionY
            ? (window.innerHeight - 64) / 2 -
              (positionY - (window.innerHeight - 64) / 2) -
              24
            : undefined,
        }}
      >
        <div className="flex gap-10 flex-col items-center ">
          <View />
          <View />
          <View />
          <View />
          <View />
        </div>
      </div>
    </div>
  );
}
