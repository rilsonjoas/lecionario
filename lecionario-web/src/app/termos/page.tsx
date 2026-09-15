import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';

export const metadata: Metadata = {
  title: 'Termos de Uso — Lecionário',
  description:
    'Termos de uso e diretrizes do Lecionário: aplicação devocional cristã sem fins lucrativos, gratuita e de acesso livre.',
};

export default function TermosPage() {
  const info = getLiturgicalDayInfo(new Date());

  return (
    <div className="min-h-screen bg-background">
      <Header liturgicalDay={info} season={info.season} variant="minimal" />
      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="space-y-8 md:space-y-10">
          <header className="space-y-3 text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display text-secondary tracking-tight">
              Termos de Uso
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
              Última atualização: 15 de setembro de 2026
            </p>
          </header>

          <div className="classic-frame texture-paper border-accent/10 shadow-xl p-6 md:p-10 space-y-8 text-sm md:text-base leading-relaxed text-foreground/85">
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                1. Natureza do Serviço
              </h2>
              <p>
                O <strong>Lecionário</strong> é um projeto devocional, litúrgico e educativo cristão
                disponibilizado gratuitamente na web e em aplicativo móvel. Seu propósito é servir
                como auxílio espiritual diário, oração pessoal e estudo bíblico fundamentado no
                calendário litúrgico cristão e no Lecionário Comum Revisado (RCL).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                2. Uso e Licença de Conteúdo
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Textos Bíblicos:</strong> As leituras utilizam a tradução Almeida Revista
                  e Corrigida (ARC), em conformidade com o domínio público ou autorizações devidas.
                </li>
                <li>
                  <strong>Orações e Coletas:</strong> Coletas históricas e orações tradicionais
                  pertencem ao patrimônio litúrgico cristão comum (incluindo o Livro de Oração Comum
                  e tradições patrísticas).
                </li>
                <li>
                  <strong>Uso Pessoal e Comunitário:</strong> Você é encorajado a ler, meditar,
                  compartilhar trechos em grupos de oração, cultos e redes sociais, preservando a
                  identificação da fonte.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                3. Sem Cadastro e Sem Cobrança
              </h2>
              <p>
                O acesso a todas as leituras, meditações e recursos essenciais é 100% gratuito. Não
                exigimos criação de conta, senhas ou dados bancários para o uso do serviço.
                Eventuais contribuições via Pix são estritamente voluntárias e destinadas à
                manutenção da infraestrutura e continuidade do ministério.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                4. Links Externos e Afiliados
              </h2>
              <p>
                O aplicativo e o site podem apresentar links para iniciativas irmãs do ecossistema{' '}
                <em>A Biblioteca</em> (como Bíblia na Arte, Scriptorium Divinum e Gerador C.S.
                Lewis) e links de indicação para livros na Amazon. Não nos responsabilizamos por
                conteúdos, políticas de privacidade ou transações comerciais realizadas em
                plataformas externas de terceiros.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                5. Disponibilidade e Isenção de Garantias
              </h2>
              <p>
                O serviço é fornecido "no estado em que se encontra", com funcionamento prioritário
                offline (os dados litúrgicos já são distribuídos com o aplicativo). Embora façamos o
                máximo esforço para garantir precisão e estabilidade, não garantimos operação
                ininterrupta ou isenta de falhas técnicas.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                6. Contato e Esclarecimentos
              </h2>
              <p>
                Para dúvidas, sugestões litúrgicas ou apontamento de correções, entre em contato
                pelo e-mail oficial:{' '}
                <a
                  href="mailto:lecionario@narniano.com"
                  className="text-dourado font-bold underline underline-offset-2"
                >
                  lecionario@narniano.com
                </a>
                .
              </p>
            </section>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/"
              className="text-xs uppercase tracking-[0.2em] font-bold text-accent hover:text-secondary transition-colors inline-flex items-center gap-2"
            >
              ← Voltar para o Lecionário
            </Link>
          </div>
        </div>
      </main>
      <Footer season={info.season} />
    </div>
  );
}
