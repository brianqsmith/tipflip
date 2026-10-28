import { useAudioPlayer } from 'expo-audio';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

// Colors and timing copied from thank-you-animation.html.
const GREEN = '#55d63c';
const GRAY = '#969696';
const RING_LENGTH = 597;
const CHECK_LENGTH = 170;
const DING_AT_MS = 1180;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

export function ThankYouCheck() {
  const ring = useRef(new Animated.Value(RING_LENGTH)).current;
  const check = useRef(new Animated.Value(CHECK_LENGTH)).current;
  const text = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);
  const ding = useAudioPlayer(require('../../assets/sounds/ding.wav'));

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  useEffect(() => {
    if (reduceMotion === null) return;

    if (reduceMotion) {
      ring.setValue(0);
      check.setValue(0);
      text.setValue(1);
    } else {
      Animated.parallel([
        Animated.timing(ring, {
          toValue: 0,
          duration: 850,
          delay: 150,
          easing: Easing.bezier(0.2, 0.7, 0.25, 1),
          useNativeDriver: false,
        }),
        Animated.timing(check, {
          toValue: 0,
          duration: 520,
          delay: 780,
          easing: Easing.bezier(0.2, 0.75, 0.2, 1),
          useNativeDriver: false,
        }),
        Animated.timing(text, {
          toValue: 1,
          duration: 420,
          delay: 1150,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }

    // The player is fresh on every visit, so there is nothing to rewind.
    // If the sound is still loading at the ding moment, play it as soon as
    // it is ready instead of dropping it.
    let sub: { remove(): void } | undefined;
    const timer = setTimeout(() => {
      if (ding.isLoaded) {
        ding.play();
        return;
      }
      sub = ding.addListener('playbackStatusUpdate', (status) => {
        if (!status.isLoaded) return;
        sub?.remove();
        ding.play();
      });
    }, DING_AT_MS);
    return () => {
      clearTimeout(timer);
      sub?.remove();
    };
  }, [reduceMotion, ring, check, text, ding]);

  return (
    <View style={styles.wrap} accessible accessibilityLabel="Thank you!">
      <Svg width={210} height={210} viewBox="0 0 200 200">
        <AnimatedCircle
          cx={100}
          cy={100}
          r={95}
          fill="none"
          stroke={GREEN}
          strokeWidth={9}
          strokeDasharray={RING_LENGTH}
          strokeDashoffset={ring}
          transform="rotate(-90 100 100)"
        />
        <AnimatedPath
          d="M55 103 L88 135 L148 62"
          fill="none"
          stroke={GREEN}
          strokeWidth={12}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={CHECK_LENGTH}
          strokeDashoffset={check}
        />
      </Svg>
      <Animated.Text
        style={[
          styles.thanks,
          {
            opacity: text,
            transform: [{ translateY: text.interpolate({ inputRange: [0, 1], outputRange: [5, 0] }) }],
          },
        ]}
      >
        Thank you!
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  thanks: { marginTop: 24, color: GRAY, fontSize: 30, fontWeight: '600' },
});
