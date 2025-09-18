import {STORE_SET_appLoaders_isAppBusy} from './appLoaders.slice'
import {reduxStore} from '../store/store'


export const BUSY_LOADER = {

  _TIME_TO_WAIT_BEFORE_TURN_OFF: 100,
  _debounceID: 0,

  turnOnLoading: () => {
    if (reduxStore.getState().appLoadersSlice.isAppBusy) {
      return void undefined
    }

    window.clearTimeout(BUSY_LOADER._debounceID)
    BUSY_LOADER._debounceID = 0

    reduxStore.dispatch(STORE_SET_appLoaders_isAppBusy(true))
  },

  turnOffLoading: () => {
    if (!reduxStore.getState().appLoadersSlice.isAppBusy) {
      return void undefined
    }

    window.clearTimeout(BUSY_LOADER._debounceID)

    BUSY_LOADER._debounceID = window.setTimeout(
      () => {
        reduxStore.dispatch(STORE_SET_appLoaders_isAppBusy(false))

        BUSY_LOADER._debounceID = 0
      },
      BUSY_LOADER._TIME_TO_WAIT_BEFORE_TURN_OFF)
  }
}
