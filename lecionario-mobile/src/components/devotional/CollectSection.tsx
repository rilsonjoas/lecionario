import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import { GlossaryTerm } from '@/components/GlossaryTerm';

interface CollectSectionProps {
  collect: string;
}

export function CollectSection({ collect }: CollectSectionProps) {
  const colors = useThemeColors();
  const { scale } = useFontScale();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${colors.accent}1A` }]}>
          <MaterialCommunityIcons name="crown" size={28} color={colors.accent} />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: colors.text, fontSize: scale(18) }]}>
            Oração de Coleta
          </Text>
          <View style={styles.subtitleRow}>
            <Text style={[styles.subtitle, { color: colors.textMuted, fontSize: scale(8) }]}>
              Oração Tradicional da Liturgia
            </Text>
            <GlossaryTerm term="coleta" size={12} />
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View
          style={[
            styles.collectBox,
            {
              backgroundColor: `${colors.text}08`,
              borderLeftColor: `${colors.accent}33`,
            },
          ]}
        >
          <Text
            style={[styles.collectText, { color: colors.text, fontSize: scale(15) }]}
            selectable
          >
            {collect}
          </Text>
          <View style={[styles.amenSection, { borderTopColor: `${colors.accent}1A` }]}>
            <View style={[styles.amenLine, { backgroundColor: `${colors.accent}33` }]} />
            <Text style={[styles.amenText, { fontSize: scale(9) }]}>
              Por Jesus Cristo, nosso Senhor. Amém.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 12,
    gap: 14,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: 'Lora_400Regular_Italic',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  subtitle: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
    fontFamily: 'Lora_600SemiBold_Italic',
    marginTop: 2,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  collectBox: {
    padding: 20,
    borderLeftWidth: 4,
  },
  collectText: {
    lineHeight: 26,
    fontFamily: 'Lora_400Regular_Italic',
  },
  amenSection: {
    borderTopWidth: 1,
    marginTop: 24,
    paddingTop: 16,
  },
  amenLine: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 1,
  },
  amenText: {
    color: '#8F6608',
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '700',
    textAlign: 'right',
    fontFamily: 'Lora_600SemiBold_Italic',
  },
});
