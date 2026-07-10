import type { Reading, LiturgicalCycle } from '@/types';
import cycleAData from '@/data/rcl/cycle-A.json';
import cycleBData from '@/data/rcl/cycle-B.json';
import cycleCData from '@/data/rcl/cycle-C.json';

interface JsonReading {
  type: string;
  ref: string;
  text?: string;
}

interface RclEntry {
  date: string;
  season: string;
  weekOfSeason: number;
  dayName: string;
  holyDay: boolean;
  readings: JsonReading[];
  collect?: string;
}

interface LectionaryJson {
  cycle: string;
  seasons: Record<string, RclEntry[]>;
}

const lectionaryData: Record<string, LectionaryJson> = {
  A: cycleAData as LectionaryJson,
  B: cycleBData as LectionaryJson,
  C: cycleCData as LectionaryJson,
};

function dateToRef(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function getRCLReadings(
  cycle: LiturgicalCycle,
  date: Date,
): { readings: Reading[]; collect?: string } | null {
  const data = lectionaryData[cycle];
  if (!data) return null;

  const dateStr = dateToRef(date);
  const allEntries = Object.values(data.seasons).flat();

  const match = allEntries.find((e: RclEntry) => e.date === dateStr);

  if (!match) return null;

  return {
    readings: match.readings.map((r) => ({
      type: r.type as Reading['type'],
      reference: r.ref,
      text: r.text,
      citation: r.ref,
    })),
    collect: match.collect,
  };
}
