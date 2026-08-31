import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const rnStub = path.resolve(__dirname, './src/test/rn-native-stub.tsx');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // react-native real é Flow (`import typeof`) e não roda no vitest node;
      // apontamos para um stub de primitivos que o test-renderer do RNTL
      // consegue snapshotar (ver src/test/rn-native-stub.tsx).
      'react-native': rnStub,
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
    // Mocks de módulos só pra ambiente de teste: vector-icons e contexts.
    setupFiles: ['src/test/setup.ts'],
    server: {
      deps: {
        // RNTL precisa passar pelo transformador do Vite para resolver o
        // stub de react-native acima.
        inline: ['@testing-library/react-native', 'test-renderer'],
      },
    },
  },
});
