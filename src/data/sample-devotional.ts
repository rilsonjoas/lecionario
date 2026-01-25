import type { DailyDevotional, Reading, DailyPrayer, MeditationResource } from '@/types';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { getRCLReadings } from '@/lib/rcl-fetcher';
import { fetchDailyDevotional } from '@/lib/supabase/lectionary-service';

// Sample readings for demonstration
const sampleReadings: Reading[] = [
  {
    type: 'first_reading',
    reference: 'Isaías 40:1-11',
    citation: 'Isaías 40:1-11',
    text: 'Consolai, consolai o meu povo, diz o vosso Deus. Falai benignamente a Jerusalém e bradai-lhe que já a sua malícia é acabada, que a sua iniquidade está expiada e que já recebeu em dobro da mão do Senhor por todos os seus pecados.',
  },
  {
    type: 'psalm',
    reference: 'Salmo 85:1-2, 8-13',
    citation: 'Salmo 85',
    text: 'Senhor, foste propício à tua terra; fizeste voltar o cativeiro de Jacó. Perdoaste a iniquidade do teu povo; cobriste todos os seus pecados.',
  },
  {
    type: 'second_reading', 
    reference: '2 Pedro 3:8-15a',
    citation: '2 Pedro 3:8-15a',
    text: 'Mas, amados, não ignoreis uma coisa: que um dia para o Senhor é como mil anos, e mil anos como um dia. O Senhor não retarda a sua promessa, ainda que alguns a têm por tardia.',
  },
  {
    type: 'gospel',
    reference: 'Marcos 1:1-8', 
    citation: 'Marcos 1:1-8',
    text: 'Princípio do evangelho de Jesus Cristo, Filho de Deus. Como está escrito nos profetas: Eis que eu envio o meu anjo ante a tua face, o qual preparará o teu caminho diante de ti.',
  }
];

const samplePrayer: DailyPrayer = {
  title: 'Oração do Segundo Domingo do Advento',
  text: 'Deus Todo-Poderoso, concede que possamos lançar fora as obras das trevas e nos revestir da armadura da luz, agora no tempo desta vida mortal em que teu Filho Jesus Cristo veio a nós em grande humildade; para que no último dia, quando ele vier novamente em sua gloriosa majestade para julgar tanto os vivos quanto os mortos, possamos ressuscitar para a vida imortal; por ele que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre.',
  author: 'Livro de Oração Comum',
  source: 'Tradição Anglicana'
};

const sampleMeditation: MeditationResource = {
  prompt: 'João Batista nos chama a "preparar o caminho do Senhor". Em que áreas da sua vida você sente que precisa fazer essa preparação? Como você pode criar espaço em seu coração e mente para receber Cristo mais plenamente neste Advento?',
  questions: [
    'Que "caminhos tortuosos" em minha vida precisam ser "endireitados"?',
    'Como posso praticar a humildade de João Batista em meu relacionamento com Jesus?',
    'De que maneiras posso "preparar o caminho" para que outros encontrem Cristo através de mim?'
  ],
  duration: '10-15 minutos'
};

export async function getSampleDevotional(date: Date = new Date()): Promise<DailyDevotional> {
  const liturgicalInfo = getLiturgicalDayInfo(date);
  
  console.log('🔍 Buscando devocional para:', {
    date: liturgicalInfo.date,
    cycle: liturgicalInfo.cycle,
    season: liturgicalInfo.season
  });
  
  // Tentar buscar do Supabase primeiro
  try {
    const supabaseData = await fetchDailyDevotional(date, liturgicalInfo.cycle);
    
    console.log('📊 Resposta do Supabase:', {
      hasData: !!supabaseData,
      hasReadings: !!supabaseData?.readings,
      readingsCount: supabaseData?.readings?.length || 0
    });
    
    if (supabaseData && supabaseData.readings && supabaseData.readings.length > 0) {
      // Dados encontrados no Supabase, usar eles
      console.log('✅ Usando dados do Supabase!');
      return {
        liturgicalInfo,
        readings: supabaseData.readings,
        prayer: supabaseData.prayer || samplePrayer,
        meditation: supabaseData.meditation || sampleMeditation,
        collect: supabaseData.collect || 'Deus misericordioso, que enviaste os teus mensageiros, os profetas, para pregar o arrependimento e preparar o caminho para a nossa salvação: Concede-nos graça para dar ouvidos às suas advertências e abandonar os nossos pecados, para que possamos saudar com alegria a vinda de Jesus Cristo, nosso Redentor.'
      };
    }
  } catch (error) {
    console.error('❌ Erro ao buscar do Supabase:', error);
  }
  
  console.log('⚠️ Usando dados de exemplo (fallback)');
  
  // Fallback: tentar RCL local
  const rclData = getRCLReadings(liturgicalInfo.cycle, liturgicalInfo.season, date);
  
  return {
    liturgicalInfo,
    readings: rclData?.readings || sampleReadings,
    prayer: samplePrayer,
    meditation: sampleMeditation,
    collect: rclData?.collect || 'Deus misericordioso, que enviaste os teus mensageiros, os profetas, para pregar o arrependimento e preparar o caminho para a nossa salvação: Concede-nos graça para dar ouvidos às suas advertências e abandonar os nossos pecados, para que possamos saudar com alegria a vinda de Jesus Cristo, nosso Redentor.'
  };
}