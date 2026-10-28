import { FieldLabel, TextArea, ToggleRow } from '../../components/settings/controls';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { Stepper } from '../../components/settings/Stepper';
import { LIMITS, type Settings } from '../../settings/defaults';
import { useSettings } from '../../settings/SettingsProvider';

export default function WelcomeSettings() {
  const { settings, updateSettings } = useSettings();

  const setOption = (index: number, value: number) => {
    const discounts = [...settings.discounts] as Settings['discounts'];
    discounts[index] = value;
    updateSettings({ discounts });
  };

  return (
    <SettingsPage title="Welcome screen" description="Choose what to show on the welcome screen.">
      <FieldLabel
        label="Discount amounts"
        description="The waiter will be able to choose between these discount options."
      />
      {settings.discounts.map((value, index) => (
        <Stepper
          key={index}
          label={`Option ${index + 1}`}
          value={value}
          onChange={(next) => setOption(index, next)}
          disabled={index === 3 && settings.allowCustom}
        />
      ))}

      <ToggleRow
        label="Allow custom amount"
        description="When turned on, the 'Custom' option replaces the 4th discount option."
        value={settings.allowCustom}
        onValueChange={(allowCustom) => updateSettings({ allowCustom })}
      />

      <FieldLabel label="Welcome message" description="This text is shown above the discount options." />
      <TextArea
        label="Welcome message"
        value={settings.welcomeMessage}
        onChangeText={(welcomeMessage) => updateSettings({ welcomeMessage })}
        limit={LIMITS.welcomeMessage}
        minHeight={70}
      />
    </SettingsPage>
  );
}

