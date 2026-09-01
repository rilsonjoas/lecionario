import { parseReference } from './reference-parser';

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

function getDateSeed(date?: Date | string): number {
  if (!date) return 0;
  let dateStr = '';
  if (typeof date === 'string') {
    dateStr = date.split('T')[0];
  } else if (date instanceof Date && !isNaN(date.getTime())) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    dateStr = `${y}-${m}-${d}`;
  }
  if (!dateStr) return 0;

  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Consulta o "pool" de obras que casam com uma referência — tenta primeiro
 *  o versículo exato (curadoria do Bíblia na Arte quase nunca registra, mas
 *  quando registra é o melhor match), senão cai pro capítulo. */
async function getPoolForReference(ref: string, signal?: AbortSignal): Promise<Artwork[]> {
  const parsed = parseReference(ref);
  if (!parsed) return [];

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
      });
      const exactItems = await queryArtworks(withVerses, signal);
      if (exactItems.length > 0) return exactItems;
    }

    const byChapter = new URLSearchParams({
      bookSlug: parsed.bookSlug,
      chapter: String(parsed.chapter),
    });
    return await queryArtworks(byChapter, signal);
  } catch {
    return [];
  }
}

function pickArtwork(pool: Artwork[], date?: Date | string): Artwork | null {
  if (pool.length === 0) return null;
  const seed = getDateSeed(date);
  const pick = pool[seed % pool.length];
  return { ...pick, artistOrDirector: normalizeArtist(pick.artistOrDirector) };
}

export async function fetchArtworkForReference(
  ref: string,
  arg2?: AbortSignal | Date | string,
  arg3?: Date | string,
): Promise<Artwork | null> {
  let signal: AbortSignal | undefined;
  let date: Date | string | undefined;

  if (arg2 instanceof AbortSignal) {
    signal = arg2;
    date = arg3;
  } else {
    date = arg2 ?? arg3;
  }

  return pickArtwork(await getPoolForReference(ref, signal), date);
}

/** Tenta cada referência do dia e fica com a que tem o MAIOR número de
 *  obras catalogadas — é a única que consegue variar dia após dia.
 *
 *  Antes, o loop parava na PRIMEIRA referência com qualquer obra: numa
 *  semana útil, se a 1ª leitura tivesse 1 obra e o Evangelho tivesse 13, a
 *  mesma pintura aparecia a semana inteira (o date-seed `% 1` sempre cai no
 *  mesmo). Preferir o pool maior faz o Evangelho de Marcos (13 obras) vencer
 *  sobre 2 Pedro 3 (1 obra), devolvendo a rotação diária. */
export async function fetchArtworkForReferences(
  refs: string[],
  arg2?: AbortSignal | Date | string,
  arg3?: Date | string,
): Promise<Artwork | null> {
  let signal: AbortSignal | undefined;
  let date: Date | string | undefined;

  if (arg2 instanceof AbortSignal) {
    signal = arg2;
    date = arg3;
  } else {
    date = arg2 ?? arg3;
  }

  let bestPool: Artwork[] = [];
  for (const ref of refs) {
    const pool = await getPoolForReference(ref, signal);
    if (pool.length > bestPool.length) bestPool = pool;
    if (bestPool.length >= 3) break; // já garante rotação diária; evita chamadas desnecessárias
  }

  return pickArtwork(bestPool, date);
}
