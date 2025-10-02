import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {useAppSelector} from '../../../application/store/store';
import {STORE_SEL_appLoaders_isSessionChecking} from '../../../application/app-loaders/appLoaders.read';
import {LogoAtom} from '../_wide-use-components/logo/Logo.atom';
import {NotLoggedToolbarMolecule} from './NotLoggedToolbar.molecule';
import {LoggedToolbarMolecule} from './LoggedToolbar.molecule';
import {AccountIconAtom} from './AccountIcon.atom';
import {STORE_SEL_user_currentUser} from '../../../domain/user/user.read';
import {theme} from '../../styles/theme';
import {STYLES_POLICY} from '../../styles/styles.policy';


export const AppBarOrganism = () => {

  const isSessionChecking = useAppSelector(STORE_SEL_appLoaders_isSessionChecking)

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)


  return <AppBar
    sx={{
      height: STYLES_POLICY.appBarDimension,
      border: 'unset',
      flexDirection: 'row',
      justifyContent: 'space-between',
      background: theme.palette.background.default,
      alignItems: 'center',
      minWidth: '100%',
      position: 'sticky',
      top: 0
    }}
  >

    <LogoAtom/>

    <Toolbar>

      {currentUser?.user_id ?

        <LoggedToolbarMolecule/>

        :

        <NotLoggedToolbarMolecule/>

      }

      <AccountIconAtom loading={isSessionChecking}/>

    </Toolbar>
  </AppBar>
}
