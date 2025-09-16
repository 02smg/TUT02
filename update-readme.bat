@echo off
REM GitHub README 업데이트 스크립트 (Windows용)
REM 사용법: update-readme.bat [owner] [repo] [branch]

echo 🚀 GitHub README 자동 업데이트 도구
echo =================================

REM 스크립트가 있는 디렉토리로 이동
cd /d "%~dp0"

REM Node.js가 설치되어 있는지 확인
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js가 설치되어 있지 않습니다.
    echo 💡 https://nodejs.org 에서 Node.js를 설치하세요.
    pause
    exit /b 1
)

REM 스크립트 실행
node update-readme.js %*

echo.
echo 🎉 작업 완료!
pause