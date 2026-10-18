import { afterEach, describe, expect, it, vi } from 'vitest';
import { diaParaApi, fetchDailyQuote } from '../quote-fetcher';

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
      signal: expect.any(AbortSignal),
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

describe('fetchDailyQuote: segue a data escolhida', () => {
  it('sem data pede "hoje" (a API resolve em America/Sao_Paulo)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => sample });
    vi.stubGlobal('fetch', fetchMock);
    await fetchDailyQuote();
    expect(fetchMock.mock.calls[0]![0]).toBe(
      'https://api-scriptorium.narniano.com/api/v1/quotes/daily',
    );
  });

  it('com data em texto manda ?date= (o bug: antes a frase de hoje ficava ao trocar de dia)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => sample });
    vi.stubGlobal('fetch', fetchMock);
    await fetchDailyQuote('2026-10-12');
    expect(fetchMock.mock.calls[0]![0]).toBe(
      'https://api-scriptorium.narniano.com/api/v1/quotes/daily?date=2026-10-12',
    );
  });

  it('com Date usa o dia local do usuário e ignora a hora', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => sample });
    vi.stubGlobal('fetch', fetchMock);
    await fetchDailyQuote(new Date(2026, 9, 5, 23, 59));
    expect(fetchMock.mock.calls[0]![0]).toContain('?date=2026-10-05');
  });

  it('dias diferentes geram pedidos diferentes', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => sample });
    vi.stubGlobal('fetch', fetchMock);
    await fetchDailyQuote('2026-10-12');
    await fetchDailyQuote('2026-10-13');
    expect(fetchMock.mock.calls[0]![0]).not.toBe(fetchMock.mock.calls[1]![0]);
  });
});

describe('diaParaApi', () => {
  it('formata e normaliza', () => {
    expect(diaParaApi()).toBeNull();
    expect(diaParaApi('2026-10-12T15:00:00Z')).toBe('2026-10-12');
    expect(diaParaApi(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});

describe('fetchDailyQuote com a API lenta (política do cluster: toda chamada tem limite)', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('API que não responde vira null depois do limite de tempo, e o card some', async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url: string, init?: RequestInit) =>
          new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener('abort', () =>
              reject(new DOMException('abortado', 'AbortError')),
            );
          }),
      ),
    );
    const resultado = fetchDailyQuote();
    await vi.advanceTimersByTimeAsync(5001);
    expect(await resultado).toBeNull();
  });
});
