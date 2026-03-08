import { supabase } from './client';
import type { DailyDevotional, Reading, DailyPrayer, MeditationResource } from '@/types';
import type { LiturgicalCycle } from '@/types';
import { format } from 'date-fns';

export async function fetchDailyDevotional(
  date: Date,
  cycle: LiturgicalCycle
): Promise<Partial<DailyDevotional> | null> {
  const dateStr = format(date, 'yyyy-MM-dd');

  try {
    // Buscar leituras
    const { data: readingsData, error: readingsError } = await supabase
      .from('readings')
      .select('*')
      .eq('date', dateStr)
      .eq('cycle', cycle)
      .order('reading_type');

    if (readingsError) {
      console.error('Erro ao buscar leituras:', readingsError);
    }

    // Buscar coleta
    const { data: collectData } = await supabase
      .from('collects')
      .select('*')
      .eq('date', dateStr)
      .eq('cycle', cycle)
      .maybeSingle();

    // Buscar oração
    const { data: prayerData } = await supabase
      .from('prayers')
      .select('*')
      .eq('date', dateStr)
      .eq('cycle', cycle)
      .maybeSingle();

    // Buscar meditação com questões
    const { data: meditationData } = await supabase
      .from('meditations')
      .select(`
        *,
        meditation_questions (
          question,
          order_index
        )
      `)
      .eq('date', dateStr)
      .eq('cycle', cycle)
      .maybeSingle();

    // Se não encontrou nenhum dado, retornar null
    if (!readingsData?.length && !collectData && !prayerData && !meditationData) {
      return null;
    }

    // Converter para formato do app
    const readings: Reading[] = readingsData?.map(r => ({
      type: r.reading_type as any,
      reference: r.reference,
      citation: r.citation || r.reference,
      text: r.text
    })) || [];

    const prayer: DailyPrayer | undefined = prayerData ? {
      title: prayerData.title,
      text: prayerData.text,
      author: prayerData.author || undefined,
      source: prayerData.source || undefined
    } : undefined;

    const meditation: MeditationResource | undefined = meditationData ? {
      prompt: meditationData.prompt,
      questions: (meditationData.meditation_questions as any[])
        ?.sort((a, b) => a.order_index - b.order_index)
        .map(q => q.question) || [],
      duration: meditationData.duration || undefined
    } : undefined;

    return {
      readings: readings.length > 0 ? readings : undefined,
      prayer,
      meditation,
      collect: collectData?.text
    };
  } catch (error) {
    console.error('Erro ao buscar dados do Supabase:', error);
    return null;
  }
}
