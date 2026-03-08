import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown } from 'lucide-react';

interface CollectSectionProps {
  collect: string;
}

export function CollectSection({ collect }: CollectSectionProps) {
  return (
    <div className="relative animate-scale-in group overflow-hidden">
      <div className="classic-frame texture-parchment border-accent/20 shadow-lg !m-0">
        <div className="relative z-10">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-dourado/10 rounded-2xl shadow-sm text-dourado group-hover:scale-110 transition-transform duration-500">
                <Crown className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-xl md:text-2xl font-display text-secondary italic">
                  Oração de Coleta
                </CardTitle>
                <CardDescription className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                  Oração Tradicional da Liturgia
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <div className="space-y-8">
            <div className="bg-card/30 rounded-none p-8 border-l-4 border-accent/20">
              <p className="text-xl md:text-2xl leading-relaxed font-scripture text-foreground/90 italic">
                {collect}
              </p>
              
              <div className="mt-8 pt-6 border-t border-accent/10">
                <p className="text-right text-[10px] uppercase tracking-[0.3em] font-bold text-accent/60 italic">
                  Por Jesus Cristo, nosso Senhor. Amém.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="classic-frame-footer" />
      </div>
    </div>
  );
}