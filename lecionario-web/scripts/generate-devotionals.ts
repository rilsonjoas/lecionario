/**
 * Gera devocionais diários (oração + meditação) para cada dia do ano,
 * ancorados no RCL (Revised Common Lectionary) via conteúdo grounded
 * por estação litúrgica e ciclo A/B/C.
 *
 * Uso: npx tsx scripts/generate-devotionals.ts
 *
 * Inspirado no estilo e estrutura de:
 *   - E.M. Bounds (oração como poder)
 *   - Richard Foster (oração contemplativa)
 *   - Ann Spangler (oração com os nomes de Deus)
 *   - Charles Spurgeon (profundidade expositiva)
 *
 * Todo conteúdo é original, escrito especificamente para o Lecionário.
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import cycleAData from '../src/data/rcl/cycle-A.json';
import cycleBData from '../src/data/rcl/cycle-B.json';
import cycleCData from '../src/data/rcl/cycle-C.json';
import ordinaryA, { trinityWeekA } from './grounded-content/ordinary-A';
import ordinaryB, { trinityWeekB } from './grounded-content/ordinary-B';
import ordinaryC, { trinityWeekC } from './grounded-content/ordinary-C';
import adventA from './grounded-content/advent-A';
import adventB from './grounded-content/advent-B';
import adventC from './grounded-content/advent-C';
import christmasByCycle, {
  christmasSunday2,
  christmasWeekdays,
} from './grounded-content/christmas';
import { epiphanyDay, epiphanyGapWeek } from './grounded-content/epiphany-shared';
import epiphanyA, { transfigurationWeek as transfigA } from './grounded-content/epiphany-A';
import epiphanyB, { transfigurationWeek as transfigB } from './grounded-content/epiphany-B';
import epiphanyC, { transfigurationWeek as transfigC } from './grounded-content/epiphany-C';
import { ashWednesday, ashWednesdayGap, holyWeekEarly } from './grounded-content/lent-shared';
import lentA from './grounded-content/lent-A';
import lentB from './grounded-content/lent-B';
import lentC from './grounded-content/lent-C';
import easterA from './grounded-content/easter-A';
import easterB from './grounded-content/easter-B';
import easterC from './grounded-content/easter-C';
import {
  pentecostSundayA,
  pentecostSundayB,
  pentecostSundayC,
  pentecostGapWeek,
  trinitySundayA,
  trinitySundayB,
  trinitySundayC,
} from './grounded-content/pentecost';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Tipos ──────────────────────────────────────────────────────────

interface RclReading {
  type: 'first_reading' | 'psalm' | 'second_reading' | 'gospel';
  ref: string;
  text?: string;
}

interface RclEntry {
  date: string;
  season: string;
  weekOfSeason: number;
  dayName: string;
  readings: RclReading[];
}

interface DailyPrayer {
  title: string;
  text: string;
  author?: string;
  source?: string;
}

interface MeditationResource {
  prompt: string;
  questions?: string[];
  duration?: string;
}

interface DevotionalEntry {
  prayer: DailyPrayer;
  meditation: MeditationResource;
}

// ─── Utilitários Litúrgicos ──────────────────────────────────────────

function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function calculateAdventStart(year: number): Date {
  const christmas = new Date(year, 11, 25);
  const dayOfWeek = christmas.getDay();
  const daysBeforeChristmas = dayOfWeek === 0 ? 7 : dayOfWeek;
  const fourthSundayOfAdvent = new Date(christmas.getTime() - daysBeforeChristmas * 86400000);
  return new Date(fourthSundayOfAdvent.getTime() - 21 * 86400000);
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Alinhado com getLiturgicalCycle() em src/lib/liturgical-calendar.ts.
// `year` aqui já é o "ano litúrgico" (o mesmo `year` recebido por
// generateYear/getLiturgicalSeasonForLiturgicalYear, que cobre do Advento
// do ano anterior até novembro deste ano).
function getLiturgicalCycle(liturgicalYear: number): 'A' | 'B' | 'C' {
  const remainder = liturgicalYear % 3;
  if (remainder === 1) return 'A';
  if (remainder === 2) return 'B';
  return 'C';
}

// ─── Leituras Reais do RCL — Tempo Comum ────────────────────────────
//
// Em vez de repetir o mesmo texto genérico por semana inteira, os dias
// do Tempo Comum cobertos por `groundedOrdinary` (ver abaixo) usam o
// domingo real do Lecionário Comum Revisado que rege aquela semana
// (segunda a sábado seguem o mesmo domingo, como nos devocionais
// impressos tradicionais). Isso também resolve a divergência entre a
// numeração de semana calculada localmente (getWeekOfSeason) e a
// numeração usada nos dados do RCL (cycle-A.json etc.): a busca é por
// data, não por número de semana.
// Achado em 2026-08-18 (ver ROADMAP.md 1.2c): este mapa só tinha o
// Ciclo A ligado — B e C nunca foram importados aqui. Resultado:
// `findGoverningOrdinarySunday('B'|'C', ...)` sempre retornava null, e
// o Tempo Comum inteiro dos Ciclos B e C caía inteiro no fallback de
// `trinityWeekByCycle` (só 6 títulos) repetido por todas as ~26
// semanas — apesar de `ordinaryB.ts`/`ordinaryC.ts` estarem completos
// e corretos, eles nunca eram de fato consultados na geração real dos
// devocionais. Confirmado nos JSONs já publicados: título de semana
// da Trindade repetindo 24-25 vezes num único ano de Tempo Comum.
const rclDataByCycle: Partial<Record<'A' | 'B' | 'C', { seasons: Record<string, RclEntry[]> }>> = {
  A: cycleAData as { seasons: Record<string, RclEntry[]> },
  B: cycleBData as { seasons: Record<string, RclEntry[]> },
  C: cycleCData as { seasons: Record<string, RclEntry[]> },
};

// O domingo que rege a semana é o mais recente com date <= dateStr,
// dentro de uma janela de 6 dias (a distância máxima entre um domingo
// e o sábado seguinte). Usado tanto pelo Tempo Comum (temporada
// 'ordinary') quanto pela Epifania (temporada 'epiphany', ver
// findGoverningEpiphanySunday abaixo).
function findGoverningSunday(
  cycle: 'A' | 'B' | 'C',
  date: Date,
  season: string,
  minWeekOfSeason = 0,
): RclEntry | null {
  const data = rclDataByCycle[cycle];
  if (!data) return null;

  const dateStr = formatDate(date);
  const entries = data.seasons[season] ?? [];

  let best: RclEntry | null = null;
  for (const entry of entries) {
    if (entry.weekOfSeason < minWeekOfSeason) continue;
    if (entry.date > dateStr) continue;
    const diffDays = (date.getTime() - new Date(entry.date + 'T00:00:00').getTime()) / 86400000;
    if (diffDays > 6) continue;
    if (!best || entry.date > best.date) best = entry;
  }
  return best;
}

function findGoverningOrdinarySunday(cycle: 'A' | 'B' | 'C', date: Date): RclEntry | null {
  return findGoverningSunday(cycle, date, 'ordinary');
}

// weekOfSeason >= 2 exclui a própria entrada de 6/jan (weekOfSeason
// 1, 'Epifania do Senhor') — esse dia tem tratamento próprio (ver
// getGroundedChristmasContent-like logic em generateForDate), não
// deve ser confundido com um "domingo regente" de semana.
function findGoverningEpiphanySunday(cycle: 'A' | 'B' | 'C', date: Date): RclEntry | null {
  return findGoverningSunday(cycle, date, 'epiphany', 2);
}

function getLiturgicalSeasonForLiturgicalYear(liturgicalYear: number, date: Date): string {
  const d = date;

  // The liturgical year runs from Advent (Dec prev year) through Nov
  // Easter belongs to the liturgical year, e.g. Easter 2026 is in liturgical year 2026
  const easter = calculateEaster(liturgicalYear);
  const ashWednesday = new Date(easter.getTime() - 46 * 86400000);
  const pentecost = new Date(easter.getTime() + 49 * 86400000);
  const adventThisYear = calculateAdventStart(liturgicalYear);
  const adventPrevYear = calculateAdventStart(liturgicalYear - 1);
  const christmasStart = new Date(liturgicalYear - 1, 11, 25);
  const epiphanyStart = new Date(liturgicalYear, 0, 6);

  // Advento que abre este ano litúrgico — achado em 2026-08-18 (ver
  // ROADMAP.md 1.2c): o teste antigo (`m === 11`, ou seja "mês é
  // dezembro") não tinha limite superior, então capturava o mês
  // inteiro, inclusive 25-31/dez — Natal e a semana seguinte nunca
  // eram classificados como 'christmas', só como 'advent' (que vinha
  // primeiro na cadeia de ifs). O limite certo é a data do Natal, não
  // o mês civil.
  if (d >= adventPrevYear && d < christmasStart) return 'advent';

  // Christmas (25/dez do ano anterior até 5/jan deste ano)
  if (d >= christmasStart && d < epiphanyStart) return 'christmas';

  // Epiphany (Jan 6 - Ash Wednesday) - in the liturgical year's Jan/Feb
  if (d >= epiphanyStart && d < ashWednesday) return 'epiphany';

  // Lent (Ash Wednesday - day before Easter)
  if (d >= ashWednesday && d < easter) return 'lent';

  // Easter (Easter Sunday - day before Pentecost)
  if (d >= easter && d < pentecost) return 'easter';

  // Pentecost Sunday + week after
  const pentecostEnd = new Date(pentecost.getTime() + 7 * 86400000);
  if (d >= pentecost && d <= pentecostEnd) return 'pentecost';

  // Ordinary Time (after Pentecost to Advent)
  if (d > pentecostEnd && d < adventThisYear) return 'ordinary';

  // Advento que abre o PRÓXIMO ano litúrgico — só alcançado no fim de
  // novembro deste ano civil (o laço de generateYear() termina em
  // 30/nov, antes da virada pro próximo ano litúrgico). Sem este
  // caso, esses últimos dias caíam no fallback final de 'ordinary'
  // em vez de 'advent'.
  if (d >= adventThisYear) return 'advent';

  return 'ordinary';
}

function getWeekOfSeason(date: Date, season: string, liturgicalYear: number, easter: Date): number {
  let seasonStart: Date;
  switch (season) {
    case 'advent': {
      // Achado em 2026-08-18 (ver ROADMAP.md 1.2c): generateYear() cobre
      // dois períodos de Advento diferentes no mesmo laço — o que abre
      // este ano litúrgico (dez do ano anterior) e o que abre o
      // PRÓXIMO (fim de novembro deste ano civil). Usar sempre o mesmo
      // `adventStart` fixo fazia a segunda pontinha de novembro
      // calcular uma semana absurda (~52), que caía no fallback de
      // semana 1 por acidente, não por estar correta.
      const adventThisYear = calculateAdventStart(liturgicalYear);
      const adventPrevYear = calculateAdventStart(liturgicalYear - 1);
      seasonStart = date >= adventThisYear ? adventThisYear : adventPrevYear;
      break;
    }
    case 'christmas':
      seasonStart = new Date(date.getFullYear() - (date.getMonth() < 6 ? 1 : 0), 11, 25);
      break;
    case 'epiphany': {
      const year = date.getMonth() < 6 ? date.getFullYear() : date.getFullYear() + 1;
      seasonStart = new Date(year, 0, 6);
      break;
    }
    case 'lent':
      // Achado em 2026-08-18 (ver ROADMAP.md 1.2h): contar a semana a
      // partir da própria Quarta-feira de Cinzas (sempre uma
      // quarta-feira) desalinhava a numeração do conteúdo ancorado —
      // que é escrito por semana real domingo-sábado, como nas outras
      // estações. Conta a partir do 1º Domingo da Quaresma (Cinzas+4
      // dias, sempre um domingo) em vez disso; a própria
      // Quarta-feira de Cinzas e os 3 dias seguintes (quinta a
      // sábado) são tratados à parte por data exata, não por esta
      // numeração de semana — ver generateForDate.
      seasonStart = new Date(easter.getTime() - 46 * 86400000 + 4 * 86400000); // 1º Domingo da Quaresma
      break;
    case 'easter':
    case 'pentecost':
      seasonStart = easter;
      break;
    case 'ordinary': {
      const pentecost = new Date(easter.getTime() + 49 * 86400000);
      seasonStart = new Date(pentecost.getTime() + 7 * 86400000);
      break;
    }
    default:
      seasonStart = date;
  }
  return Math.floor((date.getTime() - seasonStart.getTime()) / (86400000 * 7)) + 1;
}

// ─── Tempo Comum Ancorado no RCL ─────────────────────────────────────
//
// Diferente dos templates genéricos acima (um texto por semana,
// repetido de domingo a sábado), este conteúdo é escrito a partir das
// leituras reais daquele domingo do RCL (ver scripts/grounded-content/).
// Cada dia da semana reflete sobre uma leitura ou ângulo diferente do
// mesmo domingo, então os sete dias não se repetem — e o conteúdo muda
// de verdade quando o ciclo litúrgico muda (A/B/C), porque a leitura
// muda. Array de 7 entradas por semana, índice = date.getDay()
// (0 = domingo … 6 = sábado). Cobertura de cada ciclo documentada no
// topo do respectivo módulo em scripts/grounded-content/.
const groundedOrdinary: Partial<Record<'A' | 'B' | 'C', Record<number, DevotionalEntry[]>>> = {
  A: ordinaryA,
  B: ordinaryB,
  C: ordinaryC,
};

const trinityWeekByCycle: Partial<Record<'A' | 'B' | 'C', DevotionalEntry[]>> = {
  A: trinityWeekA,
  B: trinityWeekB,
  C: trinityWeekC,
};

// Advento — mesma lógica de `groundedOrdinary`, mas sempre exatamente
// 4 semanas fixas (1-4) em vez de Próprios variáveis — a primeira
// semana do Advento sempre começa no domingo entre 27/nov e 3/dez,
// então `getWeekOfSeason` já produz 1-4 de forma estável, sem
// precisar de um "domingo regente" calculado por data como no Tempo
// Comum. Ver scripts/grounded-content/advent-*.ts.
const groundedAdvent: Partial<Record<'A' | 'B' | 'C', Record<number, DevotionalEntry[]>>> = {
  A: adventA,
  B: adventB,
  C: adventC,
};

// Epifania — do Batismo do Senhor (weekOfSeason 2) até o 7º Domingo
// (weekOfSeason 8). O Domingo da Transfiguração é tratado à parte
// (transfigurationWeekByCycle), localizado por nome do dia, não por
// número de semana, porque ele pode ocupar qualquer weekOfSeason de 6
// a 10 dependendo do ano (ver ROADMAP.md 1.2f). Ver
// scripts/grounded-content/epiphany-*.ts.
const groundedEpiphany: Partial<Record<'A' | 'B' | 'C', Record<number, DevotionalEntry[]>>> = {
  A: epiphanyA,
  B: epiphanyB,
  C: epiphanyC,
};

const transfigurationWeekByCycle: Partial<Record<'A' | 'B' | 'C', DevotionalEntry[]>> = {
  A: transfigA,
  B: transfigB,
  C: transfigC,
};

// Quaresma — 5 semanas fixas (1º-5º Domingo), mesmo padrão de
// groundedAdvent. A semana 6 (Domingo de Ramos) não tem array aqui —
// o próprio domingo, quinta e sexta-feira e sábado já são
// sobrescritos por `triduumContent`; só segunda/terça/quarta dessa
// semana usam `holyWeekEarly` (ver generateForDate). Ver
// scripts/grounded-content/lent-*.ts.
const groundedLent: Partial<Record<'A' | 'B' | 'C', Record<number, DevotionalEntry[]>>> = {
  A: lentA,
  B: lentB,
  C: lentC,
};

// Páscoa — mesma lógica de groundedAdvent: sempre exatamente 7 semanas
// fixas (Domingo da Ressurreição ao 7º Domingo da Páscoa), sem
// necessidade de adaptação de data — Páscoa é sempre domingo, como o
// próprio Advento. Ver scripts/grounded-content/easter-*.ts.
const groundedEaster: Partial<Record<'A' | 'B' | 'C', Record<number, DevotionalEntry[]>>> = {
  A: easterA,
  B: easterB,
  C: easterC,
};

// Pentecostes + Trindade — ver scripts/grounded-content/pentecost.ts:
// os 8 dias fixos entre o Domingo de Pentecostes e o Domingo da
// Trindade (inclusive), tratados por data exata em generateForDate.
const pentecostSundayByCycle: Partial<Record<'A' | 'B' | 'C', DevotionalEntry>> = {
  A: pentecostSundayA,
  B: pentecostSundayB,
  C: pentecostSundayC,
};

const trinitySundayByCycle: Partial<Record<'A' | 'B' | 'C', DevotionalEntry>> = {
  A: trinitySundayA,
  B: trinitySundayB,
  C: trinitySundayC,
};

// ─── Tríduo Pascal — Conteúdo Fixo ──────────────────────────────────
//
// Estes quatro dias são o ápice do ano litúrgico. O script de geração
// usa seededPick por semana, o que causaria qualquer dia da semana 6
// da Quaresma (Ramos, Quinta, Sexta, Sábado) receber conteúdo genérico
// ou trocado. Este mapa garante que cada dia do Tríduo receba exatamente
// o seu conteúdo — sobrescrito após o loop principal em generateYear().

const triduumContent: Record<
  'palmSunday' | 'holyThursday' | 'goodFriday' | 'holySaturday',
  DevotionalEntry
> = {
  palmSunday: {
    prayer: {
      title: 'O Rei Humilde',
      text: t(`Jesus, Rei da paz, entraste em Jerusalém montado num
        jumentinho, não num cavalo de guerra. A multidão gritava
        "Hosana!", mas poucos entenderam o que teu reino significa.
        Dá-nos olhos para ver o Rei na sua humildade. Ensina-nos que
        a verdadeira grandeza está em servir, não em ser servido. Nesta
        Semana Santa, caminha conosco. Deixa-nos sentir a profundidade
        do teu amor na cruz, para que possamos experimentar o poder
        da tua ressurreição. Amém.`),
    },
    meditation: {
      prompt: t(`A entrada de Jesus em Jerusalém revelou dois tipos de
        discípulos: os que aclamavam buscando um rei político, e os que
        permaneceriam ao pé da cruz. O mesmo "Hosana" pode esconder
        expectativas muito diferentes.`),
      questions: [
        'Você segue Jesus quando ele corresponde às suas expectativas, ou também quando o caminho leva à cruz?',
        'O que você estaria pedindo a Jesus naquele momento — libertação, cura, provisão? Sua fé é condicional?',
        'Nesta Semana Santa, o que você precisa abandonar para seguir o verdadeiro Rei?',
      ],
      duration: '15 min',
    },
  },

  holyThursday: {
    prayer: {
      title: 'Quinta-Feira Santa',
      text: t(`Senhor Jesus, naquela noite em que fostes entregue,
        tomastes o pão, destes graças, quebraste-o e disseste:
        "Fazei isto em memória de mim." Antes de tudo, lavaste os pés
        dos teus discípulos — os pés de homens que te abandonariam
        em poucas horas. O teu amor não esperou que merecêssemos.
        Ensinaste que a grandeza no teu Reino é servir, que a comunhão
        contigo passa pelo partir do pão e pelo cuidado do próximo.
        Nesta noite santa, vem à nossa mesa. Deixa que tua presença
        consagre cada refeição partilhada, cada gesto de serviço
        humilde. "Amai-vos uns aos outros como eu vos amei." Amém.`),
    },
    meditation: {
      prompt: t(`Jesus lavou os pés dos seus discípulos — incluindo
        os de Judas, que ia traí-lo horas depois. O serviço genuíno não
        aguarda que o outro mereça. A mesa e a bacia de água ensinam
        o mesmo: o amor de Cristo vai até o fim.`),
      questions: [
        'A quem você acha difícil servir? O que isso revela sobre sua compreensão do amor de Cristo?',
        'Jesus disse "Fazei isto em memória de mim". O que significa lembrar Jesus em cada refeição partilhada?',
        'Que "pés" — vulnerabilidades, necessidades — você precisa deixar Jesus lavar hoje?',
      ],
      duration: '20 min',
    },
  },

  goodFriday: {
    prayer: {
      title: 'Sexta-Feira Santa',
      text: t(`Cristo crucificado, diante da tua cruz silenciamos.
        Não há palavras que possam expressar a profundidade deste amor.
        Os nossos pecados cravados em tuas mãos. A nossa culpa
        sepultada contigo. O véu rasgado, o acesso aberto. Hoje
        contemplamos o amor mais radical da história: o Criador
        morrendo pela criatura. O Justo pelos injustos. O Santo
        feito pecado por nós. "Consumado está" não é derrota —
        é vitória. Que nunca nos acostumemos com a cruz. Que ela
        seja sempre o centro da nossa fé. Amém.`),
    },
    meditation: {
      prompt: t(`Na cruz, Jesus não morreu como mártir resignado,
        mas como Sumo Sacerdote cumprindo o sacrifício definitivo.
        "Consumado está" — em grego, tetelestai — era o carimbo posto
        em dívidas pagas integralmente. A dívida foi quitada.`),
      questions: [
        'Diante da cruz, o que você sente — culpa, gratidão, estranheza? Seja honesto com Deus sobre isso.',
        'O véu do templo rasgou-se de cima para baixo. O que este gesto significa para o seu acesso a Deus hoje?',
        'Há algo que você ainda tenta "ganhar" de Deus em vez de simplesmente receber o que a cruz já conquistou?',
      ],
      duration: '20 min',
    },
  },

  holySaturday: {
    prayer: {
      title: 'Sábado Santo',
      text: t(`Cristo sepultado, hoje o mundo parece silencioso demais.
        Os discípulos dispersaram-se. A pedra está posta. O Sábado
        chegou, mas não é descanso — é espera. Não sabemos tudo o que
        fizeste nos lugares onde os mortos aguardam; sabemos apenas que
        desceste até o abismo mais fundo, que não há lugar tão distante
        para onde teu amor não chegue. Neste dia entre a morte e a vida,
        ensina-nos a permanecer no silêncio sem fugir. A esperar sem
        desesperar. A confiar mesmo quando tudo parece acabado. O
        Sábado terminará. A aurora vem. Amém.`),
    },
    meditation: {
      prompt: t(`O Sábado Santo é o único dia em que os discípulos
        não sabiam que a história ainda não havia terminado. Eles
        viveram aquele dia sem a certeza da ressurreição. Às vezes
        nossa fé também habita esse espaço — entre a promessa
        e o cumprimento.`),
      questions: [
        'Em que área da sua vida você está "no sábado" — entre a morte de uma expectativa e a ressurreição de algo novo?',
        'O que significa confiar em Deus quando não há evidência visível de que Ele ainda está agindo?',
        'Como você lida com o silêncio de Deus nos momentos mais difíceis? O que os discípulos no cenáculo ensinam?',
      ],
      duration: '20 min',
    },
  },
};

// ─── Gerador de Devocionais ─────────────────────────────────────────

interface GeneratedDevotional {
  entries: Record<string, DevotionalEntry>;
}

function t(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getNextSunday(date: Date): Date {
  const d = new Date(date);
  while (d.getDay() !== 0) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

// Natal: 25/dez não cai sempre no mesmo dia da semana, então não dá
// pra indexar por `date.getDay()` como no Advento/Tempo Comum — ver
// scripts/grounded-content/christmas.ts pro raciocínio completo.
// Calcula, pra qualquer data dentro da estação, se é o próprio Dia de
// Natal, o 1º ou 2º Domingo depois do Natal (calculados
// dinamicamente, igual à mesma lógica em generate-rcl-data.ts), ou um
// dia de semana comum — nesse caso, conta quantos dias de semana já
// se passaram desde 26/dez pra escolher uma entrada sem repetir.
function getGroundedChristmasContent(date: Date, cycle: 'A' | 'B' | 'C'): DevotionalEntry | null {
  const year = date.getMonth() < 6 ? date.getFullYear() - 1 : date.getFullYear();
  const christmasDay = new Date(year, 11, 25);
  const epiphany = new Date(year + 1, 0, 6);

  if (formatDate(date) === formatDate(christmasDay)) {
    return christmasByCycle[cycle].day;
  }

  const sunday1 = getNextSunday(addDays(christmasDay, 1));
  const sunday2Candidate = addDays(sunday1, 7);
  const sunday2 = sunday2Candidate < epiphany ? sunday2Candidate : null;

  if (formatDate(date) === formatDate(sunday1)) {
    return christmasByCycle[cycle].sunday1;
  }
  if (sunday2 && formatDate(date) === formatDate(sunday2)) {
    return christmasSunday2;
  }

  let weekdayCount = 0;
  for (let d = addDays(christmasDay, 1); d <= date; d = addDays(d, 1)) {
    const isSunday1 = formatDate(d) === formatDate(sunday1);
    const isSunday2 = sunday2 && formatDate(d) === formatDate(sunday2);
    if (!isSunday1 && !isSunday2) weekdayCount++;
  }
  if (weekdayCount === 0) return null;
  return christmasWeekdays[(weekdayCount - 1) % christmasWeekdays.length];
}

function generateForDate(
  date: Date,
  season: string,
  week: number,
  cycle: 'A' | 'B' | 'C',
): DevotionalEntry | null {
  // Tempo Comum: tenta primeiro o conteúdo ancorado no domingo real do
  // RCL (ver groundedOrdinary). `weekOfSeason` aqui é o número real do
  // Próprio (3-29, ver getProperNumberForDate em generate-rcl-data.ts)
  // — não mais uma contagem sequencial desde a Trindade. Ciclos A, B e
  // C completos (Próprios 3-29 / 4-29 / 4-29) — ver ROADMAP.md 1.2a.
  if (season === 'ordinary') {
    const governingSunday = findGoverningOrdinarySunday(cycle, date);

    // Os 6 dias entre a Trindade e o primeiro Próprio real (sempre
    // Trindade+1 a Trindade+6, todo ano) não têm domingo "regente"
    // dentro da janela de 6 dias — não pertencem a nenhum Próprio do
    // RCL. Sem este caso, esses dias ficavam sem devocional nenhum
    // (achado em 2026-08-17). date.getDay() aqui vai de 1 (segunda) a
    // 6 (sábado); trinityWeekByCycle[cycle] está indexado 0-5 na
    // mesma ordem.
    const trinityWeek = trinityWeekByCycle[cycle];
    if (!governingSunday && trinityWeek && date.getDay() >= 1 && date.getDay() <= 6) {
      return trinityWeek[date.getDay() - 1];
    }

    const groundedWeek = governingSunday
      ? groundedOrdinary[cycle]?.[governingSunday.weekOfSeason]
      : undefined;
    if (groundedWeek) {
      return groundedWeek[date.getDay()];
    }
  }

  // Advento: 4 semanas fixas, ancoradas nas leituras reais de cada
  // ciclo (ver scripts/grounded-content/advent-*.ts). `week` aqui já
  // vem de getWeekOfSeason, que produz 1-4 de forma estável (a
  // primeira semana do Advento sempre cai no domingo certo).
  if (season === 'advent') {
    const groundedWeek = groundedAdvent[cycle]?.[week];
    if (groundedWeek) {
      return groundedWeek[date.getDay()];
    }
  }

  // Natal: ver getGroundedChristmasContent — estrutura própria porque
  // 25/dez não cai sempre no mesmo dia da semana.
  if (season === 'christmas') {
    const grounded = getGroundedChristmasContent(date, cycle);
    if (grounded) return grounded;
  }

  // Epifania: do Batismo do Senhor à Transfiguração usa o mesmo
  // padrão do Tempo Comum (domingo real rege a semana, ver
  // findGoverningEpiphanySunday); 6/jan em si e os dias entre 6/jan e
  // o Batismo (0-6 dias, variam por ano) têm tratamento próprio — ver
  // scripts/grounded-content/epiphany-shared.ts.
  if (season === 'epiphany') {
    if (formatDate(date) === formatDate(new Date(date.getFullYear(), 0, 6))) {
      return epiphanyDay;
    }
    const governingSunday = findGoverningEpiphanySunday(cycle, date);
    if (!governingSunday && date.getDay() >= 1 && date.getDay() <= 6) {
      return epiphanyGapWeek[date.getDay() - 1];
    }
    if (governingSunday?.dayName === 'Domingo da Transfiguração') {
      return transfigurationWeekByCycle[cycle]?.[date.getDay()] ?? null;
    }
    const groundedWeek = governingSunday
      ? groundedEpiphany[cycle]?.[governingSunday.weekOfSeason]
      : undefined;
    if (groundedWeek) {
      return groundedWeek[date.getDay()];
    }
  }

  // Quaresma: a Quarta-feira de Cinzas em si e os 3 dias seguintes
  // (quinta a sábado, sem leitura própria no RCL) são tratados por
  // data exata, antes do 1º Domingo real da Quaresma — ver
  // getWeekOfSeason (achado em 2026-08-18, ROADMAP.md 1.2h): a
  // numeração de semana conta a partir desse 1º Domingo, não da
  // própria Quarta-feira de Cinzas, pra alinhar com o conteúdo
  // ancorado (escrito por semana domingo-sábado, como nas outras
  // estações). Semana 6 (semana do Domingo de Ramos) só precisa de
  // conteúdo próprio pra segunda/terça/quarta — domingo, quinta,
  // sexta e sábado já são sobrescritos por `triduumContent` depois.
  if (season === 'lent') {
    const easter = calculateEaster(date.getFullYear());
    const ashWed = addDays(easter, -46);
    if (formatDate(date) === formatDate(ashWed)) {
      return ashWednesday;
    }
    const daysSinceAsh = Math.round((date.getTime() - ashWed.getTime()) / 86400000);
    if (daysSinceAsh > 0 && daysSinceAsh < 4) {
      return ashWednesdayGap[daysSinceAsh - 1];
    }
    if (week === 6) {
      if (date.getDay() >= 1 && date.getDay() <= 3) {
        return holyWeekEarly[date.getDay() - 1];
      }
      return null;
    }
    const groundedWeek = groundedLent[cycle]?.[week];
    if (groundedWeek) {
      return groundedWeek[date.getDay()];
    }
  }

  // Páscoa: 7 semanas fixas, ancoradas nas leituras reais de cada
  // ciclo (ver scripts/grounded-content/easter-*.ts) — mesmo padrão do
  // Advento, já que o Domingo de Páscoa é sempre domingo.
  if (season === 'easter') {
    const groundedWeek = groundedEaster[cycle]?.[week];
    if (groundedWeek) {
      return groundedWeek[date.getDay()];
    }
  }

  // Pentecostes + Trindade: a estação 'pentecost' cobre sempre os
  // mesmos 8 dias fixos (Domingo de Pentecostes a Domingo da
  // Trindade, ambos inclusive) — tratados por data exata, não por
  // semana, já que só há esses 2 domingos com leitura própria e 6
  // dias de intervalo sem leitura no RCL. Ver
  // scripts/grounded-content/pentecost.ts.
  if (season === 'pentecost') {
    const easter = calculateEaster(date.getFullYear());
    const pentecostDay = addDays(easter, 49);
    const trinityDay = addDays(pentecostDay, 7);
    if (formatDate(date) === formatDate(pentecostDay)) {
      return pentecostSundayByCycle[cycle] ?? null;
    }
    if (formatDate(date) === formatDate(trinityDay)) {
      return trinitySundayByCycle[cycle] ?? null;
    }
    const daysSincePentecost = Math.round((date.getTime() - pentecostDay.getTime()) / 86400000);
    if (daysSincePentecost > 0 && daysSincePentecost < 7) {
      return pentecostGapWeek[daysSincePentecost - 1] ?? null;
    }
  }

  return null;
}

function generateYear(year: number): Record<string, DevotionalEntry> {
  const entries: Record<string, DevotionalEntry> = {};
  const easter = calculateEaster(year);
  const cycle = getLiturgicalCycle(year);
  const nextCycle = getLiturgicalCycle(year + 1);
  const prevCycle = getLiturgicalCycle(year - 1);
  const adventThisYear = calculateAdventStart(year);
  const adventPrevYear = calculateAdventStart(year - 1);

  // Generate from Dec 1 of previous year (Advent) to Nov 30 of current year
  const startDate = new Date(year - 1, 11, 1);
  const endDate = new Date(year, 11, 1);

  const current = new Date(startDate);
  while (current < endDate) {
    const dateStr = formatDate(current);

    if (!entries[dateStr]) {
      const season = getLiturgicalSeasonForLiturgicalYear(year, current);
      const week = getWeekOfSeason(current, season, year, easter);

      // Achado em 2026-08-18 (ver ROADMAP.md 1.2c): o Advento que abre
      // o PRÓXIMO ano litúrgico às vezes começa em novembro (27-30),
      // ainda dentro do intervalo Dez-Nov deste bloco — mas pertence
      // ao ciclo do ANO SEGUINTE, não ao ciclo `year` usado no resto
      // do laço. Sem isso, esses últimos dias de novembro mostravam
      // conteúdo do Advento do ciclo errado.
      //
      // Achado em 2026-08-18 (validação Páscoa/Pentecostes, ver
      // ROADMAP.md 1.2i): o espelho do mesmo problema existe no INÍCIO
      // do laço — quando o Advento do ANO ANTERIOR (que abre o ano
      // litúrgico `year`) começa depois de 1/dez (ex.: 3/dez), os dias
      // 1-2/dez ainda pertencem à cauda do ano litúrgico ANTERIOR
      // (Cristo Rei), que usa o ciclo de `year - 1`, não o `cycle`
      // usado no resto do laço. Sem isso, esses 1-2 dias mostravam
      // conteúdo de Cristo Rei do ciclo errado — e, por serem sempre o
      // mesmo título todo ano em que isso acontece, criavam repetição
      // exata com o fim de novembro do ARQUIVO SEGUINTE (achado
      // validando devotionals-2029.json/2030.json contra as datas
      // reais de Cristo Rei/Advento, não contra o módulo isolado).
      const effectiveCycle =
        season === 'advent' && current >= adventThisYear
          ? nextCycle
          : current < adventPrevYear
            ? prevCycle
            : cycle;

      const devotional = generateForDate(current, season, week, effectiveCycle);
      if (devotional) {
        entries[dateStr] = devotional;
      }
    }

    current.setDate(current.getDate() + 1);
  }

  // Sobrescreve os quatro dias do Tríduo Pascal com conteúdo dedicado.
  // Feito após o loop para garantir que qualquer conteúdo genérico
  // gerado para esses dias seja substituído.
  const msPerDay = 86400000;
  entries[formatDate(new Date(easter.getTime() - 7 * msPerDay))] = triduumContent.palmSunday;
  entries[formatDate(new Date(easter.getTime() - 3 * msPerDay))] = triduumContent.holyThursday;
  entries[formatDate(new Date(easter.getTime() - 2 * msPerDay))] = triduumContent.goodFriday;
  entries[formatDate(new Date(easter.getTime() - 1 * msPerDay))] = triduumContent.holySaturday;

  return entries;
}

// ─── Main ───────────────────────────────────────────────────────────

function main() {
  const outputDir = resolve(__dirname, '../src/data/rcl');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const years = [2025, 2026, 2027, 2028, 2029, 2030];

  for (const year of years) {
    console.log(`Gerando devocionais para ${year}...`);
    const entries = generateYear(year);
    const output = {
      year,
      entries,
    };

    const filePath = resolve(outputDir, `devotionals-${year}.json`);
    writeFileSync(filePath, JSON.stringify(output, null, 2));
    console.log(`  ✅ Gerado ${filePath} (${Object.keys(entries).length} dias)`);
  }

  console.log('\n📊 Resumo:');
  let total = 0;
  for (const year of years) {
    const filePath = resolve(outputDir, `devotionals-${year}.json`);
    const data = JSON.parse(String(readFileSync(filePath))) as {
      year: number;
      entries: Record<string, DevotionalEntry>;
    };
    const count = Object.keys(data.entries).length;
    console.log(`  ${year}: ${count} dias`);
    total += count;
  }
  console.log(`  Total: ${total} devocionais gerados`);
}

main();
