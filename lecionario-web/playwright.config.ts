import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // O standalone do Next NÃO inclui `.next/static` nem `public`: em
    // produção o Dockerfile copia os dois pra dentro dele. Sem essa cópia o
    // servidor sobe sem CSS — o e2e rodava contra uma página sem estilo, e
    // qualquer asserção dependente de token de cor passava por engano (foi
    // o que o spec de a11y pegou em 2026-10-15: 16 "violações" de contraste
    // que eram só o footer com a cor default do browser). Refs: Dockerfile.
    command:
      'rm -rf .next/standalone/.next/static .next/standalone/public' +
      ' && cp -r .next/static .next/standalone/.next/static' +
      ' && cp -r public .next/standalone/public' +
      ' && HOSTNAME=localhost PORT=3001 node .next/standalone/server.js',
    url: 'http://localhost:3001',
    reuseExistingServer: false,
    timeout: 60000,
  },
});
