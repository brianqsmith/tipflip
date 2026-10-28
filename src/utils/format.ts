// One date format everywhere, e.g. "Oct 27, 2026 · 9:42 PM", following the
// phone's locale. History shows the date and time parts in separate columns.
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });

export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

export function formatTime(iso: string) {
  return timeFormatter.format(new Date(iso));
}

export function formatWhen(iso: string) {
  return `${formatDate(iso)} · ${formatTime(iso)}`;
}
