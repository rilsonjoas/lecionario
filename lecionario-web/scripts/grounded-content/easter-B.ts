/**
 * Páscoa — Ciclo B — conteúdo ancorado no RCL (leituras reais).
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

// Páscoa 1 — Domingo da Ressurreição — Atos 10:34-43 · Salmo 118:1-2, 14-24 · 1 Coríntios 5:6b-8 · João 20:1-18
const week1: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Regozijemo-nos e Alegremo-nos Nele',
      text: t(`Senhor ressuscitado, hoje celebramos: "este é o dia que
        o Senhor fez; regozijemo-nos, e alegremo-nos nele." Depois de
        quarenta dias de jornada quaresmal e da semana mais sombria do
        calendário, chega o dia que muda o sentido de todos os outros.
        Que minha alegria hoje seja genuína, não apenas cerimonial.
        Aleluia! Amém.`),
    },
    meditation: {
      prompt: t(`O salmo, escrito séculos antes, encontra seu
        cumprimento pleno precisamente hoje — a pedra rejeitada pelos
        edificadores tornou-se a pedra angular de tudo.`),
      questions: [
        'Como distinguir, na sua própria experiência, entre alegria cerimonial (esperada da data) e alegria genuína?',
        'Que "pedra rejeitada" na sua vida você já viu Deus transformar em fundamento?',
        'O que significaria viver hoje, concretamente, à luz da afirmação "este é o dia que o Senhor fez"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Faz Acepção de Pessoas',
      text: t(`Senhor, Pedro proclama diante de Cornélio, um gentio:
        "Deus não faz acepção de pessoas; mas que lhe é aceitável
        aquele que, em qualquer nação, o teme e pratica o que é
        justo." A ressurreição não conhece fronteiras étnicas ou
        sociais. Que eu viva essa mesma amplitude sem barreiras hoje.
        Amém.`),
    },
    meditation: {
      prompt: t(`Este discurso marca a primeira vez que o evangelho é
        anunciado explicitamente a um gentio — um momento decisivo de
        expansão que a própria igreja primitiva levou tempo para
        aceitar plenamente.`),
      questions: [
        'Que fronteira social ou cultural você ainda hesita em cruzar com o evangelho?',
        'Você trata a boa notícia como reservada a "gente como eu", ou genuinamente universal?',
        'Como a amplitude do anúncio de Pedro desafia limites que você talvez nem perceba que impõe?',
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
        privada e solitária.`),
      questions: [
        'Quem são as testemunhas cuja fé sustenta ou confirma a sua?',
        'Você vive sua fé de forma mais isolada ou mais comunitária?',
        'O que significaria buscar mais essa confirmação em comunidade esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Expurgai o Fermento Velho',
      text: t(`Senhor, Paulo instrui: "expurgai o fermento velho, para
        que sejais massa nova... porque Cristo, nossa páscoa, já foi
        sacrificado." A ressurreição pede purificação ativa, não
        apenas celebração passiva. Que hábito velho preciso expurgar
        hoje, à luz dessa páscoa cumprida? Amém.`),
    },
    meditation: {
      prompt: t(`Paulo usa a imagem da purificação da casa antes da
        Páscoa judaica — remover todo fermento velho — como metáfora
        para a transformação moral que deveria acompanhar a fé na
        ressurreição, não apenas celebrá-la teoricamente.`),
      questions: [
        'Que "fermento velho" — hábito, atitude, padrão — você reconhece que ainda não expurgou?',
        'Como a celebração da Páscoa deveria se traduzir em mudança concreta, não apenas em sentimento?',
        'O que significaria começar hoje esse processo de purificação ativa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Com os Ázimos da Sinceridade e da Verdade',
      text: t(`Senhor, Paulo conclui: "celebremos a festa... com os
        ázimos da sinceridade e da verdade." A celebração pascal pede
        autenticidade, não fachada. Que minha celebração hoje seja
        genuína, livre da hipocrisia que às vezes acompanha rituais
        repetidos. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo opõe deliberadamente "sinceridade e verdade" a
        "malícia e corrupção" — a celebração cristã genuína exige
        integridade interior, não apenas observância externa
        correta.`),
      questions: [
        'Sua celebração da Páscoa este ano tem sido mais sincera ou mais automática, por hábito?',
        'O que significaria celebrar hoje "com sinceridade e verdade", examinando sua própria motivação?',
        'Existe alguma área de falta de sinceridade que a luz da ressurreição está expondo em você?',
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
        um modelo de testemunho simples que não precisa de
        elaboração teológica complexa para ser eficaz.`),
      questions: [
        'Esta primeira semana pascal — da acepção de pessoas ao chamado pelo nome — o que você mais quer levar adiante?',
        'Como você anunciaria, hoje, com a mesma simplicidade de Maria, o que já experimentou de Deus?',
        'O que significaria entrar na segunda semana da Páscoa carregando esse testemunho direto?',
      ],
    },
  },
];

// Páscoa 2 — Atos 4:32-35 · Salmo 133 · 1 João 1:1-2:2 · João 20:19-31
const week2: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Um Só o Coração e Uma Só a Alma',
      text: t(`Senhor, a multidão dos que criam "era um só o coração e
        uma só a alma, e ninguém dizia que coisa alguma das que
        possuía era sua própria." Uma unidade que se expressava até em
        questões materiais. Que minha própria comunidade de fé busque
        essa mesma unidade concreta hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A descrição de Atos 4 vai além de simpatia ou boas
        intenções — a unidade de coração se traduzia em disposição
        real de compartilhar bens, um teste concreto de comunhão
        genuína.`),
      questions: [
        'Sua comunidade de fé reflete algo dessa unidade profunda, ou permanece mais superficial?',
        'O que significaria, para você, tratar seus próprios bens com essa mesma disposição generosa?',
        'Que passo concreto você poderia dar esta semana em direção a essa unidade de coração e alma?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Havia Entre Eles Necessitado Algum',
      text: t(`Senhor, o resultado da generosidade da igreja primitiva
        era concreto: "não havia entre eles necessitado algum." Não
        apenas boas intenções, mas resultado mensurável. Que minha
        própria generosidade produza esse mesmo efeito tangível ao
        meu redor. Amém.`),
    },
    meditation: {
      prompt: t(`Lucas registra um resultado concreto e verificável da
        generosidade da igreja primitiva — não apenas um ideal
        espiritual abstrato, mas necessidades materiais reais sendo
        supridas de fato.`),
      questions: [
        'Você mede sua generosidade por intenção ou por resultado concreto e verificável?',
        'Existe alguém, hoje, cuja necessidade concreta você poderia ajudar a suprir?',
        'O que impede sua comunidade de alcançar esse mesmo padrão — "não havia necessitado algum"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quão Bom É que os Irmãos Vivam em União',
      text: t(`Senhor, o salmista celebra: "quão bom e quão suave é
        que os irmãos vivam em união... porque ali o Senhor ordenou a
        bênção, a vida para sempre." A união fraterna não é apenas
        agradável — atrai bênção divina específica. Que eu cultive
        essa união hoje, onde estiver fragmentada. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo liga diretamente a união fraterna à presença
        e bênção de Deus — não são duas coisas separadas, mas a união
        genuína é descrita como o próprio lugar onde a bênção é
        "ordenada".`),
      questions: [
        'Onde você percebe fragmentação, em vez de união, entre irmãos na fé?',
        'O que significaria buscar ativamente essa união, sabendo que ali "o Senhor ordena a bênção"?',
        'Que primeiro passo concreto você poderia dar hoje em direção à reconciliação com alguém?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se Andarmos na Luz',
      text: t(`Senhor, João escreve: "se andarmos na luz, como ele na
        luz está, temos comunhão uns com os outros, e o sangue de
        Jesus... nos purifica de todo pecado." A comunhão genuína
        depende de viver na luz, não na escuridão escondida. Que eu
        ande hoje sem esconder o que preciso trazer à luz. Amém.`),
    },
    meditation: {
      prompt: t(`João conecta diretamente "andar na luz" com comunhão
        genuína — a honestidade sobre o próprio pecado, em vez de
        escondê-lo, é o que abre espaço para relacionamento real, não
        aparência de perfeição.`),
      questions: [
        'Que área da sua vida você mantém "na escuridão", escondida até de pessoas próximas?',
        'O que impede você de trazer isso à luz, mesmo sabendo que a purificação depende disso?',
        'Como a comunhão genuína muda quando é praticada na luz, não na aparência controlada?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se Confessarmos os Nossos Pecados',
      text: t(`Senhor, João promete: "se confessarmos os nossos
        pecados, ele é fiel e justo para nos perdoar os pecados, e nos
        purificar de toda injustiça." Uma promessa condicionada
        apenas à confissão honesta. Que eu confesse hoje o que ainda
        não trouxe abertamente a ti. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa de João não depende de méritos ou
        performance — apenas da confissão honesta, apoiada no caráter
        fiel e justo de Deus, não na dignidade de quem confessa.`),
      questions: [
        'O que você ainda não confessou abertamente a Deus, talvez por vergonha ou medo?',
        'Como a promessa de fidelidade e justiça de Deus — não seu próprio mérito — muda sua disposição de confessar?',
        'O que significaria buscar hoje essa purificação através de confissão simples e direta?',
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
        'Esta semana — da unidade da igreja primitiva à bênção de Tomé — o que você mais quer levar adiante?',
        'Como essa bênção específica, endereçada a quem "não viu", muda como você vê sua própria fé?',
        'O que significaria entrar na terceira semana da Páscoa vivendo concretamente essa bem-aventurança?',
      ],
    },
  },
];

// Páscoa 3 — Atos 3:12-19 · Salmo 4 · 1 João 3:1-7 · Lucas 24:36-48
const week3: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Vós Negastes o Santo e Justo',
      text: t(`Senhor, Pedro confronta diretamente a multidão: "vós
        negastes o Santo e Justo, e pedistes que se vos desse um
        homicida." Uma acusação dura, mas seguida imediatamente de
        misericórdia: "eu sei que o fizestes por ignorância." Ajuda-me
        a receber correção sem me destruir sob o peso dela. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro combina confronto direto com misericórdia
        explícita — a verdade sobre o pecado da multidão não é
        suavizada, mas também não é apresentada sem o reconhecimento
        de que agiram "por ignorância".`),
      questions: [
        'Você tende a evitar confronto direto sobre erro real, ou a apresentá-lo sem misericórdia junto?',
        'Como a combinação de Pedro — verdade dura e graça imediata — poderia moldar uma conversa difícil que você precisa ter?',
        'Existe algo que você fez "por ignorância" que ainda carrega como culpa desproporcional?',
      ],
    },
  },
  {
    prayer: {
      title: 'Arrependei-vos e Convertei-vos',
      text: t(`Senhor, Pedro convida: "arrependei-vos, pois, e
        convertei-vos, para que sejam apagados os vossos pecados, de
        sorte que venham os tempos de refrigério." Arrependimento não
        como fardo, mas como caminho para refrigério genuíno. Que eu
        busque hoje esse mesmo caminho. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro apresenta o arrependimento não como punição
        adicional, mas como porta para "tempos de refrigério" — uma
        reformulação que transforma a confissão de fardo em
        alívio.`),
      questions: [
        'Você associa arrependimento mais com fardo e vergonha, ou com o "refrigério" que Pedro promete?',
        'Que área da sua vida precisa desse tipo de conversão hoje?',
        'O que significaria buscar arrependimento genuíno esperando alívio real, não apenas culpa aliviada temporariamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sabei que o Senhor Separou para Si o Piedoso',
      text: t(`Senhor, o salmista declara: "sabei que o Senhor
        separou para si aquele que é piedoso; o Senhor me ouve quando
        eu clamo a ele." Uma confiança tranquila, mesmo cercado por
        quem "converte a glória em infâmia". Que eu descanse hoje
        nessa mesma certeza de ser ouvido. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo é escrito em contexto de oposição real
        ("filhos dos homens, até quando convertereis a minha glória em
        infâmia") — a confiança não nega o conflito, mas repousa
        apesar dele.`),
      questions: [
        'Você enfrenta hoje algum tipo de oposição ou desonra injusta que precisa levar a Deus?',
        'Como a certeza de que "o Senhor separou para si o piedoso" muda sua forma de responder a essa oposição?',
        'O que significaria clamar hoje, confiando que serás ouvido, como o salmista confiava?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vede Que Grande Amor',
      text: t(`Senhor, João exclama: "vede que grande amor nos tem
        concedido o Pai: que fôssemos chamados filhos de Deus; e nós o
        somos." Não título simbólico, mas identidade real e presente.
        Que eu viva hoje consciente dessa filiação genuína, não
        apenas conceitual. Amém.`),
    },
    meditation: {
      prompt: t(`João insiste que a filiação divina não é apenas
        título honorário ou esperança futura — "e nós o somos" —
        realidade presente e concreta, já efetiva agora.`),
      questions: [
        'Você vive mais consciente de ser "filho de Deus" como fato presente, ou como ideia distante?',
        'Como essa identidade mudaria uma decisão específica que você enfrenta hoje?',
        'O que significaria receber hoje esse "grande amor" não como conceito, mas como realidade vivida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ainda Não É Manifesto o Que Havemos de Ser',
      text: t(`Senhor, João admite honestamente: "ainda não é
        manifesto o que havemos de ser. Mas sabemos que, quando ele se
        manifestar, seremos semelhantes a ele." Há mistério genuíno
        sobre meu futuro completo — e isso não diminui a esperança.
        Que eu viva em paz com essa incerteza parcial. Amém.`),
    },
    meditation: {
      prompt: t(`João combina honestidade sobre o que ainda não se
        sabe completamente ("ainda não é manifesto") com confiança
        clara sobre a direção geral ("seremos semelhantes a ele") —
        mistério e certeza convivendo.`),
      questions: [
        'Você consegue viver em paz com aspectos do seu futuro espiritual que permanecem, honestamente, incertos?',
        'O que significa, para você, que um dia será "semelhante a ele", mesmo sem saber os detalhes completos?',
        'Como essa esperança, mesmo parcial, muda a forma como você vive hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Olhai as Minhas Mãos e os Meus Pés',
      text: t(`Senhor Jesus, diante do medo dos discípulos, que
        pensavam ver um espírito, ofereceste prova concreta: "olhai as
        minhas mãos e os meus pés, que sou eu mesmo; apalpai-me e
        vede." Tua ressurreição é física, não apenas espiritual
        abstrata. Que eu confie nessa realidade concreta hoje. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus insiste deliberadamente na realidade física da
        ressurreição — não fantasma, não visão espiritual apenas, mas
        corpo tangível, com marcas reais das feridas ainda
        visíveis.`),
      questions: [
        'Você tende a espiritualizar demais a ressurreição, perdendo de vista sua realidade concreta e física?',
        'Como a insistência de Jesus em ser tocado muda sua compreensão da esperança da ressurreição para você mesmo?',
        'O que significaria confiar hoje numa fé que não teme evidência concreta, como Jesus não temeu?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vós Sois Testemunhas Destas Coisas',
      text: t(`Senhor, encerramos esta semana com tua palavra final
        aos discípulos: "vós sois testemunhas destas coisas." O
        mesmo chamado que receberam então chega até mim hoje. Que eu
        viva à altura desse título — testemunha, não apenas
        espectador. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus encerra o encontro não com mais explicação
        teológica, mas com comissionamento direto — os discípulos
        deixam de ser apenas receptores da revelação para se
        tornarem seus transmissores.`),
      questions: [
        'Esta semana — da correção misericordiosa de Pedro à comissão final de Jesus — o que você mais quer levar adiante?',
        'Você vive mais como espectador da fé ou como testemunha ativa dela?',
        'Como você quer entrar na quarta semana da Páscoa, à luz dessa comissão recebida?',
      ],
    },
  },
];

// Páscoa 4 — Atos 4:5-12 · Salmo 23 · 1 João 3:16-24 · João 10:11-18
const week4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Em Nenhum Outro Há Salvação',
      text: t(`Senhor, diante das autoridades, Pedro declarou sem
        rodeios: "em nenhum outro há salvação; porque debaixo do céu
        nenhum outro nome há, dado entre os homens, em que devamos ser
        salvos." Uma exclusividade que hoje soa contracultural. Que eu
        tenha essa mesma clareza, sem hesitação envergonhada. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro faz essa declaração exclusiva precisamente
        diante de quem tinha poder para prendê-lo — a clareza da
        convicção não diminui diante de consequência real e
        imediata.`),
      questions: [
        'Você hesita em afirmar clareza sobre sua fé quando isso poderia gerar desconforto social?',
        'O que sustentava a coragem de Pedro diante de autoridades reais e ameaçadoras?',
        'Como manter essa clareza sem perder a humildade e o respeito por quem discorda?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Pedra Rejeitada pelos Edificadores',
      text: t(`Senhor, Pedro cita novamente o salmo: "ele é a pedra
        que foi rejeitada por vós, os edificadores, a qual foi posta
        como pedra angular." A rejeição humana não invalidou o
        propósito divino. Que eu confie nisso quando algo meu for
        rejeitado injustamente. Amém.`),
    },
    meditation: {
      prompt: t(`A mesma imagem do Salmo 118, citada no Domingo de
        Páscoa, reaparece aqui diante das autoridades — a rejeição não
        apenas não impediu, mas se tornou parte do próprio plano de
        Deus.`),
      questions: [
        'Que rejeição você sofreu que, olhando em retrospecto, Deus usou de forma que você não esperava?',
        'Como essa imagem repetida — pedra rejeitada, pedra angular — muda sua confiança diante de rejeição atual?',
        'O que significaria confiar hoje que a rejeição não tem a palavra final sobre o seu valor?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Tua Vara e o Teu Cajado me Consolam',
      text: t(`Senhor, meu pastor, "ainda que eu ande pelo vale da
        sombra da morte, não temerei mal algum, porque tu estás
        comigo; a tua vara e o teu cajado me consolam." Instrumentos
        de correção e proteção, ambos consoladores. Que eu aceite hoje
        tanto tua correção quanto tua proteção como consolo. Amém.`),
    },
    meditation: {
      prompt: t(`A vara e o cajado eram, literalmente, instrumentos de
        disciplina e de defesa usados por pastores reais — o salmo os
        descreve, surpreendentemente, como fonte de consolo, não de
        medo.`),
      questions: [
        'Você recebe a correção de Deus mais como ameaça ou como consolo, como o salmo descreve?',
        'Que "vale da sombra da morte" você atravessa hoje, precisando dessa companhia?',
        'O que significaria confiar que até a disciplina de Deus, como a vara do pastor, é forma de cuidado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Amemos de Palavra, Nem de Língua',
      text: t(`Senhor, João instrui: "não amemos de palavra, nem de
        língua, mas por obras e em verdade." O amor genuíno se prova
        em ação concreta, não em declaração. Que meu amor hoje se
        expresse por obras específicas, não apenas sentimento
        declarado. Amém.`),
    },
    meditation: {
      prompt: t(`João contrasta diretamente amor verbal com amor
        praticado — a genuinidade do amor cristão, para ele, se prova
        especificamente na disposição de agir, não apenas de
        declarar sentimento.`),
      questions: [
        'Seu amor por alguém próximo tem se expressado mais em palavras ou em ações concretas recentemente?',
        'Que "obra" específica você poderia realizar hoje que comunicaria amor melhor do que qualquer palavra?',
        'Existe alguém a quem você declara amor, mas cujas necessidades concretas você tem ignorado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sou o Bom Pastor; Dou a Minha Vida pelas Ovelhas',
      text: t(`Senhor Jesus, declaraste: "eu sou o bom pastor; o bom
        pastor dá a sua vida pelas ovelhas." Não mercenário que foge
        do perigo, mas pastor que permanece até o fim. Que eu confie
        hoje nessa disposição tua de nunca me abandonar diante da
        ameaça. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus contrasta deliberadamente o "bom pastor" com o
        "mercenário" — a diferença não está na presença durante a
        calmaria, mas na permanência precisamente quando o lobo
        aparece.`),
      questions: [
        'Você já experimentou alguém agir como "mercenário" — presente só enquanto conveniente — em vez de pastor fiel?',
        'Como a promessa de Jesus de nunca fugir muda sua confiança diante de uma ameaça atual?',
        'O que significaria imitar esse tipo de fidelidade em algum relacionamento onde você é responsável por outros?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tenho Ainda Outras Ovelhas',
      text: t(`Senhor Jesus, disseste: "tenho ainda outras ovelhas que
        não são deste aprisco; a essas também me importa conduzir...
        e haverá um rebanho e um pastor." Teu cuidado se estende além
        das fronteiras que eu talvez trace. Que eu reconheça hoje
        "outras ovelhas" que ainda não considerei parte do rebanho.
        Amém.`),
    },
    meditation: {
      prompt: t(`Jesus antecipa deliberadamente a expansão do rebanho
        para além das fronteiras conhecidas de Israel — um só rebanho
        futuro que incluiria pessoas ainda fora da experiência
        imediata dos discípulos.`),
      questions: [
        'Quem você já classificou, consciente ou inconscientemente, como fora do "aprisco" que merece cuidado?',
        'Como essa promessa de Jesus desafia fronteiras que sua própria comunidade talvez trace sem perceber?',
        'O que significaria buscar ativamente essas "outras ovelhas" esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ninguém Ma Tira de Mim',
      text: t(`Senhor, encerramos esta semana com tua declaração de
        soberania sobre a própria morte: "ninguém ma tira de mim, mas
        eu de mim mesmo a dou; tenho autoridade para a dar, e tenho
        autoridade para retomá-la." Nem mesmo a cruz foi imposta sem
        teu consentimento ativo. Que eu confie nessa soberania sobre
        tudo o que me ameaça. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus insiste que sua morte não foi imposta por
        circunstâncias fora de controle, mas dada voluntariamente,
        com autoridade plena tanto para entregar a vida quanto para
        retomá-la.`),
      questions: [
        'Esta semana — da declaração ousada de Pedro à soberania do Bom Pastor — o que te ensinou sobre confiança diante da ameaça?',
        'Como a soberania de Jesus sobre a própria morte muda sua confiança diante do que você teme perder?',
        'O que significaria entrar na quinta semana da Páscoa descansando nessa autoridade que Jesus mesmo reivindica?',
      ],
    },
  },
];

// Páscoa 5 — Atos 8:26-40 · Salmo 22:25-31 · 1 João 4:7-21 · João 15:1-8
const week5: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Entendes, Porventura, o Que Estás Lendo?',
      text: t(`Senhor, Filipe perguntou ao eunuco etíope: "entendes,
        porventura, o que estás lendo?" E o eunuco respondeu com
        humildade: "como poderei entender, se alguém não me
        ensinar?" Que eu tenha essa mesma humildade diante do que
        ainda não compreendo nas Escrituras. Amém.`),
    },
    meditation: {
      prompt: t(`O eunuco, apesar de sua posição de poder e riqueza,
        admite abertamente sua necessidade de ensino — uma humildade
        intelectual que abre espaço para o encontro transformador que
        se segue.`),
      questions: [
        'Você tende a fingir entendimento que não tem, por orgulho ou vergonha de perguntar?',
        'Quem, na sua vida, poderia desempenhar o papel de Filipe, ajudando você a entender algo que ainda confunde?',
        'O que significaria abordar hoje um texto difícil da Escritura com essa mesma humildade do eunuco?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eis Aqui Água; Que Impede que Eu Seja Batizado?',
      text: t(`Senhor, assim que compreendeu quem era Jesus, o eunuco
        perguntou sem hesitação: "eis aqui água; que impede que eu
        seja batizado?" Uma resposta imediata à revelação recebida.
        Que minha própria resposta a ti seja tão pronta e sem
        obstáculos autoimpostos. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta do eunuco é retórica — ele já sabe que
        nada deveria impedir, e a narrativa confirma isso ao não
        registrar hesitação alguma de Filipe antes do batismo
        imediato.`),
      questions: [
        'Que "obstáculo" você tem imaginado existir entre você e um passo de fé que, na verdade, não existe?',
        'Como a prontidão do eunuco desafia sua própria tendência a adiar respostas claras a Deus?',
        'O que significaria remover hoje um obstáculo autoimposto que você mesmo criou?',
      ],
    },
  },
  {
    prayer: {
      title: 'Os Mansos Comerão e Se Fartarão',
      text: t(`Senhor, o salmista promete: "os mansos comerão e se
        fartarão; louvarão ao Senhor os que o buscam." Não os
        poderosos, mas os mansos — sendo saciados plenamente, não
        apenas sobrevivendo. Que eu confie hoje nessa provisão
        específica para quem busca, sem exigir, a tua mesa. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo escolhe deliberadamente "os mansos" como
        destinatários da fartura prometida — não conquista pela
        força, mas satisfação concedida a quem busca com humildade,
        exatamente o tipo de encontro que Filipe teve com o eunuco
        etíope.`),
      questions: [
        'Você busca a Deus mais como quem exige respostas, ou como alguém manso, disposto a receber o que for dado?',
        'Que "fartura" espiritual você tem procurado por esforço próprio, quando poderia simplesmente vir buscar e receber?',
        'O que significaria hoje se aproximar da mesa de Deus com essa mesma mansidão, confiando que haverá fartura?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus É Amor',
      text: t(`Senhor, João declara diretamente: "Deus é amor." Não
        apenas "Deus ama" — uma ação entre outras — mas amor como a
        própria essência de quem tu és. Que essa verdade fundamental
        molde hoje toda a minha compreensão de quem se dirige a mim.
        Amém.`),
    },
    meditation: {
      prompt: t(`A afirmação de João vai além de descrever uma
        qualidade de Deus entre várias — ela identifica o amor como a
        própria natureza essencial de Deus, o ponto de partida para
        entender tudo o mais sobre ele.`),
      questions: [
        'Sua imagem de Deus é moldada primeiro por essa verdade — "Deus é amor" — ou por outras características primeiro?',
        'Como reordenar sua compreensão de Deus, colocando o amor como ponto de partida, mudaria sua oração hoje?',
        'O que significaria tratar cada interação com Deus hoje à luz dessa identidade essencial dele?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Perfeito Amor Lança Fora o Medo',
      text: t(`Senhor, João ensina: "no amor não há medo; antes o
        perfeito amor lança fora o medo." Meu medo muitas vezes revela
        onde ainda não recebi plenamente esse amor. Que eu permita
        hoje que teu amor expulse o medo específico que carrego.
        Amém.`),
    },
    meditation: {
      prompt: t(`João estabelece uma relação inversamente proporcional
        entre amor experimentado e medo sentido — o crescimento em um
        naturalmente diminui a presença do outro, sem eliminar a
        possibilidade de crescer mais.`),
      questions: [
        'Que medo específico você carrega hoje que talvez revele uma área onde ainda não recebeu plenamente o amor de Deus?',
        'Como distinguir entre medo saudável (prudência) e o medo que o "perfeito amor" deveria expulsar?',
        'O que significaria, concretamente, abrir esse medo específico à ação desse amor hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu Sou a Videira; Vós Sois as Varas',
      text: t(`Senhor Jesus, declaraste: "eu sou a videira; vós sois
        as varas. Quem permanece em mim e eu nele, esse dá muito
        fruto; porque sem mim nada podeis fazer." Não parceria entre
        iguais, mas dependência vital e constante. Que eu reconheça
        hoje essa dependência, sem tentar produzir fruto por conta
        própria. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem da videira estabelece uma dependência que
        não é ocasional, mas contínua e vital — a vara separada da
        videira não apenas produz menos fruto, mas seca completamente
        e perde toda capacidade produtiva.`),
      questions: [
        'Em que área você tem tentado "dar fruto" com esforço próprio, desconectado da fonte real?',
        'O que significa, na prática diária, "permanecer" na videira, não apenas visitá-la ocasionalmente?',
        'Como reconhecer os sinais de que você está tentando produzir sem essa conexão vital constante?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nisto É Glorificado Meu Pai',
      text: t(`Senhor, encerramos esta semana com tua palavra: "nisto
        é glorificado meu Pai, que deis muito fruto." O propósito
        final do fruto não é minha própria satisfação, mas a glória
        do Pai. Que eu viva hoje orientado por esse propósito maior.
        Amém.`),
    },
    meditation: {
      prompt: t(`Jesus conecta diretamente o fruto produzido pelos
        discípulos com a glória do Pai — o propósito da produtividade
        espiritual não termina no próprio discípulo, mas aponta para
        além dele.`),
      questions: [
        'Esta semana — da humildade do eunuco à dependência vital da videira — o que você mais quer levar adiante?',
        'Você mede o "fruto" da sua vida mais pela própria satisfação, ou pela glória que traz a Deus?',
        'Como você quer entrar na sexta semana da Páscoa, à luz dessa reflexão sobre permanecer e frutificar?',
      ],
    },
  },
];

// Páscoa 6 — Atos 10:44-48 · Salmo 98 · 1 João 5:1-6 · João 15:9-17
const week6: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Também Sobre os Gentios Se Derramou o Espírito',
      text: t(`Senhor, os crentes judeus "maravilharam-se de que
        também sobre os gentios se derramasse o dom do Espírito
        Santo." Tua obra ultrapassou expectativas até dos mais fiéis.
        Que eu permaneça aberto a formas surpreendentes de tua ação,
        mesmo quando desafiam minhas categorias. Amém.`),
    },
    meditation: {
      prompt: t(`A surpresa genuína dos crentes judeus mostra que até
        pessoas de fé sincera podem ter expectativas limitadas demais
        sobre onde e em quem Deus escolhe agir.`),
      questions: [
        'Você já ficou surpreso — talvez até desconfortável — ao ver Deus agir de forma que não esperava, em alguém inesperado?',
        'Que categoria ou expectativa sua sobre "quem" Deus alcança poderia estar limitando demais sua visão?',
        'Como imitar a disposição desses primeiros crentes de reconhecer e aceitar essa surpresa, em vez de resistir a ela?',
      ],
    },
  },
  {
    prayer: {
      title: 'Pode Alguém Recusar a Água?',
      text: t(`Senhor, diante da evidência clara da obra do Espírito,
        Pedro perguntou: "pode alguém porventura recusar a água para
        que não sejam batizados estes que também, como nós, receberam
        o Espírito Santo?" Que eu não erga barreiras onde tu já
        removeste. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro reconhece que a evidência da obra de Deus deve
        preceder e determinar a resposta da igreja, não o contrário —
        a estrutura humana se ajusta à ação divina já observada, não
        o inverso.`),
      questions: [
        'Você já ergueu, sem perceber, alguma barreira que Deus já havia removido?',
        'Como reconhecer, na prática, quando a evidência da obra de Deus deveria mudar sua própria resistência?',
        'O que significaria hoje deixar de "recusar a água" a alguém que Deus já recebeu?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cantai ao Senhor um Cântico Novo',
      text: t(`Senhor, o salmista convida: "cantai ao Senhor um
        cântico novo, porque ele tem feito maravilhas." Um novo
        cântico para uma nova obra — não repetir mecanicamente o
        antigo, mas celebrar o que Deus está fazendo agora. Que eu
        encontre hoje palavras novas para o que tu tens feito
        recentemente. Amém.`),
    },
    meditation: {
      prompt: t(`O convite a um "cântico novo" sugere que a resposta
        de louvor deveria acompanhar e refletir ações novas e
        específicas de Deus, não apenas repetir fórmulas antigas sem
        conexão com a realidade presente.`),
      questions: [
        'Que "maravilha" recente de Deus na sua vida ainda não recebeu de você um "cântico novo" — reconhecimento específico?',
        'Você tende a louvar com fórmulas antigas repetidas, ou busca linguagem nova para experiências novas?',
        'O que significaria hoje compor, mesmo informalmente, esse cântico novo pessoal?',
      ],
    },
  },
  {
    prayer: {
      title: 'Todo Aquele Que É Nascido de Deus Vence o Mundo',
      text: t(`Senhor, João declara: "todo o que é nascido de Deus
        vence o mundo; e esta é a vitória que vence o mundo: a nossa
        fé." Não vitória por força própria, mas pela fé que já
        pertence a quem nasceu de novo. Que eu viva hoje reivindicando
        essa vitória já dada. Amém.`),
    },
    meditation: {
      prompt: t(`João identifica a "vitória" não com conquista futura
        distante, mas com a própria fé já presente no crente —
        vitória como identidade atual, não apenas esperança adiada.`),
      questions: [
        'Você vive mais como alguém em batalha incerta, ou como alguém que já carrega a vitória, como João descreve?',
        'Que "mundo" — pressão, tentação, sistema de valores contrário — você precisa vencer hoje através dessa fé?',
        'O que significaria reivindicar essa vitória já dada, em vez de lutar como se ainda não a tivesse?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ninguém Tem Maior Amor do Que Este',
      text: t(`Senhor Jesus, declaraste: "ninguém tem maior amor do
        que este, de dar alguém a sua vida pelos seus amigos." O
        padrão máximo de amor, que tu mesmo vivestes primeiro. Que eu
        busque, nas minhas próprias medidas, viver segundo esse
        padrão. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus define o amor supremo não como sentimento
        intenso, mas como disposição concreta de sacrifício pelo
        outro — um padrão que ele mesmo cumpriria literalmente dias
        depois desta conversa.`),
      questions: [
        'Como esse padrão — dar a vida pelos amigos — se traduz em gestos menores, mas reais, na sua rotina?',
        'Existe alguém por quem você resiste a fazer um sacrifício real, mesmo pequeno?',
        'O que significaria viver hoje um pouco mais próximo desse padrão máximo de amor?',
      ],
    },
  },
  {
    prayer: {
      title: 'Já Não Vos Chamo Servos, Mas Amigos',
      text: t(`Senhor Jesus, declaraste: "já não vos chamo servos,
        porque o servo não sabe o que faz o seu senhor; mas chamei-vos
        amigos, porque tudo quanto ouvi de meu Pai vos dei a
        conhecer." Uma promoção de relacionamento, não apenas de
        título. Que eu viva hoje como amigo, não apenas servo
        obediente. Amém.`),
    },
    meditation: {
      prompt: t(`A diferença que Jesus estabelece entre servo e amigo
        está no acesso ao conhecimento e à intimidade — o amigo é
        incluído no propósito e no coração, não apenas instruído a
        obedecer sem explicação.`),
      questions: [
        'Você se relaciona com Deus mais como servo cumprindo ordens, ou como amigo incluído em seus propósitos?',
        'O que significa, para você, ter acesso ao "que o Senhor faz", não apenas receber instruções isoladas?',
        'Como essa amizade oferecida por Jesus muda sua forma de orar hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Que Vos Ameis Uns aos Outros',
      text: t(`Senhor, encerramos esta semana com teu mandamento
        central: "isto vos mando: que vos ameis uns aos outros."
        Amanhã celebramos a Ascensão — o início de uma nova forma da
        tua presença entre nós. Que eu viva hoje já esse mandamento
        simples e essencial. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus reduz o mandamento final desta longa conversa a
        uma única instrução essencial — não múltiplas regras
        complexas, mas o amor mútuo como resumo de tudo o mais que
        ele ensinou.`),
      questions: [
        'Esta semana — da surpresa da inclusão dos gentios ao mandamento simples do amor — o que você mais quer levar adiante?',
        'Se tivesse que resumir sua fé em um único mandamento, como Jesus fez aqui, o que diria?',
        'Como você quer entrar na última semana da Páscoa, à luz desse mandamento essencial?',
      ],
    },
  },
];

// Páscoa 7 — Atos 1:15-17, 21-26 · Salmo 1 · 1 João 5:9-13 · João 17:6-19
const week7: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Convinha Que Se Cumprisse a Escritura',
      text: t(`Senhor, Pedro, diante da vaga deixada por Judas,
        reconheceu: "convinha que se cumprisse a escritura." Mesmo a
        traição mais dolorosa encontrou lugar dentro do teu propósito
        maior. Que eu confie hoje que nem mesmo minha maior decepção
        escapa ao teu cuidado soberano. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro processa a traição de Judas — provavelmente a
        experiência mais dolorosa do grupo apostólico — através da
        lente da Escritura cumprida, sem minimizar a dor, mas
        situando-a dentro de um propósito maior.`),
      questions: [
        'Que traição ou decepção você carrega que ainda não conseguiu situar dentro de um propósito maior?',
        'Como a resposta de Pedro — nem negação nem desespero, mas reconhecimento de propósito — poderia orientar sua própria dor?',
        'O que significaria confiar hoje que Deus segue trabalhando mesmo através das piores traições humanas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deitaram Sortes a Respeito Deles',
      text: t(`Senhor, para escolher o substituto de Judas, os
        apóstolos oraram e "deitaram sortes... e caiu a sorte sobre
        Matias." Um método que hoje pareceria estranho, mas que
        revela dependência genuína de tua orientação em decisões
        difíceis. Guia hoje minha própria decisão incerta. Amém.`),
    },
    meditation: {
      prompt: t(`O método usado pelos apóstolos — lançar sortes,
        precedido de oração explícita — reflete uma cultura diferente
        da nossa, mas revela um princípio permanente: buscar
        ativamente a orientação de Deus antes de decisões
        importantes.`),
      questions: [
        'Que decisão importante você enfrenta hoje sem ter buscado, com a mesma intencionalidade dos apóstolos, a orientação de Deus?',
        'Como você discerne a vontade de Deus em decisões onde não há resposta óbvia?',
        'O que significaria orar antes de decidir, como os apóstolos oraram antes de lançar sortes?',
      ],
    },
  },
  {
    prayer: {
      title: 'Como a Árvore Plantada Junto às Correntes de Águas',
      text: t(`Senhor, o salmista descreve quem medita na tua lei
        "como a árvore plantada junto às correntes de águas, a qual
        dá o seu fruto na estação própria." Não fruto forçado, mas
        fruto natural de raízes bem nutridas. Que eu esteja hoje bem
        enraizado em ti. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem da árvore enfatiza que o fruto vem
        naturalmente de estar bem plantado e nutrido, não de esforço
        direto para produzi-lo — a raiz determina o fruto, não a
        pressão externa.`),
      questions: [
        'Você tem investido mais em "produzir fruto" diretamente, ou em estar bem enraizado nas fontes certas?',
        'O que significaria, concretamente, estar "plantado junto às correntes de águas" na sua rotina de fé?',
        'Que raiz precisa de mais atenção hoje para que o fruto certo venha, na estação própria, sem forçar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Nos Deu a Vida Eterna',
      text: t(`Senhor, João declara: "Deus nos deu a vida eterna; e
        esta vida está em seu Filho." Um dom já concedido, não apenas
        prometido para o futuro distante. Que eu viva hoje como
        alguém que já possui essa vida, não apenas espera por ela.
        Amém.`),
    },
    meditation: {
      prompt: t(`João usa o tempo verbal do passado — "deu", não
        "dará" — enfatizando que a vida eterna é posse presente do
        crente, localizada especificamente "no Filho", não em méritos
        próprios.`),
      questions: [
        'Você vive mais como alguém esperando a vida eterna no futuro, ou como quem já a possui agora, "no Filho"?',
        'Como essa posse presente muda a forma como você encara a ansiedade sobre o futuro?',
        'O que significaria viver hoje já a partir dessa certeza, não apenas na expectativa dela?',
      ],
    },
  },
  {
    prayer: {
      title: 'Santifica-os na Verdade',
      text: t(`Senhor Jesus, oraste pelos discípulos: "santifica-os na
        verdade, a tua palavra é a verdade." Não pedes que sejam
        removidos do mundo, mas transformados dentro dele pela
        verdade. Que a tua palavra me santifique hoje, onde quer que
        eu esteja. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não ora pela remoção dos discípulos do mundo
        difícil onde vivem, mas pela transformação interior deles
        através da verdade — permanecer no mundo, mas
        genuinamente diferente dele.`),
      questions: [
        'Você busca mais escapar de contextos difíceis, ou ser transformado pela verdade dentro deles?',
        'Que área da sua vida precisa hoje dessa santificação específica pela Palavra?',
        'Como viver "no mundo, mas não do mundo" de forma concreta, não apenas como frase repetida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Assim Como Tu Me Enviaste ao Mundo',
      text: t(`Senhor Jesus, oraste: "assim como tu me enviaste ao
        mundo, também eu os enviarei ao mundo." Um envio que espelha
        o teu próprio, com o mesmo propósito e urgência. Que eu
        reconheça hoje meu próprio envio, não apenas minha
        permanência passiva. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus estabelece uma continuidade direta entre sua
        própria missão e a dos discípulos — o mesmo padrão de envio,
        não uma tarefa menor ou secundária, mas participação real na
        mesma missão.`),
      questions: [
        'Você vive mais consciente de ser "enviado", com propósito específico, ou apenas de estar presente sem missão clara?',
        'Como a comparação direta com o próprio envio de Jesus muda a seriedade com que você encara sua missão?',
        'O que significaria viver hoje, concretamente, como alguém enviado, não apenas presente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Por Eles Eu Me Santifico',
      text: t(`Senhor, encerramos toda a estação pascal com tua
        declaração final: "por eles eu me santifico, para que também
        eles sejam santificados na verdade." Amanhã celebramos
        Pentecostes — a chegada do Espírito que torna essa
        santificação realidade vivida na igreja. Prepara meu coração
        para receber. Amém.`),
    },
    meditation: {
      prompt: t(`Esta oração de Jesus, feita na véspera de sua própria
        prisão e morte, projeta diretamente para o que a igreja
        celebraria em Pentecostes — a chegada do Espírito que tornaria
        real essa santificação pedida.`),
      questions: [
        'Toda esta estação pascal — do sepulcro vazio à oração final de Jesus — o que você mais quer levar para Pentecostes?',
        'Como você se sente preparado, ou não, para receber amanhã o Espírito que a igreja celebrará?',
        'O que significaria entrar em Pentecostes já vivendo a santificação pela qual Jesus orou?',
      ],
    },
  },
];

const easterB: Record<number, DevotionalEntry[]> = {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
  5: week5,
  6: week6,
  7: week7,
};

export default easterB;
