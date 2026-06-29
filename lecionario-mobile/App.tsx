import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '@/screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#2C1810',
            borderTopColor: 'rgba(184,134,11,0.3)',
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarActiveTintColor: '#B8860B',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
          tabBarLabelStyle: {
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontWeight: '600',
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
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-month-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Config"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
