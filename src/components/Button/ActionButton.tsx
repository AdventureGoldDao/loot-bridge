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
  actionText = 'action',
  height = '50px',
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
  console.log(error, success, errorText, successText)
  return (
    <>
      {pending ? (
        <Button style={{ height, width, fontSize: 20 }}>{pendingText}</Button>
      ) : (
        <Button style={{ height, width, fontSize: 20 }} onClick={onAction} disabled={disableAction}>
          {children ? children : actionText}
        </Button>
      )}
    </>
  )
}
