import {ValueOf} from '@msalek/utils'
import {DataPassedBetweenViewsConfig} from './dataBetweenViews.config'


export type DataBetweenViewsKeysType = ValueOf<(typeof DataPassedBetweenViewsConfig.KEYS)>
