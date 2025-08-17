import { fetchExchangeRate } from './services/exchangeRateAPI.js';
import { renderChart, renderChartGrid } from './components/ExchangeRateChart.js';

// 불필요한 testFunction 제거
// window.testFunction = function() { ... } 삭제

// 핵심 기능만 유지
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

// 핵심 기능만 유지
window.renderChartGrid = async function() {
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.innerHTML = 'USD, EUR, JPY, CNY 환율 차트 렌더링 중...';
    
    try {
        // renderChartGrid 함수 호출
        renderChartGrid('chartContainer');
        
        // 성공 메시지
        const successMsg = document.createElement('div');
        successMsg.innerHTML = '✅ 4개 통화 환율 차트가 2x2 그리드로 표시되었습니다!';
        successMsg.style.color = 'green';
        successMsg.style.marginTop = '10px';
        chartContainer.appendChild(successMsg);
        
    } catch (error) {
        console.error('그리드 차트 렌더링 오류:', error);
        chartContainer.innerHTML = `❌ 그리드 차트 렌더링 실패: ${error.message}`;
    }
};

// TDD 테스트 실행 함수 수정
window.runTests = async function() {
    const resultsDiv = document.getElementById('testResults');
    if (!resultsDiv) {
        console.error('testResults 요소를 찾을 수 없습니다');
        return;
    }
    
    resultsDiv.innerHTML = '테스트 실행 중...';
    
    try {
        // 간단한 테스트 실행
        const rate = await fetchExchangeRate('USD', 'KRW');
        
        if (rate && typeof rate === 'number' && rate > 0) {
            resultsDiv.innerHTML = `
                ✅ 테스트 통과!<br>
                USD → KRW 환율: ${rate.toFixed(2)}<br>
                📅 테스트 시간: ${new Date().toLocaleString()}
            `;
        } else {
            resultsDiv.innerHTML = '❌ 테스트 실패: 예상과 다른 결과';
        }
    } catch (error) {
        console.error('테스트 실행 오류:', error);
        resultsDiv.innerHTML = `❌ 테스트 실패: ${error.message}`;
    }
};
