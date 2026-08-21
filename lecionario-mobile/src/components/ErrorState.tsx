import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const colors = useThemeColors();
  const { scale } = useFontScale();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#CC3333" />
      <Text style={[styles.title, { color: colors.text, fontSize: scale(18) }]}>
        Algo deu errado
      </Text>
      <Text style={[styles.message, { color: colors.textMuted, fontSize: scale(14) }]}>
        {message || 'Ocorreu um erro inesperado. Tente novamente.'}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={[styles.button, { backgroundColor: colors.accent }]}
          accessibilityRole="button"
          accessibilityLabel="Tentar novamente"
        >
          <Text style={[styles.buttonText, { fontSize: scale(14) }]}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    minHeight: 200,
  },
  title: {
    fontFamily: 'Lora_700Bold',
    textAlign: 'center',
    marginTop: 16,
  },
  message: {
    fontFamily: 'Lora_400Regular',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  button: {
    marginTop: 24,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    minHeight: 48,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Lora_400Regular',
  },
});
