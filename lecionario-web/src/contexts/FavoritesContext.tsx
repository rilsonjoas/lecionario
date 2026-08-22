'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

const FAVORITES_KEY = 'lecionario:favorites';

interface FavoritesContextValue {
  favorites: string[];
  toggleFavorite: (dateStr: string) => void;
  isFavorite: (dateStr: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

// Paridade com o mobile (FavoritesContext.tsx do lecionario-mobile):
// mesma API, persistência local trocando AsyncStorage por localStorage.
// Registrado no backlog 2026-08-21 ("Favoritar existe só no mobile").
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Hidratação pós-mount pra não divergir do HTML do SSR
    try {
      const raw = window.localStorage.getItem(FAVORITES_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      // localStorage indisponível (navegador restrito) — segue sem favoritos
    }
  }, []);

  const toggleFavorite = useCallback((dateStr: string) => {
    setFavorites((prev) => {
      const next = prev.includes(dateStr) ? prev.filter((d) => d !== dateStr) : [...prev, dateStr];
      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch {
        // idem acima — falha de escrita não deve quebrar a UI
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((dateStr: string) => favorites.includes(dateStr), [favorites]);

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
