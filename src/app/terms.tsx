import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { Button } from '../components/Button';
import { WaiterScreen } from '../components/WaiterScreen';
import { useSettings } from '../settings/SettingsProvider';
import { useTheme } from '../theme/ThemeProvider';

// The diner's own terms for the waiter, written in Settings.
export default function TermsScreen() {
  const { colors } = useTheme();
  const { settings } = useSettings();

  return (
    <WaiterScreen>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={[styles.title, { color: colors.text }]}>Terms of Use</Text>
        <Text style={[styles.terms, { color: colors.text }]}>{settings.terms}</Text>
        <Button label="Continue" onPress={() => router.back()} style={styles.continue} />
      </ScrollView>
    </WaiterScreen>
  );
}

const styles = StyleSheet.create({
  body: { paddingTop: 40, paddingBottom: 24 },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  terms: { fontSize: 16, lineHeight: 23 },
  continue: { marginTop: 32 },
});
