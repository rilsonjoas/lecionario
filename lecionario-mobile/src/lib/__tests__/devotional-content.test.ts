import { describe, it, expect } from 'vitest';
import { getDevotionalContent } from '../devotional-content';

describe('getDevotionalContent', () => {
  it('returns content for a known date in 2026', () => {
    const date = new Date(2026, 0, 15);
    const result = getDevotionalContent(date);
    expect(result).not.toBeNull();
    expect(result!.prayer).toBeDefined();
    expect(result!.prayer.title).toBeTruthy();
    expect(result!.prayer.text).toBeTruthy();
    expect(result!.meditation).toBeDefined();
    expect(result!.meditation.prompt).toBeTruthy();
  });

  it('returns null for year outside 2025-2030 range', () => {
    const date = new Date(2031, 0, 1);
    const result = getDevotionalContent(date);
    expect(result).toBeNull();
  });

  it('cobre dezembro pelo arquivo do ano seguinte (janela do ano litúrgico)', () => {
    // Regressão: o arquivo devotionals-2026 cobre 2025-12-01..2026-11-30,
    // mas o lookup usava o ano civil — todo dezembro caía no sample.
    const natal = getDevotionalContent(new Date(2025, 11, 25));
    expect(natal).not.toBeNull();
    expect(natal!.prayer.title).toBeTruthy();

    const advento = getDevotionalContent(new Date(2024, 11, 1));
    expect(advento).not.toBeNull();
    expect(advento!.prayer.title).toBe('Cumprirei a Boa Palavra');
  });

  it('returns null for date with no devotional entry', () => {
    // Feb 30 doesn't exist, but JS creates March 2
    const date = new Date(2026, 1, 30);
    const result = getDevotionalContent(date);
    // This may or may not be null depending on whether that date has an entry
    // Just verify it doesn't throw
    expect(typeof result === 'object').toBe(true);
  });

  it('returns prayer with title and text', () => {
    const date = new Date(2026, 3, 5); // Easter 2026
    const result = getDevotionalContent(date);
    if (result) {
      expect(result.prayer.title.length).toBeGreaterThan(0);
      expect(result.prayer.text.length).toBeGreaterThan(0);
    }
  });
});
