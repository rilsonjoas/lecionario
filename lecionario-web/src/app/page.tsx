'use client';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { format, addDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarCheck, ChevronLeft, ChevronRight, Heart, Share2, Check } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReadingCard } from '@/components/devotional/ReadingCard';
import { PrayerSection } from '@/components/devotional/PrayerSection';
import { MeditationSection } from '@/components/devotional/MeditationSection';
import { CollectSection } from '@/components/devotional/CollectSection';
import { LewisQuoteSection } from '@/components/devotional/LewisQuoteSection';
import { GlossaryTerm } from '@/components/devotional/GlossaryTerm';
import { DatePicker } from '@/components/layout/DatePicker';
import { getSampleDevotional } from '@/data/sample-devotional';
import { applySeasonTheme, applySeasonBranding } from '@/lib/theme';
import type { DailyDevotional } from '@/types';

interface DateSyncProps {
  onDateChange: (date: Date) => void;
}

function DateSync({ onDateChange }: DateSyncProps) {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  useEffect(() => {
    if (dateParam) {
      try {
        const parsedDate = parseISO(dateParam);
        onDateChange(parsedDate);
      } catch (e) {
        console.error('Invalid date param', e);
      }
    }
  }, [dateParam, onDateChange]);

  return null;
}

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get date from URL or default to today
  const dateParam = searchParams.get('date');
  const [currentDate, setCurrentDate] = useState<Date>(
    dateParam ? parseISO(dateParam) : new Date(),
  );

  const [devotional, setDevotional] = useState<DailyDevotional | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isToday = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  useEffect(() => {
    // getSampleDevotional é síncrona (lê dados já bundlados, sem I/O) —
    // não precisa de async/await; achado ao auditar o ROADMAP contra o
    // código real (2026-08-19).
    setError(null);
    setDevotional(null);
    try {
      const data = getSampleDevotional(currentDate);
      setDevotional(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar devocional';
      console.error('Erro ao carregar devocional:', err);
      setError(message);
    }
  }, [currentDate]);

  useEffect(() => {
    if (devotional) {
      applySeasonTheme(devotional.liturgicalInfo.season);
      applySeasonBranding(devotional.liturgicalInfo.season);
    }
  }, [devotional]);

  // Pre-fetch adjacent dates to speed up navigation and enable offline date shifting
  useEffect(() => {
    const prevDateStr = format(addDays(currentDate, -1), 'yyyy-MM-dd');
    const nextDateStr = format(addDays(currentDate, 1), 'yyyy-MM-dd');
    router.prefetch(`/?date=${prevDateStr}`);
    router.prefetch(`/?date=${nextDateStr}`);
  }, [currentDate, router]);

  // Trocar de dia (Anterior/Próximo/Calendário/DateSync) volta ao topo da
  // página — o router.push usa { scroll: false } pra não conflitar com a
  // barra sticky, então o reset precisa ser manual (report 2026-08-22)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentDate]);

  // Sync state with URL when date changes
  const handleDateChange = (newDate: Date) => {
    const dateStr = format(newDate, 'yyyy-MM-dd');
    setCurrentDate(newDate);
    router.push(`/?date=${dateStr}`, { scroll: false });
  };

  const [shared, setShared] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const dateKey = format(currentDate, 'yyyy-MM-dd');
  const favorited = isFavorite(dateKey);
  const handleShareDay = async () => {
    if (!devotional) return;
    const d = devotional;
    const lines = [
      `${d.liturgicalInfo.dayName}`,
      `${format(currentDate, "EEEE, d 'de' MMMM", { locale: ptBR })} — Ano ${d.liturgicalInfo.cycle}`,
      '',
      ...d.readings.map((r) => `${r.reference} (${r.citation})`),
      '',
      d.collect ? `Coleta: ${d.collect}` : '',
      `Meditação: ${d.meditation.prompt}`,
      '',
      '— Lecionário Comum Revisado',
    ];
    const text = lines.filter(Boolean).join('\n');
    if (navigator.share) {
      await navigator.share({ title: d.liturgicalInfo.dayName, text });
    } else {
      await navigator.clipboard.writeText(text);
    }
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-accent text-6xl">⛪</div>
          <h1 className="text-3xl font-display text-secondary">Não foi possível carregar</h1>
          <p className="text-foreground/70 font-body leading-relaxed text-sm">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  if (!devotional) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-secondary font-display text-xl">Carregando devocional...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DateSync onDateChange={setCurrentDate} />
      <div className="min-h-screen bg-background transition-all duration-700">
        <Header
          liturgicalDay={devotional.liturgicalInfo}
          season={devotional.liturgicalInfo.season}
        />

        {/* Navigation Controls */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-accent/10 py-3 md:py-4 shadow-sm">
          <div className="container mx-auto px-3 md:px-4 flex items-center justify-between max-w-4xl">
            {/* Achado 2026-08-15: `hidden sm:inline` remove o texto da
                árvore de acessibilidade também, não só visualmente — no
                mobile (onde a maioria acessa) esses 3 botões viravam
                ícone puro sem nome nenhum pra leitor de tela.
                `aria-label` explícito corrige, independente de breakpoint. */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDateChange(addDays(currentDate, -1))}
              className="text-secondary hover:text-primary transition-colors gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4"
              aria-label="Dia anterior"
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Dia Anterior</span>
            </Button>

            <div className="flex flex-col items-center gap-0.5">
              <DatePicker date={currentDate} onDateChange={handleDateChange} />
              {/* Ação de navegação vive junto da data — link discreto,
                  sem borda (decisão UX 2026-08-21); some quando já está
                  em hoje */}
              {!isToday && (
                <button
                  onClick={() => handleDateChange(new Date())}
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-bold text-accent hover:text-primary transition-colors cursor-pointer"
                  aria-label="Voltar para hoje"
                >
                  <CalendarCheck className="w-3 h-3" />
                  Voltar para hoje
                </button>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDateChange(addDays(currentDate, 1))}
              className="text-secondary hover:text-primary transition-colors gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4"
              aria-label="Próximo dia"
            >
              <span className="hidden sm:inline">Próximo Dia</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>

        <main className="container mx-auto px-3 md:px-4 py-8 md:py-12 max-w-6xl">
          <div className="space-y-10 md:space-y-14">
            {/* Welcome Section */}
            <section className="text-center space-y-4 md:space-y-6 animate-fade-in px-3 md:px-4">
              <div className="flex justify-center mb-3 md:mb-4">
                <span className="text-accent text-xl md:text-2xl">✦ ✧ ✦</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display text-secondary tracking-tight">
                A Liturgia como Tradição
              </h2>
              <p className="text-foreground/70 max-w-3xl mx-auto text-base md:text-xl leading-relaxed italic font-body">
                Conecte-se com a herança cristã através das leituras diárias. Um convite à devoção e
                ao silêncio através da Palavra.
              </p>
              <div className="divider-ornate">
                <span className="divider-line"></span>
                <span className="text-accent">❖</span>
                <span className="divider-line"></span>
              </div>

              <div className="flex items-center justify-center gap-2">
                {/* Favoritos no web (backlog 2026-08-21) — paridade com o
                    mobile: coração do dia, persistido em localStorage */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(dateKey)}
                  className="text-muted-foreground hover:text-accent transition-colors gap-2 text-xs"
                  aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  <Heart
                    className={favorited ? 'w-3.5 h-3.5 fill-red-600 text-red-600' : 'w-3.5 h-3.5'}
                  />
                  {favorited ? 'Favoritado' : 'Favoritar este dia'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShareDay}
                  className="text-muted-foreground hover:text-accent transition-colors gap-2 text-xs"
                  aria-label={shared ? 'Dia copiado' : 'Compartilhar dia'}
                >
                  {shared ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  {shared ? 'Copiado!' : 'Compartilhar este dia'}
                </Button>
              </div>
            </section>

            {/* Dias favoritados — chips clicáveis, mais recente primeiro.
                Só aparece quando existe pelo menos um favorito */}
            {favorites.length > 0 && (
              <section className="text-center space-y-3 px-4 animate-fade-in">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                  Dias Favoritados
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                  {[...favorites]
                    .sort((a, b) => b.localeCompare(a))
                    .map((favDate) => (
                      <button
                        key={favDate}
                        onClick={() => handleDateChange(parseISO(favDate))}
                        className={`text-xs border rounded-full px-3 py-1 transition-colors ${
                          favDate === dateKey
                            ? 'border-accent bg-accent/15 text-secondary'
                            : 'border-accent/30 hover:bg-accent/10'
                        }`}
                        aria-label={`Ir para ${format(parseISO(favDate), "d 'de' MMMM", {
                          locale: ptBR,
                        })}`}
                      >
                        {format(parseISO(favDate), 'd MMM', { locale: ptBR })}
                      </button>
                    ))}
                </div>
              </section>
            )}

            {/* Oração de Coleta */}
            {devotional.collect && (
              <section className="animate-fade-in md:max-w-4xl mx-auto w-full">
                <ErrorBoundary name="Coleta">
                  <CollectSection collect={devotional.collect} />
                </ErrorBoundary>
              </section>
            )}

            {/* Daily Readings */}
            <section className="space-y-8 md:space-y-12 md:max-w-4xl mx-auto w-full">
              <div className="text-center space-y-3 md:space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-2xl md:text-3xl font-display text-secondary italic">
                    Lectio Divina
                  </h3>
                  <GlossaryTerm term="lectio" />
                </div>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] font-bold text-muted-foreground">
                  Ano Litúrgico {devotional.liturgicalInfo.cycle} • {devotional.readings.length}{' '}
                  Estações da Palavra
                </p>
              </div>

              <div className="grid gap-8 md:gap-12">
                <ErrorBoundary name="Leituras">
                  {devotional.readings.map((reading, index) => (
                    <ReadingCard
                      key={`${reading.type}-${reading.reference}`}
                      reading={reading}
                      index={index}
                    />
                  ))}
                </ErrorBoundary>
              </div>
            </section>

            {/* Prayer Section */}
            <section className="animate-fade-in md:max-w-4xl mx-auto w-full">
              <ErrorBoundary name="Oração">
                <PrayerSection prayer={devotional.prayer} />
              </ErrorBoundary>
            </section>

            {/* Meditation Section */}
            <section className="animate-fade-in md:max-w-4xl mx-auto w-full">
              <ErrorBoundary name="Meditação">
                <MeditationSection meditation={devotional.meditation} />
              </ErrorBoundary>
            </section>

            {/* Inspiration Quote */}
            <section className="text-center py-16 animate-fade-in border-t border-accent/10">
              <blockquote className="text-lg md:text-xl lg:text-2xl font-display italic text-secondary max-w-4xl mx-auto leading-relaxed px-4">
                "Toda Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a
                correção, para a educação na justiça, a fim de que o homem de Deus seja perfeito e
                perfeitamente habilitado para toda boa obra."
              </blockquote>
              <cite className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-accent mt-8 block">
                — II Timóteo III:16-17
              </cite>
            </section>

            {/* Citação diária de C.S. Lewis (paridade com o mobile) */}
            <LewisQuoteSection date={currentDate} />
          </div>
        </main>

        <Footer season={devotional.liturgicalInfo.season} />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background animate-pulse" />}>
      <HomeContent />
    </Suspense>
  );
}
