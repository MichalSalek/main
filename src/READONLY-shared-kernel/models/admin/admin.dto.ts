import {IOClientFunctionReqResErr} from '../../application/http/http.client.types'
import {DetailedErrorPayload} from '../../application/http/http.types'
import {Admin, User} from '../db_models'
import {CurrentUser} from '../user/user.types'


export type ADMIN_DTO_API_V1 = {

  SWITCH_BACKEND_DEBUG_MODE: {
    REQUEST: {
      debug_db: boolean
    } | undefined
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<ADMIN_DTO_API_V1['SWITCH_BACKEND_DEBUG_MODE']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ADMIN_DTO_API_V1['SWITCH_BACKEND_DEBUG_MODE']['REQUEST'], ADMIN_DTO_API_V1['SWITCH_BACKEND_DEBUG_MODE']['RESPONSE'], ADMIN_DTO_API_V1['SWITCH_BACKEND_DEBUG_MODE']['RESPONSE_ERROR']>
  },

  BECOME_USER: {
    REQUEST: Pick<User, 'user_id'>
    RESPONSE: CurrentUser
    RESPONSE_ERROR: undefined
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ADMIN_DTO_API_V1['BECOME_USER']['REQUEST'], ADMIN_DTO_API_V1['BECOME_USER']['RESPONSE'], ADMIN_DTO_API_V1['BECOME_USER']['RESPONSE_ERROR']>
  },

  SWITCH_BACK_BECOME_USER: {
    REQUEST: undefined
    RESPONSE: CurrentUser
    RESPONSE_ERROR: DetailedErrorPayload<ADMIN_DTO_API_V1['SWITCH_BACK_BECOME_USER']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ADMIN_DTO_API_V1['SWITCH_BACK_BECOME_USER']['REQUEST'], ADMIN_DTO_API_V1['SWITCH_BACK_BECOME_USER']['RESPONSE'], ADMIN_DTO_API_V1['SWITCH_BACK_BECOME_USER']['RESPONSE_ERROR']>
  },

  DISABLE_ANY: {
    REQUEST: Pick<User, 'user_id'>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<ADMIN_DTO_API_V1['DISABLE_ANY']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ADMIN_DTO_API_V1['DISABLE_ANY']['REQUEST'], ADMIN_DTO_API_V1['DISABLE_ANY']['RESPONSE'], ADMIN_DTO_API_V1['DISABLE_ANY']['RESPONSE_ERROR']>
  },

  ENABLE_ANY: {
    REQUEST: Pick<User, 'user_id'>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<ADMIN_DTO_API_V1['ENABLE_ANY']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ADMIN_DTO_API_V1['ENABLE_ANY']['REQUEST'], ADMIN_DTO_API_V1['ENABLE_ANY']['RESPONSE'], ADMIN_DTO_API_V1['ENABLE_ANY']['RESPONSE_ERROR']>
  },

  DELETE_ANY: {
    REQUEST: Pick<User, 'user_id'>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<ADMIN_DTO_API_V1['DELETE_ANY']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ADMIN_DTO_API_V1['DELETE_ANY']['REQUEST'], ADMIN_DTO_API_V1['DELETE_ANY']['RESPONSE'], ADMIN_DTO_API_V1['DELETE_ANY']['RESPONSE_ERROR']>
  },

  GET_NOTES: {
    REQUEST: {
      id?: Admin['id'] | undefined
    }
    RESPONSE: Pick<Admin, 'notes'> & {
      versions: (Pick<Admin, 'created_at'> & Pick<Admin, 'id'> & {
        length: string
      })[]
    }
    RESPONSE_ERROR: DetailedErrorPayload<ADMIN_DTO_API_V1['GET_NOTES']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ADMIN_DTO_API_V1['GET_NOTES']['REQUEST'], ADMIN_DTO_API_V1['GET_NOTES']['RESPONSE'], ADMIN_DTO_API_V1['GET_NOTES']['RESPONSE_ERROR']>
  },

  SAVE_NOTE: {
    REQUEST: Pick<Admin, 'notes'>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<ADMIN_DTO_API_V1['SAVE_NOTE']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ADMIN_DTO_API_V1['SAVE_NOTE']['REQUEST'], ADMIN_DTO_API_V1['SAVE_NOTE']['RESPONSE'], ADMIN_DTO_API_V1['SAVE_NOTE']['RESPONSE_ERROR']>
  },

  SET_MAIN_NOTE: {
    REQUEST: Pick<Admin, 'id'>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<ADMIN_DTO_API_V1['SET_MAIN_NOTE']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ADMIN_DTO_API_V1['SET_MAIN_NOTE']['REQUEST'], ADMIN_DTO_API_V1['SET_MAIN_NOTE']['RESPONSE'], ADMIN_DTO_API_V1['SET_MAIN_NOTE']['RESPONSE_ERROR']>
  },

  MASTER_ADMIN_INIT: {
    REQUEST: undefined
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<ADMIN_DTO_API_V1['MASTER_ADMIN_INIT']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ADMIN_DTO_API_V1['MASTER_ADMIN_INIT']['REQUEST'], ADMIN_DTO_API_V1['MASTER_ADMIN_INIT']['RESPONSE'], ADMIN_DTO_API_V1['MASTER_ADMIN_INIT']['RESPONSE_ERROR']>
  },


}
