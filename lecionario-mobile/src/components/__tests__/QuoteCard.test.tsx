import { describe, it, expect } from 'vitest';
import { act } from 'react';
import { createRoot } from 'test-renderer';
import { QuoteCard } from '@/components/QuoteCard';
import type { DailyQuote } from '@/lib/quote-fetcher';

/**
 * Contrato do CTA do QuoteCard (mobile) contra a API do Scriptorium.
 *
 * O web já tinha `lewis-quote-section.test.tsx` cobrindo isso; o mobile não
 * tinha NENHUM teste deste componente, e é justamente o que mais consome a
 * resposta da API de citações. O `source`/`affiliateUrl` chegam como `null`
 * desde o gate de CTA do Scriptorium (obra protegida sem fonte verificada
 * não pode virar link de afiliado nem Inventar título), então o card precisa
 * lidar com isso sem vazar "null" na tela nem no leitor de tela.
 *
 * Usa o renderer universal `test-renderer` (o mesmo por baixo do RNTL) via
 * `createRoot` + `act`; os primitivos de `react-native` viram `<div>`/`<text>`
 * (ver `src/test/rn-native-stub.tsx`, via alias no vitest.config).
 */

interface TestRenderer {
  render: (element: React.ReactNode) => void;
  container: { toJSON: () => unknown };
}

async function renderTree(element: React.ReactElement): Promise<TestRenderer> {
  const root = createRoot({ textComponentTypes: ['text'] }) as TestRenderer;
  await act(async () => {
    root.render(element as never);
  });
  return root;
}

const sample: DailyQuote = {
  id: '8a4c2a4e-3db7-4b96-a3a7-257f8afcfe83',
  date: '2026-09-23',
  author: 'C. S. Lewis',
  quote: 'A porta para o inferno está trancada por dentro.',
  source: 'O Problema do Sofrimento',
  dominioPublico: false,
  scriptoriumUrl: null,
  theme: null,
  affiliateUrl: 'https://www.amazon.com.br/s?k=O%20Problema%20do%20Sofrimento&tag=rilson-20',
};

/** Serializa a árvore em texto para poder afirmar que "null" não vazou. */
function textOf(node: unknown): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(' ');
  const obj = node as { children?: unknown[] };
  return Array.isArray(obj.children) ? obj.children.map(textOf).join(' ') : '';
}

/** Lê os rótulos de acessibilidade da árvore.
 *
 * O stub de `react-native` converte `accessibilityLabel` em `aria-label`
 * (ver `src/test/rn-native-stub.tsx`), então é por `aria-label` que se
 * enxerga o que o leitor de tela anunciaria. */
function labelsOf(node: unknown, acc: string[] = []): string[] {
  if (node === null || node === undefined || typeof node !== 'object') return acc;
  if (Array.isArray(node)) {
    node.forEach((n) => labelsOf(n, acc));
    return acc;
  }
  const obj = node as { props?: Record<string, unknown>; children?: unknown[] };
  const label = obj.props?.['aria-label'];
  if (typeof label === 'string') acc.push(label);
  if (Array.isArray(obj.children)) obj.children.forEach((c) => labelsOf(c, acc));
  return acc;
}

describe('QuoteCard — contrato de CTA', () => {
  it('citação normal: mostra CTA de afiliado com o nome da obra', async () => {
    const { container } = await renderTree(<QuoteCard quote={sample} />);

    expect(textOf(container.toJSON())).toContain(
      'A porta para o inferno está trancada por dentro.',
    );
    expect(labelsOf(container.toJSON())).toContain('Abrir O Problema do Sofrimento na Amazon');
  });

  it('fonte zerada (gate do Scriptorium): obra protegida sem CTA e sem "null" na tela', async () => {
    // production/2026-10-01: o gate zerou o `source` de 8 citações de Lewis.
    // A API devolve `dominioPublico: false` (obra protegida) com `source: null`
    // e `affiliateUrl: null` — o card tem de mostrar só a citação.
    const { container } = await renderTree(
      <QuoteCard quote={{ ...sample, source: null, scriptoriumUrl: null, affiliateUrl: null }} />,
    );

    const text = textOf(container.toJSON());
    expect(text).toContain('A porta para o inferno está trancada por dentro.');
    expect(text).not.toMatch(/null/);
    expect(labelsOf(container.toJSON())).not.toContain('Abrir null na Amazon');
  });

  it('API inconsistente (affiliateUrl sem source): não renderiza CTA com "null" vazando', async () => {
    // O `source` é o que dá nome ao link. Se a API um dia mandar
    // `affiliateUrl` sem `source`, a guarda `amazonUrl && quote.source`
    // segura — sem este teste, tirá-la vaza "— null" na tela e o leitor de
    // tela anuncia "Abrir null na Amazon".
    const { container } = await renderTree(
      <QuoteCard
        quote={{ ...sample, source: null, affiliateUrl: 'https://amazon.com.br/s?k=SemFonte' }}
      />,
    );

    const text = textOf(container.toJSON());
    expect(text).toContain('A porta para o inferno está trancada por dentro.');
    expect(text).not.toMatch(/null/);
  });

  it('scriptoriumUrl sem source: label do pill é estático, nunca "Ler null completo"', async () => {
    // Regressão real: o label era `` `Ler ${quote.source} completo` ``, então
    // qualquer citação com `source: null` + `scriptoriumUrl` preenchido fazia o
    // TalkBack anunciar "Ler null completo". Em produção as 8 citações de fonte
    // zerada também têm `scriptoriumUrl: null`, mas a mina fica armada para
    // quem popular a URL do Scriptorium sem a fonte.
    const { container } = await renderTree(
      <QuoteCard
        quote={{
          ...sample,
          source: null,
          affiliateUrl: null,
          scriptoriumUrl: 'https://scriptorium.narniano.com/livros/xyz',
        }}
      />,
    );

    const labels = labelsOf(container.toJSON());
    expect(labels).toContain('Ler livro completo');
    labels.forEach((l) => expect(l).not.toMatch(/null/));
  });

  it('quote nulo (API fora do ar): some com graça', async () => {
    // O `test-renderer` devolve um nó raiz mesmo para render vazio, então a
    // afirmação é sobre não haver conteúdo — não sobre a forma da raiz.
    const { container } = await renderTree(<QuoteCard quote={null} />);
    expect(textOf(container.toJSON())).toBe('');
    expect(labelsOf(container.toJSON())).toEqual([]);
  });
});
