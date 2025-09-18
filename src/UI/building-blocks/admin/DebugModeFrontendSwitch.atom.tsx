import {Button, Typography} from '@mui/material'
import {ReactNode} from 'react'
import {STORE_SEL_devMode_debugOn} from '../../../application/dev-mode/dev-mode.read'
import {STORE_SET_devMode_debugOnSwitch} from '../../../application/dev-mode/dev-mode.slice'
import {useAppDispatch, useAppSelector} from '../../../application/store/store'


export const DebugModeFrontendSwitch = (): ReactNode => {
  const dispatch = useAppDispatch()
  const debugModeSwitch = useAppSelector(STORE_SEL_devMode_debugOn)

  return <><Button

    onClick={() => {
      dispatch(STORE_SET_devMode_debugOnSwitch(!debugModeSwitch))
    }}>[on/off] {String(debugModeSwitch)}</Button>

    <Typography variant={'body1'} component={'span'}>
      wpisz byle gdzie <pre style={{display: 'inline'}}>debug<strong>on</strong></pre> lub <pre
      style={{display: 'inline'}}>debug<strong>off</strong></pre>
    </Typography>

  </>
}
