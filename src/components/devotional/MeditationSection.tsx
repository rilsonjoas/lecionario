import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Clock, HelpCircle } from 'lucide-react';
import type { MeditationResource } from '@/types';

interface MeditationSectionProps {
  meditation: MeditationResource;
}

export function MeditationSection({ meditation }: MeditationSectionProps) {
  return (
    <Card className="bg-gradient-to-br from-liturgical-secondary/20 to-liturgical-accent/10 border-primary/20 shadow-card-custom animate-slide-up">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-liturgical-accent rounded-lg shadow-sm">
              <Lightbulb className="w-5 h-5 text-liturgical-accent-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl font-serif text-card-foreground">
                Meditação
              </CardTitle>
              <CardDescription className="text-sm font-sans text-muted-foreground">
                Reflexão para o dia
              </CardDescription>
            </div>
          </div>
          
          {meditation.duration && (
            <Badge variant="secondary" className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{meditation.duration}</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Meditation Prompt */}
        <div className="space-y-3">
          <h4 className="font-semibold text-card-foreground font-serif">
            Reflexão do Dia
          </h4>
          <p className="text-sm leading-relaxed text-card-foreground/90 font-serif bg-card/50 rounded-lg p-4 border border-primary/10">
            {meditation.prompt}
          </p>
        </div>
        
        {/* Meditation Questions */}
        {meditation.questions && meditation.questions.length > 0 && (
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="questions" className="border border-primary/10 rounded-lg bg-card/30">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                  <HelpCircle className="w-4 h-4 text-liturgical-accent" />
                  <span>Perguntas para reflexão ({meditation.questions.length})</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3">
                  {meditation.questions.map((question, index) => (
                    <div 
                      key={index}
                      className="flex gap-3 p-3 bg-liturgical-secondary/20 rounded-md border-l-3 border-liturgical-accent"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-liturgical-accent text-liturgical-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <p className="text-sm text-card-foreground font-serif leading-relaxed">
                        {question}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        
        {/* Audio Player (if available) */}
        {meditation.audioUrl && (
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-card-foreground font-sans">
              Áudio de Meditação Guiada
            </h5>
            <audio 
              controls 
              className="w-full h-10 bg-liturgical-secondary/30 rounded-lg"
              preload="metadata"
            >
              <source src={meditation.audioUrl} type="audio/mpeg" />
              Seu navegador não suporta o elemento de áudio.
            </audio>
          </div>
        )}
        
        <div className="text-center pt-4 border-t border-primary/10">
          <p className="text-xs text-muted-foreground font-sans italic">
            "Seja ainda, e saiba que eu sou Deus" - Salmo 46:10
          </p>
        </div>
      </CardContent>
    </Card>
  );
}