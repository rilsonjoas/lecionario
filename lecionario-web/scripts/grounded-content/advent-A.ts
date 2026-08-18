/**
 * Advento — Ciclo A — conteúdo ancorado no RCL (leituras reais).
 *
 * Mesmo padrão de scripts/grounded-content/ordinary-A.ts: cada semana
 * é um array de 7 DevotionalEntry, índice = date.getDay() (0 = domingo
 * … 6 = sábado). O Advento tem sempre exatamente 4 semanas fixas
 * (1-4), diferente do Tempo Comum — a primeira semana sempre começa
 * no domingo entre 27/nov e 3/dez, e a quarta sempre termina na
 * véspera do Natal ou perto dela. Escrito em 2026-08-18.
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

// Advento 1 — Isaías 2:1-5 · Salmo 122 · Romanos 13:11-14 · Mateus 24:36-44
const week1: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Subamos ao Monte do Senhor',
      text: t(`Senhor, Isaías vê um futuro em que "concorrerão a ele
        todas as nações" para aprender teus caminhos, e as espadas se
        transformam em relhas de arado. Neste início do Advento,
        desperta em mim o mesmo desejo dos povos daquela visão: subir
        ao teu monte, não por obrigação, mas por fome genuína de
        aprender contigo. Amém.`),
    },
    meditation: {
      prompt: t(`A visão de Isaías não é de fuga do mundo, mas de
        transformação dele — nações inteiras, não apenas indivíduos,
        convertendo instrumentos de guerra em instrumentos de
        sustento.`),
      questions: [
        'O que significaria, para você, "subir ao monte do Senhor" concretamente nesta primeira semana de Advento?',
        'Que "espada" — conflito, rivalidade, mágoa guardada — você poderia começar a transformar em algo construtivo?',
        'Como a esperança de paz entre nações se conecta com a paz que você busca nas suas próprias relações?',
      ],
    },
  },
  {
    prayer: {
      title: 'Andemos na Luz do Senhor',
      text: t(`Senhor, Isaías conclui seu convite com um chamado
        simples: "andemos na luz do Senhor." Não é visão distante
        reservada para o fim dos tempos — é caminho para hoje. Neste
        Advento, ajuda-me a andar concretamente nessa luz, não apenas
        esperar por ela. Amém.`),
    },
    meditation: {
      prompt: t(`O convite final de Isaías transforma uma visão
        cósmica e futura em instrução prática e presente: "andemos" —
        verbo de ação, não de espera passiva.`),
      questions: [
        'Como a expectativa da vinda de Cristo deveria mudar suas ações concretas hoje, não apenas seus sentimentos?',
        'O que significa "andar na luz" em contraste com apenas admirá-la de longe?',
        'Que passo prático você pode dar hoje que reflita essa luz?',
      ],
    },
  },
  {
    prayer: {
      title: 'Orai pela Paz de Jerusalém',
      text: t(`Senhor, o salmista pede: "orai pela paz de Jerusalém;
        prosperem aqueles que te amam." Uma cidade concreta, não uma
        ideia abstrata, é objeto de oração intercessória. Ensina-me a
        orar assim — por lugares e pessoas específicas, não apenas por
        "o mundo" em termos genéricos. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo nomeia um lugar específico — Jerusalém — como
        objeto de oração concreta, um modelo de intercessão que vai
        além de generalidades piedosas.`),
      questions: [
        'Você tende a orar por "o mundo" de forma genérica, ou consegue nomear lugares e pessoas específicas?',
        'Que "Jerusalém" pessoal — um lugar, uma comunidade, uma família — precisa da sua oração concreta hoje?',
        'Como buscar o bem de um lugar (mesmo sem benefício pessoal direto) reflete o coração de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Já É Hora de Despertardes do Sono',
      text: t(`Senhor, Paulo escreve: "já é hora de despertardes do
        sono; porque a nossa salvação está agora mais perto de nós do
        que quando nos tornamos crentes." O tempo passa, e a
        proximidade da tua vinda deveria produzir urgência renovada,
        não familiaridade entorpecida. Desperta-me hoje. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo usa a passagem do tempo como argumento para
        urgência — quanto mais tempo passa desde a conversão, mais
        perto (não mais distante) está a salvação completa.`),
      questions: [
        'Você sente mais urgência espiritual agora do que quando começou sua caminhada de fé, ou menos?',
        'O que "despertar do sono" significaria concretamente na sua vida esta semana?',
        'Como a proximidade crescente da vinda de Cristo deveria mudar suas prioridades diárias?',
      ],
    },
  },
  {
    prayer: {
      title: 'Revesti-vos do Senhor Jesus Cristo',
      text: t(`Senhor, Paulo instrui: "revesti-vos do Senhor Jesus
        Cristo; e não tenhais cuidado da carne em suas
        concupiscências." Não é apenas parar de fazer o mal, mas
        ativamente "vestir" algo novo — tua própria presença como
        proteção e identidade. Veste-me hoje dessa forma. Amém.`),
    },
    meditation: {
      prompt: t(`A metáfora de "vestir-se" de Cristo sugere identidade
        adotada deliberadamente, não apenas comportamento controlado —
        um revestimento ativo, não uma simples abstenção.`),
      questions: [
        'O que significa "vestir-se de Cristo" na prática, além de apenas evitar más ações?',
        'Que "roupa" você tem vestido em vez disso — hábitos, identidades — que precisa trocar?',
        'Como isso mudaria concretamente uma decisão que você enfrenta hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ninguém Sabe, Nem os Anjos',
      text: t(`Senhor Jesus, disseste que nem os anjos, nem tu mesmo em
        tua humanidade, sabiam "daquele dia e hora" — só o Pai. Há um
        limite legítimo ao conhecimento que posso ter sobre o futuro, e
        isso não é falta de fé, é honestidade. Ajuda-me a viver em paz
        com essa incerteza. Amém.`),
    },
    meditation: {
      prompt: t(`A admissão de Jesus sobre os limites do próprio
        conhecimento durante sua vida terrena é surpreendentemente
        honesta — não há vergonha nessa incerteza, apenas convite à
        confiança.`),
      questions: [
        'Você já se sentiu pressionado a ter certeza sobre coisas que, honestamente, não pode saber?',
        'Como viver bem com incerteza genuína, sem ansiedade nem falsa certeza?',
        'O que significa confiar no Pai precisamente onde o conhecimento humano — mesmo o de Jesus na carne — tinha limites?',
      ],
    },
  },
  {
    prayer: {
      title: 'Numa Hora em Que Não Penseis',
      text: t(`Senhor, encerramos a primeira semana do Advento com tua
        instrução: "numa hora em que não penseis, virá o Filho do
        homem." Não é ameaça, mas convite à vigilância alegre — viver
        preparado, não ansioso. Que eu entre nesta segunda semana com
        esse tipo de prontidão serena. Amém.`),
    },
    meditation: {
      prompt: t(`A comparação com os dias de Noé — pessoas ocupadas
        com o cotidiano normal, não perversidade extrema — sugere que
        o perigo não é a maldade óbvia, mas a distração comum do dia a
        dia.`),
      questions: [
        'Esta primeira semana de Advento — do convite de Isaías à vigilância de Jesus — o que te ensinou sobre viver preparado sem viver ansioso?',
        'Que atividades "normais" do seu cotidiano poderiam, sem perceber, estar te distraindo do que realmente importa?',
        'Como você quer entrar na segunda semana do Advento, à luz do que refletiu esta semana?',
      ],
    },
  },
];

// Advento 2 — Isaías 11:1-10 · Salmo 72:1-7, 18-19 · Romanos 15:4-13 · Mateus 3:1-12
const week2: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Um Rebento do Toco de Jessé',
      text: t(`Senhor, Isaías profetiza que "brotará um rebento do
        toco de Jessé" — vida nova brotando exatamente do que parecia
        morto e cortado. Onde em mim ou ao meu redor parece haver
        apenas "toco", sem esperança de renovação, planta ali a
        possibilidade de vida nova que só tu podes trazer. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem de um "toco" — não uma árvore saudável, mas
        o que resta depois de cortada — torna a promessa de brotamento
        ainda mais notável: vida emergindo precisamente de onde parecia
        impossível.`),
      questions: [
        'Que área da sua vida parece um "toco cortado", sem sinal de vida restante?',
        'Você já viu, na sua própria história, algo bom brotar de uma situação que parecia definitivamente encerrada?',
        'O que significaria confiar que Deus ainda pode fazer brotar algo novo, mesmo do que parece morto?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Lobo Morará com o Cordeiro',
      text: t(`Senhor, a visão de Isaías inclui paz entre criaturas
        naturalmente inimigas: "morará o lobo com o cordeiro." É
        imagem de reconciliação tão completa que parece impossível —
        e exatamente por isso revela o alcance real da tua paz.
        Aplica essa reconciliação às minhas próprias inimizades. Amém.`),
    },
    meditation: {
      prompt: t(`A visão não elimina a diferença entre lobo e
        cordeiro — ela transforma a relação entre eles, de predação
        para convivência pacífica, sem que nenhum dos dois deixe de
        ser o que é.`),
      questions: [
        'Que relação em sua vida parece tão hostil quanto "lobo e cordeiro" — impossível de reconciliar?',
        'Como a visão de Isaías desafia a ideia de que certas inimizades são simplesmente permanentes?',
        'O que um pequeno passo em direção a essa reconciliação impossível poderia parecer, esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Julgue Ele os Aflitos com Justiça',
      text: t(`Senhor, o salmista ora por um rei que "julgue os
        aflitos do povo, salve os filhos do necessitado, e esmague o
        opressor." Um retrato de liderança que existe especificamente
        para proteger os vulneráveis. Que eu reconheça e sirva essa
        mesma prioridade, em qualquer forma de influência que eu
        tenha. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo define a justiça de um bom governante
        especificamente pela forma como trata "os aflitos" e "os
        necessitados" — não por sucesso genérico, mas por proteção
        concreta dos vulneráveis.`),
      questions: [
        'Como você mede boa liderança — por resultados gerais ou por como os mais vulneráveis são tratados?',
        'Que forma de influência (mesmo pequena) você tem, e como ela poderia proteger melhor quem é mais frágil ao seu redor?',
        'O que significaria pedir a Deus, concretamente, por líderes que priorizem os aflitos?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Deus de Esperança Vos Encha de Todo Gozo',
      text: t(`Senhor, Paulo ora: "o Deus de esperança vos encha de
        todo o gozo e paz na vossa fé, para que abundeis na esperança
        pelo poder do Espírito Santo." A esperança genuína produz gozo
        e paz reais, não apenas resistência estoica. Enche-me dessa
        esperança concreta hoje. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo conecta esperança diretamente com "gozo e
        paz" experimentados agora, não apenas com uma promessa
        abstrata para o futuro distante.`),
      questions: [
        'Sua esperança em Deus produz gozo e paz reais no presente, ou permanece apenas ideia teórica sobre o futuro?',
        'O que significa que essa esperança "abunda" pelo poder do Espírito, não pelo próprio esforço de otimismo?',
        'Que área da sua vida precisa mais dessa esperança concreta hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Voz do Que Clama no Deserto',
      text: t(`Senhor, João Batista apareceu "pregando no deserto",
        cumprindo a palavra: "voz do que clama no deserto: preparai o
        caminho do Senhor." Às vezes tua mensagem mais importante vem
        de lugares e pessoas inesperadas, fora dos centros de poder.
        Ajuda-me a reconhecer tua voz onde quer que ela apareça. Amém.`),
    },
    meditation: {
      prompt: t(`João não prega no templo ou na capital, mas no
        deserto — geograficamente e socialmente à margem — e ainda
        assim sua mensagem alcança "toda a Judéia".`),
      questions: [
        'Você tende a esperar que a verdade venha de lugares "importantes" e reconhecidos?',
        'Já reconheceu a voz de Deus vindo de um lugar ou pessoa inesperada?',
        'Que "deserto" — lugar marginal, esquecido — poderia estar guardando uma mensagem importante que você ainda não ouviu?',
      ],
    },
  },
  {
    prayer: {
      title: 'Produzi Frutos Dignos de Arrependimento',
      text: t(`Senhor, João confrontou fariseus e saduceus: "produzi,
        pois, frutos dignos de arrependimento" — não bastava a
        identidade religiosa herdada ("temos por pai a Abraão"), era
        preciso transformação visível. Examina se minha própria fé
        produz fruto real, não apenas identidade confortável. Amém.`),
    },
    meditation: {
      prompt: t(`João rejeita explicitamente a segurança baseada em
        herança religiosa — "Deus pode suscitar filhos a Abraão" até
        de pedras — insistindo que fruto real, não linhagem, é o que
        importa.`),
      questions: [
        'Você já se apoiou em identidade religiosa herdada (família, tradição) em vez de transformação pessoal genuína?',
        'Que "fruto digno de arrependimento" você poderia apontar na sua própria vida recente?',
        'O que significaria examinar sua fé pelos frutos que ela produz, não apenas pela identidade que ela confere?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ele Vos Batizará no Espírito Santo e em Fogo',
      text: t(`Senhor, encerramos esta semana com a promessa de João:
        "aquele que vem após mim... ele vos batizará no Espírito
        Santo, e em fogo." Não é apenas purificação suave, mas
        transformação intensa. Que eu não tema o fogo purificador que
        talvez ainda precise passar antes do Natal chegar. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem do fogo, junto com o Espírito Santo, sugere
        que a preparação genuína para receber Cristo não é apenas
        conforto, mas também purificação real, às vezes desconfortável.`),
      questions: [
        'Esta segunda semana de Advento — do rebento de Jessé ao fogo purificador de João — o que te ensinou sobre o tipo de preparação que Deus pede?',
        'Que "fogo" purificador você suspeita que ainda precisa passar antes de estar genuinamente pronto para o Natal?',
        'Como você quer entrar na terceira semana, à luz dessa reflexão?',
      ],
    },
  },
];

// Advento 3 — Isaías 35:1-10 · Salmo 146:5-10 · Tiago 5:7-10 · Mateus 11:2-11
const week3: DevotionalEntry[] = [
  {
    prayer: {
      title: 'O Deserto Exultará e Florescerá',
      text: t(`Senhor, Isaías promete que "o deserto e a terra sedenta
        se regozijarão... florescerá abundantemente." Neste Domingo
        Gaudete, celebro que tua promessa de alegria alcança
        precisamente os lugares mais áridos e desesperançados. Faze
        florescer o que em mim está seco. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa é dirigida especificamente ao "deserto" —
        não a um jardim já florido — a alegria de Isaías é sobre
        transformação radical do que era estéril, não manutenção do
        que já era bom.`),
      questions: [
        'Que área da sua vida você descreveria hoje como "deserto" — seca, sem sinal de vida?',
        'Você consegue acreditar genuinamente que essa área específica pode florescer, não apenas sobreviver?',
        'O que significaria celebrar essa promessa hoje, no meio do Domingo Gaudete, mesmo antes de ver a mudança completa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Fortalecei as Mãos Fracas',
      text: t(`Senhor, Isaías instrui: "fortalecei as mãos fracas, e
        firmai os joelhos trementes... sede fortes, não temais." Há
        trabalho ativo de encorajamento mútuo esperado da comunidade,
        não apenas espera passiva pela tua intervenção. Usa-me para
        fortalecer alguém que está fraco hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução é dirigida à comunidade, não a Deus —
        somos chamados a participar ativamente do fortalecimento
        mútuo, não apenas esperar que Deus faça tudo sozinho.`),
      questions: [
        'Quem ao seu redor tem "mãos fracas" ou "joelhos trementes" e precisa do seu encorajamento concreto hoje?',
        'Você já recebeu esse tipo de fortalecimento de outra pessoa num momento de fraqueza?',
        'O que significaria, praticamente, "fortalecer" alguém — palavras, presença, ação?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Senhor Solta os Encarcerados',
      text: t(`Senhor, o salmista celebra que "o Senhor solta os
        encarcerados; o Senhor abre os olhos aos cegos; o Senhor
        levanta os abatidos." Uma lista de libertações concretas, não
        promessas vagas. Que categoria dessas descreve minha própria
        necessidade hoje? Vem libertar-me também. Amém.`),
    },
    meditation: {
      prompt: t(`Cada verbo do salmo descreve uma ação específica e
        concreta — soltar, abrir, levantar — não generalidades sobre
        "ajudar" ou "abençoar".`),
      questions: [
        'De que "prisão" — literal ou figurada — você precisa ser solto hoje?',
        'Que "cegueira" você reconhece em si mesmo que precisa que Deus abra?',
        'Você está mais abatido ou mais capaz de levantar outros nesta estação da sua vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sede Vós Também Pacientes',
      text: t(`Senhor, Tiago compara a paciência cristã à do lavrador
        que "espera o precioso fruto da terra, aguardando-o com
        paciência." Não é passividade vazia, mas expectativa ativa e
        confiante enquanto o fruto amadurece no tempo certo. Ensina-me
        essa paciência agrícola diante do que ainda espero de ti. Amém.`),
    },
    meditation: {
      prompt: t(`A metáfora agrícola sugere paciência informada — o
        lavrador sabe que o fruto virá, e trabalha enquanto espera, em
        vez de exigir colheita antes do tempo.`),
      questions: [
        'Que "fruto" você está esperando que ainda não amadureceu completamente?',
        'Como distinguir entre paciência ativa (trabalhando enquanto espera) e resignação passiva?',
        'O que você pode fazer, enquanto espera, que prepare o terreno para o que ainda está por vir?',
      ],
    },
  },
  {
    prayer: {
      title: 'És Tu Aquele Que Havia de Vir?',
      text: t(`Senhor Jesus, João Batista, no cárcere, mandou
        perguntar: "és tu aquele que havia de vir, ou havemos de
        esperar outro?" Mesmo o maior profeta teve momentos de dúvida
        genuína. Que eu não me envergonhe das minhas próprias
        perguntas honestas sobre quem és, especialmente nos momentos
        difíceis. Amém.`),
    },
    meditation: {
      prompt: t(`A dúvida vem do próprio João Batista — a mesma
        pessoa que já havia identificado Jesus como o Cordeiro de
        Deus — mostrando que dúvida genuína pode coexistir com fé
        real, especialmente sob pressão.`),
      questions: [
        'Você já teve, como João, uma dúvida genuína sobre Jesus mesmo depois de já ter experimentado sua presença?',
        'O que essa pergunta honesta, vinda de dentro do cárcere, ensina sobre trazer dúvidas reais a Deus?',
        'Como Jesus responde à dúvida de João — com evidência concreta, não com repreensão — muda sua forma de trazer suas próprias dúvidas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Os Cegos Vêem, os Coxos Andam',
      text: t(`Senhor Jesus, respondeste à dúvida de João não com
        argumento teórico, mas com evidência concreta: "os cegos
        vêem... os pobres é anunciado o evangelho." Tua identidade se
        prova por ação real, visível. Que eu busque essa mesma
        evidência concreta na minha própria experiência de fé. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus responde citando ação observável, não
        afirmação de identidade — deixando que a evidência concreta
        fale por si mesma, convidando João a tirar suas próprias
        conclusões.`),
      questions: [
        'Que evidência concreta da presença de Jesus você pode observar na sua própria vida, não apenas crença abstrata?',
        'Como comunicar sua fé através de ação visível, não apenas afirmação verbal?',
        'O que significaria buscar mais essa evidência prática quando a dúvida aparecer?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bem-Aventurado o Que Não Se Escandalizar de Mim',
      text: t(`Senhor, encerramos esta semana com tua bênção
        condicional: "bem-aventurado é aquele que não se escandalizar
        de mim." Há algo em ti — talvez tua humildade, teu caminho
        pela cruz — que ainda hoje escandaliza expectativas. Que eu
        não me escandalize do Messias real, em vez do que eu
        preferiria que fosses. Amém.`),
    },
    meditation: {
      prompt: t(`A bênção reconhece implicitamente que Jesus poderia
        "escandalizar" — ele não corresponde perfeitamente às
        expectativas messiânicas de João nem às nossas próprias,
        ainda hoje.`),
      questions: [
        'Esta semana — da alegria do deserto florescendo à pergunta honesta de João — o que te ensinou sobre esperar por um Messias real, não idealizado?',
        'Existe algo sobre Jesus — seus ensinos, seu caminho — que ainda genuinamente te desafia ou "escandaliza"?',
        'O que significaria receber a Cristo real, não uma versão editada segundo suas próprias expectativas, nesta última semana antes do Natal?',
      ],
    },
  },
];

// Advento 4 — Isaías 7:10-16 · Salmo 80:1-7, 17-19 · Romanos 1:1-7 · Mateus 1:18-25
const week4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Pede para Ti um Sinal',
      text: t(`Senhor, ofereceste a Acaz um sinal — "pede-o ou em
        baixo nas profundezas ou em cima nas alturas" — e ele recusou,
        disfarçando covardia de piedade: "não porei à prova o
        Senhor." Ajuda-me a não confundir minha própria hesitação de
        fé com humildade espiritual. Amém.`),
    },
    meditation: {
      prompt: t(`A recusa de Acaz soa piedosa ("não porei à prova o
        Senhor"), mas Isaías a interpreta como desobediência
        disfarçada — Deus havia genuinamente oferecido o sinal, e
        recusá-lo não era virtude.`),
      questions: [
        'Você já disfarçou hesitação ou medo de piedade, recusando um convite genuíno de Deus?',
        'Como distinguir humildade genuína de covardia espiritual disfarçada?',
        'Que "sinal" Deus pode estar oferecendo que você tem relutado em pedir ou receber?',
      ],
    },
  },
  {
    prayer: {
      title: 'Emanuel, Deus Conosco',
      text: t(`Senhor, apesar da recusa de Acaz, deste o sinal de
        qualquer forma: "uma virgem conceberá, e dará à luz um filho,
        e será o seu nome Emanuel" — Deus conosco. Tua promessa não
        depende da minha disposição de recebê-la corretamente. Que eu
        me maraville novamente com essa proximidade nesta última
        semana de Advento. Amém.`),
    },
    meditation: {
      prompt: t(`O sinal é dado apesar da falta de fé de Acaz — a
        graça de Deus opera mesmo quando a resposta humana é
        inadequada ou hesitante.`),
      questions: [
        'Como o nome "Emanuel" — Deus conosco — muda sua percepção da proximidade de Deus na sua vida cotidiana?',
        'Você vive mais consciente de um Deus distante ou de um Deus genuinamente "conosco"?',
        'O que significaria viver esta semana com essa consciência renovada de proximidade divina?',
      ],
    },
  },
  {
    prayer: {
      title: 'Faze Resplandecer o Teu Rosto',
      text: t(`Senhor, o salmista repete três vezes: "faze resplandecer
        o teu rosto, para que sejamos salvos." Um refrão de súplica
        insistente por presença renovada. Nesta última semana antes
        do Natal, faz resplandecer teu rosto sobre mim de forma
        renovada. Amém.`),
    },
    meditation: {
      prompt: t(`A repetição do refrão sugere súplica persistente,
        não resignação — o salmista continua pedindo a mesma coisa,
        confiando que a repetição não diminui, mas intensifica, a
        oração.`),
      questions: [
        'Existe uma súplica que você tem repetido, sem se envergonhar da repetição?',
        'O que significa "o rosto de Deus resplandecer" sobre você — como isso mudaria seu dia hoje?',
        'Como a persistência dessa oração, repetida três vezes no salmo, encoraja sua própria persistência?',
      ],
    },
  },
  {
    prayer: {
      title: 'Separado para o Evangelho de Deus',
      text: t(`Senhor, Paulo se descreve como "separado para o
        evangelho de Deus" — um chamado específico, não genérico.
        Nesta véspera do Natal, ajuda-me a reconhecer meu próprio
        chamado específico, do jeito que Paulo reconheceu o dele.
        Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não se descreve apenas como "cristão" em
        termos gerais, mas "separado" para uma missão específica —
        um chamado particular dentro do chamado geral à fé.`),
      questions: [
        'Você já refletiu sobre seu próprio chamado específico, além da identidade geral de "cristão"?',
        'O que significaria ser "separado" para algo específico que só você pode fazer da forma que você faz?',
        'Como essa reflexão se conecta com a proximidade do Natal, celebração do chamado específico de Jesus?',
      ],
    },
  },
  {
    prayer: {
      title: 'José Era Justo',
      text: t(`Senhor, José, diante de uma situação que o feriria
        publicamente, escolheu misericórdia: sendo "justo, e não a
        queria infamar, intentou deixá-la secretamente." Sua justiça
        se expressava em compaixão, não em vingança legal. Ensina-me
        esse tipo de justiça generosa diante das minhas próprias
        decepções. Amém.`),
    },
    meditation: {
      prompt: t(`A "justiça" de José, segundo os padrões da época,
        lhe daria direito a expor Maria publicamente — ele escolhe,
        em vez disso, o caminho mais gentil disponível, mesmo antes de
        receber a revelação angelical.`),
      questions: [
        'Diante de uma decepção ou traição percebida, você tende para vingança legal (mesmo que "justificada") ou misericórdia?',
        'Como José combina integridade pessoal ("justo") com compaixão prática, sem contradição?',
        'Que situação atual pede de você esse tipo de justiça generosa, antes mesmo de ter clareza completa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Fez Como o Anjo do Senhor Lhe Ordenara',
      text: t(`Senhor, depois do sonho revelador, José simplesmente
        "fez como o anjo do Senhor lhe ordenara" — obediência
        imediata e completa, sem registro de mais protesto ou dúvida.
        Concede-me essa mesma disposição de agir rapidamente quando
        reconheço claramente tua vontade. Amém.`),
    },
    meditation: {
      prompt: t(`O texto não registra nenhuma hesitação adicional de
        José depois do sonho — a obediência é imediata, apesar do
        custo social e pessoal envolvido em recebê-la publicamente.`),
      questions: [
        'Existe alguma instrução clara de Deus que você já recebeu, mas ainda hesita em cumprir completamente?',
        'O que ajudaria você a agir com a mesma prontidão de José, uma vez reconhecida a vontade de Deus?',
        'Como a disposição silenciosa de José — sem drama nem resistência registrada — desafia sua própria forma de responder a Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Chamarás o Seu Nome Jesus',
      text: t(`Senhor, encerramos o Advento com o anjo instruindo José:
        "chamarás o seu nome Jesus; porque ele salvará o seu povo dos
        seus pecados." Todo este tempo de espera converge nesse nome
        e nesse propósito específico. Que eu entre no Natal lembrando
        exatamente o que — e quem — estou celebrando. Amém.`),
    },
    meditation: {
      prompt: t(`O nome "Jesus" (Yeshua, "o Senhor salva") já contém,
        em si mesmo, o propósito completo da encarnação — não é nome
        arbitrário, mas declaração teológica desde o primeiro momento.`),
      questions: [
        'Todo este Advento — de "Emanuel" a "Jesus" — o que você quer levar para a celebração do Natal que se aproxima?',
        'O que significa, pessoalmente, que Jesus veio especificamente para "salvar do pecado", não apenas para inspirar ou ensinar?',
        'Como você quer entrar no Natal, à luz de tudo que refletiu neste Advento?',
      ],
    },
  },
];

const adventA: Record<number, DevotionalEntry[]> = {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
};

export default adventA;
