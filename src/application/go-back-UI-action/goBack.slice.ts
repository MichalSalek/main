import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GoBackSliceData, initialGoBackSliceData} from "./goBack.read";
import {REMEMBER_LAST_XX_VIEWS_HISTORY_RECORDS} from "./goBack.config";


export const goBackSlice = createSlice({
  name: 'goBackSlice',
  initialState: initialGoBackSliceData,
  reducers: {
    STORE_SET_goBack_previousRouteForUI: (state, action: PayloadAction<GoBackSliceData['previousRoutes'][0]>) => {
      state.previousRoutes.unshift(action.payload)
      state.previousRoutes = state.previousRoutes.slice(
        0,
        REMEMBER_LAST_XX_VIEWS_HISTORY_RECORDS)
    },

    STORE_REMOVE_goBack_firstNewestRoute: (state) => {
      state.previousRoutes.shift()
    },

    STORE_RESET_goBack_previousRoutes: (state) => {
      state.previousRoutes = []
    },
  }
})
export const {
  STORE_SET_goBack_previousRouteForUI,
  STORE_REMOVE_goBack_firstNewestRoute,
  STORE_RESET_goBack_previousRoutes
} = goBackSlice.actions
