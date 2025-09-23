import IconButton from '@mui/material/IconButton';
import {getAppIcon} from '../../../domain/app-icons/adapters/MuiIcons.adapter';
import {ROUTES_FRONT} from '../../../READONLY-shared-kernel/domain/routing/routing.config';
import {useAppSelector} from '../../../application/store/store';
import {STORE_SEL_user_currentUser} from '../../../domain/user/user.read';
import {useCallback} from 'react';
import {ROUTES_FRONT_PATH} from '../../../READONLY-shared-kernel/domain/routing/routing.types';
import {useRouter} from 'next/router';
import Box from '@mui/material/Box';
import {CircularProgress} from '@mui/material';


type Props = {
  loading?: boolean
}

export const AccountIconAtom = ({loading}: Props) => {
  const router = useRouter()

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)


  const onClickCallback = useCallback(async () => {
    if (loading) {
      return void undefined
    } else {
      const route: ROUTES_FRONT_PATH = currentUser?.user_id ? ROUTES_FRONT.USER_ACCOUNT : ROUTES_FRONT.USER_LOG
      await router.push(route)
    }
  }, [currentUser?.user_id, loading, router])


  return <Box sx={{
    position: 'relative',
    transition: 'filter 150ms ease-out',
    filter: loading ? 'saturate(0.3)' : 'unset'
  }}>

    <IconButton
      onClick={onClickCallback}
      disabled={loading}
      aria-label="account of current user"
      color="inherit"
    >

      {getAppIcon.Account({variant: 'contained'})}

    </IconButton>

    {loading && (<Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
      }}>
      <CircularProgress
        color={'primary'}
        size={26}
        thickness={4}
      />
    </Box>)}

  </Box>
}
