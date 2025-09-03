import * as React from "react";
import {ReactNode, useCallback, useEffect, useState} from "react";
import {STYLES_POLICY} from "../../../READONLY-shared-kernel/policies/styles.policy";
import {Button, Stack, Typography} from "@mui/material";
import {freezeThreadAndWait} from "@msalek/utils";

type Props = {
  title: string
  action: () => void
  icon: ReactNode
}

export const ActionButtonAtom = (props: Props) => {

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
      border: `2px solid ${STYLES_POLICY.accentColor[0]}`,
      transform: `translateY( calc( -${STYLES_POLICY.appBarDimension} / 3 ) )`,
      background: buttonTransitionAnimationState ? STYLES_POLICY.accentColor[0] : STYLES_POLICY.backgroundAccentColor[0],
      padding: STYLES_POLICY.spacing[0],
      '&:hover': {
        background: buttonTransitionAnimationState ? STYLES_POLICY.accentColor[0] : STYLES_POLICY.backgroundAccentColor[0]
      }
    }}

    onClick={props.action}
  >
    <Stack sx={{
      filter: buttonTransitionAnimationState ? 'brightness(10) saturate(0)' : undefined,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    }}>
      {props.icon}
      <Typography variant={'caption'}
                  sx={{display: 'block', color: STYLES_POLICY.accentColor[1]}}>{props.title}</Typography>
    </Stack></Button>
}