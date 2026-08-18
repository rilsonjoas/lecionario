/**
 * Tempo Comum — Ciclo A — conteúdo ancorado no RCL (leituras reais).
 *
 * Cada semana é um array de 7 DevotionalEntry, índice = date.getDay()
 * (0 = domingo … 6 = sábado). A chave numérica é o Próprio real do
 * RCL (3 a 29) — estável e com o mesmo significado todo ano,
 * calculado por `getProperNumberForDate()` em generate-rcl-data.ts.
 * Ver `findGoverningOrdinarySunday` em generate-devotionals.ts para
 * como a semana certa é escolhida.
 *
 * Cobertura: Ciclo A completo, Próprios 3-29 (27 semanas, 189 dias).
 * Reescrito em 2026-08-17 depois da correção do bug de atribuição de
 * leituras (ver ROADMAP.md 1.2a) — a numeração sequencial antiga
 * (2-28) foi substituída pelo número real do Próprio, e o conteúdo
 * de 8 semanas (Próprios 3, 4, 6, 20, 26, 27, 28, 29) foi escrito do
 * zero porque a base sobre a qual tinham sido escritas originalmente
 * estava incorreta (leituras que não correspondiam a nenhum domingo
 * real do RCL, ou misturavam leituras de domingos diferentes).
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

/**
 * Semana da Trindade — os 6 dias entre o Domingo da Santíssima
 * Trindade e o primeiro Domingo real do Tempo Comum (sempre
 * Trindade+1 a Trindade+6, todo ano, sem exceção — é o intervalo fixo
 * entre a Trindade e o Próprio seguinte, ver `firstOrdinarySunday` em
 * generate-rcl-data.ts). Não corresponde a nenhum Próprio do RCL —
 * por isso fica fora da tabela numerada por Próprio — mas sem este
 * conteúdo esses 6 dias ficavam sem devocional nenhum (achado em
 * 2026-08-17). Ancorado nas 4 leituras do próprio Domingo da
 * Trindade (Gênesis 1:1-2:4a · Salmo 8 · 2 Coríntios 13:11-13 ·
 * Mateus 28:16-20), aprofundando o tema ao longo da semana.
 *
 * Índice 0 (domingo) nunca é usado na prática — a Trindade em si é
 * gerada pela estação 'pentecost', não por este arquivo — mas fica
 * preenchido por consistência de tipo.
 */
