import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import type { DailyPrayer } from '@/types';

interface PrayerSectionProps {
  prayer: DailyPrayer;
}

export function PrayerSection({ prayer }: PrayerSectionProps) {
  const [copied, setCopied] = useState(false);

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
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="candle" size={28} color="#F5F5F0" />
          </View>
          <View style={styles.line} />
        </View>
        <Text style={styles.title}>Oração do Dia</Text>
        <Text style={styles.subtitle}>{prayer.title}</Text>
      </View>

      <View style={styles.bodySection}>
        <Text style={styles.prayerText}>{prayer.text}</Text>

        <TouchableOpacity
          onPress={handleCopy}
          style={styles.copyButton}
          accessibilityLabel={copied ? 'Oração copiada' : 'Copiar oração'}
          accessibilityRole="button"
        >
          <MaterialCommunityIcons
            name={copied ? 'check' : 'content-copy'}
            size={16}
            color={copied ? '#4A8B4A' : 'rgba(184,134,11,0.6)'}
          />
          <Text style={[styles.copyText, copied && styles.copyTextDone]}>
            {copied ? 'Copiado!' : 'Copiar'}
          </Text>
        </TouchableOpacity>

        {(prayer.author || prayer.source) && (
          <View style={styles.sourceRow}>
            <View style={styles.sourceLine} />
            <Text style={styles.sourceText}>
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
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#F5F5F0',
    fontFamily: 'Lora_400Regular',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    color: '#B8860B',
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '700',
    marginTop: 8,
  },
  bodySection: {
    padding: 20,
    paddingTop: 28,
  },
  prayerText: {
    fontSize: 18,
    lineHeight: 30,
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
    fontSize: 11,
    color: 'rgba(184,134,11,0.6)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  copyTextDone: {
    color: '#4A8B4A',
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
    fontSize: 9,
    color: 'rgba(184,134,11,0.6)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
});
