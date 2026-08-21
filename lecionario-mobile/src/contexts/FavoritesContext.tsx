import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@lecionario:favorites';

interface FavoritesContextValue {
  favorites: string[];
  toggleFavorite: (dateStr: string) => void;
  isFavorite: (dateStr: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY).then((raw) => {
      if (raw) setFavorites(JSON.parse(raw));
    });
  }, []);

  const toggleFavorite = useCallback(
    (dateStr: string) => {
      setFavorites((prev) => {
        const next = prev.includes(dateStr)
          ? prev.filter((d) => d !== dateStr)
          : [...prev, dateStr];
        AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const isFavorite = useCallback(
    (dateStr: string) => favorites.includes(dateStr),
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
