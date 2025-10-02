import {ReactElement} from 'react'
import {useAppSelector} from '../../application/store/store';
import {STORE_SEL_user_currentUser} from '../../domain/user/user.read';
import {AppComposition} from './App.composition';
import {StaticPagesComposition} from './StaticPages.composition';
import {AppBarOrganism} from '../building-blocks/floating-partials/AppBar.organism';
import {AppMenuOrganism} from '../building-blocks/floating-partials/app-menu/AppMenu.organism';
import {useAppDynamicMenuContext} from '../../application/app-dynamic-menu/useAppDynamicMenuContext.hook';
import {AppDynamicMenuContext} from '../../application/app-dynamic-menu/appDynamicMenu.context';
import {PagePropsWrapper} from '../../pages/_app';


type Props = {
  children: ReactElement,
} & PagePropsWrapper

export const UIComposition = ({children, pageProps}: Props): ReactElement => {

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  const AppDynamicMenuContextValue = useAppDynamicMenuContext()


  return <>

    <AppBarOrganism/>

    <AppDynamicMenuContext.Provider value={AppDynamicMenuContextValue}>

      {currentUser?.user_id ?


        <AppComposition pageProps={pageProps}>{children}</AppComposition>

        :

        <StaticPagesComposition pageProps={pageProps}>{children}</StaticPagesComposition>

      }

      <AppMenuOrganism/>

    </AppDynamicMenuContext.Provider>

  </>
}
