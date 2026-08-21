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
}

const LIGHT: ThemeColors = {
  background: '#F5F1E8',
  surface: '#FFFFFF',
  text: '#1A1A1A',
  textMuted: 'rgba(0,0,0,0.5)',
  border: 'rgba(0,0,0,0.08)',
  accent: '#B8860B',
  card: '#FFFFFF',
  destructive: '#CC3333',
  tabBarBg: '#FAFAF5',
  tabBarBorder: 'rgba(0,0,0,0.08)',
  statusBar: 'dark',
};

const DARK: ThemeColors = {
  background: '#1A1A1A',
  surface: '#242424',
  text: '#F5F5F0',
  textMuted: 'rgba(255,255,255,0.45)',
  border: 'rgba(255,255,255,0.08)',
  accent: '#B8860B',
  card: '#242424',
  destructive: '#CC3333',
  tabBarBg: '#1A1A1A',
  tabBarBorder: 'rgba(184,134,11,0.2)',
  statusBar: 'light',
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
