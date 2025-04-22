# Conventional Commits 요약

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

## 예시

```
feat(auth): 로그인 기능 추가
fix(button): 클릭 이벤트 버그 수정
refactor!: 구조 변경으로 인한 breaking change 포함
```

## 규칙 요약

- `type`: 커밋 목적을 나타냄 (아래 참고)
- `scope`: 선택사항. 어떤 모듈/파일에 관련된 것인지 (`auth`, `api`, `form` 등)
- `!`: **Breaking Change**가 포함되었음을 나타냄
- `description`: 짧고 간결한 변경 요약 (소문자로 시작, 마침표 ❌)
- `body`: 선택사항. 변경 이유, 배경 설명 등
- `footer`: Breaking Changes 또는 Issue 관련 메시지

---

## 커밋 타입 목록

| 타입       | 설명                                                     |
| ---------- | -------------------------------------------------------- |
| `build`    | 빌드 시스템 또는 외부 종속성(예: npm, webpack) 관련 변경 |
| `chore`    | 소스코드 변경 없이 설정, 문서, 도구 등 작업              |
| `ci`       | CI/CD 구성 파일 또는 스크립트 수정 (예: GitHub Actions)  |
| `docs`     | 문서 수정 (README, API 문서 등)                          |
| `feat`     | 새로운 기능 추가                                         |
| `fix`      | 버그 수정                                                |
| `perf`     | 성능 향상 관련 변경                                      |
| `refactor` | 기능 변화 없는 리팩토링                                  |
| `revert`   | 이전 커밋 되돌리기                                       |
| `style`    | 코드 의미에 영향을 주지 않는 변경 (들여쓰기, 공백 등)    |
| `test`     | 테스트 코드 추가 또는 수정                               |

---

## 🎯 자주 사용하는 커밋 예시

```bash
feat(login): 로그인 기능 추가
fix(api): 응답값 오류 수정
style(header): 들여쓰기 및 코드 정리
docs(readme): 프로젝트 설명 추가
refactor(form)!: 유효성 검증 로직 변경 (breaking change)
ci(github): 배포 워크플로우 추가
chore: prettier 설정 업데이트
```