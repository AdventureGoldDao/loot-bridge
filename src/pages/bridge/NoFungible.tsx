import Collection from '../components/Collection'
import { Box, MenuItem, Stack, Typography } from '@mui/material'
import PopperCard from '../components/PopperCard'
import { BackedChainId, ChainId, ChainListMap } from '../../constants/chain'
import LogoText from '../../components/LogoText'
import Image from '../../components/Image'
import SwitchIcon from '../../assets/svg/switch.svg'
import { FromPanel } from '../Bridge'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import { Chain } from '../../models/chain'
import { useSwitchNetwork } from '../../hooks/useSwitchNetwork'
import { useActiveWeb3React } from '../../hooks'
import Button from '../../components/Button/Button'
import { ApprovalState } from '../../hooks/useApproveCallback'
import ActionButton from '../../components/Button/ActionButton'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useNFTApproveAllCallback } from '../../hooks/useNFTApproveAllCallback'
import TransacitonPendingModal from '../../components/Modal/TransactionModals/TransactionPendingModal'
import MessageBox from '../../components/Modal/TransactionModals/MessageBox'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { Currency } from '../../constants/token'
import useModal from '../../hooks/useModal'
import { useTransferNFTCallback } from '../../hooks/useTransferNFT'
import { TargetElement } from 'pages/components/SelectTokenPanel'

export interface ChainERC721 {
  chainId: ChainId
  isNative: boolean
  nativeAddress?: string
  contractAddress: string
}

export interface MultiChainERC721 {
  id: number
  name: string
  nativeAddress: string
  tokens: ChainERC721[]
}

export const NFTList: MultiChainERC721[] = [
  {
    id: 0,
    name: 'Loot(for Adventurers)',
    nativeAddress: '0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7',
    tokens: [
      {
        chainId: ChainId.MAINNET,
        isNative: true,
        nativeAddress: '0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7',
        contractAddress: '0x341dC75Ae3074f1eBf053fd7Ae5b92A57634cD3A'
      },
      {
        chainId: ChainId.LOOT,
        isNative: false,
        contractAddress: '0x341dC75Ae3074f1eBf053fd7Ae5b92A57634cD3A'
      }
    ]
  },
  {
    id: 1,
    name: 'MLOOT',
    nativeAddress: '0x1dfe7Ca09e99d10835Bf73044a23B73Fc20623DF',
    tokens: [
      {
        chainId: ChainId.MAINNET,
        isNative: true,
        nativeAddress: '0x1dfe7Ca09e99d10835Bf73044a23B73Fc20623DF',
        contractAddress: '0x77d9e6fd235A18927ED117B63Cf221e91D4CD302'
      },
      {
        chainId: ChainId.LOOT,
        isNative: false,
        contractAddress: '0x77d9e6fd235A18927ED117B63Cf221e91D4CD302'
      }
    ]
  },
  {
    id: 2,
    name: 'DeGods',
    nativeAddress: '0x8821BeE2ba0dF28761AffF119D66390D594CD280',
    tokens: [
      {
        chainId: ChainId.MAINNET,
        isNative: true,
        nativeAddress: '0x8821BeE2ba0dF28761AffF119D66390D594CD280',
        contractAddress: '0x9B75E68dd5b0cbCFEb0cCd88B1396038bc0D64c4'
      },
      {
        chainId: ChainId.LOOT,
        isNative: false,
        contractAddress: '0x9B75E68dd5b0cbCFEb0cCd88B1396038bc0D64c4'
      }
    ]
  },
  {
    id: 3,
    name: 'Mutant Ape Yacht Club',
    nativeAddress: '0x2C6e666bae4Af750a3Bc8B32a066836c5e7dfcB0',
    tokens: [
      {
        chainId: ChainId.MAINNET,
        isNative: true,
        nativeAddress: '0x2C6e666bae4Af750a3Bc8B32a066836c5e7dfcB0',
        contractAddress: '0x60E4d786628Fea6478F785A6d7e704777c86a7c6'
      },
      {
        chainId: ChainId.LOOT,
        isNative: false,
        contractAddress: '0x60E4d786628Fea6478F785A6d7e704777c86a7c6'
      }
    ]
  },
  {
    id: 4,
    name: 'Azuki',
    nativeAddress: '0x15FaaD83bB9887c3e99C5B7998259dF03F7eD108',
    tokens: [
      {
        chainId: ChainId.MAINNET,
        isNative: true,
        nativeAddress: '0x15FaaD83bB9887c3e99C5B7998259dF03F7eD108',
        contractAddress: '0xED5AF388653567Af2F388E6224dC7C4b3241C544'
      },
      {
        chainId: ChainId.LOOT,
        isNative: false,
        contractAddress: '0xED5AF388653567Af2F388E6224dC7C4b3241C544'
      }
    ]
  },
  {
    id: 5,
    name: 'Pudgy Penguins ',
    nativeAddress: '0x0cb532d0D345d53c3D2d2862132643a130C2d6DC',
    tokens: [
      {
        chainId: ChainId.MAINNET,
        isNative: true,
        nativeAddress: '0x0cb532d0D345d53c3D2d2862132643a130C2d6DC',
        contractAddress: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8'
      },
      {
        chainId: ChainId.LOOT,
        isNative: false,
        contractAddress: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8'
      }
    ]
  }
]

