/**
 * Quaresma — Ciclo C — conteúdo ancorado no RCL (leituras reais),
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

// Quaresma 1 — Deuteronômio 26:1-11 · Salmo 91:1-2, 9-16 · Romanos 10:8b-13 · Lucas 4:1-13
const week1: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Arameu Prestes a Perecer Era Meu Pai',
      text: t(`Senhor, a instrução para oferecer as primícias começa
        com uma confissão de origem humilde: "arameu prestes a
        perecer era meu pai." A gratidão genuína começa reconhecendo
        de onde realmente viemos, não pretendendo grandeza original.
        Que minha própria oferta comece com essa mesma humildade
        honesta. Amém.`),
    },
    meditation: {
      prompt: t(`A liturgia das primícias exige que cada geração
        recite ativamente a própria história de vulnerabilidade e
        resgate — memória ritualizada que impede esquecimento
        confortável das origens humildes.`),
      questions: [
        'Você mantém memória ativa das suas próprias origens humildes, ou tende a esquecer de onde realmente veio?',
        'Como recitar conscientemente sua própria história de resgate poderia aprofundar sua gratidão hoje?',
        'Que "primícias" — melhor parte do que você recebeu — você poderia oferecer a Deus nesta primeira semana de Quaresma?',
      ],
    },
  },
  {
    prayer: {
      title: 'O Senhor Ouviu a Nossa Voz',
      text: t(`Senhor, a confissão continua: "clamamos ao Senhor
        Deus de nossos pais, e o Senhor ouviu a nossa voz, e atentou
        para a nossa aflição." Um Deus que genuinamente escuta e
        responde ao clamor real do seu povo. Que eu clame com essa
        mesma confiança de ser ouvido. Amém.`),
    },
    meditation: {
      prompt: t(`A confissão liga deliberadamente clamor humano e
        resposta divina — não oração enviada ao vazio, mas diálogo
        real onde Deus genuinamente "atenta" para aflição específica.`),
      questions: [
        'Você clama a Deus com a confiança genuína de que ele "atenta" para sua aflição específica?',
        'Que aflição você precisa trazer, com essa mesma confiança de ser realmente ouvido, nesta Quaresma?',
        'Como lembrar de momentos passados em que Deus genuinamente ouviu e respondeu poderia fortalecer sua fé presente?',
      ],
    },
  },
  {
    prayer: {
      title: 'Aquele Que Habita no Esconderijo do Altíssimo',
      text: t(`Senhor, o salmista declara: "aquele que habita no
        esconderijo do Altíssimo, à sombra do Todo-Poderoso
        descansará." Um lugar de refúgio genuíno e permanente, não
        visita ocasional. Que eu "habite" nessa proteção, não apenas
        a visite esporadicamente. Amém.`),
    },
    meditation: {
      prompt: t(`O verbo "habitar" sugere residência permanente, não
        visita temporária — o salmo convida a uma relação de morada
        contínua na proteção de Deus, não apenas recurso ocasional em
        crise.`),
      questions: [
        'Sua relação com a proteção de Deus se parece mais com "habitar" continuamente ou "visitar" apenas em momentos de crise?',
        'O que significaria cultivar essa morada permanente, não apenas recurso emergencial?',
        'Como essa Quaresma poderia ser oportunidade de aprofundar esse "habitar", não apenas visitas ocasionais a Deus?',
      ],
    },
  },
  {
    prayer: {
      title: 'Todo Aquele Que Invocar o Nome do Senhor Será Salvo',
      text: t(`Senhor, Paulo declara: "todo aquele que invocar o
        nome do Senhor será salvo... não há distinção entre judeu e
        grego." Uma promessa universal e acessível, sem barreiras
        étnicas ou de mérito. Que eu invoque teu nome hoje com essa
        mesma confiança simples. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo enfatiza deliberadamente a ausência de
        distinção — "o mesmo Senhor... rico para com todos" — uma
        promessa radicalmente inclusiva que rompe categorias sociais
        rígidas da época.`),
      questions: [
        'Você já se excluiu, mesmo inconscientemente, dessa promessa universal por sentir que não se qualifica de alguma forma?',
        'Como essa ausência de distinção — nenhuma barreira étnica, social ou de mérito — muda sua confiança em se aproximar de Deus?',
        'O que significaria invocar hoje o nome do Senhor com essa mesma simplicidade acessível?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cheio do Espírito Santo, Voltou do Jordão',
      text: t(`Senhor Jesus, "cheio do Espírito Santo, voltou do
        Jordão; e era levado pelo Espírito no deserto." A mesma
        plenitude do Espírito que marcou teu batismo te conduziu
        diretamente à provação. Que eu confie que o Espírito me guia
        mesmo através de deserto, não apenas para longe dele. Amém.`),
    },
    meditation: {
      prompt: t(`Lucas enfatiza a plenitude contínua do Espírito —
        "cheio... era levado" — mesmo durante a experiência do
        deserto, sugerindo que a presença do Espírito não garante
        ausência de provação, mas sustenta através dela.`),
      questions: [
        'Você associa a plenitude do Espírito apenas com momentos confortáveis, ou reconhece que ele também guia através de desertos?',
        'Como essa continuidade — cheio do Espírito antes e durante a provação — muda sua expectativa sobre dificuldades presentes?',
        'Que "deserto" você está atravessando agora, precisando confiar nessa mesma condução contínua do Espírito?',
      ],
    },
  },
  {
    prayer: {
      title: 'Nem Só de Pão Viverá o Homem',
      text: t(`Senhor Jesus, diante da primeira tentação, respondeste:
        "nem só de pão viverá o homem." Priorizaste a Palavra mesmo
        diante de fome física real depois de quarenta dias. Ensina-me
        essa mesma prioridade diante das minhas próprias necessidades
        urgentes. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus não nega a realidade da fome física genuína
        — ele simplesmente recusa deixar que essa necessidade real
        dite suas escolhas acima da fidelidade à Palavra.`),
      questions: [
        'Que necessidade real e urgente você está enfrentando que poderia te tentar a comprometer princípios por alívio imediato?',
        'Como Jesus modela reconhecer necessidade real sem deixar que ela determine automaticamente a resposta?',
        'O que significaria priorizar a Palavra de Deus mesmo diante de uma necessidade física ou emocional genuína?',
      ],
    },
  },
  {
    prayer: {
      title: 'Até Ocasião Oportuna',
      text: t(`Senhor, encerramos esta primeira semana com o detalhe
        significativo: depois de resistir às três tentações, "o
        Diabo... retirou-se dele até ocasião oportuna." A vitória
        naquele momento não significava fim permanente da provação.
        Que eu permaneça vigilante mesmo depois de resistir com
        sucesso a uma tentação específica. Amém.`),
    },
    meditation: {
      prompt: t(`Lucas, diferente de Mateus e Marcos, inclui essa
        nota inquietante — a tentação retorna "até ocasião oportuna"
        — preparando o leitor para reconhecer que a provação de Jesus
        continuaria ao longo de todo o ministério.`),
      questions: [
        'Esta primeira semana de Quaresma — da confissão humilde das primícias às tentações resistidas por Jesus — o que te ensinou sobre vigilância contínua?',
        'Você já baixou a guarda depois de resistir a uma tentação específica, esquecendo que ela poderia retornar em outro momento?',
        'Como você quer entrar na segunda semana da Quaresma, mantendo essa vigilância sem ansiedade excessiva?',
      ],
    },
  },
];

// Quaresma 2 — Gênesis 15:1-12, 17-18 · Salmo 27 · Filipenses 3:17-4:1 · Lucas 13:31-35
const week2: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Não Temas, Abrão; Eu Sou o Teu Escudo',
      text: t(`Senhor, disseste a Abrão: "não temas, Abrão; eu sou o
        teu escudo, o teu galardão será grandíssimo." Uma promessa de
        proteção e recompensa que precedeu qualquer pergunta ou
        dúvida de Abrão. Que eu receba essa mesma garantia antes de
        trazer minhas próprias ansiedades. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa vem espontaneamente, não como resposta a
        pedido específico — Deus antecipa o medo de Abrão antes que
        ele seja verbalizado, oferecendo segurança proativa.`),
      questions: [
        'Você já experimentou Deus oferecendo segurança antes mesmo de você verbalizar seu próprio medo?',
        'Como a imagem de Deus como "escudo" muda sua percepção de proteção real diante de ameaças presentes?',
        'Que medo não verbalizado você precisa trazer hoje diante dessa mesma promessa proativa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Creu Abrão no Senhor',
      text: t(`Senhor, diante da promessa de descendência
        incontável como as estrelas, "creu Abrão no Senhor, e o
        Senhor imputou-lhe isto como justiça." Fé genuína, não
        certeza baseada em evidência visível completa. Que minha
        própria fé seja contada dessa mesma forma. Amém.`),
    },
    meditation: {
      prompt: t(`A fé de Abrão é declarada justiça precisamente no
        momento de maior incerteza visível — antes de qualquer
        cumprimento tangível da promessa, apenas confiança na palavra
        dada.`),
      questions: [
        'Você associa "justiça" ou aprovação de Deus mais com desempenho visível ou com fé genuína, mesmo sem evidência completa?',
        'Que promessa de Deus você ainda precisa crer, apesar de não ver evidência visível completa dela?',
        'Como essa história desafia sua necessidade de certeza total antes de confiar?',
      ],
    },
  },
  {
    prayer: {
      title: 'Uma Coisa Pedi ao Senhor',
      text: t(`Senhor, o salmista foca seu desejo mais profundo: "uma
        coisa pedi ao Senhor, e a buscarei: que possa morar na casa
        do Senhor todos os dias da minha vida." Diante de tantos
        pedidos possíveis, ele escolhe presença contínua acima de
        tudo. Ajuda-me a simplificar meus próprios desejos até esse
        núcleo. Amém.`),
    },
    meditation: {
      prompt: t(`Em meio a um salmo que reconhece adversários reais
        e perigo genuíno, o pedido central do salmista não é
        livramento das circunstâncias, mas proximidade contínua com
        Deus.`),
      questions: [
        'Se pudesse fazer apenas "uma coisa" pedida a Deus, seria proximidade contínua com ele, ou outra coisa?',
        'O que revela sobre suas prioridades reais a lista de coisas que você mais pede a Deus?',
        'Como simplificar seus desejos até esse núcleo de presença contínua, sem negar necessidades reais?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Nossa Pátria Está nos Céus',
      text: t(`Senhor, Paulo lembra: "a nossa pátria está nos céus,
        donde também aguardamos um Salvador." Uma identidade que
        transcende cidadania terrena, moldando prioridades presentes.
        Que eu viva com essa consciência de pertencimento maior, sem
        negligenciar responsabilidades terrenas reais. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo escreve isso alertando contra aqueles "cujo
        deus é o ventre" — pessoas cuja identidade última está
        completamente presa às coisas terrenas, em contraste com essa
        cidadania celestial que reorienta prioridades.`),
      questions: [
        'Sua identidade principal está mais ancorada em "cidadania terrena" (nacionalidade, carreira, status) ou nessa pátria celestial?',
        'Como viver com essa consciência dupla, sem negligenciar responsabilidades terrenas reais nem esquecer o pertencimento maior?',
        'O que significaria reorganizar hoje uma prioridade específica à luz dessa cidadania celestial?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ide e Dizei a Essa Raposa',
      text: t(`Senhor Jesus, diante da ameaça de Herodes, respondeste
        com firmeza corajosa: "ide e dizei a essa raposa: eis que vou
        expulsando demônios e fazendo curas, hoje e amanhã." Nenhuma
        intimidação te desviou do teu propósito determinado. Que eu
        tenha essa mesma coragem diante de ameaças ao meu próprio
        chamado. Amém.`),
    },
    meditation: {
      prompt: t(`A resposta de Jesus não é nem covarde nem
        imprudentemente confrontadora — ele nomeia a ameaça
        diretamente, mas mantém o foco em continuar sua missão, não
        em reagir emocionalmente à intimidação.`),
      questions: [
        'Você já se deixou desviar do seu propósito por intimidação ou ameaça, mesmo quando o chamado permanecia claro?',
        'Como a resposta calma mas firme de Jesus poderia moldar sua própria reação diante de oposição?',
        'Que "raposa" ameaçadora você precisa enfrentar hoje sem desviar do que já sabe que deve fazer?',
      ],
    },
  },
  {
    prayer: {
      title: 'Quantas Vezes Quis Eu Ajuntar os Teus Filhos',
      text: t(`Senhor Jesus, lamentaste sobre Jerusalém: "quantas
        vezes quis eu ajuntar os teus filhos, como a galinha ajunta a
        sua ninhada debaixo das asas, e não quiseste!" Um desejo
        genuíno de proteção rejeitado repetidamente, mas não retirado.
        Que eu não resista à tua proteção quando ela é oferecida.
        Amém.`),
    },
    meditation: {
      prompt: t(`A imagem maternal — galinha protegendo seus
        filhotes — combinada com lamento genuíno por rejeição
        repetida, revela um Deus cujo amor persiste mesmo diante de
        recusa contínua.`),
      questions: [
        'Você já resistiu à proteção genuína de Deus, preferindo autonomia que na verdade te deixava mais vulnerável?',
        'Como essa imagem maternal — tão diferente de imagens de poder distante — muda sua percepção do desejo de Deus por você?',
        'O que significaria, hoje, parar de resistir e aceitar essa proteção genuinamente oferecida?',
      ],
    },
  },
  {
    prayer: {
      title: 'Bendito Aquele Que Vem em Nome do Senhor',
      text: t(`Senhor, encerramos esta segunda semana com a
        profecia de Jesus sobre seu próprio retorno futuro:
        "bendito aquele que vem em nome do Senhor." Um vislumbre da
        entrada triunfal que já se aproxima nesta jornada quaresmal.
        Que eu antecipe essa celebração mesmo em meio às dificuldades
        atuais. Amém.`),
    },
    meditation: {
      prompt: t(`Esta profecia antecipa diretamente as palavras que
        a multidão gritaria no Domingo de Ramos — Jesus já sabe, nesta
        segunda semana de Quaresma, exatamente como será recebido
        quando entrar em Jerusalém.`),
      questions: [
        'Esta segunda semana — da promessa de proteção a Abrão ao lamento amoroso sobre Jerusalém — o que te ensinou sobre o desejo persistente de Deus por você?',
        'Como antecipar, mesmo agora, a alegria do Domingo de Ramos que se aproxima nesta jornada quaresmal?',
        'O que você quer levar desta semana para a terceira semana da Quaresma que se inicia?',
      ],
    },
  },
];

// Quaresma 3 — Isaías 55:1-9 · Salmo 63:1-8 · 1 Coríntios 10:1-13 · Lucas 13:1-9
const week3: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Vinde às Águas, Vinde e Comprai Sem Dinheiro',
      text: t(`Senhor, convidas: "todos os que tendes sede, vinde às
        águas... vinde e comprai, sem dinheiro e sem preço." Um
        convite radicalmente generoso, sem barreira financeira ou de
        mérito. Que eu venha hoje sem hesitar, confiando nessa
        acessibilidade total. Amém.`),
    },
    meditation: {
      prompt: t(`O paradoxo deliberado — "comprai sem dinheiro" —
        comunica que o que Deus oferece transcende completamente
        economia de mérito ou troca comercial, um dom genuinamente
        gratuito.`),
      questions: [
        'Você ainda hesita em vir a Deus por sentir que precisa "pagar" de alguma forma antes de merecer o que ele oferece?',
        'Que "sede" você reconhece hoje que precisa levar diante dessa oferta gratuita?',
        'Como viver mais plenamente a partir dessa acessibilidade total, sem barreiras autoimpostas?',
      ],
    },
  },
  {
    prayer: {
      title: 'Por Que Gastais o Dinheiro Naquilo Que Não É Pão?',
      text: t(`Senhor, perguntas com ternura: "por que gastais o
        dinheiro naquilo que não é pão! e o produto do vosso trabalho
        naquilo que não pode satisfazer?" Examina onde tenho investido
        energia e recursos em coisas que nunca poderiam realmente
        satisfazer. Redireciona meu investimento para o que realmente
        importa. Amém.`),
    },
    meditation: {
      prompt: t(`A pergunta de Deus não condena o desejo de
        satisfação — ela questiona a sabedoria de buscar essa
        satisfação em fontes que, por sua própria natureza, nunca
        poderiam genuinamente satisfazer.`),
      questions: [
        'Em que você tem "gastado" tempo, energia ou dinheiro que, honestamente, nunca traz a satisfação genuína que promete?',
        'O que ajudaria você a redirecionar esse investimento para o que realmente pode satisfazer?',
        'Como essa pergunta gentil de Deus, não julgamento severo, poderia abrir espaço para mudança genuína?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Minha Alma Tem Sede de Ti',
      text: t(`Senhor, o salmista declara: "ó Deus, tu és o meu
        Deus; ansiosamente te busco. A minha alma tem sede de ti."
        Desejo ativo e consciente, não busca casual. Que minha própria
        sede espiritual seja tão genuína e reconhecida quanto essa.
        Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem física intensa — "sede", "carne
        deseja" — comunica busca visceral, não intelectual distante,
        um modelo de desejo genuíno e corporal por Deus.`),
      questions: [
        'Você reconhece sua própria "sede" espiritual com essa mesma intensidade visceral, ou ela permanece abstrata?',
        'O que ajudaria você a buscar Deus "ansiosamente", com essa urgência genuína, não apenas rotina distante?',
        'Que prática ajudaria você a reconectar com essa sede real por Deus nesta terceira semana?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deus Não Deixará Que Sejais Tentados Acima do Que Podeis',
      text: t(`Senhor, Paulo assegura: "fiel é Deus, o qual não
        deixará que sejais tentados acima do que podeis resistir,
        antes com a tentação dará também o meio de saída." Uma
        promessa de suficiência real diante de qualquer provação. Que
        eu confie nessa fidelidade quando a tentação parece
        avassaladora. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa não elimina a tentação — ela garante
        suficiência de recursos para resistir, incluindo "o meio de
        saída", uma provisão ativa e específica, não apenas
        resistência passiva.`),
      questions: [
        'Você já sentiu que uma tentação estava "acima do que podia resistir", esquecendo essa promessa específica?',
        'Que "meio de saída" Deus já te ofereceu numa tentação recente, talvez sem você reconhecer conscientemente?',
        'Como buscar ativamente esse meio de saída hoje, em vez de resignação passiva diante da tentação?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se Não Vos Arrependerdes, Todos de Igual Modo Perecereis',
      text: t(`Senhor Jesus, diante de tragédias recentes, rejeitaste
        a teologia simplista de que vítimas eram "piores pecadores":
        "não, eu vos digo; antes, se não vos arrependerdes, todos de
        igual modo perecereis." Um chamado urgente ao arrependimento
        universal, não julgamento seletivo de outros. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus redireciona deliberadamente uma conversa
        sobre julgar a culpa alheia para um chamado urgente ao
        arrependimento pessoal de quem está perguntando — a tragédia
        alheia se torna espelho, não distração confortável.`),
      questions: [
        'Você já usou a desgraça de outra pessoa como forma de evitar examinar seu próprio precisão de arrependimento?',
        'Como essa correção de Jesus redireciona conversas sobre julgamento alheio de volta para autoexame genuíno?',
        'Que arrependimento urgente você tem adiado, distraído por julgamento sobre outros?',
      ],
    },
  },
  {
    prayer: {
      title: 'Deixa-a Este Ano Ainda',
      text: t(`Senhor, na parábola da figueira infrutífera, o
        viticultor intercede: "deixa-a este ano ainda, até que eu
        cave em derredor, e lhe deite estrume." Paciência ativa,
        investindo esforço adicional antes de desistir completamente.
        Que eu receba essa mesma paciência intercessora quando estou
        infrutífero. Amém.`),
    },
    meditation: {
      prompt: t(`O viticultor não apenas pede mais tempo passivamente
        — ele propõe trabalho adicional específico (cavar, adubar),
        intercessão que envolve esforço real, não apenas prazo
        estendido sem mudança.`),
      questions: [
        'Você já recebeu esse tipo de intercessão paciente e ativa de alguém, quando poderia ter sido simplesmente descartado?',
        'Que área "infrutífera" da sua vida precisa dessa mesma paciência ativa — não apenas mais tempo, mas trabalho adicional investido?',
        'Por quem você poderia interceder dessa forma, oferecendo esforço adicional antes de desistir?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se No Futuro Der Fruto, Bem; Mas, Se Não, Cortá-la-ás',
      text: t(`Senhor, encerramos esta terceira semana com a
        condição final da parábola: paciência real, mas não
        indefinida — "se no futuro der fruto, bem; mas, se não,
        cortá-la-ás." Um equilíbrio entre misericórdia genuína e
        seriedade sobre a necessidade real de fruto. Que eu leve a
        sério ambos os lados dessa verdade. Amém.`),
    },
    meditation: {
      prompt: t(`A parábola não promete paciência ilimitada — ela
        oferece uma extensão real e significativa, mas mantém a
        expectativa genuína de fruto eventual, evitando tanto
        legalismo severo quanto tolerância sem limites.`),
      questions: [
        'Esta terceira semana — do convite gratuito às águas à paciência limitada com a figueira — o que te ensinou sobre equilibrar graça e seriedade sobre fruto real?',
        'Você trata a paciência de Deus como ilimitada e sem expectativa, ou reconhece também essa seriedade genuína sobre fruto eventual?',
        'Que fruto específico você precisa começar a produzir, aproveitando essa temporada extra de paciência ativa?',
      ],
    },
  },
];

// Quaresma 4 — Josué 5:9-12 · Salmo 32 · 2 Coríntios 5:16-21 · Lucas 15:1-3, 11b-32
const week4: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Hoje Revolvi de Sobre Vós o Opróbrio do Egito',
      text: t(`Senhor, ao entrar na terra prometida, declaraste a
        Josué: "hoje revolvi de sobre vós o opróbrio do Egito." Uma
        vergonha antiga finalmente removida, marcando início
        genuinamente novo. Que eu reconheça os "opróbrios" antigos que
        já removeste da minha própria vida. Amém.`),
    },
    meditation: {
      prompt: t(`O momento marca transição decisiva — não apenas
        chegada geográfica, mas remoção simbólica de identidade
        antiga de escravidão, abrindo espaço para identidade nova como
        povo estabelecido na própria terra.`),
      questions: [
        'Que "opróbrio" ou vergonha antiga você continua carregando, mesmo que Deus já o tenha removido?',
        'Como reconhecer e celebrar essa remoção, em vez de continuar vivendo a partir da identidade antiga?',
        'O que significaria entrar hoje, como Israel entrou na terra prometida, numa identidade genuinamente nova?',
      ],
    },
  },
  {
    prayer: {
      title: 'Cessou o Maná',
      text: t(`Senhor, assim que o povo comeu do produto da nova
        terra, "cessou o maná... e os filhos de Israel não o tiveram
        mais." Provisão milagrosa temporária cedeu lugar a provisão
        ordinária da terra prometida. Ajuda-me a reconhecer quando uma
        estação de provisão especial está cedendo lugar a algo novo e
        sustentável. Amém.`),
    },
    meditation: {
      prompt: t(`A transição do maná sobrenatural para o alimento
        comum da terra sugere que nem toda provisão de Deus precisa
        ser miraculosa — às vezes a bênção madura em sustento
        ordinário e estabelecido.`),
      questions: [
        'Você já resistiu a deixar uma "provisão especial" temporária, mesmo quando Deus já estava oferecendo algo novo e sustentável?',
        'Como distinguir entre nostalgia por intervenção miraculosa passada e abertura para provisão madura presente?',
        'Que "maná" você precisa deixar ir, confiando na nova provisão que Deus já preparou?',
      ],
    },
  },
  {
    prayer: {
      title: 'Confessei-te o Meu Pecado',
      text: t(`Senhor, o salmista declara: "confessei-te o meu
        pecado, e a minha iniqüidade não encobri... e tu perdoaste a
        culpa do meu pecado." Alívio genuíno vem da confissão
        honesta, não do disfarce prolongado. Que eu confesse
        abertamente o que tenho escondido. Amém.`),
    },
    meditation: {
      prompt: t(`O salmo descreve o peso físico do pecado não
        confessado ("consumiram-se os meus ossos") em contraste
        direto com o alívio imediato que segue confissão honesta —
        uma experiência corporal, não apenas teológica abstrata.`),
      questions: [
        'Você já experimentou fisicamente o peso de esconder algo de Deus, e o alívio real de finalmente confessá-lo?',
        'O que impede você de confessar mais prontamente algo que ainda esconde?',
        'Que confissão específica você precisa trazer hoje, confiando no perdão já prometido?',
      ],
    },
  },
  {
    prayer: {
      title: 'Se Alguém Está em Cristo, Nova Criatura É',
      text: t(`Senhor, Paulo declara: "se alguém está em Cristo, nova
        criatura é; as coisas velhas já passaram; eis que tudo se fez
        novo." Transformação completa, não reforma parcial. Que eu
        viva a partir dessa identidade genuinamente nova, não da
        antiga que já passou. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem é absoluta — "as coisas velhas já
        passaram... tudo se fez novo" — não melhoria gradual, mas
        transformação categórica de identidade em Cristo.`),
      questions: [
        'Você vive mais a partir dessa identidade "nova criatura" já estabelecida, ou ainda se apega à identidade "velha" que já passou?',
        'Que "coisa velha" você precisa deliberadamente deixar ir, confiando que já passou de verdade?',
        'O que significaria viver hoje plenamente a partir dessa novidade completa, não parcial?',
      ],
    },
  },
  {
    prayer: {
      title: 'Estando Ele Ainda Longe, Seu Pai o Viu',
      text: t(`Senhor, na parábola do filho pródigo, "estando ele
        ainda longe, seu pai o viu, encheu-se de compaixão e,
        correndo, lançou-se-lhe ao pescoço." O pai não esperou
        passivamente — correu ao encontro antes mesmo de qualquer
        palavra de arrependimento completa. Que eu confie nessa
        mesma disposição tua de correr ao meu encontro. Amém.`),
    },
    meditation: {
      prompt: t(`A imagem do pai correndo — indignidade social para
        um homem idoso na cultura da época — revela urgência de amor
        que ultrapassa qualquer preocupação com dignidade própria ou
        protocolo social.`),
      questions: [
        'Você já duvidou que Deus correria ao seu encontro, mesmo "ainda longe", antes de você provar arrependimento completo?',
        'Como essa disposição do pai — abandonando dignidade própria por amor — muda sua imagem de como Deus te recebe de volta?',
        'Que "longe" você ainda está, precisando confiar nesse encontro que já está a caminho?',
      ],
    },
  },
  {
    prayer: {
      title: 'Este Meu Filho Estava Morto, e Reviveu',
      text: t(`Senhor, o pai declara sobre o filho que retornou:
        "este meu filho estava morto, e reviveu; tinha-se perdido, e
        foi achado." Linguagem de ressurreição, não apenas reconciliação
        comum. Que meu próprio retorno a ti seja recebido com essa
        mesma celebração intensa. Amém.`),
    },
    meditation: {
      prompt: t(`A linguagem usada — "morto... reviveu" — eleva a
        reconciliação familiar comum a categoria quase de
        ressurreição, comunicando o peso genuíno que Deus atribui a
        cada retorno arrependido.`),
      questions: [
        'Você trata seu próprio retorno a Deus, depois de afastamento, com essa mesma seriedade de "morte e vida", ou minimiza sua importância?',
        'Como essa celebração intensa do pai desafia qualquer tendência sua de minimizar a alegria de alguém que retorna à fé?',
        'Que "morto que reviveu" você poderia celebrar hoje — em sua própria vida ou na de outra pessoa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Tudo o Que É Meu É Teu',
      text: t(`Senhor, encerramos esta quarta semana com a resposta
        do pai ao filho mais velho ressentido: "filho, tu sempre
        estás comigo, e tudo o que é meu é teu." Um lembrete de que
        proximidade constante já era, o tempo todo, riqueza que não
        precisava de celebração especial para ser real. Que eu
        reconheça essa mesma riqueza constante na minha própria
        proximidade contigo. Amém.`),
    },
    meditation: {
      prompt: t(`A parábola termina sem resolução clara sobre o
        filho mais velho — um final deliberadamente aberto que
        convida cada ouvinte a examinar sua própria resposta ao amor
        generoso de Deus por outros.`),
      questions: [
        'Esta quarta semana — da remoção do opróbrio antigo à celebração do filho que retornou — o que te ensinou sobre a generosidade completa de Deus?',
        'Você se identifica mais com o filho pródigo que retorna ou com o filho mais velho ressentido pela generosidade do pai com outro?',
        'O que você quer levar desta semana para reconhecer, sem ressentimento, a riqueza constante da sua própria proximidade com Deus?',
      ],
    },
  },
];

// Quaresma 5 — Isaías 43:16-21 · Salmo 126 · Filipenses 3:4b-14 · João 12:1-8
const week5: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Eis Que Faço Uma Coisa Nova',
      text: t(`Senhor, prometes: "não vos lembreis das coisas
        passadas, nem considereis as antigas. Eis que faço uma coisa
        nova; agora está saindo à luz." Um convite a soltar o passado
        para receber genuína novidade. Que eu não permaneça preso a
        fracassos ou glórias antigas, a ponto de perder o que fazes
        agora. Amém.`),
    },
    meditation: {
      prompt: t(`A instrução de "não lembrar" não nega a realidade
        histórica passada — ela pede que essa memória não impeça o
        reconhecimento de algo genuinamente novo que Deus já está
        fazendo.`),
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
        onde naturalmente não haveria — criação onde faltava
        completamente. Confia que podes fazer isso também nos
        desertos da minha vida. Amém.`),
    },
    meditation: {
      prompt: t(`A promessa não fala de melhorar recursos escassos
        já existentes — fala de criar provisão inteiramente onde não
        havia nada, no próprio deserto, o lugar de maior escassez
        imaginável.`),
      questions: [
        'Que "deserto" — área de escassez total, não apenas insuficiência — você reconhece na sua vida hoje?',
        'Você consegue crer que Deus pode criar provisão genuína mesmo onde parece impossível?',
        'O que significaria confiar nessa promessa específica hoje, diante de uma necessidade que parece impossível de suprir?',
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
      title: 'Tenho Também Como Perda Todas as Coisas',
      text: t(`Senhor, Paulo declara sobre suas próprias
        credenciais impressionantes: "tenho também como perda todas
        as coisas pela excelência do conhecimento de Cristo Jesus,
        meu Senhor." Ele solta genuína conquista pessoal por algo
        maior. Que eu tenha essa mesma disposição de reavaliar minhas
        próprias conquistas à luz de ti. Amém.`),
    },
    meditation: {
      prompt: t(`Paulo não despreza conquistas vazias — ele lista
        credenciais genuinamente impressionantes (linhagem, zelo,
        justiça legal) antes de escolher deliberadamente considerá-las
        "perda" diante de algo maior.`),
      questions: [
        'Que conquista genuína sua você trata como identidade central, quando poderia ser reavaliada à luz de algo maior?',
        'Como a disposição de Paulo de "perder" credenciais reais desafia seu próprio apego a realizações impressionantes?',
        'O que significaria hoje reorganizar sua identidade em torno do "conhecimento de Cristo" acima de qualquer outra conquista?',
      ],
    },
  },
  {
    prayer: {
      title: 'Ungiu os Pés de Jesus, e os Enxugou com os Seus Cabelos',
      text: t(`Senhor, Maria "ungiu os pés de Jesus, e os enxugou
        com os seus cabelos" — um gesto extravagante e vulnerável de
        adoração, sem preocupação com aparência ou custo. Que minha
        própria adoração tenha essa mesma disposição de generosidade
        vulnerável. Amém.`),
    },
    meditation: {
      prompt: t(`O gesto de Maria era socialmente chocante —
        soltar os cabelos em público, usar perfume de valor
        extraordinário — uma adoração que ultrapassava completamente
        convenções de decoro social por amor genuíno.`),
      questions: [
        'Sua própria adoração tende a ser contida e "apropriada", ou você já experimentou esse tipo de generosidade vulnerável e extravagante?',
        'O que impede você de oferecer adoração dessa forma mais livre, sem preocupação com aparência externa?',
        'Que "perfume de grande valor" — recurso precioso — você poderia oferecer livremente a Cristo nesta última semana antes da Semana Santa?',
      ],
    },
  },
  {
    prayer: {
      title: 'Para o Dia da Minha Preparação Para a Sepultura',
      text: t(`Senhor Jesus, defendeste o gesto de Maria contra a
        crítica de Judas: "deixa-a; para o dia da minha preparação
        para a sepultura o guardou." Ela reconheceu, talvez
        intuitivamente, o que se aproximava. Que eu também reconheça
        os momentos significativos que se aproximam, respondendo com
        generosidade apropriada. Amém.`),
    },
    meditation: {
      prompt: t(`Jesus interpreta o gesto de Maria com significado
        profético que talvez nem ela completamente compreendesse —
        adoração genuína às vezes antecipa, intuitivamente, verdades
        que a mente consciente ainda não processou completamente.`),
      questions: [
        'Você já teve uma resposta intuitiva e generosa a algo, cujo significado completo só compreendeu depois?',
        'Como cultivar essa sensibilidade para momentos significativos, respondendo generosamente mesmo sem entender completamente por quê?',
        'Que "preparação" você sente que precisa fazer, à medida que a Semana Santa se aproxima?',
      ],
    },
  },
  {
    prayer: {
      title: 'Os Pobres Sempre os Tendes Convosco',
      text: t(`Senhor, encerramos esta última semana antes da Semana
        Santa com tua declaração: "os pobres sempre os tendes
        convosco; mas a mim nem sempre me tendes." Não desvalorização
        do cuidado com os pobres, mas reconhecimento da urgência única
        deste momento específico contigo. Que eu discirna os momentos
        que pedem prioridade extraordinária. Amém.`),
    },
    meditation: {
      prompt: t(`A declaração de Jesus não nega a importância
        contínua do cuidado com os pobres (compromisso constante e
        legítimo) — ela reconhece que certos momentos pedem resposta
        extraordinária e única, não repetível.`),
      questions: [
        'Esta última semana da Quaresma — da promessa de coisas novas à adoração extravagante de Maria — o que te ensinou sobre reconhecer momentos únicos que pedem resposta especial?',
        'Você consegue discernir entre compromissos contínuos importantes e momentos que pedem prioridade extraordinária única?',
        'Como você quer entrar no Domingo de Ramos e na Semana Santa que se aproxima, carregando essa capacidade de discernimento e generosidade?',
      ],
    },
  },
];

const lentC: Record<number, DevotionalEntry[]> = {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
  5: week5,
};

export default lentC;
