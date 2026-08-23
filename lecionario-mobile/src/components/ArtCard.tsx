import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import { fetchArtworkForReferences, type Artwork } from '@/lib/artwork-fetcher';

// As imagens do Bíblia na Arte moram no domínio do site (Next.js, pasta
// `public/images`), não no da API — a API só devolve o caminho relativo
// (ex.: "/images/foo.webp"). Prefixar com o domínio da API dava 404 puro.
const BIBLE_ART_WEB_BASE = 'https://biblianaarte.narniano.com';

interface Props {
  // Referências das leituras do dia, na ordem em que aparecem (1ª leitura,
  // salmo, epístola, evangelho) — tenta cada uma até achar uma pintura.
  references: string[];
}

function formatReference(ref: { book: string; chapter: number; verses: string | null }): string {
  return ref.verses ? `${ref.book} ${ref.chapter}:${ref.verses}` : `${ref.book} ${ref.chapter}`;
}

export function ArtCard({ references }: Props) {
  const colors = useThemeColors();
  const { scale } = useFontScale();
  const [artwork, setArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchArtworkForReferences(references, ctrl.signal)
      .then(setArtwork)
      .catch(() => {});
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refs mudam de conteúdo, não de identidade, junto com a data
  }, [references.join('|')]);

  if (!artwork) return null;

  const imageUrl = artwork.imageUrl ? `${BIBLE_ART_WEB_BASE}${artwork.imageUrl}` : null;
  // A obra específica, não a home — é lá que tem os detalhes (comentário,
  // outras referências, licença), achado do Rilson (2026-08-23).
  const artworkUrl = `${BIBLE_ART_WEB_BASE}/obra/${artwork.id}`;
  const relatedPassages = artwork.references.map(formatReference).join(' · ');

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />}
      <Text style={[styles.title, { color: colors.text, fontSize: scale(15) }]} numberOfLines={2}>
        {artwork.title}
        {artwork.year ? ` (${artwork.year})` : ''}
      </Text>
      <Text
        style={[styles.artist, { color: colors.textMuted, fontSize: scale(13) }]}
        numberOfLines={1}
      >
        {artwork.artistOrDirector}
      </Text>
      {relatedPassages.length > 0 && (
        <Text
          style={[styles.related, { color: colors.textMuted, fontSize: scale(11) }]}
          numberOfLines={2}
        >
          Relacionada a {relatedPassages}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => Linking.openURL(artworkUrl)}
        style={styles.sourceRow}
        accessibilityRole="link"
        accessibilityLabel={`Ver ${artwork.title} no Bíblia na Arte`}
      >
        <Text style={[styles.source, { color: colors.accent, fontSize: scale(13) }]}>
          — Ver obra
        </Text>
        <MaterialCommunityIcons name="open-in-new" size={12} color={colors.accent} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Lora_700Bold',
  },
  artist: {
    fontFamily: 'Lora_400Regular_Italic',
  },
  related: {
    fontFamily: 'Lora_400Regular',
    fontStyle: 'italic',
    marginTop: 2,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  source: {
    fontFamily: 'Lora_600SemiBold_Italic',
  },
});
