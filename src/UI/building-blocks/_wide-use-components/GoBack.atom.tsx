import {Box, Button, Typography} from '@mui/material';
import {useCallback, useEffect, useState} from 'react';
import {useAppSelector} from '../../../application/store/store';
import {STORE_SEL_goBack_previousRoutes} from '../../../application/go-back-UI-action/goBack.read';
import {redirectToAction} from '../../../domain/redirections-and-routing/redirections.operations.api';
import {ROUTING_POLICY} from '../../../READONLY-shared-kernel/policies/routing.policy';
import {getAppIcon} from '../../../domain/app-icons/adapters/MuiIcons.adapter';
import scss from './atoms.module.scss'
import {STYLES_POLICY} from '../../styles/styles.policy';


export const GoBackAtom = () => {
  const previousRoutesNames = useAppSelector(STORE_SEL_goBack_previousRoutes)
  const veryPreviousRouteName = previousRoutesNames[0]

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (veryPreviousRouteName) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }

  }, [veryPreviousRouteName])

  const onClickHomeCallback = useCallback(async () => {
    const routePath = ROUTING_POLICY.utils.GET_ROUTE_FRONT_PATH(veryPreviousRouteName)

    if (routePath) {
      await redirectToAction({
        routePath
      })
    }
  }, [veryPreviousRouteName])

  return <Box
    sx={{
      transition: 'opacity 200ms ease-in-out',
      visibility: isVisible ? 'visible' : 'hidden'
    }}>
    <Button
      sx={{
        margin: 0,
        height: `calc(${STYLES_POLICY.goBackBarDimension} - 8px)`
      }}
      className={scss.goBackButton}
      onClick={onClickHomeCallback}
      variant={'outlined'}
      size={'small'}
      startIcon={getAppIcon.Back()}>
      <Typography variant={'overline'}>{veryPreviousRouteName}</Typography>
    </Button>
  </Box>
}
