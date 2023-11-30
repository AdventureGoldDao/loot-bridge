import { Menu, MenuItem, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { ReactComponent as Icon } from '../../pages/components/arrow_icon.svg'

export default function V1Link() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [vText, setVText] = useState('V1')
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      direction={'row'}
      sx={{
        width: 70,
        height: 27,
        marginRight: {
          xs: 0,
          lg: 48
        },
        marginTop: '-8px',
        cursor: 'pointer',
        backgroundColor: '#020202',
        border: '1px solid #4B5954',
        borderRadius: '20px',
        '& svg path': {
          fill: '#A5FFBE'
        },
        '& .MuiMenu-root#basic-menu': {
          width: '70px !important'
        }
      }}
    >
      <Typography
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        fontSize={14}
        fontWeight={700}
        color={'#A5FFBE'}
      >
        {vText}
        <Icon style={{ marginLeft: '5px' }} />
      </Typography>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiList-root': {
            borderRadius: '10px',
            border: '1px solid #A5FFBE',
            background: '#020202'
          },
          '& .MuiMenuItem-root:hover': {
            background: '#4B5954'
          },
          '& .MuiMenuItem-root': {
            color: '#A5FFBE',
            background: '#020202',
            textAlign: 'center',
            minWidth: '50px !important'
          }
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={() => window.open('https://mainnetv1.lootchain.com/bridge', '_blank')}>V1</MenuItem>
        <MenuItem
          onClick={() => {
            setVText('V2')
            handleClose()
          }}
        >
          V2
        </MenuItem>
      </Menu>
    </Stack>
  )
}
