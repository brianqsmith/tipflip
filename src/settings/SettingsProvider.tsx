import { useSQLiteContext } from 'expo-sqlite';
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { loadSettings, storeSettings } from '../storage/settings';
import type { Settings } from './defaults';

type SettingsContextValue = {
  settings: Settings;
  updateSettings: (changes: Partial<Settings>) => void;
  // Resolves once the latest change is on disk; Save buttons wait on it.
  flush: () => Promise<void>;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

// Every change saves to the device right away and updates the waiter screens.
export function SettingsProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [settings, setSettings] = useState<Settings | null>(null);
  const pendingWrite = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    loadSettings(db).then(setSettings);
  }, [db]);

  const value = useMemo(() => {
    if (!settings) return null;
    return {
      settings,
      updateSettings: (changes: Partial<Settings>) => {
        // Built from the latest state so quick taps (like a stepper) never
        // overwrite each other.
        setSettings((current) => {
          const next = { ...(current as Settings), ...changes };
          pendingWrite.current = pendingWrite.current.then(() => storeSettings(db, next));
          return next;
        });
      },
      flush: () => pendingWrite.current,
    };
  }, [settings, db]);

  // Nothing renders until saved settings are loaded, so the waiter never sees
  // the defaults flash first. The splash screen covers this moment.
  if (!value) return null;

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('useSettings must be used inside SettingsProvider');
  return value;
}
