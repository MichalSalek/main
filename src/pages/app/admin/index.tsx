import {Stack, Typography} from '@mui/material'
import {ROUTES_FRONT} from "../../../READONLY-shared-kernel/domain/routing/routing.config";
import {LinkAtom} from "../../../UI/building-blocks/_wide-use-components/Link.atom";
import {AdminSimpleBox} from "../../../UI/building-blocks/admin/AdminSimpleBox.atom";
import {DebugModeFrontendSwitch} from "../../../UI/building-blocks/admin/DebugModeFrontendSwitch.atom";
import {DebugModeBackendSwitch} from "../../../UI/building-blocks/admin/DebugModeBackendSwitch.atom";
import {DebugDBModeBackendSwitch} from "../../../UI/building-blocks/admin/DebugDBModeBackendSwitch.atom";
import {AppConnectionChecker} from "../../../UI/building-blocks/admin/AppConnectionChecker.molecule";


export default function Index() {

  return (<>

    <Typography variant={'h1'}>
      ADMIN
    </Typography>

    <Stack sx={{
      gap: 5
    }}>

      <AdminSimpleBox title={'Admin app-menu'}>
        <LinkAtom route={ROUTES_FRONT.ADMIN_USERS} passPropsToButton={{variant: 'contained'}}>
          Users
        </LinkAtom>
        <LinkAtom route={ROUTES_FRONT.ADMIN_NOTES} passPropsToButton={{variant: 'contained'}}>
          Notes
        </LinkAtom>
        <LinkAtom route={ROUTES_FRONT.ADMIN_POLITICS} passPropsToButton={{variant: 'contained'}}>
          Politics
        </LinkAtom>
      </AdminSimpleBox>

    </Stack>

    <br/> <br/> <br/> <br/>

    <Stack
      sx={{
        columnGap: 2,
        rowGap: 8,
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}>

      <AdminSimpleBox title={'Frontend debug mode'}>
        <DebugModeFrontendSwitch/>
      </AdminSimpleBox>

      <AdminSimpleBox title={'Backend debug mode'}>
        <DebugModeBackendSwitch/>
      </AdminSimpleBox>

      <AdminSimpleBox title={'Backend DB debug mode'}>
        <DebugDBModeBackendSwitch/>
      </AdminSimpleBox>

      <AdminSimpleBox title={'Check apps connection'}>
        <AppConnectionChecker/>
      </AdminSimpleBox>

    </Stack>

  </>)
}


