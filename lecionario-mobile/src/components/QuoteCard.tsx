import { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import quotes from '@/data/lewis-quotes.json';

const AFFILIATE_TAG = 'rilson-20';

function getDailyQuoteIndex(date: Date): number {
  const seed = parseInt(format(date, 'yyyyMMdd'), 10);
  return seed % quotes.length;
}

interface QuoteCardProps {
  date?: Date;
}

export function QuoteCard({ date }: QuoteCardProps) {
  const colors = useThemeColors();
  const { scale } = useFontScale();

  const quote = useMemo(() => {
    const idx = getDailyQuoteIndex(date ?? new Date());
    return quotes[idx];
  }, [date]);

  const amazonUrl = `https://www.amazon.com.br/s?k=${encodeURIComponent(quote.source)}&tag=${AFFILIATE_TAG}`;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <MaterialCommunityIcons name="format-quote-open" size={20} color={colors.accent} />
      <Text style={[styles.quote, { color: colors.text, fontSize: scale(15) }]}>
        {quote.quote}
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL(amazonUrl)}
        style={styles.sourceRow}
        accessibilityRole="link"
        accessibilityLabel={`Abrir ${quote.source} na Amazon`}
      >
        <Text style={[styles.source, { color: colors.accent, fontSize: scale(13) }]}>
          — {quote.source}
        </Text>
        <MaterialCommunityIcons name="open-in-new" size={12} color={colors.accent} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    gap: 10,
  },
  quote: {
    fontFamily: 'Lora_400Regular_Italic',
    lineHeight: 22,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-end',
  },
  source: {
    fontFamily: 'Lora_600SemiBold_Italic',
  },
});
