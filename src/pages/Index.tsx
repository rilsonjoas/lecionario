import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReadingCard } from '@/components/devotional/ReadingCard';
import { PrayerSection } from '@/components/devotional/PrayerSection';
import { MeditationSection } from '@/components/devotional/MeditationSection';
import { CollectSection } from '@/components/devotional/CollectSection';
import { getSampleDevotional } from '@/data/sample-devotional';
import { getThemeForSeason, applySeasonTheme } from '@/lib/theme';

const Index = () => {
  const devotional = getSampleDevotional();
  const theme = getThemeForSeason(devotional.liturgicalInfo.season);

  useEffect(() => {
    // Apply liturgical season theme to the document
    applySeasonTheme(devotional.liturgicalInfo.season);
    
    // Update page title
    document.title = `Luz Litúrgica - ${devotional.liturgicalInfo.dayName}`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        `Devocional diário reformado para ${devotional.liturgicalInfo.dayName}. Leituras, orações e meditações baseadas no Lecionário Comum Revisado.`
      );
    }
  }, [devotional.liturgicalInfo.season, devotional.liturgicalInfo.dayName]);

  return (
    <div className="min-h-screen bg-background font-sans transition-all duration-500">
      <Header liturgicalDay={devotional.liturgicalInfo} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Welcome Section */}
          <section className="text-center space-y-4 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Bem-vindo ao devocional de hoje
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Conecte-se com a tradição cristã através das leituras diárias do Lecionário Comum Revisado. 
              Cada dia oferece uma jornada espiritual através das Escrituras, oração e meditação.
            </p>
          </section>

          {/* Collect of the Day */}
          {devotional.collect && (
            <CollectSection collect={devotional.collect} />
          )}

          {/* Daily Readings */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Leituras Bíblicas do Dia
              </h3>
              <p className="text-sm text-muted-foreground">
                Ano Litúrgico {devotional.liturgicalInfo.cycle} • {devotional.readings.length} leituras
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
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
          <PrayerSection prayer={devotional.prayer} />

          {/* Meditation Section */}
          <MeditationSection meditation={devotional.meditation} />
          
          {/* Inspiration Quote */}
          <section className="text-center py-8 animate-fade-in">
            <blockquote className="text-lg font-scripture italic text-muted-foreground max-w-3xl mx-auto">
              "Toda Escritura é inspirada por Deus e útil para o ensino, para a repreensão, 
              para a correção, para a educação na justiça, a fim de que o homem de Deus seja 
              perfeito e perfeitamente habilitado para toda boa obra."
            </blockquote>
            <cite className="text-sm text-muted-foreground block mt-2">
              — 2 Timóteo 3:16-17
            </cite>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
