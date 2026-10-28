import { router, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Toggle } from '../../components/settings/controls';
import { ListRow, Section } from '../../components/settings/ListRow';
import { BackHeader } from '../../components/settings/SettingsPage';
import { LINKS } from '../../settings/links';
import { useSettings } from '../../settings/SettingsProvider';
import { listDiscounts, type DiscountRecord } from '../../storage/history';
import { useTheme } from '../../theme/ThemeProvider';
import { openLink } from '../../utils/dialogs';
import { formatWhen } from '../../utils/format';

export default function SettingsHome() {
  const { colors } = useTheme();
  const { settings, updateSettings } = useSettings();
  const db = useSQLiteContext();
  const [recent, setRecent] = useState<DiscountRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      listDiscounts(db, 2).then(setRecent);
    }, [db]),
  );

  const storeLink = Platform.OS === 'android' ? LINKS.playStore : LINKS.appStore;

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.surface }]}>
      <BackHeader title="Settings & History" />
      <ScrollView contentContainerStyle={styles.body}>
        <Section title="HISTORY">
          {recent.length === 0 ? (
            <ListRow label="No discounts yet" right={null} />
          ) : (
            recent.map((record) => (
              <ListRow
                key={record.id}
                label={`${record.percent}%`}
                right={<Text style={[styles.when, { color: colors.textMuted }]}>{formatWhen(record.createdAt)}</Text>}
                onPress={() => router.push('/settings/history')}
              />
            ))
          )}
          <ListRow label="View more" onPress={() => router.push('/settings/history')} last />
        </Section>

        <Section title="SETTINGS">
          <ListRow label="Welcome screen" onPress={() => router.push('/settings/welcome')} />
          <ListRow label="Signature screen" onPress={() => router.push('/settings/signature')} />
          <ListRow label="'No discount' screen" onPress={() => router.push('/settings/no-discount')} />
          <ListRow label="Terms page for the server" onPress={() => router.push('/settings/terms')} />
          <ListRow
            label="Dark mode"
            right={
              <Toggle
                label="Dark mode"
                value={settings.darkMode}
                onValueChange={(darkMode) => updateSettings({ darkMode })}
              />
            }
            last
          />
        </Section>

        <Section title="HELP ME GROW THE APP">
          <ListRow
            label={Platform.OS === 'android' ? 'Rate on Google Play' : 'Rate on the App Store'}
            accessory={<Text style={styles.star}>★</Text>}
            onPress={() => openLink(storeLink)}
          />
          <ListRow label="About me and the app" onPress={() => router.push('/settings/info/about')} />
          <ListRow label="Connect with me" onPress={() => router.push('/settings/info/connect')} last />
        </Section>

        <Section title="SUPPORT">
          <ListRow label="Privacy guarantee" onPress={() => router.push('/settings/info/privacy')} />
          <ListRow label="TipFlip Terms" onPress={() => router.push('/settings/info/terms')} />
          <ListRow label="Help & Feedback" onPress={() => openLink(LINKS.website)} last />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { paddingHorizontal: 16, paddingBottom: 40 },
  when: { fontSize: 15 },
  star: { color: '#F5B700', fontSize: 20 },
});
