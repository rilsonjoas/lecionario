import { createClient } from '@supabase/supabase-js';
import { format, addDays } from 'date-fns';
import { calculateAdventStart, calculateEaster } from '@/lib/liturgical-calendar';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface MeditationData {
  liturgicalSunday: string;
  season: 'advent' | 'christmas' | 'epiphany' | 'lent' | 'easter' | 'pentecost' | 'ordinary';
  titlePt: string;
  textPt: string;
  source: string;
}

// Meditações Bíblicas alinhadas com Coletas e Orações
// Formato: Reflexão + Perguntas para Contemplação + Aplicação
const meditations: MeditationData[] = [
  // ADVENTO
  {
    liturgicalSunday: "1st Sunday of Advent",
    season: "advent",
    titlePt: "Vigiai e Orai",
    textPt: `**Reflexão:** O Advento nos convida a viver em santa expectativa. Jesus nos adverte: "Vigiai, porque não sabeis quando virá o Senhor" (Mc 13:35). Não sabemos o dia nem a hora, mas sabemos que Ele virá. Esta certeza deve transformar nossa maneira de viver hoje.

**Perguntas para Contemplação:**
1. Como seria diferente meu dia se eu soubesse que Cristo voltaria hoje?
2. Quais "obras das trevas" preciso rejeitar para me revestir das "armas da luz"?
3. Estou vivendo como quem espera ou como quem esqueceu?
4. O que significa ter a "lâmpada acesa" em minha vida diária?
5. Como posso cultivar um coração vigilante sem cair em ansiedade?

**Aplicação Prática:** Escolha uma área de sua vida que precisa de "vigilância" esta semana. Pode ser um hábito que precisa mudar, um relacionamento que precisa atenção, ou uma disciplina espiritual que precisa ser retomada. Ore diariamente pedindo graça para permanecer alerta.`,
    source: "Meditação original baseada em Marcos 13:33-37"
  },
  {
    liturgicalSunday: "2nd Sunday of Advent",
    season: "advent",
    titlePt: "Preparai o Caminho",
    textPt: `**Reflexão:** João Batista clama no deserto: "Preparai o caminho do Senhor, endireitai suas veredas" (Mc 1:3). O deserto não é apenas um lugar físico, mas o estado de nosso coração quando está longe de Deus. Preparar o caminho significa remover os obstáculos que impedem Cristo de entrar plenamente em nossa vida.

**Perguntas para Contemplação:**
1. Quais são os "caminhos tortuosos" em meu coração que precisam ser endireitados?
2. Que "montanhas de orgulho" impedem que eu me aproxime de Deus?
3. Quais "vales de desespero" precisam ser enchidos com a esperança do Evangelho?
4. Estou disposto a ouvir a voz profética que me chama ao arrependimento?
5. Como posso preparar meu coração para receber Cristo neste Advento?

**Aplicação Prática:** Pratique o exame de consciência diário esta semana. Antes de dormir, revise o dia e identifique um momento em que você se desviou do caminho de Deus. Confesse e peça perdão, preparando o coração para um novo amanhecer.`,
    source: "Meditação original baseada em Marcos 1:1-8"
  },
  {
    liturgicalSunday: "3rd Sunday of Advent",
    season: "advent",
    titlePt: "Alegrai-vos no Senhor",
    textPt: `**Reflexão:** "Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos!" (Fp 4:4). Este domingo de Gaudete (alegria) nos lembra que a alegria cristã não depende das circunstâncias, mas da presença de Deus. João Batista, mesmo na prisão, enviou seus discípulos a Jesus, mantendo a esperança viva.

**Perguntas para Contemplação:**
1. Minha alegria está fundamentada em Cristo ou nas circunstâncias?
2. Como posso "alegrar-me sempre" mesmo em meio às dificuldades?
3. Que diferença há entre alegria e felicidade?
4. Minha vida reflete a alegria da salvação para outros?
5. O que rouba minha alegria e como posso recuperá-la?

**Aplicação Prática:** Faça uma lista de três bênçãos pelas quais você é grato a Deus. Compartilhe essa gratidão com alguém esta semana, sendo testemunho da alegria que vem do Senhor.`,
    source: "Meditação original baseada em Filipenses 4:4-7"
  },
  {
    liturgicalSunday: "4th Sunday of Advent",
    season: "advent",
    titlePt: "O Sim de Maria",
    textPt: `**Reflexão:** "Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra" (Lc 1:38). Maria nos ensina a rendição total à vontade de Deus. Seu "sim" mudou a história da humanidade. Deus continua buscando corações dispostos a dizer "sim" ao seu chamado, mesmo quando não compreendemos plenamente.

**Perguntas para Contemplação:**
1. Estou disposto a dizer "sim" a Deus, mesmo sem entender todos os detalhes?
2. Que medos me impedem de render minha vontade à vontade de Deus?
3. Como posso cultivar um coração humilde e obediente como o de Maria?
4. Deus está me chamando para algo específico neste momento?
5. Minha vida é uma "morada preparada" para Cristo?

**Aplicação Prática:** Identifique uma área de sua vida onde você tem resistido ao chamado de Deus. Ore como Maria: "Faça-se em mim segundo a tua palavra" e dê um passo concreto de obediência esta semana.`,
    source: "Meditação original baseada em Lucas 1:26-38"
  },

  // NATAL
  {
    liturgicalSunday: "Christmas Day",
    season: "christmas",
    titlePt: "O Verbo se Fez Carne",
    textPt: `**Reflexão:** "E o Verbo se fez carne e habitou entre nós" (Jo 1:14). O mistério da Encarnação é o coração do Natal. O Deus infinito se fez finito, o Eterno entrou no tempo, o Criador se tornou criatura. Tudo isso por amor a nós. Este é o verdadeiro significado do Natal.

**Perguntas para Contemplação:**
1. O que significa para mim que Deus se fez carne?
2. Como o Natal transforma minha compreensão de quem Deus é?
3. Estou celebrando o nascimento de Cristo ou apenas tradições natalinas?
4. De que forma posso "encarnar" o amor de Cristo para outros?
5. O que mudaria em minha vida se eu realmente cresse que "Deus está conosco"?

**Aplicação Prática:** Neste Natal, escolha uma pessoa que precisa experimentar o amor encarnado de Cristo. Visite, telefone, ou escreva uma carta expressando o amor de Deus de forma tangível.`,
    source: "Meditação original baseada em João 1:1-14"
  },
  {
    liturgicalSunday: "1st Sunday after Christmas",
    season: "christmas",
    titlePt: "Filhos de Deus",
    textPt: `**Reflexão:** "A todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus" (Jo 1:12). O Natal não é apenas sobre o Filho de Deus se tornando filho do homem, mas também sobre nós nos tornarmos filhos de Deus. Esta é nossa identidade: não servos, mas filhos amados.

**Perguntas para Contemplação:**
1. Vivo como filho de Deus ou como órfão espiritual?
2. Como minha identidade como filho de Deus afeta minhas escolhas diárias?
3. Que privilégios e responsabilidades vêm com ser filho de Deus?
4. Estou experimentando a liberdade de ser filho ou a escravidão de tentar merecer amor?
5. Como posso ajudar outros a descobrirem sua identidade em Cristo?

**Aplicação Prática:** Medite em Romanos 8:15-17 esta semana. Quando enfrentar dificuldades, lembre-se: "Sou filho amado de Deus" e aja a partir dessa identidade.`,
    source: "Meditação original baseada em João 1:12-13"
  },

  // EPIFANIA
  {
    liturgicalSunday: "Epiphany",
    season: "epiphany",
    titlePt: "Luz para as Nações",
    textPt: `**Reflexão:** Os magos vieram do Oriente, guiados por uma estrela, para adorar o Rei dos judeus. A Epifania revela que Jesus não veio apenas para Israel, mas para todas as nações. A luz de Cristo brilha para todos os povos. Somos chamados a ser portadores dessa luz.

**Perguntas para Contemplação:**
1. Como posso ser "luz" para aqueles que ainda buscam a Cristo?
2. Que "tesouros" posso oferecer a Jesus em adoração?
3. Estou disposto a fazer uma "longa jornada" para encontrar Cristo?
4. Como minha fé pode alcançar pessoas de diferentes culturas e contextos?
5. Que estrelas Deus usa para me guiar até Ele?

**Aplicação Prática:** Ore por um grupo de pessoas não alcançadas pelo Evangelho. Pesquise sobre eles e considere como você pode contribuir (oração, doação, ou até mesmo ir).`,
    source: "Meditação original baseada em Mateus 2:1-12"
  },
  {
    liturgicalSunday: "2nd Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Andai na Luz",
    textPt: `**Reflexão:** "Eu sou a luz do mundo; quem me segue não andará nas trevas" (Jo 8:12). Cristo é a luz que dissipa todas as trevas. Seguir a Cristo significa andar na luz, viver em transparência, rejeitar as obras ocultas das trevas. A luz expõe, mas também cura e transforma.

**Perguntas para Contemplação:**
1. Há áreas de minha vida que ainda estão nas trevas?
2. Estou disposto a trazer tudo à luz de Cristo?
3. Como posso refletir a luz de Cristo em meu ambiente?
4. O que me impede de andar plenamente na luz?
5. Minha vida atrai outros para a luz ou os afasta?

**Aplicação Prática:** Confesse um pecado oculto a um irmão de confiança esta semana. Traga à luz o que estava escondido e experimente a liberdade que vem da transparência.`,
    source: "Meditação original baseada em João 8:12"
  },
  {
    liturgicalSunday: "3rd Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Vinde Após Mim",
    textPt: `**Reflexão:** Jesus chamou Simão e André: "Vinde após mim, e eu vos farei pescadores de homens" (Mt 4:19). Eles deixaram imediatamente as redes e o seguiram. O chamado de Cristo é urgente e radical. Ele não pede parte de nossa vida, mas toda ela.

**Perguntas para Contemplação:**
1. O que Jesus está me chamando a "deixar" para segui-lo?
2. Estou respondendo ao chamado de Cristo com urgência ou procrastinação?
3. Como posso ser "pescador de homens" em meu contexto?
4. Que "redes" (segurança, conforto, planos) preciso abandonar?
5. Confio que Jesus me transformará se eu o seguir?

**Aplicação Prática:** Identifique uma "rede" que você precisa deixar para seguir Cristo mais plenamente. Dê um passo concreto de obediência esta semana, mesmo que seja difícil.`,
    source: "Meditação original baseada em Mateus 4:18-22"
  },
  {
    liturgicalSunday: "4th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Bem-aventurados os Pacificadores",
    textPt: `**Reflexão:** "Bem-aventurados os pacificadores, porque serão chamados filhos de Deus" (Mt 5:9). Em um mundo dividido por conflitos, somos chamados a ser agentes de paz. Não uma paz superficial que evita conflitos, mas a paz de Cristo que reconcilia, restaura e cura.

**Perguntas para Contemplação:**
1. Sou pacificador ou causador de divisões?
2. Há relacionamentos em minha vida que precisam de reconciliação?
3. Como posso promover paz em minha família, trabalho, igreja?
4. Estou disposto a pagar o preço de ser pacificador?
5. Minha busca por paz começa com paz interior?

**Aplicação Prática:** Identifique um relacionamento quebrado e dê o primeiro passo para reconciliação esta semana. Ore, peça perdão, ou ofereça perdão, buscando a paz de Cristo.`,
    source: "Meditação original baseada em Mateus 5:9"
  },
  {
    liturgicalSunday: "5th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "O Maior Mandamento",
    textPt: `**Reflexão:** "Amarás o Senhor teu Deus de todo o teu coração... e ao teu próximo como a ti mesmo" (Mt 22:37-39). Todo o cristianismo se resume nestes dois mandamentos. Amor a Deus e amor ao próximo são inseparáveis. Não podemos amar a Deus a quem não vemos se não amamos o irmão a quem vemos.

**Perguntas para Contemplação:**
1. Amo a Deus de todo meu coração ou apenas parcialmente?
2. Como meu amor a Deus se manifesta em amor ao próximo?
3. Há alguém que considero difícil de amar?
4. Meu amor é genuíno ou apenas aparente?
5. Como posso crescer em amor esta semana?

**Aplicação Prática:** Escolha alguém que você considera difícil de amar. Ore por essa pessoa diariamente e faça um ato concreto de amor (mesmo que pequeno) esta semana.`,
    source: "Meditação original baseada em Mateus 22:34-40"
  },
  {
    liturgicalSunday: "6th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Minha Força e Meu Refúgio",
    textPt: `**Reflexão:** "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia" (Sl 46:1). Em nossa fraqueza, Deus é forte. Quando nossas forças falham, Ele permanece fiel. Confiar em Deus não é passividade, mas reconhecer que sem Ele nada podemos fazer.

**Perguntas para Contemplação:**
1. Em que ou em quem tenho colocado minha confiança?
2. Reconheço minha fraqueza e dependência de Deus?
3. Como posso descansar na força de Deus em vez de lutar sozinho?
4. Que situação atual exige que eu confie mais em Deus?
5. Minha confiança em Deus é teórica ou prática?

**Aplicação Prática:** Identifique uma preocupação que você tem carregado sozinho. Entregue-a a Deus em oração e pratique confiar nEle a cada vez que a ansiedade voltar.`,
    source: "Meditação original baseada em Salmo 46"
  },
  {
    liturgicalSunday: "7th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "O Amor Nunca Falha",
    textPt: `**Reflexão:** "O amor é paciente, o amor é bondoso... o amor nunca falha" (1Co 13:4-8). Sem amor, tudo é vazio. Podemos ter fé, esperança, dons espirituais, mas sem amor, nada somos. O amor ágape não é sentimento, mas escolha deliberada de buscar o bem do outro.

**Perguntas para Contemplação:**
1. Meu amor é paciente e bondoso ou impaciente e áspero?
2. Busco meus próprios interesses ou o bem dos outros?
3. Como posso amar sem esperar retorno?
4. Há alguém a quem preciso perdoar para amar plenamente?
5. Minha vida demonstra que o amor é o maior de todos os valores?

**Aplicação Prática:** Leia 1 Coríntios 13 substituindo "amor" por seu nome. Onde você falha? Peça ao Espírito Santo que produza esse amor em você e pratique um aspecto específico esta semana.`,
    source: "Meditação original baseada em 1 Coríntios 13"
  },
  {
    liturgicalSunday: "8th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Amai os Vossos Inimigos",
    textPt: `**Reflexão:** "Amai os vossos inimigos e orai pelos que vos perseguem" (Mt 5:44). Este é talvez o mandamento mais difícil de Jesus. Vai contra nossa natureza humana. Mas é exatamente isso que nos torna filhos de Deus - amar como Ele ama, sem distinção, sem condições.

**Perguntas para Contemplação:**
1. Quem são meus "inimigos" - pessoas que me feriram ou que não gosto?
2. Estou disposto a orar por eles genuinamente?
3. Como posso abençoar quem me amaldiçoa?
4. Que ressentimentos preciso liberar para amar livremente?
5. Vejo em cada pessoa alguém por quem Cristo morreu?

**Aplicação Prática:** Faça uma lista de pessoas que você considera "inimigos" ou que te feriram. Ore por cada uma nominalmente esta semana, pedindo bênçãos sobre suas vidas.`,
    source: "Meditação original baseada em Mateus 5:43-48"
  },
  {
    liturgicalSunday: "Last Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Transfigurados de Glória em Glória",
    textPt: `**Reflexão:** No monte da Transfiguração, Pedro, Tiago e João viram Jesus em sua glória. Seu rosto resplandeceu como o sol, suas vestes ficaram brancas como a luz. Esta visão os preparou para os dias difíceis que viriam. Nós também precisamos de momentos no "monte" para enfrentar os vales.

**Perguntas para Contemplação:**
1. Quando foi a última vez que "vi" a glória de Cristo?
2. Cultivo momentos de intimidade com Deus ou vivo apenas na correria?
3. Como posso "ouvir" a voz de Deus que diz "Este é meu Filho amado"?
4. Estou sendo transformado de glória em glória ou permanecendo o mesmo?
5. Como posso levar a luz do monte para o vale do cotidiano?

**Aplicação Prática:** Separe um tempo prolongado de oração esta semana (pelo menos 30 minutos). Desligue todas as distrações e busque a face de Deus, pedindo que Ele se revele a você.`,
    source: "Meditação original baseada em Mateus 17:1-9"
  },

  // QUARESMA
  {
    liturgicalSunday: "Ash Wednesday",
    season: "lent",
    titlePt: "Lembra-te: És Pó",
    textPt: `**Reflexão:** "Lembra-te de que és pó e ao pó voltarás" (Gn 3:19). As cinzas nos lembram de nossa mortalidade e fragilidade. Mas também nos lembram da graça: Deus não despreza um coração quebrantado e contrito. A Quaresma é tempo de voltar para Deus de todo coração.

**Perguntas para Contemplação:**
1. Vivo consciente de minha mortalidade ou como se fosse viver para sempre?
2. Meu coração está quebrantado diante de Deus ou endurecido?
3. De que preciso me arrepender nesta Quaresma?
4. Como posso usar este tempo para crescer espiritualmente?
5. Estou disposto a jejuar, orar e dar esmolas com sinceridade?

**Aplicação Prática:** Escolha uma disciplina espiritual para praticar durante a Quaresma: jejum de algo (comida, redes sociais, TV), oração diária prolongada, ou serviço aos necessitados. Comprometa-se e persevere.`,
    source: "Meditação original baseada em Gênesis 3:19 e Joel 2:12-13"
  },
  {
    liturgicalSunday: "1st Sunday in Lent",
    season: "lent",
    titlePt: "Tentado, Mas Sem Pecado",
    textPt: `**Reflexão:** Jesus foi tentado no deserto por quarenta dias. Satanás o tentou com pão (necessidades físicas), poder (ambição), e espetáculo (orgulho). Jesus venceu cada tentação com a Palavra de Deus. Ele entende nossas tentações porque foi tentado em tudo, mas permaneceu sem pecado.

**Perguntas para Contemplação:**
1. Quais são minhas áreas de maior tentação?
2. Estou usando a Palavra de Deus como arma contra a tentação?
3. Busco satisfazer necessidades legítimas de formas ilegítimas?
4. Como posso fortalecer minha resistência espiritual?
5. Recorro a Cristo quando sou tentado ou tento vencer sozinho?

**Aplicação Prática:** Memorize um versículo bíblico que fale diretamente à sua maior tentação. Quando for tentado, declare esse versículo em voz alta como Jesus fez no deserto.`,
    source: "Meditação original baseada em Mateus 4:1-11"
  },
  {
    liturgicalSunday: "2nd Sunday in Lent",
    season: "lent",
    titlePt: "Ouvi-o",
    textPt: `**Reflexão:** Na Transfiguração, a voz do Pai declarou: "Este é meu Filho amado; ouvi-o" (Mc 9:7). Em meio a tantas vozes competindo por nossa atenção, Deus nos chama a ouvir a voz de Jesus. Ouvir não é apenas escutar, mas obedecer.

**Perguntas para Contemplação:**
1. Estou realmente ouvindo a voz de Jesus ou apenas ruídos ao redor?
2. Como posso cultivar a habilidade de discernir a voz de Deus?
3. Sou ouvinte da Palavra ou também praticante?
4. Que vozes competem com a voz de Cristo em minha vida?
5. Estou disposto a obedecer o que ouço?

**Aplicação Prática:** Pratique a leitura orante (Lectio Divina) esta semana. Leia um texto bíblico lentamente, medite nele, ore sobre ele, e contemple o que Deus está dizendo a você.`,
    source: "Meditação original baseada em Marcos 9:2-9"
  },
  {
    liturgicalSunday: "3rd Sunday in Lent",
    season: "lent",
    titlePt: "Sem Ti, Nada Posso",
    textPt: `**Reflexão:** "Sem mim nada podeis fazer" (Jo 15:5). Nossa cultura exalta a autossuficiência, mas Jesus ensina dependência total. Como o ramo precisa permanecer na videira para dar fruto, nós precisamos permanecer em Cristo. Fora dEle, somos impotentes.

**Perguntas para Contemplação:**
1. Reconheço minha dependência total de Cristo ou confio em minhas próprias forças?
2. Como posso "permanecer" em Cristo no dia a dia?
3. Que frutos minha vida está produzindo?
4. Estou tentando fazer coisas para Deus sem estar conectado a Ele?
5. Como a oração e a Palavra me mantêm conectado à Videira?

**Aplicação Prática:** Antes de iniciar qualquer tarefa importante esta semana, pare e ore: "Senhor, sem ti nada posso fazer. Capacita-me." Pratique a dependência consciente.`,
    source: "Meditação original baseada em João 15:1-8"
  },
  {
    liturgicalSunday: "4th Sunday in Lent",
    season: "lent",
    titlePt: "Pão da Vida",
    textPt: `**Reflexão:** "Eu sou o pão da vida; aquele que vem a mim não terá fome" (Jo 6:35). Jesus não oferece apenas alimento espiritual, Ele É o alimento. Alimentar-se de Cristo significa comunhão íntima, dependência diária, satisfação plena. Ele sacia a fome mais profunda da alma.

**Perguntas para Contemplação:**
1. Do que tenho me alimentado espiritualmente?
2. Busco satisfação em Cristo ou em coisas que não saciam?
3. Como posso "comer" da carne de Cristo e "beber" de seu sangue (comunhão profunda)?
4. Minha alma está faminta ou satisfeita?
5. Participo da Ceia do Senhor com reverência e fé?

**Aplicação Prática:** Jejue de uma refeição esta semana e use esse tempo para "alimentar-se" de Cristo através da oração e leitura bíblica. Experimente que Ele satisfaz mais que o pão.`,
    source: "Meditação original baseada em João 6:35-51"
  },
  {
    liturgicalSunday: "5th Sunday in Lent",
    season: "lent",
    titlePt: "Desejos Ordenados",
    textPt: `**Reflexão:** Nosso coração é uma fábrica de ídolos, sempre desejando coisas erradas ou coisas certas de forma errada. Deus promete ordenar nossos desejos, fazendo-nos amar o que Ele ordena e desejar o que Ele promete. Isto é transformação verdadeira.

**Perguntas para Contemplação:**
1. Quais são meus desejos mais profundos?
2. Esses desejos estão alinhados com a vontade de Deus?
3. Que ídolos (desejos desordenados) preciso abandonar?
4. Como posso cultivar desejos santos?
5. Confio que Deus sabe o que é melhor para mim?

**Aplicação Prática:** Faça um inventário de seus desejos. Liste o que você mais deseja e pergunte: "Isto glorifica a Deus? Isto me aproxima dEle?" Ore pedindo que Deus ordene seus desejos.`,
    source: "Meditação original baseada em Salmo 37:4"
  },
  {
    liturgicalSunday: "Palm Sunday",
    season: "lent",
    titlePt: "Hosana ao Rei Humilde",
    textPt: `**Reflexão:** Jesus entra em Jerusalém montado num jumentinho, cumprindo a profecia: "Eis que vem a ti o teu rei, humilde" (Zc 9:9). A multidão o aclama como rei, mas em poucos dias gritará "Crucifica-o!" A glória do Domingo de Ramos leva à agonia da Sexta-feira Santa.

**Perguntas para Contemplação:**
1. Que tipo de rei eu esperava que Jesus fosse?
2. Aceito um Messias humilde e sofredor ou quero um Deus de poder e glória apenas?
3. Sou como a multidão inconstante ou permaneço fiel a Cristo?
4. Estou disposto a seguir Jesus até a cruz?
5. Como posso viver a humildade de Cristo em meu contexto?

**Aplicação Prática:** Medite na Paixão de Cristo esta semana. Leia os relatos dos Evangelhos (Mt 26-27, Mc 14-15, Lc 22-23, Jo 18-19) e reflita no amor que levou Jesus à cruz.`,
    source: "Meditação original baseada em Mateus 21:1-11"
  },

  // PÁSCOA
  {
    liturgicalSunday: "Easter Day",
    season: "easter",
    titlePt: "Ele Ressuscitou!",
    textPt: `**Reflexão:** "Não está aqui; ressuscitou!" (Lc 24:6). O túmulo vazio é o fundamento de nossa fé. Se Cristo não ressuscitou, vã é nossa fé. Mas Ele ressuscitou! A morte foi vencida, o pecado foi derrotado, a vida triunfou. Esta é a melhor notícia da história.

**Perguntas para Contemplação:**
1. Vivo como alguém que crê na ressurreição?
2. Que áreas de minha vida precisam de "ressurreição"?
3. Como a ressurreição de Cristo transforma meu presente?
4. Tenho esperança da ressurreição futura?
5. Minha vida proclama "Cristo vive!" ou parece que Ele ainda está no túmulo?

**Aplicação Prática:** Compartilhe a mensagem da Páscoa com alguém esta semana. Conte como a ressurreição de Cristo transformou sua vida e oferece esperança para todos.`,
    source: "Meditação original baseada em Lucas 24:1-12"
  },
  {
    liturgicalSunday: "2nd Sunday of Easter",
    season: "easter",
    titlePt: "Nascidos de Novo",
    textPt: `**Reflexão:** "Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, que... nos regenerou para uma viva esperança, pela ressurreição de Jesus Cristo" (1Pe 1:3). A ressurreição não é apenas um evento histórico, mas uma realidade presente. Somos nascidos de novo para uma nova vida.

**Perguntas para Contemplação:**
1. Experimento a realidade de ser "nova criatura" em Cristo?
2. Como minha vida demonstra que fui regenerado?
3. Vivo pela "viva esperança" da ressurreição ou pelo desespero?
4. Que velhos hábitos preciso deixar para viver a vida nova?
5. Como posso ajudar outros a nascerem de novo?

**Aplicação Prática:** Identifique um hábito do "velho homem" que você precisa abandonar. Substitua-o por uma prática do "novo homem" em Cristo. Peça ao Espírito Santo que o capacite.`,
    source: "Meditação original baseada em 1 Pedro 1:3-9"
  },
  {
    liturgicalSunday: "3rd Sunday of Easter",
    season: "easter",
    titlePt: "Caminho de Emaús",
    textPt: `**Reflexão:** Dois discípulos caminhavam para Emaús, tristes e desiludidos. Jesus se juntou a eles, mas não o reconheceram. Somente quando Ele partiu o pão, seus olhos se abriram. Quantas vezes Jesus caminha conosco e não o percebemos?

**Perguntas para Contemplação:**
1. Reconheço a presença de Cristo em meu dia a dia?
2. Como posso ter olhos abertos para vê-lo?
3. Meu coração "arde" quando ouço a Palavra de Deus?
4. Onde Cristo está tentando se revelar a mim agora?
5. Convido Jesus para "ficar" comigo ou o deixo partir?

**Aplicação Prática:** Pratique a presença de Deus esta semana. Em cada atividade, pare e pergunte: "Senhor, onde estás nisto?" Cultive a consciência de que Ele está sempre presente.`,
    source: "Meditação original baseada em Lucas 24:13-35"
  },
  {
    liturgicalSunday: "4th Sunday of Easter",
    season: "easter",
    titlePt: "O Bom Pastor",
    textPt: `**Reflexão:** "Eu sou o bom pastor; o bom pastor dá a vida pelas ovelhas" (Jo 10:11). Jesus não é apenas um pastor, mas O BOM pastor. Ele conhece suas ovelhas pelo nome, as guia, as protege, e deu sua vida por elas. Que privilégio pertencer ao rebanho de Cristo!

**Perguntas para Contemplação:**
1. Ouço e reconheço a voz do Bom Pastor?
2. Sigo a Jesus ou sigo minhas próprias inclinações?
3. Confio que Ele me guia mesmo quando não entendo o caminho?
4. Como posso ajudar outras "ovelhas" a encontrarem o Pastor?
5. Experimento a segurança de estar no rebanho de Cristo?

**Aplicação Prática:** Leia o Salmo 23 diariamente esta semana. Medite em cada verso e agradeça a Deus por ser seu Pastor. Identifique uma área onde você precisa confiar mais em sua liderança.`,
    source: "Meditação original baseada em João 10:11-18"
  },
  {
    liturgicalSunday: "5th Sunday of Easter",
    season: "easter",
    titlePt: "Coração Puro",
    textPt: `**Reflexão:** "Cria em mim, ó Deus, um coração puro e renova em mim um espírito reto" (Sl 51:10). Davi, após seu pecado com Bate-Seba, clamou por purificação. Não basta arrependimento superficial; precisamos de transformação profunda. Deus não apenas perdoa, mas purifica.

**Perguntas para Contemplação:**
1. Meu coração está puro diante de Deus?
2. Há pecados ocultos que preciso confessar?
3. Busco apenas perdão ou também transformação?
4. Como posso manter um coração puro em um mundo impuro?
5. Permito que Deus sonde e purifique meu coração?

**Aplicação Prática:** Faça um exame de consciência profundo. Confesse pecados específicos a Deus e, se necessário, a um irmão de confiança. Peça ao Espírito Santo que crie em você um coração puro.`,
    source: "Meditação original baseada em Salmo 51"
  },
  {
    liturgicalSunday: "6th Sunday of Easter",
    season: "easter",
    titlePt: "Amor que Arde",
    textPt: `**Reflexão:** "Não ardia o nosso coração quando ele nos falava?" (Lc 24:32). O Espírito Santo é fogo que inflama nosso coração com amor por Deus. Não um amor morno e apático, mas ardente e apaixonado. Este amor nos capacita a amar o que Deus ama e desejar o que Ele deseja.

**Perguntas para Contemplação:**
1. Meu amor por Deus é ardente ou morno?
2. O que apaga o fogo do Espírito em minha vida?
3. Como posso reavivar a chama do primeiro amor?
4. Meu coração arde quando leio a Palavra ou ouço sobre Cristo?
5. Esse amor transborda em amor ao próximo?

**Aplicação Prática:** Ore pedindo que o Espírito Santo reacenda o fogo do amor em seu coração. Passe tempo em adoração esta semana, expressando seu amor a Deus através de música, oração, ou silêncio contemplativo.`,
    source: "Meditação original baseada em Lucas 24:32"
  },
  {
    liturgicalSunday: "7th Sunday of Easter",
    season: "easter",
    titlePt: "Olhos no Céu",
    textPt: `**Reflexão:** Após a ascensão, os discípulos ficaram olhando para o céu. Os anjos perguntaram: "Por que estais olhando para o céu?" (At 1:11). Jesus voltará, mas enquanto isso, temos trabalho a fazer. Viver com olhos no céu não significa negligenciar a terra.

**Perguntas para Contemplação:**
1. Vivo com perspectiva eterna ou apenas temporal?
2. Como posso ser "celestial" sem ser "inútil na terra"?
3. Minha esperança na volta de Cristo me motiva ou me paralisa?
4. Como posso viver hoje à luz da eternidade?
5. Estou preparado para encontrar Cristo?

**Aplicação Prática:** Avalie suas prioridades. Você está investindo em coisas eternas ou apenas temporais? Faça um ajuste concreto esta semana para viver mais à luz da eternidade.`,
    source: "Meditação original baseada em Atos 1:6-11"
  },
  {
    liturgicalSunday: "Ascension Day",
    season: "easter",
    titlePt: "Assentado à Direita",
    textPt: `**Reflexão:** Cristo ascendeu e está assentado à direita do Pai, intercedendo por nós. Ele não está distante, mas presente pelo Espírito. Sua ascensão garante nossa futura ascensão. Onde Ele está, nós também estaremos.

**Perguntas para Contemplação:**
1. Cristo intercede por mim agora - como isso me conforta?
2. Vivo como cidadão do céu ou apenas da terra?
3. Como posso "ascender" em espírito enquanto vivo na terra?
4. Meu coração está onde Cristo está?
5. Aguardo com esperança minha futura ascensão?

**Aplicação Prática:** Quando enfrentar dificuldades esta semana, lembre-se: Cristo está à direita de Deus intercedendo por você. Descanse nessa verdade e ore com confiança.`,
    source: "Meditação original baseada em Hebreus 4:14-16"
  },

  // PENTECOSTES
  {
    liturgicalSunday: "Day of Pentecost",
    season: "pentecost",
    titlePt: "Cheios do Espírito",
    textPt: `**Reflexão:** "Todos foram cheios do Espírito Santo" (At 2:4). Pentecostes marca o nascimento da Igreja. O Espírito prometido desceu com poder, capacitando os discípulos para testemunhar. O mesmo Espírito está disponível para nós hoje.

**Perguntas para Contemplação:**
1. Estou cheio do Espírito Santo ou vivendo em minhas próprias forças?
2. Como posso ser continuamente cheio do Espírito?
3. Que frutos do Espírito são evidentes em minha vida?
4. Uso os dons do Espírito para edificar a Igreja?
5. Tenho ousadia para testemunhar como os apóstolos tiveram?

**Aplicação Prática:** Ore diariamente esta semana: "Espírito Santo, enche-me novamente." Identifique uma área onde você precisa do poder do Espírito e dependa dEle conscientemente.`,
    source: "Meditação original baseada em Atos 2:1-21"
  },

  // TEMPO COMUM
  {
    liturgicalSunday: "Trinity Sunday",
    season: "ordinary",
    titlePt: "Mistério da Trindade",
    textPt: `**Reflexão:** Deus é Trino: Pai, Filho e Espírito Santo. Três Pessoas, uma Essência. Este mistério ultrapassa nossa compreensão, mas não nossa adoração. A Trindade revela que Deus é comunidade de amor eterno, e fomos criados para participar dessa comunhão.

**Perguntas para Contemplação:**
1. Como experimento o Pai, o Filho e o Espírito em minha vida?
2. Minha fé na Trindade é apenas intelectual ou relacional?
3. Como a Trindade modela relacionamentos de amor e unidade?
4. Adoro cada Pessoa da Trindade ou apenas "Deus" genericamente?
5. Como posso crescer em comunhão com o Deus Trino?

**Aplicação Prática:** Ore ao Pai, por meio do Filho, no poder do Espírito esta semana. Conscientemente dirija suas orações à Trindade, reconhecendo cada Pessoa divina.`,
    source: "Meditação original baseada em Mateus 28:19"
  },
  {
    liturgicalSunday: "Christ the King",
    season: "ordinary",
    titlePt: "Rei dos Reis",
    textPt: `**Reflexão:** "No seu manto e na sua coxa tem escrito este nome: REI DOS REIS E SENHOR DOS SENHORES" (Ap 19:16). Cristo é Rei, não apenas de nossa vida pessoal, mas de todo o universo. Um dia, todo joelho se dobrará e toda língua confessará que Jesus Cristo é Senhor.

**Perguntas para Contemplação:**
1. Cristo é realmente Rei de toda minha vida ou apenas de partes dela?
2. Há áreas onde resisto ao seu governo?
3. Como posso viver hoje como súdito do Rei Jesus?
4. Minha lealdade está dividida entre Cristo e outros "senhores"?
5. Aguardo com esperança o dia em que Ele estabelecerá seu reino eterno?

**Aplicação Prática:** Identifique uma área de sua vida onde Cristo não é Rei. Submeta-a conscientemente a Ele esta semana, declarando: "Jesus, tu és Senhor também sobre isto."`,
    source: "Meditação original baseada em Apocalipse 19:11-16"
  },
];