export default function NoFungible({
  isEnteredCollection,
  setIsEnteredCollection
}: {
  isEnteredCollection: boolean
  setIsEnteredCollection: Dispatch<SetStateAction<boolean>>
}) {
  const switchNetwork = useSwitchNetwork()
  const { account, chainId } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const { showModal, hideModal } = useModal()

  const [toChain, setToChain] = useState<Chain | null>(ChainListMap[ChainId.LOOT] ?? null)
  const [selectedNft, setSelectedNft] = useState<MultiChainERC721>(NFTList[0])
  const [image, setImage] = useState<string | undefined>()
  const [selectedTokenId, setSelectedTokenId] = useState<string | undefined>()
  const [fromChain, setFromChain] = useState<Chain | null>(ChainListMap[ChainId.MAINNET] ?? null)

  const chainERC721: ChainERC721 | undefined = useMemo(() => {
    return selectedNft.tokens.find(({ chainId }) => {
      return chainId === fromChain?.id
    })
  }, [fromChain?.id, selectedNft.tokens])
  const dstId = useMemo(() => BackedChainId[toChain?.id as number], [toChain])
  const { run: transfer, tFee } = useTransferNFTCallback(dstId, chainERC721?.contractAddress, selectedTokenId)

  const fromChainList = useMemo(() => {
    return selectedNft.tokens.map(({ chainId }) => ChainListMap[chainId])
  }, [selectedNft.tokens])

  const toChainList = useMemo(() => {
    return selectedNft.tokens.map(({ chainId }) => ChainListMap[chainId])
  }, [selectedNft.tokens])

  const [approveState, approveCallback] = useNFTApproveAllCallback(
    chainERC721?.nativeAddress,
    chainERC721?.contractAddress
  )

  const handleSwitchNetwork = useCallback(() => {
    setFromChain(toChain)
    setToChain(fromChain)
    setSelectedTokenId(undefined)
  }, [fromChain, toChain])

  const balance = useCurrencyBalance(account || undefined, Currency.getNativeCurrency(fromChain?.id || undefined))

  const transferClick = useCallback(async () => {
    if (!account || !dstId || !selectedNft || !selectedTokenId) return
    showModal(<TransacitonPendingModal />)
    try {
      const { hash, transactionReceipt } = await transfer(account, dstId, account, account, selectedTokenId)
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
  }, [account, dstId, hideModal, selectedNft, selectedTokenId, showModal, transfer])

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
        return (
          <Button disabled style={{ height: 50, width: '100%', fontSize: 20 }}>
            Loading...
          </Button>
        )
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
          setImage={setImage}
          setSelectedTokenId={setSelectedTokenId}
          selectedNFT={selectedNft}
          setSelectedNFT={setSelectedNft}
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
                        switchNetwork(option?.id)
                        option?.id && setFromChain(ChainListMap[option.id] ?? null)
                      }}
                      value={option?.id}
                      key={option?.id}
                      selected={chainId === option?.id}
                    >
                      <LogoText
                        logo={option?.logo ?? ''}
                        text={option?.name}
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
                        option?.id && setToChain(ChainListMap[option.id] ?? null)
                      }}
                      value={option?.id}
                      key={option?.id}
                      selected={chainId === option?.id}
                    >
                      <LogoText
                        logo={option?.logo ?? ''}
                        text={option?.name}
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
          {!selectedNft || !selectedTokenId ? (
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
              <Image width={76} style={{ borderRadius: '7px' }} src={image ?? ''} />
              <Box ml={34}>
                <Typography color={'#7A9283'} fontSize={18} fontWeight={500}>
                  {selectedNft.name}
                </Typography>
                <Typography color={'#ebebeb'} fontSize={24} fontWeight={600} mt={8}>
                  #{selectedTokenId}
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
