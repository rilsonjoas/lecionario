import { Flame, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import type { DailyPrayer } from '@/types';

interface PrayerSectionProps {
  prayer: DailyPrayer;
}

export function PrayerSection({ prayer }: PrayerSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const parts = [prayer.title, prayer.text];
    if (prayer.author || prayer.source) {
      parts.push(
        `— ${prayer.author ?? ''}${prayer.author && prayer.source ? ' • ' : ''}${prayer.source ?? ''}`,
      );
    }
    await navigator.clipboard.writeText(parts.join('\n\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative animate-fade-in group">
      <div className="classic-frame bg-vinho border-dourado shadow-2xl texture-leather">
        <div className="relative z-10 border-b border-dourado/20 pb-10">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-dourado/40" />
            <div className="p-4 bg-laranja-queimado rounded-full shadow-liturgical group-hover:scale-110 transition-transform duration-1000">
              <Flame className="w-8 h-8 text-bege-areia" />
            </div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-dourado/40" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-display text-bege-areia tracking-tight">
              Oração do Dia
            </h2>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-dourado-texto">
              {prayer.title}
            </p>
          </div>
        </div>

        <div className="space-y-8 md:space-y-12 pt-8 md:pt-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-base md:text-lg lg:text-xl leading-relaxed font-scripture text-bege-areia italic text-center px-3 md:px-4 lg:px-16 drop-shadow-sm">
              {prayer.text}
            </blockquote>

            {(prayer.author || prayer.source) && (
              <div className="flex items-center justify-center gap-4 mt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-dourado-texto">
                <span className="w-10 h-px bg-dourado/20" />
                <span>
                  {prayer.author}
                  {prayer.author && prayer.source && ' • '}
                  {prayer.source}
                </span>
                <span className="w-10 h-px bg-dourado/20" />
              </div>
            )}
          </div>

          <div className="pt-10 text-center border-t border-dourado/10 space-y-4">
            {/* `shimmer-gold` era classe morta (não existia no CSS deste
                projeto, só na nota de identidade do vault) — removida.
                Cor trocada pra dourado-texto (achado 2026-08-15: dourado/40
                sobre vinho dava 2.79:1, reprovado). */}
            <p className="text-[10px] uppercase tracking-[0.5em] text-dourado-texto font-bold">
              "SURSUM CORDA — CORAÇÕES AO ALTO"
            </p>
            {/* Ação única por card, centrada no rodapé — mesmo padrão dos
                demais cards (backlog 2026-08-22: reduzir shares duplicados
                na home) */}
            <div className="flex justify-center">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-dourado-texto border border-dourado/20 rounded-md hover:bg-dourado/10 transition-colors"
                aria-label={copied ? 'Copiado' : 'Copiar oração'}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>
        <div className="classic-frame-footer" />
      </div>
    </div>
  );
}
