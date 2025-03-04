import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-dvh justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex">
          <svg
            className="size-10 sm:size-12"
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
          <h1 className="text-4xl sm:text-5xl font-bold">ransfer</h1>
        </div>
        <p className="mb-2 text-sm sm:text-base text-center px-2">
          2번 이상 환승해야 할 때의 일정을 짜보세요.
        </p>
        <Link
          href="/train"
          className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          지금 바로 시작하기
        </Link>
      </div>
    </div>
  );
}
