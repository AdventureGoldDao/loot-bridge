import { Box, Stack, Typography } from '@mui/material'
import Arrow from 'assets/svg/arrow_right.svg'
import Image from 'components/Image'
import { getEtherscanLink, shortenHash } from 'utils'
import NFT from 'assets/svg/nft-small.svg'
import { ChainListMap } from 'constants/chain'
import { Props } from './TxHistory'
import moment from 'moment'

function TopPanel({ direction, detailData }: { direction: 'From' | 'To'; detailData: Props }) {
  return (
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
      <Typography color={'#7A9283'}>{direction}</Typography>
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
        <Image
          src={
            direction === 'From'
              ? ChainListMap[detailData?.fromChain || 1]?.logo || ''
              : ChainListMap[detailData?.toChain || 1]?.logo || ''
          }
          width={48}
          height={48}
        />
        <Typography color={'#ebebeb'} fontSize={16} fontWeight={500} textAlign={'center'}>
          {direction === 'From'
            ? ChainListMap[detailData?.fromChain || 1]?.name
            : ChainListMap[detailData?.toChain || 1]?.name}
        </Typography>
        <Typography fontSize={14}>
          <span style={{ color: '#7A9283' }}>TxID: </span>
          <span
            style={{ color: '#A5FFBE', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => {
              window.open(
                getEtherscanLink(
                  detailData && direction === 'From' ? detailData.fromChain : detailData.toChain,
                  direction === 'From' ? detailData?.sentTx || '' : detailData?.receivedTx || '',
                  'transaction'
                ),
                '_blank'
              )
            }}
          >
            {direction === 'From' && detailData?.sentTx ? shortenHash(detailData?.sentTx) : 'Confirming'}
            {direction === 'To' && detailData?.receivedTx ? shortenHash(detailData?.receivedTx) : 'Confirming'}
          </span>
        </Typography>
      </Box>
    </Stack>
  )
}

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
          <TopPanel direction="From" detailData={detailData} />
          <TopPanel direction="To" detailData={detailData} />
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
            <span className="name">{detailData?.contractName || 'Collection'}</span>
            <span className="tokenId">
              {detailData?.nft.name} #{detailData?.tokenId}
            </span>
          </Typography>
        </Stack>
        <Stack mt={18} spacing={14}>
          <Typography color={'#7A9283'} fontSize={16}>
            Timestamp
          </Typography>
          <Typography color={'#ebebeb'} fontWeight={500} fontSize={16}>
            {moment(detailData?.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}
