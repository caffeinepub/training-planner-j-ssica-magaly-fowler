import { Weekday } from '@/backend';

export const WEEKDAY_LABELS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export type WeekdayLabel = typeof WEEKDAY_LABELS[number];

export function weekdayLabelToEnum(label: WeekdayLabel): Weekday {
  const mapping: Record<WeekdayLabel, Weekday> = {
    Monday: Weekday.monday,
    Tuesday: Weekday.tuesday,
    Wednesday: Weekday.wednesday,
    Thursday: Weekday.thursday,
    Friday: Weekday.friday,
    Saturday: Weekday.saturday,
    Sunday: Weekday.sunday,
  };
  return mapping[label];
}

export function weekdayEnumToLabel(day: Weekday): WeekdayLabel {
  const mapping: Record<Weekday, WeekdayLabel> = {
    [Weekday.monday]: 'Monday',
    [Weekday.tuesday]: 'Tuesday',
    [Weekday.wednesday]: 'Wednesday',
    [Weekday.thursday]: 'Thursday',
    [Weekday.friday]: 'Friday',
    [Weekday.saturday]: 'Saturday',
    [Weekday.sunday]: 'Sunday',
  };
  return mapping[day];
}

export function formatCompletionTime(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDuration(minutes?: bigint): string {
  if (!minutes) return 'Not specified';
  const mins = Number(minutes);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  if (remainingMins === 0) return `${hours} hr`;
  return `${hours} hr ${remainingMins} min`;
}
