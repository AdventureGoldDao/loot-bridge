import { Stack, Typography } from '@mui/material'

export default function V1Link() {
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      direction={'row'}
      sx={{
        width: 70,
        height: 27,
        marginRight: {
          xs: 0,
          lg: 48
        },
        marginTop: '-8px',
        cursor: 'pointer',
        backgroundColor: '#020202',
        border: '1px solid #4B5954',
        borderRadius: '20px',
        '& svg path': {
          fill: '#A5FFBE'
        }
      }}
      onClick={() => window.open('https://mainnet.lootchain.com/bridge', '_blank')}
    >
      <Typography fontSize={14} fontWeight={700} color={'#A5FFBE'}>
        V1
      </Typography>
    </Stack>
  )
}
