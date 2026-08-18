/**
 * Epifania — Ciclo A — conteúdo ancorado no RCL (leituras reais),
 * do Batismo do Senhor até a Transfiguração.
 *
 * Mesmo padrão de ordinary-A.ts: cada semana é um array de 7
 * DevotionalEntry, índice = date.getDay(). Chaveado pelo `weekOfSeason`
 * real gerado em generate-rcl-data.ts (2 = Batismo, 3 = 2º Domingo
 * após a Epifania, ..., 8 = 7º Domingo). `transfigurationWeek` cobre
 * o Domingo da Transfiguração, que pode cair em qualquer uma dessas
 * posições dependendo do ano (6 a 9) — por isso é tratado à parte,
 * localizado por nome do dia, não por número da semana (ver
 * generate-devotionals.ts). Escrito em 2026-08-18.
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

// Batismo do Senhor — Isaías 42:1-9 · Salmo 29 · Atos 10:34-43 · Mateus 3:13-17
const week2: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Eis Aqui o Meu Servo, a Quem Sustenho',
      text: t(`Senhor, Isaías descreve o servo escolhido: "eis aqui o
        meu servo, a quem sustenho; o meu escolhido, em quem se
        compraz a minha alma." Antes de qualquer ação, vem a
        identidade — amado, sustentado, escolhido. Que eu viva a
        partir dessa mesma certeza antes de tentar provar meu valor
        através de conquistas. Amém.`),
    },
    meditation: {
      prompt: t(`A descrição do servo começa com identidade e
        relacionamento ("a quem sustenho... em quem se compraz")
        antes de qualquer menção à missão que ele cumprirá — a
        identidade precede a ação.`),
      questions: [
        'Você tende a buscar identidade e valor através de conquistas, ou já parte de uma identidade segura em Deus?',
        'O que significaria viver hoje a partir da certeza de já ser "sustentado" e "escolhido"?',
        'Como essa ordem — identidade antes de missão — desafia sua própria forma de buscar significado?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Cana Trilhada Não a Quebrará',
      text: t(`Senhor, o servo é descrito com ternura extraordinária:
        "a cana trilhada, não a quebrará, nem apagará o pavio que
        fumega." Força genuína que se expressa em cuidado com o
        frágil, não em destruição do fraco. Trata-me com essa mesma
        ternura nas áreas onde me sinto quebrado ou apagando. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem combina poder absoluto (capaz de quebrar e
        apagar) com escolha deliberada de não fazê-lo — a força do
        servo se revela precisamente na gentileza com o frágil, não
        apesar dela.`),
      questions: [
        'Você já experimentou essa gentileza de Deus especificamente numa área frágil da sua vida?',
        'Como essa imagem desafia noções comuns de que força e ternura são opostas?',
        'Quem ao seu redor precisa dessa mesma gentileza sua — "cana trilhada" que você poderia, mas não deve, quebrar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Não Faz Acepção de Pessoas',
      text: t(`Senhor, Pedro declara diante de Cornélio: "Deus não faz
        acepção de pessoas; mas... lhe é aceitável aquele que, em
        qualquer nação, o teme e pratica o que é justo." Uma verdade
        radical para sua época — tua graça nunca esteve limitada por
        fronteiras étnicas. Examina meus próprios preconceitos sobre
        quem "pertence". Amém.`),
    },
    meditation: {
      prompt: t(`Esta declaração de Pedro representa uma virada
        teológica significativa no livro de Atos — o reconhecimento
        explícito de que o evangelho não conhece fronteiras étnicas
        ou nacionais.`),
      questions: [
        'Que categorias de pessoas você, mesmo inconscientemente, trata como "menos aceitáveis" a Deus?',
        'Como a experiência de Pedro — precisando de uma revelação direta para superar seu preconceito — desafia seus próprios pontos cegos?',
        'O que significaria viver hoje com a convicção genuína de que Deus "não faz acepção de pessoas"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Convém Cumprir Toda a Justiça',
      text: t(`Senhor Jesus, quando João hesitou em batizar-te,
        respondeste: "consente agora; porque assim nos convém cumprir
        toda a justiça." Submeteste-te a um batismo que não
        precisavas, por solidariedade com a humanidade pecadora que
        vieste salvar. Ensina-me essa mesma disposição de me
        identificar com quem preciso servir. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não precisava do batismo de arrependimento —
        ele era sem pecado — mas escolhe se submeter a ele mesmo
        assim, identificando-se completamente com a humanidade que
        veio redimir.`),
      questions: [
        'Você já se identificou voluntariamente com uma situação ou grupo que não "precisava" enfrentar, por solidariedade genuína?',
        'O que significa "cumprir toda a justiça" através de identificação, não de distanciamento superior?',
        'Como o exemplo de Jesus desafia qualquer tentação sua de se manter acima ou distante de quem precisa ajudar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Este É o Meu Filho Amado',
      text: t(`Senhor, no momento do batismo, uma voz dos céus
        declarou: "este é o meu Filho amado, em quem me comprazo."
        Essa afirmação veio ANTES de qualquer milagre ou ensino
        público de Jesus — puro amor do Pai, não recompensa por
        desempenho. Que eu ouça essa mesma declaração sobre mim,
        antes de qualquer conquista minha. Amém.`),
    },
    meditation: {
      prompt: t(`A declaração do Pai acontece no início do
        ministério de Jesus, antes de qualquer milagre público —
        amor e aprovação que precedem, não seguem, a ação.`),
      questions: [
        'Você vive mais a partir da certeza de já ser amado, ou da necessidade de conquistar aprovação através de desempenho?',
        'Como seria viver hoje já ouvindo essa mesma declaração — "amado, em quem me comprazo" — antes de qualquer conquista?',
        'O que mudaria nas suas decisões se você não precisasse mais provar seu valor?',
      ],
    },
  },
  {
    prayer: {
      title: 'Viu o Espírito Santo de Deus Descendo',
      text: t(`Senhor, no batismo, "se lhe abriram os céus, e viu o
        Espírito Santo de Deus descendo como uma pomba." Trindade
        completa presente num só momento — Pai falando, Filho
        batizado, Espírito descendo. Que eu reconheça essa mesma
        presença trina ativa na minha própria vida hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A cena do batismo é uma das raras manifestações
        simultâneas e visíveis das três pessoas da Trindade em
        atividade — um momento teologicamente denso, não apenas um
        rito simbólico.`),
      questions: [
        'Você reconhece a presença ativa e simultânea de Pai, Filho e Espírito na sua própria experiência de fé?',
        'Como essa cena rica muda sua compreensão do seu próprio batismo, se você já foi batizado?',
        'O que significaria buscar essa mesma abertura dos céus, essa mesma proximidade, na sua oração hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Todo o Que Nele Crê Receberá a Remissão',
      text: t(`Senhor, encerramos esta semana com a conclusão de
        Pedro: "todo o que nele crê receberá a remissão dos pecados
        pelo seu nome." Uma promessa simples e universal — não
        limitada por mérito, nação ou história. Que eu descanse hoje
        nessa certeza simples de perdão pleno através da fé. Amém.`),
    },
    meditation: {
      prompt: t(`A conclusão do sermão de Pedro é deliberadamente
        simples e universal — "todo o que nele crê" — sem
        qualificações adicionais de mérito, origem ou desempenho.`),
      questions: [
        'Esta semana — da identidade do servo à declaração do Pai sobre Jesus — o que te ensinou sobre identidade e graça recebidas antes de qualquer mérito?',
        'Você vive com a certeza plena dessa "remissão" completa, ou ainda carrega culpa não resolvida?',
        'O que significaria começar a próxima semana já descansando nessa promessa simples e completa?',
      ],
    },
  },
];

// 2º Domingo após a Epifania — Isaías 49:1-7 · Salmo 40:1-11 · 1 Coríntios 1:1-9 · João 1:29-42
const week3: DevotionalEntry[] = [
  {
    prayer: {
      title: 'O Senhor Chamou-me Desde o Ventre',
      text: t(`Senhor, o servo declara: "o Senhor chamou-me desde o
        ventre, desde as entranhas de minha mãe fez menção do meu
        nome." Meu chamado, como o dele, não começou quando percebi —
        estava presente desde antes do meu nascimento. Que eu viva a
        partir dessa identidade antiga, não de uma recém-descoberta.
        Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem de chamado "desde o ventre" aparece
        repetidamente nas Escrituras (Jeremias, Paulo) — um padrão que
        sugere que os propósitos de Deus para uma pessoa antecedem
        sua própria consciência deles.`),
      questions: [
        'Como a ideia de um chamado que existia antes do seu nascimento muda sua percepção do seu próprio propósito?',
        'Você vive mais a partir de um chamado "descoberto recentemente" ou de um reconhecido como sempre presente?',
        'O que significaria confiar que Deus já tinha um propósito para você antes de qualquer decisão sua?',
      ],
    },
  },
  {
    prayer: {
      title: 'Debalde Tenho Trabalhado',
      text: t(`Senhor, mesmo o servo fiel confessa desânimo: "debalde
        tenho trabalhado, inútil e vãmente gastei as minhas forças."
        A sensação de esforço improdutivo não é sinal de falta de fé
        — até os mais chamados a experimentam. Recebe minha própria
        frustração com meu trabalho aparentemente sem fruto. Amém.`),
    },
    meditation: {
      prompt: t(`A confissão de fadiga e aparente inutilidade vem de
        alguém explicitamente chamado por Deus "desde o ventre" —
        chamado genuíno não isenta ninguém de temporadas de desânimo
        legítimo.`),
      questions: [
        'Você já sentiu que seu trabalho ou esforço, mesmo genuinamente chamado por Deus, parecia "vão"?',
        'Como a honestidade do servo sobre esse desânimo te dá permissão para expressar o mesmo?',
        'O que sustenta você continuar, mesmo quando o fruto do seu trabalho não é visível ainda?',
      ],
    },
  },
  {
    prayer: {
      title: 'Também Te Porei para Luz das Nações',
      text: t(`Senhor, apesar do desânimo do servo, expandes seu
        chamado: "pouco é que sejas o meu servo... também te porei
        para luz das nações." O que parecia missão limitada se torna
        alcance universal. Confia que meu próprio pequeno serviço
        pode ter impacto além do que imagino. Amém.`),
    },
    meditation: {
      prompt: t(`Deus responde ao desânimo do servo não com consolo
        genérico, mas com ampliação da missão — de restaurar apenas
        Israel para ser "luz das nações", um chamado ainda maior em
        meio ao desânimo.`),
      questions: [
        'Você já recebeu, num momento de desânimo, um chamado ou visão maior do que esperava?',
        'Como isso desafia a ideia de que desânimo significa fim ou redução do propósito?',
        'Que "luz para as nações" seu pequeno serviço fiel poderia representar, mesmo sem você perceber ainda?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nenhum Dom Vos Falta',
      text: t(`Senhor, Paulo assegura aos coríntios: "nenhum dom vos
        falta, enquanto aguardais a manifestação de nosso Senhor
        Jesus Cristo." Já tenho o que preciso para viver fielmente
        nesta estação de espera. Ajuda-me a reconhecer e usar esses
        dons, em vez de focar no que sinto que falta. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo garante suficiência presente mesmo em meio à
        espera por algo futuro — a plenitude não é adiada até a
        segunda vinda, mas já concedida agora.`),
      questions: [
        'Você tende a focar mais no que sente que falta ou nos dons que já possui?',
        'Que dom específico você reconhece em si mesmo que talvez esteja subutilizando?',
        'Como viver com essa confiança de suficiência presente muda sua ansiedade sobre o futuro?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eis o Cordeiro de Deus',
      text: t(`Senhor Jesus, João Batista declarou ao te ver: "eis o
        Cordeiro de Deus, que tira o pecado do mundo." Um título que
        aponta diretamente para tua missão sacrificial, mesmo antes
        de qualquer ensino público teu. Que eu reconheça essa mesma
        identidade sacrificial em cada área da minha relação
        contigo. Amém.`),
    },
    meditation: {
      prompt: t(`O título "Cordeiro de Deus" evoca diretamente a
        tradição sacrificial judaica — João identifica Jesus com essa
        linguagem antes mesmo de qualquer milagre ou discurso
        público.`),
      questions: [
        'O que significa, pessoalmente, que Jesus "tira o pecado do mundo" — não apenas ensina sobre ele, mas o remove?',
        'Como o título de "Cordeiro" — sacrificial, não apenas de poder — molda sua imagem de quem Jesus é?',
        'Você reconhece Jesus primeiro como sacrifício por você, ou primeiro como exemplo moral a seguir?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vinde, e Vereis',
      text: t(`Senhor Jesus, quando dois discípulos perguntaram onde
        moravas, respondeste simplesmente: "vinde, e vereis." Não
        explicação teórica, mas convite à experiência direta. Que eu
        aceite esse mesmo convite hoje — não apenas aprender sobre ti,
        mas experimentar tua presença diretamente. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não oferece uma explicação verbal sobre onde
        mora — ele convida à experiência direta e pessoal, "vinde e
        vereis", um padrão que sugere que conhecê-lo exige
        proximidade real, não apenas informação.`),
      questions: [
        'Sua relação com Jesus é mais baseada em informação sobre ele ou em experiência direta e pessoal?',
        'O que significaria aceitar hoje esse convite — "vinde e vereis" — em vez de permanecer apenas na teoria?',
        'Que passo concreto de proximidade você poderia dar esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Havemos Achado o Messias',
      text: t(`Senhor, encerramos a semana com André correndo para
        contar a Simão: "havemos achado o Messias." A primeira
        resposta ao encontro genuíno com Jesus foi compartilhar com
        alguém próximo, sem demora. Que meu próprio encontro contigo
        produza esse mesmo impulso de compartilhar. Amém.`),
    },
    meditation: {
      prompt: t(`André não guarda a descoberta para si — sua primeira
        ação é buscar seu irmão para compartilhar, um padrão que se
        repete ao longo do evangelho de João como resposta natural a
        um encontro genuíno com Jesus.`),
      questions: [
        'Esta semana — do chamado desde o ventre ao convite "vinde e vereis" — o que te ensinou sobre identidade e proximidade com Deus?',
        'Quem é o seu "Simão" — alguém próximo com quem você poderia compartilhar sua própria experiência de fé?',
        'O que impede você de compartilhar, com a mesma urgência de André, o que já experimentou de Deus?',
      ],
    },
  },
];

// 3º Domingo após a Epifania — Isaías 9:1-4 · Salmo 27:1, 4-9 · 1 Coríntios 1:10-18 · Mateus 4:12-23
const week4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'O Povo Que Andava em Trevas Viu uma Grande Luz',
      text: t(`Senhor, Isaías profetiza: "o povo que andava em trevas
        viu uma grande luz." Não um povo que buscava ativamente —
        simplesmente "viu", recebendo o que não procurava com esse
        nome específico. Que eu esteja atento o suficiente para
        reconhecer tua luz, mesmo quando não a busco deliberadamente.
        Amém.`),
    },
    meditation: {
      prompt: t(`A profecia descreve receptores passivos da luz —
        "viu", não "encontrou" — sugerindo que a revelação de Deus
        muitas vezes surpreende, mais do que resulta de busca
        sistemática.`),
      questions: [
        'Você já recebeu uma revelação ou clareza de Deus que não estava buscando ativamente naquele momento?',
        'Como equilibrar busca ativa por Deus com abertura para revelações inesperadas?',
        'Que "trevas" você reconhece hoje que precisam dessa luz surpreendente?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Senhor É a Minha Luz e a Minha Salvação',
      text: t(`Senhor, o salmista declara: "o Senhor é a minha luz e
        a minha salvação; a quem temerei?" A presença de Deus dissolve
        medo não porque as circunstâncias mudem, mas porque a fonte
        de segurança muda. Que essa mesma confiança dissolva meus
        próprios medos hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta retórica — "a quem temerei?" — não nega
        a existência de ameaças reais, mas afirma que nenhuma delas
        supera a segurança encontrada na presença de Deus.`),
      questions: [
        'Que medo específico você enfrenta hoje que precisa ser colocado diante dessa pergunta retórica?',
        'Sua segurança depende mais de circunstâncias favoráveis ou da presença constante de Deus?',
        'O que significaria viver hoje com essa confiança que dissolve medo, não que nega perigo real?',
      ],
    },
  },
  {
    prayer: {
      title: 'Uma Coisa Pedi ao Senhor',
      text: t(`Senhor, o salmista foca seu desejo mais profundo: "uma
        coisa pedi ao Senhor, e a buscarei: que possa morar na casa do
        Senhor todos os dias da minha vida." Diante de tantos pedidos
        possíveis, ele escolhe presença contínua acima de tudo. Ajuda-
        me a simplificar meus próprios desejos até esse núcleo. Amém.`),
    },
    meditation: {
      prompt: t(`Em meio a um salmo que reconhece adversários reais e
        perigo genuíno, o pedido central do salmista não é livramento
        das circunstâncias, mas proximidade contínua com Deus.`),
      questions: [
        'Se pudesse fazer apenas "uma coisa" pedida a Deus, seria proximidade contínua com ele, ou outra coisa?',
        'O que revela sobre suas prioridades reais a lista de coisas que você mais pede a Deus?',
        'Como simplificar seus desejos até esse núcleo de presença contínua, sem negar necessidades reais?',
      ],
    },
  },
  {
    prayer: {
      title: 'Que Não Haja Dissensões Entre Vós',
      text: t(`Senhor, Paulo roga aos coríntios "que sejais concordes
        no falar, e que não haja dissensões entre vós" — repreendendo
        divisões formadas em torno de lideranças humanas ("eu sou de
        Paulo... eu de Apolo"). Examina minhas próprias lealdades
        divisórias dentro da comunidade de fé. Amém.`),
    },
    meditation: {
      prompt: t(`As divisões em Corinto se formaram em torno de
        personalidades de líderes específicos — um padrão que se
        repete hoje quando lealdade a figuras humanas substitui
        unidade centrada em Cristo.`),
      questions: [
        'Você já formou lealdade divisória em torno de um líder ou personalidade específica, à custa da unidade maior?',
        'Como Paulo redireciona a questão — "foi Paulo crucificado por amor de vós?" — desafia esse tipo de divisão?',
        'Que "eu sou de..." você precisa examinar na sua própria comunidade de fé?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vinde Após Mim',
      text: t(`Senhor Jesus, ao ver Simão e André pescando, disseste
        simplesmente: "vinde após mim, e eu vos farei pescadores de
        homens." Um convite direto, sem explicação extensa. "Eles,
        pois, deixando imediatamente as redes, o seguiram." Que minha
        própria resposta ao teu chamado seja tão imediata. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta dos primeiros discípulos é notavelmente
        imediata — "logo" — sem negociação, sem pedido de mais
        detalhes, sem tempo de reflexão prolongada.`),
      questions: [
        'Você tende a responder rapidamente a convites claros de Jesus, ou precisa de tempo extenso de deliberação?',
        'O que os discípulos "deixaram imediatamente" — e o que isso custou a eles concretamente?',
        'Que chamado você reconhece, mas ainda está adiando responder com essa mesma prontidão?',
      ],
    },
  },
  {
    prayer: {
      title: 'Percorria Jesus Toda a Galiléia',
      text: t(`Senhor Jesus, teu ministério não ficou parado num só
        lugar: "percorria Jesus toda a Galiléia, ensinando... pregando
        o evangelho... e curando." Movimento constante, alcance amplo.
        Que meu próprio serviço não se acomode num único lugar
        confortável quando há mais território a alcançar. Amém.`),
    },
    meditation: {
      prompt: t(`O texto enfatiza movimento contínuo e abrangente —
        "toda a Galiléia" — um padrão itinerante que caracterizaria
        todo o ministério terreno de Jesus, nunca estabelecido num
        único local fixo.`),
      questions: [
        'Você tende a acomodar seu serviço a Deus num único lugar confortável, evitando expandir o alcance?',
        'Que "território" além do seu espaço habitual você poderia alcançar com o mesmo evangelho que já vive?',
        'O que sustentaria esse tipo de movimento contínuo sem esgotamento?',
      ],
    },
  },
  {
    prayer: {
      title: 'Curando Todas as Doenças e Enfermidades',
      text: t(`Senhor, encerramos esta semana com o resumo do teu
        ministério: "ensinando... pregando... curando todas as
        doenças e enfermidades entre o povo." Palavra e ação sempre
        unidas — nunca apenas discurso sem cuidado prático. Que meu
        próprio serviço também combine anúncio e cuidado concreto.
        Amém.`),
    },
    meditation: {
      prompt: t(`O ministério de Jesus é resumido em três verbos
        complementares — ensinar, pregar, curar — nunca isolados um
        do outro, modelando um evangelho que é palavra e ação
        simultaneamente.`),
      questions: [
        'Esta semana — da luz recebida por quem não buscava ao ministério completo de Jesus — o que te ensinou sobre unir palavra e ação?',
        'Seu próprio testemunho tende a ser mais palavra ou mais ação prática? Como unir os dois?',
        'Que "cura" prática — não apenas ensino — você poderia oferecer a alguém esta semana?',
      ],
    },
  },
];

// 4º Domingo após a Epifania — Miquéias 6:1-8 · Salmo 15 · 1 Coríntios 1:18-31 · Mateus 5:1-12
const week5: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Ó Povo Meu, Que É Que Te Tenho Feito?',
      text: t(`Senhor, Miquéias registra tua pergunta dolorida: "ó
        povo meu, que é que te tenho feito? e em que te enfadei?"
        Antes de qualquer acusação, há genuína mágoa diante do
        afastamento do teu povo. Examina se já causei essa mesma
        mágoa a ti através do meu próprio afastamento. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta de Deus não é retórica de raiva, mas
        genuína mágoa relacional — ele lista, em seguida, tudo o que
        fez pelo povo (libertação do Egito, liderança fiel), tornando
        o afastamento ainda mais doloroso.`),
      questions: [
        'Você já considerou que seu próprio afastamento de Deus poderia genuinamente magoá-lo, não apenas violar uma regra?',
        'Que "o que te tenho feito" — lista de fidelidade passada de Deus — você poderia recordar hoje?',
        'Como essa pergunta dolorida, não raivosa, muda sua forma de considerar seu próprio relacionamento com Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Com Que Me Apresentarei Diante do Senhor?',
      text: t(`Senhor, o povo pergunta desesperadamente que sacrifício
        seria suficiente: "apresentar-me-ei diante dele com
        holocausto?... darei o meu primogênito?" Uma escalada de
        oferta cada vez mais extrema, buscando o "suficiente".
        Livra-me dessa lógica de barganha religiosa. Amém.`),
    },
    meditation: {
      prompt: t(`A escalada de perguntas — de bezerros a "milhares de
        carneiros" até o primogênito — revela uma lógica de barganha
        religiosa que a resposta final de Deus rejeita completamente.`),
      questions: [
        'Você já operou com essa lógica de "quanto é suficiente" para agradar a Deus através de sacrifício ou esforço?',
        'O que essa escalada desesperada revela sobre tentar comprar aprovação divina?',
        'Como a resposta simples de Deus — justiça, benevolência, humildade — desafia essa lógica de barganha?',
      ],
    },
  },
  {
    prayer: {
      title: 'Praticar a Justiça, Amar a Benevolência, Andar Humildemente',
      text: t(`Senhor, a resposta final e simples: "que pratiques a
        justiça, e ames a benevolência, e andes humildemente com o
        teu Deus." Não sacrifício extremo, mas caráter vivido
        diariamente. Que essas três coisas simples orientem minhas
        decisões hoje. Amém.`),
    },
    meditation: {
      prompt: t(`Contra toda a escalada de sacrifícios extremos
        propostos, a resposta de Deus é surpreendentemente simples e
        acessível — três práticas de caráter, não rituais extremos ou
        onerosos.`),
      questions: [
        'Das três práticas — justiça, benevolência, humildade — qual você sente mais desenvolvida e qual mais frágil em você?',
        'Como essa simplicidade desafia qualquer tendência sua de tornar a fé mais complicada do que precisa ser?',
        'O que significaria, concretamente hoje, "andar humildemente" com Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Escolheu as Coisas Loucas do Mundo',
      text: t(`Senhor, Paulo declara: "Deus escolheu as coisas loucas
        do mundo para confundir os sábios... as coisas fracas... para
        confundir as fortes." Tua economia inverte constantemente as
        expectativas humanas de valor e poder. Que eu não menospreze o
        que parece fraco ou tolo aos olhos do mundo. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo descreve uma inversão sistemática e
        deliberada — Deus não apenas usa os fracos ocasionalmente, ele
        os "escolhe" especificamente, como estratégia central de como
        opera no mundo.`),
      questions: [
        'Você já subestimou algo ou alguém por parecer "fraco" ou "louco" aos padrões convencionais de sucesso?',
        'Como essa inversão deliberada de Deus desafia sua própria escala de valores sobre o que é importante ou poderoso?',
        'Onde você reconhece sua própria "fraqueza" que Deus poderia estar escolhendo usar precisamente por isso?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bem-Aventurados os Humildes de Espírito',
      text: t(`Senhor Jesus, as Bem-Aventuranças começam invertendo
        expectativas: "bem-aventurados os humildes de espírito,
        porque deles é o reino dos céus." Não os fortes, os
        realizados, os autossuficientes — os humildes, os que choram,
        os mansos. Examina onde busco bem-aventurança pelos caminhos
        errados. Amém.`),
    },
    meditation: {
      prompt: t(`Cada bem-aventurança nomeia uma condição que o mundo
        normalmente consideraria desvantagem — pobreza espiritual,
        luto, mansidão — e a declara, paradoxalmente, como caminho
        para bênção genuína.`),
      questions: [
        'Qual das bem-aventuranças mais desafia sua definição atual de sucesso ou felicidade?',
        'Você busca bem-aventurança através de força e realização, ou está aberto a essa via alternativa que Jesus descreve?',
        'Que condição sua atual — talvez vista como desvantagem — Jesus poderia estar chamando de bendita?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bem-Aventurados os Pacificadores',
      text: t(`Senhor, disseste: "bem-aventurados os pacificadores,
        porque eles serão chamados filhos de Deus." Não apenas quem
        evita conflito, mas quem trabalha ativamente pela
        reconciliação. Que eu busque ser essa presença pacificadora,
        ativa, nas relações fraturadas ao meu redor. Amém.`),
    },
    meditation: {
      prompt: t(`"Pacificador" no grego original sugere ação ativa
        de fazer paz, não passividade de simplesmente evitar
        confronto — um trabalho deliberado de reconciliação, associado
        diretamente à identidade filial com Deus.`),
      questions: [
        'Você tende a "evitar conflito" passivamente ou a "fazer paz" ativamente onde há fratura?',
        'Que relação fraturada ao seu redor precisa da sua ação pacificadora concreta?',
        'Como essa bem-aventurança conecta diretamente a prática de pacificar com a identidade de "filho de Deus"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Alegrai-vos e Exultai',
      text: t(`Senhor, encerramos esta semana com tua instrução
        diante da perseguição: "alegrai-vos e exultai, porque é
        grande o vosso galardão nos céus." Uma resposta que
        surpreende — alegria diante da injustiça sofrida por tua
        causa. Sustenta-me com essa mesma perspectiva eterna diante de
        qualquer dificuldade por seguir-te. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução de alegria diante da perseguição não
        nega a dor real dela — ela a contextualiza dentro de uma
        recompensa eterna maior, um padrão de esperança que atravessa
        toda a Bíblia.`),
      questions: [
        'Esta semana — da pergunta dolorida de Miquéias às Bem-Aventuranças invertidas — o que te ensinou sobre onde Deus encontra valor genuíno?',
        'Você já enfrentou dificuldade por causa da sua fé, e como reagiu — com amargura ou com essa perspectiva eterna?',
        'O que significaria viver esta próxima semana com esse tipo de alegria que não depende de circunstâncias favoráveis?',
      ],
    },
  },
];

// 5º Domingo após a Epifania — Isaías 58:1-9a · Salmo 112:1-9 · 1 Coríntios 2:1-12 · Mateus 5:13-20
const week6: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Temos Nós Jejuado?',
      text: t(`Senhor, através de Isaías, o povo reclama: "por que
        temos nós jejuado, e tu não atentas para isso?" — sem
        perceber que seu jejum era vazio, coexistindo com opressão dos
        outros. Examina minha própria religiosidade — ela é genuína
        ou apenas performance que ignora injustiça ao redor? Amém.`),
    },
    meditation: {
      prompt: t(`A queixa do povo revela expectativa transacional —
        "fizemos nossa parte religiosa, por que Deus não responde?" —
        sem reconhecer que a prática religiosa coexistia com injustiça
        social ativa.`),
      questions: [
        'Você já esperou resposta de Deus a uma prática religiosa, sem examinar se ela coexistia com injustiça em outras áreas?',
        'Como distinguir jejum ou disciplina espiritual genuína daquela que é apenas performance vazia?',
        'Que "opressão" ao seu redor sua própria prática religiosa talvez esteja ignorando?',
      ],
    },
  },
  {
    prayer: {
      title: 'Que Soltes as Ligaduras da Impiedade',
      text: t(`Senhor, defines o verdadeiro jejum: "que soltes as
        ligaduras da impiedade... e que deixes ir livres os
        oprimidos." Prática espiritual genuína sempre se conecta com
        libertação concreta de outros. Que minha disciplina espiritual
        produza esse mesmo fruto de libertação prática. Amém.`),
    },
    meditation: {
      prompt: t(`A redefinição de jejum verdadeiro é radicalmente
        social e prática — não sobre privação pessoal isolada, mas
        sobre ação concreta de libertação para outros oprimidos.`),
      questions: [
        'Sua disciplina espiritual (jejum, oração, estudo) já produziu ação concreta de libertação para outra pessoa?',
        'Que "ligaduras" você poderia ajudar a soltar em alguém ao seu redor esta semana?',
        'Como reconectar prática espiritual pessoal com impacto social concreto?',
      ],
    },
  },
  {
    prayer: {
      title: 'Repartas o Teu Pão com o Faminto',
      text: t(`Senhor, continuas a definição: "que repartas o teu pão
        com o faminto, e recolhas em casa os pobres desamparados."
        Generosidade concreta e hospitalidade real, não apenas
        caridade distante. Examina minha própria disposição de
        acolher, não apenas doar de longe. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução vai além de doação impessoal — "recolhas
        em casa" sugere proximidade e hospitalidade real, não apenas
        transferência de recursos à distância.`),
      questions: [
        'Sua generosidade tende a ser mais impessoal (doações distantes) ou envolve proximidade real com quem precisa?',
        'O que significaria "recolher em casa" — hospitalidade genuína, não apenas caridade distante — nesta semana?',
        'Quem você poderia acolher mais de perto, não apenas ajudar de longe?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Fui com Sublimidade de Palavras',
      text: t(`Senhor, Paulo confessa: "não fui com sublimidade de
        palavras ou de sabedoria... estive convosco em fraqueza, e em
        temor, e em grande tremor." Sua eficácia não veio de
        eloquência impressionante, mas de dependência genuína do teu
        poder. Livra-me de confiar na minha própria performance
        impressionante. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo rejeita deliberadamente qualquer sugestão de
        que seu ministério dependia de habilidade retórica pessoal —
        ele credita tudo ao "poder de Deus", não à sua própria
        eloquência.`),
      questions: [
        'Você já confiou mais na sua própria "sublimidade" (habilidade, eloquência, competência) do que no poder de Deus?',
        'O que significaria abraçar fraqueza e temor genuínos, confiando que o poder vem de outra fonte?',
        'Como a honestidade de Paulo sobre sua própria fragilidade te dá permissão para a sua?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vós Sois o Sal da Terra',
      text: t(`Senhor Jesus, disseste: "vós sois o sal da terra; mas
        se o sal se tornar insípido, com que se há de restaurar-lhe o
        sabor?" Uma identidade dada, com responsabilidade de
        preservá-la ativa. Que eu não perca meu "sabor" distintivo por
        acomodação ao ambiente ao redor. Amém.`),
    },
    meditation: {
      prompt: t(`A metáfora do sal combina identidade dada ("vós
        sois") com advertência real sobre perdê-la — não é status
        automático e permanente, mas identidade que precisa ser
        vivida ativamente.`),
      questions: [
        'Onde você sente que seu "sal" — sua distinção como seguidor de Cristo — está se tornando insípido por acomodação?',
        'O que ajudaria você a preservar esse sabor distintivo em ambientes que pressionam por conformidade?',
        'Como o sal "serve" apenas quando misturado com o que precisa temperar — como isso desafia isolamento excessivo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vós Sois a Luz do Mundo',
      text: t(`Senhor, continuas: "vós sois a luz do mundo... assim
        resplandeça a vossa luz diante dos homens, para que...
        glorifiquem a vosso Pai." O propósito da luz visível não é
        autopromoção, mas apontar para ti. Que minhas boas obras
        sempre glorifiquem a ti, não a mim mesmo. Amém.`),
    },
    meditation: {
      prompt: t(`O propósito explícito da luz visível não é
        reconhecimento pessoal — "para que... glorifiquem a vosso
        Pai" — a visibilidade serve para apontar além de si mesma.`),
      questions: [
        'Suas boas obras visíveis tendem mais a glorificar você mesmo ou a apontar genuinamente para Deus?',
        'Como brilhar "diante dos homens" sem cair em ostentação ou busca de reconhecimento próprio?',
        'Que boa obra você poderia fazer esta semana com o propósito explícito de glorificar a Deus, não a si mesmo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Vim Destruir, Mas Cumprir',
      text: t(`Senhor, encerramos a semana com tua declaração: "não
        penseis que vim destruir a lei ou os profetas; não vim
        destruir, mas cumprir." Tua obra não anula o que veio antes —
        ela o completa e realiza plenamente. Que eu veja continuidade,
        não ruptura, entre tudo que já revelaste. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus se posiciona deliberadamente em continuidade
        com a revelação anterior, não em oposição a ela — cumprimento,
        não abolição, uma distinção teológica importante para
        entender sua missão completa.`),
      questions: [
        'Esta semana — do jejum verdadeiro de Isaías ao sal e luz de Jesus — o que te ensinou sobre a conexão entre fé genuína e ação concreta?',
        'Você vê sua própria fé como continuidade de tudo que Deus já revelou, ou como ruptura com o passado?',
        'O que você quer levar desta semana para continuar "cumprindo", não apenas observando, o que já conhece de Deus?',
      ],
    },
  },
];

// 6º Domingo após a Epifania — Deuteronômio 30:15-20 · Salmo 119:1-8 · 1 Coríntios 3:1-9 · Mateus 5:21-37
const week7: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Pus Diante de Ti a Vida e o Bem',
      text: t(`Senhor, Moisés declara ao povo: "vê que hoje te pus
        diante de ti a vida e o bem, a morte e o mal." Uma escolha
        real, com consequências reais, apresentada com total
        clareza. Que eu não finja não ver as escolhas que estão diante
        de mim hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A apresentação é deliberadamente binária e clara —
        não há ambiguidade nas opções, apenas na disposição humana de
        reconhecê-las honestamente e escolher.`),
      questions: [
        'Que escolha clara entre "vida" e "morte" — bem-estar espiritual e seu oposto — você tem evitado reconhecer honestamente?',
        'Por que às vezes preferimos ambiguidade a clareza sobre nossas próprias escolhas?',
        'O que significaria hoje escolher deliberadamente "a vida", com a mesma clareza apresentada aqui?',
      ],
    },
  },
  {
    prayer: {
      title: 'Escolhe, Pois, a Vida',
      text: t(`Senhor, a instrução final é direta: "escolhe, pois, a
        vida, para que vivas, tu e a tua descendência." Não apenas
        para mim, mas para gerações futuras que minha escolha afeta.
        Que eu leve a sério esse peso ao decidir hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A escolha não afeta apenas o indivíduo — "tu e a
        tua descendência" — reconhecendo que decisões espirituais
        pessoais têm impacto que se estende além de nós mesmos.`),
      questions: [
        'Como a consciência de que suas escolhas afetam gerações futuras muda o peso que você dá a elas?',
        'Que legado espiritual você está, ativamente, construindo ou negligenciando através das suas escolhas diárias?',
        'O que significaria "escolher a vida" hoje, pensando além de si mesmo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bem-Aventurados os Que Trilham com Integridade',
      text: t(`Senhor, o salmista declara: "bem-aventurados os que
        trilham com integridade o seu caminho." Não perfeição, mas
        integridade — coerência entre o que professo e como vivo. Que
        eu busque essa integridade genuína, não apenas aparência
        externa de retidão. Amém.`),
    },
    meditation: {
      prompt: t(`"Integridade" sugere coerência interna — não vida
        sem falhas, mas vida sem duplicidade entre convicção
        professada e prática real.`),
      questions: [
        'Existe alguma área da sua vida onde há discrepância entre o que você professa acreditar e como realmente vive?',
        'Como distinguir busca genuína de integridade de perfeccionismo impossível?',
        'Que passo concreto aproximaria sua vida prática das suas convicções professadas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Como a Criancinhas em Cristo',
      text: t(`Senhor, Paulo repreende os coríntios: "não vos pude
        falar como a espirituais, mas como a carnais, como a
        criancinhas em Cristo." Havia contendas e divisões impedindo
        crescimento espiritual maduro. Examina onde minhas próprias
        divisões e rivalidades me mantêm imaturo espiritualmente.
        Amém.`),
    },
    meditation: {
      prompt: t(`Paulo identifica especificamente "inveja e
        contendas" como sinais de imaturidade espiritual — não falta
        de conhecimento teológico, mas presença de rivalidade e
        divisão relacional.`),
      questions: [
        'Você já confundiu conhecimento teológico acumulado com maturidade espiritual genuína, apesar de rivalidades não resolvidas?',
        'Que "contenda" ou inveja específica revela imaturidade espiritual em você atualmente?',
        'O que significaria crescer além dessa imaturidade, não através de mais conhecimento, mas de reconciliação real?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vai Conciliar-te Primeiro com Teu Irmão',
      text: t(`Senhor Jesus, ensinaste: "se estiveres apresentando a
        tua oferta no altar, e aí te lembrares de que teu irmão tem
        alguma coisa contra ti... vai conciliar-te primeiro com teu
        irmão." Reconciliação humana precede adoração aceitável.
        Examina que relações fraturadas preciso resolver antes de
        minha próxima oferta a ti. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus interrompe deliberadamente o próprio ato de
        adoração — "deixa ali diante do altar a tua oferta" — para
        priorizar reconciliação humana como pré-requisito de adoração
        genuína.`),
      questions: [
        'Existe alguma relação fraturada que você tem evitado resolver, mesmo continuando suas práticas religiosas normalmente?',
        'Como essa instrução desafia a ideia de que adoração e relacionamentos humanos são áreas separadas?',
        'Que reconciliação específica você precisa buscar antes da sua próxima oferta genuína a Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Seja, Porém, o Vosso Falar: Sim, Sim; Não, Não',
      text: t(`Senhor, ensinaste sobre juramentos: "seja, porém, o
        vosso falar: Sim, sim; não, não; pois o que passa daí, vem do
        Maligno." Integridade tão completa que juramentos elaborados
        se tornam desnecessários. Que minha palavra simples seja
        sempre confiável, sem necessidade de reforço. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução aponta para um nível de integridade tão
        alto que a própria necessidade de juramentos elaborados
        revelaria já uma quebra de confiança básica na palavra
        simples.`),
      questions: [
        'Sua palavra simples é confiável o suficiente para dispensar reforços, promessas elaboradas ou juramentos?',
        'Onde você já sentiu necessidade de "jurar" algo porque sua palavra simples não era suficientemente confiável?',
        'O que significaria cultivar esse tipo de integridade tão consistente que dispensasse qualquer reforço adicional?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Deu o Crescimento',
      text: t(`Senhor, encerramos esta semana com a conclusão de
        Paulo: "eu plantei; Apolo regou; mas Deus deu o crescimento...
        vós sois lavoura de Deus." Nenhum trabalhador humano, por mais
        dedicado, produz o crescimento real — só tu podes. Que eu
        trabalhe fielmente, mas sem tomar crédito que só a ti
        pertence. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo distribui crédito cuidadosamente — plantar e
        regar são ações humanas reais e necessárias, mas o
        "crescimento" em si permanece exclusivamente obra de Deus,
        além do controle humano.`),
      questions: [
        'Esta semana — da escolha clara de Moisés à reconciliação exigida por Jesus — o que te ensinou sobre integridade e dependência de Deus?',
        'Você já tomou crédito, mesmo que sutilmente, por um "crescimento" espiritual que na verdade só Deus poderia produzir?',
        'O que significaria continuar plantando e regando fielmente, confiando que o crescimento real vem de outra fonte?',
      ],
    },
  },
];

// 7º Domingo após a Epifania — Levítico 19:1-2, 9-18 · Salmo 119:33-40 · 1 Coríntios 3:10-11, 16-23 · Mateus 5:38-48
const week8: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Sereis Santos, Porque Eu Sou Santo',
      text: t(`Senhor, o fundamento do código de santidade de
        Levítico: "sereis santos, porque eu, o Senhor vosso Deus, sou
        santo." Santidade não é regra arbitrária, mas reflexo do teu
        próprio caráter. Que minha busca por viver bem nasça de
        querer refletir quem és, não apenas cumprir normas. Amém.`),
    },
    meditation: {
      prompt: t(`A motivação para santidade não é abstrata ou
        arbitrária — é explicitamente relacional e imitativa: "porque
        eu sou santo", um chamado a refletir o caráter divino, não
        apenas seguir regras.`),
      questions: [
        'Você vive suas convicções morais como regras arbitrárias a cumprir, ou como reflexo genuíno do caráter de Deus?',
        'Como essa motivação — imitar quem Deus é, não apenas obedecer regras — muda sua relação com ética e comportamento?',
        'Que aspecto específico do caráter de Deus você mais precisa refletir melhor hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deixá-los-ás para o Pobre e para o Estrangeiro',
      text: t(`Senhor, a lei instrui deliberadamente não colher tudo:
        "não segarás totalmente os cantos do teu campo... deixá-los-
        ás para o pobre e para o estrangeiro." Generosidade planejada
        na estrutura econômica, não apenas caridade ocasional. Examina
        como estruturo minha própria vida para incluir espaço
        deliberado para outros. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução não pede doação extra depois da
        colheita completa — ela estrutura a própria prática agrícola
        para incluir provisão sistemática aos vulneráveis desde o
        início.`),
      questions: [
        'Sua generosidade é planejada estruturalmente ou depende de impulsos ocasionais de caridade?',
        'O que significaria "deixar os cantos do seu campo" — planejar deliberadamente espaço para outros nos seus próprios recursos?',
        'Que estrutura concreta você poderia criar para tornar sua generosidade mais sistemática?',
      ],
    },
  },
  {
    prayer: {
      title: 'Amarás o Teu Próximo Como a Ti Mesmo',
      text: t(`Senhor, o resumo de toda a seção: "amarás o teu
        próximo como a ti mesmo." Séculos antes de Jesus citar esse
        mandamento como central, ele já estava ali, em meio a leis
        práticas sobre colheita, negócios e justiça. Que eu veja o
        amor ao próximo em cada decisão prática, não apenas em
        sentimento abstrato. Amém.`),
    },
    meditation: {
      prompt: t(`O mandamento de amar o próximo aparece em Levítico
        em meio a instruções extremamente práticas — colheita, salário
        justo, honestidade em negócios — não como princípio abstrato
        isolado.`),
      questions: [
        'Você trata "amar o próximo" mais como sentimento abstrato ou como princípio prático aplicado a decisões concretas?',
        'Em que decisão prática recente — financeira, profissional — você poderia ter aplicado mais concretamente esse mandamento?',
        'Como Levítico já antecipa, séculos antes, o que Jesus chamaria de mandamento central?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sois Santuário de Deus',
      text: t(`Senhor, Paulo pergunta: "não sabeis vós que sois
        santuário de Deus, e que o Espírito de Deus habita em vós?"
        Uma identidade sagrada, não apenas individual, mas coletiva —
        "sois" no plural. Que eu trate a comunidade de fé com o
        respeito devido a um espaço sagrado. Amém.`),
    },
    meditation: {
      prompt: t(`O "vós" no grego original é plural — Paulo fala da
        igreja coletivamente como santuário, não apenas de cada
        indivíduo isoladamente, uma dimensão comunitária facilmente
        esquecida.`),
      questions: [
        'Você pensa em "santuário de Deus" apenas individualmente, ou também na dimensão coletiva da comunidade de fé?',
        'Como tratar sua comunidade de fé com o mesmo respeito que trataria um espaço sagrado?',
        'O que significaria proteger essa santidade coletiva de divisões e destruição interna?',
      ],
    },
  },
  {
    prayer: {
      title: 'Amai aos Vossos Inimigos',
      text: t(`Senhor Jesus, o mandamento mais radical: "amai aos
        vossos inimigos, e orai pelos que vos perseguem." Não apenas
        tolerância, mas amor ativo e oração genuína por quem causa
        dano. Confesso que essa é uma das instruções mais difíceis de
        obedecer de verdade. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não pede apenas ausência de ódio — ele exige
        amor ativo ("amai") e intercessão genuína ("orai"), um padrão
        muito além da simples tolerância ou não-retaliação.`),
      questions: [
        'Quem é, concretamente, o "inimigo" que você mais tem dificuldade de amar ou orar por ele genuinamente?',
        'O que significaria, na prática, orar sinceramente por alguém que te causou dano real?',
        'Como esse mandamento revela o quanto o padrão de Jesus excede a moralidade convencional?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ele Faz Nascer o Seu Sol Sobre Maus e Bons',
      text: t(`Senhor, a justificativa para amar inimigos: "ele faz
        nascer o seu sol sobre maus e bons, e faz chover sobre justos
        e injustos." Tua generosidade não é seletiva baseada em
        merecimento. Que minha própria generosidade reflita essa
        mesma amplitude não seletiva. Amém.`),
    },
    meditation: {
      prompt: t(`A providência de Deus — sol e chuva — é
        deliberadamente não seletiva, servindo como modelo direto para
        o tipo de amor não seletivo que Jesus pede dos seus seguidores.`),
      questions: [
        'Sua própria generosidade é seletiva, reservada para quem você considera "merecedor"?',
        'Como a providência não seletiva de Deus na natureza desafia sua tendência de dar apenas a quem "merece"?',
        'O que significaria estender generosidade, esta semana, a alguém que você não consideraria "merecedor"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sede Vós, Pois, Perfeitos',
      text: t(`Senhor, encerramos esta semana com o padrão mais alto:
        "sede vós, pois, perfeitos, como é perfeito o vosso Pai
        celestial." Não perfeccionismo ansioso, mas o padrão pleno e
        completo de amor que reflete teu próprio caráter. Que eu
        persiga esse padrão com esperança, não com desespero. Amém.`),
    },
    meditation: {
      prompt: t(`"Perfeito" no contexto original carrega o sentido
        de "completo" ou "maduro" — não ausência de erro, mas amor
        que alcança sua plenitude completa, sem as exceções seletivas
        comuns entre humanos.`),
      questions: [
        'Esta semana — da santidade imitativa de Levítico ao amor radical por inimigos — o que te ensinou sobre o padrão completo que Deus pede?',
        'Você recebe esse chamado à "perfeição" com esperança de crescimento ou com desespero perfeccionista?',
        'O que você quer levar desta semana para continuar amadurecendo em direção a esse amor completo?',
      ],
    },
  },
];

// Domingo da Transfiguração — Êxodo 24:12-18 · Salmo 2 · 2 Pedro 1:16-21 · Mateus 17:1-9
export const transfigurationWeek: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Sobe a Mim ao Monte',
      text: t(`Senhor, chamaste Moisés: "sobe a mim ao monte, e
        espera ali." Antes de receber a revelação, houve o convite à
        subida — deixar o cotidiano para buscar tua presença
        deliberadamente. Que eu também reserve tempo para "subir",
        deixando as distrações de lado. Amém.`),
    },
    meditation: {
      prompt: t(`A revelação a Moisés não acontece no meio da vida
        cotidiana — exige subida deliberada, separação física e
        temporal do ritmo normal, um padrão que se repete na
        Transfiguração de Jesus.`),
      questions: [
        'Você reserva tempo deliberado de "subida" — separação das distrações cotidianas — para buscar a presença de Deus?',
        'O que impede você de fazer essa pausa deliberada com mais frequência?',
        'Que "monte" você precisa subir esta semana, mesmo que custe deixar tarefas urgentes de lado temporariamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Nuvem o Cobriu por Seis Dias',
      text: t(`Senhor, mesmo depois de subir, Moisés esperou "seis
        dias" antes que tu o chamasses do meio da nuvem. Revelação
        genuína frequentemente exige espera paciente, não resposta
        instantânea. Ensina-me essa paciência diante do teu tempo,
        não do meu. Amém.`),
    },
    meditation: {
      prompt: t(`O intervalo de espera — seis dias na nuvem antes do
        chamado — sugere que até experiências profundas de revelação
        seguem o ritmo de Deus, não uma resposta imediata e automática
        à busca humana.`),
      questions: [
        'Você já esperou período prolongado antes de uma resposta clara de Deus, mesmo já estando genuinamente buscando?',
        'Como essa espera de Moisés desafia expectativas de resposta espiritual instantânea?',
        'O que sustentaria você numa espera semelhante hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Testemunhas Oculares da Sua Majestade',
      text: t(`Senhor, Pedro insiste que sua mensagem não vinha de
        "fábulas engenhosas", mas de experiência real: "nós fôramos
        testemunhas oculares da sua majestade." A fé cristã se apoia
        em eventos históricos reais, testemunhados, não em mitologia
        inventada. Fortalece minha própria confiança nessa base
        histórica sólida. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro faz questão de distinguir sua mensagem de
        "fábulas" — a Transfiguração não era alegoria ou invenção
        piedosa, mas evento presenciado diretamente por testemunhas
        identificáveis.`),
      questions: [
        'Você já duvidou da base histórica real da sua fé, tratando-a inconscientemente como "boa história" em vez de evento real?',
        'Como a insistência de Pedro em testemunho ocular fortalece sua própria confiança na credibilidade do evangelho?',
        'O que significaria construir sua fé sobre essa base histórica sólida, não apenas sentimento subjetivo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Uma Candeia que Alumia em Lugar Escuro',
      text: t(`Senhor, Pedro descreve a "palavra profética" como "uma
        candeia que alumia em lugar escuro, até que o dia amanheça."
        Enquanto aguardo o cumprimento pleno das tuas promessas, tua
        Palavra já oferece luz suficiente para o caminho presente.
        Que eu confie nessa luz parcial mas real. Amém.`),
    },
    meditation: {
      prompt: t(`A metáfora reconhece luz genuína mas ainda parcial
        — suficiente para navegar o presente escuro, mas não a
        plenitude final que só virá "quando o dia amanhecer".`),
      questions: [
        'Você trata a Palavra de Deus como luz suficiente para o presente, mesmo sabendo que a revelação completa ainda está por vir?',
        'Que "lugar escuro" da sua vida atual precisa dessa candeia hoje?',
        'Como viver com essa luz parcial, mas real, sem exigir clareza completa antes de agir?',
      ],
    },
  },
  {
    prayer: {
      title: 'Foi Transfigurado Diante Deles',
      text: t(`Senhor Jesus, "foi transfigurado diante deles; o seu
        rosto resplandeceu como o sol." Por um momento breve, a
        glória divina, normalmente velada em tua humanidade, tornou-se
        visível aos três discípulos mais próximos. Que eu confie que
        essa mesma glória, ainda que velada, está sempre presente em
        ti. Amém.`),
    },
    meditation: {
      prompt: t(`A Transfiguração revela algo que sempre esteve
        verdadeiro sobre Jesus — não uma transformação que cria algo
        novo, mas uma revelação momentânea da glória que sua
        humanidade normalmente velava.`),
      questions: [
        'Como a ideia de glória "sempre presente, mas normalmente velada" muda sua percepção da presença comum e cotidiana de Jesus?',
        'Você já teve um momento de clareza súbita sobre algo que sempre foi verdade, mas que você não conseguia ver antes?',
        'O que significaria viver com maior consciência dessa glória velada em cada encontro comum com Cristo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bom É Estarmos Aqui',
      text: t(`Senhor, diante da visão gloriosa, Pedro quis
        permanecer: "bom é estarmos aqui; se queres, farei aqui três
        cabanas." O impulso de prolongar experiências espirituais
        intensas é natural — mas nem sempre é o chamado certo. Ensina-
        me a descer do monte quando é hora, não apenas permanecer no
        pico espiritual. Amém.`),
    },
    meditation: {
      prompt: t(`O desejo de Pedro de "construir cabanas" e
        permanecer é compreensível, mas mal direcionado — a
        experiência da montanha, por mais gloriosa, não era o destino
        final; havia trabalho esperando no vale.`),
      questions: [
        'Você já quis prolongar artificialmente uma experiência espiritual intensa, resistindo ao chamado de "descer" para a vida comum?',
        'Como equilibrar a busca genuína por experiências profundas de Deus com a disposição de voltar ao serviço cotidiano?',
        'Que "monte" você está relutante em deixar, mesmo sabendo que há trabalho esperando no vale?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Viram a Ninguém Senão a Jesus Somente',
      text: t(`Senhor, encerramos esta semana entre a Epifania e a
        Quaresma com o detalhe final: depois da nuvem se dissipar,
        "não viram a ninguém senão a Jesus somente." Moisés e Elias —
        a Lei e os Profetas — se retiram; só Jesus permanece. Que
        toda a minha jornada de fé se resolva, no fim, apenas em ti.
        Amém.`),
    },
    meditation: {
      prompt: t(`A cena termina com foco exclusivo em Jesus —
        representantes de toda a tradição anterior (Lei e Profetas)
        se retiram, deixando claro que ele é o cumprimento final, não
        apenas mais um entre iguais.`),
      questions: [
        'Esta temporada da Epifania inteira — dos magos ao Batismo à Transfiguração — o que revelou sobre quem Jesus realmente é?',
        'Você consegue, como os discípulos aqui, deixar de lado outras vozes importantes para focar exclusivamente em Jesus quando necessário?',
        'Como você quer entrar na Quaresma que se aproxima, carregando essa visão clara de "Jesus somente"?',
      ],
    },
  },
];

const epiphanyA: Record<number, DevotionalEntry[]> = {
  2: week2,
  3: week3,
  4: week4,
  5: week5,
  6: week6,
  7: week7,
  8: week8,
};

export default epiphanyA;
