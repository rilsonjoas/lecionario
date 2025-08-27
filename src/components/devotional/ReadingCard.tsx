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
    color: 'bg-liturgical-primary text-liturgical-primary-foreground'
  },
  psalm: {
    label: 'Salmo',
    icon: Heart,
    color: 'bg-liturgical-accent text-liturgical-accent-foreground'
  },
  second_reading: {
    label: 'Segunda Leitura',
    icon: ScrollText,
    color: 'bg-liturgical-secondary text-liturgical-secondary-foreground'
  },
  gospel: {
    label: 'Evangelho',
    icon: Sparkles,
    color: 'bg-gradient-to-r from-liturgical-primary to-liturgical-accent text-white'
  }
};

export function ReadingCard({ reading, index }: ReadingCardProps) {
  const config = readingTypeConfig[reading.type];
  const IconComponent = config.icon;
  
  return (
    <Card 
      className="group hover:shadow-elevated transition-all duration-300 animate-fade-in border-primary/20 bg-card/80 backdrop-blur-sm"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg font-serif text-card-foreground">
              {reading.reference}
            </CardTitle>
            <CardDescription className="text-sm font-sans text-muted-foreground">
              {reading.citation}
            </CardDescription>
          </div>
          
          <Badge className={`${config.color} shadow-sm flex items-center gap-1.5 px-3 py-1`}>
            <IconComponent className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{config.label}</span>
          </Badge>
        </div>
      </CardHeader>
      
      {reading.text && (
        <CardContent className="pt-0">
          <blockquote className="text-sm leading-relaxed font-serif text-card-foreground/90 italic border-l-4 border-liturgical-accent pl-4 bg-liturgical-secondary/20 rounded-r-md p-4">
            "{reading.text}"
          </blockquote>
          
          {reading.sourceUrl && (
            <div className="mt-4">
              <a
                href={reading.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-liturgical-primary hover:text-liturgical-accent transition-colors underline font-sans"
              >
                Ler texto completo →
              </a>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}