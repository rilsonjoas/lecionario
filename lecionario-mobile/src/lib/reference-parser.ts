import { BOOK_MAP } from './bible-books';

export interface ParsedReference {
  bookSlug: string;
  chapter: number;
}

const REF_PATTERN = /^(.+?)\s+(\d+)/;

export function parseReference(ref: string): ParsedReference | null {
  const match = ref.trim().match(REF_PATTERN);
  if (!match) return null;

  const [, rawBook, rawChapter] = match;
  const slug = BOOK_MAP[rawBook];
  if (!slug) return null;

  return { bookSlug: slug, chapter: parseInt(rawChapter, 10) };
}
