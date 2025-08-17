import Chart from 'chart.js/auto';

export function renderChart(containerId, data) {
  // canvas 요소 직접 사용
  const canvas = document.getElementById('exchangeRateChart');
  
  if (!canvas) {
    throw new Error('Canvas 요소를 찾을 수 없습니다');
  }
  
  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.map(item => item.date),
      datasets: [{
        label: 'USD → KRW 환율',
        data: data.map(item => item.rate),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}
