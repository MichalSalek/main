import {IDType} from '../../application/application.types'
import {IOClientFunctionReqResErr} from '../../application/http/http.client.types'
import {DetailedErrorPayload} from '../../application/http/http.types'
import {Account, PaymentStatus} from '../db_models'
import {CurrentUser} from '../user/user.types'


export type ACCOUNT_DTO_API_V1 = {

  DISPLAY_NAME_CHANGE: {
    REQUEST: Pick<Account, 'display_name'>
    RESPONSE: Account
    RESPONSE_ERROR: DetailedErrorPayload<ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['REQUEST'], ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['RESPONSE'], ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['RESPONSE_ERROR']>
  },

  MAKE_PAYMENT: {
    REQUEST: Record<'payment_id', IDType> & Pick<Account, 'pricing_plan'>
    RESPONSE: CurrentUser
    RESPONSE_ERROR: DetailedErrorPayload<ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['REQUEST'], ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['RESPONSE'], ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['RESPONSE_ERROR']>
  },

  GET_STATUS: {
    REQUEST: undefined
    RESPONSE: PaymentStatus
    RESPONSE_ERROR: unknown
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ACCOUNT_DTO_API_V1['GET_STATUS']['REQUEST'], ACCOUNT_DTO_API_V1['GET_STATUS']['RESPONSE'], ACCOUNT_DTO_API_V1['GET_STATUS']['RESPONSE_ERROR']>
  }
}
