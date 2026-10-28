import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Logo } from '../components/Logo';
import { useTheme } from '../theme/ThemeProvider';

// Phase 1 placeholder for the welcome screen. It shows the logo, colors and
// both themes on a real phone; the discount buttons arrive in phase 2.
export default function WelcomeScreen() {
  const { scheme, colors, setDarkMode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Logo height={36} />
      </View>

      <View style={styles.body}>
        <Text style={[styles.title, { color: colors.text }]}>Please select a customer discount</Text>
        <View style={[styles.sampleButton, { backgroundColor: colors.primary }]}>
          <Text style={[styles.sampleButtonText, { color: colors.onPrimary }]}>20%</Text>
        </View>
        <Text style={[styles.note, { color: colors.textMuted }]}>
          Discount buttons are coming in the next build.
        </Text>
      </View>

      <View style={[styles.previewRow, { borderColor: colors.border, backgroundColor: colors.surface }]}>
        <Text style={[styles.previewLabel, { color: colors.text }]}>Preview dark mode</Text>
        <Switch
          value={scheme === 'dark'}
          onValueChange={setDarkMode}
          trackColor={{ true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  header: { alignItems: 'center', paddingTop: 12, paddingBottom: 24 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 },
  title: { fontSize: 26, fontWeight: '700', textAlign: 'center' },
  sampleButton: {
    width: 150,
    height: 110,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sampleButtonText: { fontSize: 34, fontWeight: '700' },
  note: { fontSize: 16, textAlign: 'center' },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  previewLabel: { fontSize: 17, fontWeight: '600' },
});
