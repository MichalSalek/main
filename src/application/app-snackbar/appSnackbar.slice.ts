import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {REMEMBER_LAST_XX_SNACKBARS} from './appSnackbar.config'
import {AppSnackbarSliceData, initialAppSnackbarSliceData} from './appSnackbar.read'


export const appSnackbarSlice = createSlice({
  name: 'appSnackbarSlice',
  initialState: initialAppSnackbarSliceData,
  reducers: {
    STORE_SET_appSnackbar_newSnackbar: (state, action: PayloadAction<AppSnackbarSliceData['snackbars'][0]>) => {
      state.snackbars.unshift(action.payload)
      state.snackbars = state.snackbars.slice(
        0,
        REMEMBER_LAST_XX_SNACKBARS)
    }
  }
})

export const {STORE_SET_appSnackbar_newSnackbar} = appSnackbarSlice.actions

