import { parseReference } from './reference-parser';

const API_BASE = 'https://api-biblianaarte.narniano.com/api/v1';

export interface Artwork {
  id: string;
  title: string;
  subtitle: string | null;
  artistOrDirector: string;
  year: string | null;
  imageUrl: string | null;
  description: string;
  sourceUrl: string | null;
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

export async function fetchArtworkForReference(
  ref: string,
  signal?: AbortSignal,
): Promise<Artwork | null> {
  const parsed = parseReference(ref);
  if (!parsed) return null;

  try {
    const url = `${API_BASE}/artworks?bookSlug=${parsed.bookSlug}&chapter=${parsed.chapter}&limit=1`;
    const res = await fetch(url, { signal });
    if (!res.ok) return null;
    const data: ArtworkResponse = await res.json();
    if (data.items.length === 0) return null;
    const raw = data.items[0];
    return { ...raw, artistOrDirector: normalizeArtist(raw.artistOrDirector) };
  } catch {
    return null;
  }
}
