import { TransactionResponse } from '@ethersproject/providers'
import { useCallback } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useActiveWeb3React } from '.'
import { useTransferNFTContract } from './useContract'
import { useGasPriceInfo } from './useGasPrice'
import {
  commitErrorMsg,
  getUserNFT721Detail,
  getUserOwnedNFT721List,
  getUserTransferNFTHistoryList
} from 'utils/fetch/server'
import { useSingleCallResult } from 'state/multicall/hooks'
import { formatNumber } from 'utils'
import { useRequest } from 'ahooks'
import { UserNFTCollection } from 'pages/Bridge'
import { CurrencyAmount } from 'constants/token'

export function useTransferNFTCallback(dstChainId: number, selectedNft: UserNFTCollection | undefined) {
  const addTransaction = useTransactionAdder()
  const contract = useTransferNFTContract()
  const { account, chainId } = useActiveWeb3React()
  const gasPriceInfoCallback = useGasPriceInfo()
  const tFee = useSingleCallResult(
    chainId ? contract : null,
    'estimateSendFee',
    [
      dstChainId,
      account || undefined,
      selectedNft?.tokenId,
      'false',
      '0x00010000000000000000000000000000000000000000000000000000000000030d40'
    ],
    undefined,
    chainId
  ).result

  const run = useCallback(
    async (fromAddr: string, dstChainId: number, toAddr: string, tokenId: number, refundAddr: string) => {
      if (!account) throw new Error('none account')
      if (!contract) throw new Error('none contract')

      const args = [
        fromAddr,
        dstChainId,
        toAddr,
        tokenId,
        refundAddr,
        '0x0000000000000000000000000000000000000000',
        '0x00010000000000000000000000000000000000000000000000000000000000030d40'
      ]

      const method = 'sendFrom'
      const { gasLimit, gasPrice } = await gasPriceInfoCallback(
        contract,
        method,
        args,
        formatNumber(tFee?.nativeFee.toString())
      )

      return contract[method](...args, {
        gasPrice,
        gasLimit,
        value: tFee?.nativeFee.toString(),
        from: account
      })
        .then((response: TransactionResponse) => {
          console.log('🚀 ~ file: useTransferNFT.ts:62 ~ .then ~ response:', response)
          addTransaction(response, {
            summary: `Transfer a NFT`,
            claim: { recipient: `${account}_transfer_nft_${dstChainId}` }
          })
          return response.hash
        })
        .catch((err: any) => {
          if (err.code !== 4001) {
            commitErrorMsg(
              'useTransferNFTCallback',
              JSON.stringify(err?.data?.message || err?.error?.message || err?.message || 'unknown error'),
              method,
              JSON.stringify(args)
            )
          }
          throw err
        })
    },
    [account, contract, tFee, gasPriceInfoCallback, addTransaction]
  )

  return {
    run,
    tFee: tFee?.nativeFee ? CurrencyAmount.ether(tFee?.nativeFee.toString()) : undefined
  }
}

export function useUserOwnedNFTList(account: string, chainId: number) {
  return useRequest(
    async () => {
      const res = await getUserOwnedNFT721List(account, chainId)
      if (!res.data.data.length) {
        return {
          list: [
            {
              account,
              balance: 1,
              chainid: chainId,
              id: 2636,
              nftAddress: '0x1efb2cb5015fdd13120df72bb152c8ec91bcd68e'
            }
          ]
        }
      }
      return {
        list: res.data.data
      }
    },
    {
      ready: !!account && !!chainId,
      pollingInterval: 15000,
      refreshDeps: [account, chainId]
    }
  )
}

export function useTransferNFTHistoryList(account: string) {
  return useRequest(
    async () => {
      const res = await getUserTransferNFTHistoryList(account)
      return {
        list: res.data.data
      }
    },
    {
      ready: !!account,
      pollingInterval: 15000,
      refreshDeps: [account]
    }
  )
}

export function useGetNFTDetail(account: string, chainId: number, nftAddress: string) {
  return useRequest(
    async () => {
      const res = await getUserNFT721Detail(account, chainId, nftAddress)
      return {
        list: res.data.data
      }
    },
    {
      cacheKey: `${account}_${chainId}_${nftAddress}`,
      ready: !!account && !!chainId && !!nftAddress,
      refreshDeps: [account, chainId, nftAddress]
    }
  )
}
