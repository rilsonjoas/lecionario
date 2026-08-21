import { Home, Palette, Library, Quote } from 'lucide-react';
import { seasonBrandColors } from '@/lib/theme';
import type { LiturgicalSeason } from '@/types';

const BIBLIOTECA_LINKS = [
  {
    label: 'Narniano',
    description: 'A casa de todos os projetos',
    url: 'https://narniano.com',
    icon: Home,
  },
  {
    label: 'Bíblia na Arte',
    description: 'Obras de arte inspiradas nas Escrituras',
    url: 'https://biblianaarte.narniano.com',
    icon: Palette,
  },
  {
    label: 'Scriptorium Divinum',
    description: 'Clássicos da teologia cristã em português',
    url: 'https://scriptorium.narniano.com',
    icon: Library,
  },
  {
    label: 'Gerador C.S. Lewis',
    description: 'Citações inspiradoras de C.S. Lewis',
    url: 'https://gerador-cs-lewis.vercel.app',
    icon: Quote,
  },
] as const;

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

          <div className="pt-8 border-t border-accent/5 space-y-6">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-dourado-texto">
              A Biblioteca
            </div>
            <p className="text-xs text-bege-areia/70 max-w-md mx-auto">
              Parte de um ecossistema de projetos dedicados à teologia, à literatura e à devoção
              cristã.
            </p>
            <nav
              aria-label="Outros projetos da Biblioteca"
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-left"
            >
              {BIBLIOTECA_LINKS.map(({ label, description, url, icon: Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1.5 rounded-lg p-3 transition-colors hover:bg-bege-areia/5"
                >
                  <Icon className="w-4 h-4 text-dourado-texto" aria-hidden="true" />
                  <span className="text-xs font-bold text-bege-areia/90 group-hover:text-dourado-texto transition-colors">
                    {label}
                  </span>
                  <span className="text-[11px] text-bege-areia/60 leading-snug">{description}</span>
                </a>
              ))}
            </nav>
          </div>

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
