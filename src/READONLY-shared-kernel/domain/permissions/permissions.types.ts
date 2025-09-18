import {EVENT_COMMANDS_AND_QUERIES_TYPE} from '../commands-and-queries/cqrs.types'
import {CurrentUser} from "../../models/user/user.types";


export type PermissionsCollection = EVENT_COMMANDS_AND_QUERIES_TYPE[]

export type PermissionSets = Record<string, EVENT_COMMANDS_AND_QUERIES_TYPE[]>

export type RoutingPermissionBlockade = {
  currentUser: CurrentUser | undefined
  currentPathname: string
  userExistsIsStaticPageCallback: (currentUser: CurrentUser) => void
  userExistsIsNotStaticPageCallback: (currentUser: CurrentUser) => void
  userNotExistsCallback: () => void
}
