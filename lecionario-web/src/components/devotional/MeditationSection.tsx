'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Clock, Copy, Check } from 'lucide-react';
import { GlossaryTerm } from '@/components/devotional/GlossaryTerm';
import type { MeditationResource } from '@/types';

interface MeditationSectionProps {
  meditation: MeditationResource;
}

export function MeditationSection({ meditation }: MeditationSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    let textToCopy = `Meditação\n\n${meditation.prompt}`;
    if (meditation.questions && meditation.questions.length > 0) {
      textToCopy +=
        `\n\nPerguntas para Refletir:\n` +
        meditation.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    }
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative animate-slide-up group">
      <div className="classic-frame texture-paper border-accent/10 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl -mr-16 -mt-16 rounded-full" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-dourado/10 rounded-2xl shadow-sm text-vinho dark:text-[hsl(336,28%,78%)] group-hover:bg-dourado/20 transition-colors duration-500">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-display text-secondary italic">
                  Meditação
                </h3>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mt-1">
                  Reflexão e Interiorização
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {meditation.duration && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-2 border-accent/20 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-none"
                >
                  <Clock className="w-3 h-3 text-vinho dark:text-[hsl(336,28%,78%)]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                    {meditation.duration}
                  </span>
                </Badge>
              )}
              <button
                type="button"
                onClick={handleCopy}
                className="p-2 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                aria-label={copied ? 'Meditação copiada' : 'Copiar Meditação'}
                title={copied ? 'Copiado!' : 'Copiar Meditação'}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-10 pt-6 relative z-10">
          {/* Main Meditation Prompt — capitular iluminada (Design Narniano)
              substitui a aspas decorativa: é a técnica de manuscrito de
              verdade, não uma simulação */}
          <div className="relative">
            <p className="capitular text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 font-body text-justify px-2">
              {meditation.prompt}
            </p>
          </div>

          {/* Meditation Questions */}
          {meditation.questions && meditation.questions.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <GlossaryTerm term="perguntas" />
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                  Perguntas para Refletir
                </h4>
              </div>

              <div className="grid gap-6">
                {meditation.questions.map((question, index) => (
                  <div
                    key={question}
                    className="group/q flex gap-6 p-6 bg-bege-areia/20 hover:bg-bege-areia/40 rounded-none border-l-2 border-accent/20 transition-all duration-300"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-vinho/5 text-secondary rounded-full flex items-center justify-center text-xs font-display italic border border-accent/10 group-hover/q:scale-110 transition-transform">
                      {index + 1}
                    </span>
                    <p className="text-base md:text-lg text-foreground/80 font-body leading-relaxed pt-1">
                      {question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audio Player (if available) */}
          {meditation.audioUrl && (
            <div className="p-8 bg-preto-ébano/5 rounded-none border border-accent/10">
              <h5 className="text-[9px] uppercase tracking-[0.4em] font-bold text-secondary mb-6 text-center">
                Meditação Guiada
              </h5>
              <audio controls className="w-full h-10 filter sepia-[.3]" preload="metadata">
                <source src={meditation.audioUrl} type="audio/mpeg" />
              </audio>
            </div>
          )}

          <div className="text-center pt-8 border-t border-accent/10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 font-bold italic">
              "Aquietai-vos e sabei que eu sou Deus"
            </p>
          </div>
        </div>
        <div className="classic-frame-footer" />
      </div>
    </div>
  );
}
