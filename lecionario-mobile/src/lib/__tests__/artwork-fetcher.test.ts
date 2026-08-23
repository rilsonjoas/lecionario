import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  fetchArtworkForReference,
  fetchArtworkForReferences,
  type Artwork,
} from '../artwork-fetcher';

function makeArtwork(overrides: Partial<Artwork> = {}): Artwork {
  return {
    id: '1',
    title: 'Cristo no Getsêmani',
    subtitle: null,
    artistOrDirector: 'Wikimedia Commons / Hermann Clementz',
    year: '1900',
    imageUrl: '/images/hermann-clementz.webp',
    description: 'desc',
    sourceUrl: null,
    references: [{ book: 'Mateus', chapter: 26, verses: null }],
    ...overrides,
  };
}

function mockFetchOnce(response: { items: Artwork[] }, ok = true) {
  return vi.fn().mockResolvedValueOnce({
    ok,
    json: async () => response,
  });
}

describe('fetchArtworkForReference', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('retorna null pra referência que não casa com nenhum livro conhecido', async () => {
    const result = await fetchArtworkForReference('Livro Fantasia 1:1');
    expect(result).toBeNull();
  });

  it('tenta o match por versículo primeiro; usa se achar', async () => {
    const artwork = makeArtwork();
    const fetchMock = mockFetchOnce({ items: [artwork] });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchArtworkForReference('Mateus 26:39');

    expect(result?.id).toBe('1');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('verses=39');
  });

  it('sem match por versículo, cai pro match por capítulo (sem quebrar)', async () => {
    const artwork = makeArtwork();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ items: [] }) }) // tentativa com verses
      .mockResolvedValueOnce({ ok: true, json: async () => ({ items: [artwork] }) }); // fallback por capítulo
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchArtworkForReference('Mateus 26:39');

    expect(result?.id).toBe('1');
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toContain('verses=39');
    expect(fetchMock.mock.calls[1][0]).not.toContain('verses=');
  });

  it('referência sem versículo (ex.: Salmo) só consulta por capítulo', async () => {
    const artwork = makeArtwork({ references: [{ book: 'Salmos', chapter: 122, verses: null }] });
    const fetchMock = mockFetchOnce({ items: [artwork] });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchArtworkForReference('Salmo 122');

    expect(result?.id).toBe('1');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).not.toContain('verses=');
  });

  it('normaliza o nome do artista removendo prefixo "fonte / "', async () => {
    const artwork = makeArtwork({ artistOrDirector: 'Wikimedia Commons / Hermann Clementz' });
    vi.stubGlobal('fetch', mockFetchOnce({ items: [artwork] }));

    const result = await fetchArtworkForReference('Salmo 122');

    expect(result?.artistOrDirector).toBe('Hermann Clementz');
  });

  it('retorna null quando a API responde com erro', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({ ok: false, json: async () => ({}) }));

    const result = await fetchArtworkForReference('Salmo 122');

    expect(result).toBeNull();
  });
});

describe('fetchArtworkForReferences', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('tenta cada referência em ordem até achar uma pintura', async () => {
    const artwork = makeArtwork({ references: [{ book: 'Mateus', chapter: 26, verses: null }] });
    const fetchMock = vi
      .fn()
      // "Isaías 2:1-5" (1ª leitura): sem versículo, sem capítulo — 1 chamada
      .mockResolvedValueOnce({ ok: true, json: async () => ({ items: [] }) })
      // "Salmo 122": sem versículo — 1 chamada
      .mockResolvedValueOnce({ ok: true, json: async () => ({ items: [] }) })
      // "Mateus 24:36-44" (evangelho): tenta versículo (vazio), cai pro capítulo (acha)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ items: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ items: [artwork] }) });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchArtworkForReferences([
      'Isaías 2:1-5',
      'Salmo 122',
      'Mateus 24:36-44',
    ]);

    expect(result?.id).toBe('1');
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it('retorna null se nenhuma das referências achar pintura', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ items: [] }) }),
    );

    const result = await fetchArtworkForReferences(['Isaías 2:1-5', 'Salmo 122']);

    expect(result).toBeNull();
  });
});
