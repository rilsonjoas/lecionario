'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { fetchDailyQuote, type DailyQuote } from '@/lib/quote-fetcher';

// Citação diária do cluster "A Biblioteca" (ADR 001) — fonte única na API
// do Scriptorium. O link de afiliado vem PRONTO da API (`affiliateUrl`,
// apenas para obras não-públicas) com rel="sponsored" (boas práticas do
// Google); para domínio público o CTA é "Ler livro completo" apontando pro
// scriptoriumUrl. Falha de rede/API faz o card sumir com graça.
export function LewisQuoteSection() {
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchDailyQuote(ctrl.signal).then((result) => {
      if (!ctrl.signal.aborted) setQuote(result);
    });
    return () => ctrl.abort();
  }, []);

  const handleCopy = async () => {
    if (!quote) return;
    await navigator.clipboard.writeText(
      `\u201C${quote.text}\u201D\n\n— ${quote.source ?? ''}, ${quote.author}\n\n— Lecionário · lecionario.narniano.com`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!quote) return null;

  const amazonUrl = quote.dominioPublico ? null : quote.affiliateUrl;
  const bookUrl = quote.scriptoriumUrl;

  return (
    <section className="border-t border-accent/10 py-16 text-center animate-fade-in">
      {/* Mesma hierarquia e proporção do card mobile:
          título itálico grande + sublabel caps pequena */}
      <h2 className="text-2xl md:text-3xl font-display italic text-secondary mb-2">
        Citação do dia
      </h2>
      <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-accent mb-8">
        {quote.author.toUpperCase()}
      </p>
      <blockquote className="text-lg md:text-xl lg:text-2xl font-display italic text-secondary max-w-4xl mx-auto leading-relaxed px-4">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      {/* rel="sponsored": boa prática p/ links de afiliado (Google) */}
      <div className="mt-8 flex flex-col items-center gap-3">
        {amazonUrl && quote.source && (
          <a
            href={amazonUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-accent transition-colors hover:text-primary underline-offset-4 hover:underline"
            aria-label={`Abrir ${quote.source} na Amazon`}
          >
            — {quote.source} ↗
          </a>
        )}
        {bookUrl && (
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-accent transition-all hover:border-accent/50 hover:bg-accent/15"
          >
            Ler livro completo ↗
          </a>
        )}
      </div>

      {/* Cópia no padrão dos cards: canto inferior direito, só ícone */}
      <div className="flex justify-end max-w-4xl mx-auto px-4">
        <button
          type="button"
          onClick={handleCopy}
          className="p-2 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
          aria-label={copied ? 'Copiado' : 'Copiar citação'}
          title={copied ? 'Copiado!' : 'Copiar citação'}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
}
