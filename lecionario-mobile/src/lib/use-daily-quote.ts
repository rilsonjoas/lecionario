import { useEffect, useState } from 'react';
import { diaParaApi, fetchDailyQuote, type DailyQuote } from '@/lib/quote-fetcher';

/**
 * "Citação do dia" que acompanha a data escolhida.
 *
 * Antes a tela buscava a citação uma vez e sem data: ao trocar de dia a mesma
 * frase de hoje continuava na tela (a pintura e o evangelho já seguiam a data).
 * Agora busca ao montar e de novo sempre que a data muda. O estado final sempre
 * corresponde à data atual: se a busca do novo dia falhar, o card some em vez de
 * manter a frase de outro dia.
 */
export function useDailyQuote(date?: Date | string): DailyQuote | null {
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  // Chave em texto: um objeto Date novo a cada render dispararia buscas sem fim.
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
