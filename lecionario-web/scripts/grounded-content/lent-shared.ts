/**
 * Quaresma — conteúdo comum aos 3 ciclos.
 *
 * `ashWednesday` — a Quarta-feira de Cinzas em si, leitura fixa igual
 * nos 3 ciclos (Joel 2:1-2, 12-17 · Salmo 51:1-17 · 2 Coríntios
 * 5:20b-6:10 · Mateus 6:1-6, 16-21).
 * `ashWednesdayGap` — quinta, sexta e sábado logo depois da Quarta-
 * feira de Cinzas, antes do 1º Domingo real da Quaresma — o RCL não
 * atribui leitura própria a esses 3 dias, então são meditações sobre
 * o próprio tema do início da Quaresma (mesmo padrão de
 * `trinityWeek*`/`epiphanyGapWeek`).
 * `holyWeekEarly` — Segunda, Terça e Quarta-feira Santa (os 3 dias
 * antes da Quinta-feira Santa, que já tem conteúdo dedicado em
 * `triduumContent`), leituras fixas iguais nos 3 ciclos: Isaías 42/
 * João 12 (segunda), Isaías 49/João 12 (terça), Isaías 50/João 13
 * (quarta) — os "Cânticos do Servo" que também apareceram na Epifania,
 * agora lidos à luz da Paixão que se aproxima.
 *
 * Escrito em 2026-08-18.
 */

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

export interface DevotionalEntry {
  prayer: DailyPrayer;
  meditation: MeditationResource;
}

function t(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

// Quarta-feira de Cinzas — Joel 2:1-2, 12-17 · Salmo 51:1-17 · 2 Coríntios 5:20b-6:10 · Mateus 6:1-6, 16-21
export const ashWednesday: DevotionalEntry = {
  prayer: {
    title: 'Rasgai o Vosso Coração, e Não as Vossas Vestes',
    text: t(`Senhor, através de Joel instruis: "convertei-vos a mim
      de todo o vosso coração... e rasgai o vosso coração, e não as
      vossas vestes." Neste início da Quaresma, que meu arrependimento
      seja interior e genuíno, não apenas gesto externo de tristeza
      visível. Cria em mim um coração puro, como o salmista pede.
      Amém.`),
  },
  meditation: {
    prompt: t(`A instrução de Joel distingue deliberadamente entre
      sinal externo de luto (rasgar vestes, prática comum na época) e
      transformação interior real — o profeta pede a segunda, não
      apenas a primeira.`),
    questions: [
      'Sua prática de disciplinas quaresmais (jejum, oração, esmola) tende mais para gesto externo ou transformação interior genuína?',
      'O que significaria, concretamente, "rasgar o coração" nesta Quaresma que começa hoje?',
      'Que área específica da sua vida você quer trazer honestamente diante de Deus nesses quarenta dias?',
    ],
  },
};

// Quinta, sexta e sábado depois da Quarta-feira de Cinzas — sem
// leitura própria no RCL, meditações sobre o início da jornada
// quaresmal.
export const ashWednesdayGap: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Pó És, e ao Pó Tornarás',
      text: t(`Senhor, ontem recebi as cinzas com a lembrança da
        minha própria mortalidade. Que essa consciência, em vez de me
        paralisar em medo, me liberte para viver com mais
        intencionalidade os dias que ainda tenho. Ensina-me a contar
        os meus dias, para que meu coração se aplique à sabedoria.
        Amém.`),
    },
    meditation: {
      prompt: t(`A lembrança da mortalidade, central ao rito da
        Quarta-feira de Cinzas, não é convite ao desespero, mas à
        clareza sobre o que realmente importa no tempo limitado que
        temos.`),
      questions: [
        'Como a consciência renovada da sua própria mortalidade, recebida ontem, já está mudando suas prioridades hoje?',
        'Que atividade você continua adiando, como se tivesse tempo ilimitado para ela?',
        'O que significaria viver hoje com mais intencionalidade, à luz dessa lembrança?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quarenta Dias de Jornada',
      text: t(`Senhor, esses quarenta dias que se abrem diante de
        mim ecoam outras jornadas de quarenta — Moisés no monte,
        Elias no deserto, Jesus na provação. Que eu entre nesse mesmo
        padrão bíblico de tempo dedicado, não como fardo, mas como
        oportunidade real de encontro contigo. Amém.`),
    },
    meditation: {
      prompt: t(`O número quarenta se repete deliberadamente ao
        longo da Escritura como período de formação e prova — a
        Quaresma participa conscientemente dessa mesma tradição
        bíblica de tempo dedicado.`),
      questions: [
        'Como você planeja usar esses quarenta dias de forma diferente de qualquer outro período comum do ano?',
        'Que disciplina específica — jejum, oração adicional, generosidade — você escolheu para esta jornada?',
        'O que você espera, honestamente, que Deus faça em você ao longo desses dias?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Como os Hipócritas',
      text: t(`Senhor, tua instrução no Evangelho de ontem ainda
        ressoa: praticar disciplinas espirituais "não como os
        hipócritas", buscando aprovação secreta do Pai, não
        reconhecimento público. Que minha prática quaresmal, nestes
        primeiros dias, já se estabeleça nessa disposição de
        sinceridade oculta. Amém.`),
    },
    meditation: {
      prompt: t(`A repetida advertência de Jesus contra performance
        religiosa pública, lida no início da Quaresma, estabelece o
        tom para toda a estação: disciplina genuína busca Deus, não
        audiência humana.`),
      questions: [
        'Você já comunicou publicamente suas disciplinas quaresmais mais por prestação de contas genuína ou por desejo de reconhecimento?',
        'O que significaria praticar sua disciplina escolhida "em secreto" nestes próximos dias, sem precisar que ninguém saiba?',
        'Como cultivar essa sinceridade oculta desde já, no início desta jornada de quarenta dias?',
      ],
    },
  },
];

// Segunda-feira Santa — Isaías 42:1-9 · Salmo 36:5-11 · Hebreus 9:11-15 · João 12:1-11
const holyMonday: DevotionalEntry = {
  prayer: {
    title: 'Não Fará Ouvir a Sua Voz na Rua',
    text: t(`Senhor, o primeiro Cântico do Servo descreve alguém que
      "não clamará, não se exaltará, nem fará ouvir a sua voz na
      rua" — força que se expressa em quietude, não em espetáculo.
      Nesta segunda-feira da Semana Santa, que eu reconheça essa
      mesma força silenciosa se aproximando da cruz. Amém.`),
  },
  meditation: {
    prompt: t(`O Cântico do Servo, já lido na Epifania como
      antecipação do Batismo, ganha novo peso nesta semana — a mesma
      figura silenciosa e não violenta caminha agora deliberadamente
      rumo à Paixão.`),
    questions: [
      'Como reler essa profecia de força silenciosa, agora sabendo que ela caminha para a cruz, muda seu peso?',
      'Você associa força genuína mais com exposição pública ou com esse tipo de quietude determinada?',
      'O que significaria enfrentar esta Semana Santa com essa mesma força silenciosa, não ansiedade ruidosa?',
    ],
  },
};

// Terça-feira Santa — Isaías 49:1-7 · Salmo 71:1-14 · 1 Coríntios 1:18-31 · João 12:20-36
const holyTuesday: DevotionalEntry = {
  prayer: {
    title: 'Debalde Tenho Trabalhado',
    text: t(`Senhor, o servo confessa desânimo real: "debalde tenho
      trabalhado, inútil e vãmente gastei as minhas forças." Nesta
      terça-feira santa, diante da cruz que se aproxima, reconheço que
      até o caminho mais fiel pode incluir momentos de sentir que o
      esforço não valeu a pena. Sustenta-me nessa mesma confiança do
      servo. Amém.`),
  },
  meditation: {
    prompt: t(`A confissão de desânimo do servo, lida nesta semana
      específica, ecoa a angústia que o próprio Jesus expressaria em
      breve no Getsêmani — o caminho para a glória passa
      genuinamente pelo desânimo real, não o contorna.`),
    questions: [
      'Você já sentiu, como o servo, que um esforço genuinamente fiel parecia "vão"?',
      'Como essa confissão de desânimo, lida nesta semana específica, muda sua compreensão do caminho de Jesus rumo à cruz?',
      'O que sustenta você continuar, mesmo quando o fruto do seu trabalho fiel não é visível ainda?',
    ],
  },
};

// Quarta-feira Santa — Isaías 50:4-9a · Salmo 70 · Hebreus 12:1-3 · João 13:21-32
const holyWednesday: DevotionalEntry = {
  prayer: {
    title: 'Não Escondi o Rosto dos Que me Afrontavam',
    text: t(`Senhor, o terceiro Cântico do Servo declara: "não
      escondi o rosto dos que me afrontavam e me cuspiam... porque o
      Senhor Deus me ajuda, não me confundo." Nesta véspera da Última
      Ceia, contemplo essa disposição de enfrentar sofrimento
      iminente sem se esconder. Dá-me essa mesma coragem diante do que
      preciso enfrentar. Amém.`),
  },
  meditation: {
    prompt: t(`O autor de Hebreus, na segunda leitura desta quarta-
      feira, instrui a "correr com paciência a carreira" olhando para
      Jesus, "que, pelo gozo que lhe estava proposto, suportou a
      cruz" — a mesma disposição do servo de Isaías, agora nomeada
      diretamente em Cristo.`),
    questions: [
      'Que "afronta" ou dificuldade você está evitando enfrentar diretamente, escondendo o rosto dela?',
      'Como a disposição do servo — e de Jesus — de não se esconder do sofrimento muda sua própria forma de lidar com dificuldade?',
      'O que significaria, nesta véspera da Quinta-feira Santa, entrar no Tríduo com essa mesma coragem serena?',
    ],
  },
};

export const holyWeekEarly: DevotionalEntry[] = [holyMonday, holyTuesday, holyWednesday];
