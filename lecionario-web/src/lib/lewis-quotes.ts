import { format } from 'date-fns';
import quotes from '@/data/lewis-quotes.json';

// Seleção diária e link de afiliado das citações de C.S. Lewis.
// Mesmo algoritmo do QuoteCard mobile (seleção date-seeded) — as duas
// plataformas mostram a mesma citação no mesmo dia. Duplicado de
// propósito: os apps não compartilham pacote.
export const AFFILIATE_TAG = 'rilson-20';

export function getDailyQuote(date: Date): { quote: string; source: string } {
  const seed = parseInt(format(date, 'yyyyMMdd'), 10);
  return quotes[seed % quotes.length];
}

export function buildAmazonUrl(source: string): string {
  return `https://www.amazon.com.br/s?k=${encodeURIComponent(source)}&tag=${AFFILIATE_TAG}`;
}
