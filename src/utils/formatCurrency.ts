/**
 * Formats a numeric value into a USD currency string using the uk-UA locale.
 *
 * @param value The numeric value (price, amount) to be formatted.
 * @returns The formatted currency string (e.g., "1 234,56 $").
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}
