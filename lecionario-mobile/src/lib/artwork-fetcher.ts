// Espelha lecionario-web/src/lib/artwork-fetcher.ts (mesma API) — este
// projeto não usa pacote compartilhado entre mobile e web, então a
// duplicação é intencional, ver rcl-fetcher.ts como precedente.
//
// SIMPLIFICADO (2026-09-02, ROADMAP "Pintura do Dia sumindo em alguns
// dias + sincronizar com Bíblia na Arte"): antes este arquivo repetia
// aqui, no cliente, a lógica de "pool por referência + escolha por
// data" (parseReference/bible-books/múltiplos fetches por leitura,
// biggest-pool-wins). Isso agora vive UMA vez só, do lado do Bíblia na
// Arte (`GET /artworks/daily?date=`, que já olha a mesma tabela de
// leituras do Lecionário) — chamar esse único endpoint garante que as
// duas pontas mostrem a MESMA obra no mesmo dia, e elimina toda a
// duplicação de reference-parser.ts/bible-books.ts que existia só pra
// isso.
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

function normalizeArtist(raw: string): string {
  const sep = '/';
  const idx = raw.indexOf(sep);
  return idx > -1 ? raw.slice(idx + sep.length).trim() : raw;
}

function toDateStr(date?: Date | string): string {
  if (!date) return new Date().toISOString().split('T')[0]!;
  if (typeof date === 'string') return date.split('T')[0]!;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** "Pintura do Dia" — busca direto no Bíblia na Arte, que já resolve a
 *  leitura litúrgica do dia internamente (ou cai pro sorteio aleatório
 *  de sempre quando a data está fora da tabela copiada). 404 é
 *  resultado válido (acervo vazio, nunca aconteceu em produção) — vira
 *  `null`, tratado com a mesma "some com graça" de sempre. */
export async function fetchDailyArtwork(
  date?: Date | string,
  signal?: AbortSignal,
): Promise<Artwork | null> {
  try {
    const res = await fetch(`${API_BASE}/artworks/daily?date=${toDateStr(date)}`, { signal });
    if (!res.ok) return null;
    const artwork: Artwork = await res.json();
    return { ...artwork, artistOrDirector: normalizeArtist(artwork.artistOrDirector) };
  } catch {
    return null;
  }
}
