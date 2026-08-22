import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { clearCache } from '@/lib/cache';
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

const TIME_OPTIONS = [
  { value: '06:00', label: '6h' },
  { value: '07:00', label: '7h' },
  { value: '08:00', label: '8h' },
  { value: '09:00', label: '9h' },
];

const BIBLIOTECA_LINKS: {
  label: string;
  description: string;
  url: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}[] = [
  {
    label: 'Narniano',
    description: 'Portal sobre C.S. Lewis, Nárnia e fé cristã',
    url: 'https://narniano.com',
    icon: 'crown',
  },
  {
    label: 'Bíblia na Arte',
    description: 'Obras de arte inspiradas nas Escrituras',
    url: 'https://biblianaarte.narniano.com',
    icon: 'palette-outline',
  },
  {
    label: 'Scriptorium Divinum',
    description: 'Clássicos da teologia cristã em português',
    url: 'https://scriptorium.narniano.com',
    icon: 'bookshelf',
  },
  {
    label: 'Gerador C.S. Lewis',
    description: 'Citações inspiradoras de C.S. Lewis',
    url: 'https://cslewis.narniano.com',
    icon: 'format-quote-close',
  },
];

export default function ConfigScreen() {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const { scale } = useFontScale();
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
  const [clearing, setClearing] = useState(false);

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
                ? `Ativado — às ${notificationTime.replace(':h', '')}`
                : 'Receba a leitura do dia toda manhã'}
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
              {TIME_OPTIONS.map((opt) => (
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
            </View>
          </View>
        )}
      </View>

      {/* Armazenamento */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Armazenamento</Text>
        <TouchableOpacity
          style={[styles.row, { borderBottomColor: colors.border }]}
          onPress={handleClearCache}
          disabled={clearing}
          accessibilityLabel="Limpar dados temporários"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="delete-outline" size={22} color={colors.destructive} />
          <View style={styles.rowContent}>
            <Text style={[styles.rowLabel, { color: colors.text, fontSize: scale(15) }]}>
              Limpar dados temporários
            </Text>
            <Text style={[styles.rowHint, { color: colors.textMuted, fontSize: scale(12) }]}>
              As leituras já vêm no app — isso só limpa um cache técnico
            </Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Sobre */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Sobre</Text>
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
        <View style={[styles.row, { borderBottomColor: colors.border }]}>
          <MaterialCommunityIcons name="information-outline" size={22} color={colors.textMuted} />
          <View style={styles.rowContent}>
            <Text style={[styles.rowLabel, { color: colors.text, fontSize: scale(15) }]}>
              Dados litúrgicos
            </Text>
            <Text style={[styles.rowHint, { color: colors.textMuted, fontSize: scale(12) }]}>
              Calculados localmente para 2025–2030
            </Text>
          </View>
        </View>
        {/* Contato oficial (P8, 2026-08-22): todo lugar que fala de
            contato aponta pra lecionario@narniano.com */}
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
            <MaterialCommunityIcons name={link.icon} size={20} color={colors.accent} />
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

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textMuted, fontSize: scale(11) }]}>
          Lecionário — Meditação diária na Palavra de Deus seguindo o Ano Litúrgico Cristão.
        </Text>
      </View>
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
    fontWeight: '700',
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
  timeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  timeButton: {
    flex: 1,
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
});
