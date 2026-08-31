import { createElement, type ReactNode } from 'react';
import { vi } from 'vitest';

const element =
  (type: string) =>
  ({ children, accessibilityLabel, ...props }: Record<string, unknown>) =>
    createElement(
      'div',
      {
        'data-component': type,
        'data-testid': type,
        ...props,
        'aria-label': accessibilityLabel as string | undefined,
      },
      children as ReactNode,
    );

vi.mock('expo-clipboard', () => ({
  setStringAsync: vi.fn(async () => true),
}));

vi.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: element('Icon'),
}));

vi.mock('@/contexts/ThemeContext', () => ({
  useThemeColors: () => ({
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
    mode: 'light',
  }),
}));

vi.mock('@/contexts/FontContext', () => ({
  useFontScale: () => ({ scale: (n: number) => n, factor: 1 }),
}));
