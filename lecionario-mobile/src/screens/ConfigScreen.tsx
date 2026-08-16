import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { clearCache } from '@/lib/cache';

export default function ConfigScreen() {
  const insets = useSafeAreaInsets();
  const [clearing, setClearing] = useState(false);

  const handleClearCache = () => {
    Alert.alert(
      'Limpar dados temporários',
      'Isso não afeta as leituras — elas já vêm no app. É só um cache técnico que se recalcula sozinho.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            setClearing(true);
            await clearCache();
            setClearing(false);
            Alert.alert('Pronto', 'Cache limpo com sucesso.');
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="cog" size={24} color="#B8860B" />
        <Text style={styles.title}>Configurações</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Armazenamento</Text>
        <TouchableOpacity
          style={styles.row}
          onPress={handleClearCache}
          disabled={clearing}
          accessibilityLabel="Limpar dados temporários"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="delete-outline" size={22} color="#CC3333" />
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>Limpar dados temporários</Text>
            <Text style={styles.rowHint}>
              As leituras já vêm no app, não precisam de internet — isso só limpa um cache
              técnico de curta duração
            </Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color="rgba(255,255,255,0.3)" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        <View style={styles.row}>
          <MaterialCommunityIcons name="book-open-variant" size={22} color="#B8860B" />
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>Lecionário</Text>
            <Text style={styles.rowHint}>Versão 1.0.0</Text>
          </View>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="calendar-text" size={22} color="#4A8B4A" />
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>Ciclo Litúrgico</Text>
            <Text style={styles.rowHint}>Anos A, B, C — Lecionário Comum Revisado</Text>
          </View>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="information-outline"
            size={22}
            color="rgba(255,255,255,0.5)"
          />
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>Dados litúrgicos</Text>
            <Text style={styles.rowHint}>Calculados localmente para 2024–2030</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Lecionário — Meditação diária na Palavra de Deus seguindo o Ano Litúrgico Cristão.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F5F5F0',
    fontFamily: 'Lora_700Bold',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
    fontFamily: 'Lora_700Bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    minHeight: 56,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 15,
    color: '#F5F5F0',
    fontFamily: 'Lora_400Regular',
  },
  rowHint: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
    fontFamily: 'Lora_400Regular',
    marginTop: 2,
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: 'Lora_400Regular_Italic',
  },
});
