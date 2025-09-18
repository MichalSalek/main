import axios, {Axios, RawAxiosRequestHeaders} from 'axios'
import {HTTPMethod} from '../../../READONLY-shared-kernel/domain/http/http.config'
import {reportIssue} from '../../error-debugger/errorHandler.possibilities.api'
import {axiosDefaultConfiguration} from './axios.config'
import {HTTPAdapterError, HTTPAdapterSuccess} from './axios.types'
import http from 'http'
import https from 'https'

const axiosInstance = axios.create({
  //60 sec timeout
  timeout: 60000,

  //keepAlive pools and reuses TCP connections, so it's faster
  httpAgent: new http.Agent({keepAlive: true}),
  httpsAgent: new https.Agent({keepAlive: true}),

  //follow up to 10 HTTP 3xx redirects
  maxRedirects: 10,

  //cap the maximum content length we'll accept to 50MBs, just in case
  maxContentLength: 50 * 1000 * 1000
});


type HTTPHandlerActionConfig<Res, Err> = {
  url: string,
  mode: HTTPMethod
  headers?: RawAxiosRequestHeaders
  payload?: unknown | undefined
  fireOnFetchInit?: () => void
  fireOnFetchEnd?: () => void
  fireOnSuccess: (response: HTTPAdapterSuccess<Res>) => void
  fireOnCatch: (error: HTTPAdapterError<Err>) => void
}

// Generic types:
// @T Successful response data
// @Err Error response data
export const httpHandlerAction = async <Res, Err>(
  {
    url,
    mode,
    headers,
    payload = undefined,
    fireOnFetchInit,
    fireOnFetchEnd,
    fireOnSuccess,
    fireOnCatch
  }: HTTPHandlerActionConfig<Res, Err>) => {
  if (!url) {
    reportIssue(
      'NO URL HTTP ERROR',
      {
        payload,
        url,
        mode
      })
  }

  fireOnFetchInit && fireOnFetchInit()

  const config = {
    ...axiosDefaultConfiguration,
    headers,
    url
  }

  try {
    const axiosPromise = new Promise<HTTPAdapterSuccess<Res>>((resolve, reject) => {
      if (mode === 'get') {
        (axios[mode] as Axios['get'] | Axios['delete'])<Res>(url, config)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      } else {
        (axios[mode] as Axios['post'] | Axios['patch'])<Res>(url, payload, config)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      }
    })
    const response = await axiosPromise
    fireOnSuccess(response)
    fireOnFetchEnd && fireOnFetchEnd()
  } catch (err) {
    fireOnFetchEnd && fireOnFetchEnd()
    const error = err as HTTPAdapterError<Err>
    fireOnCatch(error)
    return Promise.reject(error)
  }
  return Promise.resolve()
}
