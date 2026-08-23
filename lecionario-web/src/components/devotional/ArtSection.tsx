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
  // A obra específica, não a home — é lá que tem os detalhes (comentário,
  // outras referências, licença), achado do Rilson (2026-08-23).
  const artworkUrl = `${BIBLE_ART_WEB_BASE}/obra/${artwork.id}`;
  const relatedPassages = artwork.references.map(formatReference).join(' · ');

  return (
    <section className="border-t border-accent/10 pt-12 pb-16 text-center animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-display italic text-secondary mb-1">
        Pintura do Dia
      </h2>
      <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-accent mb-8">
        BÍBLIA NA ARTE
      </p>

      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-card/50 rounded-xl border border-accent/15 p-6 md:p-8 shadow-sm">
          {imageUrl && (
            <div className="overflow-hidden rounded-lg shadow-md mb-6 max-h-[500px] flex items-center justify-center bg-black/5">
              <img
                src={imageUrl}
                alt={artwork.title}
                className="max-h-[500px] w-auto object-contain mx-auto transition-transform duration-500 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          )}
          <h3 className="text-xl md:text-2xl font-display text-secondary">
            {artwork.title}
            {artwork.year ? ` (${artwork.year})` : ''}
          </h3>
          <p className="text-sm md:text-base italic text-muted-foreground mt-1">
            {artwork.artistOrDirector}
          </p>
          {relatedPassages.length > 0 && (
            <p className="text-xs md:text-sm italic text-muted-foreground/80 mt-3">
              Relacionada a {relatedPassages}
            </p>
          )}
          <a
            href={artworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-6 py-2.5 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-accent transition-all hover:border-accent/50 hover:bg-accent/15"
          >
            Ver obra completa ↗
          </a>
        </div>
      </div>
    </section>
  );
}
