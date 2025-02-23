import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-dvh justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl sm:text-5xl font-bold">Transfer</h1>
        <p className="mb-2 text-sm sm:text-base text-center px-2">
          2번 이상 환승해야 할 때의 일정을 짜보세요.
        </p>
        <Link
          href="/train"
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          지금 바로 시작하기
        </Link>
      </div>
    </div>
  );
}
