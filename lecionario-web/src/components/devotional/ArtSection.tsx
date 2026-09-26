'use client';

import { useEffect, useState } from 'react';
import { fetchDailyArtwork, type Artwork, type ArtworkReference } from '@/lib/artwork-fetcher';

// Paridade com o mobile (src/components/ArtCard.tsx) — mesmo card nunca
// tinha chegado na web (ROADMAP 4.5 só cobria mobile). As imagens do
// Bíblia na Arte moram no domínio do site dele (Next.js, `public/images`),
// não no da API — só o caminho relativo vem na resposta.
const BIBLE_ART_WEB_BASE = 'https://biblianaarte.narniano.com';

function formatReference(ref: ArtworkReference): string {
  return ref.verses ? `${ref.book} ${ref.chapter}:${ref.verses}` : `${ref.book} ${ref.chapter}`;
}

/** A descrição vem do catálogo com marcação markdown (`**negrito**`).
 *  Renderizada como texto puro, os asteriscos apareceriam na tela. */
function stripMarkdown(text: string): string {
  return text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Alt curto a partir da descrição da obra.
 *
 * O campo `description` já vinha da API (1090 de 1090 obras preenchidas)
 * e nunca era usado: o `alt` era `artwork.title`, que também é o <h3>
 * logo abaixo — o leitor de tela ouvia o título duas vezes e não recebia
 * nenhuma descrição da pintura. 1.1.1 (A).
 *
 * A descrição longa (mediana 1496 caracteres, com `**markdown**` e número
 * de inventário do museu) não serve como `alt`: alt é conciso. Então aqui
 * vai a PRIMEIRA FRASE, com o markdown limpo — que é justamente onde o
 * texto descreve a cena ("A composição retrata o episódio de..."). O
 * campo `altText` dedicado está no roadmap do Bíblia na Arte, que é onde
 * essa decisão editorial pertence; até lá, primeira frase é o honesto.
 */
function buildAlt(artwork: Artwork): string {
  const clean = stripMarkdown(artwork.description ?? '');
  const firstSentence = clean.match(/^[^.!?]+[.!?]/)?.[0] ?? clean;
  const short = firstSentence.length > 220 ? `${firstSentence.slice(0, 217)}…` : firstSentence;
  // A cena, com o autor e o título no fim — que é o que identifica a obra
  // para quem não está vendo a página.
  return `${short} (${artwork.artistOrDirector}${artwork.title ? `, ${artwork.title}` : ''})`;
}

export function ArtSection({ date }: { date?: Date | string }) {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  // Achado do Rilson (ROADMAP 2026-09-02): imagem sumia em alguns dias
  // sem motivo de dado (obra e imageUrl vinham certos da API) — sem
  // `onError`, uma falha transitória de rede deixava a imagem em branco
  // pra sempre. `imageFailed` guarda esse estado só depois de 1 retry.
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
    setArtwork(null);
    setImageFailed(false);
    setImageAttempt(0);
    fetchDailyArtwork(date, ctrl.signal).then((art) => {
      if (!ctrl.signal.aborted) setArtwork(art);
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
    <section className="border-t border-accent/10 pt-12 pb-16 text-center animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-display italic text-secondary mb-1">
        Pintura do Dia
      </h2>
      <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-accent-texto mb-8">
        BÍBLIA NA ARTE
      </p>

      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-card/50 rounded-xl border border-accent/15 p-6 md:p-8 shadow-sm">
          {imageUrl && (
            <div className="overflow-hidden rounded-lg shadow-md mb-6 max-h-[500px] flex items-center justify-center bg-black/5">
              <img
                key={imageAttempt}
                src={imageUrl}
                alt={buildAlt(artwork)}
                className="max-h-[500px] w-auto object-contain mx-auto transition-transform duration-500 hover:scale-[1.02]"
                loading="lazy"
                onError={() => {
                  // 1 retry (rede instável costuma ser transitória); se
                  // falhar de novo, some com a mesma graça de sempre em
                  // vez de deixar um espaço em branco indefinidamente.
                  if (imageAttempt === 0) setImageAttempt(1);
                  else setImageFailed(true);
                }}
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
            <p className="text-xs md:text-sm italic text-muted-foreground mt-3">
              Relacionada a {relatedPassages}
            </p>
          )}
          {/* A descrição da obra, finally visível (2026-09-25). O texto
              vinha da API preenchido em 1090 das 1090 obras e não era
              usado em lugar nenhum: o `alt` era o título e o resto do
              texto morria no payload. É a descrição que o catálogo do
              Bíblia na Arte escreveu mesmo para ser lida — quem enxerga
              ganha o que já pagou para ser escrito, e quem não enxerga
              ouve a mesma coisa pelo alt curto acima. */}
          {artwork.description && (
            <p className="text-sm md:text-base leading-relaxed text-foreground/90 mt-4 text-pretty">
              {stripMarkdown(artwork.description)}
            </p>
          )}
          <a
            href={artworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-6 py-2.5 text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold text-accent-texto transition-all hover:border-accent/50 hover:bg-accent/15"
          >
            Ver obra completa ↗
          </a>
        </div>
      </div>
    </section>
  );
}
