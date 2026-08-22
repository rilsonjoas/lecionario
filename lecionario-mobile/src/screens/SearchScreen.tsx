import { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { searchDevotionals } from '@/lib/search';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import type { RootTabParamList } from '@/types';

type NavProp = BottomTabNavigationProp<RootTabParamList, 'Busca'>;

// Tela própria de busca — saiu de dentro do Calendário pra virar tab
// (apontamento do autor: busca e favoritos pertencem ao menu de baixo).
export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const colors = useThemeColors();
  const { scale } = useFontScale();
  const [query, setQuery] = useState('');

  const { results, total } = useMemo(
    () => (query.length >= 2 ? searchDevotionals(query) : { results: [], total: 0 }),
    [query],
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top + 16 },
      ]}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons name="magnify" size={24} color={colors.accent} />
        <Text style={[styles.title, { color: colors.text, fontSize: scale(20) }]}>Buscar</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Hoje')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel="Ir para o devocional de hoje"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="calendar-today" size={20} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.surface,
            borderColor: colors.border,
            fontSize: scale(15),
          },
        ]}
        placeholder="Buscar por referência, data ou palavra-chave..."
        placeholderTextColor={colors.textMuted}
        value={query}
        onChangeText={setQuery}
        autoFocus
        returnKeyType="search"
      />

      <View style={styles.results}>
        {query.length >= 2 && (
          <Text style={[styles.count, { color: colors.textMuted, fontSize: scale(11) }]}>
            {total} resultado{total !== 1 ? 's' : ''}
            {total > results.length ? ` — mostrando os ${results.length} mais recentes` : ''}
          </Text>
        )}
        {results.map((r) => (
          <TouchableOpacity
            key={r.date}
            style={[styles.result, { borderBottomColor: colors.border }]}
            onPress={() => navigation.navigate('Hoje', { date: r.date })}
            accessibilityRole="button"
          >
            <View style={styles.resultContent}>
              <Text style={[styles.resultDate, { color: colors.text, fontSize: scale(14) }]}>
                {r.date}
              </Text>
              <Text style={[styles.resultTitle, { color: colors.textMuted, fontSize: scale(12) }]}>
                {r.dayName}
              </Text>
            </View>
            <Text style={[styles.resultMatch, { color: colors.accent, fontSize: scale(10) }]}>
              {r.matchedOn}
            </Text>
          </TouchableOpacity>
        ))}
        {query.length >= 2 && results.length === 0 && (
          <Text style={[styles.empty, { color: colors.textMuted, fontSize: scale(13) }]}>
            Nenhum resultado para &quot;{query}&quot;
          </Text>
        )}
        {query.length === 0 && (
          <Text style={[styles.hint, { color: colors.textMuted, fontSize: scale(13) }]}>
            Digite pelo menos 2 letras — funciona offline.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 16,
  },
  title: {
    fontWeight: '700',
    fontFamily: 'Lora_700Bold',
    flex: 1,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: 'Lora_400Regular',
    marginBottom: 12,
  },
  results: {
    flex: 1,
  },
  count: {
    marginBottom: 6,
    fontFamily: 'Lora_400Regular',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
  },
  resultContent: {
    flex: 1,
  },
  resultDate: {
    fontFamily: 'Lora_400Regular',
  },
  resultTitle: {
    fontFamily: 'Lora_400Regular_Italic',
    marginTop: 2,
  },
  resultMatch: {
    fontFamily: 'Lora_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  empty: {
    marginTop: 16,
    textAlign: 'center',
    fontFamily: 'Lora_400Regular_Italic',
  },
  hint: {
    marginTop: 24,
    textAlign: 'center',
    fontFamily: 'Lora_400Regular_Italic',
  },
});
