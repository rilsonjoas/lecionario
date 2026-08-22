import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidade — Lecionário',
  description:
    'Como o Lecionário trata os seus dados: favoritos e preferências ficam apenas no seu aparelho, sem cadastro, sem rastreamento e sem publicidade.',
};

// Requisito P8 do ROADMAP (LGPD / políticas de loja). Regra de contato:
// todo lugar que fala de contato usa lecionario@narniano.com.
export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="space-y-8 md:space-y-10">
          <header className="space-y-3 text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display text-secondary tracking-tight">
              Política de Privacidade
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
              Última atualização: 22 de agosto de 2026
            </p>
          </header>

          <div className="classic-frame texture-paper border-accent/10 shadow-xl p-6 md:p-10 space-y-8 text-sm md:text-base leading-relaxed text-foreground/85">
            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                Resumo honesto
              </h2>
              <p>
                O Lecionário funciona 100% offline: as leituras, orações e devocionais já vêm dentro
                do próprio app. Não temos cadastro, não temos servidor com seus dados, não usamos
                cookies de rastreamento nem publicidade. O que você salva (favoritos, preferências)
                permanece somente no seu aparelho.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                Dados guardados no seu aparelho
              </h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Favoritos (dias marcados com coração)</li>
                <li>Preferências: tema claro/escuro, tamanho da fonte, horário de notificação</li>
                <li>Cache técnico de cálculo litúrgico e notificações agendadas</li>
              </ul>
              <p>
                Tudo isso vive apenas no armazenamento local do navegador ou do aplicativo — nada é
                enviado para nós nem para terceiros. Para apagar, use "Limpar dados de navegação" no
                navegador ou desinstale/limpe os dados do app.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                Relatórios de erro (Sentry)
              </h2>
              <p>
                Usamos o Sentry para diagnosticar travamentos e falhas. Quando um erro acontece,
                podem ser coletados dados técnicos como modelo do aparelho, versão do sistema, tipo
                de conexão e registro técnico do erro — podendo incluir endereço IP e
                identificadores de dispositivo, conforme o padrão da ferramenta. Esses relatórios
                servem exclusivamente para corrigir problemas de estabilidade. Como não existe
                cadastro, nenhum relatório é vinculado à sua identidade.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                Links para a Amazon (afiliados)
              </h2>
              <p>
                Alguns links de livros são links de afiliado da Amazon (programa Associados). Ao
                clicar, a Amazon pode definir os cookies próprios de indicação dela; nós não
                recebemos nenhum dado seu — apenas uma comissão quando há compra qualificada, que
                ajuda a manter o projeto no ar.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                O que este serviço não faz
              </h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Não coleta nome, e-mail, telefone ou qualquer identificação sua</li>
                <li>Não usa Google Analytics nem ferramentas de rastreamento</li>
                <li>Não exibe publicidade</li>
                <li>
                  Não vende, aluga ou compartilha dados — porque praticamente não recebe nenhum
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg md:text-xl font-display text-secondary italic">
                Seus direitos (LGPD, art. 18)
              </h2>
              <p>
                A Lei Geral de Proteção de Dados garante acesso, correção, portabilidade e exclusão
                dos seus dados. Como tudo que tratamos está no SEU aparelho sob SEU controle, esses
                direitos você exerce diretamente (limpando dados ou desinstalando). Para questões
                sobre os relatórios de erro ou qualquer dúvida desta política, fale conosco:
              </p>
              <p>
                <a
                  href="mailto:lecionario@narniano.com"
                  className="text-accent hover:underline underline-offset-2"
                >
                  lecionario@narniano.com
                </a>
              </p>
            </section>

            <section className="space-y-3 border-t border-accent/10 pt-6">
              <p className="text-xs text-muted-foreground">
                Alterações nesta política serão publicadas nesta mesma página com nova data de
                atualização.
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
    </div>
  );
}
