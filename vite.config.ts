/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  base: '/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/test/setup.ts',
    coverage: {
      provider: 'v8',
      exclude: ['src/utils/initialStates.ts', 'src/features']
    }
  }
});
