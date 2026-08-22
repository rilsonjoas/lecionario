import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { seasonThemes } from '@/lib/theme';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import type { LiturgicalSeason, RootTabParamList } from '@/types';

type NavProp = BottomTabNavigationProp<RootTabParamList, 'Favoritos'>;

const seasonColors: Record<LiturgicalSeason, string> = Object.fromEntries(
  Object.entries(seasonThemes).map(([season, theme]) => [season, theme.primaryColor]),
) as Record<LiturgicalSeason, string>;

// Tela própria de favoritos — saiu da aba interna do Calendário pra virar
// tab no menu de baixo (apontamento do autor).
export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const colors = useThemeColors();
  const { scale } = useFontScale();
  const { favorites } = useFavorites();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top + 16 },
      ]}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons name="heart" size={24} color={colors.accent} />
        <Text style={[styles.title, { color: colors.text, fontSize: scale(20) }]}>
          Favoritos{' '}
          {favorites.length > 0 ? (
            <Text style={{ color: colors.textMuted }}>({favorites.length})</Text>
          ) : null}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.list}>
        {favorites.length === 0 ? (
          <View style={styles.empty}>
            <MaterialCommunityIcons name="heart-outline" size={40} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted, fontSize: scale(15) }]}>
              Nenhum dia favoritado ainda
            </Text>
            <Text style={[styles.emptyHint, { color: colors.textMuted, fontSize: scale(12) }]}>
              Toque no coração no devocional do dia para salvar aqui.
            </Text>
          </View>
        ) : (
          favorites
            .sort()
            .reverse()
            .map((dateStr) => {
              const d = parse(dateStr, 'yyyy-MM-dd', new Date());
              const info = getLiturgicalDayInfo(d);
              const seasonColor = seasonColors[info.season];
              return (
                <TouchableOpacity
                  key={dateStr}
                  style={[styles.row, { borderBottomColor: colors.border }]}
                  onPress={() => navigation.navigate('Hoje', { date: dateStr })}
                  accessibilityRole="button"
                  accessibilityLabel={`${format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} — ${info.dayName}`}
                >
                  <View style={[styles.dot, { backgroundColor: seasonColor }]} />
                  <View style={styles.content}>
                    <Text style={[styles.date, { color: colors.text, fontSize: scale(14) }]}>
                      {format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </Text>
                    <Text style={[styles.dayName, { color: colors.textMuted, fontSize: scale(12) }]}>
                      {info.dayName}
                    </Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              );
            })
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
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
  date: {
    fontFamily: 'Lora_400Regular',
  },
  dayName: {
    fontFamily: 'Lora_400Regular_Italic',
    marginTop: 2,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  emptyText: {
    fontFamily: 'Lora_700Bold',
  },
  emptyHint: {
    fontFamily: 'Lora_400Regular',
    textAlign: 'center',
  },
});
