// ExchangeRate API 서비스
async function fetchExchangeRate(fromCurrency, toCurrency) {
  try {
    // 1순위 API: ExchangeRate-API
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    
    const data = await response.json();
    const rate = data.rates[toCurrency];
    
    if (!rate) {
      throw new Error(`지원하지 않는 통화: ${toCurrency}`);
    }
    
    return rate;
  } catch (error) {
    console.error('환율 조회 실패:', error);
    throw error;
  }
}

module.exports = { fetchExchangeRate };
