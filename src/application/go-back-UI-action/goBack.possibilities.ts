import {reduxStore} from '../store/store';
import {ROUTING_POLICY} from '../../READONLY-shared-kernel/policies/routing.policy';
import {
  STORE_REMOVE_goBack_firstNewestRoute,
  STORE_RESET_goBack_previousRoutes,
  STORE_SET_goBack_previousRouteForUI
} from './goBack.slice';
import {PERMISSIONS_POLICY} from '../../READONLY-shared-kernel/policies/permissions.policy';

export const addRecordToBackHistory = (routePathAfterRedirection: string): void => {

  const {userSlice, goBackSlice} = reduxStore.getState()

  const currentUser = userSlice.currentUser

  const routePathBeforeRedirection = history.state.url

  const normalizedPathBefore = ROUTING_POLICY.utils.NORMALIZE_PATH(routePathBeforeRedirection)
  const normalizedPathAfter = ROUTING_POLICY.utils.NORMALIZE_PATH(routePathAfterRedirection)

  const previousRoutesNames = goBackSlice.previousRoutes

  const veryPreviousRouteName = previousRoutesNames[0]

  const routeNameBeforeRedirection = ROUTING_POLICY.utils.GET_ROUTE_FRONT_NAME(normalizedPathBefore)
  const routeNameAfterRedirection = ROUTING_POLICY.utils.GET_ROUTE_FRONT_NAME(normalizedPathAfter)

  const isRedirectToTheSamePage = routePathAfterRedirection === normalizedPathBefore
  const isRedirectToTheHistoryPreviousPage = routeNameAfterRedirection === veryPreviousRouteName

  if (
    routeNameBeforeRedirection &&
    !isRedirectToTheSamePage &&
    !isRedirectToTheHistoryPreviousPage &&
    PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(currentUser?.role, normalizedPathBefore)) {

    reduxStore.dispatch(STORE_SET_goBack_previousRouteForUI(routeNameBeforeRedirection))
  }
}


export const removeLastRecordFromBackHistory = (routePathAfterRedirection: string): void => {
  const normalizedPathAfter = ROUTING_POLICY.utils.NORMALIZE_PATH(routePathAfterRedirection)
  const previousRoutesNames = reduxStore.getState().goBackSlice.previousRoutes

  const veryPreviousRouteName = previousRoutesNames[0]
  const routeNameAfterRedirection = ROUTING_POLICY.utils.GET_ROUTE_FRONT_NAME(normalizedPathAfter)

  if (routeNameAfterRedirection === veryPreviousRouteName) {
    reduxStore.dispatch(STORE_REMOVE_goBack_firstNewestRoute())
  }
}


export const resetGoBackHistory = (): void => {
  reduxStore.dispatch(STORE_RESET_goBack_previousRoutes())
}
