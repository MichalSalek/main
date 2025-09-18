import {ReduxState} from '../store/store'
import {SnackbarWrapper} from './appSnackbar.types'


export type AppSnackbarSliceData = {
  snackbars: SnackbarWrapper[]
}

export const initialAppSnackbarSliceData: AppSnackbarSliceData = {
  snackbars: []
}

export const STORE_SEL_snackbar_snackbars = ({appSnackbarSlice}: ReduxState): AppSnackbarSliceData['snackbars'] => appSnackbarSlice.snackbars


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
