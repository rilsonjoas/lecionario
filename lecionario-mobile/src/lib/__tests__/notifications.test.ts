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
    cancelAllScheduledNotificationsAsync: vi.fn(async () => {}),
    getAllScheduledNotificationsAsync: vi.fn(async () => []),
    addNotificationResponseReceivedListener: vi.fn(() => ({ remove: vi.fn() })),
    SchedulableTriggerInputTypes: { DATE: 'date', DAILY: 'daily' },
  };
});

import { buildNotificationWindow } from '../notification-window';
import { scheduleDailyNotifications, syncNotificationsOnLaunch } from '../notifications';

beforeEach(() => {
  Object.keys(store).forEach((k) => delete store[k]);
  vi.clearAllMocks();
});

describe('scheduleDailyNotifications', () => {
  it('cancela TUDO que o SO tem agendado antes de reagendar (não só IDs que o app lembra)', async () => {
    // Achado 2026-09-03: uma notificação órfã de versão anterior (sem
    // nenhum ID rastreado pelo app) continuava chegando todo dia porque
    // o cancelamento antigo só olhava pra lista de IDs próprios. Agora
    // é sempre um cancelamento total do SO, que alcança qualquer órfã.
    const NotificationsMock = await import('expo-notifications');
    await scheduleDailyNotifications('06:00');
    expect(NotificationsMock.cancelAllScheduledNotificationsAsync).toHaveBeenCalled();
  });
});

describe('syncNotificationsOnLaunch', () => {
  it('reagenda a janela quando notificações estão habilitadas', async () => {
    const NotificationsMock = await import('expo-notifications');
    store['@lecionario:settings'] = JSON.stringify({
      notificationsEnabled: true,
      notificationTime: '07:00',
    });

    await syncNotificationsOnLaunch();

    expect(NotificationsMock.cancelAllScheduledNotificationsAsync).toHaveBeenCalled();
    expect(NotificationsMock.scheduleNotificationAsync).toHaveBeenCalled();
  });

  it('só cancela (não reagenda) quando notificações estão desabilitadas', async () => {
    const NotificationsMock = await import('expo-notifications');
    store['@lecionario:settings'] = JSON.stringify({ notificationsEnabled: false });

    await syncNotificationsOnLaunch();

    expect(NotificationsMock.cancelAllScheduledNotificationsAsync).toHaveBeenCalled();
    expect(NotificationsMock.scheduleNotificationAsync).not.toHaveBeenCalled();
  });

  it('trata settings ausentes/corrompidos como desabilitado, sem quebrar', async () => {
    store['@lecionario:settings'] = 'não é json válido{{{';

    await expect(syncNotificationsOnLaunch()).resolves.not.toThrow();
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
