import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';

interface EmptyStateProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  const colors = useThemeColors();
  const { scale } = useFontScale();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={48} color={colors.textMuted} />
      <Text style={[styles.title, { color: colors.text, fontSize: scale(18) }]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.textMuted, fontSize: scale(14) }]}>
          {subtitle}
        </Text>
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
  subtitle: {
    fontFamily: 'Lora_400Regular',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
