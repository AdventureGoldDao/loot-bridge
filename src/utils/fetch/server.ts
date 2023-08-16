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

export function getUserNFT721List() {
  return Axios.get('user/erc721/list')
}

export function getUserTransferNFTHistoryList() {
  return Axios.get('user/history/list')
}
