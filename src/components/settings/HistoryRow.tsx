import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { DiscountRecord } from '../../storage/history';
import { useTheme } from '../../theme/ThemeProvider';
import { formatDate, formatTime } from '../../utils/format';
import { SignatureView } from '../SignaturePad';
import { Chevron } from './ListRow';

// One saved discount: amount on the left, date centered, time on the right.
// Rows with a signature expand on tap to show it.
export function HistoryRow({
  record,
  expanded,
  onToggle,
  last,
}: {
  record: DiscountRecord;
  expanded: boolean;
  onToggle: () => void;
  last?: boolean;
}) {
  const { colors } = useTheme();
  const hasSignature = record.signature !== null;

  return (
    <Pressable
      onPress={hasSignature ? onToggle : undefined}
      disabled={!hasSignature}
      accessibilityRole={hasSignature ? 'button' : undefined}
      accessibilityHint={hasSignature ? 'Shows the signature' : undefined}
      accessibilityState={hasSignature ? { expanded } : undefined}
      style={[
        styles.record,
        !last && { borderBottomColor: colors.border, borderBottomWidth: StyleSheet.hairlineWidth },
      ]}
    >
      <View style={styles.cells}>
        <Text style={[styles.percent, columns.amount, { color: colors.logoTip }]}>{record.percent}%</Text>
        <Text style={[styles.cell, columns.date, { color: colors.textMuted }]}>{formatDate(record.createdAt)}</Text>
        <Text style={[styles.cell, columns.time, { color: colors.textMuted }]}>{formatTime(record.createdAt)}</Text>
        <View style={columns.chevron}>
          {hasSignature ? <Chevron direction={expanded ? 'down' : 'right'} /> : null}
        </View>
      </View>
      {expanded && record.signature ? (
        <View style={styles.signature}>
          <SignatureView signature={record.signature} />
        </View>
      ) : null}
    </Pressable>
  );
}

export function HistoryColumnTitles() {
  const { colors } = useTheme();
  const title = [styles.columnTitle, { color: colors.textMuted }];
  return (
    <View style={[styles.cells, styles.titles, { backgroundColor: colors.surface }]}>
      <Text style={[title, columns.amount]}>DISCOUNT</Text>
      <Text style={[title, columns.date]}>DATE</Text>
      <Text style={[title, columns.time]}>TIME</Text>
      <View style={columns.chevron} />
    </View>
  );
}

const columns = StyleSheet.create({
  amount: { width: 80 },
  date: { flex: 1, textAlign: 'center' },
  time: { width: 80, textAlign: 'right' },
  chevron: { width: 24, alignItems: 'flex-end' },
});

const styles = StyleSheet.create({
  record: { paddingHorizontal: 16, paddingVertical: 15 },
  cells: { flexDirection: 'row', alignItems: 'center' },
  titles: { paddingHorizontal: 16, paddingVertical: 10 },
  columnTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  percent: { fontSize: 18, fontWeight: '700' },
  cell: { fontSize: 15 },
  signature: { marginTop: 10 },
});
