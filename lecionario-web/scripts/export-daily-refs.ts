/** Gera a tabela `{data ISO: {season, refs[]}}` consumida pelo Bíblia
 *  na Arte pra ligar a "Pintura do Dia" à leitura litúrgica real E à
 *  estação (ver `biblia-na-arte/server/src/lib/lectionary-refs.ts` e
 *  ROADMAP "Pintura do Dia sumindo em alguns dias + sincronizar..." e
 *  "Afinidade litúrgica da Pintura do Dia", ambos 2026-09-02/03). A
 *  estação entra pra permitir interseccionar o pool com tema
 *  (Natividade/Ressurreição/etc.) e alargar pra "a estação inteira"
 *  quando o pool do dia específico for pequeno demais.
 *
 *  Roda a lógica REAL de calendário litúrgico deste repo
 *  (`getLiturgicalCycle`/`getLiturgicalSeason` + `getRCLReadings`, que
 *  já lida com Páscoa móvel/ciclo A-B-C por ano) em vez de reimplementar
 *  essa conta do lado do Bíblia na Arte — só o RESULTADO é copiado pra
 *  lá.
 *
 *  Uso: `npx tsx scripts/export-daily-refs.ts`, depois copiar o arquivo
 *  gerado (`scripts/output/daily-readings-refs.json`) pra
 *  `biblia-na-arte/server/src/data/daily-readings-refs.json`. Sem
 *  pipeline automático de propósito — o calendário litúrgico é fixo,
 *  só precisa rodar de novo se as tabelas do RCL forem estendidas além
 *  de 2030 (domingos) / 2028 (dias de semana). */
import { getLiturgicalCycle, getLiturgicalSeason } from '../src/lib/liturgical-calendar';
import { getRCLReadings } from '../src/lib/rcl-fetcher';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

interface DayEntry {
  season: string;
  refs: string[];
}

const readingsByDate: Record<string, DayEntry> = {};

let cur = START;
while (cur <= END) {
  const cycle = getLiturgicalCycle(cur);
  const result = getRCLReadings(cycle, cur);
  if (result && result.readings.length > 0) {
    readingsByDate[toISO(cur)] = {
      season: getLiturgicalSeason(cur),
      refs: [...new Set(result.readings.map((r) => r.reference))],
    };
  }
  cur = addDays(cur, 1);
}

const outDir = path.join(__dirname, 'output');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'daily-readings-refs.json');
fs.writeFileSync(outPath, JSON.stringify(readingsByDate));

console.log(`✅ ${Object.keys(readingsByDate).length} datas exportadas para ${outPath}`);
console.log('Copiar pra: biblia-na-arte/server/src/data/daily-readings-refs.json');
