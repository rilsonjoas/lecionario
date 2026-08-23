import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { addDays, format, parse, isToday as isDateToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';
import { getThemeForSeason, getHeaderTextColors, getOnBrandTextColors } from '@/lib/theme';
import { fetchDevotionalFromNetwork } from '@/lib/devotional-service';
import { getCached, setCached, cacheKey } from '@/lib/cache';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { ReadingCard } from '@/components/devotional/ReadingCard';
import { PrayerSection } from '@/components/devotional/PrayerSection';
import { MeditationSection } from '@/components/devotional/MeditationSection';
import { CollectSection } from '@/components/devotional/CollectSection';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { QuoteCard } from '@/components/QuoteCard';
import { ArtCard } from '@/components/ArtCard';
import { GlossaryTerm } from '@/components/GlossaryTerm';
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

// Altura da barra compacta além da status bar (apontamento 2026-08-22:
// header grande comia a tela em aparelhos pequenos — padrão colapsável
// estilo large-title do iOS/Material: o bloco rico rola embora e esta
// barra fina assume com logo + dia + navegação)
const COMPACT_BAR_CONTENT_HEIGHT = 48;
// Offset de scroll em que a barra compacta está totalmente visível
const COMPACT_REVEAL_OFFSET = 130;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<HojeRouteProp>();
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList, 'Hoje'>>();
  const colors = useThemeColors();
  const { scale } = useFontScale();
  const { toggleFavorite, isFavorite } = useFavorites();
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

  // Colapso do header: valor animado pelo offset do scroll controla a
  // opacidade da barra compacta; o booleano liga/desliga os toques
  // useMemo (não useRef().current): a reforma react-hooks/refs v7
  // proíbe acessar .current de ref durante render
  const scrollY = useMemo(() => new Animated.Value(0), []);
  const [compactVisible, setCompactVisible] = useState(false);
  const compactVisibleRef = useRef(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const compactOpacity = scrollY.interpolate({
    inputRange: [COMPACT_REVEAL_OFFSET - 60, COMPACT_REVEAL_OFFSET],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const liturgicalInfo = getLiturgicalDayInfo(currentDate);
  const theme = getThemeForSeason(liturgicalInfo.season);
  const headerColors = getHeaderTextColors(liturgicalInfo.season);
  // Texto direto sobre o primaryColor (títulos de seção fora de cards):
  // claro sobre marca escura, escuro sobre marca clara (ouro)
  const onBrand = getOnBrandTextColors(liturgicalInfo.season);
  const showTodayButton = !isDateToday(currentDate);
  const currentDateStr = format(currentDate, 'yyyy-MM-dd');
  const favorited = isFavorite(currentDateStr);

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
    // Troca de dia volta pro topo: sem isso, navegando pela barra compacta
    // o novo dia abria já rolado, escondendo o header completo
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    scrollY.setValue(0);
    compactVisibleRef.current = false;
    setCompactVisible(false);
    return () => {
      abortRef.current = true;
    };
  }, [currentDate, loadDevotional, scrollY]);

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
    lines.push('', '— Lecionário · lecionario.narniano.com');
    await Share.share({ message: lines.join('\n') });
  };

  // Handler puro em vez de Animated.event: o construtor do event roda
  // durante render e a regra react-hooks/refs v7 proíbe qualquer acesso
  // a valor animado nesse momento. setValue por frame via JS é suave
  // o bastante pra uma barrinha de opacidade
  const handleScroll = (e: { nativeEvent: { contentOffset: { y: number } } }) => {
    const y = e.nativeEvent.contentOffset.y;
    scrollY.setValue(y);
    const visible = y > COMPACT_REVEAL_OFFSET - 30;
    if (visible !== compactVisibleRef.current) {
      compactVisibleRef.current = visible;
      setCompactVisible(visible);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryColor }]}>
      {/* Barra compacta fixa (2026-08-22): mesma cor da estação + véu,
          surge quando o header grande rola pra fora. Devolve ~330px de
          conteúdo na leitura sem perder identidade nem navegação */}
      <Animated.View
        style={[
          styles.compactBar,
          {
            backgroundColor: theme.primaryColor,
            paddingTop: insets.top,
            opacity: compactOpacity,
          },
        ]}
        pointerEvents={compactVisible ? 'box-none' : 'none'}
        accessibilityElementsHidden={!compactVisible}
        importantForAccessibility={compactVisible ? 'auto' : 'no-hide-descendants'}
      >
        <View style={styles.headerVeil} pointerEvents="none" />
        <View style={[styles.compactRow, { height: COMPACT_BAR_CONTENT_HEIGHT }]}>
          <Image
            source={SEASON_LOGOS[liturgicalInfo.season]}
            style={styles.compactLogo}
            accessibilityLabel="Logomarca Lecionário"
          />
          <Text style={[styles.compactTitle, { color: headerColors.title }]}>Lecionário</Text>
          <Text numberOfLines={1} style={[styles.compactDay, { color: headerColors.body }]}>
            {liturgicalInfo.dayName}
          </Text>
          <TouchableOpacity
            onPress={() => navigateDay(-1)}
            style={styles.compactButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Dia anterior"
          >
            <MaterialCommunityIcons name="chevron-left" size={22} color={headerColors.body} />
          </TouchableOpacity>
          {showTodayButton && (
            <TouchableOpacity
              onPress={() => setCurrentDate(new Date())}
              style={styles.compactButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Voltar para hoje"
            >
              <MaterialCommunityIcons name="calendar-today" size={18} color={headerColors.body} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigateDay(1)}
            style={styles.compactButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Próximo dia"
          >
            <MaterialCommunityIcons name="chevron-right" size={22} color={headerColors.body} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Banda superior com véu escuro (2026-08-21): mesma matemática do
            web Header/Footer (rgba(0,0,0,0.4) sobre a cor de marca) pra
            garantir WCAG AA do texto em todas as estações — ouro natalino
            era 2.05:1 sem ele. Desde 2026-08-22 rola junto com o conteúdo
            (padrão colapsável); a barra compacta fixa lá em cima assume ao
            rolar. O padding da status bar mora AQUI dentro pro véu cobrir
            desde o topo do aparelho */}
        <View style={[styles.topTintedZone, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerVeil} pointerEvents="none" />
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Image
                source={SEASON_LOGOS[liturgicalInfo.season]}
                style={styles.logo}
                accessibilityLabel="Logomarca Lecionário"
              />
              <Text style={[styles.title, { color: headerColors.title }]}>Lecionário</Text>
            </View>
            <Text style={[styles.dayName, { color: headerColors.body }]}>
              {liturgicalInfo.dayName}
            </Text>
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
              <MaterialCommunityIcons
                name="chevron-left"
                size={24}
                color={headerColors.bodyMuted}
              />
              <Text
                style={[styles.navText, { color: headerColors.bodyMuted, fontSize: scale(12) }]}
              >
                Anterior
              </Text>
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
              <Text style={[styles.dateText, { color: headerColors.body, fontSize: scale(11) }]}>
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
              <Text
                style={[styles.navText, { color: headerColors.bodyMuted, fontSize: scale(12) }]}
              >
                Próximo
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={headerColors.bodyMuted}
              />
            </TouchableOpacity>
          </View>

          {/* Ações do dia (backlog 2026-08-21, restyle 2026-08-22): saíram
              da linha do título e hoje são pílulas SÓLIDAS com os tokens
              do tema (colors.card/text) — neutras de estação por design,
              visíveis sobre o véu em qualquer época do ano */}
          {devotional && (
            <View style={styles.actionsRow}>
              <TouchableOpacity
                onPress={() => toggleFavorite(currentDateStr)}
                style={[
                  styles.actionPill,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityLabel={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                accessibilityRole="button"
              >
                <MaterialCommunityIcons
                  name={favorited ? 'heart' : 'heart-outline'}
                  size={16}
                  color={favorited ? '#CC3333' : colors.text}
                />
                <Text style={[styles.actionPillText, { color: colors.text, fontSize: scale(12) }]}>
                  {favorited ? 'Favoritado' : 'Favoritar'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleShareDay}
                style={[
                  styles.actionPill,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityLabel="Compartilhar devocional do dia"
                accessibilityRole="button"
              >
                <MaterialCommunityIcons name="share-outline" size={16} color={colors.text} />
                <Text style={[styles.actionPillText, { color: colors.text, fontSize: scale(12) }]}>
                  Compartilhar
                </Text>
              </TouchableOpacity>
            </View>
          )}

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
              <Text style={styles.offlineText}>
                Modo offline — dados podem estar desatualizados
              </Text>
            </View>
          )}
        </View>

        <View style={styles.scrollContent}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="rgba(255,255,255,0.6)" />
            </View>
          ) : isOffline && !devotional ? (
            <View style={[styles.stateSurface, { backgroundColor: colors.card }]}>
              <ErrorState
                message="Não foi possível carregar o devocional. Verifique sua conexão."
                onRetry={onRefresh}
              />
            </View>
          ) : !devotional ? (
            <View style={[styles.stateSurface, { backgroundColor: colors.card }]}>
              <EmptyState
                icon="book-open-variant"
                title="Nenhum dado encontrado"
                subtitle="Não há devocional disponível para esta data."
              />
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
                  <View style={styles.lectioTitleRow}>
                    <Text
                      style={[
                        styles.sectionHeaderTitle,
                        { color: onBrand.text, fontSize: scale(22) },
                      ]}
                    >
                      Lectio Divina
                    </Text>
                    <GlossaryTerm term="lectio" size={15} />
                  </View>
                  <Text
                    style={[styles.sectionHeaderSub, { color: onBrand.muted, fontSize: scale(8) }]}
                  >
                    Ano Litúrgico {devotional.liturgicalInfo.cycle} • {devotional.readings.length}{' '}
                    Estações da Palavra
                  </Text>
                </View>
                {devotional.readings.map((reading, index) => (
                  <ReadingCard
                    key={`${reading.type}-${index}`}
                    reading={reading}
                    index={index}
                    season={liturgicalInfo.season}
                  />
                ))}
              </View>

              <View style={styles.section}>
                <PrayerSection prayer={devotional.prayer} />
              </View>

              <View style={styles.section}>
                <MeditationSection meditation={devotional.meditation} />
              </View>

              <View style={styles.section}>
                <View style={styles.quoteSectionHeader}>
                  <Text
                    style={[
                      styles.sectionHeaderTitle,
                      { color: onBrand.text, fontSize: scale(18) },
                    ]}
                  >
                    Citação do dia
                  </Text>
                  <Text
                    style={[styles.sectionHeaderSub, { color: onBrand.muted, fontSize: scale(8) }]}
                  >
                    C. S. LEWIS
                  </Text>
                </View>
                <QuoteCard date={currentDate} />
                {!isOffline && devotional.readings.length > 0 && (
                  <ArtCard references={devotional.readings.map((r) => r.reference)} />
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  compactBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 10,
  },
  compactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  compactLogo: {
    width: 22,
    height: 22,
  },
  compactTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Lora_700Bold',
  },
  compactDay: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Lora_400Regular_Italic',
    textAlign: 'center',
  },
  compactButton: {
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTintedZone: {
    position: 'relative',
    paddingBottom: 16,
  },
  headerVeil: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
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
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
  },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    minHeight: 40,
    borderRadius: 22,
    borderWidth: 1,
  },
  actionPillText: {
    fontWeight: '600',
    fontFamily: 'Lora_600SemiBold_Italic',
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  section: {
    marginBottom: 24,
  },
  lectioTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionHeaderTitle: {
    fontFamily: 'Lora_400Regular_Italic',
  },
  stateSurface: {
    borderRadius: 12,
    paddingVertical: 24,
  },
  sectionHeaderSub: {
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '700',
    marginTop: 8,
  },
  quoteSectionHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
});
