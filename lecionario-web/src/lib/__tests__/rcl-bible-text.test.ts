import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Trava o pipeline de dados: os textos bíblicos (Almeida ARC) foram
 * perdidos silenciosamente uma vez (commit 817ed23, ver ROADMAP >
 * Débito técnico) porque generate-rcl-data.ts sobrescrevia os JSONs do
 * zero e ninguém rodou lookup-bible-text.ts de novo depois. Esse teste
 * existe pra isso nunca mais passar batido — se a cobertura de texto
 * cair abaixo do esperado, o CI quebra na hora, não numa auditoria
 * manual meses depois.
 */

interface RCLReading {
  type: string;
  ref: string;
  text?: string;
}

interface RCLDayEntry {
  date: string;
  readings: RCLReading[];
}

// Lacuna de parsing conhecida e pré-existente em getReferenceText()
// (lookup-bible-text.ts): referências com dois salmos separados por
// vírgula (ex. "Salmo 42, 43") não são resolvidas. Ocorre 1x/ano no
// Ciclo C, Vigília Pascal. Não é perda de dado — nunca foi encontrado.
const KNOWN_FORMAT_GAPS = new Set(['Salmo 42, 43']);

describe('cycle-*.json — cobertura de texto bíblico (ARC)', () => {
  for (const cycle of ['A', 'B', 'C']) {
    it(`Ciclo ${cycle} tem texto em praticamente todas as leituras canônicas`, () => {
      const filePath = resolve(__dirname, `../../data/rcl/cycle-${cycle}.json`);
      const data = JSON.parse(readFileSync(filePath, 'utf-8')) as {
        seasons: Record<string, RCLDayEntry[]>;
      };

      const missing: string[] = [];
      let total = 0;

      for (const entries of Object.values(data.seasons)) {
        for (const entry of entries) {
          for (const reading of entry.readings) {
            total++;
            // text === '' é deuterocanônico, marcado de propósito (ver
            // lookup-bible-text.ts) — não conta como faltando.
            if (reading.text === undefined) {
              if (!KNOWN_FORMAT_GAPS.has(reading.ref)) {
                missing.push(`${entry.date} ${reading.type} "${reading.ref}"`);
              }
            }
          }
        }
      }

      expect(total).toBeGreaterThan(0);
      expect(
        missing,
        `${missing.length} leitura(s) sem texto bíblico e sem estar na lista de lacunas conhecidas — rodou generate-rcl-data.ts sem rodar lookup-bible-text.ts depois?\n${missing.slice(0, 10).join('\n')}`,
      ).toHaveLength(0);
    });
  }
});
