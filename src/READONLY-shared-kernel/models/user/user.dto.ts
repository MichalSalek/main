import {IOClientFunctionReqResErr} from '../../application/http/http.client.types'
import {DetailedErrorPayload} from '../../application/http/http.types'
import {User, UserNoSensitive} from '../db_models'
import {CurrentUser, UserNoSensitiveWithRelationsExtended} from './user.types'


export type USER_DTO_API_V1 = {

  LOGIN: {
    REQUEST: Pick<User, 'password' | 'email'>
    RESPONSE: CurrentUser
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['LOGIN']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['LOGIN']['REQUEST'], USER_DTO_API_V1['LOGIN']['RESPONSE'], USER_DTO_API_V1['LOGIN']['RESPONSE_ERROR']>
  },

  CHECK_EMAIL: {
    REQUEST: Pick<User, 'email'>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['CHECK_EMAIL']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['CHECK_EMAIL']['REQUEST'], USER_DTO_API_V1['CHECK_EMAIL']['RESPONSE'], USER_DTO_API_V1['CHECK_EMAIL']['RESPONSE_ERROR']>
  },

  REGISTER: {
    REQUEST: Pick<User, 'password' | 'email'>
    RESPONSE: CurrentUser
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['REGISTER']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['REGISTER']['REQUEST'], USER_DTO_API_V1['REGISTER']['RESPONSE'], USER_DTO_API_V1['REGISTER']['RESPONSE_ERROR']>
  },

  CREATE: {
    REQUEST: Pick<User, 'email'>
    RESPONSE: UserNoSensitive
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['CREATE']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['CREATE']['REQUEST'], USER_DTO_API_V1['CREATE']['RESPONSE'], USER_DTO_API_V1['CREATE']['RESPONSE_ERROR']>
  },

  LOGOUT: {
    REQUEST: undefined
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['LOGOUT']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['LOGOUT']['REQUEST'], USER_DTO_API_V1['LOGOUT']['RESPONSE'], USER_DTO_API_V1['LOGOUT']['RESPONSE_ERROR']>
  },

  DISABLE_SELF: {
    REQUEST: Pick<User, 'password'>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['DISABLE_SELF']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['DISABLE_SELF']['REQUEST'], USER_DTO_API_V1['DISABLE_SELF']['RESPONSE'], USER_DTO_API_V1['DISABLE_SELF']['RESPONSE_ERROR']>
  },

  DELETE_SELF: {
    REQUEST: Pick<User, 'password'>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['DELETE_SELF']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['DELETE_SELF']['REQUEST'], USER_DTO_API_V1['DELETE_SELF']['RESPONSE'], USER_DTO_API_V1['DELETE_SELF']['RESPONSE_ERROR']>
  },

  DELETE_EXACTLY: {
    REQUEST: (Pick<User, 'user_id'>)
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['DELETE_EXACTLY']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['DELETE_EXACTLY']['REQUEST'], USER_DTO_API_V1['DELETE_EXACTLY']['RESPONSE'], USER_DTO_API_V1['DELETE_EXACTLY']['RESPONSE_ERROR']>
  },

  GET_ALL: {
    REQUEST: undefined
    RESPONSE: UserNoSensitiveWithRelationsExtended[]
    RESPONSE_ERROR: unknown
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['GET_ALL']['REQUEST'], USER_DTO_API_V1['GET_ALL']['RESPONSE'], USER_DTO_API_V1['GET_ALL']['RESPONSE_ERROR']>
  },


}

