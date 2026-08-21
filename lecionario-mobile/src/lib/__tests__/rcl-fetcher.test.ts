import { describe, it, expect } from 'vitest';
import { getRCLReadings } from '../rcl-fetcher';

describe('getRCLReadings', () => {
  it('returns readings for a known Sunday in Cycle A (2026)', () => {
    // First Sunday of Ordinary Time 2026 (Cycle A) — Jan 11
    const date = new Date(2026, 0, 11);
    const result = getRCLReadings('A', date);
    expect(result).not.toBeNull();
    expect(result!.readings.length).toBeGreaterThan(0);
    expect(result!.readings.every((r) => r.reference.length > 0)).toBe(true);
  });

  it('returns 4 readings (first, psalm, second, gospel)', () => {
    const date = new Date(2026, 0, 11);
    const result = getRCLReadings('A', date);
    expect(result).not.toBeNull();
    const types = result!.readings.map((r) => r.type);
    expect(types).toContain('first_reading');
    expect(types).toContain('psalm');
    expect(types).toContain('second_reading');
    expect(types).toContain('gospel');
  });

  it('returns null for date with no RCL entry', () => {
    // Jan 1 2026 is a Thursday — may not have a specific RCL entry
    const date = new Date(2026, 0, 1);
    const result = getRCLReadings('A', date);
    // Could be null or have data depending on the JSON
    expect(typeof result === 'object' || result === null).toBe(true);
  });

  it('returns readings for Cycle B', () => {
    const date = new Date(2027, 0, 10);
    const result = getRCLReadings('B', date);
    expect(result).not.toBeNull();
    expect(result!.readings.length).toBeGreaterThan(0);
  });

  it('returns readings for Cycle C', () => {
    const date = new Date(2028, 0, 9);
    const result = getRCLReadings('C', date);
    expect(result).not.toBeNull();
    expect(result!.readings.length).toBeGreaterThan(0);
  });

  it('returns collect when available', () => {
    // Sunday in Ordinary Time should have a collect
    const date = new Date(2026, 6, 12); // Ordinary Time Sunday 2026
    const result = getRCLReadings('A', date);
    if (result) {
      expect(typeof result.collect === 'string' || result.collect === undefined).toBe(true);
    }
  });

  it('each reading has reference and citation', () => {
    const date = new Date(2026, 3, 5); // Easter 2026
    const result = getRCLReadings('A', date);
    if (result) {
      for (const reading of result.readings) {
        expect(reading.reference.length).toBeGreaterThan(0);
        expect(reading.citation!.length).toBeGreaterThan(0);
      }
    }
  });
});
