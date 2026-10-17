import { describe, expect, it, vi, afterEach } from 'vitest';
import { diaParaApi, fetchDailyQuote } from '../quote-fetcher';

const mockQuote = {
  id: '8a4c2a4e-3db7-4b96-a3a7-257f8afcfe83',
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
  vi.restoreAllMocks();
});

describe('fetchDailyQuote', () => {
  it('busca a citação do dia no endpoint /quotes/daily do Scriptorium (fonte única)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => mockQuote });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchDailyQuote();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api-scriptorium.narniano.com/api/v1/quotes/daily',
      expect.anything(),
    );
    expect(result?.quote).toBe('A porta para o inferno está trancada por dentro.');
    expect(result?.author).toBe('C. S. Lewis');
    expect(result?.affiliateUrl).toContain('tag=rilson-20');
  });

  it('devolve null quando a API responde erro', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    expect(await fetchDailyQuote()).toBeNull();
  });

  it('devolve null quando o fetch lança (rede fora, offline)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    expect(await fetchDailyQuote()).toBeNull();
  });
});

describe('fetchDailyQuote: segue a data escolhida', () => {
  it('sem data pede "hoje" (a API resolve em America/Sao_Paulo)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => mockQuote });
    vi.stubGlobal('fetch', fetchMock);
    await fetchDailyQuote();
    expect(fetchMock.mock.calls[0]![0]).toBe(
      'https://api-scriptorium.narniano.com/api/v1/quotes/daily',
    );
  });

  it('com data em texto manda ?date= (o bug: antes a frase de hoje ficava ao trocar de dia)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => mockQuote });
    vi.stubGlobal('fetch', fetchMock);
    await fetchDailyQuote('2026-10-12');
    expect(fetchMock.mock.calls[0]![0]).toBe(
      'https://api-scriptorium.narniano.com/api/v1/quotes/daily?date=2026-10-12',
    );
  });

  it('com Date usa o dia local do usuário e ignora a hora', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => mockQuote });
    vi.stubGlobal('fetch', fetchMock);
    await fetchDailyQuote(new Date(2026, 9, 5, 23, 59));
    expect(fetchMock.mock.calls[0]![0]).toContain('?date=2026-10-05');
  });

  it('dias diferentes geram pedidos diferentes', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => mockQuote });
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
