"use client";

import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // 첫 렌더링시에도 웹뷰 -> RN 화면 모드 전송
  useEffect(() => {
    const mode = localStorage.getItem("theme");
    if (!mode) return;
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(mode);
  }, []);

  return children;
}
