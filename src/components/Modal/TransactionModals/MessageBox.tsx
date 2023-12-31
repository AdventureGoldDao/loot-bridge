import React from 'react'
import { Box, Typography } from '@mui/material'
import Modal from 'components/Modal'
import { ReactComponent as SuccessIcon } from 'assets/componentsIcon/statusIcon/success_icon.svg'
import { ReactComponent as FailureIcon } from 'assets/componentsIcon/statusIcon/failure_icon.svg'
import { ReactComponent as SupportIcon } from 'assets/componentsIcon/statusIcon/support_icon.svg'
import { ReactComponent as Error } from 'assets/componentsIcon/statusIcon/error_icon.svg'
import { ReactComponent as Warning } from 'assets/componentsIcon/statusIcon/warning_icon.svg'
import useModal from 'hooks/useModal'
import ActionButton from 'components/Button/ActionButton'

interface Props {
  type: 'success' | 'failure' | 'support' | 'error' | 'warning'
  children?: React.ReactNode
  width?: string
  header?: string
  action?: () => void
  actionText?: string
  hideFunc?: () => void
}

export default function MessageBox({ type, children, width = '480px', header, action, actionText, hideFunc }: Props) {
  const { hideModal } = useModal()

  const icon =
    type === 'success' ? (
      <SuccessIcon height={40} width={40} />
    ) : type === 'failure' ? (
      <FailureIcon />
    ) : type === 'support' ? (
      <SupportIcon />
    ) : type === 'warning' ? (
      <Warning />
    ) : (
      <Error />
    )

  return (
    <Modal width={width} background="#1B1F1C">
      <Box display={'grid'} alignItems={'center'} padding={'40px'} justifyItems="center" gap="20px">
        <Box
          sx={{
            '& svg path': {
              fill: type === 'success' ? '#A5FFBE' : 'unset'
            }
          }}
        >
          {icon}
        </Box>
        {header && <Typography variant="h6">{header}</Typography>}
        <Box color="#A5FFBE" fontSize="18px" textAlign="center" display="grid" justifyItems="center" width="100%">
          {children}
        </Box>

        <Box display="flex" justifyContent="space-around" width="100%" marginTop="10px">
          <ActionButton
            width="100%"
            onAction={() => {
              hideModal()
              hideFunc && hideFunc()
            }}
          >
            Close
          </ActionButton>
          {type === 'failure' && actionText && (
            <ActionButton width="100%" onAction={action}>
              {actionText}
            </ActionButton>
          )}
        </Box>
      </Box>
    </Modal>
  )
}
