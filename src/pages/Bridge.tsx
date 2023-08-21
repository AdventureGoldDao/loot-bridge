import { Box, Button as MuiButton, ButtonGroup, Typography, styled, Stack, MenuItem } from '@mui/material'
import activeIcon from 'assets/svg/diamond.svg'
import Image from 'components/Image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import SwitchIcon from 'assets/svg/switch.svg'
import ActionButton from 'components/Button/ActionButton'
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow_down.svg'
import Logo from 'assets/images/logo.png'
import useModal from 'hooks/useModal'
import { ChainId, ChainList, ChainListMap } from 'constants/chain'
import { Chain } from 'models/chain'
import { useTransferNFTCallback } from 'hooks/useTransferNFT'
import TransacitonPendingModal from 'components/Modal/TransactionModals/TransactionPendingModal'
// import TransactiontionSubmittedModal from 'components/Modal/TransactionModals/TransactiontionSubmittedModal'
import MessageBox from 'components/Modal/TransactionModals/MessageBox'
import { useActiveWeb3React } from 'hooks'
// import { ApprovalState } from 'hooks/useApproveCallback'
// import { NFT_CONTRACT_ADDRESS, TRANSFER_NFT_ADDRESS } from '../constants'
import Button from 'components/Button/Button'
// import { useNFTApproveAllCallback } from 'hooks/useNFTApproveAllCallback'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useUserHasSubmittedClaim } from 'state/transactions/hooks'
import ComingSoon from './ComingSoon'
import TxHistory from './components/TxHistory'
import { useWalletModalToggle } from 'state/application/hooks'
import LogoText from 'components/LogoText'
import PopperCard from './components/PopperCard'
import Collection from './components/Collection'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { Currency } from 'constants/token'

export const ControllBtn = styled(Box)({
  width: '100%',
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  gridTemplateColumns: '1fr 1px 1fr',
  color: '#7FB093',
  textAlign: 'center',
  '& .bridge': {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    '& p': {
      fontSize: 18
    }
  },
  '& .account': {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    '& p': {
      fontSize: 18
    }
  }
})

export const Panel = styled(Box)({
  marginTop: 26,
  position: 'relative',
  width: '100%',
  border: '1px solid #FDFFAC',
  borderRadius: '10px',
  backgroundColor: '#242926',
  padding: '30px 24px',
  height: 590
})

export const FromPanel = styled(Box)({
  height: 84,
  padding: '7px 9px',
  borderRadius: '10px',
  margin: '20px 0',
  backgroundColor: '#2A312D'
})

export const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  backgroundColor: '#1A1E1B',
  borderRadius: '10px',
  gap: 1,
  padding: '5px',
  '& .MuiButtonGroup-grouped:not(:last-of-type), & .MuiButtonGroup-grouped:not(:first-of-type)': {
    borderRadius: '6px'
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0 20px'
  },
  '& button': {
    fontSize: 20,
    height: '47px',
    borderRadius: '36px',
    borderWidth: '0px',
    color: '#7FB093',
    fontWeight: 600,
    backgroundColor: 'transparent',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    },
    '&:hover': {
      borderWidth: '0px',
      opacity: 0.8
    },
    '&.active': {
      fontWeight: 700,
      backgroundColor: '#A5FFBE',
      color: '#213425'
    }
  }
}))

export enum TabState {
  BRIDGE = 'bridge',
  ACCOUNT = 'Txhistory'
}

export enum ActionType {
  DEPOSIT = 'Fungible Token',
  WITHDRAW = 'NFT'
}

export interface UserNFTCollection {
  balance?: string // nft token balance
  nftAddress?: string
  description?: string
  imageUri?: string
  name?: string
  tokenId: number
}

const BackedChainId: { [k: number]: number } = {
  [ChainId.BSCTEST]: 10102,
  [ChainId.MUMBAI_POLYGON]: 10109
}

