# 🚀 Currency6 프로젝트 개발 규칙

## 📋 개발 원칙

작업 완료 및 재확인 단계
코딩과 테스트를 마친 후, 커서의 채팅창에 다음과 같은 메시지를 입력해줘.

"이 코드 블록을 검토해 줘. 잠재적인 버그나 개선할 점이 있을까? 이게 지금 최선일까?"

커밋과 푸시 단계
코딩과 테스트를 마치고 재확인 단계후, 문제가 없다면 다음과 같은 메시지를 입력해줘.

"작업을 커밋하고 푸시해 줘. 커밋 메시지는 ,,,,,"

### TDD (Test-Driven Development) 필수 준수
- **Red → Green → Refactor** 사이클을 엄격히 따름
- 각 기능 구현 전 반드시 실패하는 테스트 먼저 작성
- 테스트 통과 후 코드 리팩토링 진행
- 모든 단계 완료 후 테스트 실행 및 커밋

### 코드 품질 기준
- TypeScript 사용 필수 (타입 안정성 보장)
- 가독성 우선, 성능은 적절한 수준 유지
- 완전한 기능 구현 (TODO, placeholder 금지)
- 보안 모범 사례 준수

## 🎯 프로젝트 구조 및 아키텍처

### 폴더 구조 준수
```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
├── hooks/              # 커스텀 React 훅
├── services/           # API 서비스 및 비즈니스 로직
├── types/              # TypeScript 타입 정의
├── utils/              # 유틸리티 함수
└── App.tsx            # 메인 앱 컴포넌트
```

### 컴포넌트 설계 원칙
- 단일 책임 원칙 준수
- Props 인터페이스 명확히 정의
- 재사용 가능한 컴포넌트 설계
- CSS Modules 또는 Styled Components 사용

## 🔌 API 연동 규칙

### 다중 API 장애 복구 시스템
- **1순위**: ExchangeRate-API (주 API)
- **2순위**: CurrencyAPI (장애 복구용)
- API 전환 관리자 (`apiManager.ts`) 구현 필수
- 자동 장애 감지 및 복구 로직 구현
- API 상태 모니터링 시스템 구축

### API 훅 설계
- `useExchangeRate` 훅에서 다중 API 지원
- 에러 핸들링 및 로딩 상태 관리
- API 전환 시 데이터 일관성 보장

## 🎨 UI/UX 디자인 규칙

