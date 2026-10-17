'use client';

import { useEffect, useRef, useState } from 'react';
import { fetchDailyQuote, type DailyQuote } from '@/lib/quote-fetcher';

/**
 * "Citação do dia" que acompanha o dia (espelha lecionario-mobile/src/lib/use-daily-quote.ts).
 *
 * Buscar só ao montar o componente deixa a frase do primeiro dia na tela de quem
 * mantém o PWA ou a aba aberta (a página não recarrega ao voltar). Aqui busca ao
 * montar e de novo quando a aba volta a ficar visível, se o dia mudou ou se passou
 * tempo suficiente. Atualização que falha mantém a citação atual; se a primeira
 * busca falhar, a próxima volta à aba tenta de novo.
 */
export const QUOTE_REFRESH_MS = 30 * 60 * 1000;

export interface UltimaBusca {
  /** Momento da busca (epoch ms). */
  em: number;
  /** Dia local da busca, 'yyyy-MM-dd'. */
  dia: string;
}

export function diaLocal(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function deveAtualizarCitacao(ultima: UltimaBusca | null, agora: Date): boolean {
  if (!ultima) return true;
  if (ultima.dia !== diaLocal(agora)) return true;
  return agora.getTime() - ultima.em >= QUOTE_REFRESH_MS;
}

export function useDailyQuote(): DailyQuote | null {
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const ultima = useRef<UltimaBusca | null>(null);
  const ctrl = useRef<AbortController | null>(null);

  useEffect(() => {
    const carregar = () => {
      ctrl.current?.abort();
      const c = new AbortController();
      ctrl.current = c;
      const agora = new Date();
      fetchDailyQuote(c.signal).then((result) => {
        if (c.signal.aborted || !result) return;
        setQuote(result);
        ultima.current = { em: agora.getTime(), dia: diaLocal(agora) };
      });
    };

    const aoVoltar = () => {
      if (
        document.visibilityState === 'visible' &&
        deveAtualizarCitacao(ultima.current, new Date())
      )
        carregar();
    };

    carregar();
    document.addEventListener('visibilitychange', aoVoltar);
    return () => {
      document.removeEventListener('visibilitychange', aoVoltar);
      ctrl.current?.abort();
    };
  }, []);

  return quote;
}
