import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { CustomDiscountSheet } from '../components/CustomDiscountSheet';
import { DiscountButton } from '../components/DiscountButton';
import { LockIcon } from '../components/LockIcon';
import { WaiterScreen } from '../components/WaiterScreen';
import { useSaveDiscount } from '../hooks/useSaveDiscount';
import { useSettings } from '../settings/SettingsProvider';
import { useTheme } from '../theme/ThemeProvider';

export default function WelcomeScreen() {
  const { colors } = useTheme();
  const { settings } = useSettings();
  const saveDiscount = useSaveDiscount();
  const [customOpen, setCustomOpen] = useState(false);

  const choose = (percent: number) => {
    if (settings.requireSignature) {
      router.push({ pathname: '/signature', params: { percent: String(percent) } });
    } else {
      saveDiscount(percent, null);
    }
  };

  const [first, second, third, fourth] = settings.discounts;

  return (
    <WaiterScreen
      footer={
        <Text style={[styles.footer, { color: colors.textMuted }]}>
          *By selecting a discount you agree to the{' '}
          <Text
            style={[styles.footerLink, { color: colors.primary }]}
            onPress={() => router.push('/terms')}
            accessibilityRole="link"
          >
            Terms
          </Text>
        </Text>
      }
    >
      <View style={styles.body}>
        <Text style={[styles.title, { color: colors.text }]}>{settings.welcomeMessage}</Text>

        <View style={styles.row}>
          <DiscountButton percent={first} onSelect={() => choose(first)} />
          <DiscountButton percent={second} onSelect={() => choose(second)} />
        </View>
        <View style={styles.row}>
          <DiscountButton percent={third} onSelect={() => choose(third)} />
          {settings.allowCustom ? (
            <DiscountButton percent="custom" onSelect={() => setCustomOpen(true)} />
          ) : (
            <DiscountButton percent={fourth} onSelect={() => choose(fourth)} />
          )}
        </View>

        {settings.allowNoDiscount ? (
          <Button
            label="No discount"
            variant="secondary"
            onPress={() => router.push('/are-you-sure')}
          />
        ) : (
          <Button
            label="No discount"
            variant="secondary"
            disabled
            accessory={
              <View style={styles.lock}>
                <LockIcon color={colors.onDisabled} />
              </View>
            }
          />
        )}
      </View>

      <CustomDiscountSheet
        visible={customOpen}
        onClose={() => setCustomOpen(false)}
        onContinue={(percent) => {
          setCustomOpen(false);
          choose(percent);
        }}
      />
    </WaiterScreen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, justifyContent: 'center', gap: 14, paddingBottom: 40 },
  title: { fontSize: 32, fontWeight: '700', lineHeight: 38, marginBottom: 14, paddingHorizontal: 8 },
  row: { flexDirection: 'row', gap: 14 },
  lock: { position: 'absolute', right: 16 },
  footer: { fontSize: 13, paddingHorizontal: 12, paddingBottom: 6 },
  footerLink: { textDecorationLine: 'underline' },
});
