import {ReactElement} from 'react'
import {useAppSelector} from '../../application/store/store';
import {STORE_SEL_user_currentUser} from '../../domain/user/user.read';
import {AppComposition} from './App.composition';
import {StaticPagesComposition} from './StaticPages.composition';
import {AppBarOrganism} from '../building-blocks/floating-partials/AppBar.organism';
import {AppMenuOrganism} from '../building-blocks/floating-partials/app-menu/AppMenu.organism';


type Props = {
  children: ReactElement,
}

export const UIComposition = ({children}: Props): ReactElement => {

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  return <>

    <AppBarOrganism/>

    {currentUser?.user_id ?


      <AppComposition>{children}</AppComposition>


      :


      <StaticPagesComposition>{children}</StaticPagesComposition>

    }

    <AppMenuOrganism/>

  </>
}
