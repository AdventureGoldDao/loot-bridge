import { Currency } from './token'
import JSBI from 'jsbi'
import { ChainId } from './chain'
import { ConnectionType } from 'connection/types'

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH

export const BAST_TOKEN: { [chainId in ChainId]?: Currency } = {
  [ChainId.MAINNET]: new Currency(ChainId.MAINNET, '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', 18, 'USDT', 'USDT')
}

export const SELECTABLE_ENABLE_WALLETS: ConnectionType[] = [
  ConnectionType.INJECTED,
  ConnectionType.WALLET_CONNECT_V2
  // ConnectionType.UNISWAP_WALLET_V2,
]

export const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL

export const TRANSFER_NFT_ADDRESS: { [chainId in ChainId]?: string } = {
  // [ChainId.MUMBAI_POLYGON]: '0xE189dcED33fD18D379Ed8455a972fDA7FA822F5F',
  // [ChainId.BSCTEST]: '0x1EFB2Cb5015FDd13120dF72BB152c8Ec91bCD68e'
  [ChainId.LOOT]: '0x341dC75Ae3074f1eBf053fd7Ae5b92A57634cD3A',
  [ChainId.MAINNET]: '0x341dC75Ae3074f1eBf053fd7Ae5b92A57634cD3A'
}

export const autoConnectInjectedEveryone = false

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C'
]
