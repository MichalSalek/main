import {callHTTPEndpoint} from '../../application/http-layer/http.operations.api'
import {ENDPOINTS} from '../../READONLY-shared-kernel/domain/http/http.endpoints'
import {SESSION_DTO_API_V1} from '../../READONLY-shared-kernel/models/session/session.dto'
import {setCurrentUser} from "../user/user.possibilities.api";


export const sessionGetCurrent_IO: SESSION_DTO_API_V1['GET_CURRENT']['IO_CLIENT_FUNCTION'] = async (
  _,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<SESSION_DTO_API_V1['GET_CURRENT']['RESPONSE'], SESSION_DTO_API_V1['GET_CURRENT']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.SESSION_GET_CURRENT,
      mode: 'get'
    },
    successCallback: async (response) => {
      void setCurrentUser(response.data)
      await successCallback(response)
    },
    errorCallback: async (error) => {
      void setCurrentUser(error.data)
      await errorCallback(error)
    }
  })
}
