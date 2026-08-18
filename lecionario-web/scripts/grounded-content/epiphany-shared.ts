/**
 * Epifania — conteúdo comum aos 3 ciclos.
 *
 * `epiphanyDay` — o próprio 6/jan (visita dos magos, Isaías 60/Mateus
 * 2:1-12), uma das poucas leituras fixas do RCL, igual nos 3 ciclos.
 * `epiphanyGapWeek` — os dias entre 6/jan e o 1º domingo real depois
 * da Epifania (sempre o Batismo do Senhor), que variam de 0 a 6
 * dependendo do dia da semana em que cai 6/jan. Mesmo padrão de
 * `trinityWeek{A,B,C}` em ordinary-*.ts: 6 entradas, indexadas por
 * `date.getDay() - 1` (1=segunda…6=sábado), meditações sobre a
 * própria narrativa da Epifania, comuns aos 3 ciclos já que o RCL não
 * atribui leitura própria a esses dias.
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

// Epifania do Senhor (6/jan) — Isaías 60:1-6 · Salmo 72:1-7, 10-14 · Efésios 3:1-12 · Mateus 2:1-12
export const epiphanyDay: DevotionalEntry = {
  prayer: {
    title: 'Do Oriente Vimos a Sua Estrela',
    text: t(`Senhor, os magos vieram "do oriente" — de fora do povo
      da promessa — guiados apenas por uma estrela, dizendo: "vimos a
      sua estrela e viemos adorá-lo." Tua revelação sempre foi maior
      do que as fronteiras que os homens traçam. Ajuda-me a reconhecer
      que tua luz chama gente de todo lugar, inclusive de onde eu
      menos esperaria. Amém.`),
  },
  meditation: {
    prompt: t(`Os magos eram estrangeiros, provavelmente astrólogos
      pagãos — não faziam parte do povo da aliança, e ainda assim
      foram os primeiros gentios a reconhecer e adorar o Messias,
      antes mesmo dos líderes religiosos de Jerusalém.`),
    questions: [
      'Você já subestimou a capacidade de alguém "de fora" reconhecer Deus genuinamente?',
      'Que "estrela" — sinal inesperado, pista incomum — Deus já usou para te guiar até ele?',
      'Como a inclusão dos magos, logo no início do evangelho, já anuncia o alcance universal de Jesus?',
    ],
  },
};

// Dias entre a Epifania e o Batismo do Senhor (varia de 0 a 6 dias,
// dependendo do dia da semana em que cai 6/jan)
export const epiphanyGapWeek: DevotionalEntry[] = [
  {
    prayer: {
      title: 'Toda a Jerusalém Se Perturbou',
      text: t(`Senhor, quando os magos anunciaram o nascimento do
        "rei dos judeus", Herodes "perturbou-se, e com ele toda a
        Jerusalém." A chegada do Messias não foi recebida com alegria
        universal — muitos a sentiram como ameaça ao poder
        estabelecido. Examina em mim qualquer resistência semelhante
        diante do que tua presença pode reordenar. Amém.`),
    },
    meditation: {
      prompt: t(`A reação de medo e perturbação, vinda precisamente
        de quem detinha poder religioso e político, contrasta com a
        alegria simples dos magos — a mesma notícia gerou reações
        opostas dependendo do que cada um tinha a perder.`),
      questions: [
        'Existe algo em você que reage com resistência, não alegria, diante de mudanças que Deus pode estar trazendo?',
        'O que você teria a "perder" se Deus reordenasse completamente suas prioridades atuais?',
        'Como distinguir entre preocupação legítima e resistência ao que Deus está fazendo?',
      ],
    },
  },
  {
    prayer: {
      title: 'Inquiriu com Precisão',
      text: t(`Senhor, Herodes "inquiriu com precisão" sobre o tempo
        do nascimento, mas usou esse conhecimento para o mal, não
        para adoração. Conhecimento sobre ti sem disposição de
        submissão pode se tornar instrumento de destruição, não de
        vida. Examina como uso o que sei sobre ti. Amém.`),
    },
    meditation: {
      prompt: t(`Herodes demonstra investigação cuidadosa e precisa —
        ele não ignora a profecia, ele a estuda atentamente — mas seu
        conhecimento serve a intenções destrutivas, não à adoração
        genuína.`),
      questions: [
        'Você já usou conhecimento religioso ou bíblico para fins que não eram genuinamente de adoração?',
        'Como conhecimento preciso sobre Deus pode coexistir com um coração completamente fechado a ele?',
        'O que garante que seu próprio conhecimento sobre Deus se traduza em adoração, não em controle ou manipulação?',
      ],
    },
  },
  {
    prayer: {
      title: 'A Estrela Ia Adiante Deles',
      text: t(`Senhor, depois de saírem de Jerusalém, "a estrela que
        tinham visto quando no oriente ia adiante deles, até que...
        se deteve sobre o lugar onde estava o menino." Tua orientação
        continuou, passo a passo, até o destino final. Confio que
        continuas guiando, mesmo quando o caminho não está
        completamente claro de uma vez. Amém.`),
    },
    meditation: {
      prompt: t(`A estrela não revela o destino completo de uma vez
        — ela guia progressivamente, "adiante deles", exigindo
        disposição de continuar seguindo passo a passo.`),
      questions: [
        'Você prefere ver o caminho inteiro de uma vez, ou consegue confiar em orientação passo a passo?',
        'Que "estrela" — sinal, convicção, oportunidade — está te guiando atualmente, mesmo sem revelar o destino completo?',
        'O que ajudaria você a continuar seguindo, mesmo sem certeza total do que vem depois?',
      ],
    },
  },
  {
    prayer: {
      title: 'Regozijaram-se com Grande Alegria',
      text: t(`Senhor, ao verem a estrela se deter, os magos
        "regozijaram-se com grande alegria." Depois de uma longa
        jornada, a chegada trouxe alegria genuína, não apenas alívio.
        Que minha própria busca por ti, quando alcançar seus momentos
        de resposta, produza essa mesma alegria plena. Amém.`),
    },
    meditation: {
      prompt: t(`A intensidade da reação — "grande alegria" — depois
        de uma jornada longa e incerta, sugere que buscas prolongadas,
        quando alcançam seu objetivo, produzem alegria mais profunda
        do que respostas fáceis e imediatas.`),
      questions: [
        'Você já experimentou alegria mais profunda precisamente porque a busca foi longa e incerta?',
        'Que busca prolongada você está sustentando atualmente, confiando numa alegria semelhante no fim?',
        'Como cultivar essa esperança de alegria plena, mesmo no meio da jornada ainda incompleta?',
      ],
    },
  },
  {
    prayer: {
      title: 'Abrindo os Seus Tesouros',
      text: t(`Senhor, os magos, "abrindo os seus tesouros, ofertaram-
        lhe dádivas: ouro incenso e mirra." A adoração genuína se
        expressou em generosidade concreta, não apenas em sentimento
        interno. Que minha própria adoração se traduza em ofertas
        reais, não apenas em palavras. Amém.`),
    },
    meditation: {
      prompt: t(`As três dádivas — ouro (realeza), incenso
        (divindade), mirra (sofrimento e morte) — carregam significado
        profético sobre quem Jesus era e o que enfrentaria, tornando a
        oferta dos magos mais do que presente comum.`),
      questions: [
        'Sua adoração se traduz em ofertas concretas — tempo, recursos, atenção — ou permanece apenas em sentimento interno?',
        'O que você poderia "abrir" hoje — recursos guardados, talentos não usados — como oferta genuína a Deus?',
        'Como as dádivas proféticas dos magos (realeza, divindade, sofrimento) enriquecem sua compreensão de quem Jesus é?',
      ],
    },
  },
  {
    prayer: {
      title: 'Regressaram à Sua Terra por Outro Caminho',
      text: t(`Senhor, encerramos esta semana com os magos avisados
        em sonho, regressando "à sua terra por outro caminho." O
        encontro contigo mudou até a rota do retorno — não voltaram
        pelo mesmo caminho de antes. Que meu próprio encontro contigo
        mude concretamente a direção da minha vida daqui em diante.
        Amém.`),
    },
    meditation: {
      prompt: t(`O detalhe do "outro caminho" é simbólico além do
        literal — um encontro genuíno com Cristo torna impossível
        voltar exatamente pela mesma rota de antes, em qualquer
        sentido da vida.`),
      questions: [
        'Como um encontro genuíno com Deus já mudou a "rota" da sua própria vida, de forma concreta?',
        'Que "caminho antigo" você precisa deixar de seguir, à luz do que já conheceu de Cristo?',
        'O que significaria, esta semana, escolher deliberadamente "outro caminho" em alguma área específica da sua vida?',
      ],
    },
  },
];
