
## 브랜치 관리 방법

- 모든 브랜치는 `basic` 브랜치에서 파생
- `rebase` 만 사용
- `main` 브랜치에서만 수정
  - package-lock.json
  - 의존성 패키지 버젼 일괄 최신화 작업
  - 설정 이외의 src 폴더 내부 파일 수정
    - 배포 예시 보기 좋게 수정하기 등
- `basic` 브랜치에서만 수정
  - README.md
- 공통
  - 해당 브랜치의 기본 설정에 수정이 있는 경우
    - ex) tailwind v3.4 -> v4.0 등
  - 해당 브랜치의 고유 document
    - ex) tanstack-router.md 등