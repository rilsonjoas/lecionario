import { format } from 'date-fns';
import quotes from '@/data/lewis-quotes.json';

// Seleção diária e link de afiliado das citações de C.S. Lewis.
// Mesmo algoritmo do QuoteCard mobile (seleção date-seeded) — as duas
// plataformas mostram a mesma citação no mesmo dia. Duplicado de
// propósito: os apps não compartilham pacote.
export const AFFILIATE_TAG = 'rilson-20';

export interface DailyQuote {
  quote: string;
  source: string;
  author: string;
  scriptoriumUrl?: string | null;
}

export function getDailyQuote(date: Date): DailyQuote {
  const seed = parseInt(format(date, 'yyyyMMdd'), 10);
  const raw = quotes[seed % quotes.length] as Partial<DailyQuote>;
  return {
    quote: raw.quote || '',
    source: raw.source || '',
    author: raw.author || 'C. S. Lewis',
    scriptoriumUrl: raw.scriptoriumUrl || null,
  };
}

export function buildAmazonUrl(source: string, author?: string): string {
  const query = author ? `${source} ${author}` : source;
  return `https://www.amazon.com.br/s?k=${encodeURIComponent(query)}&tag=${AFFILIATE_TAG}`;
}
