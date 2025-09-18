import {ControllersComposition} from '@msalek/controllers'
import {ThemeProvider} from '@mui/material'
import {ReactElement} from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {initappLoadersController} from '../../application/app-loaders/appReady.controller'
import {initCheatsController} from '../../application/dev-mode/cheats.config'
import {initScrollPositionController} from '../../application/scroll-position/initScrollPosition.controller'
import {reduxStore, reduxStorePersistor} from '../../application/store/store'
import {HeadMolecule} from '../building-blocks/Head.molecule'
import {theme} from '../styles/theme'
import {BrickWallAppLoaderComposition} from './loaders/BrickWallAppLoader.composition'
import {UIComposition} from './UI.composition'
import {useUserMetadataController} from "../../domain/user/useUserMetadata.controller";
import {initRoutingInterceptor} from "../../domain/redirections-and-routing/routing.interceptor";
import {AppSnackbarsController} from "../../application/app-snackbar/sonner-adapter/AppSnackbars.controller";
import {useInitCurrentUserController} from "../../domain/user/user.controller";


type Props = {
  children: ReactElement
}

export const MainComposition = (
  {
    children
  }: Props): ReactElement => {
  return <>
    <HeadMolecule/>
    <Provider store={reduxStore}>
      <ControllersComposition

        autostartFunctions={[
          initScrollPositionController,
          initappLoadersController,
          initCheatsController,
          initRoutingInterceptor]}

        hookControllers={[
          useInitCurrentUserController,
          useUserMetadataController]}

        JSXControllers={[AppSnackbarsController]}

      />

      <PersistGate loading={null} persistor={reduxStorePersistor}>
        <ThemeProvider theme={theme}>


          <BrickWallAppLoaderComposition>

            <UIComposition>

              {children}

            </UIComposition>

          </BrickWallAppLoaderComposition>


        </ThemeProvider>
      </PersistGate>
    </Provider>
  </>
}
