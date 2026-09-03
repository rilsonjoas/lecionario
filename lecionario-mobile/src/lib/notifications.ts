import * as Notifications from 'expo-notifications';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildNotificationWindow, type NotificationDayPayload } from '@/lib/notification-window';

const SETTINGS_STORAGE_KEY = '@lecionario:settings';
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

async function readSettings(): Promise<{
  notificationsEnabled?: boolean;
  notificationTime?: string;
} | null> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
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

// Achado do Rilson (2026-09-03): mesmo com a migração pontual de versões
// anteriores já escrita e conectada no App.tsx, uma notificação "Domingo"
// fixa continuava chegando todo dia junto com a de hoje. Causa: a
// migração cancelava órfãs UMA vez só (guardada por flag); se falhasse
// silenciosamente nessa única vez (try/catch "best-effort"), nada mais
// tentava de novo depois. Fix: cancelamento passa a ser sempre TOTAL
// (`cancelAllScheduledNotificationsAsync`, não uma lista de IDs que o
// próprio app lembra de ter criado) e roda toda vez que a janela é
// (re)agendada — auto-curativo a cada ciclo, não depende de uma
// migração ter funcionado perfeitamente uma vez só. Sem risco de
// cancelar notificação de outra categoria por engano: este app só
// agenda um tipo (a leitura diária).
export async function scheduleDailyNotifications(time: string): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const payloads = buildNotificationWindow(time, new Date());

  for (const p of payloads) {
    await Notifications.scheduleNotificationAsync({
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
  }
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// Chamar UMA VEZ, ao abrir o app (cold start) — garante que o estado de
// notificações bate com a configuração salva, sem depender de nenhuma
// migração pontual ter rodado certo no passado: se tiver ficado
// qualquer coisa órfã agendada (de qualquer versão anterior do app),
// esta chamada sempre limpa tudo e reagenda do zero quando habilitado.
export async function syncNotificationsOnLaunch(): Promise<void> {
  const settings = await readSettings();
  if (settings?.notificationsEnabled) {
    await scheduleDailyNotifications(settings.notificationTime ?? '06:00');
  } else {
    await cancelAllNotifications();
  }
}

// Renova a janela rolante se ela estiver perto de acabar. Chamar ao
// voltar ao primeiro plano — mais barato que `syncNotificationsOnLaunch`
// (só reagenda quando a janela está realmente acabando), adequado pra
// rodar com frequência (toda vez que o usuário volta pro app).
export async function renewNotificationsWindow(): Promise<void> {
  const settings = await readSettings();
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
