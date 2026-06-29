import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { supabase } from './lib/supabase';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { getThemeForSeason } from '@/lib/theme';
import type { Reading } from '@/types';

export default function App() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const liturgicalInfo = getLiturgicalDayInfo(today);
  const theme = getThemeForSeason(liturgicalInfo.season);

  useEffect(() => {
    fetchDevotional();
  }, []);

  async function fetchDevotional() {
    try {
      const dateStr = today.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('readings')
        .select('*')
        .eq('date', dateStr);

      if (error) throw error;

      const mapped: Reading[] = (data || []).map((r) => ({
        type: r.reading_type,
        reference: r.reference,
        text: r.text,
        citation: r.citation || r.reference,
      }));

      setReadings(mapped);
    } catch (error) {
      console.error('Erro ao buscar leituras:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryColor }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[styles.title, { color: theme.accentColor }]}>
          Lecionário
        </Text>

        <View style={styles.liturgicalBadge}>
          <Text style={styles.seasonName}>{liturgicalInfo.dayName}</Text>
          <Text style={styles.cycleText}>
            Ano Litúrgico {liturgicalInfo.cycle} • {liturgicalInfo.season}
          </Text>
        </View>

        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : readings.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma leitura para hoje.</Text>
        ) : (
          readings.map((reading, index) => (
            <View key={`${reading.type}-${index}`} style={styles.card}>
              <Text style={styles.cardTitle}>{reading.type.replace('_', ' ')}</Text>
              <Text style={styles.reference}>{reading.reference}</Text>
              {reading.text && <Text style={styles.text}>{reading.text}</Text>}
            </View>
          ))
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
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  liturgicalBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  seasonName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'serif',
    marginBottom: 4,
  },
  cycleText: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  loadingText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    marginTop: 40,
  },
  emptyText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginTop: 40,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  reference: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    fontFamily: 'serif',
  },
});
