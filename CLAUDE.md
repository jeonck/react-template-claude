# CLAUDE 전역 설정 파일

## 🎯 핵심 동작 원칙

### 자동 진행 모드
- `/init` 명령 이후 요구사항이 확정되면 **추가 확인 없이 자동 진행**
- 연관관계가 없는 작업들은 **병렬 처리**로 효율성 극대화
- 사용자 개입 최소화, 결과만 보고

### GitHub 자동화 (완전 자동화)
다음 작업들은 **묻지 않고 자동 실행**:
- `mkdir -p react-app/src react-app/public .github/workflows` - 디렉토리 생성
- `git init && git branch -m main` - Git 초기화 및 main 브랜치 설정
- `mcp__github__create_repository` - GitHub 저장소 자동 생성
- `git remote add origin [URL]` - 원격 저장소 연결
- `git add .` - 모든 변경사항 스테이징
- `git commit -m "meaningful message"` - 의미있는 커밋 메시지로 커밋
- `git push origin main` - 메인 브랜치로 푸시
- `cd react-app && npm install` - 의존성 설치
- `npm run build` - 빌드 테스트
- `npm run preview` - 로컬 미리보기
- package-lock.json 커밋 (GitHub Actions 캐싱용 필수!)
- Pull Request 생성 (필요시)
- GitHub Issues 생성/업데이트 (필요시)

## 🚀 Vite + React + Tailwind CSS 프로젝트 표준

### 프로젝트 자동 설정
요구사항에 Vite + React + Tailwind가 포함되면 다음을 **자동 실행**:

1. **프로젝트 구조 생성**
```
project-root/
├── .github/workflows/deploy.yml
├── react-app/
│   ├── src/
│   ├── public/vite.svg (필수!)
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

2. **필수 설정 파일들**

### vite.config.js (표준 템플릿)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/{REPOSITORY_NAME}/',  // 저장소명으로 자동 치환
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
```

### package.json (최소 의존성)
```json
{
  "name": "project-name",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.3",
    "vite": "^4.4.5",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24"
  }
}
```

### tailwind.config.js
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 📦 GitHub Pages 배포 최적화

### 자동 GitHub Actions 설정
모든 Vite + React 프로젝트에 자동으로 적용:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    
    steps:
    - uses: actions/checkout@v4
    
    - uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: react-app/package-lock.json
    
    - name: Install dependencies
      working-directory: ./react-app
      run: npm ci
    
    - name: Build
      working-directory: ./react-app
      run: npm run build
      env:
        NODE_ENV: production
    
    - name: Setup Pages
      uses: actions/configure-pages@v4
    
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: ./react-app/dist
    
    - name: Deploy to GitHub Pages
      uses: actions/deploy-pages@v4
```

## 🚨 배포 실패 방지 규칙

### 필수 체크 항목 (자동 확인)
- [ ] `public/vite.svg` 파일 존재 확인
- [ ] `vite.config.js`의 base 경로가 저장소명과 일치
- [ ] `NODE_ENV=production` 설정 확인
- [ ] 최신 GitHub Actions 버전 사용
- [ ] 단순한 빌드 설정 유지

### 피해야 할 설정 (자동 제외)
```javascript
// ❌ 절대 사용하지 않을 것들
define: {
  'process.env': '{}',
  'global': 'globalThis',
}
resolve: {
  alias: {
    buffer: 'buffer',
    process: 'process/browser',
    // 복잡한 polyfill들
  }
}
// 복잡한 manualChunks 설정도 제외
```

### 권장 설정 (자동 적용)
- 단순한 단일 번들 접근법
- 최소한의 의존성
- 표준 Vite 설정 유지
- React + Tailwind CSS 조합 최적화

## 🔄 작업 플로우 (완전 자동화)

### 1. 프로젝트 초기화 시 (묻지 않고 자동 실행)
```bash
# 완전 자동화 시퀀스
1. mkdir -p react-app/src react-app/public .github/workflows
2. package.json 생성 (필수 의존성 포함)
3. vite.config.js 생성 (저장소명 자동 설정)
4. tailwind.config.js, postcss.config.js 생성
5. React 컴포넌트 및 필수 파일 생성
6. public/vite.svg 생성 (필수!)
7. git init && git add . && git commit -m "feat: Initial setup"
8. git branch -m main (master → main 변경)
9. mcp__github__create_repository 사용하여 GitHub 저장소 생성
10. git remote add origin [자동생성된 URL]
11. git push origin main
12. cd react-app && npm install
13. npm run build (빌드 테스트)
14. package-lock.json 커밋 (GitHub Actions 캐싱용 필수!)
15. npm run preview (로컬 테스트)
16. GitHub Actions 자동 배포 완료
```

### 2. 개발 중 자동화
```bash
# 병렬 처리 가능한 작업들
- 코드 생성/수정
- 스타일 적용
- 컴포넌트 작성
- 테스트 파일 생성

