# **FSD Cheat Sheet**

## **개요**

![](https://feature-sliced.github.io/documentation/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg)

- **Layer**: 수직적 관심사 분리 (책임과 역할)
- **Slice**: 도메인별 관심사 분리 (기능과 도메인)
- **Segment**: 기술적 관심사 분리 (구현과 목적)

---

## **Layers (계층)**

| Layer      | 목적 및 설명                 | 예시                                |
| ---------- | ----------------------- | --------------------------------- |
| `app`      | 전역 설정 (라우팅, 상태관리, 테마)   | AppRouter, AppProvider            |
| `pages`    | 사용자와 직접 상호작용하는 화면 컴포넌트  | HomePage, ProductListPage         |
| `widgets`  | 여러 기능 조합한 재사용 가능한 UI 블록 | Header, Sidebar, SearchWidget     |
| `features` | 특정 기능 구현과 사용자 상호작용 관리   | LikeButton, ReviewForm, AddToCart |
| `entities` | 핵심 데이터 모델 및 도메인 중심 코드   | User, Product, Order              |
| `shared`   | 공통 유틸리티, 범용 컴포넌트 및 함수   | Button, Input, debounce 함수        |

**레이어 원칙**:  
✅ 상위 계층 → 하위 계층 의존 가능  
❌ 하위 계층 → 상위 계층 의존 불가능

### 상세 

- **`app`**
    - **목적**: 프로젝트 내에서만 사용되는 전역적인 공통 컴포넌트나 설정을 포함
    - **사용 예**: AppProvider, AppTheme, 프로젝트 전역에 걸쳐 사용되는 레이아웃이나 상태 관리 설정
    - **핵심 특징**: **프로젝트 전용**, 프로젝트 내부에서만 사용됨
- **`pages`**
    - **목적**: 개별 페이지의 레이아웃과 로직을 구성하며, 위젯과 기능, 엔터티를 통합함
    - **사용 예**: HomePage, ProfilePage처럼 전체 페이지를 구성
    - **핵심 특징**: **전체 페이지**; 경로 단위의 구조를 표현
- **`widgets`**
    - **목적**: 여러 기능이나 UI 요소를 독립적인 단위로 조합한 컴포넌트
    - **사용 예**: Header, Footer, DashboardWidget처럼 여러 기능을 묶지만 자체 로직을 다루지 않음
    - **핵심 특징**: **독립적인 단위**로 다양한 작은 구성 요소를 집합함
- **`features`**
    - **목적**: 특정 행동과 사용자 상호작용에 관련된 기능을 포함
    - **사용 예**: 상태를 포함한 컴포넌트, 비즈니스 로직을 담은 커스텀 훅, 기능별 API 호출
    - **핵심 특징**: **행동 중심적**; 특정 기능이나 사용자 상호작용과 관련된 비즈니스 로직과 상태 관리
- **`entities`**
    - **목적**: 도메인 데이터 중심의 독립적인 요소를 표현
    - **사용 예**: 순수 함수, 데이터 모델, 타입 정의, 기본 CRUD 연산
    - **핵심 특징**: **순수성**; 간단하고 독립적이며 데이터 중심적임. 상태를 관리하지 않으며 부작용이 없음
- **`shared`**
    - **목적**: 여러 프로젝트에서도 재사용 가능한 공통 컴포넌트, 유틸리티, 설정을 포함
    - **사용 예**: Button, Modal, useFetch 같은 재사용 가능한 요소나 debounce 같은 유틸리티 함수
    - **핵심 특징**: 프로젝트 안팎으로 **재사용 가능**, **범용성**이 높음

---

## **Slices (슬라이스)**

- 비즈니스 도메인별로 코드를 분리 (기능 중심적 구조화)

|슬라이스 예시|포함되는 코드 예시|
|---|---|
|`user`|사용자 프로필, 인증, 권한 관리|
|`product`|상품 리스트, 상세보기, 검색|
|`cart`|장바구니 추가, 제거, 업데이트|
|`order`|주문 생성, 조회, 관리|

```bash
features/
└─ AddToCart/
   ├─ ui/AddToCartButton.tsx
   ├─ model/cartStore.ts
   └─ api/cartApi.ts
```

---

## **Segments (세그먼트)**

각 슬라이스 내부의 기술적 관심사 분리

| 세그먼트     | 역할 및 예시                         |
| -------- | ------------------------------- |
| `ui`     | 순수 UI 컴포넌트 (`.tsx`, `.vue`)     |
| `api`    | 서버 통신 (fetch, axios), WebSocket |
| `model`  | 비즈니스 로직, 상태관리, 커스텀 훅, 타입        |
| `lib`    | 범용적 유틸 함수 (비즈니스 도메인 무관)         |
| `config` | 상수 및 설정                         |

---

## **Segment 경계 상세**

### **ui**
- 스타일과 레이아웃 중심
- 도메인 데이터를 표시하는 읽기 전용 UI
- 상태와 사용자 액션 처리

### **model**
- 도메인 타입 정의
- 비즈니스 로직과 상태관리
- 커스텀 훅과 상태 변경 함수

### **api**
- CRUD API 호출
- 복합 API 요청
- 데이터 동기화 (캐싱, 낙관적 업데이트)

### **lib**
- 기본 타입 처리 유틸 함수
- 유효성 검사 로직
- 데이터 처리 파이프라인

### **config**
- 기본 상수 및 환경 변수
- 도메인별 규칙, 조건부 설정

---

## **Layer + Segment 조합**

### **App**

- **app + ui**: 프로젝트 전반에 걸친 레이아웃이나 테마 설정 UI (예: AppLayout).
- **app + api**: 프로젝트 전용 초기 API 설정 (예: initApiClient).
- **app + model**: 프로젝트 상태 관리와 관련된 공통 훅이나 타입 정의 (예: useAppState).
- **app + lib**: 프로젝트 전용 유틸리티 함수 (예: initializeApp).
- **app + config**: 전역 프로젝트 설정 (예: APP_NAME, DEFAULT_LANGUAGE).

### **Shared**

- **shared + ui**: 프로젝트 전반에 걸쳐 사용되는 재사용 가능한 UI 컴포넌트 (예: FormField, Card).
- **shared + api**: 공통 API 설정 또는 유틸리티 (예: Axios 인스턴스 설정).
- **shared + model**: 공통 기능을 제공하는 훅 (예: useAuth).
- **shared + lib**: 반복적인 작업을 위한 유틸리티 함수 (예: formatDate, deepClone).
- **shared + config**: 전역 상수 (예: 반응형 브레이크포인트, 색상).

### **Entity**

- **entity + ui**: 읽기 전용 프레젠테이셔널 컴포넌트 (예: ProductDisplay).
- **entity + api**: 기본 데이터 페칭 함수.
- **entity + model**: 비즈니스 로직과 타입 정의.
- **entity + lib**: 엔터티 전용 유틸리티 함수.
- **entity + config**: 엔터티별 상수나 설정 값.

### **Feature**

- **features + ui**: 주요 행동을 구현하는 컴포넌트 (예: AddToCartButton).
- **features + api**: TanStack Query 같은 도구를 이용한 기능별 API 호출.
- **features + model**: 로직을 다루는 커스텀 훅 (useAddToCart).
- **features + lib**: 기능에 관련된 유틸리티 함수.
- **features + config**: 기능별 상수나 설정 값.

### **Widget**

- **widgets + ui**: UI 요소들의 조합.
- **widgets + api**: 위젯 전용 데이터 페칭 (예: fetchWidgetData).
- **widgets + model**: 데이터 집계 로직 (자주 사용되지 않음).
- **widgets + lib**: 위젯 전용 유틸리티 함수.
- **widgets + config**: 위젯의 동작에 관련된 설정.

### **Page**

- **pages + ui**: 페이지의 레이아웃과 콘텐츠 구조.
- **pages + api**: 페이지 전용 API 호출 (예: useFetchHomePageData).
- **pages + model**: 경로 처리 및 페이지별 데이터 타입.
- **pages + lib**: 페이지 동작에 필요한 유틸리티.
- **pages + config**: 페이지 관련 설정 값.

---

## **폴더 구조 예시**

```
src/
├─ app/
│  └─ providers/AppRouter.tsx
├─ processes/
│  └─ authProcess.ts
├─ pages/
│  └─ HomePage/ui/HomePage.tsx
├─ widgets/
│  └─ Header/ui/Header.tsx
├─ features/
│  └─ AddToCart/ui/AddToCartButton.tsx
├─ entities/
│  └─ Product/model/types.ts
├─ shared/
│  ├─ ui/Button.tsx
│  └─ lib/helpers.ts
```

---

## **적용 팁**

- 처음부터 모든 경계를 만들지 말고 필요에 따라 확장 (시작은 `pages`, `shared`, `app`)
- 기본적인 `ui`, `api`, `model`부터 시작
- 복잡성 증가 시 추가로 분리 (features, entities, widgets)

---

## 참고 자료

- [**Feature-Sliced Design** (FSD) 공식 문서](https://feature-sliced.github.io/documentation/docs/get-started/overview)
- [teo - FSD 관점으로 바라보는 코드 경계 찾기](https://velog.io/@teo/fsd#fsd%EB%A5%BC-%ED%9A%A8%EA%B3%BC%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%A0%81%EC%9A%A9%ED%95%98%EB%8A%94-%ED%8C%81)
