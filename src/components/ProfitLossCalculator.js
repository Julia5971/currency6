export function calculateProfitLoss(purchaseRate, amount, currentRate) {
  // 입력 검증
  if (purchaseRate <= 0) {
    throw new Error('매입 환율은 0보다 커야 합니다');
  }
  if (amount <= 0) {
    throw new Error('환전 금액은 0보다 커야 합니다');
  }
  if (currentRate <= 0) {
    throw new Error('현재 환율은 0보다 커야 합니다');
  }

  // 손익 계산
  const purchaseValue = purchaseRate * amount;
  const currentValue = currentRate * amount;
  const difference = currentValue - purchaseValue;

  if (difference > 0) {
    // 이익
    const profitRate = ((difference / purchaseValue) * 100);
    return {
      profit: Math.round(difference),
      profitRate: Math.round(profitRate * 100) / 100,
      loss: 0,
      lossRate: 0,
      status: 'profit',
      message: `👍 이익: ${Math.round(difference).toLocaleString()}원 (${Math.round(profitRate * 100) / 100}%)`
    };
  } else if (difference < 0) {
    // 손해
    const lossRate = ((Math.abs(difference) / purchaseValue) * 100);
    return {
      profit: 0,
      profitRate: 0,
      loss: Math.round(Math.abs(difference)),
      lossRate: Math.round(lossRate * 100) / 100,
      status: 'loss',
      message: `👎 손해: ${Math.round(Math.abs(difference)).toLocaleString()}원 (${Math.round(lossRate * 100) / 100}%)`
    };
  } else {
    // 손익분기
    return {
      profit: 0,
      profitRate: 0,
      loss: 0,
      lossRate: 0,
      status: 'break-even',
      message: '⚖️ 손익분기: 이익도 손해도 없습니다'
    };
  }
}
