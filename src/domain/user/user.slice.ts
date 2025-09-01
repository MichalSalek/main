import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Session} from '../../READONLY-shared-kernel/models/db_models'
import {initialUserSliceData, UserSliceData} from './user.read'


export const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialUserSliceData,
  reducers: {


    STORE_SET_user_userMetadata: (state, action: PayloadAction<UserSliceData['userMetadata']>) => {

      state.userMetadata = action.payload
    },


    STORE_SET_user_currentUser: (state, action: PayloadAction<UserSliceData['currentUser']>) => {

      state.currentUser = action.payload
    },


    STORE_RESET_user_currentUser: (state) => {

      state.currentUser = undefined
    },

    STORE_SET_user_sessionInCurrentUser: (state, action: PayloadAction<Session>) => {

      if (action.payload && state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          session: action.payload
        }
      }

    }


  }
})

export const {
  STORE_SET_user_userMetadata,
  STORE_SET_user_currentUser,
  STORE_RESET_user_currentUser,
  STORE_SET_user_sessionInCurrentUser
} = userSlice.actions

