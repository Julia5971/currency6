import { fetchExchangeRate } from './services/exchangeRateAPI.js';
import { renderChart, renderChartGrid } from './components/ExchangeRateChart.js';
import { calculateProfitLoss } from './components/ProfitLossCalculator.js';

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

// 환차손익 계산 함수 추가
window.calculateProfitLoss = async function() {
    const purchaseRate = parseFloat(document.getElementById('purchaseRate').value);
    const amount = parseFloat(document.getElementById('amount').value);
    
    const resultDiv = document.getElementById('profitLossResult');
    
    // 입력 검증
    if (!purchaseRate || !amount) {
        resultDiv.innerHTML = '<div style="color: #DC3545; padding: 15px; background: #F8D7DA; border-radius: 6px;">❌ 매입 환율과 환전 금액을 모두 입력해주세요.</div>';
        return;
    }
    
    try {
        // 현재 USD → KRW 환율 가져오기
        const currentRate = await fetchExchangeRate('USD', 'KRW');
        
        // 환차손익 계산
        const result = calculateProfitLoss(purchaseRate, amount, currentRate);
        
        // 결과 표시
        let resultHTML = '';
        if (result.status === 'profit') {
            resultHTML = `<div style="color: #28A745; font-size: 18px; font-weight: bold; padding: 15px; background: #D4EDDA; border-radius: 6px; text-align: center;">${result.message}</div>`;
        } else if (result.status === 'loss') {
            resultHTML = `<div style="color: #DC3545; font-size: 18px; font-weight: bold; padding: 15px; background: #F8D7DA; border-radius: 6px; text-align: center;">${result.message}</div>`;
        } else {
            resultHTML = `<div style="color: #6C757D; font-size: 18px; font-weight: bold; padding: 15px; background: #E2E3E5; border-radius: 6px; text-align: center;">${result.message}</div>`;
        }
        
        // 상세 정보 추가
        resultHTML += `
            <div style="margin-top: 15px; padding: 20px; background: #F8F9FA; border-radius: 6px; border: 1px solid #E9ECEF;">
                <h4 style="margin-top: 0; color: #495057;">📊 계산 상세 정보</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div><strong>매입 환율:</strong> ${purchaseRate.toLocaleString()}원</div>
                    <div><strong>환전 금액:</strong> ${amount.toLocaleString()}달러</div>
                    <div><strong>현재 환율:</strong> ${currentRate.toLocaleString()}원</div>
                    <div><strong>매입 가치:</strong> ${(purchaseRate * amount).toLocaleString()}원</div>
                    <div><strong>현재 가치:</strong> ${(currentRate * amount).toLocaleString()}원</div>
                    <div><strong>차이:</strong> ${Math.abs((currentRate - purchaseRate) * amount).toLocaleString()}원</div>
                </div>
            </div>
        `;
        
        resultDiv.innerHTML = resultHTML;
        
    } catch (error) {
        resultDiv.innerHTML = `<div style="color: #DC3545; padding: 15px; background: #F8D7DA; border-radius: 6px;">❌ 오류: ${error.message}</div>`;
    }
};
