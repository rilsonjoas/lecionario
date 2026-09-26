'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const RESET_MS = 2000;

/**
 * Feedback de "copiado" para os botões de copiar do ofício.
 *
 * Por que existe (achado 2026-09-25): os cinco botões de copiar
 * (leitura, oração, meditação, coleta, citação) trocavam o ícone e o
 * `aria-label` no clique, mas não anunciavam NADA. Quem usa leitor de
 * tela apertava "copiar" e não recebia confirmação nenhuma de que
 * deu certo — e, se a área de transferência falhasse, o erro não
 * existia para quem não abre o console. É 4.1.3 Mensagens de status
 * (AA), e era a mesma falha que o Gerador C.S. Lewis tinha.
 *
 * Três decisões que valem registrar:
 *
 * 1. O `aria-label` do botão fica FIXO, com a ação ("Copiar leitura").
 *    Antes ele virava "Copiado" depois do clique, e isso troca o nome
 *    acessível do botão embaixo da mão de quem usa comando de voz —
 *    a pessoa diz "clicar em Copiar leitura" e o botão já não se chama
 *    mais isso. O anúncio é do live region, não do rótulo.
 * 2. A mensagem é limpa antes de reescrita, para o leitor de tela
 *    reanunciar quando o mesmo texto volta (copiar duas vezes seguidas
 *    o mesmo card).
 * 3. A falha da API de clipboard cai no mesmo canal, com texto que diz
 *    o que fazer — não um "erro" genérico.
 */
export function useCopyFeedback() {
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const announce = useCallback((msg: string) => {
    setMessage('');
    // o próximo quadro repõe o texto: é o que faz o leitor de tela
    // tratar como mudança e ler de novo
    requestAnimationFrame(() => setMessage(msg));
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setMessage('');
      setCopied(false);
    }, RESET_MS);
  }, []);

  const copy = useCallback(
    async (text: string, label: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        announce(`${label} copiado.`);
      } catch {
        announce('Não foi possível copiar. Selecione o texto e copie manualmente.');
      }
    },
    [announce],
  );

  return { copied, message, copy };
}
