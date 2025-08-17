// Chart.js 모킹
class MockChart {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = config;
    this.data = config.data;
    this.options = config.options;
  }
  
  destroy() {
    // 차트 제거 로직
  }
  
  update() {
    // 차트 업데이트 로직
  }
}

export default MockChart;
