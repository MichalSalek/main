import {ReduxState} from '../../application/store/store'
import {CurrentUser, UserMetadata} from '../../READONLY-shared-kernel/models/user/user.types'


export type UserSliceData = {
  currentUser: CurrentUser | undefined
  userMetadata: UserMetadata
}

export const initialUserSliceData: UserSliceData = {
  currentUser: undefined,
  userMetadata: {
    client_ip: undefined,
    language: undefined,
    user_agent: undefined,
    location: undefined
  }
}


export const STORE_SEL_user_currentUser = ({userSlice}: ReduxState): UserSliceData['currentUser'] => userSlice.currentUser

export const STORE_SEL_user_userMetadata = ({userSlice}: ReduxState): UserSliceData['userMetadata'] => userSlice.userMetadata


// * EXAMPLE *
//
// Smart store data selectors - custom application-hooks:
//
// export const useSel_store_isAppReadyByCustomHook = (): { isAppReadyForSure: boolean } => {
//     const someConst: number = useAppSelector(...)
//     const someConst2: number = useAppSelector(...)
//     const isAppReadyForSure = useMemo(() => {
//         return someConst >= someConst2
//     }, [someConst, someConst2])
//     return {isAppReadyForSure}
// }
