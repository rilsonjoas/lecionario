/**
 * Quaresma — Ciclo A — conteúdo ancorado no RCL (leituras reais),
 * do 1º ao 5º Domingo da Quaresma. Mesmo padrão de advent-A.ts: 5
 * semanas fixas, array de 7 DevotionalEntry por semana, índice =
 * date.getDay(). O 6º "domingo" (Domingo de Ramos) já tem conteúdo
 * dedicado em triduumContent — não faz parte deste arquivo. Escrito
 * em 2026-08-18.
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

// Quaresma 1 — Gênesis 2:15-17; 3:1-7 · Salmo 32 · Romanos 5:12-19 · Mateus 4:1-11
const week1: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Da Árvore do Conhecimento, Dessa Não Comerás',
      text: t(`Senhor, no jardim, deste uma única restrição em meio à
        liberdade completa: "de toda árvore do jardim podes comer
        livremente; mas da árvore do conhecimento do bem e do mal,
        dessa não comerás." Não escassez, mas um limite específico
        dentro de abundância generosa. Ajuda-me a ver meus próprios
        limites dessa mesma forma. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução original não era restritiva em
        essência — a permissão ("de toda árvore... livremente") vem
        primeiro e é ampla; a única exceção é pequena diante da
        abundância oferecida.`),
      questions: [
        'Você tende a focar mais nos limites que Deus estabelece ou na abundância de liberdade que ele já concedeu?',
        'Que limite específico em sua vida você trata como restrição injusta, quando na verdade é pequeno diante de tudo o mais que é livre?',
        'Como reformular sua relação com limites divinos como parte de abundância, não de escassez?',
      ],
    },
  },
  {
    prayer: {
      title: 'Certamente Não Morrereis',
      text: t(`Senhor, a serpente questionou tua palavra com uma
        meia-mentira: "certamente não morrereis." O engano começou
        duvidando da tua Palavra clara, oferecendo alternativa
        atraente. Que eu reconheça esse mesmo padrão quando a dúvida
        sutil tenta corroer minha confiança em ti. Amém.`),
    },
    meditation: {
      prompt: t(`A tentação não nega diretamente a palavra de Deus —
        ela a questiona sutilmente, plantando dúvida antes de
        oferecer alternativa, um padrão de engano que se repete ao
        longo de toda a Escritura.`),
      questions: [
        'Que "certamente não" você já ouviu — de si mesmo ou de outros — questionando sutilmente algo que Deus já deixou claro?',
        'Como identificar esse padrão de dúvida sutil antes que ele se torne desobediência completa?',
        'O que ajudaria você a se ancorar mais firmemente na palavra clara de Deus diante de vozes que a questionam?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bem-Aventurado Aquele Cuja Transgressão É Perdoada',
      text: t(`Senhor, o salmista declara: "bem-aventurado aquele
        cuja transgressão é perdoada, e cujo pecado é coberto."
        Depois da queda no Éden, esta é a resposta — não desespero
        permanente, mas a possibilidade real de perdão genuíno. Que
        eu receba esse perdão nesta primeira semana de Quaresma. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo descreve tanto o peso físico e emocional do
        pecado não confessado ("consumiram-se os meus ossos") quanto
        o alívio genuíno que vem da confissão honesta — um padrão
        experiencial, não apenas teológico.`),
      questions: [
        'Você já experimentou fisicamente o peso de um pecado não confessado, como descrito neste salmo?',
        'O que impede você de confessar mais prontamente, buscando esse alívio genuíno mais cedo?',
        'Que confissão específica você precisa trazer a Deus nesta primeira semana de Quaresma?',
      ],
    },
  },
  {
    prayer: {
      title: 'Muito Mais a Graça de Deus Abundou',
      text: t(`Senhor, Paulo contrasta: "se pela ofensa de um
        morreram muitos, muito mais a graça de Deus... abundou para
        muitos." Onde o pecado trouxe morte através de Adão, tua graça
        através de Cristo supera em muito esse dano. Que eu confie
        nessa superabundância de graça, não apenas no equilíbrio do
        pecado. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo enfatiza deliberadamente desproporção — "muito
        mais" — a graça não apenas equilibra o dano do pecado, ela o
        supera em abundância desproporcional.`),
      questions: [
        'Você tende a pensar na graça de Deus como equilibrando exatamente seus pecados, ou como superando-os desproporcionalmente?',
        'Como essa "superabundância" muda sua confiança diante de falhas que parecem grandes demais para perdoar?',
        'O que significaria viver hoje a partir dessa graça que "abunda muito mais", não apenas suficiente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nem Só de Pão Viverá o Homem',
      text: t(`Senhor Jesus, diante da primeira tentação no deserto,
        respondeste: "nem só de pão viverá o homem, mas de toda
        palavra que sai da boca de Deus." Priorizaste a Palavra
        mesmo diante de fome física real, depois de quarenta dias de
        jejum. Ensina-me essa mesma prioridade nas minhas próprias
        necessidades urgentes. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não nega a realidade da fome física genuína
        (depois de quarenta dias, "teve fome") — ele simplesmente
        recusa deixar que essa necessidade real dite suas escolhas
        acima da fidelidade à Palavra.`),
      questions: [
        'Que necessidade real e urgente você está enfrentando que poderia te tentar a comprometer princípios por alívio imediato?',
        'Como Jesus modela reconhecer necessidade real sem deixar que ela determine automaticamente a resposta?',
        'O que significaria priorizar a Palavra de Deus mesmo diante de uma necessidade física ou emocional genuína?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Tentarás o Senhor Teu Deus',
      text: t(`Senhor Jesus, diante da segunda tentação — lançar-te
        do templo para testar proteção divina — respondeste: "não
        tentarás o Senhor teu Deus." Recusaste forçar uma
        demonstração de poder para provar fé, preferindo confiança
        genuína e silenciosa. Que eu não exija provas dramáticas
        quando confiança simples já basta. Amém.`),
    },
    meditation: {
      prompt: t(`A tentação usava a própria Escritura de forma
        distorcida (citando o Salmo 91) — Jesus responde não apenas
        com outra citação, mas discernindo o uso manipulador da
        Palavra por trás da proposta.`),
      questions: [
        'Você já foi tentado a "testar" Deus, exigindo prova dramática antes de confiar genuinamente?',
        'Como discernir entre uso genuíno e uso manipulador da Escritura, mesmo quando a citação parece correta?',
        'O que significaria confiar em Deus hoje sem exigir demonstração espetacular primeiro?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eis Que Vieram os Anjos e o Serviram',
      text: t(`Senhor, encerramos esta primeira semana com o
        resultado: depois de resistir às três tentações, "o Diabo o
        deixou; e eis que vieram os anjos e o serviram." Fidelidade
        na provação foi seguida de cuidado real, não abandono. Que eu
        confie nesse mesmo cuidado depois de atravessar minhas
        próprias provações desta Quaresma. Amém.`),
    },
    meditation: {
      prompt: t(`A cena termina com cuidado divino tangível — não
        apenas alívio abstrato, mas anjos servindo concretamente —
        um lembrete de que fidelidade na provação não passa
        despercebida.`),
      questions: [
        'Esta primeira semana de Quaresma — da instrução original no Éden às tentações resistidas por Jesus — o que te ensinou sobre fidelidade em meio a provação?',
        'Você confia que, depois de atravessar suas próprias provações fielmente, haverá cuidado real esperando por você?',
        'Como você quer entrar na segunda semana da Quaresma, à luz dessa reflexão?',
      ],
    },
  },
];

// Quaresma 2 — Gênesis 12:1-4a · Salmo 121 · Romanos 4:1-5, 13-17 · João 3:1-17
const week2: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Sai-te da Tua Terra',
      text: t(`Senhor, chamaste Abrão: "sai-te da tua terra, da tua
        parentela, e da casa de teu pai, para a terra que eu te
        mostrarei." Um chamado que exigia deixar tudo o que era
        conhecido, sem mapa completo do destino. Que eu tenha essa
        mesma disposição de sair, confiando que me mostrarás o
        caminho no tempo certo. Amém.`),
    },
    meditation: {
      prompt: t(`O chamado é deliberadamente incompleto — "para a
        terra que eu te mostrarei" — Abrão precisa partir antes de
        saber o destino final, um padrão de fé que precede
        informação completa.`),
      questions: [
        'Existe um chamado atual em sua vida onde você exige um "mapa completo" antes de dar o primeiro passo?',
        'O que Abrão "deixou" para responder a esse chamado — e o que isso ensina sobre o custo real de obedecer?',
        'Que primeiro passo de obediência você poderia dar hoje, mesmo sem ver o caminho inteiro?',
      ],
    },
  },
  {
    prayer: {
      title: 'Em Ti Serão Benditas Todas as Famílias da Terra',
      text: t(`Senhor, a promessa a Abrão tinha alcance universal:
        "em ti serão benditas todas as famílias da terra." Um chamado
        pessoal com propósito muito além do indivíduo. Que eu
        reconheça que meu próprio chamado, por menor que pareça, pode
        ter esse mesmo alcance através de ti. Amém.`),
    },
    meditation: {
      prompt: t(`A bênção prometida a Abrão nunca foi apenas para
        ele — desde o início, o propósito era abençoar "todas as
        famílias da terra", um padrão que se cumpriria plenamente em
        Cristo.`),
      questions: [
        'Você vê seu próprio chamado como tendo propósito que se estende além de você mesmo?',
        'Como a bênção prometida a Abrão, cumprida em Cristo, te inclui pessoalmente hoje?',
        'Que "família" além da sua própria você poderia abençoar através da fidelidade ao seu próprio chamado?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Meu Socorro Vem do Senhor',
      text: t(`Senhor, o salmista declara: "elevo os meus olhos para
        os montes; de onde me vem o socorro? O meu socorro vem do
        Senhor, que fez os céus e a terra." Uma pergunta genuína
        seguida de resposta firme. Que eu eleve meus próprios olhos
        para essa mesma fonte segura de ajuda hoje. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo começa com pergunta genuína, não retórica
        vazia — "de onde me vem o socorro?" — antes de chegar à
        resposta firme, um padrão de busca honesta que precede
        certeza.`),
      questions: [
        'Você já fez essa pergunta genuína — "de onde me vem o socorro?" — diante de uma dificuldade real?',
        'Onde você tem buscado socorro que não seja, em última análise, "do Senhor, que fez os céus e a terra"?',
        'O que significaria elevar seus olhos, hoje, para essa fonte segura, em vez de fontes secundárias?',
      ],
    },
  },
  {
    prayer: {
      title: 'Creu Abraão a Deus, e Isso Lhe Foi Imputado Como Justiça',
      text: t(`Senhor, Paulo explica: "creu Abraão a Deus, e isso lhe
        foi imputado como justiça." Não obras, mas fé genuína
        estabeleceu a justiça de Abraão diante de ti. Que minha
        própria justiça também repouse nessa mesma fé, não em
        conquista própria. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo usa o exemplo de Abraão precisamente porque
        ele viveu antes da lei mosaica — sua justificativa não podia
        depender de obediência legal, apenas de fé genuína na
        promessa de Deus.`),
      questions: [
        'Você ainda tenta, mesmo sutilmente, basear seu valor diante de Deus em obras, em vez de fé genuína?',
        'Como o exemplo de Abraão — justificado por fé, não por lei — muda sua compreensão da sua própria posição diante de Deus?',
        'O que significaria descansar hoje nessa mesma justiça pela fé, sem tentar acrescentar mérito próprio?',
      ],
    },
  },
  {
    prayer: {
      title: 'Necessário Vos É Nascer de Novo',
      text: t(`Senhor Jesus, disseste a Nicodemos, mestre respeitado
        em Israel: "necessário vos é nascer de novo." Todo o
        conhecimento religioso dele não substituía essa transformação
        radical. Não me deixes confiar no meu próprio conhecimento
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
        'O que significa que o Espírito "sopra onde quer" — fora do seu controle ou compreensão total?',
        'Existe alguma área da sua vida que ainda não foi genuinamente "renascida", apesar do conhecimento que você já tem sobre ela?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Amou o Mundo de Tal Maneira',
      text: t(`Senhor, a frase mais conhecida das Escrituras: "Deus
        amou o mundo de tal maneira que deu o seu Filho unigênito,
        para que todo aquele que nele crê não pereça, mas tenha a
        vida eterna." Que a familiaridade dessas palavras nunca apague
        o seu peso real nesta segunda semana de Quaresma. Amém.`),
    },
    meditation: {
      prompt: t(`Esta é, talvez, a frase mais repetida do
        cristianismo — e por isso mesmo corre o risco de perder o
        impacto original. Ela nasce, no texto, de uma conversa
        noturna difícil com um único homem confuso, não de um
        discurso público grandioso.`),
      questions: [
        'Você consegue ouvir "Deus amou o mundo de tal maneira" com o mesmo peso de quem ouve pela primeira vez?',
        'Como essa promessa, nascida numa conversa privada e difícil, muda sua percepção de conversas difíceis que você mesmo enfrenta?',
        'O que significaria receber hoje esse amor com renovado assombro, não familiaridade cansada?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não para Que Julgasse o Mundo, Mas para Que o Mundo Fosse Salvo',
      text: t(`Senhor, encerramos esta segunda semana com a
        clarificação: "Deus enviou o seu Filho ao mundo, não para que
        julgasse o mundo, mas para que o mundo fosse salvo por ele."
        Tua primeira intenção sempre foi salvação, não condenação.
        Que eu trate outros com essa mesma prioridade de graça. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus é explícito sobre o propósito primário da sua
        missão — salvação, não julgamento — mesmo sabendo que
        julgamento seria consequência inevitável para quem rejeitasse
        essa salvação oferecida.`),
      questions: [
        'Esta segunda semana — do chamado incompleto de Abrão à clareza sobre o propósito salvador de Jesus — o que te ensinou sobre confiar no chamado de Deus antes de ver tudo claramente?',
        'Você trata outros primeiro com a lente de julgamento ou com essa mesma prioridade de graça salvadora?',
        'Como você quer entrar na terceira semana da Quaresma, à luz dessa reflexão?',
      ],
    },
  },
];

// Quaresma 3 — Êxodo 17:1-7 · Salmo 95 · Romanos 5:1-11 · João 4:5-42
const week3: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Dá-nos Água para Beber',
      text: t(`Senhor, diante da sede real no deserto, o povo
        exigiu de Moisés: "dá-nos água para beber" — e depois
        murmurou, duvidando da tua presença: "está o Senhor no meio
        de nós, ou não?" Necessidade real levou à dúvida sobre tua
        fidelidade. Que minhas próprias necessidades urgentes não me
        levem a duvidar da tua presença constante. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta final — "está o Senhor no meio de nós,
        ou não?" — revela o verdadeiro problema por trás da murmuração:
        não apenas sede física, mas dúvida profunda sobre a presença
        contínua de Deus em meio à dificuldade.`),
      questions: [
        'Uma necessidade física ou emocional real já te levou a duvidar da presença de Deus na sua vida?',
        'Como distinguir entre trazer uma necessidade honestamente a Deus e murmurar duvidando dele?',
        'Que "água" você precisa hoje, confiando que Deus está genuinamente "no meio de vós"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Endureçais o Vosso Coração',
      text: t(`Senhor, o salmista adverte, lembrando esse mesmo
        episódio: "não endureçais o vosso coração como em Meribá."
        Um alerta contra repetir o padrão de dúvida e murmuração dos
        antepassados. Que meu próprio coração permaneça mole e
        receptivo, não endurecido pela repetição do descontentamento.
        Amém.`),
    },
    meditation: {
      prompt: t(`O salmo transforma um episódio histórico específico
        em advertência atemporal — "hoje", não apenas "naquele dia" —
        um padrão de coração endurecido que pode se repetir em
        qualquer geração, inclusive a nossa.`),
      questions: [
        'Você reconhece em si mesmo algum sinal de "coração endurecido" através de murmuração repetida?',
        'O que ajudaria você a manter o coração mole e receptivo, mesmo diante de dificuldades reais e repetidas?',
        'Que padrão de descontentamento você precisa interromper hoje, antes que se torne endurecimento?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Esperança Não Desaponta',
      text: t(`Senhor, Paulo declara: "a esperança não desaponta,
        porquanto o amor de Deus está derramado em nossos corações
        pelo Espírito Santo que nos foi dado." Uma esperança com base
        concreta, não otimismo vago. Que eu viva a partir dessa
        esperança genuinamente fundamentada nesta terceira semana.
        Amém.`),
    },
    meditation: {
      prompt: t(`A garantia de que a esperança "não desaponta" não
        vem de circunstâncias favoráveis, mas de algo já concedido —
        o amor de Deus "derramado" — uma base que não depende de
        resultados externos.`),
      questions: [
        'Sua esperança se apoia em circunstâncias que podem mudar, ou nessa base concreta do amor de Deus já derramado?',
        'Como viver com essa confiança de que a esperança genuína "não desaponta"?',
        'Que área da sua vida precisa mais dessa esperança fundamentada hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quando Ainda Éramos Pecadores, Cristo Morreu Por Nós',
      text: t(`Senhor, Paulo continua: "Deus dá prova do seu amor
        para conosco, em que, quando éramos ainda pecadores, Cristo
        morreu por nós." Não depois de eu me tornar digno, mas
        precisamente enquanto ainda estava distante. Que eu receba
        esse amor incondicional sem tentar merecê-lo primeiro. Amém.`),
    },
    meditation: {
      prompt: t(`A ordem cronológica é central ao argumento de
        Paulo — Cristo morreu "quando ainda éramos pecadores", não
        depois de qualquer melhoria moral prévia, provando amor
        incondicional, não recompensa por bom comportamento.`),
      questions: [
        'Você recebe o amor de Deus como algo dado incondicionalmente, ou sente que precisa primeiro "melhorar" para merecê-lo?',
        'Como essa ordem — amor demonstrado antes de qualquer mérito — muda sua confiança na aceitação de Deus?',
        'O que significaria descansar hoje nesse amor já provado, independente do seu estado atual?',
      ],
    },
  },
  {
    prayer: {
      title: 'Dá-me de Beber',
      text: t(`Senhor Jesus, cansado da viagem, pediste à mulher
        samaritana: "dá-me de beber" — cruzando fronteiras étnicas e
        sociais rígidas apenas com esse simples pedido. Ensina-me
        essa mesma disposição de cruzar fronteiras que a sociedade
        considera intransponíveis. Amém.`),
    },
    meditation: {
      prompt: t(`O simples pedido de Jesus quebra múltiplas
        barreiras simultaneamente — étnica (judeu/samaritana), de
        gênero (homem/mulher sozinha), e de reputação (ela vinha
        sozinha ao poço, provável sinal de status social marginal).`),
      questions: [
        'Que fronteira social você hesita cruzar, mesmo sabendo que Jesus a cruzaria sem hesitação?',
        'Como um pedido tão simples — "dá-me de beber" — pode abrir espaço para uma conversa transformadora?',
        'Quem, na sua vida, você poderia abordar com essa mesma simplicidade vulnerável, cruzando barreiras que normalmente separam?',
      ],
    },
  },
  {
    prayer: {
      title: 'Uma Fonte de Água Que Jorre para a Vida Eterna',
      text: t(`Senhor Jesus, prometeste: "a água que eu lhe der se
        fará nele uma fonte de água que jorre para a vida eterna."
        Não apenas alívio temporário, mas fonte interior permanente e
        contínua. Que eu busque essa água viva, não apenas soluções
        passageiras para minha sede espiritual. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem da "fonte" — não apenas poço a ser
        constantemente reabastecido, mas fonte interior autossuficiente
        — sugere transformação permanente, não dependência contínua
        de fontes externas.`),
      questions: [
        'Sua vida espiritual depende mais de fontes externas constantemente reabastecidas, ou você já experimenta essa "fonte interior"?',
        'O que significaria buscar essa água viva permanente, em vez de soluções temporárias para sede espiritual recorrente?',
        'Como essa promessa muda sua expectativa sobre satisfação espiritual duradoura?',
      ],
    },
  },
  {
    prayer: {
      title: 'Agora Nós Mesmos Temos Ouvido',
      text: t(`Senhor, encerramos esta terceira semana com a
        transformação dos samaritanos: "já não é pela tua palavra que
        nós cremos; pois agora nós mesmos temos ouvido." Fé que
        começou por testemunho de outra pessoa amadureceu em encontro
        pessoal direto. Que minha própria fé também amadureça dessa
        forma. Amém.`),
    },
    meditation: {
      prompt: t(`A jornada de fé descrita — de crer pelo testemunho
        da mulher para crer por experiência própria direta — modela
        um padrão saudável de maturação espiritual, não permanência
        indefinida em fé de segunda mão.`),
      questions: [
        'Esta terceira semana — da dúvida no deserto ao encontro transformador no poço — o que te ensinou sobre buscar experiência direta de Deus, não apenas testemunho de outros?',
        'Sua fé ainda depende principalmente do testemunho de outras pessoas, ou já amadureceu em encontro pessoal direto?',
        'O que você quer levar desta semana para aprofundar esse encontro pessoal com Cristo?',
      ],
    },
  },
];

// Quaresma 4 — 1 Samuel 16:1-13 · Salmo 23 · Efésios 5:8-14 · João 9:1-41
const week4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'O Senhor Não Vê Como Vê o Homem',
      text: t(`Senhor, ao rejeitar a aparência impressionante de
        Eliabe em favor do jovem Davi, disseste: "o homem olha para o
        que está diante dos olhos, porém o Senhor olha para o
        coração." Que eu julgue, como tu, pelo que realmente importa,
        não pela primeira impressão externa. Amém.`),
    },
    meditation: {
      prompt: t(`Samuel, profeta experiente, quase comete o mesmo
        erro que qualquer pessoa cometeria — julgar por aparência
        impressionante — antes de Deus corrigir explicitamente esse
        critério de avaliação.`),
      questions: [
        'Você já julgou alguém, positiva ou negativamente, principalmente pela aparência externa impressionante ou não?',
        'Como cultivar o hábito de "olhar para o coração", como Deus ensina aqui, em vez de aparência imediata?',
        'Que "Davi" — pessoa subestimada por aparência comum — você talvez esteja ignorando ao seu redor?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ainda Falta o Menor',
      text: t(`Senhor, Jessé nem sequer havia considerado Davi digno
        de apresentar: "ainda falta o menor, que está apascentando as
        ovelhas." O escolhido estava literalmente esquecido, deixado
        de fora. Que eu não desprezes quem parece "o menor" nas minhas
        próprias avaliações de valor. Amém.`),
    },
    meditation: {
      prompt: t(`A ausência inicial de Davi na apresentação de
        Jessé — nem sequer convocado — revela como completamente ele
        era subestimado, tornando sua escolha divina ainda mais
        surpreendente.`),
      questions: [
        'Quem, na sua própria vida ou comunidade, está sendo deixado de fora por parecer "o menor" ou menos relevante?',
        'Você já foi, você mesmo, esse "menor" esquecido, e como foi reconhecido apesar disso?',
        'O que significaria buscar ativamente incluir quem normalmente é deixado de fora?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Temerei Mal Algum, Porque Tu Estás Comigo',
      text: t(`Senhor, o salmista declara: "ainda que eu ande pelo
        vale da sombra da morte, não temerei mal algum, porque tu
        estás comigo." Não ausência de perigo real, mas presença
        suficiente através dele. Sustenta-me com essa mesma confiança
        nesta quarta semana de Quaresma. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não promete evitar o "vale da sombra da
        morte" — ele promete companhia através dele, uma diferença
        importante entre segurança de circunstância e segurança de
        presença.`),
      questions: [
        'Você está atualmente atravessando algum "vale" que precisa dessa confiança específica de presença, não de ausência de dificuldade?',
        'Como distinguir entre esperar que Deus elimine o perigo e confiar que ele está presente através dele?',
        'O que significaria caminhar hoje com essa confiança, mesmo em meio a circunstâncias difíceis reais?',
      ],
    },
  },
  {
    prayer: {
      title: 'Andai Como Filhos da Luz',
      text: t(`Senhor, Paulo instrui: "outrora éreis trevas, mas
        agora sois luz no Senhor; andai como filhos da luz." Uma
        identidade já dada, com responsabilidade de vivê-la
        ativamente. Que meu comportamento reflita consistentemente
        essa identidade de luz já recebida. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não instrui a "se tornar" luz — ele afirma
        que já "sois luz", e então convida a viver de acordo com
        essa identidade já estabelecida, não a conquistá-la através
        de comportamento.`),
      questions: [
        'Você vive mais a partir da identidade "já sou luz" ou ainda tentando se tornar digno dessa descrição?',
        'Que área da sua vida ainda reflete mais "trevas" antigas do que a identidade de luz já recebida?',
        'O que significaria "andar como filho da luz" concretamente hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nem Ele Pecou Nem Seus Pais',
      text: t(`Senhor Jesus, diante do homem cego de nascença,
        rejeitaste a teologia simplista dos discípulos: "nem ele
        pecou nem seus pais; mas foi para que nele se manifestem as
        obras de Deus." Nem todo sofrimento é punição direta. Livra-
        me de julgamentos apressados sobre o sofrimento alheio. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus rejeita explicitamente a suposição comum de
        que sofrimento sempre indica pecado específico — abrindo
        espaço para uma compreensão mais complexa e compassiva do
        sofrimento humano.`),
      questions: [
        'Você já assumiu, mesmo inconscientemente, que o sofrimento de alguém era "culpa" direta dela?',
        'Como essa correção de Jesus muda sua forma de responder ao sofrimento alheio — com julgamento ou com compaixão aberta?',
        'Que sofrimento você mesmo enfrenta que precisa ser visto não como punição, mas como espaço onde Deus pode se manifestar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Uma Coisa Sei: Eu Era Cego, e Agora Vejo',
      text: t(`Senhor, diante de interrogatório hostil, o homem
        curado respondeu com simplicidade poderosa: "se é pecador,
        não sei; uma coisa sei: eu era cego, e agora vejo." Não
        precisava de teologia completa para testemunhar sua própria
        experiência real. Que meu testemunho tenha essa mesma
        simplicidade honesta. Amém.`),
    },
    meditation: {
      prompt: t(`O homem não se deixa arrastar para debates
        teológicos complexos além do que ele realmente sabe — ele se
        firma na simplicidade da sua própria experiência
        transformadora, um modelo poderoso de testemunho autêntico.`),
      questions: [
        'Você já se sentiu pressionado a ter respostas teológicas completas antes de compartilhar sua própria experiência simples de transformação?',
        'Qual é o seu próprio "eu era cego, e agora vejo" — a experiência simples e inegável que você poderia testemunhar hoje?',
        'Como cultivar essa mesma confiança simples, sem precisar resolver todas as perguntas teológicas antes de testemunhar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Permanece o Vosso Pecado',
      text: t(`Senhor, encerramos esta quarta semana com tua
        advertência final aos fariseus: "se fosseis cegos, não
        teríeis pecado; mas como agora dizeis: nós vemos, permanece o
        vosso pecado." A cegueira mais perigosa é a que se recusa a
        reconhecer sua própria existência. Examina minha própria
        presunção de já "ver" completamente. Amém.`),
    },
    meditation: {
      prompt: t(`A ironia final do capítulo é aguda — o homem
        fisicamente cego agora vê com clareza espiritual, enquanto os
        fariseus, com visão física perfeita, permanecem cegos
        precisamente por insistirem que já enxergam completamente.`),
      questions: [
        'Esta quarta semana — da escolha divina que olha o coração à cegueira espiritual que se recusa a se reconhecer — o que te ensinou sobre humildade genuína?',
        'Você já insistiu, como os fariseus, que "já vê" completamente uma situação, resistindo a reconhecer sua própria cegueira?',
        'O que você quer levar desta semana para continuar buscando visão espiritual mais clara, com humildade genuína?',
      ],
    },
  },
];

// Quaresma 5 — Ezequiel 37:1-14 · Salmo 130 · Romanos 8:6-11 · João 11:1-45
const week5: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Poderão Viver Estes Ossos?',
      text: t(`Senhor, diante de um vale cheio de ossos secos,
        perguntaste a Ezequiel: "poderão viver estes ossos?" — e ele
        respondeu honestamente: "Senhor Deus, tu o sabes." Diante do
        que parece definitivamente morto na minha própria vida, que
        eu tenha essa mesma humildade de reconhecer que só tu sabes o
        que ainda é possível. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta de Ezequiel não é fé cega nem ceticismo
        — é humildade genuína diante de uma pergunta cuja resposta
        ele reconhece não estar sob seu controle ou conhecimento.`),
      questions: [
        'Que "ossos secos" na sua vida — situação que parece definitivamente morta — você precisa trazer diante dessa mesma pergunta?',
        'Como a resposta de Ezequiel — "tu o sabes", não uma afirmação forçada de fé nem negação cética — poderia moldar sua própria oração?',
        'O que significaria confiar que Deus sabe o que ainda é possível, mesmo quando você mesmo não consegue ver?',
      ],
    },
  },
  {
    prayer: {
      title: 'Profetiza ao Fôlego da Vida',
      text: t(`Senhor, depois que os ossos ganharam forma física mas
        ainda "não havia neles fôlego", instruíste: "profetiza ao
        fôlego da vida... para que vivam." Estrutura completa ainda
        não era vida real — faltava teu Espírito. Que eu não confunda
        aparência de vida com vida genuína dada por ti. Amém.`),
    },
    meditation: {
      prompt: t(`A visão distingue deliberadamente entre restauração
        física completa (ossos, nervos, carne, pele) e vida genuína —
        só o "fôlego" final, o Espírito de Deus, transforma estrutura
        morta em existência viva real.`),
      questions: [
        'Onde em sua vida você tem estrutura completa e aparência de funcionamento, mas falta o "fôlego" genuíno de vida real?',
        'Como distinguir entre aparência externa de vitalidade e a presença real e viva do Espírito?',
        'O que significaria buscar hoje esse "fôlego" específico, não apenas melhorar estruturas externas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Das Profundezas Clamo a Ti',
      text: t(`Senhor, o salmista clama: "das profundezas clamo a
        ti, ó Senhor." Não oração distante e confortável, mas súplica
        que vem de lugar genuinamente baixo e desesperado. Que minha
        própria oração, quando estou nas profundezas, tenha essa
        mesma honestidade direta. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não disfarça a localização espiritual do
        salmista — "das profundezas" — um lugar real de desespero,
        não posição confortável de onde se ora casualmente.`),
      questions: [
        'Você já orou genuinamente "das profundezas", ou tende a suavizar sua dor real antes de trazê-la a Deus?',
        'Que "profundeza" atual você precisa reconhecer honestamente diante de Deus hoje?',
        'Como essa honestidade direta do salmista poderia libertar sua própria forma de orar em momentos difíceis?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Inclinação do Espírito É Vida e Paz',
      text: t(`Senhor, Paulo declara: "a inclinação da carne é
        morte; mas a inclinação do Espírito é vida e paz." Uma
        escolha real entre dois caminhos com resultados
        genuinamente diferentes. Que eu escolha deliberadamente a
        inclinação do Espírito hoje, não apenas por hábito, mas por
        convicção. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo apresenta uma distinção binária clara — não
        gradações sutis, mas dois caminhos com destinos opostos —
        exigindo escolha deliberada, não deriva passiva.`),
      questions: [
        'Você tem escolhido deliberadamente a "inclinação do Espírito" ou deixado a "inclinação da carne" guiar por padrão?',
        'Que decisão específica hoje pede essa escolha consciente entre os dois caminhos?',
        'Como cultivar mais consistentemente essa "inclinação do Espírito" que produz vida e paz genuínas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Jesus Chorou',
      text: t(`Senhor Jesus, diante do túmulo de Lázaro, apesar de
        já saber que o ressuscitarias, simplesmente "chorou." Tua
        divindade não eliminou tua compaixão genuína diante da dor
        humana real. Que eu não minimize minha própria dor, mesmo
        quando já confio na esperança futura. Amém.`),
    },
    meditation: {
      prompt: t(`O choro de Jesus é notável precisamente porque ele
        já sabia o que estava prestes a fazer — a certeza sobre o
        futuro não eliminou a tristeza genuína diante da dor presente
        e real.`),
      questions: [
        'Você já minimizou sua própria dor porque "sabia" que as coisas melhorariam eventualmente?',
        'Como o choro de Jesus, mesmo sabendo do milagre que viria, valida sua própria dor presente, independente da esperança futura?',
        'Que perda você precisa chorar genuinamente hoje, sem pressa de pular para a resolução?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu Sou a Ressurreição e a Vida',
      text: t(`Senhor Jesus, declaraste a Marta: "eu sou a
        ressurreição e a vida; quem crê em mim, ainda que morra,
        viverá." Não apenas capacidade de ressuscitar outros, mas
        identidade própria como fonte de vida eterna. Que eu confie
        nessa identidade central nesta última semana antes da Semana
        Santa. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não diz apenas "eu posso ressuscitar" — ele
        declara "eu sou a ressurreição", uma afirmação de identidade
        essencial, não apenas capacidade pontual demonstrada.`),
      questions: [
        'Você confia em Jesus mais como alguém que "pode fazer milagres" ou como a própria fonte essencial de vida e ressurreição?',
        'Como essa declaração de identidade, não apenas capacidade, muda sua confiança diante da morte e da perda?',
        'O que significaria viver hoje a partir dessa certeza central sobre quem Jesus realmente é?',
      ],
    },
  },
  {
    prayer: {
      title: 'Lázaro, Vem para Fora',
      text: t(`Senhor, encerramos esta última semana antes da Semana
        Santa com o comando poderoso: "Lázaro, vem para fora!" E o
        morto saiu. Tua palavra tem poder até sobre a morte já
        consumada. Que eu entre no Domingo de Ramos confiando nesse
        mesmo poder sobre qualquer coisa que pareça definitivamente
        morta em mim. Amém.`),
    },
    meditation: {
      prompt: t(`O milagre de Lázaro serve como o último e maior
        sinal de João antes da própria Paixão de Jesus — um
        antecipação direta e poderosa da ressurreição que a Semana
        Santa está prestes a celebrar.`),
      questions: [
        'Esta quinta e última semana da Quaresma — da pergunta sobre ossos secos ao chamado poderoso a Lázaro — o que te ensinou sobre o poder de Deus mesmo diante da morte?',
        'Que "Lázaro" em você — algo que parece definitivamente morto — precisa ouvir esse mesmo chamado hoje?',
        'Como você quer entrar no Domingo de Ramos e na Semana Santa que se aproxima, carregando essa confiança no poder de Deus sobre a morte?',
      ],
    },
  },
];

const lentA: Record<number, DevotionalEntry[]> = {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
  5: week5,
};

export default lentA;
