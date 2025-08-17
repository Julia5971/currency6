// Jest에서 fetch 모킹
global.fetch = jest.fn();

// 기본 fetch 응답 모킹
global.fetch.mockResolvedValue({
  ok: true,
  json: async () => ({
    rates: {
      KRW: 1387.78,
      USD: 1.0
    }
  })
});
