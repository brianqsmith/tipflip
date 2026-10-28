import { StyleSheet, View } from 'react-native';

import { ThankYouCheck } from '../components/ThankYouCheck';
import { WaiterScreen } from '../components/WaiterScreen';

// Stays until the logo is tapped, which starts over for the next waiter.
export default function ThankYouScreen() {
  return (
    <WaiterScreen>
      <View style={styles.body}>
        <ThankYouCheck />
      </View>
    </WaiterScreen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, justifyContent: 'center', paddingBottom: 80 },
});
