import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HistoryColumnTitles, HistoryRow } from '../../components/settings/HistoryRow';
import { BackHeader } from '../../components/settings/SettingsPage';
import { SwipeToDelete } from '../../components/settings/SwipeToDelete';
import { clearDiscounts, deleteDiscount, listDiscounts, type DiscountRecord } from '../../storage/history';
import { useTheme } from '../../theme/ThemeProvider';
import { confirm } from '../../utils/dialogs';

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

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <BackHeader title="History" />
      <FlatList
        data={records ?? []}
        keyExtractor={(record) => String(record.id)}
        ListHeaderComponent={<HistoryColumnTitles />}
        ListEmptyComponent={
          records ? (
            <Text style={[styles.empty, { color: colors.textMuted }]}>
              Discounts you collect will show up here.
            </Text>
          ) : undefined
        }
        renderItem={({ item }) => (
          <SwipeToDelete onDelete={() => remove(item.id)}>
            <HistoryRow
              record={item}
              expanded={expanded === item.id}
              onToggle={() => setExpanded(expanded === item.id ? null : item.id)}
            />
          </SwipeToDelete>
        )}
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
  empty: { textAlign: 'center', fontSize: 16, padding: 32 },
  footer: { alignItems: 'flex-end', paddingHorizontal: 16, paddingVertical: 14 },
  clearAll: { fontSize: 16, fontWeight: '600' },
});
