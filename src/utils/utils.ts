/**
 * Converts a number to a currency string.
 * Defaults to Australian Dollars.
 */
export const toCurrencyString = (
  amount: number,
  locale: Intl.LocalesArgument = "en-AU",
) =>
  amount.toLocaleString(locale, {
    style: "currency",
    currency: "AUD",
  });

export const formatDate = (date: string) => new Date(date).toLocaleDateString();
