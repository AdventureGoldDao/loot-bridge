import { Box, useTheme, Typography } from '@mui/material'
import { HideOnMobile } from 'theme/index'
import LayerZeroIcon from 'assets/svg/layerZero.svg'
import Image from 'components/Image'

export default function Footer() {
  const theme = useTheme()

  return (
    <HideOnMobile>
      <footer
        style={{
          height: theme.height.footer
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" width="100%" padding="0 60px 28px" gap="10px">
          <Typography color={'#fff'} fontSize={14} fontWeight={700}>
            Powered by{' '}
          </Typography>
          <Image src={LayerZeroIcon} width={80} />
        </Box>
      </footer>
    </HideOnMobile>
  )
}
