import {turnOffAppBusyLoader, turnOnAppBusyLoader} from '../../application/app-loaders/appLoaders.possibilities.api'
import {
  deleteFromClientStorage,
  setToClientStorage
} from '../../application/client-device-storage/clientStorage.possibilities.api'
import {__debuggerGate} from '../../application/error-debugger/debugger.utils.api'
import {reportIssue} from '../../application/error-debugger/errorHandler.possibilities.api'
import {HTTPAdapterError, HTTPAdapterSuccess} from '../../application/http-layer/axios-adapter/axios.types'
import {CallHTTPEndpointConfig} from '../../application/http-layer/http.operations.api'
import {
  HTTPError,
  HTTPErrorCallback,
  HTTPSuccess,
  HTTPSuccessCallback
} from '../../READONLY-shared-kernel/application/http/http.types'
import {CUSTOM_HEADERS, HTTPStatus} from '../../READONLY-shared-kernel/domain/http/http.config'
import {ROUTING_POLICY} from '../../READONLY-shared-kernel/policies/routing.policy'
import {CLEAR_THIS_HEADER_COMMAND_VALUE} from "../../READONLY-shared-kernel/application/http/http.config";
import {pushEventToBus} from "../../application/event-bus/eventBus.possibilities.api";
import {SnackbarWrapper} from "../../application/app-snackbar/appSnackbar.types";


type OnEveryCallHeadersInterceptor = {
  headers: Record<keyof typeof CUSTOM_HEADERS, string> | any | undefined
}
const onEveryCallHeadersSideEffectInterceptor = async ({headers}: OnEveryCallHeadersInterceptor) => {
  if (!headers) {
    return void undefined
  }

  // Main authorization
  //
  const authorizationValue = headers[CUSTOM_HEADERS['authorization']]
  if (authorizationValue) {
    setToClientStorage({
      key: CUSTOM_HEADERS['authorization'],
      value: authorizationValue
    })
  }
  if (authorizationValue === CLEAR_THIS_HEADER_COMMAND_VALUE) {
    deleteFromClientStorage({
      key: CUSTOM_HEADERS['authorization']
    })
  }

  // Become user authorization
  //
  const switchUserValue = headers[CUSTOM_HEADERS['becomeUser']]
  if (switchUserValue) {
    setToClientStorage({
      key: CUSTOM_HEADERS['becomeUser'],
      value: switchUserValue,
      sessionOnly: true
    })
  }
  if (switchUserValue === CLEAR_THIS_HEADER_COMMAND_VALUE) {
    deleteFromClientStorage({key: CUSTOM_HEADERS['becomeUser']})
  }
}


type SuccessInterceptor<ResPayload> = {
  response: HTTPAdapterSuccess<HTTPSuccess<ResPayload>>,
  config: CallHTTPEndpointConfig,
  passCallback: HTTPSuccessCallback<ResPayload>
}
const onSuccessMainInterceptor = async <ResPayload>(props: SuccessInterceptor<ResPayload>) => {
  const {
    response,
    passCallback
  } = props
  const event = response.data.event

  if (ROUTING_POLICY.utils.IS_EXISTS_REDIRECTION_FOR_PASSED_EVENT(event)) {
    __debuggerGate(() => console.log(`[redirectionsDependingOnEventLogsStream fire] onSuccessMainInterceptor, event exists: ${event}`))
  }

  turnOnAppBusyLoader()
  await passCallback(response.data)
  turnOffAppBusyLoader()

  // Handle success event by event bus.
  //
  await pushEventToBus({
    event,
    payload: {snackbarColor: 'success' as SnackbarWrapper['color']}
  })
}


type ErrorInterceptor<ErrorPayload> = {
  error: HTTPAdapterError<HTTPError<ErrorPayload>>,
  config: CallHTTPEndpointConfig,
  passCallback: HTTPErrorCallback<ErrorPayload>
}
const onCatchMainInterceptor = async <ErrorPayload>(props: ErrorInterceptor<ErrorPayload>) => {
  const {
    passCallback,
    error,
    config
  } = props

  const event = error.response?.data?.event ?? 'INTERNET_CONNECTION_PROBLEM'
  const errorStatusCode = error.response?.status as HTTPStatus | 0 ?? 0
  const errorPayload = error.response?.data

  turnOnAppBusyLoader()
  await passCallback({
    event,
    data: errorPayload?.data
  })
  turnOffAppBusyLoader()

  // Handle error event by event bus.
  //
  const getSnackbarColor = (): SnackbarWrapper['color'] => {
    const firstCharOfStatusCodeString = String(errorStatusCode ?? '')[0]
    if (firstCharOfStatusCodeString === '4') {
      return 'warning'
    }
    if (firstCharOfStatusCodeString === '5') {
      return 'error'
    }
    return 'info'
  }

  await pushEventToBus({
    event,
    payload: {snackbarColor: getSnackbarColor()}
  })


  // Handle other errors omitting unauthorized.
  //
  if (errorStatusCode !== 401) {
    reportIssue(
      `HTTP ERROR ${errorStatusCode} ${config.mode} ${config.url}`,
      {
        payload: config.payload,
        error
      })
  }

  return Promise.resolve()
}


export const interceptors = {
  'success': onSuccessMainInterceptor,
  'error': onCatchMainInterceptor,
  'headers': onEveryCallHeadersSideEffectInterceptor
} as const
