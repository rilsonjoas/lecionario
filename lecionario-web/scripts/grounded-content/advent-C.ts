/**
 * Advento — Ciclo C — conteúdo ancorado no RCL (leituras reais).
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

// Advento 1 — Jeremias 33:14-16 · Salmo 25:1-10 · 1 Tessalonicenses 3:9-13 · Lucas 21:25-36
const week1: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Cumprirei a Boa Palavra',
      text: t(`Senhor, através de Jeremias prometes: "eis que vêm os
        dias... em que cumprirei a boa palavra que falei." Uma
        promessa antiga, ainda pendente, mas certa. Neste início do
        Advento, renova em mim a confiança de que tuas promessas mais
        antigas ainda estão a caminho de se cumprir. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa vem num momento de crise nacional para
        Judá — Jeremias profetiza restauração precisamente quando as
        circunstâncias pareciam mais desesperadoras.`),
      questions: [
        'Que promessa antiga de Deus você ainda espera ver cumprida?',
        'Como manter confiança numa promessa quando as circunstâncias parecem apontar na direção oposta?',
        'O que significaria renovar essa esperança especificamente neste início do Advento?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Senhor É Nossa Justiça',
      text: t(`Senhor, o nome prometido para o Renovo de Davi é "O
        SENHOR É NOSSA JUSTIÇA" — não justiça conquistada por mérito
        próprio, mas concedida como identidade. Que eu viva esta
        semana a partir dessa justiça já dada, não de uma que preciso
        provar. Amém.`),
    },
    meditation: {
      prompt: t(`O nome messiânico atribui a justiça diretamente a
        Deus, não ao povo que a recebe — uma justiça concedida, não
        conquistada por desempenho.`),
      questions: [
        'Você vive mais a partir de uma justiça que sente precisar provar, ou de uma já concedida por Deus?',
        'O que mudaria se você confiasse plenamente nesse nome — "o Senhor é nossa justiça" — como sua própria identidade?',
        'Que área da sua vida você ainda tenta justificar por esforço próprio, em vez de receber como dom?',
      ],
    },
  },
  {
    prayer: {
      title: 'Faze-me Saber os Teus Caminhos',
      text: t(`Senhor, o salmista pede: "faze-me saber os teus
        caminhos, Senhor; ensina-me as tuas veredas." Um pedido de
        aprendizado contínuo, não de conhecimento já completo. Que eu
        entre neste Advento com essa mesma disposição de aprendiz,
        não de quem já sabe tudo. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo usa uma linguagem de aprendizado contínuo —
        "faze-me saber", "ensina-me" — apropriada para alguém em
        processo, não para quem já domina completamente o caminho.`),
      questions: [
        'Você entra neste Advento com disposição de aprendiz, ou já sente que "sabe" tudo sobre essa estação?',
        'Que caminho específico de Deus você ainda precisa que ele te ensine?',
        'Como cultivar humildade genuína de aprendizado, mesmo depois de anos de fé?',
      ],
    },
  },
  {
    prayer: {
      title: 'Suprir o Que Falta à Vossa Fé',
      text: t(`Senhor, Paulo ora pelos tessalonicenses para "suprir o
        que falta à vossa fé" — reconhecendo que mesmo fé genuína
        ainda tem lacunas a preencher. Examina honestamente onde
        minha própria fé ainda tem lacunas, e supre o que falta. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não trata a fé dos tessalonicenses como
        deficiente ou falsa — apenas incompleta, ainda em processo de
        crescimento, como toda fé genuína permanece.`),
      questions: [
        'Que "lacuna" você reconhece honestamente na sua própria fé, sem se envergonhar disso?',
        'Como distinguir entre fé genuína ainda incompleta e fé insuficiente?',
        'O que ajudaria a suprir essa lacuna específica nesta estação do Advento?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sinais no Sol, na Lua e nas Estrelas',
      text: t(`Senhor Jesus, descreves sinais cósmicos perturbadores
        antes da tua vinda. Diante de notícias alarmantes do meu
        próprio tempo, ajuda-me a interpretar os sinais com fé, não
        com pânico — reconhecendo tua soberania mesmo sobre o que
        parece descontrolado. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem apocalíptica de Lucas, como a de Marcos,
        visa fortalecer a fé diante de eventos aterrorizantes, não
        produzir especulação ansiosa sobre datas específicas.`),
      questions: [
        'Que eventos atuais mais alimentam sua própria ansiedade sobre o futuro?',
        'Como interpretar sinais perturbadores com fé, em vez de pânico ou especulação excessiva?',
        'O que significaria confiar na soberania de Deus precisamente onde o mundo parece mais instável?',
      ],
    },
  },
  {
    prayer: {
      title: 'Levantai as Vossas Cabeças',
      text: t(`Senhor, apesar dos sinais alarmantes, instruíste:
        "exultai e levantai as vossas cabeças, porque a vossa redenção
        se aproxima." A mesma crise que assusta outros é, para os que
        confiam em ti, motivo de esperança elevada. Que eu levante
        minha cabeça diante das dificuldades que enfrento hoje. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus inverte a reação esperada — diante de sinais
        de crise, o instinto natural seria abaixar a cabeça em medo;
        ele instrui o oposto, levantar a cabeça em esperança.`),
      questions: [
        'Diante de uma crise atual, sua reação instintiva é abaixar a cabeça em medo ou levantá-la em esperança?',
        'O que possibilita essa inversão — ver na crise um sinal de redenção próxima, não apenas de perigo?',
        'Que "cabeça abaixada" você precisa levantar hoje, confiando nessa promessa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vigiai, em Todo o Tempo, Orando',
      text: t(`Senhor, encerramos a primeira semana com tua instrução
        combinada: "vigiai, pois, em todo o tempo, orando." Vigilância
        e oração juntas, não separadas — um sustenta o outro. Que essa
        combinação marque como entro na segunda semana do Advento.
        Amém.`),
    },
    meditation: {
      prompt: t(`A instrução final une deliberadamente dois verbos —
        vigiar e orar — sugerindo que vigilância sem oração se torna
        ansiedade, e oração sem vigilância se torna passividade.`),
      questions: [
        'Esta primeira semana — da promessa de Jeremias à vigilância combinada de Jesus — o que te ensinou sobre esperar com fé ativa?',
        'Você tende mais para vigilância ansiosa ou oração passiva? Como unir as duas?',
        'Como você quer entrar na segunda semana do Advento, à luz dessa instrução?',
      ],
    },
  },
];

// Advento 2 — Malaquias 3:1-4 · Lucas 1:68-79 · Filipenses 1:3-11 · Lucas 3:1-6
const week2: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Quem Suportará o Dia da Sua Vinda?',
      text: t(`Senhor, Malaquias pergunta: "quem suportará o dia da
        sua vinda? e quem subsistirá, quando ele aparecer?" Tua vinda
        não é apenas conforto, mas também julgamento purificador,
        "como o fogo de fundidor". Prepara meu coração para essa
        purificação, não apenas para o consolo. Amém.`),
    },
    meditation: {
      prompt: t(`Malaquias combina expectativa messiânica com
        seriedade sobre o julgamento — a vinda de Deus não é
        automaticamente confortável para todos, exige preparação
        genuína.`),
      questions: [
        'Você tende a pensar na vinda de Cristo apenas como conforto, esquecendo o aspecto de purificação?',
        'O que em você precisa ser refinado "como ouro e como prata" antes de estar pronto para recebê-lo plenamente?',
        'Como equilibrar expectativa alegre com seriedade genuína sobre transformação necessária?',
      ],
    },
  },
  {
    prayer: {
      title: 'Purificará os Filhos de Levi',
      text: t(`Senhor, a purificação profetizada por Malaquias visava
        especificamente "os filhos de Levi" — os próprios sacerdotes,
        líderes religiosos. Ninguém, nem mesmo os mais próximos do
        ministério, está isento dessa purificação. Examina também os
        meus próprios papéis de liderança e serviço. Amém.`),
    },
    meditation: {
      prompt: t(`É significativo que a purificação comece pelos
        líderes religiosos, não pelo povo em geral — proximidade
        institucional com o sagrado não isenta ninguém de exame
        genuíno.`),
      questions: [
        'Você já assumiu que sua proximidade com coisas espirituais (liderança, ministério, conhecimento) te isentava de exame pessoal?',
        'Que área da sua própria "liderança" — em casa, no trabalho, na igreja — precisa dessa purificação?',
        'Como manter humildade genuína mesmo em posições de responsabilidade espiritual?',
      ],
    },
  },
  {
    prayer: {
      title: 'Para Nos Livrar dos Nossos Inimigos',
      text: t(`Senhor, Zacarias profetiza sobre seu filho João, mas
        centraliza tua ação: "para nos livrar dos nossos inimigos... e
        alumiar aos que jazem nas trevas." A obra é sempre tua, mesmo
        quando usas pessoas específicas para cumpri-la. Usa-me
        também, sem que eu esqueça de quem vem o poder real. Amém.`),
    },
    meditation: {
      prompt: t(`O cântico de Zacarias, embora celebre o nascimento
        de seu próprio filho, mantém o foco teológico em Deus como
        ator principal — João é instrumento, não protagonista.`),
      questions: [
        'Quando Deus usa você para algo significativo, você consegue manter o foco nele, não em si mesmo?',
        'Como Zacarias modela gratidão por um filho especial sem perder de vista quem realmente age através dele?',
        'Que "trevas" ao seu redor você poderia ajudar a iluminar, sabendo que a luz real vem de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Aquele Que em Vós Começou a Boa Obra',
      text: t(`Senhor, Paulo confia: "aquele que em vós começou a boa
        obra a aperfeiçoará até o dia de Cristo Jesus." Uma obra
        iniciada por ti será completada por ti — não depende
        inteiramente do meu próprio esforço perseverante. Descanso
        nessa promessa hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A confiança de Paulo se apoia inteiramente na
        fidelidade de Deus para completar o que começou — não na
        capacidade dos próprios filipenses de se aperfeiçoarem
        sozinhos.`),
      questions: [
        'Você tende a sentir que precisa "completar sozinho" a obra que Deus começou em você?',
        'Como essa confiança — que Deus completará o que começou — muda sua ansiedade sobre seu próprio progresso espiritual?',
        'Que "boa obra" você reconhece que Deus começou em você, ainda incompleta?',
      ],
    },
  },
  {
    prayer: {
      title: 'Veio a Palavra de Deus a João',
      text: t(`Senhor, Lucas situa cuidadosamente o ministério de
        João no tempo histórico exato — imperadores, governadores,
        sumos sacerdotes nomeados. Tua palavra chega dentro da
        história real, não fora dela. Ajuda-me a reconhecer tua
        palavra chegando dentro da minha própria realidade concreta
        hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A lista detalhada de autoridades políticas e
        religiosas ancora o evangelho firmemente na história
        verificável — não é mito atemporal, mas evento situado num
        momento específico.`),
      questions: [
        'Você tende a pensar na ação de Deus como algo distante da sua realidade histórica concreta, ou genuinamente presente nela?',
        'Que "contexto histórico" da sua própria vida — trabalho, família, circunstâncias específicas — Deus pode estar usando para falar?',
        'Como essa ancoragem histórica do evangelho fortalece sua confiança na sua realidade?',
      ],
    },
  },
  {
    prayer: {
      title: 'Todo Vale Se Encherá',
      text: t(`Senhor, Lucas cita a mesma profecia de Isaías: "todo
        vale se encherá, e se abaixará todo monte." Nesta segunda
        semana do Advento, continua nivelando os obstáculos internos
        que ainda impedem meu caminho até ti. Amém.`),
    },
    meditation: {
      prompt: t(`A citação repetida da imagem de nivelamento — em
        Isaías e agora em Lucas — reforça que essa preparação de
        caminho é tema central e recorrente do Advento inteiro.`),
      questions: [
        'Que "vale" ou "monte" você já começou a examinar nesta primeira parte do Advento?',
        'Como continuar esse trabalho de nivelamento interior nesta segunda semana?',
        'O que mudaria se você tratasse esse nivelamento como processo contínuo, não tarefa única?',
      ],
    },
  },
  {
    prayer: {
      title: 'Toda a Carne Verá a Salvação de Deus',
      text: t(`Senhor, encerramos esta semana com a promessa
        universal: "toda a carne verá a salvação de Deus." Não
        exclusiva, mas alcançando todos. Que minha própria esperança
        nesta estação inclua essa amplitude — não apenas minha
        salvação pessoal, mas a de toda a humanidade. Amém.`),
    },
    meditation: {
      prompt: t(`A citação de Isaías por Lucas termina com escopo
        deliberadamente universal — "toda a carne" — ampliando o
        ministério de João além de fronteiras étnicas ou religiosas
        estreitas.`),
      questions: [
        'Esta segunda semana — da purificação de Malaquias à universalidade da salvação — o que te ensinou sobre o alcance completo do plano de Deus?',
        'Sua própria esperança inclui essa amplitude universal, ou permanece estreitamente pessoal?',
        'Como você quer entrar na terceira semana do Advento, à luz dessa reflexão?',
      ],
    },
  },
];

// Advento 3 — Sofonias 3:14-20 · Isaías 12:2-6 · Filipenses 4:4-7 · Lucas 3:7-18
const week3: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Canta Alegremente, Ó Filha de Sião',
      text: t(`Senhor, Sofonias convoca: "canta alegremente, ó filha
        de Sião; rejubila, ó Israel." Neste Domingo Gaudete, que essa
        alegria não seja forçada, mas resposta genuína à tua presença
        — "o Rei de Israel, o Senhor, está no meio de ti." Amém.`),
    },
    meditation: {
      prompt: t(`A alegria convocada por Sofonias tem fundamento
        específico — não é otimismo genérico, mas resposta à presença
        real e ativa de Deus "no meio" do povo.`),
      questions: [
        'Sua alegria neste Domingo Gaudete é genuína e fundamentada, ou você sente pressão de "parecer alegre"?',
        'O que significa que Deus está "no meio de ti" — como isso muda sua experiência do cotidiano?',
        'Como cultivar alegria genuína, não performática, nesta estação?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ele Se Deleitará em Ti com Alegria',
      text: t(`Senhor, Sofonias promete algo surpreendente: "ele se
        deleitará em ti com alegria... regozijar-se-á em ti com
        júbilo." Não sou apenas objeto da tua obrigação — sou fonte
        genuína do teu prazer. Que eu viva a partir dessa certeza
        hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem de Deus se "deleitando" e "regozijando"
        sobre seu povo inverte a direção esperada — não apenas
        recebemos alegria dele, ele encontra alegria genuína em nós.`),
      questions: [
        'Você já considerou que Deus genuinamente se deleita em você, não apenas te tolera ou administra?',
        'Como essa certeza — de ser fonte de alegria para Deus, não apenas objeto de dever — muda sua autoimagem?',
        'O que significaria viver hoje a partir dessa certeza de ser amado com deleite, não apenas com obrigação?',
      ],
    },
  },
  {
    prayer: {
      title: 'Com Alegria Tirareis Águas',
      text: t(`Senhor, Isaías celebra: "com alegria tirareis águas das
        fontes da salvação." Uma necessidade básica — água — atendida
        com celebração genuína, não apenas alívio funcional. Que eu
        experimente essa mesma alegria ao receber tua provisão
        cotidiana. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem combina necessidade prática (água) com
        celebração genuína — sugerindo que até as provisões mais
        básicas de Deus merecem gratidão jubilosa, não apenas
        aceitação funcional.`),
      questions: [
        'Você tende a receber a provisão básica de Deus com gratidão jubilosa ou apenas aceitação funcional?',
        'O que ajudaria você a "tirar água com alegria" das provisões cotidianas que às vezes toma por garantidas?',
        'Que necessidade básica você poderia celebrar hoje, em vez de apenas atender?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Andeis Ansiosos por Coisa Alguma',
      text: t(`Senhor, Paulo instrui: "não andeis ansiosos por coisa
        alguma; antes em tudo sejam os vossos pedidos conhecidos
        diante de Deus." Não é supressão de preocupação, mas
        transformação dela em oração específica. Ajuda-me a trazer
        minhas ansiedades concretas a ti hoje, não apenas suprimi-las.
        Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não pede supressão emocional — ele oferece
        alternativa ativa: transformar ansiedade em petição específica
        e concreta trazida a Deus.`),
      questions: [
        'Você tende a suprimir ansiedade ou transformá-la genuinamente em oração específica?',
        'Que ansiedade concreta você precisa trazer a Deus hoje, com detalhes específicos, não generalidades?',
        'Como a promessa de "paz que excede todo entendimento" muda sua expectativa sobre o resultado dessa oração?',
      ],
    },
  },
  {
    prayer: {
      title: 'Que Faremos, Pois?',
      text: t(`Senhor, diante da pregação de João, as multidões
        perguntaram: "que faremos, pois?" — e ele respondeu com
        instruções concretas e práticas: repartir túnicas, não
        extorquir, contentar-se com o soldo. Que meu próprio
        arrependimento produza essa mesma aplicação prática e
        específica. Amém.`),
    },
    meditation: {
      prompt: t(`As respostas de João são notavelmente práticas e
        específicas para cada grupo (povo geral, publicanos, soldados)
        — não princípios abstratos, mas aplicações concretas por
        contexto de vida.`),
      questions: [
        'Diante de um chamado ao arrependimento, você busca aplicações concretas e específicas, ou permanece em princípios gerais?',
        'Que instrução prática e específica — como as que João deu — você precisa aplicar na sua própria situação de vida?',
        'Como a especificidade das instruções de João desafia respostas espirituais vagas demais?',
      ],
    },
  },
  {
    prayer: {
      title: 'Aquele Que Tem Duas Túnicas, Reparta',
      text: t(`Senhor, a instrução mais simples de João foi: "aquele
        que tem duas túnicas, reparta com o que não tem nenhuma."
        Generosidade concreta, proporcional ao que já se possui.
        Examina o que tenho "em dobro" que poderia ser repartido hoje.
        Amém.`),
    },
    meditation: {
      prompt: t(`A instrução não exige doação sacrificial extrema —
        apenas repartir o excedente óbvio (a segunda túnica), tornando
        a generosidade acessível e concreta, não apenas idealista.`),
      questions: [
        'O que você possui "em dobro" — recursos, tempo, capacidade — que poderia repartir concretamente hoje?',
        'Por que às vezes é mais fácil imaginar generosidade extrema e sacrificial do que praticar generosidade simples e acessível?',
        'Que pessoa específica poderia se beneficiar da sua "segunda túnica" nesta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Anunciava o Evangelho ao Povo',
      text: t(`Senhor, encerramos esta semana com a descrição do
        ministério de João: "com muitas outras exortações ainda,
        anunciava o evangelho ao povo." Até a pregação mais dura de
        arrependimento era, no fundo, boa notícia. Que eu reconheça a
        mesma coisa nas correções que recebo. Amém.`),
    },
    meditation: {
      prompt: t(`Lucas descreve deliberadamente a pregação exigente
        de João — chamado ao arrependimento, instruções práticas
        rigorosas — como "evangelho", boa notícia, não apenas
        cobrança.`),
      questions: [
        'Esta terceira semana — da alegria genuína de Sofonias às instruções práticas de João — o que te ensinou sobre a relação entre alegria e responsabilidade?',
        'Você já recebeu uma correção difícil que, olhando para trás, era genuinamente "boa notícia" para você?',
        'Como você quer entrar na última semana do Advento, à luz dessa reflexão?',
      ],
    },
  },
];

// Advento 4 — Miquéias 5:2-5a · Salmo 80:1-7 · Hebreus 10:5-10 · Lucas 1:39-55
const week4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Tu, Belém Efrata, Posto Que Pequena',
      text: t(`Senhor, Miquéias profetiza que de Belém, "pequena para
        estar entre os milhares de Judá", sairá o governante de
        Israel. Tua grandeza escolhe lugares pequenos, desprezados,
        para se manifestar. Que eu não desprezes o pequeno e escondido
        na minha própria vida — pode ser exatamente onde ages. Amém.`),
    },
    meditation: {
      prompt: t(`A escolha deliberada de um lugar pequeno e
        insignificante para o nascimento do Messias é padrão
        recorrente na forma como Deus age — através do pequeno, não do
        grandioso esperado.`),
      questions: [
        'Você já desprezou algo pequeno ou insignificante em sua própria vida que, na verdade, era exatamente onde Deus estava agindo?',
        'Como a escolha de Belém desafia expectativas humanas sobre onde procurar grandeza?',
        'Que "pequenez" em você mesmo Deus poderia estar usando, apesar de parecer insuficiente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ele Será a Nossa Paz',
      text: t(`Senhor, Miquéias conclui: "e este será a nossa paz."
        Não apenas um governante entre outros, mas a própria
        substância da paz. Nesta última semana antes do Natal, que eu
        busque essa paz especificamente em ti, não em circunstâncias
        externas favoráveis. Amém.`),
    },
    meditation: {
      prompt: t(`A identificação do Messias diretamente com "a
        paz" — não apenas alguém que traz paz — sugere uma paz
        essencial e pessoal, não apenas ausência de conflito externo.`),
      questions: [
        'Sua busca por paz depende mais de circunstâncias externas favoráveis ou da pessoa de Cristo diretamente?',
        'O que significaria buscar hoje "a paz" identificada diretamente com Cristo, não com resolução de problemas externos?',
        'Que área de conflito interno você precisa entregar a essa paz nesta última semana do Advento?',
      ],
    },
  },
  {
    prayer: {
      title: 'Faze Resplandecer o Teu Rosto',
      text: t(`Senhor, o salmista repete o refrão familiar: "faze
        resplandecer o teu rosto, para que sejamos salvos." Nesta
        véspera de véspera do Natal, renova essa súplica com
        expectativa crescente pela celebração que se aproxima. Amém.`),
    },
    meditation: {
      prompt: t(`O mesmo refrão de súplica que apareceu na primeira
        semana do Advento (Ciclo B) retorna aqui — um lembrete de que
        a mesma oração pode ser repetida com crescente expectativa ao
        longo de toda a estação.`),
      questions: [
        'Como sua expectativa por essa "luz do rosto de Deus" cresceu ao longo deste Advento?',
        'O que mudaria se você trouxesse essa mesma súplica com renovada urgência nestes últimos dias antes do Natal?',
        'Que "salvação" específica você mais precisa nesta reta final do Advento?',
      ],
    },
  },
  {
    prayer: {
      title: 'Um Corpo Me Preparaste',
      text: t(`Senhor Jesus, o autor de Hebreus cita tua disposição:
        "eis-me aqui... para fazer, ó Deus, a tua vontade" — um corpo
        preparado especificamente para cumprir o que sacrifícios
        antigos não podiam completar. Que meu próprio corpo e vida
        sejam oferecidos com essa mesma disposição. Amém.`),
    },
    meditation: {
      prompt: t(`A citação do salmo aplicada a Cristo enfatiza a
        encarnação como oferta corporal deliberada — não espírito
        distante, mas corpo real, preparado especificamente para
        cumprir a vontade de Deus.`),
      questions: [
        'Você trata seu próprio corpo como instrumento disponível para a vontade de Deus, ou como algo separado da sua espiritualidade?',
        'O que significaria oferecer concretamente seu corpo — tempo, energia física, presença — ao serviço de Deus esta semana?',
        'Como a encarnação, celebrada no Natal que se aproxima, dignifica a existência corporal humana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Saltou a Criancinha no Seu Ventre',
      text: t(`Senhor, quando Maria visitou Isabel, "saltou a
        criancinha no seu ventre" — reconhecimento antes mesmo do
        nascimento, antes de qualquer palavra ser dita. Que eu
        reconheça tua presença com essa mesma imediatidade, antes de
        precisar de explicação completa. Amém.`),
    },
    meditation: {
      prompt: t(`O reconhecimento de João Batista, ainda no ventre,
        acontece antes de qualquer capacidade racional de compreender
        — sugerindo que reconhecimento espiritual pode preceder
        entendimento intelectual completo.`),
      questions: [
        'Você já teve um reconhecimento espiritual imediato, antes de conseguir explicar racionalmente por quê?',
        'Como essa cena desafia a ideia de que fé genuína precisa sempre vir depois de entendimento completo?',
        'Que reconhecimento espiritual você sente, mesmo sem conseguir articular completamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bem-Aventurada Aquela Que Creu',
      text: t(`Senhor, Isabel declara sobre Maria: "bem-aventurada
        aquela que creu que se hão de cumprir as coisas que da parte
        do Senhor lhe foram ditas." Fé antes da confirmação visível —
        esse é o tipo de bênção que busco cultivar nesta última semana
        de espera. Amém.`),
    },
    meditation: {
      prompt: t(`A bênção de Isabel celebra especificamente a
        disposição de Maria de crer ANTES de ver o cumprimento — fé
        como confiança antecipada, não reação a evidência já
        completa.`),
      questions: [
        'Existe uma promessa de Deus que você precisa crer "antes de ver o cumprimento", como Maria?',
        'Como essa bênção específica — por crer antes de ver — desafia sua própria necessidade de confirmação visível antes de confiar?',
        'O que significaria viver esta última semana do Advento com esse tipo de fé antecipada?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Poderoso Me Fez Grandes Coisas',
      text: t(`Senhor, encerramos o Advento com o Magnificat de
        Maria: "o Poderoso me fez grandes coisas... depôs dos tronos
        os poderosos, e elevou os humildes." Todo este tempo de espera
        converge nessa reversão radical que celebra o Natal que se
        aproxima. Que eu entre nele com esse mesmo canto de louvor.
        Amém.`),
    },
    meditation: {
      prompt: t(`O Magnificat inteiro celebra inversão radical de
        poder — humildes elevados, poderosos derrubados — um resumo
        teológico de tudo que o nascimento de Cristo representa para
        a ordem estabelecida do mundo.`),
      questions: [
        'Todo este Advento — de Belém pequena ao Magnificat revolucionário de Maria — o que você quer levar para a celebração do Natal?',
        'Que "reversão" — humildade elevada, orgulho derrubado — você espera que Deus continue operando na sua própria vida?',
        'Como você quer entrar no Natal, carregando o que refletiu nestas quatro semanas de Advento?',
      ],
    },
  },
];

const adventC: Record<number, DevotionalEntry[]> = {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
};

export default adventC;
