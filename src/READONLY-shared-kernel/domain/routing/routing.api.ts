import {PERMISSIONS_POLICY} from '../../policies/permissions.policy'
import {CRITICAL_REDIRECTIONS_ON_EVENTS} from './routing.config'
import {RedirectionHandler} from './routing.types'


export const criticalRedirectionsSwitch: RedirectionHandler = (event, action, currentUser, currentPathname) => {

  if (event === 'ALREADY_LOGGED') {

    if (!PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
      currentUser?.role,
      currentPathname)) {
      action(CRITICAL_REDIRECTIONS_ON_EVENTS.ALREADY_LOGGED)
    }

  }


  if (event === 'LOGIN_FIRST') {

    if (!PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
      currentUser?.role,
      currentPathname)) {
      action(CRITICAL_REDIRECTIONS_ON_EVENTS.LOGIN_FIRST)
    }

  }


  if (event === 'UNAUTHORIZED') {

    action(CRITICAL_REDIRECTIONS_ON_EVENTS.UNAUTHORIZED)

  }


  if (event === 'SESSION_EXPIRED') {

    action(CRITICAL_REDIRECTIONS_ON_EVENTS.SESSION_EXPIRED)

  }

}