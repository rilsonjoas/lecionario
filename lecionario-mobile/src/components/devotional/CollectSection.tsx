import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CollectSectionProps {
  collect: string;
}

export function CollectSection({ collect }: CollectSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="crown" size={28} color="#B8860B" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Oração de Coleta</Text>
          <Text style={styles.subtitle}>Oração Tradicional da Liturgia</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.collectBox}>
          <Text style={styles.collectText} selectable>
            {collect}
          </Text>
          <View style={styles.amenSection}>
            <View style={styles.amenLine} />
            <Text style={styles.amenText}>Por Jesus Cristo, nosso Senhor. Amém.</Text>
          </View>
        </View>
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
    paddingBottom: 12,
    gap: 14,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(184,134,11,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'Lora_400Regular_Italic',
  },
  subtitle: {
    fontSize: 9,
    color: '#999',
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
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: 'rgba(139,105,20,0.2)',
  },
  collectText: {
    // Achado real 2026-08-16: 18px deixava poucas palavras por linha
    // numa tela de celular, leitura "picotada"
    fontSize: 16,
    lineHeight: 26,
    color: '#444',
    fontFamily: 'Lora_400Regular_Italic',
  },
  amenSection: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(139,105,20,0.1)',
    marginTop: 24,
    paddingTop: 16,
  },
  amenLine: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 1,
    backgroundColor: 'rgba(139,105,20,0.2)',
  },
  amenText: {
    fontSize: 10,
    color: '#8F6608', // achado 2026-08-15: gold a 60% de opacidade sobre
    // fundo claro reprovava WCAG AA; sólido dá 5.16:1
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '700',
    textAlign: 'right',
    fontFamily: 'Lora_600SemiBold_Italic',
  },
});
