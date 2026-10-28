import { router } from 'expo-router';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSettings } from '../../settings/SettingsProvider';
import { useTheme } from '../../theme/ThemeProvider';
import { Button } from '../Button';

// The frame for every Settings page: a "‹ Back" header (no logo), a title and
// description, and an optional Save button.
export function SettingsPage({
  title,
  description,
  children,
  showSave = true,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  showSave?: boolean;
}) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <BackHeader />
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          {title ? <Text style={[styles.title, { color: colors.text }]}>{title}</Text> : null}
          {description ? (
            <Text style={[styles.description, { color: colors.textMuted }]}>{description}</Text>
          ) : null}
          {children}
          {showSave ? <SaveButton /> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function BackHeader({ title }: { title?: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.header, { borderBottomColor: colors.border }]}>
      <Pressable onPress={() => router.back()} hitSlop={12} accessibilityRole="button" accessibilityLabel="Back">
        <Text style={[styles.back, { color: colors.primary }]}>‹ Back</Text>
      </Pressable>
      {title ? <Text style={[styles.headerTitle, { color: colors.text }]}>{title}</Text> : null}
    </View>
  );
}

// Changes already save as they happen; Save confirms it.
function SaveButton() {
  const { flush } = useSettings();
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const save = async () => {
    await flush();
    setSaved(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaved(false), 1800);
  };

  return (
    <View style={styles.save} accessibilityLiveRegion="polite">
      <Button label={saved ? 'Saved ✓' : 'Save'} onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  fill: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  back: { fontSize: 18, fontWeight: '600' },
  headerTitle: { position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: '700', zIndex: -1 },
  body: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 },
  title: { fontSize: 28, fontWeight: '700' },
  description: { fontSize: 15, lineHeight: 21, marginTop: 6, marginBottom: 12 },
  save: { marginTop: 28 },
});
