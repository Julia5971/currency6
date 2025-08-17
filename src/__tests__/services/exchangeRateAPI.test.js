const { fetchExchangeRate } = require('../../services/exchangeRateAPI.js');

describe('ExchangeRate API', () => {
  test('should fetch USD to KRW exchange rate', async () => {
    const rate = await fetchExchangeRate('USD', 'KRW');
    expect(rate).toBeDefined();
    expect(typeof rate).toBe('number');
    expect(rate).toBeGreaterThan(0);
  });

  test('should handle unsupported target currency', async () => {
    // 지원하지 않는 대상 통화에 대해 에러가 발생하는지 확인
    await expect(fetchExchangeRate('USD', 'INVALID')).rejects.toThrow('지원하지 않는 통화: INVALID');
  });

  test('should handle empty currency parameters', async () => {
    // 빈 통화 파라미터에 대해 에러가 발생하는지 확인
    await expect(fetchExchangeRate('', '')).rejects.toThrow();
  });

  test('should handle network errors gracefully', async () => {
    // 네트워크 오류 시 적절히 처리하는지 확인
    // fetch 모킹을 사용하여 네트워크 오류 시뮬레이션
    global.fetch.mockImplementationOnce(() => 
      Promise.reject(new Error('Network error'))
    );
    
    await expect(fetchExchangeRate('USD', 'KRW')).rejects.toThrow('Network error');
  });
});
