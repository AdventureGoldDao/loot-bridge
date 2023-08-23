import { Box, Stack, Typography } from '@mui/material'
import PopperCard from './PopperCard'
import Image from 'components/Image'
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow_down.svg'
import SearchIcon from 'assets/svg/search.svg'
import { Chain } from 'models/chain'
import { UserNFTCollection } from 'pages/Bridge'
import { useEffect, useState } from 'react'
import { useGetNFTDetail, useUserOwnedNFTList } from 'hooks/useTransferNFT'
import { useActiveWeb3React } from 'hooks'

export default function Collection({
  setSelectedNft,
  fromChain,
  setIsEnteredCollection
}: {
  setSelectedNft: React.Dispatch<React.SetStateAction<UserNFTCollection | undefined>>
  fromChain: Chain | null
  setIsEnteredCollection: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { account } = useActiveWeb3React()
  const { data: tokenNFTList } = useUserOwnedNFTList(account || '', fromChain?.id || 1)
  const [collection, setCollection] = useState<any>()
  const { data: nftList } = useGetNFTDetail(account || '', fromChain?.id || 1, collection?.nftAddress || '')
  console.log('🚀 ~ file: Collection.tsx:23 ~ tokenNFTList:', nftList?.list)

  useEffect(() => {
    !collection && setCollection(tokenNFTList?.list?.[0])
  }, [collection, tokenNFTList?.list])
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
              <Typography>{collection ? 'Loot' : 'Select a Collection'}</Typography>
            </Stack>
            <ArrowIcon />
          </Box>
        }
      >
        <>
          {tokenNFTList?.list?.map((option: any, index: number) => (
            <Box
              key={option.id + index}
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
              Loot
            </Box>
          ))}
          {tokenNFTList?.list?.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontSize: 20,
                lineHeight: '150%'
              }}
            >
              No Collection
            </Box>
          )}
        </>
      </PopperCard>
      <Stack
        mt={15}
        justifyContent={collection === undefined ? 'center' : 'flex-start'}
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
        {nftList?.list?.map((option: any) => (
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
                <Image src={option.imageUri || ''} width={44} style={{ borderRadius: '50%' }} />
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
        {nftList?.list?.length === 0 && (
          <Box
            sx={{
              height: 400,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              fontSize: 20,
              lineHeight: '150%'
            }}
          >
            No Data
          </Box>
        )}
        {collection === undefined && (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              '& img': {
                margin: 'auto'
              }
            }}
          >
            <Image src={SearchIcon} width={56} />
          </Box>
        )}
      </Stack>
    </Stack>
  )
}
