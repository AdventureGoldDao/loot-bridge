import BigNumberjs from 'bignumber.js'
import EthUrl from 'assets/svg/eth_logo.svg'
import BSCUrl from 'assets/svg/binance.svg'
import ZkevmSrc from 'assets/images/zkevm_logo.png'

export function numberToHex(number: number) {
  return '0x' + new BigNumberjs(number).toString(16)
}

export enum ChainId {
  MAINNET = 1,
  GÖRLI = 5,
  OPTIMISM = 10,
  CRONOS = 25,
  // TELOS = 40,
  BSC = 56,
  OKEX = 66,
  BSCTEST = 97,
  GNOSIS = 100,
  // FUSE = 122,
  // HECO = 128,
  POLYGON = 137,
  FANTOM = 250,
  ZKSYNC_ERA_TESTNET = 280,
  ZKSYNC_ERA = 324,
  POLYGON_ZK_EVM = 1101,
  POLYGON_ZK_EVM_TESTNET = 1442,
  MOONBEAM = 1284,
  MOONRIVER = 1285,
  DOGECHAIN = 2000,
  KAVA = 2222,
  KLAYTN = 8217,
  FUSION = 32659,
  ARBITRUM = 42161,
  CELO = 42220,
  AVALANCHE = 43114,
  SEPOLIA = 11155111,
  AUROEA = 1313161554,
  HARMONY = 1666600000,
  PALM = 11297108109
}

export const NETWORK_CHAIN_ID: ChainId = process.env.REACT_APP_CHAIN_ID
  ? parseInt(process.env.REACT_APP_CHAIN_ID)
  : ChainId.BSC

export const SUPPORT_NETWORK_CHAIN_IDS: ChainId[] = process.env.REACT_APP_CHAIN_IDS
  ? process.env.REACT_APP_CHAIN_IDS.split(',').map(v => Number(v) as ChainId)
  : [ChainId.BSC]

