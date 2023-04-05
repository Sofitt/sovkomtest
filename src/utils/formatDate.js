import { DateTime } from 'luxon';

const validateDateFormat = (date) => {
  return date instanceof Date && !Number.isNaN(date);
};
const validateDay = (dateStr, day, month, year) => {
  const dateFormatEqual = dateStr === `${year}-${month}-${day}`;
  return dateFormatEqual && day <= new Date(year, month, 0).getDate();
};
/**
 * yyyy-MM-dd => dd.MM.yyyy
 * @param dateStr:string
 * @returns {string}
 */
const formatDateDefault = (dateStr) => {
  const date = new Date(dateStr);
  if (!validateDateFormat(date)) {
    return 'Wrong date format';
  }
  const d = date.getDate();
  const m = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const y = date.getFullYear();
  return validateDay(dateStr, d, m, y)
    ? `${d}.${m}.${y}`
    : 'Wrong day count';
};

/* luxon был предустановлен. Если его нельзя было использовать, то есть код выше. */
const formatDate = (date) => {
  let formatted = DateTime.fromFormat(date, 'yyyy-MM-dd');
  if (formatted?.invalid) {
    if (formatted?.invalid.reason === 'unit out of range') {
      formatted = 'Wrong day count';
    } else {
      formatted = 'Wrong date format';
    }
  } else {
    formatted = formatted.toFormat('dd.MM.yyyy');
  }
  return formatted;
};
export default formatDateDefault;
