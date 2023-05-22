import { ComponentMeta } from '@storybook/react'
import CurrencyLogo from 'components/essential/CurrencyLogo'
import { ChainId } from 'constants/chain'
import { Currency } from 'constants/token'

export default {
  title: 'Essential/CurrencyLogo',
  component: CurrencyLogo
} as ComponentMeta<typeof CurrencyLogo>

export const Default = () => {
  const token = Currency.getNativeCurrency(ChainId.MAINNET)
  return <CurrencyLogo currency={token} />
}
