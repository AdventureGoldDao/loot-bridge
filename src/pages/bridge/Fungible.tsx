import Collection from '../components/Collection'
import { Box, MenuItem, Stack, Typography } from '@mui/material'
import PopperCard from '../components/PopperCard'
import { BackedChainId, ChainId, ChainList, ChainListMap } from '../../constants/chain'
import LogoText from '../../components/LogoText'
import Image from '../../components/Image'
import SwitchIcon from '../../assets/svg/switch.svg'
import { FromPanel, TargetElement, UserNFTCollection } from '../Bridge'
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

export default function Fungible() {
  const switchNetwork = useSwitchNetwork()
  const { account, chainId } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const { showModal, hideModal } = useModal()

  const [toChain, setToChain] = useState<Chain | null>(ChainListMap[ChainId.LOOT] ?? null)
  const [selectedNft, setSelectedNft] = useState<UserNFTCollection>()

  const dstId = useMemo(() => BackedChainId[toChain?.id as number], [toChain])
  const { run: transfer, tFee } = useTransferNFTCallback(dstId, selectedNft !== undefined ? selectedNft : undefined)

  const [isEnteredCollection, setIsEnteredCollection] = useState(false)
  const [fromChain, setFromChain] = useState<Chain | null>(ChainListMap[ChainId.MAINNET] ?? null)

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

    if (chainId !== fromChain?.id)
      return (
        <Button
          style={{ height: 50, width: '100%', fontSize: 20 }}
          onClick={() => switchNetwork(fromChain?.id || undefined)}
        >
          Switch Network
        </Button>
      )
    if (!selectedNft) {
      return (
        <Button style={{ height: 50, width: '100%', fontSize: 20 }} disabled>
          Select NFT
        </Button>
      )
    }
    if (approveState !== ApprovalState.APPROVED && fromChain?.id === 1) {
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
    selectedNft,
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
          <FromPanel>
            <Box
              sx={{
                border: '1px solid #3C5141',
                borderRadius: '10px',
                backgroundColor: '#151815'
              }}
            >
              <PopperCard
                sx={{
                  width: 530,
                  marginTop: 13,
                  maxHeight: '50vh',
                  overflowY: 'auto',
                  backgroundColor: '#2C353D',
                  border: '1px solid #FDFFAC',
                  '&::-webkit-scrollbar': {
                    display: 'none'
                  }
                }}
                placement="bottom-start"
                targetElement={<TargetElement chain={fromChain} />}
              >
                <>
                  {fromChainList?.map(option => (
                    <MenuItem
                      onClick={() => {
                        switchNetwork(option.id)
                        setFromChain(ChainListMap[option.id] ?? null)
                      }}
                      value={option.id}
                      key={option.id}
                      selected={chainId === option.id}
                    >
                      <LogoText
                        logo={option.logo}
                        text={option.name}
                        gapSize={'large'}
                        fontSize={16}
                        fontWeight={600}
                        color="#A5FFBE"
                      />
                    </MenuItem>
                  ))}
                </>
              </PopperCard>
            </Box>
          </FromPanel>
          <Box
            width={'fit-content'}
            position={'absolute'}
            sx={{
              cursor: 'pointer',
              top: '35%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(90deg)'
            }}
            onClick={handleSwitchNetwork}
          >
            <Image width={50} src={SwitchIcon} />
          </Box>
          <FromPanel>
            <Box
              sx={{
                border: '1px solid #3C5141',
                borderRadius: '10px',
                backgroundColor: '#151815'
              }}
            >
              <PopperCard
                sx={{
                  width: 530,
                  marginTop: 13,
                  maxHeight: '50vh',
                  overflowY: 'auto',
                  backgroundColor: '#2C353D',
                  border: '1px solid #FDFFAC',
                  '&::-webkit-scrollbar': {
                    display: 'none'
                  }
                }}
                placement="bottom-start"
                targetElement={<TargetElement chain={toChain} />}
              >
                <>
                  {toChainList?.map(option => (
                    <MenuItem
                      onClick={() => {
                        setToChain(ChainListMap[option.id] ?? null)
                      }}
                      value={option.id}
                      key={option.id}
                      selected={chainId === option.id}
                    >
                      <LogoText
                        logo={option.logo}
                        text={option.name}
                        gapSize={'large'}
                        fontSize={16}
                        fontWeight={600}
                        color="#A5FFBE"
                      />
                    </MenuItem>
                  ))}
                </>
              </PopperCard>
            </Box>
          </FromPanel>
          {!selectedNft ? (
            <Stack
              direction={'row'}
              sx={{
                border: '1px solid #4B5954',
                backgroundColor: '#111211',
                justifyContent: 'center',
                alignItems: 'center',
                height: 96,
                padding: '10px 9px',
                borderRadius: '12px',
                cursor: 'pointer',
                margin: '20px 0',
                color: '#A5FFBE',
                fontWeight: 600
              }}
              onClick={() => {
                setIsEnteredCollection(true)
              }}
            >
              + Select NFT
            </Stack>
          ) : (
            <Stack
              direction={'row'}
              sx={{
                border: '1px solid #4B5954',
                backgroundColor: '#111211',
                height: 96,
                cursor: 'pointer',
                padding: '10px 9px',
                borderRadius: '12px',
                margin: '20px 0'
              }}
              onClick={() => {
                setIsEnteredCollection(true)
              }}
            >
              <Image width={76} style={{ borderRadius: '7px' }} src={selectedNft?.imageUri || ''} />
              <Box ml={34}>
                <Typography color={'#7A9283'} fontSize={18} fontWeight={500}>
                  {selectedNft.name}
                </Typography>
                <Typography color={'#ebebeb'} fontSize={24} fontWeight={600} mt={8}>
                  #{selectedNft.tokenId}
                </Typography>
              </Box>
            </Stack>
          )}
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
