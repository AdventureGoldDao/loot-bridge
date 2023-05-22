import { ChainId } from 'constants/chain'
import { useActiveWeb3React } from 'hooks'
import { useCallback } from 'react'
import { triggerSwitchChain } from 'utils/triggerSwitchChain'

export function useSwitchNetwork() {
  const { library, account } = useActiveWeb3React()

  return useCallback(
    (chainId?: ChainId) => {
      if (!chainId) return
      triggerSwitchChain(library, chainId, account || '')
    },
    [account, library]
  )
}
