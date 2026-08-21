/**
 * Gera dados completos do Lecionário Comum Revisado (RCL)
 * para os Anos A, B, C em formato JSON.
 *
 * Uso:
 *   npx tsx scripts/generate-rcl-data.ts
 *
 * Saída: src/data/rcl/cycle-A.json, cycle-B.json, cycle-C.json
 *
 * Fontes:
 *   - Lecionário Comum Revisado (Conselho Consultivo Anglicano)
 *   - Livro de Oração Comum (Igreja Episcopal Anglicana do Brasil)
 *   - https://lectionarypage.net
 *
 * As referências bíblicas seguem o RCL oficial.
 * Os textos bíblicos precisam ser buscados via API ou inseridos manualmente.
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { addDays, differenceInDays, format } from 'date-fns';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Utilitários ────────────────────────────────────────────────────

function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function calculateAdventStart(year: number): Date {
  const christmas = new Date(year, 11, 25);
  const dayOfWeek = christmas.getDay();
  const daysBeforeChristmas = dayOfWeek === 0 ? 7 : dayOfWeek;
  const fourthSundayOfAdvent = addDays(christmas, -daysBeforeChristmas);
  return addDays(fourthSundayOfAdvent, -21);
}

function getNthSundayOfSeason(start: Date, n: number): Date {
  const firstSunday = start.getDay() === 0 ? start : addDays(start, (7 - start.getDay()) % 7);
  return addDays(firstSunday, 7 * (n - 1));
}

function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

function dateToRef(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

function getNextSunday(date: Date): Date {
  const daysUntilSunday = (7 - date.getDay()) % 7;
  return daysUntilSunday === 0 ? date : addDays(date, daysUntilSunday);
}

function getWeekOfSeason(date: Date, seasonStart: Date): number {
  return Math.floor(differenceInDays(date, seasonStart) / 7) + 1;
}

/**
 * Calcula o número real do "Proper" (RCL) para um domingo do Tempo Comum,
 * ancorado em data fixa do calendário — não em contagem sequencial desde
 * a Trindade. Esse é o ponto central do conserto de 2026-08-16 (ver
 * ROADMAP.md 1.2): a contagem sequencial resultava numa leitura errada em
 * praticamente todo domingo do Tempo Comum, porque o número de domingos
 * entre a Trindade e o Advento varia todo ano (22 a 27, dependendo de
 * quando cai a Páscoa), enquanto o RCL real ancora cada Proper numa
 * janela fixa de 7 dias do calendário civil, independente do ano.
 *
 * Fórmula oficial do RCL: o Proper 29 (Domingo de Cristo Rei, sempre o
 * último domingo antes do Advento) cai no domingo entre 20 e 26 de
 * novembro, todo ano, sem exceção — inclusive em anos bissextos, já que a
 * fórmula não depende de fevereiro. Os demais Propers contam 7 dias para
 * trás a partir dessa janela. Validado por cálculo direto (não
 * hardcoded) para 2015-2045, cobrindo todos os anos bissextos do
 * intervalo — ver checagem em scripts/grounded-content/README ou o
 * histórico desta sessão no CHANGELOG.
 */
function getProperNumberForDate(date: Date): number {
  const properTwentyNineWindowStart = new Date(date.getFullYear(), 10, 20); // 20 de novembro
  const daysSince = differenceInDays(date, properTwentyNineWindowStart);
  const weekBucket = Math.floor(daysSince / 7);
  return 29 + weekBucket;
}

// ─── Tipos ──────────────────────────────────────────────────────────

interface RCLReading {
  type: 'first_reading' | 'psalm' | 'second_reading' | 'gospel';
  ref: string;
  text?: string;
}

interface RCLDayEntry {
  date: string;
  season: string;
  weekOfSeason: number;
  dayName: string;
  readings: RCLReading[];
  collect?: string;
  holyDay?: boolean;
}

interface RCLYearData {
  cycle: string;
  year: number;
  liturgicalYear: number;
  entries: RCLDayEntry[];
}

// ─── Dados do Lecionário ────────────────────────────────────────────

type SundayIdentifier = `${string}:${number}`; // e.g. "advent:1", "easter:3"

// Estrutura: { [cycle]: { [sundayId]: { first_reading, psalm, second_reading, gospel } } }
const rclReadings: Record<
  string,
  Record<string, { first_reading: string; psalm: string; second_reading: string; gospel: string }>
> = {
  // ─── Ano A (Mateus) ──────────────────────────────────────────────
  A: {
    'advent:1': {
      first_reading: 'Isaías 2:1-5',
      psalm: 'Salmo 122',
      second_reading: 'Romanos 13:11-14',
      gospel: 'Mateus 24:36-44',
    },
    'advent:2': {
      first_reading: 'Isaías 11:1-10',
      psalm: 'Salmo 72:1-7, 18-19',
      second_reading: 'Romanos 15:4-13',
      gospel: 'Mateus 3:1-12',
    },
    'advent:3': {
      first_reading: 'Isaías 35:1-10',
      psalm: 'Salmo 146:5-10',
      second_reading: 'Tiago 5:7-10',
      gospel: 'Mateus 11:2-11',
    },
    'advent:4': {
      first_reading: 'Isaías 7:10-16',
      psalm: 'Salmo 80:1-7, 17-19',
      second_reading: 'Romanos 1:1-7',
      gospel: 'Mateus 1:18-25',
    },
    'christmas:1': {
      first_reading: 'Isaías 9:2, 6-7',
      psalm: 'Salmo 96',
      second_reading: 'Tito 2:11-14',
      gospel: 'Lucas 2:1-14',
    },
    'christmas:2': {
      first_reading: 'Isaías 63:7-9',
      psalm: 'Salmo 148',
      second_reading: 'Hebreus 2:10-18',
      gospel: 'Mateus 2:13-23',
    },
    'christmas:3': {
      first_reading: 'Jeremias 31:7-14',
      psalm: 'Salmo 147:12-20',
      second_reading: 'Efésios 1:3-14',
      gospel: 'João 1:(1-9), 10-18',
    },
    'transfiguration:1': {
      first_reading: 'Êxodo 24:12-18',
      psalm: 'Salmo 2',
      second_reading: '2 Pedro 1:16-21',
      gospel: 'Mateus 17:1-9',
    },
    'epiphanyday:1': {
      first_reading: 'Isaías 60:1-6',
      psalm: 'Salmo 72:1-7, 10-14',
      second_reading: 'Efésios 3:1-12',
      gospel: 'Mateus 2:1-12',
    },
    'epiphany:1': {
      first_reading: 'Isaías 42:1-9',
      psalm: 'Salmo 29',
      second_reading: 'Atos 10:34-43',
      gospel: 'Mateus 3:13-17',
    },
    'epiphany:2': {
      first_reading: 'Isaías 49:1-7',
      psalm: 'Salmo 40:1-11',
      second_reading: '1 Coríntios 1:1-9',
      gospel: 'João 1:29-42',
    },
    'epiphany:3': {
      first_reading: 'Isaías 9:1-4',
      psalm: 'Salmo 27:1, 4-9',
      second_reading: '1 Coríntios 1:10-18',
      gospel: 'Mateus 4:12-23',
    },
    'epiphany:4': {
      first_reading: 'Miquéias 6:1-8',
      psalm: 'Salmo 15',
      second_reading: '1 Coríntios 1:18-31',
      gospel: 'Mateus 5:1-12',
    },
    'epiphany:5': {
      first_reading: 'Isaías 58:1-9a',
      psalm: 'Salmo 112:1-9',
      second_reading: '1 Coríntios 2:1-12',
      gospel: 'Mateus 5:13-20',
    },
    'epiphany:6': {
      first_reading: 'Deuteronômio 30:15-20',
      psalm: 'Salmo 119:1-8',
      second_reading: '1 Coríntios 3:1-9',
      gospel: 'Mateus 5:21-37',
    },
    'epiphany:7': {
      first_reading: 'Levítico 19:1-2, 9-18',
      psalm: 'Salmo 119:33-40',
      second_reading: '1 Coríntios 3:10-11, 16-23',
      gospel: 'Mateus 5:38-48',
    },
    'epiphany:8': {
      first_reading: 'Isaías 49:8-16a',
      psalm: 'Salmo 131',
      second_reading: '1 Coríntios 4:1-5',
      gospel: 'Mateus 6:24-34',
    },
    'epiphany:9': {
      first_reading: 'Deuteronômio 11:18-21, 26-28',
      psalm: 'Salmo 31',
      second_reading: 'Romanos 1:16-17',
      gospel: 'Mateus 7:21-29',
    },
    'lent:1': {
      first_reading: 'Gênesis 2:15-17; 3:1-7',
      psalm: 'Salmo 32',
      second_reading: 'Romanos 5:12-19',
      gospel: 'Mateus 4:1-11',
    },
    'lent:2': {
      first_reading: 'Gênesis 12:1-4a',
      psalm: 'Salmo 121',
      second_reading: 'Romanos 4:1-5, 13-17',
      gospel: 'João 3:1-17',
    },
    'lent:3': {
      first_reading: 'Êxodo 17:1-7',
      psalm: 'Salmo 95',
      second_reading: 'Romanos 5:1-11',
      gospel: 'João 4:5-42',
    },
    'lent:4': {
      first_reading: '1 Samuel 16:1-13',
      psalm: 'Salmo 23',
      second_reading: 'Efésios 5:8-14',
      gospel: 'João 9:1-41',
    },
    'lent:5': {
      first_reading: 'Ezequiel 37:1-14',
      psalm: 'Salmo 130',
      second_reading: 'Romanos 8:6-11',
      gospel: 'João 11:1-45',
    },
    'lent:6': {
      first_reading: 'Isaías 50:4-9a',
      psalm: 'Salmo 118:1-2, 19-29',
      second_reading: 'Filipenses 2:5-11',
      gospel: 'Mateus 21:1-11',
    },
    'easter:1': {
      first_reading: 'Atos 10:34-43',
      psalm: 'Salmo 118:1-2, 14-24',
      second_reading: 'Colossenses 3:1-4',
      gospel: 'João 20:1-18',
    },
    'easter:2': {
      first_reading: 'Atos 2:14a, 22-32',
      psalm: 'Salmo 16',
      second_reading: '1 Pedro 1:3-9',
      gospel: 'João 20:19-31',
    },
    'easter:3': {
      first_reading: 'Atos 2:14a, 36-41',
      psalm: 'Salmo 116:1-4, 12-19',
      second_reading: '1 Pedro 1:17-23',
      gospel: 'Lucas 24:13-35',
    },
    'easter:4': {
      first_reading: 'Atos 2:42-47',
      psalm: 'Salmo 23',
      second_reading: '1 Pedro 2:19-25',
      gospel: 'João 10:1-10',
    },
    'easter:5': {
      first_reading: 'Atos 7:55-60',
      psalm: 'Salmo 31:1-5, 15-16',
      second_reading: '1 Pedro 2:2-10',
      gospel: 'João 14:1-14',
    },
    'easter:6': {
      first_reading: 'Atos 17:22-31',
      psalm: 'Salmo 66:8-20',
      second_reading: '1 Pedro 3:13-22',
      gospel: 'João 14:15-21',
    },
    'easter:7': {
      first_reading: 'Atos 1:6-14',
      psalm: 'Salmo 68:1-10, 32-35',
      second_reading: '1 Pedro 4:12-14; 5:6-11',
      gospel: 'João 17:1-11',
    },
    'pentecost:1': {
      first_reading: 'Atos 2:1-21',
      psalm: 'Salmo 104:24-34, 35b',
      second_reading: '1 Coríntios 12:3b-13',
      gospel: 'João 20:19-23',
    },
    'trinity:1': {
      first_reading: 'Gênesis 1:1-2:4a',
      psalm: 'Salmo 8',
      second_reading: '2 Coríntios 13:11-13',
      gospel: 'Mateus 28:16-20',
    },
    proper3: {
      first_reading: 'Deuteronômio 30:15-20',
      psalm: 'Salmo 131',
      second_reading: '1 Coríntios 4:1-5',
      gospel: 'Mateus 6:24-34',
    },
    proper4: {
      first_reading: 'Gênesis 6:9-22; 7:24; 8:14-19',
      psalm: 'Salmo 46',
      second_reading: 'Romanos 1:16-17; 3:22b-28, (29-31)',
      gospel: 'Mateus 7:21-29',
    },
    proper5: {
      first_reading: 'Gênesis 12:1-9',
      psalm: 'Salmo 33:1-12',
      second_reading: 'Romanos 4:13-25',
      gospel: 'Mateus 9:9-13, 18-26',
    },
    proper6: {
      first_reading: 'Gênesis 18:1-15, (21:1-7)',
      psalm: 'Salmo 116:1-2, 12-19',
      second_reading: 'Romanos 5:1-8',
      gospel: 'Mateus 9:35-10:8, (9-23)',
    },
    proper7: {
      first_reading: 'Gênesis 21:8-21',
      psalm: 'Salmo 86:1-10, 16-17',
      second_reading: 'Romanos 6:1b-11',
      gospel: 'Mateus 10:24-39',
    },
    proper8: {
      first_reading: 'Gênesis 22:1-14',
      psalm: 'Salmo 13',
      second_reading: 'Romanos 6:12-23',
      gospel: 'Mateus 10:40-42',
    },
    proper9: {
      first_reading: 'Gênesis 24:34-38, 42-49, 58-67',
      psalm: 'Salmo 45:10-17',
      second_reading: 'Romanos 7:15-25a',
      gospel: 'Mateus 11:16-19, 25-30',
    },
    proper10: {
      first_reading: 'Gênesis 25:19-34',
      psalm: 'Salmo 119:105-112',
      second_reading: 'Romanos 8:1-11',
      gospel: 'Mateus 13:1-9, 18-23',
    },
    proper11: {
      first_reading: 'Gênesis 28:10-19a',
      psalm: 'Salmo 139:1-12, 23-24',
      second_reading: 'Romanos 8:12-25',
      gospel: 'Mateus 13:24-30, 36-43',
    },
    proper12: {
      first_reading: 'Gênesis 29:15-28',
      psalm: 'Salmo 105:1-11, 45b',
      second_reading: 'Romanos 8:26-39',
      gospel: 'Mateus 13:31-33, 44-52',
    },
    proper13: {
      first_reading: 'Gênesis 32:22-31',
      psalm: 'Salmo 17:1-7, 15',
      second_reading: 'Romanos 9:1-5',
      gospel: 'Mateus 14:13-21',
    },
    proper14: {
      first_reading: 'Gênesis 37:1-4, 12-28',
      psalm: 'Salmo 105:1-6, 16-22, 45b',
      second_reading: 'Romanos 10:5-15',
      gospel: 'Mateus 14:22-33',
    },
    proper15: {
      first_reading: 'Gênesis 45:1-15',
      psalm: 'Salmo 133',
      second_reading: 'Romanos 11:1-2a, 29-32',
      gospel: 'Mateus 15:(10-20), 21-28',
    },
    proper16: {
      first_reading: 'Êxodo 1:8-2:10',
      psalm: 'Salmo 124',
      second_reading: 'Romanos 12:1-8',
      gospel: 'Mateus 16:13-20',
    },
    proper17: {
      first_reading: 'Êxodo 3:1-15',
      psalm: 'Salmo 105:1-6, 23-26, 45b',
      second_reading: 'Romanos 12:9-21',
      gospel: 'Mateus 16:21-28',
    },
    proper18: {
      first_reading: 'Êxodo 12:1-14',
      psalm: 'Salmo 149',
      second_reading: 'Romanos 13:8-14',
      gospel: 'Mateus 18:15-20',
    },
    proper19: {
      first_reading: 'Êxodo 14:19-31',
      psalm: 'Salmo 114',
      second_reading: 'Romanos 14:1-12',
      gospel: 'Mateus 18:21-35',
    },
    proper20: {
      first_reading: 'Êxodo 16:2-15',
      psalm: 'Salmo 105:1-6, 37-45',
      second_reading: 'Filipenses 1:21-30',
      gospel: 'Mateus 20:1-16',
    },
    proper21: {
      first_reading: 'Êxodo 17:1-7',
      psalm: 'Salmo 78:1-4, 12-16',
      second_reading: 'Filipenses 2:1-13',
      gospel: 'Mateus 21:23-32',
    },
    proper22: {
      first_reading: 'Êxodo 20:1-4, 7-9, 12-20',
      psalm: 'Salmo 19',
      second_reading: 'Filipenses 3:4b-14',
      gospel: 'Mateus 21:33-46',
    },
    proper23: {
      first_reading: 'Êxodo 32:1-14',
      psalm: 'Salmo 106:1-6, 19-23',
      second_reading: 'Filipenses 4:1-9',
      gospel: 'Mateus 22:1-14',
    },
    proper24: {
      first_reading: 'Êxodo 33:12-23',
      psalm: 'Salmo 99',
      second_reading: '1 Tessalonicenses 1:1-10',
      gospel: 'Mateus 22:15-22',
    },
    proper25: {
      first_reading: 'Levítico 19:1-2, 15-18',
      psalm: 'Salmo 1',
      second_reading: '1 Tessalonicenses 2:1-8',
      gospel: 'Mateus 22:34-46',
    },
    proper26: {
      first_reading: 'Josué 3:7-17',
      psalm: 'Salmo 107:1-7, 33-37',
      second_reading: '1 Tessalonicenses 2:9-13',
      gospel: 'Mateus 23:1-12',
    },
    proper27: {
      first_reading: 'Josué 24:1-3a, 14-25',
      psalm: 'Salmo 78:1-7',
      second_reading: '1 Tessalonicenses 4:13-18',
      gospel: 'Mateus 25:1-13',
    },
    proper28: {
      first_reading: 'Juízes 4:1-7',
      psalm: 'Salmo 123',
      second_reading: '1 Tessalonicenses 5:1-11',
      gospel: 'Mateus 25:14-30',
    },
    proper29: {
      first_reading: 'Ezequiel 34:11-16, 20-24',
      psalm: 'Salmo 100',
      second_reading: 'Efésios 1:15-23',
      gospel: 'Mateus 25:31-46',
    },
  },

  // ─── Ano B (Marcos) ──────────────────────────────────────────────
  B: {
    'advent:1': {
      first_reading: 'Isaías 64:1-9',
      psalm: 'Salmo 80:1-7, 17-19',
      second_reading: '1 Coríntios 1:3-9',
      gospel: 'Marcos 13:24-37',
    },
    'advent:2': {
      first_reading: 'Isaías 40:1-11',
      psalm: 'Salmo 85:1-2, 8-13',
      second_reading: '2 Pedro 3:8-15a',
      gospel: 'Marcos 1:1-8',
    },
    'advent:3': {
      first_reading: 'Isaías 61:1-4, 8-11',
      psalm: 'Salmo 126',
      second_reading: '1 Tessalonicenses 5:16-24',
      gospel: 'João 1:6-8, 19-28',
    },
    'advent:4': {
      first_reading: '2 Samuel 7:1-11, 16',
      psalm: 'Salmo 89:1-4, 19-26',
      second_reading: 'Romanos 16:25-27',
      gospel: 'Lucas 1:26-38',
    },
    'christmas:1': {
      first_reading: 'Isaías 52:7-10',
      psalm: 'Salmo 98',
      second_reading: 'Hebreus 1:1-12',
      gospel: 'João 1:1-14',
    },
    'christmas:2': {
      first_reading: 'Isaías 61:10-62:3',
      psalm: 'Salmo 148',
      second_reading: 'Gálatas 4:4-7',
      gospel: 'Lucas 2:22-40',
    },
    'christmas:3': {
      first_reading: 'Jeremias 31:7-14',
      psalm: 'Salmo 147:12-20',
      second_reading: 'Efésios 1:3-14',
      gospel: 'João 1:(1-9), 10-18',
    },
    'transfiguration:1': {
      first_reading: '2 Reis 2:1-12',
      psalm: 'Salmo 50:1-6',
      second_reading: '2 Coríntios 4:3-6',
      gospel: 'Marcos 9:2-9',
    },
    'epiphanyday:1': {
      first_reading: 'Isaías 60:1-6',
      psalm: 'Salmo 72:1-7, 10-14',
      second_reading: 'Efésios 3:1-12',
      gospel: 'Mateus 2:1-12',
    },
    'epiphany:1': {
      first_reading: 'Gênesis 1:1-5',
      psalm: 'Salmo 29',
      second_reading: 'Atos 19:1-7',
      gospel: 'Marcos 1:4-11',
    },
    'epiphany:2': {
      first_reading: '1 Samuel 3:1-20',
      psalm: 'Salmo 139:1-6, 13-18',
      second_reading: '1 Coríntios 6:12-20',
      gospel: 'João 1:43-51',
    },
    'epiphany:3': {
      first_reading: 'Jonas 3:1-5, 10',
      psalm: 'Salmo 62:5-12',
      second_reading: '1 Coríntios 7:29-31',
      gospel: 'Marcos 1:14-20',
    },
    'epiphany:4': {
      first_reading: 'Deuteronômio 18:15-20',
      psalm: 'Salmo 111',
      second_reading: '1 Coríntios 8:1-13',
      gospel: 'Marcos 1:21-28',
    },
    'epiphany:5': {
      first_reading: 'Isaías 40:21-31',
      psalm: 'Salmo 147:1-11, 20c',
      second_reading: '1 Coríntios 9:16-23',
      gospel: 'Marcos 1:29-39',
    },
    'epiphany:6': {
      first_reading: '2 Reis 5:1-14',
      psalm: 'Salmo 30',
      second_reading: '1 Coríntios 9:24-27',
      gospel: 'Marcos 1:40-45',
    },
    'epiphany:7': {
      first_reading: 'Isaías 43:18-25',
      psalm: 'Salmo 41',
      second_reading: '2 Coríntios 1:18-22',
      gospel: 'Marcos 2:1-12',
    },
    'epiphany:8': {
      first_reading: 'Oséias 2:14-20',
      psalm: 'Salmo 103:1-13, 22',
      second_reading: '2 Coríntios 3:1-6',
      gospel: 'Marcos 2:13-22',
    },
    'lent:1': {
      first_reading: 'Gênesis 9:8-17',
      psalm: 'Salmo 25:1-10',
      second_reading: '1 Pedro 3:18-22',
      gospel: 'Marcos 1:9-15',
    },
    'lent:2': {
      first_reading: 'Gênesis 17:1-7, 15-16',
      psalm: 'Salmo 22:23-31',
      second_reading: 'Romanos 4:13-25',
      gospel: 'Marcos 8:31-38',
    },
    'lent:3': {
      first_reading: 'Êxodo 20:1-17',
      psalm: 'Salmo 19',
      second_reading: '1 Coríntios 1:22-25',
      gospel: 'João 2:13-22',
    },
    'lent:4': {
      first_reading: 'Números 21:4-9',
      psalm: 'Salmo 107:1-3, 17-22',
      second_reading: 'Efésios 2:1-10',
      gospel: 'João 3:14-21',
    },
    'lent:5': {
      first_reading: 'Jeremias 31:31-34',
      psalm: 'Salmo 51:1-12',
      second_reading: 'Hebreus 5:5-10',
      gospel: 'João 12:20-33',
    },
    'lent:6': {
      first_reading: 'Isaías 50:4-9a',
      psalm: 'Salmo 118:1-2, 19-29',
      second_reading: 'Filipenses 2:5-11',
      gospel: 'Marcos 11:1-11',
    },
    'easter:1': {
      first_reading: 'Atos 10:34-43',
      psalm: 'Salmo 118:1-2, 14-24',
      second_reading: '1 Coríntios 5:6b-8',
      gospel: 'João 20:1-18',
    },
    'easter:2': {
      first_reading: 'Atos 4:32-35',
      psalm: 'Salmo 133',
      second_reading: '1 João 1:1-2:2',
      gospel: 'João 20:19-31',
    },
    'easter:3': {
      first_reading: 'Atos 3:12-19',
      psalm: 'Salmo 4',
      second_reading: '1 João 3:1-7',
      gospel: 'Lucas 24:36-48',
    },
    'easter:4': {
      first_reading: 'Atos 4:5-12',
      psalm: 'Salmo 23',
      second_reading: '1 João 3:16-24',
      gospel: 'João 10:11-18',
    },
    'easter:5': {
      first_reading: 'Atos 8:26-40',
      psalm: 'Salmo 22:25-31',
      second_reading: '1 João 4:7-21',
      gospel: 'João 15:1-8',
    },
    'easter:6': {
      first_reading: 'Atos 10:44-48',
      psalm: 'Salmo 98',
      second_reading: '1 João 5:1-6',
      gospel: 'João 15:9-17',
    },
    'easter:7': {
      first_reading: 'Atos 1:15-17, 21-26',
      psalm: 'Salmo 1',
      second_reading: '1 João 5:9-13',
      gospel: 'João 17:6-19',
    },
    'pentecost:1': {
      first_reading: 'Atos 2:1-21',
      psalm: 'Salmo 104:24-34, 35b',
      second_reading: 'Romanos 8:22-27',
      gospel: 'João 15:26-27; 16:4b-15',
    },
    'trinity:1': {
      first_reading: 'Isaías 6:1-8',
      psalm: 'Salmo 29',
      second_reading: 'Romanos 8:12-17',
      gospel: 'João 3:1-17',
    },
    proper4: {
      first_reading: '1 Samuel 3:1-10, (11-20)',
      psalm: 'Salmo 139:1-6, 13-18',
      second_reading: '2 Coríntios 4:5-12',
      gospel: 'Marcos 2:23-3:6',
    },
    proper5: {
      first_reading: '1 Samuel 8:4-11, (12-15), 16-20, (11:14-15)',
      psalm: 'Salmo 138',
      second_reading: '2 Coríntios 4:13-5:1',
      gospel: 'Marcos 3:20-35',
    },
    proper6: {
      first_reading: '1 Samuel 15:34-16:13',
      psalm: 'Salmo 20',
      second_reading: '2 Coríntios 5:6-10, (11-13), 14-17',
      gospel: 'Marcos 4:26-34',
    },
    proper7: {
      first_reading: '1 Samuel 17:(1a, 4-11, 19-23), 32-49',
      psalm: 'Salmo 9:9-20',
      second_reading: '2 Coríntios 6:1-13',
      gospel: 'Marcos 4:35-41',
    },
    proper8: {
      first_reading: '2 Samuel 1:1, 17-27',
      psalm: 'Salmo 130',
      second_reading: '2 Coríntios 8:7-15',
      gospel: 'Marcos 5:21-43',
    },
    proper9: {
      first_reading: '2 Samuel 5:1-5, 9-10',
      psalm: 'Salmo 48',
      second_reading: '2 Coríntios 12:2-10',
      gospel: 'Marcos 6:1-13',
    },
    proper10: {
      first_reading: '2 Samuel 6:1-5, 12b-19',
      psalm: 'Salmo 24',
      second_reading: 'Efésios 1:3-14',
      gospel: 'Marcos 6:14-29',
    },
    proper11: {
      first_reading: '2 Samuel 7:1-14a',
      psalm: 'Salmo 89:20-37',
      second_reading: 'Efésios 2:11-22',
      gospel: 'Marcos 6:30-34, 53-56',
    },
    proper12: {
      first_reading: '2 Samuel 11:1-15',
      psalm: 'Salmo 14',
      second_reading: 'Efésios 3:14-21',
      gospel: 'João 6:1-21',
    },
    proper13: {
      first_reading: '2 Samuel 11:26-12:13a',
      psalm: 'Salmo 51:1-12',
      second_reading: 'Efésios 4:1-16',
      gospel: 'João 6:24-35',
    },
    proper14: {
      first_reading: '2 Samuel 18:5-9, 15, 31-33',
      psalm: 'Salmo 130',
      second_reading: 'Efésios 4:25-5:2',
      gospel: 'João 6:35, 41-51',
    },
    proper15: {
      first_reading: '1 Reis 2:10-12; 3:3-14',
      psalm: 'Salmo 111',
      second_reading: 'Efésios 5:15-20',
      gospel: 'João 6:51-58',
    },
    proper16: {
      first_reading: '1 Reis 8:(1,6,10-11), 22-30, 41-43',
      psalm: 'Salmo 84',
      second_reading: 'Efésios 6:10-20',
      gospel: 'João 6:56-69',
    },
    proper17: {
      first_reading: 'Cânticos 2:8-13',
      psalm: 'Salmo 45:1-2, 6-9',
      second_reading: 'Tiago 1:17-27',
      gospel: 'Marcos 7:1-8, 14-15, 21-23',
    },
    proper18: {
      first_reading: 'Provérbios 22:1-2, 8-9, 22-23',
      psalm: 'Salmo 125',
      second_reading: 'Tiago 2:1-10, (11-13), 14-17',
      gospel: 'Marcos 7:24-37',
    },
    proper19: {
      first_reading: 'Provérbios 1:20-33',
      psalm: 'Salmo 19',
      second_reading: 'Tiago 3:1-12',
      gospel: 'Marcos 8:27-38',
    },
    proper20: {
      first_reading: 'Provérbios 31:10-31',
      psalm: 'Salmo 1',
      second_reading: 'Tiago 3:13-4:3, 7-8a',
      gospel: 'Marcos 9:30-37',
    },
    proper21: {
      first_reading: 'Ester 7:1-6, 9-10; 9:20-22',
      psalm: 'Salmo 124',
      second_reading: 'Tiago 5:13-20',
      gospel: 'Marcos 9:38-50',
    },
    proper22: {
      first_reading: 'Jó 1:1, 2:1-10',
      psalm: 'Salmo 26',
      second_reading: 'Hebreus 1:1-4, 2:5-12',
      gospel: 'Marcos 10:2-16',
    },
    proper23: {
      first_reading: 'Jó 23:1-9, 16-17',
      psalm: 'Salmo 22:1-15',
      second_reading: 'Hebreus 4:12-16',
      gospel: 'Marcos 10:17-31',
    },
    proper24: {
      first_reading: 'Jó 38:1-7, (34-41)',
      psalm: 'Salmo 104:1-9, 24, 35c',
      second_reading: 'Hebreus 5:1-10',
      gospel: 'Marcos 10:35-45',
    },
    proper25: {
      first_reading: 'Jó 42:1-6, 10-17',
      psalm: 'Salmo 34:1-8, (19-22)',
      second_reading: 'Hebreus 7:23-28',
      gospel: 'Marcos 10:46-52',
    },
    proper26: {
      first_reading: 'Rute 1:1-18',
      psalm: 'Salmo 146',
      second_reading: 'Hebreus 9:11-14',
      gospel: 'Marcos 12:28-34',
    },
    proper27: {
      first_reading: 'Rute 3:1-5; 4:13-17',
      psalm: 'Salmo 127',
      second_reading: 'Hebreus 9:24-28',
      gospel: 'Marcos 12:38-44',
    },
    proper28: {
      first_reading: '1 Samuel 1:4-20',
      psalm: '1 Samuel 2:1-10',
      second_reading: 'Hebreus 10:11-14, (15-18), 19-25',
      gospel: 'Marcos 13:1-8',
    },
    proper29: {
      first_reading: 'Ezequiel 34:11-16, 20-24',
      psalm: 'Salmo 100',
      second_reading: 'Apocalipse 1:4b-8',
      gospel: 'João 18:33-37',
    },
  },

  // ─── Ano C (Lucas) ──────────────────────────────────────────────
  C: {
    'advent:1': {
      first_reading: 'Jeremias 33:14-16',
      psalm: 'Salmo 25:1-10',
      second_reading: '1 Tessalonicenses 3:9-13',
      gospel: 'Lucas 21:25-36',
    },
    'advent:2': {
      first_reading: 'Malaquias 3:1-4',
      psalm: 'Lucas 1:68-79',
      second_reading: 'Filipenses 1:3-11',
      gospel: 'Lucas 3:1-6',
    },
    'advent:3': {
      first_reading: 'Sofonias 3:14-20',
      psalm: 'Isaías 12:2-6',
      second_reading: 'Filipenses 4:4-7',
      gospel: 'Lucas 3:7-18',
    },
    'advent:4': {
      first_reading: 'Miquéias 5:2-5a',
      psalm: 'Salmo 80:1-7',
      second_reading: 'Hebreus 10:5-10',
      gospel: 'Lucas 1:39-55',
    },
    'christmas:1': {
      first_reading: 'Isaías 62:6-12',
      psalm: 'Salmo 97',
      second_reading: 'Tito 3:4-7',
      gospel: 'Lucas 2:8-20',
    },
    'christmas:2': {
      first_reading: '1 Samuel 2:18-20, 26',
      psalm: 'Salmo 148',
      second_reading: 'Colossenses 3:12-17',
      gospel: 'Lucas 2:41-52',
    },
    'christmas:3': {
      first_reading: 'Jeremias 31:7-14',
      psalm: 'Salmo 147:12-20',
      second_reading: 'Efésios 1:3-14',
      gospel: 'João 1:(1-9), 10-18',
    },
    'transfiguration:1': {
      first_reading: 'Êxodo 34:29-35',
      psalm: 'Salmo 99',
      second_reading: '2 Coríntios 3:12-4:2',
      gospel: 'Lucas 9:28-36, (37-43)',
    },
    'epiphanyday:1': {
      first_reading: 'Isaías 60:1-6',
      psalm: 'Salmo 72:1-7, 10-14',
      second_reading: 'Efésios 3:1-12',
      gospel: 'Mateus 2:1-12',
    },
    'epiphany:1': {
      first_reading: 'Isaías 43:1-7',
      psalm: 'Salmo 29',
      second_reading: 'Atos 8:14-17',
      gospel: 'Lucas 3:15-17, 21-22',
    },
    'epiphany:2': {
      first_reading: 'Isaías 62:1-5',
      psalm: 'Salmo 36:5-10',
      second_reading: '1 Coríntios 12:1-11',
      gospel: 'João 2:1-11',
    },
    'epiphany:3': {
      first_reading: 'Neemias 8:1-3, 5-6, 8-10',
      psalm: 'Salmo 19',
      second_reading: '1 Coríntios 12:12-31a',
      gospel: 'Lucas 4:14-21',
    },
    'epiphany:4': {
      first_reading: 'Jeremias 1:4-10',
      psalm: 'Salmo 71:1-6',
      second_reading: '1 Coríntios 13:1-13',
      gospel: 'Lucas 4:21-30',
    },
    'epiphany:5': {
      first_reading: 'Isaías 6:1-8',
      psalm: 'Salmo 138',
      second_reading: '1 Coríntios 15:1-11',
      gospel: 'Lucas 5:1-11',
    },
    'epiphany:6': {
      first_reading: 'Jeremias 17:5-10',
      psalm: 'Salmo 1',
      second_reading: '1 Coríntios 15:12-20',
      gospel: 'Lucas 6:17-26',
    },
    'epiphany:7': {
      first_reading: 'Gênesis 45:3-11, 15',
      psalm: 'Salmo 37:1-11, 39-40',
      second_reading: '1 Coríntios 15:35-38, 42-50',
      gospel: 'Lucas 6:27-38',
    },
    'epiphany:8': {
      first_reading: 'Eclesiástico 27:4-7',
      psalm: 'Salmo 92:1-4, 12-15',
      second_reading: '1 Coríntios 15:54-58',
      gospel: 'Lucas 6:39-49',
    },
    'lent:1': {
      first_reading: 'Deuteronômio 26:1-11',
      psalm: 'Salmo 91:1-2, 9-16',
      second_reading: 'Romanos 10:8b-13',
      gospel: 'Lucas 4:1-13',
    },
    'lent:2': {
      first_reading: 'Gênesis 15:1-12, 17-18',
      psalm: 'Salmo 27',
      second_reading: 'Filipenses 3:17-4:1',
      gospel: 'Lucas 13:31-35',
    },
    'lent:3': {
      first_reading: 'Isaías 55:1-9',
      psalm: 'Salmo 63:1-8',
      second_reading: '1 Coríntios 10:1-13',
      gospel: 'Lucas 13:1-9',
    },
    'lent:4': {
      first_reading: 'Josué 5:9-12',
      psalm: 'Salmo 32',
      second_reading: '2 Coríntios 5:16-21',
      gospel: 'Lucas 15:1-3, 11b-32',
    },
    'lent:5': {
      first_reading: 'Isaías 43:16-21',
      psalm: 'Salmo 126',
      second_reading: 'Filipenses 3:4b-14',
      gospel: 'João 12:1-8',
    },
    'lent:6': {
      first_reading: 'Isaías 50:4-9a',
      psalm: 'Salmo 118:1-2, 19-29',
      second_reading: 'Filipenses 2:5-11',
      gospel: 'Lucas 19:28-40',
    },
    'easter:1': {
      first_reading: 'Atos 10:34-43',
      psalm: 'Salmo 118:1-2, 14-24',
      second_reading: '1 Coríntios 15:19-26',
      gospel: 'João 20:1-18',
    },
    'easter:2': {
      first_reading: 'Atos 5:27-32',
      psalm: 'Salmo 118:14-29',
      second_reading: 'Apocalipse 1:4-8',
      gospel: 'João 20:19-31',
    },
    'easter:3': {
      first_reading: 'Atos 9:1-20',
      psalm: 'Salmo 30',
      second_reading: 'Apocalipse 5:11-14',
      gospel: 'João 21:1-19',
    },
    'easter:4': {
      first_reading: 'Atos 9:36-43',
      psalm: 'Salmo 23',
      second_reading: 'Apocalipse 7:9-17',
      gospel: 'João 10:22-30',
    },
    'easter:5': {
      first_reading: 'Atos 11:1-18',
      psalm: 'Salmo 148',
      second_reading: 'Apocalipse 21:1-6',
      gospel: 'João 13:31-35',
    },
    'easter:6': {
      first_reading: 'Atos 16:9-15',
      psalm: 'Salmo 67',
      second_reading: 'Apocalipse 22:12-14, 16-17, 20-21',
      gospel: 'João 14:23-29',
    },
    'easter:7': {
      first_reading: 'Atos 16:16-34',
      psalm: 'Salmo 97',
      second_reading: 'Apocalipse 22:12-14, 16-17, 20-21',
      gospel: 'João 17:20-26',
    },
    'pentecost:1': {
      first_reading: 'Atos 2:1-21',
      psalm: 'Salmo 104:24-34, 35b',
      second_reading: 'Romanos 8:14-17',
      gospel: 'João 14:8-17, 25-27',
    },
    'trinity:1': {
      first_reading: 'Provérbios 8:1-4, 22-31',
      psalm: 'Salmo 8',
      second_reading: 'Romanos 5:1-5',
      gospel: 'João 16:12-15',
    },
    proper4: {
      first_reading: '1 Reis 18:20-21, (22-29), 30-39',
      psalm: 'Salmo 96',
      second_reading: 'Gálatas 1:1-12',
      gospel: 'Lucas 7:1-10',
    },
    proper5: {
      first_reading: '1 Reis 17:8-16, (17-24)',
      psalm: 'Salmo 146',
      second_reading: 'Gálatas 1:11-24',
      gospel: 'Lucas 7:11-17',
    },
    proper6: {
      first_reading: '1 Reis 21:1-10, (11-14), 15-21a',
      psalm: 'Salmo 5:1-8',
      second_reading: 'Gálatas 2:15-21',
      gospel: 'Lucas 7:36-8:3',
    },
    proper7: {
      first_reading: '1 Reis 19:1-4, (5-7), 8-15a',
      psalm: 'Salmo 42, 43',
      second_reading: 'Gálatas 3:23-29',
      gospel: 'Lucas 8:26-39',
    },
    proper8: {
      first_reading: '2 Reis 2:1-2, 6-14',
      psalm: 'Salmo 77:1-2, 11-20',
      second_reading: 'Gálatas 5:1, 13-25',
      gospel: 'Lucas 9:51-62',
    },
    proper9: {
      first_reading: '2 Reis 5:1-14',
      psalm: 'Salmo 30',
      second_reading: 'Gálatas 6:(1-6), 7-16',
      gospel: 'Lucas 10:1-11, 16-20',
    },
    proper10: {
      first_reading: 'Amós 7:7-17',
      psalm: 'Salmo 82',
      second_reading: 'Colossenses 1:1-14',
      gospel: 'Lucas 10:25-37',
    },
    proper11: {
      first_reading: 'Amós 8:1-12',
      psalm: 'Salmo 52',
      second_reading: 'Colossenses 1:15-28',
      gospel: 'Lucas 10:38-42',
    },
    proper12: {
      first_reading: 'Oséias 1:2-10',
      psalm: 'Salmo 85',
      second_reading: 'Colossenses 2:6-15, (16-19)',
      gospel: 'Lucas 11:1-13',
    },
    proper13: {
      first_reading: 'Oséias 11:1-11',
      psalm: 'Salmo 107:1-9, 43',
      second_reading: 'Colossenses 3:1-11',
      gospel: 'Lucas 12:13-21',
    },
    proper14: {
      first_reading: 'Isaías 1:1, 10-20',
      psalm: 'Salmo 50:1-8, 22-23',
      second_reading: 'Hebreus 11:1-3, 8-16',
      gospel: 'Lucas 12:32-40',
    },
    proper15: {
      first_reading: 'Isaías 5:1-7',
      psalm: 'Salmo 80:1-2, 8-19',
      second_reading: 'Hebreus 11:29-12:2',
      gospel: 'Lucas 12:49-56',
    },
    proper16: {
      first_reading: 'Jeremias 1:4-10',
      psalm: 'Salmo 71:1-6',
      second_reading: 'Hebreus 12:18-29',
      gospel: 'Lucas 13:10-17',
    },
    proper17: {
      first_reading: 'Jeremias 2:4-13',
      psalm: 'Salmo 81:1, 10-16',
      second_reading: 'Hebreus 13:1-8, 15-16',
      gospel: 'Lucas 14:1, 7-14',
    },
    proper18: {
      first_reading: 'Jeremias 18:1-11',
      psalm: 'Salmo 139:1-6, 13-18',
      second_reading: 'Filemom 1:1-21',
      gospel: 'Lucas 14:25-33',
    },
    proper19: {
      first_reading: 'Jeremias 4:11-12, 22-28',
      psalm: 'Salmo 14',
      second_reading: '1 Timóteo 1:12-17',
      gospel: 'Lucas 15:1-10',
    },
    proper20: {
      first_reading: 'Jeremias 8:18-9:1',
      psalm: 'Salmo 79:1-9',
      second_reading: '1 Timóteo 2:1-7',
      gospel: 'Lucas 16:1-13',
    },
    proper21: {
      first_reading: 'Jeremias 32:1-3a, 6-15',
      psalm: 'Salmo 91:1-6, 14-16',
      second_reading: '1 Timóteo 6:6-19',
      gospel: 'Lucas 16:19-31',
    },
    proper22: {
      first_reading: 'Lamentações 1:1-6; 3:19-26',
      psalm: 'Salmo 137',
      second_reading: '2 Timóteo 1:1-14',
      gospel: 'Lucas 17:5-10',
    },
    proper23: {
      first_reading: 'Jeremias 29:1, 4-7',
      psalm: 'Salmo 66:1-12',
      second_reading: '2 Timóteo 2:8-15',
      gospel: 'Lucas 17:11-19',
    },
    proper24: {
      first_reading: 'Jeremias 31:27-34',
      psalm: 'Salmo 119:97-104',
      second_reading: '2 Timóteo 3:14-4:5',
      gospel: 'Lucas 18:1-8',
    },
    proper25: {
      first_reading: 'Joel 2:23-32',
      psalm: 'Salmo 65',
      second_reading: '2 Timóteo 4:6-8, 16-18',
      gospel: 'Lucas 18:9-14',
    },
    proper26: {
      first_reading: 'Habacuque 1:1-4; 2:1-4',
      psalm: 'Salmo 119:137-144',
      second_reading: '2 Tessalonicenses 1:1-4, 11-12',
      gospel: 'Lucas 19:1-10',
    },
    proper27: {
      first_reading: 'Ageu 1:15b-2:9',
      psalm: 'Salmo 145:1-5, 17-21',
      second_reading: '2 Tessalonicenses 2:1-5, 13-17',
      gospel: 'Lucas 20:27-38',
    },
    proper28: {
      first_reading: 'Isaías 65:17-25',
      psalm: 'Isaías 12',
      second_reading: '2 Tessalonicenses 3:6-13',
      gospel: 'Lucas 21:5-19',
    },
    proper29: {
      first_reading: 'Jeremias 23:1-6',
      psalm: 'Salmo 46',
      second_reading: 'Colossenses 1:11-20',
      gospel: 'Lucas 23:33-43',
    },
  },
};

