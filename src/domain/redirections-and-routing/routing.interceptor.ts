import Router from 'next/router'
import {__debuggerGate} from '../../application/error-debugger/debugger.utils.api'
import {
  turnOffAppBusyLoader,
  turnOffAppLoader,
  turnOffViewLoader,
  turnOnAppBusyLoader,
  turnOnViewLoader
} from '../../application/app-loaders/appLoaders.possibilities.api';
import {
  addRecordToBackHistory,
  removeLastRecordFromBackHistory,
  resetGoBackHistory
} from '../../application/go-back-UI-action/goBack.possibilities';
import {permissionCheckOnRouteWithActionInterceptor} from '../permissions/permissionCheckOnRouteWithAction.interceptor';
import {ROUTES_FRONT} from '../../READONLY-shared-kernel/domain/routing/routing.config';


export const initRoutingInterceptor = () => {
  Router.ready(() => {

    Router.events.on(
      'routeChangeStart',
      (routePathAfterRedirection: string) => {
        __debuggerGate(() => console.log(`routeChangeStart: to route "${routePathAfterRedirection}".`))

        turnOnAppBusyLoader()
        turnOnViewLoader()

        addRecordToBackHistory(routePathAfterRedirection)
      })

    Router.events.on(
      'routeChangeComplete',
      async (routePathAfterRedirection: string) => {
        __debuggerGate(() => console.log(`routeChangeComplete: to route "${routePathAfterRedirection}".`))

        removeLastRecordFromBackHistory(routePathAfterRedirection)

        // Always reset GoBack history on '/' home screen.
        if (routePathAfterRedirection === ROUTES_FRONT.HOME) {
          resetGoBackHistory()
        }

        await permissionCheckOnRouteWithActionInterceptor(routePathAfterRedirection)

        turnOffViewLoader()
        turnOffAppLoader()
        turnOffAppBusyLoader()

      })

  })
}
