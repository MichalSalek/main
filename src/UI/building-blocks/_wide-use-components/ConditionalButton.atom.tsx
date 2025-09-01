import {Button, Stack, Typography} from '@mui/material'
import {ReactElement} from 'react'


type Props = {
  condition: boolean
  informationText?: string
  buttonText: string
  buttonActionCallback: () => void
}
export const ConditionalButtonAtom = (
  {
    condition,
    informationText,
    buttonText,
    buttonActionCallback
  }: Props): ReactElement => {


  return <>

    {condition
      ? <Stack
        sx={{
          py: 3,
          alignItems: 'center'
        }}
      >
        <Typography> {informationText} </Typography>
        <Button onClick={buttonActionCallback}>

          {buttonText}

        </Button>
      </Stack>
      : null}

  </>
}
