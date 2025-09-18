import {EVENT_COMMANDS_AND_QUERIES_TYPE} from '../commands-and-queries/cqrs.types'
import {ROUTES_API} from '../routing/routing.config'


export type EndpointProps = {
  ENV_VARS: {
    readonly NEXT_PUBLIC_HTTP_PROTOCOL: string;
    readonly NEXT_PUBLIC_BACKEND_PUBLIC_PORT: string;
    readonly NEXT_PUBLIC_BACKEND_PUBLIC_DOMAIN: string;
  },
  payload?: string
}

export type EndpointURLFunction = (props: EndpointProps) => string

const URL: EndpointURLFunction = (props) => `${props.ENV_VARS.NEXT_PUBLIC_HTTP_PROTOCOL}${props.ENV_VARS.NEXT_PUBLIC_BACKEND_PUBLIC_DOMAIN}:${props.ENV_VARS.NEXT_PUBLIC_BACKEND_PUBLIC_PORT}`


//
// DEBUG
export const ENDPOINT_CHECK_WEBAPP_SIMPLE = (props: EndpointProps) => `${props.ENV_VARS.NEXT_PUBLIC_HTTP_PROTOCOL}${props.payload}${ROUTES_API.CHECK_WEBAPP_SIMPLE}`


export const ENDPOINTS: Record<EVENT_COMMANDS_AND_QUERIES_TYPE, EndpointURLFunction> = {
  //
  // ADMIN
  SWITCH_BACKEND_DEBUG_MODE: (props) => `${URL(props)}${ROUTES_API.SWITCH_BACKEND_DEBUG_MODE}`,
  GET_NOTES: (props) => `${URL(props)}${ROUTES_API.GET_NOTES}`,
  SAVE_NOTE: (props) => `${URL(props)}${ROUTES_API.SAVE_NOTE}`,
  SET_MAIN_NOTE: (props) => `${URL(props)}${ROUTES_API.SET_MAIN_NOTE}`,
  USER_DELETE_ANY: (props) => `${URL(props)}${ROUTES_API.USER_DELETE_ANY}`,
  USER_DISABLE_ANY: (props) => `${URL(props)}${ROUTES_API.USER_DISABLE_ANY}`,
  USER_ENABLE_ANY: (props) => `${URL(props)}${ROUTES_API.USER_ENABLE_ANY}`,
  BECOME_USER: (props) => `${URL(props)}${ROUTES_API.BECOME_USER}`,
  SWITCH_BACK_BECOME_USER: (props) => `${URL(props)}${ROUTES_API.SWITCH_BACK_BECOME_USER}`,
  MASTER_ADMIN_INIT: (props) => `${URL(props)}${ROUTES_API.MASTER_ADMIN_INIT}`, //
  // ACCOUNT
  ACCOUNT_DISPLAY_NAME_CHANGE: (props) => `${URL(props)}${ROUTES_API.ACCOUNT_DISPLAY_NAME_CHANGE}`,
  ACCOUNT_PAYMENT_GET_STATUS: (props) => `${URL(props)}${ROUTES_API.ACCOUNT_PAYMENT_GET_STATUS}`,
  ACCOUNT_PAYMENT_MAKE: (props) => `${URL(props)}${ROUTES_API.ACCOUNT_PAYMENT_MAKE}`, //
  // EVENT LOG
  EVENT_LOG_GET_ALL: (props) => `${URL(props)}${ROUTES_API.EVENT_LOG_GET_ALL}`, //
  // SESSION
  SESSION_GET_CURRENT: (props) => `${URL(props)}${ROUTES_API.SESSION_GET_CURRENT}`,
  SESSION_DELETE_ALL: (props) => `${URL(props)}${ROUTES_API.SESSION_DELETE_ALL}`,
  SESSION_DELETE_EXACTLY: (props) => `${URL(props)}${ROUTES_API.SESSION_DELETE_EXACTLY}`,
  SESSION_GET_ALL: (props) => `${URL(props)}${ROUTES_API.SESSION_GET_ALL}`,
  SESSION_REFRESH: (props) => `${URL(props)}${ROUTES_API.SESSION_REFRESH}`, //
  // USER
  USER_CREATE: (props) => `${URL(props)}${ROUTES_API.USER_CREATE}`,
  CHECK_EMAIL: (props) => `${URL(props)}${ROUTES_API.CHECK_EMAIL}`,
  USER_REGISTER: (props) => `${URL(props)}${ROUTES_API.USER_REGISTER}`,
  USER_DELETE_EXACTLY: (props) => `${URL(props)}${ROUTES_API.USER_DELETE_EXACTLY}`,
  USER_DELETE_SELF: (props) => `${URL(props)}${ROUTES_API.USER_DELETE_SELF}`,
  USER_GET_ALL: (props) => `${URL(props)}${ROUTES_API.USER_GET_ALL}`,
  USER_LOGIN: (props) => `${URL(props)}${ROUTES_API.USER_LOGIN}`,
  USER_LOGOUT: (props) => `${URL(props)}${ROUTES_API.USER_LOGOUT}`,
  USER_DISABLE_SELF: (props) => `${URL(props)}${ROUTES_API.USER_DISABLE_SELF}`,
  USER_ENABLE_SELF: () => '',

  GET_GALLERY_RECORDS: (props) => `${URL(props)}${ROUTES_API.GET_GALLERY_RECORDS}`,
  CREATE_GALLERY_RECORD: (props) => `${URL(props)}${ROUTES_API.CREATE_GALLERY_RECORD}`,
  GET_GALLERY_CONFIG: (props) => `${URL(props)}${ROUTES_API.GET_GALLERY_CONFIG}`,
  GALLERY_CREATE_TRAIT: (props) => `${URL(props)}${ROUTES_API.GALLERY_CREATE_TRAIT}`,
  DELETE_ASSET_FROM_VENDOR: (props) => `${URL(props)}${ROUTES_API.DELETE_ASSET_FROM_VENDOR}`

} as const
