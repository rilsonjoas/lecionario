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
    // Verde escurecido (2026-08-21): sálvia clara reprovava WCAG AA com
    // texto claro no header (2.58:1); alinhado ao web (#4F6350 = 4.91:1)
    primaryColor: '#4F6350',
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
    primaryColor: '#4F6350',
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
//
// Atualização (2026-08-21): com o véu escuro rgba(0,0,0,0.4) sobre a cor
// de marca na banda do header/nav (mesma matemática do web), TODAS as
// estações passam a ter fundo efetivamente escuro sob texto — pior caso
// é o ouro natalino com 4.91:1 (bege) / 5.66:1 (título). O texto do
// header/nav é claro sempre; esta função não precisa mais ramificar.
export interface HeaderTextColors {
  title: string;
  body: string;
  bodyMuted: string;
}

export function getHeaderTextColors(_season?: LiturgicalSeason): HeaderTextColors {
  void _season;
  return { title: '#F4EFE1', body: 'rgba(255,255,255,0.95)', bodyMuted: 'rgba(255,255,255,0.85)' };
}

// Estações cuja cor primária BRUTA (sem véu) é clara — hoje usado só pelo
// getBadgeColors(): badges vivem sobre os cards, fora do véu do header,
// então ouro natalino ainda pede foreground escuro ali.
const LIGHT_SEASONS: LiturgicalSeason[] = ['christmas', 'easter'];

export function isLightSeason(season: LiturgicalSeason): boolean {
  return LIGHT_SEASONS.includes(season);
}

export interface BadgeColors {
  bg: string;
  fg: string;
}

export function getBadgeColors(season: LiturgicalSeason): BadgeColors {
  return {
    bg: getThemeForSeason(season).primaryColor,
    fg: isLightSeason(season) ? '#2A1810' : '#F4EFE1',
  };
}
