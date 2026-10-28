import * as SystemUI from 'expo-system-ui';
import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';

import { useSettings } from '../settings/SettingsProvider';
import { palettes, type ColorScheme, type Palette } from './colors';

type ThemeContextValue = {
  scheme: ColorScheme;
  colors: Palette;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Dark mode follows the in-app Settings toggle, not the phone's system setting.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings();
  const scheme: ColorScheme = settings.darkMode ? 'dark' : 'light';
  const colors = palettes[scheme];

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background);
  }, [colors.background]);

  const value = useMemo(() => ({ scheme, colors }), [scheme, colors]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside ThemeProvider');
  return value;
}
