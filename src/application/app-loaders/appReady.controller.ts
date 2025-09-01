import {reduxStore} from '../store/store'
import {STORE_SET_appLoaders_isAppReady} from './appLoaders.slice'


export const initappLoadersController = () => {
  reduxStore.dispatch(STORE_SET_appLoaders_isAppReady(true))
}