// ─── Coletas para Domingos ─────────────────────────────────────────

const sundayCollects: Record<string, Record<string, string>> = {
  A: {
    'advent:1':
      'Amado Deus, desperta o teu poder e vem; para que, pela tua proteção, possamos ser libertos dos pecados que nos ameaçam, e pela tua misericórdia possamos ser salvos; tu que vives e reinas com o Pai e o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'advent:2':
      'Deus misericordioso, que enviaste os teus mensageiros, os profetas, para pregar o arrependimento e preparar o caminho para a nossa salvação: Concede-nos graça para dar ouvidos às suas advertências e abandonar os nossos pecados, para que possamos saudar com alegria a vinda de Jesus Cristo, nosso Redentor. Amém.',
    'advent:3':
      'Senhor Jesus Cristo, que enviaste João Batista para preparar o teu caminho: Ajuda-nos a alegrar-nos sempre no teu Espírito, para que possamos estar prontos para te receber quando vieres em tua glória; tu que vives e reinas com o Pai e o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'advent:4':
      'Derrama sobre nós, Senhor, a tua graça, para que nós que já recebemos pela fé a promessa da salvação, possamos, com a Virgem Maria, alegrar-nos na tua vinda; por Jesus Cristo, teu Filho, nosso Senhor. Amém.',
    'christmas:1':
      'Deus Todo-Poderoso, que nos fizeste alegrar na natividade do teu Filho Jesus Cristo: Concede-nos que, renascendo nele, sejamos transformados à sua semelhança; ele que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'epiphany:1':
      'Pai celestial, que no batismo de Jesus no Jordão o proclamaste teu Filho amado e o ungiste com o Espírito Santo: Concede que todos os que são batizados em teu nome sejam fiéis à sua vocação e testemunhem o teu amor ao mundo; por Jesus Cristo, nosso Senhor. Amém.',
    'epiphany:last':
      'Deus Todo-Poderoso, cujo Filho se transfigurou diante dos seus discípulos: Concede-nos que, contemplando a sua glória, sejamos fortalecidos para levar a nossa cruz e seguir os seus passos; ele que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'lent:1':
      'Senhor Deus, que conduziste o teu povo pelo deserto e o alimentaste com o maná: Concede-nos que, neste tempo de Quaresma, nos afastemos do pecado e nos aproximemos de ti, para que possamos celebrar a Páscoa com corações renovados; por Jesus Cristo, nosso Senhor. Amém.',
    'lent:2':
      'Deus Todo-Poderoso, que ves que não temos força alguma em nós mesmos: Guarda-nos tanto interior como exteriormente, para que sejamos defendidos de todas as adversidades que possam acontecer ao corpo, e purificados dos maus pensamentos que possam assaltar a alma; por Jesus Cristo, nosso Senhor. Amém.',
    'lent:3':
      'Deus de misericórdia, fonte de toda bondade: Tu nos mostras o caminho da verdade e nos dás a força para segui-lo. Concede-nos que, bebendo da água viva que jorra da fonte do teu amor, nunca mais tenhamos sede; por Jesus Cristo, nosso Senhor. Amém.',
    'lent:4':
      'Senhor Deus, que preparaste maravilhas para aqueles que te amam: Derrama em nossos corações o amor de ti, para que, amando-te acima de todas as coisas, obtenhamos as tuas promessas, que excedem tudo o que podemos desejar; por Jesus Cristo, nosso Senhor. Amém.',
    'lent:5':
      'Deus Todo-Poderoso, que nos deste o teu Filho como caminho para a vida eterna: Concede-nos que, seguindo os seus passos, possamos ressuscitar com ele para a vida nova; ele que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'lent:6':
      'Deus Todo-Poderoso e eterno, que, para nos dar um exemplo de humildade, fizeste o nosso Salvador assumir a nossa carne e sofrer a morte na cruz: Concede-nos que possamos aprender com o seu exemplo e participar na sua ressurreição; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:1':
      'Deus Todo-Poderoso, que nos concedeste um novo nascimento pela água do batismo e pela palavra da verdade: Concede-nos que, celebrando a ressurreição do teu Filho, vivamos como novas criaturas; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:2':
      'Deus de infinita misericórdia, que renovaste a fé do teu povo com a celebração da Páscoa: Aumenta em nós os dons do teu Espírito, para que compreendamos mais profundamente o mistério do batismo que nos purificou, e do teu amor que nos redimiu; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:3':
      'Deus Todo-Poderoso, que nos fizeste conhecer a ressurreição do teu Filho através do testemunho dos apóstolos: Concede-nos que, reconhecendo a sua presença entre nós, sejamos seus testemunhas até aos confins da terra; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:4':
      'Deus Todo-Poderoso, cujo Filho Jesus Cristo é o bom pastor: Concede que, ouvindo a sua voz, possamos segui-lo onde quer que nos conduza, e que ele nos guie às pastagens da vida eterna; ele que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'easter:5':
      'Deus Todo-Poderoso, que nos uniste a Cristo como ramos à videira verdadeira: Concede-nos que, permanecendo nele, produzamos frutos de justiça e amor para glória do teu nome; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:6':
      'Senhor Deus, cujo Espírito Santo nos ensina a chamar-te Pai: Concede-nos que, guardando os mandamentos de teu Filho, possamos experimentar a sua paz e a sua presença em nossas vidas; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:7':
      'Deus Todo-Poderoso, que glorificaste o teu Filho Jesus Cristo, elevando-o à tua direita: Concede-nos que, fixando os nossos olhos nele, sejamos transformados à sua imagem e participemos da sua glória eterna; ele que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'pentecost:1':
      'Deus Todo-Poderoso, que no dia de Pentecostes enviaste o Espírito Santo para santificar a tua Igreja: Derrama sobre nós o mesmo Espírito, para que sejamos renovados em corpo, alma e espírito, e possamos proclamar as tuas maravilhas a todas as nações; por Jesus Cristo, nosso Senhor. Amém.',
    'ordinary:default':
      'Senhor Deus, cuja providência nunca falha: Dá-nos a sabedoria para compreender a tua vontade e a coragem para cumpri-la, para que, em todas as circunstâncias da vida, possamos confiar na tua bondade e viver para a glória do teu nome; por Jesus Cristo, nosso Senhor. Amém.',
  },
  B: {
    'advent:1':
      'Amado Deus, desperta o teu poder e vem; para que, pela tua proteção, possamos ser libertos dos pecados que nos ameaçam, e pela tua misericórdia possamos ser salvos; tu que vives e reinas com o Pai e o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'advent:2':
      'Deus misericordioso, que enviaste os teus mensageiros, os profetas, para pregar o arrependimento e preparar o caminho para a nossa salvação: Concede-nos graça para dar ouvidos às suas advertências e abandonar os nossos pecados, para que possamos saudar com alegria a vinda de Jesus Cristo, nosso Redentor. Amém.',
    'advent:3':
      'Senhor Jesus Cristo, que enviaste João Batista para preparar o teu caminho: Ajuda-nos a alegrar-nos sempre no teu Espírito, para que possamos estar prontos para te receber quando vieres em tua glória; tu que vives e reinas com o Pai e o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'advent:4':
      'Derrama sobre nós, Senhor, a tua graça, para que nós que já recebemos pela fé a promessa da salvação, possamos, com a Virgem Maria, alegrar-nos na tua vinda; por Jesus Cristo, teu Filho, nosso Senhor. Amém.',
    'easter:1':
      'Deus Todo-Poderoso, que nos concedeste um novo nascimento pela água do batismo e pela palavra da verdade: Concede-nos que, celebrando a ressurreição do teu Filho, vivamos como novas criaturas; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:2':
      'Deus de infinita misericórdia, que renovaste a fé do teu povo com a celebração da Páscoa: Aumenta em nós os dons do teu Espírito, para que compreendamos mais profundamente o mistério do batismo que nos purificou, e do teu amor que nos redimiu; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:3':
      'Deus Todo-Poderoso, que nos fizeste conhecer a ressurreição do teu Filho através do testemunho dos apóstolos: Concede-nos que, reconhecendo a sua presença entre nós, sejamos seus testemunhas até aos confins da terra; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:4':
      'Deus Todo-Poderoso, cujo Filho Jesus Cristo é o bom pastor: Concede que, ouvindo a sua voz, possamos segui-lo onde quer que nos conduza, e que ele nos guie às pastagens da vida eterna; ele que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'easter:5':
      'Deus Todo-Poderoso, que nos uniste a Cristo como ramos à videira verdadeira: Concede-nos que, permanecendo nele, produzamos frutos de justiça e amor para glória do teu nome; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:6':
      'Senhor Deus, cujo Espírito Santo nos ensina a chamar-te Pai: Concede-nos que, guardando os mandamentos de teu Filho, possamos experimentar a sua paz e a sua presença em nossas vidas; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:7':
      'Deus Todo-Poderoso, que glorificaste o teu Filho Jesus Cristo, elevando-o à tua direita: Concede-nos que, fixando os nossos olhos nele, sejamos transformados à sua imagem e participemos da sua glória eterna; ele que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'pentecost:1':
      'Deus Todo-Poderoso, que no dia de Pentecostes enviaste o Espírito Santo para santificar a tua Igreja: Derrama sobre nós o mesmo Espírito, para que sejamos renovados em corpo, alma e espírito, e possamos proclamar as tuas maravilhas a todas as nações; por Jesus Cristo, nosso Senhor. Amém.',
    'ordinary:default':
      'Senhor Deus, cuja providência nunca falha: Dá-nos a sabedoria para compreender a tua vontade e a coragem para cumpri-la, para que, em todas as circunstâncias da vida, possamos confiar na tua bondade e viver para a glória do teu nome; por Jesus Cristo, nosso Senhor. Amém.',
  },
  C: {
    'easter:1':
      'Deus Todo-Poderoso, que nos concedeste um novo nascimento pela água do batismo e pela palavra da verdade: Concede-nos que, celebrando a ressurreição do teu Filho, vivamos como novas criaturas; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:2':
      'Deus de infinita misericórdia, que renovaste a fé do teu povo com a celebração da Páscoa: Aumenta em nós os dons do teu Espírito, para que compreendamos mais profundamente o mistério do batismo que nos purificou, e do teu amor que nos redimiu; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:3':
      'Deus Todo-Poderoso, que nos fizeste conhecer a ressurreição do teu Filho através do testemunho dos apóstolos: Concede-nos que, reconhecendo a sua presença entre nós, sejamos seus testemunhas até aos confins da terra; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:4':
      'Deus Todo-Poderoso, cujo Filho Jesus Cristo é o bom pastor: Concede que, ouvindo a sua voz, possamos segui-lo onde quer que nos conduza, e que ele nos guie às pastagens da vida eterna; ele que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'easter:5':
      'Deus Todo-Poderoso, que nos uniste a Cristo como ramos à videira verdadeira: Concede-nos que, permanecendo nele, produzamos frutos de justiça e amor para glória do teu nome; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:6':
      'Senhor Deus, cujo Espírito Santo nos ensina a chamar-te Pai: Concede-nos que, guardando os mandamentos de teu Filho, possamos experimentar a sua paz e a sua presença em nossas vidas; por Jesus Cristo, nosso Senhor. Amém.',
    'easter:7':
      'Deus Todo-Poderoso, que glorificaste o teu Filho Jesus Cristo, elevando-o à tua direita: Concede-nos que, fixando os nossos olhos nele, sejamos transformados à sua imagem e participemos da sua glória eterna; ele que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.',
    'pentecost:1':
      'Deus Todo-Poderoso, que no dia de Pentecostes enviaste o Espírito Santo para santificar a tua Igreja: Derrama sobre nós o mesmo Espírito, para que sejamos renovados em corpo, alma e espírito, e possamos proclamar as tuas maravilhas a todas as nações; por Jesus Cristo, nosso Senhor. Amém.',
    'ordinary:default':
      'Senhor Deus, cuja providência nunca falha: Dá-nos a sabedoria para compreender a tua vontade e a coragem para cumpri-la, para que, em todas as circunstâncias da vida, possamos confiar na tua bondade e viver para a glória do teu nome; por Jesus Cristo, nosso Senhor. Amém.',
  },
};

