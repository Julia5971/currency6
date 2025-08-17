const { renderChart } = require('../../components/ExchangeRateChart.js');

describe('ExchangeRate Chart', () => {
  test('should render chart with exchange rate data', () => {
    const chartData = [
      { date: '2025-08-15', rate: 1380 },
      { date: '2025-08-16', rate: 1385 },
      { date: '2025-08-17', rate: 1387.78 }
    ];
    
    const chart = renderChart('chartContainer', chartData);
    expect(chart).toBeDefined();
    expect(chart.data.datasets[0].data).toHaveLength(3);
  });
});
