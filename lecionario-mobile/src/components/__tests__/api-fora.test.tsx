import { afterEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot } from 'test-renderer';
import { ArtCard } from '@/components/ArtCard';
import { QuoteCard } from '@/components/QuoteCard';
import { useDailyQuote } from '@/lib/use-daily-quote';

/**
 * R5 (hetzner-infra/ROADMAP-CLUSTER.md): "API fora, o card some" no mobile.
 *
 * Política do cluster (CONTRATOS-ENTRE-PROJETOS.md, 10.1): se a Citação do dia (Scriptorium) ou a
 * Pintura do Dia (Bíblia na Arte) falham, o card some INTEIRO: nada na árvore, sem título solto,
 * sem bloco vazio, sem erro. Nunca conteúdo substituto. Mesma política que o spec E2E do web
 * (`lecionario-web/e2e/api-fora.spec.ts`); aqui testada nos componentes, com o `fetch` simulado.
 *
 * `HomeScreen` mostra o `QuoteCard` só quando `useDailyQuote` devolve algo; o `Cartao` abaixo
 * reproduz exatamente essa ligação (hook + card) para testar a política sem montar a tela inteira.
 */

interface TestRenderer {
  render: (element: React.ReactNode) => void;
  container: { toJSON: () => unknown };
}

async function montar(element: React.ReactElement): Promise<TestRenderer> {
  const root = createRoot({ textComponentTypes: ['text'] }) as TestRenderer;
  await act(async () => {
    root.render(element as never);
  });
  return root;
}

function textoDe(node: unknown): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textoDe).join(' ');
  const obj = node as { children?: unknown[] };
  return Array.isArray(obj.children) ? obj.children.map(textoDe).join(' ') : '';
}

function CartaoDeCitacao() {
  const citacao = useDailyQuote('2026-10-18');
  return citacao ? <QuoteCard quote={citacao} /> : null;
}

const CITACAO_DA_API = {
  id: '00000000-0000-0000-0000-000000000001',
  date: '2026-10-18',
  author: 'C. S. Lewis',
  text: 'Frase de teste.',
  dominioPublico: false,
  source: null,
  scriptoriumUrl: null,
  theme: null,
  affiliateUrl: null,
};

const PINTURA_DA_API = {
  id: '00000000-0000-0000-0000-000000000002',
  title: 'Obra de teste',
  subtitle: null,
  artistOrDirector: 'Museu / Artista de Teste',
  year: '1900',
  imageUrl: null,
  description: 'Uma cena de teste. Outra frase.',
  sourceUrl: null,
  references: [{ book: 'Lucas', chapter: 10, verses: '34' }],
};

/** fetch lento: responde CERTO, mas só aos 7 s, depois do limite de 5 s. Honra o cancelamento (como o de
 *  verdade). Sem o limite o card apareceria aos 7 s; com o limite o fetch já foi abortado e ele nunca aparece. */
function fetchLento(corpo: unknown) {
  return vi.fn(
    (_url: string, init?: RequestInit) =>
      new Promise<Response>((resolve, reject) => {
        const abortado = () => reject(new DOMException('abortado', 'AbortError'));
        if (init?.signal?.aborted) return abortado();
        init?.signal?.addEventListener('abort', abortado);
        setTimeout(() => resolve(resposta(corpo)), 7000);
      }),
  );
}

/** Árvore vazia: no `test-renderer` um componente que devolve null deixa só a raiz, sem filhos nem texto. */
function expectVazia(raiz: TestRenderer) {
  const arvore = raiz.container.toJSON() as { children?: unknown[] } | null;
  expect(arvore === null || (arvore.children ?? []).length === 0).toBe(true);
  expect(textoDe(arvore)).toBe('');
}

const resposta = (corpo: unknown, ok = true) =>
  ({ ok, status: ok ? 200 : 503, json: async () => corpo }) as Response;

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe.each([
  ['Citação do dia', () => <CartaoDeCitacao />, CITACAO_DA_API, 'Frase de teste.'],
  ['Pintura do Dia', () => <ArtCard date="2026-10-18" />, PINTURA_DA_API, 'Obra de teste'],
] as const)('%s: API fora, o card some inteiro', (_nome, cartao, corpoOk, textoEsperado) => {
  it('controle: com a API respondendo, o card aparece', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(resposta(corpoOk)));
    const raiz = await montar(cartao());
    expect(textoDe(raiz.container.toJSON())).toContain(textoEsperado);
  });

  it('conexão recusada: nada na árvore', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    const raiz = await montar(cartao());
    expectVazia(raiz);
  });

  it('503: nada na árvore', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(resposta({ error: 'indisponivel' }, false)));
    const raiz = await montar(cartao());
    expectVazia(raiz);
  });

  it('API lenta (responde só depois do limite de tempo): nada na árvore, nem depois', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', fetchLento(corpoOk));
    const raiz = await montar(cartao());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(8000);
    });
    expectVazia(raiz);
  });
});
