import {IOClientFunctionReqResErr} from '../../application/http/http.client.types'
import {DetailedErrorPayload} from '../../application/http/http.types'
import {Session, User} from '../db_models'
import {CurrentUser} from '../user/user.types'


export type SESSION_DTO_API_V1 = {

  DELETE_EXACTLY: {
    REQUEST: Pick<Session, 'session_id'>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<SESSION_DTO_API_V1['DELETE_EXACTLY']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<SESSION_DTO_API_V1['DELETE_EXACTLY']['REQUEST'], SESSION_DTO_API_V1['DELETE_EXACTLY']['RESPONSE'], SESSION_DTO_API_V1['DELETE_EXACTLY']['RESPONSE_ERROR']>
  },

  DELETE_ALL: {
    REQUEST: Pick<User, 'user_id'> | undefined
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<SESSION_DTO_API_V1['DELETE_ALL']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<SESSION_DTO_API_V1['DELETE_ALL']['REQUEST'], SESSION_DTO_API_V1['DELETE_ALL']['RESPONSE'], SESSION_DTO_API_V1['DELETE_ALL']['RESPONSE_ERROR']>
  },

  GET_ALL: {
    REQUEST: undefined
    RESPONSE: Session[]
    RESPONSE_ERROR: unknown
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<SESSION_DTO_API_V1['GET_ALL']['REQUEST'], SESSION_DTO_API_V1['GET_ALL']['RESPONSE'], SESSION_DTO_API_V1['GET_ALL']['RESPONSE_ERROR']>
  },

  REFRESH: {
    REQUEST: undefined
    RESPONSE: Session
    RESPONSE_ERROR: unknown
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<SESSION_DTO_API_V1['REFRESH']['REQUEST'], SESSION_DTO_API_V1['REFRESH']['RESPONSE'], SESSION_DTO_API_V1['REFRESH']['RESPONSE_ERROR']>
  },

  GET_CURRENT: {
    REQUEST: undefined
    RESPONSE: CurrentUser | undefined
    RESPONSE_ERROR: CurrentUser | undefined
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<SESSION_DTO_API_V1['GET_CURRENT']['REQUEST'], SESSION_DTO_API_V1['GET_CURRENT']['RESPONSE'], SESSION_DTO_API_V1['GET_CURRENT']['RESPONSE_ERROR']>
  },

}
