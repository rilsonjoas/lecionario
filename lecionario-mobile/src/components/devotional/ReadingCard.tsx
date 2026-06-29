import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { Reading } from '@/types';

interface ReadingCardProps {
  reading: Reading;
  index: number;
}

const readingTypeConfig: Record<string, { label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap; color: string }> = {
  first_reading: { label: 'Primeira Leitura', icon: 'book-open-variant', color: '#8B6914' },
  psalm: { label: 'Salmo', icon: 'heart', color: '#4A2C6D' },
  second_reading: { label: 'Segunda Leitura', icon: 'script-text-outline', color: '#6B3A3A' },
  gospel: { label: 'Evangelho', icon: 'star', color: '#B8860B' },
};

export function ReadingCard({ reading, index }: ReadingCardProps) {
  const config = readingTypeConfig[reading.type] || readingTypeConfig.first_reading;

  return (
    <View style={[styles.card, { marginTop: index > 0 ? 16 : 0 }]}>
      <View style={styles.accentBar} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.referenceContainer}>
            <Text style={styles.reference}>{reading.reference}</Text>
            {reading.citation && (
              <Text style={styles.citation}>{reading.citation}</Text>
            )}
          </View>
          <View style={styles.badge}>
            <MaterialCommunityIcons name={config.icon} size={12} color={config.color} />
            <Text style={[styles.badgeText, { color: config.color }]}>{config.label}</Text>
          </View>
        </View>
        {reading.text && (
          <View style={styles.textContainer}>
            <View style={styles.textBorder} />
            <Text style={styles.text}>{reading.text}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
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
    backgroundColor: '#8B6914',
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
  reference: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'serif',
    fontStyle: 'italic',
  },
  citation: {
    fontSize: 10,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(139,105,20,0.1)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(139,105,20,0.2)',
  },
  badgeText: {
    fontSize: 9,
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
    backgroundColor: 'rgba(139,105,20,0.2)',
    marginRight: 14,
    borderRadius: 1,
  },
  text: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
    fontFamily: 'serif',
    paddingLeft: 2,
  },
});
