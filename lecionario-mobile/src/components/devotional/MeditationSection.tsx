import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { MeditationResource } from '@/types';

interface MeditationSectionProps {
  meditation: MeditationResource;
}

export function MeditationSection({ meditation }: MeditationSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#B8860B" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Meditação</Text>
          <Text style={styles.subtitle}>Reflexão e Interiorização</Text>
        </View>
        {meditation.duration && (
          <View style={styles.durationBadge}>
            <MaterialCommunityIcons name="clock-outline" size={12} color="#8B6914" />
            <Text style={styles.durationText}>{meditation.duration}</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        {/* Capitular iluminada — Design Narniano, aproximação nativa (RN
            não tem float/::first-letter; a letra maior fica inline, sem
            o texto envolver de verdade em várias linhas como no web).
            Substitui a aspas decorativa (quoteMark), que era só ~2:1 de
            contraste — cor real do texto não muda esse achado, era um
            elemento puramente ilegível de propósito, então trocado por
            algo que cumpre a mesma função melhor. */}
        <View style={styles.promptContainer}>
          <Text style={styles.promptText} selectable>
            <Text style={styles.capitular}>{meditation.prompt.charAt(0)}</Text>
            {meditation.prompt.slice(1)}
          </Text>
        </View>

        {meditation.questions && meditation.questions.length > 0 && (
          <View style={styles.questionsSection}>
            <View style={styles.questionsHeader}>
              <MaterialCommunityIcons name="help-circle-outline" size={14} color="#8F6608" />
              <Text style={styles.questionsTitle}>Questões para Silenciar</Text>
            </View>

            {meditation.questions.map((question, index) => (
              <View key={question} style={styles.questionCard}>
                <View style={styles.questionNumber}>
                  <Text style={styles.questionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.questionText}>{question}</Text>
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
    backgroundColor: '#fff',
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
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: 'rgba(184,134,11,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontFamily: 'Lora_400Regular_Italic',
  },
  subtitle: {
    fontSize: 10,
    color: '#999',
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
    borderColor: 'rgba(139,105,20,0.2)',
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  durationText: {
    fontSize: 9,
    fontWeight: '700',
    fontFamily: 'Lora_600SemiBold_Italic',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#8B6914',
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  promptContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  capitular: {
    fontSize: 34,
    fontWeight: '700',
    color: '#4B2E39', // --vinho — 9.22:1 sobre fundo branco, WCAG AA
    fontFamily: 'Lora_700Bold',
  },
  promptText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#444',
    fontFamily: 'Lora_400Regular',
    textAlign: 'justify',
    paddingLeft: 8,
  },
  questionsSection: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(139,105,20,0.1)',
    paddingTop: 20,
  },
  questionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  questionsTitle: {
    fontSize: 10,
    color: '#999',
    fontWeight: '700',
    fontFamily: 'Lora_600SemiBold_Italic',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  questionCard: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    backgroundColor: 'rgba(245,245,240,0.5)',
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(139,105,20,0.2)',
    marginBottom: 10,
  },
  questionNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(107,58,58,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139,105,20,0.1)',
  },
  questionNumberText: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'Lora_400Regular_Italic',
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    color: '#555',
    fontFamily: 'Lora_400Regular',
    paddingTop: 4,
  },
});
