import type { LiturgicalSeason, SeasonTheme } from '@/types';

export const seasonThemes: Record<LiturgicalSeason, SeasonTheme> = {
  advent: {
    season: 'advent',
    primaryColor: '#4A2C6D',
    secondaryColor: '#C4A4E8',
    accentColor: '#3A1F5C',
  },
  christmas: {
    season: 'christmas',
    primaryColor: '#B8860B',
    secondaryColor: '#FFF8E7',
    accentColor: '#D4A017',
  },
  epiphany: {
    season: 'epiphany',
    primaryColor: '#F5F5F0',
    secondaryColor: '#2E7D32',
    accentColor: '#1B5E20',
  },
  lent: {
    season: 'lent',
    primaryColor: '#6B3A3A',
    secondaryColor: '#A0A0A0',
    accentColor: '#4A2525',
  },
  easter: {
    season: 'easter',
    primaryColor: '#F5F5F0',
    secondaryColor: '#B8860B',
    accentColor: '#8B6914',
  },
  pentecost: {
    season: 'pentecost',
    primaryColor: '#B22222',
    secondaryColor: '#FF6347',
    accentColor: '#8B0000',
  },
  ordinary: {
    season: 'ordinary',
    primaryColor: '#2E7D32',
    secondaryColor: '#4CAF50',
    accentColor: '#1B5E20',
  },
};

export function getThemeForSeason(season: LiturgicalSeason): SeasonTheme {
  return seasonThemes[season];
}
