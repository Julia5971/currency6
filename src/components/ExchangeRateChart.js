const Chart = require('chart.js/auto');

function renderChart(containerId, data) {
  const ctx = document.getElementById(containerId);
  
  return new Chart(ctx, {
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

module.exports = { renderChart };
