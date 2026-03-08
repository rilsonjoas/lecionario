import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { supabase } from './lib/supabase';
export default function App() {
  const [readings, setReadings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDevotional();
  }, []);
  async function fetchDevotional() {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('readings')
        .select('*')
        .eq('date', today);
      if (error) throw error;
      setReadings(data || []);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Lecionário</Text>
        
        {loading ? (
          <Text>Carregando...</Text>
        ) : readings.length === 0 ? (
          <Text>Nenhuma leitura para hoje.</Text>
        ) : (
          readings.map((reading) => (
            <View key={reading.id} style={styles.card}>
              <Text style={styles.cardTitle}>{reading.reading_type}</Text>
              <Text style={styles.reference}>{reading.reference}</Text>
              <Text style={styles.text}>{reading.text}</Text>
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
    backgroundColor: '#F5F5F0', // Bege papel
    paddingTop: 50,
  },
  scroll: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B4513', // Cor Canela
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  reference: {
    fontSize: 18,
    fontWeight: 'bold',    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#222',
    fontFamily: 'serif',
  },
});
