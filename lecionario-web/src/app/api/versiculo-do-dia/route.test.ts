import { describe, it, expect } from 'vitest';
import { GET, OPTIONS } from './route';
import { dateKeyInTimeZone } from '@/lib/versiculo-do-dia';

const BASE = 'http://localhost/api/versiculo-do-dia';

describe('GET /api/versiculo-do-dia', () => {
  it('responde 200 com o Evangelho numa data com leitura', async () => {
    const res = await GET(new Request(`${BASE}?date=2023-12-03`));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.verse.type).toBe('gospel');
    expect(body.verse.reference).toBe('Marcos 13:24-37');
    expect(body.fallback).toBe(false);
  });

  it('libera CORS para qualquer origem (consumo pelos outros sites do cluster)', async () => {
    const res = await GET(new Request(`${BASE}?date=2023-12-03`));

    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });

  it('responde 400 para data com formato inválido', async () => {
    const res = await GET(new Request(`${BASE}?date=2026-02-30`));

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain('YYYY-MM-DD');
  });

  it('sem ?date usa "hoje" em America/Sao_Paulo', async () => {
    const res = await GET(new Request(BASE));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.date).toBe(dateKeyInTimeZone(new Date()));
  });

  it('nunca responde 404: fora da cobertura do RCL cai no pool com fallback: true', async () => {
    const res = await GET(new Request(`${BASE}?date=2031-03-15`));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.fallback).toBe(true);
    expect(body.verse.type).toBe('fallback');
  });
});

describe('OPTIONS /api/versiculo-do-dia', () => {
  it('responde 204 com permissão de GET', async () => {
    const res = await OPTIONS();

    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Methods')).toContain('GET');
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });
});