/**
 * Calculate the date for a specific liturgical Sunday
 */
function getSundayDate(year: number, liturgicalSunday: string, season: string): Date | null {
  const adventStart = calculateAdventStart(year);
  const easter = calculateEaster(year);
  const epiphany = new Date(year, 0, 6);
  const ashWednesday = addDays(easter, -46);

  // ADVENT
  if (liturgicalSunday.includes("Advent")) {
    const match = liturgicalSunday.match(/(\d+)(st|nd|rd|th)/);
    if (match) {
      const week = parseInt(match[1]) - 1;
      return addDays(adventStart, week * 7);
    }
  }

  // CHRISTMAS
  if (liturgicalSunday === "Christmas Day") return new Date(year, 11, 25);
  if (liturgicalSunday === "1st Sunday after Christmas") {
    const christmas = new Date(year, 11, 25);
    const daysUntilSunday = (7 - christmas.getDay()) % 7 || 7;
    return addDays(christmas, daysUntilSunday);
  }

  // EPIPHANY
  if (liturgicalSunday === "Epiphany") return epiphany;
  if (liturgicalSunday.includes("after Epiphany")) {
    if (liturgicalSunday === "Last Sunday after Epiphany") {
      return addDays(ashWednesday, -3);
    }
    const match = liturgicalSunday.match(/(\d+)(st|nd|rd|th)/);
    if (match) {
      const week = parseInt(match[1]);
      const firstSunday = addDays(epiphany, (7 - epiphany.getDay()) % 7 || 7);
      return addDays(firstSunday, (week - 1) * 7);
    }
  }

  // LENT
  if (liturgicalSunday === "Ash Wednesday") return ashWednesday;
  if (liturgicalSunday.includes("in Lent")) {
    const match = liturgicalSunday.match(/(\d+)(st|nd|rd|th)/);
    if (match) {
      const week = parseInt(match[1]);
      return addDays(ashWednesday, 3 + (week - 1) * 7);
    }
  }
  if (liturgicalSunday === "Palm Sunday") return addDays(easter, -7);

  // EASTER
  if (liturgicalSunday === "Easter Day") return easter;
  if (liturgicalSunday.includes("of Easter")) {
    const match = liturgicalSunday.match(/(\d+)(st|nd|rd|th)/);
    if (match) {
      const week = parseInt(match[1]);
      return addDays(easter, (week - 1) * 7);
    }
  }
  if (liturgicalSunday === "Ascension Day") return addDays(easter, 39);

  // PENTECOST
  if (liturgicalSunday === "Day of Pentecost") return addDays(easter, 49);

  // ORDINARY TIME
  if (liturgicalSunday === "Trinity Sunday") return addDays(easter, 56);
  if (liturgicalSunday === "Christ the King") {
    const nextAdvent = calculateAdventStart(year + 1);
    return addDays(nextAdvent, -7);
  }

  return null;
}

