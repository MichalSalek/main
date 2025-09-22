import {useCallback, useState} from 'react';
import {turnOnAppBusyLoader, turnOnViewLoader} from '../../application/app-loaders/appLoaders.possibilities.api';

export const useAppRefreshHook = () => {

  const [isRefreshingApplication, setIsRefreshingApplication] = useState<boolean>(false)

  const refreshApplicationCallback = useCallback(() => {
    setIsRefreshingApplication(true)
    turnOnViewLoader()
    turnOnAppBusyLoader()
    setTimeout(() => {
      setIsRefreshingApplication(false)
      location.replace('/')
    }, 0)
  }, [])

  return {refreshApplicationCallback, isRefreshingApplication} as const
}
