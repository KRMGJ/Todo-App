# Todo App – 작업 관리 웹 애플리케이션

간단한 작업(Task)을 추가·수정·삭제하고 필터·검색·정렬을 통해 관리할 수 있는 Todo 웹 애플리케이션입니다.  
Firebase 연동 여부를 모드로 전환할 수 있으며, **Mock 모드 / Firebase 모드**를 모두 지원합니다.

본 프로젝트는 **React + TypeScript + Vite + TailwindCSS + Firebase(Auth/Firestore)** 기반으로 제작되었습니다.

---

## 1. 주요 기능

### ● 필수 기능  
- **작업 추가 (Create)**
  - 제목 입력 후 작업 생성  
  - 선택적으로 마감일(due date) 입력 가능  
  - 기본 상태: `todo`

- **작업 상태 변경 (Update)**
  - `todo → doing → done` 등 상태 전환 가능

- **작업 삭제 (Delete)**

- **작업 목록 표시 (Read)**
  - 카드형 UI  
  - 마감일 표시

- **작업 필터링**
  - 전체 / 할 일(todo) / 진행중(doing) / 완료(done)

- **검색 기능**
  - 제목 포함 검색

- **정렬 기능**
  - 제목 오름차순 / 내림차순  
  - 마감일 빠른 순 / 늦은 순

- **로딩 상태 표시**
  - 최초 진입 시 1초 지연 후 데이터 표시  
  - `LoadingSpinner` 컴포넌트 제공

- **에러 처리**
  - `ErrorBanner` UI 제공  
  - 버튼 클릭으로 에러 상황 시뮬레이션 가능

- **반응형 UI**
  - 모바일 환경 대응

### ● 가산점 구현  
1) 마감일(due date) 기능  
2) 다크 모드 지원  
3) 전역 상태관리 (Context API 기반)  
4) Firebase 모드 지원 (Auth + Firestore CRUD)

---

## 2. 기술 스택

### Frontend
- React 18  
- TypeScript  
- Vite  
- TailwindCSS  

### Backend / Infra
- Firebase Authentication  
- Firebase Firestore  

---

## 3. 프로젝트 구조

```
src/
 ├─ components/
 │   ├─ AuthForm.tsx
 │   ├─ ErrorBanner.tsx
 │   ├─ FilterBar.tsx
 │   ├─ LoadingSpinner.tsx
 │   ├─ TaskForm.tsx
 │   ├─ TaskItem.tsx
 │   └─ TaskList.tsx
 │
 ├─ hooks/
 │   ├─ useAuth.tsx
 │   └─ useTasks.ts
 │
 ├─ types/
 │   └─ task.ts
 │
 ├─ firebase.ts
 ├─ App.tsx
 ├─ main.tsx
 └─ index.css
```

---

## 4. 실행 방법

### 1) 프로젝트 클론  
```
git clone https://github.com/KRMGJ/Todo-App.git
```

### 2) 패키지 설치  
```
npm install
```

### 3) 로컬 실행  
```
npm run dev
```

---

## 5. 테스트 모드 안내

### ● Mock 모드
- 로그인 없이 바로 사용 가능  
- 메모리 기반 임시 데이터 저장  

### ● Firebase 모드
- Firebase Auth 로그인 필요  
- Firestore에 실제 데이터 저장  
- 모드 전환 시 데이터 소스 자동 변경  

---

## 6. 과제 진행 시 집중한 부분

- 기능 단위 커밋으로 개발 과정 명확히 기록  
- Mock/Firebase 모드 전환 시 상태 안정적으로 유지  
- 모바일 친화적 반응형 레이아웃  
- TailwindCSS 기반 일관된 스타일링  
- 필수 + 선택 요구사항 모두 충족  

---

## 7. 향후 개선하고 싶은 부분

- Drag & Drop 기반 Task 재정렬 기능  
- 작업 편집(Edit) 기능  
- 마감일 알림(Notification) 기능  

---

## 8. 개발 소요 시간

**약 3시간**
