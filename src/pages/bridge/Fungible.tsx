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
    name: 'MToken',
    logo: USDT,
    tokens: [
      {
        chainId: ChainId.SEPOLIA,
        isNative: true,
        nativeAddress: '0x4eD4f447EcAf10F40eC1eC577256FA0a21aB1eCB',
        contractAddress: '0xE08fEAab8b07654295ad61AaE95E57ff8229f124',
        decimals: 18
      },
      {
        chainId: ChainId.LOOT_TESTNET,
        isNative: false,
        contractAddress: '0x40dff82a0ef0Bbb1D5f0ff338CAcE82428a0c072',
        decimals: 18
      }
    ]
  },
  {
    id: 1,
    name: 'MToken1',
    logo: USDT,
    tokens: [
      {
        chainId: ChainId.SEPOLIA,
        isNative: true,
        nativeAddress: '0x40dff82a0ef0Bbb1D5f0ff338CAcE82428a0c072',
        contractAddress: '0x0F4299A062c2d2CC8B27564e6320c6fBCE95E492',
        decimals: 18
      },
      {
        chainId: ChainId.LOOT_TESTNET,
        isNative: false,
        contractAddress: '0xadA55AB80D9E3A251B5B130EbA95466D9E503117',
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
              <br />
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
          {err?.reason || err?.data?.message || err?.error?.message || err?.message || 'unknown error'}
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
