
import { createClient } from '@supabase/supabase-js';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { addDays, format, parseISO } from 'date-fns';
import * as cheerio from 'cheerio';
import pLimit from 'p-limit';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Rate limiter: 1 concurrent request
const limit = pLimit(1);

interface Reading {
  type: string;
  reference: string;
  text: string;
}

async function fetchFromLiturgiapt(date: Date): Promise<Reading[] | null> {
  try {
    // Format: 2026-1-26 (no zero padding for single digits seems safer based on dump, but standard ISO works too usually)
    // Actually, let's try strict ISO first, if it fails, strip zeros.
    // The test used 2026-1-26.
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const urlDate = `${y}-${m}-${d}`;
    
    const url = `https://www.liturgia.pt/liturgiadiaria/dia.php?data=${urlDate}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LectionaryBot/1.0; +https://github.com/narniano/luz-liturgica)'
      }
    });
    
    if (!response.ok) return null;
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const readings: Reading[] = [];
    
    // Logic from test-liturgia-parser.ts
    const leituraNode = $('*:contains("LEITURA I")').last();

    if (leituraNode.length > 0) {
      const htmlContent = leituraNode.html() || '';
      // Split by <br> tags, preserving text
      const lines = htmlContent.split(/<br\s*\/?>/i)
        .map(l => $(`<div>${l}</div>`).text().trim())
        .filter(l => l.length > 0);
      
       // State machine
      let state = 'IDLE';
      let currentReading: any = {};
      
      const saveReading = () => {
        if (currentReading.type && currentReading.text) {
          readings.push({...currentReading});
        }
        currentReading = {};
      };

      for (const line of lines) {
        if (line.match(/^LEITURA I/i)) {
          saveReading();
          state = 'READING_1';
          currentReading.type = 'first_reading';
          currentReading.reference = line.replace(/^LEITURA.*?\)\s*/i, '').trim(); 
          currentReading.text = '';
        } else if (line.match(/^LEITURA II/i)) {
           saveReading();
          state = 'READING_2';
          currentReading.type = 'second_reading';
          currentReading.reference = line.replace(/^LEITURA.*?\)\s*/i, '').trim();
          currentReading.text = '';
        } else if (line.match(/^SALMO RESPONSORIAL/i)) {
          saveReading();
          state = 'PSALM';
          currentReading.type = 'psalm';
          currentReading.reference = line.replace(/^SALMO RESPONSORIAL\s*/i, '').trim();
          currentReading.text = '';
        } else if (line.match(/^EVANGELHO/i)) {
          saveReading();
          state = 'GOSPEL';
          currentReading.type = 'gospel';
          currentReading.reference = line.replace(/^EVANGELHO\s*/i, '').trim();
          currentReading.text = '';
        } else if (line.match(/^ALELUIA/i)) {
           saveReading();
           state = 'ALLELUIA';
        } else if (line.match(/^Oração/i) || line.match(/^Antífona/i)) {
          saveReading();
          state = 'IDLE';
        } else {
          if (state !== 'IDLE' && state !== 'ALLELUIA') {
            if (currentReading.text) currentReading.text += '\n' + line;
            else currentReading.text = line;
          }
        }
      }
      saveReading();
    }
    
    return readings.length > 0 ? readings : null;
  } catch (error) {
    console.error(`Error fetching for ${format(date, 'yyyy-MM-dd')}:`, error);
    return null;
  }
}

async function importDay(date: Date, dryRun: boolean) {
  const dateStr = format(date, 'yyyy-MM-dd');
  const liturgicalInfo = getLiturgicalDayInfo(date);
  
  // Skip Sundays (handled by other script)
  if (date.getDay() === 0) {
    console.log(`📅 ${dateStr}: Pular Domingo (usar outro script)`);
    return;
  }
  
  console.log(`📅 ${dateStr} (${liturgicalInfo.dayName})...`);
  
  const readings = await fetchFromLiturgiapt(date);
  
  if (!readings || readings.length === 0) {
    console.log(`  ❌ Nada encontrado ou erro.`);
    return;
  }
  
  console.log(`  ✅ Encontradas ${readings.length} leituras.`);
  
  const readingsToInsert = readings.map(r => ({
    date: dateStr,
    cycle: liturgicalInfo.cycle,
    season: liturgicalInfo.season,
    reading_type: r.type,
    reference: r.reference || 'N/A',
    citation: r.reference || 'N/A',
    text: r.text,
    translation: 'Liturgia.pt'
  }));

  if (dryRun) {
    console.log(`  🔍 [DRY RUN] ${readings.length} leituras seriam salvas.`);
    console.log(`     Exemplo: ${readings[0].reference}`);
    return;
  }
  
  const { error } = await supabase.from('readings').insert(readingsToInsert);
    
  if (error) {
    console.error(`  ❌ Erro BD:`, error.message);
  } else {
    console.log(`  💾 Salvo no BD.`);
  }
}

async function run() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Use: bun run scripts/import-weekdays-liturgia.ts <start> <end> [--dry-run]');
    process.exit(0);
  }
  
  const start = parseISO(args[0]);
  const end = parseISO(args[1]);
  const dryRun = args.includes('--dry-run');
  
  console.log('🚀 Iniciando importação de dias de semana...');
  
  let current = start;
  while (current <= end) {
    await limit(() => importDay(current, dryRun));
    await new Promise(r => setTimeout(r, 1000)); // 1s delay
    current = addDays(current, 1);
  }
  
  console.log('✨ Fim.');
}

run();
