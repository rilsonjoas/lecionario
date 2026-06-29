# Lecionário — Tradição e Devoção

> **"A Palavra de Deus para o Povo de Deus"**
> Uma plataforma devocional imersiva que une a tradição litúrgica cristã, a erudição clássica e a excelência técnica do desenvolvimento front-end moderno.

## Estado do Projeto

| Dimensão             | Web                                                             | Mobile                         |
| -------------------- | --------------------------------------------------------------- | ------------------------------ |
| **Maturidade**       | Alpha (~60%)                                                    | Prova de conceito (~10%)       |
| **Engine litúrgico** | Completo (Páscoa, Advento, cores, ciclos A/B/C, nomes em PT-BR) | Inexistente                    |
| **Dados RCL**        | Parcial (Ano C, Advento semanas 1-2)                            | Inexistente                    |
| **UI**               | 49 componentes shadcn/ui + devocionais + admin                  | 1 tela básica sem navegação    |
| **Supabase**         | Cliente + tipos + serviço de dados + migrations                 | Query básica (leituras do dia) |
| **Testes**           | 42 testes (Vitest)                                              | Nenhum                         |
| **CI/CD**            | GitHub Actions (lint + typecheck + format + testes)             | Nenhum                         |
| **Infra**            | Docker, PWA, Error Boundaries, Prettier, Husky                  | Nenhum                         |
| **Offline**          | Service Worker com runtime caching                              | Nenhum                         |
| **Admin**            | Painel com auth, editor, estatísticas                           | Inexistente                    |

## 🗺️ Roadmap

### Curto prazo (dias)

- [ ] Popular dados RCL (Anos A, B, C completos)
- [ ] Adicionar mais testes (serviços Supabase, helpers)
- [ ] Corrigir warnings do ESLint nos hooks

### Médio prazo (semanas)

- [ ] Portar engine litúrgico para o mobile
- [ ] Adicionar navegação e telas no mobile
- [ ] Deploy da web (Vercel ou Docker em produção)
- [ ] Estratégia de cache offline-first no mobile

### Longo prazo (meses)

- [ ] App mobile completo (leituras, orações, meditações, offline)
- [ ] Push notifications para o devocional diário
- [ ] Suporte a múltiplos idiomas
- [ ] Versão Android e iOS nas stores

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
- **Experiência Imersiva**: Tipografia serifada nobre (Cormorant Garamond e EB Garamond) e texturas táteis.

---

## 🛠️ Tecnologias

### Web (lecionario-web)

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript (strict)
- **Estilização**: Tailwind CSS
- **Componentes**: shadcn/ui + Lucide Icons
- **Backend/Dados**: Supabase (PostgreSQL)
- **Estado**: TanStack React Query
- **Testes**: Vitest
- **Infra**: Docker, Husky, GitHub Actions

### Mobile (lecionario-mobile)

- **Framework**: Expo 54 / React Native 0.81
- **Linguagem**: TypeScript
- **Backend/Dados**: Supabase

---

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```sh
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Entre no diretório
cd lecionario/lecionario-web

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### Comandos úteis

```sh
npm run lint         # Verifica código com ESLint
npm run format       # Formata código com Prettier
npm run format:check # Verifica formatação sem alterar
npm run test         # Executa testes (42 testes)
npm run test:watch   # Testes em modo watch
```

### Docker

```sh
cp .env.example .env.local
docker compose up --build
# Acessar em http://localhost:3000
```

---

## 🙏 Oração do Subcriador

> _"Que cada pixel seja intencional, cada palavra seja verdadeira, e cada interface reflita a ordem, a beleza e o propósito do Criador. Que este trabalho seja um ato de adoração, apontando sempre para a Grande Narrativa."_

---

**Licença:** MIT
