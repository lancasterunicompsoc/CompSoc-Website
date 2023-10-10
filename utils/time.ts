export interface DateOffset {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
}

export function dateToUnix(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

function unixToDate(date: number): Date {
  return new Date(date * 1000);
}

export function inputToUnix(date: string): number {
  return dateToUnix(new Date(date + "Z"));
}

function fullDate(date: Date): string {
  return date.toLocaleString("en-GB", {
    timeZone: "utc",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
}

function justTime(date: Date): string {
  return date.toLocaleString("en-GB", {
    timeZone: "utc",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
}

export function unixToTimespan(start: number, end: number): string {
  const startDate = unixToDate(start);
  const endDate = unixToDate(end);
  return `${fullDate(startDate)} to ${justTime(endDate)}`;
}

export function unixToDatespan(start: number, end: number): string {
  const startDate = unixToDate(start);
  const endDate = unixToDate(end);
  return `${fullDate(startDate)} to ${fullDate(endDate)}`;
}

export function unixAnySpan(start: number, end: number): string {
  const startDate = unixToDate(start).toDateString();
  const endDate = unixToDate(end).toDateString();
  if (startDate == endDate) {
    return unixToTimespan(start, end);
  } else {
    return unixToDatespan(start, end);
  }
}
