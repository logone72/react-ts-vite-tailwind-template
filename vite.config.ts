import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
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
