// Espelha lecionario-mobile/src/lib/quote-fetcher.ts (mesma API) — este
// projeto não usa pacote compartilhado entre mobile e web, então a
// duplicação é intencional (ver artwork-fetcher.ts / rcl-fetcher.ts como
// precedentes).
//
// Migração da rota local /data/lewis-quotes.json para a fonte ÚNICA do
// cluster (ADR 001): a API do Scriptorium (`GET /quotes/daily`) é quem
// resolve a citação do dia — deterministicamente por data, em
// America/Sao_Paulo. Para "hoje" o consumidor não passa ?date (o endpoint é o
// relógio); ao navegar por dias passa a data escolhida. Não monta link de
// afiliado: vem pronto na resposta (`affiliateUrl`, só para obras não-públicas).
import { fetchComLimite } from './fetch-com-limite';

const API_BASE = 'https://api-scriptorium.narniano.com/api/v1';

export interface DailyQuote {
  id: string;
  /** Dia de referência em America/Sao_Paulo (YYYY-MM-DD). */
  date: string;
  author: string;
  text: string;
  // Os campos opcionais abaixo são `?: string | null` porque o contrato da API (contract/scriptorium.d.ts)
  // os declara opcionais: podem faltar ou vir null. O teste de tipos contract.types.ts confere isso.
  source?: string | null;
  dominioPublico: boolean;
  scriptoriumUrl?: string | null;
  theme?: string | null;
  /** CTA Amazon — presente só para citações não-públicas (hoje, Lewis). */
  affiliateUrl?: string | null;
}

/** Converte a data escolhida em 'yyyy-MM-dd' (dia local do usuário). Sem data,
 *  devolve null: a API resolve "hoje" em America/Sao_Paulo. */
export function diaParaApi(date?: Date | string): string | null {
  if (!date) return null;
  if (typeof date === 'string') return date.split('T')[0] ?? null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** "Citação do dia" — busca direto no Scriptorium, mesma fonte para
 *  Lecionário, Scriptorium e Gerador C.S. Lewis. 404/erro de rede vira
 *  `null` — o card "some com graça" (mesmo contrato do artwork-fetcher). */
export async function fetchDailyQuote(
  date?: Date | string,
  signal?: AbortSignal,
): Promise<DailyQuote | null> {
  try {
    // Com data (navegação por dias), a citação segue o dia escolhido, como a
    // pintura. Sem data é "hoje", resolvido pela API. Antes o app nunca passava a
    // data e a mesma frase de hoje ficava na tela ao trocar de dia.
    const dia = diaParaApi(date);
    const res = await fetchComLimite(`${API_BASE}/quotes/daily${dia ? `?date=${dia}` : ''}`, {
      signal,
    });
    if (!res.ok) return null;
    return (await res.json()) as DailyQuote;
  } catch {
    return null;
  }
}
