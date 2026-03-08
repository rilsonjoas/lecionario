import { createClient } from '@supabase/supabase-js';
import { format, addDays } from 'date-fns';
import { calculateAdventStart, calculateEaster } from '@/lib/liturgical-calendar';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface WeeklyPrayerSet {
  liturgicalSunday: string;
  season: 'advent' | 'christmas' | 'epiphany' | 'lent' | 'easter' | 'pentecost' | 'ordinary';
  theme: string; // Tema do domingo
  prayers: {
    monday: { title: string; text: string };
    tuesday: { title: string; text: string };
    wednesday: { title: string; text: string };
    thursday: { title: string; text: string };
    friday: { title: string; text: string };
    saturday: { title: string; text: string };
  };
}

// Orações semanais conectadas aos temas dos domingos
const weeklyPrayers: WeeklyPrayerSet[] = [
  // ADVENTO
  {
    liturgicalSunday: "1st Sunday of Advent",
    season: "advent",
    theme: "Vigilância e Esperança",
    prayers: {
      monday: {
        title: "Segunda - Início Vigilante",
        text: "Senhor Jesus, ao iniciar esta semana, ajuda-me a viver vigilante. Que eu não seja encontrado dormindo quando chamares, mas alerta e pronto. Guarda meu coração da distração e da preguiça espiritual. Que cada dia desta semana seja vivido com a consciência de que tu virás novamente. Prepara-me para te receber com alegria. Amém."
      },
      tuesday: {
        title: "Terça - Esperança Ativa",
        text: "Deus de esperança, em meio às atividades desta terça-feira, mantém viva em mim a esperança da tua vinda. Que minha esperança não seja passiva, mas ativa, transformando minha maneira de viver. Ajuda-me a viver hoje como quem aguarda o Rei que virá. Que minha vida seja testemunho de esperança para outros. Amém."
      },
      wednesday: {
        title: "Quarta - Meio da Semana, Meio do Caminho",
        text: "Cristo, no meio desta semana, renova minha vigilância. Não permitas que eu relaxe ou me esqueça de que tu virás. Assim como estou no meio da semana, estou no meio do caminho entre tua primeira e segunda vinda. Ajuda-me a perseverar até o fim, sempre alerta, sempre esperando. Amém."
      },
      thursday: {
        title: "Quinta - Preparação Interior",
        text: "Espírito Santo, prepara meu coração para o que virá. Purifica-me de tudo que me impede de estar pronto para Cristo. Que eu não esteja ocupado com coisas que não importam quando ele vier. Ordena minha vida, meus pensamentos, meus desejos, para que eu esteja preparado. Amém."
      },
      friday: {
        title: "Sexta - Cruz e Esperança",
        text: "Senhor Jesus, que morreste na cruz por mim, ensina-me a esperar com paciência. A cruz me lembra que tua vinda custou tudo. Que eu não desperdice este tempo de espera, mas o use para crescer em santidade. Que a memória da cruz fortaleça minha esperança na glória que virá. Amém."
      },
      saturday: {
        title: "Sábado - Preparação para o Domingo",
        text: "Deus de amor, ao me preparar para o domingo, limpa meu coração. Que eu possa celebrar o dia do Senhor com alegria e reverência. Prepara-me para ouvir tua Palavra e adorar-te em espírito e verdade. Que este sábado seja um tempo de preparação espiritual, não apenas física. Amém."
      }
    }
  },
  
  {
    liturgicalSunday: "2nd Sunday of Advent",
    season: "advent",
    theme: "Arrependimento e Preparação",
    prayers: {
      monday: {
        title: "Segunda - Caminhos Tortuosos",
        text: "Senhor, ao iniciar esta semana, reconheço os caminhos tortuosos em meu coração. Há áreas onde me desviei de ti. Vem com tua graça e endireita o que está torto. Prepara o caminho para que Cristo possa entrar plenamente em minha vida. Dá-me coragem para mudar. Amém."
      },
      tuesday: {
        title: "Terça - Montanhas de Orgulho",
        text: "Pai celestial, vejo as montanhas de orgulho que impedem minha aproximação de ti. Nivela essas montanhas. Ensina-me humildade. Que eu reconheça minha dependência total de ti. Quebra meu orgulho e faz-me como criança diante de ti. Amém."
      },
      wednesday: {
        title: "Quarta - Vales de Desespero",
        text: "Deus de esperança, enche os vales de desespero em minha alma. Onde há tristeza, traz alegria. Onde há desesperança, traz esperança. Onde há vazio, traz tua plenitude. Que tua presença preencha cada espaço vazio em meu coração. Amém."
      },
      thursday: {
        title: "Quinta - Voz Profética",
        text: "Senhor, abre meus ouvidos para ouvir tua voz profética. Fala comigo através de tua Palavra. Mostra-me onde preciso me arrepender. Não permitas que eu endureça meu coração. Que eu seja como solo fértil, pronto para receber tua semente. Amém."
      },
      friday: {
        title: "Sexta - Arrependimento Genuíno",
        text: "Cristo, que vieste chamar pecadores ao arrependimento, chama-me novamente hoje. Que meu arrependimento não seja apenas de palavras, mas de coração. Transforma-me de dentro para fora. Que eu abandone o pecado e me volte completamente para ti. Amém."
      },
      saturday: {
        title: "Sábado - Coração Preparado",
        text: "Espírito Santo, prepara meu coração para receber Cristo amanhã. Que eu venha ao culto com coração contrito e humilde. Limpa-me de todo pecado. Prepara-me para ouvir, adorar e responder. Que meu coração seja morada digna do Rei. Amém."
      }
    }
  },

  {
    liturgicalSunday: "3rd Sunday of Advent",
    season: "advent",
    theme: "Alegria no Senhor",
    prayers: {
      monday: {
        title: "Segunda - Alegria que Não Depende",
        text: "Senhor da alegria, ensina-me a alegrar-me em ti, não nas circunstâncias. Que minha alegria seja fundamentada em quem tu és, não no que tenho ou no que acontece. Mesmo em meio às dificuldades desta semana, que eu possa encontrar alegria em tua presença. Amém."
      },
      tuesday: {
        title: "Terça - Testemunho de Alegria",
        text: "Deus de júbilo, faz de mim testemunha de tua alegria. Que outros vejam em mim algo diferente - não uma felicidade superficial, mas uma alegria profunda que vem de ti. Que minha vida aponte para ti como fonte de toda alegria verdadeira. Amém."
      },
      wednesday: {
        title: "Quarta - Alegria em Meio à Espera",
        text: "Cristo, que estás próximo, enche-me de alegria mesmo enquanto espero. Que a espera não seja tempo de tristeza, mas de antecipação alegre. Assim como uma noiva aguarda o noivo com alegria, que eu te aguarde com coração jubiloso. Amém."
      },
      thursday: {
        title: "Quinta - Gratidão e Alegria",
        text: "Pai bondoso, hoje quero agradecer-te por tuas bênçãos. Cada dádiva tua é motivo de alegria. Abre meus olhos para ver tua bondade ao meu redor. Que a gratidão encha meu coração de alegria. Obrigado por tudo que tens feito. Amém."
      },
      friday: {
        title: "Sexta - Alegria da Salvação",
        text: "Salvador, restitui-me a alegria da tua salvação. Quando esqueço o que fizeste por mim, minha alegria se esvai. Lembra-me da cruz, do túmulo vazio, da vida eterna que me deste. Que esta lembrança encha meu coração de alegria indizível. Amém."
      },
      saturday: {
        title: "Sábado - Preparação Alegre",
        text: "Senhor, preparo-me para o domingo com alegria. Que eu venha à tua casa com cânticos de louvor. Que minha adoração seja cheia de júbilo. Prepara meu coração para celebrar-te com alegria genuína e profunda. Amém."
      }
    }
  },

  {
    liturgicalSunday: "4th Sunday of Advent",
    season: "advent",
    theme: "O Sim de Maria - Rendição",
    prayers: {
      monday: {
        title: "Segunda - Meu Sim a Deus",
        text: "Senhor, como Maria disse 'sim' ao teu chamado, hoje eu também digo 'sim'. Rendo minha vontade à tua. Que se faça em mim segundo tua palavra. Ajuda-me a confiar mesmo quando não entendo. Que minha vida seja uma resposta afirmativa ao teu amor. Amém."
      },
      tuesday: {
        title: "Terça - Confiança em Meio ao Desconhecido",
        text: "Deus fiel, Maria confiou em ti mesmo sem saber todos os detalhes. Ensina-me essa confiança. Há muitas coisas que não entendo em minha vida, mas confio em ti. Que eu possa descansar em tua soberania e bondade. Amém."
      },
      wednesday: {
        title: "Quarta - Humildade de Maria",
        text: "Pai celestial, Maria se chamou de 'serva do Senhor'. Que eu também tenha essa humildade. Não sou maior que meu chamado. Não sou indispensável. Sou apenas servo. Usa-me como quiseres, Senhor. Amém."
      },
      thursday: {
        title: "Quinta - Morada para Cristo",
        text: "Espírito Santo, assim como preparaste Maria para ser morada de Cristo, prepara-me também. Purifica meu coração. Santifica minha vida. Que Cristo possa habitar em mim plenamente. Faz de mim templo digno de tua presença. Amém."
      },
      friday: {
        title: "Sexta - Obediência Radical",
        text: "Senhor Jesus, a obediência de Maria foi radical e custou muito. Ensina-me obediência assim. Não uma obediência parcial, mas total. Não apenas quando é fácil, mas especialmente quando é difícil. Que eu obedeça porque te amo. Amém."
      },
      saturday: {
        title: "Sábado - Véspera do Natal",
        text: "Deus Emanuel, amanhã celebramos teu nascimento. Prepara meu coração para receber-te novamente. Que Cristo nasça em mim de forma nova. Que eu experimente o milagre da Encarnação em minha própria vida. Vem, Senhor Jesus. Amém."
      }
    }
  },

  // NATAL
  {
    liturgicalSunday: "Christmas Day",
    season: "christmas",
    theme: "Encarnação - Deus Conosco",
    prayers: {
      monday: {
        title: "Segunda - Maravilha da Encarnação",
        text: "Deus eterno que se fez carne, prostro-me em adoração. O mistério do Natal continua me maravilhando. Tu, o Criador, tornaste-te criatura. Tu, o Infinito, entraste no finito. Tu, o Eterno, entraste no tempo. Tudo isso por amor a mim. Que maravilha! Amém."
      },
      tuesday: {
        title: "Terça - Emanuel em Meu Dia",
        text: "Emanuel, Deus conosco, estás comigo hoje. Não apenas naquele dia em Belém, mas aqui e agora. Que eu viva consciente de tua presença. Em cada tarefa, em cada conversa, em cada momento - tu estás comigo. Que esta verdade transforme meu dia. Amém."
      },
      wednesday: {
        title: "Quarta - Humildade do Rei",
        text: "Senhor Jesus, nasceste numa manjedoura, não num palácio. Ensina-me tua humildade. Que eu não busque grandeza aos olhos do mundo, mas simplicidade aos teus olhos. Que eu seja como tu: humilde de coração. Amém."
      },
      thursday: {
        title: "Quinta - Amor Encarnado",
        text: "Pai de amor, o Natal revela a profundidade de teu amor. Não apenas falaste de amor, mas o encarnaste. Ajuda-me a fazer o mesmo. Que meu amor não seja apenas palavras, mas ações concretas. Que eu encarne teu amor para outros. Amém."
      },
      friday: {
        title: "Sexta - Da Manjedoura à Cruz",
        text: "Cristo, nasceste para morrer. A manjedoura apontava para a cruz. O bebê de Belém tornou-se o Salvador do Calvário. Obrigado por toda a jornada. Obrigado por vir, por viver, por morrer, por ressuscitar - tudo por mim. Amém."
      },
      saturday: {
        title: "Sábado - Celebração Contínua",
        text: "Senhor, o Natal não é apenas um dia, mas uma realidade contínua. Tu continuas sendo Emanuel, Deus conosco. Que eu celebre esta verdade não apenas em dezembro, mas todos os dias. Que minha vida seja Natal contínuo. Amém."
      }
    }
  },

  {
    liturgicalSunday: "1st Sunday after Christmas",
    season: "christmas",
    theme: "Filhos de Deus",
    prayers: {
      monday: {
        title: "Segunda - Identidade como Filho",
        text: "Pai celestial, hoje me lembro: sou teu filho. Não servo, não escravo, mas filho amado. Esta é minha identidade mais profunda. Que eu viva a partir desta verdade. Que todas as minhas escolhas reflitam quem sou em ti. Amém."
      },
      tuesday: {
        title: "Terça - Privilégios de Filho",
        text: "Abba Pai, como filho, tenho acesso a ti. Posso vir à tua presença com confiança. Posso chamar-te de Pai. Que privilégio! Ajuda-me a nunca tomar isso como garantido. Que eu viva na liberdade e alegria de ser teu filho. Amém."
      },
      wednesday: {
        title: "Quarta - Responsabilidades de Filho",
        text: "Senhor, ser filho também traz responsabilidades. Devo viver de maneira digna do nome que levo. Devo honrar-te com minha vida. Ajuda-me a representar-te bem. Que minha vida traga glória ao teu nome. Amém."
      },
      thursday: {
        title: "Quinta - Herança Eterna",
        text: "Pai rico em graça, como filho, sou herdeiro. Tudo que é teu é meu. Que herança gloriosa! Não apenas bênçãos temporais, mas eternas. Ajuda-me a viver com perspectiva eterna, sabendo que sou herdeiro do Reino. Amém."
      },
      friday: {
        title: "Sexta - Irmãos em Cristo",
        text: "Deus de amor, se sou filho, todos os crentes são meus irmãos. Que eu os trate como família. Que eu ame, sirva, perdoe e suporte meus irmãos em Cristo. Que a igreja seja verdadeiramente uma família. Amém."
      },
      saturday: {
        title: "Sábado - Preparação Familiar",
        text: "Pai amoroso, amanhã me encontrarei com minha família espiritual. Prepara meu coração para adorar-te com meus irmãos. Que haja unidade, amor e alegria quando nos reunirmos como filhos do mesmo Pai. Amém."
      }
    }
  }
];

// Função auxiliar para calcular data do domingo
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

  // ... (adicionar outros casos conforme necessário)
  
  return null;
}

function getCycleForYear(year: number): 'A' | 'B' | 'C' {
  const remainder = year % 3;
  if (remainder === 0) return 'A';
  if (remainder === 1) return 'B';
  return 'C';
}

async function importWeeklyPrayers() {
  console.log('🙏 Iniciando importação de ORAÇÕES SEMANAIS...\\n');

  const years = [2026, 2027, 2028];
  let totalInserted = 0;
  let totalSkipped = 0;

  for (const year of years) {
    const cycle = getCycleForYear(year);
    console.log(`\\n📅 Ano ${year} - Ciclo ${cycle}`);
    console.log('='.repeat(50));

    for (const prayerSet of weeklyPrayers) {
      const sundayDate = getSundayDate(year, prayerSet.liturgicalSunday, prayerSet.season);

      if (!sundayDate) {
        console.log(`  ⚠️  Pulando: ${prayerSet.liturgicalSunday} (data não calculável)`);
        continue;
      }

      const sundayDateStr = format(sundayDate, 'yyyy-MM-dd');

      // Inserir orações de segunda a sábado
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      
      for (let i = 0; i < days.length; i++) {
        const dayName = days[i] as keyof typeof prayerSet.prayers;
        const prayer = prayerSet.prayers[dayName];
        const dayOfWeek = i + 1; // 1=Monday, 6=Saturday

        // Check if prayer already exists
        const { data: existing } = await supabase
          .from('weekly_prayers')
          .select('id')
          .eq('sunday_date', sundayDateStr)
          .eq('day_of_week', dayOfWeek)
          .eq('cycle', cycle)
          .single();

        if (existing) {
          totalSkipped++;
          continue;
        }

        // Insert prayer
        const { error } = await supabase.from('weekly_prayers').insert({
          sunday_date: sundayDateStr,
          day_of_week: dayOfWeek,
          cycle,
          season: prayerSet.season,
          title: prayer.title,
          text: prayer.text,
        });

        if (error) {
          console.error(`  ❌ Erro ao inserir ${sundayDateStr} (dia ${dayOfWeek}):`, error.message);
        } else {
          totalInserted++;
        }
      }
      
      console.log(`  ✅ ${sundayDateStr}: ${prayerSet.liturgicalSunday} (6 orações)`);
    }
  }

  console.log('\\n' + '='.repeat(50));
  console.log('🎉 IMPORTAÇÃO DE ORAÇÕES SEMANAIS CONCLUÍDA!');
  console.log('='.repeat(50));
  console.log(`\\n📊 Estatísticas:`);
  console.log(`   ✅ Inseridas: ${totalInserted}`);
  console.log(`   ⏭️  Puladas: ${totalSkipped}`);
  console.log(`   📖 Total de conjuntos: ${weeklyPrayers.length}`);
  console.log(`   📅 Anos processados: ${years.join(', ')}`);
  console.log(`\\n✨ Processo finalizado com sucesso!\\n`);
}

// Run the import
importWeeklyPrayers().catch(console.error);
