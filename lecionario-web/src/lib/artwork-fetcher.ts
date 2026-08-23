import { parseReference } from './reference-parser';

// Espelha lecionario-mobile/src/lib/artwork-fetcher.ts (mesma API, mesma
// lógica de tentativa por versículo com fallback por capítulo) — este
// projeto não usa pacote compartilhado entre mobile e web, então a
// duplicação é intencional, ver rcl-fetcher.ts como precedente.
const API_BASE = 'https://api-biblianaarte.narniano.com/api/v1';

export interface ArtworkReference {
  book: string;
  chapter: number;
  verses: string | null;
}

export interface Artwork {
  id: string;
  title: string;
  subtitle: string | null;
  artistOrDirector: string;
  year: string | null;
  imageUrl: string | null;
  description: string;
  sourceUrl: string | null;
  references: ArtworkReference[];
}

export interface ArtworkResponse {
  items: Artwork[];
  total: number;
}

function normalizeArtist(raw: string): string {
  const sep = '/';
  const idx = raw.indexOf(sep);
  return idx > -1 ? raw.slice(idx + sep.length).trim() : raw;
}

async function queryArtworks(params: URLSearchParams, signal?: AbortSignal): Promise<Artwork[]> {
  const res = await fetch(`${API_BASE}/artworks?${params}`, { signal });
  if (!res.ok) return [];
  const data: ArtworkResponse = await res.json();
  return data.items;
}

export async function fetchArtworkForReference(
  ref: string,
  signal?: AbortSignal,
): Promise<Artwork | null> {
  const parsed = parseReference(ref);
  if (!parsed) return null;

  try {
    // Curadoria do Bíblia na Arte quase nunca registra versículo exato
    // (ver ROADMAP) — tenta mesmo assim, sem depender disso: se não achar
    // nada nesse nível de detalhe, cai pro casamento por capítulo de
    // sempre. Fica melhor conforme mais obras forem catalogadas com
    // versículo, sem quebrar o que já funciona hoje.
    if (parsed.verses) {
      const withVerses = new URLSearchParams({
        bookSlug: parsed.bookSlug,
        chapter: String(parsed.chapter),
        verses: parsed.verses,
        limit: '1',
      });
      const [exact] = await queryArtworks(withVerses, signal);
      if (exact) return { ...exact, artistOrDirector: normalizeArtist(exact.artistOrDirector) };
    }

    const byChapter = new URLSearchParams({
      bookSlug: parsed.bookSlug,
      chapter: String(parsed.chapter),
      limit: '1',
    });
    const [byChapterMatch] = await queryArtworks(byChapter, signal);
    if (!byChapterMatch) return null;
    return {
      ...byChapterMatch,
      artistOrDirector: normalizeArtist(byChapterMatch.artistOrDirector),
    };
  } catch {
    return null;
  }
}

/** Tenta cada referência do dia em ordem até achar uma pintura — a leitura
 *  do Evangelho costuma ter mais obras catalogadas que a do Antigo
 *  Testamento, então usar só a primeira leitura deixaria passar match bom
 *  nas outras. */
export async function fetchArtworkForReferences(
  refs: string[],
  signal?: AbortSignal,
): Promise<Artwork | null> {
  for (const ref of refs) {
    const artwork = await fetchArtworkForReference(ref, signal);
    if (artwork) return artwork;
  }
  return null;
}
