import Chart from 'chart.js/auto';

// 기존 renderChart 함수 export 추가
export function renderChart(containerId, data) {
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
  canvas.width = 800;
  canvas.height = 400;
  canvas.style.display = 'block';
  canvas.style.margin = '0 auto';
  container.appendChild(canvas);
  
  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.map(item => item.date),
      datasets: [{
        label: 'USD → KRW 환율',
        data: data.map(item => item.rate),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#4CAF50',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(0,0,0,0.1)'
          }
        },
        x: {
          grid: {
            color: 'rgba(0,0,0,0.1)'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    }
  });
}

// 2x2 그리드 차트 함수 수정
export function renderChartGrid(containerId) {
  const container = document.getElementById(containerId);
  
  if (!container) {
    throw new Error(`컨테이너를 찾을 수 없습니다: ${containerId}`);
  }
  
  // 기존 내용 제거
  container.innerHTML = '';
  
  // 2x2 그리드 컨테이너 생성 - 높이 제한 추가
  const gridContainer = document.createElement('div');
  gridContainer.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 300px 300px;
    gap: 20px;
    width: 100%;
    height: 620px;
    overflow: hidden;
  `;
  
  // 4개 통화별 차트 생성
  const currencies = [
    { code: 'USD', color: '#007BFF', name: '미국 달러' },
    { code: 'EUR', color: '#28A745', name: '유럽 유로' },
    { code: 'JPY', color: '#FFC107', name: '일본 엔' },
    { code: 'CNY', color: '#DC3545', name: '중국 위안' }
  ];
  
  currencies.forEach((currency, index) => {
    const chartDiv = document.createElement('div');
    chartDiv.style.cssText = `
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      background: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      height: 100%;
    `;
    
    // 차트 제목
    const title = document.createElement('h3');
    title.textContent = `${currency.name} (${currency.code})`;
    title.style.cssText = `
      margin: 0 0 10px 0;
      color: ${currency.color};
      font-size: 16px;
      flex-shrink: 0;
    `;
    
    // Canvas 컨테이너
    const canvasContainer = document.createElement('div');
    canvasContainer.style.cssText = `
      flex: 1;
      width: 100%;
      position: relative;
      overflow: hidden;
    `;
    
    // Canvas 생성
    const canvas = document.createElement('canvas');
    canvas.id = `chart-${currency.code}`;
    canvas.width = 400;
    canvas.height = 250;
    canvas.style.cssText = `
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    `;
    
    canvasContainer.appendChild(canvas);
    chartDiv.appendChild(title);
    chartDiv.appendChild(canvasContainer);
    gridContainer.appendChild(chartDiv);
    
    // 차트 데이터 생성 (샘플 데이터)
    const chartData = [
      { date: '2025-08-15', rate: 1380 + Math.random() * 20 },
      { date: '2025-08-16', rate: 1385 + Math.random() * 20 },
      { date: '2025-08-17', rate: 1387.78 + Math.random() * 20 }
    ];
    
    // Chart.js로 차트 렌더링
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: chartData.map(item => item.date),
        datasets: [{
          label: `${currency.code} → KRW 환율`,
          data: chartData.map(item => item.rate),
          borderColor: currency.color,
          backgroundColor: `${currency.color}20`,
          borderWidth: 2,
          pointBackgroundColor: currency.color,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            grid: { color: 'rgba(0,0,0,0.1)' }
          },
          x: {
            grid: { color: 'rgba(0,0,0,0.1)' }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  });
  
  container.appendChild(gridContainer);
}
