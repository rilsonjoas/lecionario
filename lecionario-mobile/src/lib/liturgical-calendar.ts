import { format, addDays, differenceInDays, getYear } from 'date-fns';
import type {
  LiturgicalSeason,
  LiturgicalDayInfo,
  LiturgicalCycle,
  LiturgicalColor,
} from '@/types';

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

export function calculateAdventStart(year: number): Date {
  const christmas = new Date(year, 11, 25);
  const dayOfWeek = christmas.getDay();
  const daysBeforeChristmas = dayOfWeek === 0 ? 7 : dayOfWeek;
  const fourthSundayOfAdvent = addDays(christmas, -daysBeforeChristmas);
  return addDays(fourthSundayOfAdvent, -21);
}

export function getLiturgicalCycle(date: Date): LiturgicalCycle {
  const year = getYear(date);
  const adventStart = calculateAdventStart(year);
  const liturgicalYear = date >= adventStart ? year + 1 : year;
  const remainder = liturgicalYear % 3;
  switch (remainder) {
    case 1:
      return 'A';
    case 2:
      return 'B';
    case 0:
      return 'C';
    default:
      return 'A';
  }
}

export function getLiturgicalSeason(date: Date): LiturgicalSeason {
  const year = getYear(date);
  const easter = calculateEaster(year);
  const ashWednesday = addDays(easter, -46);
  const pentecost = addDays(easter, 49);
  const epiphanyStart = new Date(year, 0, 6);
  const christmasStart = new Date(year, 11, 25);
  const currentAdventStart = calculateAdventStart(year);

  if (date < epiphanyStart) return 'christmas';
  if (date >= epiphanyStart && date < ashWednesday) return 'epiphany';
  if (date >= ashWednesday && date < easter) return 'lent';
  if (date >= easter && date <= pentecost) return 'easter';
  if (date > pentecost && date < currentAdventStart) return 'ordinary';
  if (date >= currentAdventStart && date < christmasStart) return 'advent';
  if (date >= christmasStart) return 'christmas';
  return 'ordinary';
}

export function getLiturgicalColor(season: LiturgicalSeason, date?: Date): LiturgicalColor {
  switch (season) {
    case 'advent':
      if (date) {
        const year = getYear(date);
        const adventStart = calculateAdventStart(year);
        const thirdSunday = addDays(adventStart, 14);
        if (format(date, 'yyyy-MM-dd') === format(thirdSunday, 'yyyy-MM-dd')) return 'rose';
      }
      return 'purple';
    case 'christmas':
    case 'easter':
    case 'epiphany':
      return 'white';
    case 'lent':
      if (date) {
        const year = getYear(date);
        const easter = calculateEaster(year);
        const fourthSundayLent = addDays(easter, -21);
        if (format(date, 'yyyy-MM-dd') === format(fourthSundayLent, 'yyyy-MM-dd')) return 'rose';
      }
      return 'purple';
    case 'pentecost':
      if (date) {
        const year = getYear(date);
        const easter = calculateEaster(year);
        const pentecost = addDays(easter, 49);
        if (format(date, 'yyyy-MM-dd') === format(pentecost, 'yyyy-MM-dd')) return 'red';
      }
      return 'white';
    case 'ordinary':
    default:
      return 'green';
  }
}

const weekdayNames = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

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
      return `${weekdayNames[dayOfWeek]} da ${weekOfAdvent}ª Semana do Advento`;
    }
    case 'christmas': {
      if (format(date, 'MM-dd') === '12-25') return 'Natal do Senhor';
      if (format(date, 'MM-dd') === '01-01') return 'Circuncisão de Jesus / Ano Novo';
      if (format(date, 'MM-dd') === '01-06') return 'Epifania';
      return `${weekdayNames[dayOfWeek]} do Tempo do Natal`;
    }
    case 'epiphany': {
      const year = getYear(date);
      const weekOfEpiphany = Math.floor(differenceInDays(date, new Date(year, 0, 6)) / 7) + 1;
      if (isSunday) {
        const ordinals = [
          'Primeiro',
          'Segundo',
          'Terceiro',
          'Quarto',
          'Quinto',
          'Sexto',
          'Sétimo',
          'Oitavo',
        ];
        return `${ordinals[weekOfEpiphany - 1]} Domingo após a Epifania`;
      }
      return `${weekdayNames[dayOfWeek]} após a Epifania`;
    }
    case 'lent': {
      const year = getYear(date);
      const easter = calculateEaster(year);
      const ashWednesday = addDays(easter, -46);
      if (format(date, 'yyyy-MM-dd') === format(ashWednesday, 'yyyy-MM-dd'))
        return 'Quarta-feira de Cinzas';
      const daysSinceAsh = differenceInDays(date, ashWednesday);
      if (isSunday) {
        const weekOfLent = Math.floor(daysSinceAsh / 7);
        const ordinals = ['Primeiro', 'Segundo', 'Terceiro', 'Quarto', 'Quinto', 'Sexto'];
        if (weekOfLent === 5) return 'Domingo de Ramos';
        return `${ordinals[weekOfLent]} Domingo da Quaresma`;
      }
      return `${weekdayNames[dayOfWeek]} da Quaresma`;
    }
    case 'easter': {
      const year = getYear(date);
      const easter = calculateEaster(year);
      const pentecost = addDays(easter, 49);
      if (format(date, 'yyyy-MM-dd') === format(easter, 'yyyy-MM-dd'))
        return 'Domingo da Ressurreição';
      if (format(date, 'yyyy-MM-dd') === format(pentecost, 'yyyy-MM-dd')) return 'Pentecostes';
      const weekOfEaster = Math.floor(differenceInDays(date, easter) / 7) + 1;
      if (isSunday) {
        const ordinals = ['', 'Segundo', 'Terceiro', 'Quarto', 'Quinto', 'Sexto', 'Sétimo'];
        return `${ordinals[weekOfEaster]} Domingo da Páscoa`;
      }
      return `${weekdayNames[dayOfWeek]} da ${weekOfEaster}ª Semana da Páscoa`;
    }
    case 'ordinary':
    default: {
      const year = getYear(date);
      const easter = calculateEaster(year);
      const pentecost = addDays(easter, 49);
      if (isSunday) {
        const sundaysAfterPentecost = Math.floor(differenceInDays(date, pentecost) / 7);
        return `${sundaysAfterPentecost + 1}º Domingo do Tempo Comum`;
      }
      return `${weekdayNames[dayOfWeek]} do Tempo Comum`;
    }
  }
}

export function getLiturgicalDayInfo(date: Date): LiturgicalDayInfo {
  const season = getLiturgicalSeason(date);
  const color = getLiturgicalColor(season, date);
  const dayName = getLiturgicalDayName(date, season);
  const cycle = getLiturgicalCycle(date);
  return {
    date: format(date, 'yyyy-MM-dd'),
    season,
    color,
    dayName,
    cycle,
  };
}
