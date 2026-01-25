import { Flame } from 'lucide-react';
import { useState } from 'react';
import type { DailyPrayer } from '@/types';

interface PrayerSectionProps {
  prayer: DailyPrayer;
}

export function PrayerSection({ prayer }: PrayerSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  
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
            <h2 className="text-3xl md:text-5xl font-display text-bege-areia tracking-tight">
              Oração do Dia
            </h2>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-dourado">
              {prayer.title}
            </p>
          </div>
        </div>
        
        <div className="space-y-8 md:space-y-12 pt-8 md:pt-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-base md:text-lg lg:text-2xl xl:text-3xl leading-relaxed font-scripture text-bege-areia italic text-center px-3 md:px-4 lg:px-16 drop-shadow-sm">
              {prayer.text}
            </blockquote>
            
            {(prayer.author || prayer.source) && (
              <div className="flex items-center justify-center gap-4 mt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-dourado/60">
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
          
          <div className="pt-10 text-center border-t border-dourado/10">
            <p className="text-[10px] uppercase tracking-[0.5em] text-dourado/40 font-bold shimmer-gold">
              "SURSUM CORDA — CORAÇÕES AO ALTO"
            </p>
          </div>
        </div>
        <div className="classic-frame-footer" />
      </div>
    </div>
  );
}