import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addDays, format } from 'date-fns';
import { supabase } from '../../lib/supabase';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { getThemeForSeason } from '@/lib/theme';
import { ReadingCard } from '@/components/devotional/ReadingCard';
import { PrayerSection } from '@/components/devotional/PrayerSection';
import { MeditationSection } from '@/components/devotional/MeditationSection';
import { CollectSection } from '@/components/devotional/CollectSection';
import type { DailyDevotional, Reading } from '@/types';

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [devotional, setDevotional] = useState<DailyDevotional | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const liturgicalInfo = getLiturgicalDayInfo(currentDate);
  const theme = getThemeForSeason(liturgicalInfo.season);

  const fetchDevotional = useCallback(async (date: Date) => {
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const info = getLiturgicalDayInfo(date);

      const { data: readingsData } = await supabase
        .from('readings')
        .select('*')
        .eq('date', dateStr);

      const { data: collectData } = await supabase
        .from('collects')
        .select('text')
        .eq('date', dateStr)
        .maybeSingle();

      const { data: prayerData } = await supabase
        .from('prayers')
        .select('*')
        .eq('date', dateStr)
        .maybeSingle();

      interface DbReading {
        reading_type: string;
        reference: string;
        text?: string;
        citation?: string;
      }

      const readings: Reading[] = (readingsData || []).map((r: DbReading) => ({
        type: r.reading_type as Reading['type'],
        reference: r.reference,
        text: r.text,
        citation: r.citation || r.reference,
      }));

      setDevotional({
        liturgicalInfo: info,
        readings,
        prayer: prayerData
          ? { title: prayerData.title, text: prayerData.text, author: prayerData.author }
          : { title: 'Oração do Dia', text: 'Que a paz de Cristo habite em vosso coração.' },
        meditation: { prompt: 'Medite na Palavra...', questions: ['O que esta leitura revela sobre Deus?', 'Como posso aplicar isso hoje?'] },
        collect: collectData?.text || 'Deus eterno e todo-poderoso...',
      });
    } catch (error) {
      console.error('Erro ao buscar devocional:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDevotional(currentDate);
  }, [currentDate, fetchDevotional]);

  const navigateDay = (delta: number) => {
    setLoading(true);
    setCurrentDate((prev) => addDays(prev, delta));
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDevotional(currentDate).finally(() => setRefreshing(false));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.accentColor }]}>Lecionário</Text>
        <Text style={styles.dayName}>{liturgicalInfo.dayName}</Text>
        <View style={styles.cycleRow}>
          <Text style={styles.cycleText}>
            Ano Litúrgico {liturgicalInfo.cycle}
          </Text>
          <View style={[styles.colorDot, { backgroundColor: theme.secondaryColor }]} />
        </View>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigateDay(-1)} style={styles.navButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#666" />
          <Text style={styles.navText}>Anterior</Text>
        </TouchableOpacity>

        <View style={styles.dateContainer}>
          <MaterialCommunityIcons name="calendar-month-outline" size={16} color="#8B6914" />
          <Text style={styles.dateText}>
            {format(currentDate, "dd 'de' MMMM 'de' yyyy")}
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigateDay(1)} style={styles.navButton}>
          <Text style={styles.navText}>Próximo</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando devocional...</Text>
          </View>
        ) : !devotional ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Nenhum dado encontrado para hoje.</Text>
          </View>
        ) : (
          <>
            {devotional.collect && (
              <View style={styles.section}>
                <CollectSection collect={devotional.collect} />
              </View>
            )}

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderTitle}>Lectio Divina</Text>
                <Text style={styles.sectionHeaderSub}>
                  Ano Litúrgico {devotional.liturgicalInfo.cycle} • {devotional.readings.length} Estações da Palavra
                </Text>
              </View>
              {devotional.readings.map((reading, index) => (
                <ReadingCard key={`${reading.type}-${index}`} reading={reading} index={index} />
              ))}
            </View>

            <View style={styles.section}>
              <PrayerSection prayer={devotional.prayer} />
            </View>

            <View style={styles.section}>
              <MeditationSection meditation={devotional.meditation} />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  dayName: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'serif',
    fontStyle: 'italic',
    marginTop: 4,
  },
  cycleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  cycleText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  navText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'serif',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  loadingText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'serif',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionHeaderTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'serif',
    fontStyle: 'italic',
  },
  sectionHeaderSub: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '700',
    marginTop: 8,
  },
});
