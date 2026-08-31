import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    // Testes de componente usam `// @vitest-environment jsdom` no topo
    // do arquivo — os de lib continuam em node.
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
