# Roadmap — Lecionário

Este documento descreve o que falta para o app se tornar maduro, profissional e completo. Cada fase tem critérios claros de "feito" e prioridade baseada no impacto para o usuário final.

---

## Situação atual (2026-06-28)

### O que está funcionando

- Motor litúrgico completo: cálculo de Páscoa, estações, cores, ciclos A/B/C, nomes dos dias em PT-BR
- Dados RCL em JSON para os três ciclos (leituras por data + coletas)
- **Textos bíblicos completos** (Almeida ARC) — 4337 textos inseridos, 0 referências canônicas faltando
- **Devocionais gerados** — 2152 orações + meditações (2025–2030) com templates sazonais
- App mobile com três telas: Hoje, Calendário Litúrgico, Configurações
- **Dados 100% locais** — Supabase removido do app principal, sem dependência de backend
- Cache offline com AsyncStorage e TTL de 24h
- Temas sazonais (cor de fundo, acento, primária por estação)
- ErrorBoundary global
- CI com TypeScript, ESLint, Prettier e testes (GitHub Actions)

### O que está incompleto ou ausente

- Conteúdo específico para Semana Santa (Quinta-Feira Santa, Sexta-Feira Santa, Sábado Santo)
- Notificações push ausentes
- Compartilhamento nativo ausente
- Config screen com apenas limpar cache
- Cobertura de testes baixa (só motor litúrgico)
- Ícones e splash screen com assets placeholder
- Sem crash reporting, sem analytics
- Admin panel depende de Supabase (inativo atualmente)
- Web app não usa os dados locais — `sample-devotional.ts` recém-adaptado, falta atualizar componentes

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

- [ ] Verificar que o app abre sem `NoSuchMethodError`
- [ ] Testar em dispositivo físico (Android/iOS)

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

- [ ] Criar ícone final do app (1024×1024 PNG, sem transparência)
- [ ] Criar adaptive icon para Android (foreground 108×108dp)
- [ ] Criar splash screen
- [ ] Atualizar `app.json` com os novos assets

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

- [ ] Auditar todos os componentes com `accessibilityLabel`, `accessibilityRole`, `accessibilityHint`
- [ ] `ReadingCard` — label descrevendo tipo e referência da leitura
- [ ] `CalendarScreen` — cada célula de dia com label completo
- [ ] Testar com TalkBack (Android) e VoiceOver (iOS)
- [ ] Garantir contraste mínimo 4.5:1 em todo texto sobre fundo

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
- [ ] **Remover as env vars `NEXT_PUBLIC_SUPABASE_*` do compose** se a
      decisão do P0 for descartar o admin panel — hoje ficam
      injetadas sem uso real
- [x] Registrado em `hetzner-infra/` — já no ar em
      `lecionario.narniano.com`
- [x] Como não precisa de banco, este foi o deploy mais simples dos
      quatro — só o container web atrás do Traefik

### P2 — Saúde & Resiliência

- [ ] Não auditado — categoria nova (fusão com o SHIELD, 2026-08-09).
      Next.js não tem `SIGTERM`/health check no mesmo sentido que uma
      API tradicional; vale confirmar como o container reage a restart

### P3 — CI/CD

- [x] `ci.yml` já roda TypeScript, ESLint, Prettier e testes (Vitest)
      pro web **e** pro mobile em cada push/PR — mais avançado que
      biblia-na-arte e meus-remedios nesse quesito, que ainda não têm
      CI nenhum
- [x] Já builda e publica imagem Docker no GHCR em cada tag `v*` — um
      pipeline de release real, não só lint
- [x] **CI confirmada passando (2026-08-08).** Estava quebrada de
      verdade desde antes desta sessão (o registro do vault de
      2026-07-09 estava certo, o "funcionando" deste próprio arquivo
      estava desatualizado). Duas causas raiz reais, não sintoma único:
      `tsconfig.json` do web com `target: "es5"` (não suporta a flag
      `s` de regex usada em `scripts/lookup-bible-text.ts`) e o mobile
      sem `.prettierignore` pros JSONs gerados por script em
      `src/data/rcl/`. Corrigido, verificado local e no Actions real
      (run `712f2b9`, sucesso, 48s)
- [ ] CI/CD do mobile via EAS Build — já está na Fase 3.4 deste
      roadmap, ainda não feito

### P4 — Testes

- Cobertura hoje é baixa (só motor litúrgico) — já mapeado na Fase 3.2
  deste roadmap, meta de 70%+ em `src/lib/`. Sem mudança aqui, só
  linkando pro contexto de infra

### P5 — Monitoramento & Logs

- [ ] **Sentry no mobile** (`@sentry/react-native`) — já estava
      planejado na Fase 3.3 deste roadmap
- [ ] **Sentry no web também** (`@sentry/nextjs`, não `@sentry/node` —
      pacote específico do framework) — não estava no roadmap original,
      adicionado em 2026-08-08 pra igualar o padrão do meus-remedios
      (que ganhou Sentry nos dois lados, backend e mobile, na mesma
      sessão). Um projeto só no sentry.io cobre os dois lados daqui —
      não precisa conta separada por app
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

- [x] **SEO do web já implementado**: `lecionario-web/src/app/layout.tsx`
      exporta `metadata` (Next.js App Router) com `openGraph` — mais
      maduro que o padrão estático de index.html, gerado por página.
      `public/robots.txt` também já existe
- [ ] `sitemap.xml` — não existe (`app/sitemap.ts` do Next.js resolveria
      isso nativamente, sem lib extra)
- [x] Já responsivo (breakpoint 768px, hook `useIsMobile`)
- [ ] **Acessibilidade do mobile** já está na Fase 3.1 deste roadmap
      (accessibilityLabel, TalkBack/VoiceOver, contraste)
- [ ] **Acessibilidade do web nunca foi mencionada** — a Fase 3.1
      original só cobre o app mobile, o `lecionario-web` (Next.js) não
      tem nenhum item de a11y no roadmap. Achado ao padronizar com os
      outros projetos, 2026-08-08

## L — Lançamento e crescimento (2026-08-08)

Mesmo exercício feito pro meus-remedios ("quanto falta pra milhares de
usuários"), mas a resposta aqui é estruturalmente diferente — o Rilson
já esperava isso, e checagem real confirma: **zero estratégia de
monetização documentada** (diferente do biblia-na-arte, que já tem
AdSense/Amazon Associates planejados desde a concepção) e **público-alvo
muito mais restrito por natureza**.

### Por que o teto é mais baixo, de propósito

- Segue o **calendário litúrgico anglicano/ACNA** (RCL + BCP 1979) — é
  uma tradição específica dentro do cristianismo, minoria mesmo dentro
  do protestantismo brasileiro (que é majoritariamente
  evangélico/pentecostal, não litúrgico). O público real é a
  interseção de "cristão praticante" + "tradição litúrgica" +
  "português" — bem menor que "quem toma remédio" (público do
  meus-remedios, universal)
- Isso não é defeito — é o propósito do projeto. Não faz sentido forçar
  "milhares de usuários" num app que existe pra servir uma tradição
  específica bem, não pra maximizar instalação

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
