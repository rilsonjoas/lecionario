# Deploy

## Web (Next.js)

### Pré-requisitos
- Node.js 22+
- Docker (opcional)

### Docker (recomendado)
```bash
cd lecionario-web

# Build
npm run docker:build

# Run
npm run docker:run
# Acessar em http://localhost:3000

# Ou com docker-compose (da raiz do monorepo)
docker compose up -d
```

### Self-hosted
```bash
cd lecionario-web
npm ci --legacy-peer-deps
npm run build
npm start
```

## Mobile (Expo/React Native)

### Pré-requisitos
- Node.js 22+
- EAS CLI: `npm i -g eas-cli`
- Conta Expo: `npx expo login`

### Desenvolvimento rápido (Expo Go)
```bash
cd lecionario-mobile
npm install
npx expo start
# Escanear QR com o app Expo Go no celular
```

### Build de desenvolvimento (dispositivo físico ou emulador)
```bash
cd lecionario-mobile
npx eas build --profile development --platform android
```

> **Se o build falhar com `NoSuchMethodError` (`getDirectConverter`):**
> Isso indica incompatibilidade entre a versão JS e a nativa compilada pelo EAS.
> Corrija com:
> ```bash
> npx expo install expo@~54.0.35 expo-dev-client@~6.0.21
> eas build --profile development --platform android --clear-cache
> ```

### Build Android (APK/AAB para distribuição interna)
```bash
cd lecionario-mobile
npx eas build --platform android --profile preview
```

### Publicar na Play Store
```bash
npx eas build --platform android --profile production
npx eas submit --platform android
```

### OTA Update (sem rebuild nativo)
```bash
npx eas update --branch production --message "descrição da mudança"
```

### APK novo ou OTA? (REGRA OPERACIONAL — leia antes de mexer)

A cota de build da Expo é limitada. **OTA cobre ~95% das mudanças.**

| Mudança | O que fazer |
|---|---|
| Código JS/TS (`src/**`), textos, telas, estilos | **Nada — OTA automático** via push em `main` |
| Nova **dependency de runtime** no `package.json` (ex.: `expo-clipboard`, `@sentry/react-native`) | **APK novo necessário** (código nativo!) — build dispara sozinho via `package-lock.json`, ou rode `eas build -p android --profile preview` |
| Plugin/permissão no `app.config.ts`, `eas.json` | **APK novo** — dispara sozinho |
| Upgrade do Expo SDK | **APK novo** + revisar breaking changes |
| Ícone/splash nativos, `android/**` | **APK novo** |
| devDependency, script, config ESLint/Prettier/lint-staged | Nada — nem OTA, nem build |

**Como o CI decide sozinho:** `package.json` saiu dos gatilhos de build
(2026-08-22). O sinal de dependência real é o `package-lock.json`, e um
porteiro no workflow confere se o bloco `dependencies` (runtime) mudou
entre commits — só devDep/config não constrói. Disparo manual
(`workflow_dispatch` na aba Actions) sempre constrói.

#### Incidentes registrados (pra nunca mais repetir)

1. **2026-08-21** — `SENTRY_AUTH_TOKEN` não encontrado no Gradle: env vars
   de secrets do GitHub não chegam no container remoto da Expo; cadastre
   como EAS Environment Variables (`eas env:list preview`).
2. **2026-08-22 (manhã)** — push com código mobile quebrou CI por Prettier
   e EAS por caminho errado de asset:
   - **Prettier**: arquivos novos precisam `npx prettier --write` ANTES
     do commit. O pre-commit rodava lint-staged só no web — corrigido
     pra cobrir os dois apps (`.husky/pre-commit`).
   - **Caminho de asset**: `tsc` NÃO valida caminhos dentro de
     `require('*.png')`; só o bundler (expo export / eas update) pega.
     De `src/screens/`, assets em `src/assets/**` são `'../assets/...'`
     (um nível), não `'../../assets/...'` (que aponta pra raiz).
3. **2026-08-22 (tarde)** — config de dev tooling no package.json disparou
   build nativo completo à toa: gatilhos refeitos conforme a tabela
   acima + porteiro de `dependencies`.

## CI/CD
O GitHub Actions roda automaticamente em push para `main` e em pull request (`ci.yml`):
- TypeScript check
- ESLint
- Prettier
- Testes (Vitest)
- Validação de conteúdo (repetição, lacunas, cobertura ARC)
- Auditoria de dependências de produção com allowlist (`scripts/audit-allowlist.mjs`)
- E2E de acessibilidade (Playwright + axe-core, 5 rotas, tema claro e escuro)
- Docker build

## Deploy do web na VPS (Hetzner)

O push em `main` dispara `deploy.yml`, que publica em `lecionario.narniano.com`.
Só a `main` faz deploy; pull request roda o CI mas nunca publica.

1. **`verify`**: typecheck, lint, testes dos dois apps (inclusive com
   `NODE_ENV=production` herdado, de propósito) e e2e. Se falhar, nada vai
   para a VPS.
2. **`deploy`**, só depois do `verify`:
   - aborta se a `main` avançou durante a verificação (publicaria código que
     não foi testado);
   - entra na VPS por SSH com **`set -e`**: qualquer comando que falhe aborta
     o deploy. Os `prune` finais são a exceção (`|| true`);
   - guarda de disco (aborta com a raiz em 90% ou mais), `git pull
     --ff-only` e `make deploy service=lecionario` no `~/hetzner-infra`.
3. **Smoke test** em `https://lecionario.narniano.com/`.

### Cuidados (incidente de 2026-10-16)

- **O build roda dentro da VPS, que tem 4 GB de RAM.** O build do Lecionário é
  o mais pesado: em 16/10 deixou só **315 MB livres**. Dois builds juntos
  travaram a máquina inteira. Por isso o `make deploy` usa uma **trava global
  (`flock`)**: um deploy espera o outro, mesmo de repos diferentes. Registro
  completo em `INCIDENTES.md` do `hetzner-infra`.
- **Workflow verde não prova deploy.** Antes do `set -e`, um build que falhava
  deixava o passo terminar `success`. Para ter certeza de que subiu código
  novo, confira a data do container:
  `ssh <vps> "docker inspect lecionario-web -f '{{.Created}}'"`.
- **Evite empurrar para a `main` com a VPS ocupada** (outro deploy em
  andamento ou `free -m` com menos de ~1 GB disponível).
- **Merge de PR na `main` é um deploy**, a não ser que só mude `*.md` ou
  `docs/**` (o `deploy.yml` ignora esses caminhos). Mudar lockfile, workflow
  ou código rebuilda a imagem.

## Estrutura de Portas
| Serviço | Porta |
|---------|-------|
| Web (dev) | 3000 |
| Web (docker) | 3000 |
