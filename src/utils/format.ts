// One date format everywhere, e.g. "Oct 27, 2026 · 9:42 PM", following the
// phone's locale.
const formatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

export function formatWhen(iso: string) {
  return formatter.format(new Date(iso)).replace(/,(?=[^,]*$)/, ' ·');
}
