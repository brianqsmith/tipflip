import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../components/Button';
import { SettingsPage } from '../../../components/settings/SettingsPage';
import { INFO_PAGES } from '../../../content/info';
import { LINKS } from '../../../settings/links';
import { useTheme } from '../../../theme/ThemeProvider';
import { openLink } from '../../../utils/dialogs';

export default function InfoScreen() {
  const { colors } = useTheme();
  const { page } = useLocalSearchParams<{ page: string }>();

  if (page === 'connect') {
    return (
      <SettingsPage title="Connect with me" showSave={false}>
        <View style={styles.links}>
          <Button label="My website" onPress={() => openLink(LINKS.website)} />
          <Button label="TikTok" variant="secondary" onPress={() => openLink(LINKS.tiktok)} />
        </View>
      </SettingsPage>
    );
  }

  const content = INFO_PAGES[page as keyof typeof INFO_PAGES] ?? INFO_PAGES.about;

  return (
    <SettingsPage title={content.title} description={content.intro} showSave={false}>
      {content.sections.map((section, index) => (
        <View key={index} style={styles.section}>
          {section.heading ? (
            <Text style={[styles.heading, { color: colors.text }]} accessibilityRole="header">
              {section.heading}
            </Text>
          ) : null}
          <Text style={[styles.body, { color: colors.text }]}>{section.body}</Text>
        </View>
      ))}
    </SettingsPage>
  );
}

const styles = StyleSheet.create({
  links: { gap: 14, marginTop: 20 },
  section: { marginTop: 16 },
  heading: { fontSize: 17, fontWeight: '700', marginBottom: 4 },
  body: { fontSize: 16, lineHeight: 23 },
});
