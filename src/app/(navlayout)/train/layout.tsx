import Nav from "@/app/(navlayout)/_components/Nav";

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <div className="max-lg:mb-16 max-lg:min-h-[calc(100dvh-4rem)] lg:ml-16 lg:min-h-dvh overflow-x-hidden">
        {children}
      </div>
    </>
  );
}
