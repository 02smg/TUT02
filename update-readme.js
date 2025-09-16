#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

// Default repository configuration
const DEFAULT_OWNER = '02smg';
const DEFAULT_REPO = 'TUT02';
const DEFAULT_BRANCH = 'main';

// Help function
function showHelp() {
  console.log(`
🚀 GitHub README 자동 업데이트 도구

사용법:
  node update-readme.js [owner] [repo] [branch]
  node update-readme.js --help

예시:
  node update-readme.js                    # 기본값: 02smg/TUT02 main
  node update-readme.js microsoft vscode   # microsoft/vscode main
  node update-readme.js 02smg TUT02 dev    # 02smg/TUT02 dev 브랜치

환경변수:
  GITHUB_TOKEN    Private Repository 접근용 토큰

더 자세한 정보는 USAGE.md 파일을 참고하세요.
`);
  process.exit(0);
}

// Command line arguments parsing
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  showHelp();
}

const [owner = DEFAULT_OWNER, repo = DEFAULT_REPO, branch = DEFAULT_BRANCH] = args;

const outPath = path.resolve(process.cwd(), 'README.md');

console.log(`📥 GitHub README 업데이트 시작...`);
console.log(`🔗 대상: ${owner}/${repo} (${branch} 브랜치)`);
console.log(`📁 로컬 파일: ${outPath}`);

function writeAndExit(content) {
  try {
    fs.writeFileSync(outPath, content, 'utf8');
    console.log('✅ README.md 업데이트 완료!');
    console.log(`📝 파일 크기: ${content.length} 문자`);
  } catch (error) {
    console.error('❌ 파일 쓰기 실패:', error.message);
    process.exit(1);
  }
}

// GitHub Personal Access Token 확인
const token = process.env.GITHUB_TOKEN;

if (token) {
  console.log('🔑 GitHub API 토큰 사용 (Private Repository 지원)');
  
  // GitHub API 사용 (Private Repository도 지원)
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${owner}/${repo}/readme`,
    headers: {
      'User-Agent': 'readme-updater-script',
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  const req = https.get(options, res => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        try {
          const json = JSON.parse(body);
          const content = Buffer.from(json.content, 'base64').toString('utf8');
          console.log(`📊 API 응답: ${res.statusCode} OK`);
          writeAndExit(content);
        } catch (e) {
          console.error('❌ JSON 파싱 실패:', e.message);
          process.exit(1);
        }
      } else {
        console.error(`❌ GitHub API 오류: ${res.statusCode}`);
        console.error('📋 응답 내용:', body);
        process.exit(1);
      }
    });
  });

  req.on('error', e => {
    console.error('❌ 네트워크 오류:', e.message);
    process.exit(1);
  });

} else {
  console.log('🌐 Public Repository - raw.githubusercontent.com 사용');
  
  // Public Repository용 raw.githubusercontent.com 사용
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
  console.log(`🔗 URL: ${rawUrl}`);

  const req = https.get(rawUrl, res => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        console.log(`📊 다운로드 완료: ${res.statusCode} OK`);
        writeAndExit(body);
      });
    } else {
      console.error(`❌ 다운로드 실패: ${res.statusCode}`);
      if (res.statusCode === 404) {
        console.error('💡 힌트: Repository가 Private이거나 README.md 파일이 없을 수 있습니다.');
        console.error('💡 Private Repository인 경우 GITHUB_TOKEN 환경변수를 설정하세요.');
      }
      process.exit(1);
    }
  });

  req.on('error', e => {
    console.error('❌ 네트워크 오류:', e.message);
    process.exit(1);
  });
}