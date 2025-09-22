import {Box, Button, SwipeableDrawer} from '@mui/material'
import * as React from 'react'
import {ReactElement, useCallback, useMemo, useState} from 'react'
import {DrawerToggleMenu} from './drawer.types';
import {DrawerListItems} from './DrawerListItems.molecule';
import {STYLES_POLICY} from '../../../../READONLY-shared-kernel/policies/styles.policy';
import {getAppIcon} from '../../../../domain/app-icons/adapters/MuiIcons.adapter';


const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

export const DrawerOrganism = (): ReactElement => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const OpenMenuButton = useMemo<ReactElement>(() => {
    return <Box sx={{position: 'relative', display: 'flex'}}>

      {getAppIcon.HamburgerClosed({
        sx: {
          transition: 'opacity 100ms ease',
          opacity: isMenuOpen ? 0 : 1
        }
      })}
      {getAppIcon.HamburgerOpen({
        sx: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transition: 'opacity 100ms ease',
          opacity: isMenuOpen ? 1 : 0
        }
      })}

    </Box>
  }, [isMenuOpen])

  const toggleMenuCallback = useCallback<DrawerToggleMenu>(
    (shouldBeOpen) => {
      return (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return void undefined
        }
        setIsMenuOpen((prevState => shouldBeOpen ? shouldBeOpen : !prevState))
      }
    }, [])


  return <>
    <SwipeableDrawer
      anchor={'bottom'}
      open={isMenuOpen}
      onClose={toggleMenuCallback(false)}
      onOpen={toggleMenuCallback(true)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      swipeAreaWidth={0}
    >

      <DrawerListItems toggleMenuCallback={toggleMenuCallback}/>


    </SwipeableDrawer>

    <Button
      sx={{
        minWidth: STYLES_POLICY.appBarDimension,
        flex: 1
      }}
      variant={'outlined'}
      onClick={toggleMenuCallback()}
    >{OpenMenuButton}</Button>
  </>
}
