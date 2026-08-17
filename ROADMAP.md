# Roadmap — Lecionário

Este documento descreve o que falta para o app se tornar maduro, profissional e completo. Cada fase tem critérios claros de "feito" e prioridade baseada no impacto para o usuário final.

---

## Situação atual (atualizado 2026-08-16 — a versão de 28/06 abaixo
ficou desatualizada por quase 2 meses; vários itens listados como
"incompleto" já foram feitos nesse intervalo e não estavam refletidos
aqui, achado ao auditar os roadmaps de todos os projetos)

### O que está funcionando

- Motor litúrgico completo: cálculo de Páscoa, estações, cores, ciclos A/B/C, nomes dos dias em PT-BR
- Dados RCL em JSON para os três ciclos (leituras por data + coletas)
- **Textos bíblicos completos** (Almeida ARC) — 4337 textos inseridos, 0 referências canônicas faltando
- **Devocionais gerados** — 2152 orações + meditações (2025–2030) com templates sazonais
- **Conteúdo de Semana Santa** (2026-08-15/16) — Domingo de Ramos,
  Quinta/Sexta-Feira Santa, Sábado Santo, com orações e meditações
  originais pro Tríduo (ver 1.1) — estava listado como ausente na
  versão de 28/06, já não é mais o caso
- App mobile com três telas: Hoje, Calendário Litúrgico, Configurações
- **Dados 100% locais** — Supabase removido do app principal, sem dependência de backend
- Cache offline com AsyncStorage e TTL de 24h
- Temas sazonais (cor de fundo, acento, primária por estação)
- **Logo real + identidade sazonal aplicada** (web e mobile, 2026-08-14/15)
  — ícones, splash screen, favicon, manifests recoloridos por estação
  (ver 1.6/1.7); a versão de 28/06 ainda listava isso como "placeholder"
- **Build mobile corrigido e testado em dispositivo Android físico**
  (2026-08-15/16, `NoSuchMethodError` resolvido — ver 1.3)
- ErrorBoundary global
- CI com TypeScript, ESLint, Prettier e testes (GitHub Actions)

### O que está incompleto ou ausente

- Conteúdo devocional do Tempo Comum ainda genérico (mesma oração repete por 7 dias seguidos — ver 1.2)
- **iOS nunca testado em dispositivo físico** (foco consciente em Android por enquanto — ver 1.3)
- Notificações push ausentes
- Compartilhamento nativo ausente
- Config screen com apenas limpar cache
- Cobertura de testes baixa (só motor litúrgico)
- Sem crash reporting, sem analytics
- Admin panel depende de Supabase (inativo atualmente)
- Web app ainda não totalmente limpo dos dados antigos — `useEffect`
  async desnecessário, dependência `@supabase/supabase-js` ainda no
  build de produção (ver 1.4)
- Ícone/nome novos exigem um novo build EAS pra valerem no app já
  instalado — o trabalho em si está pronto, falta só empacotar (ver 1.7)

---

## Fase 1 — Pré-lançamento (v1.0)

*Tudo que bloqueia uma versão usável por terceiros.*

### 1.1 Conteúdo Semana Santa

- [x] Adicionar `triduumContent` com entradas fixas para Domingo de Ramos, Quinta-Feira Santa, Sexta-Feira Santa e Sábado Santo
- [x] Orações originais: Lava-pés (Quinta), Crucificação (Sexta), Descida ao Hades/Grande Silêncio (Sábado)
- [x] Meditações guiadas com 3 perguntas para cada dia do Tríduo
- [x] Override aplicado após o loop em `generateYear()` — garante conteúdo correto independente do seededPick
- [x] JSONs regenerados e copiados para mobile (2025–2030 validados)

**Validado:** Páscoa 2026 (5/abr) → Ramos=29/mar, Quinta=2/abr, Sexta=3/abr, Sábado=4/abr — todos com título e oração corretos.

---

### 1.2 Conteúdo devocional

- [ ] Revisar orações do Tempo Comum (atualmente genéricas demais)
- [ ] Adicionar variação de conteúdo (mesma oração repete por 7 dias seguidos)
- [ ] Considerar Devocionais Feriados Nacionais (Natal, Ano Novo, Páscoa)

---

### 1.3 Correção de build (mobile)

- [x] **`NoSuchMethodError` resolvido (2026-08-15)** — não era teórico,
      aconteceu de verdade no primeiro build EAS real. Causa raiz e
      correção completas na seção "Identidade aplicada aqui" abaixo
      ("Achado crítico, primeiro build EAS real")
- [x] **Testado em dispositivo físico Android (2026-08-15/16)** — via
      `adb logcat` real, não simulação. iOS ainda não testado (decisão
      consciente, foco Android por enquanto — ver "Ainda pendente"
      abaixo)

---

### 1.4 Web — Atualizar componentes para dados locais

- [ ] `page.tsx` — já usa `getSampleDevotional` (agora sync), mas o `useEffect` ainda tem async desnecessário
- [ ] Verificar que todos os componentes consomem dados corretamente com o novo formato RCL (date-based)
- [ ] Remover dependência `@supabase/supabase-js` do build de produção (tree-shake admin)

---

### 1.5 Indicadores de loading

- [ ] Adicionar estado de loading na CalendarScreen enquanto calcula dias do mês
- [ ] Manter loading mínimo de UX: não mostrar conteúdo em flash antes de ter dados

---

### 1.6 Ícone e splash screen reais (mobile)

- [x] **Superada pela 1.7 abaixo** — ícone final (livro+chama), adaptive
      icon, splash screen e `app.json` já cobertos por
      `scripts/generate-logos.py`, rodando de verdade desde 2026-08-14/15
      e regenerado hoje com a paleta corrigida. Item antigo de 28/06
      ficou órfão sem ser marcado quando o trabalho real foi feito —
      corrigido agora ao revisar o roadmap

---

### 1.7 Logo sazonal e assets (web + mobile) — 2026-08-14/15

*Registrado como pendência às 2026-08-14, mas na verdade já estava
majoritariamente feito e só não commitado — corrigido em 2026-08-15
após conferir `git status` (a nota anterior dizia "não iniciado", o
que era falso).*

- [x] Script `scripts/generate-logos.py` gerando os assets a partir de
      `Logo.png`: recoloração por estação (corpo+chama, paleta web e
      mobile), ícones PWA, favicon, maskable icons, manifests
      sazonais, assets Expo e Android res por densidade
- [x] Web: `manifest.json`, `layout.tsx` (favicon/apple-touch-icon
      corrigido pra 180×180, `themeColor`) e Header/Footer/loading/error
      usando a nova logo
- [x] Web: troca dinâmica da logo/favicon/manifest por estação —
      `applySeasonBranding()` em `lib/theme.ts`, chamado de `page.tsx`
- [x] Mobile: assets gerados (icon, adaptive, splash, favicon, android
      res) e `app.json` atualizado (nome "Lecionário", cores de fundo
      `#F5F1E8`)
- [x] Mobile: logo sazonal no `HomeScreen` (`SEASON_LOGOS` por
      `require()` estático — necessário pro Metro resolver o asset;
      exceção de lint escopada em `eslint.config.cjs`)
- [x] Typecheck/lint limpos nos dois apps (corrigidos nesta sessão:
      comentários `eslint-disable` órfãos referenciando uma regra do
      `@next/eslint-plugin-next` que este projeto não usa; `Image`/
      `SEASON_LOGOS` declarados mas nunca renderizados no mobile)
- [ ] **Pendente de verdade**: novo build EAS pro ícone/nome valerem
      no app instalado — o app já instalado só atualiza JS via
      `eas update`/mesma rede de dev; ícone nativo exige rebuild
      completo. Fica pra quando fizer sentido publicar uma nova
      versão.

---

## Fase 2 — Features essenciais (v1.1)

*O que transforma o app de utilitário em produto.*

### 2.1 Notificações push diárias

- [ ] Instalar `expo-notifications`
- [ ] Implementar notificação local às 6h com o nome do dia litúrgico e referências
- [ ] Adicionar toggle nas Configurações: ativar/desativar notificações
- [ ] Adicionar seletor de horário (padrão 6h)
- [ ] Solicitar permissão de notificação no primeiro uso, com explicação clara

**Exemplo da notificação:**
```
Título: Quinta após o Pentecostes
Corpo: Rm 8,14-17 · Jo 8,31-47
```

---

### 2.2 Compartilhamento nativo

- [x] Instalar `expo-clipboard` (Share de texto usa RN built-in `Share`)
- [x] Adicionar botão "Compartilhar" no `ReadingCard` (ícone no header do card)
- [x] Adicionar botão "Copiar" na `PrayerSection` (com feedback visual "Copiado!")
- [x] Compartilhar o dia inteiro como texto formatado (botão ao lado do título "Lecionário")
- [ ] Testar no Android (Intent) e iOS (Share Sheet)

---

### 2.3 Config screen completa

A tela atual tem apenas "Limpar cache". Adicionar:

- [ ] **Notificações** — toggle on/off + seletor de horário
- [ ] **Tamanho da fonte** — pequeno / médio / grande
- [ ] **Tema** — claro / escuro / seguir sistema
- [ ] **Sobre** — versão atual, link para repositório, licença

---

### 2.4 Deep links

- [ ] Permitir que a notificação push abra diretamente o devocional do dia ao ser tocada (depende de 2.1)

---

## Fase 3 — Qualidade e polimento (v1.2)

*O que separa um app de v1 de um app que as pessoas recomendam.*

### 3.1 Acessibilidade

- [x] **Auditoria de `accessibilityLabel`/`accessibilityRole` — feita (2026-08-15)**:
      todos os `TouchableOpacity` interativos dos 6 arquivos que tinham
      (Prayer/Reading/Home/Calendar/Config/ErrorBoundary) agora têm os
      dois. Faltavam: retry do `ErrorBoundary`, navegação de dia
      (anterior/próximo) e retry de erro no `HomeScreen` — corrigidos.
      `Meditation`/`CollectSection` não têm elemento interativo, não se
      aplica
- [x] `ReadingCard` — já tem (`accessibilityLabel` no botão de
      compartilhar, com tipo + referência)
- [x] `CalendarScreen` — já tem, label completo por célula (data por
      extenso + dia litúrgico) + navegação de mês (achado ao conferir,
      2026-08-15 — estava marcado pendente por engano)
- [ ] Testar com TalkBack (Android) e VoiceOver (iOS)
- [x] **Contraste mínimo 4.5:1 em todo texto sobre fundo — feito (2026-08-15)**:
      achado real em `PrayerSection`/`MeditationSection`/`CollectSection`/
      `ReadingCard` (gold sobre fundo escuro e claro reprovando WCAG AA,
      inclusive com opacidade reduzindo ainda mais); todos corrigidos e
      verificados com `tsc --noEmit`

---

### 3.2 Cobertura de testes

- [ ] Testes para `rcl-fetcher.ts` — busca por data, ciclo, texto bíblico
- [ ] Testes para `cache.ts` — TTL expirado, cache miss, clear
- [ ] Testes para `devotional-content.ts` — lookup por data, ano sem dados
- [ ] Testes para `getSampleDevotional` — fallback chain
- [ ] Testes de snapshot para `ReadingCard`, `PrayerSection`, `CollectSection`
- [ ] Meta: 70%+ de cobertura no `src/lib/`

---

### 3.3 Crash reporting

- [ ] Instalar `@sentry/react-native`
- [ ] Inicializar Sentry no `App.tsx` com DSN de produção
- [ ] Configurar source maps no EAS

---

### 3.4 CI/CD para mobile

- [ ] Adicionar job EAS Build no GitHub Actions em push para `main`
- [ ] Adicionar `eas update` para OTA updates

---

### 3.5 Estados de erro com UI dedicada

- [ ] Criar componente `EmptyState` (ícone + título + subtítulo + ação opcional)
- [ ] Criar componente `ErrorState` para falhas (distinto do ErrorBoundary)
- [ ] Adicionar pull-to-refresh com feedback visual

---

## Fase 4 — Features avançadas (v2.0)

### 4.1 Favoritos e marcadores

- [ ] Persistir dias favoritos em AsyncStorage
- [ ] Aba "Favoritos" na CalendarScreen
- [ ] Botão de favoritar no HomeScreen

### 4.2 Busca

- [ ] Busca por referência bíblica (ex: "João 3")
- [ ] Busca por data
- [ ] Busca por palavra-chave nas leituras

### 4.3 Widget (Android 12+ / iOS 14+)

- [ ] Widget de tela inicial com leitura do dia e estação litúrgica
- [ ] Atualização diária automática

### 4.4 Versões bíblicas múltiplas

- [ ] Permitir escolha de tradução (ARC, NVI, NTLH, ACF)
- [ ] Configuração por leitura ou global

---

### 4.5 Pintura do Dia — integração com Bíblia na Arte (2026-08-16)

Ideia do Rilson: card opcional no dia mostrando uma obra de arte
relacionada à leitura principal, linkando pro Bíblia na Arte pra ver
mais. Conferido antes de registrar — a base técnica já existe dos dois
lados, não é especulação:

- Bíblia na Arte já tem `GET /api/v1/artworks?bookSlug=luke&chapter=10`
  (endpoint real, com teste de integração cobrindo)
- Lecionário já tem `reference: string` em cada leitura (ex. "Lucas
  10:25-37")

**O que falta construir:**
- [ ] Parser de referência → extrair livro + capítulo do texto livre
      (cuidado com casos como "Gênesis 1:1–2:4", que cruza capítulo)
- [ ] Tabela de tradução nome-do-livro-em-português → `bookSlug` em
      inglês (lista fechada, 66 livros, trabalho de fazer uma vez)
- [ ] Card "Pintura do Dia" — thumbnail + título + artista, toque abre
      o Bíblia na Arte (link externo, sem WebView)

**Decisão de arquitetura, não negociável sem repensar tudo:** Lecionário
é offline-first de propósito — o card **só aparece quando online**
(reaproveitar o `isOffline` que o `HomeScreen` já rastreia) e fica
ausente com graça quando não tem rede. Núcleo do app continua
funcionando 100% sem internet; isso é enriquecimento, não dependência.

Ver também: `biblia-na-arte/docs/ROADMAP.md`, seção "Fase 5 — Produto"
(lado recíproco desta integração).

---

### 4.6 "Leia mais sobre isso" — integração com Scriptorium Divinum (2026-08-16)

Mesmo espírito da 4.5, mais simples de implementar: `GET
/api/v1/search?q=` do Scriptorium já é real e testado (busca full-text
em português). O Lecionário busca por palavra-chave da meditação/leitura
do dia e sugere um trecho relacionado de um clássico (Agostinho, Kempis
etc.), com link pro Scriptorium. Mesma regra do card anterior: só
online, ausente com graça offline, reaproveitando `isOffline`.

- [ ] Extrair 1-2 palavras-chave relevantes da meditação/leitura do dia
- [ ] Card "Leia mais" — trecho + autor + link, mesmo lugar visual da
      Pintura do Dia (ou junto, num só bloco "Biblioteca do dia")

Ver também: `scriptorium-divinum/ROADMAP.md`, seção "Estratégia" (lado
recíproco).

---

### 4.7 Citação do dia — Gerador C.S. Lewis (2026-08-16)

Citação aleatória (não ligada à data, só rotativa) do mesmo pool de
dados do Gerador C.S. Lewis, com link "mais citações" pro gerador. Baixo
custo se os dados do Gerador forem exportáveis como JSON simples —
verificar formato antes de estimar esforço real.

- [ ] Confirmar se o Gerador tem os dados de citação num formato
      reaproveitável (JSON estático seria ideal)
- [ ] Espaço pequeno no `ConfigScreen` ou rodapé do dia, não competir
      com o conteúdo litúrgico principal

Ver também: `GeradorCSLewis/README.md` (lado recíproco).

---

### 4.8 Rodapé/menu cruzado — cluster "A Biblioteca" (2026-08-16)

Nunca virou item de roadmap em nenhum dos 4 projetos, só foi discutido
em conceito. Rodapé simples com link pros outros 3 (Bíblia na Arte,
Scriptorium, Gerador C.S. Lewis) — ajuda SEO (autoridade cruzada de
domínio) e retenção, sem depender de nenhuma integração de dado, só
link estático. Mesmo item registrado nos outros 3.

- [ ] Componente de rodapé "parte da mesma biblioteca" com os 4 links

---

## Pipeline de dados (referência)

```
generate-rcl-data.ts       →  cycle-{A,B,C}.json  (datas + referências + coletas)
lookup-bible-text.ts       →  popula textos ARC nos JSONs
generate-devotionals.ts    →  devotionals-{2025..2030}.json
```

Os JSONs são copiados do `lecionario-web/src/data/rcl/` para `lecionario-mobile/src/data/rcl/` e bundlados em ambos apps.

---

## Dependências a instalar (resumo)

| Pacote | Finalidade | Fase |
|---|---|---|
| `expo-notifications` | Notificações locais diárias | 2.1 |
| `expo-sharing` | Compartilhamento nativo | 2.2 |
| `expo-clipboard` | Copiar texto | 2.2 |
| `@sentry/react-native` | Crash reporting | 3.3 |

---

## Débito técnico conhecido

| Item | Localização | Impacto |
|---|---|---|
| `getSampleDevotional` agora síncrono mas chamado com `await` | `page.tsx` | Cosmético — funciona |
| RCL JSONs com 2MB+ cada | `src/data/rcl/` | Pode impactar tempo de build/bundle |
| Admin panel quebrado (Supabase inativo) | `src/app/admin/` | Funcionalidade admin indisponível |
| Devocionais repetem mesma oração 7 dias seguidos | `generate-devotionals.ts` | Conteúdo pouco variado |
| Sem testes para a camada de dados local | `src/lib/*.ts` | Confiança menor em refactors |

---

## Infraestrutura, segurança e produção (2026-08-08)

Levantamento feito na mesma sessão em que biblia-na-arte e meus-remedios
foram pro VPS Hetzner próprio. Este projeto é, dos quatro (junto com
biblia-na-arte, meus-remedios e scriptorium-divinum), **o mais pronto pra
subir** — já tem Dockerfile, `docker-compose.yml` e CI reais, e o app
principal **não depende de banco** (dados 100% locais/bundlados), então o
deploy não exige Postgres nem migração nenhuma, diferente dos outros três.

Segue o mesmo padrão de fases usado em todos os projetos pessoais —
categorias e justificativa completa em
`hetzner-infra/PADRAO-DE-ENGENHARIA.md`, risco real primeiro, polimento
depois. Numeração renumerada em 2026-08-09 (fusão com o SHIELD) — P2 e
P6 são categorias novas.

### P0 — Segurança

- [ ] **Decidir o destino do admin panel.** Hoje ele existe no bundle
      (`src/app/admin/`), depende de Supabase, e está "inativo" (débito
      técnico já listado acima). Duas opções: remover do build de
      produção (já está na Fase 1.4 deste roadmap:
      "Remover dependência `@supabase/supabase-js` do build de
      produção") ou reconstruir com auth própria — mas só faz sentido
      reconstruir se o admin panel for realmente necessário pra alguma
      operação (parece que não, já que o conteúdo é gerado por script,
      não editado manualmente)
- [ ] Headers de segurança no self-host (CSP, HSTS, `X-Frame-Options`) —
      hoje o `next start`/container não define nenhum
- [ ] `npm audit` — não está no `ci.yml` atual, fácil de adicionar

### P1 — Infra & Deploy

- [x] Dockerfile multi-stage já existe e é bom (`node:22-alpine`,
      usuário não-root, `next build` standalone)
- [x] `docker-compose.yml` já existe na raiz do monorepo
- [x] **Remover as env vars `NEXT_PUBLIC_SUPABASE_*` do compose** (Concluído em 2026-08-14: variáveis obsoletas do Supabase removidas de `docker-compose.yml`, já que a base de código do web não referencia mais o Supabase).
- [x] Registrado em `hetzner-infra/` — já no ar em
      `lecionario.narniano.com`
- [x] Como não precisa de banco, este foi o deploy mais simples dos
      quatro — só o container web atrás do Traefik

### P2 — Saúde & Resiliência

- [ ] Não auditado — categoria nova (fusão com o SHIELD, 2026-08-09).
      Next.js não tem `SIGTERM`/health check no mesmo sentido que uma
      API tradicional; vale confirmar como o container reage a restart

### P3 — CI/CD

- [x] `ci.yml` já roda TypeScript, ESLint, Prettier e testes (Vitest) pro web **e** pro mobile em cada push/PR.
- [x] Já builda e publica imagem Docker no GHCR em cada tag `v*`.
- [x] **CI e push do Docker corrigidos (2026-08-14).** Resolvido o erro de push para o GHCR (`denied: installation not allowed to Create organization package`) ajustando as permissões do workflow e o escopo da imagem no GitHub para `github.repository_owner`.
- [ ] CI/CD do mobile via EAS Build — já está na Fase 3.4 deste
      roadmap, ainda não feito

### P4 — Testes

- Cobertura hoje é baixa (só motor litúrgico) — já mapeado na Fase 3.2
  deste roadmap, meta de 70%+ em `src/lib/`. Sem mudança aqui, só
  linkando pro contexto de infra

### Identidade aplicada aqui (2026-08-15, revisado)

> Fonte: `Identidade visual geral.md` e `Identidade Visual - Guia Técnico
> (Código).md` no vault. **Achado ao conferir o ícone real (2026-08-15):**
> o símbolo (livro + chama irradiando, `Logo.png`) já tem essa cara —
> livro cobre A Biblioteca, chama com raios já gesticula pra Os Céus. E
> `scripts/generate-logos.py` já implementa "um grammar, registros
> diferentes" de verdade (recolore por estação, gera todos os assets
> web/mobile/Android). **Não mexer no símbolo nem no estilo do ícone** —
> plano/geométrico está certo pra legibilidade em tamanho pequeno; a
> textura mais ornamentada (capitular, halo, moldura) é pra superfícies
> maiores (splash, hero, tela cheia), não pro ícone.

- [x] **Cor do Advento corrigida (2026-08-15)**: era roxo+rosa
      (`#EC4699`/`#C4A4E8`, "Rosa da Esperança" — decisão estética, não
      erro, mas o Rilson preferiu convenção real); agora é azul Sarum
      (`--graca-azul` #4A6FA5) com chama dourada, tradição anglicana/BCP
      1979 que o projeto já segue
- [x] **Paleta de estação unificada com os tokens compartilhados
      (2026-08-15)**: `WEB_PALETTE`/`MOBILE_PALETTE` eram hex soltos e
      **divergentes entre si** (achado real: Quaresma era roxa no web,
      marrom-avermelhada no mobile) — agora os dois usam exatamente os
      mesmos valores, alinhados aos tokens do Design Narniano. Rodado
      `generate-logos.py` de verdade, ícones/manifests/splash das 7
      estações regenerados e conferidos visualmente
- [x] **Capitular implementada nos dois lados (2026-08-15)**: web via
      `.capitular::first-letter` em `MeditationSection.tsx` (substituiu
      uma aspas decorativa simulada); mobile via aproximação nativa
      (RN não tem `::first-letter`/float — primeira letra como `<Text>`
      aninhado maior, mesma função, mecanismo diferente)
- [x] **Easing litúrgico — web (2026-08-15)**: `--ease-liturgico`/`--ease-vela`
      em `tailwind.config.ts`, aplicado nos 3 pontos que mudam de cor por
      estação (`ReadingCard`, `Header`)
- [~] **Easing — mobile: não aplicável, decisão consciente (2026-08-15)**:
      `HomeScreen.tsx` só lê `getThemeForSeason()` uma vez no render, sem
      observador nem transição ao vivo — não existe o momento de troca
      que isso animaria. App também não tem nenhuma lib de animação
      instalada; adicionar uma agora só pra isso seria dependência nativa
      nova sem ganho real, bem na véspera de gerar o APK. Reavaliar só se
      o app ganhar essa transição ao vivo no futuro

**Achado crítico, primeiro build EAS real (2026-08-15):** primeiro APK
gerado crashava na abertura, sempre — "Lecionário apresenta falhas
contínuas". Diagnosticado com `adb logcat` de verdade (não achismo):
`java.lang.NoSuchMethodError` em `expo.modules.kotlin.types.ReturnTypeKt`,
disparado por `FontLoaderModule.kt:98`. Causa raiz: `npm ls expo-font`
mostrou **duas versões** resolvidas — `57.0.1` (via `@expo/vector-icons`)
e `14.0.12` (via `expo@54.0.35`, a versão que o SDK realmente exige,
`~14.0.12`). O `npm install` que rodei mais cedo pra corrigir o lockfile
preencheu a entrada quebrada com `57.0.1` em vez de dedupar pra
`14.0.12` — módulo nativo Kotlin com duas versões JS não convive bem,
resultado é `NoSuchMethodError` num método que só existe numa das duas.
**Corrigido** com `overrides.expo-font: "~14.0.12"` no `package.json`,
forçando dedupe pra uma versão só. `npm ls expo-font` confirma: as duas
dependências agora resolvem pra `14.0.12`. Lição: depois de qualquer
`npm install` num projeto Expo, rodar `npx expo install --check` — ele
teria mostrado o built-in de compatibilidade de SDK que o `npm` sozinho
não sabe calcular.

**Sessão de teste real no aparelho (2026-08-16)** — 9 pontos levantados,
todos investigados no código antes de responder:

- [x] **EAS Update configurado**: `expo-updates` instalado + `eas
      update:configure` rodado — `runtimeVersion` por `appVersion`,
      canais `development`/`preview`/`production` em `eas.json`. A
      partir deste build, ajustes só-JS não precisam mais de build
      nativo completo — `eas update` publica em segundos
- [x] **Fonte do título/menus não batia com o design**: `navText`
      ("Anterior"/"Próximo") não tinha `fontFamily` nenhuma, caía no
      Roboto do sistema. Auditoria completa: **53 `<Text>` no mobile, só
      26 tinham `fontFamily`** — corrigido em 8 arquivos (pior caso:
      `ConfigScreen`, 9 de 12 sem fonte)
- [x] **"Lecionário" ilegível**: achado real, `theme.accentColor` como
      cor do título presumia fundo sempre escuro — Natal/Páscoa
      (dourado) e Epifania/Tempo Comum (sálvia) quase apagavam o texto.
      Criado `getHeaderTextColors(season)` em `lib/theme.ts`, adaptativo
      por estação (preto quente em fundo claro, creme em fundo escuro),
      aplicado em título/dia/ano/navegação/data
- [x] **Toque na data não navegava pro calendário**: era `View` sem
      `onPress`. Agora é `TouchableOpacity` com `navigation.navigate('Calendário')`
- [x] **"Voltar para hoje"**: botão novo no `HomeScreen` (só aparece
      fora do dia atual, volta a data) e no `CalendarScreen` (só aparece
      fora do mês atual, volta o mês)
- [x] **Fontes grandes demais**: `prayerText`/`collectText` em 18px +
      padding empilhado deixavam poucas palavras por linha. Reduzido
      pra 16px/lineHeight 26
- [x] **Ícones de Salmo (coração) e Evangelho (estrela)**: trocados por
      música (Salmos eram cantados) e cruz — nos dois lados (web +
      mobile), inclusive um `text-white` fixo no badge do Evangelho web
      que tinha o mesmo bug de contraste dos outros badges
- [x] **Texto não selecionável**: `selectable` adicionado nos 4
      componentes de conteúdo (Prayer/Meditation/Collect/Reading)
- [x] **"Limpar cache" confuso**: reescrito pra deixar claro que as
      leituras já vêm no app (nada de rede) — é só um cache técnico de
      cálculo, não um download. Renomeado "Limpar dados temporários"
- [x] **Achado extra, não fazia parte dos 9 pontos**: `CalendarScreen`
      (mobile) e `LiturgicalCalendar` (web) tinham **paleta de cor
      própria, nunca sincronizada** com `lib/theme.ts` — Advento
      continuava roxo na legenda de cores mesmo depois de virar azul em
      todo o resto do app. Terceira/quarta fonte de cor duplicada
      encontrada nesta investigação (depois de `theme.ts` x2 e o gerador
      de ícone) — ver item de arquitetura abaixo

**Segunda rodada, adiantado antes do próximo build (2026-08-16, foco
Android — iOS não tocado):**
- [x] **Cores de estação consolidadas**: `CalendarScreen` (mobile) e
      `LiturgicalCalendar` (web) agora **importam** de `lib/theme.ts` em
      vez de manter cópia própria — elimina a causa raiz do bug do
      Advento roxo (não tem mais como divergir, porque não existe mais
      cópia pra divergir). `generate-logos.py` continua com valores
      próprios de propósito — unificar com JSON compartilhado arriscava
      quebrar o Metro bundler bem na véspera do build; documentado como
      pendência de baixo risco, não urgente
- [x] **Densidade de leitura — auditoria completa do mobile**: conferido
      todo `fontSize` do app (14 valores distintos, de 9 a 34px) — os 2
      já corrigidos (`prayerText`/`collectText`) eram os únicos casos
      reais de texto corrido grande demais; resto é cabeçalho/label,
      tamanho correto pro papel. Web fica pendente (não testado nesta
      rodada, foco foi Android)
- [x] **Área de toque — auditoria completa (padrão 48dp)**: achados reais
      abaixo do mínimo — `shareButton` (32×32), `shareDayButton`
      (36×36), `copyButton` (altura 36), `navButton` (44), + os 2 botões
      "Voltar para hoje" novos. Corrigido com `hitSlop` em 8 pontos (não
      muda o visual, só a área clicável — mesmo padrão que já existia
      no `monthButton`)
- [x] **Halo-glow no ícone da vela** (`PrayerSection`) — Design Narniano;
      Android ignora `shadowColor` em `View` (só iOS respeita sombra
      colorida nativa), então é uma camada própria atrás do ícone
      (`rgba(212,160,23,0.25)`, 76×76 atrás do círculo de 56×56), sem
      dependência nova

**Ainda pendente, fica pra depois do build (retomar via `eas update`,
mais rápido agora):**
- [ ] Consolidar `generate-logos.py` (Python) com a fonte JS de cor —
      baixo risco, não urgente, documentado acima
- [ ] Densidade de leitura no **web** — não auditado nesta rodada
- [ ] Mais Design Narniano no resto do app (moldura em mais lugares,
      halo-glow só foi aplicado num ponto)
- [ ] Benchmark de UI/UX contra padrões de mercado — avaliação
      qualitativa feita em conversa, sem checklist formal registrado
- [ ] **iOS não foi tocado em nenhuma das duas rodadas** — safe-area,
      sombra nativa (que se comporta diferente lá) e teste geral ainda
      em aberto, por decisão consciente (foco Android por enquanto)
- [ ] TalkBack/VoiceOver — teste real com leitor de tela ligado, nunca
      feito

**Achado extra, fora do escopo original (2026-08-15):** ao conferir
contraste da capitular, achei que **todo uso de `--dourado` como cor de
texto/ícone no app reprovava WCAG AA** — 12 ocorrências no web (2.0-4.4:1,
mínimo é 4.5:1), e o mesmo padrão em 4 componentes do mobile (Prayer/
Meditation/Collect/ReadingCard, com cores hardcoded próprias, nem
compartilhadas com o web). Incluindo os badges de leitura por estação
(`ReadingCard`), onde texto branco fixo sobre Natal/Páscoa (dourado) e
Epifania/Tempo Comum (sálvia) dava 2.6-3.27:1. Tudo corrigido:
- [x] Web: token novo `--dourado-texto` (fundo escuro) + reuso de
      `--vinho` (fundo claro) nas 12 ocorrências + foreground adaptativo
      por estação nos badges (antes fixo em branco)
- [x] Mobile: mesma lógica, cores próprias corrigidas nos 4 componentes
      devocionais
- [x] Vault (`Identidade Visual - Guia Técnico`) também corrigido, pra
      não repetir o mesmo erro quando Bíblia na Arte/Scriptorium/CS
      Lewis implementarem a capitular
- Verificado com `tsc --noEmit` (limpo nos dois) e `next build` completo
  (web, sucesso) — não é só cálculo teórico de contraste, o código
  compila e builda de verdade

### P5 — Monitoramento & Logs

- [ ] **Uptime Kuma** — ainda não aplicável: o app não está no ar no VPS,
      então não existe monitor pra ele ainda. Assim que o deploy (P1)
      sair, é só adicionar o monitor — o canal de alerta (**Telegram +
      e-mail**) já está configurado centralmente no Uptime Kuma do VPS
      (mesmo usado por bancada, biblia-na-arte e scriptorium), não exige
      nenhuma configuração nova, só cadastrar a URL.
- [ ] **Sentry no mobile (`@sentry/react-native`) — instalado e inicializado (2026-08-14), falta terminar a configuração**: SDK instalado, `Sentry.init` em `App.tsx` (lê `EXPO_PUBLIC_SENTRY_DSN`), raiz embrulhada com `Sentry.wrap(App)`. **Pendente**: criar o DSN no sentry.io, definir `EXPO_PUBLIC_SENTRY_DSN` no build do app e configurar source maps no EAS (Fase 3.3)
- [ ] **Sentry no web (`@sentry/nextjs`) — instalado e inicializado (2026-08-14), falta terminar a configuração**: SDK instalado, arquivos `sentry.client.config.ts`, `sentry.server.config.ts` e `sentry.edge.config.ts` criados, `next.config.mjs` embrulhado com `withSentryConfig` (typecheck passou). **Pendente**: criar o DSN no sentry.io, definir `NEXT_PUBLIC_SENTRY_DSN` no `docker-compose.yml` do deploy e validar que eventos chegam
- DSN é conta pessoal (sentry.io), só o Rilson cria — até lá, `Sentry.init`
  com `enabled: !!dsn` deixa tudo rodando normal sem a chave (mesmo
  padrão usado no meus-remedios)
- [ ] Rotação de log não se aplica do mesmo jeito aqui (Next.js/Vercel-
      style, não processo de longa duração com log em disco) — conferir
      se o log do container no VPS tem algum limite de tamanho mesmo assim

### P6 — Backups & Recuperação

- [ ] Não precisa de banco próprio (dados 100% locais/bundlados) — só o
      código no GitHub já é o "backup" de verdade aqui. Categoria nova,
      mas de baixo risco pra este projeto especificamente

### P7 — UI/UX, acessibilidade e SEO

- [~] **Internacionalização (i18n) — decisão consciente de adiar
      (2026-08-16)**: hoje zero infra (`grep` confirma: sem `i18next`,
      sem `expo-localization`, nenhum arquivo de locale, tudo string PT
      direto no JSX). Comparado ao Meus Remédios (i18n real, pt/en/es
      completo) porque a natureza dos dois projetos é diferente: Meus
      Remédios é interface neutra, tradução é troca de string. Lecionário
      é **100% conteúdo** — Bíblia em Almeida ARC, 2152 devocionais
      gerados em português. Traduzir só a UI sem traduzir o conteúdo
      bíblico/devocional seria teatro, não internacionalização de
      verdade — exigiria trocar a tradução bíblica de base (ESV/KJV em
      inglês, RVR em espanhol) **e regenerar todo o conteúdo devocional**
      por idioma, ordem de grandeza maior que instalar uma lib. Público
      definido (cristão litúrgico brasileiro) já é pequeno de propósito;
      expandir idioma sem expandir conteúdo não resolve nada. **Não
      prioridade agora.** Se um dia fizer sentido, inglês é candidato
      mais natural que espanhol (a tradição RCL/BCP 1979 que o app
      segue é mais comum no mundo anglicano de língua inglesa que no
      Brasil) — mas isso é decisão de expansão estratégica, não
      pendência técnica esquecida
- [x] **SEO do web já implementado**: `lecionario-web/src/app/layout.tsx`
      exporta `metadata` (Next.js App Router) com `openGraph` — mais
      maduro que o padrão estático de index.html, gerado por página.
      `public/robots.txt` também já existe
- [ ] `sitemap.xml` — não existe (`app/sitemap.ts` do Next.js resolveria
      isso nativamente, sem lib extra)
- [x] Já responsivo (breakpoint 768px, hook `useIsMobile`)
- [x] **Contraste de cor (web + mobile) — resolvido de verdade (2026-08-15)**:
      auditoria real encontrou e corrigiu falha sistêmica de WCAG AA em
      todo uso de dourado como texto/ícone, nos dois lados. Detalhe
      completo na seção "Identidade aplicada aqui" acima
- [x] **Acessibilidade do mobile — contraste + labels feitos (2026-08-15)**:
      auditoria completa de `accessibilityLabel`/`accessibilityRole` em
      todos os componentes com elemento interativo (ver Fase 3.1). Falta
      só o teste real com TalkBack/VoiceOver num aparelho físico — isso
      exige mão humana, não dá pra verificar por código
- [x] **Acessibilidade do web — contraste + aria-label feitos (2026-08-15)**:
      era "nunca foi mencionada"; contraste de cor resolvido, e auditados
      os botões só-com-ícone: `LiturgicalCalendar` (navegação de mês +
      célula de dia, sem `aria-label` nenhum antes) e os 3 botões de
      navegação de `page.tsx` (achado real: `hidden sm:inline` no texto
      removia da árvore de acessibilidade também, não só visualmente —
      no mobile web viravam ícone puro sem nome). Falta navegação por
      teclado (não testada) e teste com leitor de tela de verdade

## L — Lançamento e crescimento (2026-08-08)

Mesmo exercício feito pro meus-remedios ("quanto falta pra milhares de
usuários"), mas a resposta aqui é estruturalmente diferente — o Rilson
já esperava isso, e checagem real confirma: **zero estratégia de
monetização documentada** (diferente do biblia-na-arte, que já tem
AdSense/Amazon Associates planejados desde a concepção) e **público-alvo
muito mais restrito por natureza**.

### Por que o teto é mais baixo, de propósito

- Segue o **calendário litúrgico anglicano/ACNA** (RCL + BCP 1979) —
  escolha pessoal de prática devocional do Rilson (que não é de
  tradição litúrgica), não indica filiação denominacional. É uma
  tradição específica dentro do cristianismo, minoria mesmo dentro do
  protestantismo brasileiro (que é majoritariamente
  evangélico/pentecostal, não litúrgico). O público real é a
  interseção de "cristão praticante" + "tradição litúrgica" +
  "português" — bem menor que "quem toma remédio" (público do
  meus-remedios, universal)
- Isso não é defeito — é o propósito do projeto. Não faz sentido forçar
  "milhares de usuários" num app que existe pra servir uma tradição
  específica bem, não pra maximizar instalação
- **Estimativa de potencial (2026-08-15, teto plausível, não medição
  real):** cristãos litúrgicos praticantes no Brasil (anglicanos,
  luteranos, presbiterianos/reformados de linha mais litúrgica,
  metodistas) somam uma fração pequena do protestantismo brasileiro —
  ordem de grandeza de dezenas de milhares de praticantes reais, não
  milhões. Sucesso aqui é capturar algumas centenas a poucos milhares
  de usuários **ativos e fiéis** desse recorte, não uma fatia de
  mercado grande — já seria um resultado excelente pro propósito do
  projeto.

### O que muda no plano, então

- **Publicação web**: já é PWA funcional, sem fricção de loja — a
  distribuição real já está no ar (`lecionario.narniano.com` +
  Vercel), sem depender de review de app store pra alcançar gente
- **Publicação mobile**: `DEPLOY.md` já documenta o comando
  (`eas submit --platform android`), mas **não há confirmação de que já
  foi rodado de verdade** — conferir antes de assumir que está
  publicado
- **Monetização**: não mapeada. Se fizer sentido algum dia, o caminho
  mais coerente com o propósito do projeto não é ads/assinatura
  agressiva — mais provável fazer sentido como doação voluntária
  (Pix/link) do que freemium, dado o perfil da audiência (comunidade
  religiosa, não consumidor de app comum)
- **Aquisição**: diferente de competir em ASO genérico — o canal real
  aqui é comunidade (paróquias, grupos anglicanos/litúrgicos, indicação
  direta), não tráfego de busca de app store

### Resumo honesto

Não é "meus-remedios com público menor" — é um projeto de propósito
diferente, e está tudo bem ter um teto de centenas/poucos milhares de
usuários muito engajados em vez de milhões superficiais. Se algum dia
quiser crescer de propósito, o gargalo real não é técnico (já está no
ar, já é PWA) — é achar e servir bem essa comunidade específica.

### O que reaproveitar de biblia-na-arte/meus-remedios

- O padrão de `docker-compose.yml` + Traefik + `make deploy
  service=<nome>` do `hetzner-infra/` é genérico — só adicionar
  entrada nova, não inventar de novo
- Como não tem banco, não precisa do passo de criar role/usuário
  Postgres que os outros dois exigiram
- `RECUPERACAO.md` e o backup automático do `hetzner-infra/` — só
  adicionar a linha do lecionário quando for pro ar

## Nota: se este projeto ganhar conta de usuário final (2026-08-14)

Decisão registrada no `meus-remedios` (único projeto pessoal com auth
de usuário real hoje): OAuth (Google) como atalho **nunca substitui**
conta local (e-mail/senha) — mantenha os dois, por 3 motivos que valem
pra qualquer projeto, não só aquele: (1) ponto único de falha — se a
conta do provedor for bloqueada, comprometida, ou a pessoa não tiver,
fica sem acesso nenhum; (2) fluxo OAuth mobile depende de deep link +
Custom Tabs + `Promise` resolvendo certo — classe de bug inteira que
conta local não tem (achado real: `meus-remedios/README.md`, seção
"Decisão: Google OAuth + conta local"); (3) App Store exige "Entrar
com Apple" se você oferece "Entrar com Google" (Guideline 4.8) — "só
Google" não é viável em iOS de qualquer forma.
