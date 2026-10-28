import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';

// The blue pill toggle used on every Settings page.
export function Toggle({
  value,
  onValueChange,
  disabled,
  label,
}: {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  const { colors } = useTheme();
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: colors.border, true: colors.primary }}
      ios_backgroundColor={colors.border}
      thumbColor="#FFFFFF"
      accessibilityLabel={label}
      style={disabled ? styles.dimmed : undefined}
    />
  );
}

export function ToggleRow({
  label,
  description,
  value,
  onValueChange,
  disabled,
}: {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.toggleRow, disabled && styles.dimmed]}>
      <View style={styles.flex}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {description ? <Text style={[styles.help, { color: colors.textMuted }]}>{description}</Text> : null}
      </View>
      <Toggle value={value} onValueChange={onValueChange} disabled={disabled} label={label} />
    </View>
  );
}

export function FieldLabel({
  label,
  description,
  action,
}: {
  label: string;
  description?: string;
  action?: ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.fieldLabel}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {action}
      </View>
      {description ? <Text style={[styles.help, { color: colors.textMuted }]}>{description}</Text> : null}
    </View>
  );
}

// A multi-line text box with a live "count / limit" in the corner.
export function TextArea({
  value,
  onChangeText,
  limit,
  label,
  heading,
  disabled,
  minHeight = 120,
}: {
  value: string;
  onChangeText: (text: string) => void;
  limit: number;
  label: string;
  heading?: string;
  disabled?: boolean;
  minHeight?: number;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.textArea,
        { borderColor: colors.border, backgroundColor: colors.background },
        disabled && styles.dimmed,
      ]}
    >
      {heading ? <Text style={[styles.heading, { color: colors.primary }]}>{heading}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        maxLength={limit}
        multiline
        editable={!disabled}
        style={[styles.input, { color: colors.text, minHeight }]}
        accessibilityLabel={label}
        textAlignVertical="top"
      />
      <Text style={[styles.count, { color: colors.textMuted }]}>
        {value.length} / {limit}
      </Text>
    </View>
  );
}

export function TextAction({ label, onPress }: { label: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} hitSlop={10} accessibilityRole="button">
      <Text style={[styles.action, { color: colors.primary }]}>{label}</Text>
    </Pressable>
  );
}

export function Divider() {
  const { colors } = useTheme();
  return <View style={[styles.divider, { backgroundColor: colors.border }]} />;
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  dimmed: { opacity: 0.45 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 14 },
  label: { fontSize: 17, fontWeight: '600' },
  help: { fontSize: 14, lineHeight: 19, marginTop: 3 },
  fieldLabel: { paddingTop: 14, paddingBottom: 10 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textArea: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingTop: 10, paddingBottom: 8 },
  heading: { fontSize: 14, fontWeight: '600', textAlign: 'center', marginBottom: 2 },
  input: { fontSize: 17, lineHeight: 23, padding: 0 },
  count: { fontSize: 13, textAlign: 'right', marginTop: 6 },
  action: { fontSize: 17, fontWeight: '600' },
  divider: { height: StyleSheet.hairlineWidth, marginVertical: 14 },
});
