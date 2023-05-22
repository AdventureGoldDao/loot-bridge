import React, { ChangeEvent, InputHTMLAttributes, useCallback } from 'react'
import { InputBase, styled, Typography } from '@mui/material'
import { inputBaseClasses } from '@mui/material/InputBase'
import InputLabel from './InputLabel'
import { escapeRegExp, isAddress, isEmail, isURL } from 'utils'

export interface InputProps {
  placeholder?: string
  value: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  label?: string
  disabled?: boolean
  focused?: boolean
  outlined?: boolean
  type?: React.HTMLInputTypeAttribute | 'address' | 'unumber' | 'string' | 'uint'
  endAdornment?: React.ReactNode
  maxWidth?: string | number
  height?: string | number
  error?: boolean
  smallPlaceholder?: boolean
  backgroundColor?: string
  rows?: string | number
  multiline?: boolean
  subStr?: string
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onValue?: (val: string) => void
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  [`&.${inputBaseClasses.root}`]: {
    fontSize: 16,
    color: theme.palette.text.primary,
    // fontFamily: 'Roboto',
    fontWeight: 400,
    // backgroundColor: theme.palette.background.default,
    paddingLeft: 20,
    borderRadius: 14
  },
  [`&.${inputBaseClasses.focused}`]: { border: `1px solid ${theme.palette.primary.main} !important` },
  [`& .${inputBaseClasses.input}`]: {
    maxWidth: '100%',
    '&::-webkit-outer-spin-button': {
      WebkitAppearance: 'none'
    },
    '&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none'
    },
    '&.Mui-disabled': {
      WebkitTextFillColor: theme.palette.text.secondary,
      color: theme.palette.text.secondary
    }
  },
  [`&.${inputBaseClasses.disabled}`]: {
    cursor: 'not-allowed'
  }
}))

const regex = {
  inputUNumber: RegExp(`^\\d*(?:\\\\[.])?\\d*$`),
  inputUintNumerical: RegExp(`^\\d*$`)
}

const enforcer = (reg: RegExp, nextUserInput: string) => {
  const fixed = nextUserInput.replace(/,/g, '.')
  if (fixed === '' || reg.test(escapeRegExp(fixed))) {
    return fixed
  }
  return null
}

export default function Input({
  focused,
  placeholder,
  onChange,
  value,
  disabled,
  type,
  outlined,
  endAdornment,
  maxWidth,
  onValue,
  onBlur,
  label,
  height,
  error,
  smallPlaceholder,
  backgroundColor,
  rows,
  subStr,
  ...rest
}: InputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'color' | 'outline' | 'size'>) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (type === 'unumber' || type === 'uint') {
        const curReg = type === 'unumber' ? regex.inputUNumber : regex.inputUintNumerical
        const formatted = enforcer(curReg, event.target.value)
        if (formatted === null) {
          return
        }
        event.target.value = formatted
        onChange && onChange(event)
        onValue && onValue(formatted)
      } else {
        onChange && onChange(event)
        onValue && onValue(event.target.value)
      }
    },
    [type, onChange, onValue]
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      if (type === 'url') {
        if (!isURL(e.target.value)) {
          e.target.value = ''
          onValue && onValue('')
        }
      } else if (type === 'address') {
        if (!isAddress(e.target.value)) {
          e.target.value = ''
          onValue && onValue('')
        }
      } else if (type === 'email') {
        if (!isEmail(e.target.value)) {
          e.target.value = ''
          onValue && onValue('')
        }
      }
      onBlur && onBlur(e)
    },
    [onBlur, onValue, type]
  )

  return (
    <div style={{ width: '100%', maxWidth: maxWidth || 'unset' }}>
      {label && <InputLabel>{label}</InputLabel>}
      <StyledInputBase
        sx={{
          minHeight: height || 50,
          [`&.${inputBaseClasses.root}`]: {
            backgroundColor: theme => backgroundColor || theme.palette.background.default,
            border: theme =>
              `1px solid ${outlined ? 'rgba(255,255,255,.4)' : error ? theme.palette.error.main : 'transparent'}`
          },
          [`&.${inputBaseClasses.focused}`]: {
            borderColor: theme =>
              error ? `${theme.palette.error.main}!important` : `${theme.palette.primary.main}!important`
          },
          [`& .${inputBaseClasses.input}`]: {
            '&::placeholder': {
              fontSize: smallPlaceholder ? 13 : 16,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }
          }
        }}
        color={error ? 'error' : 'primary'}
        fullWidth={true}
        placeholder={placeholder}
        inputRef={input => input && focused && input.focus()}
        onChange={handleChange}
        value={value}
        onBlur={handleBlur}
        rows={rows}
        disabled={disabled}
        type={type}
        endAdornment={endAdornment && <span style={{ paddingRight: 20 }}>{endAdornment}</span>}
        {...rest}
      />
      {subStr && (
        <Typography fontSize={12} mt={12} sx={{ opacity: 0.5 }}>
          {subStr}
        </Typography>
      )}
    </div>
  )
}
