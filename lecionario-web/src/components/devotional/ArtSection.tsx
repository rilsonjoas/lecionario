'use client';

import { useEffect, useState } from 'react';
import {
  fetchArtworkForReferences,
  type Artwork,
  type ArtworkReference,
} from '@/lib/artwork-fetcher';

// Paridade com o mobile (src/components/ArtCard.tsx) — mesmo card nunca
// tinha chegado na web (ROADMAP 4.5 só cobria mobile). As imagens do
// Bíblia na Arte moram no domínio do site dele (Next.js, `public/images`),
// não no da API — só o caminho relativo vem na resposta.
const BIBLE_ART_WEB_BASE = 'https://biblianaarte.narniano.com';

function formatReference(ref: ArtworkReference): string {
  return ref.verses ? `${ref.book} ${ref.chapter}:${ref.verses}` : `${ref.book} ${ref.chapter}`;
}

export function ArtSection({ references }: { references: string[] }) {
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
  const relatedPassages = artwork.references.map(formatReference).join(' · ');

  return (
    <section className="border-t border-accent/10 py-16 text-center animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-display italic text-secondary mb-2">
        Pintura do Dia
      </h2>
      <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-accent mb-8">
        BÍBLIA NA ARTE
      </p>

      <div className="max-w-2xl mx-auto px-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={artwork.title}
            className="w-full rounded-lg shadow-lg mb-6"
            loading="lazy"
          />
        )}
        <h3 className="text-lg md:text-xl font-display text-secondary">
          {artwork.title}
          {artwork.year ? ` (${artwork.year})` : ''}
        </h3>
        <p className="text-sm md:text-base italic text-muted-foreground mt-1">
          {artwork.artistOrDirector}
        </p>
        {relatedPassages.length > 0 && (
          <p className="text-xs md:text-sm italic text-muted-foreground mt-3">
            Relacionada a {relatedPassages}
          </p>
        )}
        <a
          href={BIBLE_ART_WEB_BASE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1 text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-accent transition-colors hover:text-primary underline-offset-4 hover:underline"
        >
          Ver mais no Bíblia na Arte
        </a>
      </div>
    </section>
  );
}
