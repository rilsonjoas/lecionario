import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import type { DailyPrayer } from '@/types';
import { useFontScale } from '@/contexts/FontContext';
import { GlossaryTerm } from '@/components/GlossaryTerm';

interface PrayerSectionProps {
  prayer: DailyPrayer;
}

export function PrayerSection({ prayer }: PrayerSectionProps) {
  const [copied, setCopied] = useState(false);
  const { scale } = useFontScale();

  const handleCopy = async () => {
    const lines = [`${prayer.title}`, '', prayer.text];
    if (prayer.author || prayer.source) {
      lines.push('', `— ${[prayer.author, prayer.source].filter(Boolean).join(' • ')}`);
    }
    await Clipboard.setStringAsync(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.iconRow}>
          <View style={styles.line} />
          <View style={styles.iconGlow}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="candle" size={28} color="#F5F5F0" />
            </View>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { fontSize: scale(26) }]}>Oração do Dia</Text>
          <GlossaryTerm term="oracaoDia" size={16} />
        </View>
        <Text style={[styles.subtitle, { fontSize: scale(9) }]}>{prayer.title}</Text>
      </View>

      <View style={styles.bodySection}>
        <Text style={[styles.prayerText, { fontSize: scale(15) }]} selectable>
          {prayer.text}
        </Text>

        <TouchableOpacity
          onPress={handleCopy}
          style={styles.copyButton}
          hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
          accessibilityLabel={copied ? 'Oração copiada' : 'Copiar oração'}
          accessibilityRole="button"
        >
          <MaterialCommunityIcons
            name={copied ? 'check' : 'content-copy'}
            size={16}
            color={copied ? '#7ED17E' : '#EDDFB8'}
          />
          <Text style={[styles.copyText, copied && styles.copyTextDone, { fontSize: scale(10) }]}>
            {copied ? 'Copiado!' : 'Copiar'}
          </Text>
        </TouchableOpacity>

        {(prayer.author || prayer.source) && (
          <View style={styles.sourceRow}>
            <View style={styles.sourceLine} />
            <Text style={[styles.sourceText, { fontSize: scale(8) }]}>
              {prayer.author}
              {prayer.author && prayer.source ? ' • ' : ''}
              {prayer.source}
            </Text>
            <View style={styles.sourceLine} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6B3A3A',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  headerSection: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(184,134,11,0.2)',
    paddingBottom: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  line: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(184,134,11,0.3)',
  },
  iconGlow: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(212,160,23,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#F5F5F0',
    fontFamily: 'Lora_400Regular',
    textAlign: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  subtitle: {
    color: '#EDDFB8',
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '700',
    fontFamily: 'Lora_600SemiBold_Italic',
    marginTop: 8,
  },
  bodySection: {
    padding: 20,
    paddingTop: 28,
  },
  prayerText: {
    lineHeight: 26,
    color: '#F5F5F0',
    fontFamily: 'Lora_400Regular_Italic',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
    paddingVertical: 8,
    minHeight: 36,
  },
  copyText: {
    color: '#EDDFB8',
    fontWeight: '600',
    fontFamily: 'Lora_600SemiBold_Italic',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  copyTextDone: {
    color: '#7ED17E',
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    gap: 12,
  },
  sourceLine: {
    width: 30,
    height: 1,
    backgroundColor: 'rgba(184,134,11,0.2)',
  },
  sourceText: {
    color: '#EDDFB8',
    fontWeight: '700',
    fontFamily: 'Lora_600SemiBold_Italic',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
});
