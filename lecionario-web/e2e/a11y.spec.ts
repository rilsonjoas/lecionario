import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Auditoria de acessibilidade por rota (P-1).
//
// Roda o axe-core num Chromium de verdade, sobre a página hidratada — o que
// o axe do Storybook não cobre (ele testa componente, não entrega). Pega a
// classe de erro que sobrou da auditoria de 2026-09-26: aria-label sem o
// texto visível, região de status que não anuncia, alvo de toque pequeno.
//
// Cada rota roda no tema claro E no escuro. O app segue o SO por padrão
// (next-themes, `defaultTheme="system"`), então `emulateMedia` força cada um
// e o teste confere que o tema realmente aplicou antes de rodar o axe.
//
// O escuro entrou aqui depois do achado de 2026-10-16: no tema escuro o
// token `--background` guardava um `color-mix()` (cor cheia) e o Tailwind o
// embrulhava em `hsl(...)` — declaração inválida, então `bg-background` não
// pintava nada e a página ficava branca com texto claro. Ficou ~2 meses
// despercebido porque só o tema claro era testado.
//
// Limite conhecido: quando a cor vem de variável CSS custom property, o
// valor lido é o computado; o axe aponta o elemento, mas a causa pode ser
// o token. Contraste por token nas sete estações litúrgicas continua sendo
// auditoria manual, não este spec.

const routes = [
  { path: '/', name: 'Home' },
  { path: '/metodo', name: 'Método' },
  { path: '/apoiar', name: 'Apoiar' },
  { path: '/privacidade', name: 'Privacidade' },
  { path: '/termos', name: 'Termos' },
];

const themes = ['light', 'dark'] as const;

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

for (const theme of themes) {
  for (const route of routes) {
    test(`${route.name} (${route.path}) [${theme}] sem violações WCAG 2.1 AA`, async ({ page }) => {
      // Movimento reduzido: o app o respeita (globals.css), então a página entra já no estado final. O axe media o contraste
      // no MEIO da animação de entrada de textos com opacidade (hipótese do risco aberto no ROADMAP); o contraste que
      // importa é o do estado final, que é o que a pessoa lê.
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await page.goto(route.path);

      // A home hidrata no cliente (data/estação); esperar o banner garante que
      // o axe analise a árvore já montada, não o esqueleto do primeiro paint.
      // `getByRole('banner')` e não `header`: as páginas legais têm um segundo
      // `<header>` interno, que não tem o papel banner e quebraria o strict mode.
      await expect(page.getByRole('banner')).toBeVisible({ timeout: 15000 });

      // Garante que o teste mede o tema que diz medir: sem isso, um
      // `emulateMedia` que não pegasse passaria verde no tema errado.
      const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      expect(isDark, `o tema ${theme} não foi aplicado em ${route.path}`).toBe(theme === 'dark');

      // Rede de segurança: nenhuma animação em andamento quando o axe mede (mesma proteção do Scriptorium).
      await page.evaluate(() =>
        Promise.all(document.getAnimations().map((a) => a.finished.catch(() => undefined))),
      );

      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

      const report = results.violations
        .map((violation) => {
          const nodes = violation.nodes
            .map((node) => `        ${node.target.join(' ')}`)
            .join('\n');
          const n = violation.nodes.length;
          return `    [${violation.impact}] ${violation.id} — ${violation.help} (${n} nó${n > 1 ? 's' : ''})\n${nodes}\n        ${violation.helpUrl}`;
        })
        .join('\n');

      // Asserção booleana com mensagem, e não `toEqual([])`: o diff de array
      // despeja o objeto do axe inteiro no log do CI e esconde o que importa.
      const ok = results.violations.length === 0;
      expect(
        ok,
        `${results.violations.length} violação(ões) de acessibilidade em ${route.path} [${theme}]:\n${report}`,
      ).toBe(true);
    });
  }
}

// Movimento reduzido (WCAG 2.3.3 e boa prática): quem pede menos movimento ao sistema não deve ver animações de entrada.
// Antes de 30/10/2026 o app não tratava `prefers-reduced-motion` em lugar nenhum (38 usos de `animate-*`). Isto também
// é o passo 3 do risco aberto do E2E intermitente (ROADMAP): o axe media o contraste no meio da animação de entrada.
test.describe('movimento reduzido', () => {
  /** Maior duração de animação (s) entre os elementos que de fato animam na página. */
  const maiorDuracaoDeAnimacao = (page: import('@playwright/test').Page) =>
    page.evaluate(() => {
      let maior = 0;
      for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
        const cs = getComputedStyle(el);
        if (cs.animationName === 'none') continue;
        for (const d of cs.animationDuration.split(','))
          maior = Math.max(maior, parseFloat(d) || 0);
      }
      return maior;
    });

  test('sem preferência, a home tem animações de entrada (o teste abaixo não é vazio)', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible({ timeout: 15000 });
    expect(await maiorDuracaoDeAnimacao(page)).toBeGreaterThan(0.1);
  });

  test('com movimento reduzido, nenhuma animação passa de um instante', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible({ timeout: 15000 });
    expect(await maiorDuracaoDeAnimacao(page)).toBeLessThanOrEqual(0.001);
  });

  test('com movimento reduzido, as transições também ficam instantâneas', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible({ timeout: 15000 });
    const maior = await page.evaluate(() => {
      let m = 0;
      for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
        for (const d of getComputedStyle(el).transitionDuration.split(','))
          m = Math.max(m, parseFloat(d) || 0);
      }
      return m;
    });
    expect(maior).toBeLessThanOrEqual(0.001);
  });
});
