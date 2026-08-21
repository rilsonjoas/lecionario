import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { Reading } from '@/types';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';

interface ReadingCardProps {
  reading: Reading;
  index: number;
}

const readingTypeConfig: Record<
  string,
  { label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap; color: string }
> = {
  first_reading: { label: 'Primeira Leitura', icon: 'book-open-variant', color: '#8B6914' },
  psalm: { label: 'Salmo', icon: 'music-note-outline', color: '#4A2C6D' },
  second_reading: { label: 'Segunda Leitura', icon: 'script-text-outline', color: '#6B3A3A' },
  gospel: { label: 'Evangelho', icon: 'cross', color: '#8F6608' },
};

export function ReadingCard({ reading, index }: ReadingCardProps) {
  const colors = useThemeColors();
  const { scale } = useFontScale();
  const config = readingTypeConfig[reading.type] || readingTypeConfig.first_reading;

  const handleShare = async () => {
    const lines = [`${config.label} — ${reading.reference}`];
    if (reading.text) lines.push('', reading.text);
    lines.push('', '— Lecionário');
    await Share.share({ message: lines.join('\n') });
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
            <TouchableOpacity
              onPress={handleShare}
              style={styles.shareButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel={`Compartilhar ${config.label} ${reading.reference}`}
              accessibilityRole="button"
            >
              <MaterialCommunityIcons name="share-outline" size={18} color={colors.accent} />
            </TouchableOpacity>
            <View
              style={[
                styles.badge,
                { backgroundColor: `${colors.accent}1A`, borderColor: `${colors.accent}33` },
              ]}
            >
              <MaterialCommunityIcons name={config.icon} size={12} color={config.color} />
              <Text style={[styles.badgeText, { color: config.color, fontSize: scale(9) }]}>
                {config.label}
              </Text>
            </View>
          </View>
        </View>
        {reading.text && (
          <View style={styles.textContainer}>
            <View style={[styles.textBorder, { backgroundColor: `${colors.accent}33` }]} />
            <Text style={[styles.text, { color: colors.text, fontSize: scale(14) }]} selectable>
              {reading.text}
            </Text>
          </View>
        )}
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
  shareButton: {
    padding: 4,
    minWidth: 32,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
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
