import {Container, Paper} from '@mui/material'
import * as React from 'react'
import {ReactElement, useMemo} from 'react'
import {useAppSelector} from '../../../../../application/store/store';
import {STORE_SEL_user_currentUser} from '../../../../../domain/user/user.read';
import {DrawerToggleMenu} from './drawer.types';
import {DrawerListItemsApp} from './DrawerListItemsApp.molecule';
import {DrawerListItemsStatic} from './DrawerListItemsStatic.molecule';


type Props = {
  toggleMenuCallback: DrawerToggleMenu
}
export const DrawerListContainer = ({toggleMenuCallback}: Props): ReactElement => {

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  const getDrawerListContent = useMemo<ReactElement>(() => {

    if (currentUser?.user_id) {
      return <DrawerListItemsApp/>
    } else {
      return <DrawerListItemsStatic/>
    }

  }, [currentUser])

  return <Paper
    role="presentation"
    onClick={toggleMenuCallback(false)}
    onKeyDown={toggleMenuCallback(false)}
    sx={{minWidth: '100%'}}
  >

    <Container>

      {getDrawerListContent}

    </Container>

  </Paper>
}
