const { fetchExchangeRate } = require('./services/exchangeRateAPI.js');

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
