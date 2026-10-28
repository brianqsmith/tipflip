import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.primary }]}>{title}</Text>
      <View style={[styles.group, { backgroundColor: colors.background, borderColor: colors.border }]}>
        {children}
      </View>
    </View>
  );
}

export function Chevron({ direction = 'right' }: { direction?: 'right' | 'down' }) {
  const { colors } = useTheme();
  return (
    <Text
      style={[styles.chevron, { color: colors.onDisabled }, direction === 'down' && styles.down]}
      importantForAccessibility="no"
    >
      ›
    </Text>
  );
}

export function ListRow({
  label,
  onPress,
  accessory,
  right,
  last,
}: {
  label: string;
  onPress?: () => void;
  accessory?: ReactNode;
  right?: ReactNode;
  last?: boolean;
}) {
  const { colors } = useTheme();
  const divider = !last && { borderBottomColor: colors.border, borderBottomWidth: StyleSheet.hairlineWidth };
  const content = (
    <>
      <View style={styles.labelWrap}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {accessory}
      </View>
      {right ?? (onPress ? <Chevron /> : null)}
    </>
  );

  // Rows without an action (like the Dark mode toggle row) are plain views so
  // the control inside them stays usable.
  if (!onPress) return <View style={[styles.row, divider]}>{content}</View>;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, divider, pressed && { backgroundColor: colors.surface }]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 22 },
  sectionTitle: { fontSize: 14, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8, marginHorizontal: 4 },
  group: { borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingHorizontal: 16,
  },
  labelWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  label: { fontSize: 17 },
  chevron: { fontSize: 26, lineHeight: 28, marginLeft: 8 },
  down: { transform: [{ rotate: '90deg' }] },
});
