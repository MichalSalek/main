import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppLoadersSliceData, initialPppLoadersSliceData} from './appLoaders.read'


export const appLoadersSlice = createSlice({
  name: 'appLoadersSlice',
  initialState: initialPppLoadersSliceData,
  reducers: {
    STORE_SET_appLoaders_isAppReady: (state, action: PayloadAction<AppLoadersSliceData['isAppReady']>) => {
      state.isAppReady = action.payload
    },
    STORE_SET_appLoaders_isAppLoading: (state, action: PayloadAction<AppLoadersSliceData['isAppLoading']>) => {
      state.isAppLoading = action.payload
    },
    STORE_SET_appLoaders_isViewLoading: (state, action: PayloadAction<AppLoadersSliceData['isViewLoading']>) => {
      state.isViewLoading = action.payload
    },
    STORE_SET_appLoaders_isAppBusy: (state, action: PayloadAction<AppLoadersSliceData['isAppBusy']>) => {
      state.isAppBusy = action.payload
    }
  }
})
export const {
  STORE_SET_appLoaders_isAppReady,
  STORE_SET_appLoaders_isAppLoading,
  STORE_SET_appLoaders_isViewLoading,
  STORE_SET_appLoaders_isAppBusy
} = appLoadersSlice.actions
