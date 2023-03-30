const reformat = (value) => {
  return value.replace(/\s/g, '');
};
/**
 * @param str:String
 * @returns { '# ###.##' }
 * */
const numberWithSpaces = (str) => {
  const parts = str.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
};
const getDigit = (value) => {
  return value ? parseFloat(value) : '';
};
const getFormatted = (value) => {
  if (!value) return '';
  let formatted = numberWithSpaces(value).replace(/,/g, '.');
  // eslint-disable-next-line no-unused-expressions
  !formatted.includes('.') && value.includes('.') && (formatted += '.');
  return formatted;
};
/**
 * Formats a value through a mask: 123.45
 * @param value
 * @returns {{isValid: boolean, digit: number, formatted: string}}
 */
const formatNumber = (value) => {
  value = reformat(value);
  value = value.replace(/[^0-9.,]/g, '').replace(/,/, '.');
  const result = value.match(/([0-9]+)(\.?)([0-9]{0,2})/) || [];
  const digit = getDigit(result[0]);
  return { isValid: !!digit, digit, formatted: getFormatted(result[0]) };
};

export default formatNumber;
