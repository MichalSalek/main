import {ROUTES_FRONT_PATH} from '../../READONLY-shared-kernel/domain/routing/routing.types';
import {reduxStore} from '../../application/store/store';
import {__debuggerGate} from '../../application/error-debugger/debugger.utils.api';
import {PERMISSIONS_POLICY} from '../../READONLY-shared-kernel/policies/permissions.policy';
import {pushEventToBus} from '../../application/event-bus/eventBus.possibilities.api';
import {SnackbarWrapper} from '../../application/app-snackbar/appSnackbar.types';
import {resetGoBackHistory} from '../../application/go-back-UI-action/goBack.possibilities';
import {sessionGetCurrent_IO} from '../session/sessionIO.operations.api';

export const permissionCheckOnRouteWithActionInterceptor = async (currentPathname: ROUTES_FRONT_PATH | string) => {


  if (PERMISSIONS_POLICY.utils.IS_ROUTE_NOT_FOR_LOGGED(currentPathname)) {
    //
    // Double check if user has active session already.
    //
    await sessionGetCurrent_IO(
      undefined,
      async (response) => {
      },
      async (error) => {
      })
  }


  // TRIGGERING EVENTS ON ROUTES PERMISSIONS
  //
  const currentUser = reduxStore.getState().userSlice.currentUser

  __debuggerGate(() => console.log(`Begin: permissionCheckOnRouteWithActionInterceptor.
   currentPathname: ${currentPathname},
   currentUser.email: ${currentUser?.email},
   typeof currentUser: ${typeof currentUser},
   `))


  PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE_WITH_CALLBACKS({
    currentPathname,
    currentUser,
    userExistsIsStaticPageCallback: (currentUser) => {

      __debuggerGate(() => console.log('Begin: userExistsIsStaticPageCallback. ALREADY_LOGGED'))


      // Not permitted route (for logged user):

      void pushEventToBus({event: 'ALREADY_LOGGED', payload: {snackbarColor: 'success' as SnackbarWrapper['color']}})

      // Reset go back history to avoid back to logging screen:
      resetGoBackHistory()

    },
    userExistsIsNotStaticPageCallback: (currentUser) => {

      __debuggerGate(() => console.log('Begin: userExistsIsNotStaticPageCallback. UNAUTHORIZED'))


      // Not permitted route, but another than static page - general auth error:

      void sessionGetCurrent_IO(
        undefined,
        async (response) => {
          void pushEventToBus({event: 'UNAUTHORIZED', payload: {snackbarColor: 'warning' as SnackbarWrapper['color']}})
        },
        async (error) => {
          void pushEventToBus({event: 'UNAUTHORIZED', payload: {snackbarColor: 'warning' as SnackbarWrapper['color']}})
        })

    },
    userNotExistsCallback: () => {

      __debuggerGate(() => console.log('Begin: userNotExistsCallback. LOGIN_FIRST'))


      // Not logged and cannot be there:

      void pushEventToBus({event: 'LOGIN_FIRST', payload: {snackbarColor: 'warning' as SnackbarWrapper['color']}})

    },
  })
}
