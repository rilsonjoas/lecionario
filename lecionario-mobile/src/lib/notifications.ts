import * as Notifications from 'expo-notifications';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildNotificationWindow, type NotificationDayPayload } from '@/lib/notification-window';

const SETTINGS_STORAGE_KEY = '@lecionario:settings';
const STORAGE_KEY = '@lecionario:notification-ids';
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
