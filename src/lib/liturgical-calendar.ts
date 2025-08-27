import { format, addDays, differenceInDays, getYear, startOfYear } from 'date-fns';
import type { LiturgicalSeason, LiturgicalDayInfo, LiturgicalCycle, LiturgicalColor } from '@/types';

/**
 * Calculate Easter Sunday for a given year using the Western (Gregorian) calculation
 */
export function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  return new Date(year, month - 1, day);
}

/**
 * Calculate the first Sunday of Advent for a given year
 */
export function calculateAdventStart(year: number): Date {
  const christmas = new Date(year, 11, 25); // December 25
  const christmasDay = christmas.getDay();
  const daysToSunday = christmasDay === 0 ? 0 : 7 - christmasDay;
  const fourthAdvent = addDays(christmas, daysToSunday);
  return addDays(fourthAdvent, -21); // 3 weeks before fourth Advent
}

/**
 * Determine liturgical cycle (A, B, C) based on year
 */
export function getLiturgicalCycle(year: number): LiturgicalCycle {
  const remainder = year % 3;
  switch (remainder) {
    case 1: return 'A';
    case 2: return 'B';
    case 0: return 'C';
    default: return 'A';
  }
}

/**
 * Get liturgical season for a given date
 */
export function getLiturgicalSeason(date: Date): LiturgicalSeason {
  const year = getYear(date);
  const currentYearAdvent = calculateAdventStart(year);
  const nextYearAdvent = calculateAdventStart(year + 1);
  const easter = calculateEaster(year);
  
  // Advent (starts ~4 weeks before Christmas)
  if (date >= currentYearAdvent || date < new Date(year, 0, 6)) {
    // If we're past this year's Advent or before Epiphany, we're in Advent season
    if (date >= currentYearAdvent) {
      return date <= new Date(year, 11, 31) ? 'advent' : 'christmas';
    }
  }
  
  // Christmas Season (December 25 - January 5)
  if (date >= new Date(year, 11, 25) && date <= new Date(year + 1, 0, 5)) {
    return 'christmas';
  }
  
  // Epiphany Season (January 6 - Tuesday before Ash Wednesday)
  const ashWednesday = addDays(easter, -46);
  if (date >= new Date(year, 0, 6) && date < addDays(ashWednesday, -1)) {
    return 'epiphany';
  }
  
  // Lent (Ash Wednesday - Saturday before Easter)
  if (date >= ashWednesday && date < easter) {
    return 'lent';
  }
  
  // Easter Season (Easter - Pentecost, 50 days)
  const pentecost = addDays(easter, 49);
  if (date >= easter && date <= pentecost) {
    return 'easter';
  }
  
  // Day of Pentecost
  if (format(date, 'yyyy-MM-dd') === format(pentecost, 'yyyy-MM-dd')) {
    return 'pentecost';
  }
  
  // Ordinary Time (everything else)
  return 'ordinary';
}

/**
 * Get liturgical color for a season
 */
export function getLiturgicalColor(season: LiturgicalSeason, date?: Date): LiturgicalColor {
  switch (season) {
    case 'advent':
      // Third Sunday of Advent (Gaudete Sunday) uses rose
      if (date) {
        const year = getYear(date);
        const adventStart = calculateAdventStart(year);
        const thirdSunday = addDays(adventStart, 14);
        if (format(date, 'yyyy-MM-dd') === format(thirdSunday, 'yyyy-MM-dd')) {
          return 'rose';
        }
      }
      return 'purple';
    
    case 'christmas':
    case 'easter':
      return 'white';
    
    case 'epiphany':
      return 'white';
    
    case 'lent':
      // Fourth Sunday of Lent (Laetare Sunday) uses rose
      if (date) {
        const year = getYear(date);
        const easter = calculateEaster(year);
        const fourthSundayLent = addDays(easter, -21);
        if (format(date, 'yyyy-MM-dd') === format(fourthSundayLent, 'yyyy-MM-dd')) {
          return 'rose';
        }
      }
      return 'purple';
    
    case 'pentecost':
      return 'red';
    
    case 'ordinary':
    default:
      return 'green';
  }
}

