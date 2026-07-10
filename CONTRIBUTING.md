# Contribuindo com o Lecionário

Obrigado pelo interesse em contribuir! Este documento contém as diretrizes para contribuir com o projeto.

## Código de Conduta

Este projeto segue o [Código de Conduta](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) do Contributor Covenant. Ao participar, você concorda em mantê-lo.

## Começando

### Pré-requisitos

- Node.js 22+
- npm

### Setup

```sh
git clone <URL_DO_REPOSITORIO>
cd lecionario

# Instalar dependências (raiz + subprojetos)
npm install
cd lecionario-web && npm install
cd ../lecionario-mobile && npm install

# Configurar variáveis de ambiente
cd lecionario-web && cp .env.example .env.local
```

## Desenvolvimento

### Commits

- Use mensagens claras e descritivas em português ou inglês
- Prefixos sugeridos: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `style:`, `test:`
- Exemplo: `feat: adiciona cálculo de data da Páscoa`

### Antes de commitar

O projeto usa **husky** + **lint-staged** para rodar automaticamente:

1. **Prettier** — formatação de código
2. **ESLint** — verificação de qualidade

Se o commit falhar, corrija os erros apontados e tente novamente.

```sh
# Verificar manualmente antes de commitar
npm run lint
npm run format:check
```

## Estrutura do Projeto

```
lecionario-web/        # Web app (Next.js 14 PWA)
  src/
    app/               # Páginas e rotas
    components/        # Componentes React
    lib/               # Utilitários e serviços
    types/             # Definições TypeScript
    data/              # Dados RCL e devocionais
    hooks/             # Hooks personalizados
  supabase/
    migrations/        # Migrações do banco

lecionario-mobile/     # Mobile app (Expo/React Native)
```

## Pull Requests

1. Crie um branch a partir de `main`: `git checkout -b feat/nome-da-feature`
2. Faça commits pequenos e atômicos
3. Mantenha o PR focado em uma única mudança
4. Atualize o CHANGELOG.md se necessário
5. Abra o PR com uma descrição clara do que foi feito e por quê
