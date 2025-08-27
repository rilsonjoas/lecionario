import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, Flame, User } from 'lucide-react';
import { useState } from 'react';
import type { DailyPrayer } from '@/types';

interface PrayerSectionProps {
  prayer: DailyPrayer;
}

export function PrayerSection({ prayer }: PrayerSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Card className="bg-liturgical-radial border-primary/20 shadow-card-custom animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-liturgical-primary rounded-lg shadow-sm">
            <Flame className="w-5 h-5 text-liturgical-primary-foreground" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-serif text-card-foreground">
              Oração do Dia
            </CardTitle>
            <CardDescription className="text-sm font-sans text-muted-foreground">
              {prayer.title}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-0 h-auto text-left hover:bg-transparent group"
            >
              <span className="text-sm text-card-foreground/70 font-sans">
                {isOpen ? 'Ocultar oração' : 'Mostrar oração completa'}
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4">
            <div className="pt-4">
              <blockquote className="text-base leading-relaxed font-serif text-card-foreground bg-liturgical-secondary/30 rounded-lg p-6 border-l-4 border-liturgical-accent">
                {prayer.text}
              </blockquote>
              
              {(prayer.author || prayer.source) && (
                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground font-sans">
                  <User className="w-3 h-3" />
                  <span>
                    {prayer.author}
                    {prayer.author && prayer.source && ' • '}
                    {prayer.source}
                  </span>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-sans italic">
            "Oremos com coração sincero e espírito humilde"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}