import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = '@lecionario:';
const DEFAULT_TTL_MS = 1000 * 60 * 60 * 24;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;

    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiresAt) {
      await AsyncStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return entry.data;
  } catch {
    return null;
  }
}

export async function setCached<T>(
  key: string,
  data: T,
  ttlMs: number = DEFAULT_TTL_MS,
): Promise<void> {
  try {
    const entry: CacheEntry<T> = {
      data,
      expiresAt: Date.now() + ttlMs,
    };
    await AsyncStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // Silently fail — cache is best-effort
  }
}

export async function clearCache(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter((k) => k.startsWith(CACHE_PREFIX));
    if (cacheKeys.length > 0) {
      await AsyncStorage.multiRemove(cacheKeys);
    }
  } catch {
    // Silently fail
  }
}

export function cacheKey(dateStr: string): string {
  return `devotional:${dateStr}`;
}
