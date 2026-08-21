import devotionals2025 from '@/data/rcl/devotionals-2025.json';
import devotionals2026 from '@/data/rcl/devotionals-2026.json';
import devotionals2027 from '@/data/rcl/devotionals-2027.json';
import devotionals2028 from '@/data/rcl/devotionals-2028.json';
import devotionals2029 from '@/data/rcl/devotionals-2029.json';
import devotionals2030 from '@/data/rcl/devotionals-2030.json';
import cycleA from '@/data/rcl/cycle-A.json';
import cycleB from '@/data/rcl/cycle-B.json';
import cycleC from '@/data/rcl/cycle-C.json';

interface DevEntry {
  prayer?: { title?: string; text?: string };
  meditation?: { prompt?: string; questions?: string[] };
}

interface DevotionalsData {
  year: number;
  entries: Record<string, DevEntry>;
}

interface CycleReading {
  type: string;
  ref: string;
}

interface CycleDay {
  date: string;
  readings: CycleReading[];
}

type CycleSeasons = Record<string, CycleDay[]>;

interface CycleData {
  cycle: string;
  seasons: CycleSeasons;
}

const allDevotionals: DevotionalsData[] = [
  devotionals2025 as DevotionalsData, devotionals2026 as DevotionalsData,
  devotionals2027 as DevotionalsData, devotionals2028 as DevotionalsData,
  devotionals2029 as DevotionalsData, devotionals2030 as DevotionalsData,
];

const allCycles: CycleData[] = [
  cycleA as CycleData, cycleB as CycleData, cycleC as CycleData,
];

function getReadingsForDate(dateStr: string): string[] {
  for (const cycle of allCycles) {
    for (const seasonKey of Object.keys(cycle.seasons)) {
      const match = cycle.seasons[seasonKey].find((e) => e.date === dateStr);
      if (match?.readings) {
        return match.readings.map((r) => r.ref);
      }
    }
  }
  return [];
}

export interface SearchResult {
  date: string;
  dayName: string;
  matchedOn: string;
}

export function searchDevotionals(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  const results: SearchResult[] = [];
  const seen = new Set<string>();

  for (const data of allDevotionals) {
    for (const [dateStr, entry] of Object.entries(data.entries)) {
      if (seen.has(dateStr)) continue;

      const prayer = entry.prayer;
      const meditation = entry.meditation;

      if (dateStr.includes(q)) {
        results.push({ date: dateStr, dayName: prayer?.title || dateStr, matchedOn: 'data' });
        seen.add(dateStr);
        continue;
      }

      const prayerText = `${prayer?.title || ''} ${prayer?.text || ''}`.toLowerCase();
      if (prayerText.includes(q)) {
        results.push({ date: dateStr, dayName: prayer?.title || dateStr, matchedOn: 'oração' });
        seen.add(dateStr);
        continue;
      }

      const medText = `${meditation?.prompt || ''} ${(meditation?.questions || []).join(' ')}`.toLowerCase();
      if (medText.includes(q)) {
        results.push({ date: dateStr, dayName: prayer?.title || dateStr, matchedOn: 'meditação' });
        seen.add(dateStr);
        continue;
      }

      const readings = getReadingsForDate(dateStr);
      const refsText = readings.join(' ').toLowerCase();
      if (refsText.includes(q)) {
        results.push({ date: dateStr, dayName: prayer?.title || dateStr, matchedOn: 'leitura' });
        seen.add(dateStr);
      }
    }
  }

  return results.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 50);
}
