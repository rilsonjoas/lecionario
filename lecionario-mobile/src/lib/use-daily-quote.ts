import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { format } from 'date-fns';
import { fetchDailyQuote, type DailyQuote } from '@/lib/quote-fetcher';

/**
 * "Citação do dia" que acompanha o dia.
 *
 * Antes a tela buscava a citação uma única vez, quando montava. No celular o
 * app não é fechado ao sair: fica em segundo plano por dias, a tela continua
 * montada e a frase buscada no primeiro dia ficava na tela para sempre. No web
 * isso não aparece porque cada visita recarrega a página.
 *
 * Agora busca ao montar e de novo quando o app volta ao primeiro plano, se o dia
 * mudou ou se passou tempo suficiente. Se uma atualização falhar (sem rede), a
 * citação que já está na tela é mantida; se a primeira busca falhar, a próxima
 * volta ao app tenta de novo.
 */
export const QUOTE_REFRESH_MS = 30 * 60 * 1000;

export interface UltimaBusca {
  /** Momento da busca (epoch ms). */
  em: number;
  /** Dia local da busca, 'yyyy-MM-dd'. */
  dia: string;
}

export function deveAtualizarCitacao(ultima: UltimaBusca | null, agora: Date): boolean {
  if (!ultima) return true;
  if (ultima.dia !== format(agora, 'yyyy-MM-dd')) return true;
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
        ultima.current = { em: agora.getTime(), dia: format(agora, 'yyyy-MM-dd') };
      });
    };

    carregar();
    const sub = AppState.addEventListener('change', (estado) => {
      if (estado === 'active' && deveAtualizarCitacao(ultima.current, new Date())) carregar();
    });
    return () => {
      sub.remove();
      ctrl.current?.abort();
    };
  }, []);

  return quote;
}
