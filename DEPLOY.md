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

### Vercel
```bash
# Instalar CLI
npm i -g vercel

# Deploy
cd lecionario-web
vercel --prod
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
