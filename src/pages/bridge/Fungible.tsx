import { Box, Stack, Typography } from '@mui/material'
import { BackedChainId, ChainId, ChainListMap } from '../../constants/chain'
import Image from '../../components/Image'
import SwitchIcon from '../../assets/svg/switch.svg'
import USDT from '../components/usdt.png'
import { FromPanel } from '../Bridge'
import { useCallback, useMemo, useState } from 'react'
import { useSwitchNetwork } from '../../hooks/useSwitchNetwork'
import { useActiveWeb3React } from '../../hooks'
import Button from '../../components/Button/Button'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import ActionButton from '../../components/Button/ActionButton'
import { useWalletModalToggle } from '../../state/application/hooks'
import TransacitonPendingModal from '../../components/Modal/TransactionModals/TransactionPendingModal'
import MessageBox from '../../components/Modal/TransactionModals/MessageBox'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { Currency, CurrencyAmount } from '../../constants/token'
import useModal from '../../hooks/useModal'
import { SelectTokenPanel } from 'pages/components/SelectTokenPanel'
import { useTransferTokenCallback } from '../../hooks/useTransferToken'

export interface ChainToken {
  chainId: ChainId
  isNative: boolean
  nativeAddress?: string
  contractAddress: string
  decimals: number
}

export interface MultiChainToken {
  id: number
  name: string
  logo: string
  tokens: ChainToken[]
}

const tokenList: MultiChainToken[] = [
  {
    id: 0,
    name: 'USDT',
    logo: USDT,
    tokens: [
      {
        chainId: ChainId.MAINNET,
        isNative: true,
        nativeAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        contractAddress: '0x976Ce6d3a66F276D610eb6Fa82B6Adca273A798F',
        decimals: 6
      },
      {
        chainId: ChainId.LOOT,
        isNative: false,
        contractAddress: '0x78e0AeCd5Bbfd12557632106B0B4332BA04a6556',
        decimals: 18
      }
    ]
  },
  {
    id: 1,
    name: 'USDC',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    tokens: [
      {
        chainId: ChainId.MAINNET,
        isNative: true,
        nativeAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        contractAddress: '0x91854a72aE54f69351A545d1AE8b74c4E2959d08',
        decimals: 6
      },
      {
        chainId: ChainId.LOOT,
        isNative: false,
        contractAddress: '0xccf83073b64c987D1ca9028055864C9bC66Db838',
        decimals: 18
      }
    ]
  },
  {
    id: 2,
    name: 'DAI',
    logo: 'https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508',
    tokens: [
      {
        chainId: ChainId.MAINNET,
        isNative: true,
        nativeAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        contractAddress: '0x238976DC5F6cfa166A79A82FD526e9B8397a5046',
        decimals: 18
      },
      {
        chainId: ChainId.LOOT,
        isNative: false,
        contractAddress: '0x238976DC5F6cfa166A79A82FD526e9B8397a5046',
        decimals: 18
      }
    ]
  }
]

