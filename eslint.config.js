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
  { ignores: ['dist', 'node_modules', 'eslint.config.js'] },
  {
    files: TARGET_FILES,
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      eslintReact.configs['recommended-typescript'],
      reactDom.configs.recommended,
      eslintPluginImportX.flatConfigs.recommended,
      eslintPluginImportX.flatConfigs.typescript,
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
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

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
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
);
