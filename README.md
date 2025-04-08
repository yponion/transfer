# [Transfer](https://transfer-yp.vercel.app)

### 한국 기차 환승 일정 세부 커스텀

###### 2025.02

###### 1인 프로젝트

## 📌 Summary

기차를 환승 할 때 두번 이상 환승하는 경로는 볼 수 없었다. 하지만 두번 이상 환승하면 더 효율적인 동선을 짤 수 있다는 것을 안 나는 직접 사용할 서비스를 제작하기로 했다.

- `반응형`

  모바일 환경도 고려하여 반응형으로 제작. 웹뷰로 React Native 에 탑재 -> [Transfer app](https://github.com/yponion/trsnsfer-app)

- `Tailwind CSS`

  - 장점과 단점이 뚜렷한 스타일. 클래스 명을 고민할 필요가 없고 파일 이동 없이 <u>빠른 스타일링</u>이 가능하다는 점이 가장 큰 장점이었고, 단점으로는 <u>최악의 가독성</u>을 보여줬다. 그마나 `Tailwind CSS IntelliSense` 와 같은 익스텐션을 활용하면 클래스 중복 에러, 코드 자동완성 등이 가능했다.

  - 빠른 개발이 필요하거나 프로토타입은 Tailwind CSS 로, 유지보수가 중요한 프로젝트에서는 Sass 로 프로젝트 성격에 따라 기술을 고르면 될것 같다.

## Troubleshooting

- `백엔드 부재`

  - openAPI 를 활용하여 프론트단 만으로 구성하였다.

  - 백단이 있으면 더 효율적인 설계가 가능했을 것 같다는 아쉬움이 남았지만, `React Query` 를 사용하여 캐싱을 통해 주어진 환경에서 최대한 효율적으로 구현하였다.

## 🔨 Technology Stack(s)

| Stack                                                                                                    | Version  | etc.       |
| -------------------------------------------------------------------------------------------------------- | -------- | ---------- |
| <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white">          | `15.1.7` | App Router |
| <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=black">              | `19.0.0` |
| <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white">    | `5`      |
| <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"> | `3.4.1`  |

## ⚙️ Setup & Usage

```bash
# Install Packages
npm install

# Run Frontend Server
npm run dev
```
