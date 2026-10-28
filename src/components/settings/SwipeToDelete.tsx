import { useMemo, useRef, type ReactNode } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../theme/ThemeProvider';

const ACTION_WIDTH = 92;

// Swipe a row left to reveal a red Delete button behind it.
export function SwipeToDelete({ children, onDelete }: { children: ReactNode; onDelete: () => void }) {
  const { colors } = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const open = useRef(false);

  const settle = (toOpen: boolean) => {
    open.current = toOpen;
    Animated.spring(translateX, {
      toValue: toOpen ? -ACTION_WIDTH : 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy),
        // Keep the swipe once it has started.
        onPanResponderTerminationRequest: () => false,
        onPanResponderMove: (_, g) => {
          const start = open.current ? -ACTION_WIDTH : 0;
          translateX.setValue(Math.min(0, Math.max(-ACTION_WIDTH * 1.4, start + g.dx)));
        },
        onPanResponderRelease: (_, g) => {
          const start = open.current ? -ACTION_WIDTH : 0;
          settle(start + g.dx < -ACTION_WIDTH / 2 || g.vx < -0.6);
        },
        onPanResponderTerminate: () => settle(open.current),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={onDelete}
        style={[styles.action, { backgroundColor: colors.danger }]}
        accessibilityRole="button"
        accessibilityLabel="Delete"
      >
        <Text style={styles.actionText}>Delete</Text>
      </Pressable>
      <Animated.View
        {...panResponder.panHandlers}
        style={{ transform: [{ translateX }], backgroundColor: colors.background }}
        accessibilityActions={[{ name: 'delete', label: 'Delete' }]}
        onAccessibilityAction={(event) => event.nativeEvent.actionName === 'delete' && onDelete()}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { overflow: 'hidden' },
  action: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
