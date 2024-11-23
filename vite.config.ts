import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ts_4/', // 設定基礎路徑
  css: {
    // 確保 Vite 處理來自 node_modules 的 CSS
    preprocessorOptions: {
      css: {
        // 例如，如果使用 SCSS 預處理器
        additionalData: `@import './src/styles/global.scss';`
      }
    }
  },
  plugins: [react()],
  server: {
    hmr: {
      overlay: false,
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: '/public/index.html',
      external: ['/style.css'],
    },
  },
});

