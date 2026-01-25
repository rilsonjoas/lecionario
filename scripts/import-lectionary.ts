import { createClient } from '@supabase/supabase-js';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { addDays, format, parseISO } from 'date-fns';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface LectServeReading {
  first?: string;
  psalm?: string;
  second?: string;
  gospel?: string;
}

interface LectServeResponse {
  date: string;
  season: string;
  year: string;
  readings: LectServeReading;
  collect?: string;
}

// Mapear tipos de leitura
const READING_TYPE_MAP: Record<string, string> = {
  'first': 'first_reading',
  'psalm': 'psalm',
  'second': 'second_reading',
  'gospel': 'gospel'
};

async function fetchFromLectServe(date: string): Promise<LectServeResponse | null> {
  try {
    console.log(`  🌐 Buscando dados do LectServe para ${date}...`);
    const response = await fetch(`https://lectserve.com/date/${date}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.log(`  ⚠️  LectServe retornou ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`  ❌ Erro ao buscar ${date}:`, error);
    return null;
  }
}

async function fetchBibleText(reference: string): Promise<string> {
  try {
    // Tentar buscar texto em português da Bible API
    const cleanRef = reference.replace(/[†‡]/g, '').trim();
    const response = await fetch(`https://bible-api.com/${encodeURIComponent(cleanRef)}?translation=almeida`);
    
    if (response.ok) {
      const data = await response.json();
      return data.text || `[Texto para ${reference}]`;
    }
  } catch (error) {
    console.log(`    ⚠️  Não foi possível buscar texto para ${reference}`);
  }
  
  // Fallback: retornar placeholder
  return `[Texto bíblico para ${reference} - adicionar tradução]`;
}

async function importDate(dateStr: string, dryRun: boolean = false): Promise<boolean> {
  const date = parseISO(dateStr);
  const liturgicalInfo = getLiturgicalDayInfo(date);
  
  console.log(`\n📅 Processando ${dateStr} (${liturgicalInfo.dayName})...`);
  console.log(`   Ciclo: ${liturgicalInfo.cycle}, Tempo: ${liturgicalInfo.season}`);
  
  const data = await fetchFromLectServe(dateStr);
  
  if (!data || !data.readings) {
    console.log(`  ⚠️  Sem dados disponíveis para esta data`);
    return false;
  }
  
  const readings = [];
  
  // Processar cada leitura
  for (const [key, reference] of Object.entries(data.readings)) {
    if (!reference) continue;
    
    const readingType = READING_TYPE_MAP[key];
    if (!readingType) continue;
    
    console.log(`  📖 ${readingType}: ${reference}`);
    
    // Buscar texto bíblico (com delay para não sobrecarregar a API)
    await new Promise(resolve => setTimeout(resolve, 500));
    const text = await fetchBibleText(reference);
    
    readings.push({
      date: dateStr,
      cycle: liturgicalInfo.cycle,
      season: liturgicalInfo.season,
      reading_type: readingType,
      reference: reference,
      citation: reference,
      text: text,
      translation: 'ARA'
    });
  }
  
  if (readings.length === 0) {
    console.log(`  ⚠️  Nenhuma leitura processada`);
    return false;
  }
  
  if (dryRun) {
    console.log(`  🔍 [DRY RUN] ${readings.length} leituras seriam inseridas`);
    return true;
  }
  
  // Inserir no banco
  const { error } = await supabase.from('readings').insert(readings);
  
  if (error) {
    console.error(`  ❌ Erro ao inserir:`, error.message);
    return false;
  }
  
  console.log(`  ✅ ${readings.length} leituras inseridas com sucesso!`);
  return true;
}

async function importRange(startDate: string, endDate: string, dryRun: boolean = false) {
  console.log('\n🌱 Iniciando importação do lecionário...\n');
  console.log(`📆 Período: ${startDate} até ${endDate}`);
  console.log(`🔧 Modo: ${dryRun ? 'DRY RUN (sem inserir no banco)' : 'PRODUÇÃO'}\n`);
  
  let current = parseISO(startDate);
  const end = parseISO(endDate);
  
  let total = 0;
  let success = 0;
  let failed = 0;
  
  while (current <= end) {
    const dateStr = format(current, 'yyyy-MM-dd');
    total++;
    
    const result = await importDate(dateStr, dryRun);
    
    if (result) {
      success++;
    } else {
      failed++;
    }
    
    current = addDays(current, 1);
    
    // Rate limiting: aguardar 2 segundos entre datas
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Importação concluída!\n');
  console.log(`📊 Estatísticas:`);
  console.log(`   Total de datas processadas: ${total}`);
  console.log(`   ✅ Sucesso: ${success}`);
  console.log(`   ❌ Falhas: ${failed}`);
  console.log(`   📈 Taxa de sucesso: ${((success/total) * 100).toFixed(1)}%`);
  console.log('='.repeat(60) + '\n');
}

// Processar argumentos da linha de comando
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
📚 Importador de Lecionário

Uso:
  bun run scripts/import-lectionary.ts <data-inicial> <data-final> [--dry-run]

Exemplos:
  # Importar um mês (janeiro de 2026)
  bun run scripts/import-lectionary.ts 2026-01-01 2026-01-31

  # Importar um ano completo
  bun run scripts/import-lectionary.ts 2026-01-01 2026-12-31

  # Testar sem inserir no banco (dry run)
  bun run scripts/import-lectionary.ts 2026-01-01 2026-01-31 --dry-run

  # Importar apenas domingos de um mês
  bun run scripts/import-lectionary.ts 2026-01-04 2026-01-25
  `);
  process.exit(0);
}

const startDate = args[0];
const endDate = args[1] || startDate;
const dryRun = args.includes('--dry-run');

// Validar datas
try {
  parseISO(startDate);
  parseISO(endDate);
} catch (error) {
  console.error('❌ Formato de data inválido. Use YYYY-MM-DD');
  process.exit(1);
}

// Executar importação
importRange(startDate, endDate, dryRun)
  .then(() => {
    console.log('✨ Processo finalizado!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  });