export default function Fungible() {
  const switchNetwork = useSwitchNetwork()
  const { account, chainId } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const { showModal, hideModal } = useModal()
  const [fromToken, setFromToken] = useState<ChainToken>(tokenList[0].tokens[0])
  const [toToken, setToToken] = useState<ChainToken>(tokenList[0].tokens[1])
  const [selectedMultiToken, setSelectedMultiToken] = useState<MultiChainToken>(tokenList[0])
  const [amount, setAmount] = useState<CurrencyAmount | undefined>()
  const dstId = useMemo(() => BackedChainId[toToken.chainId as number], [toToken])
  const { run: transfer, tFee } = useTransferTokenCallback(dstId, fromToken, amount)

  const [approveState, approveCallback] = useApproveCallback(
    amount,
    fromToken.isNative ? fromToken.contractAddress : undefined
  )

  const handleSwitchNetwork = useCallback(() => {
    setFromToken(toToken)
    setToToken(fromToken)
  }, [fromToken, toToken])

  const onSelectToken = useCallback((multiToken: MultiChainToken) => {
    const tokens = multiToken.tokens
    setSelectedMultiToken(multiToken)
    setFromToken(tokens[0])
    setToToken(tokens[1])
  }, [])

  const balance = useCurrencyBalance(account || undefined, Currency.getNativeCurrency(fromToken.chainId || undefined))
  const tokenBalance = useCurrencyBalance(
    account || undefined,
    new Currency(fromToken.chainId, fromToken.nativeAddress ?? fromToken.contractAddress, fromToken.decimals)
  )

  const transferClick = useCallback(async () => {
    if (!account || !dstId || !amount) return
    showModal(<TransacitonPendingModal />)
    try {
      const { hash, transactionReceipt } = await transfer(account, dstId, account, amount, account)
      hideModal()
      showModal(<TransacitonPendingModal pendingText=" " hash={hash} />)
      transactionReceipt.then(() => {
        showModal(
          <MessageBox type="success">
            <>
              <Typography fontSize={22} color={'#A5FFBE'}>
                {'Transaction confirmed' || 'Transaction success'}
              </Typography>
              <Typography color={'#7A9283'}>
                The Token is expected to be received on the target chain in a few minutes
              </Typography>
            </>
          </MessageBox>
        )
      })
    } catch (err: any) {
      hideModal()
      showModal(
        <MessageBox type="error">
          {err?.data?.message || err?.error?.message || err?.message || 'unknown error'}
        </MessageBox>
      )
      console.error(err)
    }
  }, [account, amount, dstId, hideModal, showModal, transfer])

  const ActionButtonNode = useMemo(() => {
    if (!account) {
      return (
        <Button style={{ height: 50, width: '100%', fontSize: 20 }} onClick={toggleWalletModal}>
          Connect Wallet
        </Button>
      )
    }
    if (chainId !== fromToken.chainId) {
      return (
        <Button
          style={{ height: 50, width: '100%', fontSize: 20 }}
          onClick={() => switchNetwork(fromToken.chainId || undefined)}
        >
          Switch Network
        </Button>
      )
    }
    if (!amount) {
      return (
        <Button style={{ height: 50, width: '100%', fontSize: 20 }} disabled>
          Enter Amount
        </Button>
      )
    }
    if (tokenBalance && amount?.greaterThan(tokenBalance)) {
      return (
        <Button style={{ height: 50, width: '100%', fontSize: 20 }} disabled>
          {`Insufficient ${selectedMultiToken.name}`}
        </Button>
      )
    }
    if (!tFee) {
      return (
        <Button style={{ height: 50, width: '100%', fontSize: 20 }} disabled>
          Loading Fess
        </Button>
      )
    }
    if (approveState !== ApprovalState.APPROVED) {
      if (approveState === ApprovalState.PENDING) {
        return (
          <Button disabled style={{ height: 50, width: '100%', fontSize: 20 }}>
            Approving use of {selectedMultiToken.name}...
          </Button>
        )
      }
      if (approveState === ApprovalState.NOT_APPROVED) {
        return (
          <Button style={{ height: 50, width: '100%', fontSize: 20 }} onClick={approveCallback}>
            Approve use of {selectedMultiToken?.name}
          </Button>
        )
      }
    }
    if (!balance || balance.lessThan('0') || (tFee && balance.lessThan(tFee))) {
      return (
        <Button style={{ height: 50, width: '100%', fontSize: 20 }} disabled>
          Insufficient Gas Fee
        </Button>
      )
    }
    return <ActionButton width="100%" height="50px" onAction={transferClick} actionText="Transfer" />
  }, [
    account,
    amount,
    approveCallback,
    approveState,
    balance,
    chainId,
    fromToken.chainId,
    selectedMultiToken.name,
    switchNetwork,
    tFee,
    toggleWalletModal,
    tokenBalance,
    transferClick
  ])

  return (
    <>
      <FromPanel height={145} bg="#000">
        <SelectTokenPanel
          chain={ChainListMap[fromToken.chainId]}
          amount={amount}
          setAmount={setAmount}
          multiToken={selectedMultiToken}
          token={fromToken}
          chainId={fromToken.chainId}
          dirText="From"
          tokenList={tokenList}
          setMultiToken={onSelectToken}
          setToken={setFromToken}
        />
      </FromPanel>
      <Box
        width={'fit-content'}
        position={'absolute'}
        sx={{
          cursor: 'pointer',
          top: '44.5%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(90deg)'
        }}
        onClick={handleSwitchNetwork}
      >
        <Image width={50} src={SwitchIcon} />
      </Box>
      <FromPanel height={145} bg="#000">
        <SelectTokenPanel
          chain={ChainListMap[toToken.chainId]}
          chainId={toToken.chainId}
          amount={amount}
          setAmount={setAmount}
          token={toToken}
          multiToken={selectedMultiToken}
          tokenList={tokenList}
          dirText="To"
          setMultiToken={onSelectToken}
          setToken={setToToken}
        />
      </FromPanel>
      <Stack
        mb={20}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          height: 54,
          backgroundColor: '#000',
          borderRadius: '12px',
          padding: '16px 25px',
          '& p': {
            fontWeight: 600,
            color: '#7A9283',
            lineHeight: '22px',
            fontSize: 16,
            '& span': {
              color: '#A5FFBE'
            }
          }
        }}
      >
        <Typography>
          Fees:{' '}
          <span>
            {tFee?.toSignificant() || '--'} {ChainListMap[fromToken.chainId]?.symbol}
          </span>
        </Typography>
        <Typography>
          Estimated Time: <span>3 ~ 5 mins</span>
        </Typography>
      </Stack>
      {ActionButtonNode}
    </>
  )
}
