import { Heart, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-primary/10 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <span>Baseado no Lecionário Comum Revisado</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Feito com</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>para a comunidade reformada</span>
          </div>
          
          <p className="text-xs text-muted-foreground max-w-md mx-auto font-scripture italic">
            "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho." - Salmo 119:105
          </p>
          
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Luz Litúrgica. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}