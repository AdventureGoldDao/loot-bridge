import { ComponentMeta } from '@storybook/react'
import DoubleLogo from 'components/essential/CurrencyLogo/DoubleLogo'
import { Currency } from 'constants/token'
import { ChainId } from 'constants/chain'

export default {
  title: 'Essential/DoubleLogo',
  component: DoubleLogo
} as ComponentMeta<typeof DoubleLogo>

export const Default = () => {
  const token = Currency.getNativeCurrency(ChainId.MAINNET)
  return <DoubleLogo currency0={token} currency1={token} />
}
