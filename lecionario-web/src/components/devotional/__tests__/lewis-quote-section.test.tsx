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

  it('API fora do ar → some com graça', async () => {
    stubFetch(false);
    const { container } = render(<LewisQuoteSection />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(container.children).toHaveLength(0);
  });
});
