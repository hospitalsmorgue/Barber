import type { Barber } from "@/lib/barbers";

const dayIndexes: Record<string, number> = { Seg: 1, Ter: 2, Qua: 3, Qui: 4, Sex: 5, Sáb: 6, Dom: 0 };

export function isOpenNow(barber: Barber, at = new Date()) {
  const match = barber.hours.match(/^(.*?) · (\d{2})h às (\d{2})h$/);
  if (!match) return false;
  const [, schedule, start, end] = match;
  const range = schedule.split(" a ").map((day) => day[0].toUpperCase() + day.slice(1));
  if (range.length !== 2) return false;
  const first = dayIndexes[range[0]];
  const last = dayIndexes[range[1]];
  if (first === undefined || last === undefined) return false;
  const days = first <= last
    ? Array.from({ length: last - first + 1 }, (_, index) => (first + index) % 7)
    : Array.from({ length: (7 - first) + last + 1 }, (_, index) => (first + index) % 7);
  const hour = at.getHours() + at.getMinutes() / 60;
  return days.includes(at.getDay()) && hour >= Number(start) && hour < Number(end);
}
