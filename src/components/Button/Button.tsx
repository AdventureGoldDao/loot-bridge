import React from 'react'
import { ButtonBase, Theme } from '@mui/material'
import { SxProps } from '@mui/system'

interface Props {
  onClick?: () => void
  width?: string
  height?: string
  backgroundColor?: string
  disabled?: boolean
  color?: string
  children?: React.ReactNode
  fontSize?: string | number
  classname?: string
  borderRadius?: string
  style?: React.CSSProperties & SxProps<Theme>
}

export default function Button(props: Props) {
  const { onClick, disabled, style, width, height, fontSize, backgroundColor, color, borderRadius, children } = props
  return (
    <ButtonBase
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: width || 159,
        height: height || 40,
        fontSize: fontSize || 14,
        fontWeight: 700,
        transition: '.3s',
        borderRadius: borderRadius ? borderRadius : 1,
        background: backgroundColor || 'linear-gradient(90deg, #A5FFBE 0%, #55DD7B 100%)!important',
        color: color || '#213425',
        '&:hover': {
          // background: theme.palette.primary.dark
          opacity: 0.8
        },
        '&:disabled': {
          background: '#32453C !important',
          color: '#517058'
          // opacity: 0.5
          // backgroundColor: theme.textColor.text2
        },
        ...style
      }}
    >
      {children}
    </ButtonBase>
  )
}
