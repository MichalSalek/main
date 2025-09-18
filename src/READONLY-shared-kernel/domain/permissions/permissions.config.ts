import {
  ACCOUNT_HOLDER_AND_ADMIN,
  ALL_LOGGED_ROLES_COLLECTION,
  ALL_ROLES_COLLECTION,
  RoleValue
} from '../../models/db_models'
import {EVENTS_POLICY} from '../../policies/events.policy'
import {PERMISSIONS_POLICY_TYPE} from '../../policies/permissions.policy'
import {ROUTES_FRONT, ROUTES_FRONT_STATIC} from '../routing/routing.config'
import {ROUTES_FRONT_STATIC_PATH} from "../routing/routing.types";


export const readonlyPermissionsSets: PERMISSIONS_POLICY_TYPE['readonlyPermissionsSets'] = {

  ALWAYS_ALLOWED: ['SESSION_GET_CURRENT',
    'MASTER_ADMIN_INIT',
    'SWITCH_BACK_BECOME_USER'],

  MASTER_ADMIN: EVENTS_POLICY.utils.GET_COMMAND_AND_QUERY_EVENTS()
    .filter((event) => {
      if (event === 'USER_DISABLE_SELF') {
        return false
      }
      if (event === 'USER_DELETE_SELF') {
        return false
      }

      return true
    }),

  LOGGED_USER_LOW_LEVEL_FUNCTIONALITY: [
    'USER_LOGOUT',
    'USER_DISABLE_SELF',
    'USER_ENABLE_SELF',
    'USER_DELETE_SELF',

    'SESSION_REFRESH',
    'SESSION_GET_CURRENT',
    'SESSION_DELETE_ALL',
    'SESSION_DELETE_EXACTLY',
    'SESSION_GET_ALL',

    'EVENT_LOG_GET_ALL']

} as const


export const runtimePermissionsSetsForEvents: PERMISSIONS_POLICY_TYPE['runtimePermissionsSetsForEvents'] = {

  ACTIVE_ACCOUNT: [
    'USER_DELETE_EXACTLY',
    'USER_CREATE',
    'GET_GALLERY_RECORDS',
    'GET_GALLERY_CONFIG',
    'GALLERY_CREATE_TRAIT',
    'CREATE_GALLERY_RECORD',
    'DELETE_ASSET_FROM_VENDOR'
  ]


} as const


export const permissionsForEventsByRole: PERMISSIONS_POLICY_TYPE['permissionsForEventsByRole'] = {
  [RoleValue.MASTER_ADMIN]: [...readonlyPermissionsSets.ALWAYS_ALLOWED,
    ...readonlyPermissionsSets.MASTER_ADMIN],
  [RoleValue.NOT_LOGGED_IN]: [...readonlyPermissionsSets.ALWAYS_ALLOWED,
    'USER_LOGIN',
    'USER_REGISTER'],
  [RoleValue.ACCOUNT_HOLDER]: [...readonlyPermissionsSets.ALWAYS_ALLOWED,
    ...readonlyPermissionsSets.LOGGED_USER_LOW_LEVEL_FUNCTIONALITY,
    'ACCOUNT_DISPLAY_NAME_CHANGE',
    'ACCOUNT_PAYMENT_GET_STATUS',
    'ACCOUNT_PAYMENT_MAKE'],
  [RoleValue.USER_LEVEL_1]: [...readonlyPermissionsSets.ALWAYS_ALLOWED,
    ...readonlyPermissionsSets.LOGGED_USER_LOW_LEVEL_FUNCTIONALITY]
} as const


export const permissionsForRoutes: PERMISSIONS_POLICY_TYPE['permissionsForRoutes'] = {
  //
  // EMPTY ARRAY - Everyone is allowed. Including not logged in.
  //
  [ROUTES_FRONT.ADMIN]: [RoleValue.MASTER_ADMIN],
  [ROUTES_FRONT.ADMIN_USERS]: [RoleValue.MASTER_ADMIN],
  [ROUTES_FRONT.ADMIN_NOTES]: [RoleValue.MASTER_ADMIN],
  [ROUTES_FRONT.ADMIN_POLITICS]: [RoleValue.MASTER_ADMIN],

  [ROUTES_FRONT.CONNECTION_CHECK]: ALL_ROLES_COLLECTION,


  [ROUTES_FRONT.HOME]: ALL_ROLES_COLLECTION,
  [ROUTES_FRONT.PRICING]: ALL_ROLES_COLLECTION,

  [ROUTES_FRONT.USER_LOG]: [RoleValue.NOT_LOGGED_IN],
  [ROUTES_FRONT.USER_REG]: [RoleValue.NOT_LOGGED_IN],
  [ROUTES_FRONT.USER_REG_PASS]: [RoleValue.NOT_LOGGED_IN],

  [ROUTES_FRONT.APP]: ALL_LOGGED_ROLES_COLLECTION,
  [ROUTES_FRONT.USER_DEL_SELF]: ALL_LOGGED_ROLES_COLLECTION,
  [ROUTES_FRONT.USER_ACCOUNT]: ALL_LOGGED_ROLES_COLLECTION,
  [ROUTES_FRONT.USER_ACCOUNT_PAY]: ALL_LOGGED_ROLES_COLLECTION,

  [ROUTES_FRONT.GALLERY_UPLOAD_ASSET]: ACCOUNT_HOLDER_AND_ADMIN,
  [ROUTES_FRONT.GALLERY]: ACCOUNT_HOLDER_AND_ADMIN,

} as const

export const disallowedRoutesForLoggedRole: ROUTES_FRONT_STATIC_PATH[] = [
  ROUTES_FRONT_STATIC.USER_LOG,
  ROUTES_FRONT_STATIC.USER_REG,
  ROUTES_FRONT_STATIC.USER_REG_PASS
] as const
