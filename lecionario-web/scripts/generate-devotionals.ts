/**
 * Gera devocionais diários (oração + meditação) para cada dia do ano
 * usando templates por estação litúrgica.
 *
 * Uso: npx tsx scripts/generate-devotionals.ts
 *
 * Inspirado no estilo e estrutura de:
 *   - E.M. Bounds (oração como poder)
 *   - Richard Foster (oração contemplativa)
 *   - Ann Spangler (oração com os nomes de Deus)
 *   - Charles Spurgeon (profundidade expositiva)
 *
 * Todo conteúdo é original, escrito especificamente para o Lecionário.
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import cycleAData from '../src/data/rcl/cycle-A.json';
import ordinaryA, { trinityWeekA } from './grounded-content/ordinary-A';
import ordinaryB, { trinityWeekB } from './grounded-content/ordinary-B';
import ordinaryC, { trinityWeekC } from './grounded-content/ordinary-C';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Tipos ──────────────────────────────────────────────────────────

interface RclReading {
  type: 'first_reading' | 'psalm' | 'second_reading' | 'gospel';
  ref: string;
  text?: string;
}

interface RclEntry {
  date: string;
  season: string;
  weekOfSeason: number;
  dayName: string;
  readings: RclReading[];
}

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

interface DevotionalEntry {
  prayer: DailyPrayer;
  meditation: MeditationResource;
}

// ─── Templates de Oração por Temporada ──────────────────────────────

type WeekKey = number | string;

interface SeasonPrayers {
  [week: WeekKey]: DailyPrayer[];
}

interface SeasonMeditations {
  [week: WeekKey]: MeditationResource[];
}

interface SeasonTemplates {
  prayers: SeasonPrayers;
  meditations: SeasonMeditations;
}

function t(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

const templates: Record<string, SeasonTemplates> = {
  advent: {
    prayers: {
      1: [
        {
          title: 'Esperança que Vigia',
          text: t(`Senhor Deus, que prometeste enviar o teu Filho ao mundo,
            desperta em nós a esperança que não se apaga. Vivemos rodeados de
            distrações que entorpecem o coração, mas a tua Palavra nos chama
            a vigiar. Concede-nos olhos atentos para ver os sinais da tua vinda
            e ouvidos despertos para ouvir a tua voz. Que o ruído do mundo não
            abafe o sussurro do Espírito. Prepara os nossos corações para
            receber o Rei que vem, não em poder terreno, mas em humildade
            salvadora. Amém.`),
        },
        {
          title: 'Desperta, Ó Deus',
          text: t(`Deus todo-poderoso, que rompes o silêncio com a promessa da
            redenção, desperta-nos do sono da indiferença. Assim como o profeta
            anunciou a vinda do Messias, lembra-nos de que a história está nas
            tuas mãos. Quando o cansaço da vida nos levar ao desânimo, reaviva
            em nós a chama da esperança. Que o nosso coração não se feche no
            medo do futuro, mas se abra na confiança em tuas promessas.
            Prepara-nos para celebrar, não apenas um nascimento, mas a
            certeza de que o Eterno entrou no tempo para nos salvar. Amém.`),
        },
        {
          title: 'Vigiai e Orai',
          text: t(`Pai de infinita bondade, o teu Filho nos ensinou a vigiar
            e orar, pois não sabemos o dia nem a hora. Em cada amanhecer deste
            Advento, ensina-nos a viver na expectativa do teu Reino. Arranca de
            nós o torpor espiritual que nos faz esquecer que a vida é breve e
            a tua vinda é certa. Concede-nos a graça de viver cada dia como
            preparação para o encontro contigo. Que a nossa esperança não seja
            vã, mas fundamentada na rocha da tua promessa. Amém.`),
        },
      ],
      2: [
        {
          title: 'Voz que Clama no Deserto',
          text: t(`Senhor misericordioso, tu enviaste João Batista para preparar
            o caminho do teu Filho. Ajuda-nos a ouvir o seu chamado ao
            arrependimento, endireitando os caminhos tortos do nosso coração.
            Onde há orgulho, planta humildade; onde há indiferença, desperta
            compaixão; onde há mágoa, derrama perdão. Prepara em nós uma
            morada digna da tua presença. Que não nos contentemos com uma fé
            superficial, mas busquemos uma transformação profunda que se
            reflita em cada atitude. Amém.`),
        },
        {
          title: 'Preparai o Caminho',
          text: t(`Deus de amor, que não te conformas com meio caminho,
            convida-nos à conversão sincera. Nesta segunda semana do Advento,
            rasga o véu das nossas justificativas e revela as áreas da nossa
            vida que precisam ser endireitadas por ti. As montanhas do orgulho
            precisam ser abaixadas, os vales do desânimo precisam ser elevados.
            Faze de nós um povo preparado para receber o Salvador — não com
            cerimônias vazias, mas com corações quebrantados e contritos.
            Amém.`),
        },
      ],
      3: [
        {
          title: 'Alegria no Senhor',
          text: t(`Senhor, a tua Palavra nos ordena: "Alegrai-vos sempre!"
            Mesmo em meio às sombras do mundo, somos chamados a uma alegria
            que não depende das circunstâncias. Neste Domingo Gaudete,
            renova em nós o gozo da salvação. Que a alegria do Espírito Santo
            transborde em nossos corações, não como fuga da realidade, mas
            como testemunho de que tu és fiel. Ensina-nos a alegria que
            persevera na tribulação, que canta na espera e que confia na
            promessa. Amém.`),
        },
      ],
      4: [
        {
          title: 'O Verbo se Fez Carne',
          text: t(`Pai eterno, neste momento em que nos aproximamos do
            mistério da encarnação, aquieta o nosso coração. Maria disse sim
            ao teu plano; José confiou na tua orientação. Dá-nos a mesma
            fé disposta a dizer sim à tua vontade, mesmo quando não
            compreendemos totalmente os teus caminhos. Que o exemplo da
            Virgem Maria nos inspire a carregar Cristo em nosso ser e a
            entregá-lo ao mundo através de nossas vidas. O Verbo se fez
            carne e habitou entre nós — habita em nós, Senhor, e faz de
            nós a tua morada. Amém.`),
        },
        {
          title: 'Eis a Serva do Senhor',
          text: t(`Deus que escolheste uma jovem humilde para ser a mãe do
            Salvador, ensina-nos a humildade que abre espaço para o teu agir.
            Maria não compreendeu tudo, mas confiou. José não tinha todas as
            respostas, mas obedeceu. Concede-nos a graça de confiar mesmo
            quando não entendemos, de obedecer mesmo quando é custoso.
            Que neste Natal possamos dizer, como Maria: "Faça-se em mim
            segundo a tua palavra." Amém.`),
        },
      ],
    },
    meditations: {
      1: [
        {
          prompt: t(
            'A esperança cristã não é otimismo superficial, mas confiança radical nas promessas de Deus. O que tem ocupado o seu coração? Onde você tem depositado sua esperança?',
          ),
          questions: [
            'O que mais tem roubado a sua atenção e tirado o seu foco do que realmente importa?',
            'Em que área da sua vida você precisa vigiar mais — os pensamentos, as palavras, ou as atitudes?',
            'Como você pode criar espaço no seu dia para esperar em Deus, em silêncio e confiança?',
          ],
        },
        {
          prompt: t(
            'O Advento nos convida a um despertar espiritual. Assim como o lavrador espera a chuva, somos chamados a esperar o Senhor com paciência ativa.',
          ),
          questions: [
            'Que "ruídos" precisam ser silenciados para que você ouça a voz de Deus neste Advento?',
            'A sua espera por Deus tem sido ativa (preparação) ou passiva (simplesmente aguardar)?',
            'O que a expectativa da volta de Cristo muda na forma como você vive hoje?',
          ],
        },
      ],
      2: [
        {
          prompt: t(
            'João Batista pregava arrependimento no deserto. O deserto é o lugar onde não há distrações, apenas a verdade nua e crua sobre nós mesmos.',
          ),
          questions: [
            'Que "vales" precisam ser elevados na sua vida — áreas de desânimo ou baixa autoestima que precisam da verdade de Deus?',
            'Que "montanhas" de orgulho ou auto-suficiência precisam ser humilhadas diante do Senhor?',
            'Como você pode praticar o arrependimento não como culpa, mas como libertação?',
          ],
        },
      ],
      3: [
        {
          prompt: t(
            'A alegria cristã é fruto do Espírito, não do acaso. Ela coexiste com a dor, mas não se rende a ela.',
          ),
          questions: [
            'O que tem roubado a sua alegria, e como você pode entregar isso ao Senhor?',
            'A sua alegria depende das circunstâncias ou da presença de Deus?',
            'Como você pode ser instrumento de alegria para alguém hoje?',
          ],
        },
      ],
      4: [
        {
          prompt: t(
            'Maria nos mostra que dizer sim a Deus é um ato de coragem e fé. Ela sabia que o preço seria alto, mas confiou.',
          ),
          questions: [
            'O que você precisa dizer "sim" a Deus hoje, mesmo que o custo seja alto?',
            'A sua fé resiste quando você não tem todas as respostas?',
            'Como você pode "carregar Cristo" para as pessoas ao seu redor neste Natal?',
          ],
        },
      ],
    },
  },

  christmas: {
    prayers: {
      1: [
        {
          title: 'O Natal de Cristo',
          text: t(`Deus conosco, Emanuel, a igreja celebra neste dia o
            mistério mais profundo: o Verbo eterno se fez carne e habitou
            entre nós. O criador do universo tornou-se um bebê frágil. O
            Rei dos reis nasceu numa manjedoura. Como podemos compreender
            tamanho amor? O Eterno entrou no tempo; o Infinito se fez finito;
            o Santo se fez pecado por nós. Enche-nos de admiração e gratidão.
            Que a luz deste Natal brilhe em nossos corações não apenas hoje,
            mas em todos os dias da nossa vida. Amém.`),
        },
        {
          title: 'O Grande Mistério',
          text: t(`Pai de amor, o profeta Isaías anunciou que um menino nos
            nasceu, um filho se nos deu. Maravilha das maravilhas: o governo
            está sobre os ombros do Filho. Neste tempo de Natal, leva-nos
            além das luzes e presentes, ao coração do mistério: Deus se fez
            homem para que o homem pudesse ser elevado a Deus. Que a nossa
            alegria não seja superficial, mas brote da certeza de que não
            estamos sós — Deus está conosco, Deus é por nós, Deus é um de
            nós. Amém.`),
        },
      ],
      2: [
        {
          title: 'Luz para as Nações',
          text: t(`Senhor Jesus, Luz verdadeira que ilumina todo homem,
            dissipa as trevas que ainda habitam em nós. O apóstolo João
            testemunhou: "Vimos a sua glória, glória como do unigênito do
            Pai, cheio de graça e de verdade". Revela a tua glória em
            nossas vidas. Onde há escuridão, que a tua luz resplandeça;
            onde há desespero, que a tua graça abunde; onde há mentira,
            que a tua verdade triunfe. Não permitas que nos acostumemos
            com o milagre da encarnação. Renova a cada dia o nosso assombro
            diante do Deus que se fez carne. Amém.`),
        },
      ],
    },
    meditations: {
      1: [
        {
          prompt: t(
            'Deus poderia ter vindo como um rei poderoso, mas escolheu vir como um bebê vulnerável. Que isso nos revela sobre o caráter de Deus?',
          ),
          questions: [
            'O que a manjedoura nos ensina sobre humildade e poder?',
            'De que maneiras você tem buscado a Deus nos lugares certos (no templo, na rotina religiosa) mas talvez nos modos errados?',
            'Se Deus entrou na história como um bebê, que áreas da sua vida precisam ser "visitadas" por Ele?',
          ],
        },
      ],
      2: [
        {
          prompt: t(
            'O Verbo se fez carne. A Palavra eterna de Deus tornou-se tocável, visível, audível. A comunicação de Deus conosco é pessoal.',
          ),
          questions: [
            'Como você tem "ouvido" a Palavra de Deus — apenas com os ouvidos ou com todo o seu ser?',
            'Se Jesus é a Palavra viva, como isso muda a forma como você lê as Escrituras?',
            'O que significa para você que Deus quis ser "tocável" através de Cristo?',
          ],
        },
      ],
    },
  },

  epiphany: {
    prayers: {
      1: [
        {
          title: 'Revelado às Nações',
          text: t(`Senhor Deus, a estrela guiou os magos do Oriente para
            adorarem o Rei dos judeus. Hoje vemos que a tua salvação não
            é para um povo apenas, mas para todas as nações, línguas e
            culturas. Alarga o nosso coração para amar o próximo, seja
            ele quem for. Quebra as barreiras do preconceito que nos
            separam. Assim como recebeste os magos estrangeiros, faze-nos
            acolhedores da diversidade do teu reino. E, como eles, que
            possamos voltar para casa por outro caminho — transformados
            pelo encontro contigo. Amém.`),
        },
      ],
      2: [
        {
          title: 'Chamados para Seguir',
          text: t(`Jesus, Mestre e Senhor, no teu batismo o Pai te proclamou
            Filho amado. No início do teu ministério, chamaste discípulos
            para te seguir. Hoje ouço o mesmo convite: "Vem e segue-me".
            Dá-me coragem para deixar as redes da segurança e confiar no
            teu chamado. Não permitas que o medo do desconhecido me paralise.
            Se o caminho for estreito, que a tua graça me sustente. Se a
            jornada for longa, que a tua presença me anime. Amém.`),
        },
      ],
      3: [
        {
          title: 'As Bodas da Alegria',
          text: t(`Senhor Jesus, o teu primeiro sinal em Caná nos mostrou
            que tu és o Deus da alegria abundante. Transformaste água em
            vinho, o comum em extraordinário. Hoje te peço: transforma a
            água sem graça da minha rotina no vinho novo da tua presença.
            Onde falta amor, derrama o teu vinho novo. Onde falta esperança,
            renova a alegria da salvação. Que a tua glória se manifeste
            nas pequenas coisas do dia a dia. Amém.`),
        },
      ],
      4: [
        {
          title: 'A Sabedoria do Reino',
          text: t(`Deus de todo conhecimento, o teu Filho ensinava com
            autoridade, não como os escribas. A sua palavra penetrava os
            corações. Dá-nos fome e sede da tua sabedoria. Ensina-nos a
            ouvir com o coração aberto, a aprender com humildade e a
            viver conforme a tua verdade. Afasta o orgulho que nos impede
            de aprender e a preguiça que nos afasta do estudo da tua
            Palavra. Que sejamos não apenas ouvintes, mas praticantes da
            tua vontade. Amém.`),
        },
      ],
      5: [
        {
          title: 'Pescadores de Homens',
          text: t(`Senhor, tu chamaste pescadores simples para serem
            pescadores de homens. Não escolheste os sábios segundo o
            mundo, mas os humildes para confundir os fortes. Olha para
            nós, tão limitados e imperfeitos, e ainda assim dize:
            "Não temas; de agora em diante serás pescador de homens".
            Usa os nossos dons, mesmo os pequenos, para a tua glória.
            Usa as nossas fraquezas, que elas revelem o teu poder.
            Faze de nós instrumentos do teu amor. Amém.`),
        },
      ],
      6: [
        {
          title: 'Bem-Aventuranças',
          text: t(`Jesus, Mestre do Reino, tu nos ensinaste que o caminho
            da felicidade verdadeira não é o que o mundo proclama.
            Bem-aventurados os pobres de espírito, os mansos, os
            misericordiosos, os puros de coração. Dá-nos um coração segundo
            o teu Reino. Que busquemos não o que o mundo chama de sucesso,
            mas o que tu chamas de bem-aventurança. Forma em nós o caráter
            de Cristo, para que sejamos sal da terra e luz do mundo.
            Amém.`),
        },
      ],
      7: [
        {
          title: 'A Medida do Amor',
          text: t(`Senhor Jesus, tu nos deste o mandamento novo: amai-vos
            uns aos outros como eu vos amei. Não um amor qualquer, mas um
            amor que perdoa, que serve, que se doa. Perdoa-nos quando
            amamos com medidas mesquinhas. Amplia em nós a capacidade de
            amar como tu amaste. Que o nosso amor não seja de palavras
            apenas, mas de atitudes concretas. Que amemos até mesmo os
            que não nos amam, pois assim somos filhos do Pai que está
            nos céus. Amém.`),
        },
      ],
      8: [
        {
          title: 'Frutos do Reino',
          text: t(`Senhor, o profeta disse que seríamos como árvore plantada
            junto a ribeiros de águas, que dá fruto no tempo certo. Examina
            o solo do meu coração. Arranca as pedras da dureza e os espinhos
            das preocupações mundanas. Prepara a terra para receber a tua
            Palavra com frutificação. Produz em mim o fruto do Espírito:
            amor, alegria, paz, paciência, benignidade, bondade, fidelidade,
            mansidão e domínio próprio. Que a minha vida glorifique o teu
            nome. Amém.`),
        },
      ],
      9: [
        {
          title: 'A Transfiguração',
          text: t(`Pai glorioso, no monte da transfiguração revelaste a
            glória do teu Filho a Pedro, Tiago e João. Dá-nos vislumbres
            da tua glória em meio às lutas da vida. Não para que fujamos
            do mundo, mas para que sejamos fortalecidos para servir.
            Mostra-nos a glória que nos espera, para que a caminhada
            presente não nos desanime. Que, como Pedro, possamos dizer:
            "Senhor, bom é estarmos aqui." Amém.`),
        },
      ],
    },
    meditations: {
      1: [
        {
          prompt: t(
            'Os magos viajaram de longe guiados por uma estrela. Buscaram, encontraram, adoraram e partiram transformados.',
          ),
          questions: [
            'O que você está disposto a deixar para trás para buscar a Cristo de todo coração?',
            'A estrela que guia sua vida — é a Palavra de Deus ou suas próprias ambições?',
            'Que "presentes" você pode oferecer a Cristo hoje — ouro (seu talento), incenso (sua adoração), mirra (seu sacrifício)?',
          ],
        },
      ],
      2: [
        {
          prompt: t(
            'Jesus escolheu pessoas comuns para uma missão extraordinária. O chamado de Deus não depende da nossa capacidade, mas da nossa disponibilidade.',
          ),
          questions: [
            'O que está segurando você — que "redes" precisa largar para seguir Jesus mais de perto?',
            'Deus vê potencial onde você só vê limitação. O que Ele pode estar vendo em você que você não vê?',
            'Qual passo de obediência você tem adiado por medo?',
          ],
        },
      ],
      4: [
        {
          prompt: t(
            'A palavra de Jesus tinha autoridade porque Ele vivia o que pregava. A autoridade espiritual nasce da intimidade com Deus, não do conhecimento intelectual.',
          ),
          questions: [
            'As pessoas veem autoridade na sua vida espiritual ou apenas opiniões?',
            'O que é mais importante para você: ter razão ou ter um coração alinhado com Deus?',
            'Em que área da sua vida você precisa ouvir Jesus dizer "segue-me" e realmente ir?',
          ],
        },
      ],
      8: [
        {
          prompt: t(
            'A parábola do semeador nos mostra que a mesma semente produz resultados diferentes dependendo do solo do coração.',
          ),
          questions: [
            'Como está o solo do seu coração hoje — à beira do caminho, pedregoso, espinhoso ou boa terra?',
            'O que está sufocando a Palavra na sua vida: ansiedades, riquezas, prazeres?',
            'Que fruto você deseja que Deus produza em você nesta estação?',
          ],
        },
      ],
    },
  },

  lent: {
    prayers: {
      1: [
        {
          title: 'O Deserto como Escola',
          text: t(`Senhor Jesus, assim como foste levado pelo Espírito ao
            deserto para ser tentado, nós entramos neste tempo de Quaresma
            para enfrentar a verdade sobre nós mesmos. O deserto não é
            castigo, mas escola. Nele aprendemos que não só de pão vive
            o homem, mas de toda palavra que sai da boca de Deus. Dá-nos
            força para vencer as tentações — não com nossas próprias forças,
            mas confiando na tua Palavra. Ensina-nos a depender de ti, a
            jejuar não apenas de alimentos, mas de tudo que nos afasta de
            ti. Amém.`),
        },
        {
          title: 'Cinzas e Graça',
          text: t(`Deus eterno, as cinzas que marcam o início da Quaresma
            nos lembram: "Lembra-te de que és pó e ao pó voltarás".
            Diante dessa verdade, rendemo-nos. Nossos dias são contados,
            nossa vida é breve. Ensina-nos a contar os nossos dias para
            que alcancemos coração sábio. Não vivemos para acumular tesouros
            na terra, onde a traça e a ferrugem corroem. Eleva os nossos
            olhos para as realidades eternas. Concede-nos um coração
            quebrantado e contrito, que tu não desprezarás. Amém.`),
        },
      ],
      2: [
        {
          title: 'A Fé que Transpõe Montanhas',
          text: t(`Deus da aliança, tu chamaste Abraão para uma jornada
            de fé sem mapa, sem garantias além da tua promessa. Nesta
            segunda semana da Quaresma, fortalece a nossa fé. Tira os
            nossos olhos das circunstâncias e fixa-os em ti, autor e
            consumador da nossa fé. Quando as dúvidas surgirem, lembra-nos
            da tua fidelidade no passado. Quando o medo apertar, segura-nos
            pela mão e dize: "Não temas, eu sou contigo". Aumenta a nossa
            fé. Amém.`),
        },
      ],
      3: [
        {
          title: 'Água Viva',
          text: t(`Jesus, fonte de água viva, tu encontraste a mulher
            samaritana no poço e lhe ofereceste uma água que mata a sede
            para sempre. Hoje vens ao nosso encontro no poço da nossa
            rotina, conhecendo cada detalhe da nossa vida. Dá-nos dessa
            água viva. A nossa alma tem sede de Deus, do Deus vivo.
            Perdoa-nos por tentarmos saciar a sede da alma com as cisternas
            rotas deste mundo. Renova em nós o desejo sincero de ti.
            Que te busquemos não pelo que podes dar, mas por quem tu és.
            Amém.`),
        },
      ],
      4: [
        {
          title: 'Verdadeira Adoração',
          text: t(`Pai de amor, o apóstolo nos lembra que "Deus nos amou
            primeiro". Não é o nosso amor que nos salva, mas o teu amor
            derramado em nossos corações pelo Espírito Santo. Ajuda-nos
            a descansar neste amor incondicional. Não precisamos merecer
            o teu amor; ele já nos foi dado em Cristo. Liberta-nos da
            escravidão de tentar ser "bons o suficiente" e leva-nos a
            viver pela graça. Que a tua bondade nos conduza ao
            arrependimento e a tua misericórdia nos transforme. Amém.`),
        },
      ],
      5: [
        {
          title: 'Ressuscita-nos, Senhor',
          text: t(`Senhor, como Lázaro foi chamado do túmulo pela tua voz,
            clama sobre as áreas mortas da nossa vida. Onde o pecado
            endureceu o coração, traze vida. Onde o desânimo esfriou o
            amor, reacende o fogo. Onde a morte espiritual se instalou,
            sopra o teu Espírito vivificante. A Quaresma não é apenas
            sobre nossa morte para o pecado, mas sobre a vida nova que
            tu ofereces. Tira a pedra do sepulcro, desata as faixas que
            nos prendem e liberta-nos para viver em plenitude. Amém.`),
        },
      ],
      6: [
        {
          title: 'O Rei Humilde',
          text: t(`Jesus, Rei da paz, entraste em Jerusalém montado num
            jumentinho, não num cavalo de guerra. A multidão gritava
            "Hosana!", mas poucos entenderam o que teu reino significa.
            Dá-nos olhos para ver o Rei na sua humildade. Ensina-nos que
            a verdadeira grandeza está em servir, não em ser servido. Nesta
            Semana Santa, caminha conosco. Deixa-nos sentir a profundidade
            do teu amor na cruz, para que possamos experimentar o poder
            da tua ressurreição. Amém.`),
        },
        {
          title: 'Sexta-Feira Santa',
          text: t(`Cristo crucificado, diante da tua cruz silenciamos.
            Não há palavras que possam expressar a profundidade deste amor.
            Os nossos pecatos cravados em tuas mãos. A nossa culpa
            sepultada contigo. O véu rasgado, o acesso aberto. Hoje
            contemplamos o amor mais radical da história: o Criador
            morrendo pela criatura. O Justo pelos injustos. O Santo
            feito pecado por nós. Que nunca nos acostumemos com a cruz.
            Que ela seja sempre o centro da nossa fé. Amém.`),
        },
      ],
    },
    meditations: {
      1: [
        {
          prompt: t(
            'O jejum que Deus escolhe não é apenas de alimentos, mas de todo hábito que nos afasta dEle. O deserto revela o que realmente está no nosso coração.',
          ),
          questions: [
            'O que você sente falta quando tenta se afastar? Isso revela um vício ou um ídolo?',
            'O deserto revelou que Jesus dependia completamente do Pai. Do que você depende mais do que de Deus?',
            'Que "jejum" — de redes sociais, de reclamação, de pressa — você poderia praticar nesta Quaresma?',
          ],
        },
      ],
      2: [
        {
          prompt: t(
            'Abraão creu contra toda esperança. A fé não é a ausência de dúvida, mas a decisão de confiar mesmo quando não vemos.',
          ),
          questions: [
            'Em que área da sua vida você está "vendo" mais do que "crendo"?',
            'O que Deus prometeu que ainda não se cumpriu na sua vida? Você ainda confia?',
            'Qual passo de fé você precisa dar hoje, mesmo sem ver o resultado?',
          ],
        },
      ],
      3: [
        {
          prompt: t(
            'A mulher samaritana teve sua vida exposta por Jesus, e em vez de condenação, encontrou graça. A verdadeira adoração nasce da transparência.',
          ),
          questions: [
            'O que você esconde de Deus que acha que Ele já não sabe?',
            'De que "cântaro" você precisa se desfazer para receber a água viva que Jesus oferece?',
            'O que significa para você adorar "em espírito e em verdade"?',
          ],
        },
      ],
      4: [
        {
          prompt: t(
            'O filho pródigo achou que merecia o castigo, mas o pai lhe deu festa. O amor de Deus não é merecido, é recebido.',
          ),
          questions: [
            'Você tem vivido como filho ou como empregado na casa do Pai?',
            'Que mágoas ou ressentimentos te impedem de celebrar a graça de Deus?',
            'O que significa para você que o Pai correu para abraçar o filho antes mesmo dele pedir perdão?',
          ],
        },
      ],
      5: [
        {
          prompt: t(
            '"Lázaro, vem para fora!" A voz que chamou Lázaro do túmulo é a mesma que nos chama hoje para uma vida nova.',
          ),
          questions: [
            'Que áreas "mortas" na sua vida precisam ouvir a voz de Jesus hoje?',
            'As faixas que prendiam Lázaro foram soltas pela comunidade. Que laços você precisa da ajuda de irmãos para desatar?',
            'O que te impede de experimentar a vida abundante que Jesus promete?',
          ],
        },
      ],
      6: [
        {
          prompt: t(
            'A entrada triunfal foi recebida com hosanas, mas os mesmos que aclamaram depois gritaram "Crucifica-o". O coração humano é instável, mas o amor de Deus não.',
          ),
          questions: [
            'Em que momentos você troca a aclamação pela traição no seu coração?',
            'O que a humildade de Jesus montado num jumentinho te ensina sobre poder e grandeza?',
            'Como você pode seguir o Rei humilde no seu dia a dia — servindo em vez de exigindo?',
          ],
        },
      ],
    },
  },

  easter: {
    prayers: {
      1: [
        {
          title: 'Cristo Ressuscitou!',
          text: t(`Aleluia! Cristo ressuscitou! O túmulo está vazio. A morte
            foi vencida. O cordeiro que foi imolado vive para sempre. Neste
            domingo da ressurreição, enche-nos da alegria pascal. Não uma
            alegria superficial, mas a certeza de que a última palavra não
            é do sofrimento, nem da injustiça, nem da morte — a última
            palavra é de Deus, e essa palavra é VIDA. Renova em nós a
            esperança da ressurreição. Porque Ele vive, podemos enfrentar
            o amanhã. Porque Ele vive, o mal não tem a palavra final.
            Cristo ressuscitou! Aleluia! Amém.`),
        },
      ],
      2: [
        {
          title: 'A Fé que Toca',
          text: t(`Jesus ressurreto, tu apareceste aos discípulos e sopraste
            sobre eles o Espírito Santo. Tomé precisou tocar para crer.
            Tu não o rejeitaste, mas o convidaste: "Põe o teu dedo aqui".
            Ajuda-nos na nossa incredulidade. Quando duvidarmos, vem ao
            nosso encontro. Quando não conseguirmos ver, revela-te. Tu
            és o mesmo Senhor que se fez presente no cenáculo com as
            portas trancadas — atravessa as portas trancadas do nosso
            coração e renova a nossa fé. Amém.`),
        },
      ],
      3: [
        {
          title: 'O Caminho de Emaús',
          text: t(`Senhor Jesus, assim como caminhaste ao lado dos
            discípulos de Emaús sem que eles te reconhecessem, caminha
            ao nosso lado nas estradas da vida. Muitas vezes estamos
            cegos pela tristeza, pelo medo, pela desilusão. Abre os nossos
            olhos para te reconhecer no partir do pão. Aquece os nossos
            corações enquanto falas conosco pelas Escrituras. Que a nossa
            comunhão contigo nos transforme de espectadores tristes em
            testemunhas alegres. Amém.`),
        },
      ],
      4: [
        {
          title: 'O Bom Pastor',
          text: t(`Jesus, Bom Pastor, tu conheces cada uma das tuas ovelhas
            pelo nome. Conheces as nossas lutas, medos e alegrias. Nós
            conhecemos a tua voz e te seguimos. Guia-nos por pastos
            verdejantes e águas tranquilas. Quando passarmos pelo vale
            da sombra da morte, não temeremos, porque tu estás conosco.
            Guarda-nos de seguir vozes estranhas que nos desviam do teu
            caminho. Em ti não nos faltará nada. Amém.`),
        },
      ],
      5: [
        {
          title: 'A Videira Verdadeira',
          text: t(`Senhor Jesus, tu és a videira verdadeira e nós somos
            os ramos. Sem ti nada podemos fazer. Perdoa-nos quando
            tentamos dar fruto por nossa própria força, apenas para
            murchar e cair. Mantém-nos ligados a ti pela oração e pela
            Palavra. O Pai, o agricultor, poda os ramos para que deem
            mais fruto — aceitamos a poda, mesmo quando dói, confiando
            que ela produzirá frutos de justiça. Que a seiva do teu
            Espírito corra em nós e produza fruto que permaneça. Amém.`),
        },
      ],
      6: [
        {
          title: 'A Promessa do Consolador',
          text: t(`Senhor Jesus, antes de voltares ao Pai, prometeste não
            nos deixar órfãos. Enviaste o Espírito Santo, o Consolador,
            para estar conosco para sempre. Agradecemos pela presença
            constante do Espírito em nossas vidas. Ele nos guia a toda
            verdade, nos lembra das tuas palavras, intercede por nós com
            gemidos inexprimíveis. Renova em nós hoje a consciência de
            que não estamos sós — o próprio Deus habita em nós pelo
            Espírito. Amém.`),
        },
      ],
      7: [
        {
          title: 'Ascensão e Missão',
          text: t(`Senhor exaltado, tu foste elevado ao céu e estás
            assentado à direita do Pai. Deste-nos a Grande Comissão:
            "Ide por todo mundo e pregai o evangelho a toda criatura".
            Enche-nos do poder do Espírito Santo para sermos tuas
            testemunhas. Não apenas com palavras, mas com vidas
            transformadas. Até que voltes, somos os teus embaixadores
            neste mundo. Usa-nos para levar a tua luz onde há trevas,
            a tua paz onde há conflito, o teu amor onde há ódio. Maranata!
            Vem, Senhor Jesus! Amém.`),
        },
      ],
    },
    meditations: {
      1: [
        {
          prompt: t(
            'O túmulo vazio é o evento que separa o cristianismo de todas as outras religiões. Deus fez o que nenhum ser humano poderia fazer.',
          ),
          questions: [
            'Se a ressurreição é verdade — e ela é — que implicações isso tem para o seu medo da morte?',
            'De que maneiras você precisa experimentar a "ressurreição" hoje — em relacionamentos, esperanças, sonhos?',
            'A ressurreição não é apenas um evento passado, mas uma realidade presente. Como você pode viver na luz da ressurreição hoje?',
          ],
        },
      ],
      2: [
        {
          prompt: t(
            'Tomé duvidou, e Jesus não o rejeitou. Ele o convidou a tocar. A dúvida honesta é bem-vinda na presença de Cristo.',
          ),
          questions: [
            'Qual a diferença entre dúvida honesta e incredulidade teimosa?',
            'Do que você precisa ter certeza para crer mais profundamente?',
            'Jesus apareceu apesar das portas trancadas — que "portas" você tem mantido trancadas que precisam da presença dEle?',
          ],
        },
      ],
      3: [
        {
          prompt: t(
            'Os discípulos de Emaús estavam voltando para casa desiludidos. Não sabiam que a resposta para sua tristeza caminhava ao lado deles.',
          ),
          questions: [
            'Em que área da sua vida você está "voltando para Emaús" — decepcionado, desistindo, desanimado?',
            'O que precisa "arder" no seu coração para que você reconheça Jesus ao seu lado?',
            'Quem precisa ouvir de você a boa notícia: "O Senhor ressuscitou verdadeiramente"?',
          ],
        },
      ],
      4: [
        {
          prompt: t(
            'O Bom Pastor conhece suas ovelhas pelo nome. Em um mundo de massas e números, você é conhecido pessoalmente pelo Criador.',
          ),
          questions: [
            'O que significa para você ser conhecido pelo nome pelo Criador do universo?',
            'Você tem reconhecido a voz do Pastor no meio do barulho do mundo?',
            'Em que área você precisa confiar mais na liderança do Bom Pastor?',
          ],
        },
      ],
      6: [
        {
          prompt: t(
            'Jesus não nos deixou órfãos. O Espírito Santo é a presença contínua de Deus conosco. Não estamos sozinhos.',
          ),
          questions: [
            'Você tem vivido como órfão ou como filho amado que tem o Espírito habitando em você?',
            'Como você pode estar mais atento à voz do Espírito no seu dia a dia?',
            'O que muda na sua vida sabendo que o próprio Deus intercede por você com gemidos inexprimíveis?',
          ],
        },
      ],
    },
  },

  pentecost: {
    prayers: {
      1: [
        {
          title: 'Vem, Espírito Santo',
          text: t(`Espírito Santo de Deus, desce sobre nós como desces-te
            sobre os apóstolos no cenáculo. Enche-nos do teu fogo divino
            — não um fogo que destrói, mas que purifica, ilumina e aquece.
            Abre os nossos lábios para proclamar as maravilhas de Deus
            com ousadia. Quebra as barreiras de línguas e culturas que
            nos separam. Une-nos num só corpo, um só Espírito, uma só
            esperança. O mundo precisa ver uma igreja cheia do Espírito
            — corajosa, amorosa, missionária. Faze de nós essa igreja.
            Vem, Espírito Santo! Amém.`),
        },
      ],
    },
    meditations: {
      1: [
        {
          prompt: t(
            'Pentecostes inverte Babel. No princípio, a confusão das línguas espalhou a humanidade. No Espírito, as línguas se abrem para unir.',
          ),
          questions: [
            'O que impede a unidade no corpo de Cristo hoje — e como você pode ser um instrumento de reconciliação?',
            'O fogo do Espírito purifica, ilumina e aquece. Qual dessas obras você mais precisa hoje?',
            'A igreja primária saiu do cenáculo para transformar o mundo. Que "cenáculo" você precisa deixar para cumprir sua missão?',
          ],
        },
      ],
    },
  },

  ordinary: {
    prayers: {
      2: [
        {
          title: 'Viver pela Fé',
          text: t(`Senhor Deus, o justo viverá pela fé. Ensina-nos a
            confiar em ti nas pequenas coisas do dia a dia, não apenas
            nos grandes momentos. No ordinário da vida, revela o
            extraordinário do teu amor. A nossa fé não é um salto no
            escuro, mas uma caminhada na luz da tua Palavra. Fortalece-nos
            quando o cansaço da rotina ameaçar apagar a chama. Renova em
            nós a convicção de que cada dia é um presente teu. Amém.`),
        },
      ],
      3: [
        {
          title: 'O Deus que Vê',
          text: t(`El Roi, Deus que me vê, tu conheces cada detalhe da
            minha vida — as alegrias escondidas, as dores silenciosas,
            os sonhos adormecidos. Muitas vezes me sinto invisível num
            mundo que corre sem olhar para os lados. Mas tu me vês. Não
            apenas me vês, mas te importas. Não apenas te importas, mas
            ages. Ajuda-me a viver hoje consciente de que estou sempre
            diante de ti. Que essa consciência não me traga medo, mas
            segurança: estou nos teus olhos, estou no teu cuidado. Amém.`),
        },
      ],
      4: [
        {
          title: 'Paciência na Espera',
          text: t(`Senhor, a vida muitas vezes é uma escola de espera.
            Esperamos por respostas, por curas, por mudanças. A espera
            pode gerar ansiedade ou fé. Ensina-nos a esperar em ti com
            paciência e confiança. Abraão esperou, Sara esperou, José
            esperou — e tu foste fiel. Não porque nós somos pacientes,
            mas porque tu és fiel às tuas promessas. Concede-nos a
            serenidade de saber que o teu tempo é perfeito, mesmo quando
            não compreendemos. Amém.`),
        },
      ],
      5: [
        {
          title: 'Gratidão em Tudo',
          text: t(`Pai bondoso, o apóstolo nos ensina a dar graças em
            todas as circunstâncias. Não é fácil agradecer quando a vida
            aperta, mas é possível quando confiamos que tu estás no
            controle. Ajuda-nos a cultivar um coração grato. Que não
            tomemos os pequenos milagres como garantidos: o sol que
            nasce, o ar que respiramos, o pão que partimos. A gratidão
            nos liberta do orgulho e nos aproxima de ti. Faze de nós
            pessoas que agradecem antes de pedir. Amém.`),
        },
      ],
      6: [
        {
          title: 'O Cuidado de Deus',
          text: t(`Senhor, tu vestes os lírios do campo e alimentas as
            aves do céu. Tu sabes do que precisamos antes mesmo que
            peçamos. Perdoa a nossa ansiedade, essa mania de querer
            controlar o futuro. Ensina-nos a confiar na tua providência
            diária. Não nos preocupemos com o dia de amanhã, pois cada
            dia tem os seus desafios e a sua graça. Ajuda-nos a buscar
            primeiro o teu Reino e a tua justiça, confiando que tudo
            mais nos será acrescentado. Amém.`),
        },
      ],
      7: [
        {
          title: 'Amor ao Próximo',
          text: t(`Jesus, tu nos deste o mandamento de amar o próximo
            como a nós mesmos. Não é um sentimento, mas uma decisão.
            Ajuda-nos a ver o próximo com os teus olhos. O cansado, o
            irritante, o diferente — todos são amados por ti. Dá-nos
            paciência com o idoso, compaixão pelo necessitado, perdão
            para o ofensor, acolhimento para o estranho. Que sejamos
            conhecidos não por nossos discursos, mas pelo nosso amor.
            Amém.`),
        },
      ],
      8: [
        {
          title: 'Humildade e Serviço',
          text: t(`Senhor Jesus, que lavaste os pés dos discípulos, lava
            os pés da nossa arrogância. Numa cultura que exalta o
            sucesso, o poder e a autopromoção, tu nos chamas ao serviço
            humilde. O maior no teu Reino é aquele que serve. Dá-nos
            um coração de servo. Não busquemos reconhecimento, mas
            fidelidade. Não almejemos posições, mas utilidade. Que a
            nossa grandeza seja medida pelo nosso amor. Amém.`),
        },
      ],
      9: [
        {
          title: 'Sabedoria do Alto',
          text: t(`Deus de toda sabedoria, Salomão pediu discernimento
            para governar o teu povo. Nós também precisamos de sabedoria
            para as decisões da vida. Dá-nos a sabedoria que vem do alto:
            pura, pacífica, moderada, cheia de misericórdia e de bons
            frutos. Ensina-nos a temer a ti, que é o princípio da
            sabedoria. Que não confiemos na nossa própria inteligência,
            mas te busquemos em todos os nossos caminhos. Amém.`),
        },
      ],
      10: [
        {
          title: 'A Fidelidade de Deus',
          text: t(`Senhor, a tua fidelidade alcança até as nuvens. Geração
            após geração, tu tens sido o mesmo. Quando somos infiéis, tu
            permaneces fiel. Quando duvidamos, tu não nos abandonas. A
            nossa vida é marcada por altos e baixos, mas o teu amor é
            constante. Hoje olhamos para a nossa história e vemos a tua
            mão. Em cada estação, em cada desafio, tu estiveste lá.
            Ajuda-nos a confiar que continuarás fiel até o fim. Amém.`),
        },
      ],
      11: [
        {
          title: 'Perdão e Reconciliação',
          text: t(`Pai de misericórdia, assim como Cristo nos perdoou,
            somos chamados a perdoar. Sabemos que o perdão não é um
            sentimento, mas uma decisão. Muitas vezes é um processo
            doloroso. Dá-nos a graça de perdoar como fomos perdoados.
            Liberta-nos das correntes do ressentimento. Ajuda-nos a
            buscar reconciliação onde há conflito. E quando não for
            possível, dá-nos paz para entregar a justiça em tuas mãos.
            Amém.`),
        },
      ],
      12: [
        {
          title: 'Perseverança na Fé',
          text: t(`Deus eterno, a corrida cristã não é um sprint, mas
            uma maratona. Há dias em que o cansaço pesa e a vontade de
            desistir aperta. Nesses momentos, lembra-nos da nuvem de
            testemunhas que nos rodeia. Olhamos para Jesus, autor e
            consumador da nossa fé, que pela alegria que lhe estava
            proposta suportou a cruz. Renova as nossas forças. Faze-nos
            perseverar até o fim, confiantes de que aquele que começou
            a boa obra em nós há de completá-la. Amém.`),
        },
      ],
      13: [
        {
          title: 'Orações que Alcançam o Céu',
          text: t(`Senhor, ouve a nossa oração. A oração do justo pode
            muito em seus efeitos. Elias orou e não choveu; orou outra
            vez e o céu deu chuva. Ensina-nos a orar com fé e persistência.
            Não porque tu precisas ser convencido, mas porque a oração
            nos transforma, nos alinha com a tua vontade e nos aproxima
            de ti. Que a nossa vida seja uma oração contínua. Que cada
            respiração seja um louvor, cada desafio uma súplica, cada
            bênção uma ação de graças. Amém.`),
        },
      ],
      14: [
        {
          title: 'O Banquete do Reino',
          text: t(`Senhor Jesus, tu falaste do Reino de Deus como um
            banquete para o qual todos são convidados. Os pobres, os
            coxos, os cegos, os marginalizados — todos têm lugar à tua
            mesa. Perdoa-nos quando fechamos as portas do nosso coração
            ou da nossa comunidade a quem é diferente. Alarga o nosso
            entendimento do teu Reino. Que celebremos a diversidade como
            um reflexo da tua criatividade. Todos são bem-vindos à mesa
            do Senhor. Amém.`),
        },
      ],
      15: [
        {
          title: 'A Rocha Inabalável',
          text: t(`Deus, minha Rocha, em tempos de incerteza tu és a
            nossa segurança. O mundo muda, as circunstâncias mudam, as
            pessoas mudam, mas tu és o mesmo. Quando os fundamentos são
            abalados, tu és o nosso alicerce. Ajuda-nos a construir a
            nossa vida sobre a rocha da tua Palavra. Que a chuva, os
            ventos e as inundações não nos derrubem, porque estamos
            firmados em ti. Em ti encontramos refúgio e fortaleza,
            socorro bem presente na angústia. Amém.`),
        },
      ],
      16: [
        {
          title: 'O Cuidado com os Pequeninos',
          text: t(`Jesus, que disseste: "Deixai vir a mim os pequeninos",
            ajuda-nos a valorizar o que o mundo despreza. As crianças,
            os pobres, os vulneráveis — estes são importantes para ti.
            Dá-nos olhos para ver o teu rosto nos que sofrem e mãos
            para estender ajuda. Que não amemos apenas de palavra, mas
            de fato e de verdade. Usa os nossos recursos, tempo e
            talentos para abençoar os que menos têm. Amém.`),
        },
      ],
      17: [
        {
          title: 'Vigilância Espiritual',
          text: t(`Senhor, vigiai e orai para não cairdes em tentação.
            O espírito está pronto, mas a carne é fraca. Sabemos das
            nossas fraquezas e das ciladas do inimigo. Reveste-nos de
            toda a armadura de Deus para que possamos resistir no dia
            mal. Cinge-nos com a verdade, veste-nos com a justiça,
            calça-nos com o evangelho da paz, empunha o escudo da fé,
            capaceta-nos com a salvação e dá-nos a espada do Espírito,
            que é a tua Palavra. Não nos deixes cair em tentação, mas
            livra-nos do mal. Amém.`),
        },
      ],
      18: [
        {
          title: 'Contentamento em Cristo',
          text: t(`Pai, o apóstolo Paulo aprendeu a viver contente em
            toda situação: na fartura e na fome, na abundância e na
            necessidade. Ensina-nos o segredo do contentamento —
            encontrar em ti a suficiência para cada dia. Livra-nos da
            ganância que nunca se satisfaz e da comparação que envenena
            a alma. Ajuda-nos a confiar que tu suprirás cada uma das
            nossas necessidades segundo as tuas riquezas em glória. Em
            ti temos tudo. Amém.`),
        },
      ],
      19: [
        {
          title: 'Unidade do Corpo',
          text: t(`Senhor Jesus, na noite antes da cruz, oraste para
            que todos fossem um, assim como tu e o Pai são um. Dói-nos
            ver o teu corpo dividido. Perdoa as nossas divisões, os
            nossos partidarismos, os nossos julgamentos uns dos outros.
            Ajuda-nos a lembrar que não somos nós o centro, mas Cristo.
            Onde há divisão, planta unidade; onde há frieza, aquece o
            amor; onde há rivalidade, estabelece a humildade. Faz de
            nós um só corpo, um só Espírito. Amém.`),
        },
      ],
      20: [
        {
          title: 'O Senhor Proverá',
          text: t(`Yahweh Yireh, o Deus que provê, Abraão experimentou
            a tua provisão no monte Moriá. No momento mais difícil,
            quando tudo parecia perdido, tu providenciaste o cordeiro.
            Confiamos que tu proverás — não sempre o que queremos, mas
            sempre o que precisamos. Proverás força na fraqueza, paz
            na tormenta, direção na dúvida. Proverás a saída na tentação.
            Proverás o suficiente para cada dia. Em ti confiamos. Amém.`),
        },
      ],
      21: [
        {
          title: 'Esperança que Não Desaponta',
          text: t(`Deus de esperança, Paulo escreveu que a tribulação
            produz perseverança, a perseverança produz caráter, e o
            caráter produz esperança. E a esperança não nos desaponta,
            porque o teu amor foi derramado em nossos corações pelo
            Espírito. Nos momentos de dor, quando tudo parece sem
            sentido, segura-nos. A nossa esperança não está nas
            circunstâncias, mas em ti. Sabemos que todas as coisas
            cooperam para o bem daqueles que te amam. Amém.`),
        },
      ],
      22: [
        {
          title: 'Viver pela Graça',
          text: t(`Pai de graça, somos salvos pela graça, por meio da
            fé, e isso não vem de nós — é dom teu. Ajuda-nos a viver
            cada dia à luz dessa graça. Não por mérito, mas por
            misericórdia. Não por obras, mas por amor. Liberta-nos da
            tentação de merecer o teu favor. Já o temos em Cristo.
            Que a graça não seja apenas a porta de entrada, mas o chão
            que pisamos a cada dia. Que vivamos em gratidão, não em
            desempenho. Amém.`),
        },
      ],
      23: [
        {
          title: 'A Mente de Cristo',
          text: t(`Senhor, Paulo nos exorta a ter a mesma mente que
            houve em Cristo Jesus, que não considerou o ser igual a
            Deus como algo a ser usado em seu próprio benefício, mas
            esvaziou-se a si mesmo. Esvazia-nos do orgulho e enche-nos
            de humildade. Purifica os nossos pensamentos, renova a
            nossa mente. Que os nossos pensamentos sejam verdadeiros,
            nobres, justos, puros, amáveis, de boa fama. Tudo o que
            é virtude e louvor, nisso pensemos. Amém.`),
        },
      ],
      24: [
        {
          title: 'A Certa Vinda do Senhor',
          text: t(`Senhor Jesus, a tua Palavra nos garante que voltarás.
            Não sabemos o dia nem a hora, mas sabemos que virás. Até
            lá, somos chamados a viver em santidade e vigilância. A
            tua vinda é a nossa esperança bendita. Ela nos motiva a
            perseverar, a purificar-nos, a trabalhar na tua vinha.
            Maranata! Vem, Senhor Jesus. Que a tua graça seja conosco
            e que o teu Reino venha. Amém.`),
        },
      ],
      25: [
        {
          title: 'A Fé que Age',
          text: t(`Senhor, Tiago nos ensina que a fé sem obras é morta.
            Não somos salvos pelas obras, mas somos salvos para as
            obras. Ajuda-nos a equilibrar fé e ação. Que a nossa fé
            não seja apenas crença intelectual, mas confiança que se
            traduz em amor concreto. Mostra-nos hoje alguém que precisa
            de uma palavra de ânimo, de uma mão estendida, de uma
            oração sincera. Faze de nós instrumentos da tua paz. Amém.`),
        },
      ],
      26: [
        {
          title: 'Em Tudo Dar Graças',
          text: t(`Deus de toda consolação, em tudo dá graças, pois esta
            é a tua vontade em Cristo Jesus para conosco. A gratidão
            não depende das circunstâncias, mas da confiança em ti.
            Ajuda-nos a enxergar as tuas bênçãos nos dias bons e a
            tua presença nos dias difíceis. Em cada refeição, em cada
            encontro, em cada desafio, que haja um coração grato.
            Cultiva em nós o hábito do louvor, para que a nossa vida
            seja um testemunho da tua bondade. Amém.`),
        },
      ],
      27: [
        {
          title: 'A Armadura de Deus',
          text: t(`Senhor Deus, a nossa luta não é contra carne e sangue,
            mas contra os poderes espirituais do mal. Reveste-nos de
            toda a armadura de Deus para que possamos resistir no dia
            mal e permanecer firmes. Cinge-nos com a verdade, veste-nos
            com a justiça da fé, calça-nos com o evangelho da paz,
            empunha o escudo da fé, capaceta-nos com a salvação e
            dá-nos a espada do Espírito. Acima de tudo, ajuda-nos a
            orar em todo tempo no Espírito. Amém.`),
        },
      ],
      28: [
        {
          title: 'O Deus de Toda Consolação',
          text: t(`Pai de misericórdias, Deus de toda consolação, tu
            nos confortas em todas as nossas tribulações para que
            possamos confortar os outros. Nos momentos de dor, segura
            a nossa mão. Nos vales escuros, acende a tua luz. Usa as
            nossas experiências de superação para ministrar a quem
            está sofrendo. Transforma as nossas cicatrizes em pontes
            de compaixão. Em Cristo, que levou as nossas dores, encontramos
            a força para seguir. Amém.`),
        },
      ],
    },
    meditations: {
      2: [
        {
          prompt: t(
            'O justo viverá pela fé. A fé é a certeza das coisas que se esperam e a convicção dos fatos que não se veem.',
          ),
          questions: [
            'Em que aspecto da sua vida você está vivendo mais pelo que vê do que pelo que crê?',
            'O que a rotina tem feito com a sua fé — anestesiado ou fortalecido?',
            'Que promessa de Deus você precisa agarrar hoje para continuar caminhando?',
          ],
        },
      ],
      3: [
        {
          prompt: t(
            'El Roi — o Deus que me vê. Numa multidão, você não é anônimo para Deus. Ele conhece o seu nome, a sua história, o seu coração.',
          ),
          questions: [
            'Onde você tem buscado validação — em Deus ou nos outros?',
            'Se Deus te vê em cada momento, como isso muda a forma como você vive o seu dia?',
            'Há alguma área da sua vida que você está vivendo como se Deus não estivesse vendo?',
          ],
        },
      ],
      5: [
        {
          prompt: t(
            'Dar graças em todas as circunstâncias não é negar a dor, mas confiar que Deus está presente até nela.',
          ),
          questions: [
            'Pelo que você pode agradecer a Deus hoje — mesmo nas dificuldades?',
            'A sua gratidão é maior quando as coisas vão bem? Como cultivar a gratidão constante?',
            'Quem você pode abençoar hoje com uma palavra de gratidão?',
          ],
        },
      ],
      7: [
        {
          prompt: t(
            'O amor ao próximo não é opcional no Reino de Deus. É o mandamento que resume toda a lei.',
          ),
          questions: [
            'Quem é o "próximo" que Deus colocou no seu caminho hoje?',
            'O amor se demonstra em ações, não em sentimentos. Que atitude concreta de amor você pode tomar hoje?',
            'Há alguém que você precisa perdoar para amar livremente?',
          ],
        },
      ],
      9: [
        {
          prompt: t(
            'A sabedoria que vem do alto é pura, pacífica, moderada, cheia de misericórdia e de bons frutos.',
          ),
          questions: [
            'Como você distingue a sabedoria de Deus da sabedoria do mundo?',
            'Você tem buscado a Deus antes de tomar decisões importantes?',
            'O temor do Senhor é o princípio da sabedoria. O que significa "temer a Deus" no seu dia a dia?',
          ],
        },
      ],
      11: [
        {
          prompt: t(
            'O perdão é um ato de obediência e libertação. Não é esquecer, é entregar a justiça nas mãos de Deus.',
          ),
          questions: [
            'Existe alguém que você precisa perdoar — não por merecimento, mas por obediência a Cristo?',
            'O perdão liberta mais quem perdoa ou quem é perdoado?',
            'Como saber se você realmente perdoou alguém?',
          ],
        },
      ],
      13: [
        {
          prompt: t(
            'A oração do justo pode muito em seus efeitos. Elias era humano como nós, mas orou e foi ouvido.',
          ),
          questions: [
            'A sua vida de oração tem sido consistente ou apenas nos momentos de crise?',
            'Se você pudesse pedir uma coisa a Deus hoje, sem medo de ser egoísta, o que seria?',
            'Como a oração tem mudado você mais do que mudado as suas circunstâncias?',
          ],
        },
      ],
      15: [
        {
          prompt: t(
            'O sábio constrói a casa sobre a rocha. A chuva vem, os ventos sopram, mas a casa não cai.',
          ),
          questions: [
            'Sobre qual fundamento você está construindo a sua vida?',
            'Que tempestades você está enfrentando que estão testando os seus alicerces?',
            'O que precisa mudar na sua fundação espiritual para você resistir às tempestades da vida?',
          ],
        },
      ],
      18: [
        {
          prompt: t(
            'Paulo aprendeu o segredo do contentamento: posso todas as coisas naquele que me fortalece.',
          ),
          questions: [
            'Do que você acha que precisa para ser feliz — e será que realmente precisa?',
            'O contentamento cristão é conformismo ou confiança?',
            'O que você pode fazer hoje para simplificar sua vida e focar no essencial?',
          ],
        },
      ],
      21: [
        {
          prompt: t(
            'A tribulação produz perseverança, a perseverança produz caráter, e o caráter produz esperança.',
          ),
          questions: [
            'Que tribulação você está enfrentando hoje que Deus pode usar para formar caráter em você?',
            'A sua esperança está firmada em Deus ou nas circunstâncias?',
            'Como você pode ser uma fonte de esperança para alguém que está sofrendo?',
          ],
        },
      ],
      24: [
        {
          prompt: t(
            'A vinda do Senhor é a nossa esperança bendita. Vivemos entre o "já" e o "ainda não" do Reino.',
          ),
          questions: [
            'Se Jesus voltasse hoje, estaria satisfeito com a sua vida?',
            'O que precisa mudar na sua vida para você viver mais preparado para a volta de Cristo?',
            'A certeza da volta de Jesus muda a forma como você investe seu tempo e recursos?',
          ],
        },
      ],
    },
  },
};

// ─── Utilitários Litúrgicos ──────────────────────────────────────────

function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function calculateAdventStart(year: number): Date {
  const christmas = new Date(year, 11, 25);
  const dayOfWeek = christmas.getDay();
  const daysBeforeChristmas = dayOfWeek === 0 ? 7 : dayOfWeek;
  const fourthSundayOfAdvent = new Date(christmas.getTime() - daysBeforeChristmas * 86400000);
  return new Date(fourthSundayOfAdvent.getTime() - 21 * 86400000);
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Alinhado com getLiturgicalCycle() em src/lib/liturgical-calendar.ts.
// `year` aqui já é o "ano litúrgico" (o mesmo `year` recebido por
// generateYear/getLiturgicalSeasonForLiturgicalYear, que cobre do Advento
// do ano anterior até novembro deste ano).
function getLiturgicalCycle(liturgicalYear: number): 'A' | 'B' | 'C' {
  const remainder = liturgicalYear % 3;
  if (remainder === 1) return 'A';
  if (remainder === 2) return 'B';
  return 'C';
}

// ─── Leituras Reais do RCL — Tempo Comum ────────────────────────────
//
// Em vez de repetir o mesmo texto genérico por semana inteira, os dias
// do Tempo Comum cobertos por `groundedOrdinary` (ver abaixo) usam o
// domingo real do Lecionário Comum Revisado que rege aquela semana
// (segunda a sábado seguem o mesmo domingo, como nos devocionais
// impressos tradicionais). Isso também resolve a divergência entre a
// numeração de semana calculada localmente (getWeekOfSeason) e a
// numeração usada nos dados do RCL (cycle-A.json etc.): a busca é por
// data, não por número de semana.
const rclDataByCycle: Partial<Record<'A' | 'B' | 'C', { seasons: Record<string, RclEntry[]> }>> = {
  A: cycleAData as { seasons: Record<string, RclEntry[]> },
};

function findGoverningOrdinarySunday(cycle: 'A' | 'B' | 'C', date: Date): RclEntry | null {
  const data = rclDataByCycle[cycle];
  if (!data) return null;

  const dateStr = formatDate(date);
  const entries = data.seasons.ordinary ?? [];

  // O domingo que rege a semana é o mais recente com date <= dateStr,
  // dentro de uma janela de 6 dias (a distância máxima entre um
  // domingo e o sábado seguinte).
  let best: RclEntry | null = null;
  for (const entry of entries) {
    if (entry.date > dateStr) continue;
    const diffDays = (date.getTime() - new Date(entry.date + 'T00:00:00').getTime()) / 86400000;
    if (diffDays > 6) continue;
    if (!best || entry.date > best.date) best = entry;
  }
  return best;
}

function getLiturgicalSeasonForLiturgicalYear(liturgicalYear: number, date: Date): string {
  const d = date;
  const m = d.getMonth();
  const dom = d.getDate();

  // The liturgical year runs from Advent (Dec prev year) through Nov
  // Easter belongs to the liturgical year, e.g. Easter 2026 is in liturgical year 2026
  const easter = calculateEaster(liturgicalYear);
  const ashWednesday = new Date(easter.getTime() - 46 * 86400000);
  const pentecost = new Date(easter.getTime() + 49 * 86400000);
  const adventThisYear = calculateAdventStart(liturgicalYear);
  const adventPrevYear = calculateAdventStart(liturgicalYear - 1);

  // Advent (either from prev year or this year)
  if (d >= adventPrevYear && m === 11) return 'advent';
  if (d >= adventThisYear && m >= 10) return 'advent';

  // Christmas (Dec 25 - Jan 5)
  if ((m === 11 && dom >= 25) || (m === 0 && dom <= 5)) return 'christmas';

  // Epiphany (Jan 6 - Ash Wednesday) - in the liturgical year's Jan/Feb
  const epiphanyStart = new Date(liturgicalYear, 0, 6);
  if (d >= epiphanyStart && d < ashWednesday) return 'epiphany';

  // Lent (Ash Wednesday - day before Easter)
  if (d >= ashWednesday && d < easter) return 'lent';

  // Easter (Easter Sunday - day before Pentecost)
  if (d >= easter && d < pentecost) return 'easter';

  // Pentecost Sunday + week after
  const pentecostEnd = new Date(pentecost.getTime() + 7 * 86400000);
  if (d >= pentecost && d <= pentecostEnd) return 'pentecost';

  // Ordinary Time (after Pentecost to Advent)
  if (d > pentecostEnd && d < adventThisYear) return 'ordinary';

  return 'ordinary';
}

function getWeekOfSeason(date: Date, season: string, adventStart: Date, easter: Date): number {
  let seasonStart: Date;
  switch (season) {
    case 'advent':
      seasonStart = adventStart;
      break;
    case 'christmas':
      seasonStart = new Date(date.getFullYear() - (date.getMonth() < 6 ? 1 : 0), 11, 25);
      break;
    case 'epiphany': {
      const year = date.getMonth() < 6 ? date.getFullYear() : date.getFullYear() + 1;
      seasonStart = new Date(year, 0, 6);
      break;
    }
    case 'lent':
      seasonStart = new Date(easter.getTime() - 46 * 86400000); // Ash Wednesday
      break;
    case 'easter':
    case 'pentecost':
      seasonStart = easter;
      break;
    case 'ordinary': {
      const pentecost = new Date(easter.getTime() + 49 * 86400000);
      seasonStart = new Date(pentecost.getTime() + 7 * 86400000);
      break;
    }
    default:
      seasonStart = date;
  }
  return Math.floor((date.getTime() - seasonStart.getTime()) / (86400000 * 7)) + 1;
}

// ─── Tempo Comum Ancorado no RCL ─────────────────────────────────────
//
// Diferente dos templates genéricos acima (um texto por semana,
// repetido de domingo a sábado), este conteúdo é escrito a partir das
// leituras reais daquele domingo do RCL (ver scripts/grounded-content/).
// Cada dia da semana reflete sobre uma leitura ou ângulo diferente do
// mesmo domingo, então os sete dias não se repetem — e o conteúdo muda
// de verdade quando o ciclo litúrgico muda (A/B/C), porque a leitura
// muda. Array de 7 entradas por semana, índice = date.getDay()
// (0 = domingo … 6 = sábado). Cobertura de cada ciclo documentada no
// topo do respectivo módulo em scripts/grounded-content/.
const groundedOrdinary: Partial<Record<'A' | 'B' | 'C', Record<number, DevotionalEntry[]>>> = {
  A: ordinaryA,
  B: ordinaryB,
  C: ordinaryC,
};

const trinityWeekByCycle: Partial<Record<'A' | 'B' | 'C', DevotionalEntry[]>> = {
  A: trinityWeekA,
  B: trinityWeekB,
  C: trinityWeekC,
};

// ─── Tríduo Pascal — Conteúdo Fixo ──────────────────────────────────
//
// Estes quatro dias são o ápice do ano litúrgico. O script de geração
// usa seededPick por semana, o que causaria qualquer dia da semana 6
// da Quaresma (Ramos, Quinta, Sexta, Sábado) receber conteúdo genérico
// ou trocado. Este mapa garante que cada dia do Tríduo receba exatamente
// o seu conteúdo — sobrescrito após o loop principal em generateYear().

const triduumContent: Record<
  'palmSunday' | 'holyThursday' | 'goodFriday' | 'holySaturday',
  DevotionalEntry
> = {
  palmSunday: {
    prayer: {
      title: 'O Rei Humilde',
      text: t(`Jesus, Rei da paz, entraste em Jerusalém montado num
        jumentinho, não num cavalo de guerra. A multidão gritava
        "Hosana!", mas poucos entenderam o que teu reino significa.
        Dá-nos olhos para ver o Rei na sua humildade. Ensina-nos que
        a verdadeira grandeza está em servir, não em ser servido. Nesta
        Semana Santa, caminha conosco. Deixa-nos sentir a profundidade
        do teu amor na cruz, para que possamos experimentar o poder
        da tua ressurreição. Amém.`),
    },
    meditation: {
      prompt: t(`A entrada de Jesus em Jerusalém revelou dois tipos de
        discípulos: os que aclamavam buscando um rei político, e os que
        permaneceriam ao pé da cruz. O mesmo "Hosana" pode esconder
        expectativas muito diferentes.`),
      questions: [
        'Você segue Jesus quando ele corresponde às suas expectativas, ou também quando o caminho leva à cruz?',
        'O que você estaria pedindo a Jesus naquele momento — libertação, cura, provisão? Sua fé é condicional?',
        'Nesta Semana Santa, o que você precisa abandonar para seguir o verdadeiro Rei?',
      ],
      duration: '15 min',
    },
  },

  holyThursday: {
    prayer: {
      title: 'Quinta-Feira Santa',
      text: t(`Senhor Jesus, naquela noite em que fostes entregue,
        tomastes o pão, destes graças, quebraste-o e disseste:
        "Fazei isto em memória de mim." Antes de tudo, lavaste os pés
        dos teus discípulos — os pés de homens que te abandonariam
        em poucas horas. O teu amor não esperou que merecêssemos.
        Ensinaste que a grandeza no teu Reino é servir, que a comunhão
        contigo passa pelo partir do pão e pelo cuidado do próximo.
        Nesta noite santa, vem à nossa mesa. Deixa que tua presença
        consagre cada refeição partilhada, cada gesto de serviço
        humilde. "Amai-vos uns aos outros como eu vos amei." Amém.`),
    },
    meditation: {
      prompt: t(`Jesus lavou os pés dos seus discípulos — incluindo
        os de Judas, que ia traí-lo horas depois. O serviço genuíno não
        aguarda que o outro mereça. A mesa e a bacia de água ensinam
        o mesmo: o amor de Cristo vai até o fim.`),
      questions: [
        'A quem você acha difícil servir? O que isso revela sobre sua compreensão do amor de Cristo?',
        'Jesus disse "Fazei isto em memória de mim". O que significa lembrar Jesus em cada refeição partilhada?',
        'Que "pés" — vulnerabilidades, necessidades — você precisa deixar Jesus lavar hoje?',
      ],
      duration: '20 min',
    },
  },

  goodFriday: {
    prayer: {
      title: 'Sexta-Feira Santa',
      text: t(`Cristo crucificado, diante da tua cruz silenciamos.
        Não há palavras que possam expressar a profundidade deste amor.
        Os nossos pecados cravados em tuas mãos. A nossa culpa
        sepultada contigo. O véu rasgado, o acesso aberto. Hoje
        contemplamos o amor mais radical da história: o Criador
        morrendo pela criatura. O Justo pelos injustos. O Santo
        feito pecado por nós. "Consumado está" não é derrota —
        é vitória. Que nunca nos acostumemos com a cruz. Que ela
        seja sempre o centro da nossa fé. Amém.`),
    },
    meditation: {
      prompt: t(`Na cruz, Jesus não morreu como mártir resignado,
        mas como Sumo Sacerdote cumprindo o sacrifício definitivo.
        "Consumado está" — em grego, tetelestai — era o carimbo posto
        em dívidas pagas integralmente. A dívida foi quitada.`),
      questions: [
        'Diante da cruz, o que você sente — culpa, gratidão, estranheza? Seja honesto com Deus sobre isso.',
        'O véu do templo rasgou-se de cima para baixo. O que este gesto significa para o seu acesso a Deus hoje?',
        'Há algo que você ainda tenta "ganhar" de Deus em vez de simplesmente receber o que a cruz já conquistou?',
      ],
      duration: '20 min',
    },
  },

  holySaturday: {
    prayer: {
      title: 'Sábado Santo',
      text: t(`Cristo sepultado, hoje o mundo parece silencioso demais.
        Os discípulos dispersaram-se. A pedra está posta. O Sábado
        chegou, mas não é descanso — é espera. Não sabemos tudo o que
        fizeste nos lugares onde os mortos aguardam; sabemos apenas que
        desceste até o abismo mais fundo, que não há lugar tão distante
        para onde teu amor não chegue. Neste dia entre a morte e a vida,
        ensina-nos a permanecer no silêncio sem fugir. A esperar sem
        desesperar. A confiar mesmo quando tudo parece acabado. O
        Sábado terminará. A aurora vem. Amém.`),
    },
    meditation: {
      prompt: t(`O Sábado Santo é o único dia em que os discípulos
        não sabiam que a história ainda não havia terminado. Eles
        viveram aquele dia sem a certeza da ressurreição. Às vezes
        nossa fé também habita esse espaço — entre a promessa
        e o cumprimento.`),
      questions: [
        'Em que área da sua vida você está "no sábado" — entre a morte de uma expectativa e a ressurreição de algo novo?',
        'O que significa confiar em Deus quando não há evidência visível de que Ele ainda está agindo?',
        'Como você lida com o silêncio de Deus nos momentos mais difíceis? O que os discípulos no cenáculo ensinam?',
      ],
      duration: '20 min',
    },
  },
};

// ─── Gerador de Devocionais ─────────────────────────────────────────

interface GeneratedDevotional {
  entries: Record<string, DevotionalEntry>;
}

function seededPick<T>(items: T[], seed: string): T {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash = hash & hash;
  }
  const index = Math.abs(hash) % items.length;
  return items[index];
}

function generateForDate(
  date: Date,
  season: string,
  week: number,
  cycle: 'A' | 'B' | 'C',
): DevotionalEntry | null {
  // Tempo Comum: tenta primeiro o conteúdo ancorado no domingo real do
  // RCL (ver groundedOrdinary). `weekOfSeason` aqui é o número real do
  // Próprio (3-29, ver getProperNumberForDate em generate-rcl-data.ts)
  // — não mais uma contagem sequencial desde a Trindade. Ciclos A, B e
  // C completos (Próprios 3-29 / 4-29 / 4-29) — ver ROADMAP.md 1.2a.
  if (season === 'ordinary') {
    const governingSunday = findGoverningOrdinarySunday(cycle, date);

    // Os 6 dias entre a Trindade e o primeiro Próprio real (sempre
    // Trindade+1 a Trindade+6, todo ano) não têm domingo "regente"
    // dentro da janela de 6 dias — não pertencem a nenhum Próprio do
    // RCL. Sem este caso, esses dias ficavam sem devocional nenhum
    // (achado em 2026-08-17). date.getDay() aqui vai de 1 (segunda) a
    // 6 (sábado); trinityWeekByCycle[cycle] está indexado 0-5 na
    // mesma ordem.
    const trinityWeek = trinityWeekByCycle[cycle];
    if (!governingSunday && trinityWeek && date.getDay() >= 1 && date.getDay() <= 6) {
      return trinityWeek[date.getDay() - 1];
    }

    const groundedWeek = governingSunday
      ? groundedOrdinary[cycle]?.[governingSunday.weekOfSeason]
      : undefined;
    if (groundedWeek) {
      return groundedWeek[date.getDay()];
    }
  }

  const seasonTemplates = templates[season];
  if (!seasonTemplates) return null;

  const weekKey = week > 28 ? 24 : week;
  const seed = formatDate(date);

  // Pick prayer
  const prayers = seasonTemplates.prayers[weekKey] || seasonTemplates.prayers[1];
  if (!prayers || prayers.length === 0) return null;

  const prayer = seededPick(prayers, seed + '-prayer');

  // Pick meditation
  const meditations = seasonTemplates.meditations[weekKey] || seasonTemplates.meditations[1];
  let meditation: MeditationResource;
  if (meditations && meditations.length > 0) {
    meditation = seededPick(meditations, seed + '-med');
  } else {
    meditation = {
      prompt:
        'Que a paz de Cristo, que excede todo entendimento, guarde o seu coração e a sua mente em Cristo Jesus.',
      questions: [
        'O que Deus está falando com você através da leitura de hoje?',
        'Como isso se aplica à sua vida hoje?',
        'O que você pode fazer em resposta?',
      ],
    };
  }

  return { prayer, meditation };
}

function generateYear(year: number): Record<string, DevotionalEntry> {
  const entries: Record<string, DevotionalEntry> = {};
  const adventStart = calculateAdventStart(year - 1);
  const easter = calculateEaster(year);
  const cycle = getLiturgicalCycle(year);

  // Generate from Dec 1 of previous year (Advent) to Nov 30 of current year
  const startDate = new Date(year - 1, 11, 1);
  const endDate = new Date(year, 11, 1);

  const current = new Date(startDate);
  while (current < endDate) {
    const dateStr = formatDate(current);

    if (!entries[dateStr]) {
      const season = getLiturgicalSeasonForLiturgicalYear(year, current);
      const week = getWeekOfSeason(current, season, adventStart, easter);

      const devotional = generateForDate(current, season, week, cycle);
      if (devotional) {
        entries[dateStr] = devotional;
      }
    }

    current.setDate(current.getDate() + 1);
  }

  // Sobrescreve os quatro dias do Tríduo Pascal com conteúdo dedicado.
  // Feito após o loop para garantir que qualquer conteúdo genérico
  // gerado para esses dias seja substituído.
  const msPerDay = 86400000;
  entries[formatDate(new Date(easter.getTime() - 7 * msPerDay))] = triduumContent.palmSunday;
  entries[formatDate(new Date(easter.getTime() - 3 * msPerDay))] = triduumContent.holyThursday;
  entries[formatDate(new Date(easter.getTime() - 2 * msPerDay))] = triduumContent.goodFriday;
  entries[formatDate(new Date(easter.getTime() - 1 * msPerDay))] = triduumContent.holySaturday;

  return entries;
}

// ─── Main ───────────────────────────────────────────────────────────

function main() {
  const outputDir = resolve(__dirname, '../src/data/rcl');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const years = [2025, 2026, 2027, 2028, 2029, 2030];

  for (const year of years) {
    console.log(`Gerando devocionais para ${year}...`);
    const entries = generateYear(year);
    const output = {
      year,
      entries,
    };

    const filePath = resolve(outputDir, `devotionals-${year}.json`);
    writeFileSync(filePath, JSON.stringify(output, null, 2));
    console.log(`  ✅ Gerado ${filePath} (${Object.keys(entries).length} dias)`);
  }

  console.log('\n📊 Resumo:');
  let total = 0;
  for (const year of years) {
    const filePath = resolve(outputDir, `devotionals-${year}.json`);
    const data = JSON.parse(String(readFileSync(filePath))) as {
      year: number;
      entries: Record<string, DevotionalEntry>;
    };
    const count = Object.keys(data.entries).length;
    console.log(`  ${year}: ${count} dias`);
    total += count;
  }
  console.log(`  Total: ${total} devocionais gerados`);
}

main();
