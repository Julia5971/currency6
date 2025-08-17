# 📈 실시간 환율 정보 및 분석 서비스

## 🎯 프로젝트 개요

초보자도 쉽게 이해하고 활용할 수 있는 실시간 환율 정보 및 분석 웹 서비스입니다. 환율 변동을 직관적으로 보여주고, 환전 시 예상되는 손익을 자동으로 계산해주는 해외 투자/여행 준비 도우미입니다.

## ✨ 주요 기능

- **실시간 환율 조회**: 다중 API 연동으로 안정적인 환율 데이터 제공
  - 1순위: ExchangeRate-API
  - 2순위: CurrencyAPI (자동 장애 복구)
- **환율 흐름 분석**: 지난 한 달간의 환율 변동을 테이블과 그래프로 시각화
- **자동 환차손익 계산**: 매입 환율과 금액 입력 시 현재 환율과 비교하여 예상 손익 계산
- **지원 통화**: 미국 달러(USD), 일본 엔(JPY), 유럽 유로(EUR), 중국 위안(CNY)
- **고가용성**: API 장애 시 자동 전환으로 서비스 중단 방지

## 🎨 디자인 특징

- **메인 배경**: 레몬색 (#FFEB3B)
- **메인 컨테이너**: 흰색, 둥근 모서리, 부드러운 그림자
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **직관적 UI**: 색상과 이모티콘을 활용한 명확한 정보 전달

## 🚀 설치 및 실행

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 방법
```bash
# 저장소 클론
git clone [repository-url]
cd currency6

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 ExchangeRate-API 키 입력

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **차트**: Chart.js
- **스타일링**: CSS Modules 또는 Styled Components
- **API**: 
  - ExchangeRate-API (1순위)
  - CurrencyAPI (2순위, 장애 복구)
- **장애 복구**: 자동 API 전환 시스템
- **빌드 도구**: Vite 또는 Create React App

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── ExchangeRateCard/     # 환율 정보 카드
│   ├── ExchangeRateChart/    # 환율 차트
│   ├── ProfitLossCalculator/ # 환차손익 계산기
│   └── Layout/              # 레이아웃 컴포넌트
├── hooks/
│   └── useExchangeRate.ts   # 환율 API 훅 (다중 API 지원)
├── services/
│   ├── exchangeRateAPI.ts   # 1순위 API 서비스
│   ├── currencyAPI.ts       # 2순위 API 서비스
│   └── apiManager.ts        # API 전환 관리자
├── types/
│   └── exchange.ts          # 타입 정의
├── utils/
│   ├── calculations.ts      # 계산 유틸리티
│   └── failover.ts         # 장애 복구 유틸리티
└── App.tsx                  # 메인 앱 컴포넌트
```

## 🧪 개발 가이드

### TDD 개발 방식
1. **Red**: 실패하는 테스트 작성
2. **Green**: 테스트를 통과하는 최소한의 코드 작성
3. **Refactor**: 코드 개선 및 최적화

### 각 단계별 체크 포인트
각 개발 단계마다 브라우저에서 해당 기능이 정상 작동하는지 확인하고, 다음 단계로 진행합니다.

## 📝 환경변수

```env
# 1순위 API (ExchangeRate-API)
VITE_EXCHANGE_RATE_API_KEY=your_exchangerate_api_key_here
VITE_EXCHANGE_RATE_API_BASE_URL=https://api.exchangerate-api.com/v4

# 2순위 API (CurrencyAPI) - 장애 복구용
VITE_CURRENCY_API_KEY=your_currency_api_key_here
VITE_CURRENCY_API_BASE_URL=https://api.currencyapi.com/v3
```

## 🤝 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

```

커밋이 완료되었습니다! 🎉

이제 Vanilla JavaScript 기반으로 프로젝트를 생성할 준비가 되었습니다. 

다음 단계로 Vite를 사용해서 프로젝트를 생성하시겠습니까?

# Jest 및 필요한 패키지들 설치
npm install --save-dev jest @testing-library/jest-dom jsdom

# Jest 설정 파일 수동 생성

1. **jest.config.js:**
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js']
};
```

2. **package.json에 스크립트 추가:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

이렇게 수동으로 설정하는 것이 더 깔끔할 것 같습니다. 

진행하시겠습니까?

**jest.config.js 내용:**
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js']
};
```

**src/setupTests.js 내용:**
```javascript
import '@testing-library/jest-dom';
```

**package.json에 테스트 스크립트 추가:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

이제 Jest 환경이 완성되었습니다! 

**테스트 실행 확인:**
```bash
npm test
```

첫 번째 테스트를 작성할 준비가 되었습니다. 환율 API 훅부터 테스트를 시작하시겠습니까?
