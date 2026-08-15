import type { LiturgicalSeason, SeasonTheme } from '@/types';

/** Cor de marca (corpo da logo) usada no theme-color do browser por estação. */
export const seasonBrandColors: Record<LiturgicalSeason, string> = {
  advent: '#7C3BED',
  christmas: '#8B6914',
  epiphany: '#0F7033',
  lent: '#663399',
  easter: '#8B6914',
  pentecost: '#C02626',
  ordinary: '#16A249',
};

export const seasonThemes: Record<LiturgicalSeason, SeasonTheme> = {
  advent: {
    season: 'advent',
    primaryColor: 'Roxo do Advento',
    secondaryColor: 'Rosa da Esperança',
    accentColor: 'Violeta Profundo',
    className: 'season-advent',
  },
  christmas: {
    season: 'christmas',
    primaryColor: 'Dourado Natalino',
    secondaryColor: 'Branco Puro',
    accentColor: 'Ouro Celestial',
    className: 'season-christmas',
  },
  epiphany: {
    season: 'epiphany',
    primaryColor: 'Branco da Epifania',
    secondaryColor: 'Verde da Revelação',
    accentColor: 'Verde Esperança',
    className: 'season-epiphany',
  },
  lent: {
    season: 'lent',
    primaryColor: 'Roxo Quaresmal',
    secondaryColor: 'Cinza das Cinzas',
    accentColor: 'Violeta Penitencial',
    className: 'season-lent',
  },
  easter: {
    season: 'easter',
    primaryColor: 'Branco Pascal',
    secondaryColor: 'Dourado da Ressurreição',
    accentColor: 'Ouro da Vitória',
    className: 'season-easter',
  },
  pentecost: {
    season: 'pentecost',
    primaryColor: 'Vermelho do Espírito',
    secondaryColor: 'Fogo Pentecostal',
    accentColor: 'Escarlate Sagrado',
    className: 'season-pentecost',
  },
  ordinary: {
    season: 'ordinary',
    primaryColor: 'Verde do Crescimento',
    secondaryColor: 'Verde da Vida',
    accentColor: 'Esmeralda da Esperança',
    className: 'season-ordinary',
  },
};

export function getThemeForSeason(season: LiturgicalSeason): SeasonTheme {
  return seasonThemes[season];
}

export function applySeasonTheme(season: LiturgicalSeason): void {
  const theme = getThemeForSeason(season);

  // Remove all existing season classes
  document.documentElement.classList.remove(
    'season-advent',
    'season-christmas',
    'season-epiphany',
    'season-lent',
    'season-easter',
    'season-pentecost',
    'season-ordinary',
  );

  // Add the new season class
  document.documentElement.classList.add(theme.className);
}

/**
 * Atualiza a identidade de marca do browser (favicon, manifest e theme-color)
 * conforme a estação litúrgica do dia em exibição.
 */
export function applySeasonBranding(season: LiturgicalSeason): void {
  if (typeof document === 'undefined') return;

  const seasonLogo = `/icons/logo/season-${season}.png`;
  document.querySelectorAll('link[rel="icon"]').forEach((el) => {
    const href = el.getAttribute('href');
    if (href && href !== seasonLogo) el.setAttribute('href', seasonLogo);
  });

  const manifest = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
  if (manifest) {
    const href = `/manifest-${season}.json`;
    if (manifest.getAttribute('href') !== href) manifest.setAttribute('href', href);
  }

  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (themeColor) {
    const color = seasonBrandColors[season];
    if (themeColor.getAttribute('content') !== color) themeColor.setAttribute('content', color);
  }
}