// ─── Gerador ────────────────────────────────────────────────────────

function getSeasonName(season: string): string {
  const names: Record<string, string> = {
    advent: 'Advento',
    christmas: 'Natal',
    epiphany: 'Epifania',
    lent: 'Quaresma',
    easter: 'Páscoa',
    pentecost: 'Pentecostes',
    ordinary: 'Tempo Comum',
  };
  return names[season] || season;
}

const ordinalNumbers = [
  'Primeiro',
  'Segundo',
  'Terceiro',
  'Quarto',
  'Quinto',
  'Sexto',
  'Sétimo',
  'Oitavo',
  'Nono',
  'Décimo',
  'Décimo Primeiro',
  'Décimo Segundo',
  'Décimo Terceiro',
  'Décimo Quarto',
  'Décimo Quinto',
  'Décimo Sexto',
  'Décimo Sétimo',
  'Décimo Oitavo',
  'Décimo Nono',
  'Vigésimo',
  'Vigésimo Primeiro',
  'Vigésimo Segundo',
  'Vigésimo Terceiro',
  'Vigésimo Quarto',
  'Vigésimo Quinto',
  'Vigésimo Sexto',
  'Vigésimo Sétimo',
  'Vigésimo Oitavo',
];

function getSundayName(season: string, week: number, cycle: string): string {
  const seasonName = getSeasonName(season);
  const ord = ordinalNumbers[week - 1] || `${week}º`;
  if (season === 'advent') return `${ord} Domingo do ${seasonName}`;
  if (season === 'lent' && week === 6) return 'Domingo de Ramos';
  if (season === 'lent') return `${ord} Domingo da ${seasonName}`;
  if (season === 'easter' && week === 1) return 'Domingo da Ressurreição';
  if (season === 'easter' && week === 7) return 'Pentecostes';
  if (season === 'easter') return `${ord} Domingo da Páscoa`;
  if (season === 'epiphany') return `${ord} Domingo após a Epifania`;
  if (season === 'pentecost') return 'Domingo de Pentecostes';
  if (season === 'ordinary') return `${ord} Domingo do Tempo Comum`;
  if (season === 'christmas') return `${ord} Domingo do Natal`;
  return `${ord} Domingo do ${seasonName}`;
}

