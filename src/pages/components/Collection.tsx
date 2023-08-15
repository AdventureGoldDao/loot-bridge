import { Box, Stack, Typography } from '@mui/material'
import PopperCard from './PopperCard'
import Image from 'components/Image'
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow_down.svg'
import { Chain } from 'models/chain'
import { UserNFTCollection } from 'pages/Bridge'
import { useState } from 'react'
import Logo from 'assets/svg/nft-small.svg'

const tokenNFTList = [
  {
    tokenAddress: '0x1EFB2Cb5015FDd13120dF72BB152c8Ec91bCD68e',
    name: 'ONFT721'
  }
]

const userNFTList: UserNFTCollection[] = [
  {
    name: 'ONFT721',
    contractAddr: '0x1EFB2Cb5015FDd13120dF72BB152c8Ec91bCD68e',
    image: Logo,
    tokenId: 5,
    balance: ''
  },
  {
    name: 'ONFT721',
    contractAddr: '0x1EFB2Cb5015FDd13120dF72BB152c8Ec91bCD68e',
    image: Logo,
    tokenId: 4,
    balance: ''
  }
]

export default function Collection({
  setSelectedNft,
  fromChain,
  setIsEnteredCollection
}: {
  setSelectedNft: React.Dispatch<React.SetStateAction<UserNFTCollection | undefined>>
  fromChain: Chain | null
  setIsEnteredCollection: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [collection, setCollection] = useState<any>()

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
          width: 549,
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
              <Typography>{collection ? collection.name : 'Select a Collection'}</Typography>
            </Stack>
            <ArrowIcon />
          </Box>
        }
      >
        <>
          {tokenNFTList.map(option => (
            <Box
              key={option.tokenAddress}
              sx={{
                color: '#7fb093',
                fontSize: 16,
                lineHeight: '24px',
                padding: '14px 20px',
                '&:hover': {
                  cursor: 'pointer',
                  opacity: 0.8,
                  backgroundColor: '#282D29'
                }
              }}
              onClick={() => setCollection(option)}
            >
              {option.name}
            </Box>
          ))}
        </>
      </PopperCard>
      <Stack
        mt={15}
        justifyContent={'flex-start'}
        direction={'column'}
        spacing={12}
        sx={{
          height: 438,
          padding: 16,
          backgroundColor: '#000',
          borderRadius: '12px',
          overflowY: 'auto'
        }}
      >
        {userNFTList.map(option => (
          <>
            <Stack
              height={70}
              key={option.tokenId}
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{
                width: '100%',
                padding: '14px 20px',
                backgroundColor: '#101110',
                borderRadius: '10px',
                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: '#282D29'
                },
                '& div': {
                  flexDirection: 'row',
                  alignItems: 'center'
                }
              }}
              onClick={() => {
                setSelectedNft(option)
                setIsEnteredCollection(false)
              }}
            >
              <Stack>
                <Image src={option.image || ''} width={44} style={{ borderRadius: '50%' }} />
                <Typography ml={10} color={'#A5FFBE'} fontSize={20} fontWeight={600}>
                  {option.name}
                </Typography>
              </Stack>
              <Typography fontSize={16} fontWeight={600} color={'#A5FFBE'}>
                {fromChain?.name}
              </Typography>
            </Stack>
          </>
        ))}
      </Stack>
    </Stack>
  )
}
