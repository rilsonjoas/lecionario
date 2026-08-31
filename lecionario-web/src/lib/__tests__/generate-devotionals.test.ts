import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  generateYear,
  getCycleOccurrence,
  getYearOccurrence,
  resolveSlot,
  type DevotionalSlot,
} from '../../../scripts/generate-devotionals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Trava a mecânica de rotação por ocorrência do ciclo (ROADMAP 5.4):
 *
 * 1. Com variações vazias (estado atual — nenhum slot é RotatableEntry
 *    ainda), o output é idêntico ao dos JSONs publicados: prova de que
 *    a mecânica não piora nada.
 * 2. O índice de ocorrências identifica corretamente 1ª/2ª vez por
 *    ciclo (content por ciclo) e 1-6 por ano (conteúdo fixo).
 * 3. resolveSlot tem fallback: sem variação para a ocorrência, usa
 *    `default`.
 */

const YEARS = [2025, 2026, 2027, 2028, 2029, 2030] as const;

interface DevotionalEntryShape {
  prayer: { title: string; text: string };
  meditation: { prompt: string };
}

function readPublished(year: number): Record<string, DevotionalEntryShape> {
  const filePath = resolve(__dirname, `../../data/rcl/devotionals-${year}.json`);
  return JSON.parse(readFileSync(filePath, 'utf-8')).entries;
}

describe('5.4 mecânica — regressão de output (variações vazias)', () => {
  for (const year of YEARS) {
    it(`generateYear(${year}) é idêntico ao devotionals-${year}.json publicado`, () => {
      const generated = generateYear(year);
      const published = readPublished(year);

      expect(Object.keys(generated).length).toBe(Object.keys(published).length);

      const differences: string[] = [];
      for (const dateStr of Object.keys(published)) {
        if (!generated[dateStr]) {
          differences.push(`${dateStr}: sumiu (gerado não tem esta data)`);
          continue;
        }
        const g = generated[dateStr];
        const p = published[dateStr];
        if (g.prayer.title !== p.prayer.title) {
          differences.push(
            `${dateStr}: título — gerado "${g.prayer.title}" vs publicado "${p.prayer.title}"`,
          );
        }
        if (g.prayer.text !== p.prayer.text) {
          differences.push(`${dateStr}: texto da oração diferente`);
        }
        if (g.meditation.prompt !== p.meditation.prompt) {
          differences.push(`${dateStr}: prompt da meditação diferente`);
        }
      }
      for (const dateStr of Object.keys(generated)) {
        if (!published[dateStr]) {
          differences.push(`${dateStr}: data nova (publicado não tem)`);
        }
      }

      expect(
        differences,
        `A mecânica alterou o output publicado. Se isso é intencional, atualize o JSON; se não, a rotação está vazando:\n${differences.slice(0, 10).join('\n')}`,
      ).toHaveLength(0);
    });
  }
});

describe('5.4 mecânica — índice de ocorrências', () => {
  it('ciclo A: 2026 é 1ª ocorrência, 2029 é 2ª', () => {
    expect(getCycleOccurrence('A', 2026)).toBe(1);
    expect(getCycleOccurrence('A', 2029)).toBe(2);
  });

  it('ciclo B: 2027 é 1ª, 2030 é 2ª', () => {
    expect(getCycleOccurrence('B', 2027)).toBe(1);
    expect(getCycleOccurrence('B', 2030)).toBe(2);
  });

  it('ciclo C: 2025 é 1ª, 2028 é 2ª', () => {
    expect(getCycleOccurrence('C', 2025)).toBe(1);
    expect(getCycleOccurrence('C', 2028)).toBe(2);
  });

  it('conteúdo fixo: 1..6 pelos anos litúrgicos 2025..2030', () => {
    expect(getYearOccurrence(2025)).toBe(1);
    expect(getYearOccurrence(2030)).toBe(6);
  });
});

describe('5.4 mecânica — resolveSlot (fallback)', () => {
  const plain: DevotionalSlot = {
    prayer: { title: 'Base', text: 'Texto base' },
    meditation: { prompt: 'Prompt base' },
  };
  const rotatable: DevotionalSlot = {
    default: {
      prayer: { title: 'Base', text: 'Texto base' },
      meditation: { prompt: 'Prompt base' },
    },
    occurrences: {
      2: {
        prayer: { title: '2ª vez', text: 'Texto 2ª' },
        meditation: { prompt: 'Prompt 2ª' },
      },
    },
  };

  it('Devolve o slot simples inalterado', () => {
    expect(resolveSlot(plain, 1)).toBe(plain);
    expect(resolveSlot(plain, 6)).toBe(plain);
  });

  it('Usa default quando não há variação da ocorrência', () => {
    expect(resolveSlot(rotatable, 1).prayer.title).toBe('Base');
    expect(resolveSlot(rotatable, 3).prayer.title).toBe('Base');
  });

  it('Usa a variação quando a ocorrência existe', () => {
    expect(resolveSlot(rotatable, 2).prayer.title).toBe('2ª vez');
  });
});
