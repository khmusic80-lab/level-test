# 경희실용음악학원 입시 리포트 시스템

학생 정보 입력 → 레벨 테스트 점수 입력 → 분석 리포트 저장·인쇄, 그리고 관리자 목록·수정·삭제 기능을 갖춘 정적 웹앱입니다.
데이터는 Firebase(Firestore)에 저장하고, 선생님 계정으로 로그인해야 사용할 수 있습니다.

## 파일 구성

```
login.html      로그인
index.html      학생 정보 입력
test.html       평가 항목별 점수 입력
result.html     리포트 (저장 / 인쇄)  ─ result.html?id=문서ID 로 저장된 리포트 열기
admin.html      리포트 목록 · 검색 · 수정 · 삭제

assets/css/common.css   공통 스타일
assets/js/firebase.js   Firebase 설정·초기화, 로그인 확인
assets/js/reports.js    리포트 DB 접근 (DB를 바꿀 때는 이 파일만 수정)
assets/js/fields.js     전공 목록 / 평가 항목 / 추천 아티스트
assets/js/utils.js      공통 유틸 (HTML 이스케이프, 날짜, 평균 등)
firestore.rules         Firestore 보안 규칙
```

## 처음 설정 (Firebase)

1. [Firebase 콘솔](https://console.firebase.google.com)에서 프로젝트를 만듭니다. Google Analytics는 꺼도 됩니다.
2. **Firestore Database** → 데이터베이스 만들기 → 위치 `asia-northeast3 (서울)` → 프로덕션 모드
3. **Authentication** → 시작하기 → 로그인 방법에서 **이메일/비밀번호** 사용 설정
4. **Authentication → Users** → 사용자 추가: 선생님 계정(이메일·비밀번호)을 직접 만듭니다.
5. **Firestore → 규칙**: `firestore.rules` 내용을 붙여넣고, `'teacher@example.com'` 부분을 4번에서 만든 이메일로 바꾼 뒤 게시합니다.
   - 규칙에 적힌 이메일만 데이터에 접근할 수 있으므로, 목록의 이메일은 반드시 4번에서 **먼저 계정을 만들어 두세요.**
6. **프로젝트 설정 → 일반 → 내 앱 → 웹 앱(</>) 추가** → 표시되는 `firebaseConfig` 값을 `assets/js/firebase.js`에 붙여넣습니다.
7. **Authentication → 설정 → 승인된 도메인**에 사이트 주소(예: `프로젝트.vercel.app`)를 추가합니다. `localhost`는 기본으로 들어 있습니다.

> Firebase 무료(Spark) 플랜은 Supabase처럼 일시정지되지 않으므로 keep-alive 작업이 필요 없습니다.

## 배포 (Vercel)

GitHub 저장소가 Vercel에 연결되어 있어서 `main` 브랜치에 push하면 자동으로 배포됩니다.
빌드 과정이 없는 정적 사이트이므로 Vercel 설정에서 Framework Preset은 **Other**, Build Command는 비워 두세요.
배포 주소가 바뀌면 Firebase **승인된 도메인**에도 추가해야 로그인이 됩니다.

## 백업

`admin.html` 오른쪽 위 **💾 전체 백업** 버튼을 누르면 모든 리포트가 `entrance_reports-날짜.json` 파일로 저장됩니다.
Firestore 자동 백업은 유료 플랜에서만 쓸 수 있으므로, 이 버튼으로 주기적으로(예: 월 1회) 받아서 보관하세요.
학생 개인정보가 들어 있으므로 저장소에 올리지 마세요.

### 복원 / 일괄 수정

**📥 백업 복원**으로 백업 JSON을 올리면, 현재 DB와 비교해서 **새로 추가되거나 내용이 바뀐 리포트만** 반영합니다.

- 여러 리포트를 한꺼번에 고칠 때: 백업 → JSON 수정 → 복원
- 점수를 고치면 평균은 자동으로 다시 계산됩니다.
- 파일에 없는 리포트는 삭제되지 않습니다. 삭제는 목록의 삭제 버튼으로 하세요.
- 반영하기 전에 추가·변경 건수를 보여주고 확인을 받습니다. 점수가 0~100을 벗어나는 등 잘못된 값이 있으면 아무것도 반영하지 않습니다.

## 로컬에서 실행

ES 모듈을 사용하므로 HTML 파일을 더블클릭(`file://`)하면 동작하지 않습니다. 로컬 서버로 여세요.

```bash
npx serve .          # 또는 python3 -m http.server 8000
```

VS Code를 쓴다면 Live Server 확장으로 열어도 됩니다.

## 평가 항목 수정

`assets/js/fields.js`의 `FIELDS`를 고치면 모든 페이지에 반영됩니다.
점수는 `a`, `b`, `c`… key로 저장되므로 **기존 key의 의미를 바꾸거나 순서를 바꾸지 말고**, 새 항목은 끝에 새 key로 추가하세요.
