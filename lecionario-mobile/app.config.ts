import type { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'Lecionário',
  slug: 'lecionario-mobile',
  version: '1.0.0',
  scheme: 'lecionario',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#F5F1E8',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.narniano.lecionario',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#F5F1E8',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: 'com.narniano.lecionario',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    eas: {
      projectId: 'facfcf98-08ee-4d11-b492-5528b3e0e1e1',
    },
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  updates: {
    url: 'https://u.expo.dev/facfcf98-08ee-4d11-b492-5528b3e0e1e1',
  },
  plugins: [
    [
      '@sentry/react-native/expo',
      {
        url: 'https://sentry.io/',
        project: 'lecionario-mobile',
        organization: 'rilson',
      },
    ],
  ],
};

export default config;
