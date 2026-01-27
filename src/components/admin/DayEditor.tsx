"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Save } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { toast } from 'sonner';
import { DailyOfficeReadings } from './DailyOfficeReadings';

interface DayEditorProps {
  date: Date;
  onSaved?: () => void;
}

// Helper function to translate season names
function translateSeason(season: string | undefined): string {
  if (!season) return '';
  const translations: Record<string, string> = {
    'advent': 'Advento',
    'christmas': 'Natal',
    'epiphany': 'Epifania',
    'lent': 'Quaresma',
    'easter': 'Páscoa',
    'pentecost': 'Pentecostes',
    'ordinary': 'Tempo Comum'
  };
  return translations[season] || season;
}

export function DayEditor({ date, onSaved }: DayEditorProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [liturgicalInfo, setLiturgicalInfo] = useState<any>(null);

  // Form States
  const [collect, setCollect] = useState({ title: 'Oração do Dia', text: '', source: '' });
  const [prayer, setPrayer] = useState({ title: '', text: '', author: '', source: '' });
  const [meditation, setMeditation] = useState({ prompt: '', duration: '', questions: [''] });

  const dateStr = format(date, 'yyyy-MM-dd');

  useEffect(() => {
    loadData();
  }, [date]);

  const loadData = async () => {
    setLoading(true);
    const info = getLiturgicalDayInfo(date);
    setLiturgicalInfo(info);
    
    console.log('Loading data for:', dateStr, info.cycle);

    // Fetch Collect
    const { data: collectData } = await supabase
      .from('collects')
      .select('*')
      .eq('date', dateStr)
      .maybeSingle();

    if (collectData) setCollect({ 
      title: collectData.title, 
      text: collectData.text, 
      source: collectData.source || '' 
    });
    else setCollect({ title: 'Oração do Dia', text: '', source: '' }); // Reset

    // Fetch Prayer
    const { data: prayerData } = await supabase
      .from('prayers')
      .select('*')
      .eq('date', dateStr)
      .maybeSingle();

    if (prayerData) setPrayer({
      title: prayerData.title,
      text: prayerData.text,
      author: prayerData.author || '',
      source: prayerData.source || ''
    });
    else setPrayer({ title: '', text: '', author: '', source: '' }); // Reset

    // Fetch Meditation
    const { data: meditationData } = await supabase
      .from('meditations')
      .select('*, meditation_questions(question, order_index)')
      .eq('date', dateStr)
      .maybeSingle();

    if (meditationData) {
      const qs = meditationData.meditation_questions
        ?.sort((a: any, b: any) => a.order_index - b.order_index)
        .map((q: any) => q.question) || [''];
      
      setMeditation({
        prompt: meditationData.prompt,
        duration: meditationData.duration || '',
        questions: qs.length ? qs : ['']
      });
    } else {
      setMeditation({ prompt: '', duration: '', questions: [''] }); // Reset
    }

    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const info = getLiturgicalDayInfo(date);
    
    try {
      // 1. Save Collect
      if (collect.text.trim()) {
        const { error } = await supabase.from('collects').upsert({
            date: dateStr,
            cycle: info.cycle,
            season: info.season,
            title: collect.title,
            text: collect.text,
            source: collect.source
          }, { onConflict: 'date, cycle', ignoreDuplicates: false });
        if (error) throw error;
      }

      // 2. Save Prayer
      if (prayer.text.trim()) {
        const { error } = await supabase.from('prayers').upsert({
          date: dateStr,
          cycle: info.cycle,
          season: info.season,
          title: prayer.title,
          text: prayer.text,
          author: prayer.author,
          source: prayer.source
        }, { onConflict: 'date, cycle' });
        if (error) throw error;
      }

      // 3. Save Meditation
      if (meditation.prompt.trim()) {
        // Upsert meditation parent
        // We first need to select ID if exists to update, or let upsert handle it returning ID
        const { data: medResult, error: medError } = await supabase.from('meditations').upsert({
          date: dateStr,
          cycle: info.cycle,
          season: info.season,
          prompt: meditation.prompt,
          duration: meditation.duration
        }, { onConflict: 'date, cycle' }).select().single();
        
        if (medError) throw medError;

        // Handle Questions (Delete old, Insert new is easiest for reordering)
        if (medResult) {
          await supabase.from('meditation_questions').delete().eq('meditation_id', medResult.id);
          
          const questionsToInsert = meditation.questions
            .filter(q => q.trim().length > 0)
            .map((q, idx) => ({
              meditation_id: medResult.id,
              question: q,
              order_index: idx
            }));
            
          if (questionsToInsert.length > 0) {
            await supabase.from('meditation_questions').insert(questionsToInsert);
          }
        }
      }

      toast.success('Conteúdo salvo com sucesso!');
      if (onSaved) onSaved();

    } catch (error: any) {
      console.error('Error saving:', error);
      toast.error('Erro ao salvar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <Card className="h-full border-l-4 border-l-accent">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl text-secondary">
              {format(date, "d 'de' MMMM, yyyy", { locale: ptBR })}
            </h2>
            {liturgicalInfo && (
              <p className="text-sm text-muted-foreground">
                {translateSeason(liturgicalInfo.season)} • Ciclo {liturgicalInfo.cycle}
              </p>
            )}
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Salvar
          </Button>
        </div>

        {/* Daily Office Readings for Weekdays */}
        {date.getDay() !== 0 && (
          <div className="border-t pt-6">
            <h3 className="font-display text-xl text-secondary mb-4">
              Ofício Diário
            </h3>
            <DailyOfficeReadings date={date} />
          </div>
        )}

        {/* Sunday Content (Tabs) */}
        {date.getDay() === 0 && (
          <Tabs defaultValue="collect" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="collect">Coleta</TabsTrigger>
              <TabsTrigger value="prayer">Oração</TabsTrigger>
              <TabsTrigger value="meditation">Meditação</TabsTrigger>
            </TabsList>
          
          {/* COLETAS */}
          <TabsContent value="collect" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={collect.title} onChange={e => setCollect({...collect, title: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Texto da Coleta</Label>
              <Textarea 
                className="min-h-[150px] font-serif text-lg" 
                value={collect.text} 
                onChange={e => setCollect({...collect, text: e.target.value})} 
                placeholder="Ó Deus..."
              />
            </div>
            <div className="space-y-2">
              <Label>Fonte</Label>
              <Input value={collect.source} onChange={e => setCollect({...collect, source: e.target.value})} placeholder="Missal Romano, LOC..." />
            </div>
          </TabsContent>

          {/* ORAÇÃO */}
          <TabsContent value="prayer" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={prayer.title} onChange={e => setPrayer({...prayer, title: e.target.value})} placeholder="Oração da Manhã..." />
            </div>
            <div className="space-y-2">
              <Label>Texto da Oração</Label>
              <Textarea 
                className="min-h-[150px] font-serif text-lg" 
                value={prayer.text} 
                onChange={e => setPrayer({...prayer, text: e.target.value})} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Autor</Label>
                <Input value={prayer.author} onChange={e => setPrayer({...prayer, author: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Fonte</Label>
                <Input value={prayer.source} onChange={e => setPrayer({...prayer, source: e.target.value})} />
              </div>
            </div>
          </TabsContent>

          {/* MEDITAÇÃO */}
          <TabsContent value="meditation" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Prompt / Reflexão Inicial</Label>
              <Textarea 
                className="min-h-[100px]" 
                value={meditation.prompt} 
                onChange={e => setMeditation({...meditation, prompt: e.target.value})} 
              />
            </div>
             <div className="space-y-2">
              <Label>Questões para Reflexão (uma por linha)</Label>
              <Textarea 
                className="min-h-[100px]" 
                value={meditation.questions.join('\n')} 
                onChange={e => setMeditation({...meditation, questions: e.target.value.split('\n')})} 
                placeholder="Pergunta 1&#10;Pergunta 2&#10;Pergunta 3"
              />
            </div>
            <div className="space-y-2">
              <Label>Duração Estimada</Label>
              <Input value={meditation.duration} onChange={e => setMeditation({...meditation, duration: e.target.value})} placeholder="10-15 min" />
            </div>
          </TabsContent>
        </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
