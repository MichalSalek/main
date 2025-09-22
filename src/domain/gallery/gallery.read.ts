import {ReduxState} from '../../application/store/store';

export type GallerySliceData = {
  filtersStrictSwitch: boolean
}

export const initialGallerySliceData: GallerySliceData = {
  filtersStrictSwitch: false

}


export const STORE_SEL_gallery_filtersStrictSwitch = ({gallerySlice}: ReduxState): GallerySliceData['filtersStrictSwitch'] => gallerySlice.filtersStrictSwitch


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
