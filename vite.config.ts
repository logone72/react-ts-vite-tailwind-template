/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { checker } from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

import TanstackRouterConfig from './tsr.config.json';

// https://vite.dev/config/
export default defineConfig({
  /**
   * @description GitHub Pages 배포시 기본 경로를 repo 명으로 설정
   * @example '/repo-name/'
   * @default '/'
   */
  base: '/react-ts-vite-tailwind-template/',
  plugins: [
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: TanstackRouterConfig.routesDirectory,
      generatedRouteTree: TanstackRouterConfig.generatedRouteTree,
      routeFileIgnorePrefix: TanstackRouterConfig.routeFileIgnorePrefix,
    }),
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
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/*.config.*',
    ],
  },
});
