import { TransactionResponse, TransactionReceipt } from '@ethersproject/providers'
import { useCallback } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useActiveWeb3React } from '.'
import { useTransferTokenContract } from './useContract'
import { useGasPriceInfo } from './useGasPrice'
import { commitErrorMsg, getUserNFT721Detail, getUserTransferNFTHistoryList } from 'utils/fetch/server'
import { useSingleCallResult } from 'state/multicall/hooks'
import { formatNumber } from 'utils'
import { useRequest } from 'ahooks'
import { CurrencyAmount } from 'constants/token'
import { ChainToken } from '../pages/bridge/Fungible'

export function useTransferTokenCallback(
  dstChainId: number,
  selectedChainToken: ChainToken,
  amount: CurrencyAmount | undefined
) {
  const addTransaction = useTransactionAdder()
  const contract = useTransferTokenContract(selectedChainToken?.contractAddress)
  const { account, chainId } = useActiveWeb3React()
  const gasPriceInfoCallback = useGasPriceInfo()
  const tFee = useSingleCallResult(
    chainId ? contract : null,
    'estimateSendFee',
    [
      dstChainId,
      account || undefined,
      amount?.raw?.toString(),
      'false',
      '0x00010000000000000000000000000000000000000000000000000000000000030d40'
    ],
    undefined,
    chainId
  ).result

  const run = useCallback(
    async (
      fromAddr: string,
      dstChainId: number,
      toAddr: string,
      amount: CurrencyAmount,
      refundAddr: string
    ): Promise<{
      hash: string
      transactionReceipt: Promise<TransactionReceipt>
    }> => {
      if (!account) throw new Error('none account')
      if (!contract) throw new Error('none contract')
      if (!amount) throw new Error('none amount')

      const args = [
        fromAddr,
        dstChainId,
        toAddr,
        amount.raw.toString(),
        refundAddr,
        '0x0000000000000000000000000000000000000000',
        '0x'
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
          addTransaction(response, {
            summary: `Bridge ${amount.toExact()} ${amount.currency.symbol}`,
            claim: { recipient: `${account}_transfer_token_${dstChainId}` }
          })
          return {
            tFee,
            hash: response.hash,
            transactionReceipt: response.wait(1)
          }
        })
        .catch((err: any) => {
          if (err.code !== 4001) {
            commitErrorMsg(
              'useTransferTokenCallback',
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

export function useTransferTokenHistoryList(account: string) {
  return useRequest(
    async () => {
      const res = await getUserTransferNFTHistoryList(account)
      return {
        list: res.data.data.sort((a: any, b: any) => b.timestamp - a.timestamp)
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
