/**
 * Epifania — Ciclo B — conteúdo ancorado no RCL (leituras reais),
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

// Batismo do Senhor — Gênesis 1:1-5 · Salmo 29 · Atos 19:1-7 · Marcos 1:4-11
const week2: DevotionalEntry[] = [
  {
    prayer: {
      title: 'O Espírito de Deus Pairava Sobre as Águas',
      text: t(`Senhor, no princípio, "a terra era sem forma e vazia...
        mas o Espírito de Deus pairava sobre a face das águas." Antes
        de qualquer palavra criadora, tua presença já se movia sobre
        o caos. Que eu confie nessa mesma presença pairando sobre o
        que em mim ainda está "sem forma e vazio". Amém.`),
    },
    meditation: {
      prompt: t(`A leitura do Batismo no Ciclo B começa
        deliberadamente com a criação — associando as águas do
        batismo com as águas primordiais sobre as quais o Espírito já
        se movia antes de qualquer ordem existir.`),
      questions: [
        'Que área da sua vida você descreveria hoje como "sem forma e vazia", ainda esperando ordem?',
        'Como a imagem do Espírito "pairando" — presente antes mesmo da criação visível — muda sua confiança sobre o caos presente?',
        'O que significaria confiar que Deus já está presente e ativo mesmo antes de você ver qualquer resultado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Disse Deus: Haja Luz',
      text: t(`Senhor, a primeira palavra criadora foi simples e
        direta: "disse Deus: haja luz. E houve luz." Tua palavra tem
        poder criador imediato — não precisa de mais nada além de
        ser falada. Confio que tua palavra sobre mim tem esse mesmo
        poder de trazer luz onde havia escuridão. Amém.`),
    },
    meditation: {
      prompt: t(`A simplicidade da ordem — "haja luz" — e a
        imediatidade da resposta — "e houve luz" — revelam poder
        criador absoluto que não precisa de processos complicados ou
        elaborados.`),
      questions: [
        'Que "escuridão" em você precisa hoje dessa mesma palavra simples e poderosa: "haja luz"?',
        'Você confia que a palavra de Deus tem poder imediato, ou espera processos longos e complicados para mudança?',
        'Como cultivar mais confiança nesse poder direto e simples da palavra de Deus sobre sua própria vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Viu Deus Que a Luz Era Boa',
      text: t(`Senhor, depois de criar a luz, "viu Deus que a luz era
        boa." Tua avaliação da própria obra é de aprovação genuína,
        não crítica constante. Que eu aprenda essa mesma capacidade
        de reconhecer o que é bom, em mim e ao meu redor, sem
        perfeccionismo excessivo. Amém.`),
    },
    meditation: {
      prompt: t(`Deus pausa deliberadamente para reconhecer e
        declarar bondade em sua própria criação — um padrão de
        avaliação positiva que se repete ao longo do relato da
        criação.`),
      questions: [
        'Você tende a reconhecer genuinamente o que é bom em si mesmo e ao seu redor, ou foca principalmente em falhas?',
        'O que significaria cultivar esse mesmo hábito — pausar para reconhecer bondade genuína, não apenas buscar defeitos?',
        'Que "luz" recente em sua própria vida você ainda não parou para reconhecer como boa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Recebestes Vós o Espírito Santo?',
      text: t(`Senhor, Paulo pergunta aos discípulos de Éfeso:
        "recebestes vós o Espírito Santo quando crestes?" — e eles
        nem sequer conheciam sua existência. Examina se há áreas da
        minha própria fé que ainda estão incompletas, esperando
        plenitude que ainda não recebi. Amém.`),
    },
    meditation: {
      prompt: t(`Os discípulos em Éfeso tinham fé genuína, mas
        incompleta — conheciam apenas o batismo de João, sem saber da
        plenitude do Espírito Santo já disponível através de Cristo.`),
      questions: [
        'Existe alguma área da sua fé que, como os discípulos de Éfeso, permanece genuína mas incompleta?',
        'O que significaria estar aberto a receber mais do que você já conhece de Deus, mesmo depois de anos de fé?',
        'Como a disposição desses discípulos de aprender mais, sem defensividade, desafia você?',
      ],
    },
  },
  {
    prayer: {
      title: 'Veio Jesus de Nazaré da Galiléia',
      text: t(`Senhor Jesus, vieste "de Nazaré da Galiléia" para seres
        batizado — uma cidade sem prestígio especial, região
        periférica. Tua disposição de vir de um lugar comum, para um
        rio comum, entre pessoas comuns, revela humildade radical.
        Que eu não desprezes minha própria origem comum. Amém.`),
    },
    meditation: {
      prompt: t(`Nazaré era conhecida por sua insignificância — "pode
        haver coisa bem vinda de Nazaré?" perguntaria Natanael mais
        tarde — e ainda assim é de lá que o Messias emerge para seu
        batismo público.`),
      questions: [
        'Você já desprezou sua própria origem ou contexto por parecer "comum demais" para grandes propósitos?',
        'Como a disposição de Jesus de vir de Nazaré desafia hierarquias de prestígio que valorizamos?',
        'O que significaria confiar que Deus pode usar plenamente seu contexto comum, sem precisar de origem impressionante?',
      ],
    },
  },
  {
    prayer: {
      title: 'Viu os Céus se Abrirem',
      text: t(`Senhor, no momento do batismo, Jesus "viu os céus se
        abrirem, e o Espírito, qual pomba, a descer sobre ele."
        Abertura visível entre céu e terra, comunicação direta e
        inconfundível. Que eu busque essa mesma abertura em minha
        própria oração hoje, não apenas rotina distante. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem dos "céus se abrindo" sugere ruptura de uma
        barreira normalmente fechada — um momento extraordinário de
        comunicação direta entre o divino e o humano.`),
      questions: [
        'Você já experimentou um momento de oração que pareceu genuinamente "os céus se abrindo", não apenas rotina?',
        'O que poderia ajudar você a buscar essa abertura mais genuína na sua oração hoje?',
        'Como a imagem da pomba — suave, não intimidadora — descreve a forma como o Espírito frequentemente se aproxima?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tu És Meu Filho Amado',
      text: t(`Senhor, encerramos esta semana com a voz do céu: "tu
        és meu Filho amado; em ti me comprazo." Uma declaração
        pessoal e direta — "tu", não "ele" — dirigida intimamente a
        Jesus. Que eu ouça essa mesma declaração pessoal e direta
        sobre mim, não apenas como verdade genérica sobre outros.
        Amém.`),
    },
    meditation: {
      prompt: t(`No relato de Marcos, a voz se dirige diretamente a
        Jesus na segunda pessoa ("tu és") — uma comunicação íntima e
        pessoal, não um anúncio público em terceira pessoa.`),
      questions: [
        'Esta semana — da criação ao batismo de Jesus — o que te ensinou sobre a intimidade da comunicação de Deus?',
        'Você ouve declarações de amor de Deus como verdades genéricas distantes ou como palavra pessoal e direta a você?',
        'O que significaria receber hoje, pessoalmente, essa mesma declaração: "tu és meu filho amado"?',
      ],
    },
  },
];

// 2º Domingo após a Epifania — 1 Samuel 3:1-20 · Salmo 139:1-6, 13-18 · 1 Coríntios 6:12-20 · João 1:43-51
const week3: DevotionalEntry[] = [
  {
    prayer: {
      title: 'A Palavra do Senhor Era Muito Rara',
      text: t(`Senhor, o texto observa: "a palavra do Senhor era
        muito rara naqueles dias; as visões não eram freqüentes." Um
        tempo de silêncio espiritual precedeu o chamado a Samuel. Que
        eu não desanime durante meus próprios períodos de silêncio,
        confiando que tua palavra ainda pode vir. Amém.`),
    },
    meditation: {
      prompt: t(`O contexto histórico de escassez de revelação torna
        o chamado subsequente a Samuel ainda mais notável — Deus fala
        precisamente num momento de silêncio geral prolongado.`),
      questions: [
        'Você está atravessando um período que parece "silêncio espiritual", sem revelação clara?',
        'Como a história de Samuel te encoraja a continuar atento, mesmo em tempos de aparente silêncio geral?',
        'O que significaria permanecer disponível, como Samuel, mesmo sem expectativa imediata de resposta?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eis-Me Aqui',
      text: t(`Senhor, três vezes chamaste Samuel, e três vezes ele
        correu a Eli dizendo: "eis-me aqui." Disponibilidade genuína,
        mesmo sem entender completamente quem chamava. Que eu tenha
        essa mesma prontidão de resposta, mesmo antes de compreender
        totalmente. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta repetida de Samuel — "eis-me aqui" —
        antes mesmo de reconhecer que era Deus quem chamava, revela
        disponibilidade genuína como precursora do reconhecimento
        pleno.`),
      questions: [
        'Você já respondeu "eis-me aqui" a um chamado antes de entender completamente sua origem ou propósito?',
        'O que a paciência de Eli em orientar Samuel ensina sobre o papel de mentores no discernimento de chamados?',
        'Que chamado recente você ainda não reconheceu completamente, mas já sente convidando à resposta?',
      ],
    },
  },
  {
    prayer: {
      title: 'Fala, Senhor, Porque o Teu Servo Ouve',
      text: t(`Senhor, orientado por Eli, Samuel finalmente respondeu
        corretamente: "fala, Senhor, porque o teu servo ouve." A
        disposição de escutar veio antes de qualquer pedido ou
        agenda própria. Ensina-me essa mesma postura receptiva antes
        de trazer minhas próprias demandas a ti. Amém.`),
    },
    meditation: {
      prompt: t(`A oração de Samuel é notavelmente receptiva, não
        demandante — "fala... ouve" — um modelo de disposição para
        receber instrução, não apenas apresentar pedidos.`),
      questions: [
        'Sua oração tende a ser mais receptiva (escutando) ou mais demandante (pedindo)?',
        'O que ajudaria você a cultivar essa postura genuína de escuta antes de trazer suas próprias demandas?',
        'Como a estrutura simples dessa oração de Samuel poderia moldar sua própria prática devocional?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vosso Corpo É Santuário do Espírito Santo',
      text: t(`Senhor, Paulo declara: "não sabeis que o vosso corpo é
        santuário do Espírito Santo, que habita em vós?" Uma dignidade
        atribuída à existência física, não apenas à alma. Que eu trate
        meu próprio corpo com o respeito devido a esse santuário. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo eleva a dignidade do corpo físico a um nível
        surpreendente — santuário do Espírito Santo — desafiando
        qualquer desprezo pela existência corporal como meramente
        secundária ou descartável.`),
      questions: [
        'Você trata seu próprio corpo com o respeito devido a um "santuário", ou como algo secundário à sua vida espiritual?',
        'Que hábito concreto de cuidado corporal poderia refletir melhor essa dignidade atribuída por Paulo?',
        'Como essa verdade muda decisões práticas sobre descanso, alimentação, ou uso do seu corpo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Pode Haver Coisa Bem Vinda de Nazaré?',
      text: t(`Senhor, quando Felipe anunciou Jesus de Nazaré,
        Natanael reagiu com ceticismo: "pode haver coisa bem vinda de
        Nazaré?" Preconceito baseado em origem geográfica quase o fez
        perder o encontro mais importante da sua vida. Livra-me dos
        meus próprios preconceitos que poderiam me impedir de
        reconhecer algo genuíno. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta de Felipe ao ceticismo de Natanael não é
        argumento elaborado, mas convite simples — "vem e vê" —
        confiando que experiência direta dissolveria o preconceito
        melhor que qualquer debate.`),
      questions: [
        'Que preconceito baseado em origem, aparência ou reputação já quase te impediu de reconhecer algo genuíno?',
        'Como o convite simples de Felipe — "vem e vê" — em vez de argumentação defensiva, poderia ser seu próprio modelo?',
        'Existe algo ou alguém que você está rejeitando hoje sem realmente ter dado uma chance direta?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vi-te Debaixo da Figueira',
      text: t(`Senhor Jesus, surpreendeste Natanael dizendo: "antes
        que Felipe te chamasse, eu te vi, quando estavas debaixo da
        figueira." Um conhecimento íntimo e prévio que dissolveu
        instantaneamente o ceticismo dele. Que eu confie que também
        me conheces dessa forma profunda, antes mesmo de eu te
        procurar. Amém.`),
    },
    meditation: {
      prompt: t(`O conhecimento específico de Jesus sobre um momento
        privado de Natanael — não observado por ninguém mais —
        transformou instantaneamente ceticismo em reconhecimento pleno
        de que "és rei de Israel".`),
      questions: [
        'Como a certeza de que Jesus já te via, em momentos privados, antes mesmo de você buscá-lo, muda sua percepção da sua própria história?',
        'Que "debaixo da figueira" — momento privado e específico — Jesus talvez já tenha visto em você, mesmo sem você perceber?',
        'O que essa cena ensina sobre como Deus conhece você muito antes de você reconhecê-lo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Coisas Maiores do Que Estas Verás',
      text: t(`Senhor, encerramos esta semana com tua promessa a
        Natanael: "coisas maiores do que estas verás." O
        reconhecimento inicial era apenas o começo de uma jornada de
        revelação ainda maior. Que eu permaneça aberto a ver coisas
        ainda maiores do que já experimentei de ti. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não trata o reconhecimento inicial de
        Natanael como conclusão, mas como início de algo maior — uma
        promessa que se estenderia por todo o resto do evangelho.`),
      questions: [
        'Esta semana — do silêncio antes do chamado de Samuel ao reconhecimento surpreendente de Natanael — o que te ensinou sobre disponibilidade e revelação progressiva?',
        'Você trata seu conhecimento atual de Deus como conclusão, ou permanece aberto a "coisas maiores"?',
        'O que significaria entrar na próxima semana esperando ainda mais revelação, não menos?',
      ],
    },
  },
];

// 3º Domingo após a Epifania — Jonas 3:1-5, 10 · Salmo 62:5-12 · 1 Coríntios 7:29-31 · Marcos 1:14-20
const week4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Pela Segunda Vez Veio a Palavra do Senhor',
      text: t(`Senhor, depois da desobediência inicial de Jonas, "pela
        segunda vez veio a palavra do Senhor" — uma segunda chance,
        não abandono diante da falha. Que eu confie que meus próprios
        fracassos em obedecer não encerram teu chamado sobre mim.
        Amém.`),
    },
    meditation: {
      prompt: t(`A disposição de Deus de repetir o chamado a Jonas,
        depois de sua fuga anterior para Társis, revela paciência
        genuína diante de desobediência real, não apenas hesitação
        menor.`),
      questions: [
        'Existe um chamado que você já abandonou ou fugiu dele, mas que Deus talvez esteja repetindo agora?',
        'Como essa "segunda vez" desafia a ideia de que uma falha encerra definitivamente uma oportunidade?',
        'O que significaria responder desta vez, diferente de como respondeu antes?',
      ],
    },
  },
  {
    prayer: {
      title: 'Os Homens de Nínive Creram em Deus',
      text: t(`Senhor, apesar da mensagem breve e relutante de Jonas,
        "os homens de Nínive creram em Deus" e se arrependeram
        completamente. Tua palavra pode produzir fruto genuíno mesmo
        através de um mensageiro relutante e imperfeito. Usa-me
        assim, apesar das minhas próprias limitações. Amém.`),
    },
    meditation: {
      prompt: t(`A eficácia da mensagem não dependeu do entusiasmo
        ou perfeição do mensageiro — Jonas pregava com relutância
        evidente, e ainda assim toda a cidade se arrependeu.`),
      questions: [
        'Você já hesitou em compartilhar algo importante por se sentir um "mensageiro imperfeito" demais?',
        'Como essa história liberta você de precisar ser um comunicador perfeito antes de ser útil a Deus?',
        'Que mensagem você tem relutado em compartilhar, apesar de saber que precisa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ó Minha Alma, Espera Silenciosa em Deus',
      text: t(`Senhor, o salmista se instrui: "ó minha alma, espera
        silenciosa somente em Deus, porque dele vem a minha
        esperança." Uma disciplina interna deliberada de silêncio e
        confiança exclusiva. Que eu pratique essa mesma quietude
        diante das minhas próprias ansiedades hoje. Amém.`),
    },
    meditation: {
      prompt: t(`O salmista se dirige à própria alma, num diálogo
        interno deliberado — a espera silenciosa não é passividade
        natural, mas disciplina ativa que precisa ser praticada e
        lembrada.`),
      questions: [
        'Você pratica esse tipo de diálogo interno deliberado, instruindo sua própria alma a esperar silenciosamente em Deus?',
        'O que dificulta essa espera silenciosa quando ansiedade ou pressa tomam conta?',
        'Que prática concreta ajudaria você a cultivar esse silêncio confiante hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Tempo Se Abrevia',
      text: t(`Senhor, Paulo escreve com urgência: "o tempo se
        abrevia... a aparência deste mundo passa." Uma consciência da
        brevidade que deveria moldar prioridades presentes, sem
        negligenciar responsabilidades reais. Ajuda-me a viver com
        essa urgência saudável, sem ansiedade paralisante. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não pede abandono de responsabilidades
        normais (casamento, trabalho, posses) — ele pede uma
        perspectiva relativizada sobre elas, à luz da brevidade e da
        vinda iminente do Senhor.`),
      questions: [
        'Como a consciência da brevidade do tempo deveria mudar suas prioridades atuais, sem paralisá-lo?',
        'Que atividade ou preocupação você trata como permanente, quando na verdade é passageira?',
        'O que significaria viver hoje com esse senso saudável de urgência, sem abandonar responsabilidades reais?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Tempo Está Cumprido',
      text: t(`Senhor Jesus, iniciaste teu ministério declarando: "o
        tempo está cumprido, e é chegado o reino de Deus.
        Arrependei-vos, e crede no evangelho." Um anúncio de urgência
        e oportunidade simultâneas. Que eu responda a esse anúncio
        hoje, não apenas o reconheça intelectualmente. Amém.`),
    },
    meditation: {
      prompt: t(`A primeira mensagem pública de Jesus combina
        anúncio ("o tempo está cumprido") com convite direto à ação
        ("arrependei-vos... crede") — não apenas informação, mas
        chamado imediato à resposta.`),
      questions: [
        'Você reconhece intelectualmente a mensagem do evangelho, mas ainda não respondeu completamente a ela em alguma área?',
        'O que significaria "arrepender-se e crer" hoje, concretamente, não apenas como conceito teológico?',
        'Que oportunidade presente você reconhece como "tempo cumprido" para uma mudança que tem adiado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deixando Imediatamente as Suas Redes',
      text: t(`Senhor, ao chamar os primeiros discípulos, "eles,
        deixando imediatamente as suas redes, o seguiram." Resposta
        imediata a um chamado direto, sem negociação prolongada. Que
        eu tenha essa mesma prontidão diante de convites claros que
        já reconheço. Amém.`),
    },
    meditation: {
      prompt: t(`A palavra "imediatamente" aparece repetidamente na
        narrativa de chamado de Marcos — um evangelho conhecido por
        seu ritmo urgente, refletindo a natureza também urgente do
        próprio chamado de Jesus.`),
      questions: [
        'Existe um chamado claro que você reconhece, mas ainda está adiando responder "imediatamente"?',
        'O que os pescadores "deixaram" — e o que isso te ensina sobre o custo real de seguir prontamente?',
        'Como cultivar essa mesma prontidão de resposta, sem impulsividade irresponsável?',
      ],
    },
  },
  {
    prayer: {
      title: 'Consertando as Redes',
      text: t(`Senhor, encerramos esta semana com Tiago e João
        "consertando as redes" quando foram chamados — no meio de
        trabalho ordinário e produtivo, não em crise ou ociosidade.
        Que eu reconheça que teu chamado pode vir precisamente no meio
        do meu trabalho comum, não apenas em momentos extraordinários.
        Amém.`),
    },
    meditation: {
      prompt: t(`O chamado não interrompe uma vida vazia ou
        desocupada — encontra os discípulos em trabalho produtivo e
        legítimo, sugerindo que Deus frequentemente chama no meio da
        vida ordinária, não apesar dela.`),
      questions: [
        'Esta semana — da segunda chance de Jonas ao chamado imediato dos discípulos — o que te ensinou sobre responder prontamente sem esperar circunstâncias "perfeitas"?',
        'Você espera que o chamado de Deus venha em momentos extraordinários, ignorando possibilidades no meio do seu trabalho comum atual?',
        'O que significaria estar atento a um chamado, mesmo "consertando redes" na sua rotina comum desta semana?',
      ],
    },
  },
];

// 4º Domingo após a Epifania — Deuteronômio 18:15-20 · Salmo 111 · 1 Coríntios 8:1-13 · Marcos 1:21-28
const week5: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Um Profeta Semelhante a Mim',
      text: t(`Senhor, Moisés profetiza: "o Senhor teu Deus te
        suscitará... um profeta semelhante a mim; a ele ouvirás."
        Prometeste continuidade de revelação, não abandono depois de
        Moisés. Que eu confie que continuas levantando vozes fiéis
        para me guiar hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa de um "profeta semelhante" reconhece que
        a revelação de Deus não termina com uma única figura — há
        continuidade prometida, cumprida definitivamente em Cristo,
        mas também através de vozes fiéis ao longo da história.`),
      questions: [
        'Que vozes fiéis Deus tem levantado na sua vida para te guiar, continuando sua revelação?',
        'Como você discerne entre voz profética genuína e vozes que apenas reivindicam autoridade?',
        'O que significaria estar mais atento a essas vozes que Deus continua levantando?',
      ],
    },
  },
  {
    prayer: {
      title: 'Porei as Minhas Palavras na Sua Boca',
      text: t(`Senhor, prometes ao profeta futuro: "porei as minhas
        palavras na sua boca, e ele lhes falará tudo o que eu lhe
        ordenar." A autoridade profética não vem de opinião própria,
        mas de palavra recebida e transmitida fielmente. Que eu
        distinga entre minha própria opinião e o que genuinamente vem
        de ti. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa enfatiza recepção, não originalidade —
        o profeta genuíno transmite o que recebe, não inventa mensagem
        própria, um padrão importante para discernir autoridade
        espiritual legítima.`),
      questions: [
        'Como você distingue, na sua própria vida espiritual, entre convicção genuinamente recebida de Deus e opinião pessoal disfarçada de autoridade divina?',
        'Você já confundiu sua própria vontade com a vontade de Deus, apresentando-a com falsa autoridade?',
        'O que ajudaria você a testar mais cuidadosamente suas próprias convicções antes de apresentá-las como palavra de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Grandes São as Obras do Senhor',
      text: t(`Senhor, o salmista declara: "grandes são as obras do
        Senhor, e para serem estudadas por todos os que nelas se
        comprazem." Tuas obras convidam contemplação deliberada, não
        apenas reconhecimento superficial e apressado. Que eu dedique
        tempo genuíno a estudar o que já fizeste. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo usa linguagem de estudo intelectual
        deliberado — "estudadas" — sugerindo que apreciar as obras de
        Deus exige atenção cuidadosa, não apenas reconhecimento
        passageiro.`),
      questions: [
        'Você dedica tempo genuíno para "estudar" — não apenas notar rapidamente — as obras de Deus na sua vida e no mundo?',
        'Que obra específica de Deus você gostaria de contemplar com mais profundidade esta semana?',
        'Como esse tipo de estudo deliberado poderia enriquecer sua gratidão e adoração?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Ciência Incha, Mas o Amor Edifica',
      text: t(`Senhor, Paulo alerta: "a ciência incha, mas o amor
        edifica." Conhecimento sem amor pode se tornar orgulho, em
        vez de construção genuína da comunidade. Que meu próprio
        conhecimento sirva para edificar outros, não para me sentir
        superior. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não desvaloriza conhecimento genuíno — ele
        alerta especificamente contra conhecimento desconectado de
        amor, que se torna instrumento de orgulho em vez de edificação
        comunitária.`),
      questions: [
        'Você já usou conhecimento genuíno de forma que "inchou" seu próprio orgulho em vez de edificar outros?',
        'Como distinguir entre compartilhar conhecimento por amor genuíno e exibi-lo por vaidade?',
        'Que conhecimento você possui que poderia usar mais deliberadamente para edificar, não apenas impressionar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ensinava Como Tendo Autoridade',
      text: t(`Senhor Jesus, na sinagoga de Cafarnaum, "ensinava como
        tendo autoridade, e não como os escribas." Uma diferença
        percebida imediatamente pela multidão — autenticidade que
        transcende técnica religiosa aprendida. Que meu próprio
        testemunho carregue essa mesma autenticidade genuína. Amém.`),
    },
    meditation: {
      prompt: t(`O contraste entre a autoridade de Jesus e a dos
        escribas não era sobre conteúdo formal ou credenciais — era
        sobre uma qualidade percebida de autenticidade genuína versus
        transmissão meramente técnica de tradição.`),
      questions: [
        'Você já sentiu a diferença entre ensino que carrega autoridade genuína e ensino que é apenas repetição técnica?',
        'O que confere autenticidade real ao seu próprio testemunho de fé, além de conhecimento acumulado?',
        'Como cultivar essa qualidade de autoridade genuína, não apenas competência técnica em assuntos espirituais?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cala-te, e Sai Dele',
      text: t(`Senhor Jesus, diante do espírito imundo, ordenaste:
        "cala-te, e sai dele" — e imediatamente ele obedeceu. Tua
        palavra tem autoridade real sobre forças que me oprimem, não
        apenas conselho útil. Confio nesse mesmo poder libertador
        sobre o que me aprisiona hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A ordem é breve e direta, sem elaboração ou
        ritual complexo — a autoridade de Jesus se manifesta em
        comando simples que produz obediência imediata mesmo de
        forças espirituais hostis.`),
      questions: [
        'Que força opressora em sua vida você precisa trazer diante dessa mesma autoridade direta de Jesus?',
        'Você confia que a palavra de Jesus tem poder real de libertação, não apenas conselho moral útil?',
        'O que significaria buscar essa libertação hoje, com a mesma confiança direta demonstrada nesta cena?',
      ],
    },
  },
  {
    prayer: {
      title: 'Correu a Sua Fama por Toda a Região',
      text: t(`Senhor, encerramos esta semana com o resultado: "logo
        correu a sua fama por toda a região da Galiléia." A
        autoridade genuína de Jesus, demonstrada em ação concreta, se
        espalhou naturalmente. Que meu próprio testemunho, quando
        genuíno, também alcance além do que espero. Amém.`),
    },
    meditation: {
      prompt: t(`A propagação da fama de Jesus acontece naturalmente
        — sem estratégia de marketing ou promoção deliberada — como
        resultado direto de autenticidade e poder genuínos
        demonstrados.`),
      questions: [
        'Esta semana — da promessa de um profeta fiel ao poder libertador de Jesus — o que te ensinou sobre autoridade genuína versus aparente?',
        'Você confia que testemunho genuíno se espalha naturalmente, sem precisar de promoção forçada?',
        'O que você quer levar desta semana para continuar buscando autenticidade real, não apenas aparência religiosa?',
      ],
    },
  },
];

// 5º Domingo após a Epifania — Isaías 40:21-31 · Salmo 147:1-11, 20c · 1 Coríntios 9:16-23 · Marcos 1:29-39
const week6: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Se Cansa Nem Se Fatiga',
      text: t(`Senhor, Isaías declara: "o eterno Deus, o Senhor, o
        Criador dos confins da terra, não se cansa nem se fatiga."
        Diante do meu próprio cansaço, encontro descanso na certeza de
        que tua força nunca se esgota. Ajuda-me a buscar minha energia
        em ti, não apenas nas minhas próprias reservas limitadas.
        Amém.`),
    },
    meditation: {
      prompt: t(`A afirmação sobre a inesgotabilidade de Deus vem
        precisamente num contexto de povo cansado e desanimado —
        oferecendo não apenas informação teológica, mas fonte real de
        renovação.`),
      questions: [
        'Você tem buscado energia e força principalmente nas suas próprias reservas limitadas, ou na fonte inesgotável de Deus?',
        'Como a certeza de que Deus "não se cansa" muda sua confiança quando você mesmo está exausto?',
        'O que significaria, concretamente hoje, buscar renovação nessa fonte que nunca se esgota?',
      ],
    },
  },
  {
    prayer: {
      title: 'Renovarão as Suas Forças',
      text: t(`Senhor, a promessa continua: "os que esperam no Senhor
        renovarão as suas forças; subirão com asas como águias." Não
        apenas resistência, mas renovação genuína e ascendente. Que
        eu experimente essa mesma renovação enquanto espero em ti,
        não apenas sobrevivência cansada. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa não é apenas de resistência passiva —
        "renovarão", "subirão" — sugerindo transformação ativa e
        ascendente para quem espera genuinamente no Senhor, não apenas
        aguenta.`),
      questions: [
        'Você tem esperado em Deus de forma que produz renovação genuína, ou apenas resistência cansada?',
        'O que significaria "subir com asas como águias" na sua situação atual específica?',
        'Como distinguir espera genuína e ativa de simples resignação passiva ao cansaço?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ele Sara os Quebrantados de Coração',
      text: t(`Senhor, o salmista celebra que "sara os quebrantados de
        coração, e cura-lhes as feridas" — e, na mesma respiração,
        "conta o número das estrelas." O mesmo Deus que governa o
        cosmos se ocupa do meu coração ferido. Que eu confie nessa
        atenção simultânea ao grandioso e ao íntimo. Amém.`),
    },
    meditation: {
      prompt: t(`A justaposição — cura de corações feridos ao lado
        de contagem de estrelas — comunica que o cuidado íntimo de
        Deus com a dor individual não é diminuído pela sua grandeza
        cósmica.`),
      questions: [
        'Você já duvidou que um Deus tão grandioso se importaria genuinamente com sua dor pessoal específica?',
        'Como essa justaposição — estrelas e corações feridos — muda sua confiança na atenção pessoal de Deus?',
        'Que "quebrantamento" você precisa trazer hoje a esse mesmo Deus que numera as estrelas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Fiz-me Tudo para Todos',
      text: t(`Senhor, Paulo descreve sua adaptabilidade radical:
        "fiz-me tudo para todos, para por todos os meios chegar a
        salvar alguns." Flexibilidade genuína a serviço de um
        propósito fixo — o evangelho. Ensina-me essa mesma
        adaptabilidade sem perder o essencial. Amém.`),
    },
    meditation: {
      prompt: t(`A flexibilidade de Paulo não era ausência de
        convicção — era estratégia deliberada a serviço de um
        propósito claro e inegociável: "para dele tornar-me
        co-participante".`),
      questions: [
        'Você consegue ser flexível em métodos e abordagens sem comprometer suas convicções essenciais?',
        'Onde você poderia se adaptar mais — em linguagem, contexto, abordagem — para alcançar melhor quem precisa ouvir o evangelho?',
        'Como distinguir flexibilidade estratégica genuína de compromisso de convicções centrais?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tomando-a Pela Mão, a Levantou',
      text: t(`Senhor Jesus, ao ver a sogra de Simão doente,
        "chegando-se e tomando-a pela mão, a levantou; e a febre a
        deixou." Um gesto simples de contato físico e cuidado direto.
        Que eu não hesite em me aproximar fisicamente de quem sofre,
        não apenas orar à distância. Amém.`),
    },
    meditation: {
      prompt: t(`A cura acontece através de contato físico direto —
        "tomando-a pela mão" — não à distância ou apenas através de
        palavra, um padrão de proximidade real que caracteriza grande
        parte do ministério de Jesus.`),
      questions: [
        'Você tende a ajudar quem sofre mais à distância (orações, conselhos) ou com proximidade física real quando apropriado?',
        'Quem em sua vida precisa desse tipo de cuidado próximo, "tomando pela mão", não apenas apoio distante?',
        'Como o gesto simples de Jesus desafia formas mais impessoais de cuidado que às vezes praticamos?',
      ],
    },
  },
  {
    prayer: {
      title: 'Foi a Um Lugar Deserto, e Ali Orava',
      text: t(`Senhor Jesus, mesmo em meio a demanda intensa por teu
        ministério, "de madrugada... foi a um lugar deserto, e ali
        orava." Priorizaste tempo a sós com o Pai, mesmo quando
        multidões esperavam por ti. Ensina-me essa mesma disciplina de
        buscar solidão diante de demanda constante. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus se retira deliberadamente para oração
        precisamente no momento de maior demanda e sucesso ministerial
        — não espera por um momento "mais conveniente", que talvez
        nunca chegasse.`),
      questions: [
        'Você tende a adiar tempo de oração e solidão até que "as coisas se acalmem" — momento que talvez nunca chegue?',
        'O que ajudaria você a priorizar esse tempo a sós, mesmo em meio a demandas legítimas e urgentes?',
        'Como a disciplina de Jesus aqui desafia a cultura de disponibilidade constante que muitas vezes vivemos?',
      ],
    },
  },
  {
    prayer: {
      title: 'Pois para Isso É Que Vim',
      text: t(`Senhor, encerramos esta semana com tua resposta clara
        aos discípulos que queriam te manter num só lugar: "vamos a
        outras partes... pois para isso é que vim." Clareza de
        propósito que resistiu até à pressão de sucesso local. Que eu
        também mantenha clareza sobre meu próprio propósito, mesmo
        diante de pressões para permanecer confortável. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus resiste à pressão de permanecer onde já
        havia sucesso e reconhecimento evidentes — sua clareza de
        propósito ("para isso é que vim") supera a tentação de
        conforto e aprovação imediata.`),
      questions: [
        'Esta semana — da força inesgotável de Deus à clareza de propósito de Jesus — o que te ensinou sobre buscar renovação sem perder direção?',
        'Você já sentiu pressão para permanecer num lugar confortável de sucesso, mesmo sentindo chamado para outro lugar?',
        'O que significaria manter clareza sobre seu próprio propósito, mesmo diante de pressão para permanecer onde já é bem-sucedido?',
      ],
    },
  },
];

// 6º Domingo após a Epifania — 2 Reis 5:1-14 · Salmo 30 · 1 Coríntios 9:24-27 · Marcos 1:40-45
const week7: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Era Homem Valente, Porém Leproso',
      text: t(`Senhor, Naamã era "grande homem... homem valente,
        porém leproso" — status e sucesso coexistindo com fragilidade
        oculta. Nenhuma conquista humana protege contra a necessidade
        real de cura que carrego. Examina minhas próprias fraquezas
        escondidas atrás de conquistas visíveis. Amém.`),
    },
    meditation: {
      prompt: t(`O texto justapõe deliberadamente prestígio e
        fragilidade — "grande... porém leproso" — uma combinação que
        desafia a suposição de que sucesso externo garante ausência
        de necessidade real.`),
      questions: [
        'Que "lepra" escondida você carrega atrás de uma fachada de sucesso ou competência?',
        'Por que é mais difícil admitir fragilidade quando já se tem reconhecimento e status?',
        'Quem, como a jovem escrava desta história, poderia te apontar para a cura, se você estivesse disposto a ouvir?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vai, Lava-te Sete Vezes',
      text: t(`Senhor, Naamã esperava ritual grandioso, digno de um
        general — e recebeu apenas a instrução simples: vai e lava-te
        sete vezes no Jordão. A cura estava na simplicidade, não na
        grandiosidade que ele esperava. Ensina-me a aceitar tuas
        instruções simples, mesmo quando meu orgulho preferiria algo
        mais impressionante. Amém.`),
    },
    meditation: {
      prompt: t(`Eliseu nem sequer sai para receber Naamã
        pessoalmente — envia apenas um mensageiro com instrução
        anticlimática, testando se o general aceitaria simplicidade em
        vez de exigir algo à altura do seu status.`),
      questions: [
        'Você já rejeitou uma solução simples porque esperava algo mais "à altura" da sua dor?',
        'O que o orgulho de Naamã revela sobre como às vezes tratamos a instrução de Deus quando parece pequena demais?',
        'Que "Jordão" simples você está evitando mergulhar, esperando um milagre mais espetacular em vez disso?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Choro Pode Durar Uma Noite',
      text: t(`Senhor, o salmista promete: "o choro pode durar uma
        noite; pela manhã, porém, vem o cântico de júbilo." Não
        prometes ausência de sofrimento, mas que ele não é a palavra
        final. Sustenta-me nas noites longas com essa esperança —
        que a manhã, mesmo que demore, virá. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não minimiza a realidade da noite de choro
        — ele a reconhece plenamente, apenas insiste que ela não é
        permanente.`),
      questions: [
        'Em que área da sua vida você está numa "noite" prolongada, esperando pela manhã?',
        'Como a promessa de que o choro "pode durar uma noite" — não que desaparece instantaneamente — muda sua expectativa sobre cura?',
        'Que "cântico de júbilo" passado você pode lembrar hoje como evidência de que as manhãs de fato chegam?',
      ],
    },
  },
  {
    prayer: {
      title: 'Correi de Tal Maneira que o Alcanceis',
      text: t(`Senhor, Paulo instrui: "correi de tal maneira que o
        alcanceis... todo aquele que luta, exerce domínio próprio em
        todas as coisas." Disciplina séria e intencional, não esforço
        casual. Que minha própria busca por ti tenha esse mesmo
        compromisso disciplinado. Amém.`),
    },
    meditation: {
      prompt: t(`A metáfora atlética enfatiza disciplina intencional
        — "domínio próprio em todas as coisas" — não esforço ocasional
        ou casual, mas comprometimento sério comparável ao
        treinamento de um atleta competitivo.`),
      questions: [
        'Sua busca espiritual se parece mais com esforço casual ou disciplina séria e intencional?',
        'Que "domínio próprio" específico você precisa exercitar mais seriamente para correr bem sua própria corrida?',
        'O que significaria tratar sua vida espiritual com o mesmo comprometimento de um atleta em treinamento?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se Quiseres, Bem Podes Tornar-me Limpo',
      text: t(`Senhor Jesus, um leproso rogou: "se quiseres, bem
        podes tornar-me limpo" — confiança total na tua capacidade,
        combinada com humildade sobre tua vontade. Que minha própria
        oração combine essa mesma confiança e submissão. Amém.`),
    },
    meditation: {
      prompt: t(`A oração do leproso é modelo de fé madura — ele não
        duvida do poder de Jesus ("bem podes"), mas também não exige
        automaticamente que sua vontade seja cumprida ("se
        quiseres").`),
      questions: [
        'Sua própria oração combina confiança total no poder de Deus com submissão genuína à vontade dele?',
        'Você tende a duvidar mais do poder de Deus ou a resistir mais à sua vontade específica?',
        'Como essa oração simples e equilibrada poderia moldar como você traz seus próprios pedidos hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Compadecido Dele, Estendendo a Mão, Tocou-o',
      text: t(`Senhor Jesus, "compadecido dele, estendendo a mão,
        tocou-o" — contato físico direto com alguém ritualmente
        impuro, socialmente evitado. Tua compaixão superou qualquer
        preocupação com contaminação ou reputação. Que eu também
        toque, não apenas trate à distância, quem a sociedade evita.
        Amém.`),
    },
    meditation: {
      prompt: t(`O toque de Jesus era radical dentro do contexto —
        leprosos eram evitados fisicamente por lei religiosa — e ainda
        assim ele escolhe contato direto, não apenas cura à distância
        (que também estava ao seu alcance).`),
      questions: [
        'Quem, na sua comunidade, é "evitado" fisicamente ou socialmente, como o leproso era evitado?',
        'Você já preferiu ajudar à distância, quando proximidade real (mesmo que arriscada ou desconfortável) seria mais significativa?',
        'Que "toque" concreto você poderia oferecer a alguém marginalizado esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Iam Ter com Ele de Todos os Lados',
      text: t(`Senhor, encerramos esta semana com o resultado da cura
        divulgada: "de todos os lados iam ter com ele." A
        transformação genuína, mesmo contra instrução explícita de
        silêncio, se espalhou naturalmente. Que minha própria
        experiência de transformação também testemunhe, mesmo sem
        esforço deliberado de propaganda. Amém.`),
    },
    meditation: {
      prompt: t(`Apesar da instrução explícita de Jesus para
        silêncio, a alegria transbordante do homem curado não pôde
        ser contida — testemunho genuíno frequentemente resiste a
        qualquer tentativa de controle ou supressão.`),
      questions: [
        'Esta semana — do orgulho de Naamã à compaixão que toca o intocável — o que te ensinou sobre humildade e cuidado direto?',
        'Sua própria experiência de transformação transborda naturalmente, ou você a mantém cuidadosamente contida?',
        'O que você quer levar desta semana para continuar buscando cura com humildade e oferecendo compaixão concreta a outros?',
      ],
    },
  },
];

// 7º Domingo após a Epifania — Isaías 43:18-25 · Salmo 41 · 2 Coríntios 1:18-22 · Marcos 2:1-12
const week8: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Vos Lembreis das Coisas Passadas',
      text: t(`Senhor, instruis: "não vos lembreis das coisas
        passadas, nem considereis as antigas. Eis que faço uma coisa
        nova." Um convite a soltar o passado para receber genuína
        novidade. Que eu não permaneça preso a fracassos ou glórias
        antigas, a ponto de perder o que fazes agora. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução de "não lembrar" não nega a
        realidade histórica passada — ela pede que essa memória não
        impeça o reconhecimento de algo genuinamente novo que Deus já
        está fazendo.`),
      questions: [
        'Que "coisas passadas" — fracassos ou até sucessos antigos — você tem carregado de forma que impede reconhecer o novo?',
        'Como distinguir entre memória saudável e apego que bloqueia novidade genuína?',
        'Que "coisa nova" você suspeita que Deus já está fazendo, mas ainda não percebeu completamente por estar preso ao passado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Porei Águas no Deserto',
      text: t(`Senhor, prometes: "porei águas no deserto, e rios no
        ermo, para dar de beber ao meu povo." Provisão em lugares
        onde naturalmente não haveria — não apenas melhoria do que já
        existia, mas criação onde faltava completamente. Confia que
        podes fazer isso também nos desertos da minha vida. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa não fala de melhorar recursos escassos
        já existentes — fala de criar provisão inteiramente onde não
        havia nada, no próprio deserto, o lugar de maior escassez
        imaginável.`),
      questions: [
        'Que "deserto" — área de escassez total, não apenas insuficiência — você reconhece na sua vida hoje?',
        'Você consegue crer que Deus pode criar provisão genuína mesmo onde parece impossível, não apenas melhorar o pouco que já existe?',
        'O que significaria confiar nessa promessa específica hoje, diante de uma necessidade que parece impossível de suprir?',
      ],
    },
  },
  {
    prayer: {
      title: 'Dos Teus Pecados Não Me Lembro',
      text: t(`Senhor, apesar da acusação de infidelidade contínua,
        prometes: "eu, eu mesmo, sou o que apago as tuas transgressões
        por amor de mim, e dos teus pecados não me lembro." Perdão
        que serve à tua própria glória, não apenas à minha
        conveniência. Que eu receba esse perdão completo hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A dupla ênfase — "eu, eu mesmo" — sublinha que o
        perdão vem inteiramente da iniciativa de Deus, "por amor de
        mim", não como resposta a mérito ou súplica suficiente do
        povo.`),
      questions: [
        'Você recebe o perdão de Deus como algo que ele genuinamente escolhe fazer "por amor de si mesmo", ou como concessão relutante?',
        'Que pecado específico você ainda carrega, mesmo sabendo que Deus já "não se lembra" dele?',
        'Como viver hoje com a certeza plena desse esquecimento divino deliberado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nele Houve Sim',
      text: t(`Senhor, Paulo declara sobre Cristo: "não foi sim e não;
        mas nele houve sim. Pois, tantas quantas forem as promessas de
        Deus, nele está o sim." Confiabilidade absoluta, sem
        ambiguidade nem contradição. Que eu confie completamente
        nessa consistência inabalável. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo enfatiza a consistência absoluta de Cristo
        como cumprimento de toda promessa divina — não parcial ou
        condicional, mas "sim" completo e definitivo em cada
        promessa.`),
      questions: [
        'Você confia na consistência absoluta das promessas de Deus, ou vive com dúvida sobre se elas realmente se cumprirão?',
        'Que promessa específica de Deus você precisa reafirmar hoje como "sim" definitivo, não condicional?',
        'Como essa confiabilidade de Cristo poderia inspirar mais consistência na sua própria palavra e compromissos?',
      ],
    },
  },
  {
    prayer: {
      title: 'Descobriram o Telhado',
      text: t(`Senhor, diante da multidão impedindo acesso, os
        amigos do paralítico "descobriram o telhado... e baixaram o
        leito." Criatividade e determinação a serviço de trazer
        alguém até ti, mesmo diante de obstáculos reais. Que eu tenha
        essa mesma disposição de remover barreiras por quem precisa
        de ti. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus vê "a fé deles" — no plural, dos amigos, não
        apenas do paralítico — sugerindo que às vezes somos levados
        até Cristo pela fé determinada de outros, não apenas pela
        nossa própria.`),
      questions: [
        'Por quem você poderia "abrir um telhado" — agir com criatividade determinada — para trazê-lo até Jesus?',
        'Você já foi carregado até Deus pela fé de amigos, mesmo quando sua própria fé estava fraca?',
        'Que obstáculo real você precisaria superar criativamente para ajudar alguém a se aproximar de Cristo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Filho, Perdoados São os Teus Pecados',
      text: t(`Senhor Jesus, antes de curar o corpo do paralítico,
        primeiro disseste: "filho, perdoados são os teus pecados."
        Priorizaste a cura mais profunda antes da mais visível. Que
        eu busque, na minha própria vida, a cura interior tanto
        quanto busco alívio das dificuldades externas. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus aborda primeiro uma necessidade invisível
        (perdão) antes da necessidade visível e óbvia (paralisia) —
        uma ordem de prioridades que desafia nossa tendência de
        buscar alívio apenas do que é externamente visível.`),
      questions: [
        'Você tende a buscar mais alívio de dificuldades visíveis ou cura de feridas interiores menos óbvias?',
        'Que "perdão" você precisa receber hoje antes mesmo de resolver problemas externos mais visíveis?',
        'Como a ordem de prioridades de Jesus aqui desafia sua própria forma de buscar ajuda?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nunca Vimos Coisa Semelhante',
      text: t(`Senhor, encerramos esta semana com a reação da
        multidão: "todos pasmavam e glorificavam a Deus, dizendo:
        Nunca vimos coisa semelhante." Diante de uma obra genuína de
        Deus, a resposta apropriada é assombro que glorifica, não
        apenas curiosidade. Que minha própria reação às tuas obras
        seja sempre de glorificação genuína. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta da multidão une assombro genuíno
        ("pasmavam") com direcionamento correto de glória ("a Deus")
        — reconhecimento que não fica apenas na admiração da cena, mas
        aponta para sua fonte real.`),
      questions: [
        'Esta semana — da promessa de coisas novas ao perdão que precede a cura — o que te ensinou sobre a ordem das prioridades de Deus?',
        'Sua reação a obras genuínas de Deus tende mais para curiosidade passageira ou glorificação genuína que aponta para ele?',
        'O que você quer levar desta semana para continuar reconhecendo, com assombro apropriado, o que Deus continua fazendo?',
      ],
    },
  },
];

// Domingo da Transfiguração — 2 Reis 2:1-12 · Salmo 50:1-6 · 2 Coríntios 4:3-6 · Marcos 9:2-9
export const transfigurationWeek: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Vive o Senhor, e Vive a Tua Alma, Que Não Te Deixarei',
      text: t(`Senhor, três vezes Elias disse a Eliseu para ficar
        para trás, e três vezes Eliseu respondeu: "vive o Senhor, e
        vive a tua alma, que não te deixarei." Perseverança
        inabalável, mesmo sem saber exatamente o que viria. Ensina-me
        essa mesma lealdade discipular. Amém.`),
    },
    meditation: {
      prompt: t(`A repetição — três recusas de Elias, três respostas
        idênticas de Eliseu — enfatiza determinação inabalável, mesmo
        sem saber que estava prestes a testemunhar algo
        extraordinário.`),
      questions: [
        'Você já perseverou em seguir alguém ou algo, mesmo sem entender completamente para onde estava indo?',
        'O que sustenta esse tipo de lealdade quando o caminho não está claro?',
        'Que "não te deixarei" você precisa dizer hoje — a Deus, a um compromisso, a uma pessoa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Dobrada Porção do Teu Espírito',
      text: t(`Senhor, quando perguntado o que desejava antes da
        partida de Elias, Eliseu pediu: "dobrada porção de teu
        espírito." O maior desejo dele era continuar a obra espiritual
        que havia testemunhado. Examina meus próprios desejos mais
        profundos — voltados para o que realmente importa? Amém.`),
    },
    meditation: {
      prompt: t(`Elias chama o pedido de "coisa difícil" — exigia que
        Eliseu genuinamente testemunhasse o momento da partida, uma
        condição que não estava sob seu controle.`),
      questions: [
        'Se pudesse pedir uma única coisa espiritual hoje, o que seria — e o que isso revela sobre suas prioridades reais?',
        'Você busca continuar o legado espiritual de quem te formou na fé?',
        'O que significa um pedido "difícil" que exige presença genuína, não apenas desejo passivo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Um Carro de Fogo os Separou',
      text: t(`Senhor, "um carro de fogo, com cavalos de fogo, os
        separou um do outro; e Elias subiu ao céu num redemoinho."
        Uma despedida dramática e definitiva, marcando transição de
        liderança espiritual. Ajuda-me a aceitar minhas próprias
        transições, mesmo quando são súbitas e dolorosas. Amém.`),
    },
    meditation: {
      prompt: t(`A separação é abrupta e visualmente dramática — um
        momento de transição que Eliseu não controlava, mas que
        exigia dele resposta imediata (rasgar as vestes, tomar a
        capa) para seguir em frente.`),
      questions: [
        'Que transição abrupta em sua vida você ainda está processando ou resistindo aceitar completamente?',
        'Como Eliseu respondeu praticamente (tomando a capa de Elias) depois da perda súbita — o que isso ensina sobre continuar mesmo em luto?',
        'O que significaria "pegar a capa" — continuar o trabalho — depois de uma perda ou transição significativa em sua vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Deus Deste Século Cegou os Entendimentos',
      text: t(`Senhor, Paulo explica por que alguns não veem a
        glória do evangelho: "o deus deste século cegou os
        entendimentos dos incrédulos, para que lhes não resplandeça a
        luz." Há forças reais de cegueira espiritual operando. Abre
        meus próprios olhos, e os de quem oro, para essa luz. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo reconhece resistência espiritual real e ativa
        contra o evangelho — não apenas indiferença neutra, mas
        cegueira ativamente imposta, o que explica por que argumentos
        puramente racionais nem sempre bastam.`),
      questions: [
        'Você já orou especificamente pela remoção de "cegueira espiritual" em alguém, não apenas por melhor argumentação?',
        'Como reconhecer essa dimensão espiritual da resistência muda sua abordagem ao testemunhar a alguém resistente?',
        'Que "cegueira" você reconhece ainda em sua própria compreensão que precisa ser removida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Foi Transfigurado Diante Deles',
      text: t(`Senhor Jesus, "foi transfigurado diante deles; as
        suas vestes tornaram-se resplandecentes." Por um momento, a
        glória divina, normalmente velada, tornou-se visível a três
        discípulos. Que eu confie que essa mesma glória, ainda que
        velada, está sempre presente em ti. Amém.`),
    },
    meditation: {
      prompt: t(`A Transfiguração revela algo que sempre foi
        verdadeiro sobre Jesus — não transformação criando algo novo,
        mas revelação momentânea da glória que sua humanidade
        normalmente velava.`),
      questions: [
        'Como a ideia de glória "sempre presente, mas normalmente velada" muda sua percepção da presença comum de Jesus?',
        'Você já teve um momento de clareza súbita sobre algo que sempre foi verdade, mas que não conseguia ver antes?',
        'O que significaria viver com maior consciência dessa glória velada em cada encontro comum com Cristo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Sabia o Que Havia de Dizer',
      text: t(`Senhor, diante da visão, Pedro "não sabia o que havia
        de dizer, porque ficaram atemorizados." Nem toda experiência
        espiritual intensa vem com clareza imediata de resposta —
        às vezes o assombro genuíno precede a compreensão. Aceita
        meus próprios momentos de silêncio confuso diante de ti. Amém.`),
    },
    meditation: {
      prompt: t(`Marcos preserva honestamente a confusão de Pedro —
        não edita a cena para parecer mais composta — um retrato
        realista de como experiências genuínas do sagrado podem
        deixar até discípulos próximos temporariamente sem palavras.`),
      questions: [
        'Você já teve um momento diante de Deus onde simplesmente "não sabia o que dizer"?',
        'Como essa honestidade sobre confusão e temor legítimos te dá permissão para suas próprias experiências não resolvidas?',
        'O que significaria aceitar esse tipo de silêncio confuso como parte válida da experiência espiritual, não fracasso?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Este Ouvi',
      text: t(`Senhor, encerramos esta semana entre a Epifania e a
        Quaresma com a instrução final da nuvem: "este é o meu Filho
        amado; a ele ouvi." Não Moisés, não Elias — só Jesus continua
        merecendo atenção definitiva. Que toda a minha jornada de fé
        se resolva, no fim, em ouvir só a ti. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução final da nuvem é simples e definitiva —
        "a ele ouvi" — resolvendo qualquer tentação de tratar Moisés,
        Elias e Jesus como iguais; só Jesus permanece como voz final
        de autoridade.`),
      questions: [
        'Esta temporada da Epifania inteira — do Batismo à Transfiguração — o que revelou sobre quem Jesus realmente é?',
        'Existem outras "vozes" importantes que você às vezes trata com autoridade igual à de Cristo?',
        'Como você quer entrar na Quaresma que se aproxima, carregando essa instrução simples: "a ele ouvi"?',
      ],
    },
  },
];

const epiphanyB: Record<number, DevotionalEntry[]> = {
  2: week2,
  3: week3,
  4: week4,
  5: week5,
  6: week6,
  7: week7,
  8: week8,
};

export default epiphanyB;
