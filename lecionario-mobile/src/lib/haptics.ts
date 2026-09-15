import { Vibration, Platform } from 'react-native';

/**
 * Utilitário de feedback tátil (haptics) leve para interações.
 * Usa Vibration nativo do React Native com durações mínimas (10-25ms)
 * para sensação sutil de clique sem exigir dependências nativas extras (100% OTA-safe).
 */
export const triggerHaptic = (type: 'light' | 'medium' | 'selection' = 'light') => {
  if (Platform.OS === 'web') return;
  try {
    switch (type) {
      case 'light':
        Vibration.vibrate(10);
        break;
      case 'selection':
        Vibration.vibrate(15);
        break;
      case 'medium':
        Vibration.vibrate(25);
        break;
    }
  } catch {
    // Ignora silenciosamente caso o dispositivo ou ambiente não suporte vibração
  }
};
