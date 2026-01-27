"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { format, addDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReadingCard } from '@/components/devotional/ReadingCard';
import { PrayerSection } from '@/components/devotional/PrayerSection';
import { MeditationSection } from '@/components/devotional/MeditationSection';
import { CollectSection } from '@/components/devotional/CollectSection';
import { DatePicker } from '@/components/layout/DatePicker';
import { getSampleDevotional } from '@/data/sample-devotional';
import { applySeasonTheme } from '@/lib/theme';
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
        console.error("Invalid date param", e);
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
    dateParam ? parseISO(dateParam) : new Date()
  );

  const [devotional, setDevotional] = useState<DailyDevotional | null>(null);
  
  useEffect(() => {
    async function loadDevotional() {
      const data = await getSampleDevotional(currentDate);
      setDevotional(data);
    }
    loadDevotional();
  }, [currentDate]);
  
  useEffect(() => {
    if (devotional) {
      applySeasonTheme(devotional.liturgicalInfo.season);
    }
  }, [devotional]);

  // Sync state with URL when date changes
  const handleDateChange = (newDate: Date) => {
    const dateStr = format(newDate, 'yyyy-MM-dd');
    setCurrentDate(newDate);
    router.push(`/?date=${dateStr}`, { scroll: false });
  };

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
      <Header liturgicalDay={devotional.liturgicalInfo} />
      
      {/* Navigation Controls */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-accent/10 py-3 md:py-4 shadow-sm">
        <div className="container mx-auto px-3 md:px-4 flex items-center justify-between max-w-4xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleDateChange(addDays(currentDate, -1))}
            className="text-secondary hover:text-primary transition-colors gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4"
          >
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Dia Anterior</span>
          </Button>

          <div className="flex flex-col items-center">
             <DatePicker date={currentDate} onDateChange={handleDateChange} />
          </div>

          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleDateChange(addDays(currentDate, 1))}
            className="text-secondary hover:text-primary transition-colors gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4"
          >
            <span className="hidden sm:inline">Próximo Dia</span>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-3 md:px-4 py-12 md:py-16 max-w-6xl">
        <div className="space-y-16 md:space-y-20">
          {/* Welcome Section */}
          <section className="text-center space-y-4 md:space-y-6 animate-fade-in px-3 md:px-4">
            <div className="flex justify-center mb-3 md:mb-4">
              <span className="text-accent text-xl md:text-2xl">✦ ✧ ✦</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-secondary tracking-tight">
              A Liturgia como Tradição
            </h2>
            <p className="text-foreground/70 max-w-3xl mx-auto text-base md:text-xl leading-relaxed italic font-body">
              Conecte-se com a herança cristã através das leituras diárias. 
              Um convite à devoção e ao silêncio através da Palavra.
            </p>
            <div className="divider-ornate">
              <span className="divider-line"></span>
              <span className="text-accent">❖</span>
              <span className="divider-line"></span>
            </div>
          </section>

          {/* Oração de Coleta */}
          {devotional.collect && (
            <section className="animate-fade-in md:max-w-4xl mx-auto w-full">
              <CollectSection collect={devotional.collect} />
            </section>
          )}

          {/* Daily Readings */}
          <section className="space-y-8 md:space-y-12 md:max-w-4xl mx-auto w-full">
            <div className="text-center space-y-3 md:space-y-4">
              <h3 className="text-2xl md:text-3xl font-display text-secondary italic">
                Lectio Divina
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] font-bold text-muted-foreground">
                Ano Litúrgico {devotional.liturgicalInfo.cycle} • {devotional.readings.length} Estações da Palavra
              </p>
            </div>
            
            <div className="grid gap-8 md:gap-12">
              {devotional.readings.map((reading, index) => (
                <ReadingCard 
                  key={`${reading.type}-${index}`}
                  reading={reading} 
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* Prayer Section */}
          <section className="animate-fade-in md:max-w-4xl mx-auto w-full">
            <PrayerSection prayer={devotional.prayer} />
          </section>

          {/* Meditation Section */}
          <section className="animate-fade-in md:max-w-4xl mx-auto w-full">
            <MeditationSection meditation={devotional.meditation} />
          </section>
          
          {/* Inspiration Quote */}
          <section className="text-center py-16 animate-fade-in border-t border-accent/10">
            <blockquote className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-display italic text-secondary max-w-4xl mx-auto leading-relaxed px-4">
              "Toda Escritura é inspirada por Deus e útil para o ensino, para a repreensão, 
              para a correção, para a educação na justiça, a fim de que o homem de Deus seja 
              perfeito e perfeitamente habilitado para toda boa obra."
            </blockquote>
            <cite className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-accent mt-8 block">
              — II Timóteo III:16-17
            </cite>
          </section>
        </div>
      </main>

      <Footer />
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