# 순차 처리 필요한 작업들
- 빌드 테스트
- Git 커밋
- 배포
```

### 3. 배포 전 자동 검증
```bash
# 로컬 빌드 테스트
cd react-app
npm run build
npm run preview
# 오류 발견 시 자동 수정 시도
```

## 📋 커밋 메시지 템플릿

### 자동 커밋 메시지 생성 규칙
- `feat: Add new component/feature`
- `fix: Resolve GitHub Pages deployment issue`
- `style: Update Tailwind CSS styling`
- `config: Update Vite configuration`
- `deploy: Configure GitHub Pages settings`

## 🎛️ 환경별 설정

### Development
```javascript
// 개발 환경에서만 사용
if (process.env.NODE_ENV === 'development') {
  // 개발용 설정들
}
```

### Production (GitHub Pages)
```javascript
// 프로덕션 환경 최적화
build: {
  outDir: 'dist',
  assetsDir: 'assets',
  sourcemap: false,
  minify: 'terser',
}
```

## 🔍 문제 해결 자동화 (실제 시행착오 기반)

### 배포 실패 방지를 위한 필수 작업들
1. **package-lock.json 누락 오류** → `npm install` 후 **반드시 커밋**
   ```bash
   cd react-app && npm install
   cd .. && git add react-app/package-lock.json
   git commit -m "fix: Add package-lock.json for GitHub Actions caching"
   git push origin main
   ```

2. **GitHub Actions 캐싱 오류** → `cache-dependency-path: react-app/package-lock.json` 필수
3. **404 favicon 오류** → `public/vite.svg` 자동 생성 (필수!)
4. **빈 페이지 로딩** → 복잡한 설정 자동 제거
5. **모듈 로딩 오류** → 단순한 번들 설정으로 자동 변경
6. **디렉토리 구조 오류** → `working-directory: ./react-app` 설정 확인

### 검증된 자동화 스크립트
```bash
# 초기화 후 반드시 실행할 명령어들 (순차 실행)
1. cd react-app && npm install  # 의존성 설치
2. npm run build              # 빌드 테스트
3. cd .. && git add .         # 모든 변경사항 추가
4. git commit -m "fix: Add package-lock.json for deployment"
5. git push origin main       # 배포 트리거
6. sleep 30                   # GitHub Actions 대기
7. mcp__github__get_workflow_run 으로 성공 확인
```

### 성공 검증 (자동화)
- 로컬 빌드 성공 확인 (`npm run build`)
- package-lock.json 존재 확인
- GitHub Actions 워크플로우 성공 확인
- GitHub Pages URL 접근 테스트 (`https://{username}.github.io/{repo}/`)
- 브라우저 콘솔 오류 체크

## 📚 레퍼런스

### 성공 사례 기반 설정
- 검증된 설정만 사용
- 복잡성보다 안정성 우선
- 단순하고 명확한 구조 유지

## 🚨 중요한 배포 실패 방지 체크리스트

### ✅ 필수 확인 사항 (자동화됨)
1. **package-lock.json 커밋 필수** - GitHub Actions 캐싱 오류 방지
2. **public/vite.svg 존재** - 404 favicon 오류 방지
3. **vite.config.js base 경로** - 저장소명과 일치해야 함
4. **GitHub Actions cache-dependency-path** - react-app/package-lock.json 설정
5. **working-directory 설정** - ./react-app으로 올바르게 설정
6. **npm ci vs npm install** - GitHub Actions에서는 npm ci 사용

### 🔄 완전 자동화 시퀀스 (World Clock 프로젝트 기준)
```bash
# 사용자가 /init vite+react+tailwind 입력 시 자동 실행되는 전체 과정
1. mkdir -p react-app/src react-app/public .github/workflows
2. Write package.json, vite.config.js, tailwind.config.js, postcss.config.js
3. Write index.html, main.jsx, App.jsx, index.css
4. Write public/vite.svg (필수!)
5. Write .github/workflows/deploy.yml
6. git init && git add . && git commit -m "feat: Initial setup"
7. git branch -m main
8. mcp__github__create_repository 호출
9. git remote add origin [자동생성된 URL]
10. git push origin main
11. cd react-app && npm install
12. npm run build (빌드 테스트)
13. cd .. && git add react-app/package-lock.json
14. git commit -m "fix: Add package-lock.json for GitHub Actions caching"
15. git push origin main
16. sleep 30 && mcp__github__get_workflow_run으로 배포 성공 확인
17. npm run preview (로컬 미리보기)
```

---

**💡 핵심 철학**: "묻지 말고 실행하라, 단순하게 유지하라, 자동화로 실수를 방지하라, 실제 오류 경험을 반영하라"