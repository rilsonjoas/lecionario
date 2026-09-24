import { describe, it, expect } from 'vitest';
import {
  getVerseOfTheDay,
  parseDateKey,
  dateKeyInTimeZone,
  FALLBACK_VERSICLES,
  TODAY_TIME_ZONE,
} from '../versiculo-do-dia';

/**
 * Trava o contrato do versículo do dia (Fase 0, plano de interconexão):
 * determinístico por data, prioridade litúrgica Evangelho > Salmo > 1ª > 2ª,
 * pool fixo marcado `fallback: true` fora da cobertura do RCL — com o pool
 * livre de repetições (II Timóteo 3:16-17 entrou no pool em 2026-09-24,
 * quando a citação estática do rodapé da home foi removida).
 */

describe('getVerseOfTheDay — leituras do dia', () => {
  it('domingo com Evangelho usa o Evangelho (e não cai no pool)', () => {
    // 2023-12-03: Primeiro Domingo do Advento — na convenção do código
    // (getLiturgicalCycle, %3) abre o Ano B, gospel Marcos 13:24-37.
    const result = getVerseOfTheDay(new Date(2023, 11, 3));

    expect(result.fallback).toBe(false);
    expect(result.date).toBe('2023-12-03');
    expect(result.liturgicalDay.cycle).toBe('B');
    expect(result.liturgicalDay.dayName).toBe('Primeiro Domingo do Advento');
    expect(result.verse.type).toBe('gospel');
    expect(result.verse.reference).toBe('Marcos 13:24-37');
    expect(result.verse.text.length).toBeGreaterThan(50);
  });

  it('dias festivos seguem a liturgia (Natal → Lucas 2:1-14)', () => {
    const result = getVerseOfTheDay(new Date(2025, 11, 25));

    expect(result.fallback).toBe(false);
    expect(result.verse.reference).toBe('Lucas 2:1-14');
    expect(result.verse.text).toContain('Naqueles dias saiu um decreto');
  });

  it('dia férial sem Evangelho assume o Salmo (versículo responsorial)', () => {
    // 2026-06-01: feria do RCL diário (daily-A, ciclo A) — sem Evangelho.
    const result = getVerseOfTheDay(new Date(2026, 5, 1));

    expect(result.fallback).toBe(false);
    expect(result.liturgicalDay.cycle).toBe('A');
    expect(result.verse.type).toBe('psalm');
    expect(result.verse.reference).toBe('Salmo 29');
    expect(result.verse.text).toContain('Tributai ao Senhor');
  });

  it('é determinístico: a mesma data retorna o mesmo versículo', () => {
    const a = getVerseOfTheDay(new Date(2026, 5, 1));
    const b = getVerseOfTheDay(new Date(2026, 5, 1));

    expect(a).toEqual(b);
  });
});

describe('getVerseOfTheDay — guarda anti-repetição (decisão 22/09)', () => {
  it('salmo repetido em dia seguinte sobe pra 1ª leitura, marcando shifted', () => {
    // 2025-12-01 e 2025-12-02 têm SALMO 124 no RCL (feriais seguidos).
    const day1 = getVerseOfTheDay(new Date(2025, 11, 1));
    const day2 = getVerseOfTheDay(new Date(2025, 11, 2));

    expect(day1.shifted).toBe(false);
    expect(day1.verse.reference).toBe('Salmo 124');

    expect(day2.shifted).toBe(true);
    expect(day2.fallback).toBe(false);
    expect(day2.verse.type).toBe('first_reading');
    expect(day2.verse.reference).toBe('Gênesis 9:1-17');
  });

  it('dia com Evangelho não é tocado (Evangelho nunca repete consecutivo)', () => {
    // 2025-11-30 (domingo, Evangelho) → 2025-12-01 (salmo): refs diferentes.
    const sunday = getVerseOfTheDay(new Date(2025, 10, 30));

    expect(sunday.verse.type).toBe('gospel');
    expect(sunday.shifted).toBe(false);
  });

  it('contrato: nenhum dia seguido exibe a mesma referência na janela coberta do RCL', () => {
    // Varredura do ano férial do ciclo A (2025-11-27..2026-11-25) — todos os
    // dias de um ano litúrgico completo, incluindo os 271 pares de salmo
    // repetido que a liturgia registra. A guarda tem que zerar.
    const start = new Date(2025, 10, 27);
    const end = new Date(2026, 10, 25);
    let prev: string | null = null;
    let repeats = 0;
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const ref = getVerseOfTheDay(d).verse.reference.trim();
      if (prev !== null && prev === ref) repeats++;
      prev = ref;
    }
    expect(repeats).toBe(0);
  });

  it('pool continua sem repetir em dias consecutivos após a guarda', () => {
    const a = getVerseOfTheDay(new Date(2031, 2, 15));
    const b = getVerseOfTheDay(new Date(2031, 2, 16));

    expect(a.fallback).toBe(true);
    expect(b.fallback).toBe(true);
    expect(a.verse.reference).not.toBe(b.verse.reference);
    expect(a.shifted).toBe(false);
    expect(b.shifted).toBe(false);
  });
});

