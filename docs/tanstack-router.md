# tanstack router

- file-based routing 사용
- 자동으로 생성되는 routeTree.gen.ts 를 통해 route의 type safe 보장

## File-Based Routing

[공식 문서](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing) 사용 예를 참고.

> Directory Routes를 현재 프로젝트에서 사용합니다.

### Directory Routes

| Filename                     | Route Path              | Component Output                              |
|-----------------------------|--------------------------|-----------------------------------------------|
| ʦ __root.tsx                |                          | `<Root>`                                      |
| ʦ index.tsx                 | / (exact)                | `<Root><RootIndex>`                           |
| ʦ about.tsx                 | /about                   | `<Root><About>`                               |
| ʦ posts.tsx                 | /posts                   | `<Root><Posts>`                               |
| 📂 posts                    |                          |                                               |
| ┄ ʦ index.tsx               | /posts (exact)           | `<Root><Posts><PostsIndex>`                   |
| ┄ ʦ $postId.tsx            | /posts/$postId           | `<Root><Posts><Post>`                         |
| 📂 posts_                   |                          |                                               |
| ┄ 📂 $postId               |                          |                                               |
| ┄ ┄ ʦ edit.tsx             | /posts/$postId/edit      | `<Root><EditPost>`                            |
| ʦ settings.tsx              | /settings                | `<Root><Settings>`                            |
| 📂 settings                 |                          | `<Root><Settings>`                            |
| ┄ ʦ profile.tsx            | /settings/profile        | `<Root><Settings><Profile>`                   |
| ┄ ʦ notifications.tsx      | /settings/notifications  | `<Root><Settings><Notifications>`             |
| ʦ _pathlessLayout.tsx      |                          | `<Root><PathlessLayout>`                      |
| 📂 _pathlessLayout          |                          |                                               |
| ┄ ʦ route-a.tsx            | /route-a                 | `<Root><PathlessLayout><RouteA>`              |
| ┄ ʦ route-b.tsx            | /route-b                 | `<Root><PathlessLayout><RouteB>`              |
| 📂 files                    |                          |                                               |
| ┄ ʦ $.tsx                  | /files/$                 | `<Root><Files>`                               |

---

#### 특수 접두사/접미사 `_`, `$`, `_`

- **`_` prefix**  
  - 예시: `_pathlessLayout.tsx`, `_auth/`  
  - 설명: URL 경로에 포함되지 않음. 레이아웃 구성 요소나 상위 컨텍스트 제공을 위해 사용됨. 예를 들어 UI 구조만 제공하고 실제 경로는 가지지 않음.

- **`$` prefix**  
  - 예시: `$postId.tsx` → `/posts/:postId`  
  - 설명: 동적 라우트 세그먼트를 의미. 파일 이름이나 폴더에 `$`를 붙이면 해당 경로가 변수로 처리되어 라우트 파라미터가 됨.
- **`_` suffix**  
  - 예시: `posts_/`, `auth_/`  
  - 설명: 실제 경로(URL)에는 포함되지 않음. 파일 시스템 내에서 라우트를 논리적으로 그룹화하기 위한 네임스페이스 역할을 함.

## Tip

### tanstack/react-router: Argument of type 'string' is not assignable to parameter of type 'never'

`routeTree.gen.ts` 가 새롭게 생성되지 않아서 발생한 문제.

```ts
// about에서 오류
export const Route = createFileRoute('/about')({
  component: RouteComponent,
});
```

- `npm run generate-tsr` or `npm run dev` 를 수행하면 자동으로 생성됩니다.
  - `tsr` cli는 tsr.config.json의 설정을 사용합니다. `vite` 빌드시에는 plugin의 config 설정을 사용합니다.


## 참고 자료

- [[번역] TanStack Router를 소개합니다](https://velog.io/@eunbinn/introducing-tanstack-router)
- [tanstack router 공식문서](https://tanstack.com/router/latest/docs/framework/react/overview)