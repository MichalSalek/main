import {Button} from '@mui/material'
import {ReactElement, useCallback} from 'react'
import {pushNewSnackbar} from '../../../application/app-snackbar/appSnackbar.possibilities.api'
import {ENV_VARS} from '../../../application/environment/environment.utils.api'
import {callHTTPEndpoint} from '../../../application/http-layer/http.operations.api'
import {
  ENDPOINT_CHECK_WEBAPP_CROSS,
  ENDPOINT_CHECK_WEBAPP_SIMPLE,
  EndpointProps
} from '../../../READONLY-shared-kernel/domain/http/http.endpoints'


export const AppConnectionChecker = (): ReactElement | undefined => {


  const checkSimplyCallback = useCallback(
    () => {
      [`${ENV_VARS.HTTP_WEB1_APP_HOST}:${ENV_VARS.WEB_1_EXTERNAL_PORT}`,
        `${ENV_VARS.HTTP_WEB1_APP_HOST}:${ENV_VARS.WEB_2_EXTERNAL_PORT}`].forEach((appName) => {
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


  const checkCrossCallback = useCallback(
    () => {
      [`${ENV_VARS.HTTP_WEB1_APP_HOST}:${ENV_VARS.WEB_1_EXTERNAL_PORT}`,
        `${ENV_VARS.HTTP_WEB1_APP_HOST}:${ENV_VARS.WEB_2_EXTERNAL_PORT}`].forEach((appName) => {
        [ENV_VARS.WEB_1_INTERNAL_NAME,
          ENV_VARS.WEB_2_INTERNAL_NAME].forEach((appName2) => {
          if (!appName2) {
            return void undefined
          }
          void callHTTPEndpoint({
            config: {
              url: (props: EndpointProps) => ENDPOINT_CHECK_WEBAPP_CROSS({payload: appName, ...props}),
              mode: 'post',
              payload: {
                url: (props: EndpointProps) => ENDPOINT_CHECK_WEBAPP_SIMPLE({payload: appName2, ...props})
              }
            },
            successCallback: async (response) => {
              console.log(response)
              alert(`Complex. App name: ${appName}, payload app: ${appName2}, response: ${JSON.stringify(response)}`)
            },
            errorCallback: async (error) => {
              error && pushNewSnackbar(
                JSON.stringify(error),
                'info')
            }
          })

          return void undefined
        })

      })
    },
    [])


  return (
    <>
      <Button onClick={checkSimplyCallback}>Check simply</Button>
      <Button onClick={checkCrossCallback}>Check cross</Button>
    </>)
}
