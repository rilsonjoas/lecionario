# Lecionário

Aplicação de meditação diária na Palavra de Deus seguindo o Ano Litúrgico Cristão — Lecionário Comum Revisado (RCL, ciclos A, B e C).

Monorepo com aplicativo web (Next.js PWA) e mobile (Expo / React Native), compartilhando um motor litúrgico comum. **Sem dependência de backend — todos os dados são locais.**

<p align="center">
  <img src="docs/screenshots/preview.png" alt="Lecionário Preview" width="800" />
</p>

---

## Por que isto existe

Não existe em português um app devocional que siga o calendário litúrgico com fidelidade real, funcione offline, seja instalável sem loja e não peça login pra nada — as opções ou são genéricas (sem noção de estação litúrgica) ou dependem de conta/assinatura pra algo que devia ser simplesmente aberto e ler.

Este é o projeto mais diretamente ligado à minha própria disciplina espiritual: leitura e meditação bíblica diária, Coram Deo, viver conscientemente na presença de Deus. Eu não venho de tradição litúrgica — uso o Lecionário Comum Revisado por escolha de prática devocional, não por filiação — mas construí a ferramenta que eu mesmo uso todo dia, e por isso ela é sem fricção de propósito: sem conta, sem paywall no conteúdo litúrgico, dados locais.

