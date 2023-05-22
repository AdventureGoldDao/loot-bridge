import { Box, Typography } from '@mui/material'

interface Props {
  taskName: string
  amount: number
  time: string
  miner: string
  account: string
}

export default function TransactionCard({ taskName, amount, time, miner, account }: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        height: 149,
        maxWidth: 226,
        padding: '16px 0',
        borderRadius: '10px',
        textAlign: 'left',
        backgroundColor: '#1A1E1B'
      }}
    >
      <Typography
        fontFamily={'Inconsolata'}
        lineHeight={'22px'}
        fontSize={14}
        fontWeight={500}
        color={'#A5FFBE'}
        sx={{
          padding: '0 16px 10px',
          borderBottom: '1px solid #3C5141'
        }}
      >
        {taskName}
      </Typography>
      <Typography
        fontFamily={'Inconsolata'}
        lineHeight={'22px'}
        fontSize={14}
        fontWeight={500}
        color={'#7FB093'}
        sx={{
          padding: '10px 16px 4px'
        }}
      >
        {amount} Transactions
      </Typography>
      <Typography
        fontFamily={'Inconsolata'}
        lineHeight={'22px'}
        fontSize={14}
        fontWeight={500}
        color={'#7FB093'}
        sx={{
          padding: '0 16px 4px'
        }}
      >
        {time}
      </Typography>
      <Typography
        fontFamily={'Inconsolata'}
        lineHeight={'22px'}
        fontSize={14}
        sx={{
          width: '226px',
          padding: '0 16px',
          display: 'flex'
        }}
      >
        <span style={{ color: '#7FB093', width: 38 }}>{miner}</span>
        <span
          style={{
            flex: 1,
            whiteSpace: 'nowrap',
            marginLeft: 10,
            fontWeight: 500,
            color: '#A5FFBE',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {account}
        </span>
      </Typography>
    </Box>
  )
}
