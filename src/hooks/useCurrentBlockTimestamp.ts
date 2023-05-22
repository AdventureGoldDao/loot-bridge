import { ChainId } from 'constants/chain'
import { BigNumber } from 'ethers'
import { useSingleCallResult } from '../state/multicall/hooks'
import { useMulticallContract } from './useContract'

// gets the current timestamp from the blockchain
export default function useCurrentBlockTimestamp(chainId?: ChainId): BigNumber | undefined {
  const multicall = useMulticallContract(chainId)
  return useSingleCallResult(multicall, 'getCurrentBlockTimestamp', [], undefined, chainId)?.result?.[0]
}
