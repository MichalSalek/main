import {callHTTPEndpoint} from '../../application/http-layer/http.operations.api'
import {ENDPOINTS} from '../../READONLY-shared-kernel/domain/http/http.endpoints'
import {USER_DTO_API_V1} from '../../READONLY-shared-kernel/models/user/user.dto'
import {redirectToByEvent} from '../redirections-and-routing/redirections.operations.api'
import {setCurrentUser} from './user.possibilities.api'


export const checkIfNotEmailExists_IO: USER_DTO_API_V1['CHECK_EMAIL']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<USER_DTO_API_V1['CHECK_EMAIL']['RESPONSE'], USER_DTO_API_V1['CHECK_EMAIL']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.CHECK_EMAIL,
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


export const registerUser_IO: USER_DTO_API_V1['REGISTER']['IO_CLIENT_FUNCTION'] = async (req, successCallback, errorCallback) => {
  await callHTTPEndpoint<USER_DTO_API_V1['REGISTER']['RESPONSE'], USER_DTO_API_V1['REGISTER']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.USER_REGISTER,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      setCurrentUser(response.data)
      await successCallback(response)

    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


export const loginUser_IO: USER_DTO_API_V1['LOGIN']['IO_CLIENT_FUNCTION'] = async (req, successCallback, errorCallback) => {
  await callHTTPEndpoint<USER_DTO_API_V1['LOGIN']['RESPONSE'], USER_DTO_API_V1['LOGIN']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.USER_LOGIN,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      await successCallback(response)
      setCurrentUser(response.data)
      await redirectToByEvent(response.event)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


export const logoutUser_IO: USER_DTO_API_V1['LOGOUT']['IO_CLIENT_FUNCTION'] = async (_, successCallback, errorCallback) => {
  await callHTTPEndpoint<USER_DTO_API_V1['LOGOUT']['RESPONSE'], USER_DTO_API_V1['LOGOUT']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.USER_LOGOUT,
      mode: 'post'
    },
    successCallback: async (response) => {
      await successCallback(response)
      await redirectToByEvent(response.event)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


export const deleteUserSelf_IO: USER_DTO_API_V1['DELETE_SELF']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<USER_DTO_API_V1['DELETE_SELF']['RESPONSE'], USER_DTO_API_V1['DELETE_SELF']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.USER_DELETE_SELF,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      await successCallback(response)
      await redirectToByEvent(response.event)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


export const deleteUserExactly_IO: USER_DTO_API_V1['DELETE_EXACTLY']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<USER_DTO_API_V1['DELETE_EXACTLY']['RESPONSE'], USER_DTO_API_V1['DELETE_EXACTLY']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.USER_DELETE_EXACTLY,
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


export const disableUserSelf_IO: USER_DTO_API_V1['DISABLE_SELF']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<USER_DTO_API_V1['DISABLE_SELF']['RESPONSE'], USER_DTO_API_V1['DISABLE_SELF']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.USER_DISABLE_SELF,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      await successCallback(response)
      await redirectToByEvent(response.event)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}

