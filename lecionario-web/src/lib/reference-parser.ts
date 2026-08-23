import { BOOK_MAP } from './bible-books';

export interface ParsedReference {
  bookSlug: string;
  chapter: number;
  // Trecho depois do ":" (ex.: "36-44" em "Mateus 24:36-44"), quando a
  // referência tem esse nível de detalhe. `null` pra leitura de capítulo
  // inteiro (ex.: "Salmo 122").
  verses: string | null;
}

const REF_PATTERN = /^(.+?)\s+(\d+)(?::(\S+))?/;

export function parseReference(ref: string): ParsedReference | null {
  const match = ref.trim().match(REF_PATTERN);
  if (!match) return null;

  const [, rawBook, rawChapter, rawVerses] = match;
  const slug = BOOK_MAP[rawBook];
  if (!slug) return null;

  return { bookSlug: slug, chapter: parseInt(rawChapter, 10), verses: rawVerses ?? null };
}
