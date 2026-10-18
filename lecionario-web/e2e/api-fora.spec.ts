import { expect, test, type Page, type Route } from '@playwright/test';

/**
 * R5 (hetzner-infra/ROADMAP-CLUSTER.md): "API fora, o card some".
 *
 * Política do cluster (CONTRATOS-ENTRE-PROJETOS.md, 10.1): se a Citação do dia (Scriptorium) ou a
 * Pintura do Dia (Bíblia na Arte) falham, o card some INTEIRO: sem título solto, sem bloco vazio,
 * sem erro de JavaScript, e a página continua usável. Nunca conteúdo substituto.
 *
 * Este spec NÃO entra no portão do deploy (deploy.yml roda só a11y.spec.ts): é um teste de política,
 * e o E2E de acessibilidade já é intermitente. Roda no CI normal (ci.yml). As APIs são sempre
 * simuladas, nunca as de produção, para o resultado não depender da rede.
 */

const CORS = { 'access-control-allow-origin': '*' };

const CITACAO = {
  id: '00000000-0000-0000-0000-000000000001',
  date: '2026-10-18',
  author: 'C. S. Lewis',
  text: 'Frase de teste do E2E.',
  dominioPublico: false,
  source: null,
  scriptoriumUrl: null,
  theme: null,
  affiliateUrl: null,
};

const PINTURA = {
  id: '00000000-0000-0000-0000-000000000002',
  title: 'Obra de teste do E2E',
  subtitle: null,
  artistOrDirector: 'Museu / Artista de Teste',
  year: '1900',
  imageUrl: null,
  description: 'Uma cena de teste. Outra frase.',
  sourceUrl: null,
  references: [{ book: 'Lucas', chapter: 10, verses: '34' }],
};

const APIS = /api-(scriptorium|biblianaarte)\.narniano\.com/;

/** Responde às duas APIs conforme o cenário. */
async function simular(page: Page, cenario: 'ok' | 'recusada' | '503' | 'lenta') {
  await page.route(APIS, async (route: Route) => {
    const url = route.request().url();
    if (cenario === 'recusada') return route.abort('connectionrefused');
    if (cenario === '503') {
      return route.fulfill({ status: 503, headers: CORS, json: { error: 'service_unavailable' } });
    }
    if (cenario === 'lenta') {
      // Responde CERTO, mas só depois do limite de 5 s do fetcher: sem o limite o card apareceria
      // aos 7 s; com o limite o fetch já foi abortado e o card não pode aparecer nunca.
      await new Promise((r) => setTimeout(r, 7000));
      const corpoLento = url.includes('/quotes/daily') ? CITACAO : PINTURA;
      return route.fulfill({ status: 200, headers: CORS, json: corpoLento }).catch(() => undefined);
    }
    const corpo = url.includes('/quotes/daily') ? CITACAO : PINTURA;
    return route.fulfill({ status: 200, headers: CORS, json: corpo });
  });
}

// Erros que o AdSense (script de terceiro) lança sozinho: `Y` em produção e, em localhost,
// "adsbygoogle.push() error". Não são da aplicação e o AdSense não é o assunto deste spec.
const RUIDO_DE_TERCEIRO = /adsbygoogle|^Y$/;

async function abrir(page: Page) {
  const errosDeJs: string[] = [];
  page.on('pageerror', (e) => {
    if (!RUIDO_DE_TERCEIRO.test(e.message)) errosDeJs.push(e.message);
  });
  await page.goto('/');
  // A página em si (leituras) precisa estar de pé: o que some é só o card.
  await expect(page.locator('text=Lectio Divina')).toBeVisible({ timeout: 15000 });
  return errosDeJs;
}

const tituloCitacao = (page: Page) => page.getByText('Citação do dia', { exact: true });
const tituloPintura = (page: Page) => page.getByText('Pintura do Dia', { exact: true });

test.describe('API fora: os cards "do dia" somem inteiros', () => {
  test('controle: com as APIs respondendo, os dois cards aparecem', async ({ page }) => {
    await simular(page, 'ok');
    const erros = await abrir(page);
    await expect(tituloCitacao(page)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Frase de teste do E2E.')).toBeVisible();
    await expect(tituloPintura(page)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Obra de teste do E2E')).toBeVisible();
    expect(erros).toEqual([]);
  });

  for (const cenario of ['recusada', '503'] as const) {
    test(`API ${cenario === 'recusada' ? 'recusando a conexão' : 'respondendo 503'}: sem card, sem título solto, sem erro de JS`, async ({
      page,
    }) => {
      await simular(page, cenario);
      const erros = await abrir(page);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);
      await expect(tituloCitacao(page)).toHaveCount(0);
      await expect(tituloPintura(page)).toHaveCount(0);
      expect(erros).toEqual([]);
    });
  }

  test('API lenta (responde só depois do limite de tempo): sem card e a página continua usável', async ({
    page,
  }) => {
    await simular(page, 'lenta');
    const erros = await abrir(page);
    // A API responde aos 7 s; o fetcher desistiu aos 5 s. Aos 8,5 s o card tem de continuar ausente.
    await page.waitForTimeout(8500);
    await expect(tituloCitacao(page)).toHaveCount(0);
    await expect(tituloPintura(page)).toHaveCount(0);
    await expect(page.locator('text=Lectio Divina')).toBeVisible();
    expect(erros).toEqual([]);
  });
});
