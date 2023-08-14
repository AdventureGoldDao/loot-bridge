import MULTICALL_ABI from './abi.json'
import { ChainId } from '../chain'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.GÖRLI]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.OPTIMISM]: '0xcA11bde05977b3631167028862bE2a173976CA11',
  [ChainId.CRONOS]: '0xcA11bde05977b3631167028862bE2a173976CA11',
  [ChainId.BSC]: '0xa9193376D09C7f31283C54e56D013fCF370Cd9D9',
  [ChainId.OKEX]: '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3',
  [ChainId.BSCTEST]: '0x1b37e704388e2f544c62177173e62ac46ce0b9e7',
  [ChainId.KLAYTN]: '0x2AC73343B61ec8C0301aebB39514d1cD12f9013A',
  [ChainId.GNOSIS]: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287',
  [ChainId.POLYGON]: '0x02817C1e3543c2d908a590F5dB6bc97f933dB4BD',
  [ChainId.FANTOM]: '0x22D4cF72C45F8198CfbF4B568dBdB5A85e8DC0B5',
  [ChainId.ZKSYNC_ERA_TESTNET]: '0x86435736988b0f4a8E66b604054E9e8EccE364ad',
  [ChainId.ZKSYNC_ERA]: '0x6F083E74b9154f357303C1D5b16152A4aa22957e',
  [ChainId.POLYGON_ZK_EVM]: '0x45EE0f392F7e21d2A24c6b37F27bd00C22EDa2BA',
  [ChainId.POLYGON_ZK_EVM_TESTNET]: '0x4a47c6f9Aa7Bb3fA79adB3754F1Ad356ef769f18',
  [ChainId.MOONBEAM]: '0xcA11bde05977b3631167028862bE2a173976CA11',
  [ChainId.MOONRIVER]: '0x270f2F35bED92B7A59eA5F08F6B3fd34c8D9D9b5',
  [ChainId.DOGECHAIN]: '0x54518cAEcfA56706eb1e38178F0899560a218c20',
  [ChainId.KAVA]: '0x5fA054b260879b368508310124b19ca15268D216',
  [ChainId.FUSION]: '',
  [ChainId.ARBITRUM]: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
  [ChainId.CELO]: '0x9aac9048fC8139667D6a2597B902865bfdc225d3',
  [ChainId.AVALANCHE]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.MUMBAI_POLYGON]: '0xa72E367726540518e4A3B8157Ef8c3e4DAFa56E7',
  [ChainId.LOOT]: '',
  [ChainId.SEPOLIA]: '0xE78D911B56a6321bF622172D32D916f9563e8D84',
  [ChainId.AUROEA]: '0xcA11bde05977b3631167028862bE2a173976CA11',
  [ChainId.HARMONY]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.PALM]: '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
