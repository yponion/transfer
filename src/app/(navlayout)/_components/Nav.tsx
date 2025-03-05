"use client";

import { items } from "@/data/items";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Nav() {
  const segment = useSelectedLayoutSegment();

  return (
    <header className="z-50 fixed bottom-0 w-screen h-16 lg:left-0 lg:h-dvh lg:w-16 lg:border-r lg:border-gray-300 dark:lg:border-gray-500 max-lg:shadow-current max-lg:shadow-2xl">
      <nav className="size-full">
        <Link
          href="/"
          className="hidden lg:flex size-16 items-center justify-center border-b border-gray-300 dark:border-gray-500"
        >
          <svg
            className="size-12"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
          >
            <path d="M28 84H228" />
            <path d="M18 69L218 69" />
            <path d="M212 108.961L228.641 84" />
            <path d="M212 59L228.641 83.9615" />
            <path d="M128 234L155.735 192.397" />
            <path d="M127.735 233.603L100 192" />
            <path d="M128 234L128 84" />
            <path d="M113 211V99" />
            <path d="M143 99L217 99" />
            <path d="M143 211L143 114" />
          </svg>
        </Link>
        <ul className="size-full max-lg:flex justify-around">
          {items.map((item) => (
            <li
              key={item.title}
              className={`size-16 cursor-pointer lg:hover:text-blue-600 flex-1 ${
                segment === item.segment
                  ? "max-lg:text-blue-600 lg:bg-blue-600"
                  : ""
              } ${item.title === "홈" ? "lg:hidden" : ""}`}
            >
              <Link
                href={`/${item.segment}`}
                className={`flex flex-col items-center justify-center size-full ${
                  segment === item.segment ? "lg:text-white" : ""
                }`}
              >
                <div className="size-6 fill-none stroke-current stroke-2">
                  {item.svg}
                </div>
                <span className="text-xs">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
