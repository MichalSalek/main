import {Typography} from '@mui/material'
import {ReactElement} from 'react'
import {ROUTES_FRONT} from '../../../READONLY-shared-kernel/domain/routing/routing.config'
import {LinkAtom} from '../_wide-use-components/Link.atom'


export const NoAccountOrganism = (): ReactElement => {

  return <>


    <Typography variant={'h1'}>
      Nie posiadasz jeszcze aktywnego planu
    </Typography>


    <LinkAtom route={ROUTES_FRONT.USER_ACCOUNT_PAY}>
      Aktywuj
    </LinkAtom>

  </>
}
