import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { WaiterScreen } from '../components/WaiterScreen';
import { useResetToWelcome } from '../hooks/useResetToWelcome';
import { useSettings } from '../settings/SettingsProvider';
import { useTheme } from '../theme/ThemeProvider';

export default function AreYouSureScreen() {
  const { colors } = useTheme();
  const { settings } = useSettings();
  const backToWelcome = useResetToWelcome();

  // "No discount" outcomes are never saved to History.
  const confirmNoDiscount = () => {
    router.replace(settings.requireHumanCheck ? '/are-you-human' : '/thank-you');
  };

  return (
    <WaiterScreen>
      <View style={styles.body}>
        <Text style={[styles.eyebrow, { color: colors.textMuted }]}>NO DISCOUNT SELECTED</Text>
        <Text style={[styles.title, { color: colors.primary }]}>Are you sure?</Text>
        <Text style={[styles.message, { color: colors.text }]}>{settings.noDiscountMessage}</Text>
        <Button label="Give a discount" onPress={backToWelcome} style={styles.first} />
        <Button label="No discount" variant="secondary" onPress={confirmNoDiscount} />
      </View>
    </WaiterScreen>
  );
}

const styles = StyleSheet.create({
  body: { paddingTop: 56, gap: 14 },
  eyebrow: { fontSize: 14, fontWeight: '700', letterSpacing: 2, textAlign: 'center' },
  title: { fontSize: 34, fontWeight: '500', textAlign: 'center' },
  message: { fontSize: 20, lineHeight: 27, paddingHorizontal: 4 },
  first: { marginTop: 22 },
});
