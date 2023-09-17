import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Typography, Box, useTheme, Button } from '@mui/material'
import { useActiveWeb3React } from 'hooks/'
import { AppDispatch } from 'state/'
import { clearAllTransactions } from 'state/transactions/actions'
import { shortenAddress } from 'utils/'
import Copy from 'components/essential/Copy'
import DisconnectIcon from 'assets/svg/disconnect.svg'
import Image from 'components/Image'
import ActionButton from 'components/Button/ActionButton'
import Transaction from './Transaction'
import { OutlinedCard } from 'components/Card'
import { useAppSelector } from 'state/hooks'
import { getConnection } from 'connection'
import LogoText from 'components/LogoText'

// const Dot = styled('span')({
//   width: 24,
//   height: 24,
//   background: 'linear-gradient(135deg, #ffffff 4.17%, rgba(255, 255, 255, 0) 75%)',
//   border: '0.6px solid #ffffff',
//   borderRadius: '50%'
// })

function renderTransactions(transactions: string[]) {
  return (
    <>
      {transactions.map((hash, i) => {
        return <Transaction key={i} hash={hash} />
      })}
    </>
  )
}

interface AccountDetailsProps {
  toggleWalletModal: () => void
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
}

export default function AccountDetails({
  toggleWalletModal,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions
}: AccountDetailsProps) {
  const { chainId, account, deactivate } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const theme = useTheme()
  const selectedWallet = useAppSelector(state => state.userWallet.selectedWallet)
  const curConnection = selectedWallet ? getConnection(selectedWallet) : undefined

  function formatConnectorName() {
    return (
      <Typography fontSize="0.825rem" fontWeight={500}>
        Connected with {curConnection?.getName()}
      </Typography>
    )
  }

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  return (
    <>
      <Box display="grid" width="100%" padding="16px" gridTemplateRows="50px 20px 20px" gap="12px" marginBottom="20px">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom="20px"
          gap={10}
          color={'#A5FFBE'}
          sx={{
            '& img': {
              cursor: 'pointer'
            }
          }}
        >
          {formatConnectorName()}
          <Image
            onClick={() => {
              deactivate()
            }}
            src={DisconnectIcon}
            width={16}
            height={16}
          />
        </Box>

        <Box
          display="flex"
          fontSize={24}
          fontWeight={500}
          gap="16px"
          alignItems="center"
          width="100%"
          justifyContent="center"
          color={'#fff'}
          id="web3-account-identifier-row"
        >
          {curConnection?.getIcon && <LogoText logo={curConnection.getIcon(true)} />}
          {ENSName ? <span> {ENSName}</span> : <span> {account && shortenAddress(account)}</span>}
        </Box>

        <Box display="flex" justifyContent="center" width="100%" color={theme.palette.text.secondary}>
          {account && (
            <Copy toCopy={account}>
              <Typography variant="body2" color={'#fff'}>
                Copy Address
              </Typography>
            </Copy>
          )}
        </Box>
      </Box>
      <Box display="flex" gap="10px" width="100%" justifyContent="center">
        <Button
          variant="outlined"
          onClick={toggleWalletModal}
          sx={{
            width: '50%',
            color: '#7A9283',
            borderColor: '#7A9283',
            fontWeight: 600
          }}
        >
          Close
        </Button>
        <ActionButton
          height="60px"
          width="50%"
          onAction={() => {
            openOptions()
          }}
        >
          Change
        </ActionButton>
      </Box>
      <OutlinedCard width="100%" padding="20px">
        {!!pendingTransactions.length || !!confirmedTransactions.length ? (
          <Box display="grid" gap="16px" width="100%">
            <Box display="flex" justifyContent="space-between" width="100%" fontWeight={500}>
              <Typography variant="inherit" color={'#A5FFBE'}>
                Recent Transactions
              </Typography>
              <Button
                variant="text"
                sx={{
                  width: 'auto',
                  height: 10,
                  color: '#A5FFBE'
                }}
                onClick={clearAllTransactionsCallback}
              >
                (clear all)
              </Button>
            </Box>
            <Box
              display="grid"
              sx={{
                color: '#A5FFBE'
              }}
            >
              {renderTransactions(pendingTransactions)}
              {renderTransactions(confirmedTransactions)}
            </Box>
          </Box>
        ) : (
          <Box display="flex" width="100%" justifyContent="center" marginTop={1}>
            <Typography color={'#A5FFBE'}> Your transactions will appear here...</Typography>
          </Box>
        )}
      </OutlinedCard>
    </>
  )
}
