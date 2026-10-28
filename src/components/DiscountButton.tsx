import * as Haptics from 'expo-haptics';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';

// One of the four big blue buttons. A tap gives a haptic tick and a quick
// press-and-release pulse before moving on.
export function DiscountButton({
  percent,
  onSelect,
}: {
  percent: number | 'custom';
  onSelect: () => void;
}) {
  const { colors } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.93, duration: 90, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, tension: 160, useNativeDriver: true }),
    ]).start();
    setTimeout(onSelect, 160);
  };

  const label = percent === 'custom' ? 'Custom discount' : `${percent}% discount`;

  return (
    <Animated.View style={[styles.cell, { transform: [{ scale }] }]}>
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.primary },
          pressed && styles.pressed,
        ]}
      >
        {percent === 'custom' ? (
          <Text style={[styles.custom, { color: colors.onPrimary }]}>Custom</Text>
        ) : (
          <>
            <Text style={[styles.amount, { color: colors.onPrimary }]} maxFontSizeMultiplier={1.4}>
              {percent}%
            </Text>
            <Text style={[styles.caption, { color: colors.onPrimary }]} maxFontSizeMultiplier={1.4}>
              Discount
            </Text>
          </>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cell: { flex: 1 },
  button: {
    height: 112,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.9 },
  amount: { fontSize: 40, fontWeight: '700', lineHeight: 46 },
  caption: { fontSize: 18, fontWeight: '600' },
  custom: { fontSize: 21, fontWeight: '600' },
});
