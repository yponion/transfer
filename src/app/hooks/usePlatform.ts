import type { CityCode, Platform } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { getCityCode, getPlatform } from "@/app/api/train";

export const usePlatform = () => {
  return useQuery<Platform[]>({
    queryKey: ["platform"],
    queryFn: async () => {
      const cityCode = await getCityCode();
      const platformList = await Promise.all(
        cityCode.map(async (v: CityCode) => getPlatform(v.citycode))
      );
      return platformList
        .flat()
        .sort((a, b) => a.nodename.localeCompare(b.nodename, "ko"));
    },
    staleTime: 1000 * 60 * 60, // 1시간 캐싱
  });
}

