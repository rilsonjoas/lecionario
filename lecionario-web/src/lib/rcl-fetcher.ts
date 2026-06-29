import type { Reading, LiturgicalCycle, LiturgicalSeason } from '@/types';
import yearCData from '@/data/rcl/year-c.json';

interface JsonReading {
  type: string;
  ref: string;
  text: string;
}

interface SeasonEntry {
  week: number;
  day: string;
  name: string;
  readings: JsonReading[];
  collect?: string;
}

interface LectionaryJson {
  cycle: string;
  seasons: Record<string, SeasonEntry[]>;
}

const lectionaryData: Record<LiturgicalCycle, LectionaryJson> = {
  A: { cycle: 'A', seasons: {} },
  B: { cycle: 'B', seasons: {} },
  C: yearCData as LectionaryJson,
};

export function getRCLReadings(
  cycle: LiturgicalCycle,
  season: LiturgicalSeason,
  date: Date,
): { readings: Reading[]; collect?: string } | null {
  const seasonData = lectionaryData[cycle]?.seasons[season];
  if (!seasonData) return null;

  const isSunday = date.getDay() === 0;

  if (isSunday) {
    const match = seasonData.find((d: SeasonEntry) => d.day === 'Sunday');

    if (match) {
      return {
        readings: match.readings.map((r) => ({
          type: r.type as Reading['type'],
          reference: r.ref,
          citation: r.ref,
          text: r.text,
        })),
        collect: match.collect,
      };
    }
  }

  return null;
}
