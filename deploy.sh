#!/bin/bash

echo "🚀 배포 시작..."

# 빌드
echo "📦 빌드 중..."
npm run build

# 빌드 성공 확인
if [ $? -eq 0 ]; then
    echo "✅ 빌드 성공!"
    
    # 배포 폴더 확인
    echo "📁 배포 파일 확인:"
    ls -la dist/
    
    # 번들 크기 확인
    echo "�� 번들 크기:"
    du -sh dist/assets/*
    
    echo "🎯 배포 완료!"
else
    echo "❌ 빌드 실패!"
    exit 1
fi
