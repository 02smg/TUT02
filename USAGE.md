# GitHub README 자동 업데이트 도구 사용법

이 도구는 GitHub 저장소의 README.md 파일을 자동으로 가져와서 로컬 README.md 파일을 업데이트합니다.

## 🚀 사용 방법

### 1. Node.js를 사용한 직접 실행
```bash
node update-readme.js [owner] [repo] [branch]
```

**예시:**
```bash
# 기본값 사용 (02smg/TUT02, main 브랜치)
node update-readme.js

# 다른 저장소 지정
node update-readme.js microsoft vscode main

# 특정 브랜치 지정
node update-readme.js 02smg TUT02 develop
```

### 2. npm 스크립트 사용
```bash
npm run update
# 또는
npm run update-readme
```

### 3. 쉘 스크립트 사용 (Linux/Mac)
```bash
./update-readme.sh [owner] [repo] [branch]
```

### 4. 배치 파일 사용 (Windows)
```cmd
update-readme.bat [owner] [repo] [branch]
```

## 🔑 Private Repository 지원

Private Repository에 접근하려면 GitHub Personal Access Token이 필요합니다:

1. GitHub에서 Personal Access Token 생성
   - Settings → Developer settings → Personal access tokens → Generate new token
   - `repo` 권한 선택

2. 환경변수 설정:
   ```bash
   # Linux/Mac
   export GITHUB_TOKEN=ghp_your_token_here
   
   # Windows
   set GITHUB_TOKEN=ghp_your_token_here
   ```

3. 스크립트 실행:
   ```bash
   node update-readme.js owner private-repo
   ```

## 📋 기능

- ✅ Public Repository 자동 지원
- ✅ Private Repository 지원 (토큰 필요)
- ✅ 다양한 브랜치 지원
- ✅ 상세한 진행 상황 표시
- ✅ 에러 처리 및 도움말
- ✅ 크로스 플랫폼 지원 (Windows, Linux, Mac)

## 🛠️ 요구사항

- Node.js (v12 이상 권장)
- 인터넷 연결

## ⚠️ 주의사항

- 기존 README.md 파일은 완전히 덮어씌워집니다
- 백업이 필요한 경우 미리 백업하세요
- GitHub API 제한 (인증 없이 시간당 60회)

## 🔧 트러블슈팅

### 404 오류
- Repository 이름이 올바른지 확인
- Private Repository인 경우 GITHUB_TOKEN 설정 확인

### 네트워크 오류
- 인터넷 연결 확인
- 방화벽 설정 확인

### 권한 오류
- 파일 쓰기 권한 확인
- README.md 파일이 읽기 전용이 아닌지 확인