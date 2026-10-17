import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { format } from 'date-fns';
import { devePularParaHoje, FORMATO_DIA, msAteProximaMeiaNoite } from '@/lib/seguir-hoje';

/**
 * Faz a tela "seguir o hoje" quando o app é deixado aberto: ao voltar ao primeiro plano
 * ou à meia-noite com o app aberto, se a tela estava no "hoje" anterior, chama
 * `aoVirarODia` (que deve trocar a data para a de agora). Ver lib/seguir-hoje.ts.
 */
export function useSeguirHoje(dataExibida: Date, aoVirarODia: () => void): void {
  const ultimoDia = useRef(format(new Date(), FORMATO_DIA));
  const dataRef = useRef(dataExibida);
  const callbackRef = useRef(aoVirarODia);

  // Sincroniza em efeito (a regra react-hooks/refs proíbe escrever em ref durante o render)
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

    const sub = AppState.addEventListener('change', (estado) => {
      if (estado === 'active') verificar();
    });
    armar();

    return () => {
      sub.remove();
      if (timer) clearTimeout(timer);
    };
  }, []);
}
