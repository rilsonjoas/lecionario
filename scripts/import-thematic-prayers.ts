import { createClient } from '@supabase/supabase-js';
import { format, addDays } from 'date-fns';
import { calculateAdventStart, calculateEaster } from '@/lib/liturgical-calendar';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface PrayerData {
  liturgicalSunday: string;
  season: 'advent' | 'christmas' | 'epiphany' | 'lent' | 'easter' | 'pentecost' | 'ordinary';
  titlePt: string;
  textPt: string;
  source: string;
}

// Orações Temáticas inspiradas no Livro de Oração Comum
// Estilo devocional, refletindo os temas das leituras
const prayers: PrayerData[] = [
  // ADVENTO - Tema: Esperança, Vigilância, Preparação
  {
    liturgicalSunday: "1st Sunday of Advent",
    season: "advent",
    titlePt: "Oração de Vigilância",
    textPt: "Senhor Jesus, tu que virás novamente em glória, desperta em mim um coração vigilante. Que eu não seja encontrado dormindo quando chamares, mas pronto, com a lâmpada acesa e o coração preparado. Ajuda-me a viver cada dia como se fosse o último, não em medo, mas em santa expectativa. Purifica minha vida de tudo que me distrai de ti, para que, quando apareceres, eu possa levantar minha cabeça com alegria, sabendo que minha redenção está próxima. Vem, Senhor Jesus, e encontra-me esperando. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "2nd Sunday of Advent",
    season: "advent",
    titlePt: "Oração de Arrependimento",
    textPt: "Deus de misericórdia, ouço a voz do profeta clamando no deserto: 'Preparai o caminho do Senhor!' Reconheço que meu coração é como um deserto árido, cheio de caminhos tortuosos e lugares ásperos. Vem com tua graça e endireita o que está torto em mim. Nivela as montanhas do meu orgulho e enche os vales da minha desesperança. Prepara meu coração para receber-te, não apenas neste Advento, mas todos os dias da minha vida. Que meu arrependimento seja genuíno e minha conversão, completa. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "3rd Sunday of Advent",
    season: "advent",
    titlePt: "Oração de Alegria",
    textPt: "Senhor da alegria, neste domingo de Gaudete, meu coração se regozija porque tu estás próximo. Em meio às trevas do mundo, tu és a luz que não se apaga. Em meio ao desespero, tu és a esperança que não falha. Ensina-me a alegrar-me sempre em ti, não nas circunstâncias, mas na certeza da tua presença. Que minha alegria seja testemunho do teu amor, e que outros vejam em mim a paz que só tu podes dar. Vem, Senhor, e enche meu coração de júbilo, pois a tua salvação está próxima. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "4th Sunday of Advent",
    season: "advent",
    titlePt: "Oração de Preparação",
    textPt: "Deus Emanuel, que escolheste habitar entre nós, prepara meu coração para ser tua morada. Assim como Maria disse 'sim' ao teu chamado, que eu também possa render minha vontade à tua. Purifica-me de todo pecado, limpa-me de toda impureza, para que Cristo possa nascer em mim novamente. Que minha vida seja um presépio onde tu possas descansar, um lugar de simplicidade e humildade onde tua glória se manifeste. Vem, Senhor Jesus, e faz tua casa em mim. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },

  // NATAL - Tema: Encarnação, Luz, Alegria
  {
    liturgicalSunday: "Christmas Day",
    season: "christmas",
    titlePt: "Oração de Adoração",
    textPt: "Deus eterno, que te fizeste carne e habitaste entre nós, prostro-me em adoração diante do mistério do Natal. O Criador do universo, envolto em panos e deitado numa manjedoura! O Rei dos reis, nascido em pobreza! O Verbo eterno, chorando como criança! Que maravilha é teu amor! Que profundidade tem tua humildade! Ensina-me a adorar-te não apenas com palavras, mas com uma vida rendida. Que eu possa ver em cada pessoa o Cristo que nasceu por amor, e servir-te servindo aos outros. Glória a ti, Emanuel, Deus conosco! Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "1st Sunday after Christmas",
    season: "christmas",
    titlePt: "Oração de Gratidão",
    textPt: "Pai celestial, agradeço-te pelo dom inefável do teu Filho. Neste tempo de Natal, meu coração transborda de gratidão. Tu não poupaste teu próprio Filho, mas o deste por amor a mim. Ajuda-me a viver como filho adotivo, consciente da dignidade que me deste em Cristo. Que a alegria do Natal não seja apenas uma emoção passageira, mas uma realidade permanente em minha vida. Renova-me diariamente pelo teu Espírito, para que eu possa refletir a luz de Cristo em tudo que faço. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },

  // EPIFANIA - Tema: Revelação, Luz às Nações, Missão
  {
    liturgicalSunday: "Epiphany",
    season: "epiphany",
    titlePt: "Oração Missionária",
    textPt: "Senhor de todas as nações, que te revelaste aos magos do Oriente, abre meus olhos para ver tua glória manifestada em Cristo. Assim como a estrela guiou os sábios até ti, que eu também possa ser luz para aqueles que buscam. Dá-me corações generoso como os magos, que ofereceram seus tesouros. Que eu possa oferecer-te o ouro da minha devoção, o incenso da minha adoração e a mirra do meu sacrifício. Envia-me como testemunha tua aos confins da terra, para que todos os povos vejam tua salvação. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "2nd Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Oração pela Luz",
    textPt: "Cristo, luz do mundo, ilumina as trevas da minha alma. Que tua Palavra seja lâmpada para os meus pés e luz para o meu caminho. Ajuda-me a refletir tua luz em meio às trevas deste mundo, não escondendo-a, mas deixando-a brilhar para que outros vejam tuas boas obras e glorifiquem ao Pai. Livra-me de tudo que obscurece tua presença em mim: o pecado, o orgulho, a incredulidade. Que eu ande como filho da luz, produzindo frutos de bondade, justiça e verdade. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "3rd Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Oração de Chamado",
    textPt: "Senhor Jesus, que chamaste os primeiros discípulos dizendo 'Vinde após mim', ouço teu chamado também para mim hoje. Dá-me coragem para deixar minhas redes, meus planos, minha zona de conforto, e seguir-te sem reservas. Que eu não hesite quando chamares, nem olhe para trás quando começar a caminhar contigo. Transforma-me em pescador de homens, alguém que atrai outros para ti pelo testemunho de uma vida transformada. Onde quer que me conduzas, irei. O que quer que me peças, farei. Eis-me aqui, Senhor. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "4th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Oração pela Paz",
    textPt: "Deus de paz, que governas todas as coisas no céu e na terra, concede-me tua paz que excede todo entendimento. Em meio às tempestades da vida, sê tu minha âncora. Em meio aos conflitos, sê tu meu refúgio. Ensina-me a buscar primeiro o teu reino e tua justiça, confiando que todas as outras coisas me serão acrescentadas. Que eu seja instrumento de tua paz, levando reconciliação onde há divisão, amor onde há ódio, esperança onde há desespero. Reina em meu coração, Príncipe da Paz. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "5th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Oração de Amor",
    textPt: "Senhor, fonte de todo amor, põe em meu coração o amor de teu Nome. Que eu te ame acima de todas as coisas e ao meu próximo como a mim mesmo. Livra-me do amor egoísta que busca apenas o próprio interesse. Enche-me do teu amor ágape, que se doa sem esperar retorno, que perdoa sem limites, que serve sem reclamar. Que meu amor não seja apenas em palavras, mas em ações e em verdade. Ajuda-me a amar até mesmo meus inimigos, pois assim serei filho do Pai que está nos céus. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "6th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Oração de Confiança",
    textPt: "Deus Todo-Poderoso, minha força e meu refúgio, em ti confio. Reconheço que em minha fraqueza nada posso fazer, mas em ti tudo posso. Quando as circunstâncias me assustam, lembro-me de que tu és maior. Quando minhas forças falham, tua graça me sustenta. Ajuda-me a descansar em tua providência, sabendo que cuidas de mim com amor de Pai. Que minha confiança não esteja em mim mesmo, mas unicamente em ti, que és fiel e verdadeiro. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "7th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Oração pelo Dom do Amor",
    textPt: "Espírito Santo, derrama em meu coração o precioso dom do amor. Sem amor, tudo que faço é vazio. Sem amor, minha fé é morta. Sem amor, sou como bronze que soa. Ensina-me a amar como Cristo amou: com paciência, com bondade, sem inveja, sem orgulho. Que meu amor seja genuíno, não fingido. Que eu ame não apenas aqueles que me amam, mas também aqueles que me ferem. Pois no amor está a plenitude da lei e o cumprimento de toda justiça. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "8th Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Oração pelos Inimigos",
    textPt: "Pai misericordioso, que fazes nascer o sol sobre bons e maus, ensina-me a amar meus inimigos e orar por aqueles que me perseguem. Sei que este mandamento é difícil, mas com tua graça é possível. Livra meu coração do ressentimento e da amargura. Ajuda-me a ver em cada pessoa, mesmo naqueles que me ferem, alguém por quem Cristo morreu. Que eu possa abençoar em vez de amaldiçoar, perdoar em vez de vingar, amar em vez de odiar. Assim serei verdadeiramente filho do Pai celestial. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "Last Sunday after Epiphany",
    season: "epiphany",
    titlePt: "Oração de Transfiguração",
    textPt: "Senhor da glória, que te revelaste transfigurado no monte santo, abre meus olhos para contemplar tua majestade. Em meio às rotinas da vida, ajuda-me a vislumbrar tua glória. Que eu ouça tua voz dizendo 'Este é meu Filho amado, ouvi-o' e obedeça com alegria. Transforma-me, Senhor, de glória em glória, à tua semelhança. Que meu rosto reflita tua luz, para que outros vejam em mim algo do teu esplendor. Prepara-me para descer do monte e enfrentar o vale, levando comigo a certeza de quem tu és. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },

  // QUARESMA - Tema: Arrependimento, Jejum, Preparação para a Páscoa
  {
    liturgicalSunday: "Ash Wednesday",
    season: "lent",
    titlePt: "Oração de Cinzas",
    textPt: "Deus eterno, hoje me lembro de que sou pó e ao pó voltarei. Diante de ti, reconheço minha fragilidade e mortalidade. Mas tu, que não aborreces nada do que fizeste, ofereces perdão a todos que se arrependem. Cria em mim um coração novo e contrito. Que estas cinzas não sejam apenas um símbolo externo, mas representem a morte do meu velho homem. Nesta Quaresma, ajuda-me a jejuar não apenas de alimento, mas de tudo que me afasta de ti. Renova-me pelo teu Espírito, para que eu possa ressurgir contigo na Páscoa. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "1st Sunday in Lent",
    season: "lent",
    titlePt: "Oração contra a Tentação",
    textPt: "Senhor Jesus, que foste tentado em tudo como eu, mas sem pecado, vem em meu socorro nas horas de tentação. Quando o inimigo me atacar com dúvidas, fortalece minha fé. Quando me tentar com prazeres proibidos, lembra-me das alegrias eternas. Quando me oferecer atalhos, ajuda-me a escolher o caminho estreito. Dá-me tua Palavra como espada para resistir ao maligno. Que eu não confie em minhas próprias forças, mas no poder do teu Espírito que habita em mim. Livra-me do mal e guarda-me em tua verdade. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "2nd Sunday in Lent",
    season: "lent",
    titlePt: "Oração de Escuta",
    textPt: "Pai celestial, que falaste do céu dizendo 'Este é meu Filho amado, ouvi-o', abre meus ouvidos para ouvir a voz de Cristo. Em meio ao barulho do mundo, ajuda-me a discernir tua voz. Que eu não seja apenas ouvinte, mas praticante da Palavra. Fala, Senhor, que teu servo ouve. Ensina-me a meditar em tua lei dia e noite, para que meus caminhos sejam prósperos e eu aja com prudência. Que tua Palavra seja mais doce que o mel e mais preciosa que o ouro. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "3rd Sunday in Lent",
    season: "lent",
    titlePt: "Oração de Dependência",
    textPt: "Deus Todo-Poderoso, reconheço que não tenho poder em mim mesmo para me ajudar. Sem ti, nada posso fazer. Guarda-me tanto exteriormente em meu corpo quanto interiormente em minha alma. Defende-me de todas as adversidades que possam acontecer ao corpo e de todos os pensamentos maus que possam assaltar minha alma. Que eu não confie em minha própria sabedoria, mas busque tua orientação em todas as coisas. Sê tu meu escudo e minha fortaleza, minha rocha e meu libertador. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "4th Sunday in Lent",
    season: "lent",
    titlePt: "Oração pelo Pão da Vida",
    textPt: "Senhor Jesus, pão vivo que desceste do céu, alimenta minha alma faminta. Que eu não busque apenas o pão que perece, mas o alimento que permanece para a vida eterna. Dá-me sempre deste pão, para que eu nunca mais tenha fome. Que eu viva não só de pão, mas de toda palavra que procede da tua boca. Sacia a fome mais profunda do meu ser com tua presença. Que eu me alimente de ti na Palavra e nos Sacramentos, encontrando em ti toda satisfação. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "5th Sunday in Lent",
    season: "lent",
    titlePt: "Oração de Ordenação Interior",
    textPt: "Senhor, somente tu podes ordenar as vontades e afeições desordenadas dos pecadores. Meu coração é um caos de desejos conflitantes. Ordena minha vida segundo tua vontade. Ajuda-me a amar o que ordenas e desejar o que prometes. Em meio às rápidas e variadas mudanças do mundo, que meu coração esteja firmemente fixo onde as verdadeiras alegrias se encontram: em ti. Purifica meus desejos, santifica minhas afeições, e dirige minha vontade para que eu queira apenas o que tu queres. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "Palm Sunday",
    season: "lent",
    titlePt: "Oração de Humildade",
    textPt: "Senhor Jesus, que entraste em Jerusalém montado num jumentinho, manso e humilde, ensina-me tua humildade. Hoje te aclamam como Rei; amanhã clamarão 'Crucifica-o!' Que eu não seja como a multidão inconstante, mas permaneça fiel a ti tanto na glória quanto no sofrimento. Dá-me graça para compartilhar tua obediência ao Pai e tua fortaleza no sofrimento. Que eu possa tomar minha cruz e seguir-te, sabendo que o caminho da cruz é o caminho da glória. Hosana ao Filho de Davi! Bendito o que vem em nome do Senhor! Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },

  // PÁSCOA - Tema: Ressurreição, Vida Nova, Alegria
  {
    liturgicalSunday: "Easter Day",
    season: "easter",
    titlePt: "Oração de Ressurreição",
    textPt: "Cristo ressuscitado, vencedor da morte e do inferno, aleluia! Hoje celebro tua vitória sobre o pecado e a morte. O túmulo está vazio, a pedra foi removida, a morte foi vencida! Ressuscita-me da morte do pecado para a vida da graça. Que eu ande em novidade de vida, deixando para trás o velho homem e revestindo-me do novo. Enche meu coração de alegria pascal, para que eu possa proclamar com os anjos: 'Ele não está aqui, ressuscitou!' Vivo estás, Senhor Jesus, e porque tu vives, eu também viverei. Aleluia! Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "2nd Sunday of Easter",
    season: "easter",
    titlePt: "Oração de Renovação",
    textPt: "Deus da nova aliança, que na Páscoa estabeleceste a reconciliação entre céu e terra, renova-me pelo poder da ressurreição. Que eu seja nascido de novo pela tua Palavra que vive e permanece para sempre. Conta-me entre os filhos da luz, aqueles que andam na verdade e vivem em santidade. Que a vida ressurreta de Cristo seja manifesta em meu corpo mortal. Renova minha mente, meu coração, minha vontade. Faz de mim nova criatura em Cristo. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "3rd Sunday of Easter",
    season: "easter",
    titlePt: "Oração de Reconhecimento",
    textPt: "Senhor Jesus, que te fizeste conhecido aos discípulos no partir do pão, abre meus olhos para reconhecer-te. Quantas vezes caminhas ao meu lado e não te percebo! Quantas vezes falas comigo e não te ouço! Que eu te veja em tua Palavra, te reconheça na Ceia, te encontre nos irmãos. Arde meu coração quando me falas. Que meus olhos sejam abertos para contemplar-te em todas as tuas obras redentoras. Fica comigo, Senhor, pois a noite se aproxima. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "4th Sunday of Easter",
    season: "easter",
    titlePt: "Oração do Bom Pastor",
    textPt: "Bom Pastor, que deste tua vida pelas ovelhas, agradeço-te por me conheceres pelo nome e me chamares para teu rebanho. Que eu ouça tua voz e te siga aonde quer que me conduzas. Guia-me às águas tranquilas e aos pastos verdejantes. Quando eu me desviar, busca-me e traz-me de volta. Protege-me dos lobos que querem me devorar. Que eu não siga a voz de estranhos, mas apenas a tua. Tu és meu Pastor, nada me faltará. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "5th Sunday of Easter",
    season: "easter",
    titlePt: "Oração de Purificação",
    textPt: "Deus santo, a quem os corações verdadeiramente devotados estão abertos, purifica os pensamentos do meu coração pela inspiração do teu Espírito Santo. Que eu possa perfeitamente amar-te e dignamente engrandecer teu santo Nome. Sonda-me, ó Deus, e conhece meu coração. Prova-me e conhece meus pensamentos. Vê se há em mim algum caminho mau e guia-me pelo caminho eterno. Cria em mim um coração puro e renova em mim um espírito reto. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "6th Sunday of Easter",
    season: "easter",
    titlePt: "Oração pelo Fogo do Amor",
    textPt: "Espírito Santo, que fizeste os corações dos fiéis arderem com o fogo do teu amor, inflama meu coração com esse mesmo fogo. Que eu ame o que Deus ordena e deseje o que ele promete. Queima em mim tudo que é impuro, tudo que resiste a Deus, tudo que impede o fluir da tua graça. Que meu amor por ti seja ardente, minha devoção seja fervorosa, meu zelo seja santo. Enche-me do teu amor divino, para que eu possa amar a Deus e ao próximo com todo meu ser. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "7th Sunday of Easter",
    season: "easter",
    titlePt: "Oração de Ascensão",
    textPt: "Senhor Jesus, Rei da glória, que ascendeste ao céu para preparar-nos lugar, não nos deixes desolados. Envia-nos teu Espírito Santo para nos confortar e nos exaltar ao mesmo lugar onde tu foste antes. Que nossos corações e mentes estejam nas coisas do alto, onde Cristo está assentado à direita de Deus. Livra-nos de estarmos tão presos às coisas terrenas que esqueçamos nossa cidadania celestial. Vem, Espírito Santo, e prepara-nos para o dia em que veremos Cristo face a face. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "Ascension Day",
    season: "easter",
    titlePt: "Oração de Elevação",
    textPt: "Cristo ascendido, que subiste muito acima de todos os céus para encheres todas as coisas, eleva meu coração contigo. Que eu não viva apenas para as coisas terrenas, mas busque as coisas do alto. Assim como ascendeste em corpo glorificado, que eu também possa ascender em espírito, habitando continuamente contigo. Enche minha vida com tua presença, meu coração com tua paz, minha mente com tua verdade. Que eu viva como cidadão do céu, ainda que caminhando na terra. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },

  // PENTECOSTES
  {
    liturgicalSunday: "Day of Pentecost",
    season: "pentecost",
    titlePt: "Oração de Pentecostes",
    textPt: "Espírito Santo, que neste dia desceste sobre os apóstolos em línguas de fogo, desce também sobre mim. Enche-me com teu poder, capacita-me para o testemunho, inflama-me com teu amor. Quebra as barreiras que me separam de outros crentes e une-nos na fé. Dá-me ousadia para proclamar Cristo, sabedoria para ensinar sua Palavra, e amor para servir seu povo. Derrama teus dons sobre mim em abundância, para que eu possa edificar o corpo de Cristo. Vem, Espírito Santo, vem! Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },

  // TEMPO COMUM
  {
    liturgicalSunday: "Trinity Sunday",
    season: "ordinary",
    titlePt: "Oração Trinitária",
    textPt: "Deus Trino e Uno, Pai, Filho e Espírito Santo, prostro-me em adoração diante do mistério da Santíssima Trindade. Três Pessoas, um só Deus. Unidade na diversidade, diversidade na unidade. Que maravilha incompreensível! Guarda-me firme nesta fé, mesmo quando minha mente não compreende. Defende-me de todas as heresias e falsas doutrinas. Que eu conheça o Pai como Criador, o Filho como Redentor, o Espírito como Santificador. E que minha vida seja um louvor à Trindade Santa. Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém.",
    source: "Inspirada no Livro de Oração Comum"
  },
  {
    liturgicalSunday: "Christ the King",
    season: "ordinary",
    titlePt: "Oração de Submissão ao Rei",
    textPt: "Cristo Rei, Senhor dos senhores e Rei dos reis, submeto-me ao teu domínio de amor. Que teu reino venha, tua vontade seja feita em minha vida como no céu. Reina sobre meu coração, governa minha vontade, dirige meus passos. Que eu viva como súdito leal do teu reino, obedecendo tuas leis e proclamando teu governo. Liberta-me da escravidão do pecado e une-me ao teu povo redimido. Que todas as nações se curvem diante de ti e todo joelho se dobre ao teu nome. Vem, Senhor Jesus, e estabelece teu reino eterno. Maranata! Amém.",
    source: "Inspirada no Livro de Oração Comum"
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

async function importPrayers() {
  console.log('🙏 Iniciando importação de ORAÇÕES TEMÁTICAS...\\n');

  const years = [2026, 2027, 2028];
  let totalInserted = 0;
  let totalSkipped = 0;

  for (const year of years) {
    const cycle = getCycleForYear(year);
    console.log(`\\n📅 Ano ${year} - Ciclo ${cycle}`);
    console.log('='.repeat(50));

    for (const prayer of prayers) {
      const date = getSundayDate(year, prayer.liturgicalSunday, prayer.season);

      if (!date) {
        console.log(`  ⚠️  Pulando: ${prayer.liturgicalSunday} (data não calculável)`);
        totalSkipped++;
        continue;
      }

      const dateStr = format(date, 'yyyy-MM-dd');

      // Check if prayer already exists
      const { data: existing } = await supabase
        .from('prayers')
        .select('id')
        .eq('date', dateStr)
        .eq('cycle', cycle)
        .single();

      if (existing) {
        console.log(`  ⏭️  Já existe: ${dateStr} (${prayer.titlePt})`);
        totalSkipped++;
        continue;
      }

      // Insert prayer
      const { error } = await supabase.from('prayers').insert({
        date: dateStr,
        cycle,
        season: prayer.season,
        title: prayer.titlePt,
        text: prayer.textPt,
        source: prayer.source,
      });

      if (error) {
        console.error(`  ❌ Erro ao inserir ${dateStr}:`, error.message);
      } else {
        console.log(`  ✅ ${dateStr}: ${prayer.titlePt}`);
        totalInserted++;
      }
    }
  }

  console.log('\\n' + '='.repeat(50));
  console.log('🎉 IMPORTAÇÃO DE ORAÇÕES CONCLUÍDA!');
  console.log('='.repeat(50));
  console.log(`\\n📊 Estatísticas:`);
  console.log(`   ✅ Inseridas: ${totalInserted}`);
  console.log(`   ⏭️  Puladas: ${totalSkipped}`);
  console.log(`   📖 Total de orações únicas: ${prayers.length}`);
  console.log(`   📅 Anos processados: ${years.join(', ')}`);
  console.log(`\\n✨ Processo finalizado com sucesso!\\n`);
}

// Run the import
importPrayers().catch(console.error);
