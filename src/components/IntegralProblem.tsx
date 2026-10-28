import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';

// The integral from 0 to infinity of ln(x) / (1 + x^2) dx, set like the mockup.
export function IntegralProblem() {
  const { colors } = useTheme();
  const serif = { color: colors.text, fontFamily: 'serif' as const };

  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel="The integral from 0 to infinity of natural log of x, over 1 plus x squared, d x"
    >
      <View style={styles.integral}>
        <Text style={[styles.sup, serif]}>∞</Text>
        <Text style={[styles.sign, serif]}>∫</Text>
        <Text style={[styles.sub, serif]}>0</Text>
      </View>
      <View style={styles.fraction}>
        <Text style={[styles.term, serif]}>
          ln <Text style={styles.italic}>x</Text>
        </Text>
        <View style={[styles.bar, { backgroundColor: colors.text }]} />
        <Text style={[styles.term, serif]}>
          1 + <Text style={styles.italic}>x</Text>²
        </Text>
      </View>
      <Text style={[styles.term, styles.italic, serif]}> dx</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  integral: { alignItems: 'flex-start', marginRight: 6 },
  sign: { fontSize: 52, lineHeight: 58 },
  sup: { fontSize: 16, marginLeft: 22, marginBottom: -12 },
  sub: { fontSize: 16, marginLeft: 6, marginTop: -10 },
  fraction: { alignItems: 'center' },
  bar: { height: 1.5, alignSelf: 'stretch', marginVertical: 2 },
  term: { fontSize: 24 },
  italic: { fontStyle: 'italic' },
});
