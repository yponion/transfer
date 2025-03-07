"use client";

import { useEffect, useState } from "react";
import SunMoon from "@/assets/sun-moon.svg";
import Sun from "@/assets/sun.svg";
import Moon from "@/assets/moon.svg";

export default function ScreenMode() {
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    const test = localStorage.getItem("theme");
    setSelected(test ?? "system");
  }, []);

  const options = [
    {
      mode: "light",
      label: "라이트 모드",
      color: "bg-white",
      svg: <Sun className="size-10" />,
    },
    {
      mode: "dark",
      label: "다크 모드",
      color: "bg-black",
      svg: <Moon className="size-10" />,
    },
    {
      mode: "system",
      label: "시스템 설정",
      color: "bg-[linear-gradient(to_bottom_right,white_50%,black_50%)]",
      svg: <SunMoon className="size-10" />,
    },
  ];

  const changeScreenMode = (mode: string) => {
    setSelected(mode);

    // 웹뷰 -> RN 화면 모드 전송
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(mode);

    if (mode === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    if (mode === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.removeItem("theme");
    }
  };

  return (
    <div className="flex gap-4 w-full justify-center rounded-xl p-3 flex-wrap bg-zinc-200 dark:bg-zinc-900">
      {options.map((option) => (
        <label
          key={option.mode}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <div
            className={`flex items-center justify-center size-20 rounded-lg ${option.color}`}
          >
            {option.svg}
          </div>
          <span className="text-sm">{option.label}</span>
          <input
            type="radio"
            name="screen"
            value={option.mode}
            checked={selected === option.mode}
            onChange={() => changeScreenMode(option.mode)}
            className="accent-blue-500 w-4 h-4"
          />
        </label>
      ))}
    </div>
  );
}
