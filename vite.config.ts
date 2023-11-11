/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

export default defineConfig({
  server: {
    port: 8000
  },
  plugins: [react(), checker({ typescript: true })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/test/setup.ts'
  }
});