describe('getVerseOfTheDay — fallback fora da cobertura RCL', () => {
  it('data após o fim da janela do RCL responde com pool marcado fallback', () => {
    // 2031-03-15: depois do fim dos cycle-*.json (2030-11-24).
    const result = getVerseOfTheDay(new Date(2031, 2, 15));

    expect(result.fallback).toBe(true);
    expect(result.verse.type).toBe('fallback');
    expect(result.verse.text.length).toBeGreaterThan(0);
  });

  it('pool é determinístico e cíclico (dias seguintes → versículos diferentes)', () => {
    const a = getVerseOfTheDay(new Date(2031, 2, 15)).verse.reference;
    const b = getVerseOfTheDay(new Date(2031, 2, 16)).verse.reference;

    expect(a).not.toBe(b);
    expect(getVerseOfTheDay(new Date(2031, 2, 15)).verse).toEqual(
      getVerseOfTheDay(new Date(2031, 2, 15)).verse,
    );
  });

  it('pool não repete referências e inclui II Timóteo 3:16-17 (citação do ex-rodapé)', () => {
    const refs = FALLBACK_VERSICLES.map((v) => v.reference.trim());

    expect(new Set(refs).size).toBe(refs.length);
    expect(refs).toContain('II Timóteo 3:16-17');
  });
});

describe('dateKeyInTimeZone — "hoje" no fuso de referência', () => {
  it('converte o instante pro dia de America/Sao_Paulo (UTC-3)', () => {
    // 2026-09-23 00:30 UTC = 2026-09-22 21:30 em São Paulo.
    const lateEvening = new Date('2026-09-23T00:30:00Z');
    expect(dateKeyInTimeZone(lateEvening, TODAY_TIME_ZONE)).toBe('2026-09-22');

    // Definitivamente dia seguinte em São Paulo.
    const nextMorning = new Date('2026-09-23T05:00:00Z');
    expect(dateKeyInTimeZone(nextMorning, TODAY_TIME_ZONE)).toBe('2026-09-23');
  });

  it('retorna uma chain YYYY-MM-DD válida', () => {
    expect(dateKeyInTimeZone(new Date(), TODAY_TIME_ZONE)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('parseDateKey', () => {
  it('aceita data válida', () => {
    const parsed = parseDateKey('2026-06-01');
    expect(parsed).not.toBeNull();
    expect(parsed?.getFullYear()).toBe(2026);
    expect(parsed?.getMonth()).toBe(5);
    expect(parsed?.getDate()).toBe(1);
  });

  it('rejeita formatos inválidos e datas impossíveis', () => {
    expect(parseDateKey('2026-02-30')).toBeNull();
    expect(parseDateKey('2026/06/01')).toBeNull();
    expect(parseDateKey('20260601')).toBeNull();
    expect(parseDateKey('abc')).toBeNull();
  });
});
