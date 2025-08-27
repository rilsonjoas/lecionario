import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, BookOpen } from 'lucide-react';
import type { LiturgicalDayInfo } from '@/types';
import liturgicalHero from '@/assets/liturgical-hero.jpg';

interface HeaderProps {
  liturgicalDay: LiturgicalDayInfo;
}

export function Header({ liturgicalDay }: HeaderProps) {
  const currentDate = new Date(liturgicalDay.date);
  
  return (
    <header className="relative bg-liturgical-gradient border-b border-primary/10 shadow-liturgical overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${liturgicalHero})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-liturgical-primary/80 to-liturgical-accent/60" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Site Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 backdrop-blur-sm rounded-lg shadow-md border border-primary-foreground/20">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-primary-foreground drop-shadow-md">
                Luz Litúrgica
              </h1>
              <p className="text-sm text-primary-foreground/90 font-sans">
                Devocional diário reformado
              </p>
            </div>
          </div>

          {/* Date and Liturgical Info */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 mb-1">
              <Calendar className="w-4 h-4 text-primary-foreground/80" />
              <time 
                dateTime={liturgicalDay.date}
                className="text-sm font-medium text-primary-foreground/95 font-sans"
              >
                {format(currentDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </time>
            </div>
            
            <div className="space-y-1">
              <p className="text-lg font-serif font-medium text-primary-foreground drop-shadow-sm">
                {liturgicalDay.dayName}
              </p>
              <div className="flex items-center justify-end gap-3 text-xs text-primary-foreground/80 font-sans">
                <span>Ano {liturgicalDay.cycle}</span>
                <span className="w-1 h-1 bg-primary-foreground/60 rounded-full"></span>
                <span className="capitalize">{liturgicalDay.season}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}