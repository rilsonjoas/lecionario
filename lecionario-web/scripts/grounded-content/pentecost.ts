/**
 * Pentecostes e Trindade — conteúdo ancorado no RCL (leituras reais).
 *
 * Estrutura própria, parecida com christmas.ts/epiphany-shared.ts: a
 * estação 'pentecost' em generate-devotionals.ts cobre só 8 dias fixos
 * todo ano — Domingo de Pentecostes (sempre Páscoa+49) até o Domingo
 * da Santíssima Trindade (sempre Pentecostes+7) — antes de o Tempo
 * Comum realmente começar. Os 6 dias entre os dois domingos (segunda a
 * sábado) não têm leitura própria no RCL.
 *
 * - `pentecostSunday{A,B,C}` — Domingo de Pentecostes em si. 1ª
 *   leitura e salmo são idênticos nos 3 ciclos (Atos 2:1-21 · Salmo
 *   104:24-34, 35b); 2ª leitura e evangelho variam.
 * - `pentecostGapWeek` — os 6 dias entre Pentecostes e a Trindade,
 *   sem leitura própria no RCL, compartilhados pelos 3 ciclos (mesmo
 *   padrão de `epiphanyGapWeek`/`ashWednesdayGap`).
 * - `trinitySunday{A,B,C}` — Domingo da Santíssima Trindade em si.
 *   Mesmas 4 leituras usadas por `trinityWeek{A,B,C}` (ver
 *   ordinary-{A,B,C}.ts), mas ali o conteúdo é sobre os 6 dias DEPOIS
 *   da Trindade — aqui é sobre o próprio domingo, com ângulos e
 *   títulos deliberadamente diferentes dos já usados nesses arquivos,
 *   pra não repetir.
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

// Domingo de Pentecostes — Ciclo A — Atos 2:1-21 · Salmo 104:24-34, 35b · 1 Coríntios 12:3b-13 · João 20:19-23
export const pentecostSundayA: DevotionalEntry = {
  prayer: {
    title: 'Repartindo Dons, o Mesmo Espírito',
    text: t(`Espírito Santo, hoje celebramos tua chegada visível sobre
      a igreja — línguas de fogo, vento impetuoso, e línguas
      compreendidas por gente de toda nação. Paulo escreve que "há
      diversidade de dons, mas o Espírito é o mesmo." Que eu reconheça
      hoje meu próprio dom, recebido do mesmo Espírito que uniu tantas
      línguas naquele dia. Amém.`),
  },
  meditation: {
    prompt: t(`Pentecostes inverte Babel: em vez de confusão que
      dispersa, o Espírito produz compreensão que une — cada pessoa
      ouve as grandezas de Deus na própria língua, sem perder
      identidade.`),
    questions: [
      'Que dom específico você reconhece ter recebido do Espírito, mesmo que diferente do de outros ao seu redor?',
      'Como a diversidade de dons descrita por Paulo — todos do mesmo Espírito — desafia comparação ou inveja entre dons diferentes?',
      'O que significaria hoje usar seu próprio dom, sem tentar imitar o de outra pessoa?',
    ],
  },
};

// Domingo de Pentecostes — Ciclo B — Atos 2:1-21 · Salmo 104:24-34, 35b · Romanos 8:22-27 · João 15:26-27; 16:4b-15
export const pentecostSundayB: DevotionalEntry = {
  prayer: {
    title: 'O Espírito Ajuda na Nossa Fraqueza',
    text: t(`Espírito Santo, hoje celebramos tua chegada sobre a
      igreja, mas Paulo lembra que tua obra não termina no
      espetáculo daquele dia: "o Espírito nos ajuda na fraqueza;
      porque não sabemos o que havemos de pedir como convém, mas o
      Espírito mesmo intercede por nós com gemidos inexprimíveis."
      Intercede hoje por mim, onde minhas próprias palavras não
      alcançam. Amém.`),
  },
  meditation: {
    prompt: t(`Paulo descreve uma obra do Espírito muito mais
      silenciosa do que o vento e o fogo de Atos 2 — intercessão
      contínua, precisamente nos momentos em que nem sabemos formular
      o próprio pedido.`),
    questions: [
      'Existe algo que você carrega hoje sem conseguir sequer formular em palavras o que gostaria de pedir a Deus?',
      'Como a promessa de que "o Espírito intercede com gemidos inexprimíveis" muda sua ansiedade sobre orar "certo"?',
      'O que significaria confiar hoje nessa intercessão silenciosa, mesmo sem sentir o espetáculo do primeiro Pentecostes?',
    ],
  },
};

// Domingo de Pentecostes — Ciclo C — Atos 2:1-21 · Salmo 104:24-34, 35b · Romanos 8:14-17 · João 14:8-17, 25-27
export const pentecostSundayC: DevotionalEntry = {
  prayer: {
    title: 'Recebestes o Espírito de Adoção',
    text: t(`Espírito Santo, hoje celebramos tua chegada sobre a
      igreja. Paulo escreve que "não recebestes o espírito de
      escravidão, para outra vez estardes com temor, mas recebestes o
      espírito de adoção, pelo qual clamamos: Aba, Pai!" Que eu viva
      hoje como filho, não como servo com medo. Amém.`),
  },
  meditation: {
    prompt: t(`Paulo contrasta diretamente dois espíritos possíveis —
      escravidão (medo) e adoção (intimidade filial) — e identifica o
      que os cristãos efetivamente receberam no Pentecostes como o
      segundo, não o primeiro.`),
    questions: [
      'Sua relação com Deus tende mais para o "espírito de escravidão" (medo, performance) ou para o "espírito de adoção" (intimidade, confiança)?',
      'O que significaria clamar hoje, como filho, "Aba, Pai", em vez de se aproximar com medo?',
      'Como a chegada do Espírito no Pentecostes muda concretamente essa relação, não apenas em teoria?',
    ],
  },
};

// Segunda a sábado entre o Domingo de Pentecostes e o Domingo da
// Trindade — sem leitura própria no RCL, meditações sobre a vida
// cotidiana da igreja depois do grande dia.
export const pentecostGapWeek: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Depois do Vento e do Fogo',
      text: t(`Espírito Santo, ontem celebramos teu batismo de fogo e
        vento sobre a igreja — hoje a vida comum retoma seu ritmo.
        Que eu não confunda ausência de espetáculo com ausência de
        tua presença. Continua a agir hoje, mesmo sem línguas de fogo
        visíveis. Amém.`),
    },
    meditation: {
      prompt: t(`O dia depois de Pentecostes não vem acompanhado de
        nova manifestação espetacular — a igreja precisou aprender a
        reconhecer a presença contínua do Espírito na vida comum, não
        apenas no evento extraordinário.`),
      questions: [
        'Você tende a associar a presença de Deus mais com momentos espetaculares do que com a vida comum do dia a dia?',
        'Como reconhecer hoje, num dia sem nada de extraordinário, a mesma presença que se manifestou ontem com tanta força?',
        'O que significaria viver esta semana esperando o Espírito na rotina, não apenas em momentos marcantes?',
      ],
    },
  },
  {
    prayer: {
      title: 'Uma Igreja de Muitas Línguas',
      text: t(`Espírito Santo, no Pentecostes, pessoas de "todas as
        nações que há debaixo do céu" ouviram, cada uma em sua
        própria língua, "as grandezas de Deus." Que a igreja que
        habito hoje reflita essa mesma amplitude, sem exigir
        uniformidade que tu mesmo não exigiste. Amém.`),
    },
    meditation: {
      prompt: t(`O milagre de Pentecostes preserva deliberadamente a
        diversidade de línguas, em vez de impor uma única língua
        comum — a unidade do Espírito não elimina diferença
        legítima.`),
      questions: [
        'Sua comunidade de fé valoriza diversidade genuína, ou espera uniformidade disfarçada de unidade?',
        'Que "língua" diferente da sua — forma de expressar fé, cultura, temperamento — você poderia aprender a valorizar mais?',
        'O que significaria buscar hoje unidade sem exigir que todos "falem" exatamente da mesma forma?',
      ],
    },
  },
  {
    prayer: {
      title: 'Estão Cheios de Mosto',
      text: t(`Espírito Santo, quando a igreja recebeu teu poder,
        alguns zombaram: "estão cheios de mosto." A obra genuína de
        Deus nem sempre é reconhecida por quem observa de fora —
        às vezes é confundida com algo menor. Ajuda-me a não desistir
        diante de zombaria semelhante. Amém.`),
    },
    meditation: {
      prompt: t(`A zombaria de alguns espectadores no primeiro
        Pentecostes lembra que manifestações genuínas do Espírito nem
        sempre são recebidas com reverência — má interpretação e
        ridicularização são reação possível, não prova de fracasso.`),
      questions: [
        'Você já teve uma experiência genuína de fé mal interpretada ou ridicularizada por quem observava de fora?',
        'Como a reação de Pedro — explicar com calma, não revidar com raiva — poderia orientar sua própria resposta a isso?',
        'O que significaria continuar fiel esta semana, mesmo sabendo que nem todos reconhecerão o que você vive como genuíno?',
      ],
    },
  },
  {
    prayer: {
      title: 'Filhos e Filhas Profetizarão',
      text: t(`Espírito Santo, através de Joel, prometeste: "os
        vossos filhos e as vossas filhas profetizarão, os vossos
        mancebos terão visões, os vossos anciãos terão sonhos." Um
        derramamento que não escolhe apenas líderes estabelecidos.
        Que eu reconheça hoje essa mesma amplitude ao meu redor. Amém.`),
    },
    meditation: {
      prompt: t(`A profecia citada por Pedro nomeia deliberadamente
        categorias inteiras normalmente excluídas de liderança
        religiosa — filhos, filhas, jovens, servos — como
        destinatários igualmente válidos do Espírito.`),
      questions: [
        'Você já subestimou a capacidade de alguém — por idade, gênero ou posição — de ouvir e falar autenticamente de Deus?',
        'Como essa profecia de Joel desafia hierarquias que sua própria comunidade talvez mantenha sem perceber?',
        'Que "filho, filha, jovem ou servo" ao seu redor você poderia começar a ouvir com mais atenção esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Todo Aquele que Invocar o Nome do Senhor',
      text: t(`Espírito Santo, a promessa de Joel, citada por Pedro,
        termina com amplitude radical: "todo aquele que invocar o
        nome do Senhor será salvo." Sem pré-requisito além do próprio
        clamor sincero. Que eu confie hoje nessa simplicidade, sem
        acrescentar barreiras que tu mesmo não colocaste. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa final da citação de Joel é
        deliberadamente ampla e simples — "todo aquele" — sem
        qualificação adicional de mérito, conhecimento prévio ou
        status, apenas o clamor sincero pelo nome do Senhor.`),
      questions: [
        'Você já acrescentou, sem perceber, pré-requisitos à salvação que essa promessa simples não exige?',
        'Como essa simplicidade radical — "todo aquele que invocar" — muda sua forma de apresentar o evangelho a alguém?',
        'O que significaria hoje confiar nessa mesma simplicidade para uma dúvida sua sobre se você "já fez o suficiente"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Véspera da Trindade',
      text: t(`Deus Uno e Trino, amanhã celebramos o mistério da tua
        própria natureza — Pai, Filho e Espírito Santo, um só Deus.
        Esta semana inteira, desde o Pentecostes, tem sido sobre a
        obra visível do teu Espírito. Prepara meu coração para
        contemplar amanhã o mistério mais profundo de quem tu és.
        Amém.`),
    },
    meditation: {
      prompt: t(`O calendário litúrgico encerra deliberadamente esta
        semana centrada na obra do Espírito com a véspera de uma
        celebração centrada na própria identidade de Deus — do que o
        Espírito faz para quem o Espírito é.`),
      questions: [
        'Esta semana desde o Pentecostes — do vento e fogo à igreja de muitas línguas — o que você mais quer levar adiante?',
        'Como contemplar amanhã, não apenas a obra de Deus, mas o próprio mistério de quem ele é?',
        'O que significaria entrar no Domingo da Trindade depois de uma semana inteira vivendo a presença do Espírito?',
      ],
    },
  },
];

// Domingo da Santíssima Trindade — Ciclo A — Gênesis 1:1-2:4a · Salmo 8 · 2 Coríntios 13:11-13 · Mateus 28:16-20
export const trinitySundayA: DevotionalEntry = {
  prayer: {
    title: 'Façamos o Homem à Nossa Imagem',
    text: t(`Deus Uno e Trino, no relato da criação já ecoa o
      mistério que celebramos hoje: "façamos o homem à nossa imagem,
      conforme a nossa semelhança" — uma pluralidade dentro da
      própria fala de Deus, presente desde antes de qualquer coisa
      existir. Que eu viva hoje consciente de ter sido formado à
      imagem de um Deus que, em si mesmo, já é comunhão. Amém.`),
  },
  meditation: {
    prompt: t(`O plural "façamos" no relato da criação — junto com o
      Espírito de Deus pairando sobre as águas — é um dos primeiros
      sinais bíblicos da pluralidade dentro da unidade de Deus, séculos
      antes de qualquer formulação doutrinária da Trindade.`),
    questions: [
      'Como a ideia de que Deus, em si mesmo, sempre existiu em comunhão — nunca solitário — muda sua compreensão da própria necessidade de relacionamento?',
      'O que significa ter sido criado à imagem de um Deus que é, ao mesmo tempo, um e três?',
      'Que área da sua vida reflete melhor essa comunhão — e qual ainda precisa refletir mais?',
    ],
  },
};

// Domingo da Santíssima Trindade — Ciclo B — Isaías 6:1-8 · Salmo 29 · Romanos 8:12-17 · João 3:1-17
export const trinitySundayB: DevotionalEntry = {
  prayer: {
    title: 'Santo, Santo, Santo É o Senhor dos Exércitos',
    text: t(`Deus Uno e Trino, os serafins da visão de Isaías
      clamavam: "Santo, santo, santo é o Senhor dos exércitos; a terra
      toda está cheia da sua glória." Uma tripla repetição que a
      tradição cristã ouviria depois com novos ouvidos, reconhecendo
      nela um eco do próprio mistério trinitário. Que eu me una hoje
      a esse louvor antigo e sempre novo. Amém.`),
  },
  meditation: {
    prompt: t(`A tripla aclamação "santo, santo, santo" — lida hoje,
      Domingo da Trindade — ecoa de forma sugestiva o mistério de um
      só Deus em três pessoas, embora Isaías, séculos antes, não
      pudesse ainda nomear o que via dessa forma.`),
    questions: [
      'Como a visão avassaladora de Isaías — "estou perdido, sou homem de lábios impuros" — se compara à sua própria experiência de aproximação a Deus?',
      'O que significa, para você, que a santidade tripla de Deus enche "toda a terra", não apenas espaços sagrados isolados?',
      'Que área da sua vida ainda precisa ser tocada, como os lábios de Isaías, por essa purificação direta de Deus?',
    ],
  },
};

// Domingo da Santíssima Trindade — Ciclo C — Provérbios 8:1-4, 22-31 · Salmo 8 · Romanos 5:1-5 · João 16:12-15
export const trinitySundayC: DevotionalEntry = {
  prayer: {
    title: 'Eu Estava ao Seu Lado como Arquiteto',
    text: t(`Deus Uno e Trino, a Sabedoria de Provérbios declara:
      "quando ele traçava os fundamentos da terra, então eu estava
      ao seu lado como arquiteto; e era cada dia as suas delícias,
      alegrando-me perante ele em todo o tempo." Comunhão e alegria
      mútua, presentes desde antes da própria criação. Que eu
      participe hoje dessa mesma alegria diante de ti. Amém.`),
  },
  meditation: {
    prompt: t(`A tradição cristã lê a Sabedoria personificada de
      Provérbios 8 como antecipação do Filho eterno — presente,
      participante e alegre, "ao lado" de Deus antes mesmo da criação
      do mundo, num relacionamento de deleite mútuo.`),
    questions: [
      'Como a imagem de alegria e deleite mútuo dentro da própria Trindade — não solidão nem obrigação — muda sua imagem de quem Deus é?',
      'Você vive mais consciente de um Deus austero e distante, ou de um Deus cuja própria natureza inclui alegria compartilhada?',
      'O que significaria hoje participar dessa alegria, "alegrando-se perante ele", não apenas cumprir obrigação religiosa?',
    ],
  },
};