function TargetElement({ chain }: { chain: Chain | null }) {
  return (
    <Box
      sx={{
        height: 70,
        color: '#A5FFBE',
        display: 'flex',
        padding: '10px',
        cursor: 'pointer',
        alignItems: 'center',
        '& svg': {
          margin: '0 40px 0 auto'
        },
        '& p': {
          color: '#ebebeb',
          fontSize: 20
        }
      }}
    >
      <Stack direction={'row'} spacing={19} alignItems={'center'}>
        <Image width={40} height={40} src={chain?.logo || Logo} />
        <Typography>{chain?.symbol || 'AGLD'}</Typography>
      </Stack>
      <ArrowIcon />
    </Box>
  )
}

function ActionButtonGroup({
  action,
  setAction
}: {
  action: ActionType
  setAction: React.Dispatch<React.SetStateAction<ActionType>>
}) {
  return (
    <StyledButtonGroup>
      <MuiButton
        className={action === ActionType.DEPOSIT ? 'active' : ''}
        onClick={() => setAction(ActionType.DEPOSIT)}
      >
        Fungible Token
      </MuiButton>
      <MuiButton
        className={action === ActionType.WITHDRAW ? 'active' : ''}
        onClick={() => setAction(ActionType.WITHDRAW)}
      >
        NFT
      </MuiButton>
    </StyledButtonGroup>
  )
}

