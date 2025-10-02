import {Box, Button, Container} from '@mui/material'
import * as React from 'react'
import {ReactElement, useCallback} from 'react'
import {theme} from '../../../styles/theme';
import {DrawerOrganism} from './drawer/Drawer.organism';
import {DynamicMenuActionButtonsMolecule} from './DynamicMenuActionButtons.molecule';
import {STYLES_POLICY} from '../../../styles/styles.policy';
import {getAppIcon} from '../../../../domain/app-icons/adapters/MuiIcons.adapter';
import {redirectToAction} from '../../../../domain/redirections-and-routing/redirections.operations.api';
import {ROUTES_FRONT} from '../../../../READONLY-shared-kernel/domain/routing/routing.config';


export const AppMenuOrganism = (): ReactElement => {


  const onClickHomeCallback = useCallback(() => {
    void redirectToAction({
      routePath: ROUTES_FRONT.HOME
    })
  }, [])


  return <Box
    component={'nav'}
    sx={{
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      background: theme.palette.background.default,
      width: '100%',
      display: 'flex',

      borderTop: `2px solid ${theme.palette.divider}`,
      justifyContent: 'space-between',
      height: STYLES_POLICY.appBarDimension,
      zIndex: theme.zIndex.drawer + 1,
    }}>

    <Container sx={{
      display: 'flex',
      justifyContent: 'space-between',
    }}>

      <Button
        sx={{
          minWidth: STYLES_POLICY.appBarDimension,
          flex: 1,
          visibility: 'hidden', // @TODO ukryty przycisk home, do rozpatrzenia
        }}
        variant={'outlined'}
        onClick={onClickHomeCallback}
      >{getAppIcon.Home()}</Button>

      <DynamicMenuActionButtonsMolecule/>

      <DrawerOrganism/>


    </Container>

  </Box>
}
