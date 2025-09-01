import {ReactElement, useEffect} from 'react'
import {STORE_SEL_appLoaders_isAppLoading} from '../../../application/app-loaders/appLoaders.read'
import {turnOnAppLoader} from '../../../application/app-loaders/appLoaders.possibilities.api'
import {useAppSelector} from '../../../application/store/store'
import {STORE_SEL_user_currentUser} from '../../../domain/user/user.read'
import {PERMISSIONS_POLICY} from '../../../READONLY-shared-kernel/policies/permissions.policy'


const BrickWallLoaderAtom = () => <>Loading</>

type Props = {
  children: ReactElement,
}


export const BrickWallAppLoaderComposition = ({children}: Props): ReactElement => {
  const isAppLoading = useAppSelector(STORE_SEL_appLoaders_isAppLoading)
  const currentUser = useAppSelector(STORE_SEL_user_currentUser)
  const currentPathname = window.location.pathname

  useEffect(
    () => {
      if (typeof currentUser === 'undefined' && PERMISSIONS_POLICY.utils.IS_ROUTE_FOR_LOGGED_ONLY(currentPathname)) {
        turnOnAppLoader()
      }
    },
    [currentUser, currentPathname])


  // The route is not subject to user authorization.
  //
  if (PERMISSIONS_POLICY.utils.IS_ROUTE_FOR_EVERYONE(currentPathname)) {
    return children
  }

  // The route must be authorized, but user exists and has appropriate permissions.
  //
  if (PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
    currentUser?.role,
    currentPathname)) {
    return children
  }

  // When app-loaders is off - show route immediately.
  //
  if (!isAppLoading) {
    return children
  }

  // Last case - no user or no permission for the route - show app-loaders.
  //
  return <BrickWallLoaderAtom/>
}
