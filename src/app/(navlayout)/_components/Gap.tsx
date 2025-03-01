import type { Ticket } from "@/type";

interface Props {
  currentTicket: Ticket | null;
  nextTicket: Ticket | null;
}

export default function Gap({ currentTicket, nextTicket }: Props) {
  return (
    <div className="w-full max-w-[500px] h-[88px] flex">
      {currentTicket && nextTicket ? (
        <div className="flex items-center justify-end flex-1 border-r-2 border-white border-dotted relative h-[130] top-[-21px] z-10">
          <div className="flex flex-col pr-3">
            {/* svg */}
            <strong>N분</strong>
          </div>
        </div>
      ) : null}
      <div className="flex-1"></div>
    </div>
  );
}