export const trinityWeekA: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Estou Convosco Todos os Dias',
      text: t(`Deus Uno e Trino, esta semana entre o Domingo da
        Trindade e o início do Tempo Comum não pertence a nenhum
        Próprio específico do calendário — mas não é vazia. Antes de
        enviar os discípulos a fazer discípulos de todas as nações,
        prometeste: "eis que eu estou convosco todos os dias, até a
        consumação dos séculos." Que esta semana comum, sem data
        marcada, seja vivida na certeza dessa presença constante.
        Amém.`),
    },
    meditation: {
      prompt: t(`Esta é a semana de transição do ano litúrgico — sem
        Próprio definido, mas não sem sentido. É um bom convite a
        viver a fé nos dias comuns, não só nos marcados.`),
      questions: [
        'Como você vive a presença de Deus nos dias "sem data marcada" da sua rotina?',
        'O que significaria, para você, confiar na promessa "estou convosco todos os dias" numa semana sem grandes acontecimentos?',
        'Que hábito simples poderia te lembrar, diariamente, dessa presença constante?',
      ],
    },
  },
  {
    prayer: {
      title: 'No Princípio',
      text: t(`Deus Criador, "no princípio criaste os céus e a terra,"
        quando ainda "a terra era sem forma e vazia" e "o teu Espírito
        pairava sobre a face das águas." Antes de qualquer coisa
        existir, já havia comunhão — Pai, Filho e Espírito, um só
        Deus. Que essa mesma ordem apareça na minha própria semana:
        que eu comece pelo que ainda parece "sem forma e vazio" e
        confie que o teu Espírito paira sobre isso, pronto para trazer
        ordem e vida. Amém.`),
    },
    meditation: {
      prompt: t(`O relato da criação já sugere pluralidade dentro da
        unidade de Deus — "Deus", "o Espírito de Deus" — um mistério
        que a doutrina da Trindade tentaria articular séculos depois,
        mas que já está presente desde a primeira linha da
        Escritura.`),
      questions: [
        'Que área da sua vida está hoje "sem forma e vazia", ainda esperando a ordem que só Deus pode trazer?',
        'Como a ideia de que Deus sempre existiu em comunhão — nunca solitário — muda a forma como você entende sua própria necessidade de relacionamento?',
        'O que significaria começar esta semana confiando que o Espírito de Deus já paira sobre o que ainda parece caótico na sua vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Que É o Homem?',
      text: t(`Senhor, o salmista pergunta, maravilhado: "que é o
        homem, para que te lembres dele? e o filho do homem, para que
        o visites?" Diante da imensidão dos céus, das estrelas que
        estabeleceste, a pergunta é legítima — e ainda assim me
        coroaste "de glória e de honra" e me deste responsabilidade
        sobre a tua criação. Que eu viva esta semana com esse
        equilíbrio: humildade diante da tua grandeza, e dignidade por
        seres tu quem me valoriza. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não resolve a tensão entre a pequenez humana
        diante do cosmos e a dignidade concedida por Deus — ele
        celebra as duas coisas ao mesmo tempo, sem escolher uma.`),
      questions: [
        'Você vive mais consciente da sua pequenez diante do universo, ou da dignidade que Deus te concedeu? Como equilibrar as duas?',
        'O que significa, para você, que Deus "se lembra" e "visita" pessoalmente alguém tão pequeno diante da vastidão da criação?',
        'Como essa dignidade concedida por Deus deveria moldar a forma como você trata a criação e as pessoas ao seu redor?',
      ],
    },
  },
  {
    prayer: {
      title: 'Graça, Amor e Comunhão',
      text: t(`Deus Trino, Paulo encerra uma carta cheia de correção e
        confronto com uma bênção que resume quem tu és: "a graça do
        Senhor Jesus Cristo, e o amor de Deus, e a comunhão do
        Espírito Santo sejam com todos vós." Graça, amor e comunhão —
        as três pessoas, um só Deus, agindo juntas para o meu bem.
        Que esta bênção não seja só fórmula repetida, mas realidade
        vivida nesta semana comum. Amém.`),
    },
    meditation: {
      prompt: t(`Esta bênção trinitária — usada até hoje no encerramento
        de muitos cultos — nasce, no contexto original, de uma carta
        difícil, cheia de correção. A graça de Deus não espera que
        tudo esteja resolvido para se manifestar.`),
      questions: [
        'Em que área da sua vida você precisa hoje especificamente de graça, de amor, ou de comunhão — as três coisas que Paulo abençoa?',
        'Como você tem experimentado a "comunhão do Espírito Santo" de forma concreta, não apenas como frase repetida?',
        'Que relação sua precisaria receber essa mesma bênção — correção seguida de graça — nesta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Mas Alguns Duvidaram',
      text: t(`Senhor Jesus, quando os onze discípulos te viram no
        monte, na Galileia, "o adoraram; mas alguns duvidaram." Nem
        todo mundo ali tinha certeza plena — e ainda assim os
        enviaste a todos, dúvida incluída. Não exigiste fé perfeita
        antes de confiar a missão. Ensina-me a mesma disposição de
        agir em obediência mesmo carregando dúvidas não totalmente
        resolvidas, confiando que a tua autoridade — "toda a
        autoridade no céu e na terra" — cobre o que me falta. Amém.`),
    },
    meditation: {
      prompt: t(`O texto registra a dúvida sem constrangimento —
        "alguns duvidaram" está lado a lado com "o adoraram" — sem que
        Jesus exclua os que duvidavam do envio que se segue.`),
      questions: [
        'Que dúvida você carrega hoje, mesmo em meio à sua fé genuína?',
        'Como o fato de Jesus enviar discípulos que ainda duvidavam muda a forma como você encara sua própria disposição de agir?',
        'Em que área você tem esperado "certeza total" antes de agir, quando talvez baste a obediência disposta, dúvida incluída?',
      ],
    },
  },
  {
    prayer: {
      title: 'Em Nome do Pai, do Filho e do Espírito Santo',
      text: t(`Deus Trino, ao encerrar esta semana comum, entre a
        Trindade e o início do Tempo Comum, volto à fórmula batismal
        que resume toda a fé cristã: "batizando-os em nome do Pai, e
        do Filho, e do Espírito Santo." Fui batizado nesse nome —
        marcado pela comunhão eterna entre as três pessoas de um só
        Deus. Que essa identidade, mais do que qualquer outra, defina
        quem sou ao entrar no Tempo Comum que se aproxima. Amém.`),
    },
    meditation: {
      prompt: t(`A fórmula trinitária do batismo não é apenas ritual —
        marca a identidade mais fundamental de quem é batizado:
        pertencente à comunhão eterna entre Pai, Filho e Espírito
        Santo, não apenas a uma instituição religiosa.`),
      questions: [
        'O que significa para você, concretamente, ter sido batizado "em nome do Pai, do Filho e do Espírito Santo" — não apenas como ritual passado, mas como identidade presente?',
        'Como esta semana de transição — entre a Trindade e o Tempo Comum — te preparou para os próximos meses do ano litúrgico?',
        'Que verdade desta semana sobre a Trindade você quer levar, de forma prática, para os dias comuns que vêm pela frente?',
      ],
    },
  },
];

const ordinaryA: Record<number, DevotionalEntry[]> = {
  // Próprio 5 — Gênesis 12:1-9 · Salmo 33:1-12 · Romanos 4:13-25 · Mateus 9:9-13, 18-26
  5: [
    {
      prayer: {
        title: 'Levanta-te e Segue',
        text: t(`Senhor Jesus, tu viste Mateus sentado na coletoria — um
            homem que o povo desprezava — e disseste apenas: "Segue-me."
            Ele se levantou e te seguiu, sem exigir explicações. Naquele
            mesmo dia, uma mulher que sangrava havia doze anos tocou a
            orla do teu manto, e um pai desesperado te pediu que
            ressuscitasses sua filha. A todos tu respondeste com a mesma
            disposição: vem, tem ânimo, tua fé te salvou. Hoje te peço a
            mesma coragem de Mateus para me levantar da mesa onde estou
            acomodado, e a mesma fé da mulher para tocar-te mesmo no meio
            da multidão. Onde eu me escondo por vergonha, chama-me. Onde
            eu desisti de esperar cura, renova em mim a ousadia de
            estender a mão. Amém.`),
      },
      meditation: {
        prompt: t(`No mesmo capítulo, Jesus chama um cobrador de impostos
            desprezado e responde à fé desesperada de uma mulher anônima.
            O Reino de Deus se abre tanto para quem é chamado pelo nome
            quanto para quem apenas ousa tocar a orla do manto.`),
        questions: [
          'Você se identifica mais com Mateus (chamado por nome, precisa se levantar) ou com a mulher (anônima, precisa se aproximar por trás)?',
          'O que te impede de "tocar a orla do manto" — vergonha, descrença, ou o medo de ser notado?',
          'Jesus disse "Misericórdia quero, e não sacrifícios". Onde você tem oferecido religiosidade em vez de misericórdia a alguém?',
        ],
      },
    },
    {
      prayer: {
        title: 'Sai-te da Tua Terra',
        text: t(`Senhor Deus, a Abrão disseste: "Sai-te da tua terra, da
            tua parentela, e da casa de teu pai, para a terra que eu te
            mostrarei." Não lhe deste mapa, apenas promessa. Ele partiu
            sem saber para onde ia, mas sabendo a quem obedecia. Hoje
            reconheço que também me pedes travessias sem garantias
            visíveis — mudanças de trabalho, de relacionamento, de modo
            de viver — e eu me apego ao que é conhecido, mesmo quando já
            não me serve. Dá-me a coragem de Abrão para deixar Harã
            quando tu chamas, confiando que a bênção prometida — "serás
            uma bênção" — se cumpre não apesar da saída, mas por causa
            dela. Vai à minha frente, Senhor, como foste à frente dele.
            Amém.`),
      },
      meditation: {
        prompt: t(`Abrão tinha 75 anos quando partiu — não era mais
            jovem, não tinha certezas, apenas uma promessa. A fé bíblica
            raramente começa com clareza total; começa com obediência
            parcial e crescente.`),
        questions: [
          'Que "terra, parentela ou casa paterna" — hábito, lugar, relação — Deus pode estar pedindo que você deixe?',
          'Abrão construiu altares em cada parada da jornada (v.7-8). Como você marca, com gratidão, os pontos do seu próprio caminho de fé?',
          'O que mudaria se você tratasse a incerteza atual não como ameaça, mas como o começo de uma promessa ainda não cumprida?',
        ],
      },
    },
    {
      prayer: {
        title: 'Pela Palavra do Senhor',
        text: t(`Senhor, o salmista canta que pela tua palavra foram
            feitos os céus, e que tudo o que ordenas simplesmente
            acontece. Tu desfazes o conselho das nações e anulas os
            planos que se erguem contra a tua vontade — mas o teu próprio
            conselho permanece para sempre, geração após geração. Num
            mundo em que tantos projetos humanos parecem inabaláveis,
            ensina-me a confiar que só o que vem de ti tem permanência.
            Que eu não regozije no que é temporário — poder, opinião,
            conquista — mas no Senhor, como manda o salmo em seu primeiro
            verso. Faze de mim um povo bem-aventurado, cujo Deus é o
            Senhor. Amém.`),
      },
      meditation: {
        prompt: t(`"O conselho do Senhor permanece para sempre" — em
            contraste com os planos das nações, que Deus desfaz. O salmo
            convida a medir segurança não pelo que parece forte hoje, mas
            pelo que dura.`),
        questions: [
          'Em que você tem depositado a sensação de segurança nesta fase da vida — em algo que dura, ou em algo passageiro?',
          'O salmo chama a louvar com "cântico novo". Que motivo de gratidão de hoje ainda não virou louvor na sua boca?',
          'Se os planos das nações e das pessoas podem ser desfeitos por Deus, o que isso muda na forma como você reage às notícias que te angustiam?',
        ],
      },
    },
    {
      prayer: {
        title: 'Contra Toda Esperança',
        text: t(`Deus que vivificas os mortos e chamas as coisas que não
            são como se já fossem: Paulo nos conta que Abraão, já com o
            corpo amortecido pela idade, "creu contra a esperança, para
            que se tornasse pai de muitas nações." Ele não fechou os
            olhos para a realidade — sabia da sua idade, sabia do ventre
            estéril de Sara — mas não vacilou por incredulidade, e antes
            se fortaleceu na fé, dando-te glória. Hoje confesso as áreas
            da minha vida que parecem tão mortas quanto o ventre de Sara:
            um sonho adiado, uma relação partida, uma esperança que
            cansei de nutrir. Não me peças que finja não ver a realidade;
            pede-me, como a Abraão, que eu creia que és poderoso para
            cumprir o que prometeste, mesmo contra toda evidência. Amém.`),
      },
      meditation: {
        prompt: t(`A fé de Abraão não foi ingenuidade — ele via
            claramente a impossibilidade humana. A fé bíblica olha de
            frente para o problema e ainda assim confia no poder de
            Deus, não na probabilidade das circunstâncias.`),
        questions: [
          'Existe alguma promessa de Deus que você parou de esperar por parecer "biologicamente" ou circunstancialmente impossível?',
          'O que significa, na prática, "crer contra a esperança" sem cair em negação da realidade?',
          'Como você pode, hoje, "dar glória a Deus" antes mesmo de ver a promessa se cumprir, como fez Abraão?',
        ],
      },
    },
    {
      prayer: {
        title: 'Misericórdia, Não Sacrifício',
        text: t(`Jesus, Mestre que se assentaste à mesa com publicanos e
            pecadores, enquanto os fariseus observavam de longe,
            escandalizados: ensina-me hoje o que significa "misericórdia
            quero, e não sacrifícios." É mais fácil para mim cumprir
            rituais religiosos do que sentar-me à mesa com quem a minha
            própria comunidade julga indigno. Mateus, um cobrador
            desprezado, tornou-se apóstolo porque tu enxergaste além do
            que ele fazia. Dá-me os teus olhos para ver possibilidade
            onde outros só veem categoria e condenação. Que a minha fé
            não me afaste de quem precisa de médico, mas me leve a
            sentar-me à mesa, como tu sentaste. Amém.`),
      },
      meditation: {
        prompt: t(`Os fariseus não estavam tecnicamente errados sobre
            quem eram os publicanos — mas erraram na resposta. Jesus não
            nega o pecado da mesa; ele oferece cura a quem o reconhece.`),
        questions: [
          'Quem, na sua vida ou na sua igreja, você trata mais como "caso perdido" do que como alguém que precisa de médico?',
          'Em que momentos sua religiosidade tem soado mais como sacrifício (regra cumprida) do que como misericórdia (relação oferecida)?',
          'O que custaria a você, hoje, "sentar-se à mesa" com alguém que preferia manter à distância?',
        ],
      },
    },
    {
      prayer: {
        title: 'Tua Fé Te Salvou',
        text: t(`Senhor Jesus, doze anos de hemorragia consumiram a
            saúde, o dinheiro e a dignidade daquela mulher, mas não
            consumiram a sua fé. Ela não pediu permissão; tocou a orla
            do teu manto por trás, convencida de que isso bastaria. E
            bastou. Tu te voltaste, não para condená-la por tocar-te sem
            autorização segundo a lei, mas para chamá-la de filha e
            confirmar: "Tua fé te salvou." Há em mim desgastes de anos —
            mágoas antigas, hábitos que sangram minha energia, esperas
            que já perderam a conta do tempo. Ensina-me a fé que não
            espera condições ideais para se aproximar de ti. Que eu
            estenda a mão, mesmo por trás, mesmo com medo, e descubra
            que és suficiente. Amém.`),
      },
      meditation: {
        prompt: t(`A mulher tocou "a orla do manto" — o mínimo contato
            possível — e foi o suficiente. Jesus não exige fé perfeita ou
            teologicamente articulada; exige apenas fé que se move em
            direção a ele.`),
        questions: [
          'Que "hemorragia" de longa data — física, emocional ou espiritual — você tem carregado em silêncio?',
          'A mulher agiu por trás, sem ser vista. Isso te ajuda a entender que a fé não precisa ser pública ou espetacular para ser real?',
          'O que significaria, concretamente, "tocar a orla do manto" de Jesus na sua situação atual?',
        ],
      },
    },
    {
      prayer: {
        title: 'Bem-Aventurada a Nação',
        text: t(`Senhor, ao fim desta semana, olho para trás e vejo
            Abrão partindo sem mapa, uma mulher tocando teu manto em
            desespero, um cobrador de impostos se levantando da mesa. Em
            cada história, a mesma verdade: tu chamas, e a resposta certa
            é confiança, não certeza plena. "Bem-aventurada é a nação
            cujo Deus é o Senhor" — bem-aventurado sou eu, quando faço de
            ti, e não das minhas circunstâncias, o meu ponto de
            referência. Termino esta semana como comecei: sem todas as
            respostas, mas com a certeza de que a tua palavra é reta e as
            tuas obras são feitas com fidelidade. Que eu descanse nisso
            até o próximo chamado. Amém.`),
      },
      meditation: {
        prompt: t(`A semana começou com um chamado (Abrão) e terminou
            com um louvor (Salmo 33). Entre os dois, o mesmo Deus que
            chama é o que sustenta ao longo do caminho — inclusive nos
            dias comuns, sem grandes acontecimentos.`),
        questions: [
          'Olhando para os últimos sete dias, onde você viu Deus agir de um jeito que só percebeu em retrospecto?',
          'O que você levaria desta semana — o chamado de Abrão, a fé da mulher, a misericórdia à mesa de Mateus — para a semana que começa?',
          'Como seria terminar cada semana com um momento intencional de contar, como o salmista, "as obras feitas com fidelidade"?',
        ],
      },
    },
  ],

  // Próprio 7 — Gênesis 21:8-21 · Salmo 86:1-10, 16-17 · Romanos 6:1b-11 · Mateus 10:24-39
  7: [
    {
      prayer: {
        title: 'Não Temais',
        text: t(`Senhor Jesus, disseste aos teus discípulos: "Não temais
            os que matam o corpo, e não podem matar a alma." Vivemos
            rodeados de medos menores — o que pensarão, o que perderei,
            o que mudará — mas tu convidas a medir tudo pela balança
            certa: nem um passarinho cai sem a vontade do Pai, e até os
            cabelos da minha cabeça estão contados. Se sou tão cuidado em
            detalhe, por que deixo o medo governar minhas decisões? Tira
            de mim o temor que paralisa e a covardia que silencia o que
            devo dizer em teu nome. Que eu valha mais, na minha própria
            confiança, do que muitos passarinhos. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus não promete ausência de perigo real — ele
            reconhece que existem os que "matam o corpo". A promessa é
            outra: nada disso está fora do cuidado do Pai, e nada disso
            alcança o que realmente importa.`),
        questions: [
          'Qual medo tem determinado suas escolhas mais do que a tua fé deveria permitir?',
          '"Nem um passarinho cai sem a vontade do Pai" — como essa frase muda a forma como você encara o que foge do seu controle?',
          'O que você tem deixado de dizer ou fazer por medo da reação alheia?',
        ],
      },
    },
    {
      prayer: {
        title: 'Deus Ouve o Excluído',
        text: t(`Deus que vês e ouves, Agar foi expulsa para o deserto
            com seu filho, sem provisão além de pão e um odre de água,
            até que a água acabou e ela se sentou a chorar, incapaz de
            ver o menino morrer. Mas tu ouviste. O teu anjo bradou do
            céu: "Que tens, Agar? Não temas, porque Deus ouviu a voz do
            menino." Tu não abandonas quem foi descartado por outros,
            ainda que por razões humanamente compreensíveis. Hoje trago
            diante de ti quem se sente como Agar — excluído, sem
            recursos, à beira do desespero — inclusive, às vezes, eu
            mesmo. Abre os meus olhos, como abriste os dela, para que eu
            veja o poço de água que já está diante de mim, mas que a
            angústia me impede de enxergar. Amém.`),
      },
      meditation: {
        prompt: t(`O texto não esconde a injustiça da situação de Agar,
            nem resolve todas as tensões da história. Mas insiste em um
            detalhe: Deus ouviu o choro do menino no deserto, mesmo sendo
            ele o filho "errado", da mãe "errada", na visão da família.`),
        questions: [
          'Quem, na sua vida ou na sua comunidade, ocupa hoje o lugar de Agar — descartado por decisão de outros?',
          '"Deus abriu os olhos dela, e ela viu um poço" (v.19) — que provisão pode já estar diante de você, ainda invisível pela angústia?',
          'Como você pode ser, para alguém, a voz que diz "não temas, Deus ouviu"?',
        ],
      },
    },
    {
      prayer: {
        title: 'Pobre e Necessitado',
        text: t(`Inclina, Senhor, os teus ouvidos, e ouve-me, porque sou
            pobre e necessitado. Não venho a ti com méritos, mas com a
            mesma confiança do salmista: "a ti, Senhor, elevo a minha
            alma." Tu és bom, e pronto a perdoar, abundante em
            benignidade para com todos os que te invocam. No dia da
            minha angústia clamo a ti, porque sei que respondes.
            Ensina-me o teu caminho, para que eu ande na tua verdade;
            dispõe o meu coração, hoje dividido entre tantas coisas,
            para temer unicamente o teu nome. Volta-te para mim, dá a
            tua força ao teu servo. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo não pede primeiro alívio das circunstâncias
            — pede primeiro que Deus "disponha o coração" para temer o
            seu nome. A prioridade da oração honesta é a unidade
            interior antes da solução externa.`),
        questions: [
          'Quando você ora, pede primeiro alívio ou pede primeiro um coração alinhado com Deus?',
          '"Sou pobre e necessitado" — que área da sua vida você tem escondido de Deus por orgulho, fingindo autossuficiência?',
          'O salmista descreve Deus como "pronto a perdoar". Você vive como se isso fosse verdade sobre você mesmo?',
        ],
      },
    },
    {
      prayer: {
        title: 'Vivos para Deus',
        text: t(`Senhor, Paulo pergunta: "Permaneceremos no pecado,
            para que abunde a graça? De modo nenhum." Fomos batizados na
            morte de Cristo, para que, como ele foi ressuscitado,
            andássemos também em novidade de vida. O homem velho foi
            crucificado com ele; já não sou obrigado a servir ao pecado
            como antes. Ainda assim, tantas vezes vivo como se aquele
            batismo não tivesse acontecido, voltando aos velhos padrões
            por hábito ou conveniência. Ajuda-me a considerar-me, de
            fato, morto para o pecado e vivo para ti em Cristo Jesus —
            não como esforço moral, mas como identidade já dada. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo usa o verbo "considerai" — um ato deliberado
            da mente, não apenas um sentimento. A vida nova não é sempre
            sentida automaticamente; é escolhida repetidamente, com base
            no que já é verdade.`),
        questions: [
          'Que "homem velho" — padrão antigo de reação, vício ou pensamento — você ainda trata como se estivesse vivo, quando a Escritura diz que já morreu?',
          'O que significa, na prática hoje, "considerar-se morto para o pecado e vivo para Deus"?',
          'Como a lembrança do seu próprio batismo (ou da sua entrega inicial a Cristo) pode fortalecer decisões concretas desta semana?',
        ],
      },
    },
    {
      prayer: {
        title: 'Confessar Diante dos Homens',
        text: t(`Senhor Jesus, tu disseste que não vieste trazer paz à
            terra, mas espada — que o teu nome dividiria até famílias.
            Essas são palavras difíceis para quem busca uma fé
            confortável. Mas tu prometeste também: "todo aquele que me
            confessar diante dos homens, também eu o confessarei diante
            de meu Pai." Ajuda-me a não confundir covardia com paz, nem
            silêncio com sabedoria. Onde tenho escondido minha fé para
            evitar desconforto social ou familiar, dá-me coragem para
            confessar-te sem hostilidade, mas sem vergonha. Que eu ame a
            família, os amigos e a reputação menos do que te amo a ti —
            não porque eles importam pouco, mas porque tu vales mais.
            Amém.`),
      },
      meditation: {
        prompt: t(`A "espada" de Jesus não é violência que ele inflige,
            mas a divisão inevitável que surge quando a lealdade a ele
            entra em conflito com lealdades anteriores — inclusive
            familiares.`),
        questions: [
          'Existe algum contexto — família, trabalho, amizades — em que você mantém sua fé escondida para evitar atrito?',
          '"Quem ama o pai ou a mãe mais do que a mim não é digno de mim" — isso soa duro. Como você entende essa prioridade sem desprezar os relacionamentos familiares?',
          'O que significaria, concretamente esta semana, "confessar a Cristo diante dos homens" num espaço onde isso custa algo?',
        ],
      },
    },
    {
      prayer: {
        title: 'O Poço no Deserto',
        text: t(`Deus que proveste água a Agar no lugar mais
            improvável — um deserto onde ela já havia se sentado para ver
            o filho morrer — ensina-me a esperar provisão mesmo quando a
            lógica diz que não há mais saída. Tu não a tiraste do
            deserto; abriste os olhos dela para o que já estava ali.
            Talvez a minha oração de hoje não seja para que retires a
            dificuldade, mas para que eu enxergue o que já colocaste ao
            meu alcance e que a angústia me impede de ver. Do menino
            Ismael fizeste, ainda assim, uma grande nação — mesmo fora da
            linha da promessa principal, ele não ficou fora do teu
            cuidado. Ninguém está fora do teu cuidado. Amém.`),
      },
      meditation: {
        prompt: t(`Ismael não era o filho da promessa, mas Deus cuidou
            dele de qualquer forma — "porque ele é da tua linhagem" e
            porque Deus ouviu seu choro, independentemente de seu lugar
            na história da salvação.`),
        questions: [
          'Você já sentiu que, por não estar no centro do "plano principal" de alguém — família, igreja, trabalho — Deus se importaria menos com você? Como o texto de hoje corrige isso?',
          'Que "poço" você pode já ter diante de si, mas ainda não enxergou por causa da angústia do momento?',
          'Como equilibrar confiança na provisão de Deus com ação prática — como Agar, que "foi, encheu de água o odre" depois de ver o poço?',
        ],
      },
    },
    {
      prayer: {
        title: 'Ensina-me o Teu Caminho',
        text: t(`Senhor, esta semana trouxe temas difíceis: o medo, a
            exclusão, a morte ao pecado, a divisão pela fé. No meio de
            tudo isso, volto à oração mais simples do salmista:
            "Ensina-me, Senhor, o teu caminho, e andarei na tua verdade;
            dispõe o meu coração para temer o teu nome." Não peço apenas
            alívio das dificuldades que vivi nestes dias, mas um coração
            indiviso, capaz de te seguir mesmo quando o caminho custa
            relacionamentos, conforto ou certezas. Tu és bom e pronto a
            perdoar. Descanso nisso ao encerrar esta semana. Amém.`),
      },
      meditation: {
        prompt: t(`O Salmo 86 termina pedindo um sinal do favor de Deus
            "para que o vejam" os que se opõem — não por vaidade, mas
            para que a fidelidade de Deus seja visível também aos que
            duvidam.`),
        questions: [
          'Dos temas desta semana — medo, exclusão, morte ao pecado, confissão pública — qual tocou mais fundo em você, e por quê?',
          'Como seria pedir a Deus um "coração indiviso" de forma concreta, e não apenas como figura de linguagem?',
          'Que sinal da fidelidade de Deus nesta semana você poderia compartilhar com alguém que está duvidando?',
        ],
      },
    },
  ],

  // Próprio 8 — Gênesis 22:1-14 · Salmo 13 · Romanos 6:12-23 · Mateus 10:40-42
  8: [
    {
      prayer: {
        title: 'Um Copo de Água Fresca',
        text: t(`Senhor Jesus, tu disseste que quem recebe um dos teus
            pequeninos, ainda que apenas com um copo de água fresca, não
            perderá a sua recompensa. Que alívio: não preciso de grandes
            feitos para servir ao teu Reino. O gesto pequeno, oferecido
            por amor a ti, tem valor eterno diante de teus olhos.
            Ensina-me a não desprezar as oportunidades discretas de
            hospitalidade e cuidado que cruzam meu caminho todos os dias
            — porque quem recebe, a ti recebe; e quem te recebe, recebe
            aquele que te enviou. Que eu não subestime o copo de água
            que posso oferecer hoje. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus termina um discurso sobre perseguição, divisão
            e o custo do discipulado com a promessa mais simples
            possível: até o gesto mais modesto de hospitalidade tem
            recompensa eterna.`),
        questions: [
          'Depois de uma semana pensando em "espada" e divisão, como esse convite ao pequeno gesto de cuidado muda o tom?',
          'Que "copo de água fresca" — pequeno, sem alarde — você pode oferecer a alguém hoje?',
          'Você tende a menosprezar gestos pequenos de fé por não parecerem "suficientes"? O que este texto diz sobre isso?',
        ],
      },
    },
    {
      prayer: {
        title: 'Eis-Me Aqui',
        text: t(`Deus que provaste Abraão pedindo o que lhe era mais
            precioso, e ele respondeu apenas: "Eis-me aqui" — três vezes
            ao longo da narrativa, sem saber ainda como a história
            terminaria. Confesso que a minha obediência costuma vir com
            condições: obedeço se entender, se concordar, se parecer
            seguro. Abraão levantou-se de manhã cedo, sem debater, sem
            procrastinar, ainda que o pedido parecesse contradizer tudo o
            que lhe havias prometido sobre Isaque. Não te peço para nunca
            sentir o peso de um chamado difícil; peço a coragem de dizer
            "eis-me aqui" antes de entender o desfecho. Amém.`),
      },
      meditation: {
        prompt: t(`Abraão não recebeu explicação alguma antes de
            partir — apenas a ordem. Sua obediência precedeu sua
            compreensão, o que é o oposto de como normalmente preferimos
            viver a fé.`),
        questions: [
          'Existe algum chamado de Deus na sua vida que você está adiando até "entender melhor" o motivo?',
          '"Eis-me aqui" aparece três vezes no capítulo — a Deus, a Isaque, ao anjo. Você diria essa frase de disponibilidade a Deus hoje, sem saber o desfecho?',
          'O que te ajuda a distinguir entre obediência corajosa e obediência imprudente?',
        ],
      },
    },
    {
      prayer: {
        title: 'Até Quando, Senhor?',
        text: t(`Até quando, Senhor, te esquecerás de mim? Até quando
            esconderás de mim o teu rosto? O salmista não finge estar
            bem; ele traz a Deus a tristeza diária, o medo do inimigo, o
            cansaço de esperar. E é exatamente essa honestidade que abre
            caminho para a virada do salmo: "Mas eu confio na tua
            benignidade; o meu coração se regozija na tua salvação."
            Hoje trago as minhas próprias perguntas "até quando" — sobre
            a espera, a dor, o silêncio que às vezes pareces guardar. Não
            te peço para fingir que está tudo bem; peço a mesma
            trajetória do salmista, do lamento sincero à confiança
            renovada. Amém.`),
      },
      meditation: {
        prompt: t(`O Salmo 13 tem apenas seis versículos, mas percorre a
            distância inteira entre o desespero ("até quando?") e a
            confiança ("cantarei ao Senhor"). A Bíblia não pede que se
            pule essa distância — ela ensina a percorrê-la em oração.`),
        questions: [
          'Qual é o seu próprio "até quando, Senhor?" neste momento da vida?',
          'Você costuma levar o lamento honesto à sua oração, ou prefere esperar "se sentir melhor" antes de orar?',
          'O que ajudaria você a fazer a mesma virada do salmista — do lamento à confiança — sem negar a dor real?',
        ],
      },
    },
    {
      prayer: {
        title: 'Instrumentos de Justiça',
        text: t(`Senhor, Paulo adverte: não apresenteis os vossos
            membros ao pecado como instrumentos de iniquidade, mas
            apresentai-vos a Deus como instrumentos de justiça. O
            salário do pecado é a morte, mas o dom gratuito de Deus é a
            vida eterna em Cristo Jesus. Reconheço que sirvo a quem
            obedeço — e muitas vezes minhas escolhas diárias, pequenas e
            repetidas, revelam a quem realmente sirvo, mais do que
            minhas convicções declaradas. Ajuda-me a apresentar meu
            corpo, meu tempo e minhas palavras como instrumentos de
            justiça, não por medo, mas porque já fui libertado do pecado
            e feito servo da justificação por ti. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo usa a imagem de "servos" (escravos) para
            descrever a condição humana — somos sempre servos de algo; a
            única pergunta real é de quem.`),
        questions: [
          'Olhando para os seus hábitos da última semana — não suas convicções, mas seus hábitos — a quem eles revelam que você tem servido?',
          '"O salário do pecado é a morte" — que "salário" (esgotamento, vazio, culpa) você já reconhece de escolhas que sabe não serem justiça?',
          'O que significaria, de forma prática, apresentar hoje um membro específico do seu corpo (língua, mãos, olhos) "como instrumento de justiça"?',
        ],
      },
    },
    {
      prayer: {
        title: 'Deus Proverá',
        text: t(`Senhor, no momento mais tenso da narrativa, quando
            Isaque pergunta pelo cordeiro e Abraão responde "Deus
            proverá para si o cordeiro", nem ele sabia como exatamente
            isso aconteceria. Mas no instante em que o cutelo se ergueu,
            tua voz deteve a mão, e um carneiro apareceu preso pelos
            chifres num arbusto. Abraão chamou aquele lugar "o Senhor
            proverá" — Jeová-Jiré. Há situações na minha vida em que não
            vejo ainda a provisão, apenas a exigência. Ensina-me a
            confessar, como Abraão, que provês, mesmo antes de ver o
            carneiro no arbusto. E quando a provisão vier, que eu, como
            ele, dê nome ao lugar e não esqueça. Amém.`),
      },
      meditation: {
        prompt: t(`A provisão apareceu no último instante possível, não
            antes — Abraão teve que caminhar até o ponto do sacrifício
            sem certeza visível do desfecho. A fé bíblica muitas vezes
            anda mais longe do que gostaríamos antes de ver a provisão.`),
        questions: [
          'Existe uma área em que você está pedindo a Deus "prova antecipada" de provisão, quando talvez ele peça que você caminhe mais um pouco em confiança?',
          'Que "Jeová-Jiré" — momento passado em que Deus proveu no último instante — você pode relembrar hoje para fortalecer a fé presente?',
          'Abraão deu nome ao lugar da provisão, criando um memorial. Como você poderia marcar, de forma concreta, as provisões que Deus já te deu?',
        ],
      },
    },
    {
      prayer: {
        title: 'Os Pequeninos',
        text: t(`Senhor Jesus, tu falaste de "profeta", "justo" e
            "pequeninos" na mesma respiração — colocando lado a lado
            quem tem posição reconhecida e quem não tem nome nenhum na
            hierarquia religiosa. Todos recebem a mesma promessa: quem os
            acolhe, recebe recompensa. Ajuda-me a tratar com o mesmo
            cuidado quem tem voz e quem não tem, quem é conhecido e quem
            é invisível na minha comunidade. Que eu não meça a dignidade
            de alguém pela posição que ocupa, pois tu mesmo te
            identificaste com "um destes pequeninos". Amém.`),
      },
      meditation: {
        prompt: t(`Jesus nivela profetas, justos e pequeninos na mesma
            promessa de recompensa a quem os recebe — sugerindo que o
            valor de um gesto de acolhida não depende do status de quem é
            acolhido.`),
        questions: [
          'Você trata pessoas de forma diferente dependendo da posição ou influência que elas têm? O que este texto confronta nisso?',
          'Quem, na sua rotina, ocupa o lugar do "pequenino" — alguém facilmente ignorado?',
          'Terminando esta semana sobre sacrifício, confiança e provisão, como o cuidado com os pequeninos conclui esse arco de forma prática?',
        ],
      },
    },
    {
      prayer: {
        title: 'Cantarei ao Senhor',
        text: t(`Senhor, esta semana caminhou de Abraão levantando o
            cutelo sobre o monte Moriá ao lamento cru do Salmo 13, da
            advertência de Paulo sobre a quem servimos até o copo de
            água oferecido a um pequenino. Em todos os episódios, a mesma
            verdade se repete de formas diferentes: tu provês, mesmo
            quando o caminho até a provisão exige fé sem certezas
            plenas. Como o salmista, termino não fingindo que a semana
            foi fácil, mas escolhendo a confiança: "eu confio na tua
            benignidade; o meu coração se regozija na tua salvação.
            Cantarei ao Senhor, porquanto me tem feito muito bem." Amém.`),
      },
      meditation: {
        prompt: t(`Da tensão do monte Moriá ao lamento do Salmo 13, esta
            semana não ofereceu respostas fáceis — mas terminou, como
            quase sempre a Escritura termina os lamentos sinceros, em
            canção.`),
        questions: [
          'Qual foi o momento mais difícil de acompanhar nesta semana de leituras — o sacrifício de Isaque, o lamento do salmo, ou a advertência sobre servidão ao pecado?',
          'Onde você já pode dizer, como o salmista, que Deus "te tem feito muito bem", mesmo em meio a perguntas não respondidas?',
          'Como você quer levar o padrão desta semana — de tensão a confiança — para os próximos dias comuns, sem grandes acontecimentos?',
        ],
      },
    },
  ],

  // Próprio 9 — Gênesis 24:34-38, 42-49, 58-67 · Salmo 45:10-17 · Romanos 7:15-25a · Mateus 11:16-19, 25-30
  9: [
    {
      prayer: {
        title: 'Vinde a Mim',
        text: t(`Senhor Jesus, tu chamas os cansados e oprimidos, prometendo
          não um fardo mais leve para carregar sozinhos, mas um jugo
          repartido contigo: "Tomai sobre vós o meu jugo, e aprendei de
          mim, que sou manso e humilde de coração." Tenho carregado
          cargas como se tivesse que provar algo — a mim mesmo, aos
          outros, a ti. Hoje aceito o convite ao descanso que não é
          preguiça, mas comunhão. Ensina-me a mansidão que não é
          fraqueza, e a humildade que não é autodesprezo. Meu jugo,
          contigo, é suave. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus não promete tirar o peso, mas trocar o jugo
          solitário por um jugo repartido — a imagem agrícola de dois
          bois arando juntos, um mais forte carregando o essencial.`),
        questions: [
          'Que "jugo" você carrega hoje como se estivesse sozinho, que na verdade Jesus oferece carregar com você?',
          'O convite é para os "cansados e oprimidos" — você se permite admitir esse cansaço, ou finge estar bem?',
          'O que mudaria se você entendesse mansidão e humildade não como fraqueza, mas como a atitude do próprio Jesus?',
        ],
      },
    },
    {
      prayer: {
        title: 'Um Sinal na Fonte',
        text: t(`Deus que guias os passos de quem confia, o servo de
          Abraão pediu um sinal claro antes de agir — não por falta de
          fé, mas para confirmar o teu caminho numa decisão que
          determinaria o futuro de toda uma família. "Antes que eu
          acabasse de falar no meu coração", Rebeca já se aproximava.
          Tenho decisões importantes diante de mim, e às vezes confundo
          impaciência com fé, agindo antes de perguntar, ou paralisando
          por medo de perguntar errado. Ensina-me a orar com a mesma
          clareza e disposição a esperar a resposta. Amém.`),
      },
      meditation: {
        prompt: t(`O servo não pediu uma visão espetacular, mas um sinal
          prático e reconhecível dentro da vida comum — uma mulher que
          respondesse com generosidade natural. Deus fala também através
          do caráter revelado em gestos pequenos.`),
        questions: [
          'Em que decisão importante você precisa parar e perguntar a Deus antes de agir, em vez de decidir sozinho e pedir bênção depois?',
          'O sinal pedido pelo servo era, na prática, um teste de caráter — generosidade. Que qualidade de caráter você busca nas pessoas com quem decide se envolver?',
          'Você reconheceria a resposta de Deus se ela viesse de forma simples e prática, em vez de espetacular?',
        ],
      },
    },
    {
      prayer: {
        title: 'Esquece-te da Casa de Teu Pai',
        text: t(`Senhor, o salmo pede à noiva: "esquece-te do teu povo e
          da casa de teu pai" — um chamado a uma lealdade nova, que não
          nega a origem, mas não se prende mais a ela. Rebeca deixou sua
          casa para uma vida que não podia prever. Reconheço em mim a
          resistência a esse tipo de travessia: prefiro manter um pé no
          que já conheço, mesmo quando tu chamas para algo novo.
          Concede-me a coragem de pertencer plenamente ao lugar para
          onde me chamas, sem viver com saudade do que já deixei para
          trás. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo comemora uma união que exige entrega completa
          — a imagem é de festa e riqueza, mas o convite por trás dela é
          de deixar para trás uma lealdade antiga por uma nova.`),
        questions: [
          'Existe uma lealdade antiga — a um hábito, uma identidade, um grupo — que você mantém mesmo depois de Deus te chamar para algo novo?',
          'O que significaria, para você hoje, pertencer plenamente a quem Deus te chamou a ser, sem "um pé atrás"?',
          'Que "casa do seu pai" você ainda precisa deixar para abraçar de vez o que Deus tem à frente?',
        ],
      },
    },
    {
      prayer: {
        title: 'O Bem Que Não Faço',
        text: t(`Senhor, Paulo confessa o que eu mesmo vivo: "o bem que
          quero, não o faço; mas o mal que não quero, esse pratico."
          Há em mim uma guerra entre o que sei ser certo e o que
          termino fazendo, e fingir que essa luta não existe só me
          afasta mais de ti. "Miserável homem que eu sou! Quem me
          livrará?" — a pergunta de Paulo é minha também. E a resposta
          também: "Graças a Deus, por Jesus Cristo nosso Senhor!" Não me
          salvo pelo esforço de vencer sozinho essa guerra interior, mas
          por aquele que já venceu por mim. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo escreve isso não como um pecador iniciante, mas
          como um apóstolo maduro — a luta entre o querer e o fazer não
          termina com a maturidade espiritual; a diferença é onde se
          coloca a esperança.`),
        questions: [
          'Qual "bem que você quer, mas não faz" tem te frustrado ultimamente?',
          'Você tende a lidar com essa luta interior tentando se esforçar mais, ou entregando-a a Cristo? Qual a diferença prática entre as duas?',
          'Como a exclamação "Graças a Deus, por Jesus Cristo" muda o tom de uma confissão que, sozinha, soaria como desespero?',
        ],
      },
    },
    {
      prayer: {
        title: 'A Esta Geração',
        text: t(`Senhor Jesus, tu descreveste uma geração que não dança
          quando se toca flauta, nem chora quando se canta lamentação —
          uma geração que critica João por jejuar e a ti por comer com
          pecadores, sempre encontrando motivo para não crer.
          Reconheço essa inconstância em mim: quando a mensagem me
          convém, aceito; quando me confronta, encontro uma razão para
          descartá-la. Livra-me da postura de espectador que nunca se
          deixa alcançar. Que eu não exija que a verdade se ajuste ao
          meu humor do dia. Amém.`),
      },
      meditation: {
        prompt: t(`A crítica de Jesus não é contra os que discordam
          honestamente, mas contra os que mudam os critérios conforme a
          conveniência — nada satisfaz porque a intenção nunca foi ser
          convencido.`),
        questions: [
          'Existe alguma verdade de Deus que você tem rejeitado não por argumento, mas por conveniência do momento?',
          '"A sabedoria é justificada pelas suas obras" — sua fé tem dado frutos visíveis, ou permanece só em opinião?',
          'Como você distingue, em si mesmo, dúvida honesta de resistência conveniente?',
        ],
      },
    },
    {
      prayer: {
        title: 'Com Presteza',
        text: t(`Deus que vês a generosidade escondida nos gestos
          comuns, Rebeca não apenas atendeu ao pedido do servo — "com
          presteza" ofereceu mais do que foi pedido, saciando também os
          camelos. Não foi cálculo; foi caráter revelado no que ninguém
          mandou fazer. Examina o meu próprio caráter nos momentos em
          que ninguém está avaliando — na pressa do dia, nos pedidos
          inconvenientes, nas oportunidades pequenas de generosidade que
          poderia ignorar sem culpa. Forma em mim a mesma presteza.
          Amém.`),
      },
      meditation: {
        prompt: t(`Encher água para dez camelos sedentos era um trabalho
          pesado e demorado — Rebeca não sabia que estava sendo
          observada como sinal de Deus; ela simplesmente agiu como quem
          é.`),
        questions: [
          'O seu caráter generoso aparece mais quando alguém está observando, ou também quando ninguém saberia?',
          'Que oportunidade pequena de generosidade você deixou passar recentemente por parecer "trabalho demais" para o pedido?',
          'Rebeca não sabia que sua resposta seria um sinal decisivo. Que gesto seu, hoje, pode ter um peso que você não imagina?',
        ],
      },
    },
    {
      prayer: {
        title: 'Jugo Suave',
        text: t(`Senhor, esta semana caminhou entre uma fonte no deserto
          e uma guerra interior no coração de Paulo, entre a inconstância
          de uma geração inteira e a presteza de uma jovem generosa. No
          meio de tudo, a tua palavra final permanece a mais simples:
          "Vinde a mim, todos os que estais cansados, e eu vos
          aliviarei." Não peço force para carregar tudo sozinho; peço o
          jugo suave que se carrega contigo. Termino esta semana
          descansando nisso. Amém.`),
      },
      meditation: {
        prompt: t(`Do sinal pedido junto ao poço ao jugo suave oferecido
          no fim do capítulo, a semana inteira girou em torno de uma
          mesma pergunta: em quem, ou em que critério, eu deposito
          confiança para agir?`),
        questions: [
          'Dos temas desta semana, qual mais revelou algo sobre como você toma decisões — orar antes de agir, deixar velhas lealdades, lidar com a luta interior, ou aceitar o jugo suave?',
          'O que significaria "descansar" nesta semana que passou, no sentido que Jesus oferece — não ausência de trabalho, mas companhia no trabalho?',
          'Que decisão da semana que vem você já pode entregar, em oração, antes mesmo de precisar agir?',
        ],
      },
    },
  ],

  // Próprio 10 — Gênesis 25:19-34 · Salmo 119:105-112 · Romanos 8:1-11 · Mateus 13:1-9, 18-23
  10: [
    {
      prayer: {
        title: 'O Semeador Saiu a Semear',
        text: t(`Senhor Jesus, contaste a parábola do semeador que
          lançava a mesma semente sobre solos diferentes — beira do
          caminho, pedregal, espinhos, boa terra — e cada um recebia de
          forma distinta a mesma palavra. Examina hoje o solo do meu
          coração, não para me condenar, mas para me mostrar onde
          preciso lavrar. Onde há dureza, amolece; onde há pedras,
          remove; onde há espinhos de ansiedade e ambição, arranca pela
          raiz. Que eu seja boa terra, não por mérito, mas por
          disposição a ser cultivado por ti. Amém.`),
      },
      meditation: {
        prompt: t(`A parábola não culpa a semente nem o semeador pelos
          solos improdutivos — o convite não é para semear diferente,
          mas para examinar honestamente que tipo de terreno o próprio
          coração tem sido.`),
        questions: [
          'Dos quatro solos da parábola, qual descreve melhor o seu coração nesta fase da vida?',
          'O que tem sufocado a palavra de Deus em você — ansiedade, riqueza, pressa, distração?',
          'O que significaria, concretamente esta semana, "lavrar" o solo do seu coração antes de esperar fruto?',
        ],
      },
    },
    {
      prayer: {
        title: 'Orou Insistentemente',
        text: t(`Senhor, Isaque "orou insistentemente" ao Senhor por
          sua mulher, que era estéril — não uma oração única e
          desistida, mas persistente, sustentada ao longo do tempo em
          que a resposta não vinha. E tu ouviste. Confesso que a minha
          oração muitas vezes desiste antes da tua resposta chegar,
          cansada pela demora. Ensina-me a perseverança de Isaque —
          não a ansiedade que exige resposta imediata, mas a
          fidelidade que continua orando enquanto espera. Amém.`),
      },
      meditation: {
        prompt: t(`O texto não diz quanto tempo Isaque orou antes de
          Rebeca conceber — apenas que ele "orou insistentemente" e
          "o Senhor ouviu". A persistência na oração nem sempre é
          visível de fora; é medida em fidelidade, não em duração
          determinada.`),
        questions: [
          'Existe uma oração que você já parou de fazer por cansaço da espera?',
          'O que diferencia, para você, "orar insistentemente" de simplesmente repetir um pedido sem fé?',
          'Como você pode sustentar essa oração específica por mais uma semana, confiando que Deus ouve mesmo no silêncio?',
        ],
      },
    },
    {
      prayer: {
        title: 'Um Guisado Vermelho',
        text: t(`Deus que vês o valor real das coisas, Esaú trocou o
          seu direito de primogenitura por um prato de comida, dizendo:
          "Estou a ponto de morrer; logo, para que me servirá o direito
          de primogenitura?" A urgência do momento cegou-o para o valor
          do que estava perdendo. Quantas vezes, Senhor, eu também
          troco o que é eterno pelo que é imediato — a paciência pelo
          alívio rápido, a integridade pela conveniência, o teu chamado
          pelo conforto de agora. Dá-me visão de longo prazo quando a
          fome do momento gritar mais alto. Amém.`),
      },
      meditation: {
        prompt: t(`Esaú não estava literalmente morrendo de fome — o
          texto usa hipérbole para mostrar como a urgência sentida
          distorce o julgamento sobre o que realmente importa.`),
        questions: [
          'Que "direito de primogenitura" — algo de valor duradouro — você já trocou por alívio imediato?',
          'Em que situações a urgência do momento costuma nublar o seu julgamento de longo prazo?',
          'O que ajudaria você a fazer uma pausa antes de decisões tomadas sob pressão de "fome" imediata?',
        ],
      },
    },
    {
      prayer: {
        title: 'Lâmpada para os Meus Pés',
        text: t(`Senhor, a tua palavra é lâmpada para os meus pés e luz
          para o meu caminho — não um holofote que ilumina todo o
          percurso de uma vez, mas luz suficiente para o próximo passo.
          "Estou continuamente em perigo de vida; todavia não me
          esqueço da tua lei" — ensina-me essa mesma fidelidade em
          meio à instabilidade. Quando a escuridão do futuro me
          angustiar, lembra-me que não preciso ver tudo, apenas o
          suficiente para dar o passo seguinte com confiança. Amém.`),
      },
      meditation: {
        prompt: t(`Uma lâmpada antiga iluminava só um pequeno raio à
          frente dos pés — não a estrada inteira. A promessa do salmo é
          de orientação suficiente, não de visão total do futuro.`),
        questions: [
          'Você tem exigido de Deus visão total do caminho antes de dar o próximo passo? O que isso revela sobre a sua confiança?',
          'Qual é o "próximo passo" que já está claro, mesmo que o resto do caminho não esteja?',
          'Como a Palavra de Deus tem sido, na prática, luz para as suas decisões recentes?',
        ],
      },
    },
    {
      prayer: {
        title: 'Nenhuma Condenação',
        text: t(`Senhor, Paulo declara: "agora nenhuma condenação há
          para os que estão em Cristo Jesus." Vivo, tantas vezes, como
          se essa sentença ainda não tivesse sido dada — carregando
          culpa que já foi paga, condenando-me por falhas que tu já
          perdoaste. A lei do Espírito da vida me libertou da lei do
          pecado e da morte. Ajuda-me a viver, de fato, segundo o
          Espírito e não segundo a carne — não por medo de condenação,
          mas porque já não há condenação para buscar evitar. Amém.`),
      },
      meditation: {
        prompt: t(`"Nenhuma condenação" é uma declaração jurídica, não
          um sentimento — permanece verdadeira mesmo nos dias em que
          você não se sente perdoado.`),
        questions: [
          'Existe alguma culpa antiga que você continua carregando, mesmo sabendo que em Cristo já não há condenação?',
          'O que muda, na prática do seu dia, quando você vive a partir da aceitação já dada, e não em busca dela?',
          'Como você distingue convicção do Espírito (que leva ao arrependimento) de condenação (que já foi removida em Cristo)?',
        ],
      },
    },
    {
      prayer: {
        title: 'Boa Terra',
        text: t(`Senhor Jesus, disseste que a boa terra "ouve a palavra,
          e a entende; e dá fruto." O entendimento vem antes do fruto —
          não basta ouvir distraidamente, é preciso deixar a palavra
          penetrar fundo o suficiente para ser compreendida e não só
          registrada. Tantas vezes ouço a tua palavra sem realmente
          me deixar alcançar por ela, passando de leitura em leitura
          sem raiz nem fruto. Concede-me ouvidos que entendem, não
          apenas escutam. Amém.`),
      },
      meditation: {
        prompt: t(`A diferença entre os solos pedregoso e bom não é
          apenas receptividade inicial — é profundidade. Alegria
          superficial sem raiz murcha na primeira dificuldade.`),
        questions: [
          'Você consegue lembrar de uma palavra ou leitura bíblica recente que realmente "entendeu", em vez de apenas ouvir?',
          'O que ajuda você a aprofundar a raiz de uma verdade espiritual, em vez de deixá-la superficial?',
          'Que fruto concreto você gostaria que uma verdade específica desta semana produzisse na sua vida?',
        ],
      },
    },
    {
      prayer: {
        title: 'Semeando com Fé',
        text: t(`Senhor, esta semana trouxe um solo a ser examinado, uma
          oração persistente, um prato trocado por um direito eterno, e
          uma lâmpada suficiente para o próximo passo. No centro de
          tudo, a mesma verdade: tu semeias generosamente, mesmo
          sabendo que nem todo solo dará fruto, e não há condenação
          para quem está em Cristo. Termino a semana pedindo que o solo
          do meu coração, cultivado por ti, produza fruto — trinta,
          sessenta, cem por um. Amém.`),
      },
      meditation: {
        prompt: t(`A generosidade do semeador — que lança sementes até
          onde sabe que não vão germinar — é um retrato da paciência de
          Deus com solos ainda não prontos, incluindo o nosso, em
          diferentes fases da vida.`),
        questions: [
          'Olhando para os últimos sete dias, em que área você sentiu o solo do seu coração mais receptivo à Palavra?',
          'O que você quer levar desta semana — a persistência de Isaque, o alerta sobre Esaú, ou a certeza de "nenhuma condenação" — para a semana seguinte?',
          'Como seria continuar cultivando, de forma prática, o solo que Deus já começou a lavrar em você?',
        ],
      },
    },
  ],

  // Próprio 11 — Gênesis 28:10-19a · Salmo 139:1-12, 23-24 · Romanos 8:12-25 · Mateus 13:24-30, 36-43
  11: [
    {
      prayer: {
        title: 'Deixai Crescer Ambos Juntos',
        text: t(`Senhor Jesus, na parábola do joio e do trigo, os servos
          queriam arrancar o mal imediatamente, mas tu ordenaste
          paciência: "Deixai crescer ambos juntos até a ceifa." É
          difícil conviver com o que sei ser errado — em mim, na minha
          família, no mundo — sem exigir solução instantânea. Ensina-me
          a confiar no teu tempo de julgamento, sem me tornar eu mesmo
          juiz precipitado. Que eu cuide do meu próprio crescimento como
          trigo, e deixe a ti o que só tu podes discernir com precisão.
          Amém.`),
      },
      meditation: {
        prompt: t(`O risco de arrancar o joio cedo demais é arrancar
          também o trigo — o discernimento apressado, mesmo bem
          intencionado, pode destruir o que ainda está crescendo junto.`),
        questions: [
          'Em que área da sua vida você tem tentado "arrancar o joio" antes da hora, com risco de prejudicar o que ainda está em formação?',
          'Como você distingue paciência sábia de conivência com o mal?',
          'O que significa, para você, confiar o julgamento final a Deus em vez de assumi-lo sozinho?',
        ],
      },
    },
    {
      prayer: {
        title: 'O Senhor Está Neste Lugar',
        text: t(`Deus que apareces mesmo onde não te esperamos, Jacó
          fugia sozinho, com medo, dormindo ao relento com uma pedra
          por travesseiro, quando sonhou com uma escada que ligava a
          terra ao céu. Ao acordar, disse: "Realmente o Senhor está
          neste lugar; e eu não o sabia." Quantas vezes passo por
          lugares e situações difíceis sem perceber a tua presença ali.
          Abre os meus olhos para reconhecer, também nos meus momentos
          de fuga e solidão, que tu já estás presente antes mesmo que
          eu saiba pedir. Amém.`),
      },
      meditation: {
        prompt: t(`Jacó estava fugindo das consequências do próprio
          engano contra o irmão quando teve esse encontro — Deus não
          esperou que ele estivesse "em condições" para se revelar a
          ele.`),
        questions: [
          'Existe algum lugar ou momento difícil da sua vida onde, olhando para trás, você reconhece que Deus estava presente sem que você soubesse na hora?',
          'Jacó não era íntegro quando teve esse encontro — o que isso te ensina sobre quando Deus escolhe se revelar?',
          'Que "pedra por travesseiro" — circunstância dura — você está enfrentando agora, onde Deus pode estar mais presente do que você percebe?',
        ],
      },
    },
    {
      prayer: {
        title: 'Tu Me Sondas e Me Conheces',
        text: t(`Senhor, tu me sondas e me conheces; conheces o meu
          sentar e o meu levantar, entendes de longe o meu pensamento.
          Não há lugar para onde eu possa fugir da tua presença — nem
          o céu, nem o abismo, nem a escuridão mais densa te escondem
          de mim, nem a mim de ti. Esse conhecimento é, ao mesmo tempo,
          consolo e exame: consolo porque nunca estou realmente
          sozinho; exame porque nada em mim está oculto de ti. "Sonda-me,
          ó Deus, e conhece o meu coração" — não com medo, mas com
          confiança na tua bondade. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo não termina em constrangimento por ser
          totalmente conhecido, mas em convite — "sonda-me" — porque
          ser plenamente conhecido por Deus é, ao final, mais seguro do
          que se esconder.`),
        questions: [
          'Você vive o conhecimento de Deus sobre você mais como ameaça ou como consolo? O que explica essa diferença?',
          'Existe algo que você tenta esconder de Deus, sabendo racionalmente que é impossível?',
          'O que significaria orar "sonda-me, ó Deus" de verdade, sem reservas, sobre uma área específica da sua vida?',
        ],
      },
    },
    {
      prayer: {
        title: 'Aba, Pai',
        text: t(`Senhor, Paulo escreve que não recebemos espírito de
          escravidão para viver com medo, mas espírito de adoção, pelo
          qual clamamos: "Aba, Pai!" Tantas vezes me relaciono contigo
          como servo temeroso, tentando merecer aprovação, em vez de
          filho já adotado, já amado. Ensina-me a intimidade dessa
          palavra — Aba, tão próxima quanto "papai" — sem perder a
          reverência devida a quem és. Que eu viva como herdeiro, não
          como estranho tentando ser aceito. Amém.`),
      },
      meditation: {
        prompt: t(`"Aba" era o termo usado por crianças pequenas para se
          dirigir ao pai — íntimo, confiante, sem formalidade. Paulo o
          usa deliberadamente para descrever a nova relação com Deus
          possibilitada pelo Espírito.`),
        questions: [
          'Sua oração normalmente soa mais como súplica de servo temeroso ou como conversa de filho amado?',
          'O que mudaria se você realmente confiasse que já foi adotado, e não precisa provar nada para pertencer?',
          'Que área da sua vida você trata Deus mais como juiz distante do que como Pai íntimo?',
        ],
      },
    },
    {
      prayer: {
        title: 'A Coluna em Betel',
        text: t(`Senhor, depois do sonho da escada, Jacó não seguiu seu
          caminho como se nada tivesse acontecido — levantou-se de
          manhã cedo, tomou a pedra que servira de travesseiro, ergueu-a
          como coluna e a ungiu com azeite. Ele marcou o lugar do
          encontro. Ajuda-me a não deixar passar em branco os momentos
          em que percebo a tua presença — a criar, de alguma forma,
          memoriais no meu dia a dia, para que eu não esqueça o que
          vivi contigo. Amém.`),
      },
      meditation: {
        prompt: t(`Jacó transformou um objeto comum — uma pedra que
          serviu de travesseiro — num marco de memória. O gesto não
          mudou o lugar; mudou a forma como ele se lembraria dele.`),
        questions: [
          'Você tem algum hábito de marcar, de forma concreta, os momentos em que reconhece a presença de Deus?',
          'Que "pedra" da sua própria história poderia virar um memorial de gratidão, se você parasse para nomeá-la?',
          'Como criar, nesta semana, um pequeno gesto de memória para um encontro recente com Deus?',
        ],
      },
    },
    {
      prayer: {
        title: 'A Criação Aguarda',
        text: t(`Senhor, Paulo descreve a criação inteira gemendo com
          dores de parto, aguardando com ardente expectativa a
          revelação dos filhos de Deus. Não somos os únicos que
          esperamos e sofremos; a criação toda participa dessa espera.
          Isso me consola: as minhas dores não são sinal de que algo
          deu errado no plano, mas parte do processo em direção a algo
          que ainda não vejo plenamente. Ajuda-me a esperar com
          paciência o que ainda não vejo, sabendo que a esperança que
          se vê não é esperança. Amém.`),
      },
      meditation: {
        prompt: t(`A imagem de "dores de parto" sugere sofrimento que
          não é sem sentido, mas que produz algo — diferente de dor
          que simplesmente destrói.`),
        questions: [
          'Existe algum sofrimento atual na sua vida que você consegue ressignificar como "dor de parto" — produzindo algo, não apenas destruindo?',
          'Como a ideia de que "toda a criação geme" muda a forma como você encara o sofrimento que vê ao seu redor, não só o seu?',
          'O que significa esperar "com paciência" aquilo que você ainda não vê — sem forçar, sem desistir?',
        ],
      },
    },
    {
      prayer: {
        title: 'Sondado e Conhecido em Betel',
        text: t(`Senhor, esta semana começou com um sonho numa pedra
          fria e terminou com a esperança de toda a criação. No meio,
          descobri que sou sondado e conhecido em profundidade, e ainda
          assim chamado de filho, não de estranho. Como Jacó em Betel,
          quero levantar hoje um memorial — não de pedra, mas de
          gratidão — por tudo que percebi da tua presença nestes sete
          dias. O Senhor estava neste lugar, e agora eu sei. Amém.`),
      },
      meditation: {
        prompt: t(`Do medo solitário de Jacó fugindo de casa à confiança
          de quem clama "Aba, Pai", a semana percorreu uma distância
          inteira — a mesma distância que a fé percorre repetidamente ao
          longo da vida.`),
        questions: [
          'Qual dos temas desta semana — a paciência com o joio, o encontro em Betel, ser sondado, ou o clamor "Aba, Pai" — mais tocou você, e por quê?',
          'Que "Betel" — lugar de encontro reconhecido — você viveu nesta semana?',
          'Como você quer entrar na próxima semana carregando essa consciência de ser plenamente conhecido e ainda assim amado como filho?',
        ],
      },
    },
  ],

  // Próprio 12 — Gênesis 29:15-28 · Salmo 105:1-11, 45b · Romanos 8:26-39 · Mateus 13:31-33, 44-52
  12: [
    {
      prayer: {
        title: 'Tesouro Escondido',
        text: t(`Senhor Jesus, o reino dos céus é como um tesouro
          escondido no campo — quem o encontra, movido de gozo, vende
          tudo o que tem para adquiri-lo. Não é sacrifício amargo; é
          troca alegre, porque o valor do tesouro supera de longe tudo o
          que se entrega por ele. Ajuda-me a ver o teu Reino dessa
          forma: não como obrigação que me custa, mas como descoberta
          que me enche de gozo a ponto de tornar leve qualquer coisa que
          eu precise deixar para trás por causa dele. Amém.`),
      },
      meditation: {
        prompt: t(`O homem da parábola não vende tudo com tristeza
          resignada, mas "movido de gozo" — a alegria da descoberta é o
          que torna a entrega possível, não força de vontade.`),
        questions: [
          'Você vive a fé mais como sacrifício exigido ou como descoberta alegre? O que diferencia as duas posturas?',
          'O que você já "vendeu" — priorizou, abriu mão — por causa do que descobriu ter valor eterno?',
          'Existe algo que você ainda segura com relutância, que talvez precise ser visto sob a luz do tesouro, não da perda?',
        ],
      },
    },
    {
      prayer: {
        title: 'Como Poucos Dias',
        text: t(`Senhor, Jacó serviu sete anos por amor a Raquel, "e
          estes lhe pareciam como poucos dias, pelo muito que a amava."
          O amor verdadeiro transforma a percepção do tempo e do
          esforço — o que seria fardo torna-se leve quando feito por
          quem se ama. Examina o meu próprio serviço: tenho trabalhado,
          orado, servido, mais como obrigação que arrasta o tempo, ou
          como expressão de amor que o encurta? Ensina-me a servir com
          o coração de quem ama, não o de quem cumpre tabela. Amém.`),
      },
      meditation: {
        prompt: t(`O texto não elogia o esforço de Jacó em si, mas o
          amor que o sustentou — o mesmo trabalho, feito por obrigação,
          teria parecido interminável.`),
        questions: [
          'Existe algo em sua vida — trabalho, cuidado com alguém, disciplina espiritual — que se tornaria mais leve se feito por amor em vez de obrigação?',
          'O que você ama o suficiente para que sete anos de espera pareçam poucos dias?',
          'Como cultivar mais amor, e não apenas mais disciplina, nas áreas em que você já está servindo?',
        ],
      },
    },
    {
      prayer: {
        title: 'Por Que Me Enganaste?',
        text: t(`Deus de justiça, Jacó foi enganado por Labão depois de
          sete anos de trabalho fiel — recebeu Léia quando esperava
          Raquel, e teve que servir outros sete anos. A pergunta dele é
          humana e legítima: "Por que me enganaste?" Há injustiças na
          minha vida também que não encontram explicação fácil, promessas
          que pareciam certas e não se cumpriram como eu esperava.
          Não te peço para fingir que a dor da decepção não existe;
          peço força para continuar confiando em ti mesmo quando pessoas
          me decepcionam. Amém.`),
      },
      meditation: {
        prompt: t(`A narrativa não resolve a injustiça rapidamente —
          Jacó teve que trabalhar mais sete anos. A Escritura não
          promete que toda decepção terá reparação imediata, mas
          registra a dor honestamente.`),
        questions: [
          'Existe alguma decepção — de uma pessoa, de uma promessa não cumprida — que você ainda carrega sem resposta?',
          'Como você distingue entre confiar em Deus e confiar cegamente em pessoas que podem falhar?',
          'O que ajudaria você a seguir em frente depois de uma injustiça que não teve solução rápida?',
        ],
      },
    },
    {
      prayer: {
        title: 'Lembrai-vos das Maravilhas',
        text: t(`Senhor, o salmista convida: "Lembrai-vos das maravilhas
          que ele tem feito" — um chamado à memória ativa, não apenas
          à emoção do momento presente. É fácil esquecer, no meio das
          dificuldades de hoje, tudo o que já vivi da tua fidelidade em
          outros tempos. Ajuda-me a cultivar o hábito de lembrar — de
          contar, de registrar, de recontar — para que a memória da tua
          fidelidade sustente a minha fé quando o presente parecer
          incerto. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo é, em parte, um exercício de memória
          coletiva — recontar a história da aliança para fortalecer a fé
          presente da comunidade que ora.`),
        questions: [
          'Você tem algum hábito — diário, conversa, oração — de lembrar ativamente das maravilhas que Deus já fez na sua vida?',
          'Qual "maravilha" do seu passado você precisa relembrar hoje para fortalecer sua fé no presente?',
          'Como você poderia começar, nesta semana, a registrar de alguma forma a fidelidade de Deus que normalmente esquece?',
        ],
      },
    },
    {
      prayer: {
        title: 'Gemidos Inexprimíveis',
        text: t(`Senhor, há momentos em que não sei nem o que pedir —
          e Paulo me consola: "o Espírito mesmo intercede por nós com
          gemidos inexprimíveis." Não preciso ter palavras perfeitas
          para orar; o próprio Espírito traduz o que meu coração não
          consegue formular. Nos dias de confusão, de dor sem nome, de
          cansaço que não encontra explicação, obrigado por não me
          deixar sozinho nem mesmo na minha incapacidade de orar
          direito. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo não descreve uma falha na oração, mas um
          socorro — a garantia de que a comunicação com Deus não depende
          da nossa habilidade de articular sentimentos complexos.`),
        questions: [
          'Existe algo em você que você não consegue colocar em palavras para orar? Como esse texto muda a forma de encarar isso?',
          'Você já sentiu alívio em saber que o Espírito "intercede por nós", mesmo quando você não sabe o que pedir?',
          'O que significaria permitir-se orar com gemidos, sem exigir de si mesmo eloquência?',
        ],
      },
    },
    {
      prayer: {
        title: 'Nada Nos Separará',
        text: t(`Senhor, Paulo pergunta: "Quem nos separará do amor de
          Cristo? A tribulação, ou a angústia, ou a perseguição, ou a
          fome?" E responde com convicção: nem morte, nem vida, nem
          anjos, nem coisas presentes, nem futuras, nada será capaz de
          nos separar do teu amor. Em dias de instabilidade, quando o
          chão parece se mover sob meus pés, quero segurar-me nessa
          certeza, não como sentimento passageiro, mas como fato
          estabelecido em Cristo. Nada me separará do teu amor. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo enumera especificamente as forças que mais
          ameaçariam essa certeza — não é otimismo ingênuo, mas
          declaração feita conhecendo bem o peso real de tribulação,
          angústia e perseguição.`),
        questions: [
          'Qual das ameaças listadas por Paulo (tribulação, angústia, perseguição, morte, vida) mais testa a sua confiança no amor de Deus hoje?',
          'O que muda quando você trata essa certeza como fato declarado, e não como sentimento que vai e vem?',
          'Como você pode lembrar dessa verdade concretamente na próxima vez que se sentir separado do amor de Deus pelas circunstâncias?',
        ],
      },
    },
    {
      prayer: {
        title: 'Tesouros Novos e Velhos',
        text: t(`Senhor, esta semana trouxe um tesouro escondido, um
          amor que encurta sete anos, uma decepção sem resposta fácil,
          e a certeza inabalável de que nada nos separa do teu amor.
          Como o escriba da parábola, que "tira do seu tesouro coisas
          novas e velhas", quero guardar tanto as lembranças antigas da
          tua fidelidade quanto as descobertas novas desta semana.
          Termino confiando: o que quer que eu tenha vivido nestes sete
          dias, nada disso me separou de ti. Amém.`),
      },
      meditation: {
        prompt: t(`A imagem final da semana — tesouros novos e velhos —
          resume o próprio ritmo da vida espiritual: aprender coisas
          novas sem descartar o que Deus já ensinou antes.`),
        questions: [
          'Que "tesouro velho" — uma verdade que Deus já te ensinou antes — ganhou novo significado nesta semana?',
          'E que "tesouro novo" você descobriu nestes sete dias de leitura e oração?',
          'Como você quer carregar, para a próxima semana, tanto a alegria da descoberta quanto a certeza inabalável do amor de Deus?',
        ],
      },
    },
  ],

  // Próprio 13 — Gênesis 32:22-31 · Salmo 17:1-7, 15 · Romanos 9:1-5 · Mateus 14:13-21
  13: [
    {
      prayer: {
        title: 'Dai-lhes Vós de Comer',
        text: t(`Senhor Jesus, diante de cinco mil famintos, os
          discípulos viram só o problema: "O lugar é deserto... despede
          as multidões." Tu respondeste: "Não precisam ir embora,
          dai-lhes vós de comer." Com cinco pães e dois peixes,
          multiplicaste o pouco em abundância. Tantas vezes vejo os
          meus recursos como insuficientes diante das necessidades ao
          redor e prefiro que outros resolvam. Ensina-me a trazer o
          pouco que tenho às tuas mãos, confiando que tu multiplicas o
          que é oferecido, não o que é guardado por medo. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus não fez a multidão desaparecer nem criou comida
          do nada sem envolver os discípulos — pediu que eles trouxessem
          o pouco que tinham, e a partir disso agiu.`),
        questions: [
          'Que "cinco pães e dois peixes" — recurso pequeno diante de uma necessidade grande — você tem hesitado em oferecer por parecer insuficiente?',
          'Você tende a resolver problemas grandes "despedindo a multidão" (evitando) ou trazendo o pouco que tem a Deus?',
          'Onde você pode, hoje, participar de uma provisão maior do que consegue sozinho?',
        ],
      },
    },
    {
      prayer: {
        title: 'Não Te Deixarei Ir',
        text: t(`Deus que lutas comigo até o amanhecer, Jacó enfrentou
          uma noite inteira de luta com um homem misterioso, e mesmo
          ferido na juntura da coxa, recusou-se a desistir: "Não te
          deixarei ir, se me não abençoares." Há lutas espirituais na
          minha vida que eu abandono cedo demais, cansado, sem insistir
          até a bênção. Dá-me a mesma tenacidade de Jacó — não
          teimosia contra ti, mas perseverança que se recusa a soltar
          antes de receber o que busca. Amém.`),
      },
      meditation: {
        prompt: t(`Jacó saiu da luta ferido e coxeando — a bênção não
          veio sem custo. Às vezes o encontro transformador com Deus
          deixa marcas visíveis, não apenas conforto.`),
        questions: [
          'Existe alguma luta espiritual que você abandonou cedo demais, sem insistir até o fim?',
          'Jacó ficou ferido, mas abençoado. Você está disposto a sair de um encontro com Deus mudado, mesmo que isso custe algo?',
          'O que significaria, na sua vida de oração hoje, "não te deixarei ir, se me não abençoares"?',
        ],
      },
    },
    {
      prayer: {
        title: 'Vi Deus Face a Face',
        text: t(`Senhor, depois da noite de luta, Jacó recebeu um novo
          nome — Israel — e disse: "Tenho visto Deus face a face, e a
          minha vida foi preservada." Ele saiu daquele encontro
          diferente: novo nome, nova identidade, e uma coxeadura que
          carregaria para sempre. Não fujo dos encontros contigo que me
          transformam, mesmo quando deixam marca. Que eu também possa
          dizer, sobre os momentos decisivos da minha fé, que vi algo
          da tua face e minha vida foi preservada, ainda que mudada.
          Amém.`),
      },
      meditation: {
        prompt: t(`O nome novo — Israel, "aquele que luta com Deus" —
          não apaga o passado de Jacó (enganador), mas o redefine a
          partir do encontro, não apenas do histórico.`),
        questions: [
          'Existe um "nome antigo" — uma identidade baseada no seu passado — que Deus pode estar querendo substituir por algo novo?',
          'Que encontro com Deus já te marcou de forma permanente, como a coxeadura de Jacó?',
          'Como você carrega, hoje, tanto a marca de lutas passadas quanto a bênção que veio com elas?',
        ],
      },
    },
    {
      prayer: {
        title: 'Tristeza Incessante',
        text: t(`Senhor, Paulo escreve sobre "grande tristeza e
          incessante dor" no coração por causa do seu próprio povo, a
          ponto de desejar ser separado de Cristo por amor deles. Essa
          é uma intercessão que dói, não uma oração distante e
          confortável. Confesso que raramente sinto essa dor por
          quem ainda não te conhece — mantenho distância emocional das
          pessoas pelas quais deveria interceder com mais paixão.
          Desperta em mim essa mesma tristeza incessante, que se traduz
          em oração de verdade. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo não escreve sobre estranhos, mas sobre "meus
          irmãos, que são meus parentes segundo a carne" — a intercessão
          mais profunda geralmente nasce de proximidade, não de
          distância.`),
        questions: [
          'Por quem você sente uma "tristeza incessante" semelhante à de Paulo — alguém próximo que ainda não conhece a Cristo?',
          'A sua oração por essa pessoa tem sido esporádica ou verdadeiramente constante?',
          'O que significaria intensificar essa intercessão nesta semana, de forma concreta?',
        ],
      },
    },
    {
      prayer: {
        title: 'Compadecendo-se da Multidão',
        text: t(`Senhor Jesus, antes de multiplicar os pães, o texto diz
          que "compadecendo-se dela, curou os seus enfermos" — a
          multiplicação nasceu da compaixão, não do espetáculo. Tu não
          vieste primeiro para impressionar, mas para cuidar. Ensina-me
          a mesma ordem: que meu serviço ao próximo nasça de
          compaixão genuína, e não de necessidade de ser visto fazendo
          o bem. Que eu veja as multidões como tu vês — não como
          demanda incômoda, mas como gente precisando de cuidado. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus estava cansado e buscava descanso quando a
          multidão o encontrou — mesmo assim, respondeu com compaixão,
          não com irritação pela interrupção.`),
        questions: [
          'Como você costuma reagir quando é interrompido no seu próprio momento de descanso por uma necessidade alheia?',
          'O que diferencia, na prática, agir por compaixão genuína e agir para ser visto fazendo o bem?',
          'Quem, ao seu redor, precisa hoje que você o veja com os olhos de compaixão de Jesus, e não como incômodo?',
        ],
      },
    },
    {
      prayer: {
        title: 'Faze Maravilhosas as Tuas Beneficências',
        text: t(`Senhor, o salmista pede: "Faze maravilhosas as tuas
          beneficências, ó Salvador dos que à tua destra se refugiam."
          Não é pedido de milagre espetacular, mas confiança de que o
          teu cuidado cotidiano já é, em si, maravilhoso. "Provas-me o
          coração, visitas-me de noite; examinas-me e não achas
          iniquidade" — que a minha vida, examinada, revele integridade
          construída ao longo do tempo, não apenas boas intenções
          momentâneas. Amém.`),
      },
      meditation: {
        prompt: t(`O salmista pede a Deus que examine seu coração antes
          de pedir socorro — a integridade buscada não é perfeição, mas
          honestidade que resiste ao próprio exame.`),
        questions: [
          'Você teria coragem de pedir a Deus que "provasse o seu coração" como o salmista, confiante no resultado?',
          'O que você entende por "beneficências maravilhosas" de Deus na sua vida cotidiana, sem esperar necessariamente algo espetacular?',
          'Que área da sua integridade precisaria de mais exame honesto nesta semana?',
        ],
      },
    },
    {
      prayer: {
        title: 'Face a Face, Pão Multiplicado',
        text: t(`Senhor, esta semana começou com uma luta noturna que
          deixou Jacó coxeando e abençoado, e terminou com cinco mil
          alimentados por cinco pães. Entre os dois episódios, a
          tristeza intercessora de Paulo e o exame honesto do salmista.
          O padrão se repete: tu ages através do pouco, do ferido, do
          que se entrega. Termino esta semana como Jacó — talvez
          marcado por alguma luta, mas certo de ter visto algo da tua
          face. Amém.`),
      },
      meditation: {
        prompt: t(`Tanto Jacó quanto os cinco pães ilustram o mesmo
          princípio: Deus não espera perfeição ou abundância para agir
          — ele trabalha a partir do que é oferecido, ferido ou pequeno
          que seja.`),
        questions: [
          'Dos episódios desta semana, qual mais revelou a você como Deus age a partir do pouco ou do ferido?',
          'Que "coxeadura" desta semana você carrega como sinal de um encontro real, não apenas de dificuldade sem sentido?',
          'Como você quer levar a compaixão que viu em Jesus para as pessoas que encontrará na semana que vem?',
        ],
      },
    },
  ],

  // Próprio 14 — Gênesis 37:1-4, 12-28 · Salmo 105:1-6, 16-22, 45b · Romanos 10:5-15 · Mateus 14:22-33
  14: [
    {
      prayer: {
        title: 'Homem de Pouca Fé',
        text: t(`Senhor Jesus, Pedro ousou descer do barco e andar sobre
          as águas em tua direção — até sentir o vento e começar a
          afundar. "Senhor, salva-me", clamou, e imediatamente
          estendeste a mão. Tantas vezes começo com coragem e, no meio
          do caminho, sinto o vento contrário e me distraio do teu olhar
          para as circunstâncias ao redor. Não me deixes afundar sozinho
          no medo. Que a minha oração, mesmo em pânico, seja simples
          como a de Pedro: Senhor, salva-me. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus não repreendeu Pedro por afundar, mas pela
          dúvida que causou o afundar — e mesmo assim o segurou antes de
          qualquer explicação ou lição.`),
        questions: [
          'Em que momento recente você "começou a afundar" ao desviar o olhar da presença de Deus para as circunstâncias?',
          'O clamor de Pedro foi curto e direto: "Senhor, salva-me." Você permite orações assim, sem precisar de elaboração?',
          'Jesus estendeu a mão imediatamente, antes de qualquer repreensão. O que isso muda na forma como você imagina a reação de Deus ao seu medo?',
        ],
      },
    },
    {
      prayer: {
        title: 'Fez-lhe uma Túnica de Várias Cores',
        text: t(`Senhor, Israel amava José mais do que a todos os seus
          outros filhos, e o favoritismo visível — a túnica de várias
          cores — semeou ódio entre os irmãos. Não posso mudar as
          famílias de origem, mas posso examinar como o favoritismo,
          a comparação e a inveja operam nas minhas próprias relações
          hoje — em casa, no trabalho, na igreja. Dá-me olhos para ver
          quando estou alimentando divisão, seja recebendo favoritismo
          seja nutrindo ressentimento por não recebê-lo. Amém.`),
      },
      meditation: {
        prompt: t(`O texto não culpa apenas os irmãos pelo ódio — o
          favoritismo do pai é apresentado como parte da causa. Famílias
          e comunidades quebradas raramente têm um único culpado.`),
        questions: [
          'Você já foi tanto beneficiado por favoritismo quanto prejudicado por ele? Como cada experiência marcou você?',
          'Existe inveja ou ressentimento crescendo em alguma relação sua, semelhante ao que cresceu entre os irmãos de José?',
          'O que você pode fazer, de forma prática, para não alimentar comparação e favoritismo nos relacionamentos que você influencia?',
        ],
      },
    },
    {
      prayer: {
        title: 'Lançado numa Cova',
        text: t(`Deus que vês quando somos traídos pelos mais próximos,
          José foi lançado numa cova pelos próprios irmãos e depois
          vendido como escravo — abandonado por quem deveria protegê-lo.
          Ele não escolheu essa dor, mas ela se tornaria parte do
          caminho que tu usarias para salvar toda a família anos depois.
          Não prometo entender agora as traições que enfrento, mas
          confio que tu não abandonas quem está na cova, mesmo quando o
          resgate demora anos para chegar. Amém.`),
      },
      meditation: {
        prompt: t(`A narrativa não suaviza a crueldade dos irmãos —
          eles sentaram para comer enquanto José gritava na cova
          (episódio relatado mais adiante). A Escritura registra a
          traição sem minimizá-la, mesmo sabendo o desfecho final.`),
        questions: [
          'Existe uma "cova" na sua história — uma traição de pessoas próximas — que ainda não encontrou sentido ou resolução?',
          'Como você equilibra reconhecer a dor real de uma traição com a esperança de que Deus ainda pode usar essa história?',
          'O que ajudaria você a confiar em Deus numa espera longa, sem saber quando ou como o resgate virá?',
        ],
      },
    },
    {
      prayer: {
        title: 'A Palavra Está Perto de Ti',
        text: t(`Senhor, Paulo escreve que não é preciso subir ao céu
          nem descer ao abismo para encontrar a salvação — "a palavra
          está perto de ti, na tua boca e no teu coração." Tantas vezes
          complico o que já é acessível, buscando experiências
          extraordinárias quando a verdade simples já está diante de
          mim: confessar com a boca, crer no coração. Ajuda-me a
          descansar na simplicidade do evangelho, sem torná-lo mais
          distante do que realmente é. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo contrasta a busca complicada por salvação
          (subir ao céu, descer ao abismo) com a proximidade real da
          palavra — a fé cristã não exige proeza espiritual, apenas
          resposta simples e honesta.`),
        questions: [
          'Você já complicou desnecessariamente algo que a fé oferece de forma simples?',
          'O que significa, na prática, "crer no coração e confessar com a boca" nas circunstâncias que você vive hoje?',
          'Existe alguém em sua vida que também busca algo "longe" que já está perto — como você poderia mostrar isso a essa pessoa?',
        ],
      },
    },
    {
      prayer: {
        title: 'Formosos os Pés dos Que Anunciam',
        text: t(`Senhor, Paulo pergunta: "Como pregarão, se não forem
          enviados?" e celebra: "Quão formosos os pés dos que anunciam
          coisas boas!" José foi enviado ao Egito por um caminho de
          sofrimento, mas terminou sendo quem anunciou boas notícias de
          provisão em tempo de fome. Às vezes o teu envio não passa
          pelo caminho que eu escolheria. Ajuda-me a confiar que, mesmo
          através de circunstâncias difíceis, tu podes estar me
          preparando para anunciar boas notícias a alguém que ainda não
          sabe. Amém.`),
      },
      meditation: {
        prompt: t(`O caminho de José até se tornar alguém que anuncia
          "boas notícias" (provisão em tempo de fome) passou pela cova,
          pela escravidão e pela prisão injusta — o envio de Deus nem
          sempre segue uma rota direta.`),
        questions: [
          'Que parte difícil da sua história pode estar, sem que você perceba ainda, te preparando para anunciar algo bom a alguém?',
          'Você já pensou em si mesmo como "enviado" — não apenas para pregar formalmente, mas para levar boa notícia através da sua própria experiência?',
          'Quem, hoje, precisa ouvir uma boa notícia que só você, pelo que viveu, pode anunciar de forma genuína?',
        ],
      },
    },
    {
      prayer: {
        title: 'A Palavra do Senhor o Provou',
        text: t(`Senhor, o salmo resume a história de José em uma
          frase densa: "até o tempo em que a sua palavra se cumpriu; a
          palavra do Senhor o provou." A provação não foi acidente à
          margem da promessa — foi parte do processo que a cumpriu.
          Quando enfrento provações que parecem atrasar ou contradizer
          o que esperava de ti, ajuda-me a lembrar que provação e
          promessa podem caminhar juntas, mesmo quando eu só vejo uma
          delas no momento. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo não separa a provação da promessa — ambas
          fazem parte da mesma frase, sugerindo que o tempo de espera e
          dificuldade tem função no cumprimento, não é apenas obstáculo
          a ser superado.`),
        questions: [
          'Você tende a ver as provações da vida como interrupções da promessa de Deus, ou como parte do caminho até ela?',
          'Que provação atual você pode estar enfrentando que, olhando com mais tempo, pode revelar propósito?',
          'Como a história de José muda a forma como você espera pelo cumprimento de algo que Deus prometeu, mas ainda não viu?',
        ],
      },
    },
    {
      prayer: {
        title: 'Segurou-o e Disse-lhe',
        text: t(`Senhor, esta semana caminhou da túnica que gerou inveja
          à cova da traição, da simplicidade da palavra perto de nós
          aos pés formosos de quem anuncia boas novas. E terminou com
          Pedro afundando e sendo seguro pela tua mão. Se José precisou
          de anos para ver o propósito da sua provação, e Pedro precisou
          apenas de um instante de fé fraquejante para ser salvo, quero
          confiar que, seja qual for o meu tempo de espera, tu estendes
          a mão antes que eu afunde de vez. Amém.`),
      },
      meditation: {
        prompt: t(`José esperou anos; Pedro foi salvo em segundos — a
          Escritura não promete um ritmo único para o resgate de Deus,
          apenas a certeza de que ele vem.`),
        questions: [
          'Dos dois padrões desta semana — a longa espera de José e o resgate imediato de Pedro — qual reflete melhor o que você está vivendo agora?',
          'O que você aprendeu nesta semana sobre confiar em Deus tanto na espera longa quanto na necessidade urgente?',
          'Como você quer entrar na próxima semana, sabendo que a mão de Deus se estende tanto para quem espera anos quanto para quem afunda hoje?',
        ],
      },
    },
  ],

  // Próprio 15 — Gênesis 45:1-15 · Salmo 133 · Romanos 11:1-2a, 29-32 · Mateus 15:(10-20), 21-28
  15: [
    {
      prayer: {
        title: 'Grande É a Tua Fé',
        text: t(`Senhor Jesus, a mulher cananeia clamou por sua filha
          mesmo diante do teu silêncio inicial e de uma resposta que
          parecia negar seu pedido. Ela insistiu, argumentou com
          humildade e engenho — "até os cachorrinhos comem das
          migalhas" — e ouviu de ti: "Grande é a tua fé!" Ensina-me essa
          mesma persistência corajosa, que não desiste diante do
          silêncio, nem se ofende diante da dificuldade, mas continua
          buscando com humildade até ser respondida. Amém.`),
      },
      meditation: {
        prompt: t(`A mulher não tinha os "credenciais" religiosos certos
          — era estrangeira, fora da aliança visível — mas sua fé
          persistente e humilde foi elogiada por Jesus como exemplar,
          acima de muitos que tinham posição religiosa mais óbvia.`),
        questions: [
          'Você já desistiu de pedir algo a Deus por sentir que "não era da sua vez" ou não tinha o direito de pedir?',
          'A mulher respondeu com humildade, não com ofensa, à dificuldade inicial. Como você reage quando a resposta de Deus parece demorar ou ser difícil?',
          'Por quem você precisa clamar hoje com essa mesma persistência corajosa?',
        ],
      },
    },
    {
      prayer: {
        title: 'Não Fostes Vós que Me Enviastes',
        text: t(`Senhor, quando José finalmente se revelou aos irmãos
          que o venderam como escravo, não os tratou com vingança, mas
          com uma interpretação transformadora: "Não fostes vós que me
          enviastes para cá, senão Deus." Ele não negou o mal que
          sofreu, mas recusou-se a deixar que esse mal tivesse a
          última palavra sobre sua história. Ajuda-me a olhar para as
          traições e injustiças que sofri com a mesma liberdade — não
          minimizando a dor, mas recusando deixá-la definir o
          significado final da minha vida. Amém.`),
      },
      meditation: {
        prompt: t(`José reconhece a ação humana ("vendestes-me") e a
          soberania de Deus ("Deus me enviou") ao mesmo tempo, sem que
          uma anule a outra — as duas verdades coexistem na mesma
          frase.`),
        questions: [
          'Existe alguma história dolorosa da sua vida que você ainda não conseguiu reinterpretar sob uma luz maior, como José fez?',
          'O que diferencia negar o mal sofrido de recusar que ele tenha a última palavra?',
          'Quem, na sua vida, precisaria ouvir de você uma palavra de perdão semelhante à de José aos irmãos?',
        ],
      },
    },
    {
      prayer: {
        title: 'Que Bom É os Irmãos Viverem em União',
        text: t(`Senhor, o salmo celebra: "Oh, quão bom e quão suave é
          que os irmãos vivam em união!" Depois de anos de separação,
          traição e sofrimento, José e seus irmãos finalmente
          experimentaram essa união restaurada. A reconciliação nem
          sempre é rápida, mas quando acontece, é comparada ao óleo
          precioso e ao orvalho que refresca os montes. Onde há relações
          rompidas na minha vida, planta a esperança de que a união é
          possível, mesmo que o caminho até ela seja longo. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo é curto, mas denso de imagens sensoriais —
          óleo que escorre, orvalho que refresca — sugerindo que a
          união entre irmãos não é apenas ausência de conflito, mas
          algo que se sente e refresca como bênção física.`),
        questions: [
          'Existe uma relação rompida na sua vida em que você ainda não desistiu de esperar por união, mesmo que o caminho pareça longo?',
          'O que você poderia fazer, mesmo pequeno, para começar a construir essa reconciliação?',
          'Como seria, na prática, viver "em união" com alguém de quem você está afastado — o que precisaria mudar primeiro em você?',
        ],
      },
    },
    {
      prayer: {
        title: 'Irretratáveis',
        text: t(`Senhor, Paulo declara que "os dons e a vocação de Deus
          são irretratáveis" — o que tu chamas e concedes, não retiras
          por capricho ou por causa das falhas humanas. Isso me dá
          esperança sobre o meu próprio chamado: mesmo quando falho,
          mesmo quando duvido de mim mesmo, o que tu colocaste em mim
          não foi um empréstimo condicional. Ajuda-me a viver com a
          segurança de quem confia na permanência do teu chamado, não
          na minha performance constante. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo escreve isso no contexto da fidelidade de Deus
          a Israel apesar da desobediência — o princípio se estende:
          a fidelidade de Deus ao seu chamado não depende da nossa
          consistência.`),
        questions: [
          'Existe algum dom ou chamado seu que você acha que "perdeu o direito" de exercer por causa de falhas passadas?',
          'O que mudaria se você confiasse que o chamado de Deus sobre você é irretratável, independente do seu desempenho recente?',
          'Como você distingue entre humildade genuína e a mentira de que você não é mais "digno" do que Deus já lhe deu?',
        ],
      },
    },
    {
      prayer: {
        title: 'Persistir Diante do Silêncio',
        text: t(`Senhor Jesus, a mulher cananeia clamou e, no primeiro
          momento, "ele não lhe respondeu palavra." O silêncio deve ter
          sido doloroso — não uma negação clara, mas ausência de
          resposta. Ainda assim ela continuou. Há orações minhas que
          parecem receber esse mesmo silêncio, e a tentação é desistir,
          interpretando a demora como recusa definitiva. Ensina-me a
          continuar clamando através do silêncio, sem confundir espera
          com abandono. Amém.`),
      },
      meditation: {
        prompt: t(`O silêncio inicial de Jesus é um dos momentos mais
          desconfortáveis dos Evangelhos — o texto não explica por que
          ele demorou a responder, apenas registra a persistência dela
          diante disso.`),
        questions: [
          'Existe uma oração sua que parece estar recebendo silêncio de Deus há algum tempo?',
          'Como você distingue, na prática, entre "Deus está em silêncio" e "Deus disse não"?',
          'O que ajudaria você a continuar clamando, como a mulher cananeia, mesmo sem resposta imediata?',
        ],
      },
    },
    {
      prayer: {
        title: 'Chegai-vos a Mim',
        text: t(`Senhor, depois de se revelar, José convidou os irmãos:
          "Chegai-vos a mim, peço-vos." Não os manteve à distância para
          testar sua sinceridade nem exigiu provas de arrependimento
          antes de reatar o vínculo — abriu-se de imediato à
          proximidade. Ensina-me essa mesma generosidade nos meus
          próprios processos de reconciliação: a disposição de encurtar
          a distância, em vez de exigir que o outro prove primeiro que
          merece minha confiança de volta. Amém.`),
      },
      meditation: {
        prompt: t(`José já havia testado os irmãos anteriormente na
          narrativa (não incluído nesta leitura) — mas no momento de se
          revelar, escolheu abertura completa, não mais suspeita.`),
        questions: [
          'Em algum relacionamento seu, você tem exigido "provas" antes de permitir proximidade de volta? O que o gesto de José sugere sobre isso?',
          'O que significaria, para você, dizer "chega-te a mim" a alguém de quem você se afastou?',
          'Como equilibrar abertura genuína com discernimento sábio nos relacionamentos que precisam de reconciliação?',
        ],
      },
    },
    {
      prayer: {
        title: 'Óleo Precioso, Fé Persistente',
        text: t(`Senhor, esta semana trouxe a persistência corajosa de
          uma mãe estrangeira, a generosidade de José reconciliado com
          quem o traiu, e a certeza de que os teus dons não são
          retirados por capricho. Se a mulher cananeia recebeu resposta
          depois do silêncio, e os irmãos de José encontraram
          restauração depois de anos de culpa, quero confiar que
          nenhuma das minhas próprias esperas ou reconciliações
          pendentes está fora do teu alcance. Amém.`),
      },
      meditation: {
        prompt: t(`Os dois relatos principais desta semana — a mulher
          cananeia e José com os irmãos — mostram reconciliação e
          resposta chegando depois de um período de silêncio ou
          distância, não instantaneamente.`),
        questions: [
          'Qual das histórias desta semana — a persistência da mulher ou a generosidade de José — mais espelha algo que você está vivendo agora?',
          'O que você aprendeu nesta semana sobre esperar por resposta ou reconciliação sem desistir?',
          'Que passo concreto você pode dar, na semana que vem, em direção a uma união ainda pendente na sua vida?',
        ],
      },
    },
  ],

  // Próprio 16 — Êxodo 1:8-2:10 · Salmo 124 · Romanos 12:1-8 · Mateus 16:13-20
  16: [
    {
      prayer: {
        title: 'Tu És o Cristo',
        text: t(`Senhor Jesus, perguntaste aos discípulos: "Vós, quem
          dizeis que eu sou?" e Pedro respondeu com a confissão que
          sustenta a igreja até hoje: "Tu és o Cristo, o Filho do Deus
          vivo." Essa pergunta continua sendo feita a mim, pessoalmente
          — não basta repetir o que outros dizem sobre ti; preciso de
          uma resposta própria, nascida de encontro real. Que a minha
          confissão de fé não seja herdada por hábito, mas confirmada
          pela minha própria experiência contigo. Amém.`),
      },
      meditation: {
        prompt: t(`Antes de perguntar a opinião pessoal dos discípulos,
          Jesus perguntou o que "os homens" diziam — contrastando
          opinião alheia com convicção própria, que é o que ele
          realmente busca.`),
        questions: [
          'Se Jesus te perguntasse hoje "quem tu dizes que eu sou", sua resposta viria de convicção própria ou de repetição do que ouviu?',
          'O que na sua própria experiência de vida confirma, pessoalmente, a confissão de que Jesus é o Cristo?',
          'Como você tem construído — através de oração, leitura, experiência — uma fé que é sua, não apenas herdada?',
        ],
      },
    },
    {
      prayer: {
        title: 'Temiam a Deus',
        text: t(`Senhor, quando um novo rei ordenou às parteiras
          hebreias que matassem os meninos recém-nascidos, Sifrá e Puá
          desobedeceram, "porque temiam a Deus" mais do que temiam o
          poder de Faraó. Um ato pequeno de desobediência corajosa, feito
          por duas mulheres sem poder político, preservou vidas e
          abriu caminho para a libertação de todo um povo. Dá-me a
          mesma coragem para desobedecer ao que é errado, mesmo quando
          vem revestido de autoridade, confiando mais em ti do que em
          qualquer pressão humana. Amém.`),
      },
      meditation: {
        prompt: t(`A Escritura registra os nomes dessas parteiras —
          Sifrá e Puá — enquanto o rei do Egito permanece sem nome no
          texto. Quem resiste com integridade é lembrado; o poder
          injusto, esquecido.`),
        questions: [
          'Você já precisou escolher entre obedecer a uma autoridade e temer a Deus? Como decidiu?',
          'Que "ordem errada" você enfrenta hoje — no trabalho, na cultura, na família — que exige coragem semelhante à das parteiras?',
          'O que ajuda você a agir com integridade mesmo quando parece que ninguém está vendo ou dará crédito?',
        ],
      },
    },
    {
      prayer: {
        title: 'Uma Cesta no Rio',
        text: t(`Deus que preservas a vida mesmo em meio à violência
          estrutural, a mãe de Moisés não pôde escondê-lo para sempre —
          então o colocou numa cesta de junco e o confiou ao rio, o
          mesmo rio onde os meninos hebreus eram mortos por ordem do
          Faraó. Ela transformou o instrumento de morte em caminho de
          vida, através de fé e engenho. Ensina-me a confiar em ti
          mesmo quando as circunstâncias parecem apontar apenas para
          perda — tu podes fazer o mesmo rio que ameaça se tornar o
          caminho de resgate. Amém.`),
      },
      meditation: {
        prompt: t(`A mãe de Moisés não podia controlar o desfecho depois
          de colocar a cesta na água — sua fé foi agir com o que estava
          ao seu alcance e confiar o resto a Deus.`),
        questions: [
          'Existe uma situação na sua vida em que você fez tudo que podia e agora precisa, como a mãe de Moisés, confiar o resultado a Deus?',
          'Que "rio" — circunstância ameaçadora — você já viu Deus transformar em caminho de resgate?',
          'O que significaria, hoje, agir com fé e engenho dentro do seu controle, entregando o resto?',
        ],
      },
    },
    {
      prayer: {
        title: 'Sacrifício Vivo',
        text: t(`Senhor, Paulo pede que apresentemos os nossos corpos
          como "sacrifício vivo, santo e agradável" — não um sacrifício
          que morre no altar, mas uma vida inteira oferecida em
          obediência contínua. "Não vos conformeis a este mundo, mas
          transformai-vos pela renovação da vossa mente." Reconheço
          quanto absorvo, sem perceber, os valores ao meu redor.
          Renova a minha mente para que eu discirna a tua vontade —
          boa, agradável e perfeita — em vez de simplesmente seguir o
          padrão que me cerca. Amém.`),
      },
      meditation: {
        prompt: t(`"Sacrifício vivo" é quase uma contradição em termos
          — sacrifícios morrem; este vive continuamente sendo oferecido,
          dia após dia, não numa única cerimônia.`),
        questions: [
          'Em que áreas você percebe que tem se conformado ao padrão do mundo ao seu redor sem perceber?',
          'O que significa, na prática, oferecer o corpo — não apenas pensamentos ou sentimentos — como sacrifício vivo?',
          'Que hábito de renovação da mente (leitura, oração, comunidade) tem sustentado essa transformação em você?',
        ],
      },
    },
    {
      prayer: {
        title: 'Um Só Corpo, Muitos Membros',
        text: t(`Senhor, assim como o corpo tem muitos membros com
          funções diferentes, também nós, "embora muitos, somos um só
          corpo em Cristo." Tu deste a cada um dons diferentes — profecia,
          ministério, ensino, exortação, liberalidade, presidência,
          misericórdia — e nenhum é maior que o outro em valor. Livra-me
          da comparação que desvaloriza o meu próprio dom ou o de
          outros. Ajuda-me a exercer o que me foi dado com a medida de
          fé que recebi, sem inveja do que não recebi. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo não hierarquiza os dons listados — profecia e
          liberalidade aparecem lado a lado, sem indicação de que um
          vale mais que o outro para o funcionamento do corpo.`),
        questions: [
          'Você já se sentiu inferior por seu dom parecer menos "espetacular" do que o de outra pessoa?',
          'Qual dos dons listados por Paulo você reconhece mais em si mesmo, e como o tem exercido?',
          'Como você pode valorizar, esta semana, o dom de alguém próximo que talvez seja subestimado por parecer discreto?',
        ],
      },
    },
    {
      prayer: {
        title: 'Se Não Fora o Senhor',
        text: t(`Senhor, o salmo declara: "Se não fora o Senhor, que
          esteve ao nosso lado... as águas nos teriam submergido." É um
          salmo de retrospecto — só se percebe plenamente o livramento
          depois de atravessá-lo. Olhando para trás na minha própria
          vida, reconheço momentos em que, se não fosses tu, eu teria
          sido tragado por circunstâncias que pareciam maiores do que
          eu conseguia suportar. Obrigado por teres estado ao meu lado
          nesses momentos, mesmo quando eu não percebia claramente na
          hora. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo é estruturado como testemunho comunitário —
          "ora diga Israel" — sugerindo que contar publicamente os
          livramentos de Deus fortalece a fé de toda a comunidade, não
          apenas a de quem foi salvo.`),
        questions: [
          'Existe um "se não fora o Senhor" na sua própria história que você raramente conta a outras pessoas?',
          'Como contar esse testemunho poderia fortalecer a fé de alguém que está passando por algo parecido agora?',
          'O que ajuda você a lembrar, no meio de uma dificuldade atual, dos livramentos passados?',
        ],
      },
    },
    {
      prayer: {
        title: 'Edificarei a Minha Igreja',
        text: t(`Senhor, esta semana caminhou da coragem discreta de
          duas parteiras à confissão pública de Pedro, do sacrifício
          vivo ao corpo com muitos membros. Tu disseste: "Sobre esta
          pedra edificarei a minha igreja, e as portas do hades não
          prevalecerão contra ela." Assim como preservaste Moisés numa
          cesta e um povo através de mulheres corajosas, continuas
          construindo algo maior através de gente comum, dons diversos e
          fidelidade discreta. Que eu seja, esta semana que começa,
          parte viva dessa construção. Amém.`),
      },
      meditation: {
        prompt: t(`Do Egito antigo à confissão de Pedro, o padrão da
          semana revela que Deus constrói seus propósitos através de
          gente comum agindo com coragem e fidelidade nos detalhes
          pequenos do cotidiano.`),
        questions: [
          'Qual dos episódios desta semana — as parteiras, Moisés na cesta, o sacrifício vivo, ou a confissão de Pedro — mais te desafiou pessoalmente?',
          'Como você quer viver, na prática, como "membro" ativo do corpo de Cristo na semana que começa?',
          'Que ato pequeno de fidelidade ou coragem você pode oferecer hoje, confiando que Deus constrói algo maior através dele?',
        ],
      },
    },
  ],

  // Próprio 17 — Êxodo 3:1-15 · Salmo 105:1-6, 23-26, 45b · Romanos 12:9-21 · Mateus 16:21-28
  17: [
    {
      prayer: {
        title: 'Negue-se a Si Mesmo',
        text: t(`Senhor Jesus, quando anunciaste que precisarias sofrer,
          morrer e ressuscitar, Pedro te repreendeu — e tu respondeste
          com dureza: "Para trás de mim, Satanás." Logo depois
          ensinaste: "Se alguém quer vir após mim, negue-se a si mesmo,
          tome a sua cruz, e siga-me." A tentação de evitar sofrimento,
          de buscar um caminho mais fácil, não vem só de fora — às
          vezes vem disfarçada de cuidado, como veio de Pedro. Ajuda-me
          a discernir quando estou, com boas intenções, te afastando do
          caminho da cruz. Amém.`),
      },
      meditation: {
        prompt: t(`A repreensão mais dura de Jesus a um discípulo neste
          Evangelho vem logo depois da maior confissão de fé de Pedro
          (semana 12) — mostrando que confessar corretamente quem Jesus
          é não garante compreender corretamente o que ele veio fazer.`),
        questions: [
          'Você já tentou, com boa intenção, desviar alguém (ou a si mesmo) do caminho difícil que Deus estava pedindo?',
          '"Que aproveita ao homem se ganhar o mundo inteiro e perder a sua vida?" — o que você tem trocado pelo "mundo" que talvez custe mais do que vale?',
          'O que significaria, de forma concreta esta semana, "negar-se a si mesmo" numa decisão específica?',
        ],
      },
    },
    {
      prayer: {
        title: 'Tira os Sapatos dos Pés',
        text: t(`Senhor, Moisés viu uma sarça que ardia sem se consumir,
          e quando se aproximou por curiosidade, ouviu: "Tira os
          sapatos dos pés; porque o lugar em que tu estás é terra
          santa." O encontro começou com um gesto simples de reverência
          antes de qualquer missão ser revelada. Tantas vezes corro
          direto para o "o que fazer" sem parar primeiro diante da tua
          santidade. Ensina-me a tirar os sapatos — a desacelerar, a
          reverenciar — antes de pedir direção ou missão. Amém.`),
      },
      meditation: {
        prompt: t(`Moisés precisou primeiro se virar para "ver" a sarça
          antes de Deus falar com ele — a atenção contemplativa
          precedeu a revelação da missão.`),
        questions: [
          'Você costuma correr para "resolver" ou "fazer" antes de parar diante de Deus com reverência?',
          'Que "sarça ardente" — sinal comum tornado extraordinário — você pode estar passando sem perceber por pressa?',
          'O que significaria, na sua rotina de oração, "tirar os sapatos" antes de pedir algo a Deus?',
        ],
      },
    },
    {
      prayer: {
        title: 'Eis-Me Aqui',
        text: t(`Deus que te revelas como "EU SOU O QUE SOU", chamaste
          Moisés para libertar um povo inteiro, e a primeira reação dele
          foi insegurança: "Quem sou eu, para que vá a Faraó?" Tu não
          negaste a pequenez dele; apenas prometeste: "Certamente eu
          serei contigo." A missão nunca dependeu da suficiência de
          Moisés, mas da tua presença com ele. Quando eu disser "quem
          sou eu" diante de um chamado que parece grande demais,
          lembra-me que a pergunta certa não é sobre minha capacidade,
          mas sobre a tua companhia. Amém.`),
      },
      meditation: {
        prompt: t(`Deus nunca responde diretamente à objeção "quem sou
          eu" — ele simplesmente promete presença, como se essa fosse a
          única credencial necessária.`),
        questions: [
          'Qual chamado ou responsabilidade você tem evitado dizendo, como Moisés, "quem sou eu para isso"?',
          'O que mudaria se a sua pergunta central deixasse de ser "sou capaz?" e passasse a ser "ele estará comigo?"',
          'Como o nome de Deus — "EU SOU" — muda a forma como você encara suas próprias limitações?',
        ],
      },
    },
    {
      prayer: {
        title: 'Enviou Moisés, Seu Servo',
        text: t(`Senhor, o salmo celebra em retrospecto o que Moisés
          viveu com tanta insegurança no momento: "Enviou Moisés, seu
          servo, e Arão, a quem escolhera." O que parecia incerto na
          hora do chamado tornou-se, com o tempo, motivo de louvor
          para gerações. Ajuda-me a confiar que os chamados que hoje
          me parecem confusos ou assustadores podem, um dia, ser
          contados como parte da tua fidelidade — não apesar da minha
          insegurança inicial, mas através dela. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo transforma um momento de crise e dúvida (o
          chamado relutante de Moisés) em motivo de celebração —
          o tempo revela o que a ansiedade do momento não permitia ver.`),
        questions: [
          'Existe algum chamado passado, hoje motivo de gratidão, que na época parecia assustador ou incerto?',
          'Como isso muda a forma como você encara uma incerteza atual?',
          'O que você gostaria de poder, no futuro, "cantar" sobre a fidelidade de Deus na situação que vive agora?',
        ],
      },
    },
    {
      prayer: {
        title: 'O Amor Seja Não Fingido',
        text: t(`Senhor, Paulo pede: "O amor seja não fingido... alegrai-vos
          com os que se alegram; chorai com os que choram." São
          instruções concretas, não sentimentos vagos: hospitalidade,
          perseverança na oração, cuidado com os que sofrem. Examina a
          qualidade do meu amor — se é genuíno ou apenas performático,
          se acompanha as pessoas na alegria e na dor de verdade ou
          apenas de longe. Forma em mim um amor que se manifesta em
          ações concretas, como as que Paulo descreve. Amém.`),
      },
      meditation: {
        prompt: t(`A lista de Paulo alterna virtudes internas
          (amor não fingido, alegria na esperança) com ações externas
          (hospitalidade, choro com quem chora) — sugerindo que o amor
          genuíno sempre se traduz em prática visível.`),
        questions: [
          'Das instruções de Paulo nesta passagem, qual você pratica com mais naturalidade, e qual exige mais esforço de você?',
          '"Chorar com os que choram" é, às vezes, mais difícil que "alegrar-se com os que se alegram". Por quê, na sua experiência?',
          'Quem, esta semana, precisa que você pratique hospitalidade ou perseverança na oração por eles?',
        ],
      },
    },
    {
      prayer: {
        title: 'Vence o Mal com o Bem',
        text: t(`Senhor, Paulo instrui: "A ninguém torneis mal por mal...
          não vos vingueis a vós mesmos, mas dai lugar à ira de Deus."
          E conclui: "Não te deixes vencer do mal, mas vence o mal com
          o bem." É contraintuitivo — o instinto normal é retribuir na
          mesma moeda. Ajuda-me, diante de quem me ofende ou me trata
          injustamente, a resistir ao impulso de retaliar e escolher,
          em vez disso, o bem — não por fraqueza, mas por confiança de
          que a vingança te pertence, não a mim. Amém.`),
      },
      meditation: {
        prompt: t(`"Dar lugar à ira de Deus" não é passividade — é
          confiar a justiça a quem realmente pode julgar com perfeição,
          liberando quem foi ofendido do peso de ser também juiz e
          executor.`),
        questions: [
          'Existe alguém contra quem você guarda o desejo de retaliação, ainda que discreta?',
          'O que significaria, na prática, "dar lugar à ira de Deus" nessa situação específica, em vez de resolver por conta própria?',
          'Como "vencer o mal com o bem" poderia mudar concretamente uma relação difícil que você vive agora?',
        ],
      },
    },
    {
      prayer: {
        title: 'Terra Santa, Cruz, Bem',
        text: t(`Senhor, esta semana começou com sapatos tirados diante
          de uma sarça ardente e terminou com o convite a vencer o mal
          com o bem. No meio, a insegurança de Moisés transformada em
          motivo de louvor, e o chamado a negar-se a si mesmo para
          seguir a ti. O fio que une tudo: tu chamas gente insegura para
          missões grandes, e prometes apenas — mas suficientemente —
          a tua presença. Que eu leve essa certeza para a semana que
          começa. Amém.`),
      },
      meditation: {
        prompt: t(`Do "quem sou eu" de Moisés ao "negue-se a si mesmo"
          de Jesus, o tema comum da semana é a renúncia ao controle —
          seja da própria insuficiência, seja da própria vida — em
          favor da confiança em Deus.`),
        questions: [
          'Qual dos textos desta semana mais confrontou sua tendência a querer controlar ou evitar o desconforto — a sarça, o chamado de Moisés, ou a cruz de Jesus?',
          'Onde você precisa, nesta semana que começa, "vencer o mal com o bem" de forma concreta?',
          'Como você quer carregar a promessa "certamente eu serei contigo" para o próximo desafio que enfrentar?',
        ],
      },
    },
  ],

  // Próprio 18 — Êxodo 12:1-14 · Salmo 149 · Romanos 13:8-14 · Mateus 18:15-20
  18: [
    {
      prayer: {
        title: 'Dois ou Três Reunidos',
        text: t(`Senhor Jesus, prometeste: "Onde se acham dois ou três
          reunidos em meu nome, aí estou eu no meio deles." A tua
          presença não exige multidões nem estruturas grandiosas —
          basta comunhão genuína em teu nome. Isso muda a forma como
          vejo os pequenos encontros da minha semana: uma conversa
          sincera, uma oração compartilhada, um momento simples de
          comunhão. Ajuda-me a valorizar esses espaços pequenos como
          lugares reais da tua presença, não apenas como preparação
          para algo "maior". Amém.`),
      },
      meditation: {
        prompt: t(`Esta promessa aparece logo após instruções sobre
          resolver conflitos entre irmãos — sugerindo que a presença de
          Cristo se manifesta tanto na reconciliação difícil quanto na
          comunhão fácil.`),
        questions: [
          'Você tende a valorizar mais os grandes encontros religiosos do que os pequenos momentos de comunhão genuína? Por quê?',
          'Existe um conflito não resolvido em que aplicar o processo que Jesus ensina (conversa direta, depois testemunhas, depois comunidade) poderia ajudar?',
          'Como você pode buscar, esta semana, um momento simples de "dois ou três reunidos" em nome de Cristo?',
        ],
      },
    },
    {
      prayer: {
        title: 'O Sangue Vos Será por Sinal',
        text: t(`Senhor, na instituição da Páscoa, ordenaste que o
          sangue do cordeiro fosse posto nos umbrais das portas — não
          como ritual vazio, mas como sinal que separava a vida da
          morte naquela noite. "Vendo eu o sangue, passarei." Reconheço
          que também dependo de um sinal de sangue — não mais de um
          cordeiro pascal, mas do próprio Cristo, o Cordeiro que se
          entregou por mim. Que eu nunca trate essa proteção como
          garantida ou automática, mas sempre como dom que exige
          gratidão e resposta. Amém.`),
      },
      meditation: {
        prompt: t(`O cordeiro precisava ser "sem defeito" e sua morte
          precisava ser marcada visivelmente — a salvação naquela noite
          não era genérica, mas específica a cada casa que obedecesse à
          instrução.`),
        questions: [
          'Você vive consciente de que a sua salvação teve um custo real — o sangue de Cristo — ou já se acostumou a ela como algo automático?',
          'O que significa, para você, marcar visivelmente sua vida como pertencente a Cristo, como o sangue marcava os umbrais?',
          'Como essa Páscoa antiga ilumina o significado da comunhão ou ceia que você participa hoje?',
        ],
      },
    },
    {
      prayer: {
        title: 'Comereis Apressadamente',
        text: t(`Senhor, a primeira Páscoa foi comida "apressadamente"
          — lombos cingidos, sapatos nos pés, cajado na mão, prontos
          para partir a qualquer momento. Não era refeição de
          conforto e demora, mas de prontidão para obedecer ao teu
          chamado de libertação. Examina a minha própria disposição:
          estou instalado demais, confortável demais, para responder
          rapidamente quando tu chamas? Ensina-me a viver com os
          lombos cingidos — pronto para agir, não acomodado na
          rotina. Amém.`),
      },
      meditation: {
        prompt: t(`A postura de prontidão exigida na primeira Páscoa
          — comer de pé, vestido para viagem — contrasta com a
          tendência humana de se instalar e resistir à mudança, mesmo
          quando ela é libertação.`),
        questions: [
          'Existe alguma área da sua vida em que você está "instalado demais" para responder rapidamente a um chamado de Deus?',
          'O que significaria, na prática, viver com "os lombos cingidos" espiritualmente — pronto para agir quando chamado?',
          'Que mudança você tem adiado por conforto, mesmo sabendo que pode ser um chamado de Deus?',
        ],
      },
    },
    {
      prayer: {
        title: 'Cantai ao Senhor um Cântico Novo',
        text: t(`Senhor, o salmo convida: "Cantai ao Senhor um cântico
          novo... Louvem-lhe o nome com danças." O louvor aqui não é
          contido nem formal — é corporal, alegre, expressivo. "O
          Senhor se agrada do seu povo." Tantas vezes reduzo minha
          adoração a hábito silencioso e controlado. Liberta-me para
          louvar com todo o corpo e toda a alegria genuína, sem medo
          de exagerar na expressão da minha gratidão por quem tu és.
          Amém.`),
      },
      meditation: {
        prompt: t(`O salmo associa louvor a dança, adufe e harpa — uma
          adoração plenamente física e comunitária, distante de
          qualquer ideia de fé apenas interior e contida.`),
        questions: [
          'A sua adoração tende a ser mais contida ou mais expressiva? O que influenciou esse padrão?',
          'O que significaria, para você, louvar a Deus com "cântico novo" — não repetindo apenas os mesmos hábitos, mas com genuína novidade e alegria?',
          'Existe alguma forma de expressão de adoração que você evita por vergonha, mas que poderia experimentar?',
        ],
      },
    },
    {
      prayer: {
        title: 'O Amor É o Cumprimento da Lei',
        text: t(`Senhor, Paulo resume toda a lei numa só palavra:
          "Amarás ao teu próximo como a ti mesmo... o amor é o
          cumprimento da lei." Não é substituição do mandamento por
          sentimento vago, mas cumprimento profundo — quem ama de
          verdade já não mata, não furta, não cobiça. Ajuda-me a não
          ver a ética cristã como lista de regras a cumprir, mas como
          fruto natural de um amor genuíno pelo próximo. Que o amor
          preceda a obediência, não o contrário. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo não elimina os mandamentos específicos —
          ele mostra que todos eles já estavam contidos, desde o
          início, num único princípio: amar o próximo.`),
        questions: [
          'Você tende a viver a ética cristã mais como lista de regras a seguir ou como expressão natural de amor?',
          'Existe algum mandamento específico que faria mais sentido para você se compreendido como expressão de amor, e não como restrição arbitrária?',
          'Quem é o "próximo" que você mais precisa amar concretamente esta semana?',
        ],
      },
    },
    {
      prayer: {
        title: 'Vesti-vos do Senhor Jesus Cristo',
        text: t(`Senhor, Paulo escreve: "A noite é passada, e o dia é
          chegado; dispamo-nos das obras das trevas, e vistamo-nos das
          armas da luz... revesti-vos do Senhor Jesus Cristo." A imagem
          é de troca de roupa — despir hábitos antigos, vestir uma nova
          identidade. Reconheço padrões antigos que ainda visto por
          hábito, mesmo sabendo que já não me servem. Ajuda-me, hoje,
          a trocar de roupa espiritualmente — despindo o que pertence à
          noite, vestindo-me de ti. Amém.`),
      },
      meditation: {
        prompt: t(`"Vestir-se de Cristo" era linguagem batismal na
          igreja primitiva — uma troca de identidade completa, não
          apenas melhoria de comportamento superficial.`),
        questions: [
          'Que "roupa antiga" — hábito ou padrão de pensamento — você continua vestindo por costume, mesmo sabendo que já não combina com quem você é em Cristo?',
          'O que significaria, na prática hoje, "vestir-se do Senhor Jesus Cristo" numa situação específica que você vai enfrentar?',
          'Paulo fala de urgência — "o dia é chegado". Isso muda a sua disposição para essa troca, ou você prefere adiar?',
        ],
      },
    },
    {
      prayer: {
        title: 'Prontos, Vestidos de Cristo',
        text: t(`Senhor, esta semana trouxe o sangue do cordeiro como
          sinal de proteção, a prontidão de quem come apressadamente
          antes da libertação, o louvor com dança, e o amor como
          cumprimento de toda a lei. Termino pedindo: que eu viva esta
          próxima semana com os lombos cingidos, vestido de ti, pronto
          para responder ao teu chamado — e que, onde dois ou três se
          reunirem em teu nome, eu esteja lá, confiante da tua
          presença. Amém.`),
      },
      meditation: {
        prompt: t(`Do cordeiro pascal ao chamado a "vestir-se de
          Cristo", a semana conectou dois tipos de prontidão: a
          prontidão física de sair do Egito e a prontidão espiritual de
          viver o dia que já chegou.`),
        questions: [
          'Qual imagem desta semana — o sangue nos umbrais, a refeição apressada, ou vestir-se de Cristo — mais representa onde você está espiritualmente agora?',
          'O que você precisa "despir" antes de entrar na semana que vem?',
          'Como você quer que a presença de Cristo — "onde dois ou três se reúnem" — marque seus próximos dias?',
        ],
      },
    },
  ],

  // Próprio 19 — Êxodo 14:19-31 · Salmo 114 · Romanos 14:1-12 · Mateus 18:21-35
  19: [
    {
      prayer: {
        title: 'Até Setenta Vezes Sete',
        text: t(`Senhor Jesus, Pedro perguntou até quantas vezes deveria
          perdoar — sugerindo sete, um número já generoso — e ouviu:
          "até setenta vezes sete." Não é aritmética a ser calculada,
          mas indicação de que o perdão cristão não tem teto. A
          parábola que se segue mostra um servo perdoado de uma dívida
          impagável que se recusa a perdoar uma dívida pequena a outro.
          Examina em mim essa mesma inconsistência: recebo de ti
          perdão imenso e, às vezes, sou avaro em perdoar ofensas bem
          menores. Amém.`),
      },
      meditation: {
        prompt: t(`A desproporção na parábola é intencional: dez mil
          talentos era uma soma impagável para um servo comum, enquanto
          cem denários era uma dívida modesta — a comparação expõe a
          incoerência de quem recebe muito e perdoa pouco.`),
        questions: [
          'Existe alguém a quem você tem dificuldade de perdoar por uma ofensa que, comparada ao que Deus já te perdoou, é relativamente pequena?',
          'Você tende a contar quantas vezes já perdoou alguém, como se houvesse um limite justo?',
          'O que ajudaria você a lembrar, no momento de decidir perdoar, do tamanho da dívida que você mesmo já teve perdoada?',
        ],
      },
    },
    {
      prayer: {
        title: 'Entre os Dois Campos',
        text: t(`Senhor, na noite antes da travessia do Mar Vermelho, a
          coluna de nuvem se colocou entre o exército egípcio e o povo
          de Israel — trevas para um lado, luz para o outro, protegendo
          sem que ninguém precisasse lutar ainda. Há momentos em que eu
          quero agir, resolver, atacar o problema imediatamente, quando
          na verdade tu já estás me protegendo em silêncio, esperando o
          tempo certo. Ensina-me a reconhecer quando devo esperar,
          confiando na tua proteção invisível antes de agir. Amém.`),
      },
      meditation: {
        prompt: t(`A nuvem não eliminou o perigo — os egípcios ainda
          estavam ali, perseguindo — mas criou espaço e tempo de
          proteção antes da libertação final se completar.`),
        questions: [
          'Existe uma situação de perigo ou ameaça em sua vida em que você pode estar sendo protegido de forma que ainda não percebe claramente?',
          'Você tende a agir por impaciência quando, na verdade, o momento pede espera confiante?',
          'Como você reconheceria, hoje, uma "coluna de nuvem" — proteção discreta de Deus — na sua própria situação?',
        ],
      },
    },
    {
      prayer: {
        title: 'Terra Seca no Meio do Mar',
        text: t(`Deus que abres caminho onde parecia impossível, o mar
          se dividiu, e o povo atravessou em terra seca — depois as
          águas voltaram e a ameaça que os perseguia foi encerrada de
          vez. Não foi alívio parcial; foi libertação completa e
          definitiva. Quando enfrento obstáculos que parecem tão
          intransponíveis quanto um mar, ajuda-me a lembrar que tu já
          abriste caminhos impossíveis antes, e que a libertação que
          ofereces não é meio-termo, mas plena. Amém.`),
      },
      meditation: {
        prompt: t(`O relato enfatiza que "não ficou nem sequer um
          deles" — a ameaça egípcia não foi apenas afastada, mas
          eliminada; a libertação bíblica costuma ser descrita como
          definitiva, não parcial.`),
        questions: [
          'Que "mar" você enfrenta hoje que parece intransponível pelas suas próprias forças?',
          'Você já viveu, no passado, uma libertação de Deus que foi completa, não apenas parcial? Como isso fortalece sua fé agora?',
          'O que mudaria se você esperasse de Deus libertação definitiva, e não apenas alívio temporário, na dificuldade atual?',
        ],
      },
    },
    {
      prayer: {
        title: 'Os Montes Saltaram',
        text: t(`Senhor, o salmo descreve a criação inteira reagindo à
          tua presença: "o mar viu isto, e fugiu... os montes saltaram
          como carneiros." A imagem poética capta algo real: quando tu
          te manifestas, até o que parece mais fixo e imutável — montanhas,
          mares — responde. "Treme, ó terra, na presença do Senhor."
          Que eu não trate a tua presença como rotina previsível, mas
          como algo diante do qual até a criação reage com espanto e
          reverência. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo usa personificação exagerada — mares que
          fogem, montanhas que saltam — para comunicar algo que a
          linguagem literal não consegue: o tamanho real da presença de
          Deus.`),
        questions: [
          'Sua reverência diante de Deus tem diminuído com a familiaridade da rotina espiritual?',
          'O que ajudaria você a recuperar o assombro genuíno diante da presença de Deus, como a imagem poética do salmo sugere?',
          'Que "monte" da sua vida — algo que parecia imóvel e permanente — você já viu Deus mover?',
        ],
      },
    },
    {
      prayer: {
        title: 'Cada Um Dará Conta de Si',
        text: t(`Senhor, Paulo pede que não julguemos o servo alheio em
          questões de consciência: "Para seu próprio senhor ele está em
          pé ou cai... cada um esteja inteiramente convicto em sua
          própria mente." É fácil gastar energia julgando as escolhas
          espirituais de outros em áreas que não são centrais à fé,
          esquecendo que "todos havemos de comparecer ante o tribunal
          de Deus" — cada um prestando conta da própria vida, não da
          alheia. Livra-me do hábito de julgar o que não me compete.
          Amém.`),
      },
      meditation: {
        prompt: t(`Paulo trata aqui de disputas sobre alimentação e
          dias sagrados — questões secundárias sobre as quais cristãos
          sinceros discordavam — insistindo que a unidade não exige
          uniformidade em tudo.`),
        questions: [
          'Existe alguma área de consciência (não de moral clara, mas de convicção pessoal) em que você tem julgado outros cristãos por pensarem diferente?',
          'Você vive mais preocupado em prestar conta da sua própria vida a Deus, ou em avaliar a vida alheia?',
          'O que ajudaria você a distinguir entre questões centrais da fé, onde o discernimento é necessário, e questões secundárias, onde cabe liberdade?',
        ],
      },
    },
    {
      prayer: {
        title: 'Movido de Compaixão',
        text: t(`Senhor, na parábola, o senhor perdoou a dívida do
          servo porque foi "movido de compaixão" — não por cálculo,
          nem por obrigação, mas por um sentimento genuíno diante da
          súplica dele. É assim que tu me perdoas: não porque eu
          mereço ou porque calculaste que valia a pena, mas por
          compaixão real. Ajuda-me a deixar que essa compaixão que
          recebi transborde para as pessoas que me devem — literal ou
          figuradamente — algo que eu poderia exigir, mas escolho
          perdoar. Amém.`),
      },
      meditation: {
        prompt: t(`A compaixão do senhor na parábola precede qualquer
          garantia de que o servo mudaria de comportamento — ele
          perdoou antes de saber se a graça seria bem usada.`),
        questions: [
          'Você já experimentou perdão genuíno, movido por compaixão, e não por mérito seu? Como isso mudou você?',
          'Existe alguém a quem você poderia perdoar hoje, não porque essa pessoa "merece", mas porque a compaixão pede isso de você?',
          'O que impede você, na prática, de deixar a compaixão recebida transbordar para outra pessoa?',
        ],
      },
    },
    {
      prayer: {
        title: 'Terra Seca, Perdão Sem Limite',
        text: t(`Senhor, esta semana atravessou um mar dividido em
          terra seca e chegou a um perdão sem limite numérico. No meio,
          o convite a não julgar o servo alheio e a lembrança de que
          toda libertação real, como a do Egito, é completa, não
          parcial. Termino pedindo: que a mesma compaixão que abriu um
          caminho impossível no mar seja a compaixão que me leva a
          perdoar sem calcular limites. Amém.`),
      },
      meditation: {
        prompt: t(`A travessia do mar e o perdão "setenta vezes sete"
          compartilham uma mesma lógica: Deus não faz as coisas pela
          metade — nem a libertação, nem a graça, têm limite calculado.`),
        questions: [
          'Qual dos temas desta semana — a travessia impossível, o perdão sem limite, ou não julgar o próximo — mais desafiou você pessoalmente?',
          'Existe algum "mar" ou alguma dívida de perdão que você está pedindo a Deus para atravessar ou resolver definitivamente?',
          'Como você quer entrar na próxima semana carregando a certeza de que a graça de Deus não é calculada, mas plena?',
        ],
      },
    },
  ],

  // Próprio 21 — Êxodo 17:1-7 · Salmo 78:1-4, 12-16 · Filipenses 2:1-13 · Mateus 21:23-32
  21: [
    {
      prayer: {
        title: 'Tende o Mesmo Sentimento de Cristo',
        text: t(`Senhor Jesus, Paulo pede que tenhamos "aquele
          sentimento que houve também em Cristo Jesus" — que, sendo
          igual a Deus, "esvaziou-se a si mesmo, tomando a forma de
          servo... humilhou-se a si mesmo, tornando-se obediente até a
          morte." A humildade não te diminuiu; foi seguida pela
          exaltação. Ajuda-me a soltar a necessidade de me afirmar, de
          defender status, de provar valor — confiando que a humildade,
          como a tua, não é perda, mas o próprio caminho da glória.
          Amém.`),
      },
      meditation: {
        prompt: t(`O hino de Filipenses descreve um movimento de descida
          e depois exaltação — Cristo não permaneceu esvaziado; a
          humilhação foi caminho, não destino final.`),
        questions: [
          'Onde você tem resistido a "esvaziar-se" — abrir mão de status, razão ou controle — por medo de perder algo importante?',
          'Você acredita, de verdade, que a humildade é caminho para algo maior, ou a trata como fraqueza a evitar?',
          'Que "forma de servo" concreta você pode assumir esta semana em algum relacionamento?',
        ],
      },
    },
    {
      prayer: {
        title: 'Está o Senhor no Meio de Nós?',
        text: t(`Senhor, em Refidim, sedento, o povo contendeu com
          Moisés e questionou: "Está o Senhor no meio de nós, ou não?"
          A sede real revelou uma dúvida mais profunda sobre a tua
          presença. Reconheço que as minhas próprias crises de fé
          costumam surgir assim — não de raciocínio abstrato, mas de
          necessidade concreta não atendida na hora que eu esperava.
          Quando a sede da vida me fizer questionar se estás mesmo
          comigo, lembra-me das vezes em que já respondeste. Amém.`),
      },
      meditation: {
        prompt: t(`O nome dado ao lugar — Massá e Meribá, "tentação e
          contenda" — preserva a memória da dúvida honesta do povo,
          mesmo depois que Deus proveu água da rocha.`),
        questions: [
          'Qual necessidade não atendida tem alimentado dúvidas sobre a presença de Deus na sua vida ultimamente?',
          'Você já expressou essa dúvida abertamente a Deus, como o povo fez, ou prefere reprimi-la?',
          'O que ajudaria você a lembrar da fidelidade passada de Deus no momento presente de "sede"?',
        ],
      },
    },
    {
      prayer: {
        title: 'Água da Rocha',
        text: t(`Deus provedor, mesmo diante da contenda e da dúvida do
          povo, ordenaste a Moisés que ferisse a rocha, e dela saiu
          água suficiente para toda a multidão sedenta. Não esperaste
          que a fé deles fosse perfeita para agir — respondeste à
          necessidade real, apesar da murmuração. Obrigado por não
          condicionares tua provisão à qualidade da minha fé no
          momento. Continua provendo mesmo quando minha confiança
          vacila. Amém.`),
      },
      meditation: {
        prompt: t(`Deus não repreendeu o povo antes de agir — a
          provisão veio primeiro, apesar da murmuração, revelando um
          padrão de graça que precede o merecimento.`),
        questions: [
          'Você já recebeu provisão de Deus mesmo em um momento de dúvida ou murmuração de sua parte?',
          'O que isso revela sobre o caráter de Deus, comparado com a ideia de que ele só age quando merecemos?',
          'Como você pode confiar hoje numa "rocha" — fonte inesperada de provisão — mesmo em meio à sua própria dúvida?',
        ],
      },
    },
    {
      prayer: {
        title: 'Nada Façais por Vanglória',
        text: t(`Senhor, Paulo pede: "Nada façais por contenda ou por
          vanglória, mas com humildade cada um considere os outros
          superiores a si mesmo." É difícil discernir, nas próprias
          motivações, quanto é genuíno serviço e quanto é desejo de
          reconhecimento. Examina o meu coração nas ações que pareço
          fazer por amor — quanto delas nasce realmente de humildade, e
          quanto de necessidade de ser visto e aprovado. Purifica minha
          motivação. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo não proíbe a ambição em si, mas a "vanglória"
          — o desejo de ser exaltado às custas de outros, em contraste
          com considerar os outros "superiores a si mesmo".`),
        questions: [
          'Você consegue identificar, honestamente, quando age por amor genuíno e quando age por desejo de reconhecimento?',
          'O que significaria "considerar os outros superiores a si mesmo" numa relação específica onde você costuma competir?',
          'Que ação recente sua você gostaria de examinar quanto à motivação real por trás dela?',
        ],
      },
    },
    {
      prayer: {
        title: 'Qual dos Dois Fez a Vontade do Pai?',
        text: t(`Senhor Jesus, contaste de dois filhos: um disse "sim"
          ao pai e não foi trabalhar; outro disse "não" e depois,
          arrependido, foi. Concluíste que fazer é mais importante que
          prometer — "os publicanos e as meretrizes entram adiante de
          vós no reino de Deus" por causa disso. Examina minhas
          próprias promessas religiosas: quantas ficam só na intenção
          verbal, sem se traduzir em obediência real? Prefiro o
          arrependimento que age ao consentimento vazio que não se
          move. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus dirige essa parábola a religiosos que diziam
          "sim" a Deus com palavras, mas resistiam à ação prática —
          enquanto pecadores reconhecidos, ao ouvir a verdade, mudavam
          de vida de fato.`),
        questions: [
          'Em que área da sua vida você tem dito "sim" a Deus com palavras, mas sem seguir com ação correspondente?',
          'Você já subestimou alguém por sua resistência inicial, sem perceber que essa pessoa depois se arrependeu e agiu?',
          'O que significaria, hoje, corrigir uma promessa antiga que ainda não se transformou em obediência real?',
        ],
      },
    },
    {
      prayer: {
        title: 'O Senhor Peleja por Nós',
        text: t(`Senhor, o salmo recorda que, apesar da rebelião e da
          murmuração do povo no deserto, tu "os guiou com segurança, de
          sorte que eles não temeram" — mesmo em meio à infidelidade
          humana, tua fidelidade continuou guiando. Não me deixes usar
          minhas próprias falhas como desculpa para desistir de
          caminhar contigo. Assim como guiaste um povo teimoso até a
          terra prometida, continua me guiando apesar das minhas
          próprias murmurações. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo não esconde a rebelião do povo — descreve-a
          com franqueza — mas também não deixa que ela seja a última
          palavra sobre a jornada; a fidelidade de Deus permanece o
          fio condutor da história.`),
        questions: [
          'Você já usou suas próprias falhas espirituais como motivo para desistir de tentar de novo? O que este salmo diz sobre isso?',
          'Olhando para sua própria "jornada no deserto", onde você reconhece que Deus continuou guiando apesar da sua murmuração?',
          'O que ajudaria você a confiar na fidelidade de Deus mesmo quando reconhece sua própria inconsistência?',
        ],
      },
    },
    {
      prayer: {
        title: 'Esvaziado, Sedento, Obediente',
        text: t(`Senhor, esta semana caminhou da sede do povo em
          Refidim ao esvaziamento de Cristo, da dúvida sobre a tua
          presença à obediência de um filho que primeiro disse "não" e
          depois foi trabalhar. O padrão se repete: tu respondes à
          necessidade real mesmo em meio à dúvida, e valorizas mais a
          ação obediente do que a promessa vazia. Que eu termine esta
          semana disposto a agir, não apenas a prometer. Amém.`),
      },
      meditation: {
        prompt: t(`Do "está o Senhor no meio de nós?" à humildade de
          Cristo que se esvaziou, a semana girou em torno da mesma
          pergunta: onde realmente reconheço a presença e a autoridade
          de Deus na prática, não apenas em palavras?`),
        questions: [
          'Qual dos temas desta semana — a sede no deserto, a humildade de Cristo, ou a parábola dos dois filhos — mais confrontou você?',
          'Que promessa feita a Deus você precisa transformar em ação concreta nesta semana?',
          'Como você quer carregar a humildade de Cristo — que se esvaziou e foi exaltado — para os próximos desafios?',
        ],
      },
    },
  ],

  // Próprio 22 — Êxodo 20:1-4, 7-9, 12-20 · Salmo 19 · Filipenses 3:4b-14 · Mateus 21:33-46
  22: [
    {
      prayer: {
        title: 'Prossigo para o Alvo',
        text: t(`Senhor, Paulo, com toda sua história religiosa
          impecável, escreve: "As coisas que atrás ficam... esquecendo-me
          delas... prossigo para o alvo." Ele não se apoiou nas
          conquistas passadas nem se paralisou pelos fracassos —
          manteve o olhar à frente. Tantas vezes fico preso ao que já
          passou, seja orgulho por conquistas ou vergonha por falhas.
          Ensina-me o mesmo movimento de Paulo: reconhecer o passado
          sem deixar que ele determine o presente, e seguir adiante
          com os olhos no alvo que tu puseste diante de mim. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo lista suas credenciais religiosas impressionantes
          apenas para declará-las "perda" diante do valor supremo de
          conhecer a Cristo — o contraste é deliberado e radical.`),
        questions: [
          'Você se apoia mais em conquistas passadas ou fica mais preso a fracassos passados? Como isso te impede de "prosseguir"?',
          'Que "credenciais" você já usou para justificar sua posição diante de Deus, que talvez precisem ser vistas como Paulo via as suas — como perda comparadas a conhecer a Cristo?',
          'O que significa, para você hoje, "esquecer-se das coisas que atrás ficam" e seguir para o alvo?',
        ],
      },
    },
    {
      prayer: {
        title: 'Não Terás Outros Deuses',
        text: t(`Senhor, o primeiro mandamento estabelece a base de
          todos os outros: "Não terás outros deuses diante de mim."
          Não é apenas proibição de ídolos de pedra — é convite a
          examinar tudo o que ocupa o lugar que só a ti pertence:
          trabalho, aprovação, segurança financeira, relacionamentos.
          Examina os altares que ergo sem perceber. Que nada usurpe o
          lugar que só tu deves ocupar no centro da minha vida. Amém.`),
      },
      meditation: {
        prompt: t(`Os dez mandamentos começam não com uma regra de
          comportamento, mas com uma declaração de identidade e
          relação: "Eu sou o Senhor teu Deus, que te tirei da terra do
          Egito" — a obediência flui da redenção já recebida, não a
          precede.`),
        questions: [
          'Que "deus" — não literal, mas prático — ocupa hoje um espaço central demais na sua vida?',
          'Como a lembrança de que Deus já te libertou (como libertou Israel do Egito) muda a motivação por trás de guardar seus mandamentos?',
          'O que significaria colocar Deus concretamente em primeiro lugar numa área específica esta semana?',
        ],
      },
    },
    {
      prayer: {
        title: 'Lembra-te do Sábado',
        text: t(`Senhor, entre os mandamentos está o descanso: "Seis
          dias trabalharás... mas o sétimo dia é o sábado do Senhor teu
          Deus." Não é sugestão, é mandamento — o descanso regular é
          tão sagrado quanto a proibição de matar ou furtar. Vivo numa
          cultura que trata o descanso como fraqueza ou preguiça.
          Ensina-me a honrar o ritmo que tu mesmo estabeleceste na
          criação, confiando que parar também é obediência, não apenas
          produtividade. Amém.`),
      },
      meditation: {
        prompt: t(`O mandamento do sábado inclui explicitamente
          servos, animais e estrangeiros — o descanso não é privilégio
          de poucos, mas direito estendido a toda a comunidade, mesmo
          aos que não têm poder para exigi-lo.`),
        questions: [
          'Você trata o descanso como mandamento sagrado ou como luxo que só se permite quando "sobra tempo"?',
          'Quem, ao seu redor, você poderia ajudar a descansar — alguém sob sua autoridade ou cuidado?',
          'Como seria, na prática, honrar um ritmo real de descanso na sua semana, não apenas em teoria?',
        ],
      },
    },
    {
      prayer: {
        title: 'Os Céus Proclamam a Glória de Deus',
        text: t(`Senhor, o salmo declara que "os céus proclamam a
          glória de Deus" sem palavras audíveis, e logo depois celebra
          a lei do Senhor: "perfeita... fiel... reta... pura." A
          revelação geral da criação e a revelação específica da
          Palavra caminham juntas, ambas testemunhando quem tu és.
          Ajuda-me a ouvir tua voz tanto na grandeza do céu estrelado
          quanto na disciplina de estudar tua Palavra — sem desprezar
          nenhuma das duas formas com que te revelas. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo termina pedindo purificação de "pecados de
          presunção" — depois de contemplar a grandeza cósmica e a lei
          perfeita, o salmista se volta à humildade pessoal diante
          delas.`),
        questions: [
          'Quando foi a última vez que você parou, de verdade, para contemplar a criação como testemunho da glória de Deus?',
          'A sua relação com a Palavra de Deus se parece mais com "doce como mel" (o salmo) ou com obrigação cansativa?',
          'Que "pecado de presunção" — algo que você faz sabendo ser errado, sem se preocupar — precisa ser trazido à luz hoje?',
        ],
      },
    },
    {
      prayer: {
        title: 'A Pedra Rejeitada',
        text: t(`Senhor Jesus, na parábola dos lavradores maus, que
          mataram os servos e o próprio filho do dono da vinha, citaste
          o salmo: "A pedra que os edificadores rejeitaram, essa foi
          posta como pedra angular." A rejeição que sofreste não
          impediu o teu propósito — tornou-se o próprio fundamento.
          Quando eu enfrentar rejeição por causa da fé, ou vir alguém
          sendo descartado injustamente, ajuda-me a lembrar que aquilo
          que é rejeitado pelos homens pode ser exatamente o que tu
          escolhes para fundamentar algo novo. Amém.`),
      },
      meditation: {
        prompt: t(`A parábola é dirigida diretamente aos líderes
          religiosos que ouviam Jesus — eles "entenderam que era deles
          que Jesus falava" — uma confrontação direta disfarçada de
          história.`),
        questions: [
          'Você já experimentou rejeição por causa de convicções de fé? Como esse texto ressignifica essa experiência?',
          'Existe alguém, ao seu redor, sendo tratado como "pedra rejeitada" que talvez Deus esteja usando de forma que ninguém percebe ainda?',
          'O que significa, para você, confiar que Deus pode construir algo importante a partir do que os outros descartam?',
        ],
      },
    },
    {
      prayer: {
        title: 'Refugo por Amor de Cristo',
        text: t(`Senhor, Paulo considerou "refugo" tudo o que antes
          valorizava, "para que possa ganhar a Cristo." Não é
          autodesprezo, mas reordenação radical de prioridades — nada
          se compara ao "conhecê-lo, e o poder da sua ressurreição."
          Examina minhas próprias prioridades: o que eu ainda trato
          como tesouro que, à luz de conhecer a ti, deveria ser visto
          como secundário? Reordena os meus valores segundo os teus.
          Amém.`),
      },
      meditation: {
        prompt: t(`Paulo usa uma palavra forte — traduzida como
          "refugo" ou "lixo" — para descrever conquistas genuinamente
          impressionantes, não coisas óbvias más; a reordenação de
          valores exige comparação com algo de valor supremo.`),
        questions: [
          'O que você trata hoje como "tesouro" que, comparado a conhecer profundamente a Cristo, talvez precise de reavaliação?',
          'Você já passou por uma reordenação radical de prioridades como a de Paulo? O que a motivou?',
          'O que significaria, na prática, "querer conhecer a Cristo" mais do que qualquer conquista pessoal esta semana?',
        ],
      },
    },
    {
      prayer: {
        title: 'Prosseguindo para o Alvo',
        text: t(`Senhor, esta semana começou com mandamentos que
          fundamentam a vida em comunidade e terminou com Paulo
          contando tudo como perda por amor de conhecer a ti. No meio,
          os céus proclamando tua glória e uma pedra rejeitada tornada
          fundamento. Termino pedindo a mesma disposição de Paulo:
          esquecer o que ficou para trás — conquistas e fracassos — e
          prosseguir para o alvo que tu puseste diante de mim. Amém.`),
      },
      meditation: {
        prompt: t(`Do primeiro mandamento (não terás outros deuses) à
          confissão de Paulo (tudo é perda comparado a Cristo), a
          semana inteira girou sobre a mesma questão: o que realmente
          ocupa o centro da vida.`),
        questions: [
          'O que, nesta semana, você identificou como algo que precisa deixar de ocupar o "centro" que só pertence a Deus?',
          'Qual conquista ou fracasso do seu passado você quer, como Paulo, deixar realmente para trás nesta próxima semana?',
          'Como você quer manter os olhos "no alvo" nos próximos dias, mesmo diante de distrações?',
        ],
      },
    },
  ],

  // Próprio 23 — Êxodo 32:1-14 · Salmo 106:1-6, 19-23 · Filipenses 4:1-9 · Mateus 22:1-14
  23: [
    {
      prayer: {
        title: 'Não Andeis Ansiosos',
        text: t(`Senhor, Paulo instrui: "Não andeis ansiosos por coisa
          alguma; antes em tudo sejam os vossos pedidos conhecidos
          diante de Deus pela oração... e a paz de Deus, que excede
          todo entendimento, guardará os vossos corações." A ansiedade
          é convertida em oração, não reprimida nem ignorada. Trago
          diante de ti hoje as preocupações que tenho carregado
          sozinho, pedindo não que elas desapareçam magicamente, mas
          que a tua paz — que não depende de eu entender tudo — guarde
          o meu coração enquanto elas se resolvem. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo não promete que os problemas desaparecerão —
          promete uma paz que "excede todo entendimento", guardando o
          coração mesmo quando as circunstâncias continuam incertas.`),
        questions: [
          'Que ansiedade você tem carregado sozinho, sem trazê-la explicitamente em oração?',
          'Você já experimentou uma paz que não veio da resolução do problema, mas que guardou seu coração enquanto o problema persistia?',
          'O que significaria, hoje, trocar a ansiedade por oração com ação de graças sobre uma preocupação específica?',
        ],
      },
    },
    {
      prayer: {
        title: 'Faze-nos um Deus',
        text: t(`Senhor, enquanto Moisés ainda estava no monte, o povo
          não suportou a espera e pediu a Arão: "Faze-nos um deus que
          vá adiante de nós." A impaciência os levou a substituir a
          tua presença invisível por um ídolo visível e controlável.
          Reconheço essa mesma tentação em mim — quando a tua resposta
          demora, busco substitutos que eu possa controlar e ver
          imediatamente. Ensina-me a suportar a espera sem fabricar
          deuses de conveniência. Amém.`),
      },
      meditation: {
        prompt: t(`O bezerro de ouro não substituiu a fé em Deus por
          ateísmo — o povo continuou chamando aquilo de "deus que te
          tirou do Egito" — o problema não foi deixar de crer, mas
          querer um deus controlável em vez do Deus real.`),
        questions: [
          'Que "bezerro de ouro" — substituto tangível e controlável — você já criou quando a espera por Deus pareceu longa demais?',
          'O que diferencia confiar em Deus de tentar controlar a forma como ele age?',
          'Como você pode suportar melhor os períodos de silêncio ou demora sem recorrer a substitutos?',
        ],
      },
    },
    {
      prayer: {
        title: 'Moisés Se Interpôs',
        text: t(`Senhor, diante da tua ira justa contra o povo idólatra,
          Moisés intercedeu, suplicando que te lembrasses das tuas
          próprias promessas a Abraão, Isaque e Israel — e a Escritura
          registra que "arrependeste-te do mal que dissera havia de
          fazer ao seu povo." A intercessão de um homem mudou o curso
          dos acontecimentos. Ensina-me a interceder com essa mesma
          ousadia por pessoas que talvez nem saibam que precisam de
          alguém orando por elas. Amém.`),
      },
      meditation: {
        prompt: t(`Moisés não minimiza o pecado do povo nem pede que
          Deus finja não ver — ele apela à identidade e às promessas de
          Deus como fundamento para a súplica de misericórdia.`),
        questions: [
          'Por quem você poderia interceder hoje com a mesma ousadia de Moisés, mesmo sabendo que essa pessoa errou gravemente?',
          'O que significa apelar às promessas de Deus, e não à inocência de quem você intercede, como Moisés fez?',
          'Você acredita que a intercessão realmente pode influenciar o curso dos acontecimentos? Como isso muda sua vida de oração?',
        ],
      },
    },
    {
      prayer: {
        title: 'Trocaram a Sua Glória',
        text: t(`Senhor, o salmo lamenta com honestidade: "Trocaram a
          sua glória pela figura de um boi que come erva." É uma
          imagem quase cômica de tão absurda — e ainda assim
          reconheço a mesma lógica em mim, trocando o que é eterno por
          substitutos incapazes de realmente satisfazer. Mostra-me,
          com clareza, quando estou fazendo essa mesma troca ruim —
          segurança verdadeira por controle ilusório, comunhão real
          por distração passageira. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo usa ironia deliberada — "um boi que come
          erva" — para expor o absurdo de trocar o Deus vivo por
          qualquer substituto, por mais impressionante que pareça no
          momento.`),
        questions: [
          'Que "boi que come erva" — substituto obviamente inferior, visto com clareza — você já trocou pelo que realmente importa?',
          'Por que, mesmo sabendo racionalmente que a troca é ruim, ainda somos tentados a fazê-la?',
          'O que ajudaria você a reconhecer mais rápido quando está fazendo esse tipo de troca?',
        ],
      },
    },
    {
      prayer: {
        title: 'Regozijai-vos Sempre',
        text: t(`Senhor, Paulo escreve da prisão: "Regozijai-vos sempre
          no Senhor; outra vez digo, regozijai-vos." A alegria que ele
          pede não depende das circunstâncias — ele mesmo estava preso
          quando escreveu isso. É uma alegria enraizada "no Senhor",
          não nas condições externas. Ensina-me essa mesma alegria
          persistente, não como negação da dificuldade real, mas como
          confiança que não depende de tudo estar bem para se sustentar.
          Amém.`),
      },
      meditation: {
        prompt: t(`A repetição — "outra vez digo" — sugere que Paulo
          antecipa resistência à ideia de alegria constante, e insiste
          mesmo assim, escrevendo de dentro de uma prisão real.`),
        questions: [
          'Você associa alegria genuína apenas a circunstâncias boas, ou já experimentou alegria "no Senhor" mesmo em dificuldade?',
          'O que Paulo, preso, poderia te ensinar sobre alegria que não depende do contexto externo?',
          'Como você pode praticar essa alegria hoje, mesmo que a circunstância atual não seja ideal?',
        ],
      },
    },
    {
      prayer: {
        title: 'Vestidos para as Bodas',
        text: t(`Senhor Jesus, na parábola das bodas, um convidado
          entrou sem a veste nupcial apropriada e foi expulso — o
          convite foi universal, mas a resposta esperada exigia
          transformação real, não apenas presença física. Ajuda-me a
          não confundir estar presente com estar realmente vestido para
          o teu Reino — a receber o convite gratuito, mas também a
          responder com a mudança de vida que ele pede. Amém.`),
      },
      meditation: {
        prompt: t(`A veste nupcial provavelmente era fornecida pelo
          anfitrião na cultura da época — a recusa do convidado em
          vesti-la sugere recusa da transformação oferecida, não falta
          de recursos.`),
        questions: [
          'Você tem aceitado o convite de Deus, mas resistido à transformação que ele pede como resposta?',
          'O que significaria, para você, "vestir a roupa" que Deus oferece, em vez de tentar entrar como está?',
          'Existe alguma área da sua vida onde você está "presente" na fé, mas ainda resistente à mudança real?',
        ],
      },
    },
    {
      prayer: {
        title: 'Intercessão e Alegria',
        text: t(`Senhor, esta semana trouxe a impaciência de um povo
          que fabricou deuses, a intercessão corajosa de Moisés, e o
          convite de Paulo à alegria constante e à paz que excede
          entendimento. Termino pedindo que, diante da minha própria
          tentação de fabricar substitutos convenientes, eu escolha em
          vez disso a oração persistente e a alegria que não depende
          das circunstâncias. Amém.`),
      },
      meditation: {
        prompt: t(`A intercessão de Moisés e a alegria de Paulo,
          escrita da prisão, compartilham a mesma raiz: confiança em
          Deus que não depende de circunstâncias favoráveis para se
          sustentar.`),
        questions: [
          'Qual dos temas desta semana — o bezerro de ouro, a intercessão de Moisés, ou a alegria de Paulo — mais te desafiou?',
          'Por quem você quer interceder, com ousadia, na semana que vem?',
          'Como você quer praticar "alegria no Senhor" de forma concreta nos próximos dias, independente das circunstâncias?',
        ],
      },
    },
  ],

  // Próprio 24 — Êxodo 33:12-23 · Salmo 99 · 1 Tessalonicenses 1:1-10 · Mateus 22:15-22
  24: [
    {
      prayer: {
        title: 'A César o Que É de César',
        text: t(`Senhor Jesus, diante da armadilha sobre pagar tributo
          a César, respondeste com sabedoria que expôs a hipocrisia dos
          teus questionadores: "Dai, pois, a César o que é de César, e
          a Deus o que é de Deus." A resposta não evita a pergunta;
          reordena a prioridade — há coisas que pertencem ao mundo, mas
          tudo, no fim, pertence a ti. Ajuda-me a viver com essa mesma
          clareza, cumprindo responsabilidades terrenas sem esquecer a
          quem, em última instância, tudo — inclusive eu — pertence.
          Amém.`),
      },
      meditation: {
        prompt: t(`A moeda carregava a imagem de César; os seres
          humanos carregam a imagem de Deus (Gênesis 1:27) — a resposta
          de Jesus sugere que, se a moeda pertence a quem tem sua
          imagem, nós pertencemos a quem tem a nossa.`),
        questions: [
          'Você vive mais preocupado em cumprir obrigações "de César" (trabalho, sociedade) do que em reconhecer a quem pertence, em última instância, sua vida?',
          'O que significa, para você, dar "a Deus o que é de Deus" — considerando que você foi feito à imagem dele?',
          'Existe alguma área da sua vida onde você confunde o que pertence ao mundo com o que pertence a Deus?',
        ],
      },
    },
    {
      prayer: {
        title: 'Mostra-me os Teus Caminhos',
        text: t(`Senhor, Moisés pediu: "Mostra-me agora os teus
          caminhos, para que eu te conheça." Não bastava a ele saber
          que Deus estava com ele — queria conhecê-lo mais
          profundamente. Ajuda-me a não me contentar com uma relação
          superficial contigo, apenas funcional, mas a buscar, como
          Moisés, conhecer os teus caminhos, o teu caráter, a tua
          forma de agir — não apenas o que podes fazer por mim. Amém.`),
      },
      meditation: {
        prompt: t(`Moisés já tinha a promessa da presença de Deus ("eu
          mesmo irei contigo") quando pediu para conhecer seus
          caminhos — a intimidade genuína busca mais do que a garantia
          de companhia.`),
        questions: [
          'Você busca principalmente o que Deus pode fazer por você, ou também conhecê-lo mais profundamente como ele é?',
          'O que significaria, na prática, pedir hoje "mostra-me os teus caminhos" numa área específica da sua vida?',
          'Como sua oração poderia se aprofundar de pedidos funcionais para busca genuína de intimidade?',
        ],
      },
    },
    {
      prayer: {
        title: 'Me Verás Pelas Costas',
        text: t(`Senhor, quando Moisés pediu para ver a tua glória,
          respondeste que nenhum homem pode ver a tua face e viver —
          mas o colocaste na fenda da penha, cobriste-o com tua mão, e
          permitiste que ele visse as tuas costas depois que passasses.
          Mesmo essa revelação parcial foi suficientemente gloriosa.
          Ensina-me a aceitar revelações parciais de ti sem exigir
          compreensão total — confiando que o pouco que vejo já é
          suficiente para sustentar a fé. Amém.`),
      },
      meditation: {
        prompt: t(`A imagem de Deus protegendo Moisés com a própria mão
          enquanto passa sugere cuidado, não distanciamento — a
          limitação da revelação é proteção, não rejeição.`),
        questions: [
          'Você exige de Deus compreensão total antes de confiar, ou consegue viver com revelações parciais, como Moisés?',
          'Que "fenda da penha" — proteção de Deus enquanto ele revela algo de si mesmo — você já experimentou?',
          'O que significa para você que Deus, ao se revelar parcialmente, ainda assim cuida ativamente de proteger quem o busca?',
        ],
      },
    },
    {
      prayer: {
        title: 'O Senhor Reina',
        text: t(`Senhor, o salmo proclama: "O Senhor reina, tremam os
          povos... És Rei poderoso que amas a justiça." A tua soberania
          não é abstrata ou distante — é acompanhada de amor pela
          justiça e de resposta a quem clama, como Moisés, Arão e
          Samuel. Que eu não trate a tua realeza apenas como conceito
          teológico, mas como realidade viva diante da qual me
          posiciono com reverência e confiança de que a justiça,
          finalmente, está em tuas mãos. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo une majestade (tremam os povos) e
          proximidade (clamavam ao Senhor, e ele os ouvia) — a
          grandeza de Deus não o torna inacessível à oração.`),
        questions: [
          'Você consegue segurar, ao mesmo tempo, a reverência diante da majestade de Deus e a confiança de que ele ouve sua oração pessoal?',
          'O que significa, para você, que Deus "ama a justiça" — como isso molda sua confiança em situações de injustiça que você vive ou observa?',
          'Como você pode viver hoje com mais consciência da realeza ativa de Deus sobre as circunstâncias?',
        ],
      },
    },
    {
      prayer: {
        title: 'Obra de Fé, Trabalho de Amor',
        text: t(`Senhor, Paulo elogia a igreja de Tessalônica por sua
          "obra de fé, trabalho de amor e firmeza de esperança" — três
          virtudes que se tornam visíveis em ação, não apenas em
          sentimento interior. A fé deles se tornou modelo para outros,
          "de tal maneira que não temos necessidade de falar coisa
          alguma." Que a minha própria fé produza essa mesma obra
          visível, capaz de testemunhar sem precisar de muitas
          palavras. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo não elogia apenas a crença correta dos
          tessalonicenses, mas o resultado prático dela — obra, trabalho
          e firmeza — que se tornaram testemunho visível para outras
          igrejas.`),
        questions: [
          'Sua fé tem produzido "obra" visível, ou permanece mais no campo da convicção interior?',
          'Que "trabalho de amor" você tem sustentado, mesmo quando ele exige esforço contínuo?',
          'Como você gostaria que sua vida "falasse" pelo seu testemunho, sem precisar de muitas palavras, como aconteceu com a igreja de Tessalônica?',
        ],
      },
    },
    {
      prayer: {
        title: 'Convertestes dos Ídolos',
        text: t(`Senhor, Paulo descreve a mudança da igreja de
          Tessalônica: "Convertestes dos ídolos a Deus, para servirdes
          ao Deus vivo e verdadeiro." A conversão não foi apenas troca
          de opinião religiosa, mas mudança radical de lealdade — de
          ídolos mudos a um Deus vivo. Examina os "ídolos" que ainda
          disputam minha lealdade, mesmo depois de eu professar fé em
          ti. Que a minha conversão continue se aprofundando, não
          apenas na crença, mas na prática diária. Amém.`),
      },
      meditation: {
        prompt: t(`A conversão descrita não é apenas evento pontual —
          "servirdes ao Deus vivo" é presente contínuo, sugerindo
          processo permanente, não conquista finalizada num único
          momento.`),
        questions: [
          'A sua conversão a Cristo foi um evento único no passado, ou você a vive como processo contínuo?',
          'Que "ídolo" — não necessariamente religioso, mas prático — ainda compete pela sua lealdade hoje?',
          'O que significaria aprofundar sua conversão nesta área específica esta semana?',
        ],
      },
    },
    {
      prayer: {
        title: 'A César e a Deus',
        text: t(`Senhor, esta semana trouxe o desejo de Moisés de
          conhecer teus caminhos, a proclamação da tua realeza, e a
          conversão radical da igreja de Tessalônica. Termino com a
          sabedoria de Jesus: dar a César o que é de César, e a ti o
          que é teu — e, sabendo que fui feito à tua imagem, entrego a
          ti não apenas parte, mas tudo o que sou. Amém.`),
      },
      meditation: {
        prompt: t(`Do pedido de Moisés por intimidade à conversão
          completa dos tessalonicenses, a semana revelou um padrão:
          conhecer Deus de verdade sempre leva a uma reordenação total
          de lealdades, não apenas parcial.`),
        questions: [
          'Qual dos temas desta semana — o pedido de intimidade de Moisés, a realeza de Deus, ou a conversão dos tessalonicenses — mais tocou você?',
          'O que você "deve a César" e o que você deve, sem divisão, a Deus?',
          'Como você quer buscar conhecer mais profundamente os caminhos de Deus na semana que começa?',
        ],
      },
    },
  ],

  // Próprio 25 — Levítico 19:1-2, 15-18 · Salmo 1 · 1 Tessalonicenses 2:1-8 · Mateus 22:34-46
  25: [
    {
      prayer: {
        title: 'O Grande Mandamento',
        text: t(`Senhor Jesus, quando te perguntaram qual era o maior
          mandamento, respondeste com dois que não se separam: "Amarás
          ao Senhor teu Deus" e "Amarás ao teu próximo como a ti
          mesmo." Toda a lei e os profetas dependem disso. Tantas vezes
          tento cumprir regras religiosas isoladas sem que o amor as
          sustente, ou digo que amo a ti sem que isso se traduza em
          amor concreto ao próximo. Une em mim essas duas direções do
          amor, para que eu não separe o que tu nunca separaste. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus não escolhe entre os dois mandamentos — ele os
          apresenta como inseparáveis, o segundo "semelhante" ao
          primeiro, sugerindo que amor a Deus sem amor ao próximo é
          incompleto.`),
        questions: [
          'Você tende a viver mais o amor "vertical" (a Deus) ou o "horizontal" (ao próximo)? O que explica esse desequilíbrio?',
          'Como o amor genuíno a Deus deveria mudar concretamente a forma como você trata as pessoas mais próximas?',
          'Existe alguém que você ama "em teoria" — reconhece o mandamento — mas não em prática cotidiana?',
        ],
      },
    },
    {
      prayer: {
        title: 'Sereis Santos',
        text: t(`Senhor, o chamado à santidade em Levítico não é
          abstrato — vem acompanhado de instruções bem práticas: "não
          farás injustiça no juízo... não andarás como mexeriqueiro."
          Santidade e ética cotidiana caminham juntas. Examina minhas
          próprias práticas diárias — como trato quem tem menos poder
          que eu, como falo dos ausentes, como julgo com justiça ou
          com favoritismo. Que a minha santidade não seja apenas
          religiosa, mas visível nas escolhas comuns do dia a dia.
          Amém.`),
      },
      meditation: {
        prompt: t(`A ordem "sereis santos, porque eu, o Senhor vosso
          Deus, sou santo" é seguida imediatamente de instruções sobre
          justiça social, não de rituais — santidade bíblica é
          inseparável de como se trata o próximo.`),
        questions: [
          'Você associa "santidade" mais a práticas religiosas ou a comportamento ético no cotidiano?',
          'Em que área da sua vida você tem feito "acepção de pessoas" — tratando diferente conforme o status de alguém?',
          'Que hábito prático de justiça você poderia cultivar esta semana, como reflexo de santidade real?',
        ],
      },
    },
    {
      prayer: {
        title: 'Não Odiarás no Coração',
        text: t(`Senhor, a lei antiga já apontava para o coração:
          "Não odiarás a teu irmão no teu coração... não te vingarás
          nem guardarás ira." Não bastava evitar a violência externa;
          era preciso lidar com o ódio interno antes que ele
          amadurecesse. Reconheço em mim ressentimentos guardados que
          nunca se tornaram ação, mas que já corrompem meu coração por
          dentro. Ajuda-me a lidar com essas raízes antes que produzam
          fruto amargo, seguindo o teu conselho: "não deixarás de
          repreender o teu próximo" com honestidade, em vez de guardar
          rancor em silêncio. Amém.`),
      },
      meditation: {
        prompt: t(`O texto liga diretamente evitar o ódio interno à
          prática de "repreender o próximo" — a alternativa ao rancor
          silencioso não é fingir que está tudo bem, mas o confronto
          honesto e amoroso.`),
        questions: [
          'Existe algum ressentimento que você guarda internamente, sem nunca ter conversado abertamente com a pessoa envolvida?',
          'Você prefere guardar rancor em silêncio ou arriscar uma conversa honesta, como a lei recomenda?',
          'O que ajudaria você a "repreender" com amor, sem cair em acusação ou explosão?',
        ],
      },
    },
    {
      prayer: {
        title: 'Como Árvore Junto às Águas',
        text: t(`Senhor, o salmo descreve o bem-aventurado como aquele
          que "tem seu prazer na lei do Senhor, e na sua lei medita de
          dia e noite" — comparado a uma árvore plantada junto às
          correntes de águas, que dá fruto na estação própria. Não é
          esforço convulsivo, mas enraizamento constante. Ajuda-me a
          cultivar esse mesmo hábito de meditação contínua na tua
          Palavra, não como tarefa esporádica, mas como raiz profunda
          que sustenta fruto duradouro. Amém.`),
      },
      meditation: {
        prompt: t(`A árvore do salmo não produz fruto imediatamente após
          ser plantada — a imagem sugere tempo de enraizamento antes da
          fruta aparecer "na estação própria".`),
        questions: [
          'A sua meditação na Palavra de Deus tem sido raiz constante ou esforço esporádico apenas em momentos de crise?',
          'Você já experimentou frustração por não ver "fruto" imediato de uma disciplina espiritual? O que essa imagem ensina sobre tempo e paciência?',
          'O que significaria, na prática, plantar-se "junto às correntes de águas" nesta fase da sua vida?',
        ],
      },
    },
    {
      prayer: {
        title: 'Como uma Ama que Acaricia',
        text: t(`Senhor, Paulo descreve seu ministério com uma imagem
          terna: "nos apresentamos brandos entre vós, qual ama que
          acaricia seus próprios filhos." Ele tinha autoridade
          apostólica, mas escolheu ternura, não imposição — "de boa
          vontade desejávamos comunicar-vos não somente o evangelho de
          Deus, mas ainda as nossas próprias almas." Ensina-me esse
          modelo de influência: não busca de poder ou controle, mas
          entrega genuína de mim mesmo por quem sirvo. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo, com autoridade real para exigir respeito como
          apóstolo, escolhe explicitamente a imagem mais terna e menos
          hierárquica possível para descrever sua liderança.`),
        questions: [
          'Você associa liderança ou influência mais a autoridade exigida ou a ternura oferecida?',
          'Existe alguém sob sua influência — filho, aluno, liderado — que precisaria de mais ternura e menos exigência de você?',
          'O que significaria "comunicar não apenas a mensagem, mas a própria alma" em alguma relação que você tem hoje?',
        ],
      },
    },
    {
      prayer: {
        title: 'De Quem É Filho o Cristo?',
        text: t(`Senhor Jesus, depois de responder sobre o grande
          mandamento, viraste a pergunta aos fariseus: "De quem é
          filho o Cristo?" e mostraste, pela própria Escritura deles,
          que o Messias era mais do que descendente de Davi — era
          também Senhor de Davi. "Ninguém podia responder-lhe palavra."
          A tua identidade escapa às categorias fáceis que tentamos te
          encaixar. Ajuda-me a não reduzir quem tu és a explicações
          confortáveis demais, mas a permanecer aberto ao mistério
          real da tua pessoa. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus usa a própria autoridade das Escrituras que
          seus interlocutores respeitavam para expandir, não contradizer,
          a compreensão deles sobre o Messias — o confronto não é
          hostil, é revelador.`),
        questions: [
          'Você já tentou encaixar Jesus numa categoria confortável demais — apenas professor, apenas exemplo moral — que reduz quem ele realmente é?',
          'O que significa para você que Jesus é, ao mesmo tempo, "filho de Davi" (humano, histórico) e "Senhor de Davi" (divino, eterno)?',
          'Como você mantém abertura ao mistério de Cristo, sem tentar simplificá-lo demais?',
        ],
      },
    },
    {
      prayer: {
        title: 'Santidade que Ama',
        text: t(`Senhor, esta semana uniu a santidade prática de
          Levítico ao grande mandamento do amor, a imagem da árvore
          enraizada à ternura pastoral de Paulo. No fim, tudo aponta
          para a mesma verdade: amar a ti e ao próximo não são deveres
          separados, mas uma única raiz que produz fruto visível na
          justiça cotidiana. Que eu leve, para a semana que começa, o
          amor que se enraíza e se manifesta em ação concreta. Amém.`),
      },
      meditation: {
        prompt: t(`Do mandamento duplo do amor à imagem da árvore junto
          às águas, a semana conectou consistentemente meditação
          interior e fruto exterior — a fé genuína sempre produz os
          dois.`),
        questions: [
          'Qual dos temas desta semana — o grande mandamento, a santidade prática, ou a ternura pastoral de Paulo — mais moldou sua forma de ver o próximo?',
          'Que "fruto" concreto de amor você quer que sua fé produza na semana que começa?',
          'Como você quer equilibrar, daqui para frente, meditação profunda na Palavra e ação prática de justiça e amor?',
        ],
      },
    },
  ],

  // Semana Próprio 3 — Deuteronômio 30:15-20 · Salmo 131 · 1 Coríntios 4:1-5 · Mateus 6:24-34
  3: [
    {
      prayer: {
        title: 'Não Vos Inquieteis',
        text: t(`Senhor Jesus, disseste: "Ninguém pode servir a dois
          senhores... não podeis servir a Deus e às riquezas." E logo
          depois: "não estejais ansiosos quanto à vossa vida." As duas
          coisas andam juntas — a ansiedade constante muitas vezes
          revela a quem realmente sirvo. Examina os meus medos sobre
          comida, roupa, futuro, segurança: quanto disso é cuidado
          responsável, e quanto é escravidão disfarçada de prudência?
          Ensina-me a buscar primeiro o teu Reino, confiando que o
          resto se ordena a partir daí. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus não condena o trabalho ou o planejamento — ele
          aponta para as aves e os lírios como quem não trabalha em
          vão, mas também não se consome de ansiedade. A confiança não
          é passividade.`),
        questions: [
          'A que "senhor" — dinheiro, aprovação, controle — você tem servido sem perceber, pela quantidade de ansiedade que ele produz em você?',
          'O que mudaria se você tratasse a ansiedade recorrente como sintoma, não como destino inevitável?',
          'O que significa, para você hoje, "buscar primeiro o Reino de Deus" numa decisão prática específica?',
        ],
      },
    },
    {
      prayer: {
        title: 'Escolhe a Vida',
        text: t(`Senhor, através de Moisés puseste diante do teu povo
          uma escolha clara: "a vida e o bem, a morte e o mal...
          escolhe, pois, a vida." Não é escolha única e distante, mas
          decisão renovada a cada dia — amar-te, andar nos teus
          caminhos, apegar-me a ti, "pois ele é a tua vida." Reconheço
          que muitas das minhas pequenas escolhas diárias, somadas,
          apontam mais para a morte do que para a vida que prometes.
          Ajuda-me a escolher, hoje, de forma concreta. Amém.`),
      },
      meditation: {
        prompt: t(`O texto trata a escolha entre vida e morte não como
          evento único, mas como orientação constante — "amando",
          "obedecendo", "apegando-se" são verbos contínuos, não atos
          isolados.`),
        questions: [
          'Que escolha pequena e repetida no seu dia a dia, somada ao longo do tempo, tem apontado mais para a morte do que para a vida?',
          'O que significa, na prática, "apegar-se" a Deus — não apenas acreditar nele, mas se agarrar a ele?',
          'Que decisão concreta de hoje você pode reorientar na direção da vida que Deus oferece?',
        ],
      },
    },
    {
      prayer: {
        title: 'Alma Sossegada',
        text: t(`Senhor, o salmista descreve uma alma que desistiu de
          se ocupar "de assuntos grandes e maravilhosos demais" para
          si, e em vez disso "acalmou e sossegou" — "qual criança
          desmamada sobre o seio de sua mãe." Não é resignação
          derrotada, mas descanso confiante. Reconheço quanto da minha
          própria inquietação vem de tentar controlar o que não me
          cabe controlar. Ensina-me esse mesmo sossego — não porque
          entendo tudo, mas porque confio em quem entende. Amém.`),
      },
      meditation: {
        prompt: t(`A imagem de uma criança já desmamada — que não chora
          mais exigindo o peito, mas simplesmente descansa no colo da
          mãe — descreve uma confiança que já não precisa de prova
          constante.`),
        questions: [
          'Você se ocupa de "assuntos grandes demais" — preocupações que não estão sob seu controle real?',
          'O que ajudaria você a passar de uma fé que "exige provas constantes" para uma fé que "descansa no colo"?',
          'Como seria, hoje, praticar esse sossego específico numa área de ansiedade recorrente?',
        ],
      },
    },
    {
      prayer: {
        title: 'Despenseiros Fiéis',
        text: t(`Senhor, Paulo escreve que o que se requer dos
          despenseiros dos mistérios de Deus "é que cada um seja
          encontrado fiel" — e acrescenta: "nada julgueis antes do
          tempo." Reconheço a tentação de me julgar, e de julgar
          outros, por resultados visíveis, quando tu pedes apenas
          fidelidade no que foi confiado. Livra-me da ansiedade de
          precisar provar meu valor por conquistas, e da pressa de
          julgar antes que a verdade venha à luz. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo distingue claramente entre ser fiel (o que é
          pedido) e ser bem-sucedido aos olhos humanos (o que
          frequentemente se cobra) — "mui pouco se me dá de ser
          julgado por vós."`),
        questions: [
          'Você mede seu próprio valor mais pela fidelidade nas pequenas coisas ou pelos resultados visíveis que consegue mostrar?',
          'Existe algum julgamento precipitado — sobre você mesmo ou sobre outra pessoa — que você precisa suspender "até que venha o Senhor"?',
          'O que significaria, hoje, ser um "despenseiro fiel" numa responsabilidade específica que você tem?',
        ],
      },
    },
    {
      prayer: {
        title: 'Olhai para as Aves do Céu',
        text: t(`Senhor Jesus, apontaste para as aves que "não semeiam,
          nem ceifam" e para os lírios que "não trabalham nem fiam" —
          e ainda assim são cuidados e vestidos com esplendor. "Não
          valeis vós muito mais do que elas?" Não é chamado à
          preguiça, mas lembrete de que a tua providência antecede o
          meu esforço. Ajuda-me a trabalhar sem a ansiedade de que
          tudo depende só de mim. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus não usa as aves e os lírios para ensinar
          passividade, mas para relativizar a ansiedade — a natureza
          trabalha (as aves buscam alimento), mas não se consome de
          preocupação sobre o resultado.`),
        questions: [
          'O que diferencia, na sua vida, trabalho responsável de ansiedade que consome sem necessidade?',
          'Você já parou para observar, de verdade, algum sinal simples da provisão de Deus — como Jesus pede que se observe as aves e os lírios?',
          '"Não valeis vós muito mais do que elas?" — você vive como se acreditasse nisso?',
        ],
      },
    },
    {
      prayer: {
        title: 'Basta a Cada Dia o Seu Mal',
        text: t(`Senhor, terminaste o ensino sobre ansiedade com uma
          frase que soa quase severa em sua simplicidade: "não vos
          inquieteis, pois, pelo dia de amanhã... basta a cada dia o
          seu mal." Não prometes ausência de dificuldade, mas
          suficiência de graça para o dia presente. Ajuda-me a viver
          hoje, plenamente, sem emprestar do amanhã as preocupações que
          ainda não chegaram. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus não nega que cada dia terá seu próprio "mal" —
          reconhece isso abertamente — mas ensina a enfrentá-lo um dia
          de cada vez, não acumulado com as preocupações futuras.`),
        questions: [
          'Quanto da sua ansiedade de hoje pertence, na verdade, a preocupações sobre o futuro que ainda não chegou?',
          'O que significaria, na prática, viver "um dia de cada vez" nesta semana específica?',
          'Que graça você já recebeu hoje que confirma que Deus supre o suficiente para o dia presente?',
        ],
      },
    },
    {
      prayer: {
        title: 'Buscar Primeiro o Reino',
        text: t(`Senhor, esta semana trouxe a escolha entre servir a
          dois senhores, a decisão diária entre vida e morte, o
          sossego de uma alma que já não exige provas, e a fidelidade
          pedida a um despenseiro. Termino pedindo o que Jesus
          ensinou como prioridade acima de todas: que eu busque
          primeiro o teu Reino e a tua justiça, confiando que o resto
          se ordena a partir daí. Amém.`),
      },
      meditation: {
        prompt: t(`Do "escolhe a vida" de Deuteronômio ao "buscai
          primeiro o Reino" de Jesus, a semana inteira girou em torno
          da mesma pergunta: o que realmente governa as suas escolhas
          diárias?`),
        questions: [
          'Qual dos temas desta semana — a escolha entre vida e morte, o sossego da alma, ou a confiança nas aves e lírios — mais desafiou sua ansiedade específica?',
          'O que significaria, concretamente, "buscar primeiro o Reino" na semana que começa?',
          'Como você quer levar o sossego do Salmo 131 para os próximos dias, mesmo em meio a incertezas reais?',
        ],
      },
    },
  ],

  // Semana Próprio 4 — Gênesis 6:9-22; 7:24; 8:14-19 · Salmo 46 · Romanos 1:16-17; 3:22b-28, (29-31) · Mateus 7:21-29
  4: [
    {
      prayer: {
        title: 'Casa Sobre a Rocha',
        text: t(`Senhor Jesus, ensinaste que ouvir as tuas palavras não
          basta — "todo aquele que ouve estas minhas palavras e as
          põe em prática, será comparado a um homem prudente, que
          edificou a casa sobre a rocha." As tempestades vêm igual
          para os dois construtores; a diferença aparece só na hora do
          teste. Examina o fundamento sobre o qual tenho construído
          minha vida — convicções ouvidas mas nunca praticadas, ou
          obediência real que resiste à tempestade. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus não distingue os dois construtores pela
          quantidade de conhecimento ("estas minhas palavras" são as
          mesmas para ambos) — a diferença é inteiramente sobre prática,
          não sobre informação.`),
        questions: [
          'Que ensinamento de Jesus você conhece bem, mas ainda não colocou em prática de forma consistente?',
          'Como você reconheceria, na sua própria vida, se está construindo sobre a rocha ou sobre a areia?',
          'Que "tempestade" atual está revelando a solidez — ou a fragilidade — do que você construiu?',
        ],
      },
    },
    {
      prayer: {
        title: 'Andava com Deus',
        text: t(`Senhor, de Noé se diz simplesmente: "era homem justo e
          perfeito em suas gerações, e andava com Deus" — numa geração
          inteira corrompida, ele foi exceção. Não escolheu a
          integridade porque era fácil ou popular, mas porque
          cultivava proximidade contigo em meio a um mundo que se
          afastava. Ensina-me essa mesma integridade que não depende
          da aprovação da maioria, mas de caminhar contigo mesmo
          quando isso me deixa sozinho. Amém.`),
      },
      meditation: {
        prompt: t(`O texto não descreve Noé como perfeito em sentido
          absoluto, mas como alguém que "andava com Deus" — uma
          relação contínua e ativa, não um estado estático de
          perfeição moral.`),
        questions: [
          'Você já se sentiu como Noé — íntegro numa direção diferente da maioria ao seu redor? Como lidou com isso?',
          'O que significa, na prática, "andar com Deus" — não apenas acreditar nele, mas caminhar continuamente ao lado dele?',
          'Que influência ao seu redor tem te puxado para longe da integridade que Deus pede?',
        ],
      },
    },
    {
      prayer: {
        title: 'A Arca no Meio do Juízo',
        text: t(`Senhor, ordenaste a Noé que construísse uma arca —
          instrução estranha, trabalho longo, sem sinal visível de
          chuva no horizonte. Ele obedeceu mesmo sem ver ainda o
          motivo completo. Reconheço que às vezes me peço provas antes
          de obedecer, quando tu pedes obediência antes da prova
          aparecer. Ensina-me a construir o que me pedes, mesmo quando
          o céu ainda está limpo e ninguém mais entende por quê. Amém.`),
      },
      meditation: {
        prompt: t(`Noé construiu a arca ao longo de anos, presumivelmente
          debaixo de zombaria, sem nenhuma evidência climática de que
          o dilúvio viria — a obediência precedeu inteiramente a
          confirmação visível.`),
        questions: [
          'Existe algo que Deus pede que você comece a construir hoje, mesmo sem ver ainda plenamente o motivo?',
          'Como você lida com a zombaria ou o ceticismo de quem não entende sua obediência a Deus?',
          'O que ajudaria você a perseverar numa obediência de longo prazo, como a construção da arca?',
        ],
      },
    },
    {
      prayer: {
        title: 'Deus É o Nosso Refúgio',
        text: t(`Senhor, o salmo declara: "Deus é o nosso refúgio e
          fortaleza, socorro bem presente na angústia. Pelo que não
          temeremos, ainda que a terra se mude." Mesmo quando tudo ao
          redor parece instável — nações bramindo, reinos se
          abalando — tu permaneces o rio que alegra a cidade de Deus.
          Que eu não busque estabilidade nas circunstâncias que mudam,
          mas em ti, que não mudas. Aquieta-me, e ensina-me a saber
          que és Deus. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo não nega o caos real — "bramam nações,
          reinos se abalam" — mas insiste que, no meio dele, há um rio
          que não seca, uma cidade que não é abalada.`),
        questions: [
          'Que instabilidade externa você está enfrentando que testa sua confiança em Deus como refúgio?',
          '"Aquietai-vos, e sabei que eu sou Deus" — o que ajudaria você a praticar essa quietude hoje?',
          'Onde você tem buscado refúgio que não seja genuinamente seguro, mesmo parecendo sólido?',
        ],
      },
    },
    {
      prayer: {
        title: 'O Justo Viverá da Fé',
        text: t(`Senhor, Paulo declara sem hesitação: "não me
          envergonho do evangelho, pois é o poder de Deus para
          salvação de todo aquele que crê." E acrescenta a verdade que
          moveria toda a Reforma: "o justo viverá da fé." Não é
          conquista minha, mas dom recebido pela fé, de fé em fé.
          Livra-me de qualquer vergonha em declarar essa verdade, e
          ensina-me a viver, de fato, pela fé que professo. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo escreve isso como alguém que já enfrentou
          rejeição e perseguição por causa do evangelho — "não me
          envergonho" é declaração feita com plena consciência do
          custo social de proclamá-lo.`),
        questions: [
          'Existe algum contexto em que você sente vergonha, mesmo sutil, de declarar sua fé?',
          'O que significa, na prática do seu dia a dia, "viver da fé" e não apenas professá-la teoricamente?',
          'Como o evangelho já se mostrou "poder de Deus" concretamente na sua própria vida?',
        ],
      },
    },
    {
      prayer: {
        title: 'Justificados Gratuitamente',
        text: t(`Senhor, Paulo escreve que somos "justificados
          gratuitamente pela sua graça, mediante a redenção que há em
          Cristo Jesus" — não há distinção, "porque todos pecaram e
          destituídos estão da glória de Deus." A justificação não
          vem de méritos acumulados, mas de dom recebido. Liberta-me
          da tentação constante de tentar merecer o que já me foi dado
          gratuitamente, e ensina-me a viver a partir da graça, não em
          busca dela. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo insiste que "não há distinção" entre judeus e
          gentios diante do pecado e da graça — a justificação pela fé
          nivela toda pretensão de superioridade baseada em mérito
          próprio.`),
        questions: [
          'Você vive como se precisasse constantemente merecer o amor de Deus, ou descansa na graça já dada?',
          'Existe alguma comparação de mérito espiritual — "sou melhor que fulano" — que essa verdade da graça igualitária confronta em você?',
          'O que significaria hoje agir a partir da graça recebida, não em busca de aprovação?',
        ],
      },
    },
    {
      prayer: {
        title: 'Fundamento na Rocha',
        text: t(`Senhor, esta semana trouxe a integridade silenciosa de
          Noé, a obediência que constrói sem ver o motivo completo, o
          refúgio seguro em meio à instabilidade, e a justificação
          gratuita pela fé. Termino pedindo: que eu construa minha
          vida sobre a rocha da tua Palavra praticada, não apenas
          ouvida — andando contigo, como Noé, mesmo quando o mundo ao
          redor se corrompe. Amém.`),
      },
      meditation: {
        prompt: t(`De Noé, que andou com Deus em meio à corrupção geral,
          à parábola da casa sobre a rocha, a semana inteira ensinou
          que fé genuína se prova na prática consistente, não na
          circunstância favorável.`),
        questions: [
          'Qual dos temas desta semana — a integridade de Noé, o refúgio seguro, ou a justificação pela graça — mais moldou sua semana?',
          'Que "casa" você está construindo agora — sobre rocha ou sobre areia — e o que precisaria mudar?',
          'Como você quer "andar com Deus" de forma mais intencional nos próximos dias?',
        ],
      },
    },
  ],

  // Semana Próprio 6 — Gênesis 18:1-15, (21:1-7) · Salmo 116:1-2, 12-19 · Romanos 5:1-8 · Mateus 9:35-10:8, (9-23)
  6: [
    {
      prayer: {
        title: 'A Seara É Grande',
        text: t(`Senhor Jesus, vendo as multidões, "compadeceste-te
          delas, porque andavam desgarradas e espalhadas como ovelhas
          que não têm pastor" — e disseste aos discípulos: "a seara é
          grande, mas os trabalhadores são poucos." Depois os enviaste
          com autoridade para curar e anunciar. Não me chamas a
          observar a necessidade à distância, mas a ser enviado nela.
          Desperta em mim a mesma compaixão que viste, e a disposição
          de ser resposta à oração por trabalhadores. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus pede que os discípulos orem por mais
          trabalhadores — e no versículo seguinte, os envia a eles
          mesmos. A oração pela necessidade alheia frequentemente
          precede o próprio envio de quem ora.`),
        questions: [
          'Você já orou por uma necessidade e, olhando para trás, percebeu que a resposta começou com o seu próprio envio?',
          'Que "seara" ao seu redor você tem visto com compaixão, mas ainda não se sentiu enviado a ela?',
          'O que significaria, hoje, oferecer-se como trabalhador em vez de apenas observar a necessidade?',
        ],
      },
    },
    {
      prayer: {
        title: 'Três Visitantes ao Meio-Dia',
        text: t(`Senhor, apareceste a Abraão "no maior calor do dia" —
          momento incômodo, sem aviso — e ele correu ao encontro dos
          visitantes, ofereceu água, sombra e uma refeição preparada
          às pressas. A hospitalidade dele não calculou o custo antes
          de agir. Ensina-me essa mesma prontidão para acolher — não
          esperando o momento conveniente, mas respondendo à
          oportunidade de servir assim que ela aparece. Amém.`),
      },
      meditation: {
        prompt: t(`Abraão não sabia, no início, que estava recebendo o
          próprio Senhor — sua hospitalidade generosa precedeu
          qualquer reconhecimento de quem realmente visitava sua
          tenda.`),
        questions: [
          'Você tende a hospedar e servir de forma calculada, ou com a prontidão espontânea de Abraão?',
          'Que oportunidade de acolhida você já deixou passar por chegar em "hora inconveniente"?',
          'Como Abraão, você já serviu alguém sem saber o alcance real do que estava fazendo?',
        ],
      },
    },
    {
      prayer: {
        title: 'Há Coisa Demasiado Maravilhosa?',
        text: t(`Senhor, quando Sara riu, descrente, ao ouvir que
          teria um filho na velhice, tua pergunta ecoou através dos
          séculos: "Há, porventura, coisa demasiado maravilhosa para
          o Senhor?" Reconheço as vezes em que também rio, por dentro,
          diante de promessas tuas que parecem biologicamente ou
          circunstancialmente impossíveis. Perdoa minha incredulidade
          disfarçada de realismo, e renova em mim a fé de que nada é
          maravilhoso demais para ti. Amém.`),
      },
      meditation: {
        prompt: t(`Deus não repreende Sara com dureza pelo riso
          descrente — apenas faz a pergunta que expõe, com gentileza,
          o tamanho real do seu próprio poder comparado à
          impossibilidade que ela via.`),
        questions: [
          'Que promessa de Deus você já riu por dentro, achando-a impossível demais para se realizar?',
          'Como a pergunta "há coisa demasiado maravilhosa para o Senhor?" muda a forma como você encara essa situação?',
          'O que significaria hoje voltar a esperar por algo que você desistiu de esperar por parecer impossível?',
        ],
      },
    },
    {
      prayer: {
        title: 'Amo ao Senhor',
        text: t(`Senhor, o salmista declara com simplicidade: "Amo ao
          Senhor, porque ele ouve a minha voz e a minha súplica."
          Não é amor abstrato, mas resposta a uma experiência real de
          ser ouvido. "Que darei eu ao Senhor por todos os benefícios
          que me tem feito?" — a gratidão nasce de memória concreta,
          não de obrigação vaga. Desperta em mim essa mesma gratidão
          específica pelas vezes em que já me ouviste. Amém.`),
      },
      meditation: {
        prompt: t(`O amor do salmista não é sentimento genérico — nasce
          de uma experiência concreta e lembrada: "porque ele ouve a
          minha voz." A gratidão específica sustenta o amor duradouro.`),
        questions: [
          'Você consegue nomear um momento específico e concreto em que sentiu que Deus "ouviu a sua voz"?',
          'O que significaria "pagar os teus votos ao Senhor" — cumprir um compromisso de gratidão que você fez em oração?',
          'Como cultivar, hoje, esse tipo de amor específico e memorioso, não apenas devoção genérica?',
        ],
      },
    },
    {
      prayer: {
        title: 'A Tribulação Produz Perseverança',
        text: t(`Senhor, Paulo escreve que "a tribulação produz a
          perseverança, e a perseverança a experiência, e a experiência
          a esperança." Não é caminho que eu escolheria — preferiria
          esperança sem o percurso da tribulação — mas reconheço que
          és tu quem forma caráter através do que atravesso, não
          apesar disso. Sustenta-me nas tribulações presentes, para
          que produzam em mim o fruto que prometes, não apenas
          desgaste. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo descreve uma sequência causal — tribulação leva
          a perseverança, que leva a experiência, que leva a esperança
          — sugerindo que pular etapas ou evitar a tribulação também
          significa perder o processo de formação.`),
        questions: [
          'Que tribulação atual você tem tentado evitar ou apressar, sem deixar que ela produza o que Deus quer formar?',
          'Olhando para trás, que "esperança" na sua vida você reconhece ter nascido de uma tribulação passada?',
          'O que ajudaria você a confiar nesse processo, mesmo no meio de uma tribulação ainda não resolvida?',
        ],
      },
    },
    {
      prayer: {
        title: 'Quando Ainda Éramos Pecadores',
        text: t(`Senhor, Paulo escreve a frase que resume o evangelho:
          "quando éramos ainda pecadores, Cristo morreu por nós." Não
          esperaste que eu melhorasse para me amar; o amor veio
          primeiro, antes de qualquer mérito. "Dificilmente haverá
          quem morra por um justo" — mas tu morreste pelo injusto.
          Que essa certeza sustente minha identidade, não o
          desempenho que ainda tento alcançar. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo contrasta o amor humano, que às vezes se
          arrisca por alguém excepcionalmente bom, com o amor de Cristo,
          que se entregou por quem ainda era inimigo — uma ordem
          invertida de tudo que consideramos razoável.`),
        questions: [
          'Você vive como alguém amado antes do mérito, ou ainda tenta "se tornar digno" do amor que já recebeu?',
          'O que significa, para você, que Cristo morreu especificamente "quando ainda éramos pecadores" — não depois de melhorarmos?',
          'Como essa certeza muda a forma como você trata alguém que considera "indigno" de amor hoje?',
        ],
      },
    },
    {
      prayer: {
        title: 'Enviados com Compaixão',
        text: t(`Senhor, esta semana trouxe a hospitalidade generosa de
          Abraão, o riso incrédulo de Sara transformado em espanto
          diante do teu poder, a gratidão concreta do salmista, e a
          certeza de que fomos amados antes de merecer. Termino
          pedindo que a mesma compaixão que viste nas multidões
          desgarradas me mova, esta semana, a ser trabalhador na
          seara, não apenas espectador da necessidade. Amém.`),
      },
      meditation: {
        prompt: t(`Da hospitalidade de Abraão ao envio dos discípulos, a
          semana revelou o mesmo padrão: quem recebe generosamente
          também é enviado a servir generosamente.`),
        questions: [
          'Qual dos temas desta semana — a hospitalidade de Abraão, a incredulidade transformada de Sara, ou o envio à seara — mais tocou você?',
          'Que promessa "demasiado maravilhosa" você quer voltar a esperar depois desta semana?',
          'Como você quer viver, nos próximos dias, como alguém enviado — não apenas observando a necessidade ao redor?',
        ],
      },
    },
  ],

  // Semana Próprio 20 — Êxodo 16:2-15 · Salmo 105:1-6, 37-45 · Filipenses 1:21-30 · Mateus 20:1-16
  20: [
    {
      prayer: {
        title: 'És Mau Porque Eu Sou Bom?',
        text: t(`Senhor Jesus, na parábola dos trabalhadores da vinha,
          quem foi contratado por último recebeu o mesmo salário de
          quem trabalhou o dia inteiro — e os primeiros murmuraram.
          Tu respondeste: "Não te faço injustiça... és mau porque eu
          sou bom?" A tua generosidade não segue a lógica do mérito
          comparado. Examina em mim o ressentimento que às vezes sinto
          quando a tua graça alcança outra pessoa "menos merecedora"
          do que eu acho que sou. Ensina-me a me alegrar com a tua
          bondade, mesmo quando ela não segue minha régua. Amém.`),
      },
      meditation: {
        prompt: t(`Os trabalhadores da primeira hora não foram
          prejudicados — receberam exatamente o combinado. O problema
          não era injustiça; era comparação, que transformou um
          salário justo em motivo de amargura.`),
        questions: [
          'Você já sentiu ressentimento diante da graça de Deus alcançando alguém que você julgava "menos merecedor"?',
          'O que a pergunta "és mau porque eu sou bom?" confronta em você?',
          'Como seria viver mais atento à generosidade recebida e menos à comparação com o que os outros recebem?',
        ],
      },
    },
    {
      prayer: {
        title: 'Panelas de Carne',
        text: t(`Senhor, mal saído da escravidão, o povo já murmurava
          contra Moisés, com saudade das "panelas de carne" do Egito
          — esquecendo a opressão que ali sofria. A liberdade recém-
          conquistada trouxe desconforto, e a memória distorcida
          preferiu romantizar o passado a enfrentar o presente
          incerto. Reconheço essa mesma tentação em mim: voltar a
          padrões antigos, mesmo destrutivos, só porque eram
          previsíveis. Dá-me memória honesta e paciência para o
          desconforto da liberdade ainda em formação. Amém.`),
      },
      meditation: {
        prompt: t(`A murmuração do povo não nega os fatos básicos —
          eles de fato comiam no Egito — mas distorce a memória,
          esquecendo a escravidão que também fazia parte daquela
          realidade.`),
        questions: [
          'Existe algum "Egito" — situação antiga, mesmo prejudicial — de que você sente saudade só porque era conhecido?',
          'Como você distingue nostalgia legítima de memória distorcida que esconde o que era realmente ruim?',
          'O que ajudaria você a suportar o desconforto de uma liberdade ou mudança ainda em processo?',
        ],
      },
    },
    {
      prayer: {
        title: 'A Porção para Cada Dia',
        text: t(`Senhor, deste maná que devia ser colhido diariamente
          — "a porção para cada dia" — sem permitir acúmulo além do
          necessário, exceto na véspera do sábado. Era treino de
          confiança diária, não de segurança acumulada. Confesso que
          prefiro garantias de longo prazo a depender de ti a cada
          manhã. Ensina-me a confiança que recolhe o suficiente para
          hoje, sem ansiedade sobre o excesso que ainda não tenho.
          Amém.`),
      },
      meditation: {
        prompt: t(`O maná apodrecia se guardado além da porção diária —
          a provisão de Deus era desenhada especificamente para impedir
          acúmulo ansioso, forçando dependência renovada a cada manhã.`),
        questions: [
          'Você tende a confiar mais em reservas acumuladas do que na provisão renovada de Deus a cada dia?',
          'O que mudaria se você tratasse cada dia como uma nova "colheita" de provisão, sem tentar controlar o dia seguinte?',
          'Existe alguma forma de "acúmulo ansioso" — não apenas material, mas emocional ou espiritual — que você precisa soltar?',
        ],
      },
    },
    {
      prayer: {
        title: 'Fez Sair com Alegria',
        text: t(`Senhor, o salmo celebra: "fez sair com alegria o seu
          povo, e com cânticos de júbilo os seus escolhidos" — não
          esconde a dificuldade da jornada, mas insiste em contá-la
          como motivo de louvor, "para que guardassem os seus
          preceitos." Ajuda-me a olhar para trás na minha própria
          história com essa mesma alegria — não negando as
          dificuldades, mas reconhecendo tua fidelidade nelas. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo transforma uma história de fome, opressão e
          deserto numa narrativa de alegria e cântico — o mesmo evento
          pode ser contado como sofrimento puro ou como fidelidade
          celebrada, dependendo de onde se coloca o foco.`),
        questions: [
          'Como você tem contado a história dos seus próprios momentos difíceis — como puro sofrimento, ou também como fidelidade de Deus?',
          'Que "cântico de júbilo" você poderia cantar hoje sobre uma travessia que já passou?',
          'O que significaria guardar, com gratidão, o que Deus já ensinou através de uma dificuldade superada?',
        ],
      },
    },
    {
      prayer: {
        title: 'Para Mim, o Viver É Cristo',
        text: t(`Senhor, Paulo escreveu da prisão, sem saber se sairia
          vivo: "para mim o viver é Cristo, e o morrer é lucro."
          Nenhum dos dois desfechos o assustava, porque ambos
          pertenciam a ti. Confesso que minha própria identidade
          costuma estar presa a coisas menores — carreira, aprovação,
          conforto — de um jeito que Paulo não permitia. Ensina-me a
          viver de tal forma que Cristo seja, de fato, o centro
          organizador de tudo o que sou. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo escreve isso genuinamente incerto sobre seu
          próprio futuro (prisão, possível execução) — a frase não é
          teoria abstrata, mas convicção testada em circunstância
          real de risco.`),
        questions: [
          'Se você completasse a frase "para mim, o viver é ___", o que preencheria essa lacuna hoje, honestamente?',
          'O que mudaria se Cristo fosse, de fato, o centro organizador da sua identidade, e não apenas uma parte dela?',
          'Você teria a mesma paz de Paulo diante de incerteza sobre o próprio futuro?',
        ],
      },
    },
    {
      prayer: {
        title: 'De Modo Digno do Evangelho',
        text: t(`Senhor, Paulo pede que a igreja se porte "dum modo
          digno do evangelho de Cristo," permanecendo firme "num só
          espírito, combatendo juntamente com uma só alma pela fé."
          Não é individual apenas, mas comunitário — unidade que
          resiste junto às pressões externas. Ajuda-me a viver de
          forma que meu testemunho, junto com o da minha comunidade de
          fé, honre o evangelho que professamos, especialmente sob
          pressão. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo liga diretamente "modo digno do evangelho" a
          unidade comunitária — não é apenas comportamento individual,
          mas como a igreja resiste, unida, às adversidades externas.`),
        questions: [
          'O que significaria, para você, viver "de modo digno do evangelho" nesta fase específica da sua vida?',
          'Como está a unidade da sua comunidade de fé diante das pressões que ela enfrenta hoje?',
          'Que contribuição você pode dar para que sua comunidade combata "com uma só alma" pela fé, em vez de dividida?',
        ],
      },
    },
    {
      prayer: {
        title: 'A Mesma Graça Para Todos',
        text: t(`Senhor, esta semana trouxe a generosidade que
          incomoda quem calcula mérito, a memória honesta sobre o
          Egito deixado para trás, a provisão diária do maná, e a
          convicção de Paulo de que viver é Cristo. Termino pedindo:
          que eu me alegre com a tua generosidade, mesmo quando ela
          não segue minha régua, e que eu viva, como Paulo, com Cristo
          como centro de tudo o que sou. Amém.`),
      },
      meditation: {
        prompt: t(`Da parábola da vinha à convicção de Paulo, a semana
          revelou o mesmo padrão: a generosidade de Deus não segue a
          lógica humana de mérito comparado — ela é dada por graça,
          recebida por confiança.`),
        questions: [
          'Qual dos temas desta semana — a generosidade que incomoda, a provisão diária, ou "viver é Cristo" — mais desafiou sua forma de pensar?',
          'Que comparação de mérito você quer soltar, depois desta semana, para viver mais livre?',
          'Como você quer levar a confiança na provisão diária de Deus para a semana que começa?',
        ],
      },
    },
  ],

  // Semana Próprio 26 — Josué 3:7-17 · Salmo 107:1-7, 33-37 · 1 Tessalonicenses 2:9-13 · Mateus 23:1-12
  26: [
    {
      prayer: {
        title: 'O Maior Será Vosso Servo',
        text: t(`Senhor Jesus, criticaste líderes religiosos que "atam
          fardos pesados... mas eles mesmos nem com o dedo querem
          movê-los" e buscam os primeiros lugares. Contra essa lógica,
          ensinaste: "o maior dentre vós há de ser vosso servo."
          Examina minhas próprias motivações quando busco
          reconhecimento ou posição — quanto disso é genuíno desejo de
          servir, e quanto é vaidade disfarçada de liderança. Que a
          minha grandeza, se houver, seja medida pelo serviço. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus não critica o conteúdo do ensino dos escribas
          ("tudo o que vos disserem, isso fazei") — critica a
          incoerência entre o que ensinam e como vivem.`),
        questions: [
          'Você já exigiu de outros um padrão que você mesmo não pratica?',
          'Que "fardo pesado" você pode estar colocando sobre outros sem ajudar a carregar?',
          'O que significaria buscar ser "o servo" num espaço onde você normalmente busca reconhecimento?',
        ],
      },
    },
    {
      prayer: {
        title: 'Santificai-vos',
        text: t(`Senhor, antes de atravessar o Jordão, ordenaste a
          Josué: "Hoje começarei a engrandecer-te... para que saibam
          que, assim como fui com Moisés, serei contigo." A promessa
          da tua presença veio antes da travessia, não depois dela.
          Reconheço que muitas vezes exijo ver o milagre antes de
          confiar na promessa. Ensina-me a fé que se prepara e avança
          confiando na tua presença prometida, mesmo antes de ver as
          águas se abrirem. Amém.`),
      },
      meditation: {
        prompt: t(`Deus promete a Josué confirmação pública de sua
          liderança "hoje" — antes da travessia acontecer — a
          promessa precede a prova visível, não a substitui.`),
        questions: [
          'Você tende a exigir ver o resultado antes de confiar na promessa, ou consegue avançar confiando primeiro?',
          'Que "travessia" você está diante de hoje, esperando ver o milagre antes de dar o primeiro passo?',
          'Como a promessa da presença de Deus, mais do que a garantia do resultado, pode sustentar você agora?',
        ],
      },
    },
    {
      prayer: {
        title: 'As Águas Pararam',
        text: t(`Senhor, quando os sacerdotes que levavam a arca
          puseram os pés nas águas do Jordão — que na época transbordava
          suas ribanceiras — as águas pararam, "levantaram-se num
          montão," e o povo atravessou em terra seca. O milagre exigiu
          o passo de fé antes da confirmação: os pés molharam antes
          das águas pararem. Ensina-me essa mesma disposição de agir
          em direção à promessa antes de ver o caminho completamente
          aberto. Amém.`),
      },
      meditation: {
        prompt: t(`As águas não pararam antes dos sacerdotes agirem —
          pararam no momento exato em que os pés deles tocaram a
          água. A fé aqui não é espera passiva, mas passo dado em
          direção ao impossível.`),
        questions: [
          'Existe algo que você está esperando "parar" ou "abrir caminho" antes de dar o primeiro passo, quando talvez Deus espere o passo primeiro?',
          'Que "Jordão transbordando" — obstáculo que parece maior do que o normal — você enfrenta agora?',
          'Como essa história muda a forma como você encara o momento de agir em meio à incerteza?',
        ],
      },
    },
    {
      prayer: {
        title: 'Clamaram e Ele os Livrou',
        text: t(`Senhor, o salmo descreve um povo "desgarrado pelo
          deserto... famintos e sedentos," até que "clamaram ao Senhor
          na sua tribulação, e ele os livrou das suas angústias." O
          padrão se repete tantas vezes na Escritura e na minha
          própria vida: a angústia real, o clamor sincero, e a
          libertação que só tu podes dar. Que eu não hesite em clamar
          quando estiver desgarrado, confiando que tu ouves e livras.
          Amém.`),
      },
      meditation: {
        prompt: t(`O salmo não minimiza a angústia real do povo
          ("desfalecia-lhes a alma") antes de descrever a libertação —
          o clamor sincero reconhece a dor antes de esperar a
          resposta.`),
        questions: [
          'Existe uma angústia atual que você ainda não trouxe a Deus em clamor sincero, talvez por achar que precisa "aguentar sozinho"?',
          'Que libertação passada você já experimentou depois de clamar a Deus na tribulação?',
          'Como você pode, hoje, trazer sua própria "sede e fome" diante de Deus com honestidade?',
        ],
      },
    },
    {
      prayer: {
        title: 'Trabalhando Noite e Dia',
        text: t(`Senhor, Paulo lembra à igreja: "trabalhando noite e
          dia, para não sermos pesados a nenhum de vós, vos pregamos o
          evangelho de Deus... como um pai a seus filhos." O cuidado
          pastoral dele não foi teórico — foi trabalho sustentado,
          visível, coerente com o que pregava. Examina a coerência
          entre o que digo acreditar e como realmente vivo diante de
          quem me observa. Que a minha vida sustente, não contradiga, o
          que professo. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo poderia ter exigido sustento financeiro como
          apóstolo, mas escolheu trabalhar por conta própria
          especificamente para remover qualquer dúvida sobre suas
          motivações.`),
        questions: [
          'Existe alguma área da sua vida onde as palavras que você professa e as ações que pratica não estão totalmente alinhadas?',
          'Você já abriu mão de um direito legítimo para remover dúvidas sobre suas motivações, como Paulo fez?',
          'O que significaria viver de forma tão coerente que ninguém precisasse duvidar da sinceridade da sua fé?',
        ],
      },
    },
    {
      prayer: {
        title: 'Não Para Serem Vistos',
        text: t(`Senhor Jesus, descreveste líderes religiosos que fazem
          "todas as suas obras... a fim de serem vistos pelos homens"
          — alargando filactérios, buscando os primeiros lugares.
          Examina as minhas próprias práticas religiosas: quantas eu
          faço realmente diante de ti, e quantas faço, mesmo
          inconscientemente, para impressionar quem está olhando?
          Purifica a minha motivação na oração, no serviço, na
          generosidade. Amém.`),
      },
      meditation: {
        prompt: t(`Jesus não condena as práticas em si — condena
          fazê-las "para serem vistos", expondo que o problema está na
          motivação, não no ato.`),
        questions: [
          'Existe alguma prática espiritual sua que você percebe ser mais performática do que genuína?',
          'Como você distingue, na prática, servir a Deus de servir à própria imagem diante dos outros?',
          'O que mudaria se você praticasse, esta semana, um ato de fé deliberadamente escondido?',
        ],
      },
    },
    {
      prayer: {
        title: 'Travessia e Serviço',
        text: t(`Senhor, esta semana atravessou um rio que parava
          diante da fé, um povo que clamou e foi livrado, o trabalho
          coerente de Paulo, e o convite a servir sem buscar ser
          visto. Termino pedindo: que eu atravesse os meus próprios
          "Jordões" confiando na tua presença prometida, e que eu sirva,
          esta semana, sem precisar do primeiro lugar. Amém.`),
      },
      meditation: {
        prompt: t(`Da travessia do Jordão ao chamado a servir sem
          buscar reconhecimento, a semana revelou o mesmo padrão: fé
          genuína avança confiando na promessa, e serve sem exigir
          crédito.`),
        questions: [
          'Qual dos temas desta semana — a travessia, o clamor ouvido, ou o chamado a servir — mais representa onde você está agora?',
          'Que "Jordão" você quer atravessar com mais confiança na semana que vem?',
          'Como você quer servir, nos próximos dias, sem precisar ser visto fazendo isso?',
        ],
      },
    },
  ],

  // Semana Próprio 27 — Josué 24:1-3a, 14-25 · Salmo 78:1-7 · 1 Tessalonicenses 4:13-18 · Mateus 25:1-13
  27: [
    {
      prayer: {
        title: 'Vigiai, Pois Não Sabeis',
        text: t(`Senhor Jesus, na parábola das dez virgens, cinco
          estavam preparadas com azeite suficiente, e cinco não — e
          quando o noivo chegou, já era tarde demais para as
          despreparadas se prepararem. "Vigiai pois, porque não sabeis
          nem o dia nem a hora." Examina se a minha fé é reserva
          genuína — enraizada, sustentável — ou apenas entusiasmo que
          se esgota rápido diante da demora. Amém.`),
      },
      meditation: {
        prompt: t(`A diferença entre as virgens prudentes e as
          insensatas não era a lâmpada, mas a reserva de azeite — algo
          que não podia ser emprestado nem compartilhado no último
          momento, exigindo preparação antecipada.`),
        questions: [
          'Sua fé é sustentada por reserva profunda ou por entusiasmo momentâneo que se esgota na demora?',
          'O que representaria, na prática, ter "azeite extra" — disciplinas que sustentam mesmo quando a resposta demora?',
          'Existe algo que você tem adiado se preparar, achando que ainda há tempo de sobra?',
        ],
      },
    },
    {
      prayer: {
        title: 'Escolhei Hoje a Quem Servireis',
        text: t(`Senhor, Josué desafiou o povo, no fim da sua vida: "Se
          vos parece mal o servirdes ao Senhor, escolhei hoje a quem
          haveis de servir." E declarou sua própria escolha antes de
          esperar a resposta deles: "Eu e a minha casa serviremos ao
          Senhor." A fé não é herança automática — cada geração
          precisa fazer sua própria escolha consciente. Ajuda-me a não
          viver a fé por costume herdado, mas a escolher hoje,
          deliberadamente, a quem sirvo. Amém.`),
      },
      meditation: {
        prompt: t(`Josué não pressiona o povo escondendo alternativas —
          menciona abertamente os outros deuses possíveis antes de
          convidar à escolha consciente pelo Senhor.`),
        questions: [
          'A sua fé é escolha consciente e renovada, ou principalmente hábito herdado da família ou cultura em que cresceu?',
          'Se você tivesse que declarar hoje, como Josué, "eu e a minha casa serviremos ao Senhor" — o que isso mudaria na prática?',
          'Que "outros deuses" — prioridades concorrentes — você precisa nomear honestamente antes de reafirmar sua escolha?',
        ],
      },
    },
    {
      prayer: {
        title: 'Não Podereis Servir ao Senhor',
        text: t(`Senhor, depois que o povo prometeu fidelidade com
          entusiasmo, Josué os surpreendeu: "Não podereis servir ao
          Senhor, porque é Deus santo, é Deus zeloso" — um alerta
          sério sobre a seriedade do compromisso que estavam
          assumindo. Reconheço que às vezes faço promessas espirituais
          com entusiasmo momentâneo, sem medir o peso real do
          compromisso. Ajuda-me a fazer votos com os olhos abertos
          para o custo, não apenas com o calor do momento. Amém.`),
      },
      meditation: {
        prompt: t(`Josué, paradoxalmente, desafia a própria promessa
          que acabou de conseguir — não para desanimar o povo, mas
          para que a escolha fosse feita com plena consciência, não
          impulso.`),
        questions: [
          'Você já fez um voto espiritual no calor do momento que depois se mostrou mais difícil de cumprir do que imaginava?',
          'O que significa, para você, levar a sério a "santidade zelosa" de Deus ao fazer compromissos com ele?',
          'Como você pode renovar hoje, com mais consciência do custo real, um compromisso de fé que fez no passado?',
        ],
      },
    },
    {
      prayer: {
        title: 'Puseram em Deus a Sua Esperança',
        text: t(`Senhor, o salmo descreve o propósito de contar a fé
          às próximas gerações: "para que pusessem em Deus a sua
          esperança, e não se esquecessem das obras de Deus." A
          transmissão da fé não é apenas informação — é formação de
          esperança. Ajuda-me a contar minha própria história de fé de
          um jeito que aponte para ti, plantando esperança genuína em
          quem ouve. Amém.`),
      },
      meditation: {
        prompt: t(`O objetivo declarado da transmissão da fé não é
          preservar tradição por si mesma, mas produzir esperança viva
          em Deus na geração seguinte.`),
        questions: [
          'Quando você conta sua história de fé, o foco tende a estar em Deus ou em você mesmo?',
          'Como você poderia contar uma experiência de fé de forma que plante esperança real em quem ouve?',
          'Que geração mais jovem você tem intencionalmente ajudado a "não se esquecer das obras de Deus"?',
        ],
      },
    },
    {
      prayer: {
        title: 'Não Vos Entristeçais Como os Outros',
        text: t(`Senhor, Paulo consola a igreja sobre os que já
          morreram: "não queremos que sejais ignorantes... para que
          não vos entristeçais como os outros que não têm esperança."
          Não proíbe o luto — proíbe o luto sem esperança. "Se cremos
          que Jesus morreu e ressurgiu, assim também... Deus os
          tornará a trazer." Conforta-me nas perdas que carrego,
          lembrando que a despedida não é definitiva para quem está em
          ti. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo não pede que a igreja finja não sentir tristeza
          — distingue entre tristeza com esperança e tristeza sem
          esperança, um consolo real que não nega a dor.`),
        questions: [
          'Existe uma perda que você carrega e que precisa ser trazida diante de Deus com essa esperança específica, não apenas resignação?',
          'Como você distingue, na prática, entre negar a dor e viver o luto com esperança?',
          'Que palavra desta passagem você poderia oferecer a alguém que está enlutado hoje?',
        ],
      },
    },
    {
      prayer: {
        title: 'De Certo Não Chegaria',
        text: t(`Senhor Jesus, na parábola, as virgens prudentes não
          puderam compartilhar seu azeite: "de certo não chegaria para
          nós e para vós." Há preparações espirituais que ninguém pode
          fazer por mim — minha própria vida de oração, meu próprio
          conhecimento da tua Palavra. Ajuda-me a cultivar essa relação
          pessoal e intransferível contigo, hoje, não apenas na hora
          da urgência. Amém.`),
      },
      meditation: {
        prompt: t(`A recusa das virgens prudentes não é falta de
          generosidade — é reconhecimento honesto de que certas coisas
          simplesmente não podem ser transferidas de última hora.`),
        questions: [
          'Você tem dependido da fé de outras pessoas sem cultivar a sua própria relação pessoal com Deus?',
          'O que significaria começar a "guardar seu próprio azeite" — investir em disciplinas espirituais pessoais?',
          'Existe algo que você tem adiado, esperando poder "pegar emprestado" de outra pessoa no último momento?',
        ],
      },
    },
    {
      prayer: {
        title: 'Escolha Renovada, Esperança Viva',
        text: t(`Senhor, esta semana trouxe o desafio de Josué a
          escolher a quem servir, a esperança viva sobre os que já
          dormem em ti, e o chamado a manter reserva própria de fé.
          Termino pedindo que eu e a minha casa, esta semana, sirvamos
          ao Senhor não apenas em palavras, mas vigilantes, prontos,
          com azeite suficiente para qualquer hora em que a demora
          testar minha paciência. Amém.`),
      },
      meditation: {
        prompt: t(`De Josué desafiando o povo a escolher até a
          vigilância pedida pelas dez virgens, a semana revelou que fé
          genuína exige renovação constante da escolha, não decisão
          única no passado.`),
        questions: [
          'Qual dos temas desta semana — a escolha de Josué, a esperança sobre os que dormem, ou a vigilância das virgens — mais tocou você?',
          'O que significaria, concretamente, "escolher hoje" renovar seu compromisso de servir ao Senhor?',
          'Como você quer viver, nos próximos dias, vigilante mas não ansioso?',
        ],
      },
    },
  ],

  // Semana Próprio 28 — Juízes 4:1-7 · Salmo 123 · 1 Tessalonicenses 5:1-11 · Mateus 25:14-30
  28: [
    {
      prayer: {
        title: 'Servo Bom e Fiel',
        text: t(`Senhor Jesus, na parábola dos talentos, os dois
          servos que negociaram e multiplicaram o que receberam
          ouviram: "Muito bem, servo bom e fiel; sobre o pouco foste
          fiel, sobre muito te colocarei." O elogio não foi pelo
          tamanho do resultado, mas pela fidelidade no uso do que foi
          dado. Examina o que me confiaste — tempo, dons, recursos —
          e mostra-me se tenho arriscado usá-los com fé, ou se, por
          medo, os enterro para "protegê-los". Amém.`),
      },
      meditation: {
        prompt: t(`Os servos receberam quantias diferentes "segundo a
          sua capacidade" — o padrão de avaliação não é comparação
          entre servos, mas fidelidade de cada um com o que lhe foi
          especificamente confiado.`),
        questions: [
          'Que "talento" você tem enterrado por medo de arriscar e falhar?',
          'Você se compara com o que outros receberam, em vez de focar na fidelidade com o que foi confiado a você?',
          'O que significaria, na prática esta semana, "negociar" com um talento específico em vez de escondê-lo?',
        ],
      },
    },
    {
      prayer: {
        title: 'Débora Julgava a Israel',
        text: t(`Senhor, num tempo em que "os filhos de Israel tornaram
          a fazer o que era mau" e foram entregues à opressão,
          levantaste Débora, profetisa, para julgar teu povo — "os
          filhos de Israel subiam a ter com ela para julgamento." Numa
          época de liderança fraca e infidelidade generalizada,
          usaste quem talvez ninguém esperasse. Ensina-me a confiar
          que podes levantar liderança sábia mesmo nos tempos mais
          difíceis, e a reconhecer sabedoria onde quer que ela apareça.
          Amém.`),
      },
      meditation: {
        prompt: t(`Débora não conquistou sua posição por força militar
          — o texto descreve simplesmente que o povo "subia a ter com
          ela" reconhecendo sua sabedoria, um tipo de liderança
          baseada em confiança acumulada, não em conquista.`),
        questions: [
          'Você reconhece sabedoria mesmo quando ela vem de onde menos espera?',
          'Que tipo de liderança — pela força ou pela confiança acumulada — você mais admira e tenta praticar?',
          'Em tempos de "liderança fraca" ao seu redor, como você pode ser parte da resposta de Deus?',
        ],
      },
    },
    {
      prayer: {
        title: 'Liderança Compartilhada',
        text: t(`Senhor, Débora chamou Baraque e o comissionou para a
          batalha, transmitindo a tua ordem específica. Ela não
          precisou fazer tudo sozinha — chamou outros para a missão,
          compartilhando liderança e responsabilidade. Ensina-me essa
          mesma disposição de convocar e capacitar outros, em vez de
          tentar carregar tudo sozinho. Que eu reconheça quando é hora
          de chamar alguém para caminhar comigo na missão. Amém.`),
      },
      meditation: {
        prompt: t(`Débora exerce autoridade profética sem excluir
          Baraque da ação — a liderança bíblica frequentemente aparece
          como parceria, não como protagonismo solitário.`),
        questions: [
          'Você tende a tentar fazer tudo sozinho quando poderia chamar outros para compartilhar a missão?',
          'Quem você poderia "comissionar" hoje para uma tarefa que você tem carregado sozinho?',
          'O que ajudaria você a liderar em parceria, como Débora e Baraque, em vez de isoladamente?',
        ],
      },
    },
    {
      prayer: {
        title: 'A Ti Levanto os Meus Olhos',
        text: t(`Senhor, o salmista descreve uma dependência humilde:
          "assim como os olhos dos servos atentam para a mão do seu
          senhor... assim os nossos olhos atentam para o Senhor nosso
          Deus, até que ele se compadeça de nós." É imagem de espera
          atenta, não de resignação passiva. Ensina-me essa mesma
          atenção constante à tua direção, especialmente nos momentos
          em que me sinto "farto de desprezo" e preciso da tua
          compaixão. Amém.`),
      },
      meditation: {
        prompt: t(`A imagem do servo que observa a mão do senhor
          esperando o próximo sinal descreve atenção ativa, não
          passividade — o servo está pronto para responder no instante
          em que a direção vier.`),
        questions: [
          'Sua espera por Deus se parece mais com atenção ativa ou com passividade desatenta?',
          'Que "desprezo" ou humilhação você tem carregado, precisando trazer diante de Deus como o salmista faz?',
          'Como seria, hoje, "levantar os olhos" com essa mesma atenção constante à direção de Deus?',
        ],
      },
    },
    {
      prayer: {
        title: 'Filhos da Luz',
        text: t(`Senhor, Paulo escreve que "todos vós sois filhos da
          luz e filhos do dia" — não devemos viver como quem dorme na
          escuridão, mas sóbrios, "vestindo-nos da couraça da fé e do
          amor." É identidade que precede qualquer ação: já somos
          filhos da luz, e a partir disso vivemos com vigilância.
          Ajuda-me a viver de acordo com quem já sou em ti. Amém.`),
      },
      meditation: {
        prompt: t(`Paulo fundamenta a exortação à vigilância numa
          identidade já dada ("sois filhos da luz"), não numa conquista
          a ser alcançada — o comportamento flui da identidade.`),
        questions: [
          'Você vive mais tentando "se tornar" filho da luz, ou a partir da certeza de que já é?',
          'O que significa, na prática, "vestir a couraça da fé e do amor" numa situação difícil que você enfrenta agora?',
          'Como a certeza da sua identidade em Cristo muda a forma como você enfrenta a tentação de "dormir" espiritualmente?',
        ],
      },
    },
    {
      prayer: {
        title: 'Um Homem Duro',
        text: t(`Senhor, o servo que escondeu seu talento justificou o
          medo dizendo: "Eu te conhecia, que és um homem duro." A
          percepção distorcida que ele tinha de seu senhor moldou sua
          inação. Examina se a minha própria imagem distorcida de ti —
          como exigente demais, difícil de agradar — tem me
          paralisado de arriscar em fé. Que eu te conheça como
          realmente és: generoso, confiante em mim. Amém.`),
      },
      meditation: {
        prompt: t(`A parábola sugere que a imagem que temos de Deus
          determina diretamente nossa disposição a arriscar em fé —
          uma imagem distorcida de Deus como "duro" produz paralisia,
          não prudência.`),
        questions: [
          'Sua imagem de Deus é mais próxima de "generoso e confiante em você" ou "duro e difícil de agradar"?',
          'Como essa imagem — correta ou distorcida — tem afetado sua disposição a arriscar em obediência?',
          'O que ajudaria você a corrigir uma imagem distorcida de Deus que talvez ainda carregue?',
        ],
      },
    },
    {
      prayer: {
        title: 'Fidelidade e Vigilância',
        text: t(`Senhor, esta semana trouxe a liderança sábia de
          Débora, a espera atenta do salmista, a identidade de filhos
          da luz, e o convite a arriscar com fé, sem a paralisia do
          medo. Termino pedindo: que eu use, como o servo fiel, o que
          me foi confiado sem medo de um Deus que na verdade é
          generoso, e que eu reconheça e compartilhe liderança como
          Débora fez com Baraque. Amém.`),
      },
      meditation: {
        prompt: t(`Da liderança inesperada de Débora à fidelidade
          arriscada do servo bom, a semana compartilhou a mesma raiz:
          confiança em Deus mesmo sem garantias visíveis do resultado
          final.`),
        questions: [
          'Qual dos temas desta semana — a liderança de Débora, a espera atenta, ou o risco do servo fiel — mais te desafiou?',
          'Que "talento" ou responsabilidade você quer arriscar com mais coragem na semana que vem?',
          'Como você quer corrigir, de forma prática, qualquer imagem distorcida de Deus que tenha te paralisado até aqui?',
        ],
      },
    },
  ],

  // Semana Próprio 29 (Cristo Rei) — Ezequiel 34:11-16, 20-24 · Salmo 100 · Efésios 1:15-23 · Mateus 25:31-46
  29: [
    {
      prayer: {
        title: 'A Mim o Fizestes',
        text: t(`Senhor Jesus, no juízo final descrito na parábola,
          identificas-te com quem tem fome, sede, é forasteiro, está
          nu, doente ou preso: "sempre que o fizestes a um destes meus
          irmãos, mesmo dos mais pequeninos, a mim o fizestes." O
          cuidado com o necessitado não é apenas ética social — é
          encontro real contigo, disfarçado nos rostos que preferimos
          evitar. Abre os meus olhos para te reconhecer nessas pessoas
          hoje, e move as minhas mãos a agir. Amém.`),
      },
      meditation: {
        prompt: t(`Nem os "justos" nem os "malditos" na parábola
          percebiam que estavam servindo ou negligenciando o próprio
          Cristo — o serviço genuíno ao próximo não exige consciência
          de estar fazendo algo espiritualmente significativo.`),
        questions: [
          'Você já ajudou alguém sem perceber, na hora, que esse gesto tinha peso maior do que imaginava?',
          'Quem, na sua rotina, representa hoje "um destes pequeninos" que você poderia servir?',
          'O que impede você de agir diante da necessidade alheia: falta de tempo, medo, ou não perceber?',
        ],
      },
    },
    {
      prayer: {
        title: 'Eu Mesmo Procurarei as Minhas Ovelhas',
        text: t(`Senhor Deus, através de Ezequiel prometeste: "Eis que
          eu, eu mesmo, procurarei as minhas ovelhas, e as buscarei...
          a perdida buscarei, e a desgarrada tornarei a trazer."
          Diante de pastores que exploravam em vez de cuidar,
          prometeste vir tu mesmo pastorear. Não me deixaste entregue
          a lideranças falhas — vens pessoalmente buscar quem se
          perdeu. Obrigado por seres o pastor que não terceiriza o
          cuidado por mim. Amém.`),
      },
      meditation: {
        prompt: t(`A ênfase repetida — "eu mesmo" — vem logo depois de
          uma denúncia severa contra pastores humanos que exploravam o
          rebanho (não incluída nesta leitura) — Deus promete cuidado
          pessoal e direto diante da liderança que falhou.`),
        questions: [
          'Você já foi decepcionado por uma liderança humana — religiosa ou não — que deveria cuidar de você e não cuidou?',
          'Como a promessa de que Deus "mesmo" busca a ovelha perdida muda a forma como você encara essa decepção?',
          'Em que área você se sente hoje "perdido" ou "desgarrado", precisando ser buscado por Deus?',
        ],
      },
    },
    {
      prayer: {
        title: 'Julgarei Entre Ovelha e Ovelha',
        text: t(`Senhor, além de buscar as perdidas, prometeste
          julgar "entre a ovelha gorda e a ovelha magra" — confrontando
          quem empurra e escorneia os fracos "até que as espalhais
          para fora." O teu cuidado pastoral inclui justiça, não
          apenas ternura: proteges o vulnerável de quem abusa da
          própria força dentro da comunidade. Examina se tenho, de
          alguma forma, "empurrado" os mais fracos ao meu redor.
          Amém.`),
      },
      meditation: {
        prompt: t(`A imagem de ovelhas "gordas" empurrando as "magras"
          para fora do pasto retrata opressão dentro da própria
          comunidade — Deus não ignora a injustiça interna ao seu
          povo, só porque vem de dentro.`),
        questions: [
          'Existe alguma forma, mesmo sutil, pela qual você tem "empurrado" ou marginalizado os mais vulneráveis ao seu redor?',
          'Como a promessa de que Deus julga "entre ovelha e ovelha" muda sua forma de pensar sobre justiça dentro da comunidade de fé?',
          'Que voz vulnerável você precisa proteger ou defender hoje?',
        ],
      },
    },
    {
      prayer: {
        title: 'Somos Ovelhas do Seu Pasto',
        text: t(`Senhor, o salmo convida: "Servi ao Senhor com
          alegria... sabei que o Senhor é Deus! Foi ele quem nos fez,
          e somos dele; somos o seu povo e ovelhas do seu pasto." No
          fim do ano litúrgico, ao celebrar Cristo Rei, quero renovar
          essa alegria simples: pertenço a ti, sou cuidado por ti.
          Que essa certeza seja motivo de louvor genuíno, não apenas
          declaração teológica distante. Amém.`),
      },
      meditation: {
        prompt: t(`O salmo une identidade ("somos dele") a alegria
          ("servi ao Senhor com alegria") — pertencer a Deus não é
          fardo, mas fundamento de celebração genuína.`),
        questions: [
          'Sua relação com Deus se parece mais com obrigação cumprida ou com alegria genuína de pertencimento?',
          'O que significa para você, hoje, "somos ovelhas do seu pasto" — cuidado, guiado, pertencente?',
          'Como você pode entrar em adoração hoje com a alegria simples que este salmo descreve?',
        ],
      },
    },
    {
      prayer: {
        title: 'A Suprema Grandeza do Seu Poder',
        text: t(`Senhor, Paulo ora para que os olhos do meu coração
          sejam iluminados, "para que saibais qual seja a esperança da
          sua vocação... e qual a suprema grandeza do seu poder para
          conosco." O mesmo poder que ressuscitou Cristo e o colocou
          acima de todo principado está operando em mim. Que eu não
          viva pequeno, esquecido do poder que já habita em quem crê.
          Amém.`),
      },
      meditation: {
        prompt: t(`Paulo não ora por mais informação, mas por
          "iluminação dos olhos do coração" — um tipo de conhecimento
          que é revelação vivida, não apenas dado intelectual.`),
        questions: [
          'Você vive consciente do "poder supremo" que Paulo descreve operando em quem crê, ou vive como se estivesse sozinho na própria força?',
          'O que significaria orar, como Paulo, por olhos do coração iluminados numa área específica da sua vida?',
          'Como a exaltação de Cristo "acima de todo principado e poder" muda a forma como você encara os desafios que parecem grandes demais?',
        ],
      },
    },
    {
      prayer: {
        title: 'Apartai-vos de Mim',
        text: t(`Senhor Jesus, a mesma parábola que celebra quem
          serviu os pequeninos condena, com igual seriedade, quem os
          negligenciou: "Apartai-vos de mim... porque tive fome, e não
          me destes de comer." A negligência não é neutra — tem peso
          moral real. Examina as vezes em que vi necessidade e
          escolhi olhar para o outro lado. Desperta em mim
          sensibilidade ativa, não passividade confortável. Amém.`),
      },
      meditation: {
        prompt: t(`Os "malditos" na parábola não são condenados por
          maldades ativas cometidas, mas por omissão — o pecado de não
          fazer o bem que estava ao alcance deles.`),
        questions: [
          'Existe alguma necessidade que você tem visto repetidamente e escolhido ignorar?',
          'O que essa parábola ensina sobre a seriedade da omissão, não apenas da ação ativamente errada?',
          'Que passo concreto você pode dar esta semana para responder a uma necessidade que tem evitado?',
        ],
      },
    },
    {
      prayer: {
        title: 'Cristo Rei',
        text: t(`Senhor, encerramos hoje o Tempo Comum celebrando a
          tua realeza — não a de um governante distante, mas a do
          Pastor que busca pessoalmente as perdidas, julga com
          justiça, e se identifica com os pequeninos. Ao longo destas
          semanas caminhamos por Gênesis e Êxodo, por profetas e
          juízas, por parábolas de talentos e virgens vigilantes.
          Hoje, diante do teu trono, reconheço: tu és Rei — não pela
          força, mas pelo amor que se faz serviço. Que o novo ano
          litúrgico, que começa com o Advento, me encontre mais
          disposto a servir-te nos pequeninos do que estava há um ano.
          Amém.`),
      },
      meditation: {
        prompt: t(`O ano litúrgico termina não com uma imagem de poder
          triunfante distante, mas com o Rei que se identifica com quem
          tem fome, sede e está preso — a realeza de Cristo se define
          pelo serviço, não pela dominação.`),
        questions: [
          'Olhando para todo o Tempo Comum que passou, que tema você sente que Deus mais trabalhou em você?',
          'O que significa, pessoalmente, chamar Jesus de "Rei" — como isso muda a forma como você organiza sua vida?',
          'Como você quer entrar no Advento que se aproxima, carregando o que aprendeu neste ano litúrgico?',
        ],
      },
    },
  ],
};

export default ordinaryA;
