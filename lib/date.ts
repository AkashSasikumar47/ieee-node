const TIME_ZONE = "Asia/Kolkata";

export function today(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(
    new Date(),
  );
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatEventDate(isoDate: string): string {
  const [year = 0, month = 1, day = 1] = isoDate.split("-").map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return `${WEEKDAYS[weekday]}, ${day} ${MONTHS[month - 1]} ${year}`;
}
