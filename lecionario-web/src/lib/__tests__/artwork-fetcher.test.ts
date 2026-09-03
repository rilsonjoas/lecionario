import { describe, expect, it, vi, afterEach } from 'vitest';
import { fetchDailyArtwork } from '../artwork-fetcher';

const mockArtwork = {
  id: 'abc123',
  title: 'O bom samaritano',
  subtitle: null,
  artistOrDirector: 'Museu / Aimé Morot',
  year: '1880',
  imageUrl: '/images/aime-morot-o-bom-samaritano.webp',
  description: '',
  sourceUrl: null,
  references: [{ book: 'Lucas', chapter: 10, verses: '34' }],
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('fetchDailyArtwork', () => {
  it('busca a pintura do dia no endpoint /artworks/daily do Bíblia na Arte', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => mockArtwork });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchDailyArtwork('2025-07-13');

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/artworks/daily?date=2025-07-13'),
      expect.anything(),
    );
    // "Museu / Aimé Morot" -> só o que vem depois da "/" (mesma
    // normalização de sempre, ver `normalizeArtist`).
    expect(result?.artistOrDirector).toBe('Aimé Morot');
    expect(result?.title).toBe('O bom samaritano');
  });

  it('devolve null quando a API responde erro', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    expect(await fetchDailyArtwork('2026-01-01')).toBeNull();
  });

  it('devolve null quando o fetch lança (rede fora, offline)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    expect(await fetchDailyArtwork('2026-01-01')).toBeNull();
  });

  it('usa a data de hoje quando nenhuma é passada', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => mockArtwork });
    vi.stubGlobal('fetch', fetchMock);

    await fetchDailyArtwork();

    const todayISO = new Date().toISOString().split('T')[0];
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(`/artworks/daily?date=${todayISO}`),
      expect.anything(),
    );
  });
});
