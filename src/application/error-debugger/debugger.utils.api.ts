import {reduxStore} from '../store/store'


export const __debuggerGate = (evalOnDebugMode: () => void): void => {
  if (reduxStore.getState().devModeSlice?.debugOn) {
    evalOnDebugMode()
  }
}
