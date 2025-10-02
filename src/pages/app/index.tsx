import {Box, Typography} from '@mui/material'
import {useAppSelector} from '../../application/store/store'
import {STORE_SEL_user_currentUser} from '../../domain/user/user.read'
import {ROUTES_FRONT} from '../../READONLY-shared-kernel/domain/routing/routing.config'
import {USER_POLICY} from '../../READONLY-shared-kernel/policies/user.policy'
import {LinkAtom} from '../../UI/building-blocks/_wide-use-components/Link.atom'
import {getEnvironmentMode} from '../../application/environment/environment.utils.api';
import {getRoleUI} from '../../UI/building-blocks/account-and-user-operations/userAndAccountUI.api';
import {STYLES_POLICY} from '../../UI/styles/styles.policy';


export default function Home() {
  const currentUser = useAppSelector(STORE_SEL_user_currentUser)


  return (
    <Box sx={{
      padding: STYLES_POLICY.spacing[3]
    }}>
      <Typography variant={'h3'}>
        środowisko: {getEnvironmentMode()}
      </Typography>


      {USER_POLICY.utils.IS_USER_NEED_TO_PAY_TO_ACTIVATE_ACCOUNT(currentUser) && <>
          <Typography variant={'h3'}>
              Opłać konto by w pełni korzystać z usług.
          </Typography>
          <LinkAtom route={ROUTES_FRONT.USER_ACCOUNT}>Opłać</LinkAtom>
      </>}


      <Typography variant={'h1'}>
        Główne okno aplikacji
      </Typography>

      <Typography variant={'body1'}>
        Zalogowano jako: {currentUser?.email}
      </Typography>


      <Typography variant={'body1'}>
        Twoja rola: {getRoleUI(currentUser?.role)}
      </Typography>

      {USER_POLICY.utils.IS_USER_HAS_ACTIVE_ACCOUNT(currentUser) ?
        <LinkAtom route={ROUTES_FRONT.GALLERY_UPLOAD_ASSET} passPropsToButton={{variant: 'contained'}}>
          <Typography variant={'caption'}>Dodaj nowe zdjęcie</Typography>
        </LinkAtom> : undefined
      }

      {USER_POLICY.utils.IS_USER_HAS_ACTIVE_ACCOUNT(currentUser) ?
        <LinkAtom route={ROUTES_FRONT.GALLERY} passPropsToButton={{variant: 'contained'}}>
          <Typography variant={'caption'}>Idź do galerii</Typography>
        </LinkAtom> : undefined
      }

    </Box>)
}


export async function getStaticProps() {
  return {
    props: {}
  }
}

