import { describe, it, expect, vi, beforeEach } from 'vitest';

const store: Record<string, string> = {};

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn(async (key: string) => store[key] ?? null),
    setItem: vi.fn(async (key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn(async (key: string) => {
      delete store[key];
    }),
    getAllKeys: vi.fn(async () => Object.keys(store)),
    multiRemove: vi.fn(async (keys: string[]) => {
      keys.forEach((k) => delete store[k]);
    }),
  },
}));

vi.mock('expo-notifications', () => {
  const scheduledIds: string[] = [];
  return {
    setNotificationHandler: vi.fn(),
    getPermissionsAsync: vi.fn(async () => ({ status: 'granted' })),
    requestPermissionsAsync: vi.fn(async () => ({ status: 'granted' })),
    scheduleNotificationAsync: vi.fn(async () => {
      const id = `n-${scheduledIds.length + 1}`;
      scheduledIds.push(id);
      return id;
    }),
    cancelScheduledNotificationAsync: vi.fn(async () => {}),
    cancelAllScheduledNotificationsAsync: vi.fn(async () => {}),
    getAllScheduledNotificationsAsync: vi.fn(async () => []),
    addNotificationResponseReceivedListener: vi.fn(() => ({ remove: vi.fn() })),
    SchedulableTriggerInputTypes: { DATE: 'date', DAILY: 'daily' },
  };
});

import { buildNotificationWindow } from '../notification-window';
import { migrateLegacyNotifications } from '../notifications';

beforeEach(() => {
  Object.keys(store).forEach((k) => delete store[k]);
  vi.clearAllMocks();
});

describe('migrateLegacyNotifications', () => {
  it('cancela a notificação legada salva na chave singular e remove as chaves antigas', async () => {
    const NotificationsMock = await import('expo-notifications');
    // simula o app antigo: notificação DAILY salva na chave SINGULAR
    store['@lecionario:notification-id'] = 'legacy-daily-id';

    await migrateLegacyNotifications();

    expect(NotificationsMock.cancelScheduledNotificationAsync).toHaveBeenCalledWith(
      'legacy-daily-id',
    );
    expect(NotificationsMock.cancelAllScheduledNotificationsAsync).toHaveBeenCalled();
    expect(store['@lecionario:notification-id']).toBeUndefined();
    expect(store['@lecionario:notification-ids']).toBeUndefined();
    expect(store['@lecionario:notifications-migrated-v2']).toBe('1');
  });

  it('roda apenas uma vez (flag de migração) e não reprocessa', async () => {
    const NotificationsMock = await import('expo-notifications');
    store['@lecionario:notifications-migrated-v2'] = '1';
    store['@lecionario:notification-id'] = 'legacy-daily-id';

    await migrateLegacyNotifications();

    expect(NotificationsMock.cancelScheduledNotificationAsync).not.toHaveBeenCalled();
    expect(NotificationsMock.cancelAllScheduledNotificationsAsync).not.toHaveBeenCalled();
  });
});

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
