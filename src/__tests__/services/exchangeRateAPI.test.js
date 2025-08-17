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
