import { fetchExchangeRate } from './services/exchangeRateAPI.js';
import { renderChart } from './components/ExchangeRateChart.js';

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

window.renderExchangeRateChart = async function() {
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.innerHTML = '차트 렌더링 중...';
    
    try {
        // Canvas 요소가 존재하는지 확인
        let canvas = document.getElementById('exchangeRateChart');
        
        // Canvas 요소가 없다면 생성
        if (!canvas) {
            console.log('Canvas 요소를 생성합니다...');
            canvas = document.createElement('canvas');
            canvas.id = 'exchangeRateChart';
            canvas.width = 800;
            canvas.height = 400;
            canvas.style.display = 'block';
            canvas.style.margin = '0 auto';
            chartContainer.appendChild(canvas);
        }
        
        // 샘플 데이터로 차트 렌더링
        const chartData = [
            { date: '2025-08-15', rate: 1380 },
            { date: '2025-08-16', rate: 1385 },
            { date: '2025-08-17', rate: 1387.78 }
        ];
        
        const chart = renderChart('exchangeRateChart', chartData);
        
        // 차트 렌더링 후 성공 메시지 추가
        const successMsg = document.createElement('div');
        successMsg.innerHTML = '✅ 차트가 성공적으로 렌더링되었습니다!';
        successMsg.style.color = 'green';
        successMsg.style.marginTop = '10px';
        chartContainer.appendChild(successMsg);
        
    } catch (error) {
        console.error('차트 렌더링 오류:', error);
        chartContainer.innerHTML = `❌ 차트 렌더링 실패: ${error.message}`;
    }
};
