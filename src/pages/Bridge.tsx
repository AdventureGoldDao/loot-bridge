import { Box, Button as MuiButton, ButtonGroup, Typography, styled } from '@mui/material'
import activeIcon from 'assets/svg/diamond.svg'
import Image from 'components/Image'
import { useState } from 'react'
import { useActiveWeb3React } from 'hooks'
import Button from 'components/Button/Button'
import ComingSoon from './ComingSoon'
import TxHistory from './components/TxHistory'
import NoFungible from './bridge/NoFungible'
import { useWalletModalToggle } from '../state/application/hooks'
import Fungible from './bridge/Fungible'

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

export const FromPanel = styled(Box)(({ height, bg }: { height?: number; bg?: string }) => ({
  height: height ?? 84,
  padding: '7px 9px',
  borderRadius: '10px',
  margin: '20px 0',
  backgroundColor: bg ?? '#2A312D'
}))

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
  FUNGIBLE = 'FUNGIBLE',
  NO_FUNGIBLE = 'NO_FUNGIBLE'
}

export interface UserNFTCollection {
  balance?: string // nft token balance
  nftAddress?: string
  description?: string
  imageUri?: string
  name?: string
  tokenId: number
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
        className={action === ActionType.FUNGIBLE ? 'active' : ''}
        onClick={() => setAction(ActionType.FUNGIBLE)}
      >
        Fungible Token
      </MuiButton>
      <MuiButton
        className={action === ActionType.NO_FUNGIBLE ? 'active' : ''}
        onClick={() => setAction(ActionType.NO_FUNGIBLE)}
      >
        NFT
      </MuiButton>
    </StyledButtonGroup>
  )
}

export default function Bridge() {
  const { account } = useActiveWeb3React()
  const [active, setActive] = useState(TabState.BRIDGE)
  const [action, setAction] = useState(ActionType.FUNGIBLE)
  const [isEnteredDetail, setIsEnteredDetail] = useState(false)
  const [isEnteredCollection, setIsEnteredCollection] = useState(false)

  const toggleWalletModal = useWalletModalToggle()

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
            {action === ActionType.NO_FUNGIBLE ? <NoFungible /> : <Fungible />}
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
            ) : action === ActionType.NO_FUNGIBLE ? (
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
