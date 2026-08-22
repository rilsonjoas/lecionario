import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Linking,
  Image,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { buildPixBrCode, PIX_CONFIG } from '@/lib/pix';
import {
  requestNotificationPermission,
  scheduleDailyNotification,
  cancelAllNotifications,
} from '@/lib/notifications';
import {
  useSettings,
  type ThemePreference,
  type FontSizePreference,
} from '@/contexts/SettingsContext';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';

const THEME_OPTIONS: { value: ThemePreference; label: string; icon: string }[] = [
  { value: 'system', label: 'Sistema', icon: 'cellphone' },
  { value: 'light', label: 'Claro', icon: 'white-balance-sunny' },
  { value: 'dark', label: 'Escuro', icon: 'moon-waning-crescent' },
];

const FONT_OPTIONS: { value: FontSizePreference; label: string; preview: number }[] = [
  { value: 'small', label: 'Pequena', preview: 13 },
  { value: 'medium', label: 'Média', preview: 15 },
  { value: 'large', label: 'Grande', preview: 18 },
];

// Grade completa de horas (apontamento do autor, 2026-08-22: usuário
// deve poder escolher QUALQUER horário do lembrete). Gerado em JS puro
// de propósito — o seletor nativo (@react-native-community/datetimepicker)
// é módulo nativo e exigiria APK novo; aqui basta OTA.
const TIME_OPTIONS = Array.from({ length: 24 }, (_, h) => ({
  value: `${String(h).padStart(2, '0')}:00`,
  label: `${h}h`,
}));

// Favicons reais dos projetos da biblioteca (apontamento do autor,
// 2026-08-22: círculos chamam mais atenção que ícone genérico)
const PROJECT_LOGOS = {
  narniano: require('../assets/projects/narniano.png'),
  'biblia-na-arte': require('../assets/projects/biblia-na-arte.png'),
  scriptorium: require('../assets/projects/scriptorium.png'),
  cslewis: require('../assets/projects/cslewis.png'),
} as const;

const BIBLIOTECA_LINKS: {
  label: string;
  description: string;
  url: string;
  logo: keyof typeof PROJECT_LOGOS;
}[] = [
  {
    label: 'Narniano',
    description: 'Portal sobre C.S. Lewis, Nárnia e fé cristã',
    url: 'https://narniano.com',
    logo: 'narniano',
  },
  {
    label: 'Bíblia na Arte',
    description: 'Obras de arte inspiradas nas Escrituras',
    url: 'https://biblianaarte.narniano.com',
    logo: 'biblia-na-arte',
  },
  {
    label: 'Scriptorium Divinum',
    description: 'Clássicos da teologia cristã em português',
    url: 'https://scriptorium.narniano.com',
    logo: 'scriptorium',
  },
  {
    label: 'Gerador C.S. Lewis',
    description: 'Citações inspiradoras de C.S. Lewis',
    url: 'https://cslewis.narniano.com',
    logo: 'cslewis',
  },
];

