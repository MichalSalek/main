import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material'
import * as React from 'react'
import {ReactElement} from 'react'
import {ROUTES_FRONT} from '../../../../../READONLY-shared-kernel/domain/routing/routing.config';
import {LinkAtom} from '../../../_wide-use-components/Link.atom';
import {getAppIcon} from '../../../../../domain/app-icons/adapters/MuiIcons.adapter';
import {clickableElementCss, menuIconFontSize, setPaddingCss} from './drawer.style';


export const DrawerListItemsStatic = (): ReactElement => {

  return <List>


    <ListItem disablePadding>

      <LinkAtom passPropsToLink={{style: clickableElementCss}} omitButtonElement={true}
                route={ROUTES_FRONT.HOME}>

        <ListItemButton sx={setPaddingCss}>

          <ListItemIcon>
            {getAppIcon.Home({fontSize: menuIconFontSize})}
          </ListItemIcon>
          <ListItemText primary={<Typography variant={'button'}>Home</Typography>}/>

        </ListItemButton>

      </LinkAtom>

    </ListItem>


    <ListItem disablePadding>

      <LinkAtom passPropsToLink={{style: clickableElementCss}} omitButtonElement={true}
                route={ROUTES_FRONT.PRICING}>

        <ListItemButton sx={setPaddingCss}>

          <ListItemIcon>
            {getAppIcon.Heart({fontSize: menuIconFontSize, color: 'error'})}
          </ListItemIcon>
          <ListItemText primary={<Typography variant={'button'}>Wybierz plan dla siebie</Typography>}/>

        </ListItemButton>

      </LinkAtom>

    </ListItem>


    <ListItem disablePadding>

      <LinkAtom passPropsToLink={{style: clickableElementCss}} omitButtonElement={true}
                route={ROUTES_FRONT.FEATURES}>

        <ListItemButton sx={setPaddingCss}>

          <ListItemIcon>
            {getAppIcon.Features({fontSize: menuIconFontSize, color: 'warning'})}
          </ListItemIcon>
          <ListItemText primary={<Typography variant={'button'}>Odkryj możliwości</Typography>}/>

        </ListItemButton>

      </LinkAtom>

    </ListItem>


    <ListItem disablePadding>

      <LinkAtom passPropsToLink={{style: clickableElementCss}} omitButtonElement={true}
                route={ROUTES_FRONT.USER_LOG}>

        <ListItemButton sx={setPaddingCss}>

          <ListItemIcon>
            {getAppIcon.Account({fontSize: menuIconFontSize})}
          </ListItemIcon>
          <ListItemText primary={<Typography variant={'button'}>Zaloguj się</Typography>}/>

        </ListItemButton>

      </LinkAtom>

    </ListItem>


    <ListItem disablePadding>

      <LinkAtom passPropsToLink={{style: clickableElementCss}} omitButtonElement={true}
                route={ROUTES_FRONT.CONTACT}>

        <ListItemButton sx={setPaddingCss}>

          <ListItemIcon>
            {getAppIcon.Contact({fontSize: menuIconFontSize})}
          </ListItemIcon>
          <ListItemText primary={<Typography variant={'button'}>Kontakt</Typography>}/>

        </ListItemButton>

      </LinkAtom>

    </ListItem>


  </List>
}
