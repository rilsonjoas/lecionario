import { Heart } from 'lucide-react';
import { seasonBrandColors } from '@/lib/theme';
import type { LiturgicalSeason } from '@/types';

export function Footer({ season = 'ordinary' }: { season?: LiturgicalSeason }) {
  const seasonBg = seasonBrandColors[season];

  return (
    <footer
      className="border-t border-accent/10 mt-16 texture-leather transition-colors duration-700"
      style={{ backgroundColor: seasonBg }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] font-bold text-dourado-texto">
            <img
              src={`/icons/logo/season-${season}.png`}
              alt="Logomarca Lecionário"
              width={28}
              height={28}
              className="w-6 h-6 md:w-7 md:h-7 rounded bg-creme/90 p-0.5"
            />
            <span>Lecionário Comum Revisado</span>
          </div>

          <p className="text-lg md:text-xl text-bege-areia/90 max-w-xl mx-auto font-scripture italic">
            "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho."
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dourado-texto">
            Salmo 119:105
          </p>

          <div className="pt-8 border-t border-accent/5">
            <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-bege-areia/90">
              © {new Date().getFullYear()} — Tradição e Devoção
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
