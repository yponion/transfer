import { CityCode, Kind, Platform, Ticket } from "@/type";
import api from "./index";

const serviceKey = process.env.NEXT_PUBLIC_SRVICE_KEY;
const _type = "json";
const pageNo = 1;
const numOfRows = 1000;

/** 차량 종류 목록 조회 */
export const getKind = async (): Promise<Kind[]> => {
  const res = await api.get("/getVhcleKndList", {
    params: {
      serviceKey,
      _type,
    }
  });
  if (res.status !== 200) throw new Error("Failed to fetch city code data");
  return res.data.response.body.items.item;
};

/** 도시 코드 목록 조회 */
export const getCityCode = async (): Promise<CityCode[]> => {
  const res = await api.get("/getCtyCodeList", {
    params: {
      serviceKey,
      _type,
    }
  });
  if (res.status !== 200) throw new Error("Failed to fetch city code data");
  return res.data.response.body.items.item;
};

/** 시/도별 기차역 목록 조회 */
export const getPlatform = async (cityCode: number): Promise<Platform[]> => {
  const res = await api.get("/getCtyAcctoTrainSttnList", {
    params: {
      serviceKey,
      _type,
      pageNo,
      numOfRows,
      cityCode, // 시/도 ID
    }
  });
  if (res.status !== 200) throw new Error("Failed to fetch city code data");
  return res.data.response.body.items.item;
};

/** 출/도착지 기반 열차 정보 조회 */
export const getTicket = async (depPlaceId: string, arrPlaceId: string, depPlandTime: string, trainGradeCode?: string): Promise<Ticket[]> => {
  const res = await api.get("/getStrtpntAlocFndTrainInfo", {
    params: {
      serviceKey,
      _type,
      pageNo,
      numOfRows,
      depPlaceId, // 출발지ID
      arrPlaceId, // 도착지ID
      depPlandTime, // 출발일(YYYYMMDD)
      trainGradeCode, // 차량종류코드
    }
  });
  if (res.status !== 200) throw new Error("Failed to fetch city code data");
  return res.data.response.body.items.item || [];
};






