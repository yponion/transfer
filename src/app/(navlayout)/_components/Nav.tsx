"use client";

import { items } from "@/data/items";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Nav() {
  const segment = useSelectedLayoutSegment();

  return (
    <header className="z-50 fixed bottom-0 w-screen h-16 lg:left-0 lg:h-dvh lg:w-16 lg:border-r lg:border-gray-300 dark:lg:border-gray-500 max-lg:shadow-current max-lg:shadow-2xl">
      <nav className="size-full">
        <ul className="size-full max-lg:flex justify-around">
          {items.map((item) => (
            <li
              key={item.title}
              className={`size-16 cursor-pointer lg:hover:text-blue-600 flex-1 ${
                segment === item.segment
                  ? "max-lg:text-blue-600 lg:bg-blue-600"
                  : ""
              }`}
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
