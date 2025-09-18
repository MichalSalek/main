import {ReactElement, useCallback} from "react";
import logo from './logo.png'
import Image from 'next/image'
import {redirectToAction} from "../../../../domain/redirections-and-routing/redirections.operations.api";
import {ROUTES_FRONT} from "../../../../READONLY-shared-kernel/domain/routing/routing.config";
import {STYLES_POLICY} from "../../../../READONLY-shared-kernel/policies/styles.policy";

export const LogoAtom = (): ReactElement => {

  const onClickHomeCallback = useCallback(() => {
    void redirectToAction({
      routePath: ROUTES_FRONT.HOME
    })
  }, [])

  return <Image
    src={logo}
    alt={'logo'}
    height={Number.parseInt(STYLES_POLICY.appBarDimension) - 30}
    loading={'eager'}
    onClick={onClickHomeCallback}></Image>
}
