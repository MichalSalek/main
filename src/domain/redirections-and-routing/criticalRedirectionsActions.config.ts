import {__debuggerGate} from '../../application/error-debugger/debugger.utils.api'
import {EVENT_INFO_TYPE} from '../../READONLY-shared-kernel/domain/commands-and-queries/cqrs.types'
import {criticalRedirectionsSwitch} from '../../READONLY-shared-kernel/domain/routing/routing.api'
import {ROUTES_FRONT_PATH} from '../../READONLY-shared-kernel/domain/routing/routing.types'
import {CurrentUser} from '../../READONLY-shared-kernel/models/user/user.types'
import {redirectToAction} from './redirections.operations.api'


export const criticalRedirectionsActions = (
  event: EVENT_INFO_TYPE,
  currentUser: CurrentUser | undefined,
  currentPathname: ROUTES_FRONT_PATH): void => {


  criticalRedirectionsSwitch(
    event,
    async (route) => {

      __debuggerGate(() => alert('criticalRedirectionsActions: ' + event + ` redirection to: ${route}`))

      const group1: EVENT_INFO_TYPE[] = [
        'UNAUTHORIZED',
        'LOGIN_FIRST',
        'SESSION_EXPIRED',
        'ALREADY_LOGGED'
      ]
      if (group1.includes(event)) {

        await redirectToAction({
          routePath: route
        })

      }

    },
    currentUser,
    currentPathname)
}
