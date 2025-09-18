import {callHTTPEndpoint} from '../../application/http-layer/http.operations.api'
import {ENDPOINTS} from '../../READONLY-shared-kernel/domain/http/http.endpoints'
import {ACCOUNT_DTO_API_V1} from '../../READONLY-shared-kernel/models/account/account.dto'
import {setCurrentUser} from '../user/user.possibilities.api'


export const accountDisplayChangeName_IO: ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['RESPONSE'], ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.ACCOUNT_DISPLAY_NAME_CHANGE,
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


export const makePayment_IO: ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['RESPONSE'], ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.ACCOUNT_PAYMENT_MAKE,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      await successCallback(response)
      setCurrentUser(response.data)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}
