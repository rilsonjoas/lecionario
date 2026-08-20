# Lecionário — Tradição e Devoção

> **"A Palavra de Deus para o Povo de Deus"**
> Uma plataforma devocional imersiva que une a tradição litúrgica cristã, a erudição clássica e a excelência técnica do desenvolvimento front-end moderno.

## Estado do Projeto

| Dimensão             | Web                                                             | Mobile                                              |
| -------------------- | --------------------------------------------------------------- | --------------------------------------------------- |
| **Maturidade**       | Alpha                                                           | Beta                                                |
| **Engine litúrgico** | Completo (Páscoa, Advento, cores, ciclos A/B/C, nomes em PT-BR) | Completo (portado do web)                           |
| **Dados RCL**        | Ciclos A/B/C completos com textos bíblicos (ARC, ~4337 textos)  | Mesmos dados (JSONs copiados)                       |
| **Devocionais**      | 2152 orações + meditações (2025–2030)                           | Mesmos dados (JSONs copiados)                       |
| **UI**               | 49 componentes shadcn/ui + devocionais                          | Home, Calendário, Configurações                     |
| **Dados**            | 100% locais (JSONs bundlados, sem backend)                      | Mesmos dados (JSONs copiados)                       |
| **Testes**           | 42 testes (Vitest) — motor litúrgico + utils                    | 38 testes (Vitest) — motor litúrgico                |
| **CI/CD**            | GitHub Actions (lint + typecheck + format + testes)             | GitHub Actions (lint + typecheck + format + testes) |
| **Offline**          | Service Worker com runtime caching + dados estáticos bundlados  | AsyncStorage com TTL 24h + JSONs bundlados          |

## 🗺️ Roadmap

### Curto prazo

- [ ] Conteúdo específico para Semana Santa (Quinta-Feira Santa, Sexta-Feira Santa, Sábado Santo)
- [ ] Adicionar mais testes (rcl-fetcher, cache, devotional-service)
- [ ] Corrigir warnings do ESLint nos hooks

### Médio prazo

- [ ] Notificações push diárias (expo-notifications)
- [ ] Compartilhamento nativo (expo-sharing)
- [ ] Config screen completa (fonte, tema claro/escuro, notificações)
- [ ] Melhorar cobertura de testes (70%+ em src/lib/)

### Longo prazo

- [ ] App mobile completo nas stores (Android + iOS)
- [ ] Suporte a múltiplas traduções bíblicas
- [ ] Widget de tela inicial
- [ ] Favoritos e marcadores

---

## 🏛️ Filosofia: Devoção e Tradição

O **Lecionário** é um convite à oração e reflexão profunda. Inspirado na riqueza da tradição eclesiástica e na piedade cristã reformada, buscamos trazer sobriedade, beleza e propósito ao espaço digital.

- **Fé e Espiritualidade**: Conexão diária com as Escrituras através do Lecionário Comum Revisado (RCL).
- **Estética Clássica**: Um design que evoca bibliotecas ao entardecer, pergaminhos antigos e a sobriedade da liturgia histórica.
- **Excelência Técnica**: Construído com as tecnologias mais modernas para garantir uma experiência fluida, acessível e duradoura.

---

## 📅 Funcionalidades

- **Calendário Litúrgico Dinâmico**: Cálculo automático de estações (Advento, Quaresma, Páscoa) e cores litúrgicas.
- **Ciclos RCL (Ano A, B, C)**: Rotação automática das leituras bíblicas.
- **Temas Sazonais**: A interface reflete visualmente a estação da Igreja.
- **Dados 100% offline**: Todos os textos bíblicos e devocionais embutidos — sem dependência de rede.
- **Cache inteligente**: AsyncStorage no mobile, Service Worker no web.

---

## 🛠️ Tecnologias

### Web (lecionario-web)

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript (strict)
- **Estilização**: Tailwind CSS
- **Componentes**: shadcn/ui + Lucide Icons
- **Dados**: JSON bundlados (sem backend)
- **Estado**: TanStack React Query
- **Testes**: Vitest
- **Infra**: Docker, Husky, GitHub Actions

### Mobile (lecionario-mobile)

- **Framework**: Expo 54 / React Native 0.81
- **Linguagem**: TypeScript
- **Cache**: AsyncStorage
- **Navegação**: Expo Router

---

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```sh
cd lecionario-web
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver o resultado.

### Comandos úteis

```sh
npm run lint         # Verifica código com ESLint
npm run format       # Formata código com Prettier
npm run format:check # Verifica formatação sem alterar
npm run test         # Executa testes (42 testes)
```

### Geração de dados

```sh
# Gerar RCL (se precisar regenerar)
npx tsx scripts/generate-rcl-data.ts

# Popular textos bíblicos
npx tsx scripts/lookup-bible-text.ts

# Gerar devocionais
npx tsx scripts/generate-devotionals.ts
```

---

## 🙏 Oração do Subcriador

> _"Que cada pixel seja intencional, cada palavra seja verdadeira, e cada interface reflita a ordem, a beleza e o propósito do Criador. Que este trabalho seja um ato de adoração, apontando sempre para a Grande Narrativa."_

---

**Licença:** MIT
