import { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import { GLOSSARY, type GlossaryTermKey } from '@/lib/glossary';

interface GlossaryTermProps {
  term: GlossaryTermKey;
  size?: number;
}

// ⓘ tocável que abre mini-modal com a definição do termo litúrgico —
// mesma linguagem visual do modal de doação (surface, borda, Lora).
export function GlossaryTerm({ term, size = 14 }: GlossaryTermProps) {
  const [visible, setVisible] = useState(false);
  const colors = useThemeColors();
  const { scale } = useFontScale();
  const entry = GLOSSARY[term];

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel={`O que significa ${entry.term}?`}
        accessibilityRole="button"
      >
        <MaterialCommunityIcons name="help-circle-outline" size={size} color={colors.textMuted} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setVisible(false)}
          accessibilityLabel="Fechar"
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <MaterialCommunityIcons name="book-open-variant" size={22} color={colors.accent} />
            <Text style={[styles.title, { color: colors.text, fontSize: scale(16) }]}>
              {entry.term}
            </Text>
            <Text style={[styles.definition, { color: colors.textMuted, fontSize: scale(13) }]}>
              {entry.definition}
            </Text>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.accent }]}
              onPress={() => setVisible(false)}
              accessibilityRole="button"
              accessibilityLabel="Fechar"
            >
              <Text style={styles.closeText}>Entendi</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 22,
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: 'Lora_700Bold',
    textAlign: 'center',
  },
  definition: {
    textAlign: 'center',
    lineHeight: 19,
    fontFamily: 'Lora_400Regular',
  },
  closeButton: {
    alignSelf: 'stretch',
    minHeight: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  closeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'Lora_700Bold',
    fontSize: 14,
  },
});
