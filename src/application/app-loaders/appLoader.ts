import {STORE_SET_appLoaders_isAppLoading} from './appLoaders.slice'
import {reduxStore} from '../store/store'


export const APP_LOADER = {

  _TIME_TO_WAIT_BEFORE_TURN_OFF: 300,
  _debounceID: 0,

  turnOnLoading: () => {
    if (reduxStore.getState().appLoadersSlice.isAppLoading) {
      return void undefined
    }

    window.clearTimeout(APP_LOADER._debounceID)

    APP_LOADER._debounceID = 0

    reduxStore.dispatch(STORE_SET_appLoaders_isAppLoading(true))
  },

  turnOffLoading: () => {
    if (!reduxStore.getState().appLoadersSlice.isAppLoading) {
      return void undefined
    }

    window.clearTimeout(APP_LOADER._debounceID)

    APP_LOADER._debounceID = window.setTimeout(
      () => {
        reduxStore.dispatch(STORE_SET_appLoaders_isAppLoading(false))

        APP_LOADER._debounceID = 0
      },
      APP_LOADER._TIME_TO_WAIT_BEFORE_TURN_OFF)
  }
}
