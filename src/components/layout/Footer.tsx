import { Heart, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-accent/10 mt-16 texture-leather">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] font-bold text-dourado/60">
            <BookOpen className="w-4 h-4" />
            <span>Lecionário Comum Revisado</span>
          </div>
                    
          <p className="text-lg md:text-xl text-bege-areia/80 max-w-xl mx-auto font-scripture italic">
            "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho."
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dourado/40">
            Salmo 119:105
          </p>
          
          <div className="pt-8 border-t border-accent/5">
            <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-bege-areia/40">
              © {new Date().getFullYear()} — Tradição e Devoção
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}