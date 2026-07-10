import type { DailyPrayer, MeditationResource } from '@/types';
import devotionals2025 from '@/data/rcl/devotionals-2025.json';
import devotionals2026 from '@/data/rcl/devotionals-2026.json';
import devotionals2027 from '@/data/rcl/devotionals-2027.json';
import devotionals2028 from '@/data/rcl/devotionals-2028.json';
import devotionals2029 from '@/data/rcl/devotionals-2029.json';
import devotionals2030 from '@/data/rcl/devotionals-2030.json';

interface DevotionalEntry {
  prayer: DailyPrayer;
  meditation: MeditationResource;
}

type DevotionalsData = {
  year: number;
  entries: Record<string, DevotionalEntry>;
};

const devotionalsFiles: Record<number, DevotionalsData> = {
  2025: devotionals2025 as DevotionalsData,
  2026: devotionals2026 as DevotionalsData,
  2027: devotionals2027 as DevotionalsData,
  2028: devotionals2028 as DevotionalsData,
  2029: devotionals2029 as DevotionalsData,
  2030: devotionals2030 as DevotionalsData,
};

export function getDevotionalContent(date: Date): DevotionalEntry | null {
  const year = date.getFullYear();
  const file = devotionalsFiles[year];
  if (!file) return null;

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const dateStr = `${y}-${m}-${d}`;

  const entry = file.entries[dateStr];
  if (!entry) return null;

  return {
    prayer: entry.prayer,
    meditation: entry.meditation,
  };
}
