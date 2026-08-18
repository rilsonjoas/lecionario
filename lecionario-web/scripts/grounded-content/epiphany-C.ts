/**
 * Epifania — Ciclo C — conteúdo ancorado no RCL (leituras reais),
 * do Batismo do Senhor até a Transfiguração. Mesmo padrão de
 * epiphany-A.ts. Escrito em 2026-08-18.
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

// Batismo do Senhor — Isaías 43:1-7 · Salmo 29 · Atos 8:14-17 · Lucas 3:15-17, 21-22
const week2: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Temas, Porque Eu Te Remi',
      text: t(`Senhor, dizes: "não temas, porque eu te remi; chamei-
        te pelo teu nome, tu és meu." Antes de qualquer instrução ou
        exigência, vem a certeza de pertencimento — chamado pelo
        nome, redimido, propriedade tua. Que eu viva hoje a partir
        dessa segurança primeira. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa começa com identidade pessoal e nomeada
        — "chamei-te pelo teu nome" — não um chamado genérico à
        multidão, mas reconhecimento específico e íntimo de cada
        pessoa.`),
      questions: [
        'Você vive mais a partir da certeza de ser "chamado pelo nome" ou de uma insegurança sobre pertencer genuinamente a Deus?',
        'O que significa, pessoalmente, que Deus te conhece e te chama especificamente, não apenas genericamente?',
        'Como essa segurança de identidade poderia mudar uma decisão específica que você enfrenta hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quando Passares Pelas Águas',
      text: t(`Senhor, prometes: "quando passares pelas águas, eu
        serei contigo; quando pelos rios, eles não te submergirão."
        Não promessa de ausência de dificuldade, mas de presença
        constante através dela. Sustenta-me nas águas difíceis que
        atravesso agora. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa não é de evitar as águas e o fogo — ela
        pressupõe que você os atravessará — mas garante presença
        constante durante a travessia, não livramento da própria
        dificuldade.`),
      questions: [
        'Que "águas" ou "fogo" você está atravessando agora, precisando dessa promessa específica de presença?',
        'Como a promessa de presença durante a dificuldade, não de evitá-la, muda sua expectativa sobre como Deus responde ao sofrimento?',
        'O que sustentaria você a confiar nessa presença mesmo quando não sente alívio imediato?',
      ],
    },
  },
  {
    prayer: {
      title: 'Foste Precioso aos Meus Olhos',
      text: t(`Senhor, declaras: "foste precioso aos meus olhos, e és
        digno de honra e eu te amo." Não amor condicional baseado em
        desempenho, mas valor intrínseco reconhecido e declarado. Que
        eu receba essa preciosidade como já concedida, não como algo
        a conquistar. Amém.`),
    },
    meditation: {
      prompt: t(`A tripla declaração — precioso, digno de honra,
        amado — vem sem condição prévia relacionada a mérito ou
        desempenho, apenas afirmação direta de valor já reconhecido
        por Deus.`),
      questions: [
        'Você recebe seu próprio valor como algo já reconhecido por Deus, ou como algo que ainda precisa provar?',
        'O que mudaria hoje se você vivesse plenamente a partir dessa certeza — "precioso... digno... amado"?',
        'Como comunicar esse mesmo reconhecimento de valor a alguém que você ama hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Oraram por Eles, para Que Recebessem o Espírito Santo',
      text: t(`Senhor, quando os samaritanos creram, mas ainda não
        haviam recebido o Espírito plenamente, Pedro e João "oraram
        por eles, para que recebessem o Espírito Santo." Intercessão
        deliberada por plenitude espiritual em outros. Ensina-me a
        orar assim, ativamente, pelo crescimento espiritual de quem
        amo. Amém.`),
    },
    meditation: {
      prompt: t(`A igreja primitiva não considerou suficiente que os
        samaritanos apenas cressem — houve intercessão deliberada e
        ativa para que experimentassem a plenitude do Espírito,
        modelando cuidado pastoral genuíno.`),
      questions: [
        'Você ora ativamente pelo crescimento espiritual pleno de outros, não apenas pela conversão inicial deles?',
        'Que pessoa em sua vida você poderia interceder especificamente hoje, por plenitude espiritual, não apenas bem-estar geral?',
        'Como esse modelo de cuidado pastoral ativo desafia orações mais genéricas que você talvez faça?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ele Vos Batizará no Espírito Santo e em Fogo',
      text: t(`Senhor Jesus, João anunciou: "ele vos batizará no
        Espírito Santo e em fogo." Não apenas purificação suave, mas
        transformação intensa. Que eu não tema o fogo purificador que
        talvez ainda precise passar. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem do fogo, junto com o Espírito Santo,
        sugere que a transformação genuína prometida por João envolve
        purificação real, às vezes desconfortável, não apenas conforto
        suave.`),
      questions: [
        'Que "fogo" purificador você suspeita que ainda precisa passar antes de estar genuinamente transformado?',
        'Como distinguir sofrimento genuinamente purificador de sofrimento sem propósito?',
        'O que ajudaria você a confiar no processo, mesmo quando ele é desconfortável?',
      ],
    },
  },
  {
    prayer: {
      title: 'Estando Ele a Orar, o Céu Se Abriu',
      text: t(`Senhor Jesus, o detalhe de Lucas é significativo:
        "estando ele a orar, o céu se abriu." A abertura dos céus
        aconteceu precisamente no contexto de oração. Que minha
        própria oração seja o lugar onde busco essa mesma abertura
        entre céu e terra. Amém.`),
    },
    meditation: {
      prompt: t(`Lucas, mais que os outros evangelhos, enfatiza a
        oração de Jesus como contexto imediato da revelação divina —
        um padrão que se repetiria em outros momentos-chave do
        ministério dele.`),
      questions: [
        'Você associa sua própria oração com expectativa genuína de "céus se abrindo", ou trata como rotina distante?',
        'Como o padrão de Lucas — revelação ligada à oração — poderia moldar sua própria prática devocional?',
        'Que abertura você está buscando através da oração nesta temporada específica?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tu És o Meu Filho Amado',
      text: t(`Senhor, encerramos esta semana com a voz do céu: "tu
        és o meu Filho amado; em ti me comprazo." Uma declaração
        pessoal e íntima, dirigida diretamente a Jesus. Que eu ouça
        essa mesma declaração pessoal sobre mim, não apenas como
        verdade genérica sobre outros. Amém.`),
    },
    meditation: {
      prompt: t(`A voz se dirige diretamente a Jesus na segunda
        pessoa — comunicação íntima e pessoal, um padrão que convida
        cada um de nós, através da adoção em Cristo, a ouvir também
        essa mesma declaração de amor.`),
      questions: [
        'Esta semana — da promessa de redenção pessoal ao batismo de Jesus — o que te ensinou sobre a intimidade da comunicação de Deus?',
        'Você ouve declarações de amor de Deus como verdades genéricas ou como palavra pessoal e direta a você?',
        'O que significaria receber hoje, pessoalmente, essa mesma declaração: "tu és meu filho amado"?',
      ],
    },
  },
];

// 2º Domingo após a Epifania — Isaías 62:1-5 · Salmo 36:5-10 · 1 Coríntios 12:1-11 · João 2:1-11
const week3: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Por Amor de Sião Não Me Calarei',
      text: t(`Senhor, Isaías declara em teu nome: "por amor de Sião
        não me calarei... até que saia a sua justiça como um
        resplendor." Persistência incansável em buscar restauração
        para quem amas. Que minha própria intercessão por quem amo
        tenha essa mesma persistência incansável. Amém.`),
    },
    meditation: {
      prompt: t(`A determinação declarada — "não me calarei... não
        descansarei" — comunica compromisso ativo e persistente, não
        espera passiva por mudança eventual.`),
      questions: [
        'Por quem ou por que você tem "não descansado" em oração persistente?',
        'O que sustentaria esse tipo de persistência incansável diante de demora aparente na resposta?',
        'Que causa ou pessoa merece essa mesma intercessão incansável da sua parte agora?',
      ],
    },
  },
  {
    prayer: {
      title: 'Chamar-te-ão por um Nome Novo',
      text: t(`Senhor, prometes: "chamar-te-ão por um nome novo, que
        a boca do Senhor designará." Restauração tão completa que
        muda até a identidade nomeada. Que minha própria
        transformação em ti seja tão real que produza identidade
        genuinamente renovada. Amém.`),
    },
    meditation: {
      prompt: t(`A mudança de nome no contexto bíblico sempre
        significa transformação de identidade e destino — não apenas
        rótulo diferente, mas realidade fundamentalmente nova sendo
        reconhecida.`),
      questions: [
        'Como sua identidade em Cristo já mudou fundamentalmente quem você é, além de apenas rótulos externos?',
        'Que "nome antigo" — identidade de vergonha ou desamparo — você ainda carrega, apesar da promessa de renovação?',
        'O que significaria viver hoje a partir desse "nome novo" que Deus já designou para você?',
      ],
    },
  },
  {
    prayer: {
      title: 'No Manancial da Vida Está o Teu Manancial',
      text: t(`Senhor, o salmista declara: "pois em ti está o
        manancial da vida; na tua luz vemos a luz." Toda fonte
        genuína de vida e clareza remonta a ti. Que eu busque em ti,
        não em fontes secundárias, a vida e a luz que realmente
        preciso. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem do "manancial" sugere fonte original, não
        apenas um entre muitos recursos disponíveis — tudo que
        genuinamente dá vida remonta, em última análise, a essa
        origem única.`),
      questions: [
        'Onde você tem buscado "manancial de vida" em fontes secundárias, quando a fonte original está disponível?',
        'Como a frase "na tua luz vemos a luz" descreve a forma como só através de Deus conseguimos ver claramente qualquer outra coisa?',
        'Que decisão você precisa reavaliar à luz — literalmente — dessa fonte original?',
      ],
    },
  },
  {
    prayer: {
      title: 'Há Diversidade de Dons, Mas o Espírito É o Mesmo',
      text: t(`Senhor, Paulo ensina: "há diversidade de dons, mas o
        Espírito é o mesmo... a cada um, porém, é dada a manifestação
        do Espírito para o proveito comum." Diversidade unida por
        propósito comunitário compartilhado. Que eu valorize meus
        próprios dons e os dos outros como parte de um todo maior.
        Amém.`),
    },
    meditation: {
      prompt: t(`A ênfase final — "para o proveito comum" — situa
        toda diversidade de dons dentro de um propósito
        fundamentalmente comunitário, não competitivo ou
        individualista.`),
      questions: [
        'Você trata seus próprios dons como posse individual ou como recurso "para o proveito comum" da comunidade?',
        'Que dom específico seu você poderia oferecer mais deliberadamente ao bem comum esta semana?',
        'Como reconhecer e celebrar dons diferentes dos seus, sem competição ou comparação?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eles Não Têm Vinho',
      text: t(`Senhor Jesus, diante da falta em Caná, Maria
        simplesmente observou: "eles não têm vinho" — trazendo a
        necessidade a ti sem prescrever a solução. Ensina-me essa
        mesma confiança de apresentar necessidades reais, confiando
        em ti para a resposta certa. Amém.`),
    },
    meditation: {
      prompt: t(`Maria não instrui Jesus sobre o que fazer — ela
        apenas nomeia o problema e confia que ele saberá como
        responder, um modelo simples de oração confiante.`),
      questions: [
        'Você tende a apresentar problemas a Deus com instruções detalhadas sobre a solução, ou confia simplesmente em nomear a necessidade?',
        'Que necessidade real você precisa simplesmente "nomear" diante de Deus hoje, sem prescrever a resposta?',
        'Como a confiança simples de Maria poderia moldar sua própria forma de trazer pedidos a Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Fazei Tudo Quanto Ele Vos Disser',
      text: t(`Senhor, Maria instruiu os serventes: "fazei tudo
        quanto ele vos disser" — obediência antecipada, mesmo antes
        de saber qual seria a instrução. Que eu tenha essa mesma
        disposição de obedecer, confiando que tuas instruções, mesmo
        estranhas, levarão a algo bom. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução de Maria é genérica e antecipada — ela
        não sabe ainda o que Jesus pedirá (encher talhas de água era
        instrução estranha) — mas já orienta obediência completa
        antes de qualquer detalhe.`),
      questions: [
        'Você teria obedecido a uma instrução aparentemente estranha, como encher talhas de água esperando vinho?',
        'O que significaria adotar essa mesma disposição — obediência antecipada, confiando no resultado antes de entender o processo?',
        'Que instrução aparentemente estranha de Deus você tem resistido seguir, apesar de reconhecê-la?',
      ],
    },
  },
  {
    prayer: {
      title: 'Manifestou a Sua Glória',
      text: t(`Senhor, encerramos esta semana com a conclusão: "assim
        deu Jesus início aos seus sinais em Caná da Galiléia, e
        manifestou a sua glória; e os seus discípulos creram nele."
        Um milagre discreto, numa festa comum, revelou glória e gerou
        fé genuína. Que eu reconheça tua glória também nos momentos
        comuns da minha semana. Amém.`),
    },
    meditation: {
      prompt: t(`O primeiro sinal de Jesus acontece não num templo
        ou evento religioso formal, mas numa festa de casamento comum
        — glória divina revelada em meio à celebração humana
        ordinária.`),
      questions: [
        'Esta semana — da persistência de Isaías à confiança simples de Maria — o que te ensinou sobre reconhecer Deus em momentos comuns?',
        'Você reconhece a glória de Deus mais em contextos formalmente religiosos ou também em celebrações e momentos comuns da vida?',
        'Que "primeiro sinal" — pequeno, discreto — Deus pode estar realizando na sua própria vida agora, ainda não plenamente reconhecido?',
      ],
    },
  },
];

// 3º Domingo após a Epifania — Neemias 8:1-3, 5-6, 8-10 · Salmo 19 · 1 Coríntios 12:12-31a · Lucas 4:14-21
const week4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Os Ouvidos de Todo o Povo Estavam Atentos',
      text: t(`Senhor, quando Esdras leu a lei, "os ouvidos de todo o
        povo estavam atentos ao livro." Atenção coletiva e deliberada
        à tua Palavra, sustentada por horas. Que eu cultive essa
        mesma disposição de escuta atenta e prolongada, não apressada.
        Amém.`),
    },
    meditation: {
      prompt: t(`A leitura durou "desde a alva até o meio-dia" — um
        período extenso de atenção sustentada, num tempo sem
        distrações modernas, mas ainda assim exigindo disciplina
        genuína de concentração.`),
      questions: [
        'Você consegue sustentar atenção prolongada à Palavra de Deus, ou sua leitura tende a ser rápida e fragmentada?',
        'O que ajudaria você a cultivar esse tipo de escuta atenta e sustentada?',
        'Como a disciplina coletiva desse povo — todos atentos juntos — poderia inspirar prática comunitária de escuta hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Alegria do Senhor É a Vossa Força',
      text: t(`Senhor, diante do povo chorando ao ouvir a lei,
        Neemias instruiu: "não vos entristeçais... porque a alegria
        do Senhor é a vossa força." Alegria genuína, não como negação
        da seriedade, mas como fonte real de força. Que essa alegria
        sustente minha própria caminhada hoje. Amém.`),
    },
    meditation: {
      prompt: t(`O choro do povo, provavelmente por reconhecer sua
        própria falha diante da lei, é redirecionado não para mais
        culpa, mas para alegria — um movimento pastoral que evita
        tanto superficialidade quanto desespero paralisante.`),
      questions: [
        'Você já confundiu seriedade espiritual genuína com tristeza permanente, esquecendo que "a alegria do Senhor" é força real?',
        'Como buscar alegria genuína sem minimizar convicção séria sobre suas próprias falhas?',
        'O que significaria, hoje, buscar força específica nessa alegria, não em outra fonte?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Lei do Senhor É Perfeita, e Refrigera a Alma',
      text: t(`Senhor, o salmista celebra: "a lei do Senhor é
        perfeita, e refrigera a alma... mais desejáveis são do que o
        ouro... mais doces do que o mel." Deleite genuíno na tua
        Palavra, não obrigação amarga. Cultiva esse mesmo prazer em
        mim. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem sensorial — mais doce que mel, mais
        desejável que ouro — descreve uma relação com a Palavra que
        vai além do dever, tocando prazer genuíno e desejo profundo.`),
      questions: [
        'Sua relação com a Escritura é mais dever cumprido ou deleite genuíno buscado ativamente?',
        'Que passagem específica da Palavra já foi, para você, verdadeiramente "mais doce que o mel"?',
        'O que ajudaria você a redescobrir esse tipo de prazer genuíno na leitura bíblica?',
      ],
    },
  },
  {
    prayer: {
      title: 'Todos os Membros do Corpo São Um Só Corpo',
      text: t(`Senhor, Paulo ensina: "assim como o corpo é um, e tem
        muitos membros... assim também é Cristo." Unidade genuína que
        não elimina diversidade, mas a integra em propósito comum.
        Que eu valorize meu papel específico na comunidade, sem
        competir nem me isolar. Amém.`),
    },
    meditation: {
      prompt: t(`A metáfora do corpo enfatiza interdependência
        radical — "se um membro padece, todos os membros padecem com
        ele" — uma unidade que exige participação ativa de cada
        parte, não apenas coexistência passiva.`),
      questions: [
        'Você vive sua fé mais como membro interdependente de um corpo, ou como indivíduo isolado?',
        'Que "membro" da sua comunidade você tem negligenciado, esquecendo que seu sofrimento afeta a todos?',
        'Como reconhecer e valorizar seu próprio papel específico, mesmo que pareça "menos honroso" que outros?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Espírito do Senhor Está Sobre Mim',
      text: t(`Senhor Jesus, na sinagoga de Nazaré, leste: "o
        Espírito do Senhor está sobre mim, porquanto me ungiu para
        anunciar boas novas aos pobres." Tua missão declarada
        explicitamente desde o início — boas novas concretas para os
        marginalizados. Que eu compartilhe dessa mesma missão
        declarada. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus escolhe deliberadamente esta passagem de
        Isaías para inaugurar publicamente seu ministério — uma
        declaração de missão clara e específica, não vaga ou
        genérica.`),
      questions: [
        'Você tem uma "declaração de missão" tão clara quanto essa para sua própria vida de fé?',
        'Como essa missão específica — boas novas aos pobres, liberdade aos cativos — desafia uma fé que seja apenas privada e individual?',
        'Que grupo específico de "pobres" ou "cativos" você é chamado a servir concretamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Hoje Se Cumpriu Esta Escritura',
      text: t(`Senhor, depois de ler a profecia, declaraste: "hoje se
        cumpriu esta escritura aos vossos ouvidos." Não promessa
        distante, mas realidade presente, imediata. Que eu reconheça
        tuas promessas se cumprindo hoje, não apenas em algum futuro
        distante. Amém.`),
    },
    meditation: {
      prompt: t(`A palavra "hoje" é central e deliberada — Jesus
        não fala de cumprimento futuro distante, mas de realidade já
        presente, ativa naquele exato momento, diante daquela
        audiência específica.`),
      questions: [
        'Você trata as promessas de Deus mais como realidade "hoje" presente ou como esperança distante para o futuro?',
        'Que promessa específica você precisa reconhecer como já se cumprindo, não apenas esperada para depois?',
        'O que significaria viver hoje com essa mesma urgência de presente, não de futuro distante?',
      ],
    },
  },
  {
    prayer: {
      title: 'Todos Lhe Davam Testemunho',
      text: t(`Senhor, encerramos esta semana com a reação inicial:
        "todos lhe davam testemunho, e se admiravam das palavras de
        graça que saíam da sua boca." Antes da rejeição que viria
        logo depois, houve admiração genuína. Que minha própria
        palavra carregue essa mesma graça reconhecível. Amém.`),
    },
    meditation: {
      prompt: t(`A reação inicial positiva ("admiravam") precede,
        no mesmo capítulo, uma virada dramática para rejeição —
        lembrando que reconhecimento inicial não garante aceitação
        contínua, especialmente quando a mensagem se torna desafiadora.`),
      questions: [
        'Esta semana — da leitura atenta de Neemias à missão declarada de Jesus — o que te ensinou sobre a Palavra que produz tanto alegria quanto desafio?',
        'Suas próprias palavras carregam "graça" reconhecível pelos outros, ou tendem para outra qualidade?',
        'O que você quer levar desta semana sobre viver a missão de Cristo concretamente, mesmo sabendo que nem sempre será bem recebida?',
      ],
    },
  },
];

// 4º Domingo após a Epifania — Jeremias 1:4-10 · Salmo 71:1-6 · 1 Coríntios 13:1-13 · Lucas 4:21-30
const week5: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Antes Que Eu Te Formasse no Ventre Te Conheci',
      text: t(`Senhor, disseste a Jeremias: "antes que eu te
        formasse no ventre te conheci... às nações te dei por
        profeta." Um chamado e propósito que existiam antes mesmo do
        nascimento. Que eu viva a partir dessa identidade já dada,
        não de uma que preciso conquistar. Amém.`),
    },
    meditation: {
      prompt: t(`Deus fala do conhecimento e propósito para
        Jeremias como já estabelecidos antes do nascimento — uma
        identidade concedida, não construída ao longo do tempo por
        conquista pessoal.`),
      questions: [
        'Você vive mais a partir de uma identidade já dada por Deus, ou de uma que sente precisar constantemente provar?',
        'Como a ideia de ser "conhecido" por Deus antes mesmo de nascer muda sua percepção sobre seu propósito?',
        'O que significaria confiar que seu valor já estava estabelecido antes de qualquer conquista sua?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Temas Diante Deles',
      text: t(`Senhor, diante do medo de Jeremias, prometeste: "não
        temas diante deles; pois eu sou contigo para te livrar." O
        chamado não elimina o medo instantaneamente, mas oferece
        presença suficiente para enfrentá-lo. Sustenta-me nos meus
        próprios momentos de medo diante de desafios reais. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa não nega a realidade de oposição —
        "diante deles" reconhece adversários reais — mas garante
        presença de Deus como resposta suficiente, não eliminação da
        dificuldade.`),
      questions: [
        'Que medo específico você enfrenta hoje diante de um chamado ou responsabilidade real?',
        'Como a promessa de presença ("eu sou contigo"), não de ausência de perigo, muda sua forma de enfrentar esse medo?',
        'O que ajudaria você a confiar nessa presença suficiente, mesmo sem eliminação completa da dificuldade?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tu És a Minha Rocha e a Minha Fortaleza',
      text: t(`Senhor, o salmista declara: "em ti me tenho apoiado
        desde que nasci; tu és aquele que me tiraste das entranhas de
        minha mãe." Confiança contínua, desde sempre, não apenas em
        crises específicas. Que minha própria confiança em ti seja
        assim — o fio contínuo de toda a minha existência. Amém.`),
    },
    meditation: {
      prompt: t(`A confiança descrita não é resposta a uma crise
        específica, mas padrão de vida inteira — "desde a minha
        mocidade... desde que nasci" — dependência constante, não
        apenas emergencial.`),
      questions: [
        'Sua confiança em Deus é mais um padrão constante de vida ou uma resposta acionada apenas em crises?',
        'Que "rocha" você tem buscado além de Deus para estabilidade — e ela realmente sustenta?',
        'Como cultivar uma confiança contínua, não apenas episódica, em Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se Não Tivesse Amor, Nada Seria',
      text: t(`Senhor, Paulo declara: "ainda que eu falasse as
        línguas dos homens e dos anjos... e não tivesse amor, nada
        seria." Todo dom espiritual, sem amor, se esvazia de sentido
        real. Examina se meus próprios dons e serviços nascem de amor
        genuíno, não apenas de capacidade ou obrigação. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo lista sucessivamente os dons mais impressionantes
        — línguas, profecia, fé que move montanhas, generosidade
        radical — e declara todos vazios sem amor, um padrão
        deliberadamente extremo para enfatizar o ponto.`),
      questions: [
        'Você já exerceu um dom ou serviço genuíno, mas sem o amor que lhe daria sentido real?',
        'Como distinguir entre capacidade impressionante e amor genuíno como motivação real de uma ação?',
        'Que área do seu serviço a Deus precisa ser reexaminada quanto à motivação real por trás dela?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nenhum Profeta É Aceito na Sua Terra',
      text: t(`Senhor Jesus, depois da admiração inicial, declaraste:
        "nenhum profeta é aceito na sua terra" — e a multidão se
        encheu de ira. Familiaridade pode gerar resistência, não
        reverência. Ajuda-me a reconhecer tua voz mesmo quando vem de
        onde menos espero — inclusive de quem já conheço bem. Amém.`),
    },
    meditation: {
      prompt: t(`A reação da multidão muda drasticamente quando
        Jesus cita exemplos de Elias e Eliseu servindo estrangeiros —
        familiaridade combinada com favoritismo nacional se transforma
        rapidamente em hostilidade.`),
      questions: [
        'Você já resistiu a uma verdade ou pessoa precisamente porque a familiaridade tornava difícil vê-la com reverência genuína?',
        'Como a citação de Jesus sobre Elias e Eliseu servindo estrangeiros desafia favoritismo baseado em pertencimento a um grupo?',
        'Que voz familiar — de alguém que você já conhece bem — você pode estar desconsiderando precisamente por familiaridade?',
      ],
    },
  },
  {
    prayer: {
      title: 'Passando pelo Meio Deles, Seguiu Seu Caminho',
      text: t(`Senhor Jesus, diante da multidão furiosa tentando te
        precipitar do despenhadeiro, "passando pelo meio deles, seguiu
        o seu caminho." Uma serenidade impressionante diante de
        hostilidade violenta e imediata. Ensina-me essa mesma
        serenidade quando enfrento oposição inesperada. Amém.`),
    },
    meditation: {
      prompt: t(`A cena termina com autoridade tranquila, não
        confronto ou fuga desesperada — Jesus simplesmente atravessa a
        multidão hostil e continua seu caminho, mantendo o controle
        mesmo em perigo real.`),
      questions: [
        'Você consegue manter serenidade diante de hostilidade inesperada, ou tende a reagir com pânico ou confronto?',
        'O que sustentaria esse tipo de calma que Jesus demonstra, mesmo diante de perigo real e imediato?',
        'Que situação hostil você precisa atravessar esta semana com essa mesma serenidade confiante?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Maior Destes É o Amor',
      text: t(`Senhor, encerramos esta semana com a conclusão de
        Paulo: "agora, pois, permanecem a fé, a esperança, o amor,
        estes três; mas o maior destes é o amor." Diante da rejeição
        que Jesus enfrentou nesta mesma semana, o amor permanece o
        padrão mais alto e duradouro. Que eu priorize esse amor acima
        de tudo o mais. Amém.`),
    },
    meditation: {
      prompt: t(`A conclusão de Paulo sobre o primado do amor ganha
        peso adicional lida ao lado da rejeição que Jesus sofreu nesta
        mesma semana — mesmo diante de hostilidade, o amor permanece
        o padrão supremo, não vingança ou retirada.`),
      questions: [
        'Esta semana — do chamado antes do nascimento à serenidade de Jesus diante da hostilidade — o que te ensinou sobre viver com propósito e amor genuínos?',
        'Você prioriza genuinamente o amor acima de fé impressionante ou esperança abstrata na sua vida prática?',
        'O que você quer levar desta semana para continuar priorizando esse amor, mesmo diante de rejeição ou dificuldade?',
      ],
    },
  },
];

// 5º Domingo após a Epifania — Isaías 6:1-8 · Salmo 138 · 1 Coríntios 15:1-11 · Lucas 5:1-11
const week6: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Ai de Mim! Pois Estou Perdido',
      text: t(`Senhor, Isaías viu-te "assentado sobre um alto e
        sublime trono" e a primeira reação não foi admiração serena,
        mas: "ai de mim! pois estou perdido; porque sou homem de
        lábios impuros." A visão da tua santidade expõe, antes de
        qualquer coisa, minha própria condição real. Amém.`),
    },
    meditation: {
      prompt: t(`Isaías era profeta, alguém já dedicado a Deus — e
        ainda assim sua primeira resposta à visão da santidade divina
        foi confissão de impureza, não orgulho espiritual.`),
      questions: [
        'Quando você se aproxima genuinamente da santidade de Deus, sua primeira reação é conforto ou é exposição honesta?',
        'Que "lábios impuros" — palavras, atitudes — você reconhece em si mesmo diante dessa visão?',
        'O que impede você de ter esse tipo de encontro honesto com a santidade de Deus com mais frequência?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Tua Iniqüidade Foi Tirada',
      text: t(`Senhor, depois que o serafim tocou os lábios de
        Isaías com a brasa purificadora e disse "a tua iniqüidade foi
        tirada," ouviste perguntar: "a quem enviarei?" E Isaías, já
        purificado, respondeu: "eis-me aqui, envia-me a mim." A
        disponibilidade dele veio depois da purificação. Purifica-me
        também, Senhor. Amém.`),
    },
    meditation: {
      prompt: t(`A ordem importa: primeiro a purificação, depois o
        convite à missão. Isaías não foi enviado apesar da impureza,
        mas depois de lidar com ela genuinamente.`),
      questions: [
        'Você tenta se oferecer para servir a Deus antes de lidar honestamente com o que precisa ser purificado em você?',
        'O que significaria, hoje, responder "eis-me aqui, envia-me" a um chamado que você tem evitado?',
        'Que "brasa purificadora" — processo doloroso mas necessário — você talvez esteja evitando?',
      ],
    },
  },
  {
    prayer: {
      title: 'Embora o Senhor Seja Excelso, Atenta para o Humilde',
      text: t(`Senhor, o salmista declara: "ainda que o Senhor é
        excelso, contudo atenta para o humilde; mas ao soberbo,
        conhece-o de longe." Tua grandeza não te distancia dos
        pequenos — pelo contrário, te aproxima especificamente deles.
        Que eu busque essa proximidade através da humildade, não da
        autossuficiência. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo estabelece uma correlação direta —
        excelência divina combinada com atenção específica ao humilde,
        e distância deliberada do soberbo — desafiando qualquer
        suposição de que grandeza divina implica distância dos
        pequenos.`),
      questions: [
        'Você busca proximidade com Deus através de humildade genuína, ou tenta impressioná-lo com realizações?',
        'Como essa correlação — excelência que se aproxima do humilde — desafia noções comuns sobre poder e distância?',
        'O que significaria cultivar mais humildade genuína, confiando que isso te aproxima, não te diminui?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sou o Menor dos Apóstolos',
      text: t(`Senhor, Paulo confessa: "sou o menor dos apóstolos,
        que nem sou digno de ser chamado apóstolo, porque persegui a
        igreja de Deus. Mas pela graça de Deus sou o que sou." Sua
        identidade final se apoia inteiramente em graça, não em
        mérito próprio. Que a minha também. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não esconde seu passado como perseguidor da
        igreja — ele o usa explicitamente como pano de fundo para
        enfatizar que sua posição atual depende inteiramente da graça,
        não de qualquer mérito acumulado.`),
      questions: [
        'Existe algo do seu passado que você esconde em vez de usar como testemunho de como a graça de Deus te transformou?',
        'Você atribui sua posição atual mais à graça de Deus ou ao seu próprio mérito e esforço?',
        'Como a honestidade de Paulo sobre sua própria indignidade fortalece, em vez de enfraquecer, seu testemunho?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sobre Tua Palavra Lançarei as Redes',
      text: t(`Senhor Jesus, depois de uma noite inteira sem pescar
        nada, Simão respondeu ao teu pedido: "trabalhamos a noite
        toda, e nada apanhamos; mas, sobre tua palavra, lançarei as
        redes." Obediência apesar da experiência contrária e do
        cansaço. Ensina-me essa mesma disposição de confiar na tua
        palavra acima da minha própria experiência. Amém.`),
    },
    meditation: {
      prompt: t(`Simão era pescador experiente — ele sabia,
        profissionalmente, que pescar de dia depois de uma noite sem
        sucesso era improvável — e ainda assim escolheu obedecer
        apesar do próprio conhecimento experiente.`),
      questions: [
        'Você já obedeceu a uma instrução de Deus apesar de sua própria experiência ou conhecimento sugerir o contrário?',
        'O que ajudaria você a confiar na palavra de Deus mesmo quando ela contradiz sua avaliação profissional ou experiente?',
        'Que "rede" você precisa lançar novamente hoje, apesar do cansaço de tentativas anteriores sem sucesso?',
      ],
    },
  },
  {
    prayer: {
      title: 'Retira-te de Mim, Senhor, Porque Sou um Homem Pecador',
      text: t(`Senhor, diante da pesca milagrosa, Simão Pedro
        "prostrou-se aos pés de Jesus, dizendo: retira-te de mim,
        Senhor, porque sou um homem pecador." Um encontro genuíno com
        teu poder revela, primeiro, minha própria condição real. Que
        eu tenha essa mesma honestidade diante de manifestações claras
        da tua presença. Amém.`),
    },
    meditation: {
      prompt: t(`A reação de Pedro — pedir distância, não
        proximidade, diante do milagre — ecoa a mesma resposta de
        Isaías diante da visão do trono: encontro genuíno com o
        sagrado expõe primeiro nossa própria condição, antes de
        qualquer outra coisa.`),
      questions: [
        'Você já teve uma experiência tão clara do poder de Deus que sua primeira reação foi consciência da própria indignidade?',
        'Como essa honestidade de Pedro — em vez de orgulho pelo milagre presenciado — modela humildade genuína?',
        'O que impede você de ter esse tipo de encontro genuinamente revelador com a presença de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deixaram Tudo e o Seguiram',
      text: t(`Senhor, encerramos esta semana com a resposta final:
        "levando eles os barcos para a terra, deixaram tudo e o
        seguiram." No auge do sucesso profissional — a maior pesca
        de suas vidas — eles escolheram deixar tudo por ti. Que meu
        próprio sucesso nunca me impeça de responder ao teu chamado.
        Amém.`),
    },
    meditation: {
      prompt: t(`O momento da resposta é irônico e significativo —
        precisamente quando tiveram sua maior pesca, seu maior
        sucesso profissional, eles escolhem abandonar tudo para
        seguir Jesus, não esperar por um momento de fracasso.`),
      questions: [
        'Esta semana — da purificação de Isaías à obediência apesar do cansaço de Pedro — o que te ensinou sobre resposta genuína ao chamado de Deus?',
        'Você conseguiria deixar sucesso real e presente para seguir um chamado maior, como os discípulos fizeram aqui?',
        'O que você quer levar desta semana para responder ao chamado de Deus com essa mesma prontidão radical?',
      ],
    },
  },
];

// 6º Domingo após a Epifania — Jeremias 17:5-10 · Salmo 1 · 1 Coríntios 15:12-20 · Lucas 6:17-26
const week7: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Maldito o Varão Que Confia no Homem',
      text: t(`Senhor, Jeremias adverte: "maldito o varão que confia
        no homem, e faz da carne o seu braço, e aparta o seu coração
        do Senhor!" Confiança mal direcionada leva a esterilidade
        espiritual, como junípero no deserto. Examina onde tenho
        confiado mais em recursos humanos do que em ti. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem do "junípero no deserto" — planta que
        sobrevive em solo salgado e inóspito, mas nunca floresce
        plenamente — descreve vividamente a esterilidade de uma vida
        baseada em confiança mal direcionada.`),
      questions: [
        'Em que área da sua vida você tem "confiado no homem" — recursos, conexões, capacidade própria — mais do que em Deus?',
        'Como reconhecer os sinais de "esterilidade espiritual" que vêm dessa confiança mal direcionada?',
        'O que significaria redirecionar essa confiança hoje, mesmo que pareça arriscado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bendito o Varão Que Confia no Senhor',
      text: t(`Senhor, em contraste, "bendito o varão que confia no
        Senhor... é como a árvore plantada junto às águas... no ano
        de sequidão não se afadiga, nem deixa de dar fruto."
        Estabilidade e fruto mesmo em tempos difíceis, por causa da
        fonte certa de confiança. Que eu seja essa árvore. Amém.`),
    },
    meditation: {
      prompt: t(`O contraste com a árvore plantada junto às águas
        não promete ausência de dificuldade ("ano de sequidão") — mas
        garante que raízes profundas na fonte certa sustentam fruto
        mesmo durante a seca.`),
      questions: [
        'Você já experimentou continuar produzindo fruto espiritual mesmo durante um "ano de sequidão" pessoal?',
        'O que significa ter "raízes profundas" na confiança em Deus, não apenas superficialidade que seca facilmente?',
        'Que prática ajudaria você a aprofundar essas raízes antes que a próxima seca chegue?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu, o Senhor, Esquadrinho a Mente',
      text: t(`Senhor, declaras: "eu, o Senhor, esquadrinho a mente,
        eu provo o coração." Conhecimento completo e íntimo do que
        realmente sou, além de qualquer aparência externa. Que eu
        viva com essa consciência — plenamente conhecido, e ainda
        assim amado. Amém.`),
    },
    meditation: {
      prompt: t(`A afirmação de conhecimento completo do coração
        humano — "enganoso... quem o poderá conhecer?" seguido por
        "eu, o Senhor, esquadrinho" — reconhece que só Deus tem acesso
        genuíno à verdade interior que nem nós mesmos compreendemos
        completamente.`),
      questions: [
        'A ideia de ser completamente conhecido por Deus, além da sua própria autopercepção, te causa mais conforto ou desconforto?',
        'Que área do seu próprio coração você reconhece que nem você mesmo compreende completamente?',
        'Como viver com essa consciência de ser plenamente conhecido, confiando ainda assim no amor de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se Cristo Não Foi Ressuscitado, Vã É a Nossa Fé',
      text: t(`Senhor, Paulo declara com ousadia: "se Cristo não foi
        ressuscitado, é vã a vossa fé, e ainda estais nos vossos
        pecados." Toda a fé cristã depende de um evento histórico
        real, não apenas de ideias inspiradoras. Fortalece minha
        confiança nessa base histórica sólida. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo se recusa a tratar a ressurreição como
        metáfora opcional — ele a apresenta como fundamento histórico
        absolutamente essencial, sem o qual toda a estrutura da fé
        cristã simplesmente desmorona.`),
      questions: [
        'Sua fé se apoia na realidade histórica concreta da ressurreição, ou principalmente em sentimento ou tradição?',
        'Como a ousadia de Paulo em declarar sua fé "vã" sem esse evento fortalece, paradoxalmente, a credibilidade da mensagem?',
        'O que significaria construir mais conscientemente sua confiança sobre essa base histórica sólida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bem-Aventurados Vós, os Pobres',
      text: t(`Senhor Jesus, declaraste diretamente: "bem-aventurados
        vós, os pobres, porque vosso é o reino de Deus." Não
        espiritualizado, mas dirigido concretamente a quem realmente
        sofre pobreza material. Que eu leve a sério essa palavra
        concreta, não apenas metafórica. Amém.`),
    },
    meditation: {
      prompt: t(`A versão de Lucas das bem-aventuranças é
        deliberadamente mais concreta e material que a de Mateus —
        "pobres" não "pobres de espírito" — enfatizando dimensão
        social real, não apenas espiritual abstrata.`),
      questions: [
        'Você tende a espiritualizar completamente essas bem-aventuranças, evitando sua dimensão social e material concreta?',
        'Como essa versão mais direta desafia conforto com desigualdade material que talvez você tenha normalizado?',
        'O que significaria levar a sério, concretamente, o cuidado com pobreza material real ao seu redor?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ai de Vós Que Sois Ricos',
      text: t(`Senhor, o contraponto vem igualmente direto: "mas ai
        de vós que sois ricos! porque já recebestes a vossa
        consolação." Um alerta sério contra confiar plenamente em
        segurança material como fonte última de bem-estar. Examina
        minha própria relação com riqueza e segurança. Amém.`),
    },
    meditation: {
      prompt: t(`Os "ais" que seguem as bem-aventuranças em Lucas
        são únicos ao seu evangelho — um padrão duplo que confronta
        diretamente conforto material como possível obstáculo à
        dependência genuína de Deus.`),
      questions: [
        'Como você reage a esse "ai" dirigido aos ricos — defensivamente ou com autoexame honesto?',
        'Que segurança material você trata como consolação suficiente, esquecendo a necessidade de dependência de Deus?',
        'O que significaria examinar honestamente sua própria relação com riqueza e conforto à luz dessa advertência?',
      ],
    },
  },
  {
    prayer: {
      title: 'Regozijai-vos Nesse Dia e Exultai',
      text: t(`Senhor, encerramos esta semana com tua instrução
        diante da perseguição: "regozijai-vos nesse dia e exultai,
        porque eis que é grande o vosso galardão no céu." Alegria
        diante da dificuldade sofrida por tua causa, sustentada por
        perspectiva eterna. Que essa mesma alegria me sustente esta
        semana. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução de alegria não nega a realidade
        dolorosa da perseguição — ela a contextualiza dentro de uma
        recompensa eterna maior, o mesmo padrão de esperança que
        atravessa todo o ensino de Jesus sobre sofrimento.`),
      questions: [
        'Esta semana — da confiança mal direcionada de Jeremias às bem-aventuranças diretas de Jesus — o que te ensinou sobre onde depositar segurança verdadeira?',
        'Você já enfrentou dificuldade por causa da sua fé, e como reagiu?',
        'O que você quer levar desta semana sobre confiar em Deus, não em riqueza ou segurança humana, como fonte real de bem-aventurança?',
      ],
    },
  },
];

// 7º Domingo após a Epifania — Gênesis 45:3-11, 15 · Salmo 37:1-11, 39-40 · 1 Coríntios 15:35-38, 42-50 · Lucas 6:27-38
const week8: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Eu Sou José, Vosso Irmão',
      text: t(`Senhor, José se revelou aos irmãos que o haviam
        vendido: "eu sou José, vosso irmão, a quem vendestes para o
        Egito. Agora, pois, não vos entristeçais." Perdão genuíno
        diante de traição real e profunda. Ensina-me essa mesma
        capacidade de perdoar quem me feriu profundamente. Amém.`),
    },
    meditation: {
      prompt: t(`José não minimiza o que aconteceu — reconhece
        explicitamente "a quem vendestes" — mas escolhe perdão
        genuíno em vez de vingança, apesar de ter todo o poder para
        retaliar.`),
      questions: [
        'Você já teve poder real de retaliar contra alguém que te feriu profundamente, mas escolheu perdão?',
        'O que sustentou José nessa capacidade de perdão, apesar da traição real que sofreu?',
        'Que "irmãos" — pessoas que te feriram — você precisa considerar perdoar, à luz desse exemplo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Me Enviou Adiante de Vós',
      text: t(`Senhor, José reinterpreta sua própria história
        dolorosa: "não fostes vós que me enviastes para cá, senão
        Deus... para preservar vida." Ele consegue ver propósito
        divino dentro do sofrimento real que atravessou. Ajuda-me a
        buscar essa mesma perspectiva na minha própria história
        dolorosa. Amém.`),
    },
    meditation: {
      prompt: t(`José não nega a agência humana malévola dos irmãos
        — ele a reconhece — mas consegue ver, simultaneamente, a
        soberania de Deus operando através e além dela para um
        propósito maior de preservação de vida.`),
      questions: [
        'Você consegue ver propósito divino dentro de uma dor real do seu passado, sem negar a responsabilidade humana envolvida?',
        'Como essa dupla perspectiva de José — agência humana E soberania divina — poderia ajudar você a processar sua própria história?',
        'Que "preservação de vida" maior Deus talvez tenha realizado através de algo doloroso que você atravessou?',
      ],
    },
  },
  {
    prayer: {
      title: 'Confia no Senhor e Faze o Bem',
      text: t(`Senhor, o salmista instrui: "confia no Senhor e faze o
        bem; assim habitarás na terra, e te alimentarás em
        segurança." Confiança que se traduz em ação prática, não
        apenas sentimento passivo. Que minha própria confiança em ti
        produza esse mesmo fruto de boas obras concretas. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo une deliberadamente confiança e ação —
        "confia... e faze" — recusando separar fé genuína de prática
        concreta do bem, um padrão que se repete ao longo de toda a
        Escritura.`),
      questions: [
        'Sua confiança em Deus se traduz consistentemente em ação prática de fazer o bem, ou permanece apenas sentimento interno?',
        'Que "bem" concreto sua confiança em Deus deveria produzir esta semana, mas ainda não produziu?',
        'Como cultivar essa união entre fé confiante e ação prática de forma mais consistente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Semeia-se em Fraqueza, É Ressuscitado em Poder',
      text: t(`Senhor, Paulo descreve a ressurreição usando a
        metáfora da semente: "semeia-se em fraqueza, é ressuscitado
        em poder." Transformação radical que passa necessariamente
        pela aparente morte e fraqueza antes da glória. Que eu confie
        nesse padrão diante das minhas próprias fraquezas atuais.
        Amém.`),
    },
    meditation: {
      prompt: t(`A metáfora agrícola — a semente precisa
        "morrer" antes de produzir a planta — ilustra que a
        transformação gloriosa prometida não contorna a fraqueza e a
        aparente morte, mas passa necessariamente através delas.`),
      questions: [
        'Que "fraqueza" atual em você poderia ser precisamente o lugar onde Deus está preparando transformação futura?',
        'Como essa metáfora da semente muda sua paciência diante de processos que ainda parecem apenas fracos ou incompletos?',
        'O que significaria confiar nesse padrão — fraqueza que precede poder — diante de uma situação atual difícil?',
      ],
    },
  },
  {
    prayer: {
      title: 'Amai a Vossos Inimigos',
      text: t(`Senhor Jesus, o mandamento mais radical: "amai a
        vossos inimigos, fazei bem aos que vos odeiam, bendizei aos
        que vos maldizem." Não apenas ausência de ódio, mas amor
        ativo direcionado a quem causa dano real. Confesso que essa é
        uma das instruções mais difíceis de obedecer genuinamente.
        Amém.`),
    },
    meditation: {
      prompt: t(`Cada verbo é ativo e específico — amar, fazer bem,
        bendizer, orar — não apenas tolerância passiva, mas ação
        deliberada e positiva direcionada precisamente a quem causa
        dano.`),
      questions: [
        'Quem é, concretamente, o "inimigo" que você mais tem dificuldade de amar ativamente, não apenas tolerar?',
        'O que significaria, na prática, "fazer bem" a alguém que te odeia ou te prejudicou?',
        'Como esse mandamento revela o quanto o padrão de Jesus excede reciprocidade moral convencional?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sede Misericordiosos, Como Vosso Pai É Misericordioso',
      text: t(`Senhor, o fundamento do mandamento radical: "sede
        misericordiosos, como também vosso Pai é misericordioso." Não
        exigência arbitrária, mas convite a refletir teu próprio
        caráter. Que minha misericórdia nasça de imitação genuína de
        quem és, não apenas obrigação externa. Amém.`),
    },
    meditation: {
      prompt: t(`A motivação para misericórdia radical não é regra
        abstrata — é imitação direta do caráter do Pai, situando o
        mandamento dentro de uma relação familiar, não apenas um
        código moral externo.`),
      questions: [
        'Você pratica misericórdia mais como obrigação externa ou como reflexo genuíno de quem Deus é?',
        'Como a experiência da misericórdia de Deus para com você deveria naturalmente transbordar em misericórdia para outros?',
        'Que ato concreto de misericórdia você poderia oferecer esta semana, refletindo deliberadamente o caráter do Pai?',
      ],
    },
  },
  {
    prayer: {
      title: 'Com a Mesma Medida com Que Medis, Vos Medirão',
      text: t(`Senhor, encerramos esta semana com tua conclusão:
        "dai, e ser-vos-á dado... porque com a mesma medida com que
        medis, vos medirão a vós." Um princípio de reciprocidade que
        conecta generosidade oferecida com generosidade recebida. Que
        eu semeie generosamente, confiando nessa colheita. Amém.`),
    },
    meditation: {
      prompt: t(`O princípio de "medida" descreve uma dinâmica
        espiritual real — a generosidade ou o julgamento que
        oferecemos aos outros tende a moldar, de alguma forma, o que
        recebemos de volta.`),
      questions: [
        'Esta semana — do perdão radical de José ao amor por inimigos ensinado por Jesus — o que te ensinou sobre generosidade que reflete o caráter de Deus?',
        'Que "medida" você tem usado para julgar ou tratar outros, e como isso poderia estar moldando o que você recebe de volta?',
        'O que você quer levar desta semana para semear generosidade mais consistente, confiando na colheita que Deus promete?',
      ],
    },
  },
];

// Domingo da Transfiguração — Êxodo 34:29-35 · Salmo 99 · 2 Coríntios 3:12-4:2 · Lucas 9:28-36, (37-43)
export const transfigurationWeek: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Sabia Que a Pele do Seu Rosto Resplandecia',
      text: t(`Senhor, depois de falar contigo, "Moisés não sabia que
        a pele do seu rosto resplandecia." A proximidade genuína
        contigo deixa marcas visíveis que muitas vezes nós mesmos não
        percebemos. Que minha própria proximidade contigo transborde
        de forma visível aos outros, mesmo sem eu perceber. Amém.`),
    },
    meditation: {
      prompt: t(`O detalhe de que Moisés não sabia — não estava
        performando ou buscando esse efeito — sugere que transformação
        genuína pela presença de Deus é frequentemente mais visível
        aos outros do que a nós mesmos.`),
      questions: [
        'Alguém já notou uma "luz" ou mudança em você que você mesmo não tinha percebido conscientemente?',
        'Como essa transformação não intencional desafia a ideia de que precisamos "performar" espiritualidade visível?',
        'O que significaria buscar mais tempo genuíno na presença de Deus, confiando que o efeito visível cuidará de si mesmo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tiveram Medo de Aproximar-se Dele',
      text: t(`Senhor, quando o povo viu o rosto resplandecente de
        Moisés, "tiveram medo de aproximar-se dele." Transformação
        genuína pode, paradoxalmente, criar distância antes de
        convidar aproximação. Ajuda-me a não temer o resplendor de
        outros, nem esconder demais o meu. Amém.`),
    },
    meditation: {
      prompt: t(`A reação de medo do povo, diante de algo
        genuinamente bom (a proximidade de Moisés com Deus), revela
        como transformação visível pode inicialmente intimidar antes
        de atrair.`),
      questions: [
        'Você já se afastou de alguém, não por hostilidade, mas por intimidação diante de uma transformação espiritual visível neles?',
        'Como Moisés lidou com essa distância — usando o véu — e o que isso ensina sobre acessibilidade prática?',
        'O que significaria buscar equilíbrio entre autenticidade sobre sua própria transformação e sensibilidade aos outros?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tirava o Véu Até Sair',
      text: t(`Senhor, Moisés tinha um ritmo — véu removido na tua
        presença, colocado de volta diante do povo. Um padrão
        deliberado de intimidade privada e acessibilidade pública.
        Ajuda-me a cultivar esse mesmo ritmo saudável entre presença
        íntima contigo e serviço acessível aos outros. Amém.`),
    },
    meditation: {
      prompt: t(`O ritmo alternado de Moisés — véu removido, véu
        recolocado — sugere um padrão saudável e sustentável entre
        intimidade genuína com Deus e disponibilidade prática para a
        comunidade, sem colapsar um no outro.`),
      questions: [
        'Você tem um ritmo saudável entre tempo íntimo com Deus e tempo de serviço acessível aos outros?',
        'O que ajudaria você a manter essa alternância deliberada, sem negligenciar nenhum dos dois lados?',
        'Que "véu" prático você precisa usar ou remover, dependendo do contexto, para servir melhor?',
      ],
    },
  },
  {
    prayer: {
      title: 'Onde Está o Espírito do Senhor Aí Há Liberdade',
      text: t(`Senhor, Paulo declara: "onde está o Espírito do Senhor
        aí há liberdade." Não escravidão a regras externas, mas
        transformação interior genuína que liberta. Que eu viva a
        partir dessa liberdade real, não de obrigação legalista.
        Amém.`),
    },
    meditation: {
      prompt: t(`Paulo contrasta explicitamente a experiência de
        Moisés, que precisava de véu diante de uma glória que se
        desvanecia, com a experiência do Espírito, que traz liberdade
        genuína e transformação permanente e crescente.`),
      questions: [
        'Você vive sua fé mais como liberdade genuína do Espírito ou como obrigação legalista de regras externas?',
        'Que área da sua vida ainda opera sob "véu" — regra externa — em vez de transformação interior genuína pelo Espírito?',
        'O que significaria buscar mais dessa liberdade real, não apenas conformidade externa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Subiu ao Monte para Orar',
      text: t(`Senhor Jesus, "subiu ao monte para orar" — e foi
        durante essa oração que "mudou-se a aparência do seu rosto."
        A Transfiguração aconteceu no contexto de oração deliberada,
        não como evento isolado. Que minha própria oração seja o
        lugar onde busco essa mesma transformação. Amém.`),
    },
    meditation: {
      prompt: t(`Lucas enfatiza especificamente que a
        transfiguração aconteceu "enquanto ele orava" — situando a
        revelação de glória dentro do contexto específico de oração
        deliberada, não como evento independente dela.`),
      questions: [
        'Você associa sua própria oração com expectativa genuína de transformação, ou trata como rotina distante?',
        'Como o padrão de Lucas — revelação ligada à oração — poderia moldar sua própria prática devocional?',
        'Que transformação você está buscando através da oração nesta temporada específica?',
      ],
    },
  },
  {
    prayer: {
      title: 'Falavam da Sua Partida que Estava para Cumprir-se',
      text: t(`Senhor, Moisés e Elias "falavam da sua partida que
        estava para cumprir-se em Jerusalém" — a glória da
        Transfiguração já apontava para a cruz que viria. Glória e
        sofrimento, unidos numa única conversa. Ajuda-me a não separar
        essas duas realidades na minha própria compreensão de fé.
        Amém.`),
    },
    meditation: {
      prompt: t(`A conversa na montanha da glória trata
        especificamente da "partida" — um eufemismo para a morte
        iminente de Jesus em Jerusalém — unindo glória máxima e
        sofrimento vindouro numa só cena.`),
      questions: [
        'Você tende a separar glória e sofrimento na sua compreensão de fé, ou consegue vê-los unidos, como nesta cena?',
        'Como a Transfiguração, apontando já para a cruz, muda sua compreensão da relação entre glória e sacrifício?',
        'Que "partida" ou sacrifício necessário você precisa aceitar como parte do mesmo caminho que leva à glória?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Ele Ouvi',
      text: t(`Senhor, encerramos esta semana entre a Epifania e a
        Quaresma com a instrução final da nuvem: "este é o meu
        Filho, o meu eleito; a ele ouvi." Não Moisés, não Elias — só
        Jesus permanece merecendo atenção definitiva. Que toda a
        minha jornada de fé se resolva, no fim, em ouvir só a ti.
        Amém.`),
    },
    meditation: {
      prompt: t(`A instrução final é simples e definitiva — "a ele
        ouvi" — resolvendo qualquer tentação de tratar Moisés, Elias e
        Jesus como iguais; só Jesus permanece como voz final de
        autoridade completa.`),
      questions: [
        'Esta temporada da Epifania inteira — do Batismo à Transfiguração — o que revelou sobre quem Jesus realmente é?',
        'Existem outras "vozes" importantes que você às vezes trata com autoridade igual à de Cristo?',
        'Como você quer entrar na Quaresma que se aproxima, carregando essa instrução simples: "a ele ouvi"?',
      ],
    },
  },
];

const epiphanyC: Record<number, DevotionalEntry[]> = {
  2: week2,
  3: week3,
  4: week4,
  5: week5,
  6: week6,
  7: week7,
  8: week8,
};

export default epiphanyC;
