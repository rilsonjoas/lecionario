import { createClient } from '@supabase/supabase-js';

// Script para popular o banco de dados com dados iniciais
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedDatabase() {
  console.log('🌱 Iniciando seed do banco de dados...');
  
  // Data de exemplo: 25 de janeiro de 2026 (Terceiro Domingo após a Epifania, Ano A)
  const date = '2026-01-25';
  const cycle = 'A'; // 2026 é Ano A no calendário litúrgico
  const season = 'epiphany';
  
  try {
    // Inserir leituras
    console.log('📖 Inserindo leituras...');
    const { error: readingsError } = await supabase.from('readings').insert([
      {
        date,
        cycle,
        season,
        reading_type: 'first_reading',
        reference: 'Neemias 8:1-3, 5-6, 8-10',
        citation: 'Neemias 8:1-3, 5-6, 8-10',
        text: 'Todo o povo se reuniu como um só homem na praça que fica diante da Porta das Águas. Pediram ao escriba Esdras que trouxesse o Livro da Lei de Moisés, que o Senhor dera a Israel. Então, no primeiro dia do sétimo mês, o sacerdote Esdras trouxe a Lei diante da assembleia, que era composta de homens e mulheres e de todos os que podiam entender. Desde o raiar da alva até o meio-dia, ele a leu em voz alta, na praça diante da Porta das Águas, na presença dos homens, das mulheres e de outros que podiam entender. E todo o povo ouvia com atenção o Livro da Lei.',
        translation: 'NVI'
      },
      {
        date,
        cycle,
        season,
        reading_type: 'psalm',
        reference: 'Salmo 19',
        citation: 'Salmo 19',
        text: 'Os céus declaram a glória de Deus; o firmamento proclama a obra das suas mãos. Um dia fala disso a outro dia; uma noite o revela a outra noite. Sem discurso nem palavras, não se ouve a sua voz. Mas a sua voz ressoa por toda a terra, e as suas palavras, até os confins do mundo.',
        translation: 'NVI'
      },
      {
        date,
        cycle,
        season,
        reading_type: 'second_reading',
        reference: '1 Coríntios 12:12-31a',
        citation: '1 Coríntios 12:12-31a',
        text: 'O corpo é uma unidade, embora tenha muitos membros. E todos os membros, mesmo sendo muitos, formam um só corpo. Assim também com respeito a Cristo. Pois em um só corpo todos nós fomos batizados em um único Espírito: quer judeus, quer gregos, quer escravos, quer livres. E a todos nós foi dado beber de um único Espírito.',
        translation: 'NVI'
      },
      {
        date,
        cycle,
        season,
        reading_type: 'gospel',
        reference: 'Lucas 4:14-21',
        citation: 'Lucas 4:14-21',
        text: 'Jesus voltou para a Galileia no poder do Espírito, e por toda aquela região espalhou-se sua fama. Ele estava ensinando nas sinagogas, e todos o elogiavam. Foi a Nazaré, onde havia sido criado, e no dia de sábado entrou na sinagoga, como era seu costume. E levantou-se para ler. Foi-lhe entregue o livro do profeta Isaías. Abriu-o e encontrou o lugar onde está escrito: "O Espírito do Senhor está sobre mim, porque ele me ungiu para pregar boas novas aos pobres. Ele me enviou para proclamar liberdade aos presos e recuperação da vista aos cegos, para libertar os oprimidos e proclamar o ano da graça do Senhor". Então ele fechou o livro, devolveu-o ao assistente e assentou-se. Na sinagoga, todos tinham os olhos fitos nele; e ele começou a dizer-lhes: "Hoje se cumpriu a Escritura que vocês acabaram de ouvir".',
        translation: 'NVI'
      }
    ]);
    
    if (readingsError) throw readingsError;
    console.log('✅ Leituras inseridas com sucesso!');
    
    // Inserir coleta
    console.log('🙏 Inserindo coleta...');
    const { error: collectError } = await supabase.from('collects').insert({
      date,
      cycle,
      season,
      title: 'Coleta do Terceiro Domingo após a Epifania',
      text: 'Deus Todo-Poderoso, pelo teu Filho Jesus Cristo nos revelaste a tua glória. Preserva a obra que começaste em nós, para que possamos proclamar a tua salvação em toda a terra; por Jesus Cristo, nosso Senhor, que vive e reina contigo e com o Espírito Santo, um só Deus, agora e para sempre. Amém.',
      source: 'Livro de Oração Comum'
    });
    
    if (collectError) throw collectError;
    console.log('✅ Coleta inserida com sucesso!');
    
    // Inserir oração
    console.log('🕊️ Inserindo oração...');
    const { data: prayerData, error: prayerError } = await supabase.from('prayers').insert({
      date,
      cycle,
      season,
      title: 'Oração do Terceiro Domingo após a Epifania',
      text: 'Senhor Jesus Cristo, que proclamaste o ano da graça do Senhor e trouxeste boas novas aos pobres: Concede-nos o teu Espírito, para que possamos ser instrumentos da tua paz e arautos da tua salvação; tu que vives e reinas com o Pai e o Espírito Santo, um só Deus, agora e para sempre. Amém.',
      author: 'Tradição Anglicana',
      source: 'Livro de Oração Comum'
    }).select().single();
    
    if (prayerError) throw prayerError;
    console.log('✅ Oração inserida com sucesso!');
    
    // Inserir meditação
    console.log('💭 Inserindo meditação...');
    const { data: meditationData, error: meditationError } = await supabase.from('meditations').insert({
      date,
      cycle,
      season,
      prompt: 'Jesus proclama que "hoje se cumpriu a Escritura". Ele veio para trazer boas novas aos pobres, libertar os cativos e proclamar o ano da graça do Senhor. Como você pode ser parte dessa missão de Jesus em sua vida diária? De que maneiras você pode trazer esperança e libertação para aqueles ao seu redor?',
      duration: '10-15 minutos'
    }).select().single();
    
    if (meditationError) throw meditationError;
    console.log('✅ Meditação inserida com sucesso!');
    
    // Inserir questões de meditação
    console.log('❓ Inserindo questões de meditação...');
    const { error: questionsError } = await supabase.from('meditation_questions').insert([
      {
        meditation_id: meditationData.id,
        question: 'Quem são os "pobres" e "cativos" em minha comunidade que precisam ouvir as boas novas?',
        order_index: 1
      },
      {
        meditation_id: meditationData.id,
        question: 'Como o Espírito do Senhor está me capacitando para ser instrumento de libertação e esperança?',
        order_index: 2
      },
      {
        meditation_id: meditationData.id,
        question: 'De que maneiras práticas posso proclamar o "ano da graça do Senhor" esta semana?',
        order_index: 3
      }
    ]);
    
    if (questionsError) throw questionsError;
    console.log('✅ Questões de meditação inseridas com sucesso!');
    
    console.log('\n🎉 Seed concluído com sucesso!');
    console.log(`📅 Dados inseridos para: ${date} (Ano ${cycle})`);
    
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
    process.exit(1);
  }
}

// Executar seed
seedDatabase()
  .then(() => {
    console.log('\n✨ Banco de dados pronto para uso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erro fatal:', error);
    process.exit(1);
  });
