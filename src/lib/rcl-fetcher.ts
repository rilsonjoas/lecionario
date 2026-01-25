import type { Reading, LiturgicalCycle, LiturgicalSeason } from '@/types';
import yearCData from '@/data/rcl/year-c.json';

// In a real app, we might fetch from an API or multiple JSON files.
// For now, we use the local JSON for Year C.
const lectionaryData: Record<LiturgicalCycle, any> = {
  'A': { seasons: {} },
  'B': { seasons: {} },
  'C': yearCData
};

export function getRCLReadings(cycle: LiturgicalCycle, season: LiturgicalSeason, date: Date): { readings: Reading[], collect?: string } | null {
  const seasonData = lectionaryData[cycle]?.seasons[season];
  if (!seasonData) return null;

  // For Sundays, we match the week. For weekdays, we might need more complex mapping.
  // For now, we'll implement matches for Sundays as a start.
  const isSunday = date.getDay() === 0;
  
  if (isSunday) {
    // Basic week calculation (needs to match liturgical-calendar logic)
    // For simplicity in this demo, we'll try to find the match by name or week
    // In a prod app, we'd have a strictly indexed mapping.
    const dayOfWeek = date.getDay();
    // Simplified: find by index for the demo if it's the right season
    // (Actual logic would be much more robust)
    const match = seasonData.find((d: any) => d.day === 'Sunday'); // Placeholder
    
    if (match) {
      return {
        readings: match.readings,
        collect: match.collect
      };
    }
  }

  return null;
}
