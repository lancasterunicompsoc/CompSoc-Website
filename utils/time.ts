export interface DateOffset {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
}

export function dateToUnix(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export function unixToDate(date: number): Date {
  return new Date(date * 1000);
}

export function inputToUnix(date: string): number {
  return dateToUnix(new Date(date + "Z"));
}

export function fullDate(date: Date): string {
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

export function justTime(date: Date): string {
  return date.toLocaleString("en-GB", {
    timeZone: "utc",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
}

export function convertToLocalDateTime(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

export function convertToLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
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
  if (startDate === endDate) {
    return unixToTimespan(start, end);
  } else {
    return unixToDatespan(start, end);
  }
}

export function icsTime(
  input: number,
): [number, number, number, number, number] {
  const date = unixToDate(input);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JS Months are zero-based, so add 1
  const day = date.getDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  return [year, month, day, hours, minutes];
}
