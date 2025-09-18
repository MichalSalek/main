import {freezeThreadAndWait} from '@msalek/utils'
import {CSSProperties, ReactElement, useCallback, useContext, useEffect, useState} from 'react'
import {AdminContext} from '../../../../domain/admin/admin.context'
import {
  deleteUserAny_IO,
  disableUserAny_IO,
  enableUserAny_IO
} from '../../../../domain/admin/adminActionsIO.possibilities.api'
import {deleteSessionAll_IO} from '../../../../domain/session-actions/sessionIO.possibilities.api'
import {getAndUpdateAppUsersList_IO} from '../../../../domain/user/userIO.operations.api'
import {UserNoSensitiveWithRelationsExtended} from '../../../../READONLY-shared-kernel/models/user/user.types'
import {PERMISSIONS_POLICY} from '../../../../READONLY-shared-kernel/policies/permissions.policy'
import {ConfirmButtonAtom} from '../../_wide-use-components/ConfirmButton.atom'


export const ActionButtonsMolecule = ({user}: {
  user: UserNoSensitiveWithRelationsExtended
}): ReactElement => {
  const [disabledAllActions, setDisabledAllActions] = useState<boolean>(false)

  useEffect(
    () => {
      setDisabledAllActions(PERMISSIONS_POLICY.utils.IS_ADMIN(user))
    },
    [user,
      user.role])

  const buttonActionGate = useCallback(
    async (exe: () => Promise<void>) => {
      setDisabledAllActions(true)
      await exe()
      await freezeThreadAndWait(400)
      setDisabledAllActions(false)
    },
    [])


  const [disabledActivationUserAction, setDisabledActivationUserAction] = useState<boolean>(user.is_active)

  useEffect(
    () => {
      setDisabledActivationUserAction(user.is_active)
    },
    [user.is_active])


  const {updateAppUsers} = useContext(AdminContext)


  const deactivateCallback = useCallback(
    async () => {

      await disableUserAny_IO(
        {user_id: user.user_id},
        async (response) => {
          updateAppUsers()
          setDisabledActivationUserAction(false)
        },
        async (error) => {
        })
    },
    [updateAppUsers,
      user.user_id])


  const activateCallback = useCallback(
    async () => {

      await enableUserAny_IO(
        {user_id: user.user_id},
        async (response) => {
          updateAppUsers()
          setDisabledActivationUserAction(true)
        },
        async (error) => {
        })
    },
    [updateAppUsers,
      user.user_id])


  const [disabledLogoutUserAction, setDisabledLogoutUserAction] = useState<boolean>(user.sessions.length === 0)

  useEffect(
    () => {
      setDisabledLogoutUserAction(user.sessions.length === 0)
    },
    [user.sessions.length])


  const logoutCallback = useCallback(
    async () => {

      await deleteSessionAll_IO(
        {user_id: user.user_id},
        async (response) => {
          updateAppUsers()
          setDisabledLogoutUserAction(true)

          await getAndUpdateAppUsersList_IO(
            undefined,
            async (response) => {
            },
            async (error) => {
            })

        },
        async (error) => {
        })
    },
    [updateAppUsers,
      user.user_id])


  const deleteUser4EverCallback = useCallback(
    async () => {
      void deleteUserAny_IO(
        {
          user_id: user.user_id
        },
        async (response) => {
          updateAppUsers()

        },
        async (error) => {
        })
    },
    [updateAppUsers,
      user.user_id])


  const buttonStyle: CSSProperties = {
    minWidth: '100px',
    height: '20px',
    opacity: '0.9'
  }


  return <>

    <ConfirmButtonAtom
      passProps={{
        disabled: disabledLogoutUserAction,
        color: 'primary',
        sx: buttonStyle
      }}
      actionText={'Wyloguj'}
      actionCallback={() => buttonActionGate(logoutCallback)}
    />

    <ConfirmButtonAtom
      passProps={{
        disabled: disabledActivationUserAction || disabledAllActions,
        color: 'success',
        sx: buttonStyle
      }}
      actionText={'Aktywuj'}
      actionCallback={() => buttonActionGate(activateCallback)}
    />

    <ConfirmButtonAtom
      passProps={{
        disabled: !disabledActivationUserAction || disabledAllActions,
        color: 'primary',
        sx: buttonStyle
      }}
      actionText={'Dezaktywuj'}
      actionCallback={() => buttonActionGate(deactivateCallback)}
    />

    <ConfirmButtonAtom
      passProps={{
        disabled: disabledAllActions,
        sx: buttonStyle
      }}
      actionText={'Usuń 4ever'}
      actionCallback={() => buttonActionGate(deleteUser4EverCallback)}
    />
  </>
}

