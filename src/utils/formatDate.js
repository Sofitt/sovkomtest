import { DateTime } from 'luxon';

const validateDateFormat = (dateStr) => {
  const date = new Date(dateStr);
  return date instanceof Date && !Number.isNaN(date);
};
const validateDay = (day, month, year) => {
  return day <= new Date(year, month, 0).getDate();
};
const formatDateDefault = (date) => {
  date = new Date(date);
  if (!validateDateFormat(date)) {
    return 'Wrong date format';
  }
  const d = date.getDate();
  const m = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const y = date.getFullYear();
  if (!validateDay(d, m, y)) {
    return 'Wrong day count';
  }
  return `${d}.${m}.${y}`;
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
