/**
 * Validação de conteúdo dos dados publicados (Fase 5.1, ROADMAP 2026-08-30).
 *
 * O objetivo é formalizar num único módulo reutilizável as checagens que
 * antes viviam em testes pontuais / scripts descartáveis:
 *   1. Dentro de cada ano: zero lacuna (dias contíguos na janela do ano
 *      litúrgico) e zero repetição de título/oração/meditação. NOTA: o
 *      salmo NÃO é checado — foi confirmado empiricamente que salmos
 *      repetem legitimamente dentro do ano (4-5x/ano, ex.: o mesmo
 *      salmo serve a mais de uma semana).
 *   2. Cruzando os anos: repetição trienal "corroborada". Nenhum título
 *      pode aparecer MAIS do que o número máximo de anos (6) — a classe
 *      de bug histórica (1.2c) era um título repetido 25x. Qualquer
 *      contagem acima do teto é anomalia estrutural, não conteúdo.
 *   3. Cobertura de texto bíblico ARC: absorve a lógica de
 *      rcl-bible-text.test.ts (allowlist do dual-psalm "Salmo 42, 43").
 *
 * Este módulo é puro — recebe os dados e devolve um relatório. Os
 * testes/callers carregam os JSONs de verdade e injetam dados
 * deliberadamente quebrados pra provar que o validador falha.
 */

export interface ReadingInput {
  type: string;
  ref: string;
  text?: string;
}

export interface DevotionalEntryInput {
  prayer: { title: string; text: string };
  meditation: { prompt: string };
}

export interface DevotionalYearInput {
  year: number;
  entries: Record<string, DevotionalEntryInput>;
}

export interface CycleInput {
  cycle: string;
  seasons: Record<string, { date: string; readings: ReadingInput[] }[]>;
}

export interface ValidationIssue {
  severity: 'error' | 'info';
  check: string;
  message: string;
}

export interface ValidationReport {
  ok: boolean;
  issues: ValidationIssue[];
  distribution: Record<number, number>;
}

const KNOWN_FORMAT_GAPS = new Set(['Salmo 42, 43']);

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function expectedDaysForYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

function formatDateRange(data: DevotionalYearInput): { start: string; end: string } {
  const dates = Object.keys(data.entries).sort();
  return { start: dates[0] ?? '', end: dates[dates.length - 1] ?? '' };
}

function checkYearContiguity(data: DevotionalYearInput, label: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const dates = Object.keys(data.entries).sort();
  if (dates.length !== expectedDaysForYear(data.year)) {
    issues.push({
      severity: 'error',
      check: 'lacuna',
      message: `${label}: esperado ${expectedDaysForYear(data.year)} dias para ${data.year}, achados ${dates.length}.`,
    });
    return issues;
  }
  if (dates[0] !== `${data.year - 1}-12-01`) {
    issues.push({
      severity: 'error',
      check: 'lacuna',
      message: `${label}: janela deveria começar em ${data.year - 1}-12-01, mas o primeiro dia é ${dates[0]}.`,
    });
  }
  if (dates[dates.length - 1] !== `${data.year}-11-30`) {
    issues.push({
      severity: 'error',
      check: 'lacuna',
      message: `${label}: janela deveria terminar em ${data.year}-11-30, mas o último dia é ${dates[dates.length - 1]}.`,
    });
  }
  for (let i = 1; i < dates.length; i++) {
    const [y, m, d] = dates[i].split('-').map(Number);
    const prev = new Date(Date.UTC(y, m - 1, d));
    prev.setUTCDate(prev.getUTCDate() - 1);
    const prevStr = prev.toISOString().slice(0, 10);
    if (dates[i - 1] !== prevStr) {
      issues.push({
        severity: 'error',
        check: 'lacuna',
        message: `${label}: buraco entre ${dates[i - 1]} e ${dates[i]}.`,
      });
    }
  }
  return issues;
}

