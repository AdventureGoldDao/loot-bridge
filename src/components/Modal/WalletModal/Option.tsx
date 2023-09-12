import React from 'react'
import { styled, Button } from '@mui/material'
import { ExternalLink } from 'theme/components'
import LogoText from 'components/LogoText'
import { ActivationStatus, useActivationState } from 'connection/activate'
import { Connection } from 'connection/types'
import { useAppSelector } from 'state/hooks'
import { getConnection } from 'connection'
import { useActiveWeb3React } from 'hooks'

const GreenCircle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  '& div ': {
    height: 8,
    width: 8,
    marginRight: 8,
    backgroundColor: theme.palette.success.main,
    borderRadius: '50%'
  }
}))

export default function Option({
  link = null,
  header,
  connection,
  icon,
  active = false,
  id
}: {
  link?: string | null
  header: React.ReactNode
  connection?: Connection
  icon: string
  active?: boolean
  id: string
}) {
  const { activationState, tryActivation } = useActivationState()
  const { active: _active } = useActiveWeb3React()
  const selectedWallet = useAppSelector(state => state.userWallet.selectedWallet)
  const curConnection = selectedWallet && _active ? getConnection(selectedWallet) : undefined

  const activate = () =>
    active &&
    connection &&
    tryActivation(connection, () => {}).catch(err => {
      console.error('error message:', err)
    })

  const isSomeOptionPending = activationState.status === ActivationStatus.PENDING
  const isCurrentOptionPending = isSomeOptionPending && activationState.connection.type === connection?.type

  const content = (
    <>
      <Button
        variant="outlined"
        key={id}
        sx={{
          color: active ? 'transparent' : undefined,
          width: '100%'
        }}
        onClick={activate}
        disabled={!active || isCurrentOptionPending || connection === curConnection}
      >
        {active ? (
          <GreenCircle>
            <div />
          </GreenCircle>
        ) : null}
        <LogoText logo={icon} text={header} color="#7A9283" />
      </Button>
    </>
  )
  if (link) {
    return <ExternalLink href={link}>{content}</ExternalLink>
  }
  return content
}
