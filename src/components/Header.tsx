import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { useResetToWelcome } from '../hooks/useResetToWelcome';
import { useTheme } from '../theme/ThemeProvider';
import { Logo } from './Logo';

export function Header() {
  const { colors } = useTheme();
  const resetToWelcome = useResetToWelcome();

  return (
    <View style={styles.header}>
      <Pressable
        onPress={resetToWelcome}
        accessibilityRole="button"
        accessibilityLabel="tipflip, start over"
        hitSlop={8}
      >
        <Logo height={34} />
      </Pressable>
      <Pressable
        onPress={() => router.push('/settings')}
        accessibilityRole="button"
        accessibilityLabel="Settings and history"
        hitSlop={12}
        style={styles.menu}
      >
        {[0, 1].map((line) => (
          <View key={line} style={[styles.menuLine, { backgroundColor: colors.textMuted }]} />
        ))}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
  },
  menu: { gap: 8, paddingVertical: 8, paddingLeft: 12 },
  menuLine: { width: 30, height: 4, borderRadius: 2 },
});
