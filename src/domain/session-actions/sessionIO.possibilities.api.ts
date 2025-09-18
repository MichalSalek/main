import {callHTTPEndpoint} from '../../application/http-layer/http.operations.api'
import {reduxStore} from '../../application/store/store'
import {ENDPOINTS} from '../../READONLY-shared-kernel/domain/http/http.endpoints'
import {SESSION_DTO_API_V1} from '../../READONLY-shared-kernel/models/session/session.dto'
import {STORE_SET_user_sessionInCurrentUser} from '../user/user.slice'


export const getAllSessions_IO: SESSION_DTO_API_V1['GET_ALL']['IO_CLIENT_FUNCTION'] = async (
  _,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<SESSION_DTO_API_V1['GET_ALL']['RESPONSE'], SESSION_DTO_API_V1['GET_ALL']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.SESSION_GET_ALL,
      mode: 'get'
    },
    successCallback: async (response) => {
      await successCallback(response)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


export const deleteSessionExactly_IO: SESSION_DTO_API_V1['DELETE_EXACTLY']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<SESSION_DTO_API_V1['DELETE_EXACTLY']['RESPONSE'], SESSION_DTO_API_V1['DELETE_EXACTLY']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.SESSION_DELETE_EXACTLY,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      await successCallback(response)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


export const deleteSessionAll_IO: SESSION_DTO_API_V1['DELETE_ALL']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {

  await callHTTPEndpoint<SESSION_DTO_API_V1['DELETE_ALL']['RESPONSE'], SESSION_DTO_API_V1['DELETE_ALL']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.SESSION_DELETE_ALL,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      await successCallback(response)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


export const refreshSession_IO: SESSION_DTO_API_V1['REFRESH']['IO_CLIENT_FUNCTION'] = async (
  _,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<SESSION_DTO_API_V1['REFRESH']['RESPONSE'], SESSION_DTO_API_V1['REFRESH']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.SESSION_REFRESH,
      mode: 'get'
    },
    successCallback: async (response) => {
      await successCallback(response)
      reduxStore.dispatch(STORE_SET_user_sessionInCurrentUser(response.data))
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}

