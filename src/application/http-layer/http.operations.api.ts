import {interceptors} from '../../domain/http-layer/http.interceptor'
import {requestHeadersSetter} from '../../domain/http-layer/http.utils'
import {
  HTTPError,
  HTTPErrorCallback,
  HTTPSuccess,
  HTTPSuccessCallback
} from '../../READONLY-shared-kernel/application/http/http.types'
import {HTTPMethod} from '../../READONLY-shared-kernel/domain/http/http.config'
import {EndpointURLFunction} from '../../READONLY-shared-kernel/domain/http/http.endpoints'
import {__debuggerGate} from '../error-debugger/debugger.utils.api'
import {httpHandlerAction} from './axios-adapter/axios.adapter'
import {turnOffAppBusyLoader, turnOnAppBusyLoader} from '../app-loaders/appLoaders.possibilities.api';
import {ENV_VARS} from '../environment/environment.config';


export type CallHTTPEndpointConfig = {
  url: EndpointURLFunction,
  mode: HTTPMethod
  payload?: unknown
  disableLoaderForThisCall?: boolean
}

type CallHTTPEndpoint<ResPayload, ErrorPayload> = {
  config: CallHTTPEndpointConfig
  successCallback: HTTPSuccessCallback<ResPayload>
  errorCallback: HTTPErrorCallback<ErrorPayload>
}

// @ResPayload <Success response,
// @ErrorPayload Error response>
export const callHTTPEndpoint = async <ResPayload = unknown, ErrorPayload = unknown>(
  {
    config,
    successCallback,
    errorCallback
  }: CallHTTPEndpoint<ResPayload, ErrorPayload>): Promise<void> => {
  const {
    url,
    mode,
    payload = undefined,
    disableLoaderForThisCall
  } = config
  try {

    const headers = await requestHeadersSetter()

    await httpHandlerAction<HTTPSuccess<ResPayload>, HTTPError<ErrorPayload>>({
      url: url({ENV_VARS}),
      mode,
      headers,
      payload,

      fireOnFetchInit: async () => {
        !disableLoaderForThisCall && turnOnAppBusyLoader()
      },

      fireOnFetchEnd: async () => {
        !disableLoaderForThisCall && turnOffAppBusyLoader()
      },

      fireOnSuccess: async (response_from_adapter) => {
        await interceptors.headers({
          headers: response_from_adapter.headers
        })
        await interceptors.success<ResPayload>({
          response: response_from_adapter,
          config,
          passCallback: async (response) => {
            await successCallback(response)
          }
        })
      },

      fireOnCatch: async (error_from_adapter) => {
        await interceptors.headers({
          headers: error_from_adapter.response?.headers
        })
        await interceptors.error<ErrorPayload>({
          error: error_from_adapter,
          config,
          passCallback: async (error) => {
            await errorCallback(error)
          }
        })
      }
    })

  } catch (e) {
    __debuggerGate(() => console.error(e))
  }
}
