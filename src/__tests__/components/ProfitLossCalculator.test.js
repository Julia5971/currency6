const { calculateProfitLoss } = require('../../components/ProfitLossCalculator.js');

describe('ProfitLossCalculator', () => {
  test('should calculate profit correctly when current rate is higher than purchase rate', () => {
    const result = calculateProfitLoss(1200, 1, 1300); // 1달러 기준
    
    expect(result.profit).toBe(100);
    expect(result.profitRate).toBe(8.33);
    expect(result.status).toBe('profit');
    expect(result.message).toContain('이익');
  });

  test('should calculate loss correctly when current rate is lower than purchase rate', () => {
    const result = calculateProfitLoss(1300, 1, 1200); // 1달러 기준
    
    expect(result.loss).toBe(100);
    expect(result.lossRate).toBe(7.69);
    expect(result.status).toBe('loss');
    expect(result.message).toContain('손해');
  });

  test('should handle break-even scenario', () => {
    const result = calculateProfitLoss(1200, 1000, 1200);
    
    expect(result.profit).toBe(0);
    expect(result.loss).toBe(0);
    expect(result.status).toBe('break-even');
    expect(result.message).toContain('손익분기');
  });

  test('should validate input parameters', () => {
    expect(() => calculateProfitLoss(0, 1000, 1200)).toThrow('매입 환율은 0보다 커야 합니다');
    expect(() => calculateProfitLoss(1200, 0, 1300)).toThrow('환전 금액은 0보다 커야 합니다');
    expect(() => calculateProfitLoss(1200, 1000, 0)).toThrow('현재 환율은 0보다 커야 합니다');
  });
});
