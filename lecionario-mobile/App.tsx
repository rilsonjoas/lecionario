import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppState } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import type { LinkingOptions } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Lora_400Regular,
  Lora_400Regular_Italic,
  Lora_600SemiBold_Italic,
  Lora_700Bold,
} from '@expo-google-fonts/lora';
import * as Sentry from '@sentry/react-native';
import ErrorBoundary from '@/components/ErrorBoundary';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { ThemeProvider, useThemeColors } from '@/contexts/ThemeContext';
import { FontProvider } from '@/contexts/FontContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { addNotificationResponseListener, renewNotificationsWindow } from '@/lib/notifications';
import HomeScreen from '@/screens/HomeScreen';
import CalendarScreen from '@/screens/CalendarScreen';
import SearchScreen from '@/screens/SearchScreen';
import FavoritesScreen from '@/screens/FavoritesScreen';
import ConfigScreen from '@/screens/ConfigScreen';
import type { RootTabParamList } from '@/types';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  tracesSampleRate: __DEV__ ? 1.0 : 0.1,
  debug: __DEV__,
  environment: __DEV__ ? 'development' : 'production',
});

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator<RootTabParamList>();

const linking: LinkingOptions<RootTabParamList> = {
  prefixes: ['lecionario://'],
  config: {
    screens: {
      Hoje: 'dia/:date',
      Calendário: 'calendario',
      Busca: 'busca',
      Favoritos: 'favoritos',
      Config: 'config',
    },
  },
};

function AppTabs() {
  const colors = useThemeColors();

  return (
    <>
      <StatusBar style={colors.statusBar} />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false, // só ícones (apontamento do autor)
          tabBarStyle: {
            backgroundColor: colors.tabBarBg,
            borderTopColor: colors.tabBarBorder,
            borderTopWidth: 0.5,
            paddingBottom: 8,
            paddingTop: 8,
            height: 56,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarItemStyle: {
            minHeight: 44,
            justifyContent: 'center',
          },
        }}
      >
        <Tab.Screen
          name="Hoje"
          component={HomeScreen}
          options={{
            tabBarAccessibilityLabel: 'Devocional de hoje',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book-open-variant" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendário"
          component={CalendarScreen}
          options={{
            tabBarAccessibilityLabel: 'Calendário litúrgico',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-month-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Busca"
          component={SearchScreen}
          options={{
            tabBarAccessibilityLabel: 'Buscar devocionais',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={FavoritesScreen}
          options={{
            tabBarAccessibilityLabel: 'Dias favoritados',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="heart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Config"
          component={ConfigScreen}
          options={{
            tabBarAccessibilityLabel: 'Configurações',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

function NotificationHandler() {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  useEffect(() => {
    const sub = addNotificationResponseListener((date) => {
      navigation.navigate('Hoje', { date });
    });

    // Renova a janela rolante de notificações: ao abrir o app e sempre
    // que voltar ao primeiro plano. Trigger `DAILY` re-exibia payload
    // estático; notificações por data precisam de re-agendamento.
    renewNotificationsWindow();
    const appStateSub = AppState.addEventListener('change', (state) => {
      if (state === 'active') renewNotificationsWindow();
    });

    return () => {
      sub.remove();
      appStateSub.remove();
    };
  }, [navigation]);

  return null;
}

function App() {
  const [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_400Regular_Italic,
    Lora_600SemiBold_Italic,
    Lora_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <SettingsProvider>
          <ThemeProvider>
            <FontProvider>
              <FavoritesProvider>
                <NavigationContainer linking={linking}>
                  <NotificationHandler />
                  <AppTabs />
                </NavigationContainer>
              </FavoritesProvider>
            </FontProvider>
          </ThemeProvider>
        </SettingsProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(App);
