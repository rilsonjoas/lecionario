import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollText, BookOpen, Music, Cross, Copy, Check } from 'lucide-react';
import type { Reading } from '@/types';

interface ReadingCardProps {
  reading: Reading;
  index: number;
}

// Design Narniano: duration-700 ease-liturgico substitui o timing padrão
// do Tailwind (150ms, cubic-bezier(0.4,0,0.2,1)) especificamente pra troca
// de estação litúrgica — mais lento e deliberado, não bounce/spring. Ver
// `transitionTimingFunction.liturgico` em tailwind.config.ts.
const readingTypeConfig = {
  first_reading: {
    label: 'Primeira Leitura',
    icon: BookOpen,
    color:
      'bg-liturgical-primary text-liturgical-primary-foreground hover:bg-liturgical-primary/90 transition-colors duration-700 ease-liturgico',
  },
  // Achado real (2026-08-16): coração pra Salmo e estrela pra Evangelho
  // não comunicavam nada específico — trocado por música (Salmos eram
  // cantados) e cruz (o centro do Evangelho)
  psalm: {
    label: 'Salmo',
    icon: Music,
    color:
      'bg-liturgical-accent text-liturgical-accent-foreground hover:bg-liturgical-accent/90 transition-colors duration-700 ease-liturgico',
  },
  second_reading: {
    label: 'Segunda Leitura',
    icon: ScrollText,
    color:
      'bg-liturgical-secondary text-liturgical-secondary-foreground hover:bg-liturgical-secondary/90 transition-colors duration-700 ease-liturgico',
  },
  gospel: {
    label: 'Evangelho',
    icon: Cross,
    // Achado real (2026-08-16): `text-white` fixo aqui tinha o mesmo bug
    // de contraste já corrigido nos outros badges — Natal/Páscoa (dourado)
    // reprovava. Trocado pro foreground adaptativo por estação.
    color:
      'bg-gradient-to-r from-liturgical-primary to-liturgical-accent text-liturgical-primary-foreground hover:from-liturgical-primary/90 hover:to-liturgical-accent/90 transition-all duration-700 ease-liturgico',
  },
};

export function ReadingCard({ reading, index }: ReadingCardProps) {
  const config = readingTypeConfig[reading.type];
  const IconComponent = config.icon;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `${reading.reference}\n${reading.citation}\n\n${reading.text ?? ''}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
      <div className="classic-frame texture-parchment shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 !m-0 overflow-hidden">
        {/* Liturgical accent bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-liturgical-primary opacity-60 transition-colors duration-700 ease-liturgico" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-display text-secondary group-hover:text-primary transition-colors italic">
                {reading.reference}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mt-1">
                {reading.citation}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-accent/10 text-accent border border-accent/20 hover:bg-accent/15 hover:border-accent/30 transition-colors shadow-none px-3 py-1 rounded-none flex items-center gap-2">
                <IconComponent className="w-3 h-3" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold">
                  {config.label}
                </span>
              </Badge>
            </div>
          </div>

          {reading.text && (
            <div className="relative py-3 md:py-4">
              <div className="absolute top-0 left-0 w-8 h-px bg-accent/30" />
              <p className="text-sm md:text-base lg:text-lg leading-relaxed font-scripture text-foreground/90 pl-3 md:pl-4 border-l-2 border-accent/20">
                {reading.text}
              </p>
              {/* Ação única por card, centrada no rodapé — mesmo padrão
                  do card de Oração (backlog 2026-08-22: reduzir shares
                  duplicados na home) */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                  aria-label={copied ? 'Copiado' : 'Copiar leitura'}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {reading.sourceUrl && (
            <div className="mt-8 flex justify-end">
              <a
                href={reading.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] uppercase tracking-[0.3em] font-bold text-canela dark:text-[hsl(25,40%,72%)] hover:text-laranja-queimado transition-colors flex items-center gap-2 group/link"
              >
                Scriptura Integra
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          )}
        </div>
        <div className="classic-frame-footer" />
      </div>
    </div>
  );
}
