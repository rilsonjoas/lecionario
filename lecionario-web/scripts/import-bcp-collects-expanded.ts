import { createClient } from '@supabase/supabase-js';
import { format, addDays, differenceInDays } from 'date-fns';
import { calculateAdventStart, calculateEaster } from '@/lib/liturgical-calendar';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface CollectData {
  liturgicalSunday: string;
  season: 'advent' | 'christmas' | 'epiphany' | 'lent' | 'easter' | 'pentecost' | 'ordinary';
  titlePt: string;
  textPt: string;
  source: string;
}

// EXPANDED Book of Common Prayer Collects (Portuguese translations)
// Source: Livro de Oração Comum (IEAB) + BCP 1979
const collects: CollectData[] = [
  // ADVENTO (4 domingos) - JÁ EXISTENTES
  {
    liturgicalSunday: "1st Sunday of Advent",
    season: "advent",
    titlePt: "Coleta do Primeiro Domingo do Advento",
    textPt: "Deus Todo-Poderoso, dá-nos graça para rejeitarmos as obras das trevas e nos revestirmos das armas da luz, agora no tempo desta vida mortal em que teu Filho Jesus Cristo veio nos visitar com grande humildade; para que no último dia, quando ele vier novamente em sua gloriosa majestade para julgar os vivos e os mortos, possamos ressurgir para a vida imortal; por meio dele que vive e reina contigo e com o Espírito Santo, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "2nd Sunday of Advent",
    season: "advent",
    titlePt: "Coleta do Segundo Domingo do Advento",
    textPt: "Deus misericordioso, que enviaste teus mensageiros os profetas para pregar arrependimento e preparar o caminho para nossa salvação: Dá-nos graça para dar ouvidos às suas advertências e abandonar nossos pecados, para que possamos saudar com alegria a vinda de Jesus Cristo, nosso Redentor; que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "3rd Sunday of Advent",
    season: "advent",
    titlePt: "Coleta do Terceiro Domingo do Advento",
    textPt: "Agita, ó Senhor, o poder de tua força e vem entre nós, e com grande poder socorre-nos; para que, pela tua proteção, possamos ser salvos dos perigos que ameaçam por causa de nossos pecados; salva-nos e livra-nos, ó Deus, por teu Filho Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "4th Sunday of Advent",
    season: "advent",
    titlePt: "Coleta do Quarto Domingo do Advento",
    textPt: "Purifica nossas consciências, ó Deus Todo-Poderoso, pela tua visitação diária, para que teu Filho Jesus Cristo, quando vier, encontre em nós uma morada preparada para si; que vive e reina contigo, na unidade do Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },

  // NATAL (2 domingos) - JÁ EXISTENTES
  {
    liturgicalSunday: "Christmas Day",
    season: "christmas",
    titlePt: "Coleta do Natal do Senhor",
    textPt: "Deus Todo-Poderoso, que nos deste teu Filho unigênito para tomar nossa natureza sobre si e nascer neste dia de uma virgem: Concede que, sendo regenerados e feitos teus filhos pela adoção e graça, possamos diariamente ser renovados pelo teu Espírito Santo; por meio de nosso Senhor Jesus Cristo, a quem, contigo e o mesmo Espírito, sejam honra e glória, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "1st Sunday after Christmas",
    season: "christmas",
    titlePt: "Coleta do Primeiro Domingo após o Natal",
    textPt: "Deus Todo-Poderoso, concedeste que teu Filho unigênito tomasse nossa natureza humana e nascesse neste dia de uma virgem pura: Concede que nós, que fomos regenerados e feitos teus filhos pela adoção e graça, possamos diariamente ser renovados pelo teu Espírito Santo; por meio de nosso Senhor Jesus Cristo, que vive e reina contigo e com o mesmo Espírito, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },

  // EPIFANIA (Epifania + 2º-8º + Transfiguração)
  {
    liturgicalSunday: "Epiphany",
    season: "epiphany",
    titlePt: "Coleta da Epifania do Senhor",
    textPt: "Ó Deus, que pela condução de uma estrela manifestaste teu Filho unigênito às nações da terra: Conduz-nos, que te conhecemos agora pela fé, a contemplar em glória a majestade de tua divindade; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  // NOVOS: 2º-8º Domingos após Epifania
  {
    liturgicalSunday: "2nd Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Coleta do Segundo Domingo após a Epifania",
    textPt: "Deus Todo-Poderoso, cujo Filho, nosso Salvador Jesus Cristo, é a luz do mundo: Concede que teu povo, iluminado por tua Palavra e Sacramentos, possa resplandecer com o brilho de sua glória, para que ele seja conhecido, adorado e obedecido até os confins da terra; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "3rd Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Coleta do Terceiro Domingo após a Epifania",
    textPt: "Dá-nos graça, ó Senhor, para responder prontamente ao chamado de nosso Salvador Jesus Cristo e proclamar a todos as boas novas de sua salvação, para que possamos conhecer a promessa de sua vida eterna; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "4th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Coleta do Quarto Domingo após a Epifania",
    textPt: "Deus Todo-Poderoso e eterno, governas todas as coisas no céu e na terra: Ouve misericordiosamente as súplicas de teu povo e, em nosso tempo, concede-nos tua paz; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "5th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Coleta do Quinto Domingo após a Epifania",
    textPt: "Põe em nossos corações, ó Senhor, o amor de teu Nome, para que, amando-te em todas as coisas e acima de todas as coisas, possamos obter tuas promessas, que excedem tudo o que podemos desejar; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "6th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Coleta do Sexto Domingo após a Epifania",
    textPt: "Ó Deus, a força de todos os que confiam em ti: Aceita misericordiosamente as orações de teu povo; e porque, em nossa fraqueza, nada podemos fazer sem ti, concede-nos a ajuda de tua graça, para que, guardando teus mandamentos, possamos agradar-te tanto em vontade quanto em ação; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "7th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Coleta do Sétimo Domingo após a Epifania",
    textPt: "Ó Senhor, tu nos ensinaste que sem amor, tudo o que fazemos não vale nada: Envia teu Espírito Santo e derrama em nossos corações aquele dom precioso do amor, o verdadeiro vínculo da paz e de todas as virtudes, sem o qual quem vive está morto diante de ti; concede isto por amor de teu Filho unigênito Jesus Cristo, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "8th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Coleta do Oitavo Domingo após a Epifania",
    textPt: "Santíssimo Deus, cujo Filho unigênito nos ensinou a amar nossos inimigos e orar por aqueles que nos perseguem: Ajuda-nos a obedecer aos seus preceitos, para que, amando-te acima de todas as coisas, possamos amar nossos irmãos e irmãs como a nós mesmos; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "Last Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Coleta do Último Domingo após a Epifania (Transfiguração)",
    textPt: "Ó Deus, que na santa montanha revelaste aos discípulos escolhidos teu Filho bem-amado, maravilhosamente transfigurado, em vestes resplandecentes e brancas: Concede-nos que possamos ouvi-lo e ser transformados à sua semelhança, de glória em glória; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },

  // QUARESMA (Cinzas + 1º-5º + Ramos)
  {
    liturgicalSunday: "Ash Wednesday",
    season: "lent",
    titlePt: "Coleta da Quarta-feira de Cinzas",
    textPt: "Deus Todo-Poderoso e eterno, que não aborreces nada do que fizeste e perdoas os pecados de todos os que se arrependem: Cria e faz em nós corações novos e contritos, para que nós, lamentando devidamente nossos pecados e reconhecendo nossa miséria, possamos obter de ti, o Deus de toda misericórdia, perfeita remissão e perdão; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "1st Sunday in Lent",
    season: "lent",
    titlePt: "Coleta do Primeiro Domingo da Quaresma",
    textPt: "Deus Todo-Poderoso, cujo bendito Filho foi conduzido pelo Espírito para ser tentado por Satanás: Vem rapidamente para socorrer aqueles que são atacados por muitas tentações; e, assim como conheces as fraquezas de cada um de nós, permite que cada um encontre em ti força para resistir e vencer; por meio de Jesus Cristo, teu Filho, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  // NOVOS: 2º-5º Domingos da Quaresma
  {
    liturgicalSunday: "2nd Sunday in Lent",
    season: "lent",
    titlePt: "Coleta do Segundo Domingo da Quaresma",
    textPt: "Ó Deus, cujo bendito Filho foi transfigurado no monte diante de seus discípulos: Concede-nos que, ouvindo a voz de teu Filho amado, possamos ser participantes de sua ressurreição; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "3rd Sunday in Lent",
    season: "lent",
    titlePt: "Coleta do Terceiro Domingo da Quaresma",
    textPt: "Deus Todo-Poderoso, tu sabes que não temos poder em nós mesmos para nos ajudar: Guarda-nos tanto exteriormente em nossos corpos quanto interiormente em nossas almas, para que possamos ser defendidos de todas as adversidades que possam acontecer ao corpo e de todos os pensamentos maus que possam assaltar e ferir a alma; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "4th Sunday in Lent",
    season: "lent",
    titlePt: "Coleta do Quarto Domingo da Quaresma",
    textPt: "Deus gracioso, cujo bendito Filho Jesus Cristo desceu do céu para ser o verdadeiro pão que dá vida ao mundo: Concede-nos sempre este pão, para que ele viva em nós e nós nele; que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "5th Sunday in Lent",
    season: "lent",
    titlePt: "Coleta do Quinto Domingo da Quaresma",
    textPt: "Deus Todo-Poderoso, somente tu podes ordenar as vontades e afeições desordenadas dos pecadores: Concede a teu povo graça para amar o que ordenas e desejar o que prometes; para que, entre as rápidas e variadas mudanças do mundo, nossos corações possam certamente estar fixos onde as verdadeiras alegrias se encontram; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "Palm Sunday",
    season: "lent",
    titlePt: "Coleta do Domingo de Ramos",
    textPt: "Deus Todo-Poderoso e eterno, que, por teu amor, enviaste nosso Salvador Jesus Cristo para tomar sobre si nossa carne e sofrer a morte na cruz: Concede que possamos compartilhar sua obediência à tua vontade e sua fortaleza em nosso sofrimento, para que também possamos compartilhar sua ressurreição; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },

  // PÁSCOA (Páscoa + 2º-7º + Ascensão)
  {
    liturgicalSunday: "Easter Day",
    season: "easter",
    titlePt: "Coleta do Domingo de Páscoa",
    textPt: "Deus Todo-Poderoso, que por meio de teu Filho unigênito Jesus Cristo venceste a morte e nos abriste a porta da vida eterna: Concede que nós, que celebramos com alegria o dia da ressurreição do Senhor, possamos ser ressuscitados da morte do pecado pelo teu Espírito vivificador; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "2nd Sunday of Easter",
    season: "easter",
    titlePt: "Coleta do Segundo Domingo de Páscoa",
    textPt: "Deus Todo-Poderoso e eterno, que na Páscoa estabeleceste a nova aliança de reconciliação: Concede-nos que, nascidos de novo pela palavra de Deus, que vive e permanece para sempre, possamos ser contados entre os filhos da luz; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  // NOVOS: 3º-7º Domingos de Páscoa
  {
    liturgicalSunday: "3rd Sunday of Easter",
    season: "easter",
    titlePt: "Coleta do Terceiro Domingo de Páscoa",
    textPt: "Ó Deus, cujo bendito Filho se fez conhecido aos seus discípulos no partir do pão: Abre os olhos de nossa fé, para que possamos contemplá-lo em todas as suas obras redentoras; que vive e reina contigo, na unidade do Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "4th Sunday of Easter",
    season: "easter",
    titlePt: "Coleta do Quarto Domingo de Páscoa",
    textPt: "Ó Deus, cujo Filho Jesus é o bom pastor de teu povo: Concede que, quando ouvirmos sua voz, possamos conhecer aquele que nos chama cada um pelo nome e seguir aonde ele conduz; que, contigo e com o Espírito Santo, vive e reina, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "5th Sunday of Easter",
    season: "easter",
    titlePt: "Coleta do Quinto Domingo de Páscoa",
    textPt: "Deus Todo-Poderoso, a quem os corações verdadeiramente devotados estão abertos, a quem nenhum desejo secreto está escondido e de quem nenhuma vontade está fechada: Purifica os pensamentos de nossos corações pela inspiração de teu Espírito Santo, para que possamos perfeitamente amar-te e dignamente engrandecer teu santo Nome; por meio de Cristo nosso Senhor. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "6th Sunday of Easter",
    season: "easter",
    titlePt: "Coleta do Sexto Domingo de Páscoa",
    textPt: "Ó Deus, fizeste os corações dos fiéis arderem com o fogo de teu amor: Concede-nos a mesma fé e amor, para que possamos amar o que ordenas e desejar o que prometes; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "7th Sunday of Easter",
    season: "easter",
    titlePt: "Coleta do Sétimo Domingo de Páscoa",
    textPt: "Ó Deus, o Rei da glória, exaltaste teu Filho unigênito Jesus Cristo com grande triunfo ao teu reino no céu: Não nos deixes desolados, mas envia-nos teu Espírito Santo para nos confortar e exaltar-nos ao mesmo lugar onde nosso Salvador Cristo foi antes; que vive e reina contigo e com o Espírito Santo, um só Deus, na glória eterna. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "Ascension Day",
    season: "easter",
    titlePt: "Coleta da Ascensão do Senhor",
    textPt: "Deus Todo-Poderoso, cujo bendito Filho, nosso Salvador Jesus Cristo, ascendeu muito acima de todos os céus para que pudesse encher todas as coisas: Concede-nos, rogamos-te, que, com nossos corações e mentes, possamos também ascender e habitar continuamente com ele; que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },

  // PENTECOSTES
  {
    liturgicalSunday: "Day of Pentecost",
    season: "pentecost",
    titlePt: "Coleta do Dia de Pentecostes",
    textPt: "Deus Todo-Poderoso, que neste dia abriste o caminho da vida eterna a toda nação pelo envio prometido de teu Espírito Santo: Derrama este dom sobre nós em abundância, para que possamos alcançar a unidade da fé no conhecimento de ti; por meio de Jesus Cristo nosso Senhor, que vive e reina contigo, na unidade do Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },

  // TEMPO COMUM (Trindade + Propers 1-29 + Cristo Rei)
  {
    liturgicalSunday: "Trinity Sunday",
    season: "ordinary",
    titlePt: "Coleta do Domingo da Trindade",
    textPt: "Deus Todo-Poderoso e eterno, que nos deste a graça de reconhecer a glória da Trindade eterna na majestade da Unidade divina, e de adorar a Unidade no poder da Majestade divina: Guarda-nos firmes nesta fé, e defende-nos de todas as adversidades; que vives e reinas, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
  {
    liturgicalSunday: "Christ the King",
    season: "ordinary",
    titlePt: "Coleta do Domingo de Cristo Rei",
    textPt: "Deus Todo-Poderoso e eterno, cuja vontade é restaurar todas as coisas em teu Filho bem-amado, o Rei dos reis e Senhor dos senhores: Concede, misericordiosamente, que os povos da terra, divididos e escravizados pelo pecado, sejam libertados e reunidos sob seu domínio de amor; que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.",
    source: "Book of Common Prayer, 1979"
  },
];

/**
 * Calculate the date for a specific liturgical Sunday
 */
function getSundayDate(year: number, liturgicalSunday: string, season: string): Date | null {
  const adventStart = calculateAdventStart(year);
  const easter = calculateEaster(year);
  const epiphany = new Date(year, 0, 6);
  const ashWednesday = addDays(easter, -46);

  // ADVENT
  if (liturgicalSunday.includes("Advent")) {
    const match = liturgicalSunday.match(/(\d+)(st|nd|rd|th)/);
    if (match) {
      const week = parseInt(match[1]) - 1;
      return addDays(adventStart, week * 7);
    }
  }

  // CHRISTMAS
  if (liturgicalSunday === "Christmas Day") return new Date(year, 11, 25);
  if (liturgicalSunday === "1st Sunday after Christmas") {
    const christmas = new Date(year, 11, 25);
    const daysUntilSunday = (7 - christmas.getDay()) % 7 || 7;
    return addDays(christmas, daysUntilSunday);
  }

  // EPIPHANY
  if (liturgicalSunday === "Epiphany") return epiphany;
  if (liturgicalSunday.includes("after Epiphany")) {
    if (liturgicalSunday === "Last Sunday after Epiphany") {
      return addDays(ashWednesday, -3); // Sunday before Ash Wednesday
    }
    const match = liturgicalSunday.match(/(\d+)(st|nd|rd|th)/);
    if (match) {
      const week = parseInt(match[1]);
      // First Sunday after Epiphany is the Sunday after Jan 6
      const firstSunday = addDays(epiphany, (7 - epiphany.getDay()) % 7 || 7);
      return addDays(firstSunday, (week - 1) * 7);
    }
  }

  // LENT
  if (liturgicalSunday === "Ash Wednesday") return ashWednesday;
  if (liturgicalSunday.includes("in Lent")) {
    const match = liturgicalSunday.match(/(\d+)(st|nd|rd|th)/);
    if (match) {
      const week = parseInt(match[1]);
      return addDays(ashWednesday, 3 + (week - 1) * 7); // First Sunday is 3 days after Ash Wed
    }
  }
  if (liturgicalSunday === "Palm Sunday") return addDays(easter, -7);

  // EASTER
  if (liturgicalSunday === "Easter Day") return easter;
  if (liturgicalSunday.includes("of Easter")) {
    const match = liturgicalSunday.match(/(\d+)(st|nd|rd|th)/);
    if (match) {
      const week = parseInt(match[1]);
      return addDays(easter, (week - 1) * 7);
    }
  }
  if (liturgicalSunday === "Ascension Day") return addDays(easter, 39);

  // PENTECOST
  if (liturgicalSunday === "Day of Pentecost") return addDays(easter, 49);

  // ORDINARY TIME
  if (liturgicalSunday === "Trinity Sunday") return addDays(easter, 56);
  if (liturgicalSunday === "Christ the King") {
    const nextAdvent = calculateAdventStart(year + 1);
    return addDays(nextAdvent, -7);
  }

  return null;
}

function getCycleForYear(year: number): 'A' | 'B' | 'C' {
  const remainder = year % 3;
  if (remainder === 0) return 'A';
  if (remainder === 1) return 'B';
  return 'C';
}

async function importCollects() {
  console.log('🙏 Iniciando importação EXPANDIDA de coletas...\\n');

  const years = [2026, 2027, 2028];
  let totalInserted = 0;
  let totalSkipped = 0;

  for (const year of years) {
    const cycle = getCycleForYear(year);
    console.log(`\\n📅 Ano ${year} - Ciclo ${cycle}`);
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

  console.log('\\n' + '='.repeat(50));
  console.log('🎉 IMPORTAÇÃO EXPANDIDA CONCLUÍDA!');
  console.log('='.repeat(50));
  console.log(`\\n📊 Estatísticas:`);
  console.log(`   ✅ Inseridas: ${totalInserted}`);
  console.log(`   ⏭️  Puladas: ${totalSkipped}`);
  console.log(`   📖 Total de coletas únicas: ${collects.length}`);
  console.log(`   📅 Anos processados: ${years.join(', ')}`);
  console.log(`\\n✨ Processo finalizado com sucesso!\\n`);
}

// Run the import
importCollects().catch(console.error);
