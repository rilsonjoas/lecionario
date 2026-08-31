import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import type { LiturgicalSeason, Reading } from '@/types';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import { getBadgeColors } from '@/lib/theme';

interface ReadingCardProps {
  reading: Reading;
  index: number;
  season: LiturgicalSeason;
}

// 5.3 (2026-08-30): na liturgia o Salmo é a resposta da congregação à
// primeira leitura — rótulo "Salmo Responsorial" alinhado ao web (e aos
// "Estações da Palavra" / "Oração de Coleta"), mais ornamento de resposta
// abaixo.
const readingTypeConfig: Record<
  string,
  { label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }
> = {
  first_reading: { label: 'Primeira Leitura', icon: 'book-open-variant' },
  psalm: { label: 'Salmo Responsorial', icon: 'music-note-outline' },
  second_reading: { label: 'Segunda Leitura', icon: 'script-text-outline' },
  gospel: { label: 'Evangelho', icon: 'cross' },
};

export function ReadingCard({ reading, index, season }: ReadingCardProps) {
  const colors = useThemeColors();
  const { scale } = useFontScale();
  const [copied, setCopied] = useState(false);
  const config = readingTypeConfig[reading.type] || readingTypeConfig.first_reading;
  // Tags ilegíveis em Tempo Comum (relato 2026-08-21): fundo agora é a cor
  // primária sólida da estação com foreground adaptativo — branco/creme nas
  // estações escuras, preto quente nas claras. Contraste WCAG AA (≥4.5:1)
  // verificado nas 7 estações; mesmo padrão do web
  // (--liturgical-primary-foreground).
  const badge = getBadgeColors(season);

  // 5.3 (2026-08-30): o Salmo é a resposta da congregação à primeira
  // leitura — tratamento próprio, idêntico ao web.
  const isPsalmResponse = reading.type === 'psalm';

  const handleCopy = async () => {
    const lines = [`${config.label} — ${reading.reference}`];
    if (reading.text) lines.push('', reading.text);
    lines.push('', '— Lecionário');
    await Clipboard.setStringAsync(
      lines.join('\n') + '\n\n\u2014 Lecion\u00e1rio \u00b7 lecionario.narniano.com',
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={[styles.card, { marginTop: index > 0 ? 16 : 0, backgroundColor: colors.card }]}>
      <View style={[styles.accentBar, { backgroundColor: colors.accent }]} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.referenceContainer}>
            <Text style={[styles.reference, { color: colors.text, fontSize: scale(18) }]}>
              {reading.reference}
            </Text>
            {reading.citation && (
              <Text style={[styles.citation, { color: colors.textMuted, fontSize: scale(9) }]}>
                {reading.citation}
              </Text>
            )}
          </View>
          <View style={styles.rightActions}>
            <View style={[styles.badge, { backgroundColor: badge.bg, borderColor: badge.bg }]}>
              <MaterialCommunityIcons name={config.icon} size={12} color={badge.fg} />
              <Text style={[styles.badgeText, { color: badge.fg, fontSize: scale(9) }]}>
                {config.label}
              </Text>
            </View>
          </View>
        </View>
        {isPsalmResponse && reading.text && (
          <View style={styles.psalmOrnament} importantForAccessibility="no-hide-descendants">
            <View style={[styles.psalmRule, { backgroundColor: `${colors.accent}33` }]} />
            <MaterialCommunityIcons name="music-note" size={14} color={`${colors.accent}AA`} />
            <View style={[styles.psalmRule, { backgroundColor: `${colors.accent}33` }]} />
          </View>
        )}
        {reading.text && (
          <View style={styles.textContainer}>
            <View style={[styles.textBorder, { backgroundColor: `${colors.accent}33` }]} />
            <Text style={[styles.text, { color: colors.text, fontSize: scale(14) }]} selectable>
              {reading.text}
            </Text>
          </View>
        )}
        {/* Ação única por card, canto inferior direito (backlog 2026-08-22:
            reduzir shares duplicados — o share do card duplicava o da
            actionsRow; agora é cópia direta pra área de transferência) */}
        <TouchableOpacity
          onPress={handleCopy}
          style={styles.copyButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel={
            copied ? 'Leitura copiada' : `Copiar ${config.label} ${reading.reference}`
          }
          accessibilityRole="button"
        >
          <MaterialCommunityIcons
            name={copied ? 'check' : 'content-copy'}
            size={14}
            color={copied ? '#7ED17E' : colors.textMuted}
          />
          <Text
            style={[
              styles.copyButtonText,
              { color: copied ? '#7ED17E' : colors.textMuted, fontSize: scale(10) },
            ]}
          >
            {copied ? 'Copiado!' : 'Copiar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  accentBar: {
    height: 3,
    opacity: 0.6,
  },
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  referenceContainer: {
    flex: 1,
    marginRight: 12,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  copyButtonText: {
    fontWeight: '600',
    fontFamily: 'Lora_600SemiBold_Italic',
  },
  reference: {
    fontWeight: '600',
    fontFamily: 'Lora_600SemiBold_Italic',
  },
  citation: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: 'Lora_600SemiBold_Italic',
    marginTop: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
  },
  badgeText: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  textContainer: {
    flexDirection: 'row',
    paddingTop: 12,
  },
  psalmOrnament: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 2,
    marginBottom: 10,
  },
  psalmRule: {
    width: 36,
    height: 1,
  },
  textBorder: {
    width: 2,
    marginRight: 14,
    borderRadius: 1,
  },
  text: {
    flex: 1,
    lineHeight: 24,
    fontFamily: 'Lora_400Regular',
    paddingLeft: 2,
  },
});
