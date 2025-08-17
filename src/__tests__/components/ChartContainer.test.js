const { renderChart } = require('../../components/ExchangeRateChart.js');

describe('Chart Container', () => {
  test('should render chart in HTML container', () => {
    // HTML에 차트 컨테이너 추가
    document.body.innerHTML = '<div id="chartContainer"></div>';
    
    const chartData = [
      { date: '2025-08-15', rate: 1380 },
      { date: '2025-08-16', rate: 1385 },
      { date: '2025-08-17', rate: 1387.78 }
    ];
    
    const chart = renderChart('chartContainer', chartData);
    expect(chart).toBeDefined();
    expect(document.getElementById('chartContainer')).toBeTruthy();
    
    // canvas가 생성되었는지 확인
    const canvas = document.querySelector('#chartContainer canvas');
    expect(canvas).toBeTruthy();
    expect(canvas.id).toBe('exchangeRateChart');
  });
});
