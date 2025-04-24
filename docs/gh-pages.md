# gh-pages로 github pages에 배포하기 

[링크](https://www.npmjs.com/package/gh-pages)

## 배포 방법

```bash
npm run deploy-to-gh-pages
```

실행시 `gh-pages` 브랜치에 `dist`의 빌드 결과물이 push 됩니다.

## 준비 사항

### vite.config.ts 수정

```js
import { defineConfig } from "vite";

export default defineConfig({
  // ex base: '/my_project/', 
  base: "/<레포지토리 이름>/",
  ...
});
```

### github repository pages 설정

`https://github.com/{user}/{repo}/settings/pages` 에 들어가 브랜치 및 root가 맞게 설정되었는지 확인합니다.


## github pages에서 SPA의 client routing이 작동되게 하는 방법

- [spa-github-pages](https://github.com/rafgraph/spa-github-pages)
- [velog - [React] React Router DOM & React SPA in GitHub Pages](https://velog.io/@developer_khj/React-SPA-in-GitHub-Pages-with-BrowserRouter)


## [gh-page 팁](https://github.com/tschaub/gh-pages?tab=readme-ov-file#tips)

- [when get error branch already exists](https://github.com/tschaub/gh-pages?tab=readme-ov-file#when-get-error-branch-already-exists)
- [Deploying to github pages with custom domain](https://github.com/tschaub/gh-pages?tab=readme-ov-file#deploying-to-github-pages-with-custom-domain)
- [Deploying with GitHub Actions](https://github.com/tschaub/gh-pages?tab=readme-ov-file#deploying-with-github-actions)

```bash
>>> npx gh-pages --help

Usage: gh-pages [options]

Options:
  -V, --version            output the version number
  -d, --dist <dist>        Base directory for all source files
  -s, --src <src>          Pattern used to select which files to publish (default: "**/*")
  -b, --branch <branch>    Name of the branch you are pushing to (default: "gh-pages")
  -e, --dest <dest>        Target directory within the destination branch (relative to the root) (default: ".")
  -a, --add                Only add, and never remove existing files
  -x, --silent             Do not output the repository url
  -m, --message <message>  commit message (default: "Updates")
  -g, --tag <tag>          add tag to commit
  --git <git>              Path to git executable (default: "git")
  -t, --dotfiles           Include dotfiles
  --nojekyll               Add a .nojekyll file to disable Jekyll
  --cname <CNAME>          Add a CNAME file with the name of your custom domain
  -r, --repo <repo>        URL of the repository you are pushing to
  -p, --depth <depth>      depth for clone (default: 1)
  -o, --remote <name>      The name of the remote (default: "origin")
  -u, --user <address>     The name and email of the user (defaults to the git config).  Format is "Your Name <email@example.com>".
  -v, --remove <pattern>   Remove files that match the given pattern (ignored if used together with --add). (default: ".")
  -n, --no-push            Commit only (with no push)
  -f, --no-history         Push force new commit without parent history
  --before-add <file>      Execute the function exported by <file> before "git add"
  -h, --help               display help for command
```