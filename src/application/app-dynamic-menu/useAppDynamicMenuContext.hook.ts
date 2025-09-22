import {useState} from 'react'
import {AppDynamicMenuContextType} from './appDynamicMenu.context';


export const useAppDynamicMenuContext = (): AppDynamicMenuContextType => {

  const [activeActionsButtons, setActiveActionsButtons] = useState<AppDynamicMenuContextType['activeActionsButtons']>([])

  return (
    {
      activeActionsButtons,
      setActiveActionsButtons
    })
}
