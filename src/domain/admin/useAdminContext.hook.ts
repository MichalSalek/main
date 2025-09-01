import {useCallback, useState} from 'react'
import {useAppSelector} from '../../application/store/store'
import {PERMISSIONS_POLICY} from '../../READONLY-shared-kernel/policies/permissions.policy'
import {STORE_SEL_user_currentUser} from '../user/user.read'
import {getAndUpdateAppUsersList_IO} from '../user/userIO.operations.api'
import {AdminContextType} from './admin.context'


export const useAdminContext = (): AdminContextType => {

  const [appUsers, setAppUsers] = useState<AdminContextType['appUsers']>([])

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)


  const updateAppUsers = useCallback(
    async () => {
      if (!PERMISSIONS_POLICY.utils.IS_ADMIN(currentUser)) {
        return void undefined
      }

      await getAndUpdateAppUsersList_IO(
        undefined,
        async (response) => {
          setAppUsers(response.data)
        },
        async (error) => {
        })
    },
    [currentUser])


  return (
    {
      appUsers,
      setAppUsers,
      updateAppUsers
    })
}