function getDayName(date: Date, season: string, week: number, cycle: string): string {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0) return getSundayName(season, week, cycle);

  const weekdayNames = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  if (
    season === 'lent' &&
    format(date, 'MM-dd') === format(calculateAshWednesday(date.getFullYear()), 'MM-dd')
  ) {
    return 'Quarta-feira de Cinzas';
  }
  if (
    season === 'lent' &&
    format(date, 'MM-dd') === format(calculateHolyThursday(date.getFullYear()), 'MM-dd')
  ) {
    return 'Quinta-feira Santa';
  }
  if (
    season === 'lent' &&
    format(date, 'MM-dd') === format(calculateGoodFriday(date.getFullYear()), 'MM-dd')
  ) {
    return 'Sexta-feira Santa';
  }
  return `${weekdayNames[dayOfWeek]} da ${week}ª Semana do ${getSeasonName(season)}`;
}

function calculateAshWednesday(year: number): Date {
  const easter = calculateEaster(year);
  return addDays(easter, -46);
}

function calculateHolyThursday(year: number): Date {
  const easter = calculateEaster(year);
  return addDays(easter, -3);
}

function calculateGoodFriday(year: number): Date {
  const easter = calculateEaster(year);
  return addDays(easter, -2);
}

function generateYear(cycle: string, liturgicalYear: number, calendarYear: number): RCLYearData {
  const entries: RCLDayEntry[] = [];
  const readings = rclReadings[cycle];
  const collects = sundayCollects[cycle];

  const easter = calculateEaster(calendarYear);
  const adventStart = calculateAdventStart(calendarYear);
  const ashWednesday = addDays(easter, -46);

  // Advent (começa no ano civil anterior, mas pertence ao ano litúrgico)
  // Advento começa em novembro/dezembro do ano ANTERIOR ao ano litúrgico
  // Ex: Ano A começa no Advento de 2025 (que é o ano litúrgico 2026)

  // O Advento pertence ao liturgicalYear
  // O advento de 2026 começa em novembro de 2026 e termina em dezembro de 2026
  // Mas espera: liturgicalYear = 2026, Advento começa em 2025-11-30 ou similar
  // O advento do ano litúrgico 2026 começa no final de 2025
  // Hmm, isso é confuso. Vamos simplificar:
  // liturgicalYear corresponde ao ano que começa no Advento.
  // Para liturgicalYear = 2026, o Advento começa no final de 2025 (nov/dez 2025)

  // Vamos calcular o Advento para (liturgicalYear - 1) porque o Advento do ano litúrgico X
  // começa no ano civil X-1
  const adventYear = liturgicalYear - 1;
  const adventStartDate = calculateAdventStart(adventYear);

  // Generate Advent Sundays (4 weeks)
  for (let w = 1; w <= 4; w++) {
    const sunday = addDays(adventStartDate, (w - 1) * 7);
    const key = `advent:${w}` as const;
    const dayReadings = readings[key];
    if (!dayReadings) continue;

    const collectKey = `advent:${w}` as const;
    entries.push({
      date: dateToRef(sunday),
      season: 'advent',
      weekOfSeason: w,
      dayName: getSundayName('advent', w, cycle),
      holyDay: true,
      readings: [
        { type: 'first_reading', ref: dayReadings.first_reading },
        { type: 'psalm', ref: dayReadings.psalm },
        { type: 'second_reading', ref: dayReadings.second_reading },
        { type: 'gospel', ref: dayReadings.gospel },
      ],
      collect: collects?.[collectKey],
    });
  }

  // Christmas (Dec 25 - Jan 5)
  const christmasDay = new Date(adventYear, 11, 25);
  const epiphany = new Date(adventYear + 1, 0, 6);

  // Christmas Day
  const christmasKey = 'christmas:1';
  const christmasReadings = readings[christmasKey];
  if (christmasReadings) {
    entries.push({
      date: dateToRef(christmasDay),
      season: 'christmas',
      weekOfSeason: 1,
      dayName: 'Natal do Senhor',
      holyDay: true,
      readings: [
        { type: 'first_reading', ref: christmasReadings.first_reading },
        { type: 'psalm', ref: christmasReadings.psalm },
        { type: 'second_reading', ref: christmasReadings.second_reading },
        { type: 'gospel', ref: christmasReadings.gospel },
      ],
      collect: collects?.['christmas:1'],
    });
  }

  // Domingo(s) depois do Natal (entre 26/dez e 5/jan) — achado em
  // 2026-08-18 (ver ROADMAP.md 1.2): a leitura do 1º Domingo depois do
  // Natal (`christmas:2`) já existia na tabela, mas nunca era ligada
  // na geração — ficava órfã, mesmo padrão do bug antigo do
  // Pentecostes/Trindade. Além disso, na maioria dos anos (quando o
  // Natal cai de quarta a sábado) existem DOIS domingos entre o Natal
  // e a Epifania, não um só — e o RCL real tem leitura própria pro
  // segundo (`christmas:3`, igual nos 3 ciclos). Calcula
  // dinamicamente quantos domingos existem nesse intervalo, ano a
  // ano — não hardcoded.
  const christmasSundayKeys: SundayIdentifier[] = ['christmas:2', 'christmas:3'];
  let christmasSundayIndex = 0;
  let christmasSunday = getNextSunday(addDays(christmasDay, 1));
  while (christmasSunday < epiphany && christmasSundayIndex < christmasSundayKeys.length) {
    const key = christmasSundayKeys[christmasSundayIndex];
    const dayReadings = readings[key];
    if (dayReadings) {
      const weekNum = christmasSundayIndex + 2;
      entries.push({
        date: dateToRef(christmasSunday),
        season: 'christmas',
        weekOfSeason: weekNum,
        dayName:
          christmasSundayIndex === 0 ? '1º Domingo depois do Natal' : '2º Domingo depois do Natal',
        holyDay: true,
        readings: [
          { type: 'first_reading', ref: dayReadings.first_reading },
          { type: 'psalm', ref: dayReadings.psalm },
          { type: 'second_reading', ref: dayReadings.second_reading },
          { type: 'gospel', ref: dayReadings.gospel },
        ],
        collect: collects?.[key],
      });
    }
    christmasSundayIndex++;
    christmasSunday = addDays(christmasSunday, 7);
  }

  // Epiphany (Jan 6) — achado em 2026-08-18 (ver ROADMAP.md 1.2f):
  // este bloco usava a chave 'epiphany:1', que na verdade contém a
  // leitura do Batismo do Senhor (Mateus 3, não Mateus 2) — a leitura
  // real da Epifania (visita dos magos, Isaías 60/Mateus 2:1-12, igual
  // nos 3 ciclos) nunca existia na tabela. Isso empurrava toda a
  // numeração dos domingos seguintes uma semana adiantada: o Batismo
  // do Senhor (1º domingo real depois da Epifania) mostrava a leitura
  // do "2º Domingo depois da Epifania", e assim por diante.
  const epiphanyKey = 'epiphanyday:1';
  const epiphanyReadings = readings[epiphanyKey];
  if (epiphanyReadings) {
    entries.push({
      date: dateToRef(epiphany),
      season: 'epiphany',
      weekOfSeason: 1,
      dayName: 'Epifania do Senhor',
      holyDay: true,
      readings: [
        { type: 'first_reading', ref: epiphanyReadings.first_reading },
        { type: 'psalm', ref: epiphanyReadings.psalm },
        { type: 'second_reading', ref: epiphanyReadings.second_reading },
        { type: 'gospel', ref: epiphanyReadings.gospel },
      ],
      collect: collects?.['epiphany:1'],
    });
  }

  // Sundays after Epiphany (between Jan 7 and Ash Wednesday)
  const epiphanyYear = adventYear + 1;
  const epiphanyJan6 = new Date(epiphanyYear, 0, 6);
  const ashWed = calculateAshWednesday(epiphanyYear);

  // Domingo da Transfiguração — achado em 2026-08-18 (ver ROADMAP.md
  // 1.2): é sempre o ÚLTIMO domingo antes da Quarta-feira de Cinzas,
  // com leituras fixas por ciclo (não numeração sequencial) — mas o
  // código antigo nunca tratava esse domingo como caso especial,
  // então mostrava sempre o conteúdo genérico de "Epifania N" que
  // calhasse de cair ali, dependendo do ano (varia de semana 6 a 10,
  // ver checagem 2015-2045). Detecta o último domingo comparando se o
  // PRÓXIMO domingo já cairia na Quarta-feira de Cinzas ou depois.
  // epiphanyWeek=2 é o 1º domingo real depois da Epifania (sempre o
  // Domingo do Batismo do Senhor, nome próprio — não "1º Domingo após
  // a Epifania", que não existe como tal no RCL); epiphanyWeek=3 é o
  // "2º Domingo após a Epifania" (chave da tabela `epiphany:2`), e
  // assim por diante — a chave da tabela é sempre `epiphany:${M}`
  // onde M = epiphanyWeek - 1 é o número do domingo real (1 =
  // Batismo, 2 = 2º Domingo, ...), consistente com o conteúdo já
  // existente em cada tabela (achado/corrigido em 2026-08-18, ver
  // ROADMAP.md 1.2f).
  let epiphanyWeek = 2; // Start from week 2 (week 1 was Jan 6)
  let currentSunday = getNextSunday(addDays(epiphanyJan6, 1));
  while (currentSunday < ashWed) {
    const isLastSundayBeforeLent = addDays(currentSunday, 7) >= ashWed;
    const realSundayNumber = epiphanyWeek - 1;
    const isBaptism = realSundayNumber === 1;
    const key = isLastSundayBeforeLent
      ? ('transfiguration:1' as const)
      : (`epiphany:${realSundayNumber}` as const);
    const dayReadings = readings[key];
    if (dayReadings) {
      const collectKey =
        realSundayNumber <= 8 ? (`epiphany:${realSundayNumber}` as const) : 'epiphany:last';
      entries.push({
        date: dateToRef(currentSunday),
        season: 'epiphany',
        weekOfSeason: epiphanyWeek,
        dayName: isLastSundayBeforeLent
          ? 'Domingo da Transfiguração'
          : isBaptism
            ? 'Batismo do Senhor'
            : `${ordinalNumbers[realSundayNumber - 1] || `${realSundayNumber}º`} Domingo após a Epifania`,
        holyDay: true,
        readings: [
          { type: 'first_reading', ref: dayReadings.first_reading },
          { type: 'psalm', ref: dayReadings.psalm },
          { type: 'second_reading', ref: dayReadings.second_reading },
          { type: 'gospel', ref: dayReadings.gospel },
        ],
        collect: collects?.[collectKey] || collects?.['epiphany:last'],
      });
    }
    currentSunday = addDays(currentSunday, 7);
    epiphanyWeek++;
  }

  // Ash Wednesday
  entries.push({
    date: dateToRef(ashWednesday),
    season: 'lent',
    weekOfSeason: 0,
    dayName: 'Quarta-feira de Cinzas',
    holyDay: true,
    readings: [
      { type: 'first_reading', ref: 'Joel 2:1-2, 12-17' },
      { type: 'psalm', ref: 'Salmo 51:1-17' },
      { type: 'second_reading', ref: '2 Coríntios 5:20b-6:10' },
      { type: 'gospel', ref: 'Mateus 6:1-6, 16-21' },
    ],
    collect:
      'Deus Todo-Poderoso e eterno, que não queres a morte do pecador, mas que ele se converta e viva: Concede-nos, neste tempo de Quaresma, a graça do verdadeiro arrependimento e da renovação de nossas vidas; por Jesus Cristo, nosso Senhor. Amém.',
  });

  // Lent Sundays (Lent 1-6, where Lent 6 = Palm Sunday)
  const firstLentSunday = getNextSunday(ashWednesday);
  for (let w = 1; w <= 6; w++) {
    const sunday = addDays(firstLentSunday, (w - 1) * 7);
    const key = `lent:${w}` as const;
    const dayReadings = readings[key];
    if (!dayReadings) continue;

    const collectKey = `lent:${w}` as const;
    entries.push({
      date: dateToRef(sunday),
      season: 'lent',
      weekOfSeason: w,
      dayName: w === 6 ? 'Domingo de Ramos' : `${ordinalNumbers[w - 1]} Domingo da Quaresma`,
      holyDay: true,
      readings: [
        { type: 'first_reading', ref: dayReadings.first_reading },
        { type: 'psalm', ref: dayReadings.psalm },
        { type: 'second_reading', ref: dayReadings.second_reading },
        { type: 'gospel', ref: dayReadings.gospel },
      ],
      collect: collects?.[collectKey],
    });
  }

  // Easter Sundays — os 7 domingos reais da Páscoa (Páscoa em si até o
  // 7º Domingo da Páscoa, a semana antes de Pentecostes). Antes deste
  // conserto (2026-08-16), o laço ia até w=7 = Páscoa+42 dias e
  // rotulava esse dia como "Pentecostes" — mas o Pentecostes real é
  // Páscoa+49 dias; a data usada era o verdadeiro 7º Domingo da
  // Páscoa. Isso empurrava toda a numeração do Tempo Comum uma semana
  // pra frente da data certa. Ver ROADMAP.md 1.2.
  for (let w = 1; w <= 7; w++) {
    const sunday = addDays(easter, (w - 1) * 7);
    const key = `easter:${w}` as const;
    const dayReadings = readings[key];
    if (!dayReadings) continue;

    entries.push({
      date: dateToRef(sunday),
      season: 'easter',
      weekOfSeason: w,
      dayName:
        w === 1
          ? 'Domingo da Ressurreição'
          : `${ordinalNumbers[w - 1] || `${w}º`} Domingo da Páscoa`,
      holyDay: true,
      readings: [
        { type: 'first_reading', ref: dayReadings.first_reading },
        { type: 'psalm', ref: dayReadings.psalm },
        { type: 'second_reading', ref: dayReadings.second_reading },
        { type: 'gospel', ref: dayReadings.gospel },
      ],
      collect: collects?.[`easter:${w}` as const],
    });
  }

  // Dia de Pentecostes (Páscoa + 49 dias) — antes deste conserto nunca
  // era gerado como entrada própria; a leitura correta já existia na
  // tabela (chave 'pentecost:1') mas ficava órfã, nunca consultada.
  const pentecostSunday = addDays(easter, 49);
  const pentecostReadings = readings['pentecost:1'];
  if (pentecostReadings) {
    entries.push({
      date: dateToRef(pentecostSunday),
      season: 'pentecost',
      weekOfSeason: 1,
      dayName: 'Dia de Pentecostes',
      holyDay: true,
      readings: [
        { type: 'first_reading', ref: pentecostReadings.first_reading },
        { type: 'psalm', ref: pentecostReadings.psalm },
        { type: 'second_reading', ref: pentecostReadings.second_reading },
        { type: 'gospel', ref: pentecostReadings.gospel },
      ],
      collect: collects?.['pentecost:1'],
    });
  }

  // Domingo da Trindade (Pentecostes + 7 dias) — mesma lacuna: antes
  // deste conserto não existia como entrada própria, e a primeira
  // leitura do "Tempo Comum" acabava sendo mostrada na data da
  // Trindade, uma semana adiantada.
  const trinitySunday = addDays(pentecostSunday, 7);
  const trinityReadings = readings['trinity:1'];
  if (trinityReadings) {
    entries.push({
      date: dateToRef(trinitySunday),
      season: 'pentecost',
      weekOfSeason: 2,
      dayName: 'Domingo da Santíssima Trindade',
      holyDay: true,
      readings: [
        { type: 'first_reading', ref: trinityReadings.first_reading },
        { type: 'psalm', ref: trinityReadings.psalm },
        { type: 'second_reading', ref: trinityReadings.second_reading },
        { type: 'gospel', ref: trinityReadings.gospel },
      ],
      collect: collects?.['pentecost:1'],
    });
  }

  // Tempo Comum — ancorado no Próprio real de cada domingo (ver
  // getProperNumberForDate), não mais numerado sequencialmente a
  // partir da Trindade. É o conserto central desta seção: a contagem
  // sequencial antiga produzia a leitura errada em praticamente todo
  // domingo, porque o número de domingos entre a Trindade e o Advento
  // varia todo ano (22 a 27), enquanto cada Próprio do RCL real está
  // ancorado numa janela fixa do calendário civil. `weekOfSeason`
  // aqui É o número do Próprio (3 a 29) — estável e com o mesmo
  // significado todo ano, ao contrário da contagem sequencial antiga.
  const nextAdvent = calculateAdventStart(liturgicalYear);
  const firstOrdinarySunday = addDays(trinitySunday, 7);

  currentSunday = firstOrdinarySunday;
  while (currentSunday < nextAdvent) {
    const properNumber = getProperNumberForDate(currentSunday);
    const key = `proper${properNumber}` as const;
    const dayReadings = readings[key];
    if (dayReadings) {
      entries.push({
        date: dateToRef(currentSunday),
        season: 'ordinary',
        weekOfSeason: properNumber,
        dayName: `${ordinalNumbers[properNumber - 1] || `${properNumber}º`} Domingo do Tempo Comum`,
        holyDay: true,
        readings: [
          { type: 'first_reading', ref: dayReadings.first_reading },
          { type: 'psalm', ref: dayReadings.psalm },
          { type: 'second_reading', ref: dayReadings.second_reading },
          { type: 'gospel', ref: dayReadings.gospel },
        ],
        collect: collects?.['ordinary:default'],
      });
    }
    currentSunday = addDays(currentSunday, 7);
  }

  entries.sort((a, b) => a.date.localeCompare(b.date));

  return {
    cycle,
    year: calendarYear,
    liturgicalYear,
    entries,
  };
}

