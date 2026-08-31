import Link from 'next/link';
import { seasonBrandColors } from '@/lib/theme';
import type { LiturgicalSeason } from '@/types';

// Mesmo cluster de projetos linkado em ClusterFooter.tsx (Gerador C.S. Lewis),
// biblia-na-arte e scriptorium-divinum — ver ROADMAP 4.8.
const BIBLIOTECA_LINKS = [
  { label: 'Narniano', url: 'https://narniano.com' },
  { label: 'Bíblia na Arte', url: 'https://biblianaarte.narniano.com' },
  { label: 'Scriptorium Divinum', url: 'https://scriptorium.narniano.com' },
  { label: 'Gerador C.S. Lewis', url: 'https://cslewis.narniano.com' },
] as const;

export function Footer({ season = 'ordinary' }: { season?: LiturgicalSeason }) {
  const seasonBg = seasonBrandColors[season];

  return (
    <footer
      className="relative border-t border-accent/10 mt-16 texture-leather transition-colors duration-700"
      style={{ backgroundColor: seasonBg }}
    >
      {/* Camada escura uniforme (2026-08-21) — mesmo padrão do Header;
          sem ela, ouro natalino dava 2.05:1 com o texto creme */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] font-bold text-dourado-texto">
            <img
              src={`/icons/logo/season-${season}.png`}
              alt="Logomarca Lecionário"
              width={28}
              height={28}
              className="w-6 h-6 md:w-7 md:h-7 rounded bg-creme/90 p-0.5"
            />
            <span>Lecionário</span>
          </div>

          <p className="text-lg md:text-xl text-bege-areia/90 max-w-xl mx-auto font-scripture italic">
            "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho."
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dourado-texto">
            Salmo 119:105
          </p>

          {/* Mesma língua tipográfica do ClusterFooter do Gerador C.S.
              Lewis (backlog 2026-08-21): rótulo em caps espaçadas +
              pares atômicos ornamento+link, flex-wrap pra quebrar limpo
              em telas estreitas sem órfãos */}
          <div className="pt-8 border-t border-accent/10">
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-dourado-texto mb-3">
              Conheça também
            </span>
            <nav
              aria-label="Outros projetos do cluster A Biblioteca"
              className="flex flex-wrap items-baseline justify-center gap-y-2 max-w-md sm:max-w-none mx-auto text-xs text-bege-areia/80"
            >
              {BIBLIOTECA_LINKS.map((link, i) => (
                <span key={link.url} className="flex items-baseline whitespace-nowrap">
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-2.5 text-dourado/70">
                      ✦
                    </span>
                  )}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors underline-offset-2 hover:text-dourado hover:underline"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-accent/5 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-bege-areia/90">
              © {new Date().getFullYear()} — Tradição e Devoção
            </div>
            <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 text-xs text-bege-areia/60">
              {/* Contato oficial (P8, 2026-08-22): lecionario@narniano.com */}
              <a
                href="mailto:lecionario@narniano.com"
                className="transition-colors underline-offset-2 hover:text-dourado hover:underline"
                title="lecionario@narniano.com"
              >
                Contato
              </a>
              <span aria-hidden="true" className="text-dourado/50">
                ·
              </span>
              <Link
                href="/apoiar"
                className="transition-colors underline-offset-2 hover:text-dourado hover:underline"
              >
                Apoie o projeto
              </Link>
              <span aria-hidden="true" className="text-dourado/50">
                ·
              </span>
              <Link
                href="/privacidade"
                className="transition-colors underline-offset-2 hover:text-dourado hover:underline"
              >
                Política de Privacidade
              </Link>
              <span aria-hidden="true" className="text-dourado/50">
                ·
              </span>
              <Link
                href="/metodo"
                className="transition-colors underline-offset-2 hover:text-dourado hover:underline"
              >
                Método e fontes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
