import Collection from '../components/Collection'
import { Box, Stack, Typography } from '@mui/material'
import { BackedChainId, ChainId, ChainList, ChainListMap } from '../../constants/chain'
import Image from '../../components/Image'
import SwitchIcon from '../../assets/svg/switch.svg'
import Logo from 'assets/images/logo.png'
import USDT from '../components/usdt.png'
import { FromPanel, UserNFTCollection } from '../Bridge'
import { useCallback, useMemo, useState } from 'react'
import { Chain } from '../../models/chain'
import { useSwitchNetwork } from '../../hooks/useSwitchNetwork'
import { useActiveWeb3React } from '../../hooks'
import Button from '../../components/Button/Button'
import { ApprovalState } from '../../hooks/useApproveCallback'
import ActionButton from '../../components/Button/ActionButton'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useNFTApproveAllCallback } from '../../hooks/useNFTApproveAllCallback'
import { TRANSFER_NFT_ADDRESS } from '../../constants'
import TransacitonPendingModal from '../../components/Modal/TransactionModals/TransactionPendingModal'
import MessageBox from '../../components/Modal/TransactionModals/MessageBox'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { Currency } from '../../constants/token'
import useModal from '../../hooks/useModal'
import { useTransferNFTCallback } from '../../hooks/useTransferNFT'
import { SelectTokenPanel } from 'pages/components/SelectTokenPanel'

const tokenList = [
  {
    name: 'zk',
    logo: USDT,
    address: '0xc390E699b38F14dB884C635bbf843f7B135113ad',
    id: 11155111
  },
  {
    name: 'Doge',
    logo: Logo,
    address: '0xf61d4B6607F40Ae7fe8F95a54E11e84c9C75B237',
    id: 11155111
  }
]

export default function Fungible() {
  const switchNetwork = useSwitchNetwork()
  const { account, chainId } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const { showModal, hideModal } = useModal()
  const [toToken, setToToken] = useState()
  const [toChain, setToChain] = useState<Chain | null>(ChainListMap[ChainId.LOOT_TESTNET] ?? null)
  const [selectedNft, setSelectedNft] = useState<UserNFTCollection>()

  const dstId = useMemo(() => BackedChainId[toChain?.id as number], [toChain])
  const { run: transfer, tFee } = useTransferNFTCallback(dstId, selectedNft !== undefined ? selectedNft : undefined)

  const [isEnteredCollection, setIsEnteredCollection] = useState(false)
  const [fromChain, setFromChain] = useState<Chain | null>(ChainListMap[ChainId.SEPOLIA] ?? null)
  const [fromToken, setFromToken] = useState()

  const fromChainList = useMemo(() => {
    return ChainList.filter(chain => !(chain.id === toChain?.id))
  }, [toChain?.id])

  const toChainList = useMemo(() => {
    return ChainList.filter(chain => !(chain.id === fromChain?.id))
  }, [fromChain?.id])

  const [approveState, approveCallback] = useNFTApproveAllCallback(
    '0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7',
    TRANSFER_NFT_ADDRESS[chainId as ChainId]
  )

  const handleSwitchNetwork = useCallback(() => {
    setSelectedNft(undefined)
    setFromChain(toChain)
    setToChain(fromChain)
  }, [fromChain, toChain])

  const balance = useCurrencyBalance(account || undefined, Currency.getNativeCurrency(fromChain?.id || undefined))

  const transferClick = useCallback(async () => {
    if (!account || !dstId || !selectedNft) return
    showModal(<TransacitonPendingModal />)
    try {
      const { hash, transactionReceipt } = await transfer(account, dstId, account, selectedNft.tokenId, account)
      hideModal()
      setSelectedNft(undefined)
      showModal(<TransacitonPendingModal pendingText=" " hash={hash} />)
      transactionReceipt.then(() => {
        showModal(
          <MessageBox type="success">
            <>
              <Typography fontSize={22} color={'#A5FFBE'}>
                {'Transaction confirmed' || 'Transaction success'}
              </Typography>
              <Typography color={'#7A9283'}>
                The NFT is expected to be received on the target chain in a few minutes
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
  }, [account, dstId, hideModal, selectedNft, showModal, transfer])

  const ActionButtonNode = useMemo(() => {
    if (!account) {
      return (
        <Button style={{ height: 50, width: '100%', fontSize: 20 }} onClick={toggleWalletModal}>
          Connect Wallet
        </Button>
      )
    }
    if (chainId !== fromChain?.id) {
      return (
        <Button
          style={{ height: 50, width: '100%', fontSize: 20 }}
          onClick={() => switchNetwork(fromChain?.id || undefined)}
        >
          Switch Network
        </Button>
      )
    }
    if (approveState !== ApprovalState.APPROVED) {
      if (approveState === ApprovalState.PENDING) {
        return (
          <Button style={{ height: 50, width: '100%', fontSize: 20 }}>Approving use of {fromChain?.name} NFT...</Button>
        )
      }
      if (approveState === ApprovalState.UNKNOWN) {
        return <Button style={{ height: 50, width: '100%', fontSize: 20 }}>Loading...</Button>
      }
      if (approveState === ApprovalState.NOT_APPROVED) {
        return (
          <Button style={{ height: 50, width: '100%', fontSize: 20 }} onClick={approveCallback}>
            Approve use of {fromChain?.name} NFT
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
    approveCallback,
    approveState,
    balance,
    chainId,
    fromChain?.id,
    fromChain?.name,
    switchNetwork,
    tFee,
    toggleWalletModal,
    transferClick
  ])

  return (
    <>
      {isEnteredCollection ? (
        <Collection
          setSelectedNft={setSelectedNft}
          fromChain={fromChain}
          setIsEnteredCollection={setIsEnteredCollection}
        />
      ) : (
        <>
          <FromPanel height={145} bg="#000">
            <SelectTokenPanel
              chain={fromChain}
              token={fromToken}
              chainId={chainId}
              dirText="From"
              tokenList={tokenList}
              chainList={fromChainList}
              setChain={setFromChain}
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
              chain={toChain}
              token={toToken}
              tokenList={tokenList}
              dirText="To"
              chainList={toChainList}
              setChain={setToChain}
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
                {tFee?.toSignificant() || '--'} {fromChain?.symbol}
              </span>
            </Typography>
            <Typography>
              Estimated Time: <span>3 ~ 5 mins</span>
            </Typography>
          </Stack>
          {ActionButtonNode}
        </>
      )}
    </>
  )
}
