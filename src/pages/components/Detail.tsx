import { Box, Stack, Typography } from '@mui/material'
import Arrow from 'assets/svg/arrow_right.svg'
import EthLogo from 'assets/svg/eth_logo.svg'
import LootLogo from 'assets/images/logo.png'
import Image from 'components/Image'
import { shortenHash } from 'utils'
import NFT from 'assets/svg/nft-small.svg'

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
            width={260}
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
              <Image src={EthLogo} width={48} height={48} />
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
            width={260}
            sx={{
              backgroundColor: '#111211',
              borderRadius: '12px',
              padding: '14px 20px'
            }}
          >
            <Typography color={'#7A9283'}>To</Typography>
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
              <Image src={LootLogo} width={48} height={48} />
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
        <Stack
          direction={'row'}
          spacing={32}
          sx={{
            backgroundColor: '#111211',
            borderRadius: '12px',
            padding: 10,
            '& p': {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              '& .name': {
                fontSize: 16,
                fontWeight: 500,
                color: '#ebebeb'
              },
              '& .tokenId': {
                marginTop: 20,
                fontSize: 24,
                fontWeight: 600,
                color: '#ebebeb'
              }
            }
          }}
        >
          <Image src={NFT} width={76} height={76} />
          <Typography>
            <span className="name">Collection Name</span>
            <span className="tokenId">NFT Name #003</span>
          </Typography>
        </Stack>
        <Stack mt={18} spacing={14}>
          <Typography color={'#7A9283'} fontSize={16}>
            Timestamp
          </Typography>
          <Typography color={'#ebebeb'} fontWeight={500} fontSize={16}>
            2023-07-05 11:23:31
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}
