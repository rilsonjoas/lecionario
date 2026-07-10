# Lecionário

Aplicação de meditação diária na Palavra de Deus seguindo o Ano Litúrgico Cristão — Lecionário Comum Revisado (RCL, ciclos A, B e C).

Monorepo com aplicativo web (Next.js PWA) e mobile (Expo / React Native), compartilhando um motor litúrgico comum. **Sem dependência de backend — todos os dados são locais.**

---

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
| Admin web (painel de edição) | Requer Supabase (opcional) |
| Notificações push | Pendente |
| Conteúdo Semana Santa | Pendente |

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

| Variável | Onde | Descrição | Obrigatória? |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `lecionario-web/.env.local` | URL do projeto Supabase | Admin apenas |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `lecionario-web/.env.local` | Chave anon pública | Admin apenas |

O app principal **não precisa** de Supabase. O admin panel (opcional) usa Supabase para auth + CRUD.

---

## Scripts

### Web (`lecionario-web/scripts/`)

| Script | O que faz |
|---|---|
| `generate-rcl-data.ts` | Gera JSONs RCL com datas, leituras, coletas para ciclos A/B/C |
| `lookup-bible-text.ts` | Popula textos bíblicos (Almeida ARC) nos JSONs RCL |
| `generate-devotionals.ts` | Gera orações + meditações diárias (2025–2030) |
| `full-seed.ts` | (Opcional) Popula Supabase com os dados |



---

## Documentação

- [ROADMAP.md](ROADMAP.md) — plano de maturidade até v2.0
- [DEPLOY.md](DEPLOY.md) — deploy web (Vercel/Docker) e mobile (EAS/stores)
- [CONTRIBUTING.md](CONTRIBUTING.md) — convenções de commit e PR
- [CHANGELOG.md](CHANGELOG.md) — histórico de versões (Keep a Changelog)
