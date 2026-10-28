import { StyleSheet, Text, View } from 'react-native';

import { FieldLabel, TextArea, ToggleRow } from '../../components/settings/controls';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { LIMITS } from '../../settings/defaults';
import { useSettings } from '../../settings/SettingsProvider';
import { useTheme } from '../../theme/ThemeProvider';

export default function SignatureSettings() {
  const { colors } = useTheme();
  const { settings, updateSettings } = useSettings();

  return (
    <SettingsPage
      title="Signature screen"
      description="Choose whether to require a signature from the waiter or not. A signature increases the chance of actually getting the discount."
    >
      <ToggleRow
        label="Require a signature"
        description="When turned on, the waiter is asked to sign their name after selecting a discount."
        value={settings.requireSignature}
        onValueChange={(requireSignature) => updateSettings({ requireSignature })}
      />

      <FieldLabel
        label="Message for the waiter"
        description="This is the text that appears directly below the signature pad."
      />
      <TextArea
        label="Message for the waiter"
        value={settings.signatureMessage}
        onChangeText={(signatureMessage) => updateSettings({ signatureMessage })}
        limit={LIMITS.signatureMessage}
      />

      <View style={[styles.preview, { backgroundColor: colors.surface }]}>
        <Text style={[styles.previewLabel, { color: colors.textMuted }]}>PREVIEW</Text>
        <View style={[styles.pad, { backgroundColor: colors.secondary, borderBottomColor: colors.textMuted }]}>
          <Text style={[styles.padText, { color: colors.onDisabled }]}>Sign here</Text>
        </View>
        <Text style={[styles.previewMessage, { color: colors.text }]}>{settings.signatureMessage}</Text>
      </View>
    </SettingsPage>
  );
}

const styles = StyleSheet.create({
  preview: { borderRadius: 14, padding: 16, marginTop: 20, gap: 10 },
  previewLabel: { fontSize: 13, fontWeight: '700', letterSpacing: 1, textAlign: 'center' },
  pad: { height: 90, borderRadius: 8, borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center' },
  padText: { fontSize: 17 },
  previewMessage: { fontSize: 15, lineHeight: 21 },
});
