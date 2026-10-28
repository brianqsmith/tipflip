import type { SQLiteDatabase } from 'expo-sqlite';

import { DEFAULT_SETTINGS, type Settings } from '../settings/defaults';

// Settings are one JSON row. Missing keys fall back to the defaults, so new
// settings added in later versions get their default values.
export async function loadSettings(db: SQLiteDatabase): Promise<Settings> {
  const row = await db.getFirstAsync<{ value: string }>('SELECT value FROM settings WHERE id = 1');
  if (!row) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(row.value) as Partial<Settings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function storeSettings(db: SQLiteDatabase, settings: Settings) {
  await db.runAsync(
    'INSERT INTO settings (id, value) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET value = excluded.value',
    JSON.stringify(settings),
  );
}
