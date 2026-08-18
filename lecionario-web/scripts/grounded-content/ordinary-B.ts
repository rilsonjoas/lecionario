/**
 * Tempo Comum — Ciclo B — conteúdo ancorado no RCL (leituras reais).
 *
 * Mesmo padrão de scripts/grounded-content/ordinary-A.ts: cada semana
 * é um array de 7 DevotionalEntry, índice = date.getDay() (0 = domingo
 * … 6 = sábado). A chave numérica é o Próprio real do RCL (4 a 29) —
 * o Ciclo B nunca precisa do Próprio 3 no intervalo 2015-2045
 * calculado em 2026-08-16 (ver ROADMAP.md 1.2a).
 *
 * Cobertura: Ciclo B completo, Próprios 4-29 (26 semanas, 182 dias),
 * mais `trinityWeekB` pros 6 dias entre a Trindade e o 1º Próprio.
 * Escrito em 2026-08-17, já em cima do RCL corrigido — sem o processo
 * de descoberta e correção que o Ciclo A precisou (ver ROADMAP 1.2a).
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
 * Trindade e o primeiro Próprio real do Tempo Comum (Trindade+1 a
 * Trindade+6, todo ano). Ancorado nas leituras do Domingo da
 * Trindade do Ciclo B: Isaías 6:1-8 · Salmo 29 · Romanos 8:12-17 ·
 * João 3:1-17.
 */
