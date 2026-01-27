import { createClient } from '@supabase/supabase-js';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { addDays, format, parseISO } from 'date-fns';
import * as cheerio from 'cheerio';
import pLimit from 'p-limit';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Rate limiter: 1 requisição por vez para evitar bloqueios e logs misturados
const limit = pLimit(1);

interface Reading {
  type: string;
  reference: string;
  text: string;
}

interface DayData {
  readings: Reading[];
  collect?: string;
  prayer?: string;
}

// ==================== FONTE 1: LectServe API ====================

async function fetchFromLectServe(date: string): Promise<DayData | null> {
  try {
    const response = await fetch(`https://lectserve.com/html/sunday/${date}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LectionaryBot/1.0; +https://github.com/narniano/luz-liturgica)'
      }
    });

    if (!response.ok) {
      console.log(`    ⚠️  LectServe status: ${response.status}`);
      return null;
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const readings: Reading[] = [];
    
    // Extrair leituras dos links
    $('a[href*="biblegateway.com"]').each((i, elem) => {
      const text = $(elem).text().trim();
      const match = text.match(/^(.+?)\s+(\d+:.+)$/);
      
      if (match) {
        const [, book, verses] = match;
        const reference = `${book} ${verses}`;
        
        let type = 'first_reading';
        if (i === 1) type = 'psalm';
        else if (i === 2) type = 'second_reading';
        else if (i === 3) type = 'gospel';
        
        readings.push({
          type,
          reference,
          text: `[Buscar texto para ${reference}]`
        });
      }
    });
    
    if (readings.length === 0) {
      console.log('    ⚠️  LectServe: Nenhum link do BibleGateway encontrado');
    }

    return readings.length > 0 ? { readings } : null;
  } catch (error) {
    console.error('    ❌  Erro LectServe:', error);
    return null;
  }
}

// ==================== FONTE 2: Liturgia.pt (Scraping) ====================

async function fetchFromLiturgiapt(date: string): Promise<DayData | null> {
  try {
    // Formato: https://liturgia.pt/?d=25-01-2026
    const [year, month, day] = date.split('-');
    const ptDate = `${day}-${month}-${year}`;
    
    const response = await fetch(`https://liturgia.pt/?d=${ptDate}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LectionaryBot/1.0)'
      }
    });
    
    if (!response.ok) return null;
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const readings: Reading[] = [];
    
    // Liturgia.pt tem estrutura específica - adaptar conforme necessário
    $('.leitura').each((i, elem) => {
      const title = $(elem).find('.titulo-leitura').text().trim();
      const reference = $(elem).find('.referencia').text().trim();
      const text = $(elem).find('.texto-leitura').text().trim();
      
      let type = 'first_reading';
      if (title.toLowerCase().includes('salmo')) type = 'psalm';
      else if (title.toLowerCase().includes('segunda')) type = 'second_reading';
      else if (title.toLowerCase().includes('evangelho')) type = 'gospel';
      
      if (reference && text) {
        readings.push({ type, reference, text });
      }
    });
    
    return readings.length > 0 ? { readings } : null;
  } catch (error) {
    console.log(`    ⚠️  Liturgia.pt não disponível`);
    return null;
  }
}

// ==================== FONTE 3: Bible API (Textos em Português) ====================

async function fetchBibleText(reference: string): Promise<string> {
  try {
    // Limpar referência
    const cleanRef = reference
      .replace(/[†‡]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Tentar Bible API
    const response = await fetch(
      `https://bible-api.com/${encodeURIComponent(cleanRef)}?translation=almeida`,
      { signal: AbortSignal.timeout(5000) }
    );
    
    if (response.ok) {
      const data = await response.json();
      if (data.text) {
        return data.text.trim();
      }
    }
  } catch (error) {
    // Timeout ou erro
  }
  
  // Fallback: placeholder
  return `[Texto para ${reference} - adicionar tradução]`;
}

// ==================== IMPORTAÇÃO PRINCIPAL ====================

async function importDate(dateStr: string, dryRun: boolean = false): Promise<boolean> {
  const date = parseISO(dateStr);
  const liturgicalInfo = getLiturgicalDayInfo(date);
  const isSunday = date.getDay() === 0;
  
  console.log(`\n📅 ${dateStr} (${liturgicalInfo.dayName})`);
  console.log(`   ${isSunday ? '🔔 DOMINGO' : '📖 Dia de semana'} | Ciclo: ${liturgicalInfo.cycle} | Tempo: ${liturgicalInfo.season}`);
  
  let data: DayData | null = null;
  
  // Estratégia 1: Tentar LectServe (principalmente para domingos)
  if (isSunday) {
    console.log(`  🌐 Tentando LectServe...`);
    data = await fetchFromLectServe(dateStr);
    if (data) console.log(`  ✅ LectServe: ${data.readings.length} leituras`);
  }
  
  // Estratégia 2: Tentar Liturgia.pt (todos os dias)
  if (!data) {
    console.log(`  🇵🇹 Tentando Liturgia.pt...`);
    data = await fetchFromLiturgiapt(dateStr);
    if (data) console.log(`  ✅ Liturgia.pt: ${data.readings.length} leituras`);
  }
  
  if (!data || data.readings.length === 0) {
    console.log(`  ❌ Nenhuma fonte disponível`);
    return false;
  }
  
  // Buscar textos bíblicos em português (se necessário)
  console.log(`  📖 Buscando textos em português...`);
  for (const reading of data.readings) {
    if (reading.text.startsWith('[Buscar')) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit
      reading.text = await fetchBibleText(reading.reference);
    }
  }
  
  // Preparar dados para inserção
  const readingsToInsert = data.readings.map(r => ({
    date: dateStr,
    cycle: liturgicalInfo.cycle,
    season: liturgicalInfo.season,
    reading_type: r.type,
    reference: r.reference,
    citation: r.reference,
    text: r.text,
    translation: r.text.startsWith('[Texto') ? 'PENDING' : 'ARA'
  }));
  
  if (dryRun) {
    console.log(`  🔍 [DRY RUN] ${readingsToInsert.length} leituras seriam inseridas`);
    return true;
  }
  
  // Inserir no banco
  const { error } = await supabase.from('readings').insert(readingsToInsert);
  
  if (error) {
    console.error(`  ❌ Erro ao inserir:`, error.message);
    return false;
  }
  
  console.log(`  ✅ ${readingsToInsert.length} leituras inseridas!`);
  return true;
}

