import { Currency } from './currency'

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Currency && currencyB instanceof Currency) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Currency) {
    return false
  } else if (currencyB instanceof Currency) {
    return false
  } else {
    return currencyA === currencyB
  }
}
