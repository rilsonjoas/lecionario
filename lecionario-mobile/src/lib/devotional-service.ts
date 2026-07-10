import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { getRCLReadings } from '@/lib/rcl-fetcher';
import { getDevotionalContent } from '@/lib/devotional-content';
import {
  sampleReadings,
  samplePrayer,
  sampleMeditation,
  fallbackCollect,
} from '@/data/sample-devotional';
import type { DailyDevotional, Reading } from '@/types';

function buildDevotional(
  info: ReturnType<typeof getLiturgicalDayInfo>,
  readings: Reading[],
  collect?: string,
  date?: Date,
): DailyDevotional {
  const content = date ? getDevotionalContent(date) : null;
  return {
    liturgicalInfo: info,
    readings,
    prayer: content?.prayer || samplePrayer,
    meditation: content?.meditation || sampleMeditation,
    collect: collect || fallbackCollect,
  };
}

export function fetchDevotionalFromNetwork(date: Date): DailyDevotional | null {
  const info = getLiturgicalDayInfo(date);

  const rclData = getRCLReadings(info.cycle, date);
  if (rclData) {
    return buildDevotional(info, rclData.readings, rclData.collect, date);
  }

  return buildDevotional(info, sampleReadings, undefined, date);
}
