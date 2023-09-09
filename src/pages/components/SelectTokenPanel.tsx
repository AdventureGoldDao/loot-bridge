import { Box, MenuItem, Stack, Typography } from '@mui/material'
import Image from 'components/Image'
import { Chain } from 'models/chain'
import Logo from 'assets/images/logo.png'
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow_down.svg'
import { ReactComponent as Icon } from './arrow_icon.svg'
import InputNumerical from 'components/Input/InputNumerical'
import PopperCard from './PopperCard'
import LogoText from 'components/LogoText'
// import { ChainListMap } from 'constants/chain'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { Dispatch, SetStateAction } from 'react'
import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { Currency, CurrencyAmount } from 'constants/token'
import { ChainToken, MultiChainToken } from '../bridge/Fungible'
import { ChainListMap } from '../../constants/chain'

export function TargetElement({ chain }: { chain: Chain | null }) {
  return (
    <Box
      sx={{
        height: 70,
        color: '#A5FFBE',
        display: 'flex',
        padding: '10px',
        cursor: 'pointer',
        alignItems: 'center',
        '& svg': {
          margin: '0 40px 0 auto'
        },
        '& p': {
          color: '#ebebeb',
          fontSize: 20
        }
      }}
    >
      <Stack direction={'row'} spacing={19} alignItems={'center'}>
        <Image width={40} height={40} src={chain?.logo || Logo} />
        <Typography>{chain?.name || 'AGLD'}</Typography>
      </Stack>
      <ArrowIcon />
    </Box>
  )
}

export function SelectTokenPanel({
  chain,
  token,
  multiToken,
  chainId,
  dirText,
  setMultiToken,
  amount,
  setAmount,
  setToken,
  tokenList
}: {
  chain: Chain | undefined
  multiToken: MultiChainToken
  token: ChainToken
  amount: CurrencyAmount | undefined
  setAmount: Dispatch<SetStateAction<CurrencyAmount | undefined>>
  chainId?: number
  dirText: string
  setMultiToken: (multiChainToken: MultiChainToken) => void
  setToken: Dispatch<SetStateAction<ChainToken>>
  tokenList: MultiChainToken[]
}) {
  const { account } = useActiveWeb3React()
  const switchNetwork = useSwitchNetwork()
  const tCurrency = new Currency(
    token.chainId,
    token.nativeAddress ?? token.contractAddress,
    token.decimals,
    multiToken.name
  )
  const balance = useCurrencyBalance(account || undefined, tCurrency, token.chainId)

  return (
    <Stack
      spacing={13}
      sx={{
        height: 'fit-content',
        color: '#A5FFBE',
        padding: '22px 25px',
        alignItems: 'center'
      }}
    >
      <Stack width={'100%'} flex={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          spacing={10}
          sx={{
            '& p': {
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 600
            },
            '& svg': {
              width: 8
            }
          }}
        >
          <Typography color={'#7A9283'}>{dirText} Network</Typography>
          <PopperCard
            sx={{
              width: 240,
              marginTop: 0,
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
              <Typography color={'#A5FFBE'} sx={{ cursor: 'pointer' }}>
                {chain?.name}
              </Typography>
            }
          >
            <>
              {multiToken.tokens?.map(option => (
                <MenuItem
                  key={option.chainId}
                  selected={option.chainId === chain?.id}
                  onClick={() => {
                    setToken(option)
                    if (chainId && dirText === 'From') {
                      switchNetwork(option.chainId ?? undefined)
                    }
                  }}
                >
                  <LogoText
                    logo={ChainListMap[option.chainId]?.logo ?? ''}
                    text={ChainListMap[option.chainId]?.name}
                    gapSize={'large'}
                    fontSize={16}
                    fontWeight={600}
                    color="#A5FFBE"
                  />
                </MenuItem>
              ))}
            </>
          </PopperCard>
          <Icon />
        </Stack>
        <Typography color={'#7A9283'} fontWeight={600} fontSize={16} lineHeight={'24px'}>
          Balance: {balance?.toSignificant() || '--'}
        </Typography>
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'cente'}
        justifyContent={'space-between'}
        sx={{
          width: '100%',
          border: '1px solid #3C5141',
          borderRadius: '8px'
        }}
      >
        <InputNumerical
          onChange={e => {
            setAmount(CurrencyAmount.fromAmount(tCurrency, e.target.value))
          }}
          value={amount?.toExact().toString() ?? ''}
        />
        <PopperCard
          sx={{
            width: 150,
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
            <Stack
              direction={'row'}
              spacing={10}
              alignItems={'center'}
              justifyContent={'space-between'}
              sx={{
                width: 150,
                height: 50,
                cursor: 'pointer',
                padding: '0 10px',
                borderLeft: '1px solid #3C5141',
                '& p': {
                  width: 100,
                  fontWeight: 600,
                  textAlign: 'center',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  margin: '0 !important'
                }
              }}
            >
              {multiToken?.logo && <Image width={24} height={24} src={multiToken?.logo} />}
              <Typography noWrap>{multiToken?.name || ''}</Typography>
              <Icon />
            </Stack>
          }
        >
          <>
            {tokenList?.map(option => (
              <MenuItem
                key={option.id}
                selected={option.id === multiToken?.id}
                onClick={() => {
                  setMultiToken(option)
                }}
              >
                <LogoText
                  logo={option.logo}
                  text={option.name}
                  gapSize={'large'}
                  fontSize={16}
                  fontWeight={600}
                  color="#A5FFBE"
                />
              </MenuItem>
            ))}
          </>
        </PopperCard>
      </Stack>
    </Stack>
  )
}
