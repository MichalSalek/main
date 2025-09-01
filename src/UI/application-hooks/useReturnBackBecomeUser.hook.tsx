import {useCallback, useMemo} from "react";
import {useAppSelector} from "../../application/store/store";
import {STORE_SEL_user_currentUser} from "../../domain/user/user.read";
import {getFromClientStorage} from "../../application/client-device-storage/clientStorage.possibilities.api";
import {CUSTOM_HEADERS} from "../../READONLY-shared-kernel/domain/http/http.config";
import {switchBackUser_IO} from "../../domain/admin/adminActionsIO.possibilities.api";

export const useReturnBackBecomeUserHook = () => {


  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  const isCurrentSessionBecomeUserSession = useMemo(
    () => {
      void currentUser
      return !!getFromClientStorage({key: CUSTOM_HEADERS['becomeUser']})
    },
    [currentUser])

  const returnBackBecomeUserCallback = useCallback(
    async () => {

      await switchBackUser_IO(
        undefined,
        async (response) => {

        },
        async (error) => {
        })

    },
    [])


  return {returnBackBecomeUserCallback, isCurrentSessionBecomeUserSession} as const
}
