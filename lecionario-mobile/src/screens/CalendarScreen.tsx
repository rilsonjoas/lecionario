import { useState, useEffect } from 'react';
import {
  View,
  Text,
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
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { seasonThemes } from '@/lib/theme';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
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

// Calendário puro: busca e favoritos viraram telas próprias nas tabs de
// baixo (apontamento do autor).
export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const colors = useThemeColors();
  const { scale } = useFontScale();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [loading, setLoading] = useState(true);

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

  const today = new Date();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top + 16 },
      ]}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons name="calendar-text" size={24} color={colors.accent} />
        <Text style={[styles.title, { color: colors.text, fontSize: scale(20) }]}>
          Calendário Litúrgico
        </Text>
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
  title: {
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
});
