import { Box, Stack, Typography } from '@mui/material'
import Logo from 'assets/svg/search.svg'
import PopperCard from './PopperCard'
import Image from 'components/Image'
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow_down.svg'
import { Chain } from 'models/chain'
import { UserNFTCollection } from 'pages/Bridge'

export default function Collection({
  setNft,
  fromChain,
  setIsEnteredCollection
}: {
  setNft: React.Dispatch<React.SetStateAction<UserNFTCollection | undefined>>
  fromChain: Chain | null
  setIsEnteredCollection: React.Dispatch<React.SetStateAction<boolean>>
}) {
  console.log(fromChain, setNft)

  return (
    <Stack>
      <Typography
        fontSize={16}
        fontWeight={600}
        color={'#7A9283'}
        sx={{ cursor: 'pointer' }}
        onClick={() => setIsEnteredCollection(false)}
      >
        &lt; Back
      </Typography>
      <PopperCard
        sx={{
          width: 530,
          marginTop: 13,
          maxHeight: '50vh',
          overflowY: 'auto',
          backgroundColor: '#2C353D',
          border: '1px solid #FDFFAC',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
        placement="bottom-start"
        targetElement={
          <Box
            sx={{
              marginTop: 19,
              height: 50,
              color: '#A5FFBE',
              display: 'flex',
              padding: '10px',
              cursor: 'pointer',
              alignItems: 'center',
              border: '1px solid #3C5141',
              backgroundColor: '#101110',
              borderRadius: '12px',
              '& svg': {
                margin: '0 20px 0 auto'
              },
              '& p': {
                color: '#7A9283',
                fontSize: 18,
                fontWeight: 700,
                marginLeft: 20
              }
            }}
          >
            <Stack direction={'row'} spacing={19} alignItems={'center'}>
              <Typography>Select a Collection</Typography>
            </Stack>
            <ArrowIcon />
          </Box>
        }
      >
        <></>
      </PopperCard>
      <Stack
        mt={15}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          height: 438,
          backgroundColor: '#000',
          borderRadius: '12px'
        }}
      >
        <Image src={Logo} width={56} />
      </Stack>
    </Stack>
  )
}
