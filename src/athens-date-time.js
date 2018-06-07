import { DateTime } from "luxon";

export function create(isoString) {
  return DateTime.fromISO(isoString, { zone: "America/New_York" }).setLocale(
    "en-US"
  );
}

export function timeToString(time) {
  return time.toLocaleString(DateTime.TIME_SIMPLE);
}

export function dateToString(date) {
  return date.toLocaleString(DateTime.DATE_HUGE);
}

export function timeRangeToString(timeStart, timeEnd) {
  return timeToString(timeStart) + " - " + timeToString(timeEnd);
}

export function hasSameDate(time1, time2) {
  if (
    time1.hasSame(time2, "year") &&
    time1.hasSame(time2, "month") &&
    time1.hasSame(time2, "day")
  ) {
    return true;
  }
  return false;
}

export function dateTimeToString(dateTime) {
  return dateTime.toLocaleString(DateTime.DATETIME_SHORT);
}
