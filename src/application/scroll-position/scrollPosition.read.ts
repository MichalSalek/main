import {ReduxState} from "../store/store";

export type ScrollPositionSlice = {
  position?: number
}

export const initialScrollPositionSliceData: ScrollPositionSlice = {
  position: undefined
}

export const STORE_SEL_scrollPosition_position = ({scrollPositionSlice}: ReduxState): ScrollPositionSlice['position'] => scrollPositionSlice.position