### 색상 시스템
- **메인 배경**: 레몬색 (#FFEB3B)
- **메인 컨테이너**: 흰색, 둥근 모서리, 그림자
- **통화별 차트 색상**:
  - USD: 파랑 (#007BFF)
  - EUR: 초록 (#28A745)
  - JPY: 노랑 (#FFC107)
  - CNY: 빨강 (#DC3545)

### 반응형 디자인
- 모바일 우선 접근법
- 데스크톱, 태블릿, 모바일 모두 지원
- CSS Grid 및 Flexbox 활용

## 🧪 테스트 규칙

### 테스트 코드 작성 기준
- 각 컴포넌트별 단위 테스트 필수
- 통합 테스트로 전체 플로우 검증
- API 모킹을 통한 외부 의존성 격리
- 사용자 시나리오 기반 테스트

### 테스트 실행 순서
1. 단위 테스트 실행 (`npm test`)
2. 통합 테스트 실행
3. 브라우저에서 수동 테스트
4. 모든 테스트 통과 시 커밋

## 📱 기능 구현 우선순위

### 1단계: 프로젝트 초기 설정
- React + TypeScript 프로젝트 생성
- 기본 폴더 구조 및 의존성 설치
- 환경변수 설정

### 2단계: 기본 레이아웃
- 레몬색 배경 및 흰색 컨테이너
- 반응형 그리드 시스템

### 3단계: 환율 정보 카드
- 4개 통화 카드 (USD, EUR, JPY, CNY)
- 카드 스타일링 및 정보 표시

### 4단계: 실시간 환율 API 연동
- 다중 API 연동 및 장애 복구
- useExchangeRate 훅 구현

### 5단계: 환율 차트 (2x2 그리드)
- Chart.js 기반 차트 구현
- 4개 차트를 2x2 그리드로 배치

### 6단계: 환차손익 계산기
- 입력 필드 및 계산 로직
- 결과 표시 (이익/손해 구분)

### 7단계: 통합 테스트 및 최적화
- 전체 기능 통합 테스트
- 성능 최적화 및 접근성 개선

### 8단계: 배포 및 문서화
- 프로덕션 빌드
- README.md 최종 업데이트

## 🔄 개발 워크플로우

### 각 단계별 체크리스트
1. 테스트 코드 작성 (Red)
2. 기능 구현 (Green)
3. 코드 리팩토링 (Refactor)
4. 테스트 실행 및 통과 확인
5. 브라우저에서 기능 동작 확인
6. 코드 커밋 및 푸시
7. 다음 단계 진행

### 문제 발생 시 대응
- 에러 메시지 분석
- 개발자 도구 콘솔 확인
- 네트워크 탭에서 API 호출 상태 확인
- 필요시 이전 단계로 롤백

## 📚 문서화 규칙

### README.md 업데이트
- 새로운 기능 추가/변경 시 즉시 업데이트
- 설치 및 실행 방법 명시
- 환경변수 설정 가이드 포함
- API 키 설정 방법 안내

### 코드 주석
- 복잡한 로직에 대한 명확한 주석
- API 연동 부분 상세 설명
- 장애 복구 로직 설명

## 🚨 주의사항

### 보안
- API 키를 소스코드에 하드코딩 금지
- 환경변수 파일 (.env) 사용
- .gitignore에 .env 파일 포함

### 성능
- 불필요한 리렌더링 방지
- 메모이제이션 적절히 활용
- API 호출 최적화

### 접근성
- ARIA 라벨 사용
- 키보드 네비게이션 지원
- 색상 대비 고려

## 🎯 최종 목표

사용자가 웹사이트에 접속했을 때:
1. **레몬색 배경**에 **흰색 컨테이너**가 중앙에 표시
2. **4개 환율 카드**가 가로로 나란히 배치
3. **2x2 그리드**로 **4개 환율 차트** 표시
4. **환차손익 계산기**로 손익 계산 가능
5. **직관적이고 아름다운 UI/UX** 제공

각 단계를 성공적으로 완료하면, 초보자도 쉽게 사용할 수 있는 전문적인 환율 정보 서비스가 완성됩니다!

**1. src/__tests__/services/exchangeRateAPI.test.js:**
```javascript
import { fetchExchangeRate } from '../../services/exchangeRateAPI.js';

describe('ExchangeRate API', () => {
  test('should fetch USD to KRW exchange rate', async () => {
    const rate = await fetchExchangeRate('USD', 'KRW');
    expect(rate).toBeDefined();
    expect(typeof rate).toBe('number');
    expect(rate).toBeGreaterThan(0);
  });

  test('should handle invalid currency pair', async () => {
    await expect(fetchExchangeRate('INVALID', 'KRW')).rejects.toThrow();
  });
});
```

**2. src/services/exchangeRateAPI.js:**
```javascript
// ExchangeRate API 서비스
export async function fetchExchangeRate(fromCurrency, toCurrency) {
  try {
    // 1순위 API: ExchangeRate-API
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    const data = await response.json();
    const rate = data.rates[toCurrency];
    
    if (!rate) {
      throw new Error(`지원하지 않는 통화: ${toCurrency}`);
    }
    
    return rate;
  } catch (error) {
    console.error('환율 조회 실패:', error);
    throw error;
  }
}
```

**3. index.html:**
```html
<code_block_to_apply_changes_from>
```

**4. src/main.js:**
```javascript
import { fetchExchangeRate } from './services/exchangeRateAPI.js';

// 전역 함수로 등록 (HTML에서 호출하기 위해)
window.runTests = async function() {
    const resultsDiv = document.getElementById('testResults');
    resultsDiv.innerHTML = '테스트 실행 중...';
    
    try {
        // 간단한 테스트 실행
        const rate = await fetchExchangeRate('USD', 'KRW');
        
        if (rate && typeof rate === 'number' && rate > 0) {
            resultsDiv.innerHTML = `
                ✅ 테스트 통과!<br>
                USD → KRW 환율: ${rate.toFixed(2)}
            `;
        } else {
            resultsDiv.innerHTML = '❌ 테스트 실패: 예상과 다른 결과';
        }
    } catch (error) {
        resultsDiv.innerHTML = `❌ 테스트 실패: ${error.message}`;
    }
};

window.testExchangeRate = async function() {
    const resultDiv = document.getElementById('exchangeRateResult');
    resultDiv.innerHTML = '환율 조회 중...';
    
    try {
        const rate = await fetchExchangeRate('USD', 'KRW');
        resultDiv.innerHTML = `
            💱 USD → KRW 환율: ${rate.toFixed(2)}<br>
            📅 조회 시간: ${new Date().toLocaleString()}
        `;
    } catch (error) {
        resultDiv.innerHTML = `❌ 오류: ${error.message}`;
    }
};
```

이제 파일들이 제대로 작성되었습니다! 

**테스트 실행:**
```bash
npm test
```

**웹 서버 실행:**
```bash
npm run dev
```

이제 웹에서 환율 서비스를 테스트할 수 있습니다! 🎉
