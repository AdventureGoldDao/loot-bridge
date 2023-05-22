import { Box, Typography, styled } from '@mui/material'
import { ReactComponent as TwIcon } from 'assets/svg/twIcon.svg'
import { ReactComponent as TgIcon } from 'assets/svg/tg.svg'
import { ReactComponent as GithubIcon } from 'assets/svg/github.svg'

const Line = styled('div')({
  width: 1,
  height: 63,
  backgroundColor: '#3C5141'
})

export default function Footer() {
  return (
    <Box
      mt={80}
      sx={{
        backgroundColor: '#383838',
        justifyContent: 'center',
        display: 'flex'
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '345px 1px 1fr 1fr',
          justifyContent: 'center',
          height: 178,
          maxWidth: 970,
          alignItems: 'center',
          gap: 48
        }}
      >
        <Box width={'100%'}>
          <Typography lineHeight={'16px'} fontSize={16} fontWeight={700} color={'#A5FFBE'}>
            Loot Explorer
          </Typography>
          <Typography lineHeight={'22px'} mt={15} fontSize={14} fontWeight={500} color={'#7FB093'}>
            Blockscout is a tool for inspecting and analyzing EVM based blockchains. Blockchain explorer for Ethereum
            Networks.
          </Typography>
        </Box>
        <Line />
        <Box width={385}>
          <Typography lineHeight={'16px'} fontSize={16} fontWeight={700} color={'#A5FFBE'}>
            BlockScout
          </Typography>
          <Box
            display={'flex'}
            flexDirection={'row'}
            flexWrap={'wrap'}
            mt={25}
            sx={{
              '& p': {
                minWidth: 135,
                marginRight: 35
              }
            }}
          >
            <Typography lineHeight={'22px'} fontSize={14} fontWeight={500} color={'#7FB093'}>
              <span>· Submit an Issue</span>
            </Typography>
            <Typography lineHeight={'22px'} fontSize={14} fontWeight={500} color={'#7FB093'}>
              <span>· Chat (#blockscout)</span>
            </Typography>
            <Typography lineHeight={'22px'} fontSize={14} fontWeight={500} color={'#7FB093'}>
              <span>· Contribute</span>
            </Typography>
            <Typography lineHeight={'22px'} fontSize={14} fontWeight={500} color={'#7FB093'}>
              <span>· Forum</span>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 18,
            alignItems: 'center'
          }}
        >
          <TwIcon />
          <TgIcon />
          <GithubIcon />
        </Box>
      </Box>
    </Box>
  )
}
