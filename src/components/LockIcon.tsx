import Svg, { Path, Rect } from 'react-native-svg';

export function LockIcon({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="Locked">
      <Path d="M7 10V7a5 5 0 0 1 10 0v3" stroke={color} strokeWidth={2.4} fill="none" />
      <Rect x={4} y={10} width={16} height={12} rx={2.5} fill={color} />
    </Svg>
  );
}
