# search-books-front
도서 이미지에서 ISBN을 자동으로 추출하고, 도서 정보를 저장하는 애플리케이션의 프론트엔드이다.
사용자가 도서 이미지를 업로드하면 AI가 자동으로 ISBN을 인식하여 도서 정보를 검색하고 저장할 수 있는 웹 애플리케이션이다.

## ISBN?
ISBN은 International Standard Book Number의 줄임말로, 국제 표준 도서 번호를 의미한다.
ISBN은 전 세계적으로 출판되는 모든 도서에 부여되는 고유한 식별 번호이다. 각 책마다 다른 번호를 가지고 있어서 마치 책의 '주민등록번호'와 같은 역할을 한다.

## 기술 스택
- **FrontEnd** : `React 19`, `React Router`, `Axios`
- **Build Tool** : `Create React App`
- **Package Manager** : `npm`
- **CI/CD** : `Github actions`, `Firebase`

## 설치 및 실행
### 필수 요구사항
- Node.js 18.0.0 이상
- npm 8.0.0 이상

### 로컬 개발환경 설정
- 저장소 클론
    ```
    git clone https://github.com/your-username/books.git
    
    cd books
    ```
- 의존성 설치
    ```bash
    npm install
    ```
- 환경변수 설정
    ```bash
    cp .env.example .env
    ```
- 개발 서버 실행
    ```bash
    npm start
    ```

### 빌드 및 배포
- 프로덕션 빌드
    ```bash
    npm run build
    ```
- Firebase 배포
    ```bash
    npm run deploy
    ```

## API 연동 정보
### 백엔드
- 개발 환경: `http://localhost:8080`
- 프로덕션: `https://api-search-books.duckdns.org/api/books/extract-and-save`

### API 엔드포인트
- `POST /api/book/save-and-extract` - 이미지 업로드 및 ISBN 추출

## 프로젝트 구조
```bash
search-books-front/
├── .github/
│   └── workflows/      # GitHub Actions CI/CD
├── public/             # 정적 파일
└── src/
    ├── components/     # 재사용 가능한 컴포넌트
    ├── pages/          # 도서 정보 표시 페이지
    ├── services/       # API 호출
    ├── styles/         # 스타일
    ├── utils/          # 유틸리티
    └── App.js          # 메인 앱
```

## 스크린샷
**메인 페이지**
<img width="756" height="621" alt="메인 페이지" src="https://github.com/user-attachments/assets/9e2aea8e-3615-416b-904c-6f0a38effe34" />

**이미지 업로드**
<img width="976" height="394" alt="이미지" src="https://github.com/user-attachments/assets/b38bc7d7-f991-45db-b41b-be789ece5ade" />

**도서 정보 표시**
<img width="951" height="848" alt="도서 정보" src="https://github.com/user-attachments/assets/f8b70693-6016-46f8-adeb-f0896270d026" />

**파일 정보**
<img width="956" height="268" alt="파일 정보" src="https://github.com/user-attachments/assets/8f43566a-c028-4806-933c-003683e50bd5" />

**이미지 URL**
<img width="942" height="148" alt="이미지 URL" src="https://github.com/user-attachments/assets/1a4709ba-0943-4ecd-9d5d-6116904a3cc8" />

## 배포 정보
- 라이브 데모: [search-isbn.web.app](https://search-isbn.web.app/)
- 배포 플랫폼: Firebase Hosting
- 자동 배포: main 브랜치에 push시 Github Actions를 통해 자동 배포

## 관련 링크
- [백엔드](https://github.com/xxzeroeight/search-books-back)

<br>

This project is licensed under the MIT License - see the LICENSE file for details.