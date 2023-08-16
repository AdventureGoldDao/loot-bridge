import { TransactionResponse } from '@ethersproject/providers'
import { useCallback, useEffect, useState } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useActiveWeb3React } from '.'
import { useTransferNFTContract } from './useContract'
import { useGasPriceInfo } from './useGasPrice'
import { commitErrorMsg, getUserNFT721List, getUserTransferNFTHistoryList } from 'utils/fetch/server'
import { useSingleCallResult } from 'state/multicall/hooks'
import { formatNumber } from 'utils'
import { useRequest } from 'ahooks'

export function useTransferNFTCallback(dstChainId: number, tokenId: number) {
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
      tokenId,
      'false',
      '0x00010000000000000000000000000000000000000000000000000000000000030d40'
    ],
    undefined,
    chainId
  ).result

  return useCallback(
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
      console.log(formatNumber(tFee?.nativeFee.toString()))

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
}

export function useUserNFTList(tokenAddress: string) {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const pageSize = 100
  const [result, setResult] = useState<any>([])

  useEffect(() => {
    setCurrentPage(1)
  }, [tokenAddress])

  useEffect(() => {
    ;(async () => {
      if (!tokenAddress) {
        setResult([])
        setTotal(0)
        return
      }
      setLoading(true)
      try {
        const res = await getUserNFT721List()
        setLoading(false)
        const data = res as any
        if (!data.data.data) {
          setResult([])
          setTotal(0)
          return
        }
        setTotal(data.total)
        setResult(data.data.data)
      } catch (error) {
        setResult([])
        setTotal(0)
        setLoading(false)
        console.error('useUserNFTList', error)
      }
    })()
  }, [currentPage, tokenAddress])

  return {
    loading: loading,
    page: {
      setCurrentPage,
      currentPage,
      total,
      totalPage: Math.ceil(total / pageSize),
      pageSize
    },
    result
  }
}

export async function useTransferNFTHistoryList(params: string) {
  const { account } = useActiveWeb3React()

  return useRequest(
    async () => {
      const res = await getUserTransferNFTHistoryList()
      return res.data
    },
    {
      ready: !!params,
      pollingInterval: 15000,
      refreshDeps: [account]
    }
  )
}
