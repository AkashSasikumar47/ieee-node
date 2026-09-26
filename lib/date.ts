const TIME_ZONE = "Asia/Kolkata";

export function today(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(
    new Date(),
  );
}

export function formatEventDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${isoDate}T00:00:00+05:30`));
}

export function daysUntil(isoDate: string): number {
  const start = Date.parse(`${today()}T00:00:00+05:30`);
  const target = Date.parse(`${isoDate}T00:00:00+05:30`);
  return Math.round((target - start) / 86_400_000);
}

export function relativeLabel(isoDate: string): string | null {
  const days = daysUntil(isoDate);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days > 1 && days <= 7) return `In ${days} days`;
  return null;
}
