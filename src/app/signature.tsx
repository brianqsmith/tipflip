import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { SignaturePad, type SignaturePadHandle } from '../components/SignaturePad';
import { WaiterScreen } from '../components/WaiterScreen';
import { useSaveDiscount } from '../hooks/useSaveDiscount';
import { useSettings } from '../settings/SettingsProvider';
import { useTheme } from '../theme/ThemeProvider';

// The selected amount is deliberately not shown here.
export default function SignatureScreen() {
  const { colors } = useTheme();
  const { settings } = useSettings();
  const { percent } = useLocalSearchParams<{ percent: string }>();
  const saveDiscount = useSaveDiscount();
  const pad = useRef<SignaturePadHandle>(null);
  const [hasInk, setHasInk] = useState(false);
  const [saving, setSaving] = useState(false);

  const done = async () => {
    const signature = pad.current?.getSignature();
    if (!signature || saving) return;
    setSaving(true);
    await saveDiscount(Number(percent), signature);
  };

  return (
    <WaiterScreen>
      <View style={styles.body}>
        <View style={styles.labelRow}>
          <Text style={[styles.label, { color: colors.text }]}>Sign below</Text>
          <Pressable onPress={() => pad.current?.clear()} hitSlop={12} accessibilityRole="button">
            <Text style={[styles.clear, { color: colors.primary }]}>Clear</Text>
          </Pressable>
        </View>

        <SignaturePad ref={pad} onChange={setHasInk} />

        <Text style={[styles.message, { color: colors.text }]}>{settings.signatureMessage}</Text>

        <Button label="Done signing" disabled={!hasInk || saving} onPress={done} />
      </View>
    </WaiterScreen>
  );
}

const styles = StyleSheet.create({
  body: { paddingTop: 48, gap: 14 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 19, fontWeight: '600' },
  clear: { fontSize: 17, fontWeight: '600' },
  message: { fontSize: 16, lineHeight: 22, paddingHorizontal: 8, marginBottom: 12 },
});
