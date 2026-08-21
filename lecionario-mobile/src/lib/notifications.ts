import * as Notifications from 'expo-notifications';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { getRCLReadings } from '@/lib/rcl-fetcher';

const STORAGE_KEY = '@lecionario:notification-id';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyNotification(time: string): Promise<void> {
  await cancelAllNotifications();

  const now = new Date();
  const [hours, minutes] = time.split(':').map(Number);

  let next = new Date();
  next.setHours(hours, minutes, 0, 0);
  if (next <= now) next = addDays(next, 1);

  const info = getLiturgicalDayInfo(next);
  const rclData = getRCLReadings(info.cycle, next);
  const refs = rclData
    ? rclData.readings.map((r) => r.reference).join(' · ')
    : 'Leituras do dia';

  const dateStr = format(next, "dd 'de' MMMM", { locale: ptBR });

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: `${info.dayName}`,
      body: `${dateStr} — ${refs}`,
      data: { date: info.date },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: hours,
      minute: minutes,
    },
  });

  await AsyncStorage.setItem(STORAGE_KEY, id);
}

export async function cancelAllNotifications(): Promise<void> {
  const id = await AsyncStorage.getItem(STORAGE_KEY);
  if (id) {
    await Notifications.cancelScheduledNotificationAsync(id);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export function addNotificationResponseListener(
  handler: (date: string) => void,
): Notifications.Subscription {
  return Notifications.addNotificationResponseReceivedListener((response) => {
    const date = response.notification.request.content.data?.date;
    if (typeof date === 'string') handler(date);
  });
}
