/**
 * Formats a price to a string with a currency symbol following the client's locale standards
 *
 * @param value price to be formatted
 */
export function priceFormatter(value: number) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumSignificantDigits: 3,
  }).format(value);
}

/**
 * Formats a number to a string following the client's locale standards
 *
 * @param value price to be formatted
 */
export function numberFormatter(value: number) {
  return new Intl.NumberFormat().format(value);
}
