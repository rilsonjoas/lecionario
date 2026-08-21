import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'light' | 'dark' | 'system';
export type FontSizePreference = 'small' | 'medium' | 'large';

interface Settings {
  theme: ThemePreference;
  fontSize: FontSizePreference;
  notificationsEnabled: boolean;
  notificationTime: string; // "HH:MM"
}

interface SettingsContextValue extends Settings {
  setTheme: (t: ThemePreference) => void;
  setFontSize: (f: FontSizePreference) => void;
  setNotificationsEnabled: (n: boolean) => void;
  setNotificationTime: (t: string) => void;
}

const STORAGE_KEY = '@lecionario:settings';

const DEFAULTS: Settings = {
  theme: 'system',
  fontSize: 'medium',
  notificationsEnabled: false,
  notificationTime: '06:00',
};

const SettingsContext = createContext<SettingsContextValue>({
  ...DEFAULTS,
  setTheme: () => {},
  setFontSize: () => {},
  setNotificationsEnabled: () => {},
  setNotificationTime: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
        } catch {
          // mantém defaults
        }
      }
      setLoaded(true);
    });
  }, []);

  const persist = useCallback((next: Settings) => {
    setSettings(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const setTheme = useCallback(
    (theme: ThemePreference) => persist({ ...settings, theme }),
    [settings, persist],
  );

  const setFontSize = useCallback(
    (fontSize: FontSizePreference) => persist({ ...settings, fontSize }),
    [settings, persist],
  );

  const setNotificationsEnabled = useCallback(
    (notificationsEnabled: boolean) => persist({ ...settings, notificationsEnabled }),
    [settings, persist],
  );

  const setNotificationTime = useCallback(
    (notificationTime: string) => persist({ ...settings, notificationTime }),
    [settings, persist],
  );

  if (!loaded) return null;

  return (
    <SettingsContext.Provider
      value={{ ...settings, setTheme, setFontSize, setNotificationsEnabled, setNotificationTime }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
