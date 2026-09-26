'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdUnitProps {
  slot?: string;
  className?: string;
}

// Um único slot de anúncio que colapsa totalmente (0px de altura/margem)
// caso o Google não preencha o anúncio ou esteja bloqueado.
export function AdUnit({ slot, className = '' }: AdUnitProps) {
  // `HTMLModElement` NÃO é palpite errado, é o que o @types/react
  // exige: ele mapeia `ins:` para o elemento experimental `<mod>`, que
  // carrega `cite`/`dateTime` — os mesmos atributos do `<ins>`. Trocar
  // por `HTMLElement` quebra o `tsc` (TS2322). O nome convida a
  // "consertar"; não conserte. Mesmo aviso vale no Gerador C.S. Lewis.
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [isUnfilled, setIsUnfilled] = useState(false);

  useEffect(() => {
    const el = insRef.current;
    if (!el) return;

    if (!pushed.current) {
      pushed.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        setIsUnfilled(true);
      }
    }

    const observer = new MutationObserver(() => {
      const status = el.getAttribute('data-ad-status');
      if (status === 'unfilled') {
        setIsUnfilled(true);
      } else if (status === 'filled') {
        setIsUnfilled(false);
      }
    });

    observer.observe(el, {
      attributes: true,
      attributeFilter: ['data-ad-status', 'style'],
    });

    return () => observer.disconnect();
  }, []);

  if (isUnfilled) return null;

  return (
    // Mesmo `aria-hidden` que o Gerador C.S. Lewis tinha, e pelo mesmo
    // motivo: o AdSense injeta <iframe> aqui dentro, e se esse iframe for
    // focável, o foco entra num elemento que a tecnologia assistiva não
    // enxerga (aria-hidden-focus). Anúncio é conteúdo — se um dia
    // precisar de rótulo, o `title` vai no iframe, nunca `aria-hidden`
    // no wrapper. Hoje o risco é latente: `page.tsx` chama <AdUnit />
    // sem `slot`, então sem data-ad-slot o anúncio não preenche, o
    // MutationObserver marca `unfilled` e isto aqui retorna null. Se o
    // slot voltar, a violação voltava junto — agora não volta.
    <div className={`overflow-hidden empty:hidden ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5482566824255473"
        {...(slot ? { 'data-ad-slot': slot } : {})}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
