import Chart from 'chart.js/auto';

export function renderChart(containerId, data) {
  // 컨테이너 요소 찾기
  const container = document.getElementById(containerId);
  
  if (!container) {
    throw new Error(`컨테이너를 찾을 수 없습니다: ${containerId}`);
  }
  
  // 기존 canvas 제거
  const existingCanvas = container.querySelector('canvas');
  if (existingCanvas) {
    existingCanvas.remove();
  }
  
  // 새로운 canvas 생성
  const canvas = document.createElement('canvas');
  canvas.id = 'exchangeRateChart';
  container.appendChild(canvas);
  
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
