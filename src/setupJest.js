// Jest 전역 설정
global.fetch = jest.fn();

// fetch 모킹 기본값 설정
global.fetch.mockImplementation((url) => {
  // URL에서 통화 추출
  const fromCurrency = url.split('/').pop();
  
  // 잘못된 통화인 경우 404 에러 시뮬레이션
  if (fromCurrency === 'INVALID' || fromCurrency === '') {
    return Promise.resolve({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });
  }
  
  // 정상적인 응답
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      rates: {
        KRW: 1387.78,
        USD: 1,
        EUR: 0.85,
        JPY: 110.5,
        CNY: 6.45
      }
    })
  });
});

// Chart.js 모킹
global.Chart = jest.fn().mockImplementation(() => ({
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  options: {},
  destroy: jest.fn()
}));
