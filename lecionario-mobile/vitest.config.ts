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
    // Fixa `NODE_ENV=test` no worker, antes de qualquer import: sem isto a
    // suíte herda o ambiente do shell. Se `NODE_ENV=production` estiver
    // exportado (shell de Docker, build EAS, passo de CI), o React resolve
    // o build de produção — onde `act()` não existe — e a suíte de
    // componentes morre com um erro que não aponta o ambiente como causa.
    //
    // Precisa ser `test.env` e não um pin dentro de setupFiles: o
    // `import { ... } from 'react'` do setup.ts é hoisted e carrega o React
    // antes da atribuição (o pin chega tarde e não funciona).
    env: { NODE_ENV: 'test' },
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
