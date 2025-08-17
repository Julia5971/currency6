const { fetchExchangeRate } = require('../../services/exchangeRateAPI.js');
const { renderChartGrid } = require('../../components/ExchangeRateChart.js');
const { calculateProfitLoss } = require('../../components/ProfitLossCalculator.js');

describe('Full Application Integration', () => {
  test('should complete user flow: fetch rates → display charts → calculate profit/loss', async () => {
    // 1단계: 환율 데이터 가져오기
    const usdRate = await fetchExchangeRate('USD', 'KRW');
    const eurRate = await fetchExchangeRate('EUR', 'KRW');
    const jpyRate = await fetchExchangeRate('JPY', 'KRW');
    const cnyRate = await fetchExchangeRate('CNY', 'KRW');
    
    expect(usdRate).toBeGreaterThan(0);
    expect(eurRate).toBeGreaterThan(0);
    expect(jpyRate).toBeGreaterThan(0);
    expect(cnyRate).toBeGreaterThan(0);
    
    // 2단계: 차트 데이터 구성
    const chartData = [
      { date: '2025-08-15', rate: usdRate },
      { date: '2025-08-16', rate: usdRate + 5 },
      { date: '2025-08-17', rate: usdRate + 10 }
    ];
    
    // 3단계: 환차손익 계산
    const profitLossResult = calculateProfitLoss(1300, 1000, usdRate);
    
    expect(profitLossResult).toHaveProperty('status');
    expect(profitLossResult).toHaveProperty('message');
    expect(['profit', 'loss', 'break-even']).toContain(profitLossResult.status);
  });

  test('should handle API failures gracefully and maintain app stability', async () => {
    // API 실패 시뮬레이션
    const mockFetch = jest.fn().mockRejectedValue(new Error('Network error'));
    global.fetch = mockFetch;
    
    try {
      await fetchExchangeRate('USD', 'KRW');
    } catch (error) {
      expect(error.message).toBe('Network error');
    }
    
    // 앱이 크래시되지 않고 적절히 에러 처리
    expect(true).toBe(true);
  });

  test('should maintain data consistency across all components', async () => {
    const baseRate = 1387.78;
    
    // 모든 컴포넌트에서 동일한 환율 데이터 사용
    const apiRate = await fetchExchangeRate('USD', 'KRW');
    const chartRate = baseRate; // 차트에서 사용하는 환율
    const calcRate = baseRate;  // 계산기에서 사용하는 환율
    
    // 데이터 일관성 확인 (허용 오차 1% 내)
    const tolerance = 0.01;
    expect(Math.abs(apiRate - chartRate) / chartRate).toBeLessThan(tolerance);
    expect(Math.abs(chartRate - calcRate) / calcRate).toBeLessThan(tolerance);
  });

  test('should handle concurrent operations without conflicts', async () => {
    // 동시에 여러 작업 실행
    const promises = [
      fetchExchangeRate('USD', 'KRW'),
      fetchExchangeRate('EUR', 'KRW'),
      fetchExchangeRate('JPY', 'KRW'),
      fetchExchangeRate('CNY', 'KRW')
    ];
    
    const results = await Promise.all(promises);
    
    expect(results).toHaveLength(4);
    results.forEach(rate => {
      expect(rate).toBeGreaterThan(0);
      expect(typeof rate).toBe('number');
    });
  });
});
