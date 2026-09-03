import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColors } from '@/contexts/ThemeContext';
import { useFontScale } from '@/contexts/FontContext';
import { fetchDailyArtwork, type Artwork } from '@/lib/artwork-fetcher';

// As imagens do Bíblia na Arte moram no domínio do site (Next.js, pasta
// `public/images`), não no da API — a API só devolve o caminho relativo
// (ex.: "/images/foo.webp"). Prefixar com o domínio da API dava 404 puro.
const BIBLE_ART_WEB_BASE = 'https://biblianaarte.narniano.com';

interface Props {
  date?: Date | string;
}

function formatReference(ref: { book: string; chapter: number; verses: string | null }): string {
  return ref.verses ? `${ref.book} ${ref.chapter}:${ref.verses}` : `${ref.book} ${ref.chapter}`;
}

export function ArtCard({ date }: Props) {
  const colors = useThemeColors();
  const { scale } = useFontScale();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  // Achado do Rilson (ROADMAP 2026-09-02): imagem sumia em alguns dias
  // sem motivo de dado (obra e imageUrl vinham certos da API) — sem
  // callback de erro no `Image`, uma falha transitória de rede deixava
  // o card sem imagem pra sempre. `imageFailed` guarda esse estado só
  // depois de 1 retry.
  const [imageFailed, setImageFailed] = useState(false);
  const [imageAttempt, setImageAttempt] = useState(0);

  const dateStr = date
    ? typeof date === 'string'
      ? date.split('T')[0]
      : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
          date.getDate(),
        ).padStart(2, '0')}`
    : '';

  useEffect(() => {
    const ctrl = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- limpa pintura anterior ao trocar de data
    setArtwork(null);
    setAspectRatio(null);
    setImageFailed(false);
    setImageAttempt(0);
    fetchDailyArtwork(date, ctrl.signal).then((art) => {
      if (ctrl.signal.aborted) return;
      setArtwork(art);
      if (art?.imageUrl) {
        Image.getSize(
          `${BIBLE_ART_WEB_BASE}${art.imageUrl}`,
          (w, h) => {
            if (!ctrl.signal.aborted && w > 0 && h > 0) {
              setAspectRatio(w / h);
            }
          },
          () => {},
        );
      } else {
        setAspectRatio(null);
      }
    });
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- data controlada pela dependência explícita
  }, [dateStr]);

  if (!artwork) return null;

  const imageUrl =
    artwork.imageUrl && !imageFailed ? `${BIBLE_ART_WEB_BASE}${artwork.imageUrl}` : null;

  // A obra específica, não a home — é lá que tem os detalhes (comentário,
  // outras referências, licença), achado do Rilson (2026-08-23).
  const artworkUrl = `${BIBLE_ART_WEB_BASE}/obra/${artwork.id}`;
  const relatedPassages = artwork.references.map(formatReference).join(' · ');

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {imageUrl && (
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor:
                colors.mode === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.04)',
            },
          ]}
        >
          <Image
            key={imageAttempt}
            source={{ uri: imageUrl }}
            style={[styles.image, aspectRatio ? { aspectRatio } : { height: 220 }]}
            resizeMode="contain"
            onError={() => {
              // 1 retry (rede instável costuma ser transitória); se
              // falhar de novo, some com a mesma graça de sempre em vez
              // de deixar o card sem imagem pra sempre.
              if (imageAttempt === 0) setImageAttempt(1);
              else setImageFailed(true);
            }}
          />
        </View>
      )}
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
  imageContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    borderRadius: 8,
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
