"use client";

import { useState } from "react";
import Plus from "@/assets/plus.svg";

interface Props {
  id?: string;
  addSchedule: (id: string | undefined) => void;
}

export default function AddScheduleBtn({ addSchedule, id }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  /** 스케줄 추가 버튼 눌렀을 때 애니메이션과 함께 스케줄 추가 */
  const onClickAddSchedule = () => {
    setIsClicked(true); // 애니메이션 클래스 추가
    addSchedule(id); // 스케줄 추가
    setTimeout(() => setIsClicked(false), 200); //  애니메이션 클래스 제거
  };
  return (
    <button
      className={`w-full my-5 max-w-[500px] h-12 rounded-xl border border-dashed border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 group flex justify-center items-center
        ${isClicked ? "animate-expand" : ""}`}
      onClick={onClickAddSchedule}
    >
      <Plus className="size-8 fill-gray-200 group-hover:fill-gray-300 dark:fill-gray-800 dark:group-hover:fill-gray-700" />
    </button>
  );
}
