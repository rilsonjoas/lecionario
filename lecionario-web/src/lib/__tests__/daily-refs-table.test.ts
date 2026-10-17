import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { buildDailyRefsTable } from '../daily-refs-table';

// A tabela de leituras do dia que o Bíblia na Arte usa pra escolher a Pintura do Dia é
// COPIADA À MÃO deste projeto pra lá (docs: hetzner-infra/CONTRATOS-ENTRE-PROJETOS.md,
// seção 2.5). Este teste é a primeira metade da corrente: o arquivo versionado em
// data/ tem de refletir o calendário litúrgico de hoje. A segunda metade vive no
// Bíblia na Arte (lectionary-refs-sync.test.ts) e compara a cópia de lá com este arquivo.
const ARQUIVO = path.join(__dirname, '..', '..', '..', 'data', 'daily-readings-refs.json');

describe('tabela de leituras exportada para o Bíblia na Arte', () => {
  it('data/daily-readings-refs.json está em dia com o calendário litúrgico', () => {
    const versionado = JSON.parse(readFileSync(ARQUIVO, 'utf-8'));
    const calculado = buildDailyRefsTable();
    const dias = Object.keys(calculado).filter(
      (d) => JSON.stringify(calculado[d]) !== JSON.stringify(versionado[d]),
    );
    expect(
      dias.length,
      `${dias.length} dia(s) divergem (ex.: ${dias.slice(0, 3).join(', ')}). ` +
        'Rode `npx tsx scripts/export-daily-refs.ts` em lecionario-web, commite data/daily-readings-refs.json ' +
        'e copie o arquivo para biblia-na-arte/server/src/data/daily-readings-refs.json.',
    ).toBe(0);
    expect(Object.keys(versionado).length).toBe(Object.keys(calculado).length);
  });

  it('cobre o que a documentação promete (domingos até 2030, sem buracos grosseiros)', () => {
    const t = buildDailyRefsTable();
    expect(Object.keys(t).length).toBeGreaterThan(1000);
    expect(t['2026-10-18']).toBeDefined(); // um domingo
    expect(t['2026-10-18'].refs.length).toBeGreaterThan(0);
    expect(typeof t['2026-10-18'].season).toBe('string');
  });
});
