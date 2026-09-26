import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { useSettings, type ThemePreference } from './SettingsContext';

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  card: string;
  destructive: string;
  tabBarBg: string;
  tabBarBorder: string;
  statusBar: 'light' | 'dark';
  /** Modo resolvido — componentes que precisam de cor por tema (ex.: capitular) */
  mode: 'light' | 'dark';
}

/* Tokens corrigidos 2026-09-25 (mesma auditoria do web):
 *  accent #B8860B dava 2.89:1 no fundo claro e 3.25:1 no card — reprovado
 *  em texto, e `accent` é usado como cor de TEXTO (o link "Ver a obra no
 *  Bíblia na Arte", 13px). O web resolveu separando o papel de texto do
 *  papel de fundo (`--accent` vs `--accent-texto`); aqui o acento é uma
 *  cor só, então o claro e o escuro passam a ter valores diferentes, como
 *  já acontecia no web. Escuro ESCURECE, porque é texto sobre fundo claro
 *  que precisa de contraste — o claro é que sobe.
 *  textMuted e border também: 3.88:1 e 1.20:1 (borda invisível, 1.4.11). */
const LIGHT: ThemeColors = {
  background: '#F5F1E8',
  surface: '#FFFFFF',
  text: '#1A1A1A',
  textMuted: 'rgba(0,0,0,0.62)',
  border: 'rgba(0,0,0,0.45)',
  accent: '#7A5A16',
  card: '#FFFFFF',
  destructive: '#CC3333',
  tabBarBg: '#FAFAF5',
  tabBarBorder: 'rgba(0,0,0,0.45)',
  statusBar: 'dark',
  mode: 'light',
};

const DARK: ThemeColors = {
  background: '#1A1A1A',
  surface: '#242424',
  text: '#F5F5F0',
  textMuted: 'rgba(255,255,255,0.58)',
  border: 'rgba(255,255,255,0.35)',
  accent: '#C9973A',
  card: '#242424',
  destructive: '#CC3333',
  tabBarBg: '#1A1A1A',
  tabBarBorder: 'rgba(201,151,58,0.9)',
  statusBar: 'light',
  mode: 'dark',
};

const ThemeContext = createContext<ThemeColors>(DARK);

function resolveTheme(
  pref: ThemePreference,
  systemScheme: 'light' | 'dark' | null | undefined,
): ThemeColors {
  if (pref === 'system') return systemScheme === 'dark' ? DARK : LIGHT;
  return pref === 'dark' ? DARK : LIGHT;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme } = useSettings();
  const systemScheme = useColorScheme();

  const colors = useMemo(() => resolveTheme(theme, systemScheme), [theme, systemScheme]);

  return <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>;
}

export function useThemeColors() {
  return useContext(ThemeContext);
}
