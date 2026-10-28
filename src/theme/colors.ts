// Brand colors from the tipflip wordmark.
export const brand = {
  navy: '#2A3C80',
  blue: '#2C68F6',
  white: '#FFFFFF',
};

export type ColorScheme = 'light' | 'dark';

export type Palette = {
  background: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  disabled: string;
  onDisabled: string;
  logoTip: string;
  logoFlip: string;
  success: string;
  danger: string;
  shadow: string;
};

export const palettes: Record<ColorScheme, Palette> = {
  light: {
    background: '#FFFFFF',
    surface: '#F5F7FB',
    border: '#E3E7EF',
    text: '#14203F',
    textMuted: '#5F6B85',
    primary: brand.blue,
    onPrimary: brand.white,
    secondary: '#EEF0F4',
    onSecondary: '#3F4757',
    disabled: '#F4F5F7',
    onDisabled: '#A7ADB9',
    logoTip: brand.navy,
    logoFlip: brand.blue,
    success: '#55D63C',
    danger: '#E5484D',
    shadow: 'rgba(30, 48, 82, 0.10)',
  },
  dark: {
    background: '#0E1424',
    surface: '#172036',
    border: '#26314C',
    text: '#F2F5FB',
    textMuted: '#A3ADC4',
    primary: '#3D76FF',
    onPrimary: brand.white,
    secondary: '#253049',
    onSecondary: '#D9DEEA',
    disabled: '#1B2338',
    onDisabled: '#5D6782',
    // Navy disappears on a dark background, so "tip" turns white.
    logoTip: brand.white,
    logoFlip: '#3D76FF',
    success: '#55D63C',
    danger: '#FF6369',
    shadow: 'rgba(0, 0, 0, 0.40)',
  },
};
