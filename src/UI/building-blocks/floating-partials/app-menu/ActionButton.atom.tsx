import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {STYLES_POLICY} from '../../../styles/styles.policy';
import {Button, Stack, Typography} from '@mui/material';
import {freezeThreadAndWait} from '@msalek/utils';
import {AppDynamicMenuButton} from '../../../../application/app-dynamic-menu/appDynamicMenu.types';

export const ActionButtonAtom = (props: AppDynamicMenuButton) => {

  const [buttonTransitionAnimationState, setButtonTransitionAnimationState] = useState<boolean>(false)

  const clickNavigationSideEffectCallback = useCallback(async () => {
    setButtonTransitionAnimationState(true)
    await freezeThreadAndWait(150)
    setButtonTransitionAnimationState(false)
  }, [])

  useEffect(() => {
    void clickNavigationSideEffectCallback()
  }, [clickNavigationSideEffectCallback])


  return <Button
    disabled={buttonTransitionAnimationState}
    key={props.title}
    variant={'contained'}
    sx={{
      alignItems: 'center',
      minWidth: STYLES_POLICY.appBarDimension,
      width: '80px',
      height: STYLES_POLICY.appBarDimension,
      borderRadius: STYLES_POLICY.borderRadius[2],
      margin: 'auto',
      border: `1px solid ${STYLES_POLICY.backgroundColor[0]}`,
      transform: `translateY( calc( -${STYLES_POLICY.appBarDimension} / 3 ) )`,
      background: buttonTransitionAnimationState ? STYLES_POLICY.accentColor[0] : STYLES_POLICY.statusColors[3],
      padding: STYLES_POLICY.spacing[0],
      '&:hover': {
        background: buttonTransitionAnimationState ? STYLES_POLICY.accentColor[0] : STYLES_POLICY.statusColors[3]
      }
    }}

    onClick={props.action}
  >
    <Stack sx={{
      filter: buttonTransitionAnimationState ? 'brightness(10) saturate(0)' : undefined,
      height: '100%',
      textAlign: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      width: '100%',
    }}>
      {props.icon({color: 'inherit', fontSize: 'small'})}
      <Typography variant={'caption'}
                  sx={{display: 'block'}}>{props.title}</Typography>
    </Stack></Button>
}