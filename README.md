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

Hoje o motor litúrgico está completo e testado (cálculo de Páscoa, ciclos A/B/C, cores e estações, ~4300 textos bíblicos, 2152 devocionais gerados) — falta só o último passo, subir pro VPS. A visão de futuro não é escala grande — é ser o companheiro diário confiável de um público menor mas fiel: notificação no horário certo, modo de leitura mais robusto, talvez memorização de versículo. Sucesso aqui é ser usado todo dia por quem usa, não ser instalado por muita gente uma vez.

## Estrutura do monorepo

```
lecionario/
├── lecionario-web/      # PWA Next.js
├── lecionario-mobile/   # App Expo/React Native — iOS e Android
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
| Dados RCL — 3 ciclos com leituras completas + textos bíblicos (ARC) | Gerados (~4300 textos, 0 referências faltando canônicas) |
| Devocionais — orações + meditações diárias (2025–2030) | Gerados (2152 entradas com templates sazonais) |
| App mobile — telas Home, Calendário, Configurações | Funcional |
| App web — PWA devocional | Funcional |
| Cache offline (AsyncStorage + TTL 24h) | Implementado |
| Notificações push | Pendente |

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

- Node.js 22+
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
