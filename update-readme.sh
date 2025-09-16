#!/bin/bash

# GitHub README 업데이트 스크립트
# 사용법: ./update-readme.sh [owner] [repo] [branch]

echo "🚀 GitHub README 자동 업데이트 도구"
echo "================================="

# 스크립트가 있는 디렉토리로 이동
cd "$(dirname "$0")"

# Node.js가 설치되어 있는지 확인
if ! command -v node &> /dev/null; then
    echo "❌ Node.js가 설치되어 있지 않습니다."
    echo "💡 https://nodejs.org 에서 Node.js를 설치하세요."
    exit 1
fi

# 스크립트 실행
node update-readme.js "$@"

echo ""
echo "🎉 작업 완료!"