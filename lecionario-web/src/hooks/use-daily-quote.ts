'use client';

import { useEffect, useState } from 'react';
import { diaParaApi, fetchDailyQuote, type DailyQuote } from '@/lib/quote-fetcher';

/**
 * "Citação do dia" que acompanha a data escolhida (espelha
 * lecionario-mobile/src/lib/use-daily-quote.ts).
 *
 * A home navega por `?date=` sem remontar o componente; buscar só ao montar e sem
 * data deixava a frase de hoje na tela ao trocar de dia. Agora busca ao montar e
 * sempre que a data muda. Se a busca do novo dia falhar, o card some em vez de
 * manter a frase de outro dia.
 */
export function useDailyQuote(date?: Date | string): DailyQuote | null {
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const dia = diaParaApi(date);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchDailyQuote(dia ?? undefined, ctrl.signal).then((result) => {
      if (!ctrl.signal.aborted) setQuote(result);
    });
    return () => ctrl.abort();
  }, [dia]);

  return quote;
}