export default function Bridge() {
  const { account, chainId } = useActiveWeb3React()
  const [selectedNft, setSelectedNft] = useState<UserNFTCollection>()
  const [fromChain, setFromChain] = useState<Chain | null>(ChainListMap[ChainId.BSCTEST] ?? null)
  const [toChain, setToChain] = useState<Chain | null>(ChainListMap[ChainId.MUMBAI_POLYGON] ?? null)
  const [active, setActive] = useState(TabState.BRIDGE)
  const [action, setAction] = useState(ActionType.WITHDRAW)
  const [isEnteredDetail, setIsEnteredDetail] = useState(false)
  const [isEnteredCollection, setIsEnteredCollection] = useState(false)
  const dstId = useMemo(() => BackedChainId[toChain?.id as number], [toChain])
  const { run: transfer, tFee } = useTransferNFTCallback(dstId, selectedNft !== undefined ? selectedNft : undefined)
  const { showModal, hideModal } = useModal()
  const switchNetwork = useSwitchNetwork()
  const toggleWalletModal = useWalletModalToggle()
  const balance = useCurrencyBalance(account || undefined, Currency.getNativeCurrency())
  const { claimSubmitted: isLoading } = useUserHasSubmittedClaim(`${account}_transfer_nft_${dstId}`)
  const handleSwitchNetwork = useCallback(() => {
    setSelectedNft(undefined)
    setFromChain(toChain)
    setToChain(fromChain)
  }, [fromChain, toChain])

  console.log(isLoading, selectedNft)

  useEffect(() => {
    setSelectedNft(undefined)
  }, [account, chainId])

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

  const toChainList = useMemo(() => {
    return ChainList.filter(chain => !(chain.id === fromChain?.id))
  }, [fromChain?.id])

  const fromChainList = useMemo(() => {
    return ChainList.filter(chain => !(chain.id === toChain?.id))
  }, [toChain?.id])

  // const [approveState, approveCallback] = useNFTApproveAllCallback(
  //   NFT_CONTRACT_ADDRESS[chainId as ChainId],
  //   chainId ? TRANSFER_NFT_ADDRESS[chainId as ChainId] : undefined
  // )

  const ActionButtonNode = useMemo(() => {
    if (!account) {
      return (
        <Button style={{ height: 50, width: '100%', fontSize: 20 }} onClick={toggleWalletModal}>
          Connect Wallet
        </Button>
      )
    }
    // if (approveState !== ApprovalState.APPROVED && selectedNft) {
    //   if (approveState === ApprovalState.PENDING) {
    //     return (
    //       <Button style={{ height: 50, width: '100%', fontSize: 20 }}>Approving use of {fromChain?.name} NFT...</Button>
    //     )
    //   }
    //   if (approveState === ApprovalState.UNKNOWN) {
    //     return <Button style={{ height: 50, width: '100%', fontSize: 20 }}>Loading...</Button>
    //   }
    //   if (approveState === ApprovalState.NOT_APPROVED) {
    //     return (
    //       <Button style={{ height: 50, width: '100%', fontSize: 20 }} onClick={approveCallback}>
    //         Approve use of {fromChain?.name} NFT
    //       </Button>
    //     )
    //   }
    // }
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
    if (!balance || balance.lessThan('0') || (tFee && balance.lessThan(tFee))) {
      return (
        <Button style={{ height: 50, width: '100%', fontSize: 20 }} disabled>
          Insufficient Gas Fee
        </Button>
      )
    }
    return <ActionButton width="100%" height="50px" onAction={transferClick} actionText="Bridge" />
  }, [account, balance, chainId, fromChain?.id, selectedNft, switchNetwork, tFee, toggleWalletModal, transferClick])

  return (
    <>
      <Box
        sx={{
          maxWidth: 598,
          width: '100%',
          margin: '0 auto'
        }}
      >
        <ControllBtn>
          <Box
            className="bridge"
            onClick={() => {
              setActive(TabState.BRIDGE)
              setIsEnteredDetail(false)
              setIsEnteredCollection(false)
            }}
          >
            {active === TabState.BRIDGE ? (
              <Image width={15.84} src={activeIcon}></Image>
            ) : (
              <Image width={15.84} src="" />
            )}
            <Typography
              fontWeight={active === TabState.BRIDGE ? 700 : 600}
              color={active === TabState.BRIDGE ? '#A5FFBE' : '#7FB093'}
            >
              Transfer
            </Typography>
          </Box>
          <Box width={1} height={26} sx={{ backgroundColor: '#3C5141' }}></Box>
          <Box
            className="account"
            onClick={() => {
              setActive(TabState.ACCOUNT)
              setIsEnteredDetail(false)
              setIsEnteredCollection(false)
            }}
          >
            {active === TabState.ACCOUNT ? <Image width={15.84} src={activeIcon} /> : <Image width={15.84} src="" />}
            <Typography
              fontWeight={active === TabState.ACCOUNT ? 700 : 600}
              color={active === TabState.ACCOUNT ? '#A5FFBE' : '#7FB093'}
            >
              History
            </Typography>
          </Box>
        </ControllBtn>
        {active === TabState.BRIDGE && (
          <Panel>
            {!isEnteredDetail && !isEnteredCollection && <ActionButtonGroup action={action} setAction={setAction} />}
            {action === ActionType.WITHDRAW ? (
              <>
                {isEnteredCollection === true ? (
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
            ) : (
              <ComingSoon />
            )}
          </Panel>
        )}
        {active === TabState.ACCOUNT && (
          <Panel>
            {!isEnteredDetail && <ActionButtonGroup action={action} setAction={setAction} />}
            {!account ? (
              <Box
                sx={{
                  height: 'calc(100% - 50px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 20,
                  justifyContent: 'center'
                }}
              >
                <Typography color={'#7A9283'} textAlign={'center'} fontSize={16}>
                  Please connect your wallet to view account information
                </Typography>
                <Button style={{ height: 50, width: '100%', fontSize: 20 }} onClick={toggleWalletModal}>
                  Connect Wallet
                </Button>
              </Box>
            ) : action === ActionType.WITHDRAW ? (
              <TxHistory isEnteredDetail={isEnteredDetail} setIsEnteredDetail={setIsEnteredDetail} />
            ) : (
              <ComingSoon />
            )}
          </Panel>
        )}
      </Box>
    </>
  )
}
