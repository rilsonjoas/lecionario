// Espelha lecionario-mobile/src/lib/quote-fetcher.ts (mesma API) — este
// projeto não usa pacote compartilhado entre mobile e web, então a
// duplicação é intencional (ver artwork-fetcher.ts / rcl-fetcher.ts como
// precedentes).
//
// Migração da rota local /data/lewis-quotes.json para a fonte ÚNICA do
// cluster (ADR 001): a API do Scriptorium (`GET /quotes/daily`) é quem
// resolve a citação do dia — deterministicamente por data, em
// America/Sao_Paulo. O consumidor NÃO passa ?date (regra do cluster: o
// endpoint é o relógio) e não monta link de afiliado: vem pronto na
// resposta (`affiliateUrl`, só para obras não-públicas).
const API_BASE = 'https://api-scriptorium.narniano.com/api/v1';

export interface DailyQuote {
  id: string;
  /** Dia de referência em America/Sao_Paulo (YYYY-MM-DD). */
  date: string;
  author: string;
  text: string;
  source: string | null;
  dominioPublico: boolean;
  scriptoriumUrl: string | null;
  theme: string | null;
  /** CTA Amazon — presente só para citações não-públicas (hoje, Lewis). */
  affiliateUrl: string | null;
}

/** "Citação do dia" — busca direto no Scriptorium, mesma fonte para
 *  Lecionário, Scriptorium e Gerador C.S. Lewis. 404/erro de rede vira
 *  `null` — o card "some com graça" (mesmo contrato do artwork-fetcher). */
export async function fetchDailyQuote(signal?: AbortSignal): Promise<DailyQuote | null> {
  try {
    const res = await fetch(`${API_BASE}/quotes/daily`, { signal });
    if (!res.ok) return null;
    return (await res.json()) as DailyQuote;
  } catch {
    return null;
  }
}
