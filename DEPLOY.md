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
O GitHub Actions roda automaticamente em push para `main`:
- TypeScript check
- ESLint
- Prettier
- Testes (Vitest)
- Docker build

## Estrutura de Portas
| Serviço | Porta |
|---------|-------|
| Web (dev) | 3000 |
| Web (docker) | 3000 |
