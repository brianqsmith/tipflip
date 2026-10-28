import { Divider, FieldLabel, TextArea, ToggleRow } from '../../components/settings/controls';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { LIMITS } from '../../settings/defaults';
import { useSettings } from '../../settings/SettingsProvider';

export default function NoDiscountSettings() {
  const { settings, updateSettings } = useSettings();

  return (
    <SettingsPage
      title="No discount"
      description="Choose whether to allow the waiter to stiff you on the discount, and what to say afterward."
    >
      <ToggleRow
        label='Allow "no discount"'
        description="When turned on, the waiter has the option to select 'No discount'."
        value={settings.allowNoDiscount}
        onValueChange={(allowNoDiscount) => updateSettings({ allowNoDiscount })}
      />

      <FieldLabel
        label="Confirmation message"
        description="If the waiter chooses not to give you a discount, this text is shown to make sure they actually meant to stiff you."
      />
      <TextArea
        label="Confirmation message"
        heading="Are you sure?"
        value={settings.noDiscountMessage}
        onChangeText={(noDiscountMessage) => updateSettings({ noDiscountMessage })}
        limit={LIMITS.noDiscountMessage}
        disabled={!settings.allowNoDiscount}
      />

      <Divider />

      <ToggleRow
        label="Require human verification"
        description="When turned on, the waiter will be asked to verify they are human."
        value={settings.requireHumanCheck}
        onValueChange={(requireHumanCheck) => updateSettings({ requireHumanCheck })}
        disabled={!settings.allowNoDiscount}
      />

      <FieldLabel
        label="Human verification message"
        description="This is the text shown to the waiter, to verify that they are a human."
      />
      <TextArea
        label="Human verification message"
        value={settings.humanCheckMessage}
        onChangeText={(humanCheckMessage) => updateSettings({ humanCheckMessage })}
        limit={LIMITS.humanCheckMessage}
        disabled={!settings.allowNoDiscount}
      />
    </SettingsPage>
  );
}
