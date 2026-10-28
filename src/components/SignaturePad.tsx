import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import type { Signature } from '../storage/history';
import { useTheme } from '../theme/ThemeProvider';

export type SignaturePadHandle = {
  clear: () => void;
  getSignature: () => Signature | null;
};

const round = (n: number) => Math.round(n * 10) / 10;

// A finger-drawn signature pad. Each stroke is kept as SVG path data.
export const SignaturePad = forwardRef<
  SignaturePadHandle,
  { onChange?: (hasInk: boolean) => void; height?: number }
>(function SignaturePad({ onChange, height = 210 }, ref) {
  const { colors } = useTheme();
  const [strokes, setStrokes] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const currentRef = useRef('');
  const size = useRef({ width: 0, height });
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        // Keep the drawing gesture even if a parent would like to scroll.
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (event) => {
          const { locationX, locationY } = event.nativeEvent;
          currentRef.current = `M${round(locationX)} ${round(locationY)}`;
          setCurrent(currentRef.current);
        },
        onPanResponderMove: (event) => {
          const { locationX, locationY } = event.nativeEvent;
          currentRef.current += ` L${round(locationX)} ${round(locationY)}`;
          setCurrent(currentRef.current);
        },
        onPanResponderRelease: () => {
          let stroke = currentRef.current;
          // A single tap becomes a visible dot.
          if (!stroke.includes('L')) stroke += ` l0.1 0`;
          setStrokes((previous) => [...previous, stroke]);
          currentRef.current = '';
          setCurrent('');
          onChangeRef.current?.(true);
        },
      }),
    [],
  );

  useImperativeHandle(ref, () => ({
    clear: () => {
      setStrokes([]);
      onChangeRef.current?.(false);
    },
    getSignature: () =>
      strokes.length
        ? { width: round(size.current.width), height: round(size.current.height), strokes }
        : null,
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    size.current = event.nativeEvent.layout;
  };

  return (
    <View
      onLayout={onLayout}
      style={[styles.pad, { height, backgroundColor: colors.surface, borderBottomColor: colors.textMuted }]}
      accessibilityLabel="Signature pad. Draw your signature with your finger."
      {...panResponder.panHandlers}
    >
      <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
        {[...strokes, current].filter(Boolean).map((d, i) => (
          <Path
            key={i}
            d={d}
            stroke={colors.text}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
      </Svg>
    </View>
  );
});

// Draws a saved signature, scaled to fit, for the History page.
export function SignatureView({ signature, height = 120 }: { signature: Signature; height?: number }) {
  const { colors } = useTheme();
  return (
    <Svg
      width="100%"
      height={height}
      viewBox={`0 0 ${signature.width} ${signature.height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {signature.strokes.map((d, i) => (
        <Path key={i} d={d} stroke={colors.text} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      ))}
    </Svg>
  );
}

const styles = StyleSheet.create({
  pad: { borderBottomWidth: 1.5, overflow: 'hidden' },
});
