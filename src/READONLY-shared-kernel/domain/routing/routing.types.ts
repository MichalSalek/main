import {UserNoSensitiveWithRelations} from '../../models/user/user.types'
import {EVENT_INFO_TYPE} from '../commands-and-queries/cqrs.types'
import {ROUTES_API, ROUTES_FRONT, ROUTES_FRONT_APP, ROUTES_FRONT_STATIC} from './routing.config'

export type ROUTES_FRONT_STATIC_NAME = keyof typeof ROUTES_FRONT_STATIC
export type ROUTES_FRONT_STATIC_PATH = typeof ROUTES_FRONT_STATIC[ROUTES_FRONT_STATIC_NAME]
export type ROUTES_FRONT_STATIC_TYPE = typeof ROUTES_FRONT_STATIC

export type ROUTES_FRONT_APP_NAME = keyof typeof ROUTES_FRONT_APP
export type ROUTES_FRONT_APP_PATH = typeof ROUTES_FRONT_APP[ROUTES_FRONT_APP_NAME]
export type ROUTES_FRONT_APP_TYPE = typeof ROUTES_FRONT_APP


export type ROUTES_FRONT_NAME = keyof typeof ROUTES_FRONT
export type ROUTES_FRONT_PATH = typeof ROUTES_FRONT[ROUTES_FRONT_NAME]
export type ROUTES_FRONT_TYPE = typeof ROUTES_FRONT

export type ROUTES_API_NAME = keyof typeof ROUTES_API
export type ROUTES_API_PATH = typeof ROUTES_API[ROUTES_API_NAME]
export type ROUTES_API_TYPE = typeof ROUTES_API


export type RedirectionHandler = (
  event: EVENT_INFO_TYPE | undefined | null,
  action: (route: ROUTES_FRONT_PATH) => void,
  currentUser: UserNoSensitiveWithRelations | undefined,
  currentPathname: ROUTES_FRONT_PATH) => void