export const trinityWeekB: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Ai de Mim!',
      text: t(`Senhor, Isaías viu-te "assentado sobre um alto e sublime
        trono" e a primeira reação não foi admiração serena, mas
        pavor: "Ai de mim! pois estou perdido; porque sou homem de
        lábios impuros." A visão da tua santidade expõe, antes de
        qualquer coisa, a minha própria condição real. Não me deixes
        fugir dessa exposição — que eu também, diante de ti, reconheça
        com honestidade quem realmente sou, antes de pedir qualquer
        coisa. Amém.`),
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
      title: 'Eis-Me Aqui, Envia-Me',
      text: t(`Senhor, depois que o serafim tocou os lábios de Isaías
        com a brasa purificadora e disse "a tua iniquidade foi
        tirada," ouviste perguntar: "A quem enviarei, e quem irá por
        nós?" E Isaías, já purificado, respondeu sem hesitar: "Eis-me
        aqui, envia-me a mim." A disponibilidade dele veio depois da
        purificação, não antes. Purifica-me também, Senhor, e então
        conta comigo. Amém.`),
    },
    meditation: {
      prompt: t(`A ordem importa: primeiro a purificação ("a tua
        iniquidade foi tirada"), depois o convite à missão. Isaías não
        foi enviado apesar da impureza, mas depois de lidar com ela.`),
      questions: [
        'Você tenta se oferecer para servir a Deus antes de lidar honestamente com o que precisa ser purificado em você?',
        'O que significaria, hoje, responder "eis-me aqui, envia-me" a um chamado que você tem evitado?',
        'Que "brasa purificadora" — processo doloroso mas necessário — você talvez esteja evitando?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Voz do Senhor',
      text: t(`Senhor, o salmo descreve a tua voz como força que
        "quebra os cedros," "faz tremer o deserto," e ainda assim
        termina em ternura: "o Senhor abençoará o seu povo com paz."
        A mesma voz que tem poder para abalar montanhas é a que
        oferece paz aos teus filhos. Que eu não tema o teu poder de
        forma que me afaste de ti, mas que reconheça nesse mesmo poder
        a fonte da paz que preciso. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo une, sem contradição, o poder devastador da
        voz de Deus e a bênção de paz que ele oferece ao seu povo — a
        mesma força que abala a natureza é a que protege quem confia
        nele.`),
      questions: [
        'Você tende a enfatizar mais o poder de Deus ou a sua ternura? Como equilibrar as duas coisas?',
        'Que área da sua vida precisa hoje da força que "quebra cedros", e que área precisa da paz que ele oferece?',
        'Como você reconheceria a "voz do Senhor" falando na sua própria vida esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Aba, Pai',
      text: t(`Senhor, Paulo escreve que "não recebestes o espírito de
        escravidão, para outra vez estardes com temor, mas recebestes
        o espírito de adoção, pelo qual clamamos: Aba, Pai!" Tantas
        vezes me relaciono contigo como servo temeroso, tentando
        merecer aprovação, em vez de filho já adotado. Ensina-me a
        intimidade dessa palavra — tão próxima quanto "papai" — sem
        perder a reverência devida a quem és. Amém.`),
    },
    meditation: {
      prompt: t(`"Aba" era o termo usado por crianças pequenas para se
        dirigir ao pai — íntimo, confiante — Paulo o usa
        deliberadamente para descrever a nova relação possibilitada
        pelo Espírito.`),
      questions: [
        'Sua oração normalmente soa mais como súplica de servo temeroso ou como conversa de filho amado?',
        'O que mudaria se você realmente confiasse que já foi adotado, e não precisa provar nada para pertencer?',
        'Que área da sua vida você trata Deus mais como juiz distante do que como Pai íntimo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Necessário Vos É Nascer de Novo',
      text: t(`Senhor Jesus, quando Nicodemos, mestre respeitado em
        Israel, veio a ti de noite, disseste algo que confundiu toda a
        sua erudição: "necessário vos é nascer de novo." Todo o
        conhecimento religioso dele não substituía essa transformação
        radical, que "o vento sopra onde quer" — fora do controle
        humano. Não me deixes confiar no meu próprio conhecimento
        sobre ti a ponto de esquecer que preciso, eu mesmo, dessa
        mesma renovação. Amém.`),
    },
    meditation: {
      prompt: t(`Nicodemos era "mestre em Israel", especialista
        religioso — e ainda assim Jesus insiste que ele precisa de
        algo que nenhum conhecimento acumulado pode produzir: nascer
        de novo, pelo Espírito.`),
      questions: [
        'Você já confundiu conhecimento religioso acumulado com transformação espiritual real?',
        'O que significa, para você, que o Espírito "sopra onde quer" — fora do seu controle ou compreensão total?',
        'Existe alguma área da sua vida que ainda não foi genuinamente "renascida", apesar do conhecimento que você já tem sobre ela?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Amou o Mundo de Tal Maneira',
      text: t(`Senhor, encerramos esta semana entre a Trindade e o
        Tempo Comum com a frase mais conhecida das Escrituras: "Deus
        amou o mundo de tal maneira que deu o seu Filho unigênito,
        para que todo aquele que nele crê não pereça, mas tenha a vida
        eterna." Que a familiaridade dessas palavras nunca apague o
        seu peso real. Que eu entre no Tempo Comum que se aproxima
        lembrando que tudo começa e termina nesse amor. Amém.`),
    },
    meditation: {
      prompt: t(`Esta é, talvez, a frase mais repetida do cristianismo
        — e por isso mesmo corre o risco de perder o impacto original.
        Ela nasce, no texto, de uma conversa noturna difícil com um
        único homem confuso, não de um discurso público grandioso.`),
      questions: [
        'Você consegue ouvir "Deus amou o mundo de tal maneira" com o mesmo peso de quem ouve pela primeira vez?',
        'Como esta semana de transição — da Trindade ao Tempo Comum — te preparou para os próximos meses do ano litúrgico?',
        'O que você quer levar desta semana sobre a Trindade para os dias comuns que vêm pela frente?',
      ],
    },
  },
];

// Próprio 4 — 1 Samuel 3:1-10, (11-20) · Salmo 139:1-6, 13-18 · 2 Coríntios 4:5-12 · Marcos 2:23-3:6
const proper4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Levanta-te, Toma o Teu Leito',
      text: t(`Senhor Jesus, diante de um paralítico trazido por
        quatro amigos que abriram um buraco no telhado para chegar até
        ti, primeiro perdoaste os pecados dele, e só depois disseste:
        "Levanta-te, toma o teu leito, e vai para tua casa." A cura do
        corpo veio junto com algo mais profundo. Examina o que em mim
        precisa ser perdoado antes mesmo de ser curado, e dá-me amigos
        dispostos a "abrir o telhado" por mim quando eu não conseguir
        chegar até ti sozinho. Amém.`),
    },
    meditation: {
      prompt: t(`O texto destaca a fé dos quatro amigos, não apenas a
        do paralítico — "vendo-lhes a fé" — sugerindo que às vezes
        somos carregados até Jesus pela fé de outros, não apenas pela
        nossa própria.`),
      questions: [
        'Quem já "abriu um telhado" por você, insistindo em te levar até Jesus quando você não conseguia sozinho?',
        'Por quem você poderia fazer o mesmo hoje?',
        'Você busca primeiro o perdão ou primeiro a cura visível? O que essa história ensina sobre a ordem das prioridades de Jesus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Samuel, Samuel',
      text: t(`Senhor, chamaste o menino Samuel três vezes antes que
        ele, orientado por Eli, reconhecesse tua voz. "Ora, Samuel
        ainda não conhecia ao Senhor" — o chamado veio antes do
        reconhecimento pleno de quem chamava. Reconheço que também
        tenho ouvido tua voz sem saber, à vezes, que era a tua. Dá-me
        discernimento — e pessoas sábias ao meu redor, como Eli — para
        reconhecer quando é a ti que estou ouvindo. Amém.`),
    },
    meditation: {
      prompt: t(`Samuel precisou da orientação de Eli, um sacerdote
        imperfeito e já velho, para reconhecer a voz de Deus — o
        chamado divino às vezes chega através de mentores que, mesmo
        falhos, ainda têm sabedoria a oferecer.`),
      questions: [
        'Você já ouviu algo que pode ter sido o chamado de Deus, mas não reconheceu na hora?',
        'Que "Eli" em sua vida — mentor imperfeito, mas sábio — poderia ajudar você a discernir a voz de Deus?',
        'O que ajudaria você a estar mais atento a chamados sutis, não apenas espetaculares?',
      ],
    },
  },
  {
    prayer: {
      title: 'Fala, Senhor, Porque o Teu Servo Ouve',
      text: t(`Senhor, na quarta vez que chamaste, Samuel finalmente
        respondeu como Eli o havia orientado: "Fala, Senhor, porque o
        teu servo ouve." Não "escuta, servo, porque o Senhor fala" —
        mas o contrário, disposição de ouvir antes de qualquer coisa.
        Ensina-me essa mesma postura de escuta genuína, disposto a
        ouvir mesmo quando a mensagem for difícil, como foi para
        Samuel naquela noite. Amém.`),
    },
    meditation: {
      prompt: t(`A mensagem que Samuel recebeu naquela noite era dura
        — um julgamento sobre a casa de Eli — e ainda assim ele
        respondeu com disposição de ouvir antes de saber o conteúdo.`),
      questions: [
        'Você está disposto a ouvir de Deus mesmo quando a mensagem pode ser difícil de receber?',
        'O que significaria orar, hoje, "fala, Senhor, porque o teu servo ouve" — sem condicionar a resposta ao conteúdo?',
        'Existe uma mensagem difícil que você tem evitado ouvir de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tu Me Sondas e Me Conheces',
      text: t(`Senhor, o salmista declara: "tu me sondas, e me
        conheces... tal conhecimento é maravilhoso demais para mim."
        Não há canto da minha vida que escape ao teu conhecimento —
        nem meu sentar, nem meu levantar, nem os pensamentos que
        formulo de longe. Isso poderia me assustar, mas o salmo o
        celebra como maravilha. Ajuda-me a viver a partir dessa mesma
        certeza: totalmente conhecido, e ainda assim amado. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não trata o conhecimento total de Deus sobre
        nós como ameaça, mas como maravilha — "tal conhecimento é
        maravilhoso demais para mim" é celebração, não lamento.`),
      questions: [
        'Você vive o conhecimento de Deus sobre você mais como ameaça ou como consolo?',
        'Existe algo que você tenta esconder de Deus, sabendo racionalmente que é impossível?',
        'O que significaria orar hoje, sem reservas, sobre uma área específica da sua vida que você normalmente evita trazer diante de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tesouro em Vasos de Barro',
      text: t(`Senhor, Paulo escreve que "temos este tesouro em vasos
        de barro, para que a excelência do poder seja de Deus, e não
        da nossa parte." A fragilidade não é vergonha a esconder, mas
        contexto que revela de onde vem o verdadeiro poder. "Em tudo
        somos atribulados, mas não angustiados." Ajuda-me a parar de
        esconder minha fragilidade como se ela contradissesse minha
        fé, e a deixar que ela, ao contrário, revele a ti. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem do "vaso de barro" era comum na Antiguidade
        para descrever algo comum e frágil — Paulo escolhe
        deliberadamente essa imagem humilde para descrever onde Deus
        escolhe guardar seu maior tesouro.`),
      questions: [
        'Você tenta esconder sua fragilidade, achando que ela enfraquece seu testemunho de fé?',
        'Que "vaso de barro" — limitação real sua — poderia, se você parasse de escondê-la, revelar mais claramente o poder de Deus?',
        'Como Paulo descreve estar "atribulado, mas não angustiado" — você distingue essas duas coisas na sua própria vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Sábado Foi Feito Para o Homem',
      text: t(`Senhor Jesus, quando os fariseus criticaram teus
        discípulos por colherem espigas no sábado, e depois te
        vigiaram para ver se curarias no sábado, respondeste com uma
        prioridade clara: a lei existe para servir as pessoas, não o
        contrário. Livra-me de qualquer religiosidade que valorize a
        regra mais do que a pessoa diante de mim, especialmente quando
        ela está precisando de cuidado urgente. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não abole o sábado — ele o reordena, colocando
        o cuidado humano acima da observância rígida da regra quando
        as duas entram em conflito real.`),
      questions: [
        'Você já aplicou uma "regra" — religiosa ou não — de forma tão rígida que ela feriu, em vez de servir, alguém que precisava de ajuda?',
        'Como você distingue entre observância genuína e legalismo que esquece o propósito original da regra?',
        'Que necessidade urgente diante de você hoje merece mais atenção do que a "regra" que talvez você esteja usando como desculpa para não agir?',
      ],
    },
  },
  {
    prayer: {
      title: 'Perdoado e Enviado',
      text: t(`Senhor, esta semana trouxe o paralítico perdoado e
        curado, o chamado que Samuel só reconheceu depois de orientado
        por outro, o conhecimento total que tu tens de mim, e o
        tesouro guardado em vasos frágeis. Termino pedindo a mesma
        disposição de Samuel — "fala, Senhor, porque o teu servo ouve"
        — confiando que, como o paralítico, sou primeiro perdoado, e
        só depois levantado. Amém.`),
    },
    meditation: {
      prompt: t(`Do paralítico perdoado ao chamado de Samuel, a semana
        revelou o mesmo padrão: Deus age primeiro através de graça
        recebida, não de mérito demonstrado.`),
      questions: [
        'Qual dos temas desta semana — o perdão antes da cura, o chamado de Samuel, ou o tesouro em vasos de barro — mais tocou você?',
        'O que você quer levar desta semana sobre ouvir a voz de Deus com mais atenção?',
        'Como você quer entrar na próxima semana, sabendo-se plenamente conhecido e ainda assim amado?',
      ],
    },
  },
];

// Próprio 5 — 1 Samuel 8:4-11, (12-15), 16-20 · Salmo 138 · 2 Coríntios 4:13-5:1 · Marcos 3:20-35
const proper5: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Quem É Minha Mãe e Meus Irmãos?',
      text: t(`Senhor Jesus, quando tua família veio te buscar,
        preocupada, olhaste para os que estavam sentados ao teu redor e
        disseste: "Eis aqui minha mãe e meus irmãos! Pois aquele que
        fizer a vontade de Deus, esse é meu irmão." Redefiniste
        família não pela biologia, mas pela obediência compartilhada.
        Ajuda-me a valorizar essa família espiritual — a comunidade de
        fé que também busca fazer tua vontade — com a mesma seriedade
        que valorizo laços de sangue. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não rejeita sua família biológica — ele amplia
        a definição de família para incluir todos os que compartilham
        obediência a Deus, um convite radical à comunidade de fé.`),
      questions: [
        'Você valoriza sua "família espiritual" — comunidade de fé — com a mesma seriedade que valoriza laços de sangue?',
        'O que significa, para você, ser considerado "irmão" ou "irmã" de Jesus por fazer a vontade de Deus?',
        'Quem, na sua comunidade de fé, você poderia tratar mais como família?',
      ],
    },
  },
  {
    prayer: {
      title: 'Dá-nos um Rei',
      text: t(`Senhor, os anciãos de Israel pediram a Samuel: "Constitui-nos,
        pois, agora um rei para nos julgar, como o têm todas as
        nações." E tu disseste a Samuel: "não é a ti que têm
        rejeitado, porém a mim." O desejo de ser "como todo mundo" às
        vezes esconde uma rejeição mais profunda da tua liderança
        direta sobre mim. Examina onde busco autoridades humanas para
        substituir a confiança que deveria depositar em ti. Amém.`),
    },
    meditation: {
      prompt: t(`O pedido de Israel não era, em si, absurdo — outras
        nações realmente tinham reis — mas Deus o interpreta como
        sintoma de algo mais profundo: preferir estruturas visíveis a
        confiar na sua liderança direta.`),
      questions: [
        'Que "rei" — estrutura, autoridade humana, sistema — você tem buscado para substituir a confiança direta em Deus?',
        'Você já desejou "ser como todo mundo" de um jeito que, olhando bem, era uma forma de rejeitar o caminho específico que Deus tinha para você?',
        'Como você distingue entre buscar sabedoria/estrutura legítima e rejeitar a liderança direta de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Modo de Agir do Rei',
      text: t(`Senhor, através de Samuel avisaste com detalhes o custo
        real de ter um rei humano — filhos recrutados, terras
        tomadas, o povo reduzido a servos. "Mas o povo não quis ouvir
        a voz de Samuel." Reconheço que às vezes também escolho o que
        quero, mesmo depois de ser avisado honestamente do custo.
        Ensina-me a ouvir os alertas que envias, mesmo quando já
        decidi o que quero fazer. Amém.`),
    },
    meditation: {
      prompt: t(`Deus não impede a escolha do povo — permite que
        experimentem as consequências que ele mesmo havia detalhado
        de antemão, um padrão que se repete em muitas decisões
        humanas.`),
      questions: [
        'Existe uma decisão em que você foi honestamente avisado do custo e escolheu seguir em frente mesmo assim?',
        'Como você reage quando Deus, através de outros ou da sua própria consciência, avisa sobre o custo de uma escolha que você já decidiu fazer?',
        'O que ajudaria você a ouvir esses alertas antes, não apenas depois de já ter decidido?',
      ],
    },
  },
  {
    prayer: {
      title: 'Alentaste-me, Fortalecendo a Minha Alma',
      text: t(`Senhor, o salmista testemunha: "No dia em que eu clamei,
        atendeste-me; alentaste-me, fortalecendo a minha alma." E
        acrescenta algo notável: "Ainda que o Senhor é excelso,
        contudo atenta para o humilde." A tua grandeza não te afasta
        de mim — te aproxima de quem se humilha diante de ti. Que eu
        clame com essa mesma confiança, sabendo que serei atendido, não
        ignorado por parecer pequeno demais. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo une, sem tensão, a excelsitude de Deus e sua
        atenção ao humilde — a grandeza divina não é medida por
        distância dos pequenos, mas pela disposição de se aproximar
        deles.`),
      questions: [
        'Você já se sentiu "pequeno demais" para que Deus prestasse atenção genuína à sua situação?',
        'O que significa para você que "o Senhor é excelso" e ainda assim "atenta para o humilde" — sem contradição?',
        'Que clamor você precisa trazer hoje, confiante de que será atendido e não ignorado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Desfalecemos',
      text: t(`Senhor, Paulo escreve, mesmo em meio a dificuldades
        reais: "não desfalecemos... ainda que o nosso homem exterior
        se corrompa, o interior, contudo, se renova de dia em dia." A
        deterioração física ou circunstancial não precisa corresponder
        a deterioração espiritual. Renova, hoje, o meu homem interior,
        mesmo que as circunstâncias externas pareçam se desgastar.
        Amém.`),
    },
    meditation: {
      prompt: t(`Paulo distingue claramente entre o desgaste externo,
        real e inevitável, e a renovação interna, que ele descreve como
        processo ativo e contínuo — "de dia em dia" — não dependente
        das circunstâncias externas.`),
      questions: [
        'Você sente que seu "homem interior" está se renovando, mesmo que as circunstâncias externas estejam desgastantes?',
        'O que ajudaria você a cultivar essa renovação interna diária, independentemente do que acontece fora?',
        'Que peso momentâneo você está carregando que, à luz da eternidade, Paulo chamaria de "leve"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Reino Dividido Contra Si Mesmo',
      text: t(`Senhor Jesus, diante da acusação de que expulsavas
        demônios pelo poder do próprio Satanás, respondeste com
        lógica simples: "se um reino se dividir contra si mesmo, tal
        reino não pode subsistir." A verdade tem coerência interna; a
        mentira, cedo ou tarde, se contradiz. Ajuda-me a viver com
        essa mesma coerência — que minhas ações e palavras não se
        dividam contra si mesmas. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus responde a uma acusação absurda não com raiva,
        mas com lógica clara — a verdade não precisa de defesa
        emocional exagerada quando pode simplesmente expor a
        incoerência da acusação.`),
      questions: [
        'Existe alguma área da sua vida — pública ou privada — onde você percebe uma divisão interna, incoerência entre o que diz e o que faz?',
        'Como Jesus responde a acusações injustas nesta passagem — o que isso ensina sobre como você pode responder às suas próprias?',
        'O que significaria, hoje, buscar mais coerência entre suas palavras e suas ações?',
      ],
    },
  },
  {
    prayer: {
      title: 'Família de Deus, Alma Fortalecida',
      text: t(`Senhor, esta semana trouxe a família redefinida por
        obediência, o pedido de um rei que escondia rejeição mais
        profunda, e a alma fortalecida pelo clamor sincero. Termino
        pedindo: que eu pertença, com seriedade, à tua família
        espiritual, e que minha alma seja renovada de dia em dia,
        mesmo quando o exterior se desgasta. Amém.`),
    },
    meditation: {
      prompt: t(`Da família redefinida por Jesus ao rei pedido por
        Israel, a semana revelou o mesmo tema: onde realmente
        colocamos nossa confiança e pertencimento — em Deus ou em
        substitutos visíveis.`),
      questions: [
        'Qual dos temas desta semana — a família espiritual, o pedido de um rei, ou a renovação interior — mais tocou você?',
        'Que "rei" substituto você quer soltar, confiando mais diretamente em Deus?',
        'Como você quer viver a próxima semana como parte da família de Deus?',
      ],
    },
  },
];

// Próprio 6 — 1 Samuel 15:34-16:13 · Salmo 20 · 2 Coríntios 5:6-17 · Marcos 4:26-34
const proper6: DevotionalEntry[] = [
  {
    prayer: {
      title: 'O Grão de Mostarda',
      text: t(`Senhor Jesus, comparaste o Reino de Deus a um grão de
        mostarda — "a menor de todas as sementes" que, uma vez
        semeada, "cresce e faz-se a maior de todas as hortaliças."
        Não me deixes desprezar os pequenos começos, os passos
        aparentemente insignificantes de fé e obediência, só porque
        não parecem grandes o suficiente ainda. Ensina-me a confiar no
        crescimento que só tu podes dar. Amém.`),
    },
    meditation: {
      prompt: t(`A parábola não celebra a semente por seu tamanho
        inicial, mas pelo que ela se torna — o valor está no potencial
        de crescimento, não na aparência do começo.`),
      questions: [
        'Que "grão de mostarda" — início pequeno e despretensioso — você tem desprezado por não parecer significativo?',
        'Você tende a medir o valor de algo pelo tamanho inicial, ou consegue confiar no crescimento que ainda não vê?',
        'Que pequena semente de fé ou obediência você poderia plantar hoje, confiando no crescimento futuro?',
      ],
    },
  },
  {
    prayer: {
      title: 'Arrependo-me de Haver Posto a Saul',
      text: t(`Senhor, depois da desobediência de Saul, disseste:
        "Arrependo-me de haver posto a Saul como rei." Não é
        mudança caprichosa da tua parte, mas resposta séria à
        infidelidade repetida de quem foi escolhido para liderar.
        Examina minha própria fidelidade nas responsabilidades que me
        confiaste — que eu não tome a tua paciência como garantia de
        que a desobediência não tem consequência. Amém.`),
    },
    meditation: {
      prompt: t(`O "arrependimento" de Deus aqui não é sobre um erro
        seu, mas sobre a resposta divina a uma escolha humana que
        deu errado — a linguagem antropomórfica comunica seriedade
        real diante da infidelidade.`),
      questions: [
        'Existe alguma responsabilidade que Deus confiou a você onde a fidelidade tem sido inconsistente?',
        'Como você reage quando percebe que suas próprias escolhas trouxeram consequências sérias?',
        'O que ajudaria você a levar mais a sério a confiança que Deus deposita em você?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Senhor Olha o Coração',
      text: t(`Senhor, quando Samuel via os filhos de Jessé, um por
        um, esperando encontrar o rei entre os mais impressionantes,
        tu o corrigiste: "o Senhor não vê como vê o homem, pois o
        homem vê o que está diante dos olhos, porém o Senhor olha
        para o coração." Davi, o mais novo, esquecido nos campos com
        as ovelhas, foi o escolhido. Ensina-me a julgar como tu julgas
        — pelo coração, não pela aparência externa. Amém.`),
    },
    meditation: {
      prompt: t(`Até Samuel, homem de Deus experiente, precisou ser
        corrigido nessa avaliação — o instinto humano de julgar pela
        aparência é tão forte que até profetas o carregam sem
        perceber.`),
      questions: [
        'Você já subestimou alguém — ou foi subestimado — por não ter a aparência "certa" de liderança ou capacidade?',
        'O que significaria, na prática, avaliar pessoas pelo coração, não pela aparência externa?',
        'Davi estava "esquecido nos campos" quando foi escolhido — que "campo esquecido" da sua própria vida pode estar mais próximo do chamado de Deus do que você imagina?',
      ],
    },
  },
  {
    prayer: {
      title: 'Uns Confiam em Carros',
      text: t(`Senhor, o salmo declara: "Uns confiam em carros e
        outros em cavalos, mas nós faremos menção do nome do Senhor
        nosso Deus." Reconheço meus próprios "carros e cavalos" —
        recursos, planos, garantias humanas em que deposito confiança
        antes de recorrer a ti. Que eu não os rejeite como inúteis,
        mas que reordene onde realmente coloco minha confiança final.
        Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não condena ter recursos (carros, cavalos
        eram reais e úteis) — condena onde se coloca a confiança
        final, especialmente em tempos de angústia.`),
      questions: [
        'Quais são os "carros e cavalos" da sua vida — recursos legítimos que, no entanto, você trata como fonte final de segurança?',
        'Como você distingue entre usar recursos sabiamente e confiar neles em vez de em Deus?',
        'O que significaria, hoje, fazer "menção do nome do Senhor" antes de recorrer aos seus próprios recursos?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nova Criatura',
      text: t(`Senhor, Paulo declara: "se alguém está em Cristo, nova
        criatura é; as coisas velhas já passaram; eis que tudo se fez
        novo." Não é melhoria gradual apenas, mas identidade
        radicalmente nova. "O amor de Cristo nos constrange" — não
        obrigação externa, mas amor que move de dentro. Ajuda-me a
        viver, de fato, como essa nova criatura, não presa às
        "coisas velhas" que já deveriam ter passado. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não descreve um processo lento de reforma
        gradual, mas uma transformação de identidade — "nova
        criatura" — que já aconteceu em Cristo, mesmo que a
        experiência plena ainda esteja em desenvolvimento.`),
      questions: [
        'Que "coisa velha" você ainda carrega, mesmo sabendo que, em Cristo, já deveria ter passado?',
        'O que significa, na prática, ser motivado pelo "amor de Cristo que constrange", em vez de obrigação religiosa externa?',
        'Como você viveria diferente hoje se realmente se visse como "nova criatura", não como versão levemente melhorada da antiga?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Terra Por Si Mesma Produz Fruto',
      text: t(`Senhor Jesus, disseste que o Reino de Deus é "como se um
        homem lançasse semente à terra, e dormisse... a terra por si
        mesma produz fruto." O crescimento acontece mesmo quando o
        agricultor não entende exatamente como. Ajuda-me a confiar
        nesse mesmo mistério — que muito do que semeio em fé continua
        crescendo mesmo quando não vejo, não entendo, ou não estou
        vigiando de perto. Amém.`),
    },
    meditation: {
      prompt: t(`A parábola destaca a passividade relativa do
        agricultor — "dormisse e se levantasse... sem ele saber como"
        — o crescimento não depende do controle constante, mas de um
        processo que a própria terra sustenta.`),
      questions: [
        'Você tende a querer controlar de perto tudo que "semeia" — relacionamentos, projetos, orações — ou consegue confiar no crescimento que acontece sem sua supervisão constante?',
        'Que semente você plantou há tempos e ainda não viu o fruto completo, mas pode confiar que está crescendo?',
        'O que significaria, hoje, "dormir e levantar" com mais confiança sobre algo que você já entregou a Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Coração Novo, Semente Crescendo',
      text: t(`Senhor, esta semana trouxe o pequeno grão de mostarda, o
        coração que só tu vês de verdade, os "carros e cavalos" em que
        confio erradamente, e a certeza de ser nova criatura em
        Cristo. Termino pedindo que eu confie no crescimento que só tu
        podes dar — nas pequenas sementes, no coração escolhido por
        ti, na transformação já operada em mim. Amém.`),
    },
    meditation: {
      prompt: t(`Do grão de mostarda à nova criatura, a semana revelou
        o mesmo padrão: Deus trabalha através de começos pequenos e
        escolhas inesperadas, com resultados que excedem toda
        expectativa inicial.`),
      questions: [
        'Qual dos temas desta semana — o grão de mostarda, o coração escolhido por Deus, ou a nova criatura — mais representa onde você está agora?',
        'Que "carro e cavalo" você quer soltar, confiando mais no nome do Senhor?',
        'Como você quer entrar na próxima semana, confiando no crescimento que Deus sustenta mesmo sem seu controle total?',
      ],
    },
  },
];

// Próprio 7 — 1 Samuel 17:(1a, 4-11, 19-23), 32-49 · Salmo 9:9-20 · 2 Coríntios 6:1-13 · Marcos 4:35-41
const proper7: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Quem É Este?',
      text: t(`Senhor Jesus, durante a tempestade que ameaçava afundar
        o barco, dormias na popa — e quando te despertaram, repreendeste
        o vento e o mar, que imediatamente se aquietaram. Os discípulos,
        mais espantados com o milagre do que com a tempestade,
        perguntaram: "Quem, porventura, é este, que até o vento e o mar
        lhe obedecem?" Que essa mesma pergunta me leve, hoje, a um
        assombro renovado diante de quem realmente és. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus dormia durante a tempestade não por indiferença,
        mas por confiança total — sua repreensão ao vento e ao mar veio
        de autoridade calma, não de pânico compartilhado.`),
      questions: [
        'Você já viveu uma "tempestade" em que Jesus parecia estar "dormindo", ausente, enquanto você entrava em pânico?',
        'O que significaria enfrentar uma dificuldade atual com a mesma calma confiante de Jesus, em vez de pânico?',
        'A pergunta dos discípulos — "quem é este?" — ainda produz assombro genuíno em você, ou já se tornou resposta automática?',
      ],
    },
  },
  {
    prayer: {
      title: 'Um Campeão Chamado Golias',
      text: t(`Senhor, Golias desafiava as fileiras de Israel dia após
        dia, e "todo o Israel" se desalentou e temeu diante dele.
        Reconheço meus próprios "Golias" — problemas que parecem
        gigantescos demais, que fazem meu coração desanimar antes
        mesmo de tentar enfrentá-los. Ajuda-me a não medir o desafio
        apenas pelo seu tamanho, mas também pelo tamanho de quem está
        comigo. Amém.`),
    },
    meditation: {
      prompt: t(`O texto enfatiza o tamanho e o equipamento
        impressionante de Golias antes de qualquer coisa — a narrativa
        quer que você sinta o mesmo desânimo que Israel sentiu, antes
        de introduzir Davi.`),
      questions: [
        'Que "Golias" você enfrenta hoje que tem paralisado sua coragem, como paralisou todo o exército de Israel?',
        'Você tende a medir desafios apenas pelo tamanho deles, esquecendo de medir também o tamanho de Deus?',
        'O que ajudaria você a enfrentar esse desafio com coragem renovada?',
      ],
    },
  },
  {
    prayer: {
      title: 'Davi Se Ofereceu',
      text: t(`Senhor, enquanto exércitos experientes tremiam, um
        jovem pastor, ainda cuidando de ovelhas, se ofereceu para
        enfrentar o gigante — não por arrogância, mas por já ter
        experimentado tua fidelidade protegendo o rebanho de leões e
        ursos. A coragem de Davi nasceu de história real com você, não
        de confiança vazia em si mesmo. Ajuda-me a lembrar das minhas
        próprias histórias de fidelidade tua antes de enfrentar o
        próximo desafio grande. Amém.`),
    },
    meditation: {
      prompt: t(`Davi não inventou coragem do nada — ele a construiu
        através de experiências menores e privadas (o leão, o urso)
        que ninguém mais testemunhou, mas que fortaleceram sua
        confiança para o desafio público.`),
      questions: [
        'Que "leão e urso" — vitórias privadas, não testemunhadas por ninguém — você já enfrentou com a ajuda de Deus, e que poderiam fortalecer sua fé agora?',
        'Você valoriza suas próprias histórias pequenas de fidelidade de Deus, ou só reconhece os grandes milagres visíveis?',
        'Como lembrar dessas histórias privadas poderia mudar sua coragem diante do desafio atual?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Abandonas Aqueles Que Te Buscam',
      text: t(`Senhor, o salmista declara: "tu, Senhor, não abandonas
        aqueles que te buscam." E acrescenta: "o necessitado não será
        esquecido para sempre, nem a esperança dos pobres será
        frustrada perpetuamente." Em meio a lutas que parecem
        arrastadas, quero me agarrar a essa promessa — não de alívio
        imediato garantido, mas de que não serei esquecido enquanto
        busco a ti. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não promete ausência de opressão — reconhece
        "aflitos" e "necessitados" reais — mas insiste que Deus não os
        abandona nem esquece, mesmo quando a espera é longa.`),
      questions: [
        'Você já sentiu que sua esperança estava sendo "frustrada perpetuamente"? Como este salmo responde a esse sentimento?',
        'O que significa, para você, "buscar" a Deus de forma ativa, não apenas esperar passivamente?',
        'Que necessidade você pode trazer hoje, confiando que não será esquecida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eis Aqui Agora o Dia da Salvação',
      text: t(`Senhor, Paulo exorta: "não recebais a graça de Deus em
        vão... eis aqui agora o tempo aceitável, eis aqui agora o dia
        da salvação." Há urgência genuína nesse convite — não amanhã,
        não quando for mais conveniente, mas hoje. Examina se tenho
        adiado alguma resposta à tua graça, tratando-a como algo
        disponível para sempre, sem urgência real. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo cita profecia antiga para enfatizar que o
        "tempo aceitável" já chegou — não é promessa futura, mas
        realidade presente que exige resposta imediata, não adiamento
        indefinido.`),
      questions: [
        'Que resposta à graça de Deus você tem adiado, tratando-a como se estivesse sempre disponível "para depois"?',
        'O que significaria, hoje, tratar este dia especificamente como "o dia da salvação" — não genérico, mas específico e urgente?',
        'Como você "recebe a graça de Deus em vão" — sem deixar que ela produza mudança real?',
      ],
    },
  },
  {
    prayer: {
      title: 'Por Que Sois Assim Tímidos?',
      text: t(`Senhor Jesus, depois de acalmar a tempestade, perguntaste
        aos discípulos: "Por que sois assim tímidos? Ainda não tendes
        fé?" A pergunta não foi retórica de condenação, mas convite a
        crescer. Reconheço meus próprios momentos de medo diante de
        circunstâncias que, olhando para trás, mostravam que estavas
        presente o tempo todo. Fortalece minha fé para as próximas
        tempestades. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta de Jesus vem depois de já ter acalmado a
        tempestade — não é repreensão distante, mas conversa próxima
        com quem acabou de testemunhar seu poder, convidando à fé
        maior daqui em diante.`),
      questions: [
        'Olhando para trás, em que "tempestade" passada você percebe agora que Jesus estava presente, mesmo parecendo ausente?',
        'O que ajudaria sua fé a crescer diante da próxima dificuldade, em vez de recair no mesmo medo de sempre?',
        'Como você distingue entre precaução sensata e "timidez" de fé que Jesus questiona aqui?',
      ],
    },
  },
  {
    prayer: {
      title: 'Coragem Diante do Gigante',
      text: t(`Senhor, esta semana trouxe uma tempestade acalmada, um
        gigante enfrentado por um pastor jovem, e a certeza de que não
        abandonas quem te busca. Termino pedindo a mesma coragem de
        Davi diante do próximo "Golias" que eu enfrentar, e a mesma
        confiança dos discípulos depois da tempestade — sabendo,
        finalmente, quem realmente estás comigo. Amém.`),
    },
    meditation: {
      prompt: t(`Da tempestade acalmada ao gigante derrotado, a semana
        revelou o mesmo padrão: o que parece impossível ou aterrorizante
        se dissolve diante da presença e do poder de Deus.`),
      questions: [
        'Qual dos temas desta semana — a tempestade acalmada, a coragem de Davi, ou a urgência da graça — mais te desafiou?',
        'Que "Golias" você quer enfrentar com mais coragem na semana que vem?',
        'Como você quer viver, nos próximos dias, com a fé fortalecida por esta semana?',
      ],
    },
  },
];

// Próprio 8 — 2 Samuel 1:1, 17-27 · Salmo 130 · 2 Coríntios 8:7-15 · Marcos 5:21-43
const proper8: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Tua Fé Te Salvou',
      text: t(`Senhor Jesus, uma mulher que sofria hemorragia havia
        doze anos tocou a orla do teu manto por trás, na multidão, e
        foi imediatamente curada. Quando a chamaste à frente, disseste:
        "Filha, a tua fé te salvou." Ela não precisou de fé perfeita
        ou articulada — apenas fé que se moveu em tua direção, mesmo
        escondida. Ensina-me essa mesma fé que age, mesmo tímida,
        mesmo escondida na multidão. Amém.`),
    },
    meditation: {
      prompt: t(`A mulher agiu por trás, sem ser vista, convencida de
        que o mínimo contato bastaria — Jesus não exigiu fé
        espetacular ou pública, apenas reconheceu a que já havia
        acontecido em silêncio.`),
      questions: [
        'Que "hemorragia" de longa data — física, emocional ou espiritual — você tem carregado em silêncio?',
        'A fé da mulher foi discreta, quase escondida. Isso te ajuda a entender que a fé não precisa ser pública para ser real?',
        'O que significaria, hoje, "tocar a orla do manto" de Jesus na sua situação atual?',
      ],
    },
  },
  {
    prayer: {
      title: 'Como Caíram os Valorosos',
      text: t(`Senhor, ao saber da morte de Saul e Jônatas — inclusive
        Saul, que o perseguira por anos — Davi não celebrou, mas
        lamentou com sinceridade: "Como caíram os valorosos!" A
        capacidade de lamentar até quem nos feriu revela um coração
        maior do que a própria dor sofrida. Ensina-me essa mesma
        generosidade de luto, capaz de honrar o que havia de bom
        mesmo em relações difíceis. Amém.`),
    },
    meditation: {
      prompt: t(`Davi lamenta Saul, seu perseguidor, com a mesma
        sinceridade com que lamenta Jônatas, seu amigo mais próximo —
        um luto que não se limita a quem nos tratou bem.`),
      questions: [
        'Você conseguiria lamentar sinceramente a perda de alguém que te feriu, como Davi fez por Saul?',
        'O que ajudaria você a reconhecer o que havia de bom numa relação difícil, sem negar a dor que ela também causou?',
        'Existe algum luto — por uma pessoa ou por uma relação — que você ainda não permitiu a si mesmo sentir plenamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Angustiado Estou por Ti',
      text: t(`Senhor, Davi chorou por Jônatas com palavras que ainda
        hoje comovem: "Angustiado estou por ti, meu irmão Jônatas;
        muito querido me eras!" A amizade profunda que compartilharam
        merecia esse luto público e sincero. Obrigado pelas amizades
        que já me deste, que valem lamento verdadeiro quando se vão.
        Ensina-me a valorizá-las enquanto ainda as tenho. Amém.`),
    },
    meditation: {
      prompt: t(`O lamento de Davi por Jônatas é um dos poucos
        registros bíblicos de amizade masculina profunda expressa
        abertamente — a Escritura não tem vergonha de descrever esse
        tipo de amor e perda.`),
      questions: [
        'Você tem amizades profundas o suficiente para merecer um lamento como o de Davi, se um dia se perderem?',
        'O que impede você de expressar, hoje, a gratidão que sente por uma amizade importante, antes de precisar lamentá-la?',
        'Como você pode investir, esta semana, numa amizade que você valoriza mas talvez tenha negligenciado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Das Profundezas Clamo a Ti',
      text: t(`Senhor, o salmista clama "das profundezas" — não do
        conforto, mas do fundo real da angústia. E ainda assim declara:
        "contigo está o perdão... espero na sua palavra." A honestidade
        sobre a profundidade da dor não impede a esperança — na
        verdade, é o que a torna genuína. Que eu também clame das
        minhas próprias profundezas, sem fingir estar bem. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não pede que a dor seja escondida antes de
        orar — "das profundezas" é o próprio ponto de partida da
        oração, não um obstáculo a superar antes de orar.`),
      questions: [
        'Você costuma esperar "sair das profundezas" antes de orar, ou consegue clamar de dentro delas, como o salmista?',
        'O que significa para você que "com o Senhor há benignidade, e com ele há copiosa redenção" mesmo no meio da angústia?',
        'Que profundidade real você precisa trazer hoje diante de Deus, sem fingir que está tudo bem?',
      ],
    },
  },
  {
    prayer: {
      title: 'Que, Sendo Rico, Se Fez Pobre',
      text: t(`Senhor, Paulo descreve a generosidade que deve
        caracterizar quem segue a Cristo, "que, sendo rico, por amor de
        vós se fez pobre, para que pela sua pobreza fôsseis
        enriquecidos." A tua generosidade não foi calculada para o
        mínimo necessário — foi total, radical. Examina minha própria
        generosidade: reflete, ainda que modestamente, essa mesma
        disposição de abrir mão por amor de outros? Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não pede generosidade forçada — "não digo isto
        como quem manda" — mas aponta para o exemplo de Cristo como
        motivação que supera qualquer obrigação imposta de fora.`),
      questions: [
        'Sua generosidade é motivada mais por obrigação externa ou pelo exemplo genuíno de Cristo que "se fez pobre" por você?',
        'O que significaria, na prática, uma generosidade que reflete — mesmo modestamente — a disposição radical de Cristo?',
        'Existe alguém em sua vida que precisaria hoje de generosidade real, não apenas simbólica, da sua parte?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Tua Filha Já Morreu',
      text: t(`Senhor Jesus, enquanto ainda falavas com a mulher curada,
        chegaram notícias de que a filha de Jairo já havia morrido —
        "por que ainda incomodas o Mestre?" Mas disseste a Jairo: "Não
        temas, crê somente." A morte não foi a última palavra. Ensina-me
        essa mesma fé que persiste mesmo depois que as circunstâncias
        parecem ter fechado toda possibilidade. Amém.`),
    },
    meditation: {
      prompt: t(`A interrupção — a cura da mulher atrasando a chegada
        até a filha de Jairo — parece, à primeira vista, ter custado a
        vida da menina; mas Jesus mostra que nenhum atraso está fora
        do seu controle.`),
      questions: [
        'Você já sentiu que uma "interrupção" custou algo precioso, quando na verdade Deus ainda estava no controle da situação?',
        'O que significaria hoje ouvir Jesus dizer, sobre uma situação que parece definitivamente perdida: "não temas, crê somente"?',
        'Como você distingue entre esperança genuína e negação da realidade diante de uma situação difícil?',
      ],
    },
  },
  {
    prayer: {
      title: 'Fé que Toca, Luto que Honra',
      text: t(`Senhor, esta semana trouxe a fé discreta de uma mulher
        curada, o lamento generoso de Davi por um inimigo, e a
        generosidade radical que Cristo modelou. Termino pedindo: que
        eu tenha a mesma fé que se move em direção a ti, mesmo
        escondida, e a mesma generosidade de coração que honra até
        quem me feriu. Amém.`),
    },
    meditation: {
      prompt: t(`Da fé silenciosa da mulher ao lamento generoso de
        Davi, a semana revelou corações que agem com integridade
        mesmo em circunstâncias difíceis — sem esperar reconhecimento
        ou reciprocidade.`),
      questions: [
        'Qual dos temas desta semana — a fé discreta, o luto generoso, ou a generosidade radical — mais tocou você?',
        'Que "hemorragia" ou dor de longa data você quer trazer, com fé, diante de Deus esta semana?',
        'Como você quer praticar generosidade concreta nos próximos dias?',
      ],
    },
  },
];

// Próprio 9 — 2 Samuel 5:1-5, 9-10 · Salmo 48 · 2 Coríntios 12:2-10 · Marcos 6:1-13
const proper9: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Um Profeta Não Fica Sem Honra',
      text: t(`Senhor Jesus, voltaste à tua própria terra, e os que te
        conheciam desde criança se escandalizaram: "Não é este o
        carpinteiro?" A familiaridade os impediu de reconhecer quem
        realmente eras. Disseste: "Um profeta não fica sem honra senão
        na sua terra." Examina se a familiaridade com pessoas que
        conheço bem me impede de reconhecer o que Deus pode estar
        fazendo através delas. Amém.`),
    },
    meditation: {
      prompt: t(`O texto observa que Jesus "não podia fazer ali nenhum
        milagre" por causa da incredulidade — a familiaridade
        excessiva, paradoxalmente, pode fechar os olhos para o
        extraordinário mais do que a distância.`),
      questions: [
        'Você já descartou a possibilidade de Deus agir através de alguém que conhece bem demais, por familiaridade?',
        'Existe algum "profeta" próximo de você — familiar, amigo — cuja voz você tem subestimado por conhecê-lo bem?',
        'O que ajudaria você a ver com novos olhos alguém que já considera "conhecido demais"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Todas as Tribos Vieram a Davi',
      text: t(`Senhor, depois de anos de espera, perseguição e conflito,
        "todas as tribos de Israel vieram a Davi em Hebrom" e o
        ungiram rei sobre todo o povo. O que parecia impossível
        durante os anos de fuga finalmente se cumpriu. Ensina-me a
        paciência de Davi — que esperou o teu tempo sem tomar o trono
        pela força, mesmo tendo oportunidades de fazê-lo. Amém.`),
    },
    meditation: {
      prompt: t(`Davi já havia sido ungido rei por Samuel muito antes
        deste momento — o cumprimento levou anos, incluindo tempo como
        fugitivo perseguido pelo próprio Saul, antes de se concretizar
        publicamente.`),
      questions: [
        'Existe uma promessa de Deus na sua vida que já foi "ungida" espiritualmente, mas ainda não se cumpriu publicamente?',
        'Você tem esperado o tempo de Deus, ou tentado forçar o cumprimento de uma promessa antes da hora?',
        'O que a longa espera de Davi ensina sobre paciência diante de promessas ainda não realizadas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Este Deus É o Nosso Deus',
      text: t(`Senhor, o salmo celebra: "Como é o teu nome, ó Deus,
        assim é o teu louvor até os confins da terra... Porque este
        Deus é o nosso Deus para todo o sempre; ele será nosso guia
        até a morte." Não é confiança temporária, mas compromisso
        eterno. Que eu declare essa mesma certeza sobre a minha
        própria vida — não apenas para hoje, mas para todo o
        caminho que ainda tenho pela frente. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo termina com uma declaração de permanência —
        "para todo o sempre... até a morte" — a confiança em Deus não é
        apresentada como sentimento passageiro, mas compromisso para
        toda a jornada.`),
      questions: [
        'Sua confiança em Deus é mais situacional (depende do momento) ou permanente (independente das circunstâncias)?',
        'O que significaria declarar hoje, com a mesma convicção do salmista, "este Deus é o meu Deus para todo o sempre"?',
        'Como você quer que essa confiança guie decisões específicas da sua vida daqui para frente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Arrebatado ao Paraíso',
      text: t(`Senhor, Paulo descreve, com relutância e humildade, uma
        experiência espiritual extraordinária — "arrebatado ao
        paraíso" — mas recusa-se a se gloriar nela, preferindo
        "gloriar-me nas minhas fraquezas." Ensina-me essa mesma
        humildade diante de experiências espirituais marcantes: que
        elas não se tornem motivo de orgulho, mas ocasião de gratidão
        discreta. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo fala de si mesmo na terceira pessoa ("conheço um
        homem em Cristo") ao descrever essa experiência — um
        distanciamento deliberado que evita transformar a experiência
        em capital espiritual pessoal.`),
      questions: [
        'Você já teve uma experiência espiritual marcante que se tornou, sem perceber, motivo de orgulho espiritual?',
        'Como Paulo modela humildade diante de experiências extraordinárias — o que isso ensina sobre como compartilhar as suas próprias?',
        'O que significaria, para você, "gloriar-se nas fraquezas" em vez de nas experiências impressionantes?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Minha Graça Te Basta',
      text: t(`Senhor, três vezes Paulo rogou que o "espinho na carne"
        fosse removido, e a resposta que recebeu não foi remoção, mas
        suficiência: "A minha graça te basta, porque o meu poder se
        aperfeiçoa na fraqueza." Nem toda oração por alívio é
        respondida com remoção — às vezes é respondida com graça
        suficiente para continuar carregando. Ensina-me a aceitar essa
        resposta quando ela vier. Amém.`),
    },
    meditation: {
      prompt: t(`Deus não explica a Paulo por que o espinho permanece
        — apenas promete graça suficiente para suportá-lo, uma
        resposta que exige confiança sem explicação completa.`),
      questions: [
        'Existe um "espinho na carne" que você tem pedido a Deus para remover, sem sinal de que a remoção virá?',
        'Como você reagiria se a resposta a essa oração fosse "minha graça te basta", em vez de remoção completa?',
        'O que significa, na prática, encontrar o poder de Deus "aperfeiçoado" especificamente na sua fraqueza, não apesar dela?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nada Levassem Para o Caminho',
      text: t(`Senhor Jesus, ao enviar os doze, ordenaste que não
        levassem "nem pão, nem alforje, nem dinheiro no cinto" —
        dependência radical da tua provisão, não de preparação
        excessiva. Reconheço minha tendência a acumular segurança
        antes de agir em obediência. Ensina-me a confiar o suficiente
        para sair sem todas as garantias que normalmente exijo. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução de viajar sem provisões não era
        imprudência — era treino específico de dependência da
        provisão de Deus através das pessoas que os receberiam pelo
        caminho.`),
      questions: [
        'Você tende a exigir garantias completas antes de agir em obediência, ou consegue confiar com provisão mínima, como os doze?',
        'Que "excesso de bagagem" — segurança acumulada — talvez impeça você de agir com mais liberdade em fé?',
        'O que significaria, hoje, dar um passo de obediência confiando na provisão de Deus através de outras pessoas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Poder Aperfeiçoado na Fraqueza',
      text: t(`Senhor, esta semana trouxe o profeta sem honra na
        própria terra, a longa espera de Davi cumprida, e a graça que
        basta mesmo quando o espinho permanece. Termino pedindo: que
        eu reconheça o extraordinário mesmo no familiar, que eu
        espere teu tempo com paciência, e que eu descanse na
        suficiência da tua graça diante do que ainda não foi removido
        da minha vida. Amém.`),
    },
    meditation: {
      prompt: t(`Do profeta desprezado por familiaridade ao poder que
        se aperfeiçoa na fraqueza, a semana revelou que Deus
        frequentemente trabalha de formas que contradizem nossa lógica
        de força e reconhecimento.`),
      questions: [
        'Qual dos temas desta semana — o profeta sem honra, a espera de Davi, ou a graça suficiente — mais tocou você?',
        'Que "espinho" você quer entregar a Deus esta semana, confiando na graça em vez de exigir remoção?',
        'Como você quer viver, nos próximos dias, dependendo mais da provisão de Deus do que da sua própria preparação?',
      ],
    },
  },
];

// Próprio 10 — 2 Samuel 6:1-5, 12b-19 · Salmo 24 · Efésios 1:3-14 · Marcos 6:14-29
const proper10: DevotionalEntry[] = [
  {
    prayer: {
      title: 'A Cabeça de João Batista',
      text: t(`Senhor, a morte de João Batista aconteceu por causa de
        um juramento impulsivo, orgulho diante de convidados, e a
        covardia de um rei que "não quis desprezar o juramento" mesmo
        sabendo que era errado cumpri-lo. Quantas vezes cedo ao que é
        errado por medo de parecer inconsistente diante dos outros?
        Dá-me coragem para admitir um erro em vez de persistir nele
        por orgulho. Amém.`),
    },
    meditation: {
      prompt: t(`Herodes "temia a João" e sabia que ele era "varão
        justo e santo" — a tragédia não foi ignorância, mas covardia:
        ele sabia o certo e escolheu o conveniente por pressão social.`),
      questions: [
        'Você já persistiu num erro por medo de "perder a cara" diante de outros, mesmo sabendo que estava errado?',
        'O que Herodes sabia sobre João, e mesmo assim, o que o impediu de agir de acordo com esse conhecimento?',
        'Que decisão você precisa corrigir hoje, mesmo que isso signifique admitir um erro publicamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Davi Dançava com Todas as Suas Forças',
      text: t(`Senhor, quando a arca finalmente chegou a Jerusalém,
        "Davi dançava com todas as suas forças diante do Senhor" — sem
        se importar com dignidade real, sem calcular a aparência
        diante dos outros. Livra-me da autoconsciência que me impede
        de adorar plenamente, com o corpo todo, sem medo do que os
        outros pensarão. Amém.`),
    },
    meditation: {
      prompt: t(`Davi era rei, com dignidade a proteger — e ainda
        assim escolheu adoração física e desinibida diante de toda a
        cidade, sabendo que isso poderia (e depois causou) crítica.`),
      questions: [
        'O que impede você de adorar com mais liberdade e menos autoconsciência?',
        'Você já teve que escolher entre "manter a dignidade" e adorar genuinamente? O que escolheu?',
        'Como você poderia, hoje, expressar adoração de forma mais plena, mesmo que isso pareça "exagerado" para outros?',
      ],
    },
  },
  {
    prayer: {
      title: 'Mical o Desprezou',
      text: t(`Senhor, enquanto Davi dançava com alegria genuína,
        Mical, sua esposa, "o desprezou no seu coração" ao vê-lo desde
        a janela. Nem toda adoração genuína será compreendida por
        quem está ao redor — às vezes será até desprezada. Dá-me a
        coragem de Davi para continuar adorando plenamente, mesmo
        quando alguém próximo não entender ou aprovar. Amém.`),
    },
    meditation: {
      prompt: t(`O desprezo de Mical vinha de dentro de casa — nem
        sempre a resistência à nossa adoração genuína vem de fora; às
        vezes vem de quem deveria estar mais próximo.`),
      questions: [
        'Você já foi desencorajado a expressar sua fé livremente por alguém próximo que não entendia ou desaprovava?',
        'Como você lida com o desprezo ou julgamento de pessoas próximas diante da sua expressão genuína de fé?',
        'O que ajudaria você a continuar "dançando diante do Senhor" mesmo diante de olhares desaprovadores?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quem Subirá ao Monte do Senhor?',
      text: t(`Senhor, o salmo pergunta: "Quem subirá ao monte do
        Senhor? Aquele que é limpo de mãos e puro de coração." Não é
        pureza absoluta e sem falhas, mas orientação sincera —
        alguém que "não entrega a sua alma à vaidade." Examina meu
        próprio coração diante dessa pergunta: o que precisaria mudar
        para eu me aproximar de ti com mãos e coração mais limpos?
        Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não exige perfeição absoluta, mas orientação
        de vida — "não entrega a sua alma à vaidade" descreve direção
        constante, não ausência total de falha.`),
      questions: [
        'O que significa, para você, ter "mãos limpas e coração puro" — perfeição impossível ou orientação sincera de vida?',
        'Que "vaidade" você tem entregado sua alma sem perceber?',
        'Como você pode se aproximar hoje do "monte do Senhor" com mais sinceridade de coração?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bendito Seja o Deus e Pai',
      text: t(`Senhor, Paulo abre esta carta com uma explosão de
        gratidão: "Bendito seja o Deus e Pai de nosso Senhor Jesus
        Cristo, o qual nos abençoou com todas as bênçãos espirituais."
        Ele nos elegeu antes da fundação do mundo, nos predestinou
        para adoção, nos concedeu redenção pelo sangue de Cristo. Que
        eu viva mais consciente dessas bênçãos já dadas, não apenas
        das que ainda espero. Amém.`),
    },
    meditation: {
      prompt: t(`A lista de bênçãos que Paulo descreve já aconteceu —
        eleitos, predestinados, redimidos — tempo verbal passado, não
        futuro; a identidade já está estabelecida, não pendente.`),
      questions: [
        'Você vive mais consciente das bênçãos espirituais que já possui, ou focado apenas no que ainda falta?',
        'O que significa para você que Deus "nos elegeu antes da fundação do mundo" — como isso muda sua segurança de identidade?',
        'Que bênção específica desta lista de Paulo você precisa relembrar hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ressuscitou dos Mortos',
      text: t(`Senhor, quando Herodes ouviu falar de Jesus, sua
        consciência culpada o levou a uma conclusão distorcida: "João,
        o Batista, ressuscitou dos mortos." A culpa não resolvida
        distorce a percepção da realidade. Examina se há alguma culpa
        não resolvida em mim que está distorcendo a forma como vejo o
        mundo ao meu redor hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A reação de Herodes revela mais sobre sua própria
        consciência culpada do que sobre a identidade real de Jesus —
        culpa não processada frequentemente gera interpretações
        distorcidas da realidade.`),
      questions: [
        'Existe alguma culpa não resolvida na sua vida que pode estar distorcendo a forma como você interpreta situações atuais?',
        'Como você lida, normalmente, com a culpa — processando-a honestamente ou deixando que ela distorça sua percepção?',
        'O que ajudaria você a trazer essa culpa diante de Deus para resolução genuína, em vez de distorção contínua?',
      ],
    },
  },
  {
    prayer: {
      title: 'Adoração Sem Vergonha',
      text: t(`Senhor, esta semana trouxe a covardia de Herodes diante
        da pressão social, a dança destemida de Davi, o desprezo de
        Mical, e a explosão de gratidão de Paulo pelas bênçãos já
        dadas. Termino pedindo: que eu tenha a coragem de Davi para
        adorar plenamente, a integridade para não ceder à pressão como
        Herodes cedeu, e a gratidão constante de Paulo pelas bênçãos
        já recebidas. Amém.`),
    },
    meditation: {
      prompt: t(`Da covardia de Herodes à dança destemida de Davi, a
        semana contrastou duas respostas diferentes à pressão social —
        uma que cede ao medo, outra que adora livremente apesar da
        crítica.`),
      questions: [
        'Qual dos temas desta semana — a covardia de Herodes, a dança de Davi, ou as bênçãos de Efésios — mais tocou você?',
        'Onde você precisa de mais coragem para agir corretamente apesar da pressão social?',
        'Como você quer viver, nos próximos dias, mais consciente das bênçãos espirituais que já são suas?',
      ],
    },
  },
];

// Próprio 11 — 2 Samuel 7:1-14a · Salmo 89:20-37 · Efésios 2:11-22 · Marcos 6:30-34, 53-56
const proper11: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Ovelhas Sem Pastor',
      text: t(`Senhor Jesus, ao desembarcar e ver uma grande multidão,
        "compadeceste-te deles, porque eram como ovelhas que não têm
        pastor." Não os viste como interrupção do teu descanso
        merecido, mas como pessoas necessitando de cuidado. Ensina-me
        a mesma compaixão diante de quem cruza meu caminho quando eu
        preferia estar descansando — que eu veja necessidade, não
        incômodo. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus e os discípulos estavam justamente buscando
        descanso ("vinde vós, à parte... e descansai") quando a
        multidão os alcançou — a compaixão de Jesus não esperou um
        momento mais conveniente.`),
      questions: [
        'Como você costuma reagir quando é interrompido no seu próprio momento de descanso por uma necessidade alheia?',
        'Quem, ao seu redor, parece hoje uma "ovelha sem pastor" — precisando de direção e cuidado?',
        'O que ajudaria você a ver interrupções como oportunidades de compaixão, não apenas incômodos?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu Moro numa Casa de Cedro',
      text: t(`Senhor, Davi, já estabelecido e em paz, notou o
        contraste: "eu moro numa casa de cedro, enquanto que a arca de
        Deus dentro de uma tenda." O incômodo dele diante dessa
        desigualdade revela um coração atento à tua honra, não apenas
        ao próprio conforto. Examina se, na minha própria prosperidade,
        ainda mantenho essa mesma sensibilidade à tua glória. Amém.`),
    },
    meditation: {
      prompt: t(`Davi só percebeu o contraste depois de já estar
        instalado e confortável — a prosperidade pode tanto adormecer
        quanto despertar a consciência sobre o que realmente importa.`),
      questions: [
        'Sua própria prosperidade ou conforto tem despertado ou adormecido sua sensibilidade às coisas de Deus?',
        'Que "desigualdade" — entre seu próprio conforto e a honra que Deus merece — você talvez tenha deixado de notar?',
        'O que Davi ensina sobre usar a própria estabilidade para pensar além de si mesmo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Farei Um Grande Nome',
      text: t(`Senhor, embora Davi quisesse construir uma casa para
        ti, respondeste com uma promessa maior: farias uma casa —
        dinastia — para ele. "Eu te tomei da malhada, de detrás das
        ovelhas... e te farei um grande nome." O que Davi ofereceu
        (construir) tu transformaste em algo que só tu poderias dar
        (uma promessa eterna). Ensina-me a confiar que tuas respostas
        às minhas ofertas costumam superar o que eu mesmo imaginei
        oferecer. Amém.`),
    },
    meditation: {
      prompt: t(`Deus recusa a oferta de Davi (construir um templo)
        mas responde com algo maior (uma dinastia eterna) — a recusa
        não é rejeição, é redirecionamento generoso.`),
      questions: [
        'Você já teve uma oferta ou plano recusado por Deus, apenas para descobrir depois que ele tinha algo maior reservado?',
        'Como você reage quando Deus não aceita exatamente o que você ofereceu, mas redireciona para algo diferente?',
        'Que oferta você fez a Deus recentemente que talvez ele queira transformar em algo maior do que você imaginou?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Minha Fidelidade Estará com Ele',
      text: t(`Senhor, prometeste a Davi: "a minha fidelidade, porém, e
        a minha benignidade estarão com ele... não lhe retirarei
        totalmente a minha benignidade, nem faltarei com a minha
        fidelidade." Mesmo antecipando futuras falhas da descendência
        de Davi, prometeste disciplina, não abandono. Obrigado por
        essa mesma fidelidade constante mesmo diante das minhas
        próprias falhas previsíveis. Amém.`),
    },
    meditation: {
      prompt: t(`Deus promete disciplina para as falhas futuras da
        linhagem de Davi ("visitarei com vara a sua transgressão"),
        mas explicitamente distingue disciplina de abandono — a
        aliança permanece mesmo quando a fidelidade humana falha.`),
      questions: [
        'Você distingue, na sua própria experiência, entre a disciplina de Deus e o abandono? Como?',
        'O que significa para você que a fidelidade de Deus não depende da sua fidelidade constante?',
        'Como essa promessa antiga a Davi te dá confiança sobre promessas que Deus fez a você?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ele É a Nossa Paz',
      text: t(`Senhor, Paulo escreve que Cristo "é a nossa paz, o qual
        de ambos os povos fez um... derrubando a parede de separação
        que estava no meio." A obra de Cristo não é apenas salvação
        individual, mas reconciliação entre povos divididos. Examina
        as "paredes de separação" que ainda mantenho — preconceitos,
        rancores, divisões — e ajuda-me a deixar que Cristo as derrube
        também em mim. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo descreve a reconciliação entre judeus e
        gentios não como acordo diplomático, mas como obra concreta de
        Cristo na cruz — a paz entre grupos divididos é parte central
        do evangelho, não assunto secundário.`),
      questions: [
        'Que "parede de separação" — entre grupos, gerações, tradições — você ainda mantém, mesmo sabendo que Cristo veio para derrubá-la?',
        'Como a reconciliação entre judeus e gentios, tão central para Paulo, se aplica às divisões que você vive hoje?',
        'O que significaria, na prática, trabalhar pela paz que Cristo já conquistou, em vez de apenas aceitá-la teoricamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tocar ao Menos a Orla do Seu Manto',
      text: t(`Senhor Jesus, onde quer que ias, as pessoas traziam os
        enfermos e "rogavam-lhe que os deixasse tocar ao menos a orla
        do seu manto; e todos os que a tocavam ficavam curados." Não
        era preciso muito contato — apenas contato genuíno. Ensina-me
        a confiar que mesmo o menor gesto de fé em tua direção já é
        suficiente para que ajas. Amém.`),
    },
    meditation: {
      prompt: t(`O texto generaliza a experiência da mulher com
        hemorragia (Próprio 8) para muitas pessoas — o padrão se repete:
        contato mínimo, mas genuíno, é suficiente para experimentar o
        poder de Jesus.`),
      questions: [
        'Você acredita que gestos pequenos de fé — "tocar a orla do manto" — são suficientes, ou sente que precisa de mais para se aproximar de Jesus?',
        'Que pequeno gesto de fé você pode oferecer hoje, confiando que já é suficiente?',
        'Como essa cena, multiplicada por muitas pessoas, mostra a disposição constante de Jesus para curar e restaurar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Compaixão e Promessa Eterna',
      text: t(`Senhor, esta semana trouxe a compaixão de Jesus pelas
        multidões, o desejo de Davi de te honrar transformado em
        promessa eterna, e a parede de separação derrubada por Cristo.
        Termino pedindo: que eu tenha a mesma compaixão diante da
        necessidade alheia, e que eu confie que tuas respostas às
        minhas ofertas sempre superam o que eu mesmo poderia imaginar.
        Amém.`),
    },
    meditation: {
      prompt: t(`Da compaixão de Jesus pelas multidões à promessa
        eterna feita a Davi, a semana revelou generosidade que excede
        expectativas — Deus sempre dá mais do que se pede ou espera.`),
      questions: [
        'Qual dos temas desta semana — a compaixão de Jesus, a promessa a Davi, ou a parede derrubada — mais tocou você?',
        'Que "parede de separação" você quer trabalhar para derrubar na semana que vem?',
        'Como você quer viver, nos próximos dias, com a mesma compaixão que Jesus teve pelas multidões?',
      ],
    },
  },
];

// Próprio 12 — 2 Samuel 11:1-15 · Salmo 14 · Efésios 3:14-21 · João 6:1-21
const proper12: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Cinco Pães e Dois Peixes',
      text: t(`Senhor Jesus, diante de uma multidão faminta, um
        menino ofereceu o pouco que tinha — "cinco pães de cevada e
        dois peixinhos" — e tu multiplicaste até que todos ficassem
        saciados, com sobras. Ensina-me a oferecer o pouco que tenho,
        mesmo quando parece insuficiente diante da necessidade real,
        confiando que és tu quem multiplica. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus já sabia o que faria antes de perguntar a
        Felipe onde comprariam pão — o teste não era para descobrir
        uma solução, mas para revelar a fé (ou a falta dela) dos
        discípulos.`),
      questions: [
        'Que "cinco pães e dois peixes" — recurso pequeno diante de uma necessidade grande — você tem hesitado em oferecer por parecer insuficiente?',
        'Você calcula primeiro os recursos disponíveis (como Felipe) ou confia primeiro na multiplicação de Deus?',
        'Onde você pode, hoje, participar de uma provisão maior do que consegue sozinho?',
      ],
    },
  },
  {
    prayer: {
      title: 'Davi Ficou em Jerusalém',
      text: t(`Senhor, "no tempo em que os reis saem à guerra, Davi
        enviou Joabe... porém Davi ficou em Jerusalém." O texto marca
        deliberadamente essa ausência do lugar onde Davi deveria
        estar. O pecado que se seguiu começou com uma escolha de
        ociosidade fora do lugar certo. Examina onde estou "ficando"
        quando deveria estar em movimento, e o risco que essa
        ociosidade pode trazer. Amém.`),
    },
    meditation: {
      prompt: t(`A narrativa marca cuidadosamente que era "o tempo em
        que os reis saem à guerra" — Davi estava fora do lugar
        esperado, e essa ociosidade fora de função criou espaço para a
        tentação que se seguiu.`),
      questions: [
        'Existe alguma área da sua vida onde você está "ficando" quando deveria estar ativo, e essa inércia tem te exposto a tentação?',
        'Como o contexto — onde você está, o que está fazendo — influencia sua vulnerabilidade a decisões erradas?',
        'O que ajudaria você a reconhecer, antes que seja tarde, quando está "fora do lugar" espiritualmente?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Trama Contra Urias',
      text: t(`Senhor, depois de pecar com Bate-Seba, Davi tentou
        esconder o que fizera, e quando isso falhou, orquestrou a
        morte de Urias em batalha. Um pecado não confessado gera
        outros, cada vez mais graves, na tentativa de escondê-lo.
        Examina se há algo que tenho tentado esconder através de mais
        pecado, em vez de trazer à luz e confessar. Amém.`),
    },
    meditation: {
      prompt: t(`A narrativa mostra uma escalada — do olhar, ao
        adultério, ao encobrimento, ao assassinato — cada passo
        tentando resolver o problema criado pelo passo anterior, sem
        nunca voltar atrás através da confissão honesta.`),
      questions: [
        'Você já viu, na sua própria vida, um pequeno erro escalar porque tentou escondê-lo em vez de confessá-lo?',
        'O que ajudaria você a interromper essa escalada mais cedo, antes que ela se torne irreversível?',
        'Existe algo que você está encobrindo hoje que precisa ser trazido à luz?',
      ],
    },
  },
  {
    prayer: {
      title: 'Diz o Néscio no Seu Coração',
      text: t(`Senhor, o salmo descreve alguém que diz "no seu
        coração: Não há Deus" — não necessariamente ateísmo declarado,
        mas vida vivida como se Deus não estivesse observando.
        Examina as áreas da minha própria vida onde ajo, na prática,
        como se ninguém estivesse vendo — mesmo professando crer em
        ti com a boca. Amém.`),
    },
    meditation: {
      prompt: t(`O "néscio" do salmo pode muito bem professar fé com
        os lábios — a insensatez descrita é viver como se Deus não
        estivesse presente, não necessariamente negar sua existência
        formalmente.`),
      questions: [
        'Existe alguma área da sua vida onde você age, na prática, como se Deus não estivesse observando, mesmo professando fé?',
        'O que ajudaria você a viver com mais consciência constante da presença de Deus, não apenas em momentos religiosos?',
        'Como a história de Davi (Próprio 12) ilustra exatamente esse tipo de esquecimento prático da presença de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Robustecidos no Homem Interior',
      text: t(`Senhor, Paulo ora para que sejamos "robustecidos com
        poder pelo seu Espírito no homem interior" e que possamos
        "compreender... qual seja a largura, e o comprimento, e a
        altura, e a profundidade" do amor de Cristo. É uma oração por
        fortalecimento interno, não circunstâncias externas mais
        fáceis. Fortalece o meu homem interior, para que eu resista
        onde antes cedia. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não ora para que as circunstâncias melhorem,
        mas para que a capacidade interna de compreender e viver o
        amor de Cristo cresça — uma oração por transformação, não por
        conforto.`),
      questions: [
        'Você ora mais por circunstâncias mais fáceis ou por fortalecimento interno para enfrentar as circunstâncias como são?',
        'O que significaria, na prática, ser "robustecido no homem interior" numa área específica onde você se sente fraco?',
        'Como você pode buscar compreender melhor "a largura, o comprimento, a altura e a profundidade" do amor de Cristo esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sou Eu, Não Temais',
      text: t(`Senhor Jesus, quando os discípulos te viram andando
        sobre o mar em meio à tempestade, ficaram apavorados, e
        disseste: "Sou eu; não temais." A tua identidade, uma vez
        reconhecida, dissolve o medo mais do que qualquer explicação.
        Ensina-me a reconhecer tua presença antes de tudo, mesmo em
        circunstâncias que parecem assustadoras à primeira vista.
        Amém.`),
    },
    meditation: {
      prompt: t(`O medo dos discípulos vinha de não reconhecerem quem
        estava se aproximando — assim que Jesus se identifica, o medo
        recebe resposta direta: não é sobre a circunstância, é sobre
        quem está nela com eles.`),
      questions: [
        'Existe uma circunstância atual que parece assustadora porque você ainda não reconheceu plenamente a presença de Jesus nela?',
        'O que mudaria se você ouvisse, hoje, "sou eu, não temais" sobre uma situação específica?',
        'Como você pode buscar reconhecer a presença de Jesus antes de reagir com medo à próxima "tempestade"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Multiplicação e Confissão',
      text: t(`Senhor, esta semana trouxe a multiplicação dos pães, a
        ociosidade que abriu espaço para o pecado de Davi, e a
        presença de Jesus que dissolve o medo na tempestade. Termino
        pedindo: que eu ofereça o pouco que tenho confiando na tua
        multiplicação, que eu reconheça quando estou "fora do lugar"
        espiritualmente, e que eu reconheça tua presença antes de
        temer. Amém.`),
    },
    meditation: {
      prompt: t(`Da multiplicação generosa dos pães à queda de Davi
        por ociosidade, a semana contrastou dois tipos de resposta à
        oportunidade: oferecer o pouco com fé, ou ceder à tentação por
        falta de propósito.`),
      questions: [
        'Qual dos temas desta semana — a multiplicação dos pães, a queda de Davi, ou "sou eu, não temais" — mais te desafiou?',
        'Que pouco você quer oferecer a Deus esta semana, confiando na multiplicação?',
        'Como você quer permanecer "no lugar certo" espiritualmente nos próximos dias?',
      ],
    },
  },
];

// Próprio 13 — 2 Samuel 11:26-12:13a · Salmo 51:1-12 · Efésios 4:1-16 · João 6:24-35
const proper13: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Eu Sou o Pão da Vida',
      text: t(`Senhor Jesus, à multidão que te buscava pelo pão que
        comeram, disseste: "Trabalhai, não pela comida que perece, mas
        pela comida que permanece para a vida eterna." E declaraste:
        "Eu sou o pão da vida." Examina o que busco de ti — apenas o
        que satisfaz momentaneamente, ou aquilo que realmente
        permanece? Ensina-me a buscar-te por quem és, não apenas pelo
        que podes dar. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus expõe honestamente a motivação da multidão —
        eles o buscavam pela comida, não pelos sinais que apontavam
        para algo maior — um convite a examinar as próprias
        motivações ao buscar Deus.`),
      questions: [
        'Você busca a Deus principalmente pelo que ele pode fazer por você, ou por quem ele realmente é?',
        'Que "comida que perece" você tem trabalhado intensamente para conseguir, enquanto negligencia a que "permanece"?',
        'O que significaria, hoje, buscar a Jesus como "pão da vida", não apenas como solução para necessidades imediatas?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Parábola da Ovelha',
      text: t(`Senhor, quando Natã confrontou Davi, não começou com
        acusação direta, mas com uma parábola sobre um homem rico que
        tomou a única ovelha de um pobre. Davi, indignado com a
        injustiça da história, se condenou sem perceber. Ensina-me a
        mesma capacidade de reconhecer injustiça — inclusive quando,
        de alguma forma disfarçada, ela é minha própria. Amém.`),
    },
    meditation: {
      prompt: t(`Natã usa uma história para contornar as defesas que
        Davi certamente teria construído diante de uma acusação
        direta — a parábola permite que a verdade chegue por um
        caminho que desarma a resistência inicial.`),
      questions: [
        'Você reconhece injustiça mais facilmente quando ela está disfarçada numa história do que quando é apontada diretamente em você?',
        'Existe alguma situação em sua vida onde você julgaria duramente outra pessoa, sem perceber que faz algo semelhante?',
        'O que ajudaria você a ouvir uma correção necessária sem construir defesas imediatas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tu És Este Homem',
      text: t(`Senhor, depois da parábola, Natã disse a Davi, sem
        rodeios: "Tu és este homem." O momento da verdade chegou, e
        Davi não fugiu dela — reconheceu, confessou, e foi perdoado.
        Ensina-me essa mesma disposição de aceitar a confrontação
        direta quando ela finalmente chega, sem me esconder atrás de
        justificativas. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta de Davi a essa confrontação direta —
        registrada no Salmo 51 — é um dos exemplos mais completos de
        arrependimento genuíno na Escritura, sem minimização nem
        desculpa.`),
      questions: [
        'Como você normalmente reage quando alguém diz, sobre uma falha sua, "tu és este homem" — defesa ou reconhecimento?',
        'O que Davi fez de diferente, depois de confrontado, que tornou possível a restauração?',
        'Existe uma verdade difícil que você precisa ouvir hoje, sem se esconder atrás de justificativas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cria em Mim um Coração Puro',
      text: t(`Senhor, a oração de Davi depois de confrontado é modelo
        de arrependimento genuíno: "Cria em mim, ó Deus, um coração
        puro, e renova em mim um espírito estável." Ele não pede
        apenas perdão pelo ato, mas transformação da raiz. Que a minha
        própria confissão vá além de lamentar consequências, e busque
        essa mesma renovação profunda que só tu podes dar. Amém.`),
    },
    meditation: {
      prompt: t(`Davi pede criação, não reforma — "cria em mim" é
        linguagem de origem nova, não de conserto do que já existia,
        reconhecendo que a raiz do problema precisa de intervenção
        radical.`),
      questions: [
        'Sua confissão costuma pedir apenas alívio das consequências, ou também transformação da raiz do problema?',
        'O que significaria, para você, pedir a Deus que "crie" algo novo em vez de apenas "conserte" o que já existe?',
        'Que área específica do seu coração precisa dessa mesma renovação profunda hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Um Só Corpo, Muitos Dons',
      text: t(`Senhor, Paulo descreve dons diferentes — apóstolos,
        profetas, evangelistas, pastores, mestres — todos com o mesmo
        propósito: "o aperfeiçoamento dos santos... para edificação do
        corpo de Cristo." Nenhum dom existe isolado; todos servem à
        mesma construção coletiva. Ajuda-me a exercer meu próprio dom
        com humildade, reconhecendo que ele só faz sentido dentro do
        corpo inteiro. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não hierarquiza os dons listados — cada um tem
        função específica dentro do mesmo propósito maior, sem que
        nenhum seja suficiente sozinho para o crescimento completo do
        corpo.`),
      questions: [
        'Você reconhece seu próprio dom como parte de um todo maior, ou tende a vê-lo isoladamente?',
        'Como sua comunidade de fé poderia crescer mais se cada dom fosse exercido com humildade e integração, não competição?',
        'Que dom seu você tem subutilizado, talvez por não reconhecer seu valor dentro do corpo maior?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Obra de Deus É Esta',
      text: t(`Senhor Jesus, quando perguntaram o que deveriam fazer
        para "praticar as obras de Deus", respondeste com simplicidade
        que talvez tenha surpreendido: "A obra de Deus é esta: Que
        creiais naquele que ele enviou." Não uma lista de tarefas, mas
        confiança em ti. Livra-me de complicar o que tu tornaste
        simples — a fé genuína em ti, da qual todo o resto flui. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta era sobre "obras" (plural, tarefas a
        cumprir) e a resposta de Jesus é sobre "obra" (singular,
        confiança) — uma reorientação de fazer para crer, sem negar
        que a fé genuína produz ação.`),
      questions: [
        'Você tende a complicar a fé com listas de tarefas, quando Jesus a resume em confiança nele?',
        'O que significaria, hoje, simplificar sua relação com Deus de volta a essa confiança fundamental?',
        'Como a fé genuína "produz obras" mesmo quando a ordem certa começa pela confiança, não pelo esforço?',
      ],
    },
  },
  {
    prayer: {
      title: 'Coração Puro, Corpo Unido',
      text: t(`Senhor, esta semana trouxe o pão da vida que satisfaz
        de verdade, a parábola que expôs o pecado de Davi, e o corpo
        de Cristo com muitos dons unidos por um propósito. Termino
        pedindo o mesmo coração puro que Davi buscou, e a mesma
        simplicidade de fé que Jesus ensinou: crer naquele que Deus
        enviou. Amém.`),
    },
    meditation: {
      prompt: t(`Da confrontação de Natã ao pão da vida, a semana
        revelou o mesmo movimento: reconhecer honestamente a própria
        necessidade, e buscar em Deus — não em substitutos — o que
        realmente satisfaz.`),
      questions: [
        'Qual dos temas desta semana — o pão da vida, a confissão de Davi, ou o corpo unido de Efésios — mais te desafiou?',
        'Que "coração puro" você quer pedir a Deus nesta semana que começa?',
        'Como você quer exercer seu dom dentro da comunidade de fé nos próximos dias?',
      ],
    },
  },
];

// Próprio 14 — 2 Samuel 18:5-9, 15, 31-33 · Salmo 130 · Efésios 4:25-5:2 · João 6:35, 41-51
const proper14: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Este É o Pão que Desceu do Céu',
      text: t(`Senhor Jesus, quando declaraste "eu sou o pão que
        desceu do céu", os que te conheciam desde criança murmuraram:
        "Não é Jesus, o filho de José, cujo pai e mãe nós conhecemos?"
        A familiaridade humana obscureceu o mistério divino. Ajuda-me
        a não deixar que o que já conheço sobre ti me impeça de
        continuar descobrindo quem realmente és. Amém.`),
    },
    meditation: {
      prompt: t(`A murmuração da multidão nasce exatamente da mesma
        familiaridade que impediu Nazaré de reconhecer Jesus (Próprio
        9) — conhecer a origem humana de alguém pode obscurecer o que
        Deus está fazendo através dele.`),
      questions: [
        'Você já deixou o que "já sabe" sobre Jesus limitar sua disposição de continuar descobrindo quem ele é?',
        'Que familiaridade — com pessoas, com a fé, com hábitos — tem impedido você de ver o extraordinário no comum?',
        'O que ajudaria você a se aproximar de Jesus com o mesmo assombro de quem o encontra pela primeira vez?',
      ],
    },
  },
  {
    prayer: {
      title: 'Meu Filho Absalão',
      text: t(`Senhor, mesmo depois que Absalão se rebelou contra ele e
        buscou seu trono, Davi ordenou que fosse tratado "brandamente"
        — e quando morreu, chorou com um lamento que atravessa os
        séculos: "Meu filho Absalão, meu filho, meu filho Absalão!
        quem me dera que eu morrera por ti!" O amor de pai não se
        apagou nem diante da traição mais profunda. Ensina-me esse
        mesmo amor que persiste, mesmo quando ferido. Amém.`),
    },
    meditation: {
      prompt: t(`Davi, como rei, tinha justificativa legítima para
        tratar Absalão como inimigo derrotado — e ainda assim seu
        primeiro instinto, mesmo antes da rebelião chegar ao fim, foi
        proteção paternal.`),
      questions: [
        'Existe alguém que te traiu profundamente, mas por quem você ainda sente amor genuíno, como Davi sentia por Absalão?',
        'Como você equilibra justiça necessária com o amor que persiste mesmo diante da traição?',
        'O que esse lamento de Davi revela sobre o próprio coração de Deus por filhos que se rebelam?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Batalha e a Árvore',
      text: t(`Senhor, Absalão morreu preso pelos cabelos numa árvore,
        "pendurado entre o céu e a terra" — imagem de alguém que não
        pertencia mais a lugar nenhum, nem à vida que abandonou nem à
        que buscava tomar à força. Que eu não persiga posições ou
        vitórias através de caminhos que me deixam, no fim, sem lugar
        nenhum para pertencer. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem de Absalão "entre o céu e a terra" é
        poderosa e trágica — ele buscou um trono que não lhe pertencia
        e terminou sem lugar nenhum, nem no céu nem na terra.`),
      questions: [
        'Existe alguma busca sua por posição ou reconhecimento que, olhando bem, poderia te deixar "sem lugar", como Absalão?',
        'O que ajudaria você a buscar seu lugar de pertencimento de forma legítima, sem tentar tomá-lo à força?',
        'Como a ambição desmedida de Absalão contrasta com a paciência que Davi teve esperando o trono no seu tempo certo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Aguardo ao Senhor',
      text: t(`Senhor, o salmista descreve uma espera intensa: "a
        minha alma anseia pelo Senhor, mais do que os guardas pelo
        romper da manhã." Não é espera passiva, mas anseio ativo,
        vigilante. Ensina-me essa mesma qualidade de espera — não
        resignação cansada, mas expectativa desperta pelo que sei que
        virá. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem dos guardas noturnos esperando o amanhecer
        comunica urgência e alívio combinados — eles sabem que a
        manhã virá, mas ainda assim a esperam com atenção total.`),
      questions: [
        'Sua espera por Deus é mais parecida com resignação cansada ou com o anseio vigilante dos guardas pela manhã?',
        'Que "amanhecer" você está esperando hoje, com certeza de que virá, mas ainda sem vê-lo?',
        'O que ajudaria você a esperar com mais vigilância ativa, não apenas passividade?',
      ],
    },
  },
  {
    prayer: {
      title: 'Andai em Amor',
      text: t(`Senhor, Paulo pede: "Sede benignos uns para com os
        outros, misericordiosos, perdoando-vos uns aos outros, como
        também Deus vos perdoou em Cristo... andai em amor, como
        também Cristo vos amou." O padrão do meu perdão é o teu
        perdão a mim — não menor, não condicional. Ajuda-me a perdoar
        com essa mesma generosidade que já recebi. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não pede perdão genérico — pede perdão "como
        também Deus vos perdoou em Cristo", estabelecendo um padrão
        específico e generoso, não um mínimo aceitável.`),
      questions: [
        'Seu perdão aos outros normalmente reflete o padrão generoso do perdão que você recebeu de Deus, ou é mais condicional?',
        'Existe alguém que você precisa perdoar hoje com o mesmo padrão que Cristo usou para perdoar você?',
        'O que significa, na prática, "andar em amor" — não apenas sentir, mas viver ativamente essa disposição?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ninguém Pode Vir a Mim',
      text: t(`Senhor Jesus, disseste: "Ninguém pode vir a mim, se o
        Pai que me enviou não o trouxer." A vinda a ti não é conquista
        própria, mas resposta a uma atração que o próprio Pai
        provoca. Isso me liberta de qualquer orgulho sobre minha
        própria busca espiritual, e me convida à gratidão por ter sido
        atraído até ti. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus atribui a iniciativa da vinda a ele
        completamente ao Pai — mesmo a busca humana por Deus tem
        origem divina, não apenas esforço humano independente.`),
      questions: [
        'Você já pensou na sua própria busca por Deus como resposta a algo que ele já estava fazendo, e não conquista própria sua?',
        'Como isso muda a forma como você vê pessoas que ainda não creem — seriam elas simplesmente "não atraídas ainda"?',
        'O que significa, para você, gratidão por ter sido "trazido" ao invés de orgulho por ter "chegado" sozinho?',
      ],
    },
  },
  {
    prayer: {
      title: 'Amor que Persiste, Espera que Vigia',
      text: t(`Senhor, esta semana trouxe o pão que desceu do céu
        obscurecido pela familiaridade, o amor de pai de Davi que
        persistiu além da traição, e a espera vigilante do salmista.
        Termino pedindo: que eu continue descobrindo quem tu és sem me
        acomodar ao que já conheço, que eu ame com generosidade mesmo
        quando ferido, e que eu espere com vigilância ativa. Amém.`),
    },
    meditation: {
      prompt: t(`Do amor incondicional de Davi por Absalão ao perdão
        generoso pedido por Paulo, a semana revelou o mesmo padrão de
        amor que reflete, mesmo imperfeitamente, o próprio caráter de
        Deus.`),
      questions: [
        'Qual dos temas desta semana — o pão que desceu do céu, o lamento de Davi, ou o perdão generoso — mais tocou você?',
        'Que espera vigilante você quer cultivar na semana que começa?',
        'Como você quer amar com mais generosidade, mesmo diante de mágoas recentes?',
      ],
    },
  },
];

// Próprio 15 — 1 Reis 2:10-12; 3:3-14 · Salmo 111 · Efésios 5:15-20 · João 6:51-58
const proper15: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Comer a Minha Carne, Beber o Meu Sangue',
      text: t(`Senhor Jesus, disseste palavras que escandalizaram até
        os teus seguidores mais próximos: "Se não comerdes a carne do
        Filho do homem, e não beberdes o seu sangue, não tereis vida
        em vós mesmos." Linguagem chocante para apontar para uma
        verdade real — que a vida vem de uma união profunda contigo,
        não de proximidade superficial. Ensina-me essa intimidade real,
        não apenas contato distante. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem física e chocante de "comer carne e beber
        sangue" era deliberadamente perturbadora para forçar os
        ouvintes a considerar o quão profunda e íntima a união com
        Cristo realmente precisa ser.`),
      questions: [
        'Sua relação com Jesus é de proximidade superficial ou de união profunda, como a imagem radical que ele usa aqui?',
        'O que significa, para você, "permanecer" em Cristo de forma tão íntima quanto essa linguagem sugere?',
        'Como a comunhão (ceia) ajuda a tornar concreta essa intimidade que Jesus descreve aqui?',
      ],
    },
  },
  {
    prayer: {
      title: 'Um Coração Entendido',
      text: t(`Senhor, quando ofereceste a Salomão qualquer coisa que
        pedisse, ele não escolheu riquezas nem vida longa, mas "um
        coração entendido para julgar o teu povo... para discernir
        entre o bem e o mal." Ensina-me a reordenar minhas próprias
        prioridades de oração — pedindo, antes de conforto, a
        sabedoria para discernir bem nas decisões que tenho diante de
        mim. Amém.`),
    },
    meditation: {
      prompt: t(`Salomão pede sabedoria especificamente a serviço de
        outros — "para julgar o teu povo" — não para benefício próprio
        isolado; o pedido está enraizado em responsabilidade pelos
        outros.`),
      questions: [
        'Se Deus te oferecesse hoje qualquer coisa que pedisses, o que você pediria — e como isso se compara ao pedido de Salomão?',
        'Existe alguma decisão atual em que você precisa mais de discernimento do que de força de vontade?',
        'Como você pode orar, esta semana, por sabedoria a serviço de outros, não apenas para benefício próprio?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Que Não Pediste',
      text: t(`Senhor, além da sabedoria pedida, deste a Salomão "o
        que não pediste, assim riquezas como glória" — generosidade
        que excedeu o próprio pedido. Reconheço que muitas vezes peço
        pouco, limitado pela minha própria imaginação sobre o que é
        razoável esperar de ti. Ensina-me a pedir com ousadia o que
        realmente importa, confiando que a tua generosidade pode
        ultrapassar até mesmo os meus pedidos mais corajosos. Amém.`),
    },
    meditation: {
      prompt: t(`A generosidade de Deus a Salomão não substitui o
        pedido original por sabedoria — vem como adição a ele,
        sugerindo que buscar primeiro o que é certo não exclui
        receber também bênçãos adicionais não solicitadas.`),
      questions: [
        'Você tende a pedir pouco a Deus, limitado pela própria imaginação sobre o que é razoável?',
        'Que pedido "certo" você tem feito consistentemente que talvez venha acompanhado de bênçãos que você nem imaginava pedir?',
        'Como equilibrar pedir ousadamente com manter as prioridades certas, como Salomão fez ao pedir sabedoria antes de riqueza?',
      ],
    },
  },
  {
    prayer: {
      title: 'Dá Mantimento aos Que o Temem',
      text: t(`Senhor, o salmo celebra: "Dá mantimento aos que o
        temem; lembra-se sempre do seu pacto." E acrescenta: "O temor
        do Senhor é o princípio da sabedoria." Não é medo paralisante,
        mas reverência que orienta a vida inteira. Que essa reverência
        marque minhas decisões hoje, não como restrição, mas como
        fundamento de sabedoria genuína. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo une provisão prática ("dá mantimento") com
        reverência espiritual ("o temor do Senhor") — a sabedoria
        bíblica não separa o cuidado material do respeito reverente a
        Deus.`),
      questions: [
        'Sua compreensão do "temor do Senhor" é mais próxima de medo paralisante ou de reverência que orienta boas escolhas?',
        'Como você vê a provisão de Deus e a reverência a ele conectadas na sua própria vida?',
        'O que mudaria se você buscasse reverência genuína a Deus, em vez de apenas cumprimento externo de regras?',
      ],
    },
  },
  {
    prayer: {
      title: 'Enchei-vos do Espírito',
      text: t(`Senhor, Paulo pede: "não vos embriagueis com vinho, no
        qual há devassidão, mas enchei-vos do Espírito, falando entre
        vós em salmos, hinos, e cânticos espirituais... sempre dando
        graças por tudo." O contraste é entre duas formas de
        "enchimento" — uma que destrói, outra que edifica. Ajuda-me a
        buscar aquilo que realmente me preenche, não substitutos
        vazios. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo contrasta diretamente embriaguez e enchimento
        do Espírito — ambos alteram o estado de alguém, mas com
        resultados completamente opostos: devassidão de um lado,
        gratidão e louvor do outro.`),
      questions: [
        'Que "vinho" — substituto vazio, busca por alívio momentâneo — você tem usado para se "encher" de algo que não edifica?',
        'O que significaria, na prática, buscar ser "cheio do Espírito" da mesma forma intensa que outros buscam outros preenchimentos?',
        'Como cantar, agradecer e louvar poderiam se tornar hábitos mais constantes na sua vida diária?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vive Por Mim',
      text: t(`Senhor Jesus, disseste: "Assim como o Pai, que vive, me
        enviou, e eu vivo pelo Pai, assim, quem de mim se alimenta,
        também viverá por mim." Há uma cadeia de dependência vital —
        o Pai, o Filho, e quem se alimenta dele. Ajuda-me a viver essa
        mesma dependência consciente, não autossuficiência disfarçada
        de espiritualidade. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus descreve sua própria relação com o Pai
        ("eu vivo pelo Pai") como modelo para nossa relação com ele —
        dependência vital, não independência espiritual autossuficiente.`),
      questions: [
        'Você vive consciente dessa dependência vital de Cristo, ou tenta manter uma espiritualidade autossuficiente?',
        'O que significa, na prática, "viver por" Jesus — não apenas seguir regras, mas depender dele como fonte de vida?',
        'Como essa cadeia de dependência (Pai-Filho-você) muda a forma como você entende sua própria fé?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sabedoria e Vida Preenchida',
      text: t(`Senhor, esta semana trouxe a intimidade radical com
        Cristo, o pedido sábio de Salomão, e o convite a ser cheio do
        Espírito em vez de substitutos vazios. Termino pedindo: que eu
        busque, como Salomão, sabedoria acima de riquezas, e que eu
        viva, de fato, dependente de ti como fonte de vida real, não
        apenas religiosidade superficial. Amém.`),
    },
    meditation: {
      prompt: t(`Do pedido sábio de Salomão à intimidade radical
        pedida por Jesus, a semana revelou o mesmo convite: buscar o
        que realmente importa, não o que parece suficiente à primeira
        vista.`),
      questions: [
        'Qual dos temas desta semana — a intimidade com Cristo, a sabedoria de Salomão, ou ser cheio do Espírito — mais te desafiou?',
        'Que pedido ousado de sabedoria você quer fazer a Deus nesta semana que começa?',
        'Como você quer viver mais dependente de Cristo, e menos de substitutos que não edificam?',
      ],
    },
  },
];

// Próprio 16 — 1 Reis 8:(1,6,10-11), 22-30, 41-43 · Salmo 84 · Efésios 6:10-20 · João 6:56-69
const proper16: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Para Quem Iremos?',
      text: t(`Senhor Jesus, quando muitos discípulos, escandalizados
        com teu ensino difícil, "voltaram para trás e não andaram mais
        contigo", perguntaste aos doze: "Quereis vós também
        retirar-vos?" E Pedro respondeu: "Senhor, para quem iremos
        nós? Tu tens as palavras da vida eterna." Que essa mesma
        pergunta me ancore quando teu ensino for difícil demais para
        aceitar facilmente. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro não afirma ter compreendido totalmente o
        ensino difícil de Jesus — sua permanência se baseia não em
        entendimento completo, mas em não ter alternativa melhor: "para
        quem iremos?"`),
      questions: [
        'Existe algum ensino de Jesus que você acha difícil de aceitar totalmente, mas ainda assim escolhe permanecer com ele?',
        'O que significa, para você, permanecer na fé não porque entendeu tudo, mas porque não há lugar melhor para ir?',
        'Como a resposta de Pedro modela uma fé honesta, sem fingir compreensão que ainda não tem?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Glória do Senhor Encheu a Casa',
      text: t(`Senhor, quando o templo foi dedicado, "uma nuvem
        encheu a casa do Senhor; de modo que os sacerdotes não podiam
        ter-se em pé para ministrarem." A tua presença literalmente
        interrompeu o serviço religioso planejado — a glória excedeu
        os rituais preparados para recebê-la. Que eu esteja aberto a
        interrupções semelhantes na minha própria vida de adoração,
        quando tua presença exceder meus planos cuidadosos. Amém.`),
    },
    meditation: {
      prompt: t(`A glória de Deus não se ajustou às cerimônias
        planejadas pelos sacerdotes — ela as interrompeu, mostrando
        que a presença real de Deus sempre excede qualquer estrutura
        que tentamos criar para contê-la.`),
      questions: [
        'Você deixa espaço, na sua adoração, para que a presença de Deus interrompa seus planos cuidadosamente preparados?',
        'Já viveu um momento em que a presença de Deus excedeu completamente o que você esperava daquele culto ou oração?',
        'O que ajudaria você a estar mais aberto a essas interrupções sagradas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Habitaria Deus na Terra?',
      text: t(`Senhor, diante do templo recém-construído, Salomão fez
        a pergunta certa: "na verdade, habitaria Deus na terra? Eis
        que o céu, e até o céu dos céus, não te podem conter; quanto
        menos esta casa que edifiquei!" Mesmo tendo construído o
        templo mais glorioso de sua época, ele reconheceu que nenhuma
        estrutura humana poderia realmente te conter. Ensina-me essa
        mesma humildade diante de qualquer coisa que eu construa em
        teu nome. Amém.`),
    },
    meditation: {
      prompt: t(`Salomão, mesmo tendo investido anos e recursos
        imensos no templo, reconhece publicamente sua insuficiência
        diante da grandeza de Deus — humildade rara diante da própria
        obra concluída.`),
      questions: [
        'Você já construiu algo — ministério, projeto, estrutura — que, mesmo bem-feito, precisa da mesma humildade que Salomão demonstrou?',
        'O que significa reconhecer que nenhuma estrutura humana pode "conter" verdadeiramente a presença de Deus?',
        'Como essa humildade muda a forma como você trata os espaços e estruturas religiosas que você valoriza?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quão Amável São os Teus Tabernáculos',
      text: t(`Senhor, o salmista suspira: "Quão amável são os teus
        tabernáculos, ó Senhor dos exércitos! A minha alma suspira!
        sim, desfalece pelos átrios do Senhor." E acrescenta:
        "vale mais um dia nos teus átrios do que em outra parte mil."
        Que eu cultive esse mesmo desejo genuíno pela tua presença, não
        obrigação religiosa, mas anseio real. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem do salmo é fisicamente intensa — "a alma
        desfalece" — descrevendo um anseio pela presença de Deus tão
        real quanto fome ou sede física.`),
      questions: [
        'Sua relação com a presença de Deus se parece mais com obrigação cumprida ou com o anseio físico descrito neste salmo?',
        'O que significa para você que "vale mais um dia nos átrios do Senhor do que mil em outra parte"?',
        'Como você pode cultivar esse desejo genuíno pela presença de Deus, não apenas cumprimento de rotina religiosa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Toda a Armadura de Deus',
      text: t(`Senhor, Paulo pede que nos revistamos "de toda a
        armadura de Deus" para resistir "no dia mau" — a verdade
        como cinto, a justiça como couraça, o evangelho da paz como
        calçado, a fé como escudo, a salvação como capacete, e a
        Palavra como espada. Que eu não enfrente as batalhas
        espirituais desarmado, confiando apenas na minha própria
        força. Amém.`),
    },
    meditation: {
      prompt: t(`Cada peça da armadura descrita por Paulo corresponde
        a uma virtude específica — a imagem não é decorativa, mas
        estratégica: cada elemento espiritual protege uma vulnerabilidade
        específica na luta real.`),
      questions: [
        'Qual peça dessa armadura — verdade, justiça, paz, fé, salvação, Palavra — você tem negligenciado mais na sua vida espiritual?',
        'Que "dia mau" você está enfrentando, ou pode enfrentar em breve, que exige essa proteção completa?',
        'O que significaria, na prática, "vestir" essa armadura de forma intencional hoje, não apenas conhecer a metáfora?',
      ],
    },
  },
  {
    prayer: {
      title: 'Espírito e Vida',
      text: t(`Senhor Jesus, diante do escândalo dos discípulos com teu
        ensino difícil, esclareceste: "O espírito é o que vivifica, a
        carne para nada aproveita; as palavras que eu vos tenho dito
        são espírito e são vida." Ajuda-me a buscar sempre a
        substância espiritual por trás das tuas palavras, não apenas
        interpretações literais que perdem o real significado. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus esclarece que sua linguagem chocante sobre
        "comer carne e beber sangue" apontava para realidade
        espiritual, não instrução literal — um lembrete de que suas
        palavras sempre carregam profundidade além do sentido
        superficial.`),
      questions: [
        'Você já interpretou algo de Jesus de forma tão literal que perdeu o real significado espiritual pretendido?',
        'O que significa, para você, buscar "espírito e vida" nas palavras de Jesus, não apenas cumprimento superficial?',
        'Que ensino de Jesus você precisa reconsiderar com essa lente — buscando profundidade espiritual, não apenas literalidade?',
      ],
    },
  },
  {
    prayer: {
      title: 'Palavras da Vida Eterna',
      text: t(`Senhor, esta semana trouxe a fidelidade de Pedro
        mesmo sem compreensão total, a glória que excedeu o templo de
        Salomão, e a armadura completa que nos protege na batalha
        espiritual. Termino pedindo: que eu diga, como Pedro, "para
        quem iremos? Tu tens as palavras da vida eterna" — e que eu
        vista a armadura completa para os desafios que virão. Amém.`),
    },
    meditation: {
      prompt: t(`Da fidelidade humilde de Pedro à armadura completa de
        Efésios, a semana revelou que permanecer fiel exige tanto
        confiança simples quanto preparação intencional para a
        batalha espiritual real.`),
      questions: [
        'Qual dos temas desta semana — a fidelidade de Pedro, a glória que excedeu o templo, ou a armadura de Deus — mais tocou você?',
        'Que peça da armadura de Deus você quer vestir com mais intenção esta semana?',
        'Como você quer responder, nos próximos dias, à pergunta "para quem iremos?"',
      ],
    },
  },
];

// Próprio 17 — Cânticos 2:8-13 · Salmo 45:1-2, 6-9 · Tiago 1:17-27 · Marcos 7:1-8, 14-15, 21-23
const proper17: DevotionalEntry[] = [
  {
    prayer: {
      title: 'O Que Contamina Vem de Dentro',
      text: t(`Senhor Jesus, diante da crítica dos fariseus sobre mãos
        não lavadas, ensinaste que "nada há fora do homem que,
        entrando nele, possa contaminá-lo; mas o que sai do homem,
        isso é que o contamina." A pureza real é do coração, não de
        rituais externos. Examina meu próprio coração, de onde
        procedem "os maus pensamentos" — não apenas minhas ações
        visíveis. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não descarta toda prática ritual, mas reordena
        prioridades — o coração, não os rituais externos, é a fonte
        real da pureza ou impureza que importa a Deus.`),
      questions: [
        'Você tende a focar mais em aparência externa de piedade do que na condição real do seu coração?',
        'Qual dos "maus pensamentos" listados por Jesus (inveja, soberba, cobiça, entre outros) você reconhece mais em si mesmo?',
        'O que significaria, na prática, cuidar mais da raiz interior do que da aparência religiosa externa?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Voz do Meu Amado',
      text: t(`Senhor, a poesia de Cânticos descreve um amado que
        chama: "Levanta-te, amada minha, formosa minha, e vem." É
        imagem de amor que convida, não que exige — que celebra a
        chegada da primavera, o florescer, o canto das aves. Que eu
        reconheça, na minha própria vida espiritual, esse mesmo
        convite amoroso a te seguir, não obrigação fria. Amém.`),
    },
    meditation: {
      prompt: t(`A tradição cristã sempre leu Cânticos também como
        alegoria do amor de Deus pelo seu povo — um convite alegre e
        florescente, não uma exigência pesada.`),
      questions: [
        'Sua relação com Deus se parece mais com convite amoroso ou obrigação pesada?',
        'Que "inverno" — período difícil ou distante espiritualmente — você sente que já passou, dando lugar a um novo florescer?',
        'Como você pode responder hoje ao convite "levanta-te e vem" que Deus faz à sua vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Graça Se Derramou nos Teus Lábios',
      text: t(`Senhor, o salmo celebra um rei cujos lábios têm graça
        derramada, cujo trono é de equidade, que "amou a justiça e
        odiou a iniquidade." A tradição cristã lê nesse retrato uma
        antecipação de Cristo, o Rei perfeito. Que eu busque, na
        minha própria fala e liderança, ainda que imperfeita, refletir
        algo dessa graça e justiça combinadas. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo une graça na fala e justiça na ação — um
        retrato de liderança que não separa gentileza de retidão,
        modelo tanto para reis quanto para qualquer posição de
        influência.`),
      questions: [
        'Sua fala tende mais para a graça ou você às vezes sacrifica gentileza em nome de estar "certo"?',
        'Como você pode unir, hoje, graça e justiça numa situação específica onde você tem influência?',
        'O que esse retrato do rei ideal revela sobre o próprio caráter de Cristo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Toda Boa Dádiva Vem do Alto',
      text: t(`Senhor, Tiago escreve: "Toda boa dádiva e todo dom
        perfeito vêm do alto, descendo do Pai das luzes, em quem não
        há mudança nem sombra de variação." Diferente de tantas coisas
        instáveis ao meu redor, tu és constante. Que eu reconheça,
        hoje, as boas dádivas que já recebi de ti, atribuindo-as
        corretamente à sua verdadeira fonte. Amém.`),
    },
    meditation: {
      prompt: t(`Tiago contrasta a constância de Deus ("não há mudança
        nem sombra de variação") com a instabilidade de tudo mais na
        vida — uma âncora segura em meio à mudança constante.`),
      questions: [
        'Você reconhece as boas coisas da sua vida como dádivas vindas de Deus, ou tende a atribuí-las apenas ao próprio esforço ou sorte?',
        'Em que área da sua vida você mais precisa da constância de Deus, diante de tanta instabilidade ao redor?',
        'Que "boa dádiva" recente você ainda não parou para agradecer a Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cumpridores da Palavra',
      text: t(`Senhor, Tiago adverte: "sede cumpridores da palavra e
        não somente ouvintes, enganando-vos a vós mesmos." Comparou
        quem ouve sem praticar a alguém que se olha no espelho e
        esquece imediatamente o que viu. Examina se a minha própria
        relação com a tua Palavra tem sido de prática consistente ou
        apenas de audição passageira. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem do espelho é precisa — ver algo claramente
        (ouvir a Palavra) sem que isso produza mudança real (praticá-
        la) é, segundo Tiago, um tipo específico de autoengano.`),
      questions: [
        'Você reconhece em si mesmo esse padrão — ouvir claramente algo importante e esquecer rapidamente sem agir?',
        'Que verdade específica da Palavra você ouviu recentemente mas ainda não colocou em prática?',
        'O que ajudaria você a se tornar mais "cumpridor" e menos apenas "ouvinte" da Palavra?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vós Deixais o Mandamento de Deus',
      text: t(`Senhor Jesus, criticaste os fariseus por trocarem "o
        mandamento de Deus" pela "tradição dos homens" — regras
        acumuladas ao longo do tempo que, sem perceber, substituíram o
        que realmente importava. Examina se há tradições ou hábitos
        religiosos meus que, com o tempo, se tornaram substitutos
        confortáveis para obediência real ao que tu realmente pedes.
        Amém.`),
    },
    meditation: {
      prompt: t(`As tradições que Jesus critica não eram
        necessariamente más em sua origem — o problema era terem se
        tornado, com o tempo, mais importantes que o próprio
        mandamento que deveriam servir.`),
      questions: [
        'Existe algum hábito ou tradição religiosa sua que, sem perceber, se tornou mais importante do que o mandamento original que ela deveria servir?',
        'Como você distingue entre tradição saudável e tradição que substitui obediência genuína?',
        'O que ajudaria você a reavaliar periodicamente se suas práticas religiosas ainda servem ao seu propósito original?',
      ],
    },
  },
  {
    prayer: {
      title: 'Coração Puro, Palavra Praticada',
      text: t(`Senhor, esta semana trouxe a pureza que vem de dentro,
        o convite amoroso de Cânticos, e o chamado a ser praticante,
        não só ouvinte, da Palavra. Termino pedindo: que eu cuide do
        meu coração mais do que da minha aparência religiosa, e que eu
        pratique o que ouço, não apenas o admire de longe. Amém.`),
    },
    meditation: {
      prompt: t(`Da pureza interior ao convite amoroso, a semana
        revelou que fé genuína começa no coração e se expressa em
        prática consistente, não em aparência religiosa cuidadosamente
        mantida.`),
      questions: [
        'Qual dos temas desta semana — a pureza do coração, o convite amoroso, ou ser praticante da Palavra — mais te desafiou?',
        'Que verdade específica você quer colocar em prática nesta semana que começa?',
        'Como você quer cuidar do seu coração, não apenas da sua aparência religiosa, nos próximos dias?',
      ],
    },
  },
];

// Próprio 18 — Provérbios 22:1-2, 8-9, 22-23 · Salmo 125 · Tiago 2:1-10, (11-13), 14-17 · Marcos 7:24-37
const proper18: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Efatá — Abre-te',
      text: t(`Senhor Jesus, diante de um homem surdo e com
        dificuldade para falar, disseste apenas: "Efatá" — Abre-te. E
        seus ouvidos se abriram, sua língua se soltou. Há em mim
        áreas que também precisam dessa mesma palavra — ouvidos
        fechados para o que preciso escutar, línguas presas para o que
        preciso dizer. Fala essa mesma palavra sobre mim hoje. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus toca o homem de forma pessoal e física — dedos
        nos ouvidos, saliva na língua — antes de pronunciar a palavra
        de cura, um cuidado individual que precede o milagre.`),
      questions: [
        'Que "surdez" espiritual — dificuldade de ouvir a verdade, seja de Deus ou de outros — você reconhece em si mesmo?',
        'Que "língua presa" — algo que você precisa dizer mas ainda não conseguiu — precisa ser solta?',
        'O que significaria, hoje, pedir a Jesus a mesma palavra "Efatá" sobre uma área específica da sua vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Migalhas dos Filhos',
      text: t(`Senhor Jesus, quando a mulher siro-fenícia pediu que
        curasses sua filha, tua resposta inicial pareceu dura — e
        ainda assim ela persistiu com humildade e engenho: "até os
        cachorrinhos debaixo da mesa comem das migalhas dos filhos."
        Sua fé humilde e persistente conquistou a resposta que
        buscava. Ensina-me essa mesma persistência humilde diante do
        que parece, à primeira vista, silêncio ou recusa. Amém.`),
    },
    meditation: {
      prompt: t(`A mulher não se ofendeu com a resposta inicial de
        Jesus — ela a usou como ponto de partida para um argumento
        ainda mais humilde e persistente, transformando o
        desafio em oportunidade.`),
      questions: [
        'Você já desistiu de pedir algo a Deus diante de uma resposta inicial que pareceu negativa ou silenciosa?',
        'O que você poderia aprender da persistência humilde desta mulher, que não desistiu nem se ofendeu?',
        'Por quem você precisa interceder hoje com essa mesma persistência corajosa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Roubes ao Pobre Porque É Pobre',
      text: t(`Senhor, Provérbios adverte: "Não roubes ao pobre, porque
        é pobre; nem oprimas ao aflito na porta; porque o Senhor
        defenderá a sua causa em juízo." Tu te posicionas ativamente
        do lado de quem não tem poder para se defender sozinho.
        Examina se, de alguma forma, tenho me beneficiado da
        vulnerabilidade alheia, e ajuda-me a ser, em vez disso, defensor
        do que não pode se defender. Amém.`),
    },
    meditation: {
      prompt: t(`O texto não apenas proíbe a opressão explícita — ele
        afirma que Deus mesmo assume a defesa da causa do pobre,
        tornando a opressão do vulnerável um assunto pessoal para
        Deus.`),
      questions: [
        'Você já se beneficiou, mesmo indiretamente, de estruturas que oprimem quem tem menos poder?',
        'Como você pode ser, hoje, defensor ativo de alguém vulnerável em vez de espectador passivo?',
        'O que significa para você que Deus "defenderá a causa" do oprimido pessoalmente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Como o Monte Sião',
      text: t(`Senhor, o salmo compara quem confia em ti a "o monte
        Sião, que não pode ser abalado, mas permanece para sempre."
        Assim como os montes cercam Jerusalém protegendo-a, tu cercas
        o teu povo. Em meio às instabilidades que enfrento, que eu
        encontre essa mesma firmeza inabalável ao confiar em ti. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem geográfica — montes literais ao redor de
        Jerusalém — se torna metáfora espiritual de proteção
        constante, algo visível transformado em lembrete de realidade
        invisível.`),
      questions: [
        'O que ameaça hoje sua sensação de estabilidade e firmeza?',
        'Como a imagem dos montes ao redor de Jerusalém ilustra a proteção constante de Deus ao seu redor?',
        'O que significaria confiar, hoje, com a mesma firmeza descrita neste salmo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Façais Acepção de Pessoas',
      text: t(`Senhor, Tiago repreende quem trata com honra o rico de
        traje esplêndido e com desprezo o pobre de traje sórdido —
        "não fazeis, porventura, distinção entre vós mesmos?" Examina
        as vezes em que julgo ou trato pessoas de forma diferente
        baseado em aparência, status ou recursos. Que eu veja cada
        pessoa como tu a vês. Amém.`),
    },
    meditation: {
      prompt: t(`Tiago descreve uma cena bem específica e reconhecível
        — favorecimento visível baseado em aparência — sugerindo que
        esse tipo de discriminação era (e continua sendo) comum mesmo
        em comunidades de fé.`),
      questions: [
        'Você já tratou alguém de forma diferente — melhor ou pior — baseado em aparência, status ou recursos?',
        'Como sua comunidade de fé lida com pessoas de diferentes classes sociais ou aparências?',
        'O que ajudaria você a ver e tratar cada pessoa com igual dignidade, independente de aparência externa?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Fé Sem Obras É Morta',
      text: t(`Senhor, Tiago pergunta: "Que proveito há, meus irmãos,
        se alguém disser que tem fé e não tiver obras?" E conclui
        que a fé desacompanhada de ação concreta "está morta." Examina
        minha própria fé: ela se traduz em cuidado real por quem
        precisa, ou permanece apenas em convicção intelectual? Amém.`),
    },
    meditation: {
      prompt: t(`Tiago não opõe fé e obras como caminhos alternativos
        de salvação — ele descreve obras como evidência necessária de
        que a fé professada é genuína, não substituto para ela.`),
      questions: [
        'Sua fé tem se traduzido em ação concreta recentemente, ou permanece mais no campo da convicção intelectual?',
        'Existe alguém com necessidade material ao seu redor que sua fé, se genuína, deveria te mover a ajudar?',
        'O que significaria, hoje, traduzir uma convicção de fé em ação prática específica?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ouvidos Abertos, Fé em Ação',
      text: t(`Senhor, esta semana trouxe a palavra "Efatá" que abre
        ouvidos fechados, a persistência humilde da mulher
        siro-fenícia, e o chamado a uma fé que se traduz em obras
        concretas. Termino pedindo: que meus próprios ouvidos se abram
        mais para o que precisas me dizer, e que minha fé produza ação
        real por quem precisa. Amém.`),
    },
    meditation: {
      prompt: t(`Da cura física de um surdo à advertência sobre fé sem
        obras, a semana revelou o mesmo princípio: fé genuína sempre se
        manifesta em algo concreto e perceptível, não permanece
        abstrata.`),
      questions: [
        'Qual dos temas desta semana — "Efatá", a persistência da mulher, ou a fé com obras — mais te desafiou?',
        'Que ação concreta sua fé precisa produzir nesta semana que começa?',
        'Como você quer viver, nos próximos dias, sem "acepção de pessoas" no seu tratamento aos outros?',
      ],
    },
  },
];

// Próprio 19 — Provérbios 1:20-33 · Salmo 19 · Tiago 3:1-12 · Marcos 8:27-38
const proper19: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Quem Dizeis Que Eu Sou?',
      text: t(`Senhor Jesus, perguntaste aos discípulos: "Vós, quem
        dizeis que eu sou?" e Pedro respondeu: "Tu és o Cristo." Mas
        quando anunciaste que precisarias sofrer e morrer, o mesmo
        Pedro te repreendeu, e ouviu de volta: "Para trás de mim,
        Satanás." Confessar corretamente quem és não garante
        compreender corretamente o que vieste fazer. Ajuda-me a
        aceitar não só a tua identidade, mas o teu caminho. Amém.`),
    },
    meditation: {
      prompt: t(`A confissão certa de Pedro (v.29) é seguida, poucos
        versículos depois, pela repreensão mais dura que Jesus dá a um
        discípulo — mostrando que fé correta em teoria não garante
        aceitação do caminho difícil na prática.`),
      questions: [
        'Se Jesus te perguntasse hoje "quem tu dizes que eu sou", sua resposta viria de convicção própria ou repetição aprendida?',
        'Você já aceitou a identidade de Jesus, mas resistiu ao caminho difícil que ele pede de você, como Pedro fez?',
        'O que significaria, hoje, "negar-se a si mesmo e tomar a cruz" numa área concreta da sua vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Sabedoria Clama nas Ruas',
      text: t(`Senhor, a sabedoria em Provérbios não espera
        passivamente ser procurada — ela "altissonantemente clama nas
        ruas... até quando, ó estúpidos, amareis a estupidez?" Ela é
        acessível, pública, insistente. Ajuda-me a não fingir que não
        ouço quando a sabedoria clama através da tua Palavra, de
        conselhos sábios, ou das consequências das minhas próprias
        escolhas passadas. Amém.`),
    },
    meditation: {
      prompt: t(`A sabedoria é personificada clamando publicamente,
        não escondida em lugar secreto — a advertência não é sobre
        falta de acesso, mas sobre recusa em ouvir o que já está
        disponível.`),
      questions: [
        'Existe algum conselho sábio que você tem ouvido repetidamente, mas continuado a ignorar?',
        'Como a sabedoria de Deus tem "clamado" na sua vida — através da Palavra, de pessoas, ou de consequências?',
        'O que ajudaria você a responder à sabedoria antes que ela precise "rir" de você no dia da calamidade, como o texto adverte?',
      ],
    },
  },
  {
    prayer: {
      title: 'Os Céus Proclamam a Glória de Deus',
      text: t(`Senhor, o salmo declara que "os céus proclamam a glória
        de Deus" sem palavras audíveis, e logo depois celebra tua lei:
        "perfeita... fiel... reta... pura... mais doces do que o mel."
        A revelação da criação e a revelação da Palavra caminham
        juntas. Ajuda-me a ouvir tua voz tanto na grandeza do céu
        quanto na disciplina de estudar tua Palavra. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo termina pedindo purificação de "pecados de
        presunção" — depois de contemplar a grandeza cósmica e a lei
        perfeita, o salmista se volta à humildade pessoal diante
        delas.`),
      questions: [
        'Quando foi a última vez que você parou, de verdade, para contemplar a criação como testemunho da glória de Deus?',
        'Sua relação com a Palavra de Deus se parece mais com "doce como mel" ou com obrigação cansativa?',
        'Que "pecado de presunção" você precisa trazer à luz hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Língua É um Fogo',
      text: t(`Senhor, Tiago adverte com força incomum: "a língua
        também é um fogo... nenhum homem a pode domar. É um mal
        irrefreável." Reconheço o poder das minhas próprias palavras
        para construir ou destruir, abençoar ou ferir. Ajuda-me a
        buscar em ti o controle que não consigo alcançar sozinho sobre
        minha própria fala. Amém.`),
    },
    meditation: {
      prompt: t(`Tiago é notavelmente pessimista sobre a capacidade
        humana de controlar a língua sozinha — reconhecer essa
        limitação é o primeiro passo para buscar ajuda genuína, não
        apenas força de vontade.`),
      questions: [
        'Que dano recente você causou, ou quase causou, com suas próprias palavras?',
        'Você concorda com a avaliação pessimista de Tiago sobre a dificuldade de controlar a língua sozinho?',
        'O que significaria buscar em Deus, e não apenas em esforço próprio, o controle sobre sua própria fala?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bênção e Maldição da Mesma Boca',
      text: t(`Senhor, Tiago observa a incoerência: "Com ela bendizemos
        ao Senhor e Pai, e com ela amaldiçoamos os homens, feitos à
        semelhança de Deus... não convém, meus irmãos, que se faça
        assim." Examina onde a mesma boca que te louva também fere
        pessoas feitas à tua imagem. Que a coerência entre adoração e
        fala cotidiana se torne real em mim. Amém.`),
    },
    meditation: {
      prompt: t(`Tiago conecta diretamente o tratamento das pessoas ao
        louvor de Deus — amaldiçoar alguém "feito à semelhança de
        Deus" é, de certa forma, incoerente com o próprio louvor
        dirigido a Deus.`),
      questions: [
        'Você já percebeu essa incoerência em si mesmo — louvar a Deus e, na mesma respiração, falar mal de alguém?',
        'Como o fato de que toda pessoa é "feita à semelhança de Deus" muda a forma como você fala sobre os outros?',
        'Que mudança concreta na sua fala você quer buscar depois de refletir nesse texto?',
      ],
    },
  },
  {
    prayer: {
      title: 'Negue-se a Si Mesmo',
      text: t(`Senhor Jesus, ensinaste: "Se alguém quer vir após mim,
        negue-se a si mesmo, tome a sua cruz, e siga-me. Pois quem
        quiser salvar a sua vida, perdê-la-á." O caminho que ofereces
        contradiz a lógica de autopreservação que normalmente sigo.
        Ajuda-me a confiar que perder a vida por amor de ti e do
        evangelho é, na verdade, encontrá-la de verdade. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus apresenta um paradoxo central do discipulado —
        tentar preservar a própria vida a todo custo é o caminho que
        realmente a perde; entregá-la é o caminho que a salva.`),
      questions: [
        'Onde você tem tentado "salvar sua vida" — proteger conforto, reputação, segurança — de um jeito que, segundo Jesus, na verdade a perde?',
        'O que significaria, hoje, "negar-se a si mesmo" numa decisão concreta?',
        'Como você entende a diferença entre autopreservação saudável e a resistência ao chamado de Jesus que ele descreve aqui?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cristo e Cruz, Palavra e Fala',
      text: t(`Senhor, esta semana trouxe a confissão de Pedro seguida
        de sua resistência à cruz, a sabedoria que clama nas ruas, e a
        advertência severa sobre o poder da língua. Termino pedindo:
        que eu aceite não só quem tu és, mas o caminho que pedes, e
        que minha fala reflita coerência com o louvor que te ofereço.
        Amém.`),
    },
    meditation: {
      prompt: t(`Da confissão de Pedro à advertência sobre a língua, a
        semana revelou que fé genuína exige coerência total — entre
        crença e ação, entre louvor e fala cotidiana.`),
      questions: [
        'Qual dos temas desta semana — a cruz que Pedro resistiu, a sabedoria que clama, ou o poder da língua — mais tocou você?',
        'Que "cruz" você precisa aceitar, em vez de resistir, nesta semana que começa?',
        'Como você quer buscar mais coerência entre sua fé e sua fala nos próximos dias?',
      ],
    },
  },
];

// Próprio 20 — Provérbios 31:10-31 · Salmo 1 · Tiago 3:13-4:3, 7-8a · Marcos 9:30-37
const proper20: DevotionalEntry[] = [
  {
    prayer: {
      title: 'O Servo de Todos',
      text: t(`Senhor Jesus, quando os discípulos discutiam, no
        caminho, quem era o maior, sentaste-te e disseste: "se alguém
        quiser ser o primeiro, será o derradeiro de todos e o servo de
        todos." E tomando uma criança nos braços, mostraste que
        receber os pequenos é receber a ti mesmo. Reordena minha
        própria noção de grandeza — não posição alcançada, mas
        serviço oferecido. Amém.`),
    },
    meditation: {
      prompt: t(`Os discípulos discutiam em segredo, envergonhados —
        "eles se calaram" quando perguntados — sugerindo que já
        sabiam, no fundo, que sua ambição contradizia o que Jesus
        ensinava.`),
      questions: [
        'Você já discutiu, mesmo silenciosamente consigo mesmo, sobre quem "merece mais" reconhecimento em alguma situação?',
        'O que significa, na prática hoje, "receber uma criança" — valorizar quem tem menos poder ou status?',
        'Como você pode reordenar, esta semana, sua própria busca por reconhecimento?',
      ],
    },
  },
  {
    prayer: {
      title: 'Mulher Virtuosa, Quem a Pode Achar?',
      text: t(`Senhor, o retrato da mulher virtuosa em Provérbios
        celebra trabalho diligente, sabedoria prática, generosidade
        com o pobre, e força de caráter — "a força e a dignidade são
        os seus vestidos." Não é beleza passageira que se celebra,
        mas caráter constante. Que eu valorize e cultive esse mesmo
        tipo de virtude duradoura, não aparência temporária. Amém.`),
    },
    meditation: {
      prompt: t(`O poema hebraico original é um acróstico — cada
        verso começa com uma letra sucessiva do alfabeto — sugerindo
        um retrato completo e cuidadosamente construído de caráter
        integral, não elogio superficial.`),
      questions: [
        'Que qualidades deste retrato — diligência, sabedoria, generosidade, força de caráter — você mais admira e busca cultivar?',
        'Como nossa cultura valoriza (ou desvaloriza) esse tipo de virtude duradoura em comparação com aparência passageira?',
        'Que ato concreto de diligência ou generosidade você pode praticar hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Como Árvore Plantada Junto às Águas',
      text: t(`Senhor, o salmo descreve o bem-aventurado como quem
        "tem seu prazer na lei do Senhor, e na sua lei medita de dia e
        noite" — comparado a uma árvore plantada junto às correntes de
        águas, que dá fruto no tempo certo. Ajuda-me a cultivar esse
        mesmo hábito de meditação contínua na tua Palavra, raiz
        profunda que sustenta fruto duradouro. Amém.`),
    },
    meditation: {
      prompt: t(`A árvore do salmo não produz fruto imediatamente após
        ser plantada — a imagem sugere tempo de enraizamento antes da
        fruta aparecer "na estação própria".`),
      questions: [
        'Sua meditação na Palavra tem sido raiz constante ou esforço esporádico apenas em momentos de crise?',
        'O que significaria plantar-se, esta semana, "junto às correntes de águas" de forma mais intencional?',
        'Que fruto você espera que essa raiz produza, com paciência, ao longo do tempo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sabedoria do Alto',
      text: t(`Senhor, Tiago contrasta a sabedoria "terrena, animal,
        diabólica" — marcada por inveja e contenda — com a "sabedoria
        do alto", que é "pura, pacífica, moderada, tratável, cheia de
        misericórdia e de bons frutos." Examina de qual sabedoria eu
        tenho vivido mais próximo, e reorienta-me para a que vem de
        ti. Amém.`),
    },
    meditation: {
      prompt: t(`Tiago não trata sabedoria apenas como acúmulo de
        conhecimento, mas como caráter demonstrado — a verdadeira
        sabedoria se prova por seus frutos práticos, não por
        argumentação impressionante.`),
      questions: [
        'Você reconhece em si mesmo mais frutos da "sabedoria terrena" (inveja, contenda) ou da "sabedoria do alto" (paz, misericórdia)?',
        'Existe alguma disputa ou rivalidade atual em sua vida onde você poderia escolher a sabedoria pacífica em vez da contenciosa?',
        'O que significaria buscar, hoje, sabedoria "cheia de misericórdia e de bons frutos" numa decisão específica?',
      ],
    },
  },
  {
    prayer: {
      title: 'De Onde Vêm as Guerras?',
      text: t(`Senhor, Tiago pergunta com franqueza: "de onde vêm as
        guerras e contendas entre vós? porventura não vêm disto, a
        saber, dos vossos deleites, que nos vossos membros
        guerreiam?" Muitos conflitos externos nascem de desejos
        internos não examinados. Examina meus próprios desejos que
        alimentam conflitos, e ajuda-me a submetê-los a ti. Amém.`),
    },
    meditation: {
      prompt: t(`Tiago localiza a origem dos conflitos externos
        (guerras, contendas) em desejos internos não resolvidos — uma
        análise que pede autoexame antes de culpar circunstâncias
        externas.`),
      questions: [
        'Existe um conflito atual em sua vida cuja raiz real está mais em um desejo interno seu do que na situação externa?',
        'Como você pode praticar "submeter-se a Deus" e "resistir ao diabo" (v.7) de forma concreta diante desse conflito?',
        'O que ajudaria você a examinar seus próprios desejos antes de atribuir conflitos apenas a fatores externos?',
      ],
    },
  },
  {
    prayer: {
      title: 'Qualquer Que Me Recebe',
      text: t(`Senhor Jesus, ao tomar uma criança nos braços, disseste:
        "Qualquer que em meu nome receber uma destas crianças, a mim
        me recebe." Tu te identificas com quem tem menos poder,
        menos voz, menos reconhecimento social. Ensina-me a ver e
        acolher essas pessoas com o mesmo cuidado que ofereceria a ti
        mesmo. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus escolhe deliberadamente a criança — sem poder
        social, sem voz pública na cultura da época — como
        representante de si mesmo, invertendo as categorias de
        importância que os discípulos discutiam.`),
      questions: [
        'Quem, ao seu redor, ocupa hoje o lugar da "criança" — sem voz, sem poder, facilmente ignorado?',
        'Como você poderia, concretamente esta semana, "receber" essa pessoa com o cuidado que ofereceria a Jesus?',
        'O que essa identificação de Jesus com os pequenos ensina sobre onde ele realmente está presente hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Servo de Todos, Sabedoria do Alto',
      text: t(`Senhor, esta semana trouxe o chamado a ser servo de
        todos, o retrato da mulher de caráter constante, e a sabedoria
        pacífica que contrasta com a contenda. Termino pedindo: que eu
        busque grandeza através do serviço, não da posição, e que eu
        viva pela sabedoria que vem do alto. Amém.`),
    },
    meditation: {
      prompt: t(`Do chamado a servir à sabedoria pacífica, a semana
        revelou o mesmo padrão: verdadeira grandeza e sabedoria se
        provam em humildade prática, não em busca de reconhecimento.`),
      questions: [
        'Qual dos temas desta semana — o servo de todos, a mulher virtuosa, ou a sabedoria pacífica — mais te desafiou?',
        'Que conflito você quer resolver com sabedoria do alto, não com contenda, nesta semana?',
        'Como você quer praticar serviço concreto a alguém "pequeno" nos próximos dias?',
      ],
    },
  },
];

// Próprio 21 — Ester 7:1-6, 9-10; 9:20-22 · Salmo 124 · Tiago 5:13-20 · Marcos 9:38-50
const proper21: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Quem Não É Contra Nós É Por Nós',
      text: t(`Senhor Jesus, quando João te contou que proibiram um
        homem de expulsar demônios em teu nome "porque não nos
        seguia", corrigiste: "Não lho proibais... quem não é contra
        nós, é por nós." Livra-me do espírito de exclusividade que
        rejeita o bem feito em teu nome só porque não veio do meu
        próprio grupo. Amém.`),
    },
    meditation: {
      prompt: t(`João parecia motivado por proteger a exclusividade do
        grupo de discípulos — Jesus corrige essa instinto tribal com
        uma visão mais ampla de quem realmente serve ao Reino.`),
      questions: [
        'Você já rejeitou o bem feito por alguém só porque não pertencia ao seu próprio grupo, denominação ou comunidade?',
        'O que ajudaria você a reconhecer e celebrar o Reino de Deus operando fora dos limites do seu próprio círculo?',
        'Como você pode praticar, hoje, mais generosidade com quem serve a Deus de forma diferente da sua?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se Eu Tenho Alcançado o Teu Favor',
      text: t(`Senhor, Ester, arriscando a própria vida, interveio
        diante do rei com humildade e coragem: "se eu tenho alcançado
        o teu favor... seja-me concedida a minha vida... e o meu
        povo." Ela usou a posição que tinha para defender quem não
        podia se defender sozinho. Ensina-me essa mesma disposição de
        arriscar posição e conforto por amor de quem precisa. Amém.`),
    },
    meditation: {
      prompt: t(`Ester não usou sua posição de rainha para benefício
        próprio, mas para intervir por seu povo ameaçado — poder
        exercido em serviço, não em autopreservação.`),
      questions: [
        'Que posição, influência ou privilégio você tem que poderia usar em defesa de alguém vulnerável, como Ester fez?',
        'O que impede você de arriscar conforto ou segurança por uma causa justa?',
        'Como você distingue entre prudência sábia e covardia disfarçada de prudência?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Queda de Hamã',
      text: t(`Senhor, a forca que Hamã preparou para Mardoqueu acabou
        sendo usada nele mesmo — "enforcaram-no na forca que ele tinha
        preparado." A justiça tem um jeito de se voltar contra quem a
        distorce para seu próprio benefício malicioso. Que eu confie
        que a justiça final está em tuas mãos, não nas minhas
        tentativas de vingança. Amém.`),
    },
    meditation: {
      prompt: t(`A ironia da narrativa — Hamã morrendo na própria
        armadilha que preparou — é comum em histórias bíblicas de
        justiça: o mal frequentemente se volta contra quem o pratica.`),
      questions: [
        'Você já viu, na sua própria experiência, alguma forma de injustiça se voltar contra quem a cometeu?',
        'Como essa história muda a forma como você lida com o desejo de vingança contra alguém que te prejudicou?',
        'O que significa confiar a justiça final a Deus, em vez de tentar executá-la você mesmo?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Nosso Socorro Está no Nome do Senhor',
      text: t(`Senhor, o salmo declara: "Se não fora o Senhor, que
        esteve ao nosso lado... eles nos teriam tragado vivos." E
        conclui: "O nosso socorro está no nome do Senhor, que fez os
        céus e a terra." Reconheço momentos em que, sem a tua
        intervenção, teria sido consumido por circunstâncias maiores
        do que eu. Obrigado por estares ao meu lado. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo é retrospectivo — só se percebe plenamente o
        livramento depois de atravessá-lo, e o hábito de contá-lo
        publicamente ("ora diga Israel") fortalece a fé de toda a
        comunidade.`),
      questions: [
        'Existe um "se não fora o Senhor" na sua própria história que você raramente conta a outras pessoas?',
        'Como contar esse testemunho poderia fortalecer a fé de alguém passando por algo parecido agora?',
        'O que ajuda você a lembrar, no meio de uma dificuldade atual, dos livramentos passados?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Súplica de um Justo Pode Muito',
      text: t(`Senhor, Tiago escreve: "A súplica de um justo pode muito
        na sua atuação. Elias era homem sujeito às mesmas paixões que
        nós" — e ainda assim suas orações mudaram o clima por anos.
        Ensina-me a orar com essa mesma expectativa real, não como
        formalidade vazia, mas confiando que a oração genuinamente
        importa e muda coisas. Amém.`),
    },
    meditation: {
      prompt: t(`Tiago enfatiza deliberadamente a humanidade comum de
        Elias — "sujeito às mesmas paixões que nós" — para que ninguém
        pense que orações poderosas exigem status espiritual especial,
        apenas fé genuína.`),
      questions: [
        'Você ora com a expectativa real de que a oração muda coisas, ou mais como ritual formal sem convicção prática?',
        'Como a humanidade comum de Elias — "sujeito às mesmas paixões que nós" — muda sua confiança na sua própria oração?',
        'Que oração específica você quer fazer hoje com renovada expectativa de que ela "pode muito"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tende Sal em Vós Mesmos',
      text: t(`Senhor Jesus, terminaste um ensino difícil sobre
        tropeços com uma imagem inesperada: "Tende sal em vós mesmos, e
        guardai a paz uns com os outros." O sal preserva e dá sabor —
        que a minha própria vida, mesmo em meio a advertências
        sérias sobre o pecado, mantenha esse tempero de preservação e
        paz na comunidade. Amém.`),
    },
    meditation: {
      prompt: t(`A conclusão sobre paz surge logo depois de imagens
        drásticas sobre tropeço e julgamento — o sal, que preserva e
        conecta, é o antídoto necessário depois de tanta advertência
        severa.`),
      questions: [
        'Como você mantém "sal em si mesmo" — caráter que preserva e dá sabor — mesmo diante de advertências difíceis sobre pecado?',
        'Onde você precisa "guardar a paz" hoje, especialmente depois de um confronto necessário sobre algo sério?',
        'O que significa, para você, ser alguém que preserva relacionamentos em vez de apenas apontar erros?',
      ],
    },
  },
  {
    prayer: {
      title: 'Coragem de Ester, Oração de Elias',
      text: t(`Senhor, esta semana trouxe a inclusão generosa que
        Jesus ensinou, a coragem de Ester ao interceder por seu povo,
        e a súplica poderosa de Elias, homem comum. Termino pedindo:
        que eu reconheça o bem feito fora do meu círculo, que eu
        arrisque por quem precisa de defesa, e que eu ore com
        expectativa real de que Deus responde. Amém.`),
    },
    meditation: {
      prompt: t(`Da generosidade inclusiva de Jesus à coragem de
        Ester, a semana revelou o mesmo padrão: fé genuína ultrapassa
        limites tribais e arrisca conforto por amor de quem precisa
        de defesa.`),
      questions: [
        'Qual dos temas desta semana — a inclusão generosa, a coragem de Ester, ou a oração poderosa de Elias — mais tocou você?',
        'Por quem você quer interceder com coragem nesta semana que começa?',
        'Como você quer viver, nos próximos dias, com mais generosidade em relação a quem serve a Deus de forma diferente da sua?',
      ],
    },
  },
];

// Próprio 22 — Jó 1:1, 2:1-10 · Salmo 26 · Hebreus 1:1-4, 2:5-12 · Marcos 10:2-16
const proper22: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Deixai Vir a Mim as Crianças',
      text: t(`Senhor Jesus, quando os discípulos repreenderam os que
        traziam crianças para que as tocasses, "indignaste-te" e
        disseste: "Deixai vir a mim as crianças, e não as impeçais,
        porque de tais é o reino de Deus." A tua indignação diante da
        exclusão dos pequenos revela algo importante sobre teu
        coração. Ajuda-me a nunca ser barreira entre alguém pequeno,
        vulnerável ou desconsiderado e ti mesmo. Amém.`),
    },
    meditation: {
      prompt: t(`Este é um dos poucos momentos em que os Evangelhos
        registram Jesus explicitamente "indignado" — reservado para a
        exclusão de crianças, revelando o quanto isso importava a
        ele.`),
      questions: [
        'Você já foi, sem perceber, uma "barreira" entre alguém pequeno ou vulnerável e o acesso a Deus ou a uma comunidade de fé?',
        'O que significa "receber o reino de Deus como criança" — com que qualidade específica de dependência ou confiança?',
        'Quem você pode ajudar a "vir a Jesus" hoje, em vez de impedir?',
      ],
    },
  },
  {
    prayer: {
      title: 'Homem Íntegro e Reto',
      text: t(`Senhor, Jó é descrito como "íntegro e reto, que temia a
        Deus e se desviava do mal" — e ainda assim enfrentou
        sofrimento devastador que não era consequência de pecado.
        Livra-me da suposição simplista de que sofrimento sempre
        significa culpa, e ensina-me a acompanhar quem sofre sem
        julgamento precipitado. Amém.`),
    },
    meditation: {
      prompt: t(`O livro de Jó desafia diretamente a teologia simplista
        de que bons são sempre recompensados e maus sempre punidos —
        Jó é justo e ainda assim sofre profundamente, sem explicação
        fácil.`),
      questions: [
        'Você já julgou o sofrimento de alguém como consequência merecida, sem realmente saber a causa?',
        'Como você reagiria se, como Jó, sofresse profundamente sem ter feito nada errado?',
        'O que ajudaria você a acompanhar alguém que sofre sem oferecer explicações simplistas ou julgamento?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ainda Retém Ele a Sua Integridade',
      text: t(`Senhor, depois de perder tudo e ainda sofrer fisicamente,
        Jó recusou-se a "amaldiçoar a Deus", mesmo diante do conselho
        da própria esposa. "Receberemos o bem da mão de Deus, e não
        receberíamos também o mal?" Sua integridade não dependia de
        circunstâncias favoráveis. Ensina-me essa mesma fidelidade que
        persiste mesmo quando tudo parece perdido. Amém.`),
    },
    meditation: {
      prompt: t(`Jó não nega a realidade terrível de sua situação nem
        finge estar bem — sua integridade se expressa em honestidade
        sobre a dor combinada com recusa em abandonar sua confiança
        fundamental em Deus.`),
      questions: [
        'Sua fidelidade a Deus depende de circunstâncias favoráveis, ou você consegue, como Jó, mantê-la mesmo em perda profunda?',
        'O que significa "receber tanto o bem quanto o mal" da mão de Deus sem que isso signifique resignação passiva?',
        'Que integridade você precisa manter hoje, mesmo diante de circunstâncias difíceis?',
      ],
    },
  },
  {
    prayer: {
      title: 'Julga-me, Ó Senhor',
      text: t(`Senhor, o salmista ora com uma confiança que talvez
        pareça ousada: "Julga-me, ó Senhor, pois tenho andado na
        minha integridade... Examina-me, Senhor, e prova-me." Não é
        orgulho de perfeição, mas disposição de ser examinado.
        Ajuda-me a viver de um jeito que eu também possa fazer essa
        mesma oração com sinceridade, sem medo do exame. Amém.`),
    },
    meditation: {
      prompt: t(`O salmista não afirma perfeição absoluta, mas
        integridade de direção — uma vida orientada para Deus que ele
        está disposto a submeter a exame minucioso.`),
      questions: [
        'Você teria coragem de orar, como o salmista, "examina-me, Senhor" sobre uma área específica da sua vida?',
        'O que diferencia orgulho de perfeição de disposição sincera para ser examinado?',
        'Que área da sua integridade precisaria de mais exame honesto hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Falou pelo Filho',
      text: t(`Senhor, Hebreus declara que, depois de falar "muitas
        vezes, e de muitas maneiras" pelos profetas, "nestes últimos
        dias" falaste "pelo Filho" — a revelação plena e final. Que eu
        priorize ouvir a tua voz através de Jesus acima de qualquer
        outra fonte de autoridade espiritual que possa competir por
        minha atenção. Amém.`),
    },
    meditation: {
      prompt: t(`O texto descreve uma progressão — revelação parcial e
        variada através dos profetas, culminando em revelação completa
        através do Filho, "que é o resplendor da sua glória e a
        expressa imagem do seu Ser".`),
      questions: [
        'Você trata a revelação de Deus em Jesus Cristo como final e suprema, ou busca autoridades espirituais concorrentes com o mesmo peso?',
        'O que significa, para você, que Jesus é "a expressa imagem" do Ser de Deus — não apenas mensageiro, mas revelação completa?',
        'Como você pode priorizar ouvir a voz de Deus através de Cristo esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Que Deus Ajuntou',
      text: t(`Senhor Jesus, diante da pergunta sobre divórcio,
        voltaste ao princípio: "O que Deus ajuntou, não o separe o
        homem." Ensina-me a valorizar os compromissos duradouros que
        já fiz, resistindo à "dureza de coração" que torna fácil
        desistir quando o compromisso pesa. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus distingue entre a intenção original de Deus e
        as concessões feitas por causa da dureza de coração humana —
        um lembrete de que nem toda permissão bíblica é o ideal
        celebrado, algumas são resposta realista à fragilidade.`),
      questions: [
        'Existe algum relacionamento em que a "dureza do seu coração" tem dificultado reconciliação ou permanência?',
        'Como você distingue entre situações que pedem perseverança e situações genuinamente insustentáveis?',
        'O que significaria pedir a Deus que amoleça alguma dureza específica no seu coração hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Integridade Íntegra, Fé Examinada',
      text: t(`Senhor, esta semana trouxe a indignação de Jesus contra
        a exclusão das crianças, a integridade de Jó mantida em meio
        ao sofrimento, e a revelação plena de Deus através do Filho.
        Termino pedindo: que eu nunca seja barreira aos pequenos, que
        minha integridade persista mesmo diante da dificuldade, e que
        eu ouça primeiro a voz de Jesus acima de qualquer outra.
        Amém.`),
    },
    meditation: {
      prompt: t(`Da indignação de Jesus pelos pequenos à integridade
        de Jó no sofrimento, a semana revelou fidelidade que não
        depende de circunstâncias favoráveis nem de reconhecimento
        externo.`),
      questions: [
        'Qual dos temas desta semana — a indignação de Jesus, a integridade de Jó, ou a revelação plena em Cristo — mais te desafiou?',
        'Que integridade você quer manter, mesmo diante de dificuldade, na semana que começa?',
        'Como você quer acolher os "pequenos" ao seu redor nos próximos dias?',
      ],
    },
  },
];

// Próprio 23 — Jó 23:1-9, 16-17 · Salmo 22:1-15 · Hebreus 4:12-16 · Marcos 10:17-31
const proper23: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Vende Tudo Quanto Tens',
      text: t(`Senhor Jesus, ao jovem rico que guardava os mandamentos
        desde a juventude, olhaste com amor e disseste: "Uma coisa te
        falta; vai vende tudo quanto tens e dá-o aos pobres... e vem,
        segue-me." Ele se retirou triste, incapaz de soltar o que
        possuía. Examina o que eu mesmo teria dificuldade de soltar
        se tu pedisses o mesmo de mim hoje. Amém.`),
    },
    meditation: {
      prompt: t(`O texto observa que Jesus "olhando para ele, o amou"
        antes de fazer o pedido difícil — o convite radical nasceu de
        amor genuíno, não de teste arbitrário ou dureza.`),
      questions: [
        'O que você teria mais dificuldade de "vender" ou soltar se Jesus pedisse isso especificamente de você hoje?',
        'Como você reconciliaria um pedido tão radical vindo de alguém que "te amou" primeiro?',
        'O que impede você de seguir Jesus com a mesma disposição total que ele pediu do jovem rico?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ah, Se Eu Soubesse Onde Encontrá-lo',
      text: t(`Senhor, Jó clama em meio ao sofrimento: "Ah, se eu
        soubesse onde encontrá-lo... vou adiante, mas não está ali; e
        volto para trás, e não o percebo." Reconheço esses mesmos
        momentos de busca frustrada, quando pareces ausente
        justamente quando mais preciso de ti. Não me deixes desistir
        de buscar, mesmo quando não te encontro imediatamente. Amém.`),
    },
    meditation: {
      prompt: t(`Jó não questiona a existência de Deus — ele busca
        ativamente, insistentemente, mesmo sem encontrar respostas
        imediatas, um modelo de fé que persiste através da ausência
        percebida.`),
      questions: [
        'Você já sentiu essa mesma frustração de Jó — buscando a Deus ativamente, mas sem encontrar respostas ou sua presença sentida?',
        'O que ajudaria você a continuar buscando, mesmo em meio ao silêncio percebido de Deus?',
        'Como você distingue entre a ausência real de Deus e a percepção momentânea de ausência em meio à dor?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Meu, Por Que Me Desamparaste?',
      text: t(`Senhor, o salmista clama a mesma pergunta que Jesus
        pronunciaria séculos depois na cruz: "Deus meu, Deus meu, por
        que me desamparaste?" A honestidade dessa dor não é falta de
        fé — é a fé levada ao seu limite mais real. Que eu tenha
        coragem de trazer minhas próprias perguntas mais difíceis
        diante de ti, sem fingir que não existem. Amém.`),
    },
    meditation: {
      prompt: t(`Este salmo de lamento profundo é o mesmo que Jesus
        cita na cruz — a tradição cristã sempre reconheceu que até o
        próprio Filho de Deus experimentou essa mesma sensação de
        abandono no momento mais difícil.`),
      questions: [
        'Você se permite trazer perguntas tão difíceis quanto "por que me desamparaste?" diante de Deus, ou evita esse tipo de honestidade?',
        'O que significa para você que Jesus mesmo citou essas palavras na cruz?',
        'Que lamento honesto você precisa trazer a Deus hoje, sem fingir que está tudo bem?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Palavra de Deus É Viva e Eficaz',
      text: t(`Senhor, Hebreus descreve tua Palavra como "viva e
        eficaz, e mais cortante do que qualquer espada de dois gumes...
        apta para discernir os pensamentos e intenções do coração."
        Não me deixes tratar a Escritura como texto morto — que ela
        continue penetrando, expondo e transformando o que precisa ser
        visto em mim. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem da espada de dois gumes sugere que a Palavra
        corta em ambas as direções — expõe tanto o que precisa ser
        removido quanto revela o que é genuíno, sem distinção
        superficial.`),
      questions: [
        'Você trata a Palavra de Deus como texto histórico distante ou como algo "vivo e eficaz" que ainda te confronta hoje?',
        'Que "pensamento ou intenção do coração" a Palavra tem exposto em você recentemente?',
        'Como você pode se abrir mais para deixar a Palavra "penetrar" em vez de apenas conhecer seu conteúdo intelectualmente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cheguemo-nos Confiadamente ao Trono da Graça',
      text: t(`Senhor, Hebreus convida: "Cheguemo-nos, pois,
        confiadamente ao trono da graça, para que recebamos
        misericórdia e achemos graça, a fim de sermos socorridos no
        momento oportuno." Porque tens um sumo sacerdote que "em tudo
        foi tentado, mas sem pecado", posso me aproximar sem medo. Que
        eu venha com essa mesma confiança, não hesitação. Amém.`),
    },
    meditation: {
      prompt: t(`A confiança de se aproximar do "trono da graça" se
        baseia especificamente no fato de Jesus compreender a
        experiência humana por dentro — "compadecer-se das nossas
        fraquezas" nasce de experiência real, não de distância
        teórica.`),
      questions: [
        'Você se aproxima de Deus com confiança, ou com hesitação e medo de julgamento?',
        'Como o fato de Jesus ter sido "tentado em tudo, mas sem pecado" muda a forma como você se aproxima dele com suas próprias lutas?',
        'Que necessidade você precisa trazer hoje "confiadamente ao trono da graça"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Mais Fácil um Camelo',
      text: t(`Senhor Jesus, depois que o jovem rico se retirou triste,
        disseste aos discípulos: "É mais fácil um camelo passar pelo
        fundo de uma agulha, do que entrar um rico no reino de Deus."
        E quando perguntaram quem então poderia se salvar, respondeste:
        "Para os homens é impossível, mas não para Deus." Que eu
        confie nessa possibilidade que só tu podes tornar realidade em
        mim. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não deixa os discípulos sem esperança depois de
        uma declaração tão dura — "para Deus tudo é possível" garante
        que nenhuma barreira humana, por maior que pareça, é
        intransponível para Deus.`),
      questions: [
        'Que "riqueza" — não apenas material, mas segurança, controle, autossuficiência — dificulta sua entrada plena no Reino de Deus?',
        'Você já se sentiu diante de uma barreira "impossível" na sua vida espiritual? Como essa promessa muda sua perspectiva?',
        'O que significa confiar que "para Deus tudo é possível" numa área específica onde você já desistiu de esperar mudança?',
      ],
    },
  },
  {
    prayer: {
      title: 'Confiança para Buscar',
      text: t(`Senhor, esta semana trouxe o convite radical ao jovem
        rico, a busca frustrada de Jó, e o convite a nos aproximarmos
        confiadamente do trono da graça. Termino pedindo: que eu
        solte o que preciso soltar para te seguir plenamente, e que
        eu continue buscando mesmo quando pareces distante, confiando
        que para Deus tudo é possível. Amém.`),
    },
    meditation: {
      prompt: t(`Do convite radical ao jovem rico à busca persistente
        de Jó, a semana revelou que seguir a Deus genuinamente exige
        tanto disposição de soltar quanto persistência em buscar,
        mesmo sem respostas fáceis.`),
      questions: [
        'Qual dos temas desta semana — o convite ao jovem rico, a busca de Jó, ou o trono da graça — mais te desafiou?',
        'O que você quer soltar para seguir Jesus mais plenamente nesta semana?',
        'Como você quer se aproximar de Deus com mais confiança nos próximos dias?',
      ],
    },
  },
];

// Próprio 24 — Jó 38:1-7, (34-41) · Salmo 104:1-9, 24, 35c · Hebreus 5:1-10 · Marcos 10:35-45
const proper24: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Veio para Ser Servido',
      text: t(`Senhor Jesus, quando Tiago e João pediram lugares de
        honra ao teu lado, ensinaste que "qualquer que entre vós
        quiser tornar-se grande, será esse o que vos sirva... Pois
        também o Filho do homem não veio para ser servido, mas para
        servir, e para dar a sua vida em resgate de muitos." Que essa
        seja também minha definição de grandeza. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não apenas ensina sobre servir — ele mesmo é o
        exemplo supremo, dando a própria vida como resgate; a
        instrução não é teórica, é modelada por ele mesmo.`),
      questions: [
        'Você já pediu, mesmo indiretamente, por reconhecimento ou posição de honra, como Tiago e João?',
        'O que significa, na prática hoje, medir grandeza pelo serviço oferecido, não pela posição alcançada?',
        'Como o exemplo de Jesus — "dar a vida em resgate" — desafia sua própria definição de sucesso?',
      ],
    },
  },
  {
    prayer: {
      title: 'Onde Estavas Tu?',
      text: t(`Senhor, depois de tantos capítulos de sofrimento e
        perguntas sem resposta, finalmente falaste a Jó — não com
        explicações, mas com perguntas: "Onde estavas tu, quando eu
        lançava os fundamentos da terra?" Não recebeu justificativa
        detalhada, mas encontro real contigo. Ensina-me a aceitar que
        às vezes o encontro contigo, não a explicação completa, é a
        resposta que realmente preciso. Amém.`),
    },
    meditation: {
      prompt: t(`Deus não explica a Jó por que ele sofreu — em vez
        disso, expande sua perspectiva através de uma série de
        perguntas sobre a grandeza da criação, reorientando a busca
        por explicação para encontro com o próprio Deus.`),
      questions: [
        'Você tem exigido explicações completas de Deus para o sofrimento, quando talvez ele ofereça, em vez disso, sua própria presença?',
        'O que a grandeza da criação, apontada por Deus a Jó, ensina sobre os limites da compreensão humana?',
        'Como você reagiria se, diante de uma pergunta difícil sua, Deus respondesse com um encontro real em vez de uma explicação completa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bendize, Ó Minha Alma, ao Senhor',
      text: t(`Senhor, o salmo celebra a grandeza da tua criação —
        "estendes os céus como uma cortina... lançaste os fundamentos
        da terra" — e conclui com adoração pessoal: "Bendize, ó minha
        alma, ao Senhor." A contemplação da criação deveria sempre nos
        levar de volta ao louvor, não apenas ao conhecimento. Que essa
        seja minha resposta hoje diante da tua grandeza. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo passa de descrição cósmica grandiosa para
        adoração intensamente pessoal — "bendize, ó minha alma" —
        mostrando que contemplar a criação deveria sempre resultar em
        resposta de louvor, não apenas admiração distante.`),
      questions: [
        'Quando foi a última vez que a contemplação da natureza te levou a louvor genuíno, e não apenas admiração passageira?',
        'O que significa, para você, que a mesma mão que "lançou os fundamentos da terra" também cuida da sua vida pessoal?',
        'Como você pode transformar, hoje, um momento de contemplação em louvor real?',
      ],
    },
  },
  {
    prayer: {
      title: 'Aprendeu a Obediência pelo Que Sofreu',
      text: t(`Senhor Jesus, Hebreus descreve que, "ainda que era
        Filho, aprendeu a obediência por meio daquilo que sofreu."
        Mesmo tu, na tua humanidade, cresceste em obediência através
        do sofrimento real. Que eu não veja meu próprio sofrimento
        como sinal de falha espiritual, mas como possível caminho de
        formação, assim como foi para ti. Amém.`),
    },
    meditation: {
      prompt: t(`Esta é uma das afirmações mais profundas sobre a
        humanidade real de Cristo — mesmo sendo Filho, ele
        genuinamente "aprendeu" através da experiência do sofrimento,
        não apenas fingiu experimentá-lo.`),
      questions: [
        'Você tende a ver seu próprio sofrimento como sinal de falha espiritual, quando talvez seja parte de um processo de formação?',
        'Como o fato de Jesus mesmo ter "aprendido pela obediência através do sofrimento" muda sua compreensão do valor da dificuldade?',
        'Que sofrimento atual você poderia começar a ver como formação, não apenas como fardo sem sentido?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sumo Sacerdote Compadecido',
      text: t(`Senhor, Hebreus descreve o sumo sacerdote como alguém
        "constituído a favor dos homens... podendo ele compadecer-se
        devidamente dos ignorantes e errados, porquanto também ele
        mesmo está rodeado de fraqueza." Jesus, nosso sumo sacerdote,
        compreende minha fraqueza por dentro, não apenas de longe.
        Obrigado por teres um mediador que realmente entende. Amém.`),
    },
    meditation: {
      prompt: t(`O texto insiste na compaixão do sumo sacerdote como
        qualificação necessária, não obstáculo — a proximidade com a
        fraqueza humana é o que capacita a verdadeira compaixão, não a
        distância perfeita.`),
      questions: [
        'Você se aproxima de Jesus como alguém que realmente compreende sua fraqueza, ou como juiz distante e perfeito?',
        'Como isso muda a forma como você traz suas próprias falhas e lutas diante dele?',
        'O que significa ter um mediador que "compadece-se devidamente" — não apenas tolera, mas entende genuinamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Cálice Que Eu Bebo',
      text: t(`Senhor Jesus, quando Tiago e João disseram que podiam
        beber o teu cálice, respondeste que sim, eles beberiam — mas
        que o lugar de honra "não me pertence concedê-lo." Nem todo
        pedido feito com boa intenção corresponde à minha própria
        função ou timing. Ensina-me a aceitar quando algo que peço não
        está sob meu controle ou não é para mim decidir. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não repreende o desejo de Tiago e João por
        proximidade com ele — apenas esclarece que certas decisões
        pertencem exclusivamente ao Pai, um limite que ele mesmo
        respeita como Filho.`),
      questions: [
        'Você já pediu algo com boa intenção, mas precisou aceitar que a decisão não estava sob seu controle?',
        'Como Jesus modela aceitar limites, mesmo sendo o Filho de Deus, sobre o que não lhe pertence decidir?',
        'O que ajudaria você a aceitar, com mais paz, os limites do que você pode ou não controlar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Servir e Ser Compadecido',
      text: t(`Senhor, esta semana trouxe o chamado a servir em vez de
        buscar honra, o encontro de Jó com a grandeza de Deus em lugar
        de explicações, e o sumo sacerdote que compreende a fraqueza
        humana por dentro. Termino pedindo: que eu meça grandeza pelo
        serviço, que eu aceite encontro com Deus mesmo sem todas as
        respostas, e que eu me aproxime confiadamente de quem realmente
        me compreende. Amém.`),
    },
    meditation: {
      prompt: t(`Do chamado a servir ao sumo sacerdote compadecido, a
        semana revelou que a grandeza de Deus se expressa
        paradoxalmente através de humildade e proximidade, não de
        distância e poder ostentado.`),
      questions: [
        'Qual dos temas desta semana — o chamado a servir, o encontro de Jó, ou o sumo sacerdote compadecido — mais tocou você?',
        'Que forma de "servir" você quer praticar concretamente esta semana?',
        'Como você quer se aproximar de Deus com mais confiança, sabendo que ele compreende sua fraqueza?',
      ],
    },
  },
];

// Próprio 25 — Jó 42:1-6, 10-17 · Salmo 34:1-8, (19-22) · Hebreus 7:23-28 · Marcos 10:46-52
const proper25: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Vai, a Tua Fé Te Salvou',
      text: t(`Senhor Jesus, Bartimeu, mendigo cego, clamou "Jesus,
        Filho de Davi, tem compaixão de mim!" mesmo quando muitos o
        repreendiam para que se calasse. Sua persistência foi
        recompensada: "Vai, a tua fé te salvou." Ensina-me essa mesma
        persistência diante de vozes que tentam me silenciar quando
        clamo por ti. Amém.`),
    },
    meditation: {
      prompt: t(`Bartimeu clamou "ainda mais" quando repreendido, não
        menos — a oposição, em vez de silenciá-lo, intensificou sua
        determinação de ser ouvido por Jesus.`),
      questions: [
        'Que vozes ao seu redor — ou dentro de você — tentam te silenciar quando você clama a Deus por ajuda?',
        'Você tende a desistir diante da repreensão, ou consegue clamar "ainda mais", como Bartimeu?',
        'Bartimeu lançou fora sua capa — provavelmente sua única proteção e fonte de renda como mendigo — ao se levantar para Jesus. Que "capa" você precisaria soltar para responder ao chamado de Jesus com a mesma prontidão?',
      ],
    },
  },
  {
    prayer: {
      title: 'Agora Te Veem os Meus Olhos',
      text: t(`Senhor, depois de todo o sofrimento, Jó respondeu:
        "Com os ouvidos eu ouvira falar de ti; mas agora te vêem os
        meus olhos." Não é que ele finalmente entendeu por que sofreu
        — é que encontrou a ti de um jeito mais profundo do que
        conhecimento sobre ti. Que o meu próprio sofrimento, quando
        vier, também me leve a um encontro mais real contigo, não
        apenas a mais informação. Amém.`),
    },
    meditation: {
      prompt: t(`Jó não recebe explicação sobre por que sofreu — ele
        recebe algo diferente e talvez mais valioso: encontro pessoal
        direto com Deus, que transforma conhecimento distante em
        experiência real.`),
      questions: [
        'Existe alguma verdade sobre Deus que você conhece "de ouvido", mas ainda não experimentou de verdade, "com os próprios olhos"?',
        'Como uma dificuldade passada te levou a um encontro mais real com Deus, mesmo sem resolver todas as suas perguntas?',
        'O que ajudaria você a buscar encontro genuíno com Deus, não apenas mais conhecimento sobre ele?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Senhor Virou o Cativeiro de Jó',
      text: t(`Senhor, depois de tudo, "o Senhor virou o cativeiro de
        Jó, quando este orava pelos seus amigos" — a restauração veio
        associada à intercessão por quem o havia julgado mal durante
        o sofrimento. Ensina-me essa mesma generosidade: orar pelo
        bem de quem me feriu, mesmo em meio à minha própria
        restauração. Amém.`),
    },
    meditation: {
      prompt: t(`A restauração de Jó está textualmente conectada à sua
        intercessão pelos amigos que o julgaram mal — generosidade
        para com quem feriu parece estar entrelaçada com a própria
        cura.`),
      questions: [
        'Existe alguém que te julgou ou feriu durante um momento difícil por quem você precisa orar, como Jó orou por seus amigos?',
        'Como a disposição de interceder por quem nos feriu pode fazer parte do nosso próprio processo de restauração?',
        'O que significaria, hoje, orar genuinamente pelo bem de alguém que falhou com você?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bendirei ao Senhor em Todo o Tempo',
      text: t(`Senhor, o salmista declara: "Bendirei ao Senhor em todo
        o tempo; o seu louvor estará continuamente na minha boca."
        Não é louvor condicionado a circunstâncias favoráveis, mas
        prática constante. Ajuda-me a cultivar esse hábito de louvor
        contínuo, não apenas nos momentos em que tudo vai bem. Amém.`),
    },
    meditation: {
      prompt: t(`"Em todo o tempo" é o compromisso central do salmo —
        louvor não como reação a circunstâncias específicas, mas como
        prática constante e deliberada, independente do que a vida
        traz.`),
      questions: [
        'Seu louvor a Deus é condicionado às circunstâncias, ou você o pratica "em todo o tempo", como o salmista propõe?',
        'O que ajudaria você a cultivar esse hábito de louvor constante, mesmo em dias difíceis?',
        'Que motivo de louvor, mesmo pequeno, você pode expressar agora, independente de como está se sentindo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sacerdócio Perpétuo',
      text: t(`Senhor, Hebreus contrasta os sacerdotes antigos, que
        morriam e precisavam ser substituídos, com Cristo, que
        "permanece para sempre, tem o seu sacerdócio perpétuo...
        vive sempre para interceder" por nós. Obrigado por teres um
        mediador cuja intercessão nunca cessa, nunca precisa ser
        substituída, nunca falha por limitação humana. Amém.`),
    },
    meditation: {
      prompt: t(`O argumento de Hebreus é sobre continuidade — os
        sacerdotes antigos eram interrompidos pela morte; Cristo,
        ressuscitado, oferece intercessão ininterrupta e permanente.`),
      questions: [
        'Você vive consciente de que Cristo "vive sempre para interceder" por você, mesmo agora, neste momento?',
        'Como essa intercessão constante e permanente muda a forma como você encara suas próprias fraquezas e falhas recorrentes?',
        'O que significaria descansar mais na intercessão contínua de Cristo, em vez de depender apenas da sua própria força?',
      ],
    },
  },
  {
    prayer: {
      title: 'Que Queres Que Te Faça?',
      text: t(`Senhor Jesus, perguntaste a Bartimeu, mesmo já sabendo
        de sua necessidade óbvia: "Que queres que te faça?" Deste
        espaço para que ele articulasse seu próprio pedido, com
        dignidade. Ensina-me a trazer meus próprios pedidos com essa
        mesma clareza e ousadia diante de ti, confiando que perguntas
        genuinamente o que eu preciso. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus pergunta mesmo quando a necessidade parece
        óbvia (um cego pedindo compaixão) — dar espaço para que a
        pessoa articule seu próprio pedido é sinal de respeito à sua
        dignidade e agência.`),
      questions: [
        'Você articula seus próprios pedidos a Deus com clareza, ou espera que ele "adivinhe" o que você precisa?',
        'O que significaria, hoje, responder com a mesma clareza de Bartimeu se Jesus te perguntasse "que queres que te faça?"',
        'Como essa pergunta de Jesus revela respeito pela sua própria voz e dignidade?',
      ],
    },
  },
  {
    prayer: {
      title: 'Fé Persistente, Louvor Constante',
      text: t(`Senhor, esta semana trouxe a persistência de Bartimeu
        diante da oposição, o encontro real de Jó além do
        conhecimento distante, e a intercessão perpétua de Cristo por
        nós. Termino pedindo: que eu clame com a mesma persistência,
        busque encontro real contigo, e louve em todo tempo, confiando
        na tua intercessão constante. Amém.`),
    },
    meditation: {
      prompt: t(`Da persistência de Bartimeu ao encontro transformador
        de Jó, a semana revelou que fé genuína frequentemente exige
        atravessar oposição e sofrimento para chegar a um encontro
        mais profundo com Deus.`),
      questions: [
        'Qual dos temas desta semana — a persistência de Bartimeu, o encontro de Jó, ou a intercessão perpétua de Cristo — mais te desafiou?',
        'Que pedido claro você quer trazer a Deus nesta semana, como Bartimeu fez?',
        'Como você quer cultivar louvor mais constante nos próximos dias?',
      ],
    },
  },
];

// Próprio 26 — Rute 1:1-18 · Salmo 146 · Hebreus 9:11-14 · Marcos 12:28-34
const proper26: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Estás Longe do Reino de Deus',
      text: t(`Senhor Jesus, quando um escriba respondeu sabiamente
        sobre o grande mandamento — amar a Deus e ao próximo —
        disseste: "Não estás longe do reino de Deus." Compreender
        corretamente a essência da lei já é um passo real de
        proximidade contigo. Que a minha própria compreensão da tua
        vontade se traduza também em vida vivida, não apenas em
        resposta correta. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus reconhece genuinamente a sabedoria do escriba —
        um raro momento de elogio direto a um líder religioso nos
        Evangelhos — mostrando que compreensão correta é valorizada,
        mesmo quando ainda incompleta.`),
      questions: [
        'Você já teve uma compreensão correta de algo espiritual que ainda precisava se traduzir em vida vivida?',
        'O que significaria, para você, dar o próximo passo de "não estar longe" para realmente "estar dentro" do Reino de Deus?',
        'Como amar a Deus de todo o coração e o próximo como a si mesmo se conectam na sua vida prática?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Fome e a Perda',
      text: t(`Senhor, a história de Rute começa com fome, migração, e
        a morte sucessiva de Elimeleque e seus filhos — deixando
        Noemi e suas noras em vulnerabilidade extrema. A Escritura não
        esconde a dor real antes de chegar à restauração. Quando eu
        enfrentar perdas que não fazem sentido, ajuda-me a confiar que
        podes tecer redenção mesmo através da dor. Amém.`),
    },
    meditation: {
      prompt: t(`O livro de Rute não minimiza a tragédia inicial —
        Noemi perde marido e filhos numa terra estrangeira antes de
        qualquer sinal de restauração aparecer no texto.`),
      questions: [
        'Existe uma perda na sua vida que ainda não encontrou sentido, semelhante à situação inicial de Noemi?',
        'Como você equilibra reconhecer a dor real de uma perda com esperança de que Deus ainda pode trazer restauração?',
        'O que ajudaria você a confiar em Deus numa fase de "fome" — escassez, incerteza — sem forçar uma resposta rápida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Aonde Quer que Fores Irei',
      text: t(`Senhor, diante da insistência de Noemi para que
        voltasse à sua própria terra, Rute respondeu com uma das
        declarações de lealdade mais belas da Escritura: "Aonde quer
        que fores irei... o teu povo será o meu povo, o teu Deus será
        o meu Deus." Ensina-me essa mesma lealdade — não por
        obrigação, mas por escolha do coração. Amém.`),
    },
    meditation: {
      prompt: t(`Rute era moabita, de um povo geralmente hostil a
        Israel na narrativa bíblica — sua lealdade a Noemi e ao Deus
        de Israel atravessa fronteiras étnicas e religiosas que a
        sociedade da época via como fixas.`),
      questions: [
        'Existe alguma lealdade — a uma pessoa, a uma comunidade de fé — que você escolheu livremente, mesmo sem "obrigação" clara?',
        'O que a disposição de Rute em atravessar fronteiras culturais e religiosas ensina sobre acolhimento e pertencimento?',
        'Que compromisso de lealdade você precisa reafirmar hoje, mesmo sem garantias do que virá pela frente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Confieis em Príncipes',
      text: t(`Senhor, o salmo adverte: "Não confieis em príncipes,
        nem em filho de homem, em quem não há auxílio." E contrasta:
        "Bem-aventurado aquele que tem o Deus de Jacó por seu
        auxílio." Reconheço quanto tenho depositado confiança em
        pessoas e planos finitos e falíveis. Redireciona minha
        confiança para ti, que "faz justiça aos oprimidos" e "dá pão
        aos famintos". Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não condena autoridades humanas em si —
        adverte contra depositar nelas a confiança última que só Deus
        merece, especialmente porque "sai-lhe o espírito, e ele volta
        para a terra".`),
      questions: [
        'Em que pessoa, instituição ou plano você tem depositado uma confiança que talvez só devesse pertencer a Deus?',
        'O que a lista de ações de Deus no salmo (liberta, dá vista, levanta os abatidos) revela sobre o tipo de confiança que ele merece?',
        'Como você pode redirecionar, hoje, uma confiança excessiva em algo finito para o Deus eterno?',
      ],
    },
  },
  {
    prayer: {
      title: 'Purificará das Obras Mortas',
      text: t(`Senhor, o sangue de Cristo, "que pelo Espírito eterno
        se ofereceu a si mesmo imaculado a Deus", purifica "das obras
        mortas a vossa consciência, para servirdes ao Deus vivo." Não
        é apenas perdão legal — é limpeza que liberta a consciência
        para servir sem o peso constante da culpa. Que eu viva com
        essa consciência genuinamente livre. Amém.`),
    },
    meditation: {
      prompt: t(`O texto distingue entre purificação ritual externa e
        purificação da consciência — Cristo trata não apenas o
        registro externo do pecado, mas a culpa interna que o
        acompanha.`),
      questions: [
        'Você vive com a consciência genuinamente livre, ou ainda carrega culpa por coisas já perdoadas em Cristo?',
        'O que significa, na prática, servir "ao Deus vivo" a partir de uma consciência purificada, em vez de culpa residual?',
        'Que "obra morta" — culpa antiga, vergonha não resolvida — você precisa entregar hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Mais do Que Todos os Holocaustos',
      text: t(`Senhor Jesus, o escriba reconheceu que amar a Deus e ao
        próximo "é mais do que todos os holocaustos e sacrifícios" —
        os rituais religiosos existem para servir ao amor, não o
        contrário. Examina se, na minha própria vida, tenho invertido
        essa prioridade, valorizando ritual mais do que o amor que ele
        deveria expressar. Amém.`),
    },
    meditation: {
      prompt: t(`O reconhecimento do escriba ecoa uma linha profética
        antiga (Oséias 6:6, entre outros) — a prioridade do amor sobre
        o ritual não é invenção de Jesus, mas continuidade de uma
        verdade já ensinada pelos profetas.`),
      questions: [
        'Você já valorizou cumprimento ritual religioso mais do que o amor genuíno que ele deveria expressar?',
        'O que significaria reordenar, hoje, uma prática religiosa sua para que ela sirva mais claramente ao amor, não o contrário?',
        'Como essa prioridade — amor acima de sacrifício — desafia alguma expectativa religiosa que você carrega?',
      ],
    },
  },
  {
    prayer: {
      title: 'Lealdade que Atravessa Fronteiras',
      text: t(`Senhor, esta semana trouxe a proximidade do escriba com
        o Reino de Deus, a lealdade corajosa de Rute, e a purificação
        completa da consciência pelo sangue de Cristo. Termino
        pedindo: que eu traduza compreensão correta em vida vivida,
        que eu escolha lealdade que atravessa fronteiras, e que eu
        viva com consciência livre, servindo ao Deus vivo. Amém.`),
    },
    meditation: {
      prompt: t(`Da sabedoria do escriba à lealdade de Rute, a semana
        revelou que fé genuína sempre se traduz em ação concreta —
        compreensão que se torna vida, lealdade que se prova em
        escolha real.`),
      questions: [
        'Qual dos temas desta semana — a proximidade com o Reino, a lealdade de Rute, ou a consciência purificada — mais tocou você?',
        'Que lealdade você quer reafirmar nesta semana que começa?',
        'Como você quer traduzir compreensão espiritual em ação concreta nos próximos dias?',
      ],
    },
  },
];

// Próprio 27 — Rute 3:1-5; 4:13-17 · Salmo 127 · Hebreus 9:24-28 · Marcos 12:38-44
const proper27: DevotionalEntry[] = [
  {
    prayer: {
      title: 'A Oferta da Viúva Pobre',
      text: t(`Senhor Jesus, sentado defronte do cofre das ofertas,
        observaste os ricos depositarem muito e uma pobre viúva
        depositar apenas dois leptos — e declaraste que ela dera mais
        do que todos, "porque todos deram daquilo que lhes sobrava;
        mas esta, da sua pobreza, deu tudo o que tinha." Ensina-me a
        medir generosidade pelo sacrifício real, não pelo tamanho
        absoluto do que é dado. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus mede generosidade não pela quantidade
        absoluta, mas pela proporção do sacrifício — a viúva deu
        pouco em números, mas tudo em proporção, um padrão que
        inverte a lógica humana comum.`),
      questions: [
        'Você mede sua própria generosidade pelo tamanho absoluto do que dá, ou pelo sacrifício real que representa para você?',
        'A viúva deu "tudo o que tinha para o seu sustento" — que nível de confiança isso exigiu dela?',
        'O que significaria, hoje, dar de forma que realmente custe algo, não apenas o que sobra?',
      ],
    },
  },
  {
    prayer: {
      title: 'Noemi Orienta Rute',
      text: t(`Senhor, Noemi, já restaurada de espírito, cuidou do
        futuro de Rute com sabedoria prática: "Não te hei de buscar
        descanso, para que fiques bem?" Ela usou sua experiência para
        orientar quem tinha menos experiência. Ajuda-me a valorizar —
        e a oferecer, quando for minha vez — esse tipo de cuidado
        geracional. Amém.`),
    },
    meditation: {
      prompt: t(`Noemi, que começou a história amargurada e vazia,
        termina orientando o futuro de outra pessoa com esperança e
        cuidado prático — sua própria restauração se expressa em
        generosidade ativa.`),
      questions: [
        'Você tem alguém mais experiente que investe cuidado prático e sabedoria na sua vida, como Noemi fez por Rute?',
        'Existe alguém mais jovem a quem você poderia oferecer esse mesmo tipo de orientação?',
        'Como a restauração pessoal de Noemi, expressa em generosidade para com Rute, te desafia sobre o que fazer com a sua própria cura?',
      ],
    },
  },
  {
    prayer: {
      title: 'Noemi Tomou o Menino',
      text: t(`Senhor, a história de Rute termina com Noemi, que
        começou vazia e amargurada, segurando o neto Obede no colo,
        declarada pelas mulheres da cidade: "Nasceu um filho a Noemi."
        O que parecia perdido para sempre foi restaurado de forma que
        ninguém poderia ter planejado. Ensina-me a esperar restaurações
        que superam qualquer plano que eu mesmo conseguiria desenhar.
        Amém.`),
    },
    meditation: {
      prompt: t(`A restauração de Noemi vem por um caminho que ela
        jamais poderia ter planejado no início da história — através
        de uma nora estrangeira e de um parente distante.`),
      questions: [
        'Existe uma perda em sua vida para a qual você não consegue imaginar nenhum caminho de restauração?',
        'A história de Noemi sugere que a restauração pode vir por caminhos completamente inesperados. Isso muda sua esperança sobre algo específico que você vive hoje?',
        'Quem, na sua comunidade, você poderia ajudar a "restaurar", sem saber o alcance completo do que isso significaria?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se o Senhor Não Edificar a Casa',
      text: t(`Senhor, o salmo adverte: "Se o Senhor não edificar a
        casa, em vão trabalham os que a edificam." Reconheço quanto
        esforço eu dedico a construir minha vida sem convidar você
        para o centro desse projeto. Ensina-me a trabalhar com
        diligência, mas descansando na certeza de que a construção
        final depende de ti. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não desencoraja o trabalho — reconhece o
        esforço como real e necessário, mas insiste que, sem Deus
        como fundamento, até o esforço genuíno é vão.`),
      questions: [
        'Em que área da sua vida você tem trabalhado intensamente sem convidar Deus para o centro do projeto?',
        'O que mudaria se você tratasse Deus como o verdadeiro "edificador" da sua casa, carreira ou família?',
        'Como equilibrar esforço genuíno e diligência com descanso na soberania de Deus sobre o resultado final?',
      ],
    },
  },
  {
    prayer: {
      title: 'Uma Vez Por Todas',
      text: t(`Senhor, Cristo "não entrou num santuário feito por
        mãos... mas agora, na consumação dos séculos, uma vez por
        todas se manifestou, para aniquilar o pecado pelo sacrifício de
        si mesmo." Não preciso viver como se ainda precisasse repetir
        sacrifícios para manter minha aceitação diante de ti. Ajuda-me
        a descansar na suficiência completa do que Cristo já fez.
        Amém.`),
    },
    meditation: {
      prompt: t(`A ênfase repetida em "uma vez por todas" contrasta
        deliberadamente com o sistema sacrificial antigo, que exigia
        repetição constante — o texto enfatiza suficiência definitiva.`),
      questions: [
        'Você vive como se a obra de Cristo fosse suficiente, ou ainda tenta "completá-la" com esforço próprio?',
        'O que significaria descansar hoje na suficiência do sacrifício "uma vez por todas" de Cristo?',
        'Que prática religiosa sua poderia mudar de motivação — de tentar merecer para simplesmente responder com gratidão?',
      ],
    },
  },
  {
    prayer: {
      title: 'Devoram as Casas das Viúvas',
      text: t(`Senhor Jesus, criticaste escribas que, "por pretexto,
        fazem longas orações" enquanto "devoram as casas das viúvas" —
        religiosidade impressionante usada para explorar os
        vulneráveis. Examina se alguma vez minha própria religiosidade
        aparente esconde, de alguma forma, exploração ou indiferença
        aos vulneráveis ao meu redor. Amém.`),
    },
    meditation: {
      prompt: t(`A crítica de Jesus liga diretamente performance
        religiosa impressionante à exploração real dos vulneráveis —
        a aparência de piedade não apenas não impede, mas às vezes
        disfarça a injustiça.`),
      questions: [
        'Você já viu, ou praticou sem perceber, religiosidade aparente que coexiste com indiferença real a quem é vulnerável?',
        'Como você pode garantir que sua prática espiritual sirva genuinamente aos vulneráveis, não apenas pareça piedosa?',
        'Que ação concreta você pode tomar esta semana para proteger, não explorar, alguém em posição vulnerável?',
      ],
    },
  },
  {
    prayer: {
      title: 'Generosidade que Sacrifica',
      text: t(`Senhor, esta semana trouxe a generosidade sacrificial
        da viúva pobre, a restauração inesperada de Noemi, e a
        suficiência completa do sacrifício de Cristo. Termino
        pedindo: que eu dê de forma que realmente custe algo, que eu
        confie em restaurações que ainda não consigo imaginar, e que
        eu descanse na obra já completa de Cristo. Amém.`),
    },
    meditation: {
      prompt: t(`Da generosidade sacrificial da viúva à restauração
        inesperada de Noemi, a semana revelou que Deus valoriza
        profundamente o que é dado com sacrifício genuíno, mesmo
        quando parece pequeno aos olhos humanos.`),
      questions: [
        'Qual dos temas desta semana — a oferta da viúva, a restauração de Noemi, ou o sacrifício suficiente de Cristo — mais tocou você?',
        'O que você quer dar, esta semana, de forma que realmente custe algo?',
        'Como você quer confiar em restaurações ainda não visíveis nos próximos dias?',
      ],
    },
  },
];

// Próprio 28 — 1 Samuel 1:4-20 · 1 Samuel 2:1-10 · Hebreus 10:11-14, (15-18), 19-25 · Marcos 13:1-8
const proper28: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Se Deixará Aqui Pedra Sobre Pedra',
      text: t(`Senhor Jesus, diante da admiração dos discípulos pela
        grandiosidade do templo, disseste: "Não se deixará aqui pedra
        sobre pedra que não seja derribada." Nenhuma estrutura
        humana, por mais impressionante, é permanente. Ensina-me a
        não depositar minha segurança final em estruturas que, por
        mais sólidas que pareçam, um dia passarão. Amém.`),
    },
    meditation: {
      prompt: t(`O templo era o centro simbólico de toda a vida
        religiosa e nacional de Israel — a previsão de Jesus não é
        pessimismo vazio, mas realismo sobre a natureza temporária de
        até as estruturas mais sagradas em termos humanos.`),
      questions: [
        'Que estrutura — instituição, tradição, conquista — você trata como permanente, quando na verdade é temporária?',
        'Como você distingue entre valorizar algo genuinamente bom e depositar nele segurança final que só Deus merece?',
        'O que permanece, segundo Jesus, quando tudo o mais é abalado?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Angústia de Ana',
      text: t(`Senhor, Ana, estéril e provocada por sua rival, "com
        amargura de alma, orou ao Senhor, e chorou muito." Sua dor era
        real, sua oração era honesta — nem sequer se conteve diante da
        suspeita de Eli de que estava embriagada. Ensina-me essa mesma
        honestidade na oração, sem esconder ou minimizar minha própria
        dor diante de ti. Amém.`),
    },
    meditation: {
      prompt: t(`A oração de Ana era tão intensa e não convencional
        (mexendo os lábios sem som audível) que Eli a confundiu com
        embriaguez — sua angústia não coube nas formas religiosas
        esperadas da época.`),
      questions: [
        'Você já sentiu que sua própria dor era "grande demais" para caber nas formas convencionais de oração?',
        'O que ajudaria você a orar com a mesma honestidade intensa de Ana, sem se preocupar com aparência ou convenção?',
        'Que angústia você precisa "derramar diante do Senhor" hoje, como Ana fez?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Meu Coração Exulta no Senhor',
      text: t(`Senhor, depois de anos de angústia e espera, Ana orou:
        "O meu coração exulta no Senhor... porquanto me regozijo na
        tua salvação." A resposta veio, mas o cântico de Ana vai além
        da gratidão pessoal — celebra que "o Senhor empobrece e
        enriquece; abate e também exalta." Que meu próprio louvor,
        quando a resposta vier, aponte além de mim mesmo, para quem
        realmente tu és. Amém.`),
    },
    meditation: {
      prompt: t(`O cântico de Ana antecipa temas que o próprio
        cântico de Maria (Magnificat) ecoaria séculos depois — Deus
        que inverte expectativas, exaltando os humildes e abatendo os
        poderosos.`),
      questions: [
        'Quando sua oração é respondida, seu louvor se limita à sua própria situação, ou aponta para quem Deus é de forma mais ampla?',
        'O que o cântico de Ana ensina sobre o caráter de Deus — como ele trata os humildes e os poderosos?',
        'Que resposta recente de Deus você ainda não celebrou com o mesmo louvor genuíno de Ana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Abandonando a Congregação',
      text: t(`Senhor, o autor de Hebreus exorta: "Não abandonando a
        nossa congregação, como é costume de alguns, antes
        admoestando-nos uns aos outros." Com "ousadia para entrarmos
        no santíssimo lugar, pelo sangue de Jesus", somos chamados à
        comunhão que se estimula mutuamente "ao amor e às boas obras".
        Examina se tenho me afastado da comunidade de fé. Amém.`),
    },
    meditation: {
      prompt: t(`O texto liga diretamente o acesso ousado a Deus ao
        compromisso com a congregação — a intimidade vertical com
        Deus e a comunhão horizontal com os irmãos não são
        apresentadas como separadas.`),
      questions: [
        'Você tem se afastado, de alguma forma, da congregação de fé — por mágoa, comodidade ou simples deriva?',
        'O que você perde, especificamente, quando se isola da comunhão que "estimula ao amor e às boas obras"?',
        'Como você pode, esta semana, reaproximar-se ou fortalecer um vínculo de comunhão que enfraqueceu?',
      ],
    },
  },
  {
    prayer: {
      title: 'Aperfeiçoados para Sempre',
      text: t(`Senhor, Hebreus declara que Cristo, "havendo oferecido
        um único sacrifício pelos pecados, assentou-se para sempre à
        direita de Deus... com uma só oferta tem aperfeiçoado para
        sempre os que estão sendo santificados." A obra está
        completa, mesmo enquanto a santificação continua em processo.
        Que eu viva nessa mesma tensão de certeza e crescimento. Amém.`),
    },
    meditation: {
      prompt: t(`O texto une, sem contradição, algo já completo ("tem
        aperfeiçoado para sempre") e um processo contínuo ("os que
        estão sendo santificados") — identidade segura e crescimento
        real coexistem.`),
      questions: [
        'Você consegue viver simultaneamente com a certeza de já ser aceito por Deus e a realidade de ainda estar crescendo espiritualmente?',
        'O que significaria descansar na obra completa de Cristo enquanto ainda trabalha ativamente no seu próprio crescimento?',
        'Como essa tensão — completo e ainda em processo — descreve honestamente sua experiência espiritual atual?',
      ],
    },
  },
  {
    prayer: {
      title: 'Princípio das Dores',
      text: t(`Senhor Jesus, diante de perguntas sobre o fim dos
        tempos, alertaste sobre guerras, terremotos e fomes, mas
        acrescentaste: "não vos perturbeis... isso será o princípio
        das dores." Não é o fim, mas o começo de um processo. Ensina-me
        a enfrentar más notícias e tempos difíceis sem pânico,
        confiando que tu já sabias que viriam. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não nega que tempos difíceis viriam — ele os
        antecipa claramente, mas instrui contra o pânico, sugerindo
        que a perturbação excessiva não é resposta apropriada mesmo
        diante de crises reais.`),
      questions: [
        'Como você reage, normalmente, a notícias de crise — com pânico ou com a calma que Jesus pede aqui?',
        'O que significa, para você, que Jesus já esperava que "guerras e rumores de guerras" aconteceriam?',
        'Como você pode enfrentar incertezas atuais com mais confiança, sem negar a realidade da dificuldade?',
      ],
    },
  },
  {
    prayer: {
      title: 'Oração Honesta, Fé Perseverante',
      text: t(`Senhor, esta semana trouxe a impermanência das
        estruturas humanas, a angústia honesta de Ana transformada em
        louvor, e o chamado a não abandonar a congregação. Termino
        pedindo: que eu não deposite segurança final em estruturas
        temporárias, que eu ore com a mesma honestidade de Ana, e que
        eu permaneça fielmente conectado à minha comunidade de fé.
        Amém.`),
    },
    meditation: {
      prompt: t(`Da impermanência do templo à angústia transformada
        de Ana, a semana revelou que verdadeira segurança não está em
        estruturas ou circunstâncias, mas na relação viva com Deus e
        sua comunidade.`),
      questions: [
        'Qual dos temas desta semana — a impermanência do templo, a oração de Ana, ou não abandonar a congregação — mais te desafiou?',
        'Que oração honesta você precisa fazer nesta semana, sem esconder sua real angústia?',
        'Como você quer fortalecer sua conexão com a comunidade de fé nos próximos dias?',
      ],
    },
  },
];

// Próprio 29 (Cristo Rei) — Ezequiel 34:11-16, 20-24 · Salmo 100 · Apocalipse 1:4b-8 · João 18:33-37
const proper29: DevotionalEntry[] = [
  {
    prayer: {
      title: 'O Meu Reino Não É Deste Mundo',
      text: t(`Senhor Jesus, diante de Pilatos, declaraste: "O meu
        reino não é deste mundo... Eu para isso nasci, e para isso vim
        ao mundo, a fim de dar testemunho da verdade." Um Rei sem
        exército, sem palácio, sem violência para defender seu trono —
        apenas verdade. Que eu reconheça e sirva essa realeza que não
        se parece com nenhuma outra que o mundo conhece. Amém.`),
    },
    meditation: {
      prompt: t(`Diante de Pilatos, representante do poder político
        mais dominante da época, Jesus redefine completamente o que
        significa ser rei — não conquista territorial, mas testemunho
        da verdade.`),
      questions: [
        'Como sua compreensão de "reino" e "poder" precisa ser reformulada à luz da declaração de Jesus diante de Pilatos?',
        'O que significa, na prática, "dar testemunho da verdade" no seu contexto hoje?',
        'Como você reconhece a realeza de Cristo em sua própria vida — como algo que governa por verdade, não por força?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu Mesmo Procurarei as Minhas Ovelhas',
      text: t(`Senhor Deus, através de Ezequiel prometeste: "Eis que
        eu, eu mesmo, procurarei as minhas ovelhas, e as buscarei... a
        perdida buscarei, e a desgarrada tornarei a trazer." Diante de
        pastores que exploravam em vez de cuidar, prometeste vir tu
        mesmo pastorear. Obrigado por seres o Pastor que não
        terceiriza o cuidado por mim. Amém.`),
    },
    meditation: {
      prompt: t(`A ênfase repetida — "eu mesmo" — vem depois de uma
        denúncia severa contra pastores humanos que exploravam o
        rebanho — Deus promete cuidado pessoal e direto diante da
        liderança que falhou.`),
      questions: [
        'Você já foi decepcionado por uma liderança humana que deveria cuidar de você e não cuidou?',
        'Como a promessa de que Deus "mesmo" busca a ovelha perdida muda a forma como você encara essa decepção?',
        'Em que área você se sente hoje "perdido" ou "desgarrado", precisando ser buscado por Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Somos Ovelhas do Seu Pasto',
      text: t(`Senhor, o salmo convida: "Servi ao Senhor com
        alegria... sabei que o Senhor é Deus! Foi ele quem nos fez, e
        somos dele; somos o seu povo e ovelhas do seu pasto." No fim
        do ano litúrgico, ao celebrar Cristo Rei, quero renovar essa
        alegria simples: pertenço a ti, sou cuidado por ti. Amém.`),
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
      title: 'O Alfa e o Ômega',
      text: t(`Senhor, João escreve às sete igrejas em nome "daquele
        que é, e que era, e que há de vir" — e declara que Cristo é
        "o primogênito dos mortos e o Príncipe dos reis da terra." No
        fim de todas as coisas, "Eu sou o Alfa e o Ômega." Que essa
        certeza sustente minha esperança, sabendo que a história
        inteira está segura em tuas mãos, do início ao fim. Amém.`),
    },
    meditation: {
      prompt: t(`A afirmação "Alfa e Ômega" — primeira e última letras
        do alfabeto grego — comunica totalidade completa: Cristo
        governa do início ao fim de toda a história, não apenas em
        partes dela.`),
      questions: [
        'Você vive consciente de que Cristo governa "do início ao fim" da sua própria história, ou apenas em partes dela?',
        'O que significa para você que Cristo é "aquele que é, e que era, e que há de vir" — presente em todo tempo?',
        'Como essa totalidade da realeza de Cristo muda a forma como você encara o que ainda está por vir?',
      ],
    },
  },
  {
    prayer: {
      title: 'Julgarei Entre Ovelha e Ovelha',
      text: t(`Senhor, além de buscar as perdidas, prometeste julgar
        "entre a ovelha gorda e a ovelha magra" — confrontando quem
        empurra e escorneia os fracos. O teu cuidado pastoral inclui
        justiça, não apenas ternura. Examina se tenho, de alguma
        forma, "empurrado" os mais fracos ao meu redor. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem de ovelhas "gordas" empurrando as "magras"
        para fora do pasto retrata opressão dentro da própria
        comunidade — Deus não ignora a injustiça interna ao seu povo.`),
      questions: [
        'Existe alguma forma, mesmo sutil, pela qual você tem "empurrado" ou marginalizado os mais vulneráveis ao seu redor?',
        'Como a promessa de que Deus julga "entre ovelha e ovelha" muda sua forma de pensar sobre justiça dentro da comunidade de fé?',
        'Que voz vulnerável você precisa proteger ou defender hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Todo Aquele Que É da Verdade',
      text: t(`Senhor Jesus, concluíste diante de Pilatos: "Todo
        aquele que é da verdade ouve a minha voz." Não é convite a
        assentimento intelectual apenas, mas orientação inteira de
        vida em direção à verdade que tu representas. Que eu seja
        contado entre os que reconhecem e seguem tua voz, mesmo diante
        de autoridades que exigem outra lealdade. Amém.`),
    },
    meditation: {
      prompt: t(`Diante do poder político absoluto representado por
        Pilatos, Jesus não recua da sua identidade — ele oferece um
        critério simples e universal: quem é da verdade reconhece sua
        voz.`),
      questions: [
        'Você reconhece e segue a voz de Jesus mesmo diante de pressões que exigem outra lealdade?',
        'O que significa, para você, "ser da verdade" — não apenas conhecer fatos, mas viver orientado por ela?',
        'Como você quer terminar este ano litúrgico e começar o próximo, mais atento à voz de Cristo em meio a outras vozes concorrentes?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cristo Rei',
      text: t(`Senhor, encerramos hoje o Tempo Comum celebrando a tua
        realeza — não a de um governante distante, mas a do Pastor que
        busca pessoalmente as perdidas, julga com justiça, e testemunha
        a verdade diante de qualquer poder humano. Ao longo destas
        semanas caminhamos por Samuel e Davi, Jó e Rute, cartas e
        parábolas. Hoje, diante do teu trono, reconheço: tu és Rei —
        não pela força, mas pelo amor que se faz serviço e verdade.
        Que o novo ano litúrgico me encontre mais disposto a seguir tua
        voz do que estava há um ano. Amém.`),
    },
    meditation: {
      prompt: t(`O ano litúrgico termina não com uma imagem de poder
        triunfante distante, mas com o Rei que busca as ovelhas
        perdidas e testemunha a verdade diante de Pilatos — a realeza
        de Cristo se define pelo serviço e pela verdade, não pela
        dominação.`),
      questions: [
        'Olhando para todo o Tempo Comum que passou, que tema você sente que Deus mais trabalhou em você?',
        'O que significa, pessoalmente, chamar Jesus de "Rei" — como isso muda a forma como você organiza sua vida?',
        'Como você quer entrar no Advento que se aproxima, carregando o que aprendeu neste ano litúrgico?',
      ],
    },
  },
];

const ordinaryB: Record<number, DevotionalEntry[]> = {
  4: proper4,
  5: proper5,
  6: proper6,
  7: proper7,
  8: proper8,
  9: proper9,
  10: proper10,
  11: proper11,
  12: proper12,
  13: proper13,
  14: proper14,
  15: proper15,
  16: proper16,
  17: proper17,
  18: proper18,
  19: proper19,
  20: proper20,
  21: proper21,
  22: proper22,
  23: proper23,
  24: proper24,
  25: proper25,
  26: proper26,
  27: proper27,
  28: proper28,
  29: proper29,
};

export default ordinaryB;
