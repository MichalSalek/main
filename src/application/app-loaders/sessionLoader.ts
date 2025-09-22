import {STORE_SET_appLoaders_isSessionChecking} from './appLoaders.slice'
import {reduxStore} from '../store/store'


export const SESSION_LOADER = {

  _TIME_TO_WAIT_BEFORE_TURN_OFF: 100,
  _debounceID: 0,

  turnOnLoading: () => {
    if (reduxStore.getState().appLoadersSlice.isSessionChecking) {
      return void undefined
    }

    window.clearTimeout(SESSION_LOADER._debounceID)
    SESSION_LOADER._debounceID = 0

    reduxStore.dispatch(STORE_SET_appLoaders_isSessionChecking(true))
  },

  turnOffLoading: () => {
    if (!reduxStore.getState().appLoadersSlice.isSessionChecking) {
      return void undefined
    }

    window.clearTimeout(SESSION_LOADER._debounceID)

    SESSION_LOADER._debounceID = window.setTimeout(
      () => {
        reduxStore.dispatch(STORE_SET_appLoaders_isSessionChecking(false))

        SESSION_LOADER._debounceID = 0
      },
      SESSION_LOADER._TIME_TO_WAIT_BEFORE_TURN_OFF)
  }
}
