import { Box, Typography } from '@mui/material'
import Image from 'components/Image'
import arrow from 'assets/images/arrow.png'

interface Props {
  actionText: string
  amount: number
  time: string
  unit: string
  txHash: string
  from: string
  to: string
  blockNum: number
  type: string
  fee: string
  feeToAGLD: string
}

export default function TransactionItem({
  actionText,
  amount,
  time,
  unit,
  txHash,
  from,
  to,
  blockNum,
  type,
  fee,
  feeToAGLD
}: Props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '112px 1fr auto',
        width: '100%',
        gap: 20,
        height: 129,
        padding: '9px',
        borderRadius: '10px',
        textAlign: 'left',
        backgroundColor: '#1A1E1B'
      }}
    >
      <Box
        sx={{
          borderRadius: '10px',
          backgroundColor: type === 'transfer' ? '#39809E' : '#0B7A4B',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography fontFamily={'Inconsolata'} lineHeight={'22px'} fontSize={14} fontWeight={700} color={'#fff'}>
          {actionText}
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
        <Box flexDirection={'row'} display={'flex'}>
          <Typography fontFamily={'Inconsolata'} lineHeight={'22px'} fontSize={13} fontWeight={600} color={'#7FB093'}>
            {txHash}
          </Typography>
          <Box
            ml={20}
            sx={{
              width: 'fit-content',
              textAlign: 'center',
              fontWeight: 600,
              fontSize: 13,
              padding: '2px 6px',
              borderRadius: '4px',
              color: '#7FB093',
              backgroundColor: '#243528'
            }}
          >
            {type}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: 10,
            alignItems: 'center'
          }}
        >
          <Typography fontFamily={'Inconsolata'} lineHeight={'22px'} fontSize={13} fontWeight={600} color={'#7FB093'}>
            {from}
          </Typography>
          <Image width={10} src={arrow} />
          <Typography fontFamily={'Inconsolata'} lineHeight={'22px'} fontSize={13} fontWeight={600} color={'#7FB093'}>
            {to}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: 10
          }}
        >
          <Typography fontFamily={'Inconsolata'} lineHeight={'22px'} fontSize={13} fontWeight={700} color={'#A5FFBE'}>
            {feeToAGLD} {unit ? unit : 'AGLD'}
          </Typography>
          <Typography fontFamily={'Inconsolata'} lineHeight={'22px'} fontSize={13} fontWeight={600} color={'#7FB093'}>
            {fee} TX Fee
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 10
            }}
          >
            <Typography fontFamily={'Inconsolata'} lineHeight={'22px'} fontSize={13} fontWeight={600} color={'#7FB093'}>
              0x490589–d0c8e4
            </Typography>
            <Image width={10} height={10} src={arrow} />
            <Typography fontFamily={'Inconsolata'} lineHeight={'22px'} fontSize={13} fontWeight={600} color={'#7FB093'}>
              0x000000-000000
            </Typography>
          </Box>
          <Typography
            marginLeft={40}
            fontFamily={'Inconsolata'}
            lineHeight={'22px'}
            fontSize={13}
            fontWeight={600}
            color={'#A5FFBE'}
          >
            {amount} AGLD
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          '& p': {
            width: '100%',
            textAlign: 'center',
            fontFamily: 'Inconsolata',
            lineHeight: '22px',
            marginRight: 7
          }
        }}
      >
        <Typography fontSize={14} fontWeight={700} color={'#A5FFBE'}>
          Block #{blockNum}
        </Typography>
        <Typography fontSize={12} fontWeight={400} color={'#7FB093'}>
          {time}
        </Typography>
      </Box>
    </Box>
  )
}
