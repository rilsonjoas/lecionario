import { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  parse,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { seasonThemes } from '@/lib/theme';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { searchDevotionals } from '@/lib/search';
import type { LiturgicalSeason, RootTabParamList } from '@/types';

type NavProp = BottomTabNavigationProp<RootTabParamList, 'Calendário'>;

const seasonColors: Record<LiturgicalSeason, string> = Object.fromEntries(
  Object.entries(seasonThemes).map(([season, theme]) => [season, theme.primaryColor]),
) as Record<LiturgicalSeason, string>;

const seasonLabels: Record<LiturgicalSeason, string> = {
  advent: 'Advento',
  christmas: 'Natal',
  epiphany: 'Epifania',
  lent: 'Quaresma',
  easter: 'Páscoa',
  pentecost: 'Pentecostes',
  ordinary: 'Tempo Comum',
};

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const colors = useThemeColors();
  const { scale } = useFontScale();
  const { favorites } = useFavorites();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [loading, setLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, [currentMonth]);

  const goPrevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));
  const goNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days: Date[] = [];
  let cursor = calendarStart;
  while (cursor <= calendarEnd) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }

  const screenWidth = Dimensions.get('window').width;
  const daySize = Math.max(Math.min((screenWidth - 48) / 7, 48), 40);

  const searchResults = useMemo(
    () => (searchMode && searchQuery.length >= 2 ? searchDevotionals(searchQuery) : []),
    [searchMode, searchQuery],
  );

  const today = new Date();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 16 }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="calendar-text" size={24} color={colors.accent} />
        <Text style={[styles.title, { color: colors.text, fontSize: scale(20) }]}>
          Calendário Litúrgico
        </Text>
        <TouchableOpacity
          onPress={() => { setSearchMode(!searchMode); setSearchQuery(''); }}
          style={styles.searchToggle}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel={searchMode ? 'Fechar busca' : 'Buscar devocional'}
          accessibilityRole="button"
        >
          <MaterialCommunityIcons
            name={searchMode ? 'close' : 'magnify'}
            size={22}
            color={colors.accent}
          />
        </TouchableOpacity>
        {!isSameMonth(currentMonth, new Date()) && (
          <TouchableOpacity
            style={[styles.todayButton, { borderColor: `${colors.accent}66` }]}
            onPress={() => setCurrentMonth(startOfMonth(new Date()))}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Voltar para hoje"
          >
            <MaterialCommunityIcons name="calendar-today" size={14} color={colors.accent} />
            <Text style={[styles.todayButtonText, { color: colors.accent, fontSize: scale(10) }]}>
              Hoje
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity
          onPress={() => setShowFavorites(false)}
          style={[styles.tab, !showFavorites && { borderBottomColor: colors.accent }]}
          accessibilityRole="tab"
          accessibilityState={{ selected: !showFavorites }}
        >
          <Text style={[styles.tabText, { color: !showFavorites ? colors.accent : colors.textMuted, fontSize: scale(13) }]}>
            Calendário
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowFavorites(true)}
          style={[styles.tab, showFavorites && { borderBottomColor: colors.accent }]}
          accessibilityRole="tab"
          accessibilityState={{ selected: showFavorites }}
        >
          <MaterialCommunityIcons name="heart" size={14} color={showFavorites ? colors.accent : colors.textMuted} />
          <Text style={[styles.tabText, { color: showFavorites ? colors.accent : colors.textMuted, fontSize: scale(13) }]}>
            Favoritos {favorites.length > 0 ? `(${favorites.length})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {searchMode && (
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.searchInput, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border, fontSize: scale(15) }]}
            placeholder="Buscar por referência, data ou palavra-chave..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            returnKeyType="search"
          />
          {searchQuery.length >= 2 && (
            <Text style={[styles.searchCount, { color: colors.textMuted, fontSize: scale(11) }]}>
              {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
            </Text>
          )}
          {searchResults.map((r) => (
            <TouchableOpacity
              key={r.date}
              style={[styles.searchResult, { borderBottomColor: colors.border }]}
              onPress={() => { setSearchMode(false); navigation.navigate('Hoje', { date: r.date }); }}
              accessibilityRole="button"
            >
              <View style={styles.searchResultContent}>
                <Text style={[styles.searchResultDate, { color: colors.text, fontSize: scale(14) }]}>
                  {r.date}
                </Text>
                <Text style={[styles.searchResultTitle, { color: colors.textMuted, fontSize: scale(12) }]}>
                  {r.dayName}
                </Text>
              </View>
              <Text style={[styles.searchResultMatch, { color: colors.accent, fontSize: scale(10) }]}>
                {r.matchedOn}
              </Text>
            </TouchableOpacity>
          ))}
          {searchQuery.length >= 2 && searchResults.length === 0 && (
            <Text style={[styles.searchEmpty, { color: colors.textMuted, fontSize: scale(13) }]}>
              Nenhum resultado para "{searchQuery}"
            </Text>
          )}
        </View>
      )}

      {!showFavorites && !searchMode && (
        <>
        <View style={styles.monthNav}>
          <TouchableOpacity
            onPress={goPrevMonth}
            style={styles.monthButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Mês anterior"
            accessibilityRole="button"
          >
          <MaterialCommunityIcons name="chevron-left" size={28} color={colors.accent} />
        </TouchableOpacity>
        <Text style={[styles.monthTitle, { color: colors.text, fontSize: scale(16) }]}>
          {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
        </Text>
        <TouchableOpacity
          onPress={goNextMonth}
          style={styles.monthButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Próximo mês"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="chevron-right" size={28} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDaysRow}>
        {WEEKDAYS.map((wd) => (
          <View key={wd} style={[styles.weekDayCell, { width: daySize }]}>
            <Text style={[styles.weekDayText, { color: colors.textMuted, fontSize: scale(10) }]}>
              {wd}
            </Text>
          </View>
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : (
        <View style={styles.daysGrid}>
          {days.map((d) => {
            const info = getLiturgicalDayInfo(d);
            const seasonColor = seasonColors[info.season];
            const inMonth = isSameMonth(d, currentMonth);
            const isToday = isSameDay(d, today);

            return (
              <TouchableOpacity
                key={d.toISOString()}
                style={[
                  styles.dayCell,
                  { width: daySize, height: daySize },
                  !inMonth && styles.dayCellOtherMonth,
                  isToday && { backgroundColor: `${colors.accent}26` },
                ]}
                onPress={() => navigation.navigate('Hoje', { date: format(d, 'yyyy-MM-dd') })}
                accessibilityLabel={`${format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} - ${info.dayName}`}
                accessibilityRole="button"
              >
                <View style={[styles.dayDot, { backgroundColor: seasonColor }]} />
                <Text
                  style={[
                    styles.dayText,
                    { color: colors.text, fontSize: scale(13) },
                    !inMonth && { color: colors.textMuted },
                    isToday && styles.dayTextToday,
                  ]}
                >
                  {format(d, 'd')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <View style={styles.legend}>
        <Text style={[styles.legendTitle, { color: colors.textMuted, fontSize: scale(10) }]}>
          Cores Litúrgicas
        </Text>
        <View style={styles.legendGrid}>
          {(Object.keys(seasonColors) as LiturgicalSeason[]).map((season) => (
            <View key={season} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: seasonColors[season] }]} />
              <Text style={[styles.legendText, { color: colors.textMuted, fontSize: scale(11) }]}>
                {seasonLabels[season]}
              </Text>
            </View>
          ))}
        </View>
      </View>
        </>
      )}

      {showFavorites && !searchMode && (
        <View style={styles.favoritesList}>
          {favorites.length === 0 ? (
            <View style={styles.emptyFavorites}>
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
                    style={[styles.favoriteRow, { borderBottomColor: colors.border }]}
                    onPress={() => navigation.navigate('Hoje', { date: dateStr })}
                    accessibilityRole="button"
                    accessibilityLabel={`${format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} — ${info.dayName}`}
                  >
                    <View style={[styles.favoriteDot, { backgroundColor: seasonColor }]} />
                    <View style={styles.favoriteContent}>
                      <Text style={[styles.favoriteDate, { color: colors.text, fontSize: scale(14) }]}>
                        {format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </Text>
                      <Text style={[styles.favoriteDayName, { color: colors.textMuted, fontSize: scale(12) }]}>
                        {info.dayName}
                      </Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textMuted} />
                  </TouchableOpacity>
                );
              })
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 16,
  },
  searchToggle: {
    padding: 4,
  },
  title: {
    fontWeight: '700',
    fontFamily: 'Lora_700Bold',
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
  },
  todayButtonText: {
    fontFamily: 'Lora_600SemiBold_Italic',
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthButton: {
    padding: Platform.select({ android: 12, default: 8 }),
    minWidth: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthTitle: {
    fontFamily: 'Lora_400Regular',
    textTransform: 'capitalize',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  weekDayCell: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
    fontFamily: 'Lora_600SemiBold_Italic',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dayCell: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dayCellOtherMonth: {
    opacity: 0.25,
  },
  dayDot: {
    position: 'absolute',
    top: Platform.select({ android: 6, default: 4 }),
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dayText: {
    fontFamily: 'Lora_400Regular',
  },
  dayTextToday: {
    fontWeight: '700',
  },
  legend: {
    marginTop: 24,
  },
  legendTitle: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
    fontFamily: 'Lora_700Bold',
    marginBottom: 12,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontFamily: 'Lora_400Regular',
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(128,128,128,0.2)',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontFamily: 'Lora_700Bold',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  favoritesList: {
    flex: 1,
  },
  favoriteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
  },
  favoriteDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  favoriteContent: {
    flex: 1,
  },
  favoriteDate: {
    fontFamily: 'Lora_400Regular',
  },
  favoriteDayName: {
    fontFamily: 'Lora_400Regular_Italic',
    marginTop: 2,
  },
  emptyFavorites: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    gap: 8,
  },
  emptyText: {
    fontFamily: 'Lora_700Bold',
  },
  emptyHint: {
    fontFamily: 'Lora_400Regular',
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: 'Lora_400Regular',
  },
  searchCount: {
    marginTop: 6,
    fontFamily: 'Lora_400Regular',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
  },
  searchResultContent: {
    flex: 1,
  },
  searchResultDate: {
    fontFamily: 'Lora_400Regular',
  },
  searchResultTitle: {
    fontFamily: 'Lora_400Regular_Italic',
    marginTop: 2,
  },
  searchResultMatch: {
    fontFamily: 'Lora_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  searchEmpty: {
    marginTop: 16,
    textAlign: 'center',
    fontFamily: 'Lora_400Regular_Italic',
  },
});
