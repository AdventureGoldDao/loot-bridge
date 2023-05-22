import { parseUnits } from '@ethersproject/units'
import { CurrencyAmount, Currency } from 'constants/token'
import JSBI from 'jsbi'

export function tryParseAmount(value?: string, currency?: Currency): CurrencyAmount | undefined {
  if (!value || !currency) {
    return undefined
  }
  try {
    const str = value.split('.')
    if (str.length === 2) {
      value = `${str[0]}.${str[1].slice(0, currency.decimals)}`
    }
    const typedValueParsed = parseUnits(value, currency.decimals).toString()
    if (typedValueParsed !== '0') {
      return new CurrencyAmount(currency, JSBI.BigInt(typedValueParsed))
      // return currency instanceof Currency
      //   ? new CurrencyAmount(currency, JSBI.BigInt(typedValueParsed))
      //   : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed))
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error)
  }
  // necessary for all paths to return a value
  return undefined
}

export const absolute = (val: string) => {
  if (val && val[0] === '-') {
    return val.slice(1)
  }
  return val
}

export const parseBalance = (val: string | undefined, token: Currency, toSignificant = 6): string => {
  const string = val?.toString()
  const amount = new CurrencyAmount(token, JSBI.BigInt(absolute(string ?? ''))).toSignificant(toSignificant)
  if (string && string[0] === '-') {
    return '-' + amount
  } else {
    return amount
  }
}
