import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DevModeSliceData, initialDevModeSliceData} from './dev-mode.read'


export const devModeSlice = createSlice({
  name: 'devModeSlice',
  initialState: initialDevModeSliceData,
  reducers: {
    STORE_SET_devMode_debugOnSwitch: (state, action: PayloadAction<DevModeSliceData['debugOn']>) => {
      state.debugOn = action.payload
    }
  }
})

export const {
  STORE_SET_devMode_debugOnSwitch
} = devModeSlice.actions

