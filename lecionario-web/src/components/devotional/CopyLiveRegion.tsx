'use client';

/** Região de status dos botões de copiar. Fica no DOM o tempo todo:
 *  uma região `aria-live` que só aparece quando há texto não é
 *  anunciada por leitor de tela — o nó precisa existir antes. */
export function CopyLiveRegion({ message }: { message: string }) {
  return (
    <span role="status" aria-live="polite" className="sr-only">
      {message}
    </span>
  );
}
