import { describe, it, expect, vi, beforeEach } from 'vitest';

const store: Record<string, string> = {};

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn(async (key: string) => store[key] ?? null),
    setItem: vi.fn(async (key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn(async (key: string) => {
      delete store[key];
    }),
    getAllKeys: vi.fn(async () => Object.keys(store)),
    multiRemove: vi.fn(async (keys: string[]) => {
      keys.forEach((k) => delete store[k]);
    }),
  },
}));

import { getCached, setCached, clearCache, cacheKey } from '../cache';

beforeEach(() => {
  Object.keys(store).forEach((k) => delete store[k]);
  vi.clearAllMocks();
});

describe('cacheKey', () => {
  it('returns devotional: prefix with date', () => {
    expect(cacheKey('2026-01-15')).toBe('devotional:2026-01-15');
  });
});

describe('setCached / getCached', () => {
  it('stores and retrieves data', async () => {
    const data = { hello: 'world' };
    await setCached('test-key', data);
    const result = await getCached<typeof data>('test-key');
    expect(result).toEqual(data);
  });

  it('returns null for missing key', async () => {
    const result = await getCached('nonexistent');
    expect(result).toBeNull();
  });

  it('returns null for expired entry', async () => {
    await setCached('expired', { x: 1 }, -1000);
    const result = await getCached('expired');
    expect(result).toBeNull();
  });

  it('returns data within TTL', async () => {
    await setCached('fresh', { x: 1 }, 60_000);
    const result = await getCached('fresh');
    expect(result).toEqual({ x: 1 });
  });
});

describe('clearCache', () => {
  it('removes only lecionario-prefixed keys', async () => {
    store['@lecionario:devotional:2026-01-01'] = '{"data":1}';
    store['@lecionario:devotional:2026-01-02'] = '{"data":2}';
    store['@other:key'] = '{"data":3}';

    await clearCache();

    expect(store['@lecionario:devotional:2026-01-01']).toBeUndefined();
    expect(store['@lecionario:devotional:2026-01-02']).toBeUndefined();
    expect(store['@other:key']).toBe('{"data":3}');
  });

  it('does nothing when no cache keys exist', async () => {
    store['@other:key'] = 'keep';
    await clearCache();
    expect(store['@other:key']).toBe('keep');
  });
});
