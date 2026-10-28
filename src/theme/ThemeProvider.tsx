import * as SystemUI from 'expo-system-ui';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { palettes, type ColorScheme, type Palette } from './colors';

type ThemeContextValue = {
  scheme: ColorScheme;
  colors: Palette;
  setDarkMode: (on: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Dark mode follows the in-app Settings toggle, not the phone's system setting.
// The choice is kept in memory for now; it is saved to the device with the
// other settings in phase 4.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [scheme, setScheme] = useState<ColorScheme>('light');
  const colors = palettes[scheme];

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background);
  }, [colors.background]);

  const value = useMemo(
    () => ({ scheme, colors, setDarkMode: (on: boolean) => setScheme(on ? 'dark' : 'light') }),
    [scheme, colors],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside ThemeProvider');
  return value;
}
