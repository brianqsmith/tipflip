import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBlockBack } from '../hooks/useWaiterScreen';
import { useTheme } from '../theme/ThemeProvider';
import { Header } from './Header';

// The frame for every screen the waiter sees: logo and menu on top, back
// navigation blocked.
export function WaiterScreen({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  const { colors } = useTheme();
  useBlockBack();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.inner}>
        <Header />
        <View style={styles.content}>{children}</View>
      </View>
      {footer}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 20 },
  content: { flex: 1 },
});
