import { router, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSettings } from '../settings/SettingsProvider';
import { listDiscounts, type DiscountRecord } from '../storage/history';
import { useTheme } from '../theme/ThemeProvider';
import { formatWhen } from '../utils/format';

// Placeholder Settings & History page. Phase 4 replaces it with the full
// design; for now it shows recent discounts and the dark mode toggle.
export default function SettingsScreen() {
  const { colors } = useTheme();
  const { settings, updateSettings } = useSettings();
  const db = useSQLiteContext();
  const [recent, setRecent] = useState<DiscountRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      listDiscounts(db, 5).then(setRecent);
    }, [db]),
  );

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <Pressable onPress={() => router.back()} hitSlop={12} accessibilityRole="button" style={styles.back}>
        <Text style={[styles.backText, { color: colors.primary }]}>‹ Back</Text>
      </Pressable>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={[styles.section, { color: colors.textMuted }]}>HISTORY</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {recent.length === 0 ? (
            <Text style={[styles.rowText, { color: colors.textMuted }]}>No discounts yet</Text>
          ) : (
            recent.map((record) => (
              <View key={record.id} style={styles.row}>
                <Text style={[styles.rowText, { color: colors.text }]}>{record.percent}% discount</Text>
                <Text style={[styles.rowMeta, { color: colors.textMuted }]}>{formatWhen(record.createdAt)}</Text>
              </View>
            ))
          )}
        </View>

        <Text style={[styles.section, { color: colors.textMuted }]}>SETTINGS</Text>
        <View style={[styles.card, styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.rowText, { color: colors.text }]}>Dark mode</Text>
          <Switch
            value={settings.darkMode}
            onValueChange={(darkMode) => updateSettings({ darkMode })}
            trackColor={{ true: colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
        <Text style={[styles.note, { color: colors.textMuted }]}>
          The rest of Settings arrives in a later build.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  back: { paddingHorizontal: 20, paddingVertical: 12 },
  backText: { fontSize: 18, fontWeight: '600' },
  body: { paddingHorizontal: 20, paddingBottom: 32, gap: 10 },
  section: { fontSize: 13, fontWeight: '700', letterSpacing: 1, marginTop: 14 },
  card: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 6 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  rowText: { fontSize: 17 },
  rowMeta: { fontSize: 14 },
  note: { fontSize: 14, marginTop: 6 },
});
