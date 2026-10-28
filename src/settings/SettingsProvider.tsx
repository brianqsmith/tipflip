import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { DEFAULT_SETTINGS, type Settings } from './defaults';

type SettingsContextValue = {
  settings: Settings;
  updateSettings: (changes: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

// Settings live in memory for now and start from the defaults on every launch.
// Phase 4 saves them on the device and adds the Settings pages that edit them.
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const value = useMemo(
    () => ({
      settings,
      updateSettings: (changes: Partial<Settings>) =>
        setSettings((current) => ({ ...current, ...changes })),
    }),
    [settings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('useSettings must be used inside SettingsProvider');
  return value;
}
