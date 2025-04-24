import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  /**
   * @description GitHub Pages 배포시 기본 경로 repo 명으로 설정
   * @example '/repo-name/'
   */
  base: '/',
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint ./src --ext .ts,.tsx',
      },
    }),
    visualizer({
      open: false,
      filename: 'build-stats.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
