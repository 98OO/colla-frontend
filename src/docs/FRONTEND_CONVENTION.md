# Frontend 코드 컨벤션

Colla Frontend 개발 시 일관된 코드 품질과 가독성을 위한 코드 스타일 가이드입니다.

## 📌 명명 규칙

### 기본 규칙

| 항목     | 규칙                 | 예시                      |
| -------- | -------------------- | ------------------------- |
| 변수     | camelCase            | userName, chatMessages    |
| 상수     | SCREAMING_SNAKE_CASE | API_BASE_URL              |
| 함수     | camelCase            | getUserData, calculateSum |
| 컴포넌트 | PascalCase           | Button, UserCard          |

### 네이밍 원칙

- Boolean: `is`, `has`, `can` 접두어
- 배열: 복수형 사용 (`items`, `messages`)
- 함수: 동사로 시작 (`get`, `create`, `update`, `delete`)

### 이벤트 핸들러

- Props: `on` 접두어 → `onClick`, `onSubmit`
- 함수: `handle` 접두어 → `handleClick`, `handleSubmit`
- 복잡한 경우: 명사 뒤 동사 → `onAlertClick`, `onFormSubmit`

---

## 📁 파일 규칙

### 파일명

- 컴포넌트: `PascalCase.tsx`
- 스타일: `ComponentName.styled.ts`
- API: `get/post/patch/delete + 기능`
- Hook: `useSomething.ts`
- Store: `{name}Store.ts`
- 기타: `camelCase.ts`

---

## 🧱 코드 스타일

### Semantic Tags 사용

- 의미 있는 HTML 태그 우선: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>` 등

### 함수

- 모든 함수는 화살표 함수 사용

```ts
const getUserData = async (id: string) => {
	axiosInstance.get(`/users/${id}`);
};
```

### 타입

- 기본: `interface`
- 필요한 경우만 `type`

```ts
interface User {
	name: string;
}

type Status = 'loading' | 'success';
```

### Import 순서

1. 외부 라이브러리
2. 내부 절대 경로
3. 상대 경로
4. 스타일

---

## 🎨 컴포넌트 규칙

### 기준

- 반복 사용 시 컴포넌트 분리
- 복잡도 높으면 분리

---

### 디렉토리 구조

```
components/
└── ComponentName/
    ├── ComponentName.tsx
    ├── ComponentName.styled.ts
    └── ComponentName.stories.tsx
```

### 기본 구조

```ts
interface Props {
  title: string;
}

const Component = ({ title }: Props) => {
  return <div>{title}</div>;
};

export default Component;
```

---

## 🌐 API 패턴

### 엔드포인트

```ts
export const END_POINTS = {
	SIGNIN: 'auth/login',
	TEAMSPACE: 'teamspaces',
};
```

---

### API 함수

```ts
const getUser = async () => {
	const response = await axiosInstance.get(END_POINTS.USER);

	return response.data.content;
};
```

---

## 🪝 Hook

```ts
const useUserQuery = () => useQuery({...});
const useLoginMutation = () => useMutation({...});
```

- `use` 접두어 사용
- Query / Mutation 구분

---

## 📦 상태 관리

- 전역 상태: Zustand
- 서버 상태: React Query

---

## 🎨 스타일

- styled-components 사용
- 컴포넌트 폴더 내 `.styled.ts` 분리

```ts
import * as S from './Component.styled';
```

---

## 🔐 환경 변수

- `.env` 커밋 금지
- `import.meta.env` 사용

---

## 🎯 커밋 컨벤션

```
feat: 기능 추가
fix: 버그 수정
docs: 문서 수정
refactor: 리팩토링
style: 스타일 변경
chore: 기타 작업
```

---

## 🏗️ 브랜치 전략

```
main: 배포
develop: 개발
feature/\*: 기능 개발
fix/\*: 버그 수정
refactor/\*: 리팩토링
hotfix/\*: 긴급 수정 (main 기준)
```

---

## ✨ 코드 품질 규칙

### 불필요한 상태 금지

```ts
// ❌
const [double, setDouble];

// ✅
const double = count * 2;
```

---

### 조건 렌더링 명확히

```ts
if (!data) return <Loading />;
```

---

## ✔ Review Guide

코드 리뷰는 본 컨벤션을 기준으로 진행한다.
