import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';

type Variant = 'primary' | 'secondary';

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  looksDisabled = disabled,
  style,
  accessory,
}: {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  // Lets a button look disabled while still reacting to taps, e.g. to shake a
  // wrong answer.
  looksDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessory?: ReactNode;
}) {
  const { colors } = useTheme();
  const isPrimary = variant === 'primary';

  const background = looksDisabled
    ? colors.disabled
    : isPrimary
      ? colors.primary
      : colors.secondary;
  const foreground = looksDisabled
    ? colors.onDisabled
    : isPrimary
      ? colors.onPrimary
      : colors.onSecondary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: looksDisabled }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: background },
        !isPrimary && !looksDisabled && [styles.secondary, { borderColor: colors.border, shadowColor: colors.shadow }],
        looksDisabled && { borderColor: colors.border, borderWidth: StyleSheet.hairlineWidth },
        pressed && !looksDisabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, { color: foreground }]}>{label}</Text>
      {accessory}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  secondary: {
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  label: { fontSize: 19, fontWeight: '600' },
});
