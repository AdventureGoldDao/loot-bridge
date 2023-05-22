import { BigNumber } from '@ethersproject/bignumber'
import { useTokenContract } from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import { CurrencyAmount } from '../constants/token/fractions'
import { Currency } from '../constants/token'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useTotalSupply(token?: Currency): CurrencyAmount | undefined {
  const contract = useTokenContract(!token?.isNative ? token?.address : undefined, false)

  const totalSupply: BigNumber = useSingleCallResult(contract, 'totalSupply', [], undefined, token?.chainId)
    ?.result?.[0]

  return token && totalSupply ? new CurrencyAmount(token, totalSupply.toString()) : undefined
}
