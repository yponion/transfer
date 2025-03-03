type Train = {
  color: string;
  img: string;
};

type TrainMap = {
  [key: string]: Train;
};

// https://ko.wikipedia.org/wiki/틀:한국_철도_노선색
export const trains: TrainMap = {
  "KTX": {
    color: "#204080",
    img: "/train_ticket/ktx.png",
  },
  "새마을호": {
    color: "#5288F5",
    img: "/train_ticket/saemaul.png",
  },
  "무궁화호": {
    color: "#E06040",
    img: "/train_ticket/mugung.png",
  },
  "누리로": {
    color: "#3D99C2",
    img: "/train_ticket/nuri.png",
  },
  "KTX-산천(A-type)": {
    color: "#204080",
    img: "/train_ticket/sancheon.png",
  },
  "KTX-산천(B-type)": {
    color: "#204080",
    img: "/train_ticket/sancheon.png",
  },
  "ITX-새마을": {
    color: "#C30E2F",
    img: "/train_ticket/itx_saemaeul.png",
  },
  "ITX-청춘": {
    color: "#1CAE4C",
    img: "/train_ticket/ktx_cheongryong.png",
  },
  "KTX-이음": {
    color: "#204080",
    img: "/train_ticket/ieum.png",
  },
  "SRT": {
    color: "#5A2149",
    img: "/train_ticket/srt.png",
  },
  "ITX-마음": {
    color: "#C30E2F",
    img: "/train_ticket/itx_maum.png",
  },
  "KTX-청룡": {
    color: "#204080",
    img: "/train_ticket/ktx_cheongryong.png",
  },
}