import {debounce, freezeThreadAndWait} from '@msalek/utils'
import {reduxStore} from '../store/store'
import {SAVE_SCROLL_POSITION_TIME_INTERVAL_IN_MS} from './scrollPosition.config'
import {STORE_SET_scrollPosition} from './scrollPosition.slice'


export const initScrollPositionController = async () => {
  await freezeThreadAndWait(150)
  const scrollPosition = reduxStore.getState().scrollPositionSlice.position
  if (scrollPosition) {
    scrollTo(
      0,
      scrollPosition)
  }
  const scrollCallback = () => {
    reduxStore.dispatch(STORE_SET_scrollPosition(Math.round(scrollY)))
  }
  document.addEventListener(
    'scroll',
    debounce(
      scrollCallback,
      SAVE_SCROLL_POSITION_TIME_INTERVAL_IN_MS))
}
