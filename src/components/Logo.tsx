import Svg, { G, Path } from 'react-native-svg';

import { useTheme } from '../theme/ThemeProvider';
import { BLUE_PATHS, ICON_BACK_TILE, ICON_FRONT_TILE, NAVY_PATHS } from './logoPaths';

// The source artwork is 2003 x 998 with the wordmark in the middle; this
// viewBox crops to the visible mark so the logo sizes by its real edges.
const VIEW_BOX = '171 240 1716 527';
const ASPECT = 1716 / 527;

export function Logo({ height = 40 }: { height?: number }) {
  const { colors } = useTheme();
  return (
    <Svg
      width={height * ASPECT}
      height={height}
      viewBox={VIEW_BOX}
      accessibilityRole="image"
      accessibilityLabel="tipflip"
    >
      <G transform="translate(0,998) scale(0.1,-0.1)">
        {NAVY_PATHS.map((d, i) => (
          <Path key={`n${i}`} d={d} fill={colors.logoTip} />
        ))}
        {BLUE_PATHS.map((d, i) => (
          <Path key={`b${i}`} d={d} fill={colors.logoFlip} />
        ))}
      </G>
    </Svg>
  );
}

// Just the two-tile icon from the wordmark, without the word.
const ICON_VIEW_BOX = '171 240 364 419';
const ICON_ASPECT = 364 / 419;

export function LogoIcon({ height = 28 }: { height?: number }) {
  const { colors } = useTheme();
  return (
    <Svg
      width={height * ICON_ASPECT}
      height={height}
      viewBox={ICON_VIEW_BOX}
      accessibilityRole="image"
      accessibilityLabel="tipflip"
    >
      <G transform="translate(0,998) scale(0.1,-0.1)">
        <Path d={ICON_BACK_TILE} fill={colors.logoTip} />
        <Path d={ICON_FRONT_TILE} fill={colors.logoFlip} />
      </G>
    </Svg>
  );
}