function getCycleForYear(year: number): 'A' | 'B' | 'C' {
  const remainder = year % 3;
  if (remainder === 0) return 'A';
  if (remainder === 1) return 'B';
  return 'C';
}

async function importMeditations() {
  console.log('📖 Iniciando importação de MEDITAÇÕES BÍBLICAS...\\n');

  const years = [2026, 2027, 2028];
  let totalInserted = 0;
  let totalSkipped = 0;

  for (const year of years) {
    const cycle = getCycleForYear(year);
    console.log(`\\n📅 Ano ${year} - Ciclo ${cycle}`);
    console.log('='.repeat(50));

    for (const meditation of meditations) {
      const date = getSundayDate(year, meditation.liturgicalSunday, meditation.season);

      if (!date) {
        console.log(`  ⚠️  Pulando: ${meditation.liturgicalSunday} (data não calculável)`);
        totalSkipped++;
        continue;
      }

      const dateStr = format(date, 'yyyy-MM-dd');

      // Check if meditation already exists
      const { data: existing } = await supabase
        .from('meditations')
        .select('id')
        .eq('date', dateStr)
        .eq('cycle', cycle)
        .single();

      if (existing) {
        console.log(`  ⏭️  Já existe: ${dateStr} (${meditation.titlePt})`);
        totalSkipped++;
        continue;
      }

      // Parse meditation text to extract prompt and questions
      const lines = meditation.textPt.split('\\n');
      let prompt = '';
      const questions: string[] = [];
      let inQuestions = false;
      
      for (const line of lines) {
        if (line.includes('**Perguntas para Contemplação:**')) {
          inQuestions = true;
          continue;
        }
        if (line.includes('**Aplicação Prática:**')) {
          break; // Stop at application section
        }
        if (inQuestions && line.match(/^\d+\./)) {
          questions.push(line.replace(/^\d+\.\s*/, '').trim());
        } else if (!inQuestions && line.trim()) {
          prompt += line + '\\n';
        }
      }

      // Insert meditation
      const { data: medResult, error } = await supabase.from('meditations').insert({
        date: dateStr,
        cycle,
        season: meditation.season,
        prompt: prompt.trim(),
        duration: '10-15 minutos',
      }).select().single();

      if (error) {
        console.error(`  ❌ Erro ao inserir ${dateStr}:`, error.message);
        continue;
      }

      // Insert questions
      if (medResult && questions.length > 0) {
        // Delete existing questions first
        await supabase.from('meditation_questions').delete().eq('meditation_id', medResult.id);
        
        const questionsToInsert = questions.map((q, idx) => ({
          meditation_id: medResult.id,
          question: q,
          order_index: idx
        }));
        
        const { error: qError } = await supabase.from('meditation_questions').insert(questionsToInsert);
        if (qError) {
          console.error(`  ⚠️  Erro ao inserir perguntas para ${dateStr}:`, qError.message);
        }
      }

      console.log(`  ✅ ${dateStr}: ${meditation.titlePt}`);
      console.log(`  ✅ ${dateStr}: ${meditation.titlePt}`);
      totalInserted++;
    }
  }

  console.log('\\n' + '='.repeat(50));
  console.log('🎉 IMPORTAÇÃO DE MEDITAÇÕES CONCLUÍDA!');
  console.log('='.repeat(50));
  console.log(`\\n📊 Estatísticas:`);
  console.log(`   ✅ Inseridas: ${totalInserted}`);
  console.log(`   ⏭️  Puladas: ${totalSkipped}`);
  console.log(`   📖 Total de meditações únicas: ${meditations.length}`);
  console.log(`   📅 Anos processados: ${years.join(', ')}`);
  console.log(`\\n✨ Processo finalizado com sucesso!\\n`);
}

// Run the import
importMeditations().catch(console.error);
