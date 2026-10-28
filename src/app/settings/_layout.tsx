import { Stack } from 'expo-router';

import { useTheme } from '../../theme/ThemeProvider';

// Settings pages use normal back navigation, including the swipe-back gesture.
export default function SettingsLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'none',
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
