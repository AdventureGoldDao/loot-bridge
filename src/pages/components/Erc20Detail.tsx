import { Box, Stack, Typography } from '@mui/material'
import { getEtherscanLink, shortenHash } from 'utils'
import { ChainListMap } from 'constants/chain'
// import { Props } from './TxHistory'
import moment from 'moment'
import { Erc20Props } from './TokenTxHistory'
import { useToken } from 'state/wallet/hooks'
import { CurrencyAmount } from 'constants/token'

export default function Erc20Detail({
  detailData,
  setIsEnteredDetail
}: {
  detailData: Erc20Props
  setIsEnteredDetail: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const token = useToken(detailData.ftAddress, detailData.fromChain)

  console.log('🚀 ~ file: Detail.tsx:7 ~ Detail ~ detailData:', detailData)

  return (
    <Box>
      <Typography
        fontSize={14}
        color={'#7A9283'}
        fontWeight={500}
        sx={{ cursor: 'pointer' }}
        onClick={() => setIsEnteredDetail(false)}
      >
        &lt; HISTORY{' '}
      </Typography>
      <Stack
        direction={'column'}
        justifyContent={'flex-start'}
        spacing={80}
        mt={24}
        height={433}
        sx={{
          borderRadius: '12px',
          backgroundColor: '#000',
          padding: 24
        }}
      >
        <Stack direction={'row'} justifyContent={'flex-start'} spacing={24}>
          <Typography color={'#7A9283'} fontSize={16} minWidth={100}>
            From Network
          </Typography>
          <Typography color={'#A5FFBE'} fontSize={16} display={'flex'} flexDirection={'column'}>
            <span>{ChainListMap[detailData?.fromChain || 1]?.name}</span>
            <span
              style={{ color: '#4BE9FF', textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => {
                window.open(
                  getEtherscanLink(detailData && detailData.fromChain, detailData?.sentTx || '', 'transaction'),
                  '_blank'
                )
              }}
            >
              Txid: {shortenHash(detailData.sentTx)}
            </span>
          </Typography>{' '}
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-start'} spacing={24}>
          <Typography color={'#7A9283'} fontSize={16} minWidth={100}>
            To Network
          </Typography>
          <Typography color={'#A5FFBE'} fontSize={16} display={'flex'} flexDirection={'column'}>
            <span>{ChainListMap[detailData?.toChain || 1]?.name}</span>
            {detailData.receivedTx ? (
              <span
                style={{ color: '#4BE9FF', textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => {
                  window.open(
                    getEtherscanLink(detailData && detailData.toChain, detailData?.receivedTx || '', 'transaction'),
                    '_blank'
                  )
                }}
              >
                Txid: {shortenHash(detailData.receivedTx)}
              </span>
            ) : (
              <span style={{ color: '#4BE9FF', textDecoration: 'underline' }}>Confirming</span>
            )}
          </Typography>{' '}
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-start'} spacing={24}>
          <Typography color={'#7A9283'} fontSize={16} minWidth={100}>
            Amount
          </Typography>
          <Typography color={'#A5FFBE'} fontSize={16}>
            {token && CurrencyAmount.fromRawAmount(token, detailData.amount).toSignificant()} {token && token.symbol}
          </Typography>{' '}
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-start'} spacing={24}>
          <Typography color={'#7A9283'} fontSize={16} minWidth={100}>
            Time
          </Typography>
          <Typography color={'#A5FFBE'} fontSize={16}>
            {moment(Number(detailData?.timeStamp) * 1000).format('YYYY/MM/DD HH:mm:ss')}
          </Typography>{' '}
        </Stack>
      </Stack>
    </Box>
  )
}
