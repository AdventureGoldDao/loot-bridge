import { Axios } from 'utils/axios'

export function commitErrorMsg(title: string, content: string, func: string, params: string) {
  return Axios.post('error', {
    title,
    content,
    func,
    params
  })
}

export function getUserNFTsByScan(account: string, chainId: number, index: number, size: number) {
  return Axios.get('stpdao/v3/user/nftscan', {
    chainId,
    cursor: (index - 1) * size + 1,
    limit: size,
    account,
    ercType: 'erc721'
  })
}

export function getUserOwnedNFT721List(account: string, chainId: number) {
  return Axios.get(`account/${account}`, {
    chainId
  })
}

export function getUserNFT721Detail(account: string, chainId: number, nftAddress: string) {
  return Axios.get(`account/${account}/${chainId}/${nftAddress}`)
}

export function getUserTransferNFTHistoryList(account: string) {
  return Axios.get(`account/${account}/bridgeRecords`)
}
