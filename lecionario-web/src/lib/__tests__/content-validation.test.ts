import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  validateContent,
  type DevotionalYearInput,
  type CycleInput,
} from '@/lib/content-validation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const RCL_DIR = resolve(__dirname, '../../data/rcl');

function loadYear(year: number): DevotionalYearInput {
  const raw = JSON.parse(readFileSync(resolve(RCL_DIR, `devotionals-${year}.json`), 'utf-8')) as {
    year: number;
    entries: Record<string, never>;
  };
  return raw as unknown as DevotionalYearInput;
}

function loadCycle(cycle: string): CycleInput {
  const raw = JSON.parse(
    readFileSync(resolve(RCL_DIR, `cycle-${cycle}.json`), 'utf-8'),
  ) as CycleInput;
  return raw;
}

const YEARS = [2025, 2026, 2027, 2028, 2029, 2030] as const;

describe('validateContent — dados publicados (2045 anos de conteúdo)', () => {
  it('passa limpo nos 6 arquivos + 3 ciclos reais (o contrato de 1.2/1.2a/1.2c)', () => {
    const report = validateContent(YEARS.map(loadYear), ['A', 'B', 'C'].map(loadCycle));
    const errors = report.issues.filter((i) => i.severity === 'error');
    expect(
      errors,
      `Validação encontrou ${errors.length} erro(s):\n${errors
        .slice(0, 10)
        .map((e) => e.message)
        .join('\n')}`,
    ).toHaveLength(0);
  });

  it('reporta a distribuição de repetição trienal esperada', () => {
    const report = validateContent(YEARS.map(loadYear), ['A', 'B', 'C'].map(loadCycle));
    const { distribution } = report;
    // 61 títulos únicos, ~890 títulos de ciclo repetindo 2x (mecanismo do
    // RCL: A em 2026+2029, B em 2027+2030, C em 2025+2028), 34x4 e 31x6
    // (festas de data fixa). Se estes números mudarem muito, a rotação de
    // 5.5 está alterando o comportamento esperado ou algo regrediu.
    expect(distribution['1'] ?? 0).toBeGreaterThan(0);
    expect(distribution['2'] ?? 0).toBeGreaterThan(800);
    expect(distribution['6'] ?? 0).toBeGreaterThanOrEqual(20);
  });
});

describe('validateContent — detecta conteúdo quebrado (o validador funciona)', () => {
  function makeYear(year: number): DevotionalYearInput {
    const entries: Record<string, never> = {};
    for (let day = 1; day <= 365; day++) {
      const d = new Date(Date.UTC(year - 1, 11, day)); // dezembro do ano anterior
      const key = d.toISOString().slice(0, 10);
      entries[key] = {
        prayer: { title: `Título Único ${day}`, text: `Oração única ${day}.` },
        meditation: { prompt: `Meditação única ${day}.` },
      } as never;
    }
    return { year, entries } as unknown as DevotionalYearInput;
  }

  it('falha quando há título duplicado dentro do ano', () => {
    const year = makeYear(2025);
    const entries = year.entries as unknown as Record<
      string,
      DevotionalYearInput['entries'][string]
    >;
    const keys = Object.keys(entries);
    entries[keys[1]].prayer.title = entries[keys[0]].prayer.title;

    const report = validateContent([year], []);
    const errors = report.issues.filter((i) => i.severity === 'error');
    expect(errors.some((e) => e.check === 'repeticao-intern-ano')).toBe(true);
  });

  it('falha quando há oração duplicada dentro do ano', () => {
    const year = makeYear(2025);
    const entries = year.entries as unknown as Record<
      string,
      DevotionalYearInput['entries'][string]
    >;
    const keys = Object.keys(entries);
    entries[keys[1]].prayer.text = entries[keys[0]].prayer.text;

    const report = validateContent([year], []);
    const errors = report.issues.filter((i) => i.severity === 'error');
    expect(errors.some((e) => e.check === 'repeticao-intern-ano')).toBe(true);
  });

  it('falha quando há lacuna de dias', () => {
    const year = makeYear(2025);
    const entries = year.entries as unknown as Record<string, unknown>;
    delete entries[`${2024}-12-15`];

    const report = validateContent([year], []);
    const errors = report.issues.filter((i) => i.severity === 'error');
    expect(errors.some((e) => e.check === 'lacuna')).toBe(true);
  });

  it('falha quando a janela do ano litúrgico está errada', () => {
    const year = makeYear(2025);
    const entries = year.entries as unknown as Record<string, unknown>;
    delete entries['2024-12-01'];

    const report = validateContent([year], []);
    const errors = report.issues.filter((i) => i.severity === 'error');
    expect(errors.some((e) => e.check === 'lacuna')).toBe(true);
  });

  it('falha quando um texto bíblico some de uma leitura canônica', () => {
    const cycle = loadCycle('A');
    const season = cycle.seasons['advent'];
    const target = season.find((e) => e.readings.some((r) => r.text !== undefined));
    if (!target) throw new Error('ansioso: esperava uma entrada do Advento com texto');
    const reading = target.readings.find((r) => r.text !== undefined);
    if (!reading) throw new Error('ansioso: esperava uma leitura do Advento com texto');
    delete reading.text;

    const report = validateContent(YEARS.map(loadYear), [cycle]);
    const errors = report.issues.filter((i) => i.severity === 'error');
    expect(errors.some((e) => e.check === 'cobertura-arc')).toBe(true);
  });

  it('falha quando um título aparece acima do teto de anos (regressão tipo 1.2c)', () => {
    const a = makeYear(2025);
    const b = makeYear(2026);
    const entriesA = a.entries as unknown as Record<string, DevotionalYearInput['entries'][string]>;
    const entriesB = b.entries as unknown as Record<string, DevotionalYearInput['entries'][string]>;
    const keysA = Object.keys(entriesA);
    const keysB = Object.keys(entriesB);
    // 2025 (365 dias) + 2026 (365 dias) = 730 dias > teto de 2 anos
    entriesB[keysB[0]].prayer.title = entriesA[keysA[0]].prayer.title;
    entriesB[keysB[1]].prayer.title = entriesA[keysA[0]].prayer.title;

    const report = validateContent([a, b], []);
    const errors = report.issues.filter((i) => i.severity === 'error');
    expect(errors.some((e) => e.check === 'repeticao-trienal')).toBe(true);
  });
});
