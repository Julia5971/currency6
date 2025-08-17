// Jest에서 fetch 모킹
global.fetch = jest.fn();

// fetch 모킹 함수
global.fetch.mockImplementation((url) => {
  // INVALID 통화일 때 오류 반환
  if (url.includes('INVALID')) {
    return Promise.resolve({
      ok: false,
      status: 400
    });
  }
  
  // 정상 통화일 때 성공 응답
  return Promise.resolve({
    ok: true,
    json: async () => ({
      rates: {
        KRW: 1387.78,
        USD: 1.0
      }
    })
  });
});
