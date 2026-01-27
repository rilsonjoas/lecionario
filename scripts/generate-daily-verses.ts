import { createClient } from '@supabase/supabase-js';
import { format, addDays, startOfYear, endOfYear } from 'date-fns';
import { calculateAdventStart, calculateEaster, getLiturgicalDayInfo } from '@/lib/liturgical-calendar';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Versículos temáticos por temporada litúrgica
const SEASONAL_VERSES = {
  advent: [
    { ref: "Romanos 13:11", text: "Já é hora de despertardes do sono, porque a nossa salvação está agora mais perto do que quando no princípio cremos.", theme: "Vigilância" },
    { ref: "Isaías 40:3", text: "Voz do que clama no deserto: Preparai o caminho do Senhor, endireitai no ermo vereda a nosso Deus.", theme: "Preparação" },
    { ref: "Filipenses 4:4", text: "Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos.", theme: "Alegria" },
    { ref: "Lucas 1:38", text: "Disse então Maria: Eis aqui a serva do Senhor; cumpra-se em mim segundo a tua palavra.", theme: "Rendição" },
  ],
  christmas: [
    { ref: "João 1:14", text: "E o Verbo se fez carne e habitou entre nós, e vimos a sua glória.", theme: "Encarnação" },
    { ref: "João 1:12", text: "Mas a todos quantos o receberam deu-lhes o poder de serem feitos filhos de Deus.", theme: "Adoção" },
    { ref: "Isaías 9:6", text: "Porque um menino nos nasceu, um filho se nos deu; e o governo estará sobre os seus ombros.", theme: "Emanuel" },
  ],
  epiphany: [
    { ref: "Mateus 5:14", text: "Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte.", theme: "Luz" },
    { ref: "Mateus 4:19", text: "Vinde após mim, e eu vos farei pescadores de homens.", theme: "Chamado" },
    { ref: "Mateus 5:9", text: "Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus.", theme: "Paz" },
    { ref: "1 Coríntios 13:13", text: "Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor.", theme: "Amor" },
  ],
  lent: [
    { ref: "Salmos 51:10", text: "Cria em mim, ó Deus, um coração puro e renova em mim um espírito reto.", theme: "Purificação" },
    { ref: "Mateus 4:4", text: "Nem só de pão viverá o homem, mas de toda palavra que sai da boca de Deus.", theme: "Palavra" },
    { ref: "João 15:5", text: "Sem mim nada podeis fazer.", theme: "Dependência" },
    { ref: "Filipenses 2:8", text: "Humilhou-se a si mesmo, sendo obediente até à morte e morte de cruz.", theme: "Humildade" },
  ],
  easter: [
    { ref: "1 Coríntios 15:20", text: "Cristo ressuscitou dos mortos e foi feito as primícias dos que dormem.", theme: "Ressurreição" },
    { ref: "2 Coríntios 5:17", text: "Se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo.", theme: "Vida Nova" },
    { ref: "João 10:11", text: "Eu sou o bom pastor; o bom pastor dá a sua vida pelas ovelhas.", theme: "Pastor" },
    { ref: "Salmos 24:7", text: "Levantai, ó portas, as vossas cabeças; levantai-vos, ó entradas eternas, e entrará o Rei da Glória.", theme: "Ascensão" },
  ],
  pentecost: [
    { ref: "Atos 2:4", text: "E todos foram cheios do Espírito Santo.", theme: "Espírito" },
    { ref: "Gálatas 5:22", text: "O fruto do Espírito é: amor, alegria, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.", theme: "Fruto" },
  ],
  ordinary: [
    { ref: "Salmos 46:10", text: "Aquietai-vos e sabei que eu sou Deus.", theme: "Confiança" },
    { ref: "Provérbios 3:5-6", text: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.", theme: "Confiança" },
    { ref: "Josué 1:9", text: "Não to mandei eu? Esforça-te e tem bom ânimo; não temas, nem te espantes, porque o Senhor, teu Deus, é contigo por onde quer que andares.", theme: "Coragem" },
  ]
};

// Reflexões genéricas que podem ser adaptadas
const REFLECTION_TEMPLATES = [
  "Este versículo nos lembra que {theme}. Que hoje possamos viver esta verdade em nossas ações e pensamentos.",
  "A Palavra de Deus nos chama a {theme}. Que o Espírito Santo nos capacite a responder com fé e obediência.",
  "Hoje, reflita sobre {theme}. Deus nos convida a crescer nesta área de nossa vida espiritual.",
  "Este versículo é um convite a {theme}. Que possamos aceitar este convite com coração aberto.",
  "Deus nos ensina sobre {theme} através de sua Palavra. Que esta verdade transforme nosso dia.",
];

function generateReflection(verseRef: string, verseText: string, theme: string): string {
  // Reflexões personalizadas baseadas no tema
  const reflections: Record<string, string> = {
    "Vigilância": "Viver vigilante não é viver ansioso, mas alerta e preparado. Que hoje possamos estar atentos à presença de Deus em cada momento.",
    "Preparação": "Preparar o caminho do Senhor significa remover os obstáculos em nosso coração. Que hoje possamos identificar e remover o que nos afasta de Deus.",
    "Alegria": "A alegria cristã não depende das circunstâncias, mas da presença de Deus. Que hoje possamos encontrar alegria nEle, independentemente do que aconteça.",
    "Rendição": "Dizer 'sim' a Deus é render nossa vontade à dEle. Que hoje possamos confiar que Seus planos são melhores que os nossos.",
    "Encarnação": "Deus se fez carne para estar conosco. Que maravilha! Que hoje possamos viver conscientes de que Emanuel, Deus está conosco.",
    "Adoção": "Somos filhos de Deus, não por mérito, mas por graça. Que hoje possamos viver na liberdade e alegria desta identidade.",
    "Emanuel": "Deus conosco - esta é a promessa do Natal que continua hoje. Que possamos experimentar Sua presença em cada momento.",
    "Luz": "Somos chamados a ser luz no mundo. Que hoje nossa vida brilhe de tal forma que outros vejam Cristo em nós.",
    "Chamado": "Deus nos chama a segui-Lo. Que hoje possamos responder com prontidão e alegria, deixando tudo para trás.",
    "Paz": "A paz de Deus excede todo entendimento. Que hoje possamos ser pacificadores, levando reconciliação onde há divisão.",
    "Amor": "O amor é o maior de todos os mandamentos. Que hoje possamos amar a Deus e ao próximo com todo nosso ser.",
    "Purificação": "Deus deseja purificar nosso coração. Que hoje possamos nos render a Seu trabalho santificador em nós.",
    "Palavra": "A Palavra de Deus é nosso alimento espiritual. Que hoje possamos nos alimentar dela e encontrar força para viver.",
    "Dependência": "Sem Cristo, nada podemos fazer. Que hoje possamos reconhecer nossa total dependência dEle.",
    "Humildade": "Cristo nos ensina humildade através de Sua própria vida. Que hoje possamos seguir Seu exemplo de serviço.",
    "Ressurreição": "Cristo vive! Esta verdade muda tudo. Que hoje possamos viver no poder da ressurreição.",
    "Vida Nova": "Em Cristo, somos novas criaturas. Que hoje possamos deixar para trás o velho e abraçar o novo que Deus está fazendo.",
    "Pastor": "Jesus é nosso Bom Pastor que cuida de nós. Que hoje possamos confiar em Sua liderança e proteção.",
    "Ascensão": "Cristo está à direita do Pai, intercedendo por nós. Que conforto! Que hoje possamos descansar nesta verdade.",
    "Espírito": "O Espírito Santo nos capacita e guia. Que hoje possamos ser cheios do Espírito e viver em Seu poder.",
    "Fruto": "O Espírito produz fruto em nós. Que hoje possamos permitir que Ele trabalhe, produzindo amor, alegria e paz.",
    "Confiança": "Confiar em Deus é descansar em Sua soberania. Que hoje possamos entregar nossas preocupações a Ele.",
    "Coragem": "Deus está conosco, portanto não precisamos temer. Que hoje possamos ter coragem para fazer o que Ele nos chama.",
  };

  return reflections[theme] || `Este versículo nos convida a refletir sobre ${theme.toLowerCase()}. Que Deus nos ajude a viver esta verdade hoje.`;
}

async function generateDailyVerses() {
  console.log('📖 Gerando versículos diários com reflexões...\\n');

  const years = [2026, 2027, 2028];
  let totalInserted = 0;
  let totalSkipped = 0;

  for (const year of years) {
    console.log(`\\n📅 Ano ${year}`);
    console.log('='.repeat(60));

    const startDate = startOfYear(new Date(year, 0, 1));
    const endDate = endOfYear(new Date(year, 11, 31));
    
    let currentDate = startDate;
    let verseIndex = 0;

    while (currentDate <= endDate) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const liturgicalInfo = getLiturgicalDayInfo(currentDate);
      const season = liturgicalInfo.season as keyof typeof SEASONAL_VERSES;

      // Pegar versículos da temporada
      const seasonVerses = SEASONAL_VERSES[season] || SEASONAL_VERSES.ordinary;
      const verse = seasonVerses[verseIndex % seasonVerses.length];

      // Check if verse already exists
      const { data: existing } = await supabase
        .from('daily_verses')
        .select('id')
        .eq('date', dateStr)
        .single();

      if (existing) {
        totalSkipped++;
        currentDate = addDays(currentDate, 1);
        verseIndex++;
        continue;
      }

      // Generate reflection
      const reflection = generateReflection(verse.ref, verse.text, verse.theme);

      // Insert verse
      const { error } = await supabase.from('daily_verses').insert({
        date: dateStr,
        verse_reference: verse.ref,
        verse_text: verse.text,
        reflection,
        theme: verse.theme,
      });

      if (error) {
        console.error(`  ❌ ${dateStr}:`, error.message);
      } else {
        totalInserted++;
        if (totalInserted % 30 === 0) {
          console.log(`  ✅ ${totalInserted} versículos inseridos...`);
        }
      }

      currentDate = addDays(currentDate, 1);
      verseIndex++;
    }

    console.log(`  ✅ Ano ${year} completo!`);
  }

  console.log('\\n' + '='.repeat(60));
  console.log('🎉 GERAÇÃO DE VERSÍCULOS DIÁRIOS CONCLUÍDA!');
  console.log('='.repeat(60));
  console.log(`\\n📊 Estatísticas:`);
  console.log(`   ✅ Inseridos: ${totalInserted}`);
  console.log(`   ⏭️  Pulados: ${totalSkipped}`);
  console.log(`   📅 Anos: ${years.join(', ')}`);
  console.log(`\\n✨ Processo finalizado!\\n`);
}

generateDailyVerses().catch(console.error);
