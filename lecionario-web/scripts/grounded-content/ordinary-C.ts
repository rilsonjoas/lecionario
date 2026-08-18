/**
 * Tempo Comum — Ciclo C — conteúdo ancorado no RCL (leituras reais).
 *
 * Mesmo padrão de scripts/grounded-content/ordinary-A.ts e ordinary-B.ts:
 * cada semana é um array de 7 DevotionalEntry, índice = date.getDay()
 * (0 = domingo … 6 = sábado). A chave numérica é o Próprio real do RCL
 * (4 a 29) — o Ciclo C nunca precisa do Próprio 3 no intervalo
 * 2015-2045 calculado em 2026-08-16 (ver ROADMAP.md 1.2a).
 *
 * Cobertura: Ciclo C completo, Próprios 4-29 (26 semanas, 182 dias),
 * mais `trinityWeekC` pros 6 dias entre a Trindade e o 1º Próprio.
 * Escrito em 2026-08-18, já em cima do RCL corrigido — sem o processo
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
 * Trindade+6, todo ano). Ancorado nas leituras do Domingo da Trindade
 * do Ciclo C: Provérbios 8:1-4, 22-31 · Salmo 8 · Romanos 5:1-5 ·
 * João 16:12-15.
 */
export const trinityWeekC: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Antes de Haver Abismos',
      text: t(`Senhor, Provérbios descreve a Sabedoria clamando desde a
        eternidade: "antes de haver abismos, fui gerada... quando
        preparava os céus, aí estava eu." Tua sabedoria não é uma ideia
        tardia, um remendo depois que as coisas deram errado — ela
        estava presente desde a fundação do mundo, "como arquiteto",
        ao teu lado. Ajuda-me a confiar que há ordem e propósito por
        trás mesmo do que parece caos na minha vida hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A Sabedoria em Provérbios 8 não é abstrata — ela é
        quase uma pessoa, presente "como arquiteto" na criação do
        mundo, alegrando-se "com os filhos dos homens" antes mesmo de
        eles existirem.`),
      questions: [
        'Você costuma buscar a sabedoria de Deus como algo distante e teórico, ou como presença ativa e próxima?',
        'Que decisão você está enfrentando agora que se beneficiaria de pedir, deliberadamente, a sabedoria que "estava lá desde o princípio"?',
        'O texto diz que a Sabedoria "achava suas delícias com os filhos dos homens" — isso muda como você imagina o interesse de Deus por você?',
      ],
    },
  },
  {
    prayer: {
      title: 'Que É o Homem?',
      text: t(`Senhor, Senhor nosso, o salmista olha para os céus —
        "obra dos teus dedos, a lua e as estrelas" — e pergunta: "que
        é o homem, para que te lembres dele?" Diante da imensidão do
        que criaste, minha pequenez deveria me esmagar. Mas o salmo não
        termina em desespero: tu me coroaste "de glória e de honra".
        Ajuda-me a viver essa tensão — pequeno diante do universo,
        e ainda assim lembrado por ti. Amém.`),
    },
    meditation: {
      prompt: t(`O Salmo 8 não resolve a tensão entre a vastidão da
        criação e a atenção pessoal de Deus — ele simplesmente afirma
        as duas coisas, lado a lado, como verdade.`),
      questions: [
        'Quando você contempla algo vasto — o céu estrelado, o oceano — sua reação é de insignificância ou de assombro por ser notado mesmo assim?',
        'O salmo fala de "domínio sobre as obras" de Deus — que responsabilidade isso implica sobre como você trata o que foi confiado a você?',
        'Como equilibrar humildade genuína com a certeza de que Deus se lembra de você especificamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Tribulação Produz Perseverança',
      text: t(`Senhor, Paulo escreve uma cadeia que soa quase absurda:
        "gloriemo-nos nas tribulações; sabendo que a tribulação produz
        a perseverança, e a perseverança a experiência, e a
        experiência a esperança." Não é que a dor seja boa em si —
        é que tu és capaz de tecer, através dela, algo que não viria
        de outra forma. Não me deixes desperdiçar o que estou
        atravessando fugindo dele antes da hora. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não diz que devemos fingir que a tribulação não
        dói — ele diz que podemos "gloriar-nos" nela por causa do que
        ela produz, uma cadeia deliberada até chegar à esperança "que
        não desaponta".`),
      questions: [
        'Existe alguma tribulação atual na sua vida em que você consegue, honestamente, começar a ver perseverança sendo formada?',
        'Qual foi uma dificuldade passada que, olhando para trás, produziu em você algo que você não trocaria?',
        'O que significa, na prática, "gloriar-se" numa tribulação sem minimizar a dor real dela?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Amor de Deus Derramado',
      text: t(`Senhor, a cadeia de Paulo termina assim: "a esperança
        não desaponta, porquanto o amor de Deus está derramado em
        nossos corações pelo Espírito Santo que nos foi dado." A
        esperança cristã não é otimismo genérico — ela se apoia em
        algo concreto, já dado: o teu próprio amor, derramado, não
        apenas prometido. Que eu viva hoje a partir dessa certeza, não
        da ansiedade sobre o que ainda não aconteceu. Amém.`),
    },
    meditation: {
      prompt: t(`"Derramado" é uma palavra de abundância, não de doses
        cuidadosamente medidas — Paulo descreve o amor de Deus como
        algo já dado em excesso, não como recompensa a ser conquistada.`),
      questions: [
        'Você vive mais a partir da certeza de um amor já derramado ou da ansiedade de precisar merecê-lo?',
        'Como a presença do Espírito Santo muda a forma como você entende a esperança — ela é sentimento ou presença real?',
        'O que mudaria hoje se você tratasse o amor de Deus como algo já concedido, não como algo a conquistar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ainda Tenho Muito Que Vos Dizer',
      text: t(`Senhor Jesus, disseste aos discípulos: "ainda tenho
        muito que vos dizer; mas vós não o podeis suportar agora."
        Não me revelaste tudo de uma vez — respeitaste a capacidade
        deles de receber, prometendo o Espírito da verdade para
        guiá-los "a toda a verdade" com o tempo. Dá-me paciência com o
        que ainda não entendo, confiando que a revelação continua,
        passo a passo, e não toda de uma vez. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus reconhece explicitamente um limite na
        capacidade dos discípulos de receber verdade naquele momento —
        e promete que o Espírito continuaria o trabalho depois da sua
        partida, não de uma vez, mas ao longo do tempo.`),
      questions: [
        'Existe algo sobre Deus ou sobre sua própria vida que você sente que ainda "não pode suportar" entender completamente?',
        'Como você tem experimentado o Espírito Santo "guiando" você a mais verdade ao longo do tempo, e não de uma vez?',
        'Que paciência essa passagem pede de você em relação ao que ainda não compreende?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tudo Quanto o Pai Tem É Meu',
      text: t(`Senhor, encerramos esta semana entre a Trindade e o
        Tempo Comum com tuas palavras: "tudo quanto o Pai tem é meu;
        por isso eu vos disse que ele, recebendo do que é meu, vo-lo
        anunciará." Pai, Filho e Espírito — não três fontes separadas
        de verdade, mas uma só, comunicada de formas diferentes. Que eu
        entre no Tempo Comum que se aproxima lembrando que tudo o que
        recebo de ti vem dessa unidade completa. Amém.`),
    },
    meditation: {
      prompt: t(`João 16:15 resume, numa frase curta, a doutrina da
        Trindade que celebramos este domingo: Pai, Filho e Espírito
        partilham a mesma substância e a mesma verdade, comunicada em
        movimento — do Pai, pelo Filho, através do Espírito.`),
      questions: [
        'Como esta semana sobre a Trindade mudou, mesmo que sutilmente, sua imagem de Deus?',
        'Você tende a se relacionar mais com o Pai, com o Filho ou com o Espírito? O que isso revela?',
        'O que você quer levar desta semana para os meses comuns do ano litúrgico que se aproximam?',
      ],
    },
  },
];

// Próprio 4 — 1 Reis 18:20-21, (22-29), 30-39 · Salmo 96 · Gálatas 1:1-12 · Lucas 7:1-10
const proper4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Até Quando Coxeareis Entre Dois Pensamentos?',
      text: t(`Senhor, no Monte Carmelo Elias perguntou ao povo: "até
        quando coxeareis entre dois pensamentos? Se o Senhor é Deus,
        segui-o; mas se Baal, segui-o." Não havia neutralidade
        possível — só indecisão disfarçada. Examina hoje as áreas da
        minha vida onde tenho tentado servir a dois senhores ao mesmo
        tempo, e dá-me a coragem de Elias para escolher, de forma
        clara, a quem realmente sirvo. Amém.`),
    },
    meditation: {
      prompt: t(`O povo "não lhe respondeu nada" quando Elias fez a
        pergunta — o silêncio era, ele mesmo, uma forma de resposta:
        indecisão prolongada que só o fogo do altar resolveria.`),
      questions: [
        'Onde na sua vida você tem "coxeado entre dois pensamentos" em vez de decidir claramente?',
        'Por que a indecisão às vezes parece mais segura do que um compromisso claro, mesmo quando não é?',
        'O que seria, para você, um "altar" hoje — um lugar concreto onde colocar sua fé à prova?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Senhor É Deus!',
      text: t(`Senhor, quando o fogo caiu e consumiu o holocausto, a
        lenha, as pedras e até a água do rego, o povo "prostraram-se
        todos com o rosto em terra e disseram: O Senhor é Deus! O
        Senhor é Deus!" Não bastou o argumento — foi preciso a
        experiência viva do teu poder. Que eu não dependa só de
        conhecimento sobre ti, mas continue buscando te experimentar
        de verdade, hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta do povo — repetida duas vezes, "O Senhor
        é Deus!" — veio depois de uma demonstração concreta, não de
        um argumento teológico abstrato.`),
      questions: [
        'Você consegue lembrar de um momento em que experimentou Deus de forma tão concreta que não teve dúvida?',
        'Por que às vezes precisamos de mais do que argumentos para realmente nos convencermos de algo espiritual?',
        'Que "fogo" você gostaria de ver Deus enviar hoje, numa área de dúvida da sua vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cantai ao Senhor um Cântico Novo',
      text: t(`Senhor, o salmista convoca "todos os moradores da
        terra" a "cantar ao Senhor um cântico novo" e "anunciar entre
        as nações a sua glória". Louvor não é privado — é testemunho
        público. Dá-me coragem de anunciar o que sei de ti não só nas
        minhas orações silenciosas, mas entre as pessoas ao meu redor,
        hoje. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo é explicitamente missionário — "anunciai
        entre as nações a sua glória" — o louvor a Deus não fica
        contido, ele transborda para além da comunidade de fé.`),
      questions: [
        'Seu louvor a Deus é mais privado ou você já o compartilhou publicamente, mesmo que de forma simples?',
        'O que significaria "cantar um cântico novo" — não repetir só o que sempre foi dito, mas expressar algo genuíno hoje?',
        'Quem, ao seu redor, precisa ouvir de você algo sobre a glória de Deus esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Segundo os Homens',
      text: t(`Senhor, Paulo insiste, logo no início de Gálatas, que o
        evangelho que ele prega "não é segundo os homens" — não veio
        de tradição humana nem de invenção própria, mas de revelação.
        Protege-me de aceitar como verdade espiritual qualquer coisa
        só porque é popular ou conveniente. Ajuda-me a discernir o que
        realmente vem de ti. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo estava disposto a confrontar até "um anjo do
        céu" que pregasse outro evangelho — sua lealdade era à
        revelação recebida, não à autoridade ou popularidade de quem
        falava.`),
      questions: [
        'Como você distingue entre o que realmente vem de Deus e o que é apenas tradição humana confortável?',
        'Já houve um momento em que você precisou discordar de uma autoridade respeitada por causa de uma convicção mais profunda?',
        'O que te dá segurança de que aquilo em que você crê realmente "não é segundo os homens"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Sou Digno',
      text: t(`Senhor Jesus, o centurião, homem de autoridade
        reconhecida, disse: "não sou digno de que entres debaixo do
        meu telhado... dize, porém, uma palavra, e seja o meu servo
        curado." Ele entendeu algo que muitos religiosos da época não
        entenderam: que a tua palavra tem poder independente da tua
        presença física. Aumenta minha fé para confiar na tua palavra
        mesmo quando não vejo evidência imediata. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus "admirou-se" da fé do centurião e declarou:
        "nem mesmo em Israel encontrei tamanha fé" — vindo de um
        estrangeiro, homem de autoridade militar romana, não de
        alguém da comunidade religiosa esperada.`),
      questions: [
        'Onde você já viu fé genuína em pessoas de quem menos esperava?',
        'O centurião confiava na palavra de Jesus sem exigir presença física — como isso desafia sua própria forma de confiar em Deus?',
        'Que "servo doente" na sua vida você precisa entregar à palavra de Jesus hoje, confiando sem precisar de prova visível primeiro?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ama à Nossa Nação',
      text: t(`Senhor, os anciãos judeus intercederam pelo centurião
        dizendo que ele "é digno... porque ama à nossa nação, e ele
        mesmo nos edificou a sinagoga." A fé dele se expressava em
        ação concreta, generosa, mesmo sendo estrangeiro à comunidade
        de fé. Ajuda-me a expressar minha fé não só em palavras, mas
        em generosidade prática com quem está ao meu redor. Amém.`),
    },
    meditation: {
      prompt: t(`O centurião era romano, ocupante estrangeiro, e ainda
        assim havia construído a sinagoga local — um gesto de amor
        concreto por uma comunidade que não era originalmente a sua.`),
      questions: [
        'Você já fez algo generoso e concreto por uma comunidade que não é "a sua"?',
        'Como a generosidade prática do centurião se conecta com a fé extraordinária que Jesus elogiou nele?',
        'O que uma pessoa observando sua vida diria sobre o que você "edificou" para os outros?',
      ],
    },
  },
  {
    prayer: {
      title: 'Encontraram o Servo com Saúde',
      text: t(`Senhor, encerramos esta semana com a simplicidade do
        final da história: os enviados "voltando para casa...
        encontraram o servo com saúde." Nenhum drama adicional — só a
        palavra de Jesus, cumprida. Que eu confie que às vezes a
        resposta às minhas orações será exatamente assim: simples,
        real, sem necessidade de mais explicação. Amém.`),
    },
    meditation: {
      prompt: t(`O relato termina sem cerimônia — não há descrição
        do momento exato da cura, só a constatação factual de que ela
        aconteceu, exatamente como a palavra de Jesus havia prometido.`),
      questions: [
        'Você já recebeu uma resposta de oração de forma simples, sem drama, e quase deixou passar despercebida?',
        'Por que às vezes esperamos que respostas de Deus venham acompanhadas de sinais dramáticos?',
        'O que essa semana sobre fé — de Elias no Carmelo ao centurião — te ensinou sobre confiar na palavra de Deus mesmo sem ver o processo?',
      ],
    },
  },
];

// Próprio 5 — 1 Reis 17:8-16, (17-24) · Salmo 146 · Gálatas 1:11-24 · Lucas 7:11-17
const proper5: DevotionalEntry[] = [
  {
    prayer: {
      title: 'A Farinha da Panela Não se Acabou',
      text: t(`Senhor, pediste a uma viúva estrangeira, prestes a
        preparar sua última refeição antes de morrer de fome, que
        primeiro fizesse um bolo para o teu profeta. Foi um pedido
        absurdo — e ela obedeceu mesmo assim. "A farinha da panela não
        se acabou, e o azeite da botija não faltou." Ensina-me a
        confiar na tua provisão mesmo quando o que pedes parece
        contrário à lógica da escassez que sinto. Amém.`),
    },
    meditation: {
      prompt: t(`A viúva de Sarepta não era israelita — era
        estrangeira, numa terra de fome, e Elias pede a ela o que
        parecia impossível: dar antes de garantir o próprio sustento.`),
      questions: [
        'Já houve um momento em que Deus pediu de você algo que parecia contrário à sua lógica de escassez?',
        'Como você reage quando é chamado a dar generosamente antes de ter certeza de que sobrará o suficiente para você?',
        'O milagre aqui não foi instantâneo, mas contínuo — "a farinha não se acabou" dia após dia. Onde você precisa dessa provisão diária, não de uma solução única?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vieste Aqui para Trazer à Memória o Meu Pecado?',
      text: t(`Senhor, quando o filho da viúva adoeceu e morreu, a
        primeira reação dela foi de acusação: "que tenho eu contigo,
        homem de Deus? Vieste aqui para trazer à memória o meu
        pecado?" A dor faz com que até quem já viu tua provisão
        duvide da tua bondade. Não me condenes quando, na dor, minhas
        primeiras palavras também soam como acusação em vez de
        confiança. Amém.`),
    },
    meditation: {
      prompt: t(`A mesma mulher que havia experimentado o milagre
        diário da farinha reage à morte do filho com suspeita e
        acusação — provisão passada nem sempre impede desespero
        presente.`),
      questions: [
        'Por que experiências passadas de fidelidade de Deus às vezes não bastam para sustentar a fé diante de uma nova crise?',
        'Você já reagiu a uma dor recente atribuindo culpa a Deus, mesmo tendo visto sua bondade antes?',
        'O que significaria, para você, trazer sua dor honestamente a Deus, como a viúva fez, em vez de escondê-la?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Senhor Guarda os Estrangeiros',
      text: t(`Senhor, o salmista canta que tu "guardas os
        estrangeiros" e "sustentas o órfão e a viúva" — os mais
        vulneráveis da sociedade antiga são, especificamente, objeto
        do teu cuidado. Que eu não trate essas palavras como poesia
        distante, mas como convite a cuidar de quem está à margem ao
        meu redor, do jeito que tu cuidas. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo lista categorias específicas de
        vulnerabilidade — estrangeiro, órfão, viúva — como objeto
        direto e nomeado do cuidado de Deus, não de uma bondade
        genérica e abstrata.`),
      questions: [
        'Quem, na sua comunidade hoje, ocupa o lugar do "estrangeiro, órfão ou viúva" — vulnerável e à margem?',
        'Como sua vida prática reflete (ou não) esse cuidado específico que o salmo atribui a Deus?',
        'O salmo diz que Deus "solta os presos" e "levanta os abatidos" — que área da sua vida precisa dessa libertação hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Recebi de Homem Algum',
      text: t(`Senhor, Paulo conta sua própria história de conversão —
        de perseguidor violento da igreja a apóstolo — insistindo que
        "não recebi de homem algum, nem me foi ensinado; mas o recebi
        por revelação de Jesus Cristo." Tu podes transformar até quem
        parece o candidato menos provável. Não permita que eu duvide
        do teu poder de mudar alguém — inclusive a mim mesmo. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não esconde seu passado como perseguidor — "eu
        perseguia sobremaneira a igreja de Deus, e a assolava" — ele
        usa essa história explicitamente como testemunho do poder
        transformador de Deus.`),
      questions: [
        'Existe algo do seu passado que você esconde em vez de usar como testemunho de como Deus te transformou?',
        'Você já subestimou a possibilidade de mudança genuína em alguém, baseado no histórico dessa pessoa?',
        'Paulo atribui sua transformação inteiramente à graça, não ao próprio mérito. Como isso muda a forma como você vê sua própria história?',
      ],
    },
  },
  {
    prayer: {
      title: 'Moço, a Ti Digo: Levanta-te',
      text: t(`Senhor Jesus, ao encontrar o cortejo fúnebre de um
        jovem, filho único de uma viúva, "encheu-se de compaixão por
        ela" antes de qualquer pedido. Não foi a fé dela que provocou
        o milagre — foi a tua compaixão espontânea diante do
        sofrimento. Que eu confie que tu vês minha dor mesmo quando eu
        não tenho forças para pedir nada. Amém.`),
    },
    meditation: {
      prompt: t(`Diferente de outros milagres do evangelho, ninguém
        pediu nada a Jesus aqui — ele viu o cortejo, teve compaixão
        por iniciativa própria, e agiu antes de qualquer súplica.`),
      questions: [
        'Você tende a achar que precisa "merecer" ou "pedir corretamente" a atenção de Deus antes que ele aja?',
        'Como a compaixão espontânea de Jesus, sem pedido prévio, muda sua imagem de como Deus se relaciona com você na dor?',
        'Que "cortejo fúnebre" — perda, luto, desistência — na sua vida você gostaria que Jesus interrompesse hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Visitou o Seu Povo',
      text: t(`Senhor, diante do milagre, a multidão glorificou a Deus
        dizendo: "um grande profeta se levantou entre nós" e "Deus
        visitou o seu povo." Eles reconheceram, corretamente, que algo
        divino estava presente naquele momento comum. Ajuda-me a
        reconhecer tua visita nos momentos ordinários da minha semana,
        não só nos extraordinários. Amém.`),
    },
    meditation: {
      prompt: t(`A palavra usada — "visitou" — carrega peso teológico:
        é a mesma linguagem usada para descrever Deus intervindo
        diretamente na história do seu povo, não apenas observando de
        longe.`),
      questions: [
        'Onde você reconheceu, recentemente, que Deus "visitou" uma situação comum da sua vida?',
        'O que significa viver atento o suficiente para perceber essas visitas, em vez de deixá-las passar despercebidas?',
        'Como a fama desse milagre "se espalhou por toda a Judéia" — de que forma sua própria experiência de Deus poderia encorajar outros?',
      ],
    },
  },
  {
    prayer: {
      title: 'Guarda a Verdade para Sempre',
      text: t(`Senhor, encerramos a semana com a promessa do salmo: "o
        Senhor reinará para sempre... o Senhor guarda a verdade para
        sempre." Da viúva de Sarepta à viúva de Naim, tua fidelidade
        atravessa gerações — o mesmo Deus que multiplicou a farinha é
        quem ressuscitou o jovem. Que eu leve essa confiança para a
        semana que vem: tu não mudas, mesmo quando minhas
        circunstâncias mudam. Amém.`),
    },
    meditation: {
      prompt: t(`As duas histórias desta semana — a viúva de Sarepta
        e a viúva de Naim — são separadas por séculos, mas revelam o
        mesmo caráter de Deus: atenção específica aos mais
        vulneráveis, mesmo quando parece tarde demais.`),
      questions: [
        'Que padrão você percebe conectando as duas histórias de viúvas desta semana?',
        'Em que área da sua vida você precisa lembrar que "o Senhor guarda a verdade para sempre" — que ele não muda mesmo quando tudo ao redor muda?',
        'O que você quer levar desta semana sobre provisão e compaixão para os dias comuns que vêm pela frente?',
      ],
    },
  },
];

// Próprio 6 — 1 Reis 21:1-10, (11-14), 15-21a · Salmo 5:1-8 · Gálatas 2:15-21 · Lucas 7:36-8:3
const proper6: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Guarde-me o Senhor de Que Eu Te Dê a Herança',
      text: t(`Senhor, quando Acabe pediu a vinha de Nabote — herança
        de família — ele recusou: "guarde-me o Senhor de que eu te dê
        a herança de meus pais." Havia coisas que Nabote não estava
        disposto a negociar, mesmo diante da pressão de um rei.
        Mostra-me quais são as "heranças" da minha fé que não devo
        negociar por conveniência ou pressão, seja qual for a
        oferta. Amém.`),
    },
    meditation: {
      prompt: t(`Nabote tinha todo motivo prático para aceitar a
        oferta generosa de Acabe — e recusou por princípio, por
        fidelidade a algo maior do que ganho imediato.`),
      questions: [
        'Existe algo na sua vida que você recusaria negociar, mesmo diante de uma oferta vantajosa?',
        'De onde vem essa firmeza — de convicção genuína ou de teimosia? Como diferenciar as duas?',
        'Que pressão você está sentindo hoje para abrir mão de algo que deveria manter?',
      ],
    },
  },
  {
    prayer: {
      title: 'Governas Tu Agora?',
      text: t(`Senhor, diante da recusa de Nabote, Jezabel perguntou
        com desprezo: "governas tu agora no reino de Israel?" — e
        depois orquestrou um julgamento falso para matar o homem
        inocente e tomar a vinha. O poder usado sem freio se torna
        instrumento de injustiça. Guarda meu coração de usar qualquer
        autoridade que tenho — em casa, no trabalho — para atropelar
        quem tem menos poder do que eu. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta de Jezabel revela uma visão de poder sem
        limites — "eu te darei a vinha" — que trata a lei e a justiça
        como obstáculos a serem contornados, não respeitados.`),
      questions: [
        'Você já viu — ou exerceu — poder de forma que atropelou a justiça devida a alguém mais vulnerável?',
        'O que protege você de se tornar alguém que usa autoridade sem freio, como Jezabel?',
        'Como a história de Nabote te desafia a defender quem está sendo injustiçado, mesmo quando é arriscado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Pela Manhã Te Apresento a Minha Oração',
      text: t(`Senhor, o salmista descreve um ritmo: "pela manhã ouves
        a minha voz... pela manhã te apresento a minha oração, e
        vigio." Não é oração ocasional, é hábito diário, alerta,
        expectante. Ensina-me essa disciplina — não apenas orar quando
        a crise chega, mas cultivar o hábito diário de me apresentar
        diante de ti antes que o dia comece. Amém.`),
    },
    meditation: {
      prompt: t(`"Vigio" sugere expectativa ativa — o salmista não só
        ora e segue em frente, mas fica alerta, observando como Deus
        responderá.`),
      questions: [
        'Como é o seu ritmo atual de oração — reativo, só em crises, ou disciplinado, diário?',
        'O que significaria "vigiar" depois de orar — permanecer atento à resposta de Deus, em vez de seguir sem esperar nada?',
        'Que mudança prática, ainda que pequena, ajudaria você a criar um hábito matinal de oração?',
      ],
    },
  },
  {
    prayer: {
      title: 'Já Estou Crucificado com Cristo',
      text: t(`Senhor, Paulo declara algo radical: "já estou
        crucificado com Cristo; e vivo, não mais eu, mas Cristo vive
        em mim." Não é apenas melhoria moral — é morte e vida nova. Eu
        confesso que muitas vezes tento reformar o "eu" antigo em vez
        de reconhecer que ele precisa morrer para que tu vivas em mim
        de verdade. Ensina-me essa entrega mais profunda. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não fala de autoaperfeiçoamento gradual, mas de
        uma identidade inteiramente nova — "não mais eu, mas Cristo
        vive em mim" — uma substituição, não uma reforma.`),
      questions: [
        'Você tende a buscar melhorar seu "eu antigo" ou a reconhecer que ele precisa, de fato, morrer?',
        'O que significaria, na prática hoje, viver "não mais eu, mas Cristo em mim"?',
        'Que área da sua vida você ainda tenta controlar em vez de entregar a essa nova identidade?',
      ],
    },
  },
  {
    prayer: {
      title: 'Perdoados os Seus Pecados',
      text: t(`Senhor Jesus, uma mulher conhecida como pecadora
        entrou na casa de um fariseu, chorou aos teus pés, e os
        enxugou com os cabelos. Enquanto o anfitrião te julgava por
        permitir isso, tu disseste a ela: "perdoados são os teus
        pecados... vai-te em paz." Tu vês além da reputação que os
        outros me atribuem — vês o coração que se aproxima de ti com
        humildade. Recebe-me como recebeste ela. Amém.`),
    },
    meditation: {
      prompt: t(`O fariseu julga tanto a mulher quanto a Jesus por
        aceitar a atenção dela — mas Jesus contrasta a hospitalidade
        fria do anfitrião com a devoção extravagante da mulher: "a
        quem pouco é perdoado, pouco ama".`),
      questions: [
        'Você já foi, como o fariseu, mais rápido em julgar do que em reconhecer devoção genuína em alguém?',
        'O que a atitude da mulher — vulnerável, extravagante, sem se importar com a opinião alheia — ensina sobre gratidão real?',
        'Existe alguma reputação (própria ou de outra pessoa) que está impedindo você de reconhecer graça acontecendo diante de você?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Quem Pouco É Perdoado',
      text: t(`Senhor, disseste ao fariseu que "aquele a quem pouco é
        perdoado, pouco ama." Não é que a mulher tivesse pecado mais
        do que o fariseu — é que ela reconhecia sua necessidade de
        perdão, enquanto ele não. Livra-me da cegueira espiritual que
        vem de me achar já suficientemente justo. Ajuda-me a
        reconhecer o quanto preciso da tua graça, todos os dias. Amém.`),
    },
    meditation: {
      prompt: t(`A parábola de Jesus (dois devedores, um com dívida
        maior) não compara quantidade de pecado, mas consciência dele
        — o fariseu não amava menos porque pecava menos, mas porque
        não reconhecia sua própria dívida.`),
      questions: [
        'Você se identifica mais com a mulher, consciente de sua necessidade, ou com o fariseu, seguro da própria retidão?',
        'Como a autopercepção de "já ser bom o suficiente" pode, paradoxalmente, te afastar de amar mais a Deus?',
        'O que ajudaria você a reconhecer, com mais honestidade, o tamanho da graça que já recebeu?',
      ],
    },
  },
  {
    prayer: {
      title: 'Mulheres Que o Serviam com os Seus Bens',
      text: t(`Senhor, encerramos a semana com uma nota breve mas
        importante: mulheres como Maria Madalena, Joana e Suzana
        "serviam com os seus bens" o teu ministério e o dos discípulos.
        Elas eram parte essencial, ainda que menos visível, da tua
        obra. Que eu valorize o serviço discreto — de recursos, tempo,
        apoio — tanto quanto valorizo o que é público e visível. Amém.`),
    },
    meditation: {
      prompt: t(`O texto nomeia essas mulheres especificamente e
        registra seu papel concreto de sustento financeiro e prático
        — um detalhe que facilmente passaria despercebido, mas que
        Lucas fez questão de preservar.`),
      questions: [
        'Que forma de serviço discreto — financeiro, prático, nos bastidores — você tem oferecido ou poderia oferecer?',
        'Você tende a valorizar mais o serviço visível do que o serviço "dos bastidores"? Por quê?',
        'O que esta semana — da vinha de Nabote à mulher perdoada às discípulas que serviam — te ensinou sobre integridade e graça?',
      ],
    },
  },
];

// Próprio 7 — 1 Reis 19:1-4, (5-7), 8-15a · Salmo 42, 43 · Gálatas 3:23-29 · Lucas 8:26-39
const proper7: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Já Basta, Ó Senhor',
      text: t(`Senhor, depois da grande vitória no Carmelo, Elias fugiu
        de Jezabel e, exausto, pediu para morrer: "já basta, ó Senhor;
        toma agora a minha vida." O ápice espiritual foi seguido de
        colapso emocional profundo. Não me deixes pensar que
        experiências fortes de fé me tornam imune ao esgotamento e ao
        desespero — e não me deixes esconder isso de ti quando
        acontecer. Amém.`),
    },
    meditation: {
      prompt: t(`Elias, que acabara de ver fogo cair do céu diante de
        todo o povo, entra em colapso poucos versículos depois — a
        Bíblia não esconde a fragilidade emocional nem dos maiores
        profetas.`),
      questions: [
        'Você já experimentou um colapso emocional logo depois de um momento de vitória ou grande esforço espiritual?',
        'Por que às vezes é depois do triunfo, não durante a crise, que a exaustão finalmente aparece?',
        'O que significa para você que a Bíblia registra o desespero de Elias sem julgá-lo por isso?',
      ],
    },
  },
  {
    prayer: {
      title: 'Levantou-se, Comeu e Bebeu',
      text: t(`Senhor, antes de qualquer palavra de correção ou
        chamado, respondeste ao desespero de Elias com um anjo
        trazendo pão e água, e a instrução simples: "levanta-te e
        come." O cuidado com o corpo veio antes do cuidado com a
        alma. Ensina-me a não desprezar as necessidades básicas — sono,
        comida, descanso — como parte legítima de como cuidas de
        mim. Amém.`),
    },
    meditation: {
      prompt: t(`Deus não repreende Elias por seu desespero nem exige
        que ele "supere" espiritualmente antes de comer — a resposta
        divina começa com cuidado físico básico, repetido duas vezes.`),
      questions: [
        'Você tende a tratar suas necessidades físicas — sono, alimentação, descanso — como secundárias diante de crises espirituais ou emocionais?',
        'Como essa passagem desafia a ideia de que "força espiritual" significa ignorar limites do corpo?',
        'Que forma concreta de autocuidado você está negligenciando enquanto tenta lidar com algo maior?',
      ],
    },
  },
  {
    prayer: {
      title: 'Uma Voz Mansa e Delicada',
      text: t(`Senhor, no Horebe, não estavas no vento forte, nem no
        terremoto, nem no fogo — mas numa "voz mansa e delicada".
        Elias esperava uma manifestação dramática do teu poder, e a
        encontrou, em vez disso, no sussurro. Ensina-me a procurar tua
        voz não só nos eventos grandiosos, mas no silêncio quieto onde
        realmente costumas falar. Amém.`),
    },
    meditation: {
      prompt: t(`A sequência é deliberada: vento, terremoto, fogo —
        cada um um símbolo tradicional de teofania — e o Senhor não
        está em nenhum deles. Ele está na quietude que vem depois.`),
      questions: [
        'Você já esperou por uma resposta dramática de Deus e a encontrou, em vez disso, numa quietude sutil?',
        'O que dificulta ouvir a "voz mansa e delicada" no meio do barulho da sua vida?',
        'Que espaço de silêncio você poderia criar esta semana para simplesmente escutar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Há Judeu Nem Grego',
      text: t(`Senhor, Paulo escreve que em Cristo "não há judeu nem
        grego; não há escravo nem livre; não há homem nem mulher;
        porque todos vós sois um em Cristo Jesus." As categorias que
        dividiam profundamente o mundo antigo — e ainda dividem o
        nosso — são superadas pela unidade que tu criaste. Examina meu
        coração por qualquer divisão que eu ainda cultivo contrária a
        essa unidade. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo escolhe deliberadamente as três divisões mais
        profundas e enraizadas de sua época — étnica, social, de
        gênero — e declara que todas são superadas "em Cristo Jesus".`),
      questions: [
        'Que divisões — de classe, etnia, gênero, ou outras — você ainda carrega, mesmo que sutilmente, dentro da comunidade de fé?',
        'Como a unidade que Paulo descreve deveria mudar a forma como sua igreja ou comunidade trata diferenças?',
        'O que significa, na prática, tratar alguém muito diferente de você como igualmente "um em Cristo"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Legião',
      text: t(`Senhor Jesus, ao homem endemoninhado que vivia entre os
        sepulcros perguntaste: "qual é o teu nome?" — e a resposta foi
        "Legião", revelando a fragmentação profunda daquela pessoa.
        Tu não temeste se aproximar do que a sociedade havia rejeitado
        e acorrentado. Aproxima-te também das partes fragmentadas de
        mim que tenho medo de nomear. Amém.`),
    },
    meditation: {
      prompt: t(`O homem vivia "nos sepulcros", acorrentado, isolado —
        exatamente o tipo de pessoa que a comunidade preferia manter
        à distância. Jesus vai diretamente até ele, sem hesitação.`),
      questions: [
        'Existe alguma parte fragmentada ou "acorrentada" de você que você evita nomear, mesmo diante de Deus?',
        'Você tende a se afastar de pessoas visivelmente sofrendo, como a comunidade fazia com esse homem, ou a se aproximar como Jesus fez?',
        'O que significaria, para você, deixar Jesus perguntar diretamente: "qual é o teu nome" — sobre o que está te fragmentando?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vestido e em Perfeito Juízo',
      text: t(`Senhor, depois da libertação, encontraram o homem
        "sentado aos pés de Jesus, vestido e em perfeito juízo" — uma
        transformação tão completa que assustou a multidão. Restauras
        não apenas de forma parcial, mas de forma integral: mente,
        corpo, dignidade. Continua essa obra de restauração completa
        em mim, mesmo quando o processo é lento. Amém.`),
    },
    meditation: {
      prompt: t(`A reação da multidão é medo, não alegria — a
        transformação foi tão radical que ela perturbou expectativas,
        mesmo sendo boa.`),
      questions: [
        'Você já viu uma transformação tão radical em alguém — ou em si mesmo — que gerou desconforto em vez de celebração ao redor?',
        'O que significa, para você, restauração "completa" — mente, corpo e dignidade — em vez de apenas alívio parcial?',
        'Por que o medo às vezes é a primeira reação humana diante de uma obra genuína de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Anuncia Quão Grandes Coisas Deus Te Fez',
      text: t(`Senhor, encerramos a semana com teu pedido ao homem
        liberto: em vez de te seguir fisicamente, ele deveria voltar
        para casa e "anunciar quão grandes coisas Deus te fez." Nem
        toda vocação é sair — algumas são ficar e testemunhar onde já
        se está. Mostra-me onde já estou e o que já fizeste em mim,
        para que eu possa contar disso hoje mesmo. Amém.`),
    },
    meditation: {
      prompt: t(`Diferente de outros que Jesus chama para segui-lo, a
        este homem ele dá instrução oposta: voltar para casa e
        testemunhar ali mesmo, na comunidade que antes o temia.`),
      questions: [
        'Você já sentiu vontade de "sair" — mudar de contexto — quando na verdade sua vocação era testemunhar exatamente onde já está?',
        'O que "grandes coisas" Deus já fez em você que você ainda não contou a ninguém?',
        'Esta semana — de Elias no Horebe ao homem liberto em Gerasa — o que te ensinou sobre a forma como Deus se aproxima do sofrimento humano?',
      ],
    },
  },
];

// Próprio 8 — 2 Reis 2:1-2, 6-14 · Salmo 77:1-2, 11-20 · Gálatas 5:1, 13-25 · Lucas 9:51-62
const proper8: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Te Deixarei',
      text: t(`Senhor, três vezes Elias disse a Eliseu para ficar para
        trás, e três vezes Eliseu respondeu: "vive o Senhor, e vive a
        tua alma, que não te deixarei." Sua lealdade não vacilou,
        mesmo sem saber exatamente o que viria. Ensina-me esse tipo de
        perseverança discipular — continuar seguindo mesmo quando não
        entendo completamente para onde o caminho leva. Amém.`),
    },
    meditation: {
      prompt: t(`A repetição — três recusas de Elias, três respostas
        idênticas de Eliseu — enfatiza a determinação inabalável do
        discípulo, mesmo sem saber que estava prestes a testemunhar
        algo extraordinário.`),
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
      text: t(`Senhor, quando Elias perguntou o que Eliseu desejava
        antes de partir, a resposta não foi riqueza ou poder, mas:
        "peço-te que haja sobre mim dobrada porção de teu espírito."
        O maior desejo de Eliseu era continuar a obra espiritual que
        havia visto em seu mestre. Examina meus próprios desejos mais
        profundos — são voltados para o que realmente importa? Amém.`),
    },
    meditation: {
      prompt: t(`Elias chama o pedido de "coisa difícil" — não porque
        fosse ganancioso, mas porque exigia que Eliseu realmente
        testemunhasse o momento da partida, uma condição que ele não
        controlava.`),
      questions: [
        'Se pudesse pedir uma única coisa espiritual hoje, o que seria — e o que isso revela sobre suas prioridades reais?',
        'Você busca continuar o legado espiritual de quem te formou na fé, ou está construindo algo desconectado disso?',
        'O que significa, para você, um pedido "difícil" que exige presença e atenção genuínas, não apenas desejo passivo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Recordarei os Feitos do Senhor',
      text: t(`Senhor, o salmista, em angústia, decide deliberadamente:
        "recordarei os feitos do Senhor; sim, me lembrarei das tuas
        maravilhas da antiguidade." A memória ativa da tua fidelidade
        passada se torna âncora na aflição presente. Ajuda-me a
        cultivar essa disciplina — lembrar conscientemente o que já
        fizeste, especialmente quando a dúvida aperta. Amém.`),
    },
    meditation: {
      prompt: t(`O salmista não nega a angústia presente ("no dia da
        minha angústia busco ao Senhor") — ele responde a ela com
        memória deliberada e ativa da fidelidade passada de Deus.`),
      questions: [
        'Você tem o hábito de lembrar conscientemente as "maravilhas" que Deus já fez na sua vida, especialmente em momentos difíceis?',
        'Que memória específica de fidelidade de Deus você poderia recuperar hoje como âncora?',
        'Como registrar essas memórias — num diário, numa conversa — poderia ajudar você no futuro?',
      ],
    },
  },
  {
    prayer: {
      title: 'Para a Liberdade Cristo Nos Libertou',
      text: t(`Senhor, Paulo declara: "para a liberdade Cristo nos
        libertou; permanecei, pois, firmes e não vos dobreis novamente
        a um jogo de escravidão." Tantas vezes volto, por hábito ou
        medo, a formas de escravidão espiritual das quais já fui
        liberto. Ajuda-me a permanecer firme na liberdade que me
        deste, em vez de recair em correntes antigas. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo usa a metáfora de retornar a um "jogo de
        escravidão" — sugerindo que a liberdade cristã exige
        vigilância ativa; ela pode ser abandonada por escolha, mesmo
        depois de conquistada.`),
      questions: [
        'A que "escravidão" antiga — legalismo, vergonha, perfeccionismo — você já foi tentado a voltar, mesmo depois de liberto dela?',
        'O que significa "permanecer firme" na liberdade em vez de tratá-la como conquista automática e permanente?',
        'Como distinguir liberdade genuína de licenciosidade — usar a liberdade "para dar ocasião à carne", como Paulo alerta?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Fruto do Espírito',
      text: t(`Senhor, Paulo contrasta as "obras da carne" com "o
        fruto do Espírito: o amor, o gozo, a paz, a longanimidade, a
        benignidade, a bondade, a fidelidade, a mansidão, o domínio
        próprio." Nove qualidades, um só fruto — não um cardápio de
        onde escolher, mas um caráter integrado que só o teu Espírito
        pode produzir em mim. Cultiva esse fruto completo na minha
        vida, não apenas as partes mais fáceis. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo usa "fruto" no singular, não "frutos" — sugerindo
        que essas nove qualidades crescem juntas, como aspectos de um
        único caráter formado pelo Espírito, não virtudes isoladas
        para escolher.`),
      questions: [
        'Das nove qualidades listadas, quais você sente mais desenvolvidas em você, e quais mais frágeis?',
        'Por que "fruto" no singular — e não uma lista de opções — muda a forma de pensar sobre crescimento espiritual?',
        'O que significa deixar o Espírito produzir esse fruto, em vez de tentar produzi-lo pelo próprio esforço?',
      ],
    },
  },
  {
    prayer: {
      title: 'Firmou o Rosto para Ir a Jerusalém',
      text: t(`Senhor Jesus, quando "se completavam os dias" para tua
        partida, "manifestou o firme propósito de ir a Jerusalém" —
        sabendo o que te aguardava ali. Não hesitaste diante do
        caminho difícil que levava à cruz. Dá-me esse mesmo tipo de
        determinação diante do que sei que preciso enfrentar, mesmo
        quando o caminho é custoso. Amém.`),
    },
    meditation: {
      prompt: t(`A expressão original sugere um gesto físico
        deliberado — "firmou o rosto" — uma decisão de vontade
        visível, não uma resignação passiva diante do sofrimento que
        viria.`),
      questions: [
        'Existe algo que você sabe que precisa enfrentar, mas continua adiando por medo do custo?',
        'O que significa "firmar o rosto" para uma direção difícil — determinação visível, não apenas intenção interna?',
        'Como a determinação de Jesus rumo a Jerusalém desafia sua própria resistência a caminhos custosos?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ninguém Que Olha para Trás',
      text: t(`Senhor, encerramos a semana com tua palavra exigente:
        "ninguém que lança mão do arado e olha para trás é apto para
        o reino de Deus." Não é rejeição de responsabilidades
        familiares, mas alerta contra o discipulado hesitante,
        dividido entre o chamado e o conforto do que já é conhecido.
        Fortalece minha disposição de seguir sem olhar constantemente
        para trás. Amém.`),
    },
    meditation: {
      prompt: t(`As três respostas de Jesus a possíveis seguidores
        nesta passagem são deliberadamente exigentes — ele não
        suaviza o custo do discipulado para tornar o convite mais
        atraente.`),
      questions: [
        'Que "arado" você já pegou nas mãos, mas continua olhando para trás em vez de seguir em frente?',
        'Por que Jesus recusa suavizar o custo do discipulado, mesmo correndo o risco de afastar seguidores em potencial?',
        'Esta semana — de Eliseu recusando ficar para trás a Jesus firmando o rosto para Jerusalém — o que te ensinou sobre compromisso sem hesitação?',
      ],
    },
  },
];

// Próprio 9 — 2 Reis 5:1-14 · Salmo 30 · Gálatas 6:(1-6), 7-16 · Lucas 10:1-11, 16-20
const proper9: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Havia Lepra',
      text: t(`Senhor, Naamã era "grande homem diante do seu senhor",
        "homem valente" — e ainda assim, no meio de tanto sucesso e
        reconhecimento, "era leproso". Nenhum status humano protege
        contra a fragilidade real que carregamos. Ajuda-me a
        reconhecer honestamente minhas próprias fraquezas escondidas,
        em vez de escondê-las atrás de conquistas visíveis. Amém.`),
    },
    meditation: {
      prompt: t(`O texto justapõe deliberadamente o prestígio de
        Naamã com sua condição — "grande... porém leproso" — uma
        combinação que a cultura antiga considerava chocante.`),
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
      text: t(`Senhor, Naamã esperava um ritual grandioso, digno de um
        general — e recebeu apenas a instrução simples de Eliseu: vai
        e lava-te sete vezes no Jordão. A cura estava disponível na
        simplicidade, não na grandiosidade que ele esperava. Ensina-me
        a aceitar tuas instruções simples, mesmo quando meu orgulho
        preferiria algo mais impressionante. Amém.`),
    },
    meditation: {
      prompt: t(`Eliseu nem sequer sai para receber Naamã
        pessoalmente — envia apenas um mensageiro com uma instrução
        anticlimática, testando se o general aceitaria a simplicidade
        do processo ou exigiria algo à altura do seu status.`),
      questions: [
        'Você já rejeitou uma solução simples para um problema porque esperava algo mais "à altura" da sua dor?',
        'O que o orgulho de Naamã revela sobre como às vezes tratamos a instrução de Deus quando ela parece pequena demais?',
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
      prompt: t(`O salmo não minimiza a realidade da noite de choro —
        ele a reconhece plenamente, apenas insiste que ela não é
        permanente.`),
      questions: [
        'Em que área da sua vida você está numa "noite" prolongada, esperando pela manhã?',
        'Como a promessa de que o choro "pode durar uma noite" — não que ele desaparece instantaneamente — muda sua expectativa sobre cura?',
        'Que "cântico de júbilo" passado você pode lembrar hoje como evidência de que as manhãs de fato chegam?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quem Semeia no Espírito',
      text: t(`Senhor, Paulo alerta: "tudo o que o homem semear, isso
        também ceifará... quem semeia no Espírito, do Espírito
        ceifará a vida eterna." Examina onde tenho semeado meu tempo,
        atenção e energia — no que é passageiro ou no que realmente
        permanece. Ajuda-me a não me cansar de "fazer o bem", mesmo
        quando o fruto demora a aparecer. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo reconhece explicitamente que fazer o bem
        continuamente é cansativo — "não nos cansemos" — a colheita
        não é imediata, exige perseverança sustentada.`),
      questions: [
        'Onde você tem semeado mais tempo e energia recentemente — no que edifica ou no que é passageiro?',
        'Que "cansaço de fazer o bem" você está sentindo agora, e o que ajudaria a sustentar sua perseverança?',
        'Como a metáfora de semear e colher muda sua paciência diante de resultados que ainda não apareceram?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Seara É Grande',
      text: t(`Senhor Jesus, ao enviar os setenta discípulos disseste:
        "a seara é grande, mas os trabalhadores são poucos; rogai,
        pois, ao Senhor da seara que mande trabalhadores." Antes de
        pedir para ir, ensinaste a orar por mais quem fosse. Ajuda-me
        a orar genuinamente por mais obreiros, mesmo que a resposta
        seja eu mesmo sendo chamado a servir mais. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus manda os discípulos orarem antes de enviá-los
        — reconhecendo que a disposição de trabalhar nasce primeiro da
        oração, não do dever ou da obrigação.`),
      questions: [
        'Você ora genuinamente por mais "trabalhadores" na obra de Deus, mesmo sabendo que a resposta pode envolver você mesmo?',
        'Onde você percebe uma "seara grande" — necessidade real — ao seu redor que carece de mais gente disposta a servir?',
        'O que significa ir "como cordeiros ao meio de lobos" — vulnerabilidade, não força — como método de missão?',
      ],
    },
  },
  {
    prayer: {
      title: 'Alegrai-vos Porque os Vossos Nomes Estão Escritos',
      text: t(`Senhor, quando os setenta voltaram exultantes porque
        "até os demônios se nos submetem", corrigiste sutilmente a
        prioridade deles: "alegrai-vos porque os vossos nomes estão
        escritos nos céus." Não é o resultado visível do ministério
        que deve ser minha maior alegria, mas a certeza de pertencer a
        ti. Reorganiza minhas prioridades nessa direção. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não desvaloriza o poder que os discípulos
        experimentaram, mas redireciona a fonte da alegria deles — de
        conquista visível para identidade segura.`),
      questions: [
        'Sua alegria depende mais de resultados visíveis (sucesso, reconhecimento) ou da certeza de pertencer a Deus?',
        'O que significaria, na prática, alegrar-se primeiro por "estar escrito nos céus" do que por qualquer conquista específica?',
        'Como essa correção de Jesus desafia a forma como você mede seu próprio valor ou sucesso espiritual?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nem Alforge, Nem Alparcas',
      text: t(`Senhor, encerramos a semana lembrando tua instrução de
        ir sem bolsa, sem alforge, sem provisões extras — dependência
        radical da tua provisão através da hospitalidade alheia. Tira
        de mim a falsa segurança de achar que preciso estar
        completamente preparado antes de servir. Ensina-me a
        dependência confiante que essa missão exigia. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução de viajar sem provisões não era
        impraticável — era pedagógica: forçava os discípulos a
        depender ativamente da provisão de Deus através de outras
        pessoas, não do próprio planejamento.`),
      questions: [
        'Você tende a adiar servir ou obedecer até se sentir "completamente preparado"? O que essa passagem desafia nisso?',
        'Como a cura de Naamã e o envio dos setenta, ambos desta semana, se conectam pelo tema da dependência simples, não da autossuficiência?',
        'Que forma de dependência confiante em Deus — não em seu próprio preparo — você é chamado a praticar esta semana?',
      ],
    },
  },
];

// Próprio 10 — Amós 7:7-17 · Salmo 82 · Colossenses 1:1-14 · Lucas 10:25-37
const proper10: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Um Prumo no Meio do Meu Povo',
      text: t(`Senhor, mostraste a Amós um prumo — instrumento de
        medição exata, usado para verificar se um muro está reto — e
        disseste: "eu porei o prumo no meio do meu povo Israel."
        Não julgas por impressão superficial, mas por padrão exato.
        Examina minha vida com esse mesmo prumo, e mostra-me onde
        estou desalinhado do que deveria ser reto. Amém.`),
    },
    meditation: {
      prompt: t(`O prumo é uma imagem de precisão implacável — não
        há como negociar com ele; ou a parede está reta ou não está,
        sem meio-termo subjetivo.`),
      questions: [
        'Que "prumo" — padrão claro e objetivo — você usa para avaliar honestamente sua própria vida espiritual?',
        'Onde você suspeita, se for honesto, que está "torto" em relação ao que Deus pede?',
        'Por que às vezes preferimos avaliações vagas e subjetivas a um padrão claro como um prumo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu Não Sou Profeta',
      text: t(`Senhor, quando Amazias tentou calar Amós, ele
        respondeu: "eu não sou profeta, nem filho de profeta, mas
        boieiro... mas o Senhor me tirou de após o gado, e o Senhor me
        disse: vai, profetiza." Amós não tinha credencial religiosa
        formal — só o teu chamado direto. Não me deixes desqualificar
        o que tu queres fazer através de mim só porque não pareço a
        pessoa "certa" para isso. Amém.`),
    },
    meditation: {
      prompt: t(`Amós rejeita explicitamente qualquer título
        profissional religioso — ele era pastor de gado e cultivador,
        um outsider completo no establishment religioso que ele foi
        chamado a confrontar.`),
      questions: [
        'Você já se sentiu "não qualificado" para algo que sentia que Deus estava te chamando a fazer?',
        'Que credencial ou título você acha que precisaria ter antes de agir sobre um chamado de Deus?',
        'Como a história de Amós desafia a ideia de que só "profissionais religiosos" podem ser usados por Deus de forma significativa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Fazei Justiça ao Pobre e ao Órfão',
      text: t(`Senhor, o salmista clama por justiça aos poderosos que
        "julgam injustamente" e mostram "respeito às pessoas dos
        ímpios": "fazei justiça ao pobre e ao órfão; procedei
        retamente com o aflito e o desamparado." Examina onde tenho
        sido conivente, mesmo passivamente, com injustiça contra os
        mais vulneráveis ao meu redor. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo é dirigido a "deuses" — figuras de autoridade
        e poder — cobrando delas especificamente responsabilidade
        pela proteção dos vulneráveis, não apenas caridade opcional.`),
      questions: [
        'Onde você tem alguma forma de autoridade ou influência que poderia ser usada para proteger quem é mais vulnerável?',
        'Você já foi, mesmo que passivamente, conivente com uma injustiça por conveniência ou medo de confronto?',
        'O que significa, concretamente esta semana, "fazer justiça ao pobre e ao órfão" na sua própria esfera de influência?',
      ],
    },
  },
  {
    prayer: {
      title: 'Frutificando e Crescendo',
      text: t(`Senhor, Paulo descreve o evangelho como algo vivo,
        "frutificando e crescendo" desde que os colossenses o
        ouviram. A fé genuína não fica estática — ela produz mudança
        contínua e visível. Examina se minha própria fé está
        crescendo e frutificando, ou se estagnou em algum ponto do
        caminho. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo usa linguagem orgânica e ativa — "frutificando
        e crescendo" — para descrever o evangelho, não como doutrina
        estática mas como força viva em movimento contínuo.`),
      questions: [
        'Sua fé, hoje, está mais "frutificando e crescendo" ou estagnada em relação a algum tempo atrás?',
        'O que alimentaria esse crescimento contínuo, na prática, esta semana?',
        'Como você reconheceria "fruto" genuíno da sua fé na vida de outras pessoas ao seu redor?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quem É o Meu Próximo?',
      text: t(`Senhor Jesus, o doutor da lei, "querendo justificar-se",
        perguntou "quem é o meu próximo?" — tentando limitar o
        alcance do mandamento. Tua resposta, através da parábola do
        samaritano, ampliou a pergunta em vez de respondê-la
        diretamente: não "quem devo amar", mas "como ser próximo de
        alguém". Desafia meus próprios limites de quem considero digno
        do meu amor. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta original era sobre limites — "quem
        conta?" — e Jesus a transforma numa pergunta sobre ação —
        "quem agiu como próximo?" — deslocando o foco de definição
        para prática.`),
      questions: [
        'Que grupo de pessoas você, como o doutor da lei, tenta silenciosamente excluir da categoria de "próximo"?',
        'A pergunta de Jesus é sobre ação, não definição. Como isso muda sua forma de pensar sobre amor ao próximo?',
        'Quem, na sua vida, seria o "samaritano" — alguém de quem você não esperaria compaixão, mas que a demonstrou?',
      ],
    },
  },
  {
    prayer: {
      title: 'Encheu-se de Compaixão',
      text: t(`Senhor, o sacerdote e o levita "passaram de largo" —
        mas o samaritano, "vendo-o, encheu-se de compaixão." A
        diferença não foi conhecimento religioso, mas ação movida por
        compaixão real diante do sofrimento concreto. Não me deixes
        ter conhecimento sobre compaixão sem praticá-la quando o
        sofrimento está bem diante de mim. Amém.`),
    },
    meditation: {
      prompt: t(`Os dois primeiros a passar eram figuras religiosas
        estabelecidas; o único que agiu era de um grupo étnico
        desprezado pelos judeus — a parábola inverte deliberadamente
        as expectativas de quem representaria virtude.`),
      questions: [
        'Você já "passou de largo" diante de um sofrimento concreto, apesar de ter conhecimento religioso ou moral sobre o que fazer?',
        'Por que às vezes conhecimento e proximidade institucional com a fé não se traduzem em compaixão prática?',
        'Diante de quem você é chamado a "encher-se de compaixão" concretamente esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vai, e Faze Tu o Mesmo',
      text: t(`Senhor, encerramos a semana com tua instrução final ao
        doutor da lei: "vai, e faze tu o mesmo." Não bastava
        reconhecer intelectualmente quem agiu corretamente — era
        preciso agir da mesma forma. Que o conhecimento que ganho
        estudando tua Palavra sempre me leve à ação prática, não fique
        apenas na compreensão. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não termina a conversa com uma definição
        satisfatória — ele termina com um imperativo de ação, deixando
        claro que a resposta certa à pergunta é viver de determinada
        forma, não apenas concordar com ela.`),
      questions: [
        'Que verdade você já reconhece intelectualmente, mas ainda não "faz" na prática?',
        'Esta semana — do prumo de Amós à parábola do samaritano — o que te desafiou mais a agir, não apenas a concordar?',
        'Qual seria um passo concreto, ainda que pequeno, para "fazer o mesmo" que o samaritano fez, esta semana?',
      ],
    },
  },
];

// Próprio 11 — Amós 8:1-12 · Salmo 52 · Colossenses 1:15-28 · Lucas 10:38-42
const proper11: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Chegou o Fim',
      text: t(`Senhor, diante de um cesto de frutos maduros — sinal de
        que a colheita estava completa —, disseste a Amós: "chegou o
        fim sobre o meu povo Israel." A imagem pacífica escondia um
        anúncio grave: o tempo de resposta havia se esgotado. Ajuda-me
        a não confundir aparência tranquila com ausência de
        consequências reais para escolhas persistentes. Amém.`),
    },
    meditation: {
      prompt: t(`O jogo de palavras em hebraico entre "fruto maduro" e
        "fim" comunica uma verdade desconfortável: maturidade pode
        significar tanto plenitude quanto o limite final de
        paciência.`),
      questions: [
        'Existe uma área da sua vida onde você tem adiado mudança, confiando que "ainda há tempo"?',
        'Como você distingue entre paciência genuína de Deus e complacência sua diante de padrões que precisam mudar?',
        'O que essa imagem — fruto maduro sinalizando o fim, não a celebração — desafia na sua percepção sobre consequências?',
      ],
    },
  },
  {
    prayer: {
      title: 'Balanças Enganadoras',
      text: t(`Senhor, Amós denuncia quem "pisa os necessitados" com
        "balanças enganadoras" — pequenas fraudes cotidianas contra os
        pobres, disfarçadas de prática comercial normal. A injustiça
        muitas vezes não é dramática, mas rotineira e disfarçada.
        Examina minhas próprias "balanças" — onde tenho sido desonesto
        de formas pequenas e normalizadas. Amém.`),
    },
    meditation: {
      prompt: t(`As fraudes descritas são pequenas e sistemáticas —
        "diminuindo a medida, aumentando o preço" — o tipo de
        injustiça que se esconde na rotina, não em atos únicos e
        óbvios.`),
      questions: [
        'Que pequenas desonestidades você já normalizou como "apenas como as coisas funcionam"?',
        'Como injustiças sistemáticas e pequenas podem, somadas, causar dano tão grande quanto atos únicos e óbvios?',
        'O que significaria examinar suas próprias práticas — financeiras, profissionais — com o rigor que Amós exige aqui?',
      ],
    },
  },
  {
    prayer: {
      title: 'Uma Oliveira Verde',
      text: t(`Senhor, diante da arrogância de quem confia "na
        abundância das suas riquezas", o salmista declara: "eu sou
        qual oliveira verde na casa de Deus; confio na bondade de
        Deus para sempre." Não é a segurança material que sustenta
        essa confiança, mas a proximidade contigo. Enraíza-me também
        assim — não na minha própria força, mas na tua bondade
        constante. Amém.`),
    },
    meditation: {
      prompt: t(`A oliveira verde, plantada "na casa de Deus",
        contrasta deliberadamente com o homem poderoso do início do
        salmo, cuja segurança dependia inteiramente de riqueza
        acumulada.`),
      questions: [
        'Sua sensação de segurança hoje depende mais de recursos próprios ou de confiança na bondade constante de Deus?',
        'O que significa, na prática, estar "enraizado na casa de Deus" como fonte de estabilidade?',
        'Como a imagem de uma árvore verde e viva, em vez de estagnada, descreve o tipo de fé que você deseja cultivar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Antes de Todas as Coisas',
      text: t(`Senhor Jesus, Paulo descreve tua supremacia total: "ele
        é antes de todas as coisas, e nele subsistem todas as coisas."
        Não és apenas parte importante da minha vida — és o
        fundamento sobre o qual tudo o mais se sustenta. Ajuda-me a
        viver de acordo com essa realidade, não te tratando como
        acréscimo, mas como centro. Amém.`),
    },
    meditation: {
      prompt: t(`O hino cristológico de Colossenses 1 é uma das
        declarações mais elevadas de toda a Bíblia sobre a
        centralidade cósmica de Cristo — "nele subsistem todas as
        coisas", não apenas foram criadas por ele.`),
      questions: [
        'Sua vida prática reflete Cristo como "antes de todas as coisas" ou como um item entre vários outros importantes?',
        'O que mudaria concretamente esta semana se você organizasse suas decisões a partir dessa centralidade?',
        'Como essa visão cósmica de Cristo muda a forma como você encara problemas que parecem, no momento, enormes?',
      ],
    },
  },
  {
    prayer: {
      title: 'Maria Escolheu a Boa Parte',
      text: t(`Senhor Jesus, enquanto Marta "andava preocupada com
        muito serviço", Maria "sentando-se aos pés do Senhor, ouvia a
        sua palavra." Disseste que Maria "escolheu a boa parte" — não
        porque o serviço de Marta fosse errado, mas porque, naquele
        momento, ouvir era mais necessário. Ajuda-me a discernir
        quando parar de fazer e simplesmente ouvir. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não condena o serviço de Marta como tal — ele
        nomeia a ansiedade dela ("estás ansiosa e perturbada com
        muitas coisas") como o verdadeiro problema, não a atividade em
        si.`),
      questions: [
        'Você se identifica mais com Marta, ansiosa em atividade, ou com Maria, presente e atenta?',
        'Que "muito serviço" você usa, talvez sem perceber, para evitar a quietude de simplesmente ouvir a Deus?',
        'O que significaria, esta semana, escolher deliberadamente "a boa parte" em algum momento do seu dia?',
      ],
    },
  },
  {
    prayer: {
      title: 'Poucas São Necessárias',
      text: t(`Senhor, disseste a Marta: "estás ansiosa e perturbada
        com muitas coisas; entretanto poucas são necessárias, ou mesmo
        uma só." Tantas vezes multiplico preocupações e tarefas que,
        no fim, não são essenciais. Ajuda-me a simplificar — a
        identificar o "uma só" que realmente importa hoje, e soltar o
        resto. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus reduz deliberadamente a lista de necessidades
        de Marta a quase nada — "uma só" — um convite radical à
        simplicidade em meio à multiplicação ansiosa de tarefas.`),
      questions: [
        'Se tivesse que escolher apenas "uma coisa necessária" hoje, o que seria?',
        'Quanto da sua ansiedade vem de tratar como essencial o que, na verdade, é secundário?',
        'O que ajudaria você a soltar, com mais frequência, o "muito serviço" desnecessário?',
      ],
    },
  },
  {
    prayer: {
      title: 'Que Não Lhe Será Tirada',
      text: t(`Senhor, encerramos a semana com a promessa de que a
        "boa parte" escolhida por Maria "não lhe será tirada." Ao
        contrário de riqueza, status ou qualquer conquista terrena, o
        tempo genuíno de intimidade contigo é permanente, não
        vulnerável a perda. Que eu invista com prioridade no que
        realmente permanece. Amém.`),
    },
    meditation: {
      prompt: t(`A garantia de que a "boa parte" "não lhe será
        tirada" contrasta com tudo o que Amós denunciou nesta
        semana — riquezas, colheitas, segurança material, todas
        vulneráveis e passageiras.`),
      questions: [
        'O que, na sua vida, você tem tratado como permanente mas que, na verdade, pode ser tirado?',
        'Esta semana — de Amós ao encontro de Marta e Maria — o que te ensinou sobre investir no que realmente permanece?',
        'Que hábito concreto ajudaria você a escolher, com mais regularidade, "a boa parte" que não pode ser tirada?',
      ],
    },
  },
];

// Próprio 12 — Oséias 1:2-10 · Salmo 85 · Colossenses 2:6-15, (16-19) · Lucas 11:1-13
const proper12: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Toma por Esposa Uma Mulher de Prostituições',
      text: t(`Senhor, o pedido chocante a Oséias — casar com Gomer,
        conhecida por sua infidelidade — não era arbitrário: era um
        retrato vivo da tua relação com um povo infiel. Que dor deve
        ter sido viver isso na própria pele, para que o povo
        entendesse o que representava tua fidelidade diante da nossa
        traição. Examina minha própria infidelidade a ti, e não me
        deixes minimizá-la. Amém.`),
    },
    meditation: {
      prompt: t(`Deus pede a Oséias que vivesse, literalmente, a
        experiência de amar alguém infiel — não como punição, mas
        como forma de tornar tangível uma verdade espiritual que
        palavras sozinhas não comunicariam.`),
      questions: [
        'Você já experimentou, em relacionamentos humanos, algo que te ajudou a entender melhor a fidelidade — ou infidelidade — a Deus?',
        'Como a disposição de Oséias em viver essa história dolorosa por obediência desafia sua própria disposição de obedecer, mesmo custosamente?',
        'Em que áreas você reconhece infidelidade própria a Deus que normalmente evita examinar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Filhos do Deus Vivo',
      text: t(`Senhor, apesar do julgamento anunciado através dos
        nomes simbólicos dos filhos de Oséias — "não é meu povo",
        "não compadecida" — a profecia termina com reversão:
        "no lugar onde se lhes dizia: Vós não sois meu povo, se lhes
        dirá: Vós sois os filhos do Deus vivo." Tua última palavra
        sobre quem já rejeitaste nunca é rejeição definitiva. Amém.`),
    },
    meditation: {
      prompt: t(`A estrutura da profecia é deliberada: julgamento
        severo seguido de reversão completa — os mesmos nomes que
        significavam rejeição se tornam, no fim, nomes de restauração.`),
      questions: [
        'Existe algo no seu passado que você trata como rejeição permanente, mas que Deus talvez já esteja revertendo?',
        'Como essa reversão — de "não é meu povo" para "filhos do Deus vivo" — muda sua compreensão sobre a natureza última do julgamento de Deus?',
        'O que significaria confiar que a última palavra de Deus sobre você é sempre restauração, não condenação?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Justiça e a Paz Se Beijaram',
      text: t(`Senhor, o salmista descreve uma imagem de reconciliação
        completa: "a benignidade e a fidelidade se encontraram; a
        justiça e a paz se beijaram." São qualidades que parecem, às
        vezes, contraditórias — justiça exige acerto de contas, paz
        pede acolhimento — mas em ti elas se harmonizam sem conflito.
        Ensina-me a buscar essa mesma harmonia nas minhas
        relações. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem poética de qualidades abstratas — justiça,
        paz, benignidade, fidelidade — se "encontrando" e "se
        beijando" comunica uma reconciliação que a linguagem racional
        sozinha dificilmente captaria.`),
      questions: [
        'Onde na sua vida justiça e paz parecem estar em conflito, exigindo que você escolha uma em detrimento da outra?',
        'Como Deus consegue unir essas qualidades sem contradição, e o que isso ensina sobre buscar as duas simultaneamente?',
        'Que relacionamento na sua vida precisaria dessa mesma "reconciliação" entre acerto de contas e acolhimento?',
      ],
    },
  },
  {
    prayer: {
      title: 'Arraigados e Edificados Nele',
      text: t(`Senhor, Paulo pede que estejamos "arraigados e
        edificados" em Cristo, alertando contra quem nos faria "presa
        sua, por meio de filosofias e vãs sutilezas." Há tantas
        formas atraentes de pensamento que competem pela minha
        confiança. Mantém minhas raízes firmes em ti, para que eu não
        seja facilmente levado por qualquer ideia convincente. Amém.`),
    },
    meditation: {
      prompt: t(`As metáforas combinadas — raízes ("arraigados") e
        construção ("edificados") — sugerem tanto crescimento orgânico
        quanto estrutura deliberada, dois aspectos complementares de
        uma fé estável.`),
      questions: [
        'Que "filosofias e vãs sutilezas" competem hoje pela sua confiança, tentando afastar você de Cristo como centro?',
        'Você sente suas raízes espirituais firmes ou facilmente abaladas por ideias novas e convincentes?',
        'O que ajudaria você a estar mais "edificado" — estruturalmente firme — na sua fé?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ensina-nos a Orar',
      text: t(`Senhor Jesus, um discípulo te pediu: "ensina-nos a
        orar" — e tu deste um modelo simples, direto, sem
        formalidades excessivas: "Pai... dá-nos cada dia o nosso pão
        cotidiano." Livra-me da ideia de que oração precisa ser
        eloquente para ser genuína. Ensina-me também essa
        simplicidade confiante. Amém.`),
    },
    meditation: {
      prompt: t(`O modelo de oração que Jesus ensina é notavelmente
        breve e direto — pedidos concretos, cotidianos, sem retórica
        elaborada — um contraste com orações religiosas mais
        performáticas da época.`),
      questions: [
        'Você sente que precisa "orar bem" com palavras elaboradas, ou consegue orar com a simplicidade que Jesus ensinou?',
        'O que significa pedir "o pão cotidiano" — provisão diária, não acumulada — como modelo de confiança?',
        'Como o pedido de perdão junto ao compromisso de perdoar ("perdoa-nos... pois também nós perdoamos") desafia sua própria oração?',
      ],
    },
  },
  {
    prayer: {
      title: 'Pedi, e Dar-se-vos-á',
      text: t(`Senhor, depois de ensinar a orar, encorajaste
        persistência: "pedi, e dar-se-vos-á; buscai e achareis; batei,
        e abrir-se-vos-á." Não é oração de uma vez só, mas insistência
        confiante. Ajuda-me a não desistir de pedir, mesmo quando a
        resposta demora a chegar. Amém.`),
    },
    meditation: {
      prompt: t(`Os três verbos — pedir, buscar, bater — no tempo
        contínuo do grego original sugerem ação repetida, não um único
        pedido seguido de espera passiva.`),
      questions: [
        'Existe algo que você parou de pedir a Deus porque a resposta demorou demais?',
        'O que a persistência ensinada aqui — pedir continuamente, não apenas uma vez — muda sobre como você deveria orar?',
        'Que pedido você precisa retomar hoje, com renovada confiança?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quanto Mais Dará o Pai Celestial',
      text: t(`Senhor, encerramos a semana com tua garantia: "se vós,
        pois, sendo maus, sabeis dar boas dádivas aos vossos filhos,
        quanto mais dará o Pai celestial o Espírito Santo àqueles que
        lho pedirem." Se até pais imperfeitos sabem cuidar dos filhos,
        quanto mais tu, Pai perfeito, cuidas de mim. Que eu peça com
        essa confiança essa semana. Amém.`),
    },
    meditation: {
      prompt: t(`O argumento de Jesus é do menor para o maior — se
        até humanos imperfeitos ("sendo maus") sabem cuidar bem dos
        filhos, a bondade de Deus é necessariamente maior, não menor.`),
      questions: [
        'Você tende a duvidar da bondade de Deus mais do que confiaria na bondade de um pai humano imperfeito? Por quê?',
        'Esta semana — da fidelidade de Oséias à confiança ensinada na oração — o que te ensinou sobre a natureza da bondade de Deus?',
        'Que pedido específico você quer levar a Deus hoje, confiando nessa promessa?',
      ],
    },
  },
];

// Próprio 13 — Oséias 11:1-11 · Salmo 107:1-9, 43 · Colossenses 3:1-11 · Lucas 12:13-21
const proper13: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Quando Israel Era Menino, Eu o Amei',
      text: t(`Senhor, através de Oséias revelas um amor paternal
        profundo: "quando Israel era menino, eu o amei... eu ensinei
        aos de Efraim a andar; tomei-os nos meus braços." Mesmo diante
        da rejeição repetida, tua memória do amor original permanece.
        Lembra-me, quando me afasto, do amor que tiveste por mim desde
        o princípio. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem é intensamente parental — ensinar a andar,
        carregar nos braços — contrastando a ternura do cuidado
        original de Deus com a rejeição repetida que se seguiu.`),
      questions: [
        'Você consegue lembrar de um momento em que sentiu, de forma concreta, esse cuidado parental de Deus?',
        'Como a memória de um amor original pode sustentar uma relação mesmo diante de afastamento repetido?',
        'De que forma você tem "se afastado" apesar do cuidado contínuo de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu Sou Deus e Não Homem',
      text: t(`Senhor, mesmo diante da infidelidade de Israel,
        decides: "não executarei o furor da minha ira... porque eu
        sou Deus e não homem." Um humano provavelmente teria desistido
        — tu não. Tua paciência não segue os limites da paciência
        humana. Que eu confie nessa diferença quando temo ter
        esgotado tua misericórdia. Amém.`),
    },
    meditation: {
      prompt: t(`Deus explicitamente contrasta sua própria natureza
        com a humana — "eu sou Deus e não homem" — como explicação
        para uma paciência que excede qualquer padrão humano razoável.`),
      questions: [
        'Você já temeu ter esgotado a paciência de Deus, tratando-a como se fosse limitada como a humana?',
        'Como essa diferença — "Deus e não homem" — muda a forma como você imagina os limites da misericórdia divina?',
        'O que significaria confiar nessa paciência sem usá-la como desculpa para continuar se afastando?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ele Satisfaz a Alma Sedenta',
      text: t(`Senhor, o salmista descreve peregrinos "desgarrados
        pelo deserto", "famintos e sedentos", que "clamaram ao Senhor
        na sua tribulação, e ele os livrou." Não importa quão perdido
        me sinta, tua provisão alcança até o deserto mais distante.
        Guia-me quando estiver desgarrado, e satisfaz minha própria
        sede espiritual hoje. Amém.`),
    },
    meditation: {
      prompt: t(`O padrão do salmo se repete: desgarramento, clamor,
        libertação — uma estrutura que se aplica a múltiplas formas de
        sofrimento ao longo do texto, sugerindo um princípio universal
        de resposta divina.`),
      questions: [
        'Em que sentido você se sente "desgarrado pelo deserto" agora — sem direção clara?',
        'O padrão do salmo sugere que o clamor precede a libertação. O que impede você de clamar mais abertamente?',
        'Que "fome e sede" espiritual você reconhece em si mesmo hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Buscai as Coisas que São de Cima',
      text: t(`Senhor, Paulo instrui: "buscai as coisas que são de
        cima... pensai nas coisas que são de cima, e não nas que são
        da terra." Não é negação da vida terrena, mas reorientação de
        prioridade — deixar que o que é eterno molde o que é
        temporal, não o contrário. Reordena minhas prioridades hoje
        nessa direção. Amém.`),
    },
    meditation: {
      prompt: t(`A repetição — "buscai... pensai" — nas mesmas coisas
        "de cima" enfatiza que essa reorientação exige atenção
        deliberada e contínua, não uma decisão única.`),
      questions: [
        'No seu dia a dia, quanto do seu pensamento é dedicado ao que é temporal versus ao que é eterno?',
        'O que significa, na prática, "buscar as coisas de cima" sem negligenciar responsabilidades terrenas reais?',
        'Que hábito diário ajudaria você a reorientar seu pensamento nessa direção?',
      ],
    },
  },
  {
    prayer: {
      title: 'Que Farei? Não Tenho Onde Recolher',
      text: t(`Senhor Jesus, o homem rico da tua parábola, diante de
        uma colheita abundante, perguntou apenas a si mesmo: "que
        farei?" — sem nenhum pensamento sobre generosidade ou sobre
        ti. Sua abundância se tornou ocasião de isolamento, não de
        partilha. Examina minha própria reação diante da abundância —
        ela me leva a acumular ou a compartilhar? Amém.`),
    },
    meditation: {
      prompt: t(`Toda a deliberação interna do homem rico usa
        pronomes na primeira pessoa — "meus celeiros", "meus bens",
        "minha alma" — um monólogo inteiramente centrado em si mesmo,
        sem nenhuma menção a Deus ou a outros.`),
      questions: [
        'Ao enfrentar abundância ou sucesso, sua primeira reação tende a ser acumular ou compartilhar?',
        'O que a ausência total de Deus no raciocínio do homem rico revela sobre o verdadeiro perigo da autossuficiência?',
        'Que "celeiro maior" você está construindo, e para quem realmente serve?',
      ],
    },
  },
  {
    prayer: {
      title: 'Insensato, Esta Noite Te Pedirão a Tua Alma',
      text: t(`Senhor, o julgamento sobre o homem rico foi abrupto:
        "insensato, esta noite te pedirão a tua alma; e o que tens
        preparado, para quem será?" Toda a segurança dele, construída
        em bens acumulados, se revelou ilusória diante da mortalidade.
        Ajuda-me a viver com a consciência honesta de que a vida não
        me pertence indefinidamente. Amém.`),
    },
    meditation: {
      prompt: t(`A palavra "insensato" na parábola não se refere à
        falta de inteligência prática — o homem havia planejado bem —
        mas à cegueira espiritual de não considerar Deus nem a
        mortalidade em seu planejamento.`),
      questions: [
        'Como a consciência da própria mortalidade deveria mudar suas decisões práticas sobre acumular versus compartilhar?',
        'Você já confundiu planejamento financeiro competente com sabedoria espiritual genuína?',
        'O que você "tem preparado" que, se a vida terminasse hoje, seria para quem?',
      ],
    },
  },
  {
    prayer: {
      title: 'Rico Para com Deus',
      text: t(`Senhor, encerramos a semana com a frase final da
        parábola: "assim é aquele que para si ajunta tesouros, e não
        é rico para com Deus." Existe uma riqueza que não se mede em
        celeiros, mas em relação genuína contigo e generosidade com os
        outros. Que eu busque essa riqueza esta semana, mais do que
        qualquer acúmulo material. Amém.`),
    },
    meditation: {
      prompt: t(`A frase final contrasta dois tipos de riqueza —
        "para si" versus "para com Deus" — sugerindo que a verdadeira
        medida de prosperidade não está no volume acumulado, mas na
        direção do coração.`),
      questions: [
        'Esta semana — do amor paternal de Oséias ao homem rico insensato — o que te ensinou sobre a diferença entre acumular e ser genuinamente rico?',
        'O que significaria, concretamente, ser "rico para com Deus" em vez de apenas "rico para si"?',
        'Que passo prático você pode dar esta semana para redirecionar acúmulo em generosidade?',
      ],
    },
  },
];

// Próprio 14 — Isaías 1:1, 10-20 · Salmo 50:1-8, 22-23 · Hebreus 11:1-3, 8-16 · Lucas 12:32-40
const proper14: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Estou Farto dos Holocaustos',
      text: t(`Senhor, através de Isaías declaras: "de que me serve a
        mim a multidão de vossos sacrifícios? Estou farto." Ritual
        religioso sem justiça real te repugna, não te agrada. Examina
        minha própria religiosidade — ela é substituto conveniente
        para obediência real, ou expressão genuína de uma vida
        transformada? Amém.`),
    },
    meditation: {
      prompt: t(`Deus não rejeita o sistema sacrificial em si — ele
        rejeita sacrifícios oferecidos por mãos "cheias de sangue",
        praticados sem qualquer compromisso com justiça na vida
        cotidiana.`),
      questions: [
        'Você já usou prática religiosa — culto, oração, rituais — como substituto conveniente para mudança real de comportamento?',
        'O que significa, na prática, que Deus prefere justiça a rituais quando os dois entram em conflito?',
        'Que "ofertas vãs" você talvez esteja oferecendo a Deus, sem o compromisso real que ele pede junto?',
      ],
    },
  },
  {
    prayer: {
      title: 'Brancos Como a Neve',
      text: t(`Senhor, depois de toda a acusação severa, ofereces algo
        surpreendente: "ainda que os vossos pecados são como a
        escarlata, eles se tornarão brancos como a neve." O
        julgamento não é a última palavra — é convite ao arrependimento
        genuíno, com promessa real de transformação. Recebe meu
        arrependimento hoje com essa mesma generosidade. Amém.`),
    },
    meditation: {
      prompt: t(`A oferta de transformação vem logo depois da
        acusação mais dura do capítulo — Deus não suaviza o pecado,
        mas também não o trata como definitivo e sem remédio.`),
      questions: [
        'Você tende a focar mais na severidade da acusação de Deus contra o pecado ou na generosidade da oferta de transformação que a segue?',
        'O que significa, para você, que mesmo pecado descrito como "escarlata" pode se tornar "branco como a neve"?',
        'Que área da sua vida você precisa trazer honestamente a Deus hoje, confiando nessa promessa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Aquele Que Oferece Ações de Graças Me Glorifica',
      text: t(`Senhor, o salmista registra tua declaração: "aquele que
        oferece por sacrifício ações de graças me glorifica." Não é
        ritual elaborado que te honra mais, mas gratidão genuína,
        expressa de coração. Ensina-me a cultivar essa gratidão real,
        não apenas performática. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo, como Isaías, contrasta ritual vazio com
        substância real — aqui, especificamente, gratidão sincera
        como a verdadeira forma de honrar a Deus.`),
      questions: [
        'Sua gratidão a Deus é mais expressa em palavras ritualizadas ou em ações de graças genuínas do coração?',
        'Que motivo concreto de gratidão você poderia trazer a Deus hoje, de forma específica?',
        'Como cultivar gratidão diária muda a qualidade da sua relação com Deus, comparado a rituais isolados?',
      ],
    },
  },
  {
    prayer: {
      title: 'Saiu, Sem Saber para Onde Ia',
      text: t(`Senhor, Abraão "sendo chamado, obedeceu, saindo para um
        lugar que havia de receber por herança; e saiu, sem saber para
        onde ia." A fé dele não exigia mapa completo — apenas
        confiança suficiente para o primeiro passo. Ajuda-me a dar
        passos de obediência mesmo quando não vejo o caminho completo
        à frente. Amém.`),
    },
    meditation: {
      prompt: t(`O texto enfatiza deliberadamente a incerteza — "sem
        saber para onde ia" — a fé de Abraão não era baseada em
        informação completa, mas em confiança no caráter de quem
        chamava.`),
      questions: [
        'Existe um chamado atual em sua vida onde você exige um "mapa completo" antes de dar o primeiro passo?',
        'Como a disposição de Abraão de sair "sem saber para onde ia" desafia sua necessidade de certeza total antes de agir?',
        'Que primeiro passo de obediência você poderia dar hoje, mesmo sem ver o caminho inteiro?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Temas, Ó Pequeno Rebanho',
      text: t(`Senhor Jesus, disseste: "não temas, ó pequeno rebanho!
        porque a vosso Pai agradou dar-vos o reino." Antes de qualquer
        instrução sobre desapego material, vem essa garantia de
        segurança fundamental. Que essa certeza — de que já me deste o
        que mais importa — liberte-me do medo que alimenta o
        acúmulo ansioso. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus fala de um "pequeno rebanho" — reconhecendo
        explicitamente a vulnerabilidade real dos discípulos — mas
        fundamenta a coragem deles não em força própria, mas no prazer
        do Pai em dar o reino.`),
      questions: [
        'Você reconhece o medo, mesmo sutil, que alimenta seu próprio desejo de acumular segurança material?',
        'Como a certeza de já pertencer ao reino de Deus poderia libertar você desse medo hoje?',
        'O que significa ser um "pequeno rebanho" — vulnerável, mas não desamparado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Onde Estiver o Vosso Tesouro',
      text: t(`Senhor, disseste: "onde estiver o vosso tesouro, aí
        estará também o vosso coração." Não é apenas questão de
        posses, mas de direção do afeto — o que priorizo revela, com
        precisão, o que realmente amo. Examina meus tesouros atuais, e
        mostra-me se meu coração está alinhado com o que realmente
        importa. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus inverte a expectativa comum — normalmente
        pensamos que o coração determina onde investimos, mas ele
        sugere o oposto: onde investimos molda e revela o coração.`),
      questions: [
        'Se alguém observasse apenas onde você investe tempo, dinheiro e atenção, o que concluiria sobre seus verdadeiros valores?',
        'Existe uma discrepância entre o que você diz valorizar e onde realmente está seu "tesouro"?',
        'Que mudança prática de investimento — tempo, recursos — alinharia melhor seu coração com o que você quer priorizar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Numa Hora em Que Não Penseis',
      text: t(`Senhor, encerramos a semana com o alerta: "numa hora em
        que não penseis, virá o Filho do homem." Vigilância constante,
        não pânico ocasional, é o que pedes. Que eu viva esta semana —
        e todas as que vêm — com essa prontidão tranquila, não
        ansiosa, sabendo que estás sempre próximo. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem dos "servos vigiando" é de expectativa
        alegre, não medo — Jesus promete que ele mesmo os servirá
        quando chegar, invertendo a hierarquia esperada entre senhor e
        servos.`),
      questions: [
        'Sua expectativa da vinda de Cristo é mais de ansiedade ou de esperança alegre?',
        'Esta semana — de "estou farto de sacrifícios" à vigilância confiante — o que te ensinou sobre o que Deus realmente valoriza em você?',
        'O que significa viver "vigiando" de forma tranquila, não temerosa, esta semana?',
      ],
    },
  },
];

// Próprio 15 — Isaías 5:1-7 · Salmo 80:1-2, 8-19 · Hebreus 11:29-12:2 · Lucas 12:49-56
const proper15: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Uma Canção de Amor a Respeito da Sua Vinha',
      text: t(`Senhor, Isaías canta uma "canção de amor" sobre uma
        vinha cuidadosamente plantada, cercada e cultivada — que ainda
        assim "deu uvas bravas". Tanto cuidado investido, e o
        resultado foi decepção. Examina o que tenho produzido com todo
        o cuidado que investiste em mim — estou dando fruto digno
        desse investimento? Amém.`),
    },
    meditation: {
      prompt: t(`O gênero da "canção de amor" torna a decepção ainda
        mais pungente — não é uma lista fria de queixas, mas uma
        expressão de mágoa genuína, de quem investiu com carinho e não
        viu o resultado esperado.`),
      questions: [
        'Você já decepcionou alguém que investiu genuinamente em você, apesar de todo o cuidado recebido?',
        'O que significa reconhecer que Deus não apenas exige fruto, mas se magoa genuinamente quando não o encontra?',
        'Que "uvas bravas" você reconhece na sua própria vida, apesar do cuidado que Deus investiu nela?',
      ],
    },
  },
  {
    prayer: {
      title: 'Esperava Juízo, Eis Aqui Derramamento de Sangue',
      text: t(`Senhor, o jogo de palavras final de Isaías é devastador
        no original: esperavas "juízo" (mishpat) e encontraste
        "derramamento de sangue" (mispach); esperavas "justiça"
        (tsedaqah) e encontraste "clamor" (tse'aqah). Palavras quase
        idênticas, resultados opostos — a diferença sutil entre o que
        esperavas e o que recebeste. Ajuda-me a não confundir aparência
        de justiça com justiça real. Amém.`),
    },
    meditation: {
      prompt: t(`O trocadilho hebraico é praticamente impossível de
        traduzir perfeitamente, mas seu efeito é claro: a distância
        entre o que Deus esperava e o que encontrou era, ao mesmo
        tempo, sutil na forma e enorme no resultado.`),
      questions: [
        'Onde você já confundiu aparência de justiça com justiça real, por causa de semelhanças superficiais?',
        'Que áreas da sua vida ou comunidade têm apenas a forma da justiça, mas não a substância?',
        'O que ajudaria você a discernir, com mais clareza, a diferença sutil mas crucial entre os dois?',
      ],
    },
  },
  {
    prayer: {
      title: 'Trouxeste do Egito uma Videira',
      text: t(`Senhor, o salmista retoma a imagem da vinha, mas com
        súplica em vez de acusação: "trouxeste do Egito uma videira...
        volta-te, nós te rogamos; atende do céu, e vê, e visita esta
        videira." Onde Isaías anuncia julgamento, o salmo clama por
        restauração. Ensina-me a trazer minha própria decadência a ti
        com esse mesmo clamor honesto por restauração. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo usa a mesma imagem da vinha que Isaías, mas
        como oração de súplica desesperada, não como acusação —
        mostrando que a mesma verdade pode ser recebida com
        arrependimento e clamor, não apenas resignação ao juízo.`),
      questions: [
        'Diante de uma falha reconhecida, sua tendência é resignação silenciosa ou clamor ativo por restauração?',
        'O que significa "clamar" a Deus por restauração, em vez de simplesmente aceitar as consequências passivamente?',
        'Que área da sua vida você quer trazer diante de Deus hoje com esse mesmo tipo de súplica honesta?',
      ],
    },
  },
  {
    prayer: {
      title: 'Uma Tão Grande Nuvem de Testemunhas',
      text: t(`Senhor, depois de listar exemplos de fé de gerações
        passadas, o autor de Hebreus conclui: "tendo pois tão grande
        nuvem de testemunhas ao redor de nós... corramos com paciência
        a carreira que nos está proposta." Não corro sozinho — há uma
        multidão de fiéis que vieram antes de mim, testemunhando que a
        fé vale a pena. Fortalece-me com essa comunhão invisível. Amém.`),
    },
    meditation: {
      prompt: t(`A "nuvem de testemunhas" não são espectadores
        passivos, mas exemplos ativos que encorajam — a mesma fé
        praticada por Abraão, Moisés e outros continua disponível como
        modelo e inspiração hoje.`),
      questions: [
        'Que exemplos de fé — de pessoas da Bíblia, da história ou da sua própria vida — mais te encorajam a continuar quando você quer desistir?',
        'Como a ideia de correr "cercado" por uma nuvem de testemunhas muda a experiência solitária da luta espiritual?',
        'Que "peso" você precisa "despojar" para correr com mais liberdade a carreira da fé?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vim Lançar Fogo à Terra',
      text: t(`Senhor Jesus, disseste algo perturbador: "vim lançar
        fogo à terra; e que mais quero, se já está aceso?" Não vieste
        oferecer conforto fácil, mas transformação radical, mesmo que
        dolorosa. Não me deixes buscar um evangelho confortável demais
        para ser verdadeiro, evitando o fogo purificador que
        realmente preciso. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem do fogo aqui não é destruição
        arbitrária, mas purificação urgente — Jesus expressa quase
        impaciência por ver essa transformação já em curso se
        completar.`),
      questions: [
        'Você tende a preferir uma versão confortável do evangelho, evitando a transformação radical que ele pede?',
        'Que "fogo" purificador você suspeita que precisa passar, mesmo sabendo que será doloroso?',
        'Como a urgência de Jesus aqui — "que mais quero, se já está aceso" — desafia sua própria pressa (ou falta dela) em relação à transformação espiritual?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Trazer Paz, Mas Dissensão',
      text: t(`Senhor, disseste que não vieste "trazer paz à terra...
        mas antes dissensão" — até dentro de famílias. Seguir-te
        genuinamente pode custar relações confortáveis. Dá-me coragem
        para os conflitos que a fidelidade a ti eventualmente
        exigirá, sem buscar conflito desnecessário por si só. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não celebra a divisão como um bem em si — ele a
        reconhece como consequência inevitável de um compromisso
        radical que nem todos ao redor compartilharão.`),
      questions: [
        'Você já enfrentou tensão em relacionamentos por causa de um compromisso genuíno com sua fé?',
        'Como distinguir divisão que vem de fidelidade genuína daquela que vem de teimosia ou de julgamento desnecessário?',
        'Que relação na sua vida está sob tensão por causa de convicções que você não está disposto a abandonar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Como Não Sabeis Discernir Este Tempo?',
      text: t(`Senhor, encerramos a semana com tua crítica: "sabeis
        discernir a face da terra e do céu; como não sabeis então
        discernir este tempo?" Sabemos ler sinais óbvios, mas
        resistimos a ler os sinais espirituais mais importantes.
        Abre meus olhos para discernir o que realmente importa neste
        momento da minha vida. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não questiona a capacidade de discernimento das
        pessoas — elas claramente sabem ler o clima — ele questiona a
        vontade delas de aplicar esse mesmo discernimento a questões
        espirituais urgentes.`),
      questions: [
        'Esta semana — da vinha decepcionante de Isaías ao fogo urgente de Jesus — o que você percebe que Deus está tentando te mostrar agora?',
        'Que "sinais do tempo" espirituais você tem evitado discernir, apesar de perceber outros sinais claramente?',
        'O que ajudaria você a aplicar mais discernimento espiritual à sua própria vida esta semana?',
      ],
    },
  },
];

// Próprio 16 — Jeremias 1:4-10 · Salmo 71:1-6 · Hebreus 12:18-29 · Lucas 13:10-17
const proper16: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Antes Que Eu Te Formasse no Ventre Te Conheci',
      text: t(`Senhor, disseste a Jeremias: "antes que eu te formasse
        no ventre te conheci, e antes que saísses da madre te
        santifiquei." Meu chamado e meu valor não começaram no dia em
        que percebi sua presença — eles existiam antes mesmo de eu
        nascer. Ajuda-me a viver a partir dessa identidade já dada, não
        de uma que preciso conquistar. Amém.`),
    },
    meditation: {
      prompt: t(`Deus fala do conhecimento e propósito para Jeremias
        como já estabelecidos antes do nascimento — uma identidade
        concedida, não construída ao longo do tempo por conquista
        pessoal.`),
      questions: [
        'Você vive mais a partir de uma identidade já dada por Deus, ou de uma que sente precisar constantemente provar?',
        'Como a ideia de ser "conhecido" por Deus antes mesmo de nascer muda sua percepção sobre seu propósito?',
        'O que significaria confiar que seu valor já estava estabelecido antes de qualquer conquista sua?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Digas: Eu Sou um Menino',
      text: t(`Senhor, Jeremias protestou: "não sei falar; porque sou
        um menino" — e respondeste rejeitando essa desculpa: "não
        digas: eu sou um menino." Minhas próprias inseguranças e
        limitações não são desculpa válida diante do teu chamado.
        Fortalece-me para agir mesmo quando me sinto despreparado. Amém.`),
    },
    meditation: {
      prompt: t(`Deus não nega a inexperiência de Jeremias, mas
        recusa aceitá-la como razão para inação — a suficiência viria
        da presença divina, não da preparação prévia do profeta.`),
      questions: [
        'Que "sou um menino" — desculpa de inadequação — você usa para adiar um chamado que reconhece internamente?',
        'Como a promessa "eu sou contigo para te livrar" muda a equação entre preparo próprio e suficiência divina?',
        'O que você faria diferente hoje se realmente confiasse que sua fraqueza não é obstáculo ao chamado de Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tu És a Minha Rocha e a Minha Fortaleza',
      text: t(`Senhor, o salmista declara: "tu és a minha rocha e a
        minha fortaleza... em ti me tenho apoiado desde que nasci."
        Uma vida inteira de dependência, desde o início. Que minha
        própria confiança em ti seja assim — não ocasional, mas o fio
        contínuo de toda a minha existência. Amém.`),
    },
    meditation: {
      prompt: t(`A confiança descrita não é resposta a uma crise
        específica, mas um padrão de vida inteira — "desde a minha
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
      title: 'Um Reino que Não Pode Ser Abalado',
      text: t(`Senhor, o autor de Hebreus contrasta o monte Sinai
        aterrorizante com o Monte Sião, "a Jerusalém celestial" —
        "recebendo nós um reino que não pode ser abalado." Tantas
        coisas na minha vida são instáveis e passageiras. Ajuda-me a
        ancorar minha segurança no que realmente permanece, não no que
        pode ser abalado. Amém.`),
    },
    meditation: {
      prompt: t(`A comparação entre os dois montes — um de terror
        físico, outro de acolhimento festivo — representa a mudança
        radical na forma de se aproximar de Deus trazida por Cristo.`),
      questions: [
        'O que na sua vida você trata como estável, mas que na verdade "pode ser abalado"?',
        'Como a promessa de "um reino que não pode ser abalado" muda sua reação diante da instabilidade presente?',
        'O que significa, na prática, "retermos a graça" e servir "com reverência e temor" diante dessa segurança?',
      ],
    },
  },
  {
    prayer: {
      title: 'Estás Livre da Tua Enfermidade',
      text: t(`Senhor Jesus, ao ver uma mulher encurvada havia dezoito
        anos, imediatamente a chamaste e disseste: "estás livre da tua
        enfermidade." Ela não pediu — tu tomaste a iniciativa,
        respondendo a um sofrimento prolongado que ninguém mais parecia
        notar. Vê também as áreas da minha vida que carrego há anos,
        sem que eu tenha coragem de pedir libertação. Amém.`),
    },
    meditation: {
      prompt: t(`A mulher não pede cura — Jesus a nota, a chama, e age
        por iniciativa própria, diante de dezoito anos de sofrimento
        que a sinagoga inteira parecia ter aceitado como normal.`),
      questions: [
        'Existe algum sofrimento prolongado na sua vida que você já parou de esperar que fosse resolvido?',
        'Como a iniciativa de Jesus, sem pedido prévio, desafia a ideia de que você precisa "merecer" ou "pedir corretamente" a atenção de Deus?',
        'Quem ao seu redor carrega um fardo há tanto tempo que a comunidade já parou de notar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Esta Filha de Abraão',
      text: t(`Senhor, diante da indignação do chefe da sinagoga por
        curares no sábado, defendeste a mulher chamando-a de "esta
        filha de Abraão" — dignidade e pertencimento, não apenas caso
        clínico. Ajuda-me a reconhecer, em quem sofre ao meu redor,
        não um problema a resolver, mas uma pessoa com dignidade
        plena. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus argumenta a partir da lógica do próprio
        auditório religioso — se cuidam de animais no sábado, quanto
        mais deveriam cuidar de "uma filha de Abraão" presa há tanto
        tempo.`),
      questions: [
        'Você já tratou alguém sofrendo mais como "problema" a resolver do que como pessoa com dignidade plena?',
        'Como o título "filha de Abraão" — pertencimento à comunidade de fé — muda a urgência de cuidar dela?',
        'Que regra ou tradição você já priorizou, mesmo que inadvertidamente, acima do cuidado humano genuíno?',
      ],
    },
  },
  {
    prayer: {
      title: 'Todo o Povo Se Alegrava',
      text: t(`Senhor, encerramos a semana com a reação da multidão:
        "todo o povo se alegrava por todas as coisas gloriosas que
        eram feitas por ele." Enquanto os líderes religiosos se
        indignavam com regras quebradas, o povo comum reconhecia
        graça acontecendo diante deles. Ajuda-me a manter essa
        capacidade de alegria diante do que és, sem me perder em
        legalismo. Amém.`),
    },
    meditation: {
      prompt: t(`O contraste final é nítido: os "adversários"
        envergonhados versus "todo o povo" alegre — a mesma ação
        gerando reações opostas dependendo de onde estava o foco de
        cada grupo.`),
      questions: [
        'Esta semana — do chamado de Jeremias à cura da mulher encurvada — o que te ensinou sobre a diferença entre regra e graça genuína?',
        'Você tende a reagir a manifestações da graça de Deus mais com indignação (por regras quebradas) ou com alegria genuína?',
        'O que ajudaria você a cultivar mais dessa alegria simples diante das "coisas gloriosas" que Deus ainda faz?',
      ],
    },
  },
];

// Próprio 17 — Jeremias 2:4-13 · Salmo 81:1, 10-16 · Hebreus 13:1-8, 15-16 · Lucas 14:1, 7-14
const proper17: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Que Injustiça Acharam em Mim?',
      text: t(`Senhor, através de Jeremias perguntas: "que injustiça
        acharam em mim vossos pais, para se afastarem de mim?" Não há
        falha da tua parte que justifique o afastamento — só
        inconstância humana buscando "vaidade" em vez de fidelidade.
        Examina honestamente meus próprios motivos quando me afasto de
        ti. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta retórica de Deus não busca resposta —
        ela expõe a irracionalidade do afastamento: não havia razão
        legítima, apenas escolha livre de algo inferior.`),
      questions: [
        'Quando você já se afastou de Deus, havia realmente uma "injustiça" da parte dele, ou você buscava algo mais conveniente?',
        'O que a "vaidade" — coisas de nenhum proveito real — tem oferecido a você que parece atraente, mas não sustenta de fato?',
        'Como essa pergunta de Deus — sincera, não retórica de raiva — muda a forma como você entende seu próprio afastamento?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cisternas Rotas Que Não Retêm as Águas',
      text: t(`Senhor, dizes que "o meu povo fez duas maldades: a mim
        me deixaram, o manancial de águas vivas, e cavaram para si
        cisternas rotas, que não retêm as águas." Trocamos fonte
        infalível por armazenamento defeituoso. Examina quais
        "cisternas rotas" tenho cavado, esperando que satisfaçam sede
        que só tu podes saciar. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem é dupla — não apenas abandono da fonte, mas
        o esforço extra de "cavar" algo pior — o pecado exige mais
        trabalho do que confiar em Deus, e ainda assim não funciona.`),
      questions: [
        'Que "cisternas rotas" você tem cavado — trabalhando duro para conseguir algo que não sacia de verdade?',
        'Por que às vezes preferimos esforço próprio, mesmo ineficaz, a depender simplesmente da provisão de Deus?',
        'O que significaria voltar ao "manancial de águas vivas" hoje, em vez de continuar reparando cisternas quebradas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Abre Bem a Tua Boca, e Eu a Encherei',
      text: t(`Senhor, o salmista registra tua promessa: "abre bem a
        tua boca, e eu a encherei." Uma imagem de expectativa
        confiante — não sobrevivência mínima, mas abundância. Ainda
        assim, "o meu povo não ouviu a minha voz". Não me deixes
        recusar a abundância que ofereces por teimosia ou distração.
        Amém.`),
    },
    meditation: {
      prompt: t(`A imagem de "abrir bem a boca" sugere expectativa
        infantil e confiante, mas o salmo lamenta que o povo, mesmo
        assim, não a aceitou — a recusa não vem de falta de oferta,
        mas de falta de disposição.`),
      questions: [
        'O que impede você de "abrir a boca" — expectativa confiante — diante da provisão que Deus oferece?',
        'Você já recusou abundância genuína de Deus porque estava distraído com outras coisas?',
        'O que mudaria se você vivesse esta semana com essa expectativa infantil de que Deus quer encher, não apenas manter?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Vos Esqueçais da Hospitalidade',
      text: t(`Senhor, o autor de Hebreus instrui: "não vos esqueçais
        da hospitalidade, porque por ela alguns, sem o saberem,
        hospedaram anjos." Cada pessoa que recebo pode carregar mais
        significado do que percebo no momento. Ajuda-me a praticar
        hospitalidade genuína, sem calcular antecipadamente quem
        "merece" minha atenção. Amém.`),
    },
    meditation: {
      prompt: t(`A referência a "hospedar anjos sem o saber" remete a
        histórias como a de Abraão em Mamre — a hospitalidade genuína
        não sabe, de antemão, o valor completo de quem está recebendo.`),
      questions: [
        'Como você pratica hospitalidade hoje — de forma calculada, ou aberta ao inesperado?',
        'Quem, recentemente, você recebeu (ou poderia receber) sem saber completamente o valor dessa presença na sua vida?',
        'O que significaria viver com mais abertura a receber estranhos, confiando que Deus pode estar presente de formas inesperadas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Reclina-te no Último Lugar',
      text: t(`Senhor Jesus, ao ver convidados escolhendo os melhores
        lugares num banquete, aconselhaste: "reclina-te no último
        lugar." Não é falsa modéstia — é confiança de que o
        reconhecimento verdadeiro não precisa ser conquistado à força.
        Livra-me da ansiedade de garantir meu próprio lugar de
        destaque. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus observa o comportamento social real dos
        convidados antes de propor a parábola — sua instrução nasce
        de uma dinâmica humana universal de busca por status, não de
        um cenário abstrato.`),
      questions: [
        'Você já se pegou, como os convidados observados por Jesus, competindo sutilmente por posição ou reconhecimento?',
        'O que significaria genuinamente "reclinar-se no último lugar", sem esperar secretamente ser promovido?',
        'Como distinguir humildade real da falsa humildade que ainda busca elogio pela própria modéstia?',
      ],
    },
  },
  {
    prayer: {
      title: 'Convida os Pobres, os Aleijados, os Mancos',
      text: t(`Senhor, disseste também: "quando deres um banquete,
        convida os pobres, os aleijados, os mancos e os cegos" — quem
        não pode retribuir o favor. A generosidade que realmente
        importa é a que não espera retorno. Examina minha própria
        generosidade — ela é calculada ou genuinamente livre? Amém.`),
    },
    meditation: {
      prompt: t(`Jesus especifica exatamente as pessoas socialmente
        menos "úteis" para retribuição — a instrução desafia
        diretamente a lógica de reciprocidade que governa a maior
        parte da hospitalidade social.`),
      questions: [
        'Sua generosidade tende a ser calculada — esperando retorno, mesmo que social — ou genuinamente livre?',
        'Quem em sua vida ou comunidade se encaixaria hoje na categoria de "quem não pode retribuir"?',
        'O que impede você de praticar esse tipo de generosidade sem cálculo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Retribuído na Ressurreição dos Justos',
      text: t(`Senhor, encerramos a semana com tua promessa: quem
        pratica generosidade sem esperar retorno "será
        bem-aventurado; porque eles não têm com que te retribuir; pois
        retribuído te será na ressurreição dos justos." A recompensa
        real não é imediata, mas certa. Ajuda-me a viver com essa
        paciência que confia numa recompensa além do presente. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa desloca a recompensa para além do
        horizonte imediato — "na ressurreição dos justos" — exigindo
        uma fé que investe sem esperar retorno visível e rápido.`),
      questions: [
        'Esta semana — das cisternas rotas de Jeremias à generosidade sem cálculo de Jesus — o que te ensinou sobre onde buscar recompensa verdadeira?',
        'Você consegue investir em generosidade genuína confiando numa recompensa que talvez não veja logo?',
        'Que ato concreto de generosidade sem cálculo você pode praticar esta semana?',
      ],
    },
  },
];

// Próprio 18 — Jeremias 18:1-11 · Salmo 139:1-6, 13-18 · Filemom 1:1-21 · Lucas 14:25-33
const proper18: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Como o Barro na Mão do Oleiro',
      text: t(`Senhor, observando o oleiro remodelar um vaso
        estragado, revelaste: "como o barro na mão do oleiro, assim
        sois vós na minha mão." Quando algo em mim se estraga, tu não
        descartas — tu remodelas. Confio nesse processo, mesmo quando
        implica pressão e reformulação dolorosa. Amém.`),
    },
    meditation: {
      prompt: t(`O oleiro não joga fora o barro estragado — ele o
        remodela "conforme pareceu bem aos seus olhos", uma imagem de
        paciência criativa diante da falha, não de descarte.`),
      questions: [
        'Você já experimentou ser "remodelado" por Deus depois de algo em você ter se "estragado"?',
        'Como essa imagem — barro sendo refeito, não descartado — muda sua visão sobre falhas próprias?',
        'Que área da sua vida está atualmente "nas mãos do oleiro", sendo remodelada de forma que ainda não entende completamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Convertei-vos Pois Agora',
      text: t(`Senhor, mesmo diante de julgamento anunciado, o convite
        permanece aberto: "convertei-vos pois agora cada um do seu mau
        caminho." O anúncio de consequências nunca fecha a porta do
        arrependimento enquanto ainda há tempo. Que eu responda hoje,
        sem adiar, a qualquer convite de mudança que reconheço
        necessário. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa de Deus de "arrepender-se do mal" caso
        haja conversão genuína revela uma relação dinâmica, não
        determinismo fixo — a resposta humana genuinamente importa e
        pode mudar o curso anunciado.`),
      questions: [
        'Existe um "mau caminho" que você reconhece, mas continua adiando abandonar?',
        'Como a disposição de Deus de reconsiderar, diante de arrependimento real, muda sua urgência em responder hoje?',
        'O que significaria "converter-se agora", sem mais adiamento, numa área específica da sua vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tu Me Sondas, e Me Conheces',
      text: t(`Senhor, o salmista declara: "tu me sondas, e me
        conheces... tal conhecimento é maravilhoso demais para mim."
        Não há nada em mim escondido de ti — meus pensamentos, meu
        andar, meu deitar. Que essa consciência não me aterrorize,
        mas me console: sou plenamente conhecido, e ainda assim
        amado. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo descreve um conhecimento total e íntimo —
        "antes de haver palavra na minha língua" — e ainda assim
        conclui em maravilhamento grato, não em vergonha ou medo.`),
      questions: [
        'A ideia de ser completamente conhecido por Deus, em cada pensamento e ação, te causa mais conforto ou desconforto?',
        'O que mudaria se você vivesse com a certeza plena de "esmeradamente tecido" — formado com cuidado deliberado, não acidente?',
        'Como transformar o conhecimento total de Deus sobre você de fonte de medo em fonte de intimidade genuína?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Já Como Escravo, Mas Como Irmão',
      text: t(`Senhor, Paulo pede a Filemom que receba Onésimo, antes
        escravo fugitivo, "não já como escravo, antes mais do que
        escravo, como irmão amado." O evangelho transforma
        radicalmente as relações humanas mais estabelecidas. Examina
        onde ainda trato alguém segundo categorias antigas de status,
        quando o evangelho pede algo novo. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não usa sua autoridade apostólica para exigir
        — "embora tenha em Cristo plena liberdade para te mandar" —
        ele opta por apelar ao amor, deixando a decisão genuinamente
        livre a Filemom.`),
      questions: [
        'Existe uma relação em sua vida onde categorias antigas de status ou poder precisam ser transformadas pelo evangelho?',
        'Por que Paulo escolhe apelar ao amor em vez de exigir com autoridade, mesmo tendo esse direito?',
        'O que significa reconhecer alguém como "irmão amado" que a sociedade categoriza de forma inferior?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Pode Ser Meu Discípulo',
      text: t(`Senhor Jesus, tuas palavras são chocantes: "se alguém
        vier a mim, e não aborrecer a pai e mãe... não pode ser meu
        discípulo." Não é ódio literal, mas prioridade absoluta —
        nenhuma lealdade, por mais legítima, pode competir com meu
        compromisso contigo. Examina onde coloco outras lealdades
        acima da minha entrega a ti. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem hiperbólica semítica de "aborrecer"
        expressava contraste de prioridade extrema, não ódio literal —
        um recurso retórico comum que enfatizava o quanto o
        discipulado exigia primazia absoluta.`),
      questions: [
        'Que relação ou lealdade você teria dificuldade de subordinar ao seu compromisso com Cristo, se fosse necessário?',
        'Como distinguir prioridade absoluta a Deus de negligência real das responsabilidades familiares?',
        'O que essa exigência radical revela sobre a seriedade com que Jesus trata o discipulado, em contraste com um compromisso superficial?',
      ],
    },
  },
  {
    prayer: {
      title: 'Calcular as Despesas',
      text: t(`Senhor, perguntaste: "qual de vós, querendo edificar
        uma torre, não se senta primeiro a calcular as despesas?"
        Discipulado exige avaliação honesta do custo, não entusiasmo
        impulsivo que depois esfria. Ajuda-me a contar o custo
        real de te seguir, e ainda assim escolher segui-lo com os
        olhos abertos. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não desencoraja o discipulado com essas
        parábolas — ele deseja compromisso informado e duradouro, não
        entusiasmo momentâneo que colapsa diante da primeira
        dificuldade real.`),
      questions: [
        'Você já começou algo espiritualmente com entusiasmo, mas sem calcular o custo real, e depois desistiu?',
        'O que significaria, hoje, "calcular o custo" honesto do seu próprio discipulado?',
        'Como um compromisso informado, contando o custo, é diferente — e mais duradouro — do que entusiasmo impulsivo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Renunciar a Tudo Quanto Possui',
      text: t(`Senhor, encerramos a semana com a exigência final:
        "todo aquele dentre vós que não renuncia a tudo quanto possui,
        não pode ser meu discípulo." Não é necessariamente abandono
        literal de posses, mas disposição interior de soltar qualquer
        coisa que compita com meu compromisso contigo. Examina o que
        ainda me apego com mais força do que a ti. Amém.`),
    },
    meditation: {
      prompt: t(`A exigência final resume as parábolas anteriores —
        seguir Jesus exige disposição total, não parcial, mesmo que a
        prática concreta dessa renúncia varie de pessoa para pessoa.`),
      questions: [
        'Esta semana — do barro remodelado à renúncia radical exigida por Jesus — o que te ensinou sobre o tipo de entrega que Deus pede?',
        'O que você mais teria dificuldade de "renunciar" se Deus pedisse isso claramente?',
        'Como distinguir renúncia interior genuína de abandono literal desnecessário de responsabilidades legítimas?',
      ],
    },
  },
];

// Próprio 19 — Jeremias 4:11-12, 22-28 · Salmo 14 · 1 Timóteo 1:12-17 · Lucas 15:1-10
const proper19: DevotionalEntry[] = [
  {
    prayer: {
      title: 'São Sábios para Fazerem o Mal',
      text: t(`Senhor, dizes do teu povo: "são sábios para fazerem o
        mal, mas não sabem fazer o bem." Uma inteligência real,
        desperdiçada em direção errada — sabedoria prática torcida
        contra seu próprio propósito. Examina onde tenho usado minha
        própria capacidade e engenho para fins que não te
        glorificam. Amém.`),
    },
    meditation: {
      prompt: t(`A acusação não é de estupidez, mas de sabedoria mal
        direcionada — as mesmas capacidades que poderiam produzir bem
        são empregadas, com competência real, para o mal.`),
      questions: [
        'Existe alguma capacidade ou talento seu que você já usou de forma competente, mas para fins que não honravam a Deus?',
        'O que significa "não saber fazer o bem" mesmo tendo inteligência suficiente para o mal?',
        'Como redirecionar sua própria sabedoria e engenho para propósitos que realmente glorificam Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'De Todo Não a Consumirei',
      text: t(`Senhor, mesmo diante de um julgamento devastador
        anunciado — "toda a terra ficará assolada" —, prometes: "de
        todo, porém, não a consumirei." Mesmo no meio da disciplina
        mais severa, tu preservas um remanescente, uma esperança que
        não se apaga completamente. Agarro-me a essa promessa quando
        as consequências das minhas próprias falhas parecem
        totais. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa de preservação parcial em meio a um
        julgamento quase total revela um padrão constante no caráter
        de Deus: mesmo a disciplina mais severa nunca é destruição
        completa e definitiva.`),
      questions: [
        'Você já viveu um período de consequências severas que, olhando para trás, ainda continha algum resquício de esperança preservada?',
        'O que significa confiar que Deus "não consumirá de todo", mesmo diante das piores consequências das suas próprias escolhas?',
        'Como essa promessa muda sua forma de enfrentar disciplina ou correção difícil hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Diz o Néscio no Seu Coração',
      text: t(`Senhor, o salmista descreve alguém que declara "não há
        Deus" e, consequentemente, se corrompe. A negação prática da
        tua existência não é apenas erro intelectual, mas leva a
        consequências morais concretas. Examina se, mesmo confessando
        crer em ti, algumas áreas da minha vida funcionam como se
        Deus não existisse. Amém.`),
    },
    meditation: {
      prompt: t(`A "negação" do salmo não é necessariamente ateísmo
        filosófico formal, mas viver como se Deus não observasse —
        uma negação prática mais comum do que a teórica.`),
      questions: [
        'Existe alguma área da sua vida onde você age, na prática, como se Deus não estivesse observando?',
        'Como distinguir crença intelectual em Deus de uma vida que realmente reflete essa crença em cada decisão?',
        'O que ajudaria você a viver de forma mais consistente com o que professa crer?',
      ],
    },
  },
  {
    prayer: {
      title: 'Dos Quais Sou Eu o Principal',
      text: t(`Senhor, Paulo declara, sem meias palavras: "Cristo
        Jesus veio ao mundo para salvar os pecadores, dos quais sou eu
        o principal." Não uma falsa modéstia, mas honestidade profunda
        sobre sua própria história de perseguição violenta da igreja.
        Ajuda-me a essa mesma honestidade sobre minha própria condição
        diante da tua graça. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo usa o presente do verbo — "sou eu o principal",
        não "era" — sugerindo que a consciência da própria condição de
        pecador permanece viva, não como culpa paralisante, mas como
        humildade constante.`),
      questions: [
        'Você mantém uma consciência honesta e presente da sua própria necessidade de graça, ou ela diminui com o tempo?',
        'Como Paulo transforma sua pior história — perseguidor da igreja — em testemunho da paciência de Deus, em vez de escondê-la?',
        'O que significaria para você usar sua própria história de falha como testemunho, não como vergonha escondida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Este Recebe Pecadores, e Come com Eles',
      text: t(`Senhor Jesus, os fariseus murmuravam contra ti porque
        "recebes pecadores, e comes com eles" — a acusação era,
        involuntariamente, exatamente o que fazias de bom. Que eu não
        seja como eles, criticando aquilo que deveria me atrair mais
        para ti: tua disposição de receber quem outros rejeitam. Amém.`),
    },
    meditation: {
      prompt: t(`A acusação dos fariseus, pensada como condenação, é
        de fato uma descrição precisa e positiva do evangelho — Jesus
        realmente recebe pecadores e come com eles, sem hesitação.`),
      questions: [
        'Você já criticou, mesmo que involuntariamente, algo em Deus ou na igreja que na verdade era graça genuína em ação?',
        'Como a acusação dos fariseus, sendo verdadeira, revela o coração real do evangelho?',
        'Quem, ao seu redor, você trataria com a mesma reserva que os fariseus tratavam os "pecadores e publicanos"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vai Após a Perdida Até Que a Encontre',
      text: t(`Senhor, na parábola da ovelha perdida, o pastor deixa
        as noventa e nove "e vai após a perdida até que a encontre."
        Não espera passivamente que ela retorne — busca ativamente,
        com persistência. Obrigado por me buscares dessa forma mesmo
        quando eu me afastei sem perceber completamente. Amém.`),
    },
    meditation: {
      prompt: t(`A busca do pastor é ativa e persistente — "até que a
        encontre" — não uma busca que desiste após tentativa breve,
        mas compromisso total com o resgate da ovelha perdida.`),
      questions: [
        'Você já sentiu essa busca ativa de Deus num momento em que estava afastado, mesmo sem procurá-lo primeiro?',
        'O que significa que Deus busca "até encontrar", não desiste diante de resistência ou tempo prolongado?',
        'Quem em sua vida você é chamado a buscar dessa mesma forma persistente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Maior Alegria no Céu',
      text: t(`Senhor, encerramos a semana com tua declaração: "haverá
        maior alegria no céu por um pecador que se arrepende, do que
        por noventa e nove justos que não necessitam de
        arrependimento." A celebração pelo retorno de quem se perdeu é
        genuína e desproporcional. Ajuda-me a compartilhar dessa
        mesma alegria pelo arrependimento de outros, sem inveja ou
        ressentimento. Amém.`),
    },
    meditation: {
      prompt: t(`A comparação numérica — mais alegria por um do que
        por noventa e nove — desafia deliberadamente a lógica humana
        de proporcionalidade, revelando um coração paternal, não
        contábil.`),
      questions: [
        'Esta semana — da sabedoria torcida em Jeremias à busca ativa do pastor — o que te ensinou sobre o coração de Deus por quem se perde?',
        'Você consegue genuinamente se alegrar pelo retorno de alguém, mesmo que sua própria fidelidade pareça "menos celebrada" em comparação?',
        'Que "ovelha perdida" em sua vida ou comunidade você poderia buscar ativamente esta semana?',
      ],
    },
  },
];

// Próprio 20 — Jeremias 8:18-9:1 · Salmo 79:1-9 · 1 Timóteo 2:1-7 · Lucas 16:1-13
const proper20: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Quem Me Dera Que a Minha Cabeça Se Tornasse em Águas',
      text: t(`Senhor, Jeremias, o "profeta chorão", clama: "quem me
        dera que a minha cabeça se tornasse em águas, e os meus olhos
        numa fonte de lágrimas, para que eu chorasse de dia e de noite
        os mortos da filha do meu povo!" A dor profunda diante do
        pecado alheio não é fraqueza, mas compaixão genuína. Ensina-me
        a chorar pelo que também te entristece. Amém.`),
    },
    meditation: {
      prompt: t(`Jeremias não profetiza julgamento com distanciamento
        frio — ele chora enquanto anuncia, mostrando que amor e
        confronto podem, e devem, coexistir.`),
      questions: [
        'Você consegue confrontar o que está errado ao seu redor com a mesma compaixão chorosa de Jeremias, em vez de frieza ou julgamento distante?',
        'O que já te fez chorar profundamente diante de uma situação de injustiça ou afastamento espiritual?',
        'Como cultivar essa capacidade de sentir a dor de Deus pelo que entristece a ele?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ninguém Há Que Se Arrependa',
      text: t(`Senhor, através de Jeremias lamentas: "ninguém há que
        se arrependa da sua maldade, dizendo: que fiz eu?" Não é a
        falha em si que mais entristece, mas a ausência total de
        autoexame honesto. Ajuda-me a nunca perder essa disposição de
        me perguntar, com sinceridade, o que fiz de errado. Amém.`),
    },
    meditation: {
      prompt: t(`A lamentação divina não é sobre pecado isolado, mas
        sobre a ausência completa de reflexão — "que fiz eu?" nunca é
        perguntado, revelando uma cegueira mais profunda que o próprio
        erro.`),
      questions: [
        'Você mantém o hábito regular de se perguntar honestamente "que fiz eu?" diante de suas próprias falhas?',
        'O que dificulta esse tipo de autoexame sincero na sua vida cotidiana?',
        'Que prática — diário, oração, conversa honesta — poderia ajudar você a cultivar mais autorreflexão genuína?',
      ],
    },
  },
  {
    prayer: {
      title: 'Até Quando, Senhor?',
      text: t(`Senhor, o salmista, diante da devastação de Jerusalém,
        clama: "até quando, Senhor? Indignar-te-ás para sempre?" É
        permitido, diante de sofrimento prolongado, perguntar
        honestamente quanto tempo mais. Recebe minha própria pergunta
        "até quando" sobre o que ainda espero que mudes na minha
        vida. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não esconde a impaciência diante do
        sofrimento contínuo — o "até quando" é oração legítima, não
        falta de fé, dirigida diretamente a Deus.`),
      questions: [
        'Existe um "até quando" que você tem hesitado perguntar honestamente a Deus?',
        'Como a permissão bíblica para essa pergunta muda sua forma de orar sobre situações prolongadas de dor?',
        'O que significa trazer impaciência genuína a Deus em vez de escondê-la atrás de resignação forçada?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deseja Que Todos os Homens Sejam Salvos',
      text: t(`Senhor, Paulo escreve que "deseja que todos os homens
        sejam salvos e cheguem ao pleno conhecimento da verdade" — um
        desejo universal, não restrito a um grupo específico. Amplia
        meu coração para orar genuinamente por todos, mesmo por quem
        considero mais distante da fé. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo instrui oração especificamente por "reis" e
        "todos os que exercem autoridade" — incluindo figuras de poder
        que talvez fossem hostis à igreja, mostrando que o desejo
        divino de salvação não conhece fronteiras políticas.`),
      questions: [
        'Você ora regularmente por pessoas em posição de autoridade, mesmo aquelas com quem discorda profundamente?',
        'O que significa compartilhar o desejo universal de Deus — "todos os homens sejam salvos" — em vez de limitar sua oração a grupos específicos?',
        'Quem você tem excluído, mesmo inconscientemente, das suas orações por salvação?',
      ],
    },
  },
  {
    prayer: {
      title: 'Presta Contas da Tua Mordomia',
      text: t(`Senhor Jesus, na parábola, o senhor exige do mordomo:
        "presta contas da tua mordomia." Tudo o que tenho — tempo,
        recursos, capacidades — é confiado a mim, não possuído
        absolutamente. Ajuda-me a viver com essa consciência de
        mordomia, não de posse independente. Amém.`),
    },
    meditation: {
      prompt: t(`A parábola pressupõe, desde o início, que nada
        pertence verdadeiramente ao mordomo — ele administra recursos
        de outro, uma verdade que se aplica igualmente a tudo o que
        cada pessoa considera "seu".`),
      questions: [
        'Você vive mais como dono absoluto dos seus recursos ou como mordomo prestando contas a Deus?',
        'Se precisasse "prestar contas" hoje de como usou seu tempo e recursos, o que essa avaliação revelaria?',
        'O que mudaria na sua forma de administrar recursos se você levasse a sério essa consciência de mordomia?',
      ],
    },
  },
  {
    prayer: {
      title: 'Fiel no Pouco, Fiel no Muito',
      text: t(`Senhor, disseste: "quem é fiel no pouco, também é fiel
        no muito." A fidelidade genuína se revela nos detalhes
        pequenos, não apenas nas grandes ocasiões visíveis. Examina
        minha fidelidade nas coisas pequenas e ordinárias do meu dia a
        dia, que ninguém mais nota. Amém.`),
    },
    meditation: {
      prompt: t(`O princípio funciona como teste de caráter — a
        fidelidade em pequenas responsabilidades, invisíveis à maioria,
        prevê e determina como a mesma pessoa lidaria com
        responsabilidades maiores.`),
      questions: [
        'Como está sua fidelidade nas pequenas responsabilidades cotidianas que ninguém observa ou elogia?',
        'Existe alguma área "pequena" da sua vida onde você tem sido negligente, esperando ser fiel apenas quando algo "grande" surgir?',
        'O que significaria tratar cada pequena responsabilidade como teste real de caráter?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Podeis Servir a Deus e a Riquezas',
      text: t(`Senhor, encerramos a semana com tua declaração final:
        "nenhum servo pode servir a dois senhores... não podeis servir
        a Deus e a riquezas." Não é possível dividir lealdade suprema.
        Examina onde ainda tento servir dois senhores, e ajuda-me a
        escolher, com clareza, a quem realmente sirvo. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não condena riqueza em si, mas a tentativa de
        tratá-la como senhor supremo ao lado de Deus — a incompatibilidade
        está na exigência de lealdade última, não na posse material.`),
      questions: [
        'Esta semana — do choro compassivo de Jeremias à mordomia fiel — o que te ensinou sobre onde depositar sua lealdade suprema?',
        'Onde você percebe, honestamente, uma divisão de lealdade entre Deus e outra coisa que compete por primazia?',
        'O que significaria, concretamente esta semana, escolher com clareza a quem você realmente serve?',
      ],
    },
  },
];

// Próprio 21 — Jeremias 32:1-3a, 6-15 · Salmo 91:1-6, 14-16 · 1 Timóteo 6:6-19 · Lucas 16:19-31
const proper21: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Compra o Meu Campo',
      text: t(`Senhor, no meio do cerco babilônico, com Jerusalém
        prestes a cair, mandaste Jeremias comprar um campo — um ato de
        esperança concreta enquanto tudo parecia perdido. Não era
        ingenuidade, era fé de que a restauração viria depois do
        julgamento. Ensina-me a fazer investimentos de esperança
        mesmo em meio às minhas próprias crises. Amém.`),
    },
    meditation: {
      prompt: t(`A compra do campo, num momento de destruição
        iminente e completa, seria vista como financeiramente
        absurda por qualquer padrão racional — era, precisamente por
        isso, um ato profético de fé.`),
      questions: [
        'Existe algum "investimento de esperança" que você poderia fazer hoje, mesmo em meio a circunstâncias que parecem desesperadoras?',
        'Como distinguir fé genuína de ingenuidade irresponsável nesse tipo de decisão?',
        'Que ação concreta — não apenas sentimento interno — expressaria sua esperança na restauração que Deus promete?',
      ],
    },
  },
  {
    prayer: {
      title: 'Assinei a Escritura e a Selei',
      text: t(`Senhor, Jeremias documentou cuidadosamente a compra —
        "assinei a escritura e a selei, chamei testemunhas" —
        tornando pública e formal sua fé na restauração futura. A
        esperança verdadeira se registra, se testemunha, não fica
        apenas em pensamento privado. Ajuda-me a testemunhar
        publicamente minha própria esperança em ti. Amém.`),
    },
    meditation: {
      prompt: t(`O cuidado legal e público do processo — testemunhas,
        documentação selada — transforma um gesto de fé pessoal em
        testemunho público e verificável para gerações futuras.`),
      questions: [
        'Você tende a manter sua esperança em Deus como algo privado, ou já a testemunhou publicamente de forma concreta?',
        'O que significa "documentar" sua fé — através de decisões visíveis, não apenas convicções internas?',
        'Que testemunho público de esperança você poderia oferecer a alguém que está numa crise semelhante à dele?',
      ],
    },
  },
  {
    prayer: {
      title: 'Debaixo das Suas Asas Encontras Refúgio',
      text: t(`Senhor, o salmista descreve: "ele te cobre com as suas
        penas, e debaixo das suas asas encontras refúgio." Uma imagem
        de proteção íntima e maternal, não distante. Que eu busque
        esse refúgio hoje, especialmente nas áreas onde me sinto mais
        exposto e vulnerável. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem das "asas" evoca proteção maternal íntima
        — não distância de um Deus poderoso e remoto, mas
        proximidade calorosa de quem cobre e abriga.`),
      questions: [
        'Onde você mais se sente vulnerável e exposto hoje, precisando desse refúgio?',
        'Como a imagem maternal de "asas" muda a forma como você imagina a proteção de Deus, se você tende a pensar nele apenas como poder distante?',
        'O que significa, na prática, "buscar refúgio" em Deus em vez de tentar se proteger sozinho?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nada Trouxe para Este Mundo',
      text: t(`Senhor, Paulo lembra a verdade simples e desconfortável:
        "nada trouxe para este mundo, e nada podemos daqui levar."
        Toda acumulação é, no fim, temporária. Ajuda-me a viver com
        contentamento genuíno, não perseguindo riqueza como se ela
        fosse permanente ou definidora do meu valor. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não condena posse ou trabalho, mas identifica
        o "amor ao dinheiro" — não o dinheiro em si — como "raiz de
        todos os males", uma distinção importante entre ter recursos e
        ser dominado por eles.`),
      questions: [
        'Você vive com o contentamento genuíno que Paulo descreve, ou uma ansiedade constante por acumular mais?',
        'Como a certeza de que "nada podemos daqui levar" muda suas prioridades práticas de investimento de tempo e recursos?',
        'Onde você percebe, honestamente, sinais de que ama o dinheiro mais do que deveria?',
      ],
    },
  },
  {
    prayer: {
      title: 'Um Mendigo, Chamado Lázaro',
      text: t(`Senhor Jesus, na tua parábola, o mendigo Lázaro é
        nomeado — algo raro nas tuas histórias — enquanto o homem rico
        permanece sem nome. A dignidade de quem sofre à porta importa
        mais para ti do que o status de quem vive em conforto. Ajuda-me
        a nomear e reconhecer, individualmente, quem sofre ao meu
        redor, em vez de ignorá-lo genericamente. Amém.`),
    },
    meditation: {
      prompt: t(`É a única parábola de Jesus onde um personagem
        recebe um nome próprio — um detalhe deliberado que confere
        dignidade individual a Lázaro, em contraste com o anonimato do
        homem rico.`),
      questions: [
        'Você conhece pelo nome as pessoas mais vulneráveis que cruzam seu caminho regularmente, ou elas permanecem genéricas para você?',
        'O que significa, concretamente, "nomear" e reconhecer individualmente quem sofre, em vez de tratá-lo como categoria abstrata?',
        'Quem, "à sua porta", você tem passado sem realmente ver?',
      ],
    },
  },
  {
    prayer: {
      title: 'Um Grande Abismo',
      text: t(`Senhor, depois da morte, "entre nós e vós está posto um
        grande abismo" — a oportunidade de resposta que existia em
        vida se torna irreversível depois. Que essa urgência me
        desperte hoje: as escolhas que faço agora, sobre como trato os
        vulneráveis, têm peso eterno. Amém.`),
    },
    meditation: {
      prompt: t(`O "grande abismo" descrito não é arbitrário — ele
        representa a cristalização permanente de escolhas feitas
        durante a vida, um alerta sobre a seriedade do tempo presente.`),
      questions: [
        'Como a urgência dessa parábola muda a forma como você encara decisões cotidianas sobre generosidade e compaixão?',
        'Que "abismo" você já criou, mesmo sem perceber, entre você e alguém que precisa da sua atenção?',
        'O que essa parábola desafia sobre adiar decisões importantes de caráter até depois?',
      ],
    },
  },
  {
    prayer: {
      title: 'Têm Moisés e os Profetas',
      text: t(`Senhor, encerramos a semana com a resposta final de
        Abraão: "têm Moisés e os profetas; ouçam-nos" — não é falta de
        revelação que impede o arrependimento, mas falta de disposição
        de ouvir o que já foi dado. Ajuda-me a prestar atenção genuína
        ao que já revelaste, sem esperar por sinais mais dramáticos.
        Amém.`),
    },
    meditation: {
      prompt: t(`A ironia final é aguda: mesmo a ressurreição de
        alguém dentre os mortos não convenceria quem já rejeita a
        revelação disponível — o problema nunca foi falta de evidência,
        mas disposição do coração.`),
      questions: [
        'Esta semana — do campo comprado por fé à parábola do rico e Lázaro — o que te ensinou sobre urgência e responsabilidade presente?',
        'Você já esperou por um "sinal maior" enquanto ignorava o que Deus já havia claramente revelado?',
        'O que você já sabe que precisa fazer, sem esperar por mais confirmação além da que já tem?',
      ],
    },
  },
];

// Próprio 22 — Lamentações 1:1-6; 3:19-26 · Salmo 137 · 2 Timóteo 1:1-14 · Lucas 17:5-10
const proper22: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Como Está Sentada Solitária a Cidade',
      text: t(`Senhor, Lamentações abre com um retrato de devastação
        completa: "como está sentada solitária a cidade que era tão
        populosa!" Permites que expresse minha própria dor sem
        disfarce, sem tentar embelezar a devastação que às vezes
        sinto. O lamento honesto é oração legítima diante de ti. Amém.`),
    },
    meditation: {
      prompt: t(`O gênero literário do lamento, presente em todo o
        livro, valida a expressão de dor não resolvida como forma
        legítima de oração, sem exigir resolução imediata ou
        otimismo forçado.`),
      questions: [
        'Você se permite expressar dor e devastação genuínas diante de Deus, ou sente necessidade de "resolver" rapidamente na oração?',
        'O que significaria trazer a Deus uma lamentação honesta, sem pressa de chegar à esperança?',
        'Que "cidade devastada" — situação de perda profunda — você precisa lamentar honestamente hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Suas Misericórdias Se Renovam Cada Manhã',
      text: t(`Senhor, no meio do lamento mais profundo, vem a
        virada: "as suas misericórdias se renovam cada manhã; grande é
        a tua fidelidade." Um dos versos mais esperançosos da
        Escritura nasce, paradoxalmente, no meio do livro mais
        sombrio. Que eu confie nessa renovação diária mesmo quando
        minha própria situação parece tão desoladora quanto a de
        Jerusalém. Amém.`),
    },
    meditation: {
      prompt: t(`A esperança de Lamentações 3 não nega a devastação
        do capítulo 1 — ela emerge de dentro dela, mostrando que
        esperança genuína não precisa negar a dor real para
        existir.`),
      questions: [
        'Você consegue segurar, ao mesmo tempo, dor real e esperança genuína, ou sente que precisa escolher uma em detrimento da outra?',
        'O que significa que as misericórdias de Deus "se renovam cada manhã" — não apenas uma vez, mas continuamente?',
        'Como essa promessa muda sua forma de encarar o próximo dia, mesmo em meio a circunstâncias difíceis?',
      ],
    },
  },
  {
    prayer: {
      title: 'Como Entoaremos o Cântico do Senhor em Terra Estrangeira?',
      text: t(`Senhor, o salmista, exilado, pergunta: "como
        entoaremos o cântico do Senhor em terra estrangeira?" Há
        momentos em que o louvor genuíno parece impossível, quando a
        dor do exílio — literal ou figurado — silencia qualquer
        canção. Recebe também meu silêncio quando não consigo cantar,
        como oração válida. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não resolve a tensão entre lembrança dolorosa
        de Sião e a exigência de cantar para os opressores — ele
        simplesmente presa a pergunta sem resposta fácil, deixando
        espaço para o silêncio legítimo.`),
      questions: [
        'Existe um momento atual em que "cantar" — louvar genuinamente — parece impossível para você?',
        'Como Deus recebe seu silêncio ou sua incapacidade momentânea de louvar, e por que isso ainda é oração válida?',
        'O que significaria permitir-se essa honestidade, em vez de forçar louvor artificial diante da dor real?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Não Nos Deu o Espírito de Covardia',
      text: t(`Senhor, Paulo lembra Timóteo: "Deus não nos deu o
        espírito de covardia, mas de poder, de amor e de moderação."
        Diante de circunstâncias que provocam medo, tu ofereces
        recursos concretos, não abandono. Ajuda-me a reconhecer e usar
        esses três dons — poder, amor, moderação — quando o medo
        aperta. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não apenas nega o medo ("não é o que Deus
        deu") — ele nomeia especificamente o que Deus deu no lugar,
        três qualidades concretas para enfrentar situações difíceis.`),
      questions: [
        'Diante de qual medo atual você precisa lembrar que Deus lhe deu "poder, amor e moderação", não covardia?',
        'Qual dessas três qualidades — poder, amor, moderação — você sente mais desenvolvida em você, e qual mais frágil?',
        'O que significaria "despertar" esses dons, como Paulo pede a Timóteo, em vez de deixá-los inativos?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Te Envergonhes do Testemunho',
      text: t(`Senhor, Paulo pede a Timóteo: "não te envergonhes do
        testemunho de nosso Senhor... antes participa comigo dos
        sofrimentos do evangelho segundo o poder de Deus." O
        chamado inclui, às vezes, custo social e até sofrimento real
        — mas nunca sozinho, sempre "segundo o poder de Deus". Tira
        de mim qualquer vergonha em relação a te testemunhar
        abertamente. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não minimiza o custo real de testemunhar
        publicamente — ele o reconhece como "sofrimento" genuíno, mas
        insiste que ele vem acompanhado do poder de Deus, não é
        enfrentado com força própria.`),
      questions: [
        'Você já sentiu vergonha ou hesitação em testemunhar abertamente sobre sua fé, por medo do custo social?',
        'O que significa enfrentar esse custo "segundo o poder de Deus", não pela própria força?',
        'Que oportunidade de testemunho você tem evitado por medo de constrangimento ou rejeição?',
      ],
    },
  },
  {
    prayer: {
      title: 'Aumenta-nos a Fé',
      text: t(`Senhor Jesus, os apóstolos pediram: "aumenta-nos a fé"
        — e respondeste que fé "como um grão de mostarda" já bastaria
        para o impossível. Não é quantidade de fé que preciso, mas fé
        genuína, mesmo pequena, colocada em ti. Alivia-me da pressão
        de precisar sentir fé "suficiente" antes de agir. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta de Jesus desloca o foco de quantidade
        para qualidade — não é o tamanho da fé que importa, mas o
        objeto em quem ela é depositada.`),
      questions: [
        'Você já adiou uma ação de fé esperando "sentir mais fé" antes de agir?',
        'Como a promessa de que fé "como grão de mostarda" já é suficiente muda sua ansiedade sobre não ter fé "o bastante"?',
        'Que ação você poderia dar hoje, mesmo com fé pequena, confiando que ela já é suficiente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Fizemos Somente o Que Devíamos Fazer',
      text: t(`Senhor, encerramos a semana com tua instrução aos
        servos: depois de cumprir o dever, dizer "somos servos
        inúteis; fizemos somente o que devíamos fazer." Não busco
        obedecer para conquistar mérito especial, mas por amor
        genuíno, reconhecendo que cumprir meu dever não me torna credor
        de nada além do que já me deste. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem é deliberadamente humilde — não porque o
        serviço não importe, mas para evitar a armadilha de tratar
        obediência como transação que gera direito a recompensa
        especial.`),
      questions: [
        'Esta semana — do lamento honesto às misericórdias renovadas — o que te ensinou sobre a relação entre dever, graça e mérito?',
        'Você tende a servir a Deus esperando reconhecimento especial, ou por gratidão genuína pelo que já recebeu?',
        'O que significaria cumprir suas responsabilidades espirituais sem esperar crédito adicional além da própria graça já recebida?',
      ],
    },
  },
];

// Próprio 23 — Jeremias 29:1, 4-7 · Salmo 66:1-12 · 2 Timóteo 2:8-15 · Lucas 17:11-19
const proper23: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Edificai Casas e Habitai-as',
      text: t(`Senhor, aos exilados em Babilônia, mandaste: "edificai
        casas e habitai-as; plantai jardins, e comei o seu fruto...
        multiplicai-vos ali." Não instruíste resistência amarga nem
        espera passiva, mas vida plena mesmo em terra estrangeira e
        indesejada. Ensina-me a viver plenamente onde estou, mesmo em
        circunstâncias que não escolhi. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução é surpreendente para exilados que
        provavelmente esperavam apenas sobreviver até o retorno —
        Deus pede engajamento genuíno com a vida presente, não apenas
        resistência à espera de mudança.`),
      questions: [
        'Existe uma circunstância atual — trabalho, lugar, situação — que você não escolheu, mas onde precisa "edificar casas" em vez de apenas esperar sair?',
        'Como distinguir aceitação genuína e produtiva de resignação amarga diante de circunstâncias indesejadas?',
        'O que significaria, concretamente, "plantar" e investir onde você está agora, mesmo que temporário?',
      ],
    },
  },
  {
    prayer: {
      title: 'Procurai a Paz da Cidade',
      text: t(`Senhor, além de viver plenamente, mandaste os exilados:
        "procurai a paz da cidade... e orai por ela ao Senhor: porque
        na sua paz vós tereis paz." O bem-estar do lugar onde estou,
        mesmo que estranho, está entrelaçado com o meu próprio.
        Ensina-me a orar e trabalhar pelo bem da comunidade onde
        vivo, mesmo quando ela não compartilha minha fé. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução de orar pelo bem de Babilônia — a mesma
        cidade responsável pelo exílio — era radical: bem-estar mútuo
        substitui hostilidade natural em relação ao opressor.`),
      questions: [
        'Você ora ativamente pelo bem da sua comunidade, mesmo quando ela não compartilha seus valores ou fé?',
        'Como o princípio de que "na sua paz vós tereis paz" muda a forma como você se relaciona com contextos que não escolheu?',
        'O que significaria trabalhar concretamente pelo bem-estar do lugar onde você está, mesmo temporariamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vinde, e Vede as Obras de Deus',
      text: t(`Senhor, o salmista convida: "vinde, e vede as obras de
        Deus; ele é tremendo nos seus feitos." Louvor nasce de
        observação atenta do que já fizeste, não apenas de sentimento
        genérico. Abre meus olhos para reconhecer, concretamente,
        tuas obras na minha própria vida esta semana. Amém.`),
    },
    meditation: {
      prompt: t(`O convite "vinde e vede" pressupõe evidência
        observável — o salmo não pede fé cega, mas atenção deliberada
        a ações concretas e verificáveis de Deus na história.`),
      questions: [
        'Que "obra de Deus" concreta você pode observar, olhando com atenção para sua própria vida recente?',
        'Como cultivar o hábito de "ver" ativamente, não apenas assumir genericamente, a presença de Deus?',
        'O que ajudaria você a testemunhar essas obras a outros, como o salmo convida a fazer?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Palavra de Deus Não Está Presa',
      text: t(`Senhor, Paulo, na prisão, declara: "sofro a ponto de
        ser preso como malfeitor; mas a palavra de Deus não está
        presa." Circunstâncias externas não conseguem conter o que tu
        queres fazer. Fortalece minha confiança de que, mesmo em
        limitações reais, tua obra continua avançando. Amém.`),
    },
    meditation: {
      prompt: t(`O contraste é deliberado — Paulo está literalmente
        acorrentado, mas insiste que a mensagem que ele carrega
        transcende completamente sua própria limitação física.`),
      questions: [
        'Existe alguma limitação ou "prisão" pessoal que você teme que impeça a obra de Deus na sua vida?',
        'Como a confiança de Paulo — mesmo na prisão — desafia a ideia de que circunstâncias adversas param o propósito de Deus?',
        'O que significaria continuar servindo, mesmo dentro de limitações reais, confiando que "a palavra não está presa"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tem Compaixão de Nós',
      text: t(`Senhor Jesus, dez leprosos clamaram de longe: "Jesus,
        Mestre, tem compaixão de nós!" — mantidos à distância pela
        doença, mas ainda assim ousando pedir. Que meu próprio
        isolamento, seja qual for a causa, nunca me impeça de clamar
        por tua compaixão. Amém.`),
    },
    meditation: {
      prompt: t(`Os leprosos gritam "de longe", respeitando as regras
        de isolamento social impostas pela doença — mesmo à distância,
        a fé encontrou forma de se expressar.`),
      questions: [
        'Existe alguma forma de "isolamento" — vergonha, distância, doença — que faz você hesitar em clamar diretamente a Deus?',
        'O que os dez leprosos ensinam sobre pedir ajuda mesmo de dentro de circunstâncias limitantes?',
        'Que clamor você precisa fazer hoje, mesmo "de longe", confiando que Deus ouve?',
      ],
    },
  },
  {
    prayer: {
      title: 'E os Nove, Onde Estão?',
      text: t(`Senhor, dos dez curados, apenas um voltou para
        agradecer — e este era samaritano, estrangeiro. Perguntaste:
        "e os nove, onde estão?" A gratidão genuína, expressa, é
        rara — mesmo entre quem recebeu bênção evidente. Examina minha
        própria disposição de voltar e agradecer, não apenas receber
        e seguir em frente. Amém.`),
    },
    meditation: {
      prompt: t(`A ironia é aguda: o único que voltou era o
        "estrangeiro" — alguém de fora do grupo religioso esperado —
        enquanto os nove que presumivelmente conheciam melhor a lei
        judaica simplesmente seguiram em frente.`),
      questions: [
        'Você tende a receber bênçãos e seguir em frente rapidamente, ou volta deliberadamente para agradecer?',
        'Por que às vezes quem tem "menos" conhecimento religioso demonstra gratidão mais genuína do que quem tem mais?',
        'Que bênção recente você recebeu, mas ainda não voltou conscientemente para agradecer?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Tua Fé Te Salvou',
      text: t(`Senhor, encerramos a semana com tua palavra ao
        samaritano que voltou: "levanta-te, e vai; a tua fé te
        salvou." Ele já havia sido fisicamente curado como os outros
        nove — mas algo além da cura física aconteceu nele através da
        gratidão. Que minha própria gratidão me leve a essa
        salvação mais profunda que a simples resolução de um
        problema. Amém.`),
    },
    meditation: {
      prompt: t(`Todos os dez foram "limpos" fisicamente, mas apenas
        o que voltou foi declarado "salvo" — sugerindo uma dimensão
        de restauração mais profunda, ligada especificamente ao ato
        de retornar em gratidão.`),
      questions: [
        'Esta semana — do exílio produtivo à gratidão do samaritano — o que te ensinou sobre a diferença entre receber uma bênção e ser verdadeiramente transformado por ela?',
        'Você já experimentou uma "cura" superficial de um problema sem a transformação mais profunda que a gratidão genuína traz?',
        'O que significaria, esta semana, não apenas receber, mas voltar deliberadamente em gratidão?',
      ],
    },
  },
];

// Próprio 24 — Jeremias 31:27-34 · Salmo 119:97-104 · 2 Timóteo 3:14-4:5 · Lucas 18:1-8
const proper24: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Porei a Minha Lei no Seu Interior',
      text: t(`Senhor, prometes um pacto novo: "porei a minha lei no
        seu interior, e a escreverei no seu coração." Não é mais lei
        externa a ser lembrada e cumprida por obrigação, mas
        realidade interna, transformadora. Escreve tua lei também em
        mim, não apenas nas minhas ações visíveis, mas no meu
        coração. Amém.`),
    },
    meditation: {
      prompt: t(`A mudança de "tábuas de pedra" para "coração"
        representa uma transformação radical na natureza do
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
      text: t(`Senhor, o pacto novo culmina nessa promessa
        extraordinária: "perdoarei a sua iniquidade, e não me
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
      title: 'Mais Doces do Que o Mel',
      text: t(`Senhor, o salmista declara: "oh! quão doces são as tuas
        palavras ao meu paladar! mais doces do que o mel à minha
        boca." Não é obrigação amarga, mas deleite genuíno na tua
        Palavra. Cultiva em mim esse mesmo prazer autêntico na
        Escritura, não apenas leitura cumprida por dever. Amém.`),
    },
    meditation: {
      prompt: t(`A metáfora sensorial — gosto, doçura — descreve uma
        relação com a Palavra que vai além do intelectual, tocando
        prazer genuíno e desejo, não apenas obrigação cumprida.`),
      questions: [
        'Sua leitura da Palavra de Deus é mais deleite genuíno ou obrigação cumprida por dever?',
        'O que ajudaria você a redescobrir esse "sabor" que o salmista descreve?',
        'Que passagem específica da Escritura já foi, para você, verdadeiramente "mais doce que o mel"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Toda a Escritura É Inspirada por Deus',
      text: t(`Senhor, Paulo lembra Timóteo que "toda a Escritura é
        inspirada por Deus e proveitosa para ensinar, para redarguir,
        para corrigir, para instruir em justiça." Não é apenas
        informação histórica, mas ferramenta ativa de formação.
        Ajuda-me a receber a correção que a Escritura oferece, não
        apenas o conforto. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo lista quatro funções específicas da Escritura
        — ensinar, redarguir, corrigir, instruir — incluindo
        deliberadamente as funções mais desconfortáveis, não apenas as
        edificantes.`),
      questions: [
        'Você usa a Escritura mais para conforto e ensino, ou também está aberto a ser "redarguido e corrigido" por ela?',
        'Que passagem específica já te corrigiu de forma desconfortável, mas necessária?',
        'O que significaria estar mais aberto a receber correção genuína através da Palavra, não apenas confirmação do que já pensa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nunca Desfalecer',
      text: t(`Senhor Jesus, contaste a parábola da viúva persistente
        especificamente "sobre o dever de orar sempre, e nunca
        desfalecer." A oração persistente não é sinal de dúvida, mas
        de fé que se recusa a desistir. Fortalece minha própria
        persistência nas orações que ainda esperam resposta. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus explica o propósito da parábola antes mesmo de
        contá-la — deixando claro que ela trata especificamente de
        persistência, não de técnica de negociação com Deus.`),
      questions: [
        'Existe alguma oração que você parou de fazer porque a resposta demorou demais?',
        'Como a persistência da viúva — incomodando repetidamente um juiz injusto — desafia sua própria disposição de continuar pedindo?',
        'O que significaria "nunca desfalecer" numa área específica de oração hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quanto Mais Fará Deus Justiça',
      text: t(`Senhor, se até um juiz injusto acaba fazendo justiça
        por causa da insistência, "quanto mais fará Deus justiça aos
        seus escolhidos, que dia e noite clamam a ele." O argumento é
        do menor para o maior: se até injustiça cede à persistência,
        tua justiça genuína certamente responderá. Confio nisso hoje.
        Amém.`),
    },
    meditation: {
      prompt: t(`A parábola usa deliberadamente um exemplo negativo —
        um juiz sem caráter — para, por contraste, fortalecer a
        confiança na justiça e no caráter positivo de Deus.`),
      questions: [
        'Você já duvidou da disposição de Deus de agir, comparando-o inconscientemente a alguém relutante como o juiz da parábola?',
        'Como esse argumento do "menor para o maior" muda sua confiança na resposta de Deus às suas próprias súplicas?',
        'O que significa que Deus é "longânimo", mas ainda assim comprometido com justiça rápida quando o tempo certo chega?',
      ],
    },
  },
  {
    prayer: {
      title: 'Porventura Achará Fé na Terra?',
      text: t(`Senhor, encerramos a semana com tua pergunta
        inquietante: "quando vier o Filho do homem, porventura achará
        fé na terra?" Não é pergunta retórica vazia, mas convite a
        examinar se minha própria fé persistirá até o fim. Sustenta
        minha perseverança, especialmente quando a resposta demora e
        a tentação de desistir aumenta. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta final conecta diretamente com o tema da
        persistência da parábola — a verdadeira questão não é se Deus
        responderá, mas se a fé humana perseverará esperando por
        essa resposta.`),
      questions: [
        'Esta semana — do pacto escrito no coração à viúva persistente — o que te ensinou sobre perseverar na fé mesmo quando a resposta demora?',
        'Se Jesus perguntasse hoje se encontraria fé em você, o que ele encontraria?',
        'Que oração específica você quer continuar sustentando esta semana, sem desfalecer?',
      ],
    },
  },
];

// Próprio 25 — Joel 2:23-32 · Salmo 65 · 2 Timóteo 4:6-8, 16-18 · Lucas 18:9-14
const proper25: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Vos Restituirei os Anos',
      text: t(`Senhor, através de Joel prometes: "vos restituirei os
        anos que foram consumidos pela locusta." Não apenas cessação
        do dano futuro, mas restauração real do que já se perdeu.
        Confio que podes restaurar não só meu presente, mas até
        redimir anos que sinto terem sido desperdiçados ou
        devorados. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa vai além de simples alívio presente — ela
        propõe uma restauração retroativa, compensando anos inteiros
        de perda, algo que a lógica humana normal consideraria
        impossível.`),
      questions: [
        'Que "anos consumidos" você sente que foram desperdiçados na sua própria vida?',
        'Como a promessa de restauração retroativa — não apenas alívio futuro — muda sua esperança sobre o passado perdido?',
        'O que significaria confiar que Deus pode redimir, de alguma forma, até o que parece definitivamente perdido?',
      ],
    },
  },
  {
    prayer: {
      title: 'Derramarei o Meu Espírito Sobre Toda a Carne',
      text: t(`Senhor, prometes derramar teu Espírito "sobre toda a
        carne" — filhos, filhas, anciãos, jovens, servos, servas —
        sem restrição de idade, gênero ou status social. Que eu
        reconheça e celebre a obra do teu Espírito em qualquer pessoa,
        independente de categorias que costumamos usar para
        limitar quem "conta". Amém.`),
    },
    meditation: {
      prompt: t(`A lista deliberadamente inclusiva — filhos e filhas,
        anciãos e jovens, servos e servas — antecipa uma democratização
        radical do Espírito que rompe hierarquias sociais tradicionais
        da época.`),
      questions: [
        'Você reconhece a obra do Espírito com a mesma disposição em pessoas de status ou idade diferentes de você?',
        'Que categoria de pessoa você talvez subestime como canal de revelação ou profecia genuína de Deus?',
        'Como essa promessa desafia hierarquias que ainda existem, mesmo sutilmente, dentro de comunidades de fé?',
      ],
    },
  },
  {
    prayer: {
      title: 'Prevalecem as Iniquidades Contra Mim',
      text: t(`Senhor, o salmista confessa honestamente: "prevalecem
        as iniquidades contra mim; mas as nossas transgressões, tu as
        perdoarás." A honestidade sobre a própria fraqueza precede o
        louvor genuíno. Que eu confesse, sem disfarce, onde tenho
        falhado, confiando na tua disposição de perdoar. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo passa de confissão honesta ("prevalecem as
        iniquidades") diretamente para confiança no perdão, sem
        justificativa ou minimização — um modelo de oração
        genuinamente vulnerável.`),
      questions: [
        'Você tende a confessar suas falhas de forma honesta e específica, ou prefere generalidades vagas?',
        'O que significa que o louvor genuíno, neste salmo, começa com confissão sincera, não a ignora?',
        'Que confissão específica você precisa trazer honestamente diante de Deus hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Combati o Bom Combate',
      text: t(`Senhor, Paulo, próximo ao fim da vida, declara com
        confiança serena: "combati o bom combate, acabei a carreira,
        guardei a fé." Não perfeição, mas fidelidade perseverante até
        o fim. Que eu possa, ao final da minha própria jornada,
        declarar essa mesma fidelidade, mesmo em meio às lutas. Amém.`),
    },
    meditation: {
      prompt: t(`A declaração de Paulo não celebra sucesso mundano,
        mas perseverança fiel — "combati", "acabei", "guardei" — verbos
        de esforço sustentado, não de conquista triunfal.`),
      questions: [
        'Como você imagina poder declarar, ao final da sua própria vida, algo semelhante ao que Paulo declara aqui?',
        'O que significa "guardar a fé" ao longo do tempo, em vez de apenas tê-la em um momento específico?',
        'Que "combate" você está enfrentando atualmente que exige perseverança contínua, não vitória imediata?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Sou Como os Demais Homens',
      text: t(`Senhor Jesus, o fariseu da tua parábola orava: "graças
        te dou que não sou como os demais homens... nem ainda como
        este publicano." Sua religiosidade se tornou instrumento de
        comparação e desprezo, não de humildade genuína. Examina se
        minha própria fé alimenta orgulho comparativo em vez de
        gratidão real. Amém.`),
    },
    meditation: {
      prompt: t(`A oração do fariseu é tecnicamente dirigida a Deus,
        mas seu conteúdo real é autoelogio comparativo — ele nomeia
        conquistas religiosas genuínas, mas as usa para se elevar
        acima de outra pessoa presente.`),
      questions: [
        'Você já usou, mesmo sutilmente, sua própria prática religiosa para se sentir superior a outra pessoa?',
        'Como distinguir gratidão genuína por bênçãos recebidas de comparação orgulhosa disfarçada de gratidão?',
        'Que "publicano" — pessoa que você julga como espiritualmente inferior — você poderia examinar seu próprio coração em relação a?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sê Propício a Mim, o Pecador',
      text: t(`Senhor, o publicano, "nem ainda queria levantar os
        olhos ao céu", orou simplesmente: "sê propício a mim, o
        pecador!" Nenhuma lista de méritos, nenhuma comparação — só
        reconhecimento honesto de necessidade. Que essa seja
        também minha oração mais fundamental, sem disfarces. Amém.`),
    },
    meditation: {
      prompt: t(`A brevidade e simplicidade da oração do publicano —
        sete palavras no original grego — contrasta deliberadamente
        com a lista elaborada de méritos do fariseu, e é essa
        simplicidade que Jesus declara "justificada".`),
      questions: [
        'Sua oração tende a listar méritos e conquistas, ou consegue chegar a essa simplicidade honesta de "sê propício a mim, o pecador"?',
        'O que impede você de orar com essa vulnerabilidade direta, sem tentar se justificar antes?',
        'Como a brevidade dessa oração desafia a ideia de que oração "boa" precisa ser elaborada?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Que a Si Mesmo Se Humilha Será Exaltado',
      text: t(`Senhor, encerramos a semana com tua conclusão: "todo o
        que a si mesmo se exaltar será humilhado; mas o que a si
        mesmo se humilha será exaltado." Um princípio que inverte a
        lógica humana comum de autopromoção. Ajuda-me a viver essa
        humildade genuína, confiando que tu és quem realmente
        exalta, no teu tempo. Amém.`),
    },
    meditation: {
      prompt: t(`O princípio final resume não apenas esta parábola,
        mas um padrão recorrente no ensino de Jesus — a economia do
        reino de Deus opera de forma invertida em relação à lógica de
        status humano.`),
      questions: [
        'Esta semana — da restauração de Joel à humildade do publicano — o que te ensinou sobre a diferença entre orgulho religioso e fé genuína?',
        'Onde você tem, mesmo sutilmente, se exaltado em vez de se humilhar diante de Deus?',
        'O que significaria, concretamente esta semana, praticar a humildade que Jesus elogia nessa parábola?',
      ],
    },
  },
];

// Próprio 26 — Habacuque 1:1-4; 2:1-4 · Salmo 119:137-144 · 2 Tessalonicenses 1:1-4, 11-12 · Lucas 19:1-10
const proper26: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Até Quando, Senhor, Clamarei Eu?',
      text: t(`Senhor, Habacuque clama: "até quando, Senhor, clamarei
        eu, e tu não escutarás?" Diante da violência e injustiça ao
        redor, ele traz sua frustração diretamente a ti, sem
        disfarce. Recebe também minha própria impaciência diante do
        que parece injustiça não resolvida ao meu redor. Amém.`),
    },
    meditation: {
      prompt: t(`Habacuque é incomum entre os profetas — ele não
        anuncia a palavra de Deus ao povo, mas questiona diretamente a
        Deus, num diálogo aberto de queixa e resposta.`),
      questions: [
        'Você se permite trazer frustrações genuínas sobre injustiça a Deus diretamente, como Habacuque faz?',
        'Que "violência e opressão" você observa hoje que te leva a perguntar "até quando"?',
        'Como esse modelo de diálogo honesto com Deus muda sua própria forma de orar diante da injustiça?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Justo Viverá pela Sua Fé',
      text: t(`Senhor, a resposta que recebeste foi: "eis que a alma
        do soberbo se não aprumará em si mesma; mas o justo viverá
        pela sua fé." Diante de perguntas sem resposta completa, o
        chamado é para confiança perseverante, não certeza total.
        Sustenta-me nessa fé quando as respostas ainda não chegam
        completas. Amém.`),
    },
    meditation: {
      prompt: t(`Esta é uma das declarações mais citadas de todo o
        Antigo Testamento no Novo Testamento — a resposta de Deus a
        Habacuque não resolve completamente a pergunta original, mas
        redireciona para confiança sustentada.`),
      questions: [
        'Existe uma pergunta sem resposta completa na sua vida onde você é chamado a "viver pela fé" em vez de esperar certeza total?',
        'Como distinguir fé perseverante de resignação passiva diante de perguntas difíceis?',
        'O que significaria confiar hoje, mesmo sem todas as respostas que gostaria de ter?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Tua Palavra É Fiel a Toda Prova',
      text: t(`Senhor, o salmista declara, mesmo em "tribulação e
        angústia": "a tua palavra é fiel a toda prova, por isso o teu
        servo a ama." A dificuldade presente não diminui a confiança
        na tua Palavra — antes a intensifica. Que minha própria
        tribulação, quando vier, aprofunde meu amor pela tua
        Palavra, não o enfraqueça. Amém.`),
    },
    meditation: {
      prompt: t(`O salmista declara amor pela Palavra especificamente
        no contexto de "tribulação e angústia" — a fidelidade dessa
        palavra é testada e confirmada, não apenas afirmada em tempos
        fáceis.`),
      questions: [
        'Sua confiança na Palavra de Deus tende a diminuir ou se aprofundar diante de dificuldades reais?',
        'Que passagem específica da Escritura já se provou "fiel a toda prova" num momento difícil da sua vida?',
        'O que ajudaria você a se agarrar mais firmemente à Palavra durante a próxima dificuldade?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Vossa Fé Cresce Muitíssimo',
      text: t(`Senhor, Paulo elogia os tessalonicenses: "a vossa fé
        cresce muitíssimo e o amor de cada um de vós transborda de
        uns para com os outros" — especialmente notável porque isso
        acontecia "em todas as perseguições e aflições que suportais."
        Que minha própria fé cresça, não apesar das dificuldades, mas
        através delas. Amém.`),
    },
    meditation: {
      prompt: t(`O crescimento da fé e do amor descrito não acontece
        num ambiente confortável, mas especificamente "em todas as
        perseguições" — a dificuldade se tornou contexto de
        crescimento, não obstáculo a ele.`),
      questions: [
        'Você já experimentou crescimento espiritual genuíno especificamente através, não apesar, de uma dificuldade?',
        'Como sua fé e amor por outros têm "crescido" ou "transbordado" recentemente?',
        'O que ajudaria você a permitir que uma dificuldade atual se torne contexto de crescimento, não apenas sofrimento a suportar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Zaqueu, Desce Depressa',
      text: t(`Senhor Jesus, ao ver Zaqueu subido numa árvore,
        chamaste por nome: "Zaqueu, desce depressa; porque importa
        que eu fique hoje em tua casa." Tu o viste antes de ele
        conseguir se aproximar por conta própria, e tomaste a
        iniciativa. Obrigado por também me chamares pelo nome, antes
        que eu tivesse condição de chegar até ti. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não apenas nota Zaqueu — ele convida-se para a
        casa dele, um gesto de honra extraordinário para um chefe de
        publicanos, figura socialmente desprezada por colaborar com a
        ocupação romana.`),
      questions: [
        'Você já sentiu Jesus tomando a iniciativa de te alcançar antes que você tivesse condições de chegar até ele?',
        'Como o gesto de Jesus de convidar-se para a casa de Zaqueu desafia expectativas sociais sobre quem "merece" atenção?',
        'Que "árvore" você tem subido — esforço próprio de se aproximar — quando Jesus já está pronto para te chamar diretamente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Dou aos Pobres Metade dos Meus Bens',
      text: t(`Senhor, a resposta de Zaqueu ao encontro contigo foi
        imediata e concreta: "dou aos pobres metade dos meus bens; e
        se em alguma coisa tenho defraudado alguém, eu lho restituo
        quadruplicado." A transformação genuína se traduz em ação
        prática e generosa. Examina se meus próprios encontros
        contigo produzem esse tipo de mudança visível. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta de Zaqueu vai além do exigido pela lei
        judaica de restituição — sua generosidade excede o mínimo,
        revelando transformação genuína, não obrigação legal
        cumprida.`),
      questions: [
        'Sua própria experiência de graça já produziu mudança concreta e visível na forma como você lida com recursos ou relacionamentos?',
        'O que significaria ir além do "mínimo exigido" numa restituição ou reparação que você reconhece dever a alguém?',
        'Que ação prática e generosa seria coerente com a transformação que você já experimentou em Cristo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Buscar e Salvar o Que Se Havia Perdido',
      text: t(`Senhor, encerramos a semana com tua declaração final:
        "o Filho do homem veio buscar e salvar o que se havia
        perdido." Zaqueu, apesar de rico e poderoso, também estava
        perdido — a busca de Jesus não se limita a categorias óbvias
        de necessidade. Obrigado por me buscares também, mesmo quando
        minha própria condição de "perdido" não era visível a
        outros. Amém.`),
    },
    meditation: {
      prompt: t(`A frase final resume o propósito central da missão
        de Jesus — não uma busca ocasional, mas o objetivo declarado
        de toda sua atividade, aplicável tanto a Zaqueu, o rico, quanto
        ao publicano humilde da semana passada.`),
      questions: [
        'Esta semana — do clamor de Habacuque à busca de Zaqueu — o que te ensinou sobre a persistência da busca de Deus por quem está perdido?',
        'Você já esteve "perdido" de formas que não eram visíveis externamente para os outros?',
        'Que resposta prática, como a de Zaqueu, você quer dar diante de como Jesus já te buscou?',
      ],
    },
  },
];

// Próprio 27 — Ageu 1:15b-2:9 · Salmo 145:1-5, 17-21 · 2 Tessalonicenses 2:1-5, 13-17 · Lucas 20:27-38
const proper27: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Considerai os Vossos Caminhos',
      text: t(`Senhor, através de Ageu confrontas o povo: "considerai
        os vossos caminhos. Tendes semeado muito, e recolhido pouco...
        o que recebe salário, recebe-o para o meter num saco furado."
        Eles priorizavam suas próprias casas enquanto a tua ficava em
        ruínas. Examina minhas próprias prioridades — onde tenho
        investido energia enquanto negligencio o que realmente
        importa para ti. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem do "saco furado" descreve esforço
        constante sem resultado duradouro — uma consequência direta
        de prioridades desalinhadas, não azar aleatório.`),
      questions: [
        'Onde você percebe esforço constante que não parece render fruto duradouro em sua vida?',
        'Como suas prioridades atuais — tempo, energia, recursos — refletem o que você diz valorizar mais?',
        'O que significaria, concretamente, "considerar seus caminhos" com a mesma honestidade que Ageu pede?',
      ],
    },
  },
  {
    prayer: {
      title: 'Dela Me Deleitarei, e Serei Glorificado',
      text: t(`Senhor, depois da repreensão, vem o convite:
        "edificai a casa; e dela me deleitarei, e serei glorificado."
        Não é apenas dever árido, mas algo que genuinamente te agrada.
        Ajuda-me a reconstruir o que negligenciei com essa mesma
        motivação — não obrigação, mas desejo de te agradar
        genuinamente. Amém.`),
    },
    meditation: {
      prompt: t(`Deus expressa desejo pessoal e prazer — "deleitarei"
        — não apenas exigência funcional, sugerindo que a
        reconstrução importava a ele emocionalmente, não apenas
        administrativamente.`),
      questions: [
        'Você tende a ver a obediência a Deus mais como dever árido ou como algo que genuinamente lhe traz prazer?',
        'O que significaria reconstruir alguma prioridade negligenciada motivado por desejo de agradar a Deus, não apenas cumprir obrigação?',
        'Que "casa em ruínas" na sua vida espiritual você poderia começar a reconstruir esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cada Dia Te Bendirei',
      text: t(`Senhor, o salmista se compromete: "cada dia te
        bendirei, e louvarei o teu nome pelos séculos dos séculos."
        Louvor como disciplina diária, não sentimento ocasional.
        Ajuda-me a cultivar esse compromisso de bênção diária,
        independente de como me sinto em cada momento específico.
        Amém.`),
    },
    meditation: {
      prompt: t(`O compromisso é explicitamente contínuo — "cada
        dia" — não uma promessa emocional única, mas disciplina
        deliberada de louvor renovado a cada amanhecer.`),
      questions: [
        'Seu louvor a Deus é mais disciplina diária deliberada ou reação apenas a momentos emocionalmente intensos?',
        'O que ajudaria você a cultivar um hábito genuíno de bênção "cada dia", independente do humor?',
        'Que forma prática de louvor diário você poderia começar a praticar esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Que Não Vos Movais Facilmente',
      text: t(`Senhor, Paulo alerta contra ser facilmente perturbado
        por rumores sobre o fim dos tempos: "que não vos movais
        facilmente do vosso modo de pensar, nem vos perturbeis."
        Ajuda-me a manter estabilidade de fé diante de especulações e
        ansiedades que constantemente tentam me desestabilizar. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não nega a realidade de eventos futuros
        significativos — ele adverte contra a instabilidade emocional
        gerada por informação não confirmada, mesmo que pareça
        urgente.`),
      questions: [
        'Que tipo de "rumor" ou notícia alarmante tende a desestabilizar sua fé mais facilmente?',
        'O que significa manter estabilidade sem cair em complacência ou negação da realidade?',
        'Como cultivar o tipo de firmeza que Paulo descreve diante de informações incertas e ansiedade coletiva?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus de Vivos, Não de Mortos',
      text: t(`Senhor Jesus, respondendo aos saduceus sobre a
        ressurreição, declaraste: "ele não é Deus de mortos, mas de
        vivos; porque para ele todos vivem." Uma afirmação profunda
        sobre a natureza eterna da vida em ti, além de qualquer
        categoria limitada que tentamos impor. Fortalece minha
        esperança na ressurreição diante de qualquer dúvida. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus argumenta pela ressurreição de forma
        surpreendente — não com prova direta, mas com uma implicação
        lógica sobre a natureza de Deus como Deus de "vivos", não de
        "mortos".`),
      questions: [
        'Como essa declaração de Jesus — "Deus de vivos" — muda sua compreensão sobre pessoas que já morreram na fé?',
        'Que dúvida você carrega sobre a ressurreição, e como essa passagem responde a ela?',
        'O que significaria viver com essa mesma certeza sobre a continuidade da vida além da morte?',
      ],
    },
  },
  {
    prayer: {
      title: 'Já Não Podem Mais Morrer',
      text: t(`Senhor, disseste dos "que são julgados dignos de
        alcançar o mundo vindouro": "já não podem mais morrer; pois
        são iguais aos anjos, e são filhos de Deus." A promessa vai
        além da simples continuação — é transformação completa da
        própria natureza da existência. Ajuda-me a viver esta vida
        temporal com os olhos fixos nessa realidade eterna que
        transcende as categorias presentes. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus descreve a vida ressurreta como categoricamente
        diferente da presente, não apenas uma extensão dela — uma
        transformação que desafia todas as categorias e expectativas
        terrenas dos saduceus.`),
      questions: [
        'Como a promessa de uma existência categoricamente transformada muda sua perspectiva sobre limitações presentes?',
        'O que significaria viver hoje com os olhos mais fixos nessa realidade eterna, sem negligenciar responsabilidades presentes?',
        'Que ansiedade sobre morte ou finitude essa promessa poderia aliviar em você?',
      ],
    },
  },
  {
    prayer: {
      title: 'Confirme em Toda Boa Obra e Palavra',
      text: t(`Senhor, encerramos a semana com a oração de Paulo:
        que Deus "console os vossos corações e os confirme em toda
        boa obra e palavra." Consolo e ação prática andam juntos —
        não é apenas conforto interno, mas capacitação para viver
        bem. Que essa dupla bênção esteja também sobre mim esta
        semana. Amém.`),
    },
    meditation: {
      prompt: t(`A oração combina deliberadamente consolo emocional
        e confirmação prática — Paulo não separa a experiência
        interna de conforto da capacidade externa de agir bem.`),
      questions: [
        'Esta semana — das prioridades desalinhadas de Ageu à esperança da ressurreição — o que te ensinou sobre viver com estabilidade e propósito?',
        'Você precisa mais de consolo interior ou de confirmação prática para agir esta semana?',
        'Que "boa obra e palavra" você quer que Deus confirme e fortaleça em você agora?',
      ],
    },
  },
];

// Próprio 28 — Isaías 65:17-25 · Isaías 12 · 2 Tessalonicenses 3:6-13 · Lucas 21:5-19
const proper28: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Eis Que Eu Crio Novos Céus e Nova Terra',
      text: t(`Senhor, prometes: "eis que eu crio novos céus e nova
        terra; e não haverá lembrança das coisas passadas." Não é
        reparo parcial, mas recriação completa. Diante de tanto que
        parece irreparável no mundo e na minha própria vida, agarro-me
        a essa promessa de renovação total que só tu podes cumprir.
        Amém.`),
    },
    meditation: {
      prompt: t(`A promessa não fala de melhoria gradual do que já
        existe, mas de recriação — uma esperança que vai além de
        conserto para renovação completa da própria realidade.`),
      questions: [
        'O que na sua vida ou no mundo você considera "irreparável demais" para simples melhoria gradual?',
        'Como a promessa de "novos céus e nova terra" muda sua esperança sobre situações que parecem sem solução?',
        'O que significaria viver hoje já antecipando, mesmo que parcialmente, essa renovação completa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Se Ouvirá Mais Nela Voz de Choro',
      text: t(`Senhor, na nova criação que prometes, "nunca mais se
        ouvirá nela voz de choro nem voz de clamor." Um mundo sem a
        dor crônica que tantas vezes experimentamos aqui. Que essa
        visão futura me console hoje, mesmo em meio ao choro presente
        que ainda não terminou. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa da ausência de choro não nega a realidade
        da dor presente — ela a reconhece implicitamente, ao prometer
        especificamente sua ausência futura completa.`),
      questions: [
        'Que "voz de choro" você carrega hoje que precisa dessa esperança de consolo futuro completo?',
        'Como manter esperança genuína numa promessa futura sem negar ou minimizar a dor real presente?',
        'O que ajudaria você a viver com essa esperança ativa, não apenas resignação passiva à dor atual?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sereis Motivo de Exultação',
      text: t(`Senhor, canto contigo a promessa de Isaías: "com júbilo
        tirareis água das fontes da salvação." A salvação não é
        apenas alívio, mas fonte de alegria genuína e acessível. Que
        eu beba dessa água hoje, com a mesma expectativa jubilosa.
        Amém.`),
    },
    meditation: {
      prompt: t(`A imagem de "tirar água com júbilo" combina
        necessidade básica — água — com alegria genuína, sugerindo
        que a salvação atende tanto necessidade profunda quanto
        produz celebração real.`),
      questions: [
        'Sua experiência de salvação é mais alívio de necessidade básica ou celebração jubilosa genuína?',
        'O que ajudaria você a "tirar água com júbilo" — experimentar alegria genuína, não apenas alívio, na sua fé?',
        'Que fonte de salvação você precisa acessar hoje, com essa mesma expectativa de alegria?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Deis a Ninguém de Graça o Pão',
      text: t(`Senhor, Paulo instrui sobre disciplina comunitária
        diante de quem se recusava a trabalhar: princípios de
        responsabilidade mútua dentro da comunidade de fé. Ajuda-me a
        contribuir ativamente para minha comunidade, não apenas
        receber dela passivamente. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução de Paulo equilibra cuidado comunitário
        genuíno com expectativa de responsabilidade mútua — apoio não
        significa ausência completa de expectativa de contribuição.`),
      questions: [
        'Como você equilibra receber apoio da sua comunidade de fé com contribuir ativamente para ela?',
        'Onde você percebe, em si mesmo ou em sua comunidade, desequilíbrio entre receber e contribuir?',
        'O que significaria, concretamente, uma contribuição mais ativa sua para sua comunidade esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Ficará Pedra Sobre Pedra',
      text: t(`Senhor Jesus, diante da admiração dos discípulos pela
        beleza do templo, anunciaste: "dias virão em que não ficará
        pedra sobre pedra, que não seja derribada." Nem mesmo o que
        parece mais permanente e impressionante é imune à mudança.
        Ajuda-me a não depositar minha segurança última em nenhuma
        estrutura, por mais sólida que pareça. Amém.`),
    },
    meditation: {
      prompt: t(`O templo era o símbolo máximo de estabilidade
        religiosa e nacional para os discípulos — Jesus desafia
        diretamente essa segurança, apontando para uma realidade além
        de estruturas físicas, por mais grandiosas que sejam.`),
      questions: [
        'Que estrutura na sua vida — instituição, relacionamento, conquista — você trata como permanente demais para questionar?',
        'Como essa passagem desafia a segurança que depositamos em coisas visíveis e impressionantes?',
        'Onde você precisa depositar sua segurança última, se não em estruturas que podem ser abaladas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nem Um Cabelo da Vossa Cabeça Perecerá',
      text: t(`Senhor, mesmo diante de perseguições anunciadas —
        prisão, traição por parentes, ódio de todos — prometeste:
        "nem um cabelo da vossa cabeça perecerá." Segurança última
        que transcende sofrimento temporal real. Sustenta-me com essa
        mesma confiança diante de dificuldades que ainda vou
        enfrentar. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa não nega o sofrimento real que Jesus
        acabou de descrever — ela oferece uma segurança que opera
        numa dimensão diferente, mais profunda que a preservação
        física imediata.`),
      questions: [
        'Como você entende essa promessa — "nem um cabelo perecerá" — à luz de sofrimentos reais que cristãos de fato enfrentam?',
        'O que significa segurança última que não depende de ausência completa de sofrimento temporal?',
        'Que dificuldade você está enfrentando que precisa dessa confiança mais profunda?',
      ],
    },
  },
  {
    prayer: {
      title: 'Pela Vossa Perseverança Ganhareis as Vossas Almas',
      text: t(`Senhor, encerramos a semana com tua promessa final:
        "pela vossa perseverança ganhareis as vossas almas." Não é
        conquista de uma vez, mas resultado de perseverança sustentada
        ao longo do tempo, mesmo em meio a dificuldades reais. Fortalece
        minha própria perseverança para o que ainda está por vir.
        Amém.`),
    },
    meditation: {
      prompt: t(`A promessa conecta diretamente perseverança com
        salvação da alma — não como mérito que compra salvação, mas
        como caráter que reflete e sustenta uma fé genuinamente
        arraigada.`),
      questions: [
        'Esta semana — da recriação completa prometida por Isaías à perseverança exigida por Jesus — o que te ensinou sobre viver entre promessa futura e dificuldade presente?',
        'Que área da sua vida exige perseverança sustentada, não apenas esforço pontual?',
        'O que ajudaria você a perseverar com mais consistência diante das dificuldades que ainda encontrará?',
      ],
    },
  },
];

// Próprio 29 (Cristo Rei) — Jeremias 23:1-6 · Salmo 46 · Colossenses 1:11-20 · Lucas 23:33-43
const proper29: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Ai dos Pastores Que Destroem',
      text: t(`Senhor, condenas os "pastores que destroem e dispersam
        as ovelhas" — líderes que deveriam cuidar, mas exploraram ou
        negligenciaram quem estava sob seus cuidados. Ao encerrar o
        ano litúrgico celebrando Cristo Rei, examina minha própria
        forma de exercer qualquer autoridade — sobre filhos,
        funcionários, comunidade — para que eu nunca seja desses
        pastores. Amém.`),
    },
    meditation: {
      prompt: t(`A acusação específica é dupla — "dispersastes" e
        "não visitastes" — negligência ativa e passiva, tanto dano
        causado quanto cuidado omitido, ambos igualmente condenados.`),
      questions: [
        'Que forma de autoridade você exerce — sobre pessoas, recursos, decisões — e como você tem cuidado dela?',
        'Você já foi negligente por omissão, não apenas por ação direta, no cuidado de algo confiado a você?',
        'O que significaria examinar honestamente sua própria liderança à luz dessa condenação severa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Levantarei a Davi um Renovo Justo',
      text: t(`Senhor, diante de pastores falhos, prometes: "levantarei
        a Davi um Renovo justo... e este é o nome de que será
        chamado: O SENHOR JUSTIÇA NOSSA." A liderança humana falha,
        mas tua promessa de um rei justo, cumprida em Cristo,
        permanece. Que eu confie nesse Rei justo mais do que em
        qualquer liderança humana imperfeita. Amém.`),
    },
    meditation: {
      prompt: t(`O nome messiânico prometido — "O Senhor Justiça
        Nossa" — inverte deliberadamente o nome do próprio rei
        Zedequias ("o Senhor é justiça"), sugerindo que a justiça
        genuína viria de outro lugar, não do trono corrompido atual.`),
      questions: [
        'Onde você já colocou confiança excessiva em liderança humana que acabou decepcionando?',
        'Como a promessa de um "Renovo justo" cumprida em Cristo muda sua expectativa sobre liderança perfeita?',
        'O que significa, na prática, submeter-se a Cristo como Rei acima de qualquer outra autoridade humana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus É o Nosso Refúgio e Fortaleza',
      text: t(`Senhor, o salmista declara: "Deus é o nosso refúgio e
        fortaleza, socorro bem presente na angústia. Pelo que não
        temeremos, ainda que a terra se mude." Diante de qualquer
        instabilidade — pessoal, social, cósmica — tu permaneces
        constante. Ancora minha própria segurança nessa constância,
        não nas circunstâncias que mudam. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo lista cenários de caos extremo — terra se
        movendo, montes caindo no mar — precisamente para enfatizar
        que a segurança em Deus não depende de nenhuma estabilidade
        externa.`),
      questions: [
        'Que instabilidade atual — pessoal ou ao seu redor — está testando sua confiança em Deus como "refúgio e fortaleza"?',
        'Como viver "sem temer, ainda que a terra se mude" na prática, sem negar a realidade real do caos ao redor?',
        'O que significaria buscar Deus como "socorro bem presente" hoje, não apenas como conceito distante?',
      ],
    },
  },
  {
    prayer: {
      title: 'Antes de Todas as Coisas',
      text: t(`Senhor Jesus, ao encerrar o ano litúrgico celebrando
        tua realeza, Paulo declara: "ele é antes de todas as coisas,
        e nele subsistem todas as coisas." Não é realeza limitada a
        um território ou período — é supremacia cósmica completa.
        Que eu reconheça essa autoridade total sobre cada área da
        minha vida, não apenas partes selecionadas. Amém.`),
    },
    meditation: {
      prompt: t(`O hino cristológico celebra Cristo como Rei numa
        escala que transcende qualquer categoria política humana —
        "tronos, dominações, principados, potestades" — tudo
        subordinado a ele.`),
      questions: [
        'Existe alguma área da sua vida onde você ainda não reconhece plenamente a autoridade real de Cristo?',
        'Como essa visão cósmica de Cristo como Rei muda sua perspectiva sobre poderes e autoridades terrenas que parecem ameaçadoras?',
        'O que significa, concretamente, viver sob essa realeza total, não apenas em partes selecionadas da sua vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Pai, Perdoa-lhes',
      text: t(`Senhor Jesus, no momento mais violento e injusto de
        toda a história — tua própria crucificação —, tuas primeiras
        palavras foram: "Pai, perdoa-lhes; porque não sabem o que
        fazem." Esse é o tipo de rei que és: um que perdoa até seus
        próprios executores, no auge da própria dor. Ensina-me esse
        tipo de perdão diante das minhas próprias feridas. Amém.`),
    },
    meditation: {
      prompt: t(`O perdão de Jesus não vem depois da dor resolvida —
        vem no meio dela, pronunciado enquanto ele ainda sofria
        fisicamente na cruz, revelando o caráter do seu reinado desde
        o início.`),
      questions: [
        'Você já conseguiu perdoar alguém no meio da própria dor, sem esperar que ela terminasse primeiro?',
        'Como essa cena — um rei perdoando seus algozes do próprio trono de sofrimento — redefine sua ideia de poder real?',
        'Que perdão você ainda precisa oferecer, seguindo esse exemplo radical?',
      ],
    },
  },
  {
    prayer: {
      title: 'Este É o Rei dos Judeus',
      text: t(`Senhor, a inscrição sobre a cruz — "ESTE É O REI DOS
        JUDEUS" — pretendia ser zombaria, mas era, sem que soubessem,
        a verdade mais profunda já escrita. Tua realeza não se
        pareceu com nenhum trono humano esperado — ela se revelou
        precisamente na cruz. Ajuda-me a reconhecer teu reinado
        mesmo quando ele não se parece com poder convencional. Amém.`),
    },
    meditation: {
      prompt: t(`A ironia é central ao evangelho de Lucas — a
        zombaria da inscrição contém, involuntariamente, a declaração
        teológica mais precisa de todo o relato da crucificação.`),
      questions: [
        'Onde você espera que o poder de Deus se manifeste de forma convencional, quando ele talvez esteja se revelando de forma completamente diferente?',
        'Como a cruz, lugar de aparente derrota total, se torna precisamente o lugar da coroação real de Cristo?',
        'O que essa inversão radical ensina sobre onde procurar sinais genuínos do reinado de Deus na sua própria vida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Hoje Estarás Comigo no Paraíso',
      text: t(`Senhor, encerramos o ano litúrgico com tua promessa ao
        malfeitor arrependido ao teu lado: "em verdade te digo que
        hoje estarás comigo no paraíso." Nenhum mérito acumulado,
        nenhuma vida de boas obras — apenas reconhecimento honesto e
        confiança de último minuto, recebidos plenamente. Que essa
        graça extravagante seja minha esperança final também, hoje e
        sempre. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa é imediata — "hoje" — e completa —
        "paraíso" — concedida a alguém que não teve tempo de
        "melhorar" ou provar mérito algum, apenas de reconhecer
        honestamente quem estava ao seu lado.`),
      questions: [
        'Todo o ano litúrgico — de Advento a Cristo Rei — o que você quer levar consigo sobre a natureza da graça de Deus, revelada de forma tão completa nessa última cena?',
        'Você confia que a graça de Deus é tão imediata e completa quanto essa promessa sugere, mesmo para você?',
        'Como você quer entrar no Advento que se aproxima, carregando essa certeza da generosidade radical de Cristo Rei?',
      ],
    },
  },
];

const ordinaryC: Record<number, DevotionalEntry[]> = {
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

export default ordinaryC;
