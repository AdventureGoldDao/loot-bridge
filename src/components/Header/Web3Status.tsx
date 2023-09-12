import { useMemo } from 'react'
import { useTheme, Box, Typography, Stack } from '@mui/material'
import useENSName from '../../hooks/useENSName'
import { useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { shortenAddress } from '../../utils'
import WalletModal from 'components/Modal/WalletModal/index'
import Spinner from 'components/Spinner'
import useBreakpoint from 'hooks/useBreakpoint'
import ActionButton from 'components/Button/ActionButton'
import { useActiveWeb3React } from 'hooks'

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

function Web3StatusInner() {
  const { account, errorNetwork } = useActiveWeb3React()
  const { ENSName } = useENSName(account ?? undefined)
  const allTransactions = useAllTransactions()
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])
  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
  const hasPendingTransactions = !!pending.length
  const toggleWalletModal = useWalletModalToggle()
  const theme = useTheme()
  const isDownSm = useBreakpoint()

  if (account) {
    return (
      <Box
        sx={{ cursor: 'pointer', marginBottom: { xs: 0, sm: 15 }, mt: { xs: 0, sm: 8 } }}
        onClick={toggleWalletModal}
      >
        <Box
          sx={{
            height: { xs: 24, sm: 36 },
            width: { xs: 100, sm: 180, md: 264 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div />
          {hasPendingTransactions ? (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 10, sm: 17 }, ml: { xs: 10, sm: 20 } }}>
              <Spinner color={theme.palette.text.primary} size={isDownSm ? '10px' : '16px'} />
              <Box component="span" sx={{ ml: 3 }}>
                <Typography sx={{ fontSize: { xs: 9, sm: 14, md: 16 }, ml: 8, color: '#A5FFBE' }} noWrap>
                  {pending?.length} Pending
                </Typography>
              </Box>
            </Box>
          ) : (
            <Stack direction={'row'} alignItems={'center'}>
              <Typography
                sx={{
                  fontSize: { xs: 9, sm: 14, md: 18 },
                  color: '#A5FFBE',
                  fontWeight: 700
                }}
              >
                Connected: {ENSName || shortenAddress(account)}
              </Typography>
            </Stack>
          )}
        </Box>
      </Box>
    )
  } else if (errorNetwork) {
    return (
      <ActionButton width="200px" height="40px" onAction={toggleWalletModal}>
        {'Wrong Network'}
      </ActionButton>
    )
  } else {
    return (
      <ActionButton width="200px" height="40px" onAction={toggleWalletModal}>
        Connect Wallet
      </ActionButton>
    )
  }
}

export default function Web3Status() {
  const { account } = useActiveWeb3React()

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
  const confirmed = sortedRecentTransactions.filter(tx => tx.receipt).map(tx => tx.hash)

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  )
}
