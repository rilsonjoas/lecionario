'use client';

import { useState } from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Crown, Copy, Check } from 'lucide-react';
import { GlossaryTerm } from '@/components/devotional/GlossaryTerm';

interface CollectSectionProps {
  collect: string;
}

export function CollectSection({ collect }: CollectSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `Oração de Coleta\n\n${collect}\n\nPor Jesus Cristo, nosso Senhor. Amém.`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative animate-scale-in group overflow-hidden">
      <div className="classic-frame texture-parchment border-accent/20 shadow-lg !m-0">
        <div className="relative z-10">
          <CardHeader className="pb-6 flex flex-row items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-dourado/10 rounded-2xl shadow-sm text-vinho dark:text-[hsl(336,28%,78%)] group-hover:scale-110 transition-transform duration-500">
                <Crown className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-xl md:text-2xl font-display text-secondary italic">
                  Oração de Coleta
                </CardTitle>
                <CardDescription className="flex items-center gap-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                  Oração Tradicional da Liturgia
                  <GlossaryTerm term="coleta" />
                </CardDescription>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="p-2 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
              aria-label={copied ? 'Coleta copiada' : 'Copiar Oração de Coleta'}
              title={copied ? 'Copiado!' : 'Copiar Oração de Coleta'}
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </CardHeader>

          <div className="space-y-8">
            <div className="bg-card/30 rounded-none p-8 border-l-4 border-accent/20">
              <p className="text-base md:text-lg lg:text-xl leading-relaxed font-scripture text-foreground/90 italic">
                {collect}
              </p>

              <div className="mt-8 pt-6 border-t border-accent/10">
                <p className="text-right text-[10px] uppercase tracking-[0.3em] font-bold text-accent/60 italic">
                  Por Jesus Cristo, nosso Senhor. Amém.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="classic-frame-footer" />
      </div>
    </div>
  );
}
