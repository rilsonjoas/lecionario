import Link from 'next/link';
import { Suspense } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import { seasonBrandColors } from '@/lib/theme';
import { ModeToggle } from '@/components/layout/ModeToggle';
import { TodayButton, todayKey } from '@/components/layout/TodayButton';
import type { LiturgicalDayInfo, LiturgicalSeason } from '@/types';

interface HeaderProps {
  liturgicalDay: LiturgicalDayInfo;
  season: LiturgicalSeason;
  /** 'full' (padrão): data + info litúrgica. 'minimal': só marca +
      tema — páginas institucionais (/apoiar, /privacidade), onde a
      data de hoje não agrega (apontamento do autor, 2026-08-22). */
  variant?: 'full' | 'minimal';
}

export function Header({ liturgicalDay, season, variant = 'full' }: HeaderProps) {
  const currentDate = parseISO(liturgicalDay.date + 'T00:00:00');
  const seasonBg = seasonBrandColors[season];
  const isMinimal = variant === 'minimal';

  return (
    <header
      className="relative border-b border-accent/20 shadow-2xl overflow-hidden pb-6 md:pb-10 pt-16 md:pt-14"
      style={{ backgroundColor: seasonBg }}
    >
      {/* Camada escura uniforme (2026-08-21): garante WCAG AA do texto
          creme sobre TODAS as estações — ouro natalino era 2.05:1 e azul
          advento 3.86:1 sem ela. Mesma matemática no mobile (HomeScreen),
          rgba(0,0,0,0.4) sobre seasonBrandColors */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-laranja-queimado/10 rounded-full blur-3xl animate-pulse" />

      {/* Tema claro/escuro — ponta superior direita SEMPRE (padrão
          Gerador C.S. Lewis), fora do fluxo: nenhum layout o desloca */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
        <ModeToggle />
      </div>

      <div className="container mx-auto px-3 md:px-4 relative z-10">
        {/* Desktop (2026-08-22, revertido a pedido do autor): volta ao
            clássico logo à esquerda + coluna de info fechando alinhada à
            direita (md:items-end). Mobile mantém o aprovado: marca e
            tema dividem a primeira linha. O truque é o wrapper do
            ModeToggle com md:contents — no desktop ele vira item direto
            do flex pai; no xs é uma linha própria à direita. */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
          {/* Site Title */}
          <div className="space-y-4 md:space-y-6">
            <Link
              href="/"
              className="flex items-center gap-4 md:gap-6 group"
              aria-label="Ir para a página inicial"
            >
              <div className="p-2 md:p-2.5 bg-creme rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-700">
                <img
                  src={`/icons/logo/season-${liturgicalDay.season}.png`}
                  alt="Logomarca Lecionário"
                  width={64}
                  height={64}
                  className="w-10 h-10 md:w-14 md:h-14"
                />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-bege-areia drop-shadow-2xl">
                  Lecionário
                </h1>
                <p className="text-[8px] md:text-[9px] lg:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] lg:tracking-[0.4em] font-bold text-dourado-texto">
                  Tradição e Devoção
                </p>
              </div>
            </Link>
          </div>

          {/* Date and Liturgical Info — some nas páginas institucionais:
              data ali é ruído (apontamento do autor, 2026-08-22) */}
          {!isMinimal && (
            <div className="order-2 md:order-none flex flex-col gap-3 md:gap-4 md:text-right space-y-3 md:space-y-4 md:block">
              <div className="inline-flex self-start md:self-end items-center gap-2 md:gap-3 px-4 md:px-6 py-1.5 md:py-2 bg-preto-ébano/30 backdrop-blur-md rounded-full border border-dourado/20">
                <Calendar className="w-3 h-3 md:w-4 md:h-4 text-dourado-texto" />
                <time
                  dateTime={liturgicalDay.date}
                  className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold text-bege-areia/90"
                >
                  {format(currentDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
                </time>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display text-bege-areia italic drop-shadow-lg">
                  {liturgicalDay.dayName}
                </h2>

                {/* Badges e HOJE na mesma linha (refino do autor):
                    hierarquia limpa nos dois breakpoints */}
                <div className="mt-2 md:mt-3 flex flex-wrap items-center justify-start md:justify-end gap-x-4 md:gap-x-6 gap-y-3 text-[9px] md:text-[10px] uppercase font-bold tracking-[0.25em] md:tracking-[0.3em] text-dourado-texto">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-liturgical-primary rounded-full shadow-[0_0_8px_hsl(var(--liturgical-primary))] transition-colors duration-700 ease-liturgico" />
                    <span>Ano {liturgicalDay.cycle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-dourado/40 rounded-full" />
                    <span className="capitalize">
                      {(() => {
                        switch (liturgicalDay.season) {
                          case 'advent':
                            return 'Advento';
                          case 'christmas':
                            return 'Natal';
                          case 'epiphany':
                            return 'Epifania';
                          case 'lent':
                            return 'Quaresma';
                          case 'easter':
                            return 'Páscoa';
                          case 'pentecost':
                            return 'Pentecostes';
                          case 'ordinary':
                            return 'Tempo Comum';
                          default:
                            return liturgicalDay.season;
                        }
                      })()}
                    </span>
                  </div>

                  {/* Cliente reativo: some sozinho quando a URL volta a
                      ser hoje; Suspense por usar useSearchParams */}
                  <Suspense fallback={null}>
                    <TodayButton todayStr={todayKey()} />
                  </Suspense>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
