import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown } from 'lucide-react';

interface CollectSectionProps {
  collect: string;
}

export function CollectSection({ collect }: CollectSectionProps) {
  return (
    <Card className="bg-gradient-to-r from-liturgical-primary/10 to-liturgical-accent/10 border-primary/20 shadow-card-custom animate-scale-in">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-liturgical-primary rounded-lg shadow-sm">
            <Crown className="w-5 h-5 text-liturgical-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-lg font-serif text-card-foreground">
              Coleta do Dia
            </CardTitle>
            <CardDescription className="text-sm font-sans text-muted-foreground">
              Oração tradicional da liturgia
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="bg-card/60 rounded-lg p-4 border border-primary/10">
          <p className="text-sm leading-relaxed font-serif text-card-foreground italic">
            {collect}
          </p>
          
          <div className="mt-4 pt-4 border-t border-primary/10">
            <p className="text-right text-xs text-muted-foreground font-sans">
              Por Jesus Cristo, nosso Senhor. Amém.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}