import {STORE_SET_appLoaders_isViewLoading} from './appLoaders.slice'
import {reduxStore} from '../store/store'


export const VIEW_LOADER = {

  _TIME_TO_WAIT_BEFORE_TURN_OFF: 100,
  _debounceID: 0,

  turnOnLoading: () => {
    if (reduxStore.getState().appLoadersSlice.isViewLoading) {
      return void undefined
    }

    window.clearTimeout(VIEW_LOADER._debounceID)
    VIEW_LOADER._debounceID = 0

    reduxStore.dispatch(STORE_SET_appLoaders_isViewLoading(true))
  },

  turnOffLoading: () => {
    if (!reduxStore.getState().appLoadersSlice.isViewLoading) {
      return void undefined
    }

    window.clearTimeout(VIEW_LOADER._debounceID)

    VIEW_LOADER._debounceID = window.setTimeout(
      () => {
        reduxStore.dispatch(STORE_SET_appLoaders_isViewLoading(false))

        VIEW_LOADER._debounceID = 0
      },
      VIEW_LOADER._TIME_TO_WAIT_BEFORE_TURN_OFF)
  }
}
