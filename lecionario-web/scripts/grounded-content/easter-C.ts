/**
 * Páscoa — Ciclo C — conteúdo ancorado no RCL (leituras reais).
 *
 * Mesmo padrão de easter-A.ts. Ver esse arquivo para a explicação
 * completa da estrutura (7 semanas fixas, índice = date.getDay()).
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

// Páscoa 1 — Domingo da Ressurreição — Atos 10:34-43 · Salmo 118:1-2, 14-24 · 1 Coríntios 15:19-26 · João 20:1-18
const week1: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Este É o Dia Que o Senhor Fez',
      text: t(`Senhor ressuscitado, hoje celebramos: "este é o dia que
        o Senhor fez; regozijemo-nos, e alegremo-nos nele." Depois de
        toda a jornada quaresmal e da semana mais sombria do
        calendário, chega o dia que reordena o sentido de todos os
        outros dias. Que minha alegria hoje seja concreta e real.
        Aleluia! Amém.`),
    },
    meditation: {
      prompt: t(`O salmo, cantado séculos antes de Cristo, encontra
        cumprimento pleno precisamente hoje — a pedra rejeitada pelos
        edificadores tornou-se pedra angular de tudo.`),
      questions: [
        'Como distinguir, na sua experiência, entre alegria automática (esperada da data) e alegria genuinamente vivida?',
        'Que "pedra rejeitada" na sua vida você já viu Deus transformar em fundamento?',
        'O que significaria viver hoje, concretamente, à luz de "este é o dia que o Senhor fez"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Não Faz Acepção de Pessoas',
      text: t(`Senhor, Pedro declara diante de Cornélio: "na verdade
        reconheço que Deus não faz acepção de pessoas; mas que lhe é
        aceitável aquele que, em qualquer nação, o teme e pratica o
        que é justo." A ressurreição alcança toda nação, sem
        distinção. Que eu viva essa mesma amplitude hoje. Amém.`),
    },
    meditation: {
      prompt: t(`Este discurso marca a primeira vez que o evangelho é
        anunciado explicitamente a um gentio — um momento decisivo que
        redefiniu as fronteiras da própria igreja primitiva.`),
      questions: [
        'Que fronteira social ou cultural você ainda hesita em cruzar com a boa notícia?',
        'Você trata a ressurreição como reservada a "gente como eu", ou genuinamente universal?',
        'Como a amplitude do anúncio de Pedro desafia limites que você talvez nem perceba que carrega?',
      ],
    },
  },
  {
    prayer: {
      title: 'Testemunhas Predeterminadas',
      text: t(`Senhor, Pedro descreve os apóstolos como "testemunhas
        predeterminadas por Deus... que comemos e bebemos juntamente
        com ele depois que ressurgiu." Testemunho coletivo, não
        experiência isolada. Que eu reconheça hoje as testemunhas que
        sustentam minha própria fé. Amém.`),
    },
    meditation: {
      prompt: t(`O testemunho da ressurreição não vem de uma pessoa
        isolada, mas de um grupo que compartilhou refeições concretas
        com o Cristo ressuscitado — evidência coletiva, não visão
        privada.`),
      questions: [
        'Quem são as testemunhas cuja fé sustenta ou confirma a sua?',
        'Você vive sua fé de forma mais isolada ou mais comunitária?',
        'O que significaria buscar mais essa confirmação comunitária esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cristo as Primícias',
      text: t(`Senhor, Paulo declara: "Cristo foi ressuscitado dentre
        os mortos, sendo ele as primícias dos que dormem." Não evento
        isolado, mas a primeira colheita de uma safra maior que
        também me inclui. Que eu confie hoje que minha própria
        ressurreição segue esse mesmo padrão já inaugurado. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem agrícola das "primícias" conecta a
        ressurreição de Cristo diretamente ao destino futuro de todos
        que pertencem a ele — não exceção única, mas início de um
        padrão que se completará.`),
      questions: [
        'Como a imagem das "primícias" muda sua compreensão da própria esperança de ressurreição?',
        'Você vive mais consciente de fazer parte dessa "colheita" maior, ou isolado dela?',
        'O que significaria hoje descansar nessa certeza — que o que aconteceu com Cristo também acontecerá com você?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Último Inimigo a Ser Destruído É a Morte',
      text: t(`Senhor, Paulo declara: "o último inimigo a ser
        destruído é a morte." Nomear a morte como inimigo, não como
        parte natural e aceitável da existência, muda como devo
        encará-la. Que eu viva hoje sem fingir paz com o que tu mesmo
        chamas de inimigo. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo se recusa a suavizar ou naturalizar a morte —
        ele a nomeia diretamente como inimigo a ser derrotado, não
        como parte aceitável e neutra do ciclo da vida.`),
      questions: [
        'Você tende a "fazer as pazes" com a morte de forma que talvez minimize a vitória real que Cristo conquistou sobre ela?',
        'Como nomear a morte como "inimigo" — não neutra — muda sua forma de enfrentar luto ou perda?',
        'O que significaria hoje esperar ativamente pela destruição final desse inimigo, não apenas resignar-se a ele?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ao Dizer Isso, Voltou-se para Trás',
      text: t(`Senhor Jesus, Maria Madalena não te reconheceu de
        imediato junto ao sepulcro — pensou que fosses o jardineiro.
        Só quando chamaste seu nome, "Maria!", ela se voltou e
        reconheceu. Que eu escute hoje meu próprio nome, chamado por
        ti, em meio à minha própria confusão. Amém.`),
    },
    meditation: {
      prompt: t(`O reconhecimento de Maria não vem de argumento
        teológico, mas do próprio Jesus chamando seu nome — algo
        pessoal e íntimo, em meio à dor real da perda que ela ainda
        sentia.`),
      questions: [
        'Já houve um momento em que você sentiu Deus "chamar seu nome" pessoalmente, em meio à confusão ou luto?',
        'Você tende a reconhecer Deus mais por argumento racional, ou por esse tipo de encontro pessoal e direto?',
        'O que significaria, hoje, parar de procurar respostas genéricas e escutar seu próprio nome sendo chamado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vi o Senhor!',
      text: t(`Senhor, encerramos esta primeira semana pascal com o
        anúncio direto de Maria Madalena: "Vi o Senhor!" Não uma
        teoria, mas testemunho pessoal. Que meu próprio testemunho
        esta semana carregue essa mesma simplicidade e certeza. Amém.`),
    },
    meditation: {
      prompt: t(`Maria Madalena torna-se a primeira pregadora do
        evangelho da ressurreição com apenas quatro palavras diretas —
        um modelo de testemunho simples que não precisa de elaboração
        teológica complexa para ser eficaz.`),
      questions: [
        'Esta primeira semana pascal — das primícias de Cristo ao chamado pelo nome — o que você mais quer levar adiante?',
        'Como você anunciaria, hoje, com a mesma simplicidade de Maria, o que já experimentou de Deus?',
        'O que significaria entrar na segunda semana da Páscoa carregando esse testemunho direto?',
      ],
    },
  },
];

// Páscoa 2 — Atos 5:27-32 · Salmo 118:14-29 · Apocalipse 1:4-8 · João 20:19-31
const week2: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Importa Antes Obedecer a Deus que aos Homens',
      text: t(`Senhor, diante do sinédrio, Pedro e os apóstolos
        declararam sem hesitação: "importa antes obedecer a Deus que
        aos homens." Uma prioridade clara mesmo sob ameaça direta. Que
        eu tenha essa mesma clareza quando autoridade humana e
        fidelidade a ti entrarem em conflito. Amém.`),
    },
    meditation: {
      prompt: t(`Esta declaração não nasce de rebeldia genérica contra
        autoridade, mas de uma situação específica onde obedecer aos
        homens exigiria desobedecer diretamente ao chamado
        recebido de Deus.`),
      questions: [
        'Você já enfrentou um conflito real entre obediência a uma autoridade humana e fidelidade a Deus?',
        'Como discernir quando esse conflito é genuíno, e não apenas desculpa para desobediência conveniente?',
        'O que sustentaria você a manter essa prioridade, como os apóstolos mantiveram, sob pressão real?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus... Elevou-o a Príncipe e Salvador',
      text: t(`Senhor, Pedro proclama: "Deus, com a sua destra, o
        elevou a Príncipe e Salvador, para dar a Israel o
        arrependimento e remissão de pecados." A exaltação de Cristo
        não é fim em si — tem propósito específico: minha remissão.
        Que eu receba hoje esse arrependimento e perdão oferecidos.
        Amém.`),
    },
    meditation: {
      prompt: t(`Pedro liga diretamente a exaltação de Cristo ao
        propósito concreto de oferecer arrependimento e perdão — a
        glorificação não é apenas sobre quem Cristo é, mas sobre o que
        ele oferece a quem o recebe.`),
      questions: [
        'Você recebe a exaltação de Cristo mais como fato distante, ou como oferta concreta de arrependimento e perdão para você?',
        'Que área específica pede hoje esse arrependimento genuíno de sua parte?',
        'O que significaria receber essa remissão não como conceito, mas como realidade vivida agora?',
      ],
    },
  },
  {
    prayer: {
      title: 'Esta É a Porta do Senhor',
      text: t(`Senhor, o salmista declara: "esta é a porta do Senhor;
        por ela os justos entrarão." A mesma pedra rejeitada que se
        tornou angular agora também se torna porta — caminho de
        entrada, não apenas fundamento. Que eu entre hoje por essa
        porta específica, não por atalhos que só parecem levar ao
        mesmo lugar. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo combina duas imagens arquitetônicas para
        descrever o mesmo Senhor — pedra angular que sustenta, porta
        que permite entrada — sugerindo que a ressurreição não é
        apenas fundamento distante, mas caminho concreto e acessível.`),
      questions: [
        'Você tem buscado "atalhos" espirituais em vez de entrar pela porta específica que Cristo oferece?',
        'O que significa, concretamente, "entrar" por essa porta hoje, não apenas admirá-la de longe?',
        'Como a imagem de uma porta — não apenas de um fundamento — muda sua ideia de acesso à vida ressuscitada?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Primogênito dos Mortos',
      text: t(`Senhor Jesus, João te descreve como "a fiel
        testemunha, o primogênito dos mortos e o Príncipe dos reis da
        terra." Três títulos que resumem tua obra completa — testemunho
        fiel, vitória sobre a morte, autoridade suprema. Que eu confie
        hoje nos três, não apenas num deles. Amém.`),
    },
    meditation: {
      prompt: t(`Esta saudação inicial do Apocalipse condensa em três
        frases toda a obra de Cristo — fidelidade em vida, vitória
        sobre a morte, autoridade sobre toda a criação — um resumo
        denso para orientar a leitura que segue.`),
      questions: [
        'Desses três títulos — testemunha fiel, primogênito dos mortos, príncipe dos reis — qual você mais precisa lembrar hoje?',
        'Como a combinação dos três, não apenas um isoladamente, muda sua confiança em Cristo?',
        'O que significaria viver hoje sob a autoridade específica descrita nesse título final?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se Eu Não Vir o Sinal dos Cravos',
      text: t(`Senhor, Tomé exigiu: "se eu não vir o sinal dos cravos
        nas mãos... de maneira nenhuma crerei." Não repreendeste essa
        exigência — vieste até ele, oferecendo exatamente o que
        pedira. Que eu traga minhas próprias dúvidas honestas a ti,
        sem medo de julgamento. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não pune o pedido de Tomé por evidência
        concreta — ele volta especificamente para atendê-lo, mostrando
        que dúvida honesta, trazida abertamente, recebe resposta, não
        rejeição.`),
      questions: [
        'Que dúvida você tem escondido, com medo de que seja "fé insuficiente" para trazer a Deus?',
        'Como a resposta gentil de Jesus a Tomé muda sua disposição de trazer suas próprias exigências?',
        'O que significaria imitar a honestidade de Tomé, em vez de fingir certeza que você não sente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Senhor Meu, e Deus Meu!',
      text: t(`Senhor Jesus, diante da evidência oferecida, Tomé
        respondeu com a confissão mais completa do evangelho: "Senhor
        meu, e Deus meu!" Da dúvida mais profunda à confissão mais
        plena, num só encontro. Que minha própria dúvida, quando
        confrontada com tua presença, chegue à mesma confissão. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta de Tomé é notável por sua completude
        teológica — não apenas reconhecimento de que Jesus estava
        vivo, mas confissão explícita de sua divindade plena, "Deus
        meu".`),
      questions: [
        'Sua própria jornada de dúvida já chegou a algum momento de confissão tão plena quanto a de Tomé?',
        'O que você precisaria "ver" ou experimentar hoje para que sua dúvida se transformasse em confissão semelhante?',
        'Como a confissão de Tomé — vinda justamente do mais cético do grupo — encoraja sua própria caminhada?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bem-Aventurados os Que Não Viram e Creram',
      text: t(`Senhor, encerramos esta semana com tua palavra a Tomé:
        "bem-aventurados os que não viram e creram." Essa bênção é
        minha, hoje, tanto quanto foi para os primeiros ouvintes. Que
        eu viva à altura dela, com fé confiante, não cega. Amém.`),
    },
    meditation: {
      prompt: t(`Esta bênção final do evangelho é dirigida diretamente
        a todo leitor futuro que creria sem o privilégio de ter visto
        Jesus fisicamente ressuscitado — incluindo você, hoje.`),
      questions: [
        'Esta semana — da prioridade de obedecer a Deus à confissão plena de Tomé — o que você mais quer levar adiante?',
        'Como essa bênção específica, endereçada a quem "não viu", muda como você vê sua própria fé?',
        'O que significaria entrar na terceira semana da Páscoa vivendo concretamente essa bem-aventurança?',
      ],
    },
  },
];

// Páscoa 3 — Atos 9:1-20 · Salmo 30 · Apocalipse 5:11-14 · João 21:1-19
const week3: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Saulo, Saulo, Por Que Me Persegues?',
      text: t(`Senhor, no caminho de Damasco, perguntaste a Saulo:
        "Saulo, Saulo, por que me persegues?" — identificando-te
        pessoalmente com aqueles que ele perseguia. Que eu reconheça
        hoje onde talvez, sem perceber, esteja te perseguindo através
        de outros. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não pergunta "por que persegues meus
        seguidores", mas "por que me persegues" — identificando-se
        diretamente com a igreja perseguida, uma união que Saulo
        jamais havia considerado.`),
      questions: [
        'Você já feriu, sem perceber, alguém tão próximo de Deus que a ferida alcançou o próprio Deus?',
        'Como essa identificação de Jesus com os perseguidos muda sua forma de tratar quem sofre injustamente?',
        'O que significaria hoje reconhecer e corrigir uma "perseguição" que você talvez nem soubesse que praticava?',
      ],
    },
  },
  {
    prayer: {
      title: 'Levanta-te e Entra na Cidade',
      text: t(`Senhor, depois de derrubar Saulo com a luz, tua
        instrução foi simples: "levanta-te e entra na cidade, e lá te
        será dito o que te cumpre fazer." Não revelação completa
        imediata, mas passo seguinte concreto e suficiente. Que eu
        confie hoje nesse mesmo padrão — um passo de cada vez. Amém.`),
    },
    meditation: {
      prompt: t(`Deus não revela a Saulo todo o plano de sua vida
        futura de uma só vez — apenas o próximo passo concreto,
        confiando que mais instrução viria no tempo certo, através de
        outra pessoa.`),
      questions: [
        'Você espera revelação completa antes de agir, ou consegue confiar no próximo passo concreto, como Saulo precisou confiar?',
        'Que "cidade" você precisa entrar hoje, mesmo sem saber ainda o que encontrará lá?',
        'Como essa revelação gradual, passo a passo, desafia sua ansiedade sobre o futuro distante?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eis-me Aqui, Senhor',
      text: t(`Senhor, quando chamaste Ananias em visão para ir ao
        encontro de Saulo — o perseguidor que ele temia — Ananias
        respondeu primeiro com obediência: "eis-me aqui, Senhor,"
        antes mesmo de expressar sua hesitação legítima. Que minha
        obediência preceda minhas objeções, como a dele. Amém.`),
    },
    meditation: {
      prompt: t(`Ananias expressa disponibilidade imediata ("eis-me
        aqui") antes de trazer sua preocupação genuína sobre a
        reputação perigosa de Saulo — obediência inicial que não
        elimina a honestidade da hesitação seguinte.`),
      questions: [
        'Você tende a levar suas objeções a Deus antes ou depois de expressar disponibilidade básica de obedecer?',
        'Que "Saulo" — pessoa que te causa medo legítimo — Deus poderia estar te chamando a se aproximar?',
        'Como equilibrar obediência genuína com honestidade sobre o medo real, como Ananias fez?',
      ],
    },
  },
  {
    prayer: {
      title: 'Um Vaso Escolhido',
      text: t(`Senhor, respondeste à hesitação de Ananias afirmando
        sobre Saulo: "este é para mim um vaso escolhido." O mesmo
        homem que perseguia a igreja seria transformado em seu maior
        missionário. Que eu não desista de ninguém que hoje parece
        adversário demais para ser instrumento teu. Amém.`),
    },
    meditation: {
      prompt: t(`Deus escolhe deliberadamente, como "vaso escolhido",
        exatamente a pessoa que a comunidade cristã tinha mais razão
        para temer e evitar — uma escolha que desafia todo cálculo
        humano razoável.`),
      questions: [
        'Existe alguém que você classificou como "impossível" ou "perigoso demais" para ser transformado por Deus?',
        'Como a escolha de Saulo como "vaso escolhido" desafia seus próprios limites sobre quem Deus pode usar?',
        'O que significaria hoje orar especificamente por essa pessoa que parece adversária demais?',
      ],
    },
  },
  {
    prayer: {
      title: 'Lançai a Rede à Direita do Barco',
      text: t(`Senhor Jesus, depois de uma noite inteira de pesca sem
        resultado, instruíste os discípulos: "lançai a rede à direita
        do barco, e achareis." Uma instrução simples que mudou tudo.
        Que eu esteja disposto hoje a tentar de novo, do jeito que tu
        indicares, mesmo depois de esforço frustrado. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução de Jesus não é complexa nem
        surpreendente em si — apenas obediência simples a uma direção
        específica, depois de um esforço próprio que já havia
        fracassado repetidamente durante a noite toda.`),
      questions: [
        'Que "noite inteira" de esforço frustrado você já viveu antes de receber uma instrução simples que mudou tudo?',
        'Você está disposto a tentar de novo, de forma diferente, mesmo depois de esforço próprio esgotado?',
        'Como reconhecer a "voz" que oferece essa direção específica, em meio ao cansaço e frustração?',
      ],
    },
  },
  {
    prayer: {
      title: 'Simão, Filho de João, Amas-me Mais do Que Estes?',
      text: t(`Senhor Jesus, perguntaste a Pedro três vezes: "amas-me
        mais do que estes?" — ecoando as três negações que ele
        cometera. Não repreensão adicional, mas restauração
        deliberada. Que eu receba hoje essa mesma restauração para
        qualquer falha que ainda me pesa. Amém.`),
    },
    meditation: {
      prompt: t(`As três perguntas de Jesus correspondem
        deliberadamente às três negações de Pedro — não coincidência,
        mas restauração intencional, desfazendo especificamente o
        dano causado por cada negação anterior.`),
      questions: [
        'Que falha repetida você carrega que ainda precisa dessa restauração deliberada e específica, não apenas perdão genérico?',
        'Como a atenção de Jesus ao detalhe — três perguntas para três negações — muda sua confiança na restauração dele?',
        'O que significaria receber hoje, concretamente, essa mesma restauração ponto a ponto?',
      ],
    },
  },
  {
    prayer: {
      title: 'Segue-me',
      text: t(`Senhor, encerramos esta semana com tua palavra final e
        simples a Pedro: "segue-me." Depois de toda a restauração,
        depois de toda a revelação sobre o futuro, o chamado se resume
        a isso. Que essa seja também minha resposta hoje, simples e
        direta. Amém.`),
    },
    meditation: {
      prompt: t(`Depois de toda a conversa elaborada sobre amor,
        restauração e até profecia sobre a própria morte de Pedro,
        Jesus encerra com o chamado mais simples possível — o mesmo
        que abriu o ministério dele anos antes.`),
      questions: [
        'Esta semana — da conversão de Saulo à restauração de Pedro — o que você mais quer levar adiante?',
        'Depois de tanta reflexão, o que significaria responder hoje com essa mesma simplicidade — apenas "seguir"?',
        'Como você quer entrar na quarta semana da Páscoa, à luz desse chamado direto?',
      ],
    },
  },
];

// Páscoa 4 — Atos 9:36-43 · Salmo 23 · Apocalipse 7:9-17 · João 10:22-30
const week4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Cheia de Boas Obras e Esmolas',
      text: t(`Senhor, Tabita era descrita como "cheia de boas obras e
        esmolas que fazia." Uma vida marcada por generosidade
        concreta, tão significativa que sua morte deixou uma
        comunidade inteira em luto visível. Que minha própria vida
        seja lembrada por esse tipo de fruto tangível. Amém.`),
    },
    meditation: {
      prompt: t(`A identidade de Tabita não é definida por posição ou
        eloquência, mas pela soma acumulada de gestos concretos de
        cuidado — uma reputação construída ação por ação, não por
        um único feito notável.`),
      questions: [
        'Como você gostaria de ser lembrado — pelas suas palavras, ou pelas "boas obras e esmolas" concretas que deixou?',
        'Que gesto pequeno e concreto de generosidade você poderia praticar hoje, no estilo de Tabita?',
        'Existe alguém que, como as viúvas do relato, poderia testemunhar sobre um cuidado concreto que você já ofereceu?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tabita, Levanta-te',
      text: t(`Senhor, Pedro orou diante do corpo de Tabita e depois
        ordenou: "Tabita, levanta-te." A vida que parecia
        definitivamente encerrada foi restaurada por uma palavra
        simples, apoiada em oração sincera. Que eu confie hoje que
        nada está definitivamente encerrado para ti. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro não age por impulso ou fórmula mágica — ele
        ora primeiro, deliberadamente, antes de pronunciar a palavra
        de restauração, situando o milagre dentro da dependência
        de Deus, não do próprio poder.`),
      questions: [
        'Que situação na sua vida parece "definitivamente encerrada", como a morte de Tabita parecia?',
        'Como a ordem de oração primeiro, ação depois, no exemplo de Pedro, poderia moldar sua própria resposta a uma situação difícil?',
        'O que significaria confiar hoje que Deus ainda restaura o que parece perdido?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nada Me Faltará',
      text: t(`Senhor, meu pastor, "nada me faltará." Uma declaração
        de suficiência completa, não de escassez controlada. Que eu
        viva hoje confiando nessa provisão plena, em vez de operar a
        partir do medo de escassez. Amém.`),
    },
    meditation: {
      prompt: t(`A declaração inicial do Salmo 23 estabelece o tom
        para tudo o que segue — não escassez gerenciada com esforço,
        mas suficiência genuína garantida pela presença do pastor.`),
      questions: [
        'Você vive mais a partir de mentalidade de escassez, ou da confiança de que "nada faltará" sob o cuidado de Deus?',
        'Que necessidade específica você tem tentado suprir por conta própria, com ansiedade, em vez de confiar nessa provisão?',
        'O que significaria hoje descansar concretamente nessa suficiência prometida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nunca Mais Terão Fome, Nunca Mais Terão Sede',
      text: t(`Senhor, João descreve a multidão diante do trono:
        "nunca mais terão fome, nunca mais terão sede... e Deus lhes
        enxugará dos olhos toda lágrima." Uma visão de suficiência
        completa e final. Que essa esperança sustente hoje a fome ou
        sede que ainda sinto. Amém.`),
    },
    meditation: {
      prompt: t(`A visão do Apocalipse não promete apenas alívio
        temporário, mas cessação completa e definitiva de toda fome,
        sede e lágrima — uma suficiência que nenhuma provisão
        terrena consegue igualar.`),
      questions: [
        'Que "fome" ou "sede" — literal ou figurada — você carrega hoje que essa visão final poderia colocar em perspectiva?',
        'Como viver hoje já orientado por essa esperança de suficiência completa e final?',
        'O que significaria confiar que suas lágrimas atuais têm um fim garantido, mesmo que ainda não visível?',
      ],
    },
  },
  {
    prayer: {
      title: 'As Minhas Ovelhas Ouvem a Minha Voz',
      text: t(`Senhor Jesus, declaraste: "as minhas ovelhas ouvem a
        minha voz, e eu as conheço, e elas me seguem." Um
        reconhecimento mútuo e íntimo, não anônimo. Que eu cultive
        hoje essa familiaridade com tua voz, em meio a tantas outras
        vozes concorrentes. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus descreve uma relação de reconhecimento mútuo e
        pessoal — não apenas obediência a comandos genéricos, mas
        familiaridade construída ao longo do tempo, como entre
        pastor e ovelhas que se conhecem de verdade.`),
      questions: [
        'Você reconheceria facilmente a "voz" de Jesus em meio a tantas outras vozes que competem por sua atenção hoje?',
        'O que ajudaria a cultivar essa familiaridade mais profunda, além de ouvir esporadicamente?',
        'Como distinguir, na prática, a voz do bom pastor de vozes que apenas imitam autoridade?',
      ],
    },
  },
  {
    prayer: {
      title: 'Jamais Perecerão',
      text: t(`Senhor Jesus, prometeste: "eu lhes dou a vida eterna, e
        jamais perecerão; e ninguém as arrebatará da minha mão." Uma
        segurança que não depende da minha própria força de segurar,
        mas da tua de nunca soltar. Que eu descanse hoje nessa
        garantia. Amém.`),
    },
    meditation: {
      prompt: t(`A segurança prometida por Jesus não está localizada
        na capacidade da ovelha de se segurar firme, mas na mão do
        pastor que não solta — a garantia repousa sobre ele, não
        sobre o esforço próprio.`),
      questions: [
        'Você tende a se preocupar mais com sua própria capacidade de "se segurar", em vez de confiar na mão que já te segura?',
        'Como essa promessa muda sua ansiedade diante de dúvidas sobre a própria fé ou perseverança?',
        'O que significaria descansar hoje concretamente nessa garantia, sem se esforçar para "merecê-la"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu e o Pai Somos Um',
      text: t(`Senhor, encerramos esta semana com tua declaração
        direta: "eu e o Pai somos um." A segurança das ovelhas não vem
        de uma promessa isolada, mas da própria unidade entre tu e o
        Pai, garantindo tudo o mais. Que eu confie hoje nessa unidade
        como fundamento de tudo. Amém.`),
    },
    meditation: {
      prompt: t(`Esta declaração final conecta a segurança prometida
        às ovelhas com a própria natureza de Jesus — a garantia não é
        arbitrária, mas fundamentada na unidade essencial entre
        Filho e Pai.`),
      questions: [
        'Esta semana — da restauração de Tabita à segurança inabalável do rebanho — o que você mais quer levar adiante?',
        'Como a unidade entre Pai e Filho, fundamento dessa segurança, muda sua confiança na promessa recebida?',
        'O que significaria entrar na quinta semana da Páscoa descansando nessa unidade divina?',
      ],
    },
  },
];

// Páscoa 5 — Atos 11:1-18 · Salmo 148 · Apocalipse 21:1-6 · João 13:31-35
const week5: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Chames Tu Comum ao Que Deus Purificou',
      text: t(`Senhor, na visão de Pedro, a voz do céu instruiu: "não
        chames tu comum ao que Deus purificou." Uma correção direta a
        categorias que Pedro havia herdado, mas que já não refletiam
        tua vontade presente. Que eu esteja disposto hoje a
        reexaminar minhas próprias categorias herdadas. Amém.`),
    },
    meditation: {
      prompt: t(`A visão de Pedro desafia diretamente categorias
        religiosas que ele havia mantido a vida toda como sagradas e
        inquestionáveis — a purificação de Deus redefine o que era
        considerado impuro.`),
      questions: [
        'Que categoria — "isso é impróprio para gente como nós" — você talvez precise reexaminar hoje?',
        'Como distinguir entre convicção genuína e preconceito herdado disfarçado de convicção?',
        'O que significaria, concretamente, deixar Deus redefinir uma categoria que você considerava fixa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quem Era Eu, para Que Pudesse Resistir a Deus?',
      text: t(`Senhor, diante da evidência clara de que tu havias dado
        aos gentios o mesmo dom concedido aos judeus, Pedro
        perguntou: "quem era eu, para que pudesse resistir a Deus?"
        Uma humildade que reconhece limite diante da tua ação clara.
        Ensina-me essa mesma humildade hoje. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro reconhece que sua própria opinião, por mais
        arraigada que fosse, não podia resistir à evidência clara da
        ação de Deus — humildade genuína diante de fatos que
        desafiam convicção pessoal.`),
      questions: [
        'Você já teve que abandonar uma posição firme diante de evidência clara de que Deus estava agindo de forma diferente do esperado?',
        'O que tornaria mais fácil, para você, essa mesma humildade diante de evidência inconveniente?',
        'Como reconhecer, hoje, um limite legítimo à sua própria certeza sobre o que Deus pode ou não fazer?',
      ],
    },
  },
  {
    prayer: {
      title: 'Louvai-o, Sol e Lua',
      text: t(`Senhor, o salmista convoca toda a criação — "sol e
        lua... estrelas luzentes... monstros marinhos... feras e todo
        o gado" — a louvar-te. Um coro cósmico que ultrapassa a
        capacidade humana de louvor isolado. Que eu me una hoje a essa
        sinfonia maior. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo convoca uma variedade extraordinária de
        elementos da criação ao louvor — não apenas seres humanos, mas
        toda a ordem criada, sugerindo que o louvor genuíno é
        cósmico, não apenas individual.`),
      questions: [
        'Você experimenta o louvor mais como ato individual isolado, ou como participação num coro cósmico maior?',
        'Que elemento da criação ao seu redor hoje poderia te lembrar a participar desse louvor mais amplo?',
        'Como essa visão ampla do louvor muda a forma como você encara um momento comum do seu dia?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eis Que Faço Novas Todas as Coisas',
      text: t(`Senhor, aquele assentado no trono declara: "eis que
        faço novas todas as coisas." Não apenas remendo do que já
        existe, mas renovação completa e radical. Que eu confie hoje
        que nada está tão desgastado que esteja além dessa promessa de
        renovação total. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa não é de reparo parcial, mas de renovação
        completa — "todas as coisas" — uma esperança que alcança até
        o que parece mais irremediavelmente desgastado ou perdido.`),
      questions: [
        'Que área da sua vida você já classificou como desgastada demais para ser renovada?',
        'Como a promessa de "fazer novas todas as coisas" — não apenas algumas — muda essa avaliação?',
        'O que significaria hoje esperar ativamente por essa renovação, em vez de se resignar ao desgaste?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Haverá Mais Morte, Nem Haverá Mais Pranto',
      text: t(`Senhor, a visão final promete: "não haverá mais morte,
        nem haverá mais pranto, nem lamento, nem dor; porque já as
        primeiras coisas são passadas." Uma esperança específica e
        completa, não vaga generalidade sobre "tudo vai ficar bem".
        Que essa esperança sustente minha dor específica hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A visão nomeia especificamente cada forma de
        sofrimento a ser eliminada — morte, pranto, lamento, dor — uma
        promessa detalhada, não uma generalidade vaga sobre bem-estar
        futuro indefinido.`),
      questions: [
        'Qual dessas quatro — morte, pranto, lamento, dor — pesa mais especificamente sobre você hoje?',
        'Como uma promessa específica, nomeando exatamente seu sofrimento, sustenta melhor do que uma generalidade vaga?',
        'O que significaria hoje trazer essa dor específica diante dessa promessa específica?',
      ],
    },
  },
  {
    prayer: {
      title: 'Um Novo Mandamento Vos Dou',
      text: t(`Senhor Jesus, na véspera da tua morte, instruíste: "um
        novo mandamento vos dou: que vos ameis uns aos outros; assim
        como eu vos amei." Não um mandamento entre muitos, mas o
        resumo e a marca distintiva de quem te segue. Que eu viva hoje
        marcado por esse amor específico. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus apresenta este mandamento no momento mais
        vulnerável e íntimo — a última ceia, véspera da traição e da
        cruz — dando a ele um peso e uma urgência que nenhum outro
        contexto poderia oferecer.`),
      questions: [
        'Você vive de forma que esse amor específico — "assim como eu vos amei" — é reconhecível por quem observa de fora?',
        'Que relação específica hoje pede esse tipo de amor, medido pelo padrão de Jesus, não pelo seu próprio?',
        'Como o momento em que Jesus deu esse mandamento — véspera da cruz — muda o peso que você atribui a ele?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nisto Conhecerão Todos que Sois Meus Discípulos',
      text: t(`Senhor, encerramos esta semana com tua palavra final:
        "nisto conhecerão todos que sois meus discípulos, se tiverdes
        amor uns aos outros." O critério de identificação não é
        doutrina correta isolada, mas amor visível. Que esse seja o
        sinal reconhecível da minha própria fé hoje. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus estabelece o amor mútuo, não a correção
        doutrinária isolada ou o desempenho religioso, como o sinal
        primário e reconhecível de autêntico discipulado diante do
        mundo observador.`),
      questions: [
        'Esta semana — da visão que redefine categorias ao mandamento novo do amor — o que você mais quer levar adiante?',
        'Se esse fosse o único critério visível, alguém reconheceria você como discípulo pelo seu amor concreto?',
        'Como você quer entrar na sexta semana da Páscoa, à luz desse sinal distintivo?',
      ],
    },
  },
];

// Páscoa 6 — Atos 16:9-15 · Salmo 67 · Apocalipse 22:12-14, 16-17, 20-21 · João 14:23-29
const week6: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Passa à Macedônia e Ajuda-nos',
      text: t(`Senhor, através de uma visão noturna, um homem
        macedônio suplicou a Paulo: "passa à Macedônia e ajuda-nos."
        Um pedido que reorientou toda a direção missionária de Paulo.
        Que eu esteja atento hoje a chamados inesperados que possam
        redirecionar meus próprios planos. Amém.`),
    },
    meditation: {
      prompt: t(`Esta visão marca um momento decisivo — a entrada do
        evangelho na Europa — que começou não com planejamento
        estratégico de Paulo, mas com um chamado recebido em sonho,
        vindo de fora de seus planos originais.`),
      questions: [
        'Você já teve seus planos redirecionados por um chamado inesperado que, olhando em retrospecto, foi de Deus?',
        'Como permanecer aberto a esse tipo de redirecionamento sem perder discernimento sobre o que é genuíno?',
        'Que "Macedônia" — necessidade inesperada — pode estar pedindo sua ajuda hoje, fora do seu plano original?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Senhor Lhe Abriu o Coração',
      text: t(`Senhor, Lídia escutava Paulo, "e o Senhor lhe abriu o
        coração para atender às coisas que Paulo dizia." A abertura
        para receber a mensagem foi tua obra, não apenas persuasão
        humana. Que meu próprio coração esteja aberto hoje para o que
        tu queres me dizer. Amém.`),
    },
    meditation: {
      prompt: t(`Lucas atribui explicitamente a Deus, não à
        eloquência de Paulo, a abertura do coração de Lídia — a
        receptividade genuína à Palavra é descrita como obra divina,
        não apenas conquista de argumentação humana.`),
      questions: [
        'Você reconhece, nos momentos em que sua fé cresceu, mais o esforço de convencimento humano ou essa abertura divina do coração?',
        'O que significaria orar hoje, especificamente, por essa abertura de coração — sua própria ou de alguém específico?',
        'Como essa dependência de Deus muda a forma como você compartilha sua fé com outros?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Nos Tem Abençoado',
      text: t(`Senhor, o salmista declara: "a terra tem produzido o
        seu fruto; e Deus, o nosso Deus, tem nos abençoado." Uma
        bênção que se conecta ao propósito maior: "temam-no todas as
        extremidades da terra." Que minha própria bênção recebida
        aponte além de mim mesmo. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não trata a bênção recebida como fim em si
        mesma — ela existe para que "todas as extremidades da terra"
        temam a Deus, ligando prosperidade pessoal a testemunho
        mais amplo.`),
      questions: [
        'Você trata as bênçãos que recebe como fim em si mesmas, ou como parte de um propósito maior de testemunho?',
        'Que bênção concreta você recebeu recentemente que poderia apontar outros para Deus?',
        'O que significaria hoje compartilhar essa bênção de forma que glorifique a Deus, não apenas a si mesmo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Faremos Nele Morada',
      text: t(`Senhor Jesus, prometeste: "se alguém me amar, guardará
        a minha palavra; e meu Pai o amará, e viremos a ele, e faremos
        nele morada." Não visita passageira, mas residência
        permanente. Que meu coração hoje seja morada digna dessa
        presença constante. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa não é de visitas ocasionais, mas de
        "morada" — presença permanente e estabelecida, condicionada
        ao amor expresso através da obediência à palavra recebida.`),
      questions: [
        'Você trata a presença de Deus como visitante ocasional ou como morador permanente do seu coração?',
        'O que significaria, na prática diária, "guardar a palavra" como sinal desse amor que convida a presença divina?',
        'Como essa promessa de morada permanente muda a forma como você organiza sua vida interior?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deixo-vos a Paz, a Minha Paz Vos Dou',
      text: t(`Senhor Jesus, prometeste: "deixo-vos a paz, a minha paz
        vos dou; eu não vo-la dou como o mundo a dá." Uma paz de
        qualidade diferente — não ausência de conflito, mas presença
        estável em meio a ele. Que eu receba hoje essa paz
        específica, não a versão frágil que o mundo oferece. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus distingue explicitamente sua paz da paz
        oferecida "pelo mundo" — uma diferenciação que sugere que a
        paz do mundo depende de circunstâncias favoráveis, enquanto a
        dele permanece independente delas.`),
      questions: [
        'Como distinguir, na sua experiência, entre a paz frágil "do mundo" e a paz mais profunda que Jesus promete?',
        'Que circunstância atual está testando se sua paz depende de condições externas ou de algo mais estável?',
        'O que significaria receber hoje concretamente essa paz "diferente", não apenas esperar por ela?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Pai É Maior do Que Eu',
      text: t(`Senhor Jesus, disseste aos discípulos: "se me amásseis,
        alegrar-vos-íeis de que eu vá para o Pai; porque o Pai é maior
        do que eu." Alegria diante da tua partida, não apenas
        tristeza — porque o propósito maior superava a perda
        imediata. Ajuda-me a ver esse mesmo padrão nas minhas próprias
        perdas. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus pede uma resposta emocional aparentemente
        contraintuitiva — alegria diante de sua partida — porque a
        compreensão do propósito maior deveria superar a tristeza
        imediata da separação.`),
      questions: [
        'Existe alguma "partida" ou perda na sua vida que, com o tempo, você percebeu servir a um propósito maior?',
        'Como equilibrar tristeza genuína por uma perda com essa alegria mais profunda pelo propósito que ela serve?',
        'O que significaria hoje confiar que uma dificuldade atual também serve a algo maior que você ainda não vê?',
      ],
    },
  },
  {
    prayer: {
      title: 'Para Que, Quando Acontecer, Vós Creiais',
      text: t(`Senhor, encerramos esta semana com tua palavra: "eu
        vo-lo disse agora, antes que aconteça, para que, quando
        acontecer, vós creiais." Amanhã celebramos a Ascensão. Que
        tua palavra antecipada me prepare hoje para o que ainda vou
        viver. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus revela informação com antecedência
        especificamente para fortalecer a fé futura — não para
        satisfazer curiosidade presente, mas para que o cumprimento
        confirme, em vez de abalar, a confiança dos discípulos.`),
      questions: [
        'Esta semana — do chamado macedônio à promessa de paz diferente — o que você mais quer levar adiante?',
        'Que palavra de Deus você já recebeu "antes que aconteça" e que precisa lembrar agora?',
        'Como você quer entrar na última semana da Páscoa, à luz dessa preparação antecipada?',
      ],
    },
  },
];

// Páscoa 7 — Atos 16:16-34 · Salmo 97 · Apocalipse 22:12-14, 16-17, 20-21 · João 17:20-26
const week7: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Pela Meia-Noite Paulo e Silas Oravam e Cantavam',
      text: t(`Senhor, presos injustamente, com os pés no tronco,
        "pela meia-noite Paulo e Silas oravam e cantavam hinos a
        Deus, enquanto os presos os escutavam." Louvor em meio à
        pior circunstância, não apenas depois da libertação. Que eu
        encontre hoje essa mesma capacidade de louvar antes do
        alívio chegar. Amém.`),
    },
    meditation: {
      prompt: t(`O louvor de Paulo e Silas acontece precisamente no
        momento de maior sofrimento e injustiça — não como resposta
        ao alívio já recebido, mas como testemunho ativo em meio à
        própria provação.`),
      questions: [
        'Você associa louvor mais com momentos de alívio, ou consegue, como Paulo e Silas, louvar em meio à própria dificuldade?',
        'Quem, ao seu redor, poderia estar "escutando" seu louvor em meio a uma dificuldade que você atravessa?',
        'O que significaria hoje cantar, mesmo antes de ver a libertação chegar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Te Faças Nenhum Mal',
      text: t(`Senhor, quando o carcereiro, vendo as portas abertas,
        ia se suicidar por desespero, Paulo gritou: "não te faças
        nenhum mal, porque todos aqui estamos." Um gesto de cuidado
        pelo próprio carcereiro que os prendia. Ensina-me a estender
        esse mesmo cuidado a quem, à primeira vista, parece
        adversário. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo escolhe deliberadamente permanecer na prisão
        aberta — quando a fuga seria fácil — precisamente para salvar
        a vida do homem responsável por sua própria prisão injusta.`),
      questions: [
        'Você já teve a oportunidade de escapar de uma situação injusta, mas escolheu ficar por cuidado com alguém mais vulnerável na mesma situação?',
        'Quem, hoje, você poderia tratar com esse tipo de cuidado inesperado, mesmo sendo tecnicamente seu "carcereiro"?',
        'O que significaria priorizar o bem de outra pessoa mesmo em meio à própria provação?',
      ],
    },
  },
  {
    prayer: {
      title: 'Crê no Senhor Jesus e Serás Salvo',
      text: t(`Senhor, à pergunta desesperada do carcereiro — "que me
        é necessário fazer para me salvar?" — a resposta de Paulo foi
        direta e simples: "crê no Senhor Jesus e serás salvo, tu e tua
        casa." Nenhuma complicação desnecessária diante de uma
        pergunta genuína. Que minha própria resposta a quem pergunta
        seja igualmente clara. Amém.`),
    },
    meditation: {
      prompt: t(`Diante de uma pergunta urgente e genuína, Paulo não
        oferece um sistema teológico complexo, mas a resposta mais
        simples e direta possível — clareza que respeita a urgência
        real do momento.`),
      questions: [
        'Você tende a complicar demais sua resposta quando alguém faz uma pergunta genuína e urgente sobre fé?',
        'Como cultivar essa mesma clareza simples e direta de Paulo, sem perder profundidade quando apropriado?',
        'O que significaria hoje oferecer uma resposta clara a alguém que talvez esteja perguntando, mesmo sem palavras?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Senhor Reina, Regozije-se a Terra',
      text: t(`Senhor, o salmista proclama: "o Senhor reina,
        regozije-se a terra; alegrem-se as numerosas ilhas." Um
        reinado que alcança até os lugares mais remotos. Que eu
        celebre hoje esse reinado, mesmo nas áreas da minha vida que
        parecem mais distantes ou esquecidas. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo estende deliberadamente o alcance do reinado
        de Deus às "numerosas ilhas" — lugares remotos e isolados —
        sugerindo que nenhuma área, por mais distante que pareça,
        está fora desse domínio.`),
      questions: [
        'Que área "remota" da sua própria vida você tem tratado como fora do alcance do reinado de Deus?',
        'Como a extensão desse reinado até lugares distantes muda sua confiança sobre situações que parecem esquecidas?',
        'O que significaria hoje convidar deliberadamente esse reinado para uma "ilha" isolada da sua vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Para Que Sejam Um, Como Nós Somos Um',
      text: t(`Senhor Jesus, oraste por todos que viriam a crer:
        "para que todos sejam um; assim como tu, ó Pai, és em mim, e
        eu em ti, que também eles sejam um em nós." Uma oração que me
        inclui diretamente, mesmo sem ter estado lá. Que eu viva hoje
        à altura dessa unidade pela qual oraste. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus estende explicitamente esta oração final além
        do círculo imediato dos discípulos presentes, alcançando
        "aqueles que pela sua palavra hão de crer" — incluindo
        diretamente todo crente futuro, você incluído.`),
      questions: [
        'Como saber que essa oração específica de Jesus foi feita pensando também em você, séculos antes de você nascer, muda sua fé?',
        'Que divisão você poderia ajudar a curar hoje, em resposta direta a essa oração de Jesus por unidade?',
        'O que significaria viver hoje como resposta concreta a uma oração que Jesus fez pensando em você?',
      ],
    },
  },
  {
    prayer: {
      title: 'Para Que o Mundo Conheça Que Tu Me Enviaste',
      text: t(`Senhor Jesus, oraste que a unidade dos crentes servisse
        a um propósito: "para que o mundo conheça que tu me
        enviaste, e que os amaste a eles, assim como me amaste a
        mim." A unidade não é fim em si — é testemunho visível ao
        mundo. Que minha comunidade reflita hoje esse propósito. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus conecta diretamente a unidade dos crentes ao
        testemunho perante "o mundo" — a comunhão interna da igreja
        tem propósito externo declarado, não apenas conforto
        interno isolado.`),
      questions: [
        'Sua comunidade de fé é reconhecível "pelo mundo" como testemunho de amor, ou passa despercebida?',
        'O que significaria buscar unidade não apenas para conforto interno, mas para esse propósito declarado por Jesus?',
        'Como você poderia contribuir hoje para que essa unidade seja mais visível a quem observa de fora?',
      ],
    },
  },
  {
    prayer: {
      title: 'Também Eu Neles Esteja',
      text: t(`Senhor, encerramos toda a estação pascal com a
        promessa final de Jesus: "para que haja neles aquele amor com
        que me amaste, e também eu neles esteja." Amanhã celebramos
        Pentecostes — o cumprimento concreto dessa promessa de
        presença permanente. Prepara meu coração para receber. Amém.`),
    },
    meditation: {
      prompt: t(`Esta oração final de Jesus, feita na véspera de sua
        própria prisão, projeta diretamente para o que a igreja
        celebraria em Pentecostes — a chegada do Espírito que
        tornaria real essa presença permanente pedida.`),
      questions: [
        'Toda esta estação pascal — do túmulo vazio à prisão de Filipos — o que você mais quer levar para Pentecostes?',
        'Como você se sente preparado, ou não, para receber amanhã o Espírito que a igreja celebrará?',
        'O que significaria entrar em Pentecostes já vivendo essa presença pela qual Jesus orou?',
      ],
    },
  },
];

const easterC: Record<number, DevotionalEntry[]> = {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
  5: week5,
  6: week6,
  7: week7,
};

export default easterC;
