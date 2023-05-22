import { useMemo } from 'react'

import { useTokenContract } from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import { CurrencyAmount, Currency } from '../constants/token'

export function useTokenAllowance(token?: Currency, owner?: string, spender?: string): CurrencyAmount | undefined {
  const contract = useTokenContract(!token?.isNative ? token?.address : undefined, false)

  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs, undefined, token?.chainId).result

  return useMemo(
    () => (token && allowance ? new CurrencyAmount(token, allowance.toString()) : undefined),
    [token, allowance]
  )
}
