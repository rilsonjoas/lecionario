// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { LewisQuoteSection } from '../LewisQuoteSection';

const sample = {
  id: '11111111-1111-4111-8111-111111111111',
  date: '2026-09-23',
  author: 'C. S. Lewis',
  text: 'A porta para o inferno está trancada por dentro.',
  source: 'O Problema do Sofrimento',
  dominioPublico: false,
  scriptoriumUrl: null,
  theme: null,
  affiliateUrl: 'https://www.amazon.com.br/s?k=O%20Problema%20do%20Sofrimento&tag=rilson-20',
};

function stubFetch(ok: boolean, body?: unknown): void {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok, status: ok ? 200 : 500, json: async () => body }),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('LewisQuoteSection', () => {
  it('renderiza citação, autor e CTA de afiliado centralizado da API', async () => {
    stubFetch(true, sample);
    render(<LewisQuoteSection />);

    expect(await screen.findByText(/A porta para o inferno está trancada por dentro/)).toBeTruthy();
    expect(screen.getByText('C. S. LEWIS')).toBeTruthy();

    const cta = await screen.findByRole('link', {
      name: 'Abrir O Problema do Sofrimento na Amazon',
    });
    expect(cta.getAttribute('href')).toBe(sample.affiliateUrl);
    expect(cta.getAttribute('rel')).toBe('sponsored noopener noreferrer');
  });

  it('domínio público: CTA "Ler livro completo" sem link de afiliado', async () => {
    stubFetch(true, {
      ...sample,
      author: 'Santo Agostinho',
      source: 'Confissões',
      dominioPublico: true,
      scriptoriumUrl: 'https://scriptorium.narniano.com/livros/confissoes',
      affiliateUrl: null,
    });
    render(<LewisQuoteSection />);

    const cta = await screen.findByRole('link', { name: 'Ler livro completo ↗' });
    expect(cta.getAttribute('href')).toBe('https://scriptorium.narniano.com/livros/confissoes');
    expect(screen.queryByRole('link', { name: /na Amazon/ })).toBeNull();
  });

  it('fonte zerada (gate do Scriptorium): obra protegida SEM CTA e SEM "Ler livro completo"', async () => {
    // production/2026-10-01: o gate de CTA do Scriptorium zerou o `source` de
    // 8 citações de Lewis (nota editorial de Chesterton, carta de
    // Kierkegaard) para nunca fabriar uma obra. A API devolve `dominioPublico:
    // false` — a obra é protegida — mas `source: null` e `affiliateUrl: null`.
    //
    // Este é o único caso com os DOIS lados nulos, e é o que a combinação
    // "não-pública + sem fonte" produz: os testes acima só cobriam `null` com
    // `dominioPublico: true`. Sem este teste, uma regressão que fizesse o
    // componente renderizar `— null ↗` ou um href vazio passaria batida.
    stubFetch(true, {
      ...sample,
      source: null,
      dominioPublico: false,
      scriptoriumUrl: null,
      affiliateUrl: null,
    });
    render(<LewisQuoteSection />);

    // A citação e o autor continuam aparecendo — some com graça é só o CTA.
    expect(await screen.findByText(/A porta para o inferno está trancada por dentro/)).toBeTruthy();
    expect(screen.getByText('C. S. LEWIS')).toBeTruthy();

    // Nenhum CTA, de nenhum tipo, e nenhum texto vazio/"null" vazando.
    expect(screen.queryByRole('link', { name: /na Amazon/ })).toBeNull();
    expect(screen.queryByRole('link', { name: /Ler livro completo/ })).toBeNull();
    expect(document.body.textContent).not.toMatch(/null/);
    expect(document.body.textContent).not.toMatch(/—\s*↗/);
  });

  it('API inconsistente (affiliateUrl sem source): não renderiza CTA com "null" vazando', async () => {
    // Defesa em profundidade contra a API. O `source` é a única coisa que dá
    // nome ao link ("— {source} ↗"), então se algum dia a API devolver
    // `affiliateUrl` sem `source`, a guarda `amazonUrl && quote.source`
    // segura e o card mostra só a citação. Sem este teste, tirar essa guarda
    // renderiza "— null ↗" e ninguém percebe, porque o fixture normal tem os
    // dois campos preenchidos.
    stubFetch(true, {
      ...sample,
      source: null,
      affiliateUrl: 'https://www.amazon.com.br/s?k=SemFonte&tag=rilson-20',
    });
    render(<LewisQuoteSection />);

    expect(await screen.findByText(/A porta para o inferno está trancada por dentro/)).toBeTruthy();
    expect(screen.queryByRole('link', { name: /na Amazon/ })).toBeNull();
    expect(document.body.textContent).not.toMatch(/null/);
  });

  it('API fora do ar → some com graça', async () => {
    stubFetch(false);
    const { container } = render(<LewisQuoteSection />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(container.children).toHaveLength(0);
  });
});
