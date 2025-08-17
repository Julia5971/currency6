const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Production Build and Deployment', () => {
  test('should build successfully without errors', () => {
    // 빌드 명령어 실행
    const buildResult = execSync('npm run build', { encoding: 'utf8' });
    
    // 빌드 성공 확인
    expect(buildResult).toBeDefined();
    expect(buildResult).not.toContain('ERROR');
    expect(buildResult).not.toContain('FAILED');
  });

  test('should generate dist folder with required files', () => {
    // dist 폴더 존재 확인
    const distPath = path.join(__dirname, '../../../dist');
    expect(fs.existsSync(distPath)).toBe(true);
    
    // 필수 파일들 확인
    const requiredFiles = ['index.html', 'assets'];
    requiredFiles.forEach(file => {
      const filePath = path.join(distPath, file);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  test('should have optimized bundle size', () => {
    const distPath = path.join(__dirname, '../../../dist');
    const assetsPath = path.join(distPath, 'assets');
    
    if (fs.existsSync(assetsPath)) {
      const files = fs.readdirSync(assetsPath);
      const jsFiles = files.filter(file => file.endsWith('.js'));
      
      jsFiles.forEach(file => {
        const filePath = path.join(assetsPath, file);
        const stats = fs.statSync(filePath);
        const fileSizeInKB = stats.size / 1024;
        
        // 번들 크기가 1MB 이하여야 함
        expect(fileSizeInKB).toBeLessThan(1024);
      });
    }
  });

  test('should have valid HTML structure', () => {
    const distPath = path.join(__dirname, '../../../dist');
    const indexPath = path.join(distPath, 'index.html');
    
    if (fs.existsSync(indexPath)) {
      const htmlContent = fs.readFileSync(indexPath, 'utf8');
      
      // HTML 구조 검증
      expect(htmlContent).toContain('<!DOCTYPE html>');
      expect(htmlContent).toContain('<title>');
      expect(htmlContent).toContain('<script');
      expect(htmlContent).toContain('실시간 환율 정보 및 분석 서비스');
    }
  });

  test('should have environment variables configured', () => {
    // 환경변수 파일 확인
    const envPath = path.join(__dirname, '../../../.env');
    const envExamplePath = path.join(__dirname, '../../../.env.example');
    
    // .env.example 파일이 존재해야 함
    expect(fs.existsSync(envExamplePath)).toBe(true);
    
    // .env.example에 필수 환경변수가 정의되어 있어야 함
    if (fs.existsSync(envExamplePath)) {
      const envContent = fs.readFileSync(envExamplePath, 'utf8');
      expect(envContent).toContain('VITE_EXCHANGE_RATE_API_KEY');
      expect(envContent).toContain('VITE_EXCHANGE_RATE_API_BASE_URL');
    }
  });
});
