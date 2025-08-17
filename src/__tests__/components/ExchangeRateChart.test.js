const { renderChart } = require('../../components/ExchangeRateChart.js');

describe('ExchangeRate Chart', () => {
  test('should render chart with exchange rate data', () => {
    // HTML에 차트 컨테이너 추가
    document.body.innerHTML = '<div id="testChartContainer"></div>';
    
    const chartData = [
      { date: '2025-08-15', rate: 1380 },
      { date: '2025-08-16', rate: 1385 },
      { date: '2025-08-17', rate: 1387.78 }
    ];
    
    const chart = renderChart('testChartContainer', chartData);
    expect(chart).toBeDefined();
    
    // 차트 데이터가 올바르게 설정되었는지 확인
    expect(chart.data.labels).toEqual(['2025-08-15', '2025-08-16', '2025-08-17']);
    expect(chart.data.datasets[0].data).toEqual([1380, 1385, 1387.78]);
  });

  test('should throw error for non-existent container', () => {
    expect(() => {
      renderChart('nonExistentContainer', []);
    }).toThrow('컨테이너를 찾을 수 없습니다: nonExistentContainer');
  });
});
