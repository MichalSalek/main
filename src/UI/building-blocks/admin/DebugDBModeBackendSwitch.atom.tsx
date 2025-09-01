import {Button} from '@mui/material'
import {ReactNode, useCallback, useState} from 'react'
import {adminTickDebugSwitch_IO} from '../../../domain/admin/adminActionsIO.possibilities.api'


export const DebugDBModeBackendSwitch = (): ReactNode => {
  const [debugModeCurrentState, setDebugModeCurrentState] = useState<string>('')


  const backendDebugCallback = useCallback(
    () => {
      void adminTickDebugSwitch_IO(
        {debug_db: true},
        async (res) => {
          if (res.event === 'DEBUG_DB_MODE_ENABLED') {
            setDebugModeCurrentState('enabled')
          }

          if (res.event === 'DEBUG_DB_MODE_DISABLED') {
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
