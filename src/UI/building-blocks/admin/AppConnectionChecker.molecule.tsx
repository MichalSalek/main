import {Button} from '@mui/material'
import {ReactElement, useCallback} from 'react'
import {pushNewSnackbar} from '../../../application/app-snackbar/appSnackbar.possibilities.api'
import {callHTTPEndpoint} from '../../../application/http-layer/http.operations.api'
import {ENDPOINT_CHECK_WEBAPP_SIMPLE, EndpointProps} from '../../../READONLY-shared-kernel/domain/http/http.endpoints'
import {ENV_VARS} from '../../../application/environment/environment.config';


export const AppConnectionChecker = (): ReactElement | undefined => {


  const checkSimplyCallback = useCallback(
    () => {
      [`${ENV_VARS.NEXT_PUBLIC_BACKEND_PUBLIC_DOMAIN}:${ENV_VARS.NEXT_PUBLIC_BACKEND_PUBLIC_PORT}`].forEach((appName) => {
        void callHTTPEndpoint({
          config: {
            url: (props: EndpointProps) => ENDPOINT_CHECK_WEBAPP_SIMPLE({payload: appName, ...props}),
            mode: 'get'
          },
          successCallback: async (response) => {
            console.log(response)
            alert(`Simple. App name: ${appName}, response: ${JSON.stringify(response)}`)
          },
          errorCallback: async (error) => {
            error && pushNewSnackbar(
              JSON.stringify(error),
              'warning')
          }
        })
      })
    },
    [])


  return (
    <>
      <Button onClick={checkSimplyCallback}>Check simply</Button>
    </>)
}
