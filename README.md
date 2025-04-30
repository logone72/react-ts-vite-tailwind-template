# React + TypeScript + Vite + Tailwind + FSD

React SPA 프로젝트를 위한 탬플릿 레포지토리 입니다.

[링크](https://logone72.github.io/react-ts-vite-tailwind-template/)에서 Github Pages에 배포된 예시를 확인 할 수 있습니다.

## Branch Strategy

- `basic`
  - 기초적인 설정만 있는 브랜치입니다. 
    - react, vite, linting, gh-pages deploy, FSD 정도의 공용 설정이 포함되어 있습니다.
    - 다른 브랜치들은 모두 basic에서 파생됩니다.

- `main` 
  - 모든 설정이 합쳐진 최종 브랜치입니다. 가장 풍부한 설정이 포함되어있습니다.
    - React + TypeScript + Vite + Tailwind + FSD + Vitest + Tanstack Router
    - 이 브랜치에서만 package-lock.json을 관리합니다.

### Other Branch List

basic 에서 목적한 설정만 추가된 브랜치들 입니다.

- `tanstack-router`
  - basic + tanstack router
- `tailwind`
  - basic + tailwind
- `vitest`
  - basic + vitest

## Configs

### Node.js

Node.js 버젼은 20 이상을 기준으로 작업했습니다.

### Bundler

- [vite](https://vite.dev/guide/)
- [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)
  - 번들 크기 시각화 플러그인 (`build-stats.html` 파일 생성)

### Linting & Formatting

- [eslint](https://eslint.org/docs/latest/use/getting-started)
  - `v9+`버젼을 사용해 flat config로 규칙이 작성되었습니다.
- [prettier](https://prettier.io/docs/)
- [lint-staged](https://github.com/lint-staged/lint-staged)
  - 코드 스타일 일관성 유지

### gh-pages

Github Pages에서 SPA가 정상 작동하기 위한 script가 `index.html` 및 `404.html`에 포함되어 있습니다.

다른 방식으로 배포할 경우, 이를 제거해주세요.

자세한 내용은 [여기](./docs/gh-pages.md)를 참고해주세요.


### conventional commit

일관성 있고 가독성이 좋은 커밋 메시지를 위해 conventional commit 규칙을 husky를 통해 설정해뒀습니다.

자세한 내용은 [여기](./docs/conventional-commit.md)를 참고해주세요.


### Feature-Sliced Design

폴더 구조로 FSD를 적용했습니다.

자세한 내용은 [여기](./docs/feature-sliced-design.md)를 참고해주세요.


### Tanstack Router

`filed based routing`에서 `directory route`를 사용합니다. `app/routes`에 라우팅 관련 파일들을 모아둡니다.

자세한 내용은 [여기](./docs/tanstack-router.md)를 참고해주세요.

### Tailwind CSS

브라우저 하위 호환성 보장을 위해 버젼 3.4+를 사용했습니다.

자세한 내용은 [여기](./docs/tailwind-css.md)를 참고해주세요.

### Vitest

[Vitest](https://vitest.dev/guide/) 공식문서에 따라 기초적인 설정이 되어 있습니다.

## Dependencies Version Management

[npm check updates](./docs/npm-check-updates.md)를 사용해 의존성 패키지들의 버전을 일괄 업데이트 할 수 있습니다.




