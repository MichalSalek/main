import Link from 'next/link'
import {HTMLAttributes, ReactNode, SyntheticEvent, useCallback, useEffect, useRef} from 'react'
import {ROUTES_FRONT_PATH} from '../../../READONLY-shared-kernel/domain/routing/routing.types'
import {Button, ButtonProps} from '@mui/material'
import {STORE_SEL_appLoaders_isViewLoading} from "../../../application/app-loaders/appLoaders.read";
import {useAppSelector} from "../../../application/store/store";
import scss from './atoms.module.scss'
import {STYLES_POLICY} from "../../../READONLY-shared-kernel/policies/styles.policy";
import {getAppIcon} from "../../../domain/app-icons/adapters/MuiIcons.adapter";


type Props = {
  children: ReactNode
  route?: ROUTES_FRONT_PATH
  passPropsToButton?: ButtonProps & HTMLAttributes<HTMLButtonElement>
  passPropsToLink?: HTMLAttributes<HTMLAnchorElement>
  omitButtonElement?: boolean
}


export const LinkAtom = (
  {
    children,
    route,
    passPropsToButton,
    passPropsToLink,
    omitButtonElement
  }: Props) => {

  const isViewLoading = useAppSelector(STORE_SEL_appLoaders_isViewLoading)
  const ElementRef = useRef<HTMLButtonElement>(null)

  const onClickCallback = useCallback(async (e: SyntheticEvent<HTMLButtonElement>) => {
    const target = e?.target as HTMLButtonElement | undefined
    target?.classList.add(scss.disabledAnchor)

    // @ts-ignore, bo nie da się otypować po ludzku tych jebanych eventów.
    passPropsToButton?.onClick && passPropsToButton.onClick(e)
  }, [passPropsToButton])

  useEffect(() => {
    if (!isViewLoading) {
      ElementRef.current?.classList.remove(scss.disabledAnchor)
    }
  }, [isViewLoading]);

  return <Link

    {...passPropsToLink}

    style={{
      pointerEvents: isViewLoading ? 'none' : undefined,

      textDecoration: 'none',
      padding: STYLES_POLICY.spacing[1],
      textAlign: 'right',

      ...passPropsToLink?.style
    }}

    className={[isViewLoading ? scss.disabledAnchor : undefined, passPropsToLink?.className].join(' ')}


    href={route
      ? route
      : {}}>

    {omitButtonElement ?
      children :

      <Button
        component={'span'}
        variant={'text'}
        {...passPropsToButton}
        // tabIndex is turned off to avoid a double focus state (doubled anchor wrapper).
        tabIndex={-1}
        className={[scss.buttonLink, passPropsToButton?.className].join(' ')}
        ref={ElementRef}
        onClick={onClickCallback}
      >{children} {getAppIcon.Go({color: 'inherit', fontSize: 'small'})}</Button>

    }


  </Link>
}
