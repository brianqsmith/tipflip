import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback } from 'react';

import { saveDiscount, type Signature } from '../storage/history';

// Records the chosen discount with the local date and time (and signature,
// when collected), then shows the Thank you screen.
export function useSaveDiscount() {
  const db = useSQLiteContext();
  return useCallback(
    async (percent: number, signature: Signature | null) => {
      await saveDiscount(db, percent, signature);
      router.replace('/thank-you');
    },
    [db],
  );
}
