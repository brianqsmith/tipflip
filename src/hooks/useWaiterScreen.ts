import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';

// While the phone is in the waiter's hands, the Android back button and back
// gesture do nothing, so the app can't be left by accident.
export function useBlockBack() {
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => subscription.remove();
    }, []),
  );
}
