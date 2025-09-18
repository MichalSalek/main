import {__debuggerGate} from '../../application/error-debugger/debugger.utils.api'
import {reduxStore} from '../../application/store/store'
import {EVENT_INFO_TYPE} from '../../READONLY-shared-kernel/domain/commands-and-queries/cqrs.types'
import {ROUTES_FRONT_PATH} from '../../READONLY-shared-kernel/domain/routing/routing.types'
import {ROUTING_POLICY} from '../../READONLY-shared-kernel/policies/routing.policy'
import {criticalRedirectionsActions} from './criticalRedirectionsActions.config'


export const criticalRedirectionsDependingOnEventLogsStreamInterceptor = (event: EVENT_INFO_TYPE | null | undefined): void => {
  if (!event) {
    return void undefined
  }

  if (!ROUTING_POLICY.utils.IS_EXISTS_REDIRECTION_FOR_PASSED_EVENT(event)) {
    return void undefined
  }

  const currentPathname = window.location.pathname as ROUTES_FRONT_PATH
  const currentUser = reduxStore.getState().userSlice?.currentUser


  __debuggerGate(() => console.log(`Begin: criticalRedirectionsDependingOnEventLogsStreamInterceptor.
   event: ${event}, 
   currentPathname: ${currentPathname},
   currentUser.email: ${currentUser?.email},
   typeof currentUser: ${typeof currentUser},
   `))


  // MAIN FIRE
  criticalRedirectionsActions(
    event,
    currentUser,
    currentPathname)
}
