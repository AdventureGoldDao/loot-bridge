import Button from './Button'

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
  console.log(error, success, pending, errorText, pendingText, successText)
  return (
    <>
      <Button style={{ height, width }} onClick={onAction} disabled={disableAction}>
        {children ? children : actionText}
      </Button>
    </>
  )
}
