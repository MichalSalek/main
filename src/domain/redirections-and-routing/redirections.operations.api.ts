import Router from 'next/router'
import {__debuggerGate} from '../../application/error-debugger/debugger.utils.api'
import {EVENT_INFO_TYPE} from '../../READONLY-shared-kernel/domain/commands-and-queries/cqrs.types'
import {REDIRECTIONS_ON_EVENTS} from '../../READONLY-shared-kernel/domain/routing/routing.config'
import {ROUTES_FRONT_PATH} from '../../READONLY-shared-kernel/domain/routing/routing.types'
import {ROUTING_POLICY} from '../../READONLY-shared-kernel/policies/routing.policy'


type RedirectToActionProps = {
  routePath: ROUTES_FRONT_PATH
  callbackAfterRedirection?: () => void
}

export const redirectToAction = async (
  {
    routePath,
    callbackAfterRedirection
  }: RedirectToActionProps) => {
  const {
    willBeRedirect,
    redirectAction
  } = ROUTING_POLICY.utils.REDIRECT_BY_NEXT_ROUTER(
    routePath,
    Router)
  __debuggerGate(() => console.log(`willBeRedirect: "${willBeRedirect}" `))
  if (willBeRedirect) {

    __debuggerGate(() => console.log(`redirectAction: to route "${routePath}" - redirecting...`))

    await redirectAction()
    typeof callbackAfterRedirection === 'function' && callbackAfterRedirection()

  } else {
    __debuggerGate(() => console.log(`redirectAction: to route "${routePath}" - not going to happen.`))
  }
}

export const redirectToByEvent = async (event: EVENT_INFO_TYPE, callbackAfterRedirection?: () => void) => {
  const routePath: ROUTES_FRONT_PATH | undefined = REDIRECTIONS_ON_EVENTS[event]

  if (routePath) {
    await redirectToAction({
      routePath,
      callbackAfterRedirection
    })
  }
}
