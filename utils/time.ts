import { DateTime } from 'luxon';

type DateTimeConvertible = string | Date | DateTime | number | null;

export function toDateTimeObject(spec: DateTimeConvertible | undefined): DateTime | null {
  if (spec instanceof DateTime) {
    return spec.setLocale('pl-PL');
  } else if (typeof spec === 'string') {
    return DateTime.fromISO(spec).setLocale('pl-PL');
  } else if (typeof spec === 'number') {
    return DateTime.fromMillis(spec * 1000).setLocale('pl-PL');
  } else if (spec instanceof Date) {
    return DateTime.fromJSDate(spec).setLocale('pl-PL');
  } else if (typeof spec === 'undefined') {
    return DateTime.now().setLocale('pl-PL');
  } else if (spec === null) {
    return null;
  }

  throw new Error('Invalid date');
}

/**
 * Returns DateTime as a string for in ISO acceptable for <input type="datetime-local" />
 */
export function toInputDateTime(value: string) {
  return new Date(value).toISOString().slice(0, 16);
}

/**
 * Returns DateTime as a string for in ISO acceptable for <input type="datetime-local" />
 */
export function toInputDate(value: string) {
  return new Date(value).toISOString().slice(0, 10);
}

/**
 * Returns DateTime as a string format '2023-12-01 1:28:08PM'
 */
export const getFormatedDateTime = (dateTime?: DateTimeConvertible): string => {
  const dt = toDateTimeObject(dateTime);
  return dt ? dt.toFormat('dd-MM-yyyy hh:mm').toUpperCase() : '';
};

/**
 * Returns DateTime as a string  format 'Mon 11 Sep'
 * @param dateTime
 */
export const getFormatedDate = (dateTime?: DateTimeConvertible): string => {
  const dt = toDateTimeObject(dateTime);

  return dt ? dt.toLocaleString() : '';
};