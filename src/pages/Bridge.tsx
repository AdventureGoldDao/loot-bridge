import {
  Box,
  Button as MuiButton,
  ButtonGroup,
  Typography,
  styled,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody
} from '@mui/material'
import activeIcon from 'assets/images/activeIcon.png'
import Image from 'components/Image'
import { Fragment, useCallback, useState } from 'react'
import SwitchIcon from 'assets/images/switchIcon.png'
import ActionButton from 'components/Button/ActionButton'
import { shortenHash } from 'utils'
import InputNumerical from 'components/Input/InputNumerical'
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow_down.svg'
import { Currency } from 'constants/token'
import Logo from 'assets/images/logo.png'
import useModal from 'hooks/useModal'
import SelectCurrencyModal from 'components/Input/CurrencyInputPanel/SelectCurrencyModal'

const ControllBtn = styled(Box)({
  width: '100%',
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  gridTemplateColumns: '1fr 1px 1fr',
  fontWeight: 600,
  fontSize: 18,
  color: '#7FB093',
  textAlign: 'center',
  '& .bridge': {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  '& .account': {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    flexDirection: 'row'
  }
})

const Panel = styled(Box)({
  marginTop: 26,
  position: 'relative',
  width: '100%',
  border: '1px solid #FDFFAC',
  borderRadius: '10px',
  backgroundColor: '#242926',
  padding: '30px 24px',
  height: 634
})

const FromPanel = styled(Box)({
  marginTop: 21,
  height: 145,
  padding: '17px 25px',
  borderRadius: '10px',
  backgroundColor: '#1A1E1B'
})

const ToPanel = styled(Box)({
  marginTop: 22,
  marginBottom: 30,
  height: 140,
  borderRadius: '10px',
  padding: '24px 25px',
  backgroundColor: '#1A1E1B',
  '&>div': {
    display: 'flex',
    flexDirection: 'row'
  },
  '& p': {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '22px'
  }
})

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
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

enum TabState {
  BRIDGE = 'bridge',
  ACCOUNT = 'account'
}

enum ActionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw'
}

interface Props {
  timestamp: string
  txHash: string
  amount: string
  status: string
}

