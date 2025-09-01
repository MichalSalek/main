import * as React from 'react'
import {ReactElement, useCallback, useContext, useEffect, useState} from 'react'
import {BottomNavigation, Button, Stack, Typography} from "@mui/material";
import {AppDynamicMenuContext} from "../../../application/app-dynamic-menu/appDynamicMenu.context";
import {STYLES_POLICY} from '../../../READONLY-shared-kernel/policies/styles.policy';
import {freezeThreadAndWait} from "@msalek/utils";


export const DynamicMenuActionButtonsMolecule = (): ReactElement => {

  const {activeActionsButtons} = useContext(AppDynamicMenuContext)

  const [buttonTransitionAnimationState, setButtonTransitionAnimationState] = useState<boolean>(false)

  const clickNavigationSideEffectCallback = useCallback(async () => {
    setButtonTransitionAnimationState(true)
    await freezeThreadAndWait(300)
    setButtonTransitionAnimationState(false)
  }, [])

  useEffect(() => {
    void clickNavigationSideEffectCallback()
  }, [activeActionsButtons, clickNavigationSideEffectCallback])

  return <>

    <Stack sx={{
      flex: 30,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <BottomNavigation>
        {activeActionsButtons.map((el) => {
          return <Button
            disabled={buttonTransitionAnimationState}
            key={el.title}
            variant={'outlined'}
            sx={{
              alignItems: 'center',
              minWidth: STYLES_POLICY.appBarDimension,
              width: '80px',
              height: STYLES_POLICY.appBarDimension,
              borderRadius: STYLES_POLICY.borderRadius[2],
              margin: 'auto',
              border: `2px solid ${STYLES_POLICY.accentColor[0]}`,
              transform: `translateY( calc( -${STYLES_POLICY.appBarDimension} / 3 ) )`,
              background: buttonTransitionAnimationState ? STYLES_POLICY.accentColor[0] : STYLES_POLICY.backgroundAccentColor[0],
              padding: STYLES_POLICY.spacing[0],
              '&:hover': {
                background: buttonTransitionAnimationState ? STYLES_POLICY.accentColor[0] : STYLES_POLICY.backgroundAccentColor[0]
              }
            }}

            onClick={el.action}
          >
            <Stack sx={{
              filter: buttonTransitionAnimationState ? 'brightness(10) saturate(0)' : undefined,
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}>
              {el.icon}
              <Typography variant={'caption'}
                          sx={{display: 'block', color: STYLES_POLICY.accentColor[1]}}>{el.title}</Typography>
            </Stack></Button>
        })}


      </BottomNavigation>
    </Stack>

  </>
}


