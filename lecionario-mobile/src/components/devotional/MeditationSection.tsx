import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { MeditationResource } from '@/types';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import { GlossaryTerm } from '@/components/GlossaryTerm';

interface MeditationSectionProps {
  meditation: MeditationResource;
}

export function MeditationSection({ meditation }: MeditationSectionProps) {
  const colors = useThemeColors();
  const { scale } = useFontScale();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={[styles.headerIcon, { backgroundColor: `${colors.accent}1A` }]}>
          <MaterialCommunityIcons name="lightbulb-outline" size={24} color={colors.accent} />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: colors.text, fontSize: scale(20) }]}>Meditação</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted, fontSize: scale(9) }]}>
            Reflexão e Interiorização
          </Text>
        </View>
        {meditation.duration && (
          <View
            style={[
              styles.durationBadge,
              { borderColor: `${colors.accent}33`, backgroundColor: `${colors.text}0D` },
            ]}
          >
            <MaterialCommunityIcons name="clock-outline" size={12} color={colors.accent} />
            <Text style={[styles.durationText, { color: colors.accent, fontSize: scale(9) }]}>
              {meditation.duration}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <View style={styles.promptContainer}>
          <Text style={[styles.promptText, { color: colors.text, fontSize: scale(15) }]} selectable>
            <Text
              style={[styles.capitular, { color: colors.mode === 'dark' ? '#F5F5F0' : '#4B2E39' }]}
            >
              {meditation.prompt.charAt(0)}
            </Text>
            {meditation.prompt.slice(1)}
          </Text>
        </View>

        {meditation.questions && meditation.questions.length > 0 && (
          <View style={[styles.questionsSection, { borderTopColor: `${colors.accent}1A` }]}>
            <View style={styles.questionsHeader}>
              <GlossaryTerm term="perguntas" size={14} />
              <Text
                style={[styles.questionsTitle, { color: colors.textMuted, fontSize: scale(9) }]}
              >
                Perguntas para Refletir
              </Text>
            </View>

            {meditation.questions.map((question, index) => (
              <View
                key={question}
                style={[
                  styles.questionCard,
                  {
                    backgroundColor: `${colors.text}0D`,
                    borderLeftColor: `${colors.accent}33`,
                  },
                ]}
              >
                <View
                  style={[
                    styles.questionNumber,
                    { backgroundColor: `${colors.text}0D`, borderColor: `${colors.accent}1A` },
                  ]}
                >
                  <Text
                    style={[
                      styles.questionNumberText,
                      { color: colors.textMuted, fontSize: scale(12) },
                    ]}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text style={[styles.questionText, { color: colors.text, fontSize: scale(12.5) }]}>
                  {question}
                </Text>
              </View>
            ))}
          </View>
        )}
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
    paddingBottom: 16,
    gap: 12,
    borderBottomWidth: 1,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: 'Lora_400Regular_Italic',
  },
  subtitle: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
    fontFamily: 'Lora_600SemiBold_Italic',
    marginTop: 2,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 4,
  },
  durationText: {
    fontWeight: '700',
    fontFamily: 'Lora_600SemiBold_Italic',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
  },
  promptContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  capitular: {
    fontSize: 34,
    // lineHeight explícito estabiliza a caixa da letra grande — sem ele a
    // ascendente invadia a borda do cabeçalho (report do autor, 2026-08-22)
    lineHeight: 36,
    fontWeight: '700',
    fontFamily: 'Lora_700Bold',
  },
  promptText: {
    lineHeight: 26,
    fontFamily: 'Lora_400Regular',
    textAlign: 'justify',
    paddingLeft: 8,
  },
  questionsSection: {
    borderTopWidth: 1,
    paddingTop: 20,
  },
  questionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  questionsTitle: {
    fontWeight: '700',
    fontFamily: 'Lora_600SemiBold_Italic',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  questionCard: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    borderRadius: 4,
    borderLeftWidth: 2,
    marginBottom: 10,
  },
  questionNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  questionNumberText: {
    fontFamily: 'Lora_400Regular_Italic',
  },
  questionText: {
    flex: 1,
    lineHeight: 21,
    fontFamily: 'Lora_400Regular',
    paddingTop: 4,
  },
});
