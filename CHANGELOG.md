# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- **CI e pre-commit hook destravados** — os 6 erros `@typescript-eslint/no-explicit-any` em `lecionario-web/src/lib/logger.ts` (tipos trocados por `unknown`/`Record<string, unknown>` com narrowing `instanceof Error`) eram a causa raiz tanto da falha do ESLint no CI quanto do `pre-commit script failed` (o hook roda `lint-staged` → `eslint --fix`). Lint limpo (0 erros), `tsc` limpo, testes verdes nos dois apps.
- **Contraste WCAG AA do verde do Tempo Comum/Epifania** — sálvia clara `#7A9178` dava 2.58:1 sob texto creme no header/footer web; escurecida pra `#4F6350` (4.91:1), no web (`seasonBrandColors`) e no mobile (`primaryColor`, que é fundo do header do app).
- **Tags "Salmo"/"Segunda Leitura" ilegíveis no mobile** — badges do `ReadingCard` saíram do fundo translúcido fixo + cor de texto fixa por tipo; agora fundo sólido da estação com foreground adaptativo (`getBadgeColors()`), mesmo padrão do web.
- **Capitular da Meditação ilegível no modo escuro (mobile)** — `#4B2E39` hardcoded virou cor condicional (vinho no claro, branco no escuro); `ThemeColors` ganhou campo `mode`.
- **Escala tipográfica dos cards devocionais no web** — Oração do Dia chegava a 30px e Coleta a 24px, estragando print/compartilhamento; corpo de texto unificado com teto de 20px em todos os cards.

### Added

- **Auditoria de dependências no CI** — step `npm audit` (produção, `--omit=dev`) nos jobs web e mobile via novo `scripts/audit-allowlist.mjs`: falha em advisory high/critical fora da allowlist (padrão scriptorium-divinum). Na allowlist, só o que exige upgrade breaking de framework: next/postcss/serialize-javascript (Next.js 14→16, ver ROADMAP débito técnico) e image-size/postcss (Expo SDK).
- **Botão "Hoje" na navegação do web** — paridade com o mobile: aparece só fora do dia atual, volta pra data de hoje.
- **Favoritos no web** — `FavoritesContext` com API idêntica ao mobile, persistência em `localStorage`; botão de coração no dia + seção "Dias Favoritados" com chips clicáveis.
- **Política de Privacidade** — nova página `/privacidade` (dados locais, Sentry, afiliados Amazon, direitos LGPD, contato), linkada no rodapé web e na seção Sobre do mobile.
- **sitemap.xml + robots.txt** — `app/sitemap.ts` nativo (/, /privacidade) e linha `Sitemap:` no robots; domínio canônico corrigido (`lecionario.app` → `lecionario.narniano.com`) com `metadataBase` definido.
- **Linha de ações no header do mobile** — favoritar/compartilhar saíram da linha do título (empurravam "Lecionário") e viraram pílulas centradas abaixo da navegação.

### Security

- `npm audit fix --legacy-peer-deps` aplicado nos dois apps (lockfiles atualizados): brace-expansion, fast-uri e nanoid resolvidos sem breaking change; mobile com `overrides` de brace-expansion. Vulns restantes documentadas na allowlist acima.

### Changed

- **Camada escura uniforme em header/footer (web e mobile)** — véu `rgba(0,0,0,0.4)` sobre a cor de marca da estação garante WCAG AA do texto claro nas 7 estações (pior caso: ouro natalino 2.05 → 4.91:1). Web: `Header` + `Footer`; mobile: banda superior do `HomeScreen`. Paridade de cores entre plataformas garantida pela mesma fórmula.
- **Ícones/logos sazonais sincronizados com o verde novo** — `WEB_PALETTE` do `generate-logos.py` atualizada (epiphany/ordinary → `#4F6350`) e assets regenerados: logos web/mobile, manifests sazonais e Android res.
- **Navegação do web redesenhada** — "Voltar para hoje" saiu de botão flutuante à direita e virou link discreto sem borda sob a data (some quando já é hoje); títulos reduzidos um degrau (h1 60px→48px, "Liturgia como Tradição" 56px→36px, "Oração do Dia" 48px→36px, citação −6px) e ritmo vertical da home mais compacto.
- **Footer "Conheça também" no padrão do Gerador C.S. Lewis** — rótulo em caps espaçadas + links atômicos com ✦ + `flex-wrap` responsivo (antes era um `<p>` inline que estourava em tela estreita).
- **Contato oficial `lecionario@narniano.com`** — adicionado no rodapé web (mailto sob o ©) e na seção Sobre do mobile (abre app de e-mail); regra registrada no roadmap: toda menção a contato usa esse endereço.
- **Ações dos cards unificadas** — 1 botão de copiar por card, centrado no rodapé (web e mobile); share-sheet duplicado do card de leitura no mobile virou cópia direta; "Compartilhar este dia" permanece único na home.
- **Configurações reorganizadas (mobile)** — nova ordem: Notificações (com horário) → Aparência → Biblioteca → Sobre; botão "Limpar dados temporários" removido (cache técnico se recalcula sozinho).

## [0.1.0] - 2026-06-28

### Added

- Projeto inicial — monorepo com `lecionario-web` (Next.js 14 PWA) e `lecionario-mobile` (Expo/React Native).
- Motor de calendário litúrgico completo com cálculo de estações, cores e ciclos RCL (A/B/C).
- Sistema de temas sazonais com variáveis CSS por estação litúrgica.
- 49 componentes shadcn/ui + componentes devocionais (ReadingCard, PrayerSection, MeditationSection, CollectSection).
- Painel admin com autenticação passwordless, editor de devocionais e integração LectServe.
- Integração Supabase com tipos TypeScript completos para 5 tabelas.
- 18 scripts de importação de dados (BCP collects, lecionário, meditações, orações).
- Aplicativo mobile funcional com leitura de dados do Supabase.
- PWA completo com manifest, ícones, screenshots e Service Worker.
- Configuração de ESLint com TypeScript strict mode.
- Fonte Cormorant Garamond, EB Garamond e JetBrains Mono (auto-hospedadas, WOFF2 variável).
