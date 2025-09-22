import {createContext} from 'react'
import {AppDynamicMenuButton} from './appDynamicMenu.types';


export type AppDynamicMenuContextType = {
  activeActionsButtons: AppDynamicMenuButton[]
  setActiveActionsButtons: (activeActionsButtons: AppDynamicMenuButton[]) => void
}

export const appDynamicMenuContextInitialValue: AppDynamicMenuContextType = {
  activeActionsButtons: [],
  setActiveActionsButtons: () => undefined
}

export const AppDynamicMenuContext = createContext<AppDynamicMenuContextType>(appDynamicMenuContextInitialValue)
