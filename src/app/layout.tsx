import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RQProvider from "./_components/RQProvider";

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
        url: "logo-light.png",
        type: "image/png",
        sizes: "256x256",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "logo-dark.png",
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
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RQProvider>{children}</RQProvider>
      </body>
    </html>
  );
}
