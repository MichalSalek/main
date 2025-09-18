import {ReactElement} from 'react'
import scss from './loaders.module.scss'
import {LinearProgress} from "@mui/material";
import {useAppSelector} from "../../../application/store/store";
import {STORE_SEL_appLoaders_isAppBusy} from "../../../application/app-loaders/appLoaders.read";

type Props = {
  children: ReactElement,
}


export const BusyAppLoaderComposition = ({children}: Props): ReactElement => {

  const isAppBusy = useAppSelector(STORE_SEL_appLoaders_isAppBusy)

  return <>

    <div
      style={{
        transition: 'opacity 150ms ease-in',
        pointerEvents: isAppBusy ? 'none' : 'all',
        opacity: isAppBusy ? '0.3' : '1'
      }}>

      {children}

    </div>


    <aside className={[scss.busyAppLoader, isAppBusy ? scss.busyAppLoaderVisible : undefined].join(' ')}>

      <LinearProgress color={'primary'}></LinearProgress>

    </aside>

  </>
}
