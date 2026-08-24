import { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import quotes from '@/data/lewis-quotes.json';

const AFFILIATE_TAG = 'rilson-20';

export interface DailyQuote {
  quote: string;
  source: string;
  author: string;
  scriptoriumUrl?: string | null;
}

export function getDailyQuote(date: Date): DailyQuote {
  const seed = parseInt(format(date, 'yyyyMMdd'), 10);
  const raw = quotes[seed % quotes.length] as Partial<DailyQuote>;
  return {
    quote: raw.quote || '',
    source: raw.source || '',
    author: raw.author || 'C. S. Lewis',
    scriptoriumUrl: raw.scriptoriumUrl || null,
  };
}

interface QuoteCardProps {
  date?: Date;
}

export function QuoteCard({ date }: QuoteCardProps) {
  const colors = useThemeColors();
  const { scale } = useFontScale();
  const [copied, setCopied] = useState(false);

  const quote = useMemo(() => {
    return getDailyQuote(date ?? new Date());
  }, [date]);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(
      `"${quote.quote}"\n\n— ${quote.source}, ${quote.author}\n\n— Lecionário · lecionario.narniano.com`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const amazonUrl = `https://www.amazon.com.br/s?k=${encodeURIComponent(`${quote.source} ${quote.author}`)}&tag=${AFFILIATE_TAG}`;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.topRow}>
        <MaterialCommunityIcons name="format-quote-open" size={20} color={colors.accent} />
        <TouchableOpacity
          onPress={handleCopy}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel={copied ? 'Citação copiada' : 'Copiar citação'}
          accessibilityRole="button"
        >
          <MaterialCommunityIcons
            name={copied ? 'check' : 'content-copy'}
            size={16}
            color={copied ? '#4A8B4A' : colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.quote, { color: colors.text, fontSize: scale(15) }]}>{quote.quote}</Text>

      <View style={styles.actionsRow}>
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

        {quote.scriptoriumUrl && (
          <TouchableOpacity
            onPress={() => Linking.openURL(quote.scriptoriumUrl!)}
            style={[
              styles.scriptoriumPill,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            accessibilityRole="link"
            accessibilityLabel={`Ler ${quote.source} completo`}
          >
            <Text style={[styles.scriptoriumText, { color: colors.accent, fontSize: scale(11) }]}>
              Ler livro completo
            </Text>
            <MaterialCommunityIcons name="open-in-new" size={11} color={colors.accent} />
          </TouchableOpacity>
        )}
      </View>
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quote: {
    fontFamily: 'Lora_400Regular_Italic',
    lineHeight: 22,
  },
  actionsRow: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  source: {
    fontFamily: 'Lora_600SemiBold_Italic',
  },
  scriptoriumPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  scriptoriumText: {
    fontFamily: 'Lora_600SemiBold_Italic',
  },
});
