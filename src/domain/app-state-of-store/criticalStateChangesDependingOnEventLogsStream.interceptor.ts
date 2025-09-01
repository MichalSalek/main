import {EVENT_INFO_TYPE} from "../../READONLY-shared-kernel/domain/commands-and-queries/cqrs.types";
import {resetUserSlice} from "../user/user.possibilities.api";
import {resetGoBackHistory} from "../../application/go-back-UI-action/goBack.possibilities";
import {__debuggerGate} from "../../application/error-debugger/debugger.utils.api";

export const criticalStateChangesDependingOnEventLogsStream = async (event: EVENT_INFO_TYPE | null | undefined) => {

  if (!event) {
    return void undefined
  }

  __debuggerGate(() => console.log(`Begin: criticalStateChangesDependingOnEventLogsStream.
   event: ${event}
   `))


  const resetAppStateGroup_1: EVENT_INFO_TYPE[] = [
    'LOGIN_FIRST',
    'SESSION_EXPIRED',
    'USER_LOGGED_OUT',
    'USER_DELETED_SELF',
    'USER_DISABLED_SELF'
  ]
  if (resetAppStateGroup_1.includes(event)) {

    resetUserSlice()
    resetGoBackHistory()

  }


  const resetAppStateGroup_2: EVENT_INFO_TYPE[] = [
    'USER_LOGGED_IN',
    'ALREADY_LOGGED',
    'USER_SWITCHED_BACK_TO_SELF',
    'USER_BECAME_SOMEONE_ELSE'
  ]
  if (resetAppStateGroup_2.includes(event)) {

    resetGoBackHistory()

  }

}

