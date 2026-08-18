/**
 * Páscoa — Ciclo A — conteúdo ancorado no RCL (leituras reais).
 *
 * Mesmo padrão de scripts/grounded-content/advent-A.ts: cada semana é
 * um array de 7 DevotionalEntry, índice = date.getDay() (0 = domingo
 * … 6 = sábado). A Páscoa tem sempre exatamente 7 semanas fixas (1-7,
 * Domingo da Ressurreição ao 7º Domingo da Páscoa) — o Domingo de
 * Páscoa é sempre domingo, então, como no Advento, não há necessidade
 * de tratamento especial de data — `getWeekOfSeason` já produz 1-7 de
 * forma estável. Pentecostes e a Trindade em si são tratados à parte,
 * na estação 'pentecost' — ver scripts/grounded-content/pentecost.ts.
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

// Páscoa 1 — Domingo da Ressurreição — Atos 10:34-43 · Salmo 118:1-2, 14-24 · Colossenses 3:1-4 · João 20:1-18
const week1: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Este É o Dia Que o Senhor Fez',
      text: t(`Senhor ressuscitado, hoje o salmista canta o que ainda
        não sabia que estava profetizando: "este é o dia que o Senhor
        fez; regozijemo-nos, e alegremo-nos nele." A pedra que os
        edificadores rejeitaram tornou-se pedra angular. Que eu
        celebre hoje, com alegria genuína e não repetida por hábito,
        a vitória que muda tudo. Aleluia! Amém.`),
    },
    meditation: {
      prompt: t(`O salmo 118, cantado há séculos antes de Cristo,
        ganha sentido pleno hoje: a pedra rejeitada — Jesus,
        crucificado como criminoso — tornou-se exatamente aquilo que
        sustenta o edifício inteiro.`),
      questions: [
        'O que significa, para você, celebrar a Páscoa não como data no calendário, mas como o dia específico que muda todos os outros dias?',
        'Que "pedra rejeitada" na sua própria vida Deus já transformou em fundamento?',
        'Como você quer entrar nesta semana da Ressurreição — com que tipo de alegria concreta?',
      ],
    },
  },
  {
    prayer: {
      title: 'Este É o Senhor de Todos',
      text: t(`Senhor, Pedro declara diante de Cornélio: "na verdade
        reconheço que Deus não faz acepção de pessoas; mas que lhe é
        aceitável aquele que, em qualquer nação, o teme e pratica o
        que é justo." A ressurreição não é notícia reservada a poucos
        — é anúncio para toda nação. Que eu viva essa mesma
        amplitude, sem fronteiras que tu mesmo não traçaste. Amém.`),
    },
    meditation: {
      prompt: t(`Este discurso de Pedro marca um momento decisivo —
        pela primeira vez, o evangelho é anunciado explicitamente a um
        gentio, quebrando fronteiras que os primeiros discípulos ainda
        estavam aprendendo a cruzar.`),
      questions: [
        'Que fronteira — social, cultural, religiosa — você ainda precisa aprender a cruzar, como Pedro aprendeu?',
        'Você trata a boa notícia da ressurreição como algo reservado a "gente como eu", ou genuinamente universal?',
        'Como a amplitude do anúncio de Pedro desafia preconceitos que você talvez nem perceba que carrega?',
      ],
    },
  },
  {
    prayer: {
      title: 'Testemunhas Predeterminadas por Deus',
      text: t(`Senhor, Pedro não afirma ter visto a ressurreição
        sozinho, mas como parte de um grupo: "testemunhas
        predeterminadas por Deus, a nós, que comemos e bebemos
        juntamente com ele depois que ressurgiu." A fé pascal nasce em
        comunidade, não isolamento. Que eu reconheça as testemunhas ao
        meu redor que sustentam a minha própria fé. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro enfatiza deliberadamente que o testemunho da
        ressurreição não veio de uma única pessoa isolada, mas de um
        grupo que compartilhou refeições reais com o Cristo
        ressuscitado — evidência coletiva, não experiência solitária.`),
      questions: [
        'Quem são as "testemunhas" ao seu redor cuja fé sustenta ou confirma a sua própria?',
        'Você tende a vivenciar sua fé de forma mais isolada ou mais comunitária?',
        'O que significaria buscar, esta semana, mais dessa confirmação comunitária da fé?',
      ],
    },
  },
  {
    prayer: {
      title: 'Buscai as Coisas que São de Cima',
      text: t(`Senhor, Paulo instrui: "se, pois, fostes ressuscitados
        juntamente com Cristo, buscai as coisas que são de cima."
        Minha própria ressurreição, em ti, já começou — não é apenas
        promessa futura, é orientação presente para onde busco
        sentido. Reorienta hoje meus olhos para cima. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo trata a ressurreição de Cristo como algo que já
        aconteceu "com" o crente — não apenas evento histórico
        distante, mas realidade que já reorganiza prioridades no
        presente.`),
      questions: [
        'O que significa, concretamente, "buscar as coisas que são de cima" na sua rotina desta semana?',
        'Você vive mais orientado pelas "coisas da terra" ou já reflete essa reorientação pascal?',
        'Como a certeza de já estar "ressuscitado com Cristo" muda a forma como você enfrenta um problema atual?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Vossa Vida Está Escondida com Cristo em Deus',
      text: t(`Senhor, Paulo acrescenta: "a vossa vida está escondida
        com Cristo em Deus." Há segurança nessa imagem — não exposta,
        vulnerável a qualquer ameaça, mas escondida, protegida, no
        lugar mais seguro que existe. Que eu descanse hoje nessa
        segurança, mesmo em meio à incerteza visível. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem de vida "escondida" contrasta com a
        vulnerabilidade visível da existência cotidiana — Paulo oferece
        uma segurança que não depende de circunstâncias observáveis.`),
      questions: [
        'Que ansiedade você carrega hoje que essa imagem de segurança "escondida em Deus" poderia acalmar?',
        'Como viver com essa confiança sem se tornar indiferente aos riscos reais da vida?',
        'O que mudaria se você realmente confiasse que sua vida mais profunda está segura, aconteça o que acontecer na superfície?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ao Dizer Isso, Voltou-se para Trás',
      text: t(`Senhor Jesus, Maria Madalena, chorando junto ao
        sepulcro vazio, não te reconheceu de imediato — pensou que
        fosses o jardineiro. Só quando chamaste seu nome, "Maria!",
        ela se voltou e reconheceu. Que eu escute hoje o meu próprio
        nome sendo chamado por ti, no meio da minha confusão ou luto.
        Amém.`),
    },
    meditation: {
      prompt: t(`O reconhecimento de Maria não vem de argumento
        teológico ou evidência visual — vem do próprio Jesus chamando
        seu nome, algo pessoal e íntimo em meio à dor da perda.`),
      questions: [
        'Já houve um momento em que você sentiu Deus "chamar seu nome" pessoalmente, em meio à dor ou confusão?',
        'Você tende a reconhecer Deus mais por argumento e evidência, ou por esse tipo de encontro pessoal?',
        'O que significaria, hoje, parar de procurar respostas genéricas e escutar seu próprio nome sendo chamado?',
      ],
    },
  },
  {
    prayer: {
      title: 'Vi o Senhor!',
      text: t(`Senhor, encerramos esta primeira semana pascal com o
        anúncio simples e definitivo de Maria Madalena aos discípulos:
        "Vi o Senhor!" Não uma teoria sobre ressurreição, mas
        testemunho pessoal e direto. Que meu próprio testemunho, esta
        semana, tenha essa mesma simplicidade e certeza. Amém.`),
    },
    meditation: {
      prompt: t(`Maria Madalena — não um dos doze, mas a primeira
        testemunha registrada da ressurreição — torna-se a primeira
        pregadora do evangelho com apenas quatro palavras: "Vi o
        Senhor!"`),
      questions: [
        'Esta primeira semana pascal — da pedra angular ao chamado pelo nome — o que você mais quer levar adiante?',
        'Como você anunciaria, hoje, com a mesma simplicidade de Maria, o que já experimentou de Deus?',
        'O que significaria entrar na segunda semana da Páscoa carregando esse mesmo testemunho direto?',
      ],
    },
  },
];

// Páscoa 2 — Atos 2:14a, 22-32 · Salmo 16 · 1 Pedro 1:3-9 · João 20:19-31
const week2: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Era Possível Que Fosse Retido por Ela',
      text: t(`Senhor, Pedro proclama diante da multidão: "a este Deus
        ressuscitou, rompendo os grilhões da morte, pois não era
        possível que fosse retido por ela." A morte não tinha
        autoridade suficiente para segurar aquele que é a própria
        vida. Que eu viva esta semana confiando nesse mesmo poder
        sobre o que hoje me parece definitivo demais. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro descreve a ressurreição não como evento
        surpreendente e arbitrário, mas como consequência lógica e
        necessária de quem Jesus é — a morte simplesmente não tinha
        poder suficiente para retê-lo.`),
      questions: [
        'Que situação na sua vida hoje parece tão definitiva e irreversível quanto a morte parecia antes da Páscoa?',
        'Como a certeza de que "a morte não pôde retê-lo" muda sua confiança diante do que parece definitivo?',
        'O que significaria viver esta semana lembrando que os grilhões mais fortes já foram rompidos uma vez?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Minha Carne Há de Repousar em Esperança',
      text: t(`Senhor, Pedro cita Davi: "além disso a minha carne há
        de repousar em esperança." Não é esperança apenas do espírito,
        mas do corpo também — a ressurreição envolve toda a minha
        existência, não uma parte dela. Que meu corpo cansado também
        repouse hoje nessa esperança concreta. Amém.`),
    },
    meditation: {
      prompt: t(`A citação do Salmo 16 por Pedro insiste que a
        esperança cristã não é apenas espiritual ou abstrata — inclui
        a "carne", o corpo físico, apontando para uma ressurreição
        completa, não meramente simbólica.`),
      questions: [
        'Você tende a separar "esperança espiritual" de esperança para seu corpo, sua saúde, sua vida concreta?',
        'O que significaria descansar hoje, literalmente, confiando nessa esperança que inclui até a carne?',
        'Como essa promessa muda a forma como você encara o cansaço físico ou os limites do próprio corpo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Na Tua Presença Há Plenitude de Alegria',
      text: t(`Senhor, o salmista declara: "tu me farás conhecer a
        vereda da vida; na tua presença há plenitude de alegria; à tua
        mão direita há delícias perpetuamente." Não busco alegria em
        substitutos passageiros quando a alegria plena já está
        disponível na tua própria presença. Leva-me a ela hoje. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo localiza a "plenitude de alegria"
        especificamente "na presença" de Deus — não em circunstâncias
        favoráveis, conquistas ou posses, mas em proximidade relacional
        direta.`),
      questions: [
        'Onde você tem buscado alegria — na presença de Deus, ou em substitutos que só entregam parte do que promete?',
        'O que significaria buscar hoje, deliberadamente, essa "plenitude de alegria" na presença de Deus, não em outra coisa?',
        'Como distinguir prazer passageiro de alegria genuína e duradoura?',
      ],
    },
  },
  {
    prayer: {
      title: 'Uma Herança Incorruptível',
      text: t(`Senhor, Pedro escreve que fomos regenerados "para uma
        herança incorruptível, incontaminável e imarcescível,
        reservada nos céus." Diante de tanta coisa nesta vida que se
        corrompe, se contamina, murcha, essa herança permanece
        intocada. Fixa meu coração nela hoje. Amém.`),
    },
    meditation: {
      prompt: t(`As três palavras de Pedro — incorruptível,
        incontaminável, imarcescível — descrevem, por negação, tudo
        aquilo que as heranças e conquistas terrenas normalmente são:
        sujeitas a corrupção, contaminação e desgaste.`),
      questions: [
        'Que "herança" terrena você tem valorizado que está, na verdade, sujeita a corrupção ou desgaste?',
        'Como viver hoje já orientado por uma herança que nada pode corromper?',
        'O que significaria investir mais tempo e energia no que é "reservado nos céus" do que no que se desgasta aqui?',
      ],
    },
  },
  {
    prayer: {
      title: 'Sem o Terdes Visto, Amais',
      text: t(`Senhor, Pedro descreve algo notável sobre a fé daqueles
        que não viram Jesus fisicamente: "a quem, sem o terdes visto,
        amais." Essa é minha própria condição — creio sem ter visto,
        amo sem ter tocado. Que essa fé não seja menor por ser assim,
        mas genuína e plena do mesmo jeito. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro nomeia diretamente a situação de quase todos os
        cristãos ao longo da história — amar e crer sem ter visto
        fisicamente — como algo digno, não como fé de segunda
        categoria.`),
      questions: [
        'Você já sentiu que sua fé, por não ter "visto", é de alguma forma menor do que a dos primeiros discípulos?',
        'O que sustenta seu amor por alguém que você nunca viu fisicamente?',
        'Como essa palavra de Pedro dignifica precisamente a sua própria experiência de fé, hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se Eu Não Vir o Sinal dos Cravos',
      text: t(`Senhor, Tomé exigiu evidência concreta: "se eu não vir
        o sinal dos cravos nas mãos, e não meter a mão no seu lado, de
        maneira nenhuma crerei." Tu não repreendeste essa exigência —
        vieste até ele, oferecendo exatamente o que pedira. Que eu
        traga minhas próprias dúvidas honestas a ti, sem medo. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não ignora nem pune o pedido de Tomé por
        evidência concreta — ele volta especificamente para atendê-lo,
        mostrando que dúvida honesta, trazida abertamente, recebe
        resposta, não rejeição.`),
      questions: [
        'Que dúvida você tem escondido, com medo de que seja "fé insuficiente" demais para trazer a Deus?',
        'Como a resposta gentil de Jesus a Tomé muda sua disposição de trazer suas próprias exigências de evidência?',
        'O que significaria imitar a honestidade de Tomé, em vez de fingir uma certeza que você não sente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bem-Aventurados os Que Não Viram e Creram',
      text: t(`Senhor, encerramos esta semana com tua palavra a Tomé:
        "bem-aventurados os que não viram e creram." Essa bênção é
        para mim, hoje, tanto quanto foi para os primeiros que
        ouviram. Que eu viva à altura dela, não com fé cega, mas com
        fé confiante. Amém.`),
    },
    meditation: {
      prompt: t(`Esta bênção final do evangelho de João é dirigida
        diretamente a todo leitor futuro — inclusive você, hoje —
        que creria sem o privilégio de ter visto Jesus fisicamente
        ressuscitado.`),
      questions: [
        'Esta semana — dos grilhões rompidos à bênção de Tomé — o que você mais quer levar adiante na sua fé?',
        'Como essa bênção específica, endereçada a quem "não viu", muda como você vê sua própria fé hoje?',
        'O que significaria entrar na terceira semana da Páscoa vivendo concretamente essa bem-aventurança?',
      ],
    },
  },
];

// Páscoa 3 — Atos 2:14a, 36-41 · Salmo 116:1-4, 12-19 · 1 Pedro 1:17-23 · Lucas 24:13-35
const week3: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Que Faremos, Irmãos?',
      text: t(`Senhor, ao ouvir Pedro pregar, a multidão "se compungiu
        em seu coração" e perguntou: "que faremos, irmãos?" Não
        ficaram apenas emocionados — quiseram saber o próximo passo
        concreto. Que minha própria resposta à tua palavra, hoje, não
        pare na emoção, mas chegue à ação. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta da multidão — "que faremos?" — marca a
        diferença entre ser tocado emocionalmente por uma mensagem e
        genuinamente buscar mudança prática em resposta a ela.`),
      questions: [
        'Você tende a parar na emoção diante da Palavra, ou costuma perguntar concretamente "que farei"?',
        'Que resposta prática — não apenas sentimento — a leitura de hoje pede de você?',
        'O que te impede, normalmente, de dar esse passo seguinte concreto?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Promessa Vos Pertence',
      text: t(`Senhor, Pedro declara: "a promessa vos pertence a vós,
        a vossos filhos, e a todos os que estão longe: a quantos o
        Senhor nosso Deus chamar." A promessa não tem prazo de
        validade nem fronteira geográfica. Que eu viva hoje como
        alguém que genuinamente herda essa promessa, não como
        espectador distante. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro amplia deliberadamente o alcance da promessa —
        não apenas para quem estava fisicamente presente naquele dia,
        mas para gerações futuras e povos distantes, incluindo quem
        lê este texto hoje.`),
      questions: [
        'Você vive a fé como herdeiro direto dessa promessa, ou como observador de uma história distante?',
        'Que "distância" — geográfica, temporal, cultural — você às vezes sente em relação às promessas de Deus?',
        'O que significaria reivindicar hoje, concretamente, que essa promessa também é sua?',
      ],
    },
  },
  {
    prayer: {
      title: 'Que Darei Eu ao Senhor?',
      text: t(`Senhor, o salmista pergunta: "que darei eu ao Senhor
        por todos os benefícios que me tem feito?" — e responde com
        gratidão prática, não apenas palavras: tomar o cálice da
        salvação, pagar votos, oferecer sacrifícios de ação de graças.
        Que minha própria gratidão hoje se traduza em ação concreta.
        Amém.`),
    },
    meditation: {
      prompt: t(`O salmista não responde à própria pergunta com uma
        emoção vaga de gratidão, mas com atos específicos de culto e
        compromisso — a gratidão genuína busca expressão concreta.`),
      questions: [
        'Como você costuma expressar gratidão a Deus — apenas em palavras, ou também em ação concreta?',
        'Que "cálice da salvação" — um compromisso específico — você poderia tomar hoje como resposta de gratidão?',
        'O que significaria pagar hoje um voto ou promessa que você fez a Deus e ainda não cumpriu?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Foi com Coisas Corruptíveis',
      text: t(`Senhor, Pedro contrasta: "não foi com coisas
        corruptíveis, como prata ou ouro, que fostes resgatados... mas
        com precioso sangue... de Cristo." O preço do meu resgate não
        foi commodity que se desgasta, mas algo de valor infinitamente
        maior. Que eu viva à altura desse preço pago por mim. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro escolhe deliberadamente comparar o preço do
        resgate — prata, ouro, coisas valiosas mas corruptíveis — com
        o sangue de Cristo, algo de categoria completamente diferente
        de valor.`),
      questions: [
        'Você já refletiu concretamente sobre o "preço" pago pelo seu próprio resgate?',
        'Como essa reflexão muda o valor que você atribui à própria vida e às próprias decisões?',
        'O que significaria viver hoje como alguém resgatado por algo de valor infinito, não por moeda comum?',
      ],
    },
  },
  {
    prayer: {
      title: 'Os Olhos Deles Estavam Como que Fechados',
      text: t(`Senhor Jesus, os dois discípulos no caminho de Emaús
        caminharam contigo, conversaram contigo, e ainda assim "os
        olhos deles estavam como que fechados, de sorte que não o
        reconheceram." Quantas vezes caminho contigo sem reconhecer
        tua presença? Abre meus olhos hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A narrativa de Emaús sugere que a presença de Cristo
        pode estar genuinamente ao nosso lado sem que a reconheçamos
        de imediato — o reconhecimento é dado, não conquistado por
        esforço próprio.`),
      questions: [
        'Em que área da sua vida você suspeita que Jesus já está presente, mas seus "olhos ainda estão fechados"?',
        'O que impede, geralmente, esse reconhecimento — pressa, tristeza, expectativas erradas sobre como ele apareceria?',
        'Como você pode se abrir hoje para reconhecer uma presença que talvez já esteja ali?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Se Nos Abrasava o Coração?',
      text: t(`Senhor, depois de reconhecerem-te no partir do pão, os
        discípulos de Emaús se perguntaram: "porventura não se nos
        abrasava o coração, quando pelo caminho nos falava?" Havia
        sinal ali, mesmo antes do reconhecimento pleno. Ajuda-me a
        notar esse "coração abrasado" mesmo quando ainda não entendo
        tudo. Amém.`),
    },
    meditation: {
      prompt: t(`Os discípulos percebem, em retrospecto, que já havia
        evidência de presença divina — o coração ardendo — antes
        mesmo do reconhecimento consciente completo acontecer.`),
      questions: [
        'Você já sentiu o "coração se abrasar" numa conversa ou leitura, sem entender completamente o motivo na hora?',
        'Como prestar mais atenção a esses sinais, em vez de exigir reconhecimento pleno e imediato?',
        'Que momento recente você poderia reexaminar, perguntando: "não se abrasava meu coração ali?"',
      ],
    },
  },
  {
    prayer: {
      title: 'Como Se Fizera Conhecer no Partir do Pão',
      text: t(`Senhor, encerramos esta semana com o reconhecimento
        pleno dos discípulos de Emaús: souberam que era você "no
        partir do pão." Um gesto simples, repetido, revelou tudo.
        Que eu também te reconheça hoje nos gestos simples e
        repetidos da minha própria vida de fé. Amém.`),
    },
    meditation: {
      prompt: t(`O reconhecimento de Jesus acontece não em um momento
        de grande espetáculo, mas no gesto comum e repetido de partir
        o pão — a presença divina se revela no ordinário, não apenas
        no extraordinário.`),
      questions: [
        'Esta semana — da pergunta "que faremos?" ao partir do pão em Emaús — o que te ensinou sobre reconhecer a Deus?',
        'Que gesto simples e repetido na sua própria rotina poderia se tornar lugar de encontro com Cristo?',
        'Como você quer entrar na quarta semana da Páscoa, à luz dessa reflexão?',
      ],
    },
  },
];

// Páscoa 4 — Atos 2:42-47 · Salmo 23 · 1 Pedro 2:19-25 · João 10:1-10
const week4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Perseveravam na Doutrina dos Apóstolos',
      text: t(`Senhor, a igreja primitiva "perseverava na doutrina dos
        apóstolos e na comunhão, no partir do pão e nas orações."
        Quatro práticas simples, mantidas com constância. Que minha fé
        também tenha essa perseverança em fundamentos simples, não
        apenas entusiasmo passageiro. Amém.`),
    },
    meditation: {
      prompt: t(`A descrição de Atos não menciona programas
        elaborados, mas quatro práticas básicas mantidas com
        constância — ensino, comunhão, refeição compartilhada e
        oração — como fundamento de uma comunidade transformadora.`),
      questions: [
        'Dessas quatro práticas — ensino, comunhão, partir do pão, oração — qual você mais negligencia atualmente?',
        'Você tende a buscar experiências novas e intensas, ou perseverança simples em práticas fundamentais?',
        'O que significaria "perseverar" — não apenas praticar uma vez — em uma dessas quatro áreas esta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tinham Tudo em Comum',
      text: t(`Senhor, os primeiros cristãos "tinham tudo em comum" e
        vendiam bens para repartir "segundo a necessidade de cada
        um." Uma generosidade radical, nascida da comunhão real, não
        de obrigação externa. Examina minha própria disposição de
        compartilhar o que tenho. Amém.`),
    },
    meditation: {
      prompt: t(`A generosidade descrita em Atos 2 não é imposta por
        lei, mas nasce espontaneamente da experiência de comunhão
        genuína — as pessoas compartilhavam porque se importavam
        umas com as outras, não por regra externa.`),
      questions: [
        'Sua generosidade nasce mais de obrigação, culpa, ou de comunhão genuína com quem recebe?',
        'Existe alguém ao seu redor com necessidade concreta que você poderia suprir esta semana?',
        'O que impede, hoje, esse mesmo tipo de generosidade radical na sua própria comunidade de fé?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ainda Que Eu Ande pelo Vale da Sombra da Morte',
      text: t(`Senhor, meu pastor, mesmo "pelo vale da sombra da
        morte" não temerei mal algum, "porque tu estás comigo." A
        promessa não é ausência de vale, mas presença dentro dele.
        Caminha comigo hoje pelo vale que eu estiver atravessando.
        Amém.`),
    },
    meditation: {
      prompt: t(`O Salmo 23 não promete a ausência de vales sombrios —
        promete companhia dentro deles, o que é uma forma de conforto
        mais realista e mais profunda do que a simples remoção de
        dificuldades.`),
      questions: [
        'Que "vale da sombra da morte" você está atravessando hoje — literal ou figurado?',
        'Você busca principalmente que Deus remova o vale, ou que ele caminhe com você dentro dele?',
        'O que significaria sentir essa presença concreta, "vara e cajado", no meio da dificuldade atual?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deixando-vos Exemplo, Para Que Sigais as Suas Pisadas',
      text: t(`Senhor Jesus, Pedro escreve que sofreste "deixando-vos
        exemplo, para que sigais as suas pisadas... sendo injuriado,
        não injuriava." O padrão que deixaste não é apenas doutrina,
        mas comportamento concreto diante da injustiça. Forma-me
        segundo esse mesmo padrão hoje. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro não apresenta o sofrimento de Cristo apenas
        como doutrina de expiação, mas explicitamente como exemplo
        comportamental — como responder à injustiça sem retaliação.`),
      questions: [
        'Diante de uma injustiça recente, sua resposta se pareceu mais com retaliação ou com o exemplo de Cristo?',
        'O que tornaria mais possível, para você, "não injuriar" quando injuriado?',
        'Que situação atual pede de você esse tipo específico de resposta paciente e não retaliatória?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu Sou a Porta das Ovelhas',
      text: t(`Senhor Jesus, declaras: "eu sou a porta das ovelhas...
        se alguém entrar, será salvo; e entrará, e sairá, e achará
        pastagens." Uma única entrada segura, em meio a tantos que se
        apresentam como caminho alternativo. Que eu reconheça e entre
        por essa porta específica hoje. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem da "porta" é específica e exclusiva — Jesus
        não se apresenta como uma opção entre várias igualmente
        válidas, mas como o único acesso genuíno e seguro ao
        rebanho.`),
      questions: [
        'Que outras "portas" você já tentou, buscando a segurança e o sustento que só esta porta oferece?',
        'O que significa, concretamente, "entrar e sair e achar pastagens" na sua vida espiritual hoje?',
        'Como essa exclusividade da porta única desafia a tentação de buscar segurança em múltiplas fontes ao mesmo tempo?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Ladrão Não Vem Senão para Roubar',
      text: t(`Senhor Jesus, alertas: "o ladrão não vem senão para
        roubar, matar e destruir." Há forças reais que se disfarçam de
        oferta boa mas roubam o que mais importa. Dá-me discernimento
        hoje para reconhecer a diferença entre tua voz e a do ladrão.
        Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não nega a existência de ameaças reais ao
        rebanho — ele nomeia explicitamente o ladrão, mas contrasta
        sua intenção destrutiva com o propósito de vida abundante que
        ele mesmo traz.`),
      questions: [
        'Que "ladrão" disfarçado de oferta boa tem tentado roubar, matar ou destruir algo valioso em você?',
        'Como discernir, na prática, entre a voz do pastor e a voz do ladrão?',
        'O que significaria estar mais alerta esta semana a essa diferença?',
      ],
    },
  },
  {
    prayer: {
      title: 'Para Que Tenham Vida, e a Tenham em Abundância',
      text: t(`Senhor, encerramos esta semana com tua promessa central:
        "eu vim para que tenham vida, e a tenham em abundância." Não
        apenas existência mínima, mas vida plena e transbordante. Que
        eu viva hoje essa abundância que tu vieste especificamente
        oferecer. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa final desta passagem não é sobrevivência
        básica, mas abundância — Jesus define seu propósito
        explicitamente em termos de plenitude, não de mera
        preservação.`),
      questions: [
        'Esta semana — da comunhão da igreja primitiva à porta das ovelhas — o que te ensinou sobre vida abundante?',
        'Você vive hoje mais em modo de sobrevivência ou de abundância genuína?',
        'O que significaria entrar na quinta semana da Páscoa buscando concretamente essa vida "em abundância"?',
      ],
    },
  },
];

// Páscoa 5 — Atos 7:55-60 · Salmo 31:1-5, 15-16 · 1 Pedro 2:2-10 · João 14:1-14
const week5: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Vejo os Céus Abertos',
      text: t(`Senhor, Estêvão, diante da morte iminente, "cheio do
        Espírito Santo, fitando os olhos no céu, viu a glória de Deus"
        e declarou: "vejo os céus abertos." No momento mais difícil,
        recebeu a visão mais clara. Que eu confie nessa mesma presença
        nos meus próprios momentos difíceis. Amém.`),
    },
    meditation: {
      prompt: t(`A visão de Estêvão acontece precisamente no momento
        de maior perigo — não antes, como preparação confortável, mas
        durante a própria provação, sustentando-o exatamente quando
        mais precisava.`),
      questions: [
        'Você já experimentou clareza ou paz inesperada precisamente num momento difícil, não antes dele?',
        'O que sustenta você quando enfrenta oposição ou dificuldade por causa da sua fé?',
        'Como a experiência de Estêvão muda sua expectativa sobre onde e quando Deus se manifesta com mais clareza?',
      ],
    },
  },
  {
    prayer: {
      title: 'Senhor, Não Lhes Imputes Este Pecado',
      text: t(`Senhor, mesmo sendo apedrejado, Estêvão orou: "Senhor,
        não lhes imputes este pecado." Um eco direto da tua própria
        oração na cruz. O perdão genuíno se estende até ao momento da
        própria morte. Forma em mim essa mesma capacidade de perdoar
        no auge da dor. Amém.`),
    },
    meditation: {
      prompt: t(`A oração final de Estêvão ecoa deliberadamente as
        palavras de Jesus na cruz — o primeiro mártir cristão morre
        seguindo exatamente o padrão de perdão que aprendeu do
        próprio Cristo.`),
      questions: [
        'Existe alguém que você ainda não conseguiu perdoar completamente, mesmo sabendo que deveria?',
        'O que tornou possível, para Estêvão, perdoar precisamente no momento de maior sofrimento?',
        'Como buscar essa mesma capacidade de perdão, não apenas em teoria, mas na prática concreta desta semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nas Tuas Mãos Entrego o Meu Espírito',
      text: t(`Senhor, o salmista declara: "nas tuas mãos entrego o
        meu espírito; tu me remiste, ó Senhor, Deus da verdade." Essas
        mesmas palavras, tu as pronunciaste na cruz. Que eu aprenda a
        entregar hoje, não apenas no fim da vida, mas em cada
        dificuldade presente, o que mais me preocupa. Amém.`),
    },
    meditation: {
      prompt: t(`Esta frase do Salmo 31, citada por Jesus na cruz e
        depois por Estêvão, tornou-se padrão de confiança radical —
        entregar deliberadamente o mais precioso (o próprio espírito)
        nas mãos de Deus.`),
      questions: [
        'O que você está segurando com força demais, com medo de "entregar nas mãos" de Deus?',
        'Como praticar essa entrega diariamente, não apenas guardá-la para momentos extremos?',
        'O que significaria, hoje, repetir essa mesma oração diante da sua preocupação atual?',
      ],
    },
  },
  {
    prayer: {
      title: 'Pedra Viva, Rejeitada pelos Homens',
      text: t(`Senhor Jesus, Pedro te descreve como "pedra viva,
        rejeitada, na verdade, pelos homens, mas, para com Deus,
        eleita e preciosa." O julgamento humano e o divino sobre ti
        foram opostos. Ajuda-me a confiar no teu julgamento sobre mim,
        mesmo quando o julgamento humano diverge. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro contrasta deliberadamente duas avaliações
        opostas de Cristo — rejeição humana e eleição divina —
        sugerindo que a aprovação de Deus não depende, nem é
        invalidada, pela rejeição humana.`),
      questions: [
        'Você já foi "rejeitado" por algo que, na verdade, era precioso aos olhos de Deus?',
        'Como distinguir entre rejeição justa (correção necessária) e rejeição injusta (como a que Cristo sofreu)?',
        'O que significaria confiar mais no julgamento de Deus sobre você do que na opinião humana que você mais teme?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Se Turbe o Vosso Coração',
      text: t(`Senhor Jesus, instruíste: "não se turbe o vosso
        coração; credes em Deus, crede também em mim." Diante da
        notícia da tua partida iminente, os discípulos precisavam
        dessa palavra de calma. Acalma hoje meu próprio coração
        diante do que me perturba. Amém.`),
    },
    meditation: {
      prompt: t(`Esta instrução vem no contexto exato de uma notícia
        perturbadora — a partida iminente de Jesus — mostrando que a
        paz oferecida não ignora a dificuldade real, mas responde
        diretamente a ela.`),
      questions: [
        'O que está turbando seu coração hoje, especificamente?',
        'Como a instrução de Jesus — crer nele tanto quanto se crê em Deus — endereça essa turbação específica?',
        'O que significaria, concretamente, "não se turbar" sem negar a dificuldade real que você enfrenta?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu Sou o Caminho, e a Verdade, e a Vida',
      text: t(`Senhor Jesus, respondeste à pergunta de Tomé com uma
        declaração absoluta: "eu sou o caminho, e a verdade, e a
        vida; ninguém vem ao Pai, senão por mim." Não um caminho entre
        muitos, mas o caminho em si. Que eu descanse hoje nessa
        clareza, sem buscar outros caminhos paralelos. Amém.`),
    },
    meditation: {
      prompt: t(`A tríplice afirmação — caminho, verdade, vida —
        responde diretamente à confusão de Tomé, oferecendo não um
        conjunto de instruções para o caminho, mas a própria pessoa
        de Jesus como destino e meio ao mesmo tempo.`),
      questions: [
        'Você busca a Deus mais através de regras e instruções, ou através do relacionamento direto que Jesus oferece?',
        'O que significa, para você, que Jesus não apenas mostra o caminho, mas é o caminho?',
        'Como essa clareza responde a alguma confusão espiritual que você carrega hoje, como Tomé carregava a sua?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tudo Quanto Pedirdes em Meu Nome, Eu o Farei',
      text: t(`Senhor, encerramos esta semana com tua promessa: "tudo
        quanto pedirdes em meu nome, eu o farei, para que o Pai seja
        glorificado no Filho." Pedir "em teu nome" não é fórmula
        mágica, mas alinhamento com quem tu és. Ensina-me a orar
        assim, verdadeiramente. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa está condicionada a pedir "em nome de
        Jesus" — não uma fórmula de encerramento repetida sem
        pensar, mas pedidos genuinamente alinhados com o caráter e os
        propósitos dele.`),
      questions: [
        'Esta semana — dos céus abertos de Estêvão ao caminho único de Jesus — o que te ensinou sobre confiança em meio à dificuldade?',
        'O que significa realmente orar "em nome de Jesus", além de repetir a frase ao final da oração?',
        'Como você quer entrar na sexta semana da Páscoa, à luz dessa reflexão sobre oração alinhada?',
      ],
    },
  },
];

// Páscoa 6 — Atos 17:22-31 · Salmo 66:8-20 · 1 Pedro 3:13-22 · João 14:15-21
const week6: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Ao Deus Desconhecido',
      text: t(`Senhor, Paulo, no Areópago, encontrou um altar "ao Deus
        desconhecido" e usou exatamente essa busca incompleta como
        ponte para o evangelho: "esse, pois, que vós honrais sem o
        conhecer, é o que vos anuncio." Ajuda-me a reconhecer, ao meu
        redor, buscas sinceras ainda sem nome — e apontar para ti.
        Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não despreza a religiosidade incompleta dos
        atenienses — ele a usa como ponto de partida genuíno,
        reconhecendo uma busca real por trás de uma prática
        teologicamente confusa.`),
      questions: [
        'Você reconhece, nas buscas espirituais confusas ao seu redor, sinais de fome genuína por Deus?',
        'Como imitar a estratégia de Paulo — partir do que a pessoa já busca, não apenas corrigir de fora?',
        'Que "altar ao Deus desconhecido" você poderia apontar, esta semana, para alguém específico?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nele Vivemos, e Nos Movemos, e Existimos',
      text: t(`Senhor, Paulo declara aos atenienses: "nele vivemos, e
        nos movemos, e existimos." Não é distância entre mim e ti,
        mas proximidade constante e sustentadora — a própria condição
        da minha existência. Que eu viva hoje consciente dessa
        presença que não me deixa nunca. Amém.`),
    },
    meditation: {
      prompt: t(`Esta é uma das afirmações mais próximas e imanentes
        de toda a pregação paulina — Deus não é apresentado como
        distante e observador, mas como o próprio meio em que a
        existência acontece.`),
      questions: [
        'Você vive mais consciente de um Deus distante que observa, ou de um Deus em quem literalmente "vive e se move"?',
        'O que mudaria hoje se você levasse a sério essa proximidade constante em cada atividade comum?',
        'Como essa verdade muda a forma como você entende momentos em que se sente "longe de Deus"?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tu, Ó Deus, Nos Tens Provado',
      text: t(`Senhor, o salmista reconhece: "tu, ó Deus, nos tens
        provado; tens nos refinado como se refina a prata." Passamos
        pelo fogo e pela água — mas fomos trazidos "a um lugar de
        abundância." Que eu confie que a prova de hoje também
        conduz a esse lugar. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo não nega o sofrimento real do processo de
        refinamento — fogo, água, carga pesada — mas o situa dentro de
        uma narrativa maior que termina em abundância, não em
        destruição.`),
      questions: [
        'Que processo de "refinamento" — difícil, mas não destrutivo — você está atravessando hoje?',
        'Como confiar que o fogo e a água atuais também conduzem a um "lugar de abundância"?',
        'O que você gostaria de poder dizer, olhando para trás, sobre como esse processo te transformou?',
      ],
    },
  },
  {
    prayer: {
      title: 'Estai Sempre Preparados para Responder',
      text: t(`Senhor, Pedro instrui: "estai sempre preparados para
        responder com mansidão e temor a todo aquele que vos pedir a
        razão da esperança que há em vós." Não apenas ter esperança,
        mas conseguir articulá-la, com humildade, quando perguntado.
        Prepara-me para isso hoje. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro combina duas exigências que às vezes parecem
        opostas — estar genuinamente "preparado" (com clareza e
        conteúdo) e responder com "mansidão" (sem arrogância ou
        agressividade).`),
      questions: [
        'Você conseguiria articular claramente, hoje, "a razão da esperança" que há em você?',
        'Suas respostas sobre fé tendem mais para a mansidão ou para a defensividade?',
        'O que significaria se preparar melhor esta semana para essa pergunta, caso alguém a fizesse?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Vos Deixarei Órfãos',
      text: t(`Senhor Jesus, prometeste: "não vos deixarei órfãos;
        voltarei a vós." Diante da tua partida iminente, essa promessa
        de não-abandono era exatamente o que os discípulos precisavam
        ouvir. Que eu confie hoje nessa mesma promessa em qualquer
        sensação de abandono que eu carregue. Amém.`),
    },
    meditation: {
      prompt: t(`A palavra "órfãos" nomeia diretamente o medo mais
        profundo dos discípulos diante da partida de Jesus — e ele a
        responde não com explicação abstrata, mas com promessa
        pessoal e concreta de retorno.`),
      questions: [
        'Você já sentiu algo parecido com esse medo de "ficar órfão" espiritualmente?',
        'Como a promessa concreta de Jesus — "voltarei a vós" — responde a esse medo específico?',
        'O que significaria viver hoje confiando nessa promessa de não-abandono?',
      ],
    },
  },
  {
    prayer: {
      title: 'Porque Eu Vivo, e Vós Vivereis',
      text: t(`Senhor Jesus, declaraste: "ainda um pouco, e o mundo
        não me verá mais; mas vós me vereis, porque eu vivo, e vós
        vivereis." A tua vida ressuscitada garante, de alguma forma
        misteriosa, a minha própria vida também. Que eu viva hoje
        consciente dessa conexão vital. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus liga diretamente a própria vida ressurreta à
        vida futura dos discípulos — não são duas realidades
        separadas, mas uma única vida compartilhada e garantida pela
        ressurreição dele.`),
      questions: [
        'O que significa, concretamente, que sua vida está ligada à vida ressuscitada de Jesus?',
        'Como essa conexão muda sua forma de encarar a própria mortalidade?',
        'O que você gostaria de viver hoje de forma diferente, à luz dessa promessa de vida compartilhada?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu o Amarei, e Me Manifestarei a Ele',
      text: t(`Senhor, encerramos esta semana com tua promessa:
        "aquele que me ama será amado de meu Pai, e eu o amarei, e me
        manifestarei a ele." Amor que gera revelação — quanto mais
        amo, mais te conheço. Que eu busque hoje essa manifestação,
        através do caminho simples do amor. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus conecta diretamente amor e revelação — não
        conhecimento intelectual isolado, mas manifestação pessoal que
        cresce especificamente através da relação de amor obediente.`),
      questions: [
        'Esta semana — do Deus desconhecido de Atenas à promessa de manifestação de Jesus — o que te ensinou sobre buscar a Deus?',
        'Você busca conhecer mais a Jesus principalmente por estudo, ou também por esse caminho de amor obediente?',
        'Como você quer entrar na última semana da Páscoa, à luz de tudo que refletiu?',
      ],
    },
  },
];

// Páscoa 7 — Atos 1:6-14 · Salmo 68:1-10, 32-35 · 1 Pedro 4:12-14; 5:6-11 · João 17:1-11
const week7: DevotionalEntry[] = [
  {
    prayer: {
      title: 'A Vós Não Vos Compete Saber os Tempos',
      text: t(`Senhor, quando os discípulos perguntaram sobre a
        restauração do reino, respondeste: "a vós não vos compete
        saber os tempos ou as épocas, que o Pai reservou à sua própria
        autoridade." Há perguntas legítimas cuja resposta simplesmente
        não me pertence. Ajuda-me a viver em paz com esse limite.
        Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não repreende a curiosidade dos discípulos
        sobre o futuro, mas redireciona sua atenção de cronogramas
        especulativos para a missão concreta que os aguarda —
        testemunhar, não calcular datas.`),
      questions: [
        'Que pergunta sobre o futuro você tem gasto energia demais tentando resolver, quando deveria focar na missão presente?',
        'Como viver em paz com perguntas legítimas que, honestamente, não têm resposta acessível a você agora?',
        'O que significaria redirecionar essa energia para a missão concreta diante de você hoje?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ser-me-eis Testemunhas',
      text: t(`Senhor, prometeste poder aos discípulos com um
        propósito específico: "ser-me-eis testemunhas, tanto em
        Jerusalém, como em toda a Judéia e Samária, e até os confins
        da terra." O poder recebido não é para exibição, mas para
        testemunho concreto. Que eu use hoje o que recebi com esse
        mesmo propósito. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa de poder vem explicitamente atrelada a um
        propósito — testemunho, expandindo-se em círculos
        concêntricos, do mais próximo ao mais distante — não poder
        como fim em si mesmo.`),
      questions: [
        'Você já recebeu algum "poder" — dom, capacidade, oportunidade — sem clareza sobre seu propósito de testemunho?',
        'Qual seria sua "Jerusalém" — o círculo mais próximo — onde você deveria testemunhar primeiro?',
        'O que significaria expandir esse testemunho gradualmente, como o padrão descrito por Jesus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Por Que Ficais Aí Olhando para o Céu?',
      text: t(`Senhor, enquanto os discípulos ainda olhavam para o
        céu depois da ascensão, dois anjos perguntaram: "por que
        ficais aí olhando para o céu?" Havia trabalho concreto
        esperando abaixo. Que eu não me perca em contemplação passiva
        quando há missão ativa para cumprir. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta dos anjos não desvaloriza a contemplação,
        mas redireciona os discípulos de uma fixação passiva no céu
        para a missão ativa que os aguardava na terra.`),
      questions: [
        'Você já usou "espiritualidade" como desculpa para evitar responsabilidade concreta e presente?',
        'Como equilibrar contemplação genuína com ação necessária, sem que uma substitua a outra?',
        'O que está "abaixo", esperando sua atenção, enquanto você talvez esteja "olhando para o céu" demais?',
      ],
    },
  },
  {
    prayer: {
      title: 'Não Estranheis a Ardente Provação',
      text: t(`Senhor, Pedro instrui: "não estranheis a ardente
        provação que vem sobre vós... mas regozijai-vos por serdes
        participantes das aflições de Cristo." Sofrer por causa da fé
        não é anomalia estranha, mas participação real na tua
        experiência. Muda minha perspectiva sobre a dificuldade que
        enfrento. Amém.`),
    },
    meditation: {
      prompt: t(`Pedro reformula radicalmente a experiência de
        sofrimento pela fé — não como algo anômalo e injusto, mas como
        participação genuína e até honrosa na própria experiência de
        Cristo.`),
      questions: [
        'Você já "estranhou" alguma provação, como se fosse injusta ou fora do padrão esperado da vida cristã?',
        'Como reformular essa provação como participação real nas aflições de Cristo muda sua forma de vivê-la?',
        'O que significaria regozijar-se, concretamente, em meio a uma dificuldade atual causada pela fidelidade?',
      ],
    },
  },
  {
    prayer: {
      title: 'Lançando Sobre Ele Toda a Vossa Ansiedade',
      text: t(`Senhor, Pedro instrui: "humilhai-vos... lançando sobre
        ele toda a vossa ansiedade, porque ele tem cuidado de vós."
        Não preciso carregar sozinho o que me preocupa — há um convite
        explícito para entregar. Recebo hoje esse convite com a
        ansiedade que carrego. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução de Pedro combina humildade e entrega
        ativa — "lançar" a ansiedade não é passividade resignada, mas
        ato deliberado de confiar o peso a alguém que genuinamente se
        importa.`),
      questions: [
        'Que ansiedade específica você tem carregado sozinho, sem realmente "lançá-la" sobre Deus?',
        'O que significaria fazer isso hoje, de forma concreta, não apenas como frase repetida?',
        'Como a certeza de que "ele tem cuidado de vós" muda a forma como você carrega essa preocupação?',
      ],
    },
  },
  {
    prayer: {
      title: 'Eu Neles, e Tu em Mim',
      text: t(`Senhor Jesus, oraste por teus discípulos: "eu neles, e
        tu em mim, para que eles sejam um, assim como nós somos um."
        Uma unidade que espelha a própria comunhão trinitária. Que a
        minha comunidade de fé reflita, mesmo que imperfeitamente,
        essa mesma unidade. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não pede apenas cooperação ou tolerância entre
        os discípulos — ele pede unidade modelada na própria unidade
        entre Pai e Filho, um padrão extraordinariamente alto.`),
      questions: [
        'Como sua comunidade de fé reflete — ou não — esse tipo de unidade profunda que Jesus pediu?',
        'Que divisão específica você poderia ajudar a curar, em resposta a essa oração de Jesus?',
        'O que significaria buscar essa unidade sem exigir uniformidade completa de opinião ou personalidade?',
      ],
    },
  },
  {
    prayer: {
      title: 'Guarda-os no Teu Nome',
      text: t(`Senhor, encerramos esta última semana da Páscoa com a
        súplica de Jesus pelo Pai: "guarda-os no teu nome, o qual me
        deste, para que eles sejam um." Amanhã celebramos Pentecostes
        — a chegada do Espírito que sustenta essa mesma unidade e
        missão. Prepara meu coração para receber. Amém.`),
    },
    meditation: {
      prompt: t(`Esta oração final de Jesus, na véspera de sua
        própria prisão, antecipa diretamente a necessidade que só
        seria plenamente suprida com a chegada do Espírito Santo em
        Pentecostes.`),
      questions: [
        'Toda esta estação pascal — da ressurreição vazia à ascensão — o que você mais quer levar para Pentecostes?',
        'Como você se sente preparado, ou não, para receber o Espírito que a igreja celebrará amanhã?',
        'O que significaria entrar em Pentecostes já vivendo a unidade e a missão pelas quais Jesus orou?',
      ],
    },
  },
];

const easterA: Record<number, DevotionalEntry[]> = {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
  5: week5,
  6: week6,
  7: week7,
};

export default easterA;