function checkYearDuplicates(data: DevotionalYearInput, label: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const titles = new Map<string, string>();
  const prayers = new Map<string, string>();
  const prompts = new Map<string, string>();

  for (const [date, entry] of Object.entries(data.entries)) {
    const t = entry.prayer.title;
    if (titles.has(t)) {
      issues.push({
        severity: 'error',
        check: 'repeticao-intern-ano',
        message: `${label}: título "${t}" repetido em ${date} e ${titles.get(t)}.`,
      });
    } else {
      titles.set(t, date);
    }

    const p = entry.prayer.text;
    if (prayers.has(p)) {
      issues.push({
        severity: 'error',
        check: 'repeticao-intern-ano',
        message: `${label}: oração repetida em ${date} e ${prayers.get(p)}.`,
      });
    } else {
      prayers.set(p, date);
    }

    const pr = entry.meditation.prompt;
    if (prompts.has(pr)) {
      issues.push({
        severity: 'error',
        check: 'repeticao-intern-ano',
        message: `${label}: meditação repetida em ${date} e ${prompts.get(pr)}.`,
      });
    } else {
      prompts.set(pr, date);
    }
  }
  return issues;
}

function checkBibleCoverage(cycles: CycleInput[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  let overallTotal = 0;
  let overallMissing = 0;

  for (const cycle of cycles) {
    for (const [season, entries] of Object.entries(cycle.seasons)) {
      for (const entry of entries) {
        for (const reading of entry.readings) {
          overallTotal++;
          if (reading.text === undefined) {
            if (!KNOWN_FORMAT_GAPS.has(reading.ref)) {
              issues.push({
                severity: 'error',
                check: 'cobertura-arc',
                message: `Ciclo ${cycle.cycle} ${season} ${entry.date}: leitura "${reading.ref}" sem texto bíblico e fora da lista de lacunas conhecidas.`,
              });
            } else {
              overallMissing++;
              issues.push({
                severity: 'info',
                check: 'cobertura-arc',
                message: `Ciclo ${cycle.cycle} ${season} ${entry.date}: "${reading.ref}" — lacuna de parsing conhecida (allowlist), sem perda de dado.`,
              });
            }
          }
        }
      }
    }
  }

  issues.push({
    severity: 'info',
    check: 'cobertura-arc',
    message: `Cobertura ARC: ${overallTotal - overallMissing}/${overallTotal} textos presentes (${overallMissing} allowlisted "Salmo 42, 43" — 1x/ano na Vigília Pascal do Ciclo C).`,
  });
  return issues;
}

/**
 * Valida os dados. `devotionals` são os 6 arquivos anuais; `cycles` os 3
 * ciclos. Devolve um relatório: `ok` falso quando há qualquer erro.
 */
export function validateContent(
  devotionals: DevotionalYearInput[],
  cycles: CycleInput[],
): ValidationReport {
  const issues: ValidationIssue[] = [];

  for (const d of devotionals) {
    const label = `devotionals-${d.year}`;
    issues.push(...checkYearContiguity(d, label));
    issues.push(...checkYearDuplicates(d, label));
  }

  issues.push(...checkBibleCoverage(cycles));

  // Repetição trienal corroborada: distribuição de quantos anos cada
  // título aparece. Teto = número de anos. Acima disso é bug estrutural
  // (a classe do fallback 1.2c repetia um título 25x).
  const titleYears = new Map<string, number[]>();
  for (const d of devotionals) {
    for (const entry of Object.values(d.entries)) {
      const t = entry.prayer.title;
      const arr = titleYears.get(t) ?? [];
      arr.push(d.year);
      titleYears.set(t, arr);
    }
  }

  const distribution: Record<number, number> = {};
  for (const years of titleYears.values()) {
    distribution[years.length] = (distribution[years.length] ?? 0) + 1;
  }

  const maxYears = devotionals.length;
  for (const [title, years] of titleYears.entries()) {
    if (years.length > maxYears) {
      issues.push({
        severity: 'error',
        check: 'repeticao-trienal',
        message: `Título "${title}" aparece ${years.length}x nos anos ${years.join(', ')} — acima do teto de ${maxYears} anos. Bug do tipo fallback (1.2c).`,
      });
    }
  }

  const errors = issues.filter((i) => i.severity === 'error');
  return { ok: errors.length === 0, issues, distribution };
}