function Row(props: { row: Props }) {
  const { row } = props

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <Typography>{row.timestamp}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{row.amount} ETH</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography color={'#4BE9FF'} sx={{ textDecoration: 'underline' }}>
            {shortenHash(row.txHash)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography color={'#A5FFBE'}>{row.status}</Typography>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const rows: any = [
  {
    timestamp: '2023/05/24 00:00:00',
    amount: '0.03',
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    status: 'Completed'
  },
  {
    timestamp: '2023/05/24 00:00:00',
    amount: '0.01',
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    status: 'Completed'
  },
  {
    timestamp: '2023/05/24 00:00:00',
    amount: '0.03',
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    status: 'Completed'
  },
  {
    timestamp: '2023/05/24 00:00:00',
    amount: '0.03',
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    status: 'Completed'
  },
  {
    timestamp: '2023/05/24 00:00:00',
    amount: '0.03',
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    status: 'Completed'
  },
  {
    timestamp: '2023/05/24 00:00:00',
    amount: '0.03',
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    status: 'Completed'
  },
  {
    timestamp: '2023/05/24 00:00:00',
    amount: '0.03',
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    status: 'Completed'
  },
  {
    timestamp: '2023/05/24 00:00:00',
    amount: '0.03',
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    status: 'Completed'
  }
]

export default function Bridge() {
  const [amount, setAmount] = useState('')
  const [curToken, setCurToken] = useState<Currency>()
  const [active, setActive] = useState(TabState.BRIDGE)
  const [action, setAction] = useState(ActionType.DEPOSIT)
  const [currencyOptions, setCurrencyOptions] = useState<Currency[]>([])
  const { showModal } = useModal()
  const handleSwitchToken = useCallback(() => {
    console.log('1')
  }, [])

  const onSelectCurrency = useCallback((cur: Currency) => {
    setCurToken(cur)
  }, [])

  console.log(setCurrencyOptions)

  return (
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
          }}
        >
          {active === TabState.BRIDGE ? <Image width={15.84} src={activeIcon}></Image> : <Image width={15.84} src="" />}
          <Typography color={active === TabState.BRIDGE ? '#A5FFBE' : '#7FB093'}>Bridge</Typography>
        </Box>
        <Box width={1} height={26} sx={{ backgroundColor: '#3C5141' }}></Box>
        <Box
          className="account"
          onClick={() => {
            setActive(TabState.ACCOUNT)
          }}
        >
          {active === TabState.ACCOUNT ? (
            <Image width={15.84} src={activeIcon}></Image>
          ) : (
            <Image width={15.84} src="" />
          )}
          <Typography color={active === TabState.ACCOUNT ? '#A5FFBE' : '#7FB093'}>Account</Typography>
        </Box>
      </ControllBtn>
      <Panel>
        <StyledButtonGroup>
          <MuiButton
            className={action === ActionType.DEPOSIT ? 'active' : ''}
            onClick={() => setAction(ActionType.DEPOSIT)}
          >
            Deposit
          </MuiButton>
          <MuiButton
            className={action === ActionType.WITHDRAW ? 'active' : ''}
            onClick={() => setAction(ActionType.WITHDRAW)}
          >
            Withdraw
          </MuiButton>
        </StyledButtonGroup>
        {active === TabState.BRIDGE ? (
          <>
            <FromPanel>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10
                }}
              >
                <Typography color={'#7FB093'}>From</Typography>
                <Typography color={'#A5FFBE'} ml={17}>
                  Goerli Ethereum
                </Typography>
              </Box>
              <Box
                mt={13}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '3fr 1fr',
                  border: '1px solid #3C5141',
                  borderRadius: '6px',
                  backgroundColor: '#151815',
                  '& ': {}
                }}
              >
                <InputNumerical value={amount} placeholder="0.0" onChange={(e: any) => setAmount(e.target.value)} />
                <Box
                  sx={{
                    height: 50,
                    border: 'none',
                    borderLeft: '1px solid #3C5141',
                    borderRadius: 0,
                    color: '#A5FFBE',
                    display: 'grid',
                    padding: '10px',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    cursor: 'pointer',
                    alignItems: 'center',
                    '& svg': {
                      margin: '0 auto'
                    }
                  }}
                  onClick={() => {
                    showModal(
                      <SelectCurrencyModal onSelectCurrency={onSelectCurrency} currencyOptions={currencyOptions} />
                    )
                  }}
                >
                  <Image width={24} src={curToken?.logo || Logo} />
                  <Typography>{curToken?.symbol || 'AGLD'}</Typography>
                  <ArrowIcon />
                </Box>
              </Box>
            </FromPanel>
            <Box
              width={'fit-content'}
              position={'absolute'}
              sx={{
                cursor: 'pointer',
                top: '43%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              onClick={handleSwitchToken}
            >
              <Image width={50} src={SwitchIcon}></Image>
            </Box>
            <ToPanel>
              <Box>
                <Typography color={'#7FB093'}>To</Typography>
                <Typography color={'#A5FFBE'} ml={33}>
                  Loot Caldera Chain
                </Typography>
              </Box>
              <Box mt={24}>
                <Typography color={'#7FB093'}>You will receive:</Typography>
                <Typography color={'#A5FFBE'} ml={10}>
                  0 AGLD
                </Typography>
              </Box>
              <Box mt={6}>
                <Typography color={'#7FB093'}>Current balance on L2:</Typography>
                <Typography color={'#A5FFBE'} ml={10}>
                  0.0 AGLD
                </Typography>
              </Box>
            </ToPanel>
            <ActionButton width="100%" height="50px" onAction={() => {}} />
            <Box
              mt={30}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '13px 19px',
                gap: 12,
                border: '1px solid #3C5141',
                borderRadius: '8px',
                backgroundColor: '#1A1E1B'
              }}
            >
              <Typography color={'#A5FFBE'} fontSize={18}>
                Add Chain To Metamask
              </Typography>
              <Typography color={'#7FB093'} fontSize={12}>
                Note: You Need To Add The Chain To Metamask Before Bridging From The Chain.
              </Typography>
            </Box>
          </>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: 598,
              width: '100%',
              height: '87%',
              backgroundColor: 'transparent',
              borderRadius: '4px',
              overflow: 'auto',
              marginTop: 22,
              boxShadow: 'none',
              '&::-webkit-scrollbar': {
                display: 'none!important',
                width: 0
              },
              '& .MuiTable-root': {
                backgroundColor: '#1A1E1B',
                borderRadius: '10px',
                paddingBottom: 20
              },
              '& .MuiTableHead-root': {
                color: '#7FB093',
                fontSize: 16,
                lineHeight: '22px'
              },
              '& .MuiTableHead-root tr': {
                height: 55
              },
              '& .MuiTableRow-root': {
                width: '100%',
                height: 84,
                fontWeight: 400,
                fontSize: 14,
                cursor: 'pointer',
                borderRadius: '4px',
                '& th': {
                  width: '25%',
                  borderBottom: '1px solid #3C5141',
                  backgroundColor: '#1A1E1B'
                }
              },
              '& .MuiTableRow-root:nth-of-type(2n)': {
                backgroundColor: '#151815'
              },
              '& .MuiTableBody-root': {
                position: 'relative',
                '& tr:nth-of-type(2n - 1)': {},
                '& tr:nth-of-type(2n)': {}
              },
              '& .MuiTableCell-root': {
                color: '#7FB093',
                border: 'none',
                borderImage: 'none'
              }
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell width={'25%'} align="left">
                    Time
                  </TableCell>
                  <TableCell width={'25%'} align="center">
                    Amount
                  </TableCell>
                  <TableCell width={'25%'} align="center">
                    Transaction
                  </TableCell>
                  <TableCell width={'25%'} align="center">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows && rows.map((row: any) => <Row key={row.txHash} row={row} />)}
                {rows.length === 0 ? (
                  <Box
                    sx={{
                      width: '100%',
                      position: 'absolute',
                      color: '#7FB093',
                      fontWeight: 600,
                      fontSize: 18
                    }}
                  >
                    No Data
                  </Box>
                ) : (
                  ''
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Panel>
    </Box>
  )
}
