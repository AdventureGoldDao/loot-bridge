import { Box, Stack, Typography } from '@mui/material'
import Arrow from 'assets/svg/arrow_right.svg'
import Image from 'components/Image'
import { shortenHash } from 'utils'

export default function Detail({
  detailData,
  setIsEnteredDetail
}: {
  detailData: any
  setIsEnteredDetail: React.Dispatch<React.SetStateAction<boolean>>
}) {
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
      <Box>
        <Stack sx={{ position: 'relative' }} direction={'row'} justifyContent={'space-between'}>
          <Stack
            mt={18}
            mb={20}
            width={252}
            sx={{
              backgroundColor: '#111211',
              borderRadius: '12px',
              padding: '14px 20px'
            }}
          >
            <Typography color={'#7A9283'}>From</Typography>
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              gap={6}
              sx={{
                '& img': {
                  margin: '0 auto'
                }
              }}
            >
              <Image src={Arrow} width={48} />
              <Typography color={'#ebebeb'} fontSize={16} fontWeight={500} textAlign={'center'}>
                Ethereum
              </Typography>
              <Typography fontSize={14}>
                <span style={{ color: '#7A9283' }}>TxID: </span>
                <span style={{ color: '#A5FFBE', fontWeight: 700 }}>{shortenHash(detailData?.txHash)}</span>
              </Typography>
            </Box>
          </Stack>
          <Stack
            mt={18}
            mb={20}
            width={252}
            sx={{
              backgroundColor: '#111211',
              borderRadius: '12px',
              padding: '14px 20px'
            }}
          >
            <Typography color={'#7A9283'}>From</Typography>
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              gap={6}
              sx={{
                textAlign: 'center',
                '& img': {
                  margin: '0 auto'
                }
              }}
            >
              <Image src={Arrow} width={48} />
              <Typography color={'#ebebeb'} fontSize={16} fontWeight={500}>
                Ethereum
              </Typography>
              <Typography fontSize={14}>
                <span style={{ color: '#7A9283' }}>TxID: </span>
                <span style={{ color: '#A5FFBE', fontWeight: 700 }}>{shortenHash(detailData?.txHash)}</span>
              </Typography>
            </Box>
          </Stack>
          <Image src={Arrow} width={50} style={{ position: 'absolute', left: '45.5%', top: '33%' }} />
        </Stack>
      </Box>
    </Box>
  )
}
