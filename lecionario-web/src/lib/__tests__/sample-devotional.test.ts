import { describe, it, expect } from 'vitest';
import { getSampleDevotional } from '../../data/sample-devotional';

/**
 * Trava o fallback chain do `getSampleDevotional` (ROADMAP 3.2): cada
 * elo da cadeia independente — leituras/coleta (RCL) e
 * oração/meditação (devocional do dia) — deve cair pro sample sozinho,
 * sem arrastar os outros. Em qualquer data o `liturgicalInfo` vem do
 * calendário (cálculo puro), nunca fallback.
 */

const SAMPLE_REFS = ['Isaías 40:1-11', 'Salmo 85:1-2, 8-13', '2 Pedro 3:8-15a', 'Marcos 1:1-8'];

const SAMPLE_PRAYER_START = 'Deus Todo-Poderoso, concede que possamos lançar fora';
const SAMPLE_MEDITATION_START = 'João Batista nos chama a "preparar o caminho';
const FALLBACK_COLLECT_START = 'Deus misericordioso, que enviaste os teus mensageiros';

describe('getSampleDevotional — fallback chain', () => {
  it('dá prioridade ao RCL e ao devocional quando ambos existem', () => {
    const d = getSampleDevotional(new Date(2025, 5, 1));

    expect(d.liturgicalInfo.date).toBe('2025-06-01');
    expect(d.readings.map((r) => r.reference)).not.toEqual(SAMPLE_REFS);
    expect(d.readings[0].reference).toBe('Atos 16:16-34');
    expect(d.readings[1].reference).toBe('Salmo 97');
    expect(d.collect).not.toBeUndefined();
    expect(d.collect).not.toContain(FALLBACK_COLLECT_START);
    expect(d.prayer.text).not.toContain(SAMPLE_PRAYER_START);
    expect(d.meditation.prompt).not.toContain(SAMPLE_MEDITATION_START);
  });

  it('cai as leituras e a coleta pro sample quando o RCL não cobre o dia', () => {
    // 2025-02-10: dia comum (sem entrada RCL), devocional do dia existe.
    const d = getSampleDevotional(new Date(2025, 1, 10));

    expect(d.liturgicalInfo.date).toBe('2025-02-10');
    expect(d.readings.map((r) => r.reference)).toEqual(SAMPLE_REFS);
    expect(d.collect).toContain(FALLBACK_COLLECT_START);
    // Oração e meditação NON—caindo, continuam do devocional.
    expect(d.prayer.text).not.toContain(SAMPLE_PRAYER_START);
    expect(d.prayer.text).toContain('depois que o serafim tocou');
    expect(d.meditation.prompt).not.toContain(SAMPLE_MEDITATION_START);
  });

  it('cai só oração e meditação pro sample quando o devocional do ano não existe', () => {
    // 2024-11-24: domingo (RCL cobre), mas devocional-2024 não existe.
    const d = getSampleDevotional(new Date(2024, 10, 24));

    expect(d.liturgicalInfo.date).toBe('2024-11-24');
    expect(d.readings[0].reference).toBe('Ezequiel 34:11-16, 20-24');
    expect(d.collect).not.toBeUndefined();
    expect(d.collect).toContain('cuja providência nunca falha');
    expect(d.prayer.text).toContain(SAMPLE_PRAYER_START);
    expect(d.meditation.prompt).toContain(SAMPLE_MEDITATION_START);
  });

  it('cai tudo pelos samples fora da cobertura (fim do RCL e do devocional)', () => {
    // 2031-03-15: após o fim da janela (RCL + devocionais), só liturgicalInfo.
    const d = getSampleDevotional(new Date(2031, 2, 15));

    expect(d.liturgicalInfo.date).toBe('2031-03-15');
    expect(d.liturgicalInfo.season).toBe('lent');
    expect(d.liturgicalInfo.cycle).toBe('C');
    expect(d.readings.map((r) => r.reference)).toEqual(SAMPLE_REFS);
    expect(d.collect).toContain(FALLBACK_COLLECT_START);
    expect(d.prayer.text).toContain(SAMPLE_PRAYER_START);
    expect(d.meditation.prompt).toContain(SAMPLE_MEDITATION_START);
  });

  it('cobre dezembro pelo arquivo do ano seguinte (janela do ano litúrgico)', () => {
    // 2024-12-01: está no devotionals-2025 (2024-12-01..2025-11-30),
    // não no devotionals-2024. Bug de janela já quebrado em produção
    // (todo dezembro caía no sample); a regra é: dezembro usa ano+1.
    const d = getSampleDevotional(new Date(2024, 11, 1));

    expect(d.liturgicalInfo.date).toBe('2024-12-01');
    expect(d.liturgicalInfo.cycle).toBe('C');
    expect(d.readings[0].reference).not.toEqual(SAMPLE_REFS[0]);
    expect(d.prayer.text).not.toContain(SAMPLE_PRAYER_START);
    expect(d.meditation.prompt).not.toContain(SAMPLE_MEDITATION_START);
    expect(d.prayer.title).toBe('Cumprirei a Boa Palavra');
  });

  it('cobre dezembro do Natal pelo arquivo seguinte (2025-12-25 → devotionals-2026)', () => {
    const d = getSampleDevotional(new Date(2025, 11, 25));

    expect(d.liturgicalInfo.date).toBe('2025-12-25');
    expect(d.liturgicalInfo.cycle).toBe('A');
    expect(d.prayer.text).not.toContain(SAMPLE_PRAYER_START);
    expect(d.meditation.prompt).not.toContain(SAMPLE_MEDITATION_START);
  });
});
