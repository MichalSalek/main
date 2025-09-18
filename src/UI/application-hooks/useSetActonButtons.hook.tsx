import {useContext, useEffect} from "react";
import {AppDynamicMenuContext} from "../../application/app-dynamic-menu/appDynamicMenu.context";

export const useSetActonButtonsHook = () => {

  const {setActiveActionsButtons} = useContext(AppDynamicMenuContext)


  useEffect(() => {
    return () => {
      setActiveActionsButtons([])
    }
  }, [setActiveActionsButtons])


  return setActiveActionsButtons
}
