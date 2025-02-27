import dayjs from "dayjs";

/** 날짜를 연월일시간분으로 (YYYYMMDDHHMM 형식) */
export const getYMDHM = (date: Date): { ymd: string, hour: string, minute: string } => {
  return {
    ymd: date.getFullYear() + (date.getMonth() + 1).toString().padStart(2, "0") + date.getDate().toString().padStart(2, "0"),
    hour: date.getHours().toString().padStart(2, "0"),
    minute: date.getMinutes().toString().padStart(2, "0"),
  };
};

/** 연월일 선택 리스트 ([YYYYMMDD, ...] 형식) */
export const getYMDList = (date: Date): string[] => {
  const list = [];
  for (let i = 0; i < 7; i++) {
    const newDate = new Date();
    newDate.setDate(date.getDate() + i);
    list.push(newDate.getFullYear() + (newDate.getMonth() + 1).toString().padStart(2, "0") + newDate.getDate().toString().padStart(2, "0"))
  }
  return (list)
};

/** YYYYMMDDHHMM00 -> HH:MM */
export const getTime = (num: number) => {
  const str = num.toString();
  const res = str.slice(-6, -4) + ":" + str.slice(-4, -2);
  return res;
};

/** YYYYMMDDHHMM00 -> Date */
const mkDate = (num: number) => {
  const str = num.toString();
  return dayjs(`${str.slice(0, 4)}/${str.slice(4, 6)}/${str.slice(6, 8)}
    ${str.slice(8, 10)}:${str.slice(10, 12)}:${str.slice(12, 14)} `);
};

/** 날짜 차이 반환 (입력 형식: YYYYMMDDHHMM00) */
export const getDifTime = (start: number, end: number) => {
  const startDate = mkDate(start);
  const endDate = mkDate(end);
  return endDate.diff(startDate, "minute");
};