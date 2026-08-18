/**
 * Advento — Ciclo B — conteúdo ancorado no RCL (leituras reais).
 *
 * Mesmo padrão de advent-A.ts. Escrito em 2026-08-18.
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

// Advento 1 — Isaías 64:1-9 · Salmo 80:1-7, 17-19 · 1 Coríntios 1:3-9 · Marcos 13:24-37
const week1: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Se Fendesses os Céus',
      text: t(`Senhor, Isaías clama: "oh! se fendesses os céus, e
        descesses" — um pedido desesperado por intervenção visível e
        inegável. Neste início do Advento, reconheço meu próprio
        desejo de que reveles tua presença de forma tão inconfundível.
        Vem, mesmo que de formas mais silenciosas do que eu peço.
        Amém.`),
    },
    meditation: {
      prompt: t(`O clamor de Isaías nasce de desespero genuíno diante
        do silêncio percebido de Deus — uma oração de urgência, não de
        conforto tranquilo.`),
      questions: [
        'Você já sentiu esse mesmo desejo desesperado por uma intervenção visível de Deus?',
        'Como lidar com a diferença entre o "fendesses os céus" que pedimos e a forma silenciosa como Deus frequentemente age?',
        'Que situação você gostaria que Deus "descesse" de forma inconfundível hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tu És Nosso Pai; Nós Somos o Barro',
      text: t(`Senhor, apesar da confissão de pecado, Isaías retorna a
        uma imagem de confiança: "tu és nosso Pai; nós somos o barro,
        e tu o nosso oleiro." Mesmo reconhecendo minha falha, confio
        que continuas moldando, não descartando. Continua teu trabalho
        em mim. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem do oleiro aparece precisamente depois da
        confissão mais honesta de pecado no capítulo — confiança e
        confissão coexistem, não se excluem.`),
      questions: [
        'Você consegue confessar honestamente uma falha e, na mesma oração, confiar que Deus continua trabalhando em você?',
        'O que significa ser "barro nas mãos do oleiro" — moldável, não descartado, mesmo imperfeito?',
        'Que área da sua vida você precisa entregar novamente às mãos do oleiro hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Reabilita-nos, Ó Deus dos Exércitos',
      text: t(`Senhor, o salmista repete: "reabilita-nos, ó Deus dos
        exércitos; faze resplandecer o teu rosto, para que sejamos
        salvos." Um povo alimentado com "pão de lágrimas" ainda assim
        clama por restauração, não desiste. Ensina-me essa
        persistência na oração diante de dificuldade prolongada. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem do "pão de lágrimas" reconhece sofrimento
        real e prolongado — o salmo não minimiza a dor antes de pedir
        restauração.`),
      questions: [
        'Você já se sentiu "alimentado com pão de lágrimas" — sofrimento que se tornou quase cotidiano?',
        'O que sustenta a persistência de continuar orando por restauração, mesmo quando ela demora?',
        'Que "resplandecer do rosto de Deus" você mais precisa hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nenhum Dom Vos Falta',
      text: t(`Senhor, Paulo assegura aos coríntios: "nenhum dom vos
        falta, enquanto aguardais a manifestação de nosso Senhor Jesus
        Cristo." Enquanto espero tua vinda, já tenho o que preciso
        para viver fielmente hoje. Ajuda-me a reconhecer e usar esses
        dons, em vez de focar no que sinto que falta. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo garante suficiência presente ("nenhum dom vos
        falta") mesmo em meio à espera por algo futuro — a plenitude
        não é adiada até a segunda vinda.`),
      questions: [
        'Você tende a focar mais no que sente que falta ou nos dons que já possui enquanto espera?',
        'Que dom específico você reconhece em si mesmo que talvez esteja subutilizando?',
        'Como viver com essa confiança de suficiência presente muda sua ansiedade sobre o futuro?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Sol Escurecerá, a Lua Não Dará Sua Luz',
      text: t(`Senhor Jesus, descreves sinais cósmicos dramáticos
        antes da tua vinda — sol escurecido, estrelas caindo. Diante
        de linguagem tão intensa, ajuda-me a não temer, mas a
        reconhecer que até o colapso do que parece mais permanente
        está sob teu controle soberano. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem apocalíptica, embora alarmante, serve
        para afirmar a soberania de Cristo sobre a própria criação,
        não para gerar pânico gratuito.`),
      questions: [
        'Que "sinais cósmicos" atuais — crises globais, incertezas — mais alimentam sua ansiedade?',
        'Como a soberania de Cristo sobre até os elementos mais permanentes muda sua reação a essas incertezas?',
        'O que significaria enfrentar notícias alarmantes com fé, não com pânico?',
      ],
    },
  },
  {
    prayer: {
      title: 'Da Figueira Aprendei a Parábola',
      text: t(`Senhor, ensinaste a discernir os tempos observando a
        figueira: "quando já o seu ramo se torna tenro... sabeis que
        está próximo o verão." Ajuda-me a discernir com a mesma
        atenção os sinais espirituais da minha própria vida e do meu
        tempo. Amém.`),
    },
    meditation: {
      prompt: t(`A parábola convida a um discernimento prático e
        observacional — não especulação abstrata, mas atenção a
        sinais concretos e reconhecíveis.`),
      questions: [
        'Que "sinais" espirituais você tem observado recentemente, na sua vida ou ao seu redor?',
        'Como cultivar esse tipo de discernimento atento, sem cair em ansiedade excessiva sobre o futuro?',
        'O que os "ramos tenros" da sua própria vida sugerem sobre o que está por vir?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vigiai',
      text: t(`Senhor, encerramos a primeira semana com tua palavra
        final e simples: "vigiai." Uma única palavra, repetida,
        resumindo toda a instrução. Que essa vigilância simples —
        sem drama, sem ansiedade — marque como entro na segunda semana
        do Advento. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução final é deliberadamente simples e
        repetida — "vigiai" — não uma lista complexa de preparações,
        mas um estado constante de atenção.`),
      questions: [
        'Esta primeira semana — do clamor de Isaías à vigilância final de Jesus — o que te ensinou sobre esperar ativamente?',
        'O que significa "vigiar" de forma simples e sustentável, sem se esgotar em ansiedade constante?',
        'Como você quer entrar na segunda semana do Advento, à luz dessa instrução?',
      ],
    },
  },
];

// Advento 2 — Isaías 40:1-11 · Salmo 85:1-2, 8-13 · 2 Pedro 3:8-15a · Marcos 1:1-8
const week2: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Consolai, Consolai o Meu Povo',
      text: t(`Senhor, Isaías abre com ternura: "consolai, consolai o
        meu povo, diz o vosso Deus." Antes de qualquer exigência, vem
        o consolo. Que eu receba esse consolo genuíno hoje, e que eu
        também o ofereça a quem precisa ao meu redor. Amém.`),
    },
    meditation: {
      prompt: t(`A repetição — "consolai, consolai" — enfatiza a
        urgência e a ternura da mensagem, um duplo comando que
        prioriza cuidado antes de correção.`),
      questions: [
        'Você recebe o consolo de Deus com a mesma disposição com que recebe suas exigências?',
        'Quem ao seu redor precisa de consolo genuíno de você hoje, antes de qualquer correção ou conselho?',
        'O que significaria começar sua oração hoje simplesmente recebendo consolo, sem pedir nada mais?',
      ],
    },
  },
  {
    prayer: {
      title: 'Todo Vale Será Levantado',
      text: t(`Senhor, a promessa de Isaías inclui transformação
        radical da paisagem: "todo vale será levantado, e será
        abatido todo monte." Nivelamento completo para que tua glória
        seja visível a todos. Nivela também os obstáculos internos que
        me impedem de ver claramente. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem geográfica de nivelamento — vales elevados,
        montanhas abaixadas — sugere que tanto o desânimo (vale) quanto
        o orgulho (monte) precisam ser corrigidos para que o caminho
        fique claro.`),
      questions: [
        'Que "vale" — desânimo, desespero — precisa ser elevado em você?',
        'Que "monte" — orgulho, autossuficiência — precisa ser abaixado?',
        'Como esses dois movimentos opostos trabalham juntos para preparar o caminho de Deus em você?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Justiça e a Paz Se Beijaram',
      text: t(`Senhor, o salmista celebra: "a benignidade e a
        fidelidade se encontraram; a justiça e a paz se beijaram."
        Qualidades que parecem tensas se harmonizam completamente em
        ti. Ensina-me a buscar essa mesma harmonia, sem sacrificar uma
        pela outra. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem poética de justiça e paz "se beijando"
        comunica reconciliação plena entre valores que, na prática
        humana, frequentemente competem entre si.`),
      questions: [
        'Onde você sente tensão entre buscar justiça (acerto de contas) e buscar paz (reconciliação)?',
        'Como Deus consegue unir essas qualidades sem contradição?',
        'Que situação específica pede essa mesma harmonia de você hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Um Dia Para o Senhor É Como Mil Anos',
      text: t(`Senhor, Pedro escreve que "não querendo que ninguém se
        perca" é a razão da tua aparente demora — "um dia para o
        Senhor é como mil anos." Tua paciência não é indiferença, mas
        misericórdia deliberada. Ajuda-me a interpretar minha própria
        espera dessa forma. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro reformula o que poderia parecer atraso divino
        como expressão ativa de misericórdia — a demora existe
        precisamente porque Deus deseja que mais pessoas se
        arrependam.`),
      questions: [
        'Você já interpretou a demora de Deus como indiferença, quando poderia ser misericórdia deliberada?',
        'Como essa reformulação muda sua paciência diante de orações ainda não respondidas?',
        'Que "tempo de Deus" você precisa confiar hoje, mesmo sem entender completamente o motivo da espera?',
      ],
    },
  },
  {
    prayer: {
      title: 'Princípio do Evangelho de Jesus Cristo',
      text: t(`Senhor, Marcos abre seu evangelho direto ao ponto:
        "princípio do evangelho de Jesus Cristo, Filho de Deus." Sem
        genealogias longas, sem preâmbulo — ação imediata. Que minha
        própria fé tenha essa mesma urgência direta, sem
        procrastinação desnecessária. Amém.`),
    },
    meditation: {
      prompt: t(`O estilo de Marcos é notavelmente direto e urgente
        comparado aos outros evangelhos — a ação começa imediatamente,
        refletindo o caráter de todo o livro.`),
      questions: [
        'Sua fé tende a ser mais contemplativa e lenta, ou ativa e urgente como o estilo de Marcos?',
        'Que "procrastinação espiritual" você reconhece em sua própria vida de fé?',
        'O que significaria abordar hoje sua fé com essa mesma urgência direta?',
      ],
    },
  },
  {
    prayer: {
      title: 'Comia Gafanhotos e Mel Silvestre',
      text: t(`Senhor, João Batista vivia de forma radicalmente
        simples — vestes de pelos de camelo, gafanhotos e mel
        silvestre — sem que isso diminuísse sua autoridade profética.
        Livra-me de associar credibilidade espiritual com conforto ou
        aparência convencional. Amém.`),
    },
    meditation: {
      prompt: t(`A descrição física de João contrasta deliberadamente
        com expectativas religiosas convencionais da época — sua
        autoridade vinha do chamado, não da aparência ou conforto.`),
      questions: [
        'Você já julgou a credibilidade espiritual de alguém pela aparência externa ou estilo de vida convencional?',
        'O que a simplicidade radical de João ensina sobre onde reside autoridade genuína?',
        'Que "conforto" você poderia dispensar para viver mais alinhado com seu propósito real?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ele Vos Batizará no Espírito Santo',
      text: t(`Senhor, encerramos esta semana com a promessa de João:
        "ele, porém, vos batizará no Espírito Santo." Toda a
        preparação de João aponta para além de si mesmo, para algo
        maior que só Cristo pode dar. Que minha própria preparação
        aponte sempre além de mim mesmo, para ti. Amém.`),
    },
    meditation: {
      prompt: t(`João se descreve deliberadamente como menor —
        "não sou digno... de desatar a correia" — apontando toda
        atenção para além de si mesmo, um modelo de humildade
        vocacional.`),
      questions: [
        'Esta segunda semana — do consolo de Isaías à humildade radical de João — o que te ensinou sobre preparação genuína?',
        'Você aponta, como João, além de si mesmo em qualquer influência que tenha sobre outros?',
        'Como você quer entrar na terceira semana do Advento, à luz dessa reflexão?',
      ],
    },
  },
];

// Advento 3 — Isaías 61:1-4, 8-11 · Salmo 126 · 1 Tessalonicenses 5:16-24 · João 1:6-8, 19-28
const week3: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Ungiu-me para Pregar Boas-Novas aos Mansos',
      text: t(`Senhor, Isaías descreve uma unção específica: "ungiu-me
        para pregar boas-novas aos mansos... a restaurar os contritos
        de coração." Neste Domingo Gaudete, celebro que a boa notícia
        é dirigida especificamente a quem está humilde e quebrantado,
        não apenas aos fortes. Amém.`),
    },
    meditation: {
      prompt: t(`A lista de destinatários da unção — mansos,
        contritos, cativos, presos — descreve especificamente pessoas
        em posição de fraqueza, não de força ou realização.`),
      questions: [
        'Você se identifica mais com os "fortes" que já têm tudo resolvido, ou com os "mansos e contritos" que precisam de boas novas?',
        'Onde você reconhece, honestamente, precisar dessa restauração hoje?',
        'Como isso muda sua forma de anunciar boas notícias a outros que estão quebrantados?',
      ],
    },
  },
  {
    prayer: {
      title: 'Grinalda em Vez de Cinzas',
      text: t(`Senhor, prometeste "dar-lhes uma grinalda em vez de
        cinzas, óleo de gozo em vez de pranto." Uma troca completa,
        não parcial. Que áreas de luto e cinzas em minha vida tu
        queres transformar em celebração genuína nesta estação de
        alegria? Amém.`),
    },
    meditation: {
      prompt: t(`As trocas são específicas e completas — não apenas
        alívio da dor, mas substituição por algo positivo e
        celebratório (grinalda, óleo de gozo, louvor).`),
      questions: [
        'Que "cinzas" você carrega que você gostaria que Deus transformasse em "grinalda"?',
        'Você já experimentou essa troca completa em alguma área da sua vida?',
        'O que significaria celebrar essa esperança hoje, mesmo antes de ver a transformação completa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Éramos Como os Que Estão Sonhando',
      text: t(`Senhor, o salmista descreve a restauração como algo
        quase inacreditável: "quando o Senhor trouxe do cativeiro os
        que voltaram a Sião, éramos como os que estão sonhando." Que
        eu confie que tua restauração, quando vier, pode superar até
        minha própria capacidade de imaginar. Amém.`),
    },
    meditation: {
      prompt: t(`A comparação com um sonho sugere restauração tão
        completa que parece surreal — a realidade excedendo a
        expectativa, não apenas cumprindo-a minimamente.`),
      questions: [
        'Você já experimentou uma restauração tão completa que parecia "sonho"?',
        'O que impede você de esperar esse tipo de restauração completa, em vez de conformar-se com o mínimo?',
        'Como cultivar expectativa genuína, sem cair em fantasia irrealista?',
      ],
    },
  },
  {
    prayer: {
      title: 'Regozijai-vos Sempre, Orai Sem Cessar',
      text: t(`Senhor, Paulo condensa a vida cristã em instruções
        curtas: "regozijai-vos sempre. Orai sem cessar. Em tudo dai
        graças." Simplicidade radical que resume disciplinas
        profundas. Ajuda-me a viver hoje segundo esse trio simples de
        instruções. Amém.`),
    },
    meditation: {
      prompt: t(`As três instruções são notavelmente breves, mas
        radicais em seu alcance — "sempre", "sem cessar", "em tudo" —
        cobrindo cada momento, sem exceção.`),
      questions: [
        'Qual das três instruções — alegria constante, oração contínua, gratidão em tudo — é mais difícil para você atualmente?',
        'O que significaria praticar genuinamente "orar sem cessar", não como fórmula, mas como disposição constante?',
        'Como esses três hábitos, praticados juntos, se reforçam mutuamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu Não Sou o Cristo',
      text: t(`Senhor, quando perguntaram a João se ele era o Cristo,
        respondeu com clareza: "eu não sou o Cristo." Nenhuma
        ambiguidade, nenhuma tentação de aceitar honra que não lhe
        pertencia. Dá-me essa mesma clareza sobre meus próprios
        limites e sobre quem realmente ocupa o centro. Amém.`),
    },
    meditation: {
      prompt: t(`João recusa três identidades honrosas em sequência
        — Cristo, Elias, o Profeta — insistindo em se definir apenas
        como "a voz", uma função de apontar para outro.`),
      questions: [
        'Você já foi tentado a aceitar crédito ou honra que não pertencia genuinamente a você?',
        'Como a clareza de João sobre sua própria identidade e limites desafia sua própria tentação de "parecer mais importante"?',
        'O que significa definir-se, como João, apenas em função de apontar para Cristo?',
      ],
    },
  },
  {
    prayer: {
      title: 'No Meio de Vós Está Um a Quem Vós Não Conheceis',
      text: t(`Senhor, João disse à multidão: "no meio de vós está um
        a quem vós não conheceis." Tua presença pode estar próxima,
        mesmo quando não reconhecida. Abre meus olhos para reconhecer
        tua proximidade que talvez eu esteja perdendo hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A afirmação de João é surpreendente — o Messias já
        estava presente, no meio da multidão, mas não reconhecido —
        um lembrete de que presença física não garante reconhecimento
        genuíno.`),
      questions: [
        'Existe alguma forma pela qual Deus pode estar "no meio" da sua vida hoje, ainda não reconhecida?',
        'O que dificulta reconhecer a presença de Deus quando ela não vem de forma óbvia ou esperada?',
        'Que prática ajudaria você a estar mais atento a essa presença despercebida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Preparar os Seus Caminhos',
      text: t(`Senhor, encerramos esta semana com o propósito de
        João, "preparar os seus caminhos" — toda sua vida orientada
        para um propósito além de si mesmo. Que minha própria vida
        esta semana, especialmente com o Natal se aproximando, esteja
        orientada para preparar espaço genuíno para ti. Amém.`),
    },
    meditation: {
      prompt: t(`A missão inteira de João se resume a essa única
        função — preparação — um modelo de vida vivida em função de
        um propósito maior, não de realização pessoal isolada.`),
      questions: [
        'Esta terceira semana — da alegria completa de Isaías à humildade de João — o que te ensinou sobre viver com propósito orientado além de si mesmo?',
        'O que significaria, concretamente, "preparar o caminho" para Cristo nesta última semana antes do Natal?',
        'Como você quer entrar na quarta e última semana do Advento, à luz dessa reflexão?',
      ],
    },
  },
];

// Advento 4 — 2 Samuel 7:1-11, 16 · Salmo 89:1-4, 19-26 · Romanos 16:25-27 · Lucas 1:26-38
const week4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Edificar-me-ás Tu uma Casa?',
      text: t(`Senhor, Davi quis construir-te uma casa de cedro, e
        respondeste com uma pergunta que inverte a expectativa:
        "edificar-me-ás tu uma casa para eu nela habitar?" Às vezes
        meus melhores planos para te servir não são exatamente o que
        pedes. Ajuda-me a ouvir tua vontade real, não apenas minha
        boa intenção. Amém.`),
    },
    meditation: {
      prompt: t(`A intenção de Davi era genuinamente boa e piedosa
        — e ainda assim Deus a redireciona, revelando um plano maior
        (uma casa dinástica, não um templo) que Davi não havia
        imaginado.`),
      questions: [
        'Você já teve uma boa intenção de servir a Deus que ele redirecionou para algo diferente do que você planejava?',
        'Como discernir entre boa intenção genuína e a vontade específica de Deus?',
        'O que significaria estar aberto a esse tipo de redirecionamento em seus próprios planos?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu Te Farei um Grande Nome',
      text: t(`Senhor, ao redirecionar o plano de Davi, prometeste
        algo maior: "eu te farei um grande nome... o teu trono será
        estabelecido para sempre." O redirecionamento não foi
        diminuição, mas ampliação do propósito original. Confio que
        teus redirecionamentos na minha vida seguem esse mesmo padrão.
        Amém.`),
    },
    meditation: {
      prompt: t(`A promessa que substitui o plano original de Davi é
        maior, não menor — um padrão que sugere que os desvios de
        Deus em relação aos nossos planos geralmente levam a algo mais
        amplo, não a uma perda.`),
      questions: [
        'Você já experimentou um redirecionamento de Deus que, no fim, se revelou maior do que seu plano original?',
        'Como essa confiança muda sua reação atual a um plano que parece estar sendo redirecionado?',
        'O que significaria confiar nesse padrão diante de uma decepção presente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cantarei para Sempre as Benignidades do Senhor',
      text: t(`Senhor, o salmista se compromete: "cantarei para
        sempre as benignidades do Senhor." Nesta última semana antes
        do Natal, que meu próprio louvor seja sustentado — não apenas
        emocionado no momento da celebração, mas comprometido para
        sempre. Amém.`),
    },
    meditation: {
      prompt: t(`O compromisso é explicitamente de longo prazo —
        "para sempre" — não uma explosão emocional momentânea de
        gratidão, mas disposição contínua e duradoura.`),
      questions: [
        'Seu louvor a Deus tende a ser mais emocional e momentâneo, ou sustentado ao longo do tempo?',
        'O que ajudaria você a manter esse compromisso de louvor mesmo depois que a celebração do Natal passar?',
        'Que benignidade específica de Deus você quer se comprometer a lembrar "para sempre"?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Mistério Guardado em Silêncio',
      text: t(`Senhor, Paulo fala de "revelação do mistério guardado
        em silêncio desde os tempos eternos, mas agora manifesto."
        Nesta véspera do Natal, celebro que o que estava escondido
        finalmente se tornou visível em Cristo. Que eu receba essa
        revelação com o assombro que ela merece. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem de "mistério revelado" enfatiza que o
        Natal não é apenas um evento histórico, mas o clímax de um
        plano eterno, finalmente tornado visível no tempo.`),
      questions: [
        'Como a ideia de um "mistério eterno" finalmente revelado muda a forma como você vê o nascimento de Jesus?',
        'Você ainda consegue sentir assombro genuíno diante dessa revelação, ou ela se tornou familiar demais?',
        'O que ajudaria você a recuperar esse assombro nesta véspera do Natal?',
      ],
    },
  },
  {
    prayer: {
      title: 'Como Se Fará Isso?',
      text: t(`Senhor, Maria perguntou honestamente ao anjo: "como se
        fará isso, uma vez que não conheço varão?" Uma pergunta real,
        não resistência de fé, apenas busca genuína de entendimento.
        Recebe minhas próprias perguntas honestas sobre como tuas
        promessas se cumprirão. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta de Maria não é repreendida pelo anjo —
        diferente da reação a Zacarias por dúvida similar — sugerindo
        que perguntas genuínas de entendimento são diferentes de
        descrença resistente.`),
      questions: [
        'Você distingue entre perguntas genuínas de busca por entendimento e dúvida resistente que rejeita a possibilidade?',
        'Que pergunta honesta você tem sobre como uma promessa de Deus se cumprirá na sua vida?',
        'Como a resposta gentil do anjo a Maria muda sua confiança em trazer perguntas honestas a Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Para Deus Nada Será Impossível',
      text: t(`Senhor, o anjo respondeu à pergunta de Maria com a
        promessa: "para Deus nada será impossível." Não uma resposta
        completa ao "como", mas garantia suficiente sobre teu poder.
        Que essa mesma garantia sustente minha própria fé diante do
        que não compreendo completamente. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta do anjo não explica o mecanismo — apenas
        afirma a capacidade de Deus, sugerindo que fé genuína às vezes
        significa confiar no poder de Deus sem exigir explicação
        completa do processo.`),
      questions: [
        'Você exige entender completamente o "como" antes de confiar em uma promessa de Deus?',
        'O que significa descansar na garantia de que "nada será impossível" para Deus, mesmo sem explicação completa?',
        'Que impossibilidade você enfrenta hoje que precisa dessa mesma confiança?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eis Aqui a Serva do Senhor',
      text: t(`Senhor, encerramos o Advento com a resposta final de
        Maria: "eis aqui a serva do Senhor; cumpra-se em mim segundo
        a tua palavra." Rendição completa, depois de perguntas
        honestas, não antes delas. Que eu entre no Natal com essa
        mesma disposição madura de confiança. Amém.`),
    },
    meditation: {
      prompt: t(`A rendição de Maria vem depois do processo completo
        de pergunta e resposta — não é submissão cega, mas confiança
        madura construída através de diálogo genuíno com Deus.`),
      questions: [
        'Todo este Advento — do redirecionamento de Davi à rendição madura de Maria — o que você quer levar para a celebração do Natal?',
        'Você consegue chegar a essa mesma rendição confiante, depois de processar honestamente suas próprias perguntas?',
        'Como você quer entrar no Natal, carregando o que refletiu neste Advento?',
      ],
    },
  },
];

const adventB: Record<number, DevotionalEntry[]> = {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
};

export default adventB;
