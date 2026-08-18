/**
 * Natal — conteúdo ancorado no RCL (leituras reais).
 *
 * Estrutura diferente de advent-*.ts/ordinary-*.ts porque o Natal não
 * começa sempre num domingo — 25/dez cai em qualquer dia da semana,
 * então não dá pra indexar por `date.getDay()` como nas outras
 * estações. Em vez disso:
 *
 * - `christmasDay{A,B,C}` — Dia de Natal em si (25/dez), ancorado na
 *   leitura própria de cada ciclo (Isaías + evangelho da Natividade).
 * - `christmasSunday1{A,B,C}` — 1º Domingo depois do Natal, ancorado
 *   na leitura própria de cada ciclo (varia bastante: fuga pro Egito
 *   no A, apresentação no templo no B, Jesus menino no templo no C).
 * - `christmasSunday2` — 2º Domingo depois do Natal, quando existe
 *   (a maioria dos anos tem dois domingos entre o Natal e a Epifania,
 *   não um só — ver ROADMAP.md 1.2c). Leitura comum aos 3 ciclos no
 *   RCL (Jeremias 31 / João 1), por isso uma única versão serve pros
 *   três.
 * - `christmasWeekdays` — os dias de semana entre o Natal e a
 *   Epifania que não são nenhum dos domingos acima (9 ou 10 deles,
 *   dependendo do ano). O RCL não atribui leitura própria por dia da
 *   semana nessa janela — são meditações sobre a própria narrativa da
 *   Natividade (Lucas 2, prólogo de João), por isso uma única lista
 *   de 10 (o suficiente pro pior caso: só 1 domingo real no
 *   intervalo) serve pros três ciclos. A lógica de qual dia usa qual
 *   entrada fica em generate-devotionals.ts.
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

// Dia de Natal — Ciclo A — Isaías 9:2, 6-7 · Salmo 96 · Tito 2:11-14 · Lucas 2:1-14
export const christmasDayA: DevotionalEntry = {
  prayer: {
    title: 'Um Menino Nos Nasceu',
    text: t(`Senhor, Isaías profetizou: "um menino nos nasceu, um
      filho se nos deu... o seu nome será: Maravilhoso Conselheiro,
      Deus Forte, Pai Eterno, Príncipe da Paz." Hoje celebro o
      cumprimento dessa promessa antiga — não um título vazio, mas uma
      pessoa real, nascida numa manjedoura. Que eu receba hoje esse
      Menino com o assombro que ele merece. Amém.`),
  },
  meditation: {
    prompt: t(`Os títulos que Isaías atribui ao menino prometido —
      Deus Forte, Pai Eterno — são desproporcionais a um recém-nascido,
      revelando desde o início que esse nascimento é diferente de
      qualquer outro.`),
    questions: [
      'Qual desses títulos — Conselheiro, Deus Forte, Pai Eterno, Príncipe da Paz — mais fala à sua necessidade hoje?',
      'Como celebrar o Natal de forma que reconheça o peso real desses títulos, não apenas a ternura da cena do presépio?',
      'O que significaria receber Jesus hoje com o mesmo assombro de quem ouve essa profecia pela primeira vez?',
    ],
  },
};

// Dia de Natal — Ciclo B — Isaías 52:7-10 · Salmo 98 · Hebreus 1:1-12 · João 1:1-14
export const christmasDayB: DevotionalEntry = {
  prayer: {
    title: 'Nestes Últimos Dias Nos Falou pelo Filho',
    text: t(`Senhor, o autor de Hebreus declara: "havendo Deus
      antigamente falado muitas vezes... nestes últimos dias a nós
      nos falou pelo Filho." Toda revelação anterior converge e se
      completa nesse Filho que celebro hoje. Que eu ouça essa palavra
      final e completa com toda atenção. Amém.`),
  },
  meditation: {
    prompt: t(`A carta a Hebreus não descarta a revelação anterior
      pelos profetas — ela a completa, apresentando o Filho como
      palavra definitiva e final de Deus à humanidade.`),
    questions: [
      'Você trata o nascimento de Jesus como a "palavra final" de Deus, ou apenas mais uma entre várias revelações?',
      'O que significa que Deus fala "pelo Filho" — não apenas através dele, mas nele mesmo, como palavra encarnada?',
      'Como ouvir essa palavra completa hoje, em vez de tratá-la como informação já conhecida?',
    ],
  },
};

// Dia de Natal — Ciclo C — Isaías 62:6-12 · Salmo 97 · Tito 3:4-7 · Lucas 2:8-20
export const christmasDayC: DevotionalEntry = {
  prayer: {
    title: 'Não em Virtude de Obras de Justiça',
    text: t(`Senhor, Paulo escreve a Tito: "nos salvou... não em
      virtude de obras de justiça que nós houvéssemos feito, mas
      segundo a sua misericórdia." O Natal celebra exatamente isso —
      salvação iniciada por ti, antes de qualquer mérito meu. Que eu
      receba esse presente hoje sem tentar justificá-lo com meu
      próprio esforço. Amém.`),
  },
  meditation: {
    prompt: t(`Paulo é explícito: a salvação não nasce de obras
      prévias de justiça — o Natal, o início dessa história de
      salvação, acontece inteiramente por iniciativa e misericórdia
      de Deus, não por mérito humano acumulado.`),
    questions: [
      'Você celebra o Natal com a certeza de que essa graça não depende do seu próprio mérito?',
      'Onde você ainda tenta "ganhar" o que já foi dado gratuitamente?',
      'O que significaria receber hoje, sem resistência, um presente que você não pode retribuir?',
    ],
  },
};

// 1º Domingo depois do Natal — Ciclo A — Isaías 63:7-9 · Salmo 148 · Hebreus 2:10-18 · Mateus 2:13-23
export const christmasSunday1A: DevotionalEntry = {
  prayer: {
    title: 'Levanta-te, Foge para o Egito',
    text: t(`Senhor, logo depois do Natal, José recebeu ordem urgente:
      "levanta-te, toma o menino e sua mãe, foge para o Egito." A
      alegria do nascimento foi imediatamente seguida por perigo real
      e fuga necessária. Que eu não espere que a vida após um momento
      de alegria seja sempre fácil — e que eu tenha a mesma prontidão
      de José para agir quando o perigo exige. Amém.`),
  },
  meditation: {
    prompt: t(`O evangelho não suaviza a violência que cercou o
      nascimento de Jesus — Herodes, o massacre dos inocentes, a fuga
      forçada — o Natal aconteceu num mundo real, perigoso, não num
      cenário idealizado.`),
    questions: [
      'Você já experimentou perigo ou dificuldade logo depois de um momento de grande alegria ou celebração?',
      'Como a disposição imediata de José para agir, sem hesitar, te desafia diante de decisões urgentes?',
      'O que significa que Jesus, desde muito cedo, compartilhou a experiência humana de vulnerabilidade e deslocamento?',
    ],
  },
};

// 1º Domingo depois do Natal — Ciclo B — Isaías 61:10-62:3 · Salmo 148 · Gálatas 4:4-7 · Lucas 2:22-40
export const christmasSunday1B: DevotionalEntry = {
  prayer: {
    title: 'Já Não És Mais Servo, Mas Filho',
    text: t(`Senhor, Paulo escreve aos gálatas: "já não és mais
      servo, mas filho; e se és filho, és também herdeiro por Deus."
      O Natal muda completamente minha identidade — de servo temeroso
      a filho pleno, com toda a herança que isso implica. Que eu viva
      hoje a partir dessa nova identidade. Amém.`),
  },
  meditation: {
    prompt: t(`A mudança de status — servo para filho — não é
      gradual ou parcial; Paulo a descreve como transformação completa
      de identidade, com direito pleno à herança, não apenas alívio
      de carga.`),
    questions: [
      'Você ainda se relaciona com Deus mais como servo temeroso do que como filho pleno?',
      'O que significaria viver hoje já como herdeiro, não como alguém ainda tentando provar seu lugar?',
      'Como a adoção celebrada aqui se conecta com o nascimento que você celebrou há poucos dias?',
    ],
  },
};

// 1º Domingo depois do Natal — Ciclo C — 1 Samuel 2:18-20, 26 · Salmo 148 · Colossenses 3:12-17 · Lucas 2:41-52
export const christmasSunday1C: DevotionalEntry = {
  prayer: {
    title: 'O Menino Ia Crescendo em Estatura e em Graça',
    text: t(`Senhor, tanto Samuel quanto Jesus são descritos crescendo
      "em estatura e em graça diante do Senhor". O Natal não termina
      no nascimento — é início de um crescimento real, gradual, que
      leva tempo. Ajuda-me a valorizar meu próprio crescimento lento e
      contínuo, sem exigir maturidade instantânea. Amém.`),
  },
  meditation: {
    prompt: t(`Lucas usa deliberadamente linguagem de crescimento
      gradual para descrever a infância de Jesus — mesmo sendo Deus
      encarnado, ele passou por um processo real e não instantâneo de
      amadurecimento humano.`),
    questions: [
      'Você tende a ter pressa com seu próprio crescimento espiritual, esperando maturidade instantânea?',
      'Como a infância real e gradual de Jesus dignifica seu próprio processo lento de crescimento?',
      'Que "estatura e graça" você percebe crescendo em você, mesmo que lentamente?',
    ],
  },
};

// 2º Domingo depois do Natal (comum aos 3 ciclos) — Jeremias 31:7-14 · Salmo 147:12-20 · Efésios 1:3-14 · João 1:(1-9), 10-18
export const christmasSunday2: DevotionalEntry = {
  prayer: {
    title: 'Nos Elegeu Antes da Fundação do Mundo',
    text: t(`Senhor, Paulo escreve que nos "elegeu... antes da
      fundação do mundo, para sermos santos e irrepreensíveis diante
      dele em amor." O plano que celebro neste Natal não começou em
      Belém — começou antes de qualquer coisa existir. Que eu viva
      hoje com a certeza dessa escolha antiga e permanente. Amém.`),
  },
  meditation: {
    prompt: t(`Paulo situa a eleição divina "antes da fundação do
      mundo" — o Natal, celebrado nas últimas semanas, é a
      manifestação no tempo de um plano que sempre existiu na
      eternidade de Deus.`),
    questions: [
      'Como a ideia de ter sido "escolhido antes da fundação do mundo" muda sua sensação de pertencimento e segurança?',
      'Você vive mais a partir dessa eleição eterna ou de uma insegurança sobre merecer o amor de Deus?',
      'O que significaria encerrar a temporada do Natal com essa certeza renovada?',
    ],
  },
};

// Dias de semana do Natal (26/dez a 4/jan, exceto os domingos acima)
// — comuns aos 3 ciclos, meditações sobre a narrativa da Natividade
// (Lucas 2 / prólogo de João). 10 entradas.
export const christmasWeekdays: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Havia Lugar para Eles',
      text: t(`Senhor, Maria "teve a seu filho primogênito; envolveu-o
        em faixas e o deitou em uma manjedoura, porque não havia lugar
        para eles na estalagem." Tua entrada no mundo começou sem
        acolhida adequada. Ajuda-me a fazer, na minha própria vida,
        lugar genuíno para ti, em vez de espaço apertado e
        secundário. Amém.`),
    },
    meditation: {
      prompt: t(`O detalhe da manjedoura — lugar de alimentar
        animais, não de receber recém-nascidos — enfatiza a
        humildade radical da entrada de Deus no mundo, sem status nem
        conforto.`),
      questions: [
        'Que "lugar" você realmente reserva para Deus na sua vida — central ou secundário, entre outras prioridades?',
        'Como a disposição de Deus de nascer em condições tão humildes desafia expectativas de conforto e status?',
        'O que significaria abrir espaço genuíno, não apertado, para Cristo nesta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vos Trago Novas de Grande Alegria',
      text: t(`Senhor, o anjo anunciou aos pastores: "não temais,
        porquanto vos trago novas de grande alegria que o será para
        todo o povo." A primeira reação ao anúncio divino foi medo,
        mas a mensagem em si era de alegria universal. Que eu
        transmita boas notícias dessa mesma forma — dissolvendo medo,
        não alimentando-o. Amém.`),
    },
    meditation: {
      prompt: t(`O anjo começa dissolvendo o medo antes de anunciar
        a alegria — um padrão que sugere que boa notícia genuína
        sempre acalma antes de alegrar.`),
      questions: [
        'Você já recebeu uma notícia que, apesar de boa, inicialmente causou medo ou apreensão?',
        'Como comunicar boas notícias de forma que dissolva medo, em vez de alimentá-lo?',
        'A quem você poderia anunciar hoje uma "notícia de grande alegria" que dissolva algum temor específico?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vamos Já Até Belém',
      text: t(`Senhor, diante do anúncio dos anjos, os pastores
        decidiram imediatamente: "vamos já até Belém, e vejamos isso
        que aconteceu." Nenhuma hesitação, nenhum adiamento. Que eu
        responda com essa mesma prontidão às boas novas que já
        recebi, sem adiar minha própria busca por ti. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta dos pastores é imediata — "foram, pois, a
        toda a pressa" — um modelo de resposta ativa e urgente a uma
        revelação divina recebida.`),
      questions: [
        'Você tende a adiar responder a convites claros de Deus, mesmo depois de reconhecê-los?',
        'O que significaria, nesta semana entre o Natal e o Ano Novo, ir "a toda pressa" atrás de algo que você sabe que deveria buscar?',
        'Que "Belém" você precisa visitar concretamente esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Maria Guardava Todas Estas Coisas',
      text: t(`Senhor, enquanto os pastores divulgavam o que tinham
        visto, "Maria, porém, guardava todas estas coisas, meditando-
        as em seu coração." Nem toda resposta genuína precisa ser
        imediatamente verbalizada — há espaço para reflexão silenciosa
        e prolongada. Ensina-me essa mesma contemplação quieta. Amém.`),
    },
    meditation: {
      prompt: t(`O contraste entre os pastores (que divulgam
        publicamente) e Maria (que guarda silenciosamente) sugere dois
        modos legítimos e complementares de responder a um encontro
        com Deus.`),
      questions: [
        'Você tende mais a processar experiências espirituais falando sobre elas ou guardando-as em silêncio contemplativo?',
        'Que experiência recente você ainda precisa "guardar e meditar", sem pressa de compartilhá-la ou resolvê-la?',
        'Como cultivar esse tipo de reflexão silenciosa nesta semana entre o Natal e o Ano Novo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Glória a Deus nas Maiores Alturas',
      text: t(`Senhor, a multidão celestial louvou: "glória a Deus nas
        maiores alturas, e paz na terra entre os homens de boa
        vontade." Um louvor que une o céu e a terra numa só
        celebração. Que meu próprio louvor nesta semana conecte
        genuinamente adoração e busca de paz concreta. Amém.`),
    },
    meditation: {
      prompt: t(`O cântico angelical une deliberadamente glória
        celestial e paz terrena — adoração vertical e reconciliação
        horizontal não são separadas, mas parte do mesmo anúncio.`),
      questions: [
        'Seu louvor a Deus se traduz em busca real de paz nas suas relações concretas?',
        'Onde você precisa buscar "paz na terra" de forma prática nesta semana?',
        'Como unir adoração genuína com ação concreta de reconciliação?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Luz Resplandece nas Trevas',
      text: t(`Senhor, João declara sobre o Verbo: "a luz resplandece
        nas trevas, e as trevas não prevaleceram contra ela." Não é
        promessa de ausência de escuridão, mas de luz que não pode ser
        apagada por ela. Que eu confie nessa luz inextinguível diante
        da minha própria escuridão. Amém.`),
    },
    meditation: {
      prompt: t(`A afirmação não é que as trevas desapareceram, mas
        que elas "não prevaleceram" — a luz brilha precisamente em
        meio à escuridão persistente, não apenas depois dela.`),
      questions: [
        'Que "trevas" você enfrenta atualmente que precisam ser lembradas de que não podem apagar a luz de Cristo?',
        'Como viver com essa confiança — luz presente mesmo em meio à escuridão contínua, não apenas depois dela?',
        'O que significaria buscar essa luz especificamente na parte mais escura da sua semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deu-lhes o Poder de se Tornarem Filhos de Deus',
      text: t(`Senhor, João escreve: "a todos quantos o receberam...
        deu-lhes o poder de se tornarem filhos de Deus." Um poder
        concedido especificamente a quem recebe — não automático, mas
        também não dependente de mérito, apenas de disposição para
        receber. Que eu continue recebendo essa identidade renovada
        cada dia. Amém.`),
    },
    meditation: {
      prompt: t(`A condição para se tornar filho de Deus é
        simplesmente "receber" — não realizar, conquistar ou merecer
        — um convite acessível, ainda que transformador.`),
      questions: [
        'Você trata sua identidade de filho de Deus como algo já recebido e assentado, ou algo que ainda precisa conquistar?',
        'O que significa "receber" ativamente essa identidade hoje, não apenas tê-la como fato passado?',
        'Como essa identidade de filho muda a forma como você encara os desafios desta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Verbo Se Fez Carne',
      text: t(`Senhor, a declaração central do Natal: "o Verbo se fez
        carne, e habitou entre nós." Não permaneceste distante nem
        abstrato — assumiste existência corporal real, concreta,
        limitada. Que eu honre minha própria existência corporal como
        digna, já que tu mesmo a assumiste. Amém.`),
    },
    meditation: {
      prompt: t(`"Habitou entre nós" carrega, no grego original, a
        ideia de "armar tenda" — não visita passageira, mas presença
        real e prolongada em meio à existência humana comum.`),
      questions: [
        'Como a encarnação — Deus assumindo corpo real — muda sua relação com sua própria existência física e limitações?',
        'Você vive de forma que honra a dignidade do corpo, já que Deus mesmo o assumiu?',
        'O que significa que Deus "armou tenda" entre nós — presença prolongada, não visita rápida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cheio de Graça e de Verdade',
      text: t(`Senhor, o Verbo encarnado é descrito "cheio de graça e
        de verdade" — duas qualidades que às vezes parecem competir,
        unidas sem contradição em ti. Ensina-me a viver essa mesma
        combinação, sem sacrificar uma pela outra nas minhas próprias
        relações. Amém.`),
    },
    meditation: {
      prompt: t(`Graça sem verdade se torna indulgência vazia;
        verdade sem graça se torna dureza sem compaixão — Jesus
        encarna as duas plenamente, sem diminuir nenhuma.`),
      questions: [
        'Você tende a pender mais para graça sem verdade, ou verdade sem graça, nas suas relações?',
        'Como Jesus modela essa combinação difícil de forma que você poderia imitar esta semana?',
        'Que relação específica precisa dessa combinação equilibrada de graça e verdade de você agora?',
      ],
    },
  },
  {
    prayer: {
      title: 'Voltaram Glorificando e Louvando a Deus',
      text: t(`Senhor, encerramos esta semana com os pastores
        "glorificando e louvando a Deus por tudo o que tinham ouvido
        e visto, como lhes fora dito." Eles retornaram à vida comum,
        mas transformados. Que minha própria volta à rotina, depois
        das celebrações natalinas, carregue esse mesmo louvor
        contínuo. Amém.`),
    },
    meditation: {
      prompt: t(`Os pastores não permanecem em Belém — eles voltam ao
        trabalho comum de pastorear, mas carregando louvor
        transformado, não a mesma rotina de antes.`),
      questions: [
        'Como você quer que sua rotina comum, depois do Natal, seja diferente por causa do que celebrou?',
        'Que "louvor contínuo" você pode carregar de volta para o trabalho e a vida cotidiana desta semana?',
        'O que você quer levar desta semana de reflexão sobre o Natal para o Ano Novo que se aproxima?',
      ],
    },
  },
];

const christmasByCycle: Record<
  'A' | 'B' | 'C',
  { day: DevotionalEntry; sunday1: DevotionalEntry }
> = {
  A: { day: christmasDayA, sunday1: christmasSunday1A },
  B: { day: christmasDayB, sunday1: christmasSunday1B },
  C: { day: christmasDayC, sunday1: christmasSunday1C },
};

export default christmasByCycle;
