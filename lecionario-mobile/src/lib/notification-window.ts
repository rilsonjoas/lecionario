import { format, addDays, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { getRCLReadings } from '@/lib/rcl-fetcher';

export const WINDOW_DAYS = 7;

export interface NotificationDayPayload {
  fireAt: Date;
  title: string;
  body: string;
  date: string;
}

// Lógica pura da janela rolante — separada de ex/notifications de
// propósito, pra ser unit-testável em node (mesmo padrão das outras
// utils do app).
//
// A causa raiz do bug de 2026-08-24: o trigger `DAILY` guarda um único
// payload estático (o do primeiro dia) e o SO repete esse texto todo
// dia. Com um trigger `DATE` por dia, cada notificação carrega o título
// e as leituras reais do próprio dia.
export function buildNotificationWindow(
  time: string,
  now: Date = new Date(),
): NotificationDayPayload[] {
  const [hours, minutes] = time.split(':').map(Number);
  const start = startOfDay(now);
  const payloads: NotificationDayPayload[] = [];

  for (let i = 0; i < WINDOW_DAYS; i++) {
    const fireAt = addDays(start, i);
    fireAt.setHours(hours, minutes, 0, 0);
    if (fireAt <= now) continue;

    const info = getLiturgicalDayInfo(fireAt);
    const rclData = getRCLReadings(info.cycle, fireAt);
    const refs = rclData ? rclData.readings.map((r) => r.reference).join(' · ') : 'Leituras do dia';

    const dateStr = format(fireAt, "dd 'de' MMMM", { locale: ptBR });

    payloads.push({
      fireAt,
      title: info.dayName,
      body: `${dateStr} — ${refs}`,
      date: info.date,
    });
  }

  return payloads;
}
