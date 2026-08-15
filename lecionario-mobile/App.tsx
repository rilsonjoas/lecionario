import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import type { LinkingOptions } from '@react-navigation/native';
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
import HomeScreen from '@/screens/HomeScreen';
import CalendarScreen from '@/screens/CalendarScreen';
import ConfigScreen from '@/screens/ConfigScreen';
import type { RootTabParamList } from '@/types';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  // Em produção usa amostragem menor pra não estourar a cota.
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
      Config: 'config',
    },
  },
};

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
        <NavigationContainer linking={linking}>
          <StatusBar style="light" />
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: '#1A1A1A',
                borderTopColor: 'rgba(184,134,11,0.2)',
                borderTopWidth: 0.5,
                paddingBottom: 8,
                paddingTop: 8,
                height: 60,
                elevation: 0,
                shadowOpacity: 0,
              },
              tabBarActiveTintColor: '#B8860B',
              tabBarInactiveTintColor: 'rgba(255,255,255,0.35)',
              tabBarLabelStyle: {
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontWeight: '600',
              },
              tabBarItemStyle: {
                minHeight: 48,
              },
            }}
          >
            <Tab.Screen
              name="Hoje"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="book-open-variant" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Calendário"
              component={CalendarScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="calendar-month-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Config"
              component={ConfigScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="cog-outline" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(App);
