import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import { fetchArtworkForReference, type Artwork } from '@/lib/artwork-fetcher';

const BIBLE_ART_BASE = 'https://biblianaarte.narniano.com';

interface Props {
  reference: string;
}

export function ArtCard({ reference }: Props) {
  const colors = useThemeColors();
  const { scale } = useFontScale();
  const [artwork, setArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchArtworkForReference(reference, ctrl.signal)
      .then(setArtwork)
      .catch(() => {});
    return () => ctrl.abort();
  }, [reference]);

  if (!artwork) return null;

  const imageUrl = artwork.imageUrl ? `${API_BASE}${artwork.imageUrl}` : null;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="palette-outline" size={18} color={colors.accent} />
        <Text style={[styles.label, { color: colors.textMuted, fontSize: scale(11) }]}>
          Pintura do Dia
        </Text>
      </View>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />}
      <Text style={[styles.title, { color: colors.text, fontSize: scale(14) }]} numberOfLines={2}>
        {artwork.title}
        {artwork.year ? ` (${artwork.year})` : ''}
      </Text>
      <Text
        style={[styles.artist, { color: colors.textMuted, fontSize: scale(12) }]}
        numberOfLines={1}
      >
        {artwork.artistOrDirector}
      </Text>
      <TouchableOpacity
        style={[styles.link, { borderColor: colors.accent }]}
        onPress={() => Linking.openURL(BIBLE_ART_BASE)}
        accessibilityRole="link"
        accessibilityLabel="Ver no Bíblia na Arte"
      >
        <Text style={[styles.linkText, { color: colors.accent, fontSize: scale(12) }]}>
          Ver mais no Bíblia na Arte
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const API_BASE = 'https://api-biblianaarte.narniano.com';

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 0.5,
    padding: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  label: {
    fontFamily: 'Lora_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Lora_700Bold',
    marginBottom: 2,
  },
  artist: {
    fontFamily: 'Lora_400Regular_Italic',
    marginBottom: 8,
  },
  link: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  linkText: {
    fontFamily: 'Lora_600SemiBold',
  },
});