/**
 * Get formatted liturgical day name
 */
export function getLiturgicalDayName(date: Date, season: LiturgicalSeason): string {
  const dayOfWeek = date.getDay();
  const isSunday = dayOfWeek === 0;
  
  switch (season) {
    case 'advent': {
      const year = getYear(date);
      const adventStart = calculateAdventStart(year);
      const weekOfAdvent = Math.floor(differenceInDays(date, adventStart) / 7) + 1;
      
      if (isSunday) {
        const ordinals = ['Primeiro', 'Segundo', 'Terceiro', 'Quarto'];
        return `${ordinals[weekOfAdvent - 1]} Domingo do Advento`;
      }
      return `${format(date, 'EEEE')} da ${weekOfAdvent}ª Semana do Advento`;
    }
    
    case 'christmas': {
      if (format(date, 'MM-dd') === '12-25') return 'Natal do Senhor';
      if (format(date, 'MM-dd') === '01-01') return 'Circuncisão de Jesus / Ano Novo';
      if (format(date, 'MM-dd') === '01-06') return 'Epifania';
      return `${format(date, 'EEEE')} do Tempo do Natal`;
    }
    
    case 'lent': {
      const year = getYear(date);
      const easter = calculateEaster(year);
      const ashWednesday = addDays(easter, -46);
      
      if (format(date, 'yyyy-MM-dd') === format(ashWednesday, 'yyyy-MM-dd')) {
        return 'Quarta-feira de Cinzas';
      }
      
      if (isSunday) {
        const weekOfLent = Math.floor(differenceInDays(date, ashWednesday) / 7);
        const ordinals = ['Primeiro', 'Segundo', 'Terceiro', 'Quarto', 'Quinto', 'Domingo de Ramos'];
        return `${ordinals[weekOfLent]} Domingo da Quaresma`;
      }
      
      return `${format(date, 'EEEE')} da Quaresma`;
    }
    
    case 'easter': {
      const year = getYear(date);
      const easter = calculateEaster(year);
      
      if (format(date, 'yyyy-MM-dd') === format(easter, 'yyyy-MM-dd')) {
        return 'Domingo da Ressurreição';
      }
      
      const weekOfEaster = Math.floor(differenceInDays(date, easter) / 7) + 1;
      if (isSunday) {
        const ordinals = ['', 'Segundo', 'Terceiro', 'Quarto', 'Quinto', 'Sexto', 'Sétimo'];
        return `${ordinals[weekOfEaster]} Domingo da Páscoa`;
      }
      
      return `${format(date, 'EEEE')} da ${weekOfEaster}ª Semana da Páscoa`;
    }
    
    case 'pentecost': {
      return 'Pentecostes';
    }
    
    case 'ordinary':
    default: {
      if (isSunday) {
        // Calculate which Sunday of Ordinary Time
        const year = getYear(date);
        const epiphanyEnd = addDays(calculateEaster(year), -47);
        let sundayNumber = 1;
        
        if (date > epiphanyEnd) {
          // After Lent/Easter season
          const pentecost = addDays(calculateEaster(year), 49);
          const sundaysAfterPentecost = Math.floor(differenceInDays(date, pentecost) / 7);
          sundayNumber = sundaysAfterPentecost + 1;
        } else {
          // Between Epiphany and Lent
          const epiphanyStart = new Date(year, 0, 6);
          sundayNumber = Math.floor(differenceInDays(date, epiphanyStart) / 7) + 1;
        }
        
        return `${sundayNumber}º Domingo do Tempo Comum`;
      }
      
      return `${format(date, 'EEEE')} do Tempo Comum`;
    }
  }
}

/**
 * Get complete liturgical day information
 */
export function getLiturgicalDayInfo(date: Date): LiturgicalDayInfo {
  const season = getLiturgicalSeason(date);
  const color = getLiturgicalColor(season, date);
  const dayName = getLiturgicalDayName(date, season);
  const year = getYear(date);
  const cycle = getLiturgicalCycle(year);
  
  return {
    date: format(date, 'yyyy-MM-dd'),
    season,
    color,
    dayName,
    cycle
  };
}