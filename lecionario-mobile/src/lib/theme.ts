import type { LiturgicalSeason, SeasonTheme } from '@/types';

// Alinhado ao Design Narniano e unificado com lecionario-web/src/lib/theme.ts
// (2026-08-15) — antes web e mobile tinham paletas divergentes (ex.:
// Quaresma roxa no web vs. marrom-avermelhada aqui); corrigido pra usar
// os mesmos valores nas duas plataformas.
export const seasonThemes: Record<LiturgicalSeason, SeasonTheme> = {
  advent: {
    season: 'advent',
    primaryColor: '#4A6FA5',
    secondaryColor: '#B49A60',
    accentColor: '#0B0E23',
  },
  christmas: {
    season: 'christmas',
    primaryColor: '#B49A60',
    secondaryColor: '#F4EFE1',
    accentColor: '#8B6914',
  },
  epiphany: {
    season: 'epiphany',
    primaryColor: '#7A9178',
    secondaryColor: '#B49A60',
    accentColor: '#6B7C5E',
  },
  lent: {
    season: 'lent',
    primaryColor: '#4B2E39',
    secondaryColor: '#8B9094',
    accentColor: '#3A1F2C',
  },
  easter: {
    season: 'easter',
    primaryColor: '#B49A60',
    secondaryColor: '#F4EFE1',
    accentColor: '#8B6914',
  },
  pentecost: {
    season: 'pentecost',
    primaryColor: '#B7332B',
    secondaryColor: '#C26430',
    accentColor: '#8B0000',
  },
  ordinary: {
    season: 'ordinary',
    primaryColor: '#7A9178',
    secondaryColor: '#B49A60',
    accentColor: '#6B7C5E',
  },
};

export function getThemeForSeason(season: LiturgicalSeason): SeasonTheme {
  return seasonThemes[season];
}

// Achado real (2026-08-16): o cabeçalho do HomeScreen usava texto branco
// fixo (várias opacidades) + `theme.accentColor` no título, presumindo
// fundo sempre escuro. Funciona no Advento/Quaresma/Pentecostes (fundo
// escuro), mas em Natal/Páscoa (dourado) e Epifania/Tempo Comum (sálvia)
// o texto quase some — "Lecionário" ilegível no relato de teste real.
// Contraste calculado e verificado: seasons claras precisam de texto
// escuro, não branco.
const LIGHT_SEASONS: LiturgicalSeason[] = ['christmas', 'easter', 'epiphany', 'ordinary'];

export function isLightSeason(season: LiturgicalSeason): boolean {
  return LIGHT_SEASONS.includes(season);
}

export interface HeaderTextColors {
  title: string;
  body: string; // dayName, dateText — ~92% de opacidade equivalente
  bodyMuted: string; // cycleText, navText — ~75-80%
}

export function getHeaderTextColors(season: LiturgicalSeason): HeaderTextColors {
  if (isLightSeason(season)) {
    // "Preto quente" — 5.56:1 (Natal/Páscoa) e 4.5:1 (Epifania/Comum)
    // contra o fundo, WCAG AA em texto pequeno
    return { title: '#2A1810', body: 'rgba(42,24,16,0.92)', bodyMuted: 'rgba(42,24,16,0.75)' };
  }
  return { title: '#F4EFE1', body: 'rgba(255,255,255,0.95)', bodyMuted: 'rgba(255,255,255,0.8)' };
}
