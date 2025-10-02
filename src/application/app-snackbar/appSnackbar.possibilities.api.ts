import {EVENT_INFO_TYPE} from '../../READONLY-shared-kernel/domain/commands-and-queries/cqrs.types'
import {EVENTS_POLICY} from '../../READONLY-shared-kernel/policies/events.policy'
import {reportIssue} from '../error-debugger/errorHandler.possibilities.api'
import {reduxStore} from '../store/store'
import {STORE_SET_appSnackbar_newSnackbar} from './appSnackbar.slice'
import {SnackbarWrapper} from './appSnackbar.types'
import {generateAppAlertWrapper} from './appSnackbar.utils.api'
import {APP_SNACKBAR_STATE} from './appSnackbar.state';
import {SNACKBAR_DEBOUNCE_TIME} from './appSnackbar.config';


export const pushNewSnackbar = (input: string | EVENT_INFO_TYPE | undefined, color?: SnackbarWrapper['color']): void => {
  if (!input) {
    reportIssue(
      'NO MESSAGE FOR pushNewSnackbar',
      {
        message: input,
        color
      })
    return void undefined
  }

  if (EVENTS_POLICY.utils.IS_EVENT_DISALLOWED_FOR_UI(input)) {
    return void undefined
  }


  if (APP_SNACKBAR_STATE.lastSnackbarMemo === input) {
    return void undefined
  }


  APP_SNACKBAR_STATE.snackbarDebounceTimeID = window?.setTimeout(() => {

    APP_SNACKBAR_STATE.lastSnackbarMemo = ''
    APP_SNACKBAR_STATE.snackbarDebounceTimeID = 0

  }, SNACKBAR_DEBOUNCE_TIME)

  APP_SNACKBAR_STATE.lastSnackbarMemo = input


  // @TODO tłumaczenia eventów dla features robić w tym miejscu.
  // const translatedMessage = translate(message)
  // i wpychać już przetłumaczone do generateAppAlertWrapper.


  void reduxStore.dispatch(STORE_SET_appSnackbar_newSnackbar(generateAppAlertWrapper(
    input,
    color)))
}
