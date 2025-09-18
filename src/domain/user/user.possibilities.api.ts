import {reduxStore} from '../../application/store/store'
import {UserSliceData} from './user.read'
import {STORE_RESET_user_currentUser, STORE_SET_user_currentUser} from './user.slice'


export const resetUserSlice = () => {
  reduxStore.dispatch(STORE_RESET_user_currentUser())
}


export const setCurrentUser = (user: UserSliceData['currentUser']): void => {
  reduxStore.dispatch(STORE_SET_user_currentUser(user))
}
