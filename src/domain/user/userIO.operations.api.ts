import {callHTTPEndpoint} from '../../application/http-layer/http.operations.api'
import {ENDPOINTS} from '../../READONLY-shared-kernel/domain/http/http.endpoints'
import {USER_DTO_API_V1} from '../../READONLY-shared-kernel/models/user/user.dto'


export const getAndUpdateAppUsersList_IO: USER_DTO_API_V1['GET_ALL']['IO_CLIENT_FUNCTION'] = async (
  _,
  successCallback,
  errorCallback) => {

  await callHTTPEndpoint<USER_DTO_API_V1['GET_ALL']['RESPONSE'], USER_DTO_API_V1['GET_ALL']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.USER_GET_ALL,
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


