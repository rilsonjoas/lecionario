import type { LiturgicalSeason, SeasonTheme } from '@/types';

export const seasonThemes: Record<LiturgicalSeason, SeasonTheme> = {
  advent: {
    season: 'advent',
    primaryColor: 'Roxo do Advento',
    secondaryColor: 'Rosa da Esperança',
    accentColor: 'Violeta Profundo',
    className: 'season-advent'
  },
  christmas: {
    season: 'christmas',
    primaryColor: 'Dourado Natalino',
    secondaryColor: 'Branco Puro',
    accentColor: 'Ouro Celestial',
    className: 'season-christmas'
  },
  epiphany: {
    season: 'epiphany',
    primaryColor: 'Branco da Epifania',
    secondaryColor: 'Verde da Revelação',
    accentColor: 'Verde Esperança',
    className: 'season-epiphany'
  },
  lent: {
    season: 'lent',
    primaryColor: 'Roxo Quaresmal',
    secondaryColor: 'Cinza das Cinzas',
    accentColor: 'Violeta Penitencial',
    className: 'season-lent'
  },
  easter: {
    season: 'easter',
    primaryColor: 'Branco Pascal',
    secondaryColor: 'Dourado da Ressurreição',
    accentColor: 'Ouro da Vitória',
    className: 'season-easter'
  },
  pentecost: {
    season: 'pentecost',
    primaryColor: 'Vermelho do Espírito',
    secondaryColor: 'Fogo Pentecostal',
    accentColor: 'Escarlate Sagrado',
    className: 'season-pentecost'
  },
  ordinary: {
    season: 'ordinary',
    primaryColor: 'Verde do Crescimento',
    secondaryColor: 'Verde da Vida',
    accentColor: 'Esmeralda da Esperança',
    className: 'season-ordinary'
  }
};

export function getThemeForSeason(season: LiturgicalSeason): SeasonTheme {
  return seasonThemes[season];
}

export function applySeasonTheme(season: LiturgicalSeason): void {
  const theme = getThemeForSeason(season);
  
  // Remove all existing season classes
  document.documentElement.classList.remove(
    'season-advent', 'season-christmas', 'season-epiphany',
    'season-lent', 'season-easter', 'season-pentecost', 'season-ordinary'
  );
  
  // Add the new season class
  document.documentElement.classList.add(theme.className);
}