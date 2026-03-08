import { createClient } from '@supabase/supabase-js';
import { format, addDays } from 'date-fns';
import { calculateAdventStart, calculateEaster } from '@/lib/liturgical-calendar';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Definição de temas e orações para TODOS os 33 domingos
const SUNDAY_THEMES = {
  // ADVENTO (4)
  "1st Sunday of Advent": {
    season: "advent",
    theme: "Vigilância e Esperança",
    keywords: ["vigilante", "esperança", "preparação", "vinda", "alerta", "aguardar"]
  },
  "2nd Sunday of Advent": {
    season: "advent",
    theme: "Arrependimento",
    keywords: ["arrependimento", "preparar caminho", "conversão", "mudança", "profeta", "João Batista"]
  },
  "3rd Sunday of Advent": {
    season: "advent",
    theme: "Alegria",
    keywords: ["alegria", "júbilo", "Gaudete", "regozijo", "próximo", "celebração"]
  },
  "4th Sunday of Advent": {
    season: "advent",
    theme: "Rendição",
    keywords: ["sim", "Maria", "obediência", "rendição", "confiança", "morada"]
  },
  
  // NATAL (2)
  "Christmas Day": {
    season: "christmas",
    theme: "Encarnação",
    keywords: ["Emanuel", "Deus conosco", "encarnação", "manjedoura", "humildade", "amor"]
  },
  "1st Sunday after Christmas": {
    season: "christmas",
    theme: "Filhos de Deus",
    keywords: ["filho", "adoção", "família", "identidade", "herdeiro", "Abba"]
  },
  
  // EPIFANIA (10)
  "Epiphany": {
    season: "epiphany",
    theme: "Luz para as Nações",
    keywords: ["luz", "nações", "magos", "revelação", "estrela", "missão"]
  },
  "2nd Sunday after Epiphany": {
    season: "epiphany",
    theme: "Luz do Mundo",
    keywords: ["luz", "trevas", "brilhar", "testemunho", "claridade", "iluminar"]
  },
  "3rd Sunday after Epiphany": {
    season: "epiphany",
    theme: "Chamado",
    keywords: ["chamado", "seguir", "discípulo", "deixar", "pescador", "vocação"]
  },
  "4th Sunday after Epiphany": {
    season: "epiphany",
    theme: "Paz",
    keywords: ["paz", "pacificador", "reconciliação", "shalom", "harmonia", "unidade"]
  },
  "5th Sunday after Epiphany": {
    season: "epiphany",
    theme: "Amor",
    keywords: ["amor", "ágape", "próximo", "mandamento", "caridade", "amar"]
  },
  "6th Sunday after Epiphany": {
    season: "epiphany",
    theme: "Confiança",
    keywords: ["confiança", "fé", "dependência", "força", "refúgio", "segurança"]
  },
  "7th Sunday after Epiphany": {
    season: "epiphany",
    theme: "Amor Verdadeiro",
    keywords: ["amor nunca falha", "paciente", "bondoso", "1 Coríntios 13", "caridade", "virtude"]
  },
  "8th Sunday after Epiphany": {
    season: "epiphany",
    theme: "Amar Inimigos",
    keywords: ["inimigos", "perdão", "orar", "abençoar", "perseguição", "misericórdia"]
  },
  "Last Sunday after Epiphany": {
    season: "epiphany",
    theme: "Transfiguração",
    keywords: ["transfiguração", "glória", "monte", "transformação", "ouvir", "resplandecer"]
  },
  
  // QUARESMA (7)
  "Ash Wednesday": {
    season: "lent",
    theme: "Mortalidade e Graça",
    keywords: ["cinzas", "pó", "mortalidade", "arrependimento", "contrito", "humildade"]
  },
  "1st Sunday in Lent": {
    season: "lent",
    theme: "Tentação",
    keywords: ["tentação", "deserto", "resistir", "Palavra", "vencer", "provação"]
  },
  "2nd Sunday in Lent": {
    season: "lent",
    theme: "Escuta",
    keywords: ["ouvir", "voz", "Filho amado", "escutar", "obedecer", "atenção"]
  },
  "3rd Sunday in Lent": {
    season: "lent",
    theme: "Dependência",
    keywords: ["dependência", "fraqueza", "ajuda", "sem ti nada", "socorro", "necessidade"]
  },
  "4th Sunday in Lent": {
    season: "lent",
    theme: "Pão da Vida",
    keywords: ["pão", "vida", "alimentar", "saciar", "fome", "satisfação"]
  },
  "5th Sunday in Lent": {
    season: "lent",
    theme: "Desejos Ordenados",
    keywords: ["desejos", "vontade", "ordenar", "amar o que ordenas", "coração", "afeições"]
  },
  "Palm Sunday": {
    season: "lent",
    theme: "Humildade do Rei",
    keywords: ["Hosana", "jumentinho", "humildade", "Rei", "cruz", "sofrimento"]
  },
  
  // PÁSCOA (9)
  "Easter Day": {
    season: "easter",
    theme: "Ressurreição",
    keywords: ["ressuscitou", "túmulo vazio", "vitória", "morte vencida", "vida", "Aleluia"]
  },
  "2nd Sunday of Easter": {
    season: "easter",
    theme: "Vida Nova",
    keywords: ["nascido de novo", "regenerado", "nova criatura", "renovação", "esperança viva", "transformação"]
  },
  "3rd Sunday of Easter": {
    season: "easter",
    theme: "Reconhecimento",
    keywords: ["Emaús", "partir do pão", "reconhecer", "olhos abertos", "presença", "caminho"]
  },
  "4th Sunday of Easter": {
    season: "easter",
    theme: "Bom Pastor",
    keywords: ["pastor", "ovelhas", "voz", "guiar", "proteger", "rebanho"]
  },
  "5th Sunday of Easter": {
    season: "easter",
    theme: "Coração Puro",
    keywords: ["puro", "coração", "limpo", "santidade", "purificação", "integridade"]
  },
  "6th Sunday of Easter": {
    season: "easter",
    theme: "Fogo do Amor",
    keywords: ["fogo", "amor ardente", "Espírito", "chama", "fervor", "paixão"]
  },
  "7th Sunday of Easter": {
    season: "easter",
    theme: "Olhos no Céu",
    keywords: ["céu", "ascensão", "eterno", "esperança", "glória", "perspectiva"]
  },
  "Ascension Day": {
    season: "easter",
    theme: "Cristo Exaltado",
    keywords: ["ascensão", "direita do Pai", "intercede", "exaltado", "glorificado", "majestade"]
  },
  
  // PENTECOSTES (1)
  "Day of Pentecost": {
    season: "pentecost",
    theme: "Espírito Santo",
    keywords: ["Espírito", "fogo", "poder", "línguas", "cheio", "capacitar"]
  },
  
  // TEMPO COMUM (2)
  "Trinity Sunday": {
    season: "ordinary",
    theme: "Trindade",
    keywords: ["Trindade", "Pai Filho Espírito", "três em um", "mistério", "unidade", "comunhão"]
  },
  "Christ the King": {
    season: "ordinary",
    theme: "Cristo Rei",
    keywords: ["Rei", "reino", "soberania", "Senhor", "governo", "majestade"]
  }
};

// Template generator para orações semanais
function generateWeeklyPrayers(sundayKey: string) {
  const theme = SUNDAY_THEMES[sundayKey as keyof typeof SUNDAY_THEMES];
  if (!theme) return null;

  const prayers = {
    monday: {
      title: `Segunda - Início da Semana com ${theme.theme}`,
      text: `Senhor, ao iniciar esta semana, que o tema de ${theme.theme.toLowerCase()} guie meus passos. Ajuda-me a viver cada dia desta semana refletindo sobre ${theme.keywords[0]}. Que minha vida seja transformada por esta verdade. Amém.`
    },
    tuesday: {
      title: `Terça - Crescendo em ${theme.theme}`,
      text: `Pai celestial, hoje quero crescer em ${theme.theme.toLowerCase()}. Ensina-me mais sobre ${theme.keywords[1]}. Que eu não apenas conheça esta verdade intelectualmente, mas a viva em meu dia a dia. Transforma-me, Senhor. Amém.`
    },
    wednesday: {
      title: `Quarta - Renovação no Meio da Semana`,
      text: `Cristo, no meio desta semana, renova em mim o desejo de ${theme.keywords[2]}. Quando minhas forças fraquejam, lembra-me de ${theme.theme.toLowerCase()}. Que esta verdade seja âncora para minha alma. Amém.`
    },
    thursday: {
      title: `Quinta - Aprofundamento`,
      text: `Espírito Santo, aprofunda em mim a compreensão de ${theme.theme.toLowerCase()}. Que ${theme.keywords[3]} não seja apenas conceito, mas realidade viva em meu coração. Trabalha em mim, transformando-me à imagem de Cristo. Amém.`
    },
    friday: {
      title: `Sexta - À Luz da Cruz`,
      text: `Senhor Jesus, que morreste na cruz, ajuda-me a ver ${theme.theme.toLowerCase()} à luz do Calvário. A cruz me ensina sobre ${theme.keywords[4]}. Que eu nunca esqueça o preço que pagaste. Que esta lembrança motive minha devoção. Amém.`
    },
    saturday: {
      title: `Sábado - Preparação para o Domingo`,
      text: `Deus de graça, prepara meu coração para o culto de amanhã. Que eu venha à tua casa pronto para ${theme.keywords[5]}. Limpa-me, renova-me, e prepara-me para adorar-te em espírito e verdade. Amém.`
    }
  };

  return {
    liturgicalSunday: sundayKey,
    season: theme.season,
    theme: theme.theme,
    prayers
  };
}

// Função para calcular data do domingo (completa)
function getSundayDate(year: number, liturgicalSunday: string): Date | null {
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

async function importAllWeeklyPrayers() {
  console.log('🙏 Iniciando importação de TODAS AS ORAÇÕES SEMANAIS...\\n');
  console.log(`📊 Total: ${Object.keys(SUNDAY_THEMES).length} domingos × 6 dias × 3 anos = ${Object.keys(SUNDAY_THEMES).length * 6 * 3} orações\\n`);

  const years = [2026, 2027, 2028];
  let totalInserted = 0;
  let totalSkipped = 0;

  for (const year of years) {
    const cycle = getCycleForYear(year);
    console.log(`\\n📅 Ano ${year} - Ciclo ${cycle}`);
    console.log('='.repeat(60));

    for (const sundayKey of Object.keys(SUNDAY_THEMES)) {
      const prayerSet = generateWeeklyPrayers(sundayKey);
      if (!prayerSet) continue;

      const sundayDate = getSundayDate(year, sundayKey);
      if (!sundayDate) {
        console.log(`  ⚠️  Pulando: ${sundayKey} (data não calculável)`);
        continue;
      }

      const sundayDateStr = format(sundayDate, 'yyyy-MM-dd');
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      
      for (let i = 0; i < days.length; i++) {
        const dayName = days[i] as keyof typeof prayerSet.prayers;
        const prayer = prayerSet.prayers[dayName];
        const dayOfWeek = i + 1;

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

        const { error } = await supabase.from('weekly_prayers').insert({
          sunday_date: sundayDateStr,
          day_of_week: dayOfWeek,
          cycle,
          season: prayerSet.season,
          title: prayer.title,
          text: prayer.text,
        });

        if (error) {
          console.error(`  ❌ ${sundayDateStr} (dia ${dayOfWeek}):`, error.message);
        } else {
          totalInserted++;
        }
      }
      
      console.log(`  ✅ ${sundayDateStr}: ${prayerSet.theme} (6 orações)`);
    }
  }

  console.log('\\n' + '='.repeat(60));
  console.log('🎉 IMPORTAÇÃO COMPLETA DE ORAÇÕES SEMANAIS!');
  console.log('='.repeat(60));
  console.log(`\\n📊 Estatísticas Finais:`);
  console.log(`   ✅ Inseridas: ${totalInserted}`);
  console.log(`   ⏭️  Puladas: ${totalSkipped}`);
  console.log(`   📖 Domingos processados: ${Object.keys(SUNDAY_THEMES).length}`);
  console.log(`   📅 Anos: ${years.join(', ')}`);
  console.log(`   🎯 Total esperado: ${Object.keys(SUNDAY_THEMES).length * 6 * 3} orações`);
  console.log(`\\n✨ Processo finalizado!\\n`);
}

importAllWeeklyPrayers().catch(console.error);
