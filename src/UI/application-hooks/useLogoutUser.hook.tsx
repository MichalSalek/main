import {useCallback, useState} from 'react';
import {logoutUser_IO} from '../../domain/user/userIO.possibilities.api';

export const useLogoutUserHook = () => {

  const [logoutButtonLoadingState, setLogoutButtonLoadingState] = useState<boolean>(false)

  const logoutUserCallback = useCallback(
    () => {
      setLogoutButtonLoadingState(true)
      void logoutUser_IO(
        undefined,
        async (res) => {
          setLogoutButtonLoadingState(false)
        },
        async (error) => {
          setLogoutButtonLoadingState(false)
        })
    },
    [])

  return {logoutUserCallback, logoutButtonLoadingState} as const
}
