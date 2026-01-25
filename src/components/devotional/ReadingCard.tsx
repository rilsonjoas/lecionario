import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollText, BookOpen, Heart, Sparkles } from 'lucide-react';
import type { Reading } from '@/types';

interface ReadingCardProps {
  reading: Reading;
  index: number;
}

const readingTypeConfig = {
  first_reading: {
    label: 'Primeira Leitura',
    icon: BookOpen,
    color: 'bg-liturgical-primary text-liturgical-primary-foreground hover:bg-liturgical-primary/90 transition-colors'
  },
  psalm: {
    label: 'Salmo',
    icon: Heart,
    color: 'bg-liturgical-accent text-liturgical-accent-foreground hover:bg-liturgical-accent/90 transition-colors'
  },
  second_reading: {
    label: 'Segunda Leitura',
    icon: ScrollText,
    color: 'bg-liturgical-secondary text-liturgical-secondary-foreground hover:bg-liturgical-secondary/90 transition-colors'
  },
  gospel: {
    label: 'Evangelho',
    icon: Sparkles,
    color: 'bg-gradient-to-r from-liturgical-primary to-liturgical-accent text-white hover:from-liturgical-primary/90 hover:to-liturgical-accent/90 transition-all'
  }
};

export function ReadingCard({ reading, index }: ReadingCardProps) {
  const config = readingTypeConfig[reading.type];
  const IconComponent = config.icon;
  
  return (
    <div 
      className="group relative animate-fade-in"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="classic-frame texture-parchment shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 !m-0 overflow-hidden">
        {/* Liturgical accent bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-liturgical-primary opacity-60" />
        
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
            
            <Badge className="bg-accent/10 text-accent border border-accent/20 hover:bg-accent/15 hover:border-accent/30 transition-colors shadow-none px-3 py-1 rounded-none flex items-center gap-2">
              <IconComponent className="w-3 h-3" />
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold">{config.label}</span>
            </Badge>
          </div>
          
          {reading.text && (
            <div className="relative py-3 md:py-4">
              <div className="absolute top-0 left-0 w-8 h-px bg-accent/30" />
              <p className="text-sm md:text-base lg:text-lg leading-relaxed font-scripture text-foreground/90 pl-3 md:pl-4 border-l-2 border-accent/20">
                {reading.text}
              </p>
              <div className="absolute bottom-0 right-0 w-8 h-px bg-accent/30" />
            </div>
          )}
          
          {reading.sourceUrl && (
            <div className="mt-8 flex justify-end">
              <a
                href={reading.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] uppercase tracking-[0.3em] font-bold text-canela hover:text-laranja-queimado transition-colors flex items-center gap-2 group/link"
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