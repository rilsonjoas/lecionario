import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { calculateAdventStart, calculateEaster } from '@/lib/liturgical-calendar';
import { addDays } from 'date-fns';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface CollectData {
  liturgicalSunday: string; // "1st Sunday of Advent"
  season: 'advent' | 'christmas' | 'epiphany' | 'lent' | 'easter' | 'pentecost' | 'ordinary';
  titlePt: string;
  textPt: string;
  source: string;
}

// Book of Common Prayer Collects (Portuguese translations)
// Source: Livro de Oração Comum (IEAB) + BCP 1979
const collects: CollectData[] = [
  // ADVENTO
  {
    liturgicalSunday: "1st Sunday of Advent",
    season: "advent",
    titlePt: "Coleta do Primeiro Domingo do Advento",
    textPt: "Deus Todo-Poderoso, dá-nos graça para rejeitarmos as obras das trevas e nos revestirmos das armas da luz, agora no tempo desta vida mortal em que teu Filho Jesus Cristo veio nos visitar com grande humildade; para que no último dia, quando ele vier novamente em sua gloriosa majestade para julgar os vivos e os mortos, possamos ressurgir para a vida imortal; por meio dele que vive e reina contigo e com o Espírito Santo, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },
  {
    liturgicalSunday: "2nd Sunday of Advent",
    season: "advent",
    titlePt: "Coleta do Segundo Domingo do Advento",
    textPt: "Deus misericordioso, que enviaste teus mensageiros os profetas para pregar arrependimento e preparar o caminho para nossa salvação: Dá-nos graça para dar ouvidos às suas advertências e abandonar nossos pecados, para que possamos saudar com alegria a vinda de Jesus Cristo, nosso Redentor; que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },
  {
    liturgicalSunday: "3rd Sunday of Advent",
    season: "advent",
    titlePt: "Coleta do Terceiro Domingo do Advento",
    textPt: "Agita, ó Senhor, o poder de tua força e vem entre nós, e com grande poder socorre-nos; para que, pela tua proteção, possamos ser salvos dos perigos que ameaçam por causa de nossos pecados; salva-nos e livra-nos, ó Deus, por teu Filho Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },
  {
    liturgicalSunday: "4th Sunday of Advent",
    season: "advent",
    titlePt: "Coleta do Quarto Domingo do Advento",
    textPt: "Purifica nossas consciências, ó Deus Todo-Poderoso, pela tua visitação diária, para que teu Filho Jesus Cristo, quando vier, encontre em nós uma morada preparada para si; que vive e reina contigo, na unidade do Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },

  // NATAL
  {
    liturgicalSunday: "Christmas Day",
    season: "christmas",
    titlePt: "Coleta do Natal do Senhor",
    textPt: "Deus Todo-Poderoso, que nos deste teu Filho unigênito para tomar nossa natureza sobre si e nascer neste dia de uma virgem: Concede que, sendo regenerados e feitos teus filhos pela adoção e graça, possamos diariamente ser renovados pelo teu Espírito Santo; por meio de nosso Senhor Jesus Cristo, a quem, contigo e o mesmo Espírito, sejam honra e glória, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },
  {
    liturgicalSunday: "1st Sunday after Christmas",
    season: "christmas",
    titlePt: "Coleta do Primeiro Domingo após o Natal",
    textPt: "Deus Todo-Poderoso, concedeste que teu Filho unigênito tomasse nossa natureza humana e nascesse neste dia de uma virgem pura: Concede que nós, que fomos regenerados e feitos teus filhos pela adoção e graça, possamos diariamente ser renovados pelo teu Espírito Santo; por meio de nosso Senhor Jesus Cristo, que vive e reina contigo e com o mesmo Espírito, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },

  // EPIFANIA
  {
    liturgicalSunday: "Epiphany",
    season: "epiphany",
    titlePt: "Coleta da Epifania do Senhor",
    textPt: "Ó Deus, que pela condução de uma estrela manifestaste teu Filho unigênito às nações da terra: Conduz-nos, que te conhecemos agora pela fé, a contemplar em glória a majestade de tua divindade; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },
  {
    liturgicalSunday: "Last Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Coleta do Último Domingo após a Epifania (Transfiguração)",
    textPt: "Ó Deus, que na santa montanha revelaste aos discípulos escolhidos teu Filho bem-amado, maravilhosamente transfigurado, em vestes resplandecentes e brancas: Concede-nos que possamos ouvi-lo e ser transformados à sua semelhança, de glória em glória; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },

  // QUARESMA
  {
    liturgicalSunday: "Ash Wednesday",
    season: "lent",
    titlePt: "Coleta da Quarta-feira de Cinzas",
    textPt: "Deus Todo-Poderoso e eterno, que não aborreces nada do que fizeste e perdoas os pecados de todos os que se arrependem: Cria e faz em nós corações novos e contritos, para que nós, lamentando devidamente nossos pecados e reconhecendo nossa miséria, possamos obter de ti, o Deus de toda misericórdia, perfeita remissão e perdão; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },
  {
    liturgicalSunday: "1st Sunday in Lent",
    season: "lent",
    titlePt: "Coleta do Primeiro Domingo da Quaresma",
    textPt: "Deus Todo-Poderoso, cujo bendito Filho foi conduzido pelo Espírito para ser tentado por Satanás: Vem rapidamente para socorrer aqueles que são atacados por muitas tentações; e, assim como conheces as fraquezas de cada um de nós, permite que cada um encontre em ti força para resistir e vencer; por meio de Jesus Cristo, teu Filho, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },
  {
    liturgicalSunday: "Palm Sunday",
    season: "lent",
    titlePt: "Coleta do Domingo de Ramos",
    textPt: "Deus Todo-Poderoso e eterno, que, por teu amor, enviaste nosso Salvador Jesus Cristo para tomar sobre si nossa carne e sofrer a morte na cruz: Concede que possamos compartilhar sua obediência à tua vontade e sua fortaleza em nosso sofrimento, para que também possamos compartilhar sua ressurreição; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },

  // PÁSCOA
  {
    liturgicalSunday: "Easter Day",
    season: "easter",
    titlePt: "Coleta do Domingo de Páscoa",
    textPt: "Deus Todo-Poderoso, que por meio de teu Filho unigênito Jesus Cristo venceste a morte e nos abriste a porta da vida eterna: Concede que nós, que celebramos com alegria o dia da ressurreição do Senhor, possamos ser ressuscitados da morte do pecado pelo teu Espírito vivificador; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },
  {
    liturgicalSunday: "2nd Sunday of Easter",
    season: "easter",
    titlePt: "Coleta do Segundo Domingo de Páscoa",
    textPt: "Deus Todo-Poderoso e eterno, que na Páscoa estabeleceste a nova aliança de reconciliação: Concede-nos que, nascidos de novo pela palavra de Deus, que vive e permanece para sempre, possamos ser contados entre os filhos da luz; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },
  {
    liturgicalSunday: "Ascension Day",
    season: "easter",
    titlePt: "Coleta da Ascensão do Senhor",
    textPt: "Deus Todo-Poderoso, cujo bendito Filho, nosso Salvador Jesus Cristo, ascendeu muito acima de todos os céus para que pudesse encher todas as coisas: Concede-nos, rogamos-te, que, com nossos corações e mentes, possamos também ascender e habitar continuamente com ele; que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },

  // PENTECOSTES
  {
    liturgicalSunday: "Day of Pentecost",
    season: "pentecost",
    titlePt: "Coleta do Dia de Pentecostes",
    textPt: "Deus Todo-Poderoso, que neste dia abriste o caminho da vida eterna a toda nação pelo envio prometido de teu Espírito Santo: Derrama este dom sobre nós em abundância, para que possamos alcançar a unidade da fé no conhecimento de ti; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo, na unidade do Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },

  // TEMPO COMUM
  {
    liturgicalSunday: "Trinity Sunday",
    season: "ordinary",
    titlePt: "Coleta do Domingo da Trindade",
    textPt: "Deus Todo-Poderoso e eterno, que nos deste a graça de reconhecer a glória da Trindade eterna na majestade da Unidade divina, e de adorar a Unidade no poder da Majestade divina: Guarda-nos firmes nesta fé, e defende-nos de todas as adversidades; que vives e reinas, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },
  {
    liturgicalSunday: "Christ the King",
    season: "ordinary",
    titlePt: "Coleta do Domingo de Cristo Rei",
    textPt: "Deus Todo-Poderoso e eterno, cuja vontade é restaurar todas as coisas em teu Filho bem-amado, o Rei dos reis e Senhor dos senhores: Concede, misericordiosamente, que os povos da terra, divididos e escravizados pelo pecado, sejam libertados e reunidos sob seu domínio de amor; que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979 (trad. adaptada)"
  },
];

/**
 * Calculate the date for a specific liturgical Sunday in a given year and cycle
 */
function getSundayDate(year: number, liturgicalSunday: string, season: string): Date | null {
  const adventStart = calculateAdventStart(year);
  const easter = calculateEaster(year);

  switch (liturgicalSunday) {
    // ADVENT
    case "1st Sunday of Advent":
      return adventStart;
    case "2nd Sunday of Advent":
      return addDays(adventStart, 7);
    case "3rd Sunday of Advent":
      return addDays(adventStart, 14);
    case "4th Sunday of Advent":
      return addDays(adventStart, 21);

    // CHRISTMAS
    case "Christmas Day":
      return new Date(year, 11, 25);
    case "1st Sunday after Christmas":
      // First Sunday after Dec 25
      const christmas = new Date(year, 11, 25);
      const daysUntilSunday = (7 - christmas.getDay()) % 7 || 7;
      return addDays(christmas, daysUntilSunday);

    // EPIPHANY
    case "Epiphany":
      return new Date(year, 0, 6);
    case "Last Sunday after Epiphany":
      // Sunday before Ash Wednesday (Transfiguration)
      const ashWednesday = addDays(easter, -46);
      return addDays(ashWednesday, -3); // Previous Sunday

    // LENT
    case "Ash Wednesday":
      return addDays(easter, -46);
    case "1st Sunday in Lent":
      return addDays(easter, -42);
    case "Palm Sunday":
      return addDays(easter, -7);

    // EASTER
    case "Easter Day":
      return easter;
    case "2nd Sunday of Easter":
      return addDays(easter, 7);
    case "Ascension Day":
      return addDays(easter, 39); // Thursday, 40 days after Easter
    case "Day of Pentecost":
      return addDays(easter, 49);

    // ORDINARY TIME
    case "Trinity Sunday":
      return addDays(easter, 56); // First Sunday after Pentecost
    case "Christ the King":
      // Last Sunday before Advent (Sunday before Advent starts)
      const nextAdvent = calculateAdventStart(year + 1);
      return addDays(nextAdvent, -7);

    default:
      console.warn(`Unknown liturgical Sunday: ${liturgicalSunday}`);
      return null;
  }
}

/**
 * Get the liturgical cycle for a given year
 */
function getCycleForYear(year: number): 'A' | 'B' | 'C' {
  // Liturgical year starts with Advent in the previous calendar year
  // Year A: years divisible by 3 (e.g., 2025 Advent → 2026 is Year A)
  // Year B: remainder 1 when divided by 3
  // Year C: remainder 2 when divided by 3
  const remainder = year % 3;
  if (remainder === 0) return 'A';
  if (remainder === 1) return 'B';
  return 'C';
}

async function importCollects() {
  console.log('🙏 Iniciando importação de coletas...\n');

  const years = [2026, 2027, 2028];
  let totalInserted = 0;
  let totalSkipped = 0;

  for (const year of years) {
    const cycle = getCycleForYear(year);
    console.log(`\n📅 Ano ${year} - Ciclo ${cycle}`);
    console.log('='.repeat(50));

    for (const collect of collects) {
      const date = getSundayDate(year, collect.liturgicalSunday, collect.season);

      if (!date) {
        console.log(`  ⚠️  Pulando: ${collect.liturgicalSunday} (data não calculável)`);
        totalSkipped++;
        continue;
      }

      const dateStr = format(date, 'yyyy-MM-dd');

      // Check if collect already exists
      const { data: existing } = await supabase
        .from('collects')
        .select('id')
        .eq('date', dateStr)
        .eq('cycle', cycle)
        .single();

      if (existing) {
        console.log(`  ⏭️  Já existe: ${dateStr} (${collect.titlePt})`);
        totalSkipped++;
        continue;
      }

      // Insert collect
      const { error } = await supabase.from('collects').insert({
        date: dateStr,
        cycle,
        season: collect.season,
        title: collect.titlePt,
        text: collect.textPt,
        source: collect.source,
      });

      if (error) {
        console.error(`  ❌ Erro ao inserir ${dateStr}:`, error.message);
      } else {
        console.log(`  ✅ ${dateStr}: ${collect.titlePt}`);
        totalInserted++;
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('🎉 IMPORTAÇÃO CONCLUÍDA!');
  console.log('='.repeat(50));
  console.log(`\n📊 Estatísticas:`);
  console.log(`   ✅ Inseridas: ${totalInserted}`);
  console.log(`   ⏭️  Puladas: ${totalSkipped}`);
  console.log(`   📖 Total de coletas únicas: ${collects.length}`);
  console.log(`   📅 Anos processados: ${years.join(', ')}`);
  console.log(`\n✨ Processo finalizado com sucesso!\n`);
}

// Run the import
importCollects().catch(console.error);
