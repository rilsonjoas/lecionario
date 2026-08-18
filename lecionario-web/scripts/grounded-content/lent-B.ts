/**
 * Quaresma — Ciclo B — conteúdo ancorado no RCL (leituras reais),
 * do 1º ao 5º Domingo da Quaresma. Mesmo padrão de lent-A.ts.
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

// Quaresma 1 — Gênesis 9:8-17 · Salmo 25:1-10 · 1 Pedro 3:18-22 · Marcos 1:9-15
const week1: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Este É o Sinal do Pacto',
      text: t(`Senhor, depois do dilúvio, estabeleceste um pacto com
        Noé e "todo ser vivente": "o meu arco tenho posto nas
        nuvens... para me lembrar do pacto." Um sinal visível de
        promessa duradoura, não dependente de comportamento humano
        futuro. Que eu confie nessa mesma fidelidade incondicional.
        Amém.`),
    },
    meditation: {
      prompt: t(`O pacto do arco-íris é notavelmente unilateral —
        Deus se compromete sem exigir contrapartida específica da
        humanidade, um padrão de graça que precede qualquer
        performance.`),
      questions: [
        'Você vive mais a partir de pactos condicionais (baseados em desempenho) ou confiando em compromissos incondicionais de Deus?',
        'Que "sinal" visível de fidelidade de Deus você já recebeu e talvez tenha esquecido de reconhecer?',
        'Como essa promessa incondicional muda sua ansiedade sobre merecer continuamente o favor de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Faze-me Saber os Teus Caminhos',
      text: t(`Senhor, o salmista pede: "faze-me saber os teus
        caminhos, Senhor; ensina-me as tuas veredas." Um pedido de
        aprendizado contínuo, não de conhecimento já completo. Que eu
        entre nesta Quaresma com essa mesma disposição de aprendiz.
        Amém.`),
    },
    meditation: {
      prompt: t(`O salmo usa linguagem de aprendizado contínuo —
        "faze-me saber", "ensina-me" — apropriada para alguém em
        processo, não para quem já domina completamente o caminho.`),
      questions: [
        'Você entra nesta Quaresma com disposição de aprendiz, ou já sente que "sabe" tudo sobre essa estação?',
        'Que caminho específico de Deus você ainda precisa que ele te ensine?',
        'Como cultivar humildade genuína de aprendizado, mesmo depois de anos de fé?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Batismo Vos Salva',
      text: t(`Senhor, Pedro compara a arca de Noé ao batismo, "que
        também agora, por uma verdadeira figura... vos salva." Uma
        conexão entre a fidelidade antiga e a realidade presente da
        salvação. Que eu reconheça essa continuidade entre tuas obras
        passadas e tua ação atual em mim. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro estabelece deliberadamente continuidade
        teológica entre o dilúvio (julgamento e salvação através da
        água) e o batismo cristão — a mesma estrutura de fidelidade
        de Deus se repete através da história.`),
      questions: [
        'Você reconhece continuidade entre a fidelidade de Deus na história antiga e sua própria experiência presente de salvação?',
        'O que significa que o batismo não é "despojamento da imundícia da carne", mas "indagação de uma boa consciência"?',
        'Como essa conexão histórica fortalece sua confiança na realidade presente da sua própria salvação?',
      ],
    },
  },
  {
    prayer: {
      title: 'Imediatamente o Espírito o Impeliu para o Deserto',
      text: t(`Senhor Jesus, logo depois do teu batismo, "imediatamente
        o Espírito o impeliu para o deserto." A confirmação de
        identidade ("tu és meu Filho amado") foi seguida imediatamente
        por provação real. Que eu não espere que momentos de clareza
        espiritual me isentem de dificuldades subsequentes. Amém.`),
    },
    meditation: {
      prompt: t(`A proximidade entre a afirmação celestial no
        batismo e o envio imediato ao deserto para tentação sugere que
        clareza de identidade não elimina provação — muitas vezes a
        precede diretamente.`),
      questions: [
        'Você já experimentou provação logo depois de um momento de clareza ou confirmação espiritual?',
        'Como essa proximidade — bênção seguida de deserto — desafia expectativas de que crescimento espiritual elimina dificuldade?',
        'O que sustentaria você numa provação que vem logo depois de um momento de proximidade genuína com Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Estava Entre as Feras, e os Anjos o Serviam',
      text: t(`Senhor, no deserto, Jesus "estava entre as feras, e
        os anjos o serviam" — perigo real e cuidado real,
        simultaneamente presentes. Que eu confie nesse mesmo cuidado
        mesmo quando estou cercado por circunstâncias genuinamente
        perigosas ou difíceis. Amém.`),
    },
    meditation: {
      prompt: t(`Marcos junta deliberadamente duas realidades
        opostas — feras selvagens e anjos servindo — sem resolver a
        tensão entre elas, um retrato realista de provação sustentada
        por cuidado simultâneo, não sequencial.`),
      questions: [
        'Você já experimentou cuidado real de Deus precisamente no meio de uma situação genuinamente perigosa, não depois dela?',
        'Como essa imagem — feras e anjos coexistindo — muda sua expectativa sobre como Deus sustenta durante dificuldade, não apenas depois?',
        'Que "fera" você enfrenta hoje, precisando reconhecer também os "anjos" que já estão presentes?',
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
      title: 'Não Seja Eu Envergonhado',
      text: t(`Senhor, encerramos esta primeira semana com o pedido
        do salmista: "não seja eu envergonhado; não triunfem sobre
        mim os meus inimigos." Uma súplica honesta por proteção e
        integridade diante de oposição real. Que eu entre na segunda
        semana da Quaresma confiando nessa mesma proteção. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo termina o trecho reconhecendo vulnerabilidade
        real diante de "inimigos" — não triunfalismo ingênuo, mas
        súplica honesta que confia na fidelidade de Deus para
        sustentar através da provação.`),
      questions: [
        'Esta primeira semana de Quaresma — do pacto incondicional de Noé às tentações de Jesus no deserto — o que te ensinou sobre fidelidade em meio a provação real?',
        'Que "inimigo" — interno ou externo — você enfrenta que precisa dessa mesma proteção?',
        'Como você quer entrar na segunda semana da Quaresma, à luz dessa reflexão?',
      ],
    },
  },
];

// Quaresma 2 — Gênesis 17:1-7, 15-16 · Salmo 22:23-31 · Romanos 4:13-25 · Marcos 8:31-38
const week2: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Anda em Minha Presença, e Sê Perfeito',
      text: t(`Senhor, ao renovar o pacto com Abrão, já com noventa
        e nove anos, instruíste: "anda em minha presença, e sê
        perfeito." Um chamado à integridade contínua, não a um
        momento único de fé. Que eu cultive essa mesma caminhada
        constante contigo, não apenas encontros esporádicos. Amém.`),
    },
    meditation: {
      prompt: t(`O chamado a "andar" sugere movimento contínuo, não
        posição estática — uma relação de proximidade sustentada ao
        longo do tempo, não apenas um momento isolado de encontro.`),
      questions: [
        'Sua relação com Deus se parece mais com "caminhada contínua" ou com encontros esporádicos e isolados?',
        'O que significaria cultivar essa proximidade sustentada, dia após dia, não apenas em momentos especiais?',
        'Como a idade avançada de Abrão neste chamado te encoraja a não desistir de crescimento espiritual, independente da sua própria fase de vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Mais Serás Chamado Abrão, Mas Abraão',
      text: t(`Senhor, mudaste o nome de Abrão para Abraão — "pai de
        muitas nações" — antes mesmo de ele ter o filho prometido. A
        identidade nova precedeu a evidência visível. Que eu confie
        nas identidades que já me deste, mesmo antes de ver a prova
        completa. Amém.`),
    },
    meditation: {
      prompt: t(`A mudança de nome acontece por fé antecipada, não
        como reconhecimento de algo já realizado — Deus nomeia
        Abraão "pai de muitas nações" antes mesmo do nascimento de
        Isaque.`),
      questions: [
        'Que "nome novo" — identidade dada por Deus — você ainda não vive plenamente porque está esperando ver evidência completa primeiro?',
        'Como a disposição de Deus de nomear antes de comprovar desafia sua necessidade de certeza visível antes de aceitar identidade?',
        'O que significaria viver hoje a partir de uma identidade dada por fé, não ainda por evidência completa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Todos os Limites da Terra Se Lembrarão',
      text: t(`Senhor, o salmista profetiza alcance universal: "todos
        os limites da terra se lembrarão e se converterão ao
        Senhor... diante dele adorarão todas as famílias das
        nações." Uma visão que transcende fronteiras e gerações. Que
        minha própria fé participe dessa visão ampla, não apenas
        preocupação limitada e local. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo expande deliberadamente o escopo — de
        súplica pessoal para visão de adoração universal — um padrão
        que aparece repetidamente nas Escrituras, situando experiência
        individual dentro de propósito cósmico maior.`),
      questions: [
        'Sua fé permanece principalmente pessoal e local, ou você consegue conectá-la a essa visão maior de alcance universal?',
        'Como participar, mesmo que modestamente, dessa visão de "todas as famílias das nações" adorando?',
        'O que significaria orar hoje com esse escopo mais amplo em mente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sem Se Enfraquecer na Fé',
      text: t(`Senhor, Paulo descreve Abraão: "sem se enfraquecer na
        fé, considerou o seu próprio corpo já amortecido... contudo,
        à vista da promessa de Deus, não vacilou por incredulidade."
        Fé que enfrenta diretamente a impossibilidade aparente sem
        negá-la, mas também sem se render a ela. Ensina-me essa mesma
        fé realista. Amém.`),
    },
    meditation: {
      prompt: t(`A fé de Abraão não ignora a realidade biológica
        difícil — ele "considerou" honestamente a impossibilidade — mas
        escolhe confiar na promessa apesar dessa avaliação realista,
        não através de negação da dificuldade.`),
      questions: [
        'Você consegue reconhecer honestamente uma dificuldade real, sem que isso enfraqueça sua fé na promessa de Deus?',
        'Como essa fé "realista" de Abraão — que vê a dificuldade claramente mas confia mesmo assim — desafia fé baseada em negação?',
        'Que "impossibilidade" você precisa considerar honestamente hoje, confiando ainda assim na promessa de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Para Trás de Mim, Satanás',
      text: t(`Senhor Jesus, quando Pedro te repreendeu por falar
        abertamente sobre teu sofrimento vindouro, respondeste com
        firmeza: "para trás de mim, Satanás; porque não cuidas das
        coisas que são de Deus, mas sim das que são dos homens." Até
        intenção bem-intencionada pode se opor ao teu propósito.
        Examina minhas próprias resistências ao caminho difícil que
        talvez seja necessário. Amém.`),
    },
    meditation: {
      prompt: t(`A repreensão severa de Jesus a Pedro — chamando-o
        de "Satanás" — revela a seriedade com que ele tratava
        qualquer tentativa, mesmo bem-intencionada, de desviá-lo do
        caminho do sofrimento necessário.`),
      questions: [
        'Você já resistiu, com boa intenção, a um caminho difícil que era genuinamente necessário para outra pessoa ou para você mesmo?',
        'Como distinguir entre cuidado genuíno e resistência que, mesmo bem-intencionada, se opõe ao propósito de Deus?',
        'Que "caminho de sofrimento necessário" você tem evitado, preferindo uma alternativa mais confortável?',
      ],
    },
  },
  {
    prayer: {
      title: 'Negue-se a Si Mesmo, Tome a Sua Cruz',
      text: t(`Senhor, instruíste: "se alguém quer vir após mim,
        negue-se a si mesmo, tome a sua cruz, e siga-me." Um chamado
        radical que exige renúncia genuína, não apenas melhoria
        superficial. Que eu tenha essa mesma disposição de negação
        própria pelo teu chamado. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução usa linguagem deliberadamente extrema
        — "negue-se a si mesmo... tome sua cruz" — a cruz sendo
        instrumento de execução, não metáfora suave para dificuldade
        menor, exigindo entendimento sério do custo real.`),
      questions: [
        'Você trata "tomar sua cruz" como metáfora suave, ou reconhece o peso real que Jesus pretendia comunicar?',
        'Que "negação de si mesmo" concreta você tem evitado, mesmo reconhecendo que Jesus a pede?',
        'O que significaria seguir esse chamado radical hoje, não apenas em teoria?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quem Perder a Sua Vida Por Amor de Mim, Salvá-la-á',
      text: t(`Senhor, encerramos esta segunda semana com o paradoxo
        central: "quem quiser salvar a sua vida, perdê-la-á; mas quem
        perder a sua vida por amor de mim e do evangelho, salvá-la-á."
        Uma lógica que inverte completamente a sabedoria convencional
        de autopreservação. Que eu viva segundo essa lógica invertida
        do reino. Amém.`),
    },
    meditation: {
      prompt: t(`O paradoxo de Jesus desafia diretamente o instinto
        mais básico de autopreservação — perder a própria vida não é
        derrota, mas caminho para encontrá-la genuinamente.`),
      questions: [
        'Esta segunda semana — do chamado de Abraão a andar em fé à lógica invertida da cruz — o que te ensinou sobre entrega genuína?',
        'Onde você tem se apegado à autopreservação de forma que talvez esteja, paradoxalmente, "perdendo" o que mais importa?',
        'O que você quer levar desta semana para viver mais plenamente segundo essa lógica invertida do reino de Deus?',
      ],
    },
  },
];

// Quaresma 3 — Êxodo 20:1-17 · Salmo 19 · 1 Coríntios 1:22-25 · João 2:13-22
const week3: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Eu Sou o Senhor Teu Deus, Que Te Tirei da Terra do Egito',
      text: t(`Senhor, os Dez Mandamentos começam não com exigência,
        mas com identidade e libertação já realizada: "eu sou o
        Senhor teu Deus, que te tirei da terra do Egito." Toda
        obediência que segue nasce de graça já recebida, não de
        tentativa de conquistá-la. Que eu obedeça a partir dessa mesma
        gratidão, não de medo. Amém.`),
    },
    meditation: {
      prompt: t(`A ordem é teologicamente significativa — libertação
        primeiro, depois mandamento — a lei não é condição para
        salvação, mas resposta grata a uma salvação já concedida.`),
      questions: [
        'Você obedece aos mandamentos de Deus mais por medo de punição ou por gratidão por libertação já recebida?',
        'Como essa ordem — graça primeiro, depois lei — muda sua relação com regras e disciplinas espirituais?',
        'De que "Egito" — escravidão específica — Deus já te libertou, e como isso deveria moldar sua obediência grata hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Terás Outros Deuses Diante de Mim',
      text: t(`Senhor, o primeiro mandamento estabelece exclusividade:
        "não terás outros deuses diante de mim." Nesta terceira
        semana de Quaresma, examina que "deuses" secundários tenho
        colocado ao teu lado, mesmo sem perceber. Purifica minha
        lealdade exclusiva a ti. Amém.`),
    },
    meditation: {
      prompt: t(`O mandamento não pressupõe que outros "deuses" são
        literalmente reais rivais — mas identifica qualquer coisa que
        recebe lealdade última do coração humano como potencial
        rival da devoção exclusiva devida a Deus.`),
      questions: [
        'Que "deus" secundário — sucesso, aprovação, segurança financeira — você tem colocado, mesmo sutilmente, ao lado de Deus?',
        'Como identificar esses rivais modernos e sutis à devoção exclusiva que Deus pede?',
        'O que significaria examinar hoje, honestamente, onde sua lealdade última realmente está direcionada?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Lei do Senhor É Perfeita, e Refrigera a Alma',
      text: t(`Senhor, o salmista celebra: "a lei do Senhor é
        perfeita, e refrigera a alma... mais desejáveis são do que o
        ouro... mais doces do que o mel." Deleite genuíno na tua
        Palavra e nos teus mandamentos, não obrigação amarga. Cultiva
        esse mesmo prazer em mim. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem sensorial — mais doce que mel, mais
        desejável que ouro — descreve uma relação com a lei de Deus
        que vai além do dever, tocando prazer genuíno e desejo
        profundo.`),
      questions: [
        'Sua relação com os mandamentos de Deus é mais dever cumprido ou deleite genuíno buscado ativamente?',
        'Que mandamento específico já foi, para você, verdadeiramente "mais doce que o mel"?',
        'O que ajudaria você a redescobrir esse tipo de prazer genuíno na obediência?',
      ],
    },
  },
  {
    prayer: {
      title: 'Escândalo para os Judeus, e Loucura para os Gregos',
      text: t(`Senhor, Paulo reconhece que "pregamos a Cristo
        crucificado, que é escândalo para os judeus, e loucura para
        os gregos." A mensagem central da cruz não se ajusta
        confortavelmente às expectativas culturais de nenhum grupo.
        Que eu não suavize essa mensagem para torná-la mais aceitável.
        Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não pede desculpas pela natureza
        contraintuitiva da cruz — ele a reconhece diretamente como
        "escândalo" e "loucura" para as expectativas culturais
        predominantes, sem tentar suavizá-la.`),
      questions: [
        'Você já suavizou ou editou a mensagem da cruz para torná-la mais palatável a alguém, perdendo seu poder real?',
        'Que aspecto da mensagem cristã ainda soa como "loucura" ou "escândalo" para a cultura ao seu redor hoje?',
        'Como manter fidelidade a essa mensagem desafiadora sem se envergonhar dela?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Façais da Casa de Meu Pai Casa de Negócio',
      text: t(`Senhor Jesus, ao ver o templo transformado em mercado,
        agiste com indignação direta: "tirai daqui estas coisas; não
        façais da casa de meu Pai casa de negócio." Zelo genuíno
        pela pureza do que é sagrado, expresso em ação decisiva.
        Examina o que em mim precisa dessa mesma purificação. Amém.`),
    },
    meditation: {
      prompt: t(`A ação de Jesus é fisicamente dramática — chicote
        de cordas, mesas viradas — revelando que zelo genuíno por
        pureza espiritual pode exigir confronto ativo, não apenas
        desaprovação passiva.`),
      questions: [
        'Existe algo "sagrado" na sua própria vida que se tornou, sutilmente, "casa de negócio" — comercializado ou desvirtuado?',
        'Como distinguir zelo genuíno e apropriado de raiva destrutiva ou desproporcional?',
        'Que purificação ativa, não apenas desaprovação passiva, você precisa realizar em alguma área da sua vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ele Falava do Santuário do Seu Corpo',
      text: t(`Senhor Jesus, quando disseste "derribai este
        santuário, e em três dias o levantarei", "falava do santuário
        do seu corpo." Uma profecia velada sobre tua própria morte e
        ressurreição, incompreendida no momento. Ajuda-me a confiar em
        tuas palavras mesmo quando não entendo completamente seu
        alcance no momento presente. Amém.`),
    },
    meditation: {
      prompt: t(`João observa explicitamente que os discípulos só
        entenderam essa declaração "depois que ressurgiu dentre os
        mortos" — revelação que exigiu tempo e eventos futuros para
        ser plenamente compreendida.`),
      questions: [
        'Existe uma palavra ou promessa de Deus que você ainda não compreende completamente, mas que precisa confiar mesmo assim?',
        'Como a experiência dos discípulos — entendimento tardio, não imediato — muda sua paciência com revelação progressiva?',
        'O que significaria confiar hoje numa palavra de Deus cujo significado completo ainda não compreende?',
      ],
    },
  },
  {
    prayer: {
      title: 'Creram na Escritura, e na Palavra Que Jesus Havia Dito',
      text: t(`Senhor, encerramos esta terceira semana com a
        conclusão: os discípulos, depois da ressurreição, "creram na
        Escritura, e na palavra que Jesus havia dito." Fé que
        amadureceu com o tempo, conectando promessa antiga e
        cumprimento presente. Que minha própria fé amadureça dessa
        mesma forma integrada. Amém.`),
    },
    meditation: {
      prompt: t(`A fé madura dos discípulos une duas fontes —
        Escritura antiga e palavra recente de Jesus — um padrão de
        integração que evita tanto tradicionalismo desconectado quanto
        experiência isolada sem base histórica.`),
      questions: [
        'Esta terceira semana — dos Dez Mandamentos como resposta grata à purificação zelosa do templo — o que te ensinou sobre lealdade exclusiva a Deus?',
        'Sua própria fé integra Escritura antiga e experiência presente, ou você tende a enfatizar apenas uma das duas?',
        'O que você quer levar desta semana para aprofundar essa fé madura e integrada?',
      ],
    },
  },
];

// Quaresma 4 — Números 21:4-9 · Salmo 107:1-3, 17-22 · Efésios 2:1-10 · João 3:14-21
const week4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'A Alma do Povo Impacientou-se',
      text: t(`Senhor, no deserto, "a alma do povo impacientou-se
        por causa do caminho" — impaciência que se transformou em
        murmuração contra ti e contra Moisés. Que minha própria
        impaciência diante de processos longos não se transforme em
        rebeldia contra tua condução. Amém.`),
    },
    meditation: {
      prompt: t(`A impaciência do povo, embora compreensível diante
        de uma jornada longa e difícil, se transforma rapidamente em
        acusação direta contra Deus — um padrão que revela como
        cansaço genuíno pode escalar para rebeldia espiritual.`),
      questions: [
        'Você já experimentou impaciência genuína que escalou para algo próximo de rebeldia contra a condução de Deus?',
        'Como distinguir entre expressar cansaço honesto e cair em murmuração destrutiva?',
        'Que "caminho longo" você está atravessando agora que exige essa vigilância contra a impaciência se transformar em rebeldia?',
      ],
    },
  },
  {
    prayer: {
      title: 'Olhar para a Serpente de Bronze',
      text: t(`Senhor, diante do julgamento das serpentes, deste uma
        solução aparentemente estranha: olhar para uma serpente de
        bronze erguida numa haste. Cura que exigia fé num sinal
        simples, não esforço complexo. Ensina-me a aceitar tua
        provisão simples, mesmo quando parece estranha à primeira
        vista. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução parece contraintuitiva — olhar para a
        imagem da própria fonte de dano (serpente) para encontrar
        cura — exigindo fé que aceita a provisão de Deus mesmo quando
        não faz sentido lógico imediato.`),
      questions: [
        'Você já resistiu a uma solução de Deus que parecia estranha ou contraintuitiva demais para funcionar?',
        'O que significa confiar numa provisão simples, mesmo quando ela não corresponde às suas expectativas de como a cura "deveria" funcionar?',
        'Que "serpente de bronze" — solução simples mas estranha — você precisa aceitar hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Enviou a Sua Palavra, e os Sarou',
      text: t(`Senhor, o salmista celebra: "enviou a sua palavra, e
        os sarou, e os livrou da destruição." Tua palavra tem poder
        curativo real, não apenas informativo. Que eu busque essa
        mesma cura através da tua Palavra viva hoje. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo atribui a cura diretamente ao envio da
        "palavra" de Deus — não a um processo médico complexo, mas
        ao poder direto e ativo da comunicação divina.`),
      questions: [
        'Você já experimentou cura genuína — física, emocional ou espiritual — através especificamente da Palavra de Deus aplicada à sua vida?',
        'Que ferida você precisa trazer hoje diante dessa promessa de cura pela palavra?',
        'Como cultivar mais expectativa de que a Escritura tem poder real de cura, não apenas informação?',
      ],
    },
  },
  {
    prayer: {
      title: 'Pela Graça Sois Salvos, Por Meio da Fé',
      text: t(`Senhor, Paulo declara claramente: "pela graça sois
        salvos, por meio da fé; e isto não vem de vós, é dom de
        Deus." Nenhum espaço para orgulho ou mérito próprio — salvação
        inteiramente dada, recebida apenas pela fé. Que eu descanse
        completamente nessa graça hoje. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo é deliberadamente enfático — "não vem de
        vós... não vem das obras" — eliminando qualquer possibilidade
        de que a salvação dependa, mesmo parcialmente, de esforço ou
        mérito humano.`),
      questions: [
        'Você já tentou, mesmo sutilmente, acrescentar mérito próprio a uma salvação que já é inteiramente dom?',
        'Como essa clareza — "não vem de vós" — muda sua ansiedade sobre precisar "fazer sua parte" para merecer a graça?',
        'O que significaria descansar hoje completamente nessa graça já concedida, sem tentativa de contribuição própria?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Para Que Julgasse o Mundo',
      text: t(`Senhor Jesus, esclareceste: "Deus enviou o seu Filho
        ao mundo, não para que julgasse o mundo, mas para que o
        mundo fosse salvo por ele." Tua primeira intenção sempre foi
        salvação, não condenação. Que eu trate outros com essa mesma
        prioridade de graça. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus é explícito sobre o propósito primário da sua
        missão — salvação, não julgamento — mesmo sabendo que
        julgamento seria consequência inevitável para quem rejeitasse
        essa salvação oferecida.`),
      questions: [
        'Você trata outros primeiro com a lente de julgamento ou com essa mesma prioridade de graça salvadora?',
        'Como essa clareza sobre o propósito de Jesus muda sua própria abordagem ao testemunhar sua fé a outros?',
        'O que significaria hoje priorizar oferecer graça, deixando o julgamento para Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Amaram Antes as Trevas Que a Luz',
      text: t(`Senhor, explicaste o julgamento como resultado de
        escolha, não decreto arbitrário: "os homens amaram antes as
        trevas que a luz, porque as suas obras eram más." A rejeição
        vem de preferência genuína, não de ignorância inevitável.
        Examina onde ainda prefiro trevas conhecidas à luz
        desconfortável. Amém.`),
    },
    meditation: {
      prompt: t(`A explicação de Jesus situa a responsabilidade na
        preferência humana, não na disponibilidade da luz — o
        problema nunca foi falta de revelação, mas amor deliberado
        pela escuridão.`),
      questions: [
        'Existe uma área da sua vida onde você prefere, mesmo sutilmente, permanecer nas "trevas conhecidas" em vez de enfrentar a luz desconfortável?',
        'Como essa explicação — preferência, não ignorância — muda sua compreensão sobre resistência espiritual, sua e de outros?',
        'O que significaria escolher deliberadamente a luz hoje, mesmo quando ela expõe algo desconfortável?',
      ],
    },
  },
  {
    prayer: {
      title: 'Suas Obras São Feitas em Deus',
      text: t(`Senhor, encerramos esta quarta semana com a promessa
        final: "quem pratica a verdade vem para a luz, a fim de que
        seja manifesto que as suas obras são feitas em Deus." Viver
        na luz revela, não esconde, o que já é verdadeiramente de
        Deus. Que minhas próprias obras sejam feitas com essa
        disposição de exposição total. Amém.`),
    },
    meditation: {
      prompt: t(`O contraste final é claro — quem faz o mal foge da
        luz para esconder suas obras; quem pratica a verdade busca a
        luz precisamente porque não tem nada a esconder, apenas algo
        genuíno a revelar.`),
      questions: [
        'Esta quarta semana — da impaciência no deserto à luz que expõe preferências reais — o que te ensinou sobre confiar na provisão simples de Deus?',
        'Você vive de forma que busca a luz, confiante de que suas obras "são feitas em Deus", ou tende a evitar exposição?',
        'O que você quer levar desta semana para viver com mais disposição de transparência diante de Deus e dos outros?',
      ],
    },
  },
];

// Quaresma 5 — Jeremias 31:31-34 · Salmo 51:1-12 · Hebreus 5:5-10 · João 12:20-33
const week5: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Porei a Minha Lei no Seu Interior',
      text: t(`Senhor, prometes um pacto novo: "porei a minha lei no
        seu interior, e a escreverei no seu coração." Não mais lei
        externa a ser lembrada por obrigação, mas realidade interna,
        transformadora. Escreve tua lei também em mim, não apenas nas
        minhas ações visíveis. Amém.`),
    },
    meditation: {
      prompt: t(`A mudança de "tábuas de pedra" para "coração"
        representa transformação radical na natureza do
        relacionamento com Deus — de obrigação externa imposta para
        transformação interna genuína.`),
      questions: [
        'Você vive sua fé mais como obrigação externa a cumprir ou como realidade transformada no seu interior?',
        'O que significa, na prática, ter a lei "escrita no coração" em vez de apenas conhecida intelectualmente?',
        'Que área da sua obediência ainda parece imposta de fora, esperando ser genuinamente internalizada?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Me Lembrarei Mais dos Seus Pecados',
      text: t(`Senhor, o pacto novo culmina nesta promessa
        extraordinária: "perdoarei a sua iniqüidade, e não me
        lembrarei mais dos seus pecados." Não é perdão parcial ou
        relutante, mas esquecimento deliberado e completo. Ajuda-me a
        crer verdadeiramente nessa promessa quando meus próprios
        pecados passados ainda pesam sobre mim. Amém.`),
    },
    meditation: {
      prompt: t(`O esquecimento divino é ativo, não passivo — Deus
        escolhe deliberadamente "não se lembrar", uma decisão de
        graça, não simples esquecimento acidental.`),
      questions: [
        'Existe algum pecado passado que você continua carregando, mesmo já tendo sido genuinamente perdoado?',
        'O que significa que Deus "escolhe" não se lembrar, em vez de apenas esquecer por acaso?',
        'Como viver hoje com a certeza plena de que Deus realmente não guarda mais contra você o que já foi perdoado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cria em Mim, Ó Deus, um Coração Puro',
      text: t(`Senhor, o salmista pede: "cria em mim, ó Deus, um
        coração puro, e renova em mim um espírito estável." Não
        reforma superficial, mas criação nova, obra tua, não esforço
        próprio. Que eu peça essa mesma criação renovada nesta
        Quaresma. Amém.`),
    },
    meditation: {
      prompt: t(`O verbo "criar" no hebraico original é o mesmo
        usado em Gênesis 1 — o salmista pede não reforma gradual, mas
        ato criador divino, tão radical quanto a própria criação do
        mundo.`),
      questions: [
        'Você busca transformação através de esforço próprio gradual, ou pede genuinamente esse tipo de "criação" radical de Deus?',
        'Que área específica do seu coração precisa dessa criação renovada, não apenas ajuste superficial?',
        'Como pedir essa obra criativa de Deus, confiando que ela é possível, mesmo diante de padrões antigos e arraigados?',
      ],
    },
  },
  {
    prayer: {
      title: 'Aprendeu a Obediência por Meio Daquilo Que Sofreu',
      text: t(`Senhor Jesus, o autor de Hebreus declara: "ainda que
        era Filho, aprendeu a obediência por meio daquilo que
        sofreu." Mesmo tua obediência perfeita passou por
        aprendizado real através do sofrimento genuíno. Que eu não
        espere crescer em obediência sem passar por processo real,
        às vezes doloroso. Amém.`),
    },
    meditation: {
      prompt: t(`A afirmação é teologicamente densa — mesmo sendo
        Filho perfeito, Jesus "aprendeu" através de experiência real
        de sofrimento, não apenas soube abstratamente sobre obediência
        desde sempre.`),
      questions: [
        'Você espera crescer em obediência sem passar por processo real, incluindo sofrimento genuíno?',
        'Como o exemplo de Jesus — aprendendo através do sofrimento, não apesar dele — muda sua expectativa sobre seu próprio crescimento?',
        'Que "sofrimento" atual poderia estar sendo, mesmo que dolorosamente, uma escola real de obediência mais profunda?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se o Grão de Trigo Não Morrer, Fica Ele Só',
      text: t(`Senhor Jesus, ensinaste: "se o grão de trigo caindo na
        terra não morrer, fica ele só; mas se morrer, dá muito
        fruto." Um princípio que rege tanto tua própria morte quanto
        qualquer transformação genuína. Que eu aceite os "moreres"
        necessários para o fruto que realmente desejo. Amém.`),
    },
    meditation: {
      prompt: t(`A metáfora agrícola descreve um princípio universal
        — frutificação genuína exige perda real de forma anterior,
        não apenas adição incremental sem custo algum.`),
      questions: [
        'Que "morte" — de plano, identidade antiga, conforto — você tem resistido, mesmo sabendo que ela poderia produzir fruto real?',
        'Como esse princípio se aplica não apenas à morte física de Jesus, mas a transformações menores na sua própria vida?',
        'O que significaria aceitar hoje um "morrer" necessário para o fruto que você genuinamente deseja?',
      ],
    },
  },
  {
    prayer: {
      title: 'Agora a Minha Alma Está Perturbada',
      text: t(`Senhor Jesus, diante da hora que se aproximava,
        confessaste honestamente: "agora a minha alma está
        perturbada; e que direi eu? Pai, salva-me desta hora? Mas
        para isto vim a esta hora." Honestidade sobre angústia real,
        seguida de submissão renovada ao propósito. Ensina-me essa
        mesma combinação diante das minhas próprias horas difíceis.
        Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não esconde sua própria perturbação genuína —
        ele a expressa abertamente antes de reafirmar submissão ao
        propósito maior, um modelo de honestidade que não nega a
        dificuldade real do momento.`),
      questions: [
        'Você permite a si mesmo expressar perturbação genuína diante de Deus, ou sente que precisa esconder essa honestidade?',
        'Como o exemplo de Jesus — angústia real seguida de submissão renovada — poderia moldar sua própria oração em momentos difíceis?',
        'Que "hora difícil" você está enfrentando que precisa dessa mesma honestidade seguida de reafirmação de propósito?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu, Quando For Levantado da Terra, Todos Atrairei a Mim',
      text: t(`Senhor, encerramos esta última semana antes da Semana
        Santa com tua promessa: "eu, quando for levantado da terra,
        todos atrairei a mim." A cruz que se aproxima não é apenas
        sofrimento, mas atração poderosa e universal. Que eu entre no
        Domingo de Ramos confiando nesse poder atrativo da cruz. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem de ser "levantado" carrega duplo
        sentido no evangelho de João — tanto a elevação física na
        cruz quanto a exaltação de glória — unindo sofrimento e
        atração poderosa numa só imagem.`),
      questions: [
        'Esta quinta e última semana da Quaresma — do pacto escrito no coração à promessa de atração universal da cruz — o que te ensinou sobre transformação genuína?',
        'Como a cruz, instrumento de sofrimento, se torna também instrumento de atração poderosa e universal?',
        'Como você quer entrar no Domingo de Ramos e na Semana Santa, carregando essa confiança no poder atrativo da cruz?',
      ],
    },
  },
];

const lentB: Record<number, DevotionalEntry[]> = {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
  5: week5,
};

export default lentB;
