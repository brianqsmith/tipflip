import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DISCOUNT_MAX, DISCOUNT_MIN, DISCOUNT_STEP } from '../../settings/defaults';
import { useTheme } from '../../theme/ThemeProvider';

export function Stepper({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) {
  const { colors } = useTheme();
  const step = (delta: number) =>
    onChange(Math.min(DISCOUNT_MAX, Math.max(DISCOUNT_MIN, value + delta)));

  const square = (symbol: string, delta: number, name: string) => {
    const blocked = disabled || (delta < 0 ? value <= DISCOUNT_MIN : value >= DISCOUNT_MAX);
    return (
      <Pressable
        onPress={() => step(delta)}
        disabled={blocked}
        accessibilityRole="button"
        accessibilityLabel={`${name} ${label}`}
        style={({ pressed }) => [
          styles.square,
          { borderColor: colors.border, backgroundColor: colors.background },
          pressed && { backgroundColor: colors.surface },
          blocked && styles.blocked,
        ]}
      >
        <Text style={[styles.symbol, { color: colors.primary }]}>{symbol}</Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.row, { borderBottomColor: colors.border }, disabled && styles.disabled]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View style={styles.controls}>
        {square('−', -DISCOUNT_STEP, 'Decrease')}
        <View style={[styles.value, { borderColor: colors.border }]}>
          <Text style={[styles.valueText, { color: colors.logoTip }]}>{value}%</Text>
        </View>
        {square('+', DISCOUNT_STEP, 'Increase')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  disabled: { opacity: 0.4 },
  label: { fontSize: 17, fontWeight: '600' },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  square: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blocked: { opacity: 0.4 },
  symbol: { fontSize: 22, lineHeight: 24 },
  value: { minWidth: 70, height: 50, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  valueText: { fontSize: 20, fontWeight: '700' },
});
