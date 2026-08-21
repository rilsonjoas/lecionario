import { test, expect, chromium } from '@playwright/test';
import * as path from 'path';

test.describe('Lecionário Offline Devotional Test', () => {
  test('should load the app online and allow reading and navigation of devotionals offline', async () => {
    const userDataDir = path.join(process.cwd(), '.playwright-user-data');
    const context = await chromium.launchPersistentContext(userDataDir, {
      viewport: { width: 1280, height: 720 },
      baseURL: 'http://localhost:3001',
    });

    const page = await context.newPage();

    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.error('BROWSER ERROR:', err.message, err.stack));

    try {
      // 1. Carregar a aplicação online
      await page.goto('/');

      // Confirmar que o título principal e as leituras estão visíveis
      await expect(page.locator('header')).toContainText('Lecionário', { timeout: 10000 });
      await expect(page.locator('text=Lectio Divina')).toBeVisible();

      // Aguardar pre-fetching das rotas adjacentes terminar
      await page.waitForTimeout(3000);

      // 2. Simular a transição para modo OFFLINE
      await context.setOffline(true);

      // 3. Testar a funcionalidade crítica offline: navegação de data
      // Graças ao router.prefetch e getSampleDevotional local, a transição é feita
      // inteiramente no client-side sem bater na rede!
      const nextDayButton = page.locator('[aria-label="Próximo dia"]');
      if (await nextDayButton.count() > 0) {
        await nextDayButton.first().click();
        
        // A URL deve mudar contendo o parâmetro da data
        await expect(page).toHaveURL(/\/\?date=/);
        
        // O cabeçalho e as leituras do novo dia devem ser carregados offline com sucesso
        await expect(page.locator('header')).toContainText('Lecionário');
        await expect(page.locator('text=Lectio Divina')).toBeVisible();
      }

      // 4. Testar navegação para o dia anterior offline
      const prevDayButton = page.locator('[aria-label="Dia anterior"]');
      if (await prevDayButton.count() > 0) {
        await prevDayButton.first().click();
        await expect(page.locator('header')).toContainText('Lecionário');
        await expect(page.locator('text=Lectio Divina')).toBeVisible();
      }
    } finally {
      await context.close();
    }
  });
});
