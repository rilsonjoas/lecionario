
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verify() {
  const { count, error } = await supabase
    .from('readings')
    .select('*', { count: 'exact', head: true })
    .gte('date', '2026-01-01')
    .lte('date', '2026-12-31');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`\n📊 Total de leituras em 2026: ${count}`);
  
  // Check unique days
  const { data: days } = await supabase
    .from('readings')
    .select('date')
    .gte('date', '2026-01-01')
    .lte('date', '2026-12-31');
    
  if (days) {
    const uniqueDays = new Set(days.map(d => d.date)).size;
    console.log(`📅 Dias com leituras: ${uniqueDays}/365`);
    console.log(`✅ Cobertura: ${((uniqueDays/365)*100).toFixed(1)}%`);
  }
}

verify();
