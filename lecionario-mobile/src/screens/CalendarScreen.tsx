import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
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
import type { LiturgicalSeason, RootTabParamList } from '@/types';

type NavProp = BottomTabNavigationProp<RootTabParamList, 'Calendário'>;

const seasonColors: Record<LiturgicalSeason, string> = {
  advent: '#7B4EA8',
  christmas: '#C4A44A',
  epiphany: '#2E7D32',
  lent: '#8B4A4A',
  easter: '#B8860B',
  pentecost: '#CC3333',
  ordinary: '#4A8B4A',
};

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
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

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
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="calendar-text" size={24} color="#B8860B" />
        <Text style={styles.title}>Calendário Litúrgico</Text>
      </View>

      <View style={styles.monthNav}>
        <TouchableOpacity
          onPress={goPrevMonth}
          style={styles.monthButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Mês anterior"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color="#B8860B" />
        </TouchableOpacity>
        <Text style={styles.monthTitle}>
          {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
        </Text>
        <TouchableOpacity
          onPress={goNextMonth}
          style={styles.monthButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Próximo mês"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="chevron-right" size={28} color="#B8860B" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDaysRow}>
        {WEEKDAYS.map((wd) => (
          <View key={wd} style={[styles.weekDayCell, { width: daySize }]}>
            <Text style={styles.weekDayText}>{wd}</Text>
          </View>
        ))}
      </View>

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
                isToday && styles.dayCellToday,
              ]}
              onPress={() => navigation.navigate('Hoje', { date: format(d, 'yyyy-MM-dd') })}
              accessibilityLabel={`${format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} - ${info.dayName}`}
              accessibilityRole="button"
            >
              <View style={[styles.dayDot, { backgroundColor: seasonColor }]} />
              <Text
                style={[
                  styles.dayText,
                  !inMonth && styles.dayTextOtherMonth,
                  isToday && styles.dayTextToday,
                ]}
              >
                {format(d, 'd')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Cores Litúrgicas</Text>
        <View style={styles.legendGrid}>
          {(Object.keys(seasonColors) as LiturgicalSeason[]).map((season) => (
            <View key={season} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: seasonColors[season] }]} />
              <Text style={styles.legendText}>{seasonLabels[season]}</Text>
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
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F5F5F0',
    fontFamily: 'Lora_700Bold',
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
    fontSize: 18,
    color: '#F5F5F0',
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
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
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
  dayCellToday: {
    backgroundColor: 'rgba(184,134,11,0.15)',
    borderRadius: Platform.select({ android: 12, default: 8 }),
  },
  dayDot: {
    position: 'absolute',
    top: Platform.select({ android: 6, default: 4 }),
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dayText: {
    fontSize: 14,
    color: '#F5F5F0',
    fontFamily: 'Lora_400Regular',
  },
  dayTextOtherMonth: {
    color: 'rgba(245,245,240,0.25)',
  },
  dayTextToday: {
    fontWeight: '700',
    color: '#B8860B',
  },
  legend: {
    marginTop: 24,
  },
  legendTitle: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
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
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    fontFamily: 'Lora_400Regular',
  },
});
