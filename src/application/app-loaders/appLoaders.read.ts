import {ReduxState} from '../store/store'


export type AppLoadersSliceData = {
  isAppReady: boolean
  isAppLoading: boolean
  isViewLoading: boolean
  isAppBusy: boolean
}

export const initialPppLoadersSliceData: AppLoadersSliceData = {
  isAppReady: false,
  isAppLoading: false,
  isViewLoading: false,
  isAppBusy: false
}

export const STORE_SEL_appLoaders_isAppReady = ({appLoadersSlice}: ReduxState): AppLoadersSliceData['isAppReady'] => appLoadersSlice.isAppReady

export const STORE_SEL_appLoaders_isAppLoading = ({appLoadersSlice}: ReduxState): AppLoadersSliceData['isAppLoading'] => appLoadersSlice.isAppLoading

export const STORE_SEL_appLoaders_isViewLoading = ({appLoadersSlice}: ReduxState): AppLoadersSliceData['isViewLoading'] => appLoadersSlice.isViewLoading

export const STORE_SEL_appLoaders_isAppBusy = ({appLoadersSlice}: ReduxState): AppLoadersSliceData['isAppBusy'] => appLoadersSlice.isAppBusy


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
