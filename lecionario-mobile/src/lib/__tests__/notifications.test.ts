import { describe, it, expect } from 'vitest';
import { buildNotificationWindow } from '../notification-window';

// Regression do bug de 2026-08-24: trigger `DAILY` re-exibia o payload do
// primeiro dia pra sempre. buildNotificationWindow monta um payload
// próprio por dia (DATE trigger), então dois dias nunca podem ter o
// mesmo título+corpo, e a janela avança com `now`.
describe('buildNotificationWindow', () => {
  it('agenda a janela de 7 dias a partir de hoje', () => {
    const now = new Date(2026, 7, 24, 5, 0, 0); // 05:00 — 06:00 ainda lá frente
    const window = buildNotificationWindow('06:00', now);

    expect(window).toHaveLength(7);
    expect(window.map((p) => p.date)).toEqual([
      '2026-08-24',
      '2026-08-25',
      '2026-08-26',
      '2026-08-27',
      '2026-08-28',
      '2026-08-29',
      '2026-08-30',
    ]);
  });

  it('pula hoje quando o horário do dia já passou', () => {
    const now = new Date(2026, 7, 24, 12, 0, 0); // meio-dia — 06:00 já foi
    const window = buildNotificationWindow('06:00', now);

    expect(window).toHaveLength(6);
    expect(window[0].date).toBe('2026-08-25');
    expect(window.at(-1)?.date).toBe('2026-08-30');
  });

  it('cada dia carrega payload dinâmico próprio (nunca o mesmo do dia 1)', () => {
    const now = new Date(2026, 7, 24, 5, 0, 0);
    const window = buildNotificationWindow('06:00', now);

    const titles = window.map((p) => p.title);
    const bodies = window.map((p) => p.body);

    expect(new Set(titles).size).toBe(7);
    expect(new Set(bodies).size).toBe(7);
  });

  it('corpo referencia a data em português e as leituras do dia', () => {
    const now = new Date(2026, 7, 24, 5, 0, 0);
    const window = buildNotificationWindow('06:00', now);

    for (const p of window) {
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.body).toMatch(/^\d{1,2} de \w+ — /);
    }
  });

  it('horário do trigger bate com o pedido', () => {
    const now = new Date(2026, 7, 24, 5, 0, 0);
    const window = buildNotificationWindow('21:30', now);

    for (const p of window) {
      expect(p.fireAt.getHours()).toBe(21);
      expect(p.fireAt.getMinutes()).toBe(30);
    }
  });

  it('fireAt fica sempre no futuro em relação a now', () => {
    const now = new Date(2026, 7, 24, 5, 0, 0);
    const window = buildNotificationWindow('06:00', now);

    for (const p of window) {
      expect(p.fireAt.getTime()).toBeGreaterThan(now.getTime());
    }
  });
});
