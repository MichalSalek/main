import {ReactElement} from 'react'
import {STORE_SEL_appLoaders_isViewLoading} from '../../../application/app-loaders/appLoaders.read'
import {useAppSelector} from '../../../application/store/store'
import {Box} from "@mui/material";
import scss from './loaders.module.scss'

type Props = {
  children: ReactElement,
}


export const ViewLoaderComposition = ({children}: Props): ReactElement => {

  const isViewLoading = useAppSelector(STORE_SEL_appLoaders_isViewLoading)

  return <Box
    className={[isViewLoading ? scss.viewLoaderVisible : undefined, scss.viewLoaderAnimationConfig, scss.viewLoaderMain].join(' ')}
  >{children}</Box>
}
