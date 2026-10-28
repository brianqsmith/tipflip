import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../components/Button';
import { IntegralProblem } from '../components/IntegralProblem';
import { WaiterScreen } from '../components/WaiterScreen';
import { useResetToWelcome } from '../hooks/useResetToWelcome';
import { useSettings } from '../settings/SettingsProvider';
import { useTheme } from '../theme/ThemeProvider';

// The integral's value is 0.
function isCorrect(answer: string) {
  const trimmed = answer.trim().replace(',', '.');
  return trimmed !== '' && Number(trimmed) === 0;
}

export default function AreYouHumanScreen() {
  const { colors } = useTheme();
  const { settings } = useSettings();
  const backToWelcome = useResetToWelcome();
  const [answer, setAnswer] = useState('');
  const shake = useRef(new Animated.Value(0)).current;
  const correct = isCorrect(answer);

  const shakeField = () => {
    shake.setValue(0);
    Animated.sequence(
      [10, -10, 8, -8, 4, 0].map((toValue) =>
        Animated.timing(shake, { toValue, duration: 55, useNativeDriver: true }),
      ),
    ).start();
  };

  const checkAnswer = () => {
    if (!correct) shakeField();
  };

  const notARobot = () => {
    if (correct) router.replace('/thank-you');
    else shakeField();
  };

  return (
    <WaiterScreen>
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          <Text style={[styles.title, { color: colors.primary }]}>Are you human?</Text>
          <Text style={[styles.message, { color: colors.text }]}>{settings.humanCheckMessage}</Text>

          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.cardLabel, { color: colors.primary }]}>VERIFY YOU ARE A HUMAN</Text>
            <IntegralProblem />
            <Animated.View style={{ transform: [{ translateX: shake }] }}>
              <TextInput
                value={answer}
                onChangeText={setAnswer}
                onSubmitEditing={checkAnswer}
                placeholder="Enter your answer here"
                placeholderTextColor={colors.onDisabled}
                keyboardType="numbers-and-punctuation"
                returnKeyType="done"
                style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                accessibilityLabel="Your answer"
              />
            </Animated.View>
          </View>

          {/* Grey until the answer is right, then a solid navy button. */}
          <Button
            label="I'm not a robot"
            variant={correct ? 'accent' : 'secondary'}
            looksDisabled={!correct}
            onPress={notARobot}
          />
          <Button label="Give a discount" onPress={backToWelcome} />
        </ScrollView>
      </KeyboardAvoidingView>
    </WaiterScreen>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  body: { paddingTop: 32, paddingBottom: 24, gap: 16 },
  title: { fontSize: 34, fontWeight: '500', textAlign: 'center' },
  message: { fontSize: 20, lineHeight: 27, paddingHorizontal: 4 },
  card: { borderWidth: 1, borderRadius: 16, padding: 18, gap: 16 },
  cardLabel: { fontSize: 13, fontWeight: '700', letterSpacing: 0.5, textAlign: 'center' },
  input: { fontSize: 18, textAlign: 'center', borderWidth: 1, borderRadius: 10, paddingVertical: 14 },
});