Hoje o motor litúrgico está completo e testado (cálculo de Páscoa, ciclos A/B/C, cores e estações, 7.152 leituras com texto bíblico em Almeida, 2.191 devocionais para 2025–2030), a versão web está no ar em [lecionario.narniano.com](https://lecionario.narniano.com) com deploy automático e o app mobile recebe atualizações pelo ar (EAS Update). O app ainda não está nas lojas. A visão de futuro não é escala grande — é ser o companheiro diário confiável de um público menor mas fiel: modo de leitura mais robusto, conteúdo autoral que não repete de um ano para outro e, talvez, memorização de versículo. Sucesso aqui é ser usado todo dia por quem usa, não ser instalado por muita gente uma vez.

## Estrutura do monorepo

```
lecionario/
├── lecionario-web/      # PWA Next.js 15 (React 19)
├── lecionario-mobile/   # App Expo 54 / React Native 0.81 — foco em Android; iOS nunca testado em aparelho
├── ROADMAP.md           # O que falta para v1.0 e além
├── DEPLOY.md            # Instruções de deploy
├── CHANGELOG.md         # Histórico de versões
└── CONTRIBUTING.md      # Guia de contribuição
```

---

## Estado atual

| Área | Estado |
|---|---|
| Motor litúrgico (cálculo de estações, Páscoa, ciclos A/B/C) | Completo, testado |
| Dados RCL — 3 ciclos com leituras dominicais e feriais + textos bíblicos (ARC) | 4.613 de 4.620 dominicais e 2.525 de 2.532 feriais com texto. Sem texto: Salmo 42–43 (salmo duplo, 10 ocorrências), Sabedoria 4:7-15 (deuterocanônico), Obadias 15-21, Judas 17-25 e 3 João 9-12 |
| Devocionais — orações + meditações diárias (2025–2030) | 2.191 entradas; a 2ª ocorrência (texto distinto na volta do ciclo) está escrita para parte das estações, ver o ROADMAP |
| App web — PWA devocional | No ar em lecionario.narniano.com, com deploy automático pelo `main` depois da verificação |
| App mobile (Expo) — Hoje, Calendário, Busca, Favoritos e Configurações | Funcional, atualizações pelo ar (EAS Update); fora das lojas |
| Cache offline | Service Worker no web; AsyncStorage com TTL de 24 h no mobile |
| Notificações diárias (mobile) | Implementadas, com horário configurável |
| Acessibilidade | Auditoria WCAG 2.2 AA e gate axe-core nos temas claro e escuro, no CI |
| Observabilidade | Sentry no web e no mobile |

Veja [ROADMAP.md](ROADMAP.md) para o plano completo até v1.0 e além.

---

## Pipeline de dados

Tudo é gerado localmente com scripts TypeScript em `lecionario-web/scripts/`:

```
generate-rcl-data.ts      →  cycle-{A,B,C}.json  (datas + referências + coletas)
lookup-bible-text.ts      →  popula textos bíblicos (ARC) nos JSONs acima
generate-devotionals.ts   →  devotionals-{2025..2030}.json  (orações + meditações)
```

Os JSONs gerados são consumidos diretamente pelo web e mobile — sem backend, sem API, sem custo.

---

## Setup rápido

### Pré-requisitos

- Node.js 22+ (a versão que o CI usa)
- npm

### Web

```bash
cd lecionario-web
npm install
npm run dev
# http://localhost:3000
```

### Mobile

```bash
cd lecionario-mobile
npm install
npx expo start               # Expo Go para desenvolvimento rápido
```

Para build nativo (Android/iOS):

```bash
npx eas build --profile development --platform android
```

> **Atenção:** Se o build EAS falhar com `NoSuchMethodError`, rode `npx expo install expo@~54.0.35 expo-dev-client@~6.0.21` e rebuilde com `--clear-cache`.

---

## Variáveis de ambiente

Nenhuma variável de ambiente necessária. Todos os dados são locais (bundlados no app).

---

## Scripts

### Web (`lecionario-web/scripts/`)

| Script | O que faz |
|---|---|
| `generate-rcl-data.ts` | Gera JSONs RCL com datas, leituras, coletas para ciclos A/B/C |
| `lookup-bible-text.ts` | Popula textos bíblicos (Almeida ARC) nos JSONs RCL |
| `generate-devotionals.ts` | Gera orações + meditações diárias (2025–2030) |



---

## Integrações com outros projetos

O Lecionário **consome** duas APIs e **expõe** uma, além de alimentar o Bíblia na Arte com um arquivo.

| Direção | Projeto | Rota | Para quê |
|---|---|---|---|
| consome | Scriptorium (`api-scriptorium.narniano.com`) | `GET /api/v1/quotes/daily?date=` | Citação do dia (web e mobile) |
| consome | Bíblia na Arte (`api-biblianaarte.narniano.com`) | `GET /api/v1/artworks/daily?date=` | Pintura do Dia (web e mobile) |
| expõe | usado pelo Scriptorium | `GET /api/versiculo-do-dia` | Versículo do dia (`date`, `verse`, `liturgicalDay`, `fallback`, `shifted`) |
| fornece arquivo | Bíblia na Arte | `lecionario-web/data/daily-readings-refs.json` | Liga a Pintura do Dia à leitura e à estação |

**O arquivo de leituras** é gerado pelo calendário litúrgico real deste projeto (`npx tsx scripts/export-daily-refs.ts` em `lecionario-web`) e copiado à mão para `biblia-na-arte/server/src/data/`. Dois testes fecham a corrente: `src/lib/__tests__/daily-refs-table.test.ts` aqui falha se o calendário mudar sem regerar o arquivo, e o Bíblia na Arte compara a cópia dele com este arquivo. Se mexer no calendário ou estender as tabelas do RCL: regere, commite, copie, e faça o merge deste repositório primeiro.

Os clientes (`quote-fetcher.ts` e `artwork-fetcher.ts`, em `lecionario-web/src/lib` e `lecionario-mobile/src/lib`) devolvem `null` na falha, e a tela esconde o card. É correto para o usuário, mas por isso uma API quebrada **não aparece como erro**: o canário é quem avisa.

**Contrato tipado (web e mobile, desde 18/10/2026).** `lecionario-web/contract/` e `lecionario-mobile/contract/` (mesmo desenho e mesmos recortes) guarda o recorte da especificação OpenAPI de produção só com as rotas que o app usa (`*.openapi.json`) e os tipos gerados (`*.d.ts`). O teste de tipos `src/lib/__tests__/contract.types.ts` roda no `tsc` do CI e **falha se um tipo escrito à mão em `quote-fetcher.ts` ou `artwork-fetcher.ts` deixar de aceitar o que a API pode responder** (campo que virou opcional, sumiu ou mudou de tipo; ou campo que o app passou a exigir e a API não declara). Em `lecionario-web` e em `lecionario-mobile`:
- `npm run contract:check` compara com a produção e sai com 1 se o contrato mudou (não precisa de rede no CI; é para rodar à mão ou antes de mexer num fetcher);
- `npm run contract:update` baixa, recorta e regera; revise o diff, rode o `tsc` e commite;
- para o app passar a usar outra rota, acrescente-a em `CONTRATOS` em `scripts/contract-update.mjs`.
O diretório `contract/` está no `.prettierignore` dos dois (o hook de commit reformatava o JSON e o `contract:check` passava a acusar mudança falsa; achado em 18/10/2026). A especificação não declara as respostas 400 das rotas `daily` (anotado no estudo, CONTRATOS seção 7).

**Regras que valem para as três APIs** (o resto do cluster depende delas):
1. O "hoje" do cluster é `America/Sao_Paulo`. Nunca monte datas com `toISOString()` (é UTC e vira o dia 3 h antes).
2. Quem mostra um dia **manda a data que a tela mostra** (`?date=AAAA-MM-DD`). Sem isso, navegar entre dias repete o mesmo conteúdo (foi o bug da Citação do dia em 17/10/2026).
3. Data que não existe no calendário (`2026-13-45`) responde **400** nas três APIs.
4. Mudança de contrato é **aditiva**: campo novo e rota nova podem; remover, renomear ou trocar tipo só depois de migrar os consumidores.
5. Um canário em produção confere o formato dessas rotas de hora em hora e avisa o Uptime Kuma. O mapa completo (todas as rotas, formatos, situações limite, runbook) fica em `CONTRATOS-ENTRE-PROJETOS.md` no repositório de infraestrutura, que é privado.

## Documentação

- [ROADMAP.md](ROADMAP.md) — plano de maturidade até v2.0
- [DEPLOY.md](DEPLOY.md) — deploy web (Docker) e mobile (EAS/stores)
- [CONTRIBUTING.md](CONTRIBUTING.md) — convenções de commit e PR
- [CHANGELOG.md](CHANGELOG.md) — histórico de versões (Keep a Changelog)
