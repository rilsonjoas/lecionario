import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useSettings, type FontSizePreference } from './SettingsContext';

const SCALE_FACTORS: Record<FontSizePreference, number> = {
  small: 0.85,
  medium: 1,
  large: 1.15,
};

interface FontContextValue {
  scale: (size: number) => number;
  factor: number;
}

const FontContext = createContext<FontContextValue>({
  scale: (n) => n,
  factor: 1,
});

export function FontProvider({ children }: { children: ReactNode }) {
  const { fontSize } = useSettings();
  const factor = SCALE_FACTORS[fontSize];

  const value = useMemo(
    () => ({
      scale: (size: number) => Math.round(size * factor),
      factor,
    }),
    [factor],
  );

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
}

export function useFontScale() {
  return useContext(FontContext);
}
