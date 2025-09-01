import {callHTTPEndpoint} from '../../application/http-layer/http.operations.api'
import {ENDPOINTS} from '../../READONLY-shared-kernel/domain/http/http.endpoints'
import {ADMIN_DTO_API_V1} from '../../READONLY-shared-kernel/models/admin/admin.dto'
import {redirectToByEvent} from '../redirections-and-routing/redirections.operations.api'
import {setCurrentUser} from '../user/user.possibilities.api'


export const adminTickDebugSwitch_IO: ADMIN_DTO_API_V1['SWITCH_BACKEND_DEBUG_MODE']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {

  await callHTTPEndpoint<ADMIN_DTO_API_V1['SWITCH_BACKEND_DEBUG_MODE']['RESPONSE'], ADMIN_DTO_API_V1['SWITCH_BACKEND_DEBUG_MODE']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.SWITCH_BACKEND_DEBUG_MODE,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      await successCallback(response)
      alert(response.event)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


export const deleteUserAny_IO: ADMIN_DTO_API_V1['DELETE_ANY']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<ADMIN_DTO_API_V1['DELETE_ANY']['RESPONSE'], ADMIN_DTO_API_V1['DELETE_ANY']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.USER_DELETE_ANY,
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

export const disableUserAny_IO: ADMIN_DTO_API_V1['DISABLE_ANY']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<ADMIN_DTO_API_V1['DISABLE_ANY']['RESPONSE'], ADMIN_DTO_API_V1['DISABLE_ANY']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.USER_DISABLE_ANY,
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


export const enableUserAny_IO: ADMIN_DTO_API_V1['ENABLE_ANY']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<ADMIN_DTO_API_V1['ENABLE_ANY']['RESPONSE'], ADMIN_DTO_API_V1['ENABLE_ANY']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.USER_ENABLE_ANY,
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

export const becomeUser_IO: ADMIN_DTO_API_V1['BECOME_USER']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<ADMIN_DTO_API_V1['BECOME_USER']['RESPONSE'], ADMIN_DTO_API_V1['BECOME_USER']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.BECOME_USER,
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

export const switchBackUser_IO: ADMIN_DTO_API_V1['SWITCH_BACK_BECOME_USER']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<ADMIN_DTO_API_V1['SWITCH_BACK_BECOME_USER']['RESPONSE'], ADMIN_DTO_API_V1['SWITCH_BACK_BECOME_USER']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.SWITCH_BACK_BECOME_USER,
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


export const getNotes_IO: ADMIN_DTO_API_V1['GET_NOTES']['IO_CLIENT_FUNCTION'] = async (req, successCallback, errorCallback) => {
  await callHTTPEndpoint<ADMIN_DTO_API_V1['GET_NOTES']['RESPONSE'], ADMIN_DTO_API_V1['GET_NOTES']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.GET_NOTES,
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


export const saveNote_IO: ADMIN_DTO_API_V1['SAVE_NOTE']['IO_CLIENT_FUNCTION'] = async (req, successCallback, errorCallback) => {
  await callHTTPEndpoint<ADMIN_DTO_API_V1['SAVE_NOTE']['RESPONSE'], ADMIN_DTO_API_V1['SAVE_NOTE']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.SAVE_NOTE,
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


export const setMainNote_IO: ADMIN_DTO_API_V1['SET_MAIN_NOTE']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<ADMIN_DTO_API_V1['SET_MAIN_NOTE']['RESPONSE'], ADMIN_DTO_API_V1['SET_MAIN_NOTE']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.SET_MAIN_NOTE,
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


export const masterAdminInit_IO: ADMIN_DTO_API_V1['MASTER_ADMIN_INIT']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<ADMIN_DTO_API_V1['MASTER_ADMIN_INIT']['RESPONSE'], ADMIN_DTO_API_V1['MASTER_ADMIN_INIT']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.MASTER_ADMIN_INIT,
      mode: 'get',
      payload: undefined
    },
    successCallback: async (response) => {
      await successCallback(response)
      alert('Master admin created - you can log-in.')
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}

