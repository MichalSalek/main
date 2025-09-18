import {ReduxState} from '../store/store'
import {ROUTES_FRONT_NAME} from "../../READONLY-shared-kernel/domain/routing/routing.types";


export type GoBackSliceData = {
  previousRoutes: ROUTES_FRONT_NAME[]
}

export const initialGoBackSliceData: GoBackSliceData = {
  previousRoutes: []
}

export const STORE_SEL_goBack_previousRoutes = ({goBackSlice}: ReduxState): GoBackSliceData['previousRoutes'] => goBackSlice.previousRoutes


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
