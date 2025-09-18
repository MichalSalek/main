import {APP_LOADER} from './appLoader'
import {VIEW_LOADER} from "./viewLoader";
import {BUSY_LOADER} from "./busyLoader";


//
// Store memo check first for better optimization.

export const turnOnAppLoader = APP_LOADER.turnOnLoading
export const turnOffAppLoader = APP_LOADER.turnOffLoading

export const turnOnViewLoader = VIEW_LOADER.turnOnLoading
export const turnOffViewLoader = VIEW_LOADER.turnOffLoading

export const turnOnAppBusyLoader = BUSY_LOADER.turnOnLoading
export const turnOffAppBusyLoader = BUSY_LOADER.turnOffLoading
