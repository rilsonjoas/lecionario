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
      await page.emulateMedia({ colorScheme: theme });
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
