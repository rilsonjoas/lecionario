import { NextResponse } from 'next/server';
import {
  getVerseOfTheDay,
  parseDateKey,
  dateKeyInTimeZone,
  TODAY_TIME_ZONE,
} from '@/lib/versiculo-do-dia';

/**
 * GET /api/versiculo-do-dia?date=YYYY-MM-DD
 *
 * Versículo do dia para o cluster "A Biblioteca" — fonte única: leituras RCL
 * do Lecionário (ARC), ver `src/lib/versiculo-do-dia.ts` para as regras.
 *
 * - `date` é opcional; sem ele, considera "hoje" em America/Sao_Paulo.
 * - Determinístico: mesma data → mesmo versículo.
 * - Datas fora da cobertura RCL respondem com `fallback: true` (pool fixo),
 *   nunca 404 — o endpoint é consumido de outros sites do cluster (CORS *),
 *   e um card quebrado é pior que um versículo clássico.
 * - `dynamic = 'force-dynamic'`: como o "hoje" muda todo dia, a resposta não
 *   pode ser cacheada no build (nem o Next 14 geraria pool de rotas de API em
 *   runtime, mas a intenção fica explícita e à prova de futuras opções estáticas).
 */
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function OPTIONS(): NextResponse {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export function GET(request: Request): NextResponse {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');

  let date: Date;
  if (dateParam !== null) {
    const parsed = parseDateKey(dateParam);
    if (!parsed) {
      return NextResponse.json(
        {
          error: 'Parâmetro "date" inválido. Use o formato YYYY-MM-DD.',
          date: dateParam,
        },
        { status: 400, headers: CORS_HEADERS },
      );
    }
    date = parsed;
  } else {
    date = parseDateKey(dateKeyInTimeZone(new Date())) as Date;
  }

  return NextResponse.json(getVerseOfTheDay(date), { headers: CORS_HEADERS });
}
