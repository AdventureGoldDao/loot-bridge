import { Box, Typography } from '@mui/material'
import Spinner from 'components/Spinner'
import Modal from '../index'
import { useActiveWeb3React } from 'hooks'
import { ExternalLink } from 'theme/components'
import { getEtherscanLink } from 'utils'

export default function TransacitonPendingModal({ pendingText, hash }: { pendingText?: string; hash?: string }) {
  // const theme = useTheme()
  const { chainId } = useActiveWeb3React()
  return (
    <Modal closeIcon background="#1B1F1C">
      <Box display="grid" padding="40px 24px" gap="24px" justifyItems="center">
        <Spinner size="40px" color="#A5FFBE" />
        <Typography fontWeight={400} fontSize={18} color={'#A5FFBE'}>
          Waiting For Confirmation
        </Typography>
        <Typography fontWeight={400} fontSize={14} textAlign="center" color={'#7A9283'}>
          {pendingText || 'Please initiate transaction in your wallet'}
        </Typography>
        {chainId && hash && (
          <ExternalLink
            underline="always"
            href={getEtherscanLink(chainId, hash, 'transaction')}
            style={{ color: '#31b047', fontSize: 12 }}
          >
            View on explorer
          </ExternalLink>
        )}
      </Box>
    </Modal>
  )
}
