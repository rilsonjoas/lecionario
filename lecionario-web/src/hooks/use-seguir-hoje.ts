'use client';

import { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { devePularParaHoje, FORMATO_DIA, msAteProximaMeiaNoite } from '@/lib/seguir-hoje';

/**
 * Faz a página "seguir o hoje" quando a aba ou o PWA ficam abertos (espelha
 * lecionario-mobile/src/lib/use-seguir-hoje.ts): ao voltar a ficar visível ou à
 * meia-noite com a aba aberta, se a tela estava no "hoje" anterior, chama
 * `aoVirarODia` (que deve trocar a data para a de agora). Ver lib/seguir-hoje.ts.
 */
export function useSeguirHoje(dataExibida: Date, aoVirarODia: () => void): void {
  const ultimoDia = useRef(format(new Date(), FORMATO_DIA));
  const dataRef = useRef(dataExibida);
  const callbackRef = useRef(aoVirarODia);

  useEffect(() => {
    dataRef.current = dataExibida;
    callbackRef.current = aoVirarODia;
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const armar = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(verificar, msAteProximaMeiaNoite(new Date()));
    };

    const verificar = () => {
      const agora = new Date();
      if (devePularParaHoje(dataRef.current, ultimoDia.current, agora)) callbackRef.current();
      ultimoDia.current = format(agora, FORMATO_DIA);
      armar();
    };

    const aoMudarVisibilidade = () => {
      if (document.visibilityState === 'visible') verificar();
    };

    document.addEventListener('visibilitychange', aoMudarVisibilidade);
    armar();

    return () => {
      document.removeEventListener('visibilitychange', aoMudarVisibilidade);
      if (timer) clearTimeout(timer);
    };
  }, []);
}
