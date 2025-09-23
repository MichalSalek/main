import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material'
import * as React from 'react'
import {ReactElement} from 'react'
import {useAppSelector} from '../../../../../application/store/store';
import {STORE_SEL_user_currentUser} from '../../../../../domain/user/user.read';
import {useLogoutUserHook} from '../../../../application-hooks/useLogoutUser.hook';
import {PERMISSIONS_POLICY} from '../../../../../READONLY-shared-kernel/policies/permissions.policy';
import {ROUTES_FRONT} from '../../../../../READONLY-shared-kernel/domain/routing/routing.config';
import {LinkAtom} from '../../../_wide-use-components/Link.atom';
import {SessionInfoMolecule} from '../../../_wide-use-components/SessionInfo.molecule';
import {useAppRefreshHook} from '../../../../application-hooks/useAppRefresh.hook';
import {useReturnBackBecomeUserHook} from '../../../../application-hooks/useReturnBackBecomeUser.hook';
import {getAppIcon} from '../../../../../domain/app-icons/adapters/MuiIcons.adapter';
import {USER_POLICY} from '../../../../../READONLY-shared-kernel/policies/user.policy';
import {clickableElementCss, menuIconFontSize, setPaddingCss} from './drawer.style';


export const DrawerListItemsApp = (): ReactElement => {

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  const {logoutButtonLoadingState, logoutUserCallback} = useLogoutUserHook()

  const {refreshApplicationCallback, isRefreshingApplication} = useAppRefreshHook()

  const {returnBackBecomeUserCallback, isCurrentSessionBecomeUserSession} = useReturnBackBecomeUserHook()


  return <List>

    <SessionInfoMolecule/>

    {PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
        currentUser?.role,
        ROUTES_FRONT.APP) &&

        <ListItem disablePadding>

            <LinkAtom passPropsToLink={{style: clickableElementCss}} omitButtonElement={true}
                      route={ROUTES_FRONT.APP}>

                <ListItemButton sx={setPaddingCss}>

                    <ListItemIcon>
                      {getAppIcon.Home({fontSize: menuIconFontSize})}
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant={'button'}>Dashboard</Typography>}/>

                </ListItemButton>

            </LinkAtom>

        </ListItem>
    }

    {USER_POLICY.utils.IS_USER_HAS_ACTIVE_ACCOUNT(currentUser) ? <>
      <Divider/>


      {PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
          currentUser?.role,
          ROUTES_FRONT.GALLERY_UPLOAD_ASSET) &&

          <ListItem disablePadding>

              <LinkAtom passPropsToLink={{style: clickableElementCss}} omitButtonElement={true}
                        route={ROUTES_FRONT.GALLERY_UPLOAD_ASSET}>

                  <ListItemButton sx={setPaddingCss}>

                      <ListItemIcon>
                        {getAppIcon.AddPhoto({fontSize: menuIconFontSize, color: 'warning'})}
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant={'button'}>Dodaj nowy obraz</Typography>}/>

                  </ListItemButton>

              </LinkAtom>

          </ListItem>
      }


      {PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
          currentUser?.role,
          ROUTES_FRONT.GALLERY) &&

          <ListItem disablePadding>

              <LinkAtom passPropsToLink={{style: clickableElementCss}} omitButtonElement={true}
                        route={ROUTES_FRONT.GALLERY}>

                  <ListItemButton sx={setPaddingCss}>

                      <ListItemIcon>
                        {getAppIcon.Photos({fontSize: menuIconFontSize, color: 'warning'})}
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant={'button'}>Galeria</Typography>}/>

                  </ListItemButton>

              </LinkAtom>

          </ListItem>
      }

    </> : undefined}

    <Divider/>


    {PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
        currentUser?.role,
        ROUTES_FRONT.USER_ACCOUNT) &&

        <ListItem disablePadding>

            <LinkAtom passPropsToLink={{style: clickableElementCss}} omitButtonElement={true}
                      route={ROUTES_FRONT.USER_ACCOUNT}>

                <ListItemButton sx={setPaddingCss}>

                    <ListItemIcon>
                      {getAppIcon.Account({fontSize: menuIconFontSize})}
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant={'button'}>Konto</Typography>}/>

                </ListItemButton>

            </LinkAtom>

        </ListItem>
    }


    {PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
        currentUser?.role,
        ROUTES_FRONT.ADMIN) &&

        <ListItem disablePadding>

            <LinkAtom passPropsToLink={{style: clickableElementCss}} omitButtonElement={true}
                      route={ROUTES_FRONT.ADMIN}>

                <ListItemButton sx={setPaddingCss}>

                    <ListItemIcon>
                      {getAppIcon.Admin({fontSize: menuIconFontSize, color: 'warning'})}
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant={'button'}>Admin panel</Typography>}/>

                </ListItemButton>

            </LinkAtom>

        </ListItem>
    }


    {PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_EVENT(
        currentUser,
        'SWITCH_BACK_BECOME_USER') &&
      isCurrentSessionBecomeUserSession &&
        <ListItem disablePadding>
            <ListItemButton sx={{...setPaddingCss, ...clickableElementCss}}
                            onClick={returnBackBecomeUserCallback}
                            disabled={false}>
                <ListItemIcon>
                  {getAppIcon.HistoryBack({fontSize: menuIconFontSize, color: 'warning'})}
                </ListItemIcon>
                <ListItemText primary={<Typography variant={'button'}>Powróć do poprzedniej sesji</Typography>}/>
            </ListItemButton>
        </ListItem>
    }


    <Divider/>


    {PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_EVENT(
        currentUser,
        'SESSION_REFRESH') &&

        <ListItem disablePadding>
            <ListItemButton sx={{...setPaddingCss, ...clickableElementCss}}
                            onClick={refreshApplicationCallback}
                            disabled={isRefreshingApplication}>
                <ListItemIcon>
                  {getAppIcon.Refresh({fontSize: menuIconFontSize, color: 'info'})}
                </ListItemIcon>
                <ListItemText primary={<Typography variant={'button'}>Odśwież aplikację</Typography>}/>
            </ListItemButton>
        </ListItem>
    }

    {PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_EVENT(
        currentUser,
        'USER_LOGOUT') &&

        <ListItem disablePadding>
            <ListItemButton sx={{...setPaddingCss, ...clickableElementCss}}
                            onClick={logoutUserCallback}
                            disabled={logoutButtonLoadingState}>
                <ListItemIcon>
                  {getAppIcon.Logout({fontSize: menuIconFontSize, color: 'error'})}
                </ListItemIcon>
                <ListItemText primary={<Typography variant={'button'}>Wyloguj się</Typography>}/>
            </ListItemButton>
        </ListItem>
    }


  </List>
}
