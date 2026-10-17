import { getLiturgicalCycle, getLiturgicalSeason } from './liturgical-calendar';
import { getRCLReadings } from './rcl-fetcher';

export interface DayEntry {
  season: string;
  refs: string[];
}

export type DailyRefsTable = Record<string, DayEntry>;

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Cobre o range das tabelas cycle-*.json (domingos/festas, 2023-2030).
// As tabelas daily-*.json (dias de semana) têm range menor e mais curto
// dentro disso (2025-2028) — `getRCLReadings` já cai pra elas sozinho.
const START = new Date(2023, 11, 3); // 2023-12-03
const END = new Date(2030, 10, 24); // 2030-11-24

/**
 * `{ data ISO: { season, refs[] } }` calculado pelo calendário litúrgico REAL deste
 * projeto. É a tabela que o Bíblia na Arte usa pra ligar a Pintura do Dia à leitura e à
 * estação; scripts/export-daily-refs.ts grava o resultado em data/daily-readings-refs.json.
 * Função pura (sem I/O), para o teste poder compará-la com o arquivo versionado.
 */
export function buildDailyRefsTable(): DailyRefsTable {
  const table: DailyRefsTable = {};
  let cur = START;
  while (cur <= END) {
    const result = getRCLReadings(getLiturgicalCycle(cur), cur);
    if (result && result.readings.length > 0) {
      table[toISO(cur)] = {
        season: getLiturgicalSeason(cur),
        refs: [...new Set(result.readings.map((r) => r.reference))],
      };
    }
    cur = addDays(cur, 1);
  }
  return table;
}
