import { Alert, Linking, Platform } from 'react-native';

// Alert.alert does nothing in the browser preview, so fall back to the
// browser's own dialogs there.
export function confirm(title: string, message: string, confirmLabel: string): Promise<boolean> {
  if (Platform.OS === 'web') return Promise.resolve(window.confirm(`${title}\n\n${message}`));
  return new Promise((resolve) =>
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
      { text: confirmLabel, style: 'destructive', onPress: () => resolve(true) },
    ]),
  );
}

export function notify(title: string, message: string) {
  if (Platform.OS === 'web') window.alert(`${title}\n\n${message}`);
  else Alert.alert(title, message);
}

// Links Nil hasn't provided yet are empty strings; tapping one says so.
export function openLink(url: string) {
  if (!url) {
    notify('Coming soon', 'This link will be added before the app is released.');
    return;
  }
  Linking.openURL(url);
}
