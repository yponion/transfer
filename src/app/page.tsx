import Link from "next/link";
import Logo from "@/assets/logo.svg";

export default function Home() {
  return (
    <div className="flex h-dvh justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex">
          <Logo className="size-10 sm:size-12" />
          <h1 className="text-4xl sm:text-5xl font-bold">ransfer</h1>
        </div>
        <p className="mb-2 text-sm sm:text-base text-center px-2">
          2번 이상 환승해야 할 때의 일정을 짜보세요.
        </p>
        <Link
          href="/train"
          className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-black"
        >
          지금 바로 시작하기
        </Link>
      </div>
    </div>
  );
}
