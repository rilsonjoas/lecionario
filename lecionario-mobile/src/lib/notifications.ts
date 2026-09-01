import * as Notifications from 'expo-notifications';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildNotificationWindow, type NotificationDayPayload } from '@/lib/notification-window';

const SETTINGS_STORAGE_KEY = '@lecionario:settings';
const STORAGE_KEY = '@lecionario:notification-ids';
const LEGACY_STORAGE_KEY = '@lecionario:notification-id';
const MIGRATION_KEY = '@lecionario:notifications-migrated-v2';
const RENEW_AT_REMAINING = 3;

export type { NotificationDayPayload };

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function readStoredIds(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((x): x is string => typeof x === 'string');
  } catch {
    // valor legado: id salvo como string pura (build pré-2026-08-24)
  }
  return [raw];
}

async function scheduledDaysRemaining(): Promise<number> {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const today = format(new Date(), 'yyyy-MM-dd');
    return scheduled.filter((s) => {
      const date = s.content.data?.date;
      return typeof date === 'string' && date >= today;
    }).length;
  } catch {
    return 0;
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyNotifications(time: string): Promise<void> {
  await cancelAllNotifications();

  const payloads = buildNotificationWindow(time, new Date());

  const ids: string[] = [];
  for (const p of payloads) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: p.title,
        body: p.body,
        data: { date: p.date },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: p.fireAt,
      },
    });
    ids.push(id);
  }

  if (ids.length > 0) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
}

export async function cancelAllNotifications(): Promise<void> {
  const ids = await readStoredIds();
  for (const id of ids) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
  await AsyncStorage.removeItem(STORAGE_KEY);
}

// Migração única: limpa notificações órfãs deixadas por versões antigas.
// Antes da refatoração de 2026-08-24 o app agendava UM trigger `DAILY` e
// salvar o ID na chave SINGULAR `@lecionario:notification-id`. A refatoração
// passou a usar triggers `DATE` e a chave PLURAL `@lecionario:notification-ids`,
// mas nunca cancelou a `DAILY` antiga (chave singular nunca era lida). Resultado:
// o SO repetia o payload estático da época (ex.: "Domingo") junto com a
// notificação nova (ex.: "Terça-feira") — 2 notificações na mesma hora.
// Como hardening, cancela também qualquer outra órfã remanescente.
export async function migrateLegacyNotifications(): Promise<void> {
  try {
    if (await AsyncStorage.getItem(MIGRATION_KEY)) return;

    // 1) Cancela a notificação `DAILY` legada pelo ID salvo na chave singular.
    const legacyId = await AsyncStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyId) {
      try {
        await Notifications.cancelScheduledNotificationAsync(legacyId);
      } catch {
        // id inexistente/expiração: ignora
      }
    }

    // 2) Hardening: cancela qualquer órfã (DAILY legada ou de race-condition).
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch {
      // fallback silencioso
    }

    // 3) Limpa chaves legadas e marca migração como feita.
    await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
    await AsyncStorage.removeItem(STORAGE_KEY);
    await AsyncStorage.setItem(MIGRATION_KEY, '1');
  } catch {
    // migração é best-effort; nunca deve bloquear o app
  }
}

// Renova a janela rolante se ela estiver perto de acabar. Chamar ao
// abrir o app e ao voltar ao primeiro plano — sem isso a 8ª+ notificação
// não teria quem re-agendasse (limitação do OTA-only: não dá pra
// garantir renovação em background sem módulo nativo novo).
export async function renewNotificationsWindow(): Promise<void> {
  let settings: { notificationsEnabled?: boolean; notificationTime?: string } | null = null;
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) settings = JSON.parse(raw);
  } catch {
    // settings corrompidos: trata como desabilitado, nada a renovar
  }
  if (!settings?.notificationsEnabled) return;

  const remaining = await scheduledDaysRemaining();
  if (remaining >= RENEW_AT_REMAINING) return;

  await scheduleDailyNotifications(settings.notificationTime ?? '06:00');
}

export function addNotificationResponseListener(
  handler: (date: string) => void,
): Notifications.Subscription {
  return Notifications.addNotificationResponseReceivedListener((response) => {
    const date = response.notification.request.content.data?.date;
    if (typeof date === 'string') handler(date);
  });
}
