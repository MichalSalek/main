import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {initialScrollPositionSliceData, ScrollPositionSlice} from './scrollPosition.read'


export const scrollPositionSlice = createSlice({
  name: 'scrollPositionSlice',
  initialState: initialScrollPositionSliceData,
  reducers: {
    STORE_SET_scrollPosition: (state, action: PayloadAction<ScrollPositionSlice['position']>) => {
      state.position = action.payload
    }
  }
})

export const {
  STORE_SET_scrollPosition
} = scrollPositionSlice.actions