export default function ConfigScreen() {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { scale } = useFontScale();
  // Modal de doação (2026-08-22): substitui o Alert nativo do sistema,
  // que destoava do visual do app (report do autor). Dois estados:
  // fechado → aberto com o código → copiado com confirmação
  const [pixModalVisible, setPixModalVisible] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  // Seletor de horário em dois níveis (refino do autor, 2026-08-22):
  // muro de 24 chips era feio — mostra horários comuns e expande sob demanda
  const TIME_PRESETS = ['05:00', '06:00', '07:00', '08:00', '09:00', '12:00', '18:00', '21:00'];
  const [showAllTimes, setShowAllTimes] = useState(false);
  const presetOptions = TIME_OPTIONS.filter((t) => TIME_PRESETS.includes(t.value));
  const timeChips = showAllTimes
    ? TIME_OPTIONS
    : [
        ...presetOptions,
        ...(presetOptions.some((t) => t.value === notificationTime)
          ? []
          : TIME_OPTIONS.filter((t) => t.value === notificationTime)),
      ];
  const {
    theme,
    fontSize,
    notificationsEnabled,
    notificationTime,
    setTheme,
    setFontSize,
    setNotificationsEnabled,
    setNotificationTime,
  } = useSettings();
  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        Alert.alert(
          'Permissão negada',
          'Ative as notificações nas configurações do sistema para receber o lembrete diário.',
        );
        return;
      }
      await scheduleDailyNotification(notificationTime);
      setNotificationsEnabled(true);
    } else {
      await cancelAllNotifications();
      setNotificationsEnabled(false);
    }
  };

  const handleChangeTime = async (time: string) => {
    setNotificationTime(time);
    if (notificationsEnabled) {
      await scheduleDailyNotification(time);
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top + 16 },
      ]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons name="cog" size={24} color={colors.accent} />
        <Text style={[styles.title, { color: colors.text }]}>Configurações</Text>
      </View>

      {/* Notificações */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Notificações</Text>
        <TouchableOpacity
          style={[styles.row, { borderBottomColor: colors.border }]}
          onPress={handleToggleNotifications}
          accessibilityLabel={
            notificationsEnabled ? 'Desativar notificações' : 'Ativar notificações'
          }
          accessibilityRole="switch"
          accessibilityState={{ checked: notificationsEnabled }}
        >
          <MaterialCommunityIcons
            name={notificationsEnabled ? 'bell' : 'bell-off-outline'}
            size={22}
            color={colors.accent}
          />
          <View style={styles.rowContent}>
            <Text style={[styles.rowLabel, { color: colors.text, fontSize: scale(15) }]}>
              Lembrete diário
            </Text>
            <Text style={[styles.rowHint, { color: colors.textMuted, fontSize: scale(12) }]}>
              {notificationsEnabled
                ? `Ativado — às ${notificationTime}`
                : 'Receba a leitura do dia no horário que você escolher'}
            </Text>
          </View>
          <View
            style={[
              styles.toggle,
              { backgroundColor: notificationsEnabled ? colors.accent : colors.border },
            ]}
          >
            <View
              style={[
                styles.toggleKnob,
                { transform: [{ translateX: notificationsEnabled ? 18 : 2 }] },
              ]}
            />
          </View>
        </TouchableOpacity>

        {notificationsEnabled && (
          <View
            style={[
              styles.timePicker,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text
              style={[styles.timePickerLabel, { color: colors.textMuted, fontSize: scale(10) }]}
            >
              Horário
            </Text>
            <View style={styles.timeRow}>
              {timeChips.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.timeButton,
                    {
                      backgroundColor:
                        notificationTime === opt.value ? colors.accent : 'transparent',
                      borderColor: notificationTime === opt.value ? colors.accent : colors.border,
                    },
                  ]}
                  onPress={() => handleChangeTime(opt.value)}
                  accessibilityLabel={`Notificar às ${opt.label}`}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: notificationTime === opt.value }}
                >
                  <Text
                    style={[
                      styles.timeText,
                      {
                        color: notificationTime === opt.value ? '#FFF' : colors.text,
                        fontSize: scale(13),
                      },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.timeExpandButton}
                onPress={() => setShowAllTimes(!showAllTimes)}
                accessibilityRole="button"
                accessibilityLabel={
                  showAllTimes ? 'Mostrar apenas horários comuns' : 'Mostrar todos os horários'
                }
              >
                <MaterialCommunityIcons
                  name={showAllTimes ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  color={colors.accent}
                />
                <Text
                  style={[styles.timeExpandText, { color: colors.accent, fontSize: scale(11) }]}
                >
                  {showAllTimes ? 'Menos horários' : 'Outros horários'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Aparência */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Aparência</Text>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: colors.text }]}>Tema</Text>
          <View style={styles.optionRow}>
            {THEME_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: theme === opt.value ? colors.accent : 'transparent',
                    borderColor: theme === opt.value ? colors.accent : colors.border,
                  },
                ]}
                onPress={() => setTheme(opt.value)}
                accessibilityLabel={`Tema ${opt.label}`}
                accessibilityRole="radio"
                accessibilityState={{ checked: theme === opt.value }}
              >
                <MaterialCommunityIcons
                  name={opt.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                  size={16}
                  color={theme === opt.value ? '#FFF' : colors.textMuted}
                />
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: theme === opt.value ? '#FFF' : colors.text,
                      fontSize: scale(12),
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: colors.text }]}>Tamanho da fonte</Text>
          <View style={styles.optionRow}>
            {FONT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: fontSize === opt.value ? colors.accent : 'transparent',
                    borderColor: fontSize === opt.value ? colors.accent : colors.border,
                  },
                ]}
                onPress={() => setFontSize(opt.value)}
                accessibilityLabel={`Fonte ${opt.label}`}
                accessibilityRole="radio"
                accessibilityState={{ checked: fontSize === opt.value }}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: fontSize === opt.value ? '#FFF' : colors.text,
                      fontSize: scale(opt.preview - 2),
                    },
                  ]}
                >
                  Aa
                </Text>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: fontSize === opt.value ? '#FFF' : colors.textMuted,
                      fontSize: scale(10),
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Biblioteca */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Biblioteca</Text>
        <Text style={[styles.bibliotecaIntro, { color: colors.textMuted, fontSize: scale(12) }]}>
          Parte de um ecossistema de projetos dedicados à teologia, à literatura e à devoção cristã.
        </Text>
        {BIBLIOTECA_LINKS.map((link) => (
          <TouchableOpacity
            key={link.label}
            onPress={() => Linking.openURL(link.url)}
            style={[styles.row, { borderBottomColor: colors.border }]}
            accessibilityRole="link"
            accessibilityLabel={`Abrir ${link.label}`}
          >
            <Image source={PROJECT_LOGOS[link.logo]} style={styles.projectLogo} />
            <View style={styles.rowContent}>
              <Text style={[styles.rowLabel, { color: colors.text, fontSize: scale(14) }]}>
                {link.label}
              </Text>
              <Text style={[styles.rowHint, { color: colors.textMuted, fontSize: scale(11) }]}>
                {link.description}
              </Text>
            </View>
            <MaterialCommunityIcons name="open-in-new" size={14} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sobre */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Sobre</Text>

        {/* Ordem final definida pelo autor (2026-08-22): versão → contato
            → privacidade → ciclo → doação */}
        <View style={[styles.row, { borderBottomColor: colors.border }]}>
          <MaterialCommunityIcons name="book-open-variant" size={22} color={colors.accent} />
          <View style={styles.rowContent}>
            <Text style={[styles.rowLabel, { color: colors.text, fontSize: scale(15) }]}>
              Lecionário
            </Text>
            <Text style={[styles.rowHint, { color: colors.textMuted, fontSize: scale(12) }]}>
              Versão 1.0.0
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.row, { borderBottomColor: colors.border }]}
          onPress={() => Linking.openURL('mailto:lecionario@narniano.com')}
          accessibilityLabel="Enviar e-mail para lecionario@narniano.com"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="email-outline" size={22} color={colors.accent} />
          <View style={styles.rowContent}>
            <Text style={[styles.rowLabel, { color: colors.text, fontSize: scale(15) }]}>
              Contato
            </Text>
            <Text style={[styles.rowHint, { color: colors.textMuted, fontSize: scale(12) }]}>
              lecionario@narniano.com
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.row, { borderBottomColor: colors.border }]}
          onPress={() => Linking.openURL('https://lecionario.narniano.com/privacidade')}
          accessibilityLabel="Abrir Política de Privacidade no site"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="shield-lock-outline" size={22} color={colors.accent} />
          <View style={styles.rowContent}>
            <Text style={[styles.rowLabel, { color: colors.text, fontSize: scale(15) }]}>
              Privacidade
            </Text>
            <Text style={[styles.rowHint, { color: colors.textMuted, fontSize: scale(12) }]}>
              Política de privacidade e LGPD
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.row, { borderBottomColor: colors.border }]}>
          <MaterialCommunityIcons name="calendar-text" size={22} color="#4A8B4A" />
          <View style={styles.rowContent}>
            <Text style={[styles.rowLabel, { color: colors.text, fontSize: scale(15) }]}>
              Ciclo Litúrgico
            </Text>
            <Text style={[styles.rowHint, { color: colors.textMuted, fontSize: scale(12) }]}>
              Anos A, B, C — Lecionário Comum Revisado
            </Text>
          </View>
        </View>
        {/* Doação fase 1 (ROADMAP L): abre o modal temático; a cópia em
            si acontece lá dentro */}
        <TouchableOpacity
          style={[styles.row, { borderBottomColor: colors.border }]}
          onPress={() => {
            setPixCopied(false);
            setPixModalVisible(true);
          }}
          accessibilityLabel="Apoie o projeto com Pix — toca para copiar o código"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="heart-outline" size={22} color="#CC3333" />
          <View style={styles.rowContent}>
            <Text style={[styles.rowLabel, { color: colors.text, fontSize: scale(15) }]}>
              Apoie o projeto
            </Text>
            <Text style={[styles.rowHint, { color: colors.textMuted, fontSize: scale(12) }]}>
              Doe via Pix — toca para copiar o código
            </Text>
          </View>
          <MaterialCommunityIcons name="content-copy" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textMuted, fontSize: scale(11) }]}>
          Lecionário — Meditação diária na Palavra de Deus seguindo o Ano Litúrgico Cristão.
        </Text>
      </View>

      {/* Modal de doação temático (2026-08-22) — substitui o Alert nativo
          que destoava do visual do app (report do autor). Mesma linguagem
          dos cards: surface do tema, borda, radius 16, Lora */}
      <Modal
        visible={pixModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPixModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.pixBackdrop}
          activeOpacity={1}
          onPress={() => setPixModalVisible(false)}
          accessibilityLabel="Fechar"
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.pixCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={[styles.pixIconWrap, { borderColor: colors.border }]}>
              <MaterialCommunityIcons name="heart" size={26} color="#CC3333" />
            </View>
            <Text style={[styles.pixTitle, { color: colors.text, fontSize: scale(18) }]}>
              Apoie o projeto
            </Text>
            {!pixCopied ? (
              <>
                <Text style={[styles.pixBody, { color: colors.textMuted, fontSize: scale(13) }]}>
                  O Lecionário é gratuito, sem anúncios e sem cadastro. Se ele abençoa sua rotina de
                  oração, uma contribuição voluntária ajuda a manter tudo no ar.
                </Text>
                <View style={[styles.pixCodeBox, { borderColor: colors.border }]}>
                  <Text
                    numberOfLines={2}
                    style={[styles.pixCodeText, { color: colors.textMuted, fontSize: scale(10) }]}
                  >
                    {buildPixBrCode(PIX_CONFIG)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.pixPrimaryButton, { backgroundColor: colors.accent }]}
                  onPress={async () => {
                    await Clipboard.setStringAsync(buildPixBrCode(PIX_CONFIG));
                    setPixCopied(true);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Copiar código Pix copia e cola"
                >
                  <MaterialCommunityIcons name="content-copy" size={16} color="#FFFFFF" />
                  <Text style={[styles.pixPrimaryText, { fontSize: scale(14) }]}>
                    Copiar código Pix
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pixGhostButton}
                  onPress={() => setPixModalVisible(false)}
                  accessibilityRole="button"
                  accessibilityLabel="Fechar"
                >
                  <Text
                    style={[styles.pixGhostText, { color: colors.textMuted, fontSize: scale(13) }]}
                  >
                    Agora não
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <MaterialCommunityIcons name="check-circle" size={40} color="#4A8B4A" />
                <Text
                  style={[
                    styles.pixTitle,
                    { color: colors.text, fontSize: scale(16), marginTop: 8 },
                  ]}
                >
                  Código copiado!
                </Text>
                <Text style={[styles.pixBody, { color: colors.textMuted, fontSize: scale(13) }]}>
                  Abra o app do seu banco, escolha Pix → Copia e Cola e cole o código. Qualquer
                  valor ajuda. Deus abençoe sua generosidade! 🕯️
                </Text>
                <TouchableOpacity
                  style={[styles.pixPrimaryButton, { backgroundColor: colors.accent }]}
                  onPress={() => setPixModalVisible(false)}
                  accessibilityRole="button"
                  accessibilityLabel="Fechar"
                >
                  <Text style={[styles.pixPrimaryText, { fontSize: scale(14) }]}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
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
    gap: 10,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Lora_700Bold',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
    fontFamily: 'Lora_700Bold',
    marginBottom: 12,
    paddingLeft: 4,
  },
  projectLogo: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  bibliotecaIntro: {
    fontFamily: 'Lora_400Regular_Italic',
    marginBottom: 12,
    paddingLeft: 4,
    lineHeight: 18,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Lora_700Bold',
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionText: {
    fontWeight: '600',
    fontFamily: 'Lora_400Regular',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    minHeight: 56,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontFamily: 'Lora_400Regular',
  },
  rowHint: {
    fontFamily: 'Lora_400Regular',
    marginTop: 2,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  timePicker: {
    marginTop: 12,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
  },
  timePickerLabel: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    fontFamily: 'Lora_700Bold',
    marginBottom: 10,
  },
  timeExpandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    minHeight: 36,
  },
  timeExpandText: {
    fontFamily: 'Lora_600SemiBold_Italic',
  },
  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  timeButton: {
    flexGrow: 1,
    flexBasis: '18%',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  timeText: {
    fontWeight: '600',
    fontFamily: 'Lora_400Regular',
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: 'Lora_400Regular_Italic',
  },
  pixBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  pixCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 22,
    alignItems: 'center',
    gap: 12,
  },
  pixIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pixTitle: {
    fontFamily: 'Lora_700Bold',
    textAlign: 'center',
  },
  pixBody: {
    textAlign: 'center',
    lineHeight: 19,
    fontFamily: 'Lora_400Regular',
  },
  pixCodeBox: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pixCodeText: {
    fontFamily: 'Lora_400Regular',
    textAlign: 'center',
  },
  pixPrimaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'stretch',
    minHeight: 46,
    borderRadius: 23,
    marginTop: 4,
  },
  pixPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'Lora_700Bold',
  },
  pixGhostButton: {
    paddingVertical: 6,
    minHeight: 36,
    justifyContent: 'center',
  },
  pixGhostText: {
    fontFamily: 'Lora_400Regular',
  },
});
