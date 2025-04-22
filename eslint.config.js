// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactDom from 'eslint-plugin-react-dom';
import tseslint from 'typescript-eslint';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintReact from '@eslint-react/eslint-plugin';

const TARGET_FILES = ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'];

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '**/*.config.js'] },
  {
    files: TARGET_FILES,
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      /**
       * @see https://www.npmjs.com/package/@eslint-react/eslint-plugin
       */
      eslintReact.configs['recommended-typescript'],
      eslintPluginImportX.flatConfigs.recommended,
      eslintPluginImportX.flatConfigs.typescript,
      reactDom.configs.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
      reactHooks.configs['recommended-latest'],
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.serviceworker, ...globals.browser },
    },
    rules: {
      '@eslint-react/no-class-component': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-dom/no-dangerously-set-innerhtml': 'warn',

      /**
       * import-x
       * @see https://github.com/un-ts/eslint-plugin-import-x#readme
       */
      'import-x/newline-after-import': 'warn',
      'import-x/no-dynamic-require': 'warn',
      'import-x/no-nodejs-modules': 'warn',
      'import-x/exports-last': 'error',
      'import-x/first': 'error',
      'import-x/no-unresolved': [
        2,
        { ignore: ['\\.(?:svg|png|jpe?g|gif|webp|css|scss|sass|less)$'] },
      ],
      'import-x/order': [
        'warn',
        {
          groups: [
            'builtin', // Built-in imports (come from NodeJS native) go first
            'external', // External imports
            'internal', // Absolute imports
            'parent', // Relative imports
            'sibling', // Relative imports
            'index', // index imports
            'object', // object imports
            'unknown', // unknown
            'type', // type imports
          ],
          pathGroups: [
            {
              pattern: '*.png',
              group: 'unknown',
              position: 'after',
              patternOptions: { matchBase: true },
            },
            {
              pattern: '*.jpg',
              group: 'unknown',
              position: 'after',
              patternOptions: { matchBase: true },
            },
          ],
          'newlines-between': 'always',
          distinctGroup: true,
          alphabetize: {
            order: 'asc',
            caseInsensitive: true, // ignore case
          },
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',

      /**
       * typescript-eslint
       */
      // 클래스, 인터페이스, 타입 리터럴이 정렬되는 방식
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          default: [
            'public-static-field',
            'private-static-field',
            'public-instance-field',
            'private-instance-field',
            'public-constructor',
            'private-constructor',
            'public-instance-method',
            'private-instance-method',
          ],
        },
      ],
      // 프로미스를 사용하는 경우 명시적으로 표기해야하는지 아닌지
      '@typescript-eslint/no-floating-promises': 'warn',
      // any 타입을 사용해도 되는지 안되는지
      '@typescript-eslint/no-explicit-any': 'error',
      // 네이밍 컨벤션
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          selector: 'variable',
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        { format: ['camelCase', 'PascalCase'], selector: 'function' },
        { format: ['PascalCase'], selector: 'interface' },
        { format: ['PascalCase'], selector: 'typeAlias' },
        { format: ['PascalCase'], selector: 'class' },
      ],
      // 줄바꿈 관련
      'padding-line-between-statements': [
        'warn',
        // 블록 이후에 공백 추가 (함수나 클래스 등)
        { blankLine: 'always', prev: 'block-like', next: '*' },
        // 'use strict'와 같은 지시문 이후에 공백 추가
        { blankLine: 'always', prev: 'directive', next: '*' },
        // import 문 이후에 공백 추가
        { blankLine: 'always', prev: 'import', next: '*' },
        // import 문 끼리는 공백 자유
        { blankLine: 'any', prev: 'import', next: 'import' },
        // return 문 이전에 공백 추가
        { blankLine: 'always', prev: '*', next: 'return' },
        // 블록과 같은 구문 전후에 공백 추가
        {
          blankLine: 'always',
          prev: [
            'if',
            'for',
            'while',
            'do',
            'switch',
            'try',
            'function',
            'class',
          ],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['if', 'for', 'while', 'do', 'switch', 'try'],
          next: ['if', 'for', 'while', 'do', 'switch', 'try'],
        },
        // 변수 선언 후에 공백 추가 (다른 선언문이 뒤따르지 않을 경우)
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        // 변수 선언 사이에 공백 자유
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
);
