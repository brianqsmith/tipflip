import { setAudioModeAsync } from 'expo-audio';
import { useKeepAwake } from 'expo-keep-awake';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SettingsProvider } from '../settings/SettingsProvider';
import { DATABASE_NAME, migrate } from '../storage/history';
import { ThemeProvider, useTheme } from '../theme/ThemeProvider';

function RootStack() {
  const { scheme, colors } = useTheme();
  // The screen stays on while the app is open; the phone's normal sleep
  // returns as soon as the app is left.
  useKeepAwake();

  useEffect(() => {
    // The ding follows the phone's silent switch.
    setAudioModeAsync({ playsInSilentMode: false });
  }, []);

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          // No swipe-back on waiter screens; Settings and Terms turn it back on.
          gestureEnabled: false,
          // Pages change instantly, with no transition.
          animation: 'none',
        }}
      >
        <Stack.Screen name="terms" options={{ gestureEnabled: true }} />
        <Stack.Screen name="settings" options={{ gestureEnabled: true }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrate}>
        <SettingsProvider>
          <ThemeProvider>
            <RootStack />
          </ThemeProvider>
        </SettingsProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
