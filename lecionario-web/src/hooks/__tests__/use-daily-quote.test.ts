// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDailyQuote } from '../use-daily-quote';

const quoteDe = (dia: string, texto: string) => ({
  id: dia,
  date: dia,
  author: 'C. S. Lewis',
  text: texto,
  source: null,
  dominioPublico: false,
  scriptoriumUrl: null,
  theme: null,
  affiliateUrl: null,
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useDailyQuote', () => {
  it('troca a citação quando a data muda (o caso reportado)', async () => {
    const fetchMock = vi.fn().mockImplementation(async (url: string) => {
      const dia = new URL(url).searchParams.get('date') ?? 'hoje';
      return { ok: true, json: async () => quoteDe(dia, `frase de ${dia}`) };
    });
    vi.stubGlobal('fetch', fetchMock);

    const { result, rerender } = renderHook(({ date }) => useDailyQuote(date), {
      initialProps: { date: '2026-10-12' },
    });
    await waitFor(() => expect(result.current?.text).toBe('frase de 2026-10-12'));

    rerender({ date: '2026-10-13' });
    await waitFor(() => expect(result.current?.text).toBe('frase de 2026-10-13'));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('não busca de novo quando a data é a mesma, mesmo com um Date novo a cada render', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => quoteDe('2026-10-12', 'x') });
    vi.stubGlobal('fetch', fetchMock);

    const { rerender } = renderHook(({ date }) => useDailyQuote(date), {
      initialProps: { date: new Date(2026, 9, 12) },
    });
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    rerender({ date: new Date(2026, 9, 12) });
    rerender({ date: new Date(2026, 9, 12, 18) });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('se a busca do novo dia falhar, o card some em vez de manter a frase de outro dia', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => quoteDe('2026-10-12', 'frase do dia 12'),
      })
      .mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);

    const { result, rerender } = renderHook(({ date }) => useDailyQuote(date), {
      initialProps: { date: '2026-10-12' },
    });
    await waitFor(() => expect(result.current?.text).toBe('frase do dia 12'));
    rerender({ date: '2026-10-13' });
    await waitFor(() => expect(result.current).toBeNull());
  });
});
