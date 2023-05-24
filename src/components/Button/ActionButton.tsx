import { useWalletModalToggle } from 'state/application/hooks'
import Button from './Button'
import { useActiveWeb3React } from 'hooks'

export default function ActionButton({
  error,
  pending,
  success,
  children,
  onAction,
  errorText,
  successText,
  pendingText,
  actionText,
  height = '40px',
  width = '195px',
  disableAction
}: {
  error?: string | undefined
  pending?: boolean
  success?: boolean
  children?: React.ReactNode
  onAction: (() => void) | undefined
  errorText?: string
  actionText?: string
  pendingText?: string
  successText?: string
  height?: string
  width?: string
  disableAction?: boolean
}) {
  const toggleWalletModal = useWalletModalToggle()
  const { account } = useActiveWeb3React()
  console.log(error, success, pending, errorText, pendingText, successText)
  return (
    <>
      {!account ? (
        <Button style={{ height, width, fontSize: 20 }} onClick={toggleWalletModal}>
          Connect Wallet
        </Button>
      ) : (
        <Button style={{ height, width, fontSize: 20 }} onClick={onAction} disabled={disableAction}>
          {children ? children : actionText}
        </Button>
      )}
    </>
  )
}