// ─── Main ───────────────────────────────────────────────────────────

function main() {
  const outputDir = resolve(__dirname, '../src/data/rcl');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
  const cycles = ['A', 'B', 'C'] as const;

  // Generate per-cycle aggregate files
  for (const cycle of cycles) {
    const allEntries: RCLDayEntry[] = [];
    for (const year of years) {
      // liturgical year = year + 1 if date is after Advent start
      // But for generation, we match liturgical year to calendar year
      // A = 2025, 2028, 2031 (liturgical years)
      // B = 2026, 2029, 2032
      // C = 2024, 2027, 2030
      // So for year 2026 (Cycle B), liturgical year = 2026
      // The Advent for liturgical year 2026 starts in 2025
      const liturgicalYear = year;
      const data = generateYear(cycle, liturgicalYear, year);
      allEntries.push(...data.entries);
    }

    allEntries.sort((a, b) => a.date.localeCompare(b.date));

    // Remove duplicates by date
    const unique = new Map<string, RCLDayEntry>();
    for (const entry of allEntries) {
      unique.set(entry.date, entry);
    }

    const output = {
      cycle,
      seasons: {} as Record<string, RCLDayEntry[]>,
    };

    for (const entry of Array.from(unique.values())) {
      if (!output.seasons[entry.season]) {
        output.seasons[entry.season] = [];
      }
      output.seasons[entry.season].push(entry);
    }

    const filePath = resolve(outputDir, `cycle-${cycle}.json`);

    // Preserva textos bíblicos (ARC) já populados por lookup-bible-text.ts.
    // Este script recalcula datas/referências/coletas do zero a cada rodada;
    // sem isso, regenerar por causa de um bugfix de calendário apaga
    // silenciosamente o `text` de toda leitura (ver ROADMAP > Débito técnico,
    // caso real no commit 817ed23). Só reaproveita o texto se a referência
    // não mudou — se `ref` for diferente, o texto antigo não corresponde
    // mais e fica pendente de novo lookup.
    if (existsSync(filePath)) {
      const previous = JSON.parse(String(readFileSync(filePath))) as typeof output;
      const previousTextByKey = new Map<string, string>();
      for (const entries of Object.values(previous.seasons ?? {})) {
        for (const entry of entries) {
          for (const reading of entry.readings) {
            if (reading.text) {
              previousTextByKey.set(`${entry.date}|${reading.type}|${reading.ref}`, reading.text);
            }
          }
        }
      }
      for (const entries of Object.values(output.seasons)) {
        for (const entry of entries) {
          for (const reading of entry.readings) {
            const preserved = previousTextByKey.get(`${entry.date}|${reading.type}|${reading.ref}`);
            if (preserved) reading.text = preserved;
          }
        }
      }
    }

    writeFileSync(filePath, JSON.stringify(output, null, 2));
    console.log(`✅ Gerado ${filePath} (${unique.size} entradas)`);
  }

  // Summary
  console.log('\n📊 Resumo:');
  for (const cycle of cycles) {
    const filePath = resolve(outputDir, `cycle-${cycle}.json`);
    const data = JSON.parse(String(readFileSync(filePath)));
    const total = Object.values(data.seasons as Record<string, RCLDayEntry[]>).reduce(
      (acc: number, arr: RCLDayEntry[]) => acc + arr.length,
      0,
    );
    console.log(`  Ano ${cycle}: ${total} dias`);
  }
}

main();
