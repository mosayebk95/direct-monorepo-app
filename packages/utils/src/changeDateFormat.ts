import { formatTwoDigits } from './formatTwoDigits';

export const changeDateFormat = (value: string | null, format: string = 'YYYY-MM-DD'): string => {
  if (!value) return '';

  const date = new Date(value);

  // Invalid date value provided
  if (Number.isNaN(date.getTime())) return '';

  const year = date.getFullYear().toString();
  const month = formatTwoDigits(date.getMonth() + 1);
  const day = formatTwoDigits(date.getDate());
  const minutes = formatTwoDigits(date.getMinutes());

  let period = '';
  let h = date.getHours();
  if (format.includes('a')) {
    period = h >= 12 ? 'pm' : 'am';
    h = h % 12 || 12;
  }
  const hours = formatTwoDigits(h);

  const formattedDate = format.replace('YYYY', year).replace('MM', month).replace('DD', day).replace('HH', hours).replace('hh', hours).replace('mm', minutes).replace('a', period);

  return formattedDate;
};
