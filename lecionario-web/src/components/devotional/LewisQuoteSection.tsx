'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { buildAmazonUrl, getDailyQuote } from '@/lib/lewis-quotes';

// Citação diária de C.S. Lewis com link de afiliado pra obra-fonte na
// Amazon (mesmo padrão do mobile; tag reusada do Gerador C.S. Lewis).
export function LewisQuoteSection({ date }: { date?: Date }) {
  const quote = getDailyQuote(date ?? new Date());
  const amazonUrl = buildAmazonUrl(quote.source, quote.author);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `\u201C${quote.quote}\u201D\n\n— ${quote.source}, ${quote.author}\n\n— Lecionário · lecionario.narniano.com`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        &ldquo;{quote.quote}&rdquo;
      </blockquote>
      {/* rel="sponsored": boa prática p/ links de afiliado (Google) */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href={amazonUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="inline-flex items-center gap-1 text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-accent transition-colors hover:text-primary underline-offset-4 hover:underline"
          aria-label={`Abrir ${quote.source} na Amazon`}
        >
          — {quote.source} ↗
        </a>
        {quote.scriptoriumUrl && (
          <a
            href={quote.scriptoriumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-accent transition-all hover:border-accent/50 hover:bg-accent/15"
          >
            Ler no Scriptorium ↗
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
