import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { PixDonationCard } from '@/components/apoiar/PixDonationCard';
import { PIX_CONFIG } from '@/lib/pix';

export const metadata: Metadata = {
  title: 'Apoie o projeto — Lecionário',
  description:
    'O Lecionário é gratuito e sem anúncios. Apoie com Pix e ajude a manter o devocional litúrgico no ar.',
};

// Fase 1 da doação (ROADMAP L/2026-08-21 "doação voluntária — prioridade"):
// Pix estático gerado localmente pelo padrão EMV do Bacen, sem
// intermediário nem taxa. Fase futura: gateway pra recorrência.
export default function ApoiarPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="space-y-8 md:space-y-10">
          <header className="space-y-3 text-center">
            <div className="flex justify-center mb-2">
              <span className="text-accent text-xl md:text-2xl">✦ ✧ ✦</span>
            </div>
            <h1 className="flex items-center justify-center gap-3 text-2xl font-display tracking-tight text-secondary md:text-3xl lg:text-4xl">
              <Heart className="h-6 w-6 fill-current text-accent md:h-7 md:w-7" />
              Apoie o projeto
            </h1>
          </header>

          <div className="classic-frame texture-paper space-y-8 border-accent/10 p-6 text-sm leading-relaxed text-foreground/85 shadow-xl md:p-10 md:text-base">
            <section className="space-y-3">
              <p>
                O Lecionário é <strong>gratuito, sem anúncios e sem cadastro</strong> — e é assim
                que ele deve continuar. Se ele abençoa sua rotina de oração, uma contribuição
                voluntária ajuda a manter os servidores no ar, as fontes hospedadas e o
                desenvolvimento ativo.
              </p>
              <p className="italic text-muted-foreground">
                Ninguém precisa doar para usar qualquer recurso do app. É &ldquo;quem pode,
                sustenta&rdquo;.
              </p>
            </section>

            <PixDonationCard />

            <section className="space-y-3 border-t border-accent/10 pt-6 text-sm text-muted-foreground">
              <p>
                Recebedor: <strong>{PIX_CONFIG.receiverName}</strong> · Chave:{' '}
                <strong>{PIX_CONFIG.key}</strong>
              </p>
              <p>Qualquer valor é bem-vindo. Deus abençoe a sua generosidade. 🕯️</p>
            </section>
          </div>

          <p className="text-center">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-[0.25em] text-accent underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              ← Voltar ao Lecionário
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
