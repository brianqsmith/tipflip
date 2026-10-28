import { router } from 'expo-router';
import { useEffect, useRef, type ReactNode } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { useResetToWelcome } from '../../hooks/useResetToWelcome';
import { useSettings } from '../../settings/SettingsProvider';
import { useTheme } from '../../theme/ThemeProvider';
import { Button } from '../Button';
import { LogoIcon } from '../Logo';

// The frame for every Settings page: a "‹ Back" header, a title and
// description, and an optional Save button. Pages with a Save button also
// show the logo icon in the header's top right corner.
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
      <BackHeader showIcon={showSave} />
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

export function BackHeader({
  title,
  onBack,
  showIcon,
}: {
  title?: string;
  onBack?: () => void;
  showIcon?: boolean;
}) {
  const { colors } = useTheme();
  const resetToWelcome = useResetToWelcome();
  return (
    <View style={[styles.header, { borderBottomColor: colors.border }]}>
      <Pressable
        onPress={onBack ?? (() => router.back())}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Back"
        style={styles.backButton}
      >
        <BackArrow color={colors.primary} />
        <Text style={[styles.back, { color: colors.primary }]}>Back</Text>
      </Pressable>
      {title ? <Text style={[styles.headerTitle, { color: colors.text }]}>{title}</Text> : null}
      {showIcon ? (
        <Pressable
          onPress={resetToWelcome}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Go to welcome screen"
          style={styles.icon}
        >
          <LogoIcon height={28} />
        </Pressable>
      ) : null}
    </View>
  );
}

// A chevron drawn to the cap height of the 18pt "Back" label (about 13pt),
// so it matches the height of the "B".
function BackArrow({ color }: { color: string }) {
  return (
    <Svg width={8} height={13} viewBox="0 0 8 13" importantForAccessibility="no">
      <Path
        d="M6.5 1.5 L1.5 6.5 L6.5 11.5"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

const SAVED_GREEN = '#2FA84F';

// Changes already save as they happen; Save confirms it with a small
// "Saved ✓" bubble that pops up above the button and fades away.
function SaveButton() {
  const { flush } = useSettings();
  const popup = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const save = async () => {
    await flush();
    clearTimeout(timer.current);
    Animated.timing(popup, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    timer.current = setTimeout(
      () => Animated.timing(popup, { toValue: 0, duration: 250, useNativeDriver: true }).start(),
      1400,
    );
  };

  return (
    <View style={styles.save}>
      <Animated.View
        pointerEvents="none"
        accessibilityLiveRegion="polite"
        style={[
          styles.popup,
          {
            opacity: popup,
            transform: [{ translateY: popup.interpolate({ inputRange: [0, 1], outputRange: [6, 0] }) }],
          },
        ]}
      >
        <Text style={styles.popupText}>Saved ✓</Text>
      </Animated.View>
      <Button label="Save" onPress={save} />
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
    paddingVertical: 4,
    minHeight: 48,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8 },
  back: { fontSize: 18, fontWeight: '600' },
  icon: { marginLeft: 'auto' },
  headerTitle: { position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: '700', zIndex: -1 },
  body: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 },
  title: { fontSize: 28, fontWeight: '700' },
  description: { fontSize: 15, lineHeight: 21, marginTop: 6, marginBottom: 12 },
  save: { marginTop: 44 },
  popup: {
    position: 'absolute',
    bottom: '100%',
    alignSelf: 'center',
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E8F7EC',
  },
  popupText: { color: SAVED_GREEN, fontSize: 15, fontWeight: '700' },
});
