// Liturgical Calendar Types
export type LiturgicalSeason = 
  | 'advent' 
  | 'christmas' 
  | 'epiphany' 
  | 'lent' 
  | 'easter' 
  | 'pentecost' 
  | 'ordinary';

export type LiturgicalColor = 
  | 'purple' 
  | 'white' 
  | 'green' 
  | 'red' 
  | 'rose' 
  | 'gold';

export type LiturgicalCycle = 'A' | 'B' | 'C';

export interface LiturgicalDayInfo {
  date: string; // YYYY-MM-DD
  season: LiturgicalSeason;
  color: LiturgicalColor;
  dayName: string;
  cycle: LiturgicalCycle;
  weekOfSeason?: number;
  isSpecialDay?: boolean;
  specialDayName?: string;
}

export interface Reading {
  type: 'first_reading' | 'psalm' | 'second_reading' | 'gospel';
  reference: string;
  text?: string;
  citation?: string;
  sourceUrl?: string;
}

export interface DailyPrayer {
  title: string;
  text: string;
  author?: string;
  source?: string;
}

export interface MeditationResource {
  prompt: string;
  questions?: string[];
  audioUrl?: string;
  duration?: string;
}

export interface DailyDevotional {
  liturgicalInfo: LiturgicalDayInfo;
  readings: Reading[];
  prayer: DailyPrayer;
  meditation: MeditationResource;
  collect?: string; // Collect of the day
  hymns?: string[];
}

// Theme Types
export interface SeasonTheme {
  season: LiturgicalSeason;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  className: string;
}