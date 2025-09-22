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

  const previousRoutesNames = goBackSlice.previousRoutes

  const veryPreviousRouteName = previousRoutesNames[0]
  const routePathBeforeRedirection = history.state.url
  const routeNameBeforeRedirection = ROUTING_POLICY.utils.GET_ROUTE_FRONT_NAME(routePathBeforeRedirection)
  const routeNameAfterRedirection = ROUTING_POLICY.utils.GET_ROUTE_FRONT_NAME(routePathAfterRedirection)

  const isRedirectToTheSamePage = routePathAfterRedirection === routePathBeforeRedirection
  const isRedirectToTheHistoryPreviousPage = routeNameAfterRedirection === veryPreviousRouteName

  if (
    routeNameBeforeRedirection &&
    !isRedirectToTheSamePage &&
    !isRedirectToTheHistoryPreviousPage &&
    PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(currentUser?.role, routePathBeforeRedirection)) {

    reduxStore.dispatch(STORE_SET_goBack_previousRouteForUI(routeNameBeforeRedirection))
  }
}

export const removeLastRecordFromBackHistory = (routePathAfterRedirection: string): void => {
  const previousRoutesNames = reduxStore.getState().goBackSlice.previousRoutes

  const veryPreviousRouteName = previousRoutesNames[0]
  const routeNameAfterRedirection = ROUTING_POLICY.utils.GET_ROUTE_FRONT_NAME(routePathAfterRedirection)

  if (routeNameAfterRedirection === veryPreviousRouteName) {
    reduxStore.dispatch(STORE_REMOVE_goBack_firstNewestRoute())
  }
}


export const resetGoBackHistory = (): void => {
  reduxStore.dispatch(STORE_RESET_goBack_previousRoutes())
}
