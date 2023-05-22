import { Box, styled, Typography } from '@mui/material'
import TransactionCard from './components/TransactionCard'
import Footer from './components/Footer'

const UrlCon = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 10,
  textAlign: 'center',
  '& p:nth-of-type(1)': {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '17px',
    color: '#7FB093'
  },
  '& p:nth-of-type(2)': {
    fontWeight: 700,
    fontSize: 34,
    lineHeight: '36px',
    color: '#A5FFBE'
  }
})

const Line = styled('div')({
  width: 1,
  height: 63,
  backgroundColor: '#3C5141'
})

const transactionList = [
  {
    taskName: 'Task name 001',
    amount: 1,
    time: '17 days ago',
    miner: 'Miner',
    account: '0xf40345eb78d2dc5dc4bdf5504d0b57d90a7a80a3e8235d17ae1df32dd683cf79'
  },
  {
    taskName: 'Task name 002',
    amount: 1,
    time: '27 days ago',
    miner: 'Miner',
    account: '0xf40345eb78d2dc5dc4bdf5504d0b57d90a7a80a3e8235d17ae1df32dd683cf79'
  },
  {
    taskName: 'Task name 003',
    amount: 1,
    time: '27 days ago',
    miner: 'Miner',
    account: '0xf40345eb78d2dc5dc4bdf5504d0b57d90a7a80a3e8235d17ae1df32dd683cf79'
  },
  {
    taskName: 'Task name 004',
    amount: 1,
    time: '27 days ago',
    miner: 'Miner',
    account: '0xf40345eb78d2dc5dc4bdf5504d0b57d90a7a80a3e8235d17ae1df32dd683cf79'
  }
]

export default function Explorer() {
  return (
    <Box mt={70} sx={{ width: '100%' }}>
      <Box
        sx={{
          height: 129,
          maxWidth: 980,
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
          border: '1px solid #FDFFAC',
          borderRadius: '10px',
          backgroundColor: '#242926'
        }}
      >
        <UrlCon>
          <Typography fontFamily={'Inconsolata'}>Total transactions</Typography>
          <Typography fontFamily={'Inconsolata'}>10</Typography>
        </UrlCon>
        <Line />
        <UrlCon>
          <Typography fontFamily={'Inconsolata'}>Total blocks</Typography>
          <Typography fontFamily={'Inconsolata'}>11</Typography>
        </UrlCon>
        <Line />
        <UrlCon>
          <Typography fontFamily={'Inconsolata'}>Wallet addresses</Typography>
          <Typography fontFamily={'Inconsolata'}>912</Typography>
        </UrlCon>
      </Box>
      <Box
        sx={{
          maxWidth: 980,
          width: '100%',
          margin: '20px auto',
          border: '1px solid #FDFFAC',
          borderRadius: '10px',
          backgroundColor: '#242926'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 24px',
            '& p': {
              color: '#7FB093',
              lineHeight: '22px'
            }
          }}
        >
          <Typography fontSize={16} fontWeight={700} fontFamily={'Inconsolata'}>
            Blocks
          </Typography>
          <Typography fontSize={14} sx={{ cursor: 'pointer' }} fontFamily={'Inconsolata'}>
            View all transactions &gt;
          </Typography>
        </Box>
        <Box
          sx={{
            padding: '10px 24px 24px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          {transactionList.map(item => (
            <TransactionCard key={item.taskName} {...item} />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: 980,
          width: '100%',
          margin: '20px auto',
          border: '1px solid #FDFFAC',
          borderRadius: '10px',
          backgroundColor: '#242926'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 24px',
            '& p': {
              color: '#7FB093',
              lineHeight: '22px'
            }
          }}
        >
          <Typography fontSize={16} fontWeight={700} fontFamily={'Inconsolata'}>
            Transactions
          </Typography>
          <Typography fontSize={14} sx={{ cursor: 'pointer' }} fontFamily={'Inconsolata'}>
            View all transactions &gt;
          </Typography>
        </Box>
        <Box
          sx={{
            padding: '10px 24px 24px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          {transactionList.map(item => (
            <TransactionCard key={item.taskName} {...item} />
          ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