export const SUPPORTED_NETWORKS: {
  [chainId in ChainId]: {
    id: ChainId
    hexChainId: string
    chainName: string
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
      logo: string
    }
    rpcUrls: string[]
    blockExplorerUrls: string[]
  }
} = {
  [ChainId.MAINNET]: {
    id: ChainId.MAINNET,
    hexChainId: numberToHex(ChainId.MAINNET),
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      logo: EthUrl
    },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://etherscan.com']
  },
  [ChainId.GÖRLI]: {
    id: ChainId.GÖRLI,
    hexChainId: numberToHex(ChainId.GÖRLI),
    chainName: 'Goerli',
    nativeCurrency: {
      name: 'GoerliETH',
      symbol: 'ETH',
      decimals: 18,
      logo: EthUrl
    },
    rpcUrls: ['https://goerli.infura.io/v3/'],
    blockExplorerUrls: ['https://goerli.etherscan.io/']
  },
  [ChainId.OPTIMISM]: {
    id: ChainId.OPTIMISM,
    hexChainId: numberToHex(ChainId.OPTIMISM),
    chainName: 'Optimism',
    nativeCurrency: {
      name: 'OptimismETH',
      symbol: 'ETH',
      decimals: 18,
      logo: 'https://optimistic.etherscan.io/images/svg/brands/optimism.svg'
    },
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io/']
  },
  [ChainId.CRONOS]: {
    id: ChainId.CRONOS,
    hexChainId: numberToHex(ChainId.CRONOS),
    chainName: 'Cronos',
    nativeCurrency: {
      name: 'CRO',
      symbol: 'CRO',
      decimals: 18,
      logo: 'https://cronoscan.com/images/svg/brands/main.svg'
    },
    rpcUrls: ['https://evm.cronos.org'],
    blockExplorerUrls: ['https://cronoscan.com/']
  },
  [ChainId.BSC]: {
    id: ChainId.BSC,
    hexChainId: numberToHex(ChainId.BSC),
    chainName: 'BNB Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
      logo: BSCUrl
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com']
  },
  [ChainId.OKEX]: {
    id: ChainId.OKEX,
    hexChainId: numberToHex(ChainId.OKEX),
    chainName: 'OKEXChain',
    nativeCurrency: {
      name: 'OKEX Coin',
      symbol: 'OKT',
      decimals: 18,
      logo: 'https://pbs.twimg.com/profile_images/1607045883434000385/eP63iKT3_400x400.jpg'
    },
    rpcUrls: ['https://exchainrpc.okex.org'],
    blockExplorerUrls: ['https://www.oklink.com/okexchain/']
  },
  [ChainId.BSCTEST]: {
    id: ChainId.BSCTEST,
    hexChainId: numberToHex(ChainId.BSCTEST),
    chainName: 'BNB Testnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'tBNB',
      decimals: 18,
      logo: BSCUrl
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com/']
  },
  [ChainId.GNOSIS]: {
    id: ChainId.GNOSIS,
    hexChainId: numberToHex(ChainId.GNOSIS),
    chainName: 'Gnosis Chain',
    nativeCurrency: {
      name: 'xDAI',
      symbol: 'xDAI',
      decimals: 18,
      logo: 'https://gnosisscan.io/images/svg/brands/main.svg'
    },
    rpcUrls: ['https://rpc.gnosischain.com'],
    blockExplorerUrls: ['https://gnosisscan.io']
  },
  [ChainId.POLYGON]: {
    id: ChainId.POLYGON,
    hexChainId: numberToHex(ChainId.POLYGON),
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
      logo: 'https://polygonscan.com/images/svg/brands/poly.png'
    },
    rpcUrls: ['https://rpc.ankr.com/polygon'],
    blockExplorerUrls: ['https://polygonscan.com/']
  },
  [ChainId.FANTOM]: {
    id: ChainId.FANTOM,
    hexChainId: numberToHex(ChainId.FANTOM),
    chainName: 'Fantom',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
      logo: 'https://ftmscan.com/images/svg/brands/fantom.svg'
    },
    rpcUrls: ['https://rpc.ankr.com/fantom'],
    blockExplorerUrls: ['https://ftmscan.com']
  },
  [ChainId.ZKSYNC_ERA]: {
    id: ChainId.ZKSYNC_ERA,
    hexChainId: numberToHex(ChainId.ZKSYNC_ERA),
    chainName: 'zkSync Era',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      logo: 'https://zksync.io/favicon-32x32.png'
    },
    rpcUrls: ['https://mainnet.era.zksync.io'],
    blockExplorerUrls: ['https://explorer.zksync.io/']
  },
  [ChainId.ZKSYNC_ERA_TESTNET]: {
    id: ChainId.ZKSYNC_ERA_TESTNET,
    hexChainId: numberToHex(ChainId.ZKSYNC_ERA_TESTNET),
    chainName: 'zkSync Era Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      logo: 'https://zksync.io/favicon-32x32.png'
    },
    rpcUrls: ['https://zksync2-testnet.zksync.dev'],
    blockExplorerUrls: ['https://goerli.explorer.zksync.io/']
  },
  [ChainId.POLYGON_ZK_EVM]: {
    id: ChainId.POLYGON_ZK_EVM,
    hexChainId: numberToHex(ChainId.POLYGON_ZK_EVM),
    chainName: 'Polygon zkEVM',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      logo: ZkevmSrc
    },
    rpcUrls: ['https://zkevm-rpc.com'],
    blockExplorerUrls: ['https://zkevm.polygonscan.com/']
  },
  [ChainId.POLYGON_ZK_EVM_TESTNET]: {
    id: ChainId.POLYGON_ZK_EVM_TESTNET,
    hexChainId: numberToHex(ChainId.POLYGON_ZK_EVM_TESTNET),
    chainName: 'zkEVM Testnet',
    nativeCurrency: {
      name: 'ZKETH',
      symbol: 'ETH',
      decimals: 18,
      logo: ZkevmSrc
    },
    rpcUrls: ['https://rpc.public.zkevm-test.net/'],
    blockExplorerUrls: ['https://explorer.public.zkevm-test.net/']
  },
  [ChainId.MOONBEAM]: {
    id: ChainId.MOONBEAM,
    hexChainId: numberToHex(ChainId.MOONBEAM),
    chainName: 'Moonbeam',
    nativeCurrency: {
      name: 'GLMR',
      symbol: 'GLMR',
      decimals: 18,
      logo: 'https://moonbeam.moonscan.io/images/svg/brands/main.svg'
    },
    rpcUrls: ['https://rpc.api.moonbeam.network'],
    blockExplorerUrls: ['https://moonbeam.moonscan.io']
  },
  [ChainId.MOONRIVER]: {
    id: ChainId.MOONRIVER,
    hexChainId: numberToHex(ChainId.MOONRIVER),
    chainName: 'Moonriver',
    nativeCurrency: {
      name: 'MOVR',
      symbol: 'MOVR',
      decimals: 18,
      logo: 'https://moonriver.moonscan.io/images/svg/brands/main.svg'
    },
    rpcUrls: ['https://rpc.api.moonriver.moonbeam.network'],
    blockExplorerUrls: ['https://moonriver.moonscan.io']
  },
  [ChainId.DOGECHAIN]: {
    id: ChainId.DOGECHAIN,
    hexChainId: numberToHex(ChainId.DOGECHAIN),
    chainName: 'Dogechain',
    nativeCurrency: {
      name: 'DOGE',
      symbol: 'DOGE',
      decimals: 18,
      logo: 'https://icons.llamao.fi/icons/chains/rsz_dogechain.jpg'
    },
    rpcUrls: ['https://rpc.dogechain.dog'],
    blockExplorerUrls: ['https://explorer.dogechain.dog']
  },
  [ChainId.KAVA]: {
    id: ChainId.KAVA,
    hexChainId: numberToHex(ChainId.KAVA),
    chainName: 'Kava',
    nativeCurrency: {
      name: 'KAVA',
      symbol: 'KAVA',
      decimals: 18,
      logo: 'https://explorer.kava.io/images/kava-logo-d1d14a40f6b1398ca363f68181111125.png'
    },
    rpcUrls: ['https://evm2.kava.io'],
    blockExplorerUrls: ['https://explorer.kava.io/']
  },
  [ChainId.KLAYTN]: {
    id: ChainId.KLAYTN,
    hexChainId: numberToHex(ChainId.KLAYTN),
    chainName: 'Klaytn',
    nativeCurrency: {
      name: 'KLAY',
      symbol: 'KLAY',
      decimals: 18,
      logo: 'https://icons.llamao.fi/icons/chains/rsz_klaytn.jpg'
    },
    rpcUrls: ['https://public-node-api.klaytnapi.com/v1/cypress'],
    blockExplorerUrls: ['https://scope.klaytn.com/']
  },
  [ChainId.FUSION]: {
    id: ChainId.FUSION,
    hexChainId: numberToHex(ChainId.FUSION),
    chainName: 'Fusion',
    nativeCurrency: {
      name: 'FSN',
      symbol: 'FSN',
      decimals: 18,
      logo: 'https://fsnscan.com/static/media/fsnLogo.971385b07107c4f1c641bb0bd8db8756.svg'
    },
    rpcUrls: ['https://mainnet.anyswap.exchange'],
    blockExplorerUrls: ['https://fsnscan.com']
  },
  [ChainId.ARBITRUM]: {
    id: ChainId.ARBITRUM,
    hexChainId: numberToHex(ChainId.ARBITRUM),
    chainName: 'Arbitrum One',
    nativeCurrency: {
      name: 'ArbitrumETH',
      symbol: 'ETH',
      decimals: 18,
      logo: 'https://arbiscan.io/images/svg/brands/arbitrum.svg'
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io']
  },
  [ChainId.CELO]: {
    id: ChainId.CELO,
    hexChainId: numberToHex(ChainId.CELO),
    chainName: 'Celo',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
      logo: 'https://celoscan.io/images/svg/brands/mainbrand-1.svg'
    },
    rpcUrls: ['https://rpc.ankr.com/celo'],
    blockExplorerUrls: ['https://celoscan.io']
  },
  [ChainId.AVALANCHE]: {
    id: ChainId.AVALANCHE,
    hexChainId: numberToHex(ChainId.AVALANCHE),
    chainName: 'Avalanche',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
      logo: 'https://snowtrace.io/images/svg/brands/main.svg'
    },
    rpcUrls: ['https://rpc.ankr.com/avalanche'],
    blockExplorerUrls: ['https://snowtrace.io/']
  },
  [ChainId.SEPOLIA]: {
    id: ChainId.SEPOLIA,
    hexChainId: numberToHex(ChainId.SEPOLIA),
    chainName: 'SEPOLIA',
    nativeCurrency: {
      name: 'SepoliaETH',
      symbol: 'ETH',
      decimals: 18,
      logo: EthUrl
    },
    rpcUrls: ['https://sepolia.infura.io/v3/'],
    blockExplorerUrls: ['https://sepolia.etherscan.io/']
  },
  [ChainId.AUROEA]: {
    id: ChainId.AUROEA,
    hexChainId: numberToHex(ChainId.AUROEA),
    chainName: 'Aurora',
    nativeCurrency: {
      name: 'AuroraETH',
      symbol: 'ETH',
      decimals: 18,
      logo: 'https://icons.llamao.fi/icons/chains/rsz_aurora.jpg'
    },
    rpcUrls: ['https://mainnet.aurora.dev/'],
    blockExplorerUrls: ['https://explorer.mainnet.aurora.dev/']
  },
  [ChainId.HARMONY]: {
    id: ChainId.HARMONY,
    hexChainId: numberToHex(ChainId.HARMONY),
    chainName: 'Harmony',
    nativeCurrency: {
      name: 'ONE',
      symbol: 'ONE',
      decimals: 18,
      logo: 'https://miro.medium.com/v2/resize:fill:88:88/2*LOzzPwKfJXD2aXSxBG-nng.png'
    },
    rpcUrls: ['https://api.harmony.one/'],
    blockExplorerUrls: ['https://explorer.harmony.one/']
  },
  [ChainId.PALM]: {
    id: ChainId.PALM,
    hexChainId: numberToHex(ChainId.PALM),
    chainName: 'Palm',
    nativeCurrency: {
      name: 'PALM',
      symbol: 'PALM',
      decimals: 18,
      logo: 'https://icons.llamao.fi/icons/chains/rsz_palm.jpg'
    },
    rpcUrls: ['https://palm-mainnet.public.blastapi.io'],
    blockExplorerUrls: ['https://explorer.palm.io/']
  }
}

export const AllChainList: {
  logo: string
  symbol: string
  name: string
  id: ChainId
  hex: string
}[] = Object.values(SUPPORTED_NETWORKS).map(item => ({
  logo: item.nativeCurrency.logo,
  symbol: item.nativeCurrency.symbol,
  name: item.chainName,
  id: item.id,
  hex: item.hexChainId
}))

export const ChainList = AllChainList.filter(v => SUPPORT_NETWORK_CHAIN_IDS.includes(v.id))

export const ChainListMap: {
  [key in ChainId]?: {
    logo: string
    symbol: string
    name: string
    id: ChainId
    hex: string
  }
} = ChainList.reduce((acc, item) => {
  acc[item.id] = item
  return acc
}, {} as any)
