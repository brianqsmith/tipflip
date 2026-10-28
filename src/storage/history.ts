import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'tipflip.db';

// A finger-drawn signature, kept as SVG path data so it is stored and deleted
// together with its record.
export type Signature = {
  width: number;
  height: number;
  strokes: string[];
};

export type DiscountRecord = {
  id: number;
  percent: number;
  createdAt: string;
  signature: Signature | null;
};

export async function migrate(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS discounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      percent INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      signature TEXT
    );
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      value TEXT NOT NULL
    );
  `);
}

export async function saveDiscount(
  db: SQLiteDatabase,
  percent: number,
  signature: Signature | null,
) {
  await db.runAsync(
    'INSERT INTO discounts (percent, created_at, signature) VALUES (?, ?, ?)',
    percent,
    new Date().toISOString(),
    signature ? JSON.stringify(signature) : null,
  );
}

type Row = { id: number; percent: number; created_at: string; signature: string | null };

export async function listDiscounts(db: SQLiteDatabase, limit?: number): Promise<DiscountRecord[]> {
  const rows = await db.getAllAsync<Row>(
    `SELECT * FROM discounts ORDER BY created_at DESC, id DESC${limit ? ' LIMIT ?' : ''}`,
    ...(limit ? [limit] : []),
  );
  return rows.map((row) => ({
    id: row.id,
    percent: row.percent,
    createdAt: row.created_at,
    signature: row.signature ? (JSON.parse(row.signature) as Signature) : null,
  }));
}

export async function deleteDiscount(db: SQLiteDatabase, id: number) {
  await db.runAsync('DELETE FROM discounts WHERE id = ?', id);
}

export async function clearDiscounts(db: SQLiteDatabase) {
  await db.runAsync('DELETE FROM discounts');
}
