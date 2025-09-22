import {Button, Stack, Typography} from '@mui/material'
import {useCallback} from 'react'
import {useAppSelector} from '../../../application/store/store'
import {refreshSession_IO} from '../../../domain/session/sessionIO.possibilities.api'
import {getDateForUI} from '../../features/UI.utils.api'
import {STORE_SEL_user_currentUser} from '../../../domain/user/user.read'
import {STYLES_POLICY} from '../../../READONLY-shared-kernel/policies/styles.policy';


export const SessionInfoMolecule = () => {
  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  const refreshSessionCallback = useCallback(
    () => {
      void refreshSession_IO(
        undefined,
        async (response) => {

        },
        async (error) => {
        })
    },
    [])

  return <Stack
    sx={{
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: STYLES_POLICY.spacing[1],
      alignItems: 'center',
      textAlign: 'right',
      visibility: currentUser?.user_id
        ? 'visible'
        : 'hidden'
    }}>
    <Stack>
      <Typography variant={'caption'}>Twoja sesja wygaśnie</Typography>
      <Typography variant={'caption'}>{getDateForUI(currentUser?.session?.expires_at)} </Typography>
    </Stack>
    <Stack>
      <Button
        size={'small'}
        sx={{fontSize: STYLES_POLICY.fontSize[0]}}
        variant={'outlined'}
        onClick={refreshSessionCallback}
        color={'inherit'}>
        Przedłuż
      </Button>
    </Stack>
  </Stack>
}
