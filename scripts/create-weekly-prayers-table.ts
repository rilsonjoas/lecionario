import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createWeeklyPrayersTable() {
  console.log('📊 Criando tabela weekly_prayers...\\n');

  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS weekly_prayers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        sunday_date DATE NOT NULL,
        day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 6),
        cycle TEXT NOT NULL CHECK (cycle IN ('A', 'B', 'C')),
        season TEXT NOT NULL,
        title TEXT NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(sunday_date, day_of_week, cycle)
      );

      CREATE INDEX IF NOT EXISTS idx_weekly_prayers_sunday_cycle ON weekly_prayers(sunday_date, cycle);
      CREATE INDEX IF NOT EXISTS idx_weekly_prayers_day ON weekly_prayers(day_of_week);
    `
  });

  if (error) {
    console.error('❌ Erro ao criar tabela:', error);
    console.log('\\n⚠️  A tabela pode já existir ou você pode criar manualmente no Supabase Dashboard.');
    console.log('\\nSQL para criar manualmente:');
    console.log(`
CREATE TABLE IF NOT EXISTS weekly_prayers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sunday_date DATE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 6),
  cycle TEXT NOT NULL CHECK (cycle IN ('A', 'B', 'C')),
  season TEXT NOT NULL,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(sunday_date, day_of_week, cycle)
);

CREATE INDEX IF NOT EXISTS idx_weekly_prayers_sunday_cycle ON weekly_prayers(sunday_date, cycle);
CREATE INDEX IF NOT EXISTS idx_weekly_prayers_day ON weekly_prayers(day_of_week);
    `);
  } else {
    console.log('✅ Tabela criada com sucesso!\\n');
  }
}

createWeeklyPrayersTable().catch(console.error);
