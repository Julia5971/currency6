export function calculateProfitLoss(purchaseRate, amount, currentRate) {
  // 입력 검증
  validateInputs(purchaseRate, amount, currentRate);

  // 손익 계산
  const { purchaseValue, currentValue, difference } = calculateValues(purchaseRate, amount, currentRate);
  
  // 결과 반환
  return generateResult(difference, purchaseValue);
}

// 입력 검증 함수 분리
function validateInputs(purchaseRate, amount, currentRate) {
  if (purchaseRate <= 0) {
    throw new Error('매입 환율은 0보다 커야 합니다');
  }
  if (amount <= 0) {
    throw new Error('환전 금액은 0보다 커야 합니다');
  }
  if (currentRate <= 0) {
    throw new Error('현재 환율은 0보다 커야 합니다');
  }
}

// 값 계산 함수 분리
function calculateValues(purchaseRate, amount, currentRate) {
  const purchaseValue = purchaseRate * amount;
  const currentValue = currentRate * amount;
  const difference = currentValue - purchaseValue;
  
  return { purchaseValue, currentValue, difference };
}

// 결과 생성 함수 분리
function generateResult(difference, purchaseValue) {
  if (difference > 0) {
    return createProfitResult(difference, purchaseValue);
  } else if (difference < 0) {
    return createLossResult(difference, purchaseValue);
  } else {
    return createBreakEvenResult();
  }
}

// 이익 결과 생성
function createProfitResult(difference, purchaseValue) {
  const profitRate = ((difference / purchaseValue) * 100);
  return {
    profit: Math.round(difference),
    profitRate: Math.round(profitRate * 100) / 100,
    loss: 0,
    lossRate: 0,
    status: 'profit',
    message: `👍 이익: ${Math.round(difference).toLocaleString()}원 (${Math.round(profitRate * 100) / 100}%)`
  };
}

// 손해 결과 생성
function createLossResult(difference, purchaseValue) {
  const lossRate = ((Math.abs(difference) / purchaseValue) * 100);
  return {
    profit: 0,
    profitRate: 0,
    loss: Math.round(Math.abs(difference)),
    lossRate: Math.round(lossRate * 100) / 100,
    status: 'loss',
    message: `👎 손해: ${Math.round(Math.abs(difference)).toLocaleString()}원 (${Math.round(lossRate * 100) / 100}%)`
  };
}

// 손익분기 결과 생성
function createBreakEvenResult() {
  return {
    profit: 0,
    profitRate: 0,
    loss: 0,
    lossRate: 0,
    status: 'break-even',
    message: '⚖️ 손익분기: 이익도 손해도 없습니다'
  };
}
