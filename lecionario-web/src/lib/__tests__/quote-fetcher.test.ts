import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchDailyQuote } from '../quote-fetcher';

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

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchDailyQuote', () => {
  it('busca na API do Scriptorium (fonte única) e devolve a citação', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => sample }),
    );
    const quote = await fetchDailyQuote();
    expect(fetch).toHaveBeenCalledWith('https://api-scriptorium.narniano.com/api/v1/quotes/daily', {
      signal: undefined,
    });
    expect(quote).toEqual(sample);
  });

  it('não respondeu (404/5xx) → null, some com graça', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 503, json: async () => ({}) }),
    );
    expect(await fetchDailyQuote()).toBeNull();
  });

  it('erro de rede → null, some com graça', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('falha de rede')));
    expect(await fetchDailyQuote()).toBeNull();
  });
});
