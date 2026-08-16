import { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Share,
  Platform,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { addDays, format, parse, isToday as isDateToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { getThemeForSeason, getHeaderTextColors } from '@/lib/theme';
import { fetchDevotionalFromNetwork } from '@/lib/devotional-service';
import { getCached, setCached, cacheKey } from '@/lib/cache';
import { ReadingCard } from '@/components/devotional/ReadingCard';
import { PrayerSection } from '@/components/devotional/PrayerSection';
import { MeditationSection } from '@/components/devotional/MeditationSection';
import { CollectSection } from '@/components/devotional/CollectSection';
import type { DailyDevotional, RootTabParamList } from '@/types';

type HojeRouteProp = RouteProp<RootTabParamList, 'Hoje'>;

const SEASON_LOGOS: Record<string, number> = {
  advent: require('../../assets/logo/season-advent.png'),
  christmas: require('../../assets/logo/season-christmas.png'),
  epiphany: require('../../assets/logo/season-epiphany.png'),
  lent: require('../../assets/logo/season-lent.png'),
  easter: require('../../assets/logo/season-easter.png'),
  pentecost: require('../../assets/logo/season-pentecost.png'),
  ordinary: require('../../assets/logo/season-ordinary.png'),
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<HojeRouteProp>();
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList, 'Hoje'>>();
  const [currentDate, setCurrentDate] = useState(() => {
    if (route.params?.date) {
      return parse(route.params.date, 'yyyy-MM-dd', new Date());
    }
    return new Date();
  });
  const [devotional, setDevotional] = useState<DailyDevotional | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const abortRef = useRef(false);

  const liturgicalInfo = getLiturgicalDayInfo(currentDate);
  const theme = getThemeForSeason(liturgicalInfo.season);
  const headerColors = getHeaderTextColors(liturgicalInfo.season);
  const showTodayButton = !isDateToday(currentDate);

  const loadDevotional = useCallback(async (date: Date, forceNetwork = false) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    abortRef.current = false;
    let loaded = false;

    if (!forceNetwork) {
      const cached = await getCached<DailyDevotional>(cacheKey(dateStr));
      if (cached && !abortRef.current) {
        setDevotional(cached);
        setLoading(false);
        setIsOffline(false);
        loaded = true;
      }
    }

    if (abortRef.current) return;

    try {
      const fresh = await fetchDevotionalFromNetwork(date);
      if (abortRef.current) return;

      if (fresh) {
        setDevotional(fresh);
        setIsOffline(false);
        await setCached(cacheKey(dateStr), fresh);
      } else if (!loaded) {
        setDevotional(null);
      }
    } catch {
      if (!loaded) {
        setIsOffline(true);
      }
    } finally {
      if (!abortRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setIsOffline(false);
    loadDevotional(currentDate);
    return () => {
      abortRef.current = true;
    };
  }, [currentDate, loadDevotional]);

  const initialParams = useRef(route.params);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.date && route.params !== initialParams.current) {
        initialParams.current = route.params;
        const newDate = parse(route.params.date, 'yyyy-MM-dd', new Date());
        setLoading(true);
        setCurrentDate(newDate);
      }
    }, [route.params]),
  );

  const navigateDay = (delta: number) => {
    setLoading(true);
    setIsOffline(false);
    setCurrentDate((prev) => addDays(prev, delta));
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDevotional(currentDate, true);
  };

  const handleShareDay = async () => {
    if (!devotional) return;
    const dateStr = format(currentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    const refs = devotional.readings.map((r) => r.reference).join(' • ');
    const lines = [
      `Lecionário — ${liturgicalInfo.dayName}`,
      `${dateStr} • Ano ${liturgicalInfo.cycle}`,
      '',
      `📖 ${refs}`,
    ];
    if (devotional.collect) {
      lines.push('', 'Coleta:', devotional.collect);
    }
    lines.push('', `🕯 ${devotional.prayer.title}`, devotional.prayer.text);
    lines.push('', '— Lecionário App');
    await Share.share({ message: lines.join('\n') });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.primaryColor, paddingTop: insets.top + 16 },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Image
            source={SEASON_LOGOS[liturgicalInfo.season]}
            style={styles.logo}
            accessibilityLabel="Logomarca Lecionário"
          />
          <Text style={[styles.title, { color: headerColors.title }]}>Lecionário</Text>
          {devotional && (
            <TouchableOpacity
              onPress={handleShareDay}
              style={styles.shareDayButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityLabel="Compartilhar devocional do dia"
              accessibilityRole="button"
            >
              <MaterialCommunityIcons name="share-outline" size={20} color={headerColors.title} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={[styles.dayName, { color: headerColors.body }]}>{liturgicalInfo.dayName}</Text>
        <View style={styles.cycleRow}>
          <Text style={[styles.cycleText, { color: headerColors.bodyMuted }]}>
            Ano Litúrgico {liturgicalInfo.cycle}
          </Text>
          <View style={[styles.colorDot, { backgroundColor: theme.secondaryColor }]} />
        </View>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => navigateDay(-1)}
          style={styles.navButton}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          accessibilityRole="button"
          accessibilityLabel="Dia anterior"
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color={headerColors.bodyMuted} />
          <Text style={[styles.navText, { color: headerColors.bodyMuted }]}>Anterior</Text>
        </TouchableOpacity>

        {/* Achado real (2026-08-16): tocar na data não fazia nada — vira
            botão que leva pro calendário, que é o comportamento esperado */}
        <TouchableOpacity
          style={styles.dateContainer}
          onPress={() => navigation.navigate('Calendário')}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          accessibilityRole="button"
          accessibilityLabel="Abrir calendário litúrgico"
        >
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={16}
            color={headerColors.body}
          />
          <Text style={[styles.dateText, { color: headerColors.body }]}>
            {format(currentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateDay(1)}
          style={styles.navButton}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          accessibilityRole="button"
          accessibilityLabel="Próximo dia"
        >
          <Text style={[styles.navText, { color: headerColors.bodyMuted }]}>Próximo</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={headerColors.bodyMuted} />
        </TouchableOpacity>
      </View>

      {/* "Voltar para hoje" — só aparece quando navegando fora do dia atual */}
      {showTodayButton && (
        <TouchableOpacity
          style={[styles.todayButton, { borderColor: headerColors.bodyMuted }]}
          onPress={() => setCurrentDate(new Date())}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Voltar para hoje"
        >
          <MaterialCommunityIcons name="calendar-today" size={14} color={headerColors.body} />
          <Text style={[styles.todayButtonText, { color: headerColors.body }]}>
            Voltar para hoje
          </Text>
        </TouchableOpacity>
      )}

      {isOffline && (
        <View style={styles.offlineBanner}>
          <MaterialCommunityIcons name="wifi-off" size={14} color="#F5F5F0" />
          <Text style={styles.offlineText}>Modo offline — dados podem estar desatualizados</Text>
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="rgba(255,255,255,0.6)" />
          </View>
        ) : !devotional ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Nenhum dado encontrado para esta data.</Text>
            <TouchableOpacity
              onPress={onRefresh}
              style={styles.retryButton}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              accessibilityRole="button"
              accessibilityLabel="Tentar novamente"
            >
              <Text style={styles.retryText}>Tentar novamente</Text>
            </TouchableOpacity>
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
                  Ano Litúrgico {devotional.liturgicalInfo.cycle} • {devotional.readings.length}{' '}
                  Estações da Palavra
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
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 32,
    height: 32,
  },
  shareDayButton: {
    padding: 4,
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Lora_700Bold',
  },
  dayName: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'Lora_400Regular_Italic',
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
    padding: Platform.select({ android: 12, default: 4 }),
    minHeight: 44,
  },
  navText: {
    fontSize: 13,
    fontFamily: 'Lora_400Regular',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 44,
    paddingHorizontal: 4,
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 6,
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  todayButtonText: {
    fontSize: 12,
    fontFamily: 'Lora_600SemiBold_Italic',
  },
  dateText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'Lora_400Regular',
  },
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,100,100,0.2)',
    marginHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  offlineText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
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
    fontFamily: 'Lora_400Regular',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
  },
  retryText: {
    fontSize: 14,
    color: '#F5F5F0',
    fontFamily: 'Lora_400Regular',
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
    fontFamily: 'Lora_400Regular_Italic',
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
