import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { LanguageProvider } from '@/components/language-context';



const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
    error: '#b00020',
    background: '#ffffff',
  },
};
export default function TabLayout() {
  return (
    <LanguageProvider>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="phone-verification" />
          <Stack.Screen
            name="create-kameeti"
            options={{
              headerShown: true,
              title: 'Create New Kameeti',
              headerStyle: {
                backgroundColor: '#6200ee',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="join-kameeti"
            options={{
              headerShown: true,
              title: 'Join Kameeti',
              headerStyle: {
                backgroundColor: '#6200ee',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="profile-setup"
            options={{
              headerShown: true,
              title: 'Complete Profile',
              headerStyle: {
                backgroundColor: '#6200ee',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="payments-history"
            options={{
              headerShown: true,
              title: 'Payments History',
              headerStyle: {
                backgroundColor: '#6200ee',
              },
              headerTintColor: '#fff',
            }}
          />

        </Stack>
      </PaperProvider>
    </LanguageProvider>
  );
}
