import {Button} from '@mui/material'
import {ReactNode, useCallback, useState} from 'react'
import {adminTickDebugSwitch_IO} from '../../../domain/admin/adminActionsIO.possibilities.api'


export const DebugModeBackendSwitch = (): ReactNode => {
  const [debugModeCurrentState, setDebugModeCurrentState] = useState<string>('')


  const backendDebugCallback = useCallback(
    () => {
      void adminTickDebugSwitch_IO(
        undefined,
        async (res) => {
          if (res.event === 'DEBUG_MODE_ENABLED') {
            setDebugModeCurrentState('enabled')
          }

          if (res.event === 'DEBUG_MODE_DISABLED') {
            setDebugModeCurrentState('disabled')
          }

        },
        async (error) => {
        })
    },
    [])


  return <Button

    onClick={backendDebugCallback}>
    [on/off] {String(debugModeCurrentState)}</Button>

}
