# React + TypeScript + Vite + Tailwind + FSD

React SPA 프로젝트를 위한 탬플릿 레포지토리 입니다.

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

- `tanstack-router`
  - basic + tanstack router
- `tailwind`
  - basic + tailwind
- `vitest`
  - basic + vitest