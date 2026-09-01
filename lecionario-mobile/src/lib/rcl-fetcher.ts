import type { Reading, LiturgicalCycle } from '@/types';
import cycleAData from '@/data/rcl/cycle-A.json';
import cycleBData from '@/data/rcl/cycle-B.json';
import cycleCData from '@/data/rcl/cycle-C.json';
import dailyAData from '@/data/rcl/daily-A.json';
import dailyBData from '@/data/rcl/daily-B.json';
import dailyCData from '@/data/rcl/daily-C.json';

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

const dailyData: Record<string, LectionaryJson> = {
  A: dailyAData as LectionaryJson,
  B: dailyBData as LectionaryJson,
  C: dailyCData as LectionaryJson,
};

function dateToRef(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function buildResult(match: RclEntry) {
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

export function getRCLReadings(
  cycle: LiturgicalCycle,
  date: Date,
): { readings: Reading[]; collect?: string } | null {
  const data = lectionaryData[cycle];
  if (!data) return null;

  const dateStr = dateToRef(date);
  const allEntries = Object.values(data.seasons).flat();

  const match = allEntries.find((e: RclEntry) => e.date === dateStr);

  if (!match) {
    // Fallback: dia útil (feria) coberto pelo dado diário do RCL.
    return getRCLDailyReadings(cycle, date);
  }

  return buildResult(match);
}

/** Leituras diárias FERIAIS do RCL (dias úteis Seg-Sáb), como fallback
 *  quando a data não é um domingo/feriado coberto pelo cycle. */
export function getRCLDailyReadings(
  cycle: LiturgicalCycle,
  date: Date,
): { readings: Reading[]; collect?: string } | null {
  const data = dailyData[cycle];
  if (!data) return null;

  const dateStr = dateToRef(date);
  const allEntries = Object.values(data.seasons).flat();
  const match = allEntries.find((e: RclEntry) => e.date === dateStr);

  if (!match) return null;

  return buildResult(match);
}
