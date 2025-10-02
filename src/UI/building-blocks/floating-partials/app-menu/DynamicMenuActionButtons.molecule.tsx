import * as React from 'react'
import {ReactElement, useContext} from 'react'
import {BottomNavigation, Stack} from '@mui/material';
import {AppDynamicMenuContext} from '../../../../application/app-dynamic-menu/appDynamicMenu.context';
import {ActionButtonAtom} from './ActionButton.atom';
import {STYLES_POLICY} from '../../../styles/styles.policy';


export const DynamicMenuActionButtonsMolecule = (): ReactElement => {

  const {activeActionsButtons} = useContext(AppDynamicMenuContext)

  return <Stack sx={{
    flex: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }}>
    <BottomNavigation sx={{
      gap: STYLES_POLICY.spacing[1]
    }}>
      {activeActionsButtons.map((el) => {
        return <ActionButtonAtom title={el.title} action={el.action} icon={el.icon} key={el.title}/>
      })}
    </BottomNavigation>
  </Stack>

}
