export interface Kind {
  vehiclekndid: string; // 열차 ID
  vehiclekndnm: string; // 열차 이름
}

export interface CityCode {
  citycode: number; // 도시 코드
  cityname: string; // 도시 이름
}

export interface Platform {
  nodeid: string; // 역 ID
  nodename: string; // 역 이름
}

export interface Ticket {
  adultcharge: number; // 성인 요금
  arrplacename: string; // 도착역 이름
  arrplandtime: number; // 도착 시간
  depplacename: string; // 출발역 이름
  depplandtime: number; // 출발 시간
  traingradename: string; // 열차 이름
  trainno: number; // 열차 번호
}