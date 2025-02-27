export interface Kind {
  /** 열차 ID */
  vehiclekndid: string;

  /** 열차 이름 */
  vehiclekndnm: string;
}

export interface CityCode {
  /** 도시 코드 */
  citycode: number;

  /** 도시 이름 */
  cityname: string;
}

export interface Platform {
  /** 역 ID */
  nodeid: string;

  /** 역 이름 */
  nodename: string;
}

export interface Ticket {
  /** 성인 요금 */
  adultcharge: number;

  /** 도착역 이름 */
  arrplacename: string;

  /** 도착 시간 */
  arrplandtime: number;

  /** 출발역 이름 */
  depplacename: string;

  /** 출발 시간 (YYYYMMDDHHMM00 형식) */
  depplandtime: number;

  /** 열차 이름 */
  traingradename: string;

  /** 열차 번호 */
  trainno: number;
}

export interface Schedule {
  /** 고유 ID (UUID) */
  id: string;

  /** 출발 시간 정보 */
  startTime: {
    /** 출발 날짜 (YYYYMMDD 형식) */
    ymd: string;
    /** 출발 시 (HH 형식, 24시간 기준) */
    hour: string;
    /** 출발 분 (MM 형식) */
    minute: string;
  };

  /** 출발역 이름 */
  startName: string;

  /** 도착역 이름 */
  endName: string;

  /** 열차 이름 */
  trainName: string;

  /** 티켓 */
  ticket: Ticket | null;
}