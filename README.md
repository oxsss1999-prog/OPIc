# OPIc Study Master - React + Vite + Firebase 🚀

오프라인 로컬 캐시와 실시간 Firebase 클라우드 동기화가 결합된 프리미엄 **OPIc 영어 말하기 학습 플랫폼**입니다. 오픽의 빈출 패턴 학습, 필수 필러 사운드보드, 마이크 녹음 및 실시간 오디오 캔버스 시각화, 인터랙티브 퀴즈 등 고득점을 위한 최첨단 학습 도구를 제공합니다.

---

## ✨ 주요 기능 및 특징
1. **React 18 + Vite SPA**: 초고속 빌드 및 핫 모듈 리로딩(HMR) 지원.
2. **원어민 발음 재생 (TTS)**: Web Speech API를 활용해 모든 예문과 필러의 자연스러운 원어민 미국식 영어 억양 제공 (0.88x 배속 최적화).
3. **쉐도잉 녹음기 & 실시간 오디오 시각화**: 마이크 입력을 Fast Fourier Transform(FFT) 분석하여 HTML5 canvas에 네온 시안-퍼플 파형을 그리고, 자신의 발음을 즉시 재생해 오픽 채점 루브릭으로 셀프 피드백 진행.
4. **하이브리드 데이터 동기화**: Firebase 연결이 없어도 로컬 캐시(`localStorage`)로 **100% 정상 작동**하며, `.env`에 키값을 입력하는 순간 **Firebase Firestore**와 실시간 클라우드 백업 및 기기 간 실시간 동기화 지원.
5. **인터랙티브 퀴즈**: 다이내믹한 빈칸 채우기, 오디오 피드백 비프음(SFX), 완벽 달성 시 캔버스Confetti 폭죽 파티클 시스템 탑재.
6. **Vercel & Git 배포 최적화**: SPA 새로고침 방지를 위한 `vercel.json` 및 기밀 정보 유출을 원천 방지하는 `.gitignore` 설정 제공.

---

## 🛠️ 개발 및 실행 가이드

### 1. 로컬 환경에서 실행하기
프로젝트에 필수 패키지를 설치한 후 개발 서버를 켭니다:
```bash
# 의존성 패키지 설치
npm install

# 로컬 개발 서버 구동 (포트 3000)
npm run dev
```

### 2. GitHub에 프로젝트 올리기
GitHub에 새로운 원격 저장소(Repository)를 개설한 후, 아래 명령어를 순서대로 실행해 코드를 올립니다:
```bash
# 원격 저장소 주소 연결 (USERNAME과 REPO_NAME을 실제 정보로 치환)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# 기본 브랜치 이름을 main으로 지정
git branch -M main

# 원격 저장소로 업로드 (최초 1회 실행)
git push -u origin main
```

### 3. Firebase 실시간 클라우드 연결
디바이스 간 실시간 데이터 동기화를 원하시면 아래 단계를 밟아 연동하세요.

1. **[Firebase Console](https://console.firebase.google.com/)**에 접속하여 새 프로젝트를 생성합니다.
2. **Build > Authentication** 탭에서 익명 로그인(Anonymous Sign-in)을 활성화합니다.
3. **Build > Firestore Database** 탭에서 데이터베이스를 생성하고 규칙(Rules)을 쓰기/읽기가 가능하도록 설정합니다:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```
4. Firebase 웹 앱 설정을 복사한 후, 본 프로젝트 루트의 `.env.example` 파일을 복사해 **`.env`** 파일을 만들고 아래 정보들을 채워 넣습니다:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   ```
5. 브라우저를 새로고침하면 자동으로 로컬 데이터가 안전하게 Firebase Firestore 클라우드로 동기화됩니다!

### 4. Vercel로 무료 배포하기
이 프로젝트는 Vercel에 최적화되어 있습니다.

1. **GitHub에 원격 저장소를 푸시한 상태**에서 **[Vercel Dashboard](https://vercel.com/)**에 로그인합니다.
2. **Add New > Project**를 누르고, 연동한 GitHub 리포지토리를 불러옵니다(Import).
3. **Environment Variables** 설정 탭에서 Firebase 관련 변수들(`.env`에 기입한 동일한 키와 값)을 등록해 줍니다.
4. **Deploy** 버튼을 누르면 단 1분 만에 전 세계에 안전하게 배포 완료됩니다! (이후 GitHub에 push할 때마다 Vercel이 실시간으로 감지해 자동 배포(CI/CD)를 수행합니다.)
