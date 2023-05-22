import { Box, Typography, keyframes, styled } from '@mui/material'
import Button from 'components/Button/ActionButton'
import Float from 'assets/images/floater.png'
import Image from 'components/Image'

const UrlCon = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 10
})

const float = keyframes`
  50%{
    transform: translate(0, 20px);
  }
`

const float1 = keyframes`
  50%{
    transform: translate(0, -20px);
  }
`

export default function Home() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        overflowX: 'auto',
        '& .flowL': {
          animation: `${float} 3s ease-out infinite`,
          position: 'absolute',
          left: 68,
          top: 20,
          '&:before': {
            animation: 'shrink 3s ease-out infinite, floatUp 3s ease-out infinite'
          }
        },
        '& .flowR': {
          animation: `${float1} 3s ease-out infinite`,
          position: 'absolute',
          right: 68,
          bottom: 20,
          '&:before': {
            animation: 'shrink 3s ease-out infinite, floatUp 3s ease-out infinite'
          }
        }
      }}
    >
      <Box>
        <Typography
          textAlign={'center'}
          width={'100%'}
          fontFamily={'Inconsolata'}
          lineHeight={'105px'}
          fontSize={100}
          fontWeight={700}
          color={'#A5FFBE'}
        >
          LOOT
        </Typography>
      </Box>
      <Box
        mt={30}
        sx={{
          maxWidth: 980,
          margin: '30px auto 0',
          backgroundColor: '#242926',
          textAlign: 'center',
          border: '1px solid #FDFFAC',
          borderRadius: '10px',
          padding: 24
        }}
      >
        <Typography fontFamily={'Inconsolata'} lineHeight={'19px'} fontSize={18} fontWeight={700} color={'#7FB093'}>
          Rollup Details
        </Typography>
        <Box
          mt={20}
          display={'grid'}
          gridTemplateColumns={'1fr 1fr 1fr'}
          sx={{
            backgroundColor: '#1A1E1B',
            borderRadius: '10px',
            width: '100%',
            height: 113,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <UrlCon>
            <Typography fontFamily={'Inconsolata'} lineHeight={'17px'} fontSize={16} fontWeight={600} color={'#7FB093'}>
              RPC URL
            </Typography>
            <Typography fontFamily={'Inconsolata'} lineHeight={'17px'} fontSize={16} fontWeight={500} color={'#A5FFBE'}>
              https://loot.calderachain.xyz/http
            </Typography>
          </UrlCon>
          <UrlCon>
            <Typography fontFamily={'Inconsolata'} lineHeight={'17px'} fontSize={16} fontWeight={600} color={'#7FB093'}>
              Websocket URL
            </Typography>
            <Typography fontFamily={'Inconsolata'} lineHeight={'17px'} fontSize={16} fontWeight={500} color={'#A5FFBE'}>
              wss://loot.calderachain.xyz/ws
            </Typography>
          </UrlCon>
          <UrlCon>
            <Typography fontFamily={'Inconsolata'} lineHeight={'17px'} fontSize={16} fontWeight={600} color={'#7FB093'}>
              Chain ID
            </Typography>
            <Typography fontFamily={'Inconsolata'} lineHeight={'17px'} fontSize={16} fontWeight={500} color={'#A5FFBE'}>
              9088912
            </Typography>
          </UrlCon>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 16,
            margin: '20px auto',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Button onAction={() => {}}>Add Chain to Metamask</Button>
          <Button onAction={() => {}}>Replica URLs</Button>
        </Box>
        <Box
          mt={20}
          sx={{
            flexDirection: 'column',
            backgroundColor: '#1A1E1B',
            borderRadius: '10px',
            textAlign: 'center',
            width: '100%',
            padding: 24,
            gap: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography fontFamily={'Inconsolata'} lineHeight={'30px'} fontSize={25} fontWeight={700} color={'#A5FFBE'}>
            Get started with your rollup
          </Typography>
          <Typography fontFamily={'Inconsolata'} lineHeight={'22px'} fontSize={16} fontWeight={400} color={'#7FB093'}>
            Get started with sending transactions, deploying your app, and more.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 16,
              margin: '20px auto',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Button width="280px" onAction={() => {}}>
              Request faucet funds on goerli
            </Button>
            <Button width="280px" onAction={() => {}}>
              Request faucet funds on loot rollup
            </Button>
            <Button width="280px" onAction={() => {}}>
              Deploy your app
            </Button>
          </Box>
        </Box>
      </Box>
      <Image className="flowL" src={Float} />
      <Image className="flowR" src={Float} />
    </Box>
  )
}
