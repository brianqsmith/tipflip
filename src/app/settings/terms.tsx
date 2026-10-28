import { FieldLabel, TextAction, TextArea } from '../../components/settings/controls';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { LIMITS } from '../../settings/defaults';
import { useSettings } from '../../settings/SettingsProvider';

export default function TermsSettings() {
  const { settings, updateSettings } = useSettings();

  return (
    <SettingsPage
      title="Your terms"
      description="These are your terms, that you can set for your waiter. The waiter can view them by tapping a link at the bottom of the screen."
    >
      <FieldLabel
        label="Terms text"
        action={<TextAction label="Clear" onPress={() => updateSettings({ terms: '' })} />}
      />
      <TextArea
        label="Terms text"
        value={settings.terms}
        onChangeText={(terms) => updateSettings({ terms })}
        limit={LIMITS.terms}
        minHeight={220}
      />
    </SettingsPage>
  );
}