async function importRange(startDate: string, endDate: string, dryRun: boolean = false) {
  console.log('\n' + '='.repeat(70));
  console.log('🌱 IMPORTAÇÃO HÍBRIDA DO LECIONÁRIO');
  console.log('='.repeat(70));
  console.log(`\n📆 Período: ${startDate} → ${endDate}`);
  console.log(`🔧 Modo: ${dryRun ? 'DRY RUN (teste)' : 'PRODUÇÃO (inserir no banco)'}`);
  console.log(`\n📡 Fontes:`);
  console.log(`   1️⃣  LectServe (domingos)`);
  console.log(`   2️⃣  Liturgia.pt (todos os dias)`);
  console.log(`   3️⃣  Bible API (textos em português)`);
  console.log('\n' + '='.repeat(70) + '\n');
  
  let current = parseISO(startDate);
  const end = parseISO(endDate);
  
  const stats = {
    total: 0,
    success: 0,
    failed: 0,
    sundays: 0,
    weekdays: 0
  };
  
  const tasks: Promise<boolean>[] = [];
  
  while (current <= end) {
    const dateStr = format(current, 'yyyy-MM-dd');
    stats.total++;
    
    if (current.getDay() === 0) stats.sundays++;
    else stats.weekdays++;
    
    // Adicionar tarefa com rate limiting
    tasks.push(
      limit(async () => {
        const result = await importDate(dateStr, dryRun);
        if (result) stats.success++;
        else stats.failed++;
        return result;
      })
    );
    
    current = addDays(current, 1);
  }
  
  // Executar todas as tarefas
  await Promise.all(tasks);
  
  // Relatório final
  console.log('\n' + '='.repeat(70));
  console.log('🎉 IMPORTAÇÃO CONCLUÍDA!');
  console.log('='.repeat(70));
  console.log(`\n📊 Estatísticas:`);
  console.log(`   Total de dias: ${stats.total}`);
  console.log(`   🔔 Domingos: ${stats.sundays}`);
  console.log(`   📖 Dias de semana: ${stats.weekdays}`);
  console.log(`   ✅ Sucesso: ${stats.success} (${((stats.success/stats.total) * 100).toFixed(1)}%)`);
  console.log(`   ❌ Falhas: ${stats.failed}`);
  console.log('\n' + '='.repeat(70) + '\n');
}

// ==================== CLI ====================

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
📚 Importador Híbrido de Lecionário

Combina múltiplas fontes para importar leituras de TODOS os dias:
  • LectServe API (domingos)
  • Liturgia.pt (todos os dias)
  • Bible API (textos em português)

Uso:
  bun run scripts/import-lectionary-hybrid.ts <início> <fim> [--dry-run]

Exemplos:
  # Testar uma semana
  bun run scripts/import-lectionary-hybrid.ts 2026-01-01 2026-01-07 --dry-run

  # Importar um mês
  bun run scripts/import-lectionary-hybrid.ts 2026-01-01 2026-01-31

  # Importar ano completo
  bun run scripts/import-lectionary-hybrid.ts 2026-01-01 2026-12-31

  # Apenas domingos de um mês
  bun run scripts/import-lectionary-hybrid.ts 2026-01-05 2026-01-26
  `);
  process.exit(0);
}

const startDate = args[0];
const endDate = args[1] || startDate;
const dryRun = args.includes('--dry-run');

try {
  parseISO(startDate);
  parseISO(endDate);
} catch (error) {
  console.error('❌ Formato de data inválido. Use YYYY-MM-DD');
  process.exit(1);
}

importRange(startDate, endDate, dryRun)
  .then(() => {
    console.log('✨ Processo finalizado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  });
