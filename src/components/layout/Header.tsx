import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, BookOpen } from 'lucide-react';
import type { LiturgicalDayInfo } from '@/types';
import liturgicalHero from '@/assets/liturgical-hero.jpg';

interface HeaderProps {
  liturgicalDay: LiturgicalDayInfo;
}

export function Header({ liturgicalDay }: HeaderProps) {
  // Parse date string correctly to avoid timezone issues
  // Add 'T00:00:00' to force local timezone interpretation
  const currentDate = parseISO(liturgicalDay.date + 'T00:00:00');
  
  return (
    <header className="relative bg-secondary border-b border-accent/20 shadow-2xl overflow-hidden pb-8 md:pb-12 pt-6 md:pt-10 texture-leather">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-laranja-queimado/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="container mx-auto px-3 md:px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          {/* Site Title */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-4 md:gap-6 group cursor-default">
              <div className="p-3 md:p-4 bg-bege-areia/10 backdrop-blur-md rounded-2xl shadow-xl border border-bege-areia/20 group-hover:scale-105 transition-transform duration-700">
                <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-dourado" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-bege-areia drop-shadow-2xl">
                  Lecionário
                </h1>
                <p className="text-[8px] md:text-[9px] lg:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] lg:tracking-[0.4em] font-bold text-dourado/80">
                  Tradição e Devoção
                </p>
              </div>
            </div>
          </div>

          {/* Date and Liturgical Info */}
          <div className="md:text-right space-y-4 md:space-y-6">
            <div className="inline-flex items-center md:justify-end gap-2 md:gap-3 px-4 md:px-6 py-1.5 md:py-2 bg-preto-ébano/30 backdrop-blur-md rounded-full border border-dourado/20">
              <Calendar className="w-3 h-3 md:w-4 md:h-4 text-dourado" />
              <time 
                dateTime={liturgicalDay.date}
                className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold text-bege-areia/90"
              >
                {format(currentDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
              </time>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display text-bege-areia italic drop-shadow-lg">
                {liturgicalDay.dayName}
              </h2>
              <div className="flex flex-wrap items-center md:justify-end gap-4 md:gap-6 text-[9px] md:text-[10px] uppercase font-bold tracking-[0.25em] md:tracking-[0.3em] text-dourado/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-liturgical-primary rounded-full shadow-[0_0_8px_hsl(var(--liturgical-primary))]" />
                  <span>Ano {liturgicalDay.cycle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-dourado/40 rounded-full" />
                  <span className="capitalize">
                    {(() => {
                      switch (liturgicalDay.season) {
                        case 'advent': return 'Advento';
                        case 'christmas': return 'Natal';
                        case 'epiphany': return 'Epifania';
                        case 'lent': return 'Quaresma';
                        case 'easter': return 'Páscoa';
                        case 'pentecost': return 'Pentecostes';
                        case 'ordinary': return 'Tempo Comum';
                        default: return liturgicalDay.season;
                      }
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}