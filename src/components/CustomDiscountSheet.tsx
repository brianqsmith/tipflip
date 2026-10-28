import { useEffect, useRef, useState, type ComponentRef } from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../theme/ThemeProvider';
import { Button } from './Button';

// Keeps only digits and never lets the first digit be 0, so any complete
// two-digit entry is between 10 and 99.
function cleanEntry(text: string) {
  return text.replace(/\D/g, '').replace(/^0+/, '').slice(0, 2);
}

const OFFSCREEN = 700;

// The bottom drawer for a custom amount. It is drawn inside the welcome
// screen (not as a separate modal) so a single tap outside it, or a swipe
// down on it, always closes it.
export function CustomDiscountSheet({
  visible,
  onClose,
  onContinue,
}: {
  visible: boolean;
  onClose: () => void;
  onContinue: (percent: number) => void;
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [mounted, setMounted] = useState(visible);
  const [entry, setEntry] = useState('');
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);
  const slide = useRef(new Animated.Value(OFFSCREEN)).current;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (visible) {
      setEntry('');
      setMounted(true);
      slide.setValue(OFFSCREEN);
      Animated.timing(slide, { toValue: 0, duration: 220, useNativeDriver: true }).start();
    } else {
      Keyboard.dismiss();
      Animated.timing(slide, { toValue: OFFSCREEN, duration: 180, useNativeDriver: true }).start(() =>
        setMounted(false),
      );
    }
  }, [visible, slide]);

  // A downward drag anywhere on the drawer moves it with the finger; far
  // enough (or fast enough) closes it, otherwise it springs back.
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, g) => g.dy > 6 && Math.abs(g.dy) > Math.abs(g.dx),
      // Keep the drag once it has started.
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (_, g) => slide.setValue(Math.max(0, g.dy)),
      onPanResponderRelease: (_, g) => {
        if (g.dy > 80 || g.vy > 0.8) {
          onCloseRef.current();
        } else {
          Animated.spring(slide, { toValue: 0, useNativeDriver: true, bounciness: 0 }).start();
        }
      },
      onPanResponderTerminate: () =>
        Animated.spring(slide, { toValue: 0, useNativeDriver: true, bounciness: 0 }).start(),
    }),
  ).current;

  if (!mounted) return null;

  const percent = entry.length === 2 ? Number(entry) : null;
  const digits = entry.padEnd(2, '0');

  return (
    <KeyboardAvoidingView
      style={StyleSheet.absoluteFill}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <Pressable
        style={styles.fill}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close custom discount"
      />
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.sheet,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            shadowColor: colors.shadow,
            paddingBottom: Math.max(insets.bottom, 20),
            transform: [{ translateY: slide }],
          },
        ]}
      >
        <View style={[styles.grabber, { backgroundColor: colors.border }]} />
        <Text style={[styles.title, { color: colors.textMuted }]}>Custom Discount</Text>

        <Pressable
          onPress={() => inputRef.current?.focus()}
          style={styles.entryRow}
          accessibilityLabel={`Custom discount ${entry || 'empty'} percent`}
        >
          {[0, 1].map((i) => (
            <Text
              key={i}
              style={[styles.digit, { color: i < entry.length ? colors.text : colors.onDisabled }]}
            >
              {digits[i]}
            </Text>
          ))}
          <Text
            style={[
              styles.digit,
              styles.percentSign,
              { color: entry.length === 2 ? colors.text : colors.onDisabled },
            ]}
          >
            %
          </Text>
        </Pressable>

        <TextInput
          ref={inputRef}
          value={entry}
          onChangeText={(text) => setEntry(cleanEntry(text))}
          keyboardType="number-pad"
          maxLength={2}
          autoFocus
          caretHidden
          style={styles.hiddenInput}
          accessibilityLabel="Custom discount percent"
        />

        <Button
          label="Continue"
          disabled={percent === null}
          onPress={() => percent !== null && onContinue(percent)}
          style={styles.continue}
        />
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  sheet: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: 24,
    paddingTop: 10,
    alignItems: 'center',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 16,
  },
  grabber: { width: 44, height: 5, borderRadius: 3, marginBottom: 14 },
  title: { fontSize: 26, fontWeight: '600' },
  entryRow: { flexDirection: 'row', alignItems: 'baseline', marginVertical: 18 },
  digit: { fontSize: 84, fontWeight: '700', fontVariant: ['tabular-nums'] },
  percentSign: { marginLeft: 18 },
  hiddenInput: { position: 'absolute', opacity: 0, width: 1, height: 1 },
  continue: { alignSelf: 'stretch' },
});
