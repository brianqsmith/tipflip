import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SignatureView } from '../../components/SignaturePad';
import { Chevron } from '../../components/settings/ListRow';
import { BackHeader } from '../../components/settings/SettingsPage';
import { SwipeToDelete } from '../../components/settings/SwipeToDelete';
import { clearDiscounts, deleteDiscount, listDiscounts, type DiscountRecord } from '../../storage/history';
import { useTheme } from '../../theme/ThemeProvider';
import { confirm } from '../../utils/dialogs';
import { formatDate, formatTime } from '../../utils/format';

export default function HistoryScreen() {
  const { colors } = useTheme();
  const db = useSQLiteContext();
  const [records, setRecords] = useState<DiscountRecord[] | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const reload = useCallback(() => listDiscounts(db).then(setRecords), [db]);
  useEffect(() => {
    reload();
  }, [reload]);

  const remove = async (id: number) => {
    await deleteDiscount(db, id);
    reload();
  };

  const clearAll = async () => {
    const ok = await confirm(
      'Clear all history?',
      'This deletes every saved discount and signature on this phone. It cannot be undone.',
      'Clear All',
    );
    if (!ok) return;
    await clearDiscounts(db);
    reload();
  };

  const header = (
    <View style={[styles.columns, { backgroundColor: colors.surface }]}>
      {['DISCOUNT', 'DATE', 'TIME'].map((title) => (
        <Text key={title} style={[styles.columnTitle, styles[title as 'DISCOUNT'], { color: colors.textMuted }]}>
          {title}
        </Text>
      ))}
      <View style={styles.chevron} />
    </View>
  );

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <BackHeader title="History" />
      <FlatList
        data={records ?? []}
        keyExtractor={(record) => String(record.id)}
        ListHeaderComponent={header}
        ListEmptyComponent={
          records ? (
            <Text style={[styles.empty, { color: colors.textMuted }]}>
              Discounts you collect will show up here.
            </Text>
          ) : undefined
        }
        renderItem={({ item }) => {
          const isOpen = expanded === item.id;
          return (
            <SwipeToDelete onDelete={() => remove(item.id)}>
              <Pressable
                onPress={item.signature ? () => setExpanded(isOpen ? null : item.id) : undefined}
                disabled={!item.signature}
                accessibilityRole={item.signature ? 'button' : undefined}
                accessibilityHint={item.signature ? 'Shows the signature' : undefined}
                accessibilityState={item.signature ? { expanded: isOpen } : undefined}
                style={[styles.record, { borderBottomColor: colors.border }]}
              >
                <View style={styles.cells}>
                  <Text style={[styles.percent, styles.DISCOUNT, { color: colors.logoTip }]}>{item.percent}%</Text>
                  <Text style={[styles.cell, styles.DATE, { color: colors.textMuted }]}>{formatDate(item.createdAt)}</Text>
                  <Text style={[styles.cell, styles.TIME, { color: colors.textMuted }]}>{formatTime(item.createdAt)}</Text>
                  <View style={styles.chevron}>{item.signature ? <Chevron direction={isOpen ? 'down' : 'right'} /> : null}</View>
                </View>
                {isOpen && item.signature ? (
                  <View style={styles.signature}>
                    <SignatureView signature={item.signature} />
                  </View>
                ) : null}
              </Pressable>
            </SwipeToDelete>
          );
        }}
        ListFooterComponent={
          records && records.length > 0 ? (
            <View style={[styles.footer, { backgroundColor: colors.surface }]}>
              <Pressable onPress={clearAll} hitSlop={10} accessibilityRole="button">
                <Text style={[styles.clearAll, { color: colors.danger }]}>Clear All</Text>
              </Pressable>
            </View>
          ) : undefined
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  columns: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10 },
  columnTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  DISCOUNT: { width: 90 },
  DATE: { flex: 1 },
  TIME: { width: 84 },
  record: { paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth },
  cells: { flexDirection: 'row', alignItems: 'center' },
  percent: { fontSize: 18, fontWeight: '700' },
  cell: { fontSize: 15 },
  chevron: { width: 20, alignItems: 'flex-end' },
  signature: { marginTop: 10 },
  empty: { textAlign: 'center', fontSize: 16, padding: 32 },
  footer: { alignItems: 'flex-end', paddingHorizontal: 16, paddingVertical: 14 },
  clearAll: { fontSize: 16, fontWeight: '600' },
});
