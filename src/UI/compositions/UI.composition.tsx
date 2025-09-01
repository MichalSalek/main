import {ReactElement} from 'react'
import {useAppSelector} from "../../application/store/store";
import {STORE_SEL_user_currentUser} from "../../domain/user/user.read";
import {AppComposition} from "./App.composition";
import {StaticPagesComposition} from "./StaticPages.composition";


type Props = {
  children: ReactElement,
}

export const UIComposition = ({children}: Props): ReactElement => {

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  return <>

    {currentUser?.user_id ?


      <AppComposition>{children}</AppComposition>


      :


      <StaticPagesComposition>{children}</StaticPagesComposition>

    }

  </>
}
