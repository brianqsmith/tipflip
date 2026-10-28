import { router } from 'expo-router';
import { useCallback } from 'react';

// Tapping the logo starts over for a new waiter from any screen.
export function useResetToWelcome() {
  return useCallback(() => {
    if (router.canDismiss()) router.dismissAll();
    router.replace('/');
  }, []);
}
