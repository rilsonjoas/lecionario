import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollText, ShieldCheck, Database, BookOpen } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getLiturgicalDayInfo } from '@/lib/liturgical-calendar';

export const metadata: Metadata = {
  title: 'Método e procedência dos dados — Lecionário',
  description:
    'De onde vêm as leituras, as orações e os textos bíblicos do Lecionário, e como cada dia é validado antes de chegar a você.',
};

// Página de higiene litúrgica (ROADMAP 5.2, 2026-08-30): documenta, de
// forma pública e verificável, a fonte e o processo por trás dos dados.
// Os números abaixo são reais e validados por script (content-validation);
// se mudarem, é o CI que quebra primeiro, não esta página.
const FACTS = {
  coverage: '4613/4620',
  totalCanonical: '4620',
  coverageGap: '7',
  totalDevotionals: '2191',
  firstYear: '2025',
  lastYear: '2030',
};

export default function MetodoPage() {
  const info = getLiturgicalDayInfo(new Date());
  return (
    <div className="min-h-screen bg-background">
      <Header liturgicalDay={info} season={info.season} variant="minimal" />
      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="space-y-8 md:space-y-10">
          <header className="space-y-3 text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display text-secondary tracking-tight">
              Método e procedência dos dados
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
              Como cada dia é construído e verificado
            </p>
          </header>

          <div className="classic-frame texture-paper border-accent/10 shadow-xl p-6 md:p-10 space-y-8 text-sm md:text-base leading-relaxed text-foreground/85">
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
                Em uma frase
              </h2>
              <p>
                O Lecionário usa o <strong>Leccionário Comum Revisado (RCL)</strong> na tradição do{' '}
                <strong>Livro de Oração Comum (BCP 1979)</strong>, com os textos bíblicos na versão{' '}
                <strong>Almeida Revista e Corrigida (ARC)</strong>. Todo dia do ano litúrgico é
                gerado e conferido por script contra a fonte oficial do RCL antes de ser publicado.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" aria-hidden="true" />A fonte das leituras
              </h2>
              <p>
                As quatro leituras de cada dia (Primeira Leitura, Salmo, Segunda Leitura e
                Evangelho) seguem o{' '}
                <a
                  href="https://lectionary.library.vanderbilt.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline underline-offset-2"
                >
                  Revised Common Lectionary da Vanderbilt Divinity Library
                </a>
                , a referência oficial do RCL. Cada domingo foi comparado{' '}
                <strong>domingo a domingo</strong> (não por amostragem) contra os calendários
                oficiais publicados por eles, nos três ciclos (A, B e C) e nos anos gerados — ver o
                registro do conserto histórico na época em que isso não era uma regra (ROADMAP
                1.2a).
              </p>
              <p>
                A Coleta do dia segue o Livro de Oração Comum de 1979, que é a tradição que este
                projeto segue deliberadamente (ver o termo ao longo do app).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic flex items-center gap-2">
                <ScrollText className="h-5 w-5 text-accent" aria-hidden="true" />
                Como o conteúdo devocional é criado
              </h2>
              <p>
                Cada dia tem uma <strong>oração original</strong> e uma{' '}
                <strong>meditação com perguntas</strong> ancoradas nas leituras reais daquele dia. O
                mecanismo é honesto e verificável: um gerador consulta o domingo real do RCL que
                rege cada semana e usa conteúdo escrito à mão para aquele contexto litúrgico — nunca
                um texto genérico repetido entre dias. Estão cobrindo 2191 dias (
                {FACTS.totalDevotionals}), de {FACTS.firstYear} a {FACTS.lastYear}.
              </p>
              <p>
                <strong>Sobre a repetição entre anos:</strong> o RCL é cíclico — o Ciclo A vale em
                2026 e 2029, o B em 2027 e 2030, o C em 2025 e 2028. Por isso alguns dias repetem
                exatamente o conteúdo do mesmo ciclo três anos antes, e celebrações de data fixa
                (Natal, Epifania) repetem todo ano. Dentro de um mesmo ano, porém, há{' '}
                <strong>zero repetição</strong>: nenhum dia repete o título de devocional, a oração
                ou a meditação de outro dia daquele ano.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic flex items-center gap-2">
                <Database className="h-5 w-5 text-accent" aria-hidden="true" />A Bíblia (ARC) dentro
                do app
              </h2>
              <p>
                Os textos dos versículos vêm da <strong>Almeida Revista e Corrigida</strong>, em
                domínio público. De todas as {FACTS.totalCanonical} citações canônicas presentes,{' '}
                <strong>{FACTS.coverage} estão com o texto completo</strong> — e cada uma é
                conferida por script: se o texto de uma leitura sumir, o CI do projeto quebra na
                hora, não numa auditoria meses depois.
              </p>
              <p className="text-xs text-muted-foreground">
                Há {FACTS.coverageGap} exceções documentadas: a referência &ldquo;Salmo 42,
                43&rdquo; da Vigília Pascal (uma vez por ano, no Ciclo C) não é resolvida pelo
                parser de citações do projeto e fica sem texto — é uma lacuna de ferramenta
                conhecida e listada, não perda silenciosa de conteúdo.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                O canal de validação, de ponta a ponta
              </h2>
              <p className="text-xs uppercase tracking-[0.25em] font-bold mb-3">
                Pipeline de dados
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 text-sm">
                <li>
                  <code className="rounded bg-accent/10 px-1.5 py-0.5 text-xs">
                    generate-rcl-data.ts
                  </code>{' '}
                  → leituras e coletas por data (ciclos A/B/C), conferidas contra a Vanderbilt
                </li>
                <li>
                  <code className="rounded bg-accent/10 px-1.5 py-0.5 text-xs">
                    lookup-bible-text.ts
                  </code>{' '}
                  → preenche o texto bíblico ARC de cada citação
                </li>
                <li>
                  <code className="rounded bg-accent/10 px-1.5 py-0.5 text-xs">
                    generate-devotionals.ts
                  </code>{' '}
                  → gera as 2191 orações e meditações, ancoradas no domingo real do RCL
                </li>
                <li>
                  <code className="rounded bg-accent/10 px-1.5 py-0.5 text-xs">
                    validate:content
                  </code>{' '}
                  → o validador da Fase 5.1 confere, em todos os arquivos publicados: nenhum dia
                  faltando, nenhuma duplicação dentro do ano, e cobertura de texto bíblico — isso
                  roda em todo deploy
                </li>
              </ol>
              <p className="text-xs text-muted-foreground">
                Os dados gerados viajam dentro do próprio app e do site (funcionam 100% offline); o
                validador garante que o que está publicado é o que foi conferido.
              </p>
            </section>

            <section className="space-y-3 border-t border-accent/10 pt-6">
              <p className="text-xs text-muted-foreground">
                Registro completo do processo, das decisões e das correções históricas:{' '}
                <span className="font-mono">ROADMAP.md</span> do projeto (público no repositório).
                Dúvidas ou achados:{' '}
                <Link
                  href="/privacidade"
                  className="text-accent hover:underline underline-offset-2"
                >
                  fale conosco
                </Link>
                .
              </p>
            </section>
          </div>

          <p className="text-center">
            <Link
              href="/"
              className="text-xs uppercase tracking-[0.25em] font-bold text-accent hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              ← Voltar ao Lecionário
            </Link>
          </p>
        </div>
      </main>
      <Footer season={info.season} />
    </div>
  );
}
