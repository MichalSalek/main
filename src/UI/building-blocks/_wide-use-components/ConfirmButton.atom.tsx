import {freezeThreadAndWait} from '@msalek/utils'
import {Button, ButtonProps} from '@mui/material'
import {HTMLAttributes, ReactElement, useCallback, useState} from 'react'


type Props = {
  actionText: string,
  actionCallback: Function
  passProps?: ButtonProps & HTMLAttributes<HTMLButtonElement>
  confirmationText?: string
}
export const ConfirmButtonAtom = ({confirmationText, actionText, actionCallback, passProps}: Props): ReactElement => {

  const [confirmAskState, setConfirmAskState] = useState(true)
  const [disabledState, setDisabledState] = useState(false)


  const CONFIRMATION_TEXT = confirmationText ?? 'Na pewno?'
  const ACTION_TEXT = actionText


  const [buttonText, setButtonText] = useState<string>(ACTION_TEXT)


  const buttonActionCallback = useCallback(
    async () => {

      if (confirmAskState) {

        setConfirmAskState(false)
        setButtonText(CONFIRMATION_TEXT)
        await freezeThreadAndWait(2000)

        setConfirmAskState(true)
        setButtonText(ACTION_TEXT)

      } else {
        setDisabledState(true)
        await freezeThreadAndWait(100)
        await actionCallback()
        setButtonText(ACTION_TEXT)

        await freezeThreadAndWait(150)
        setConfirmAskState(true)
        setDisabledState(false)
      }

    },
    [confirmAskState,
      ACTION_TEXT,
      CONFIRMATION_TEXT,
      actionCallback
    ])


  return <>

    <Button
      variant={'outlined'}

      {...passProps}


      disabled={disabledState || passProps?.disabled}

      color={confirmAskState
        ? passProps?.color ?? 'warning'
        : 'error'}

      onClick={buttonActionCallback}

    >{buttonText}</Button>

  </>
}
