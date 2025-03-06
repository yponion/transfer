import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RQProvider from "./_components/RQProvider";
import ThemeProvider from "./_components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Transfer",
  description: "Korean Train Transfer",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "logo/logo-light.png",
        type: "image/png",
        sizes: "256x256",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "logo/logo-dark.png",
        type: "image/png",
        sizes: "256x256",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            // (로컬 스토리지에 teme가 dark || (로컬 스토리지에 theme가 없음 && 시스템이 dark)) => html에 dark 클래스 추가
            __html: `document.documentElement.classList.toggle("dark", localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches));`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f9f9f9] dark:bg-[#101010] text-[#101010] dark:text-[#f9f9f9]`}
      >
        <RQProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </RQProvider>
      </body>
    </html>
  );
}
