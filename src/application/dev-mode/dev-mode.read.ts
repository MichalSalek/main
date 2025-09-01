import {ReduxState} from '../store/store'


export type DevModeSliceData = {
  debugOn: boolean
}

export const initialDevModeSliceData: DevModeSliceData = {
  debugOn: false
}


export const STORE_SEL_devMode_debugOn = ({devModeSlice}: ReduxState): DevModeSliceData['debugOn'] => devModeSlice.debugOn
