import {userSlice} from '../../domain/user/user.slice'
import {appLoadersSlice} from '../app-loaders/appLoaders.slice'
import {appSnackbarSlice} from '../app-snackbar/appSnackbar.slice'
import {devModeSlice} from '../dev-mode/dev-mode.slice'
import {scrollPositionSlice} from '../scroll-position/scrollPosition.slice'
import {ReducerNames} from './store'
import {goBackSlice} from "../go-back-UI-action/goBack.slice";
import {gallerySlice} from "../../domain/gallery/gallery.slice";


export const reducers = {
  appLoadersSlice: appLoadersSlice.reducer,
  scrollPositionSlice: scrollPositionSlice.reducer,
  devModeSlice: devModeSlice.reducer,
  userSlice: userSlice.reducer,
  appSnackbarSlice: appSnackbarSlice.reducer,
  goBackSlice: goBackSlice.reducer,
  gallerySlice: gallerySlice.reducer
} as const


export const reducersToPersist: ReducerNames[] = [
  'scrollPositionSlice',
  'devModeSlice',
  'gallerySlice'
]
