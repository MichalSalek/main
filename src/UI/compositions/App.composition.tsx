import {ReactElement} from 'react'
import {Container, Stack} from '@mui/material';
import {BusyAppLoaderComposition} from './loaders/BusyAppLoader.composition';
import {ViewLoaderComposition} from './loaders/ViewLoader.composition';
import {AppDynamicMenuContext} from '../../application/app-dynamic-menu/appDynamicMenu.context';
import {useAppDynamicMenuContext} from '../../application/app-dynamic-menu/useAppDynamicMenuContext.hook';
import {AppMenuOrganism} from '../building-blocks/floating-partials/app-menu/AppMenu.organism';
import {STYLES_POLICY} from '../../READONLY-shared-kernel/policies/styles.policy';
import {GoBackAtom} from '../building-blocks/_wide-use-components/GoBack.atom';


type Props = {
  children: ReactElement,
}

export const AppComposition = ({children}: Props): ReactElement => {

  const AppDynamicMenuContextValue = useAppDynamicMenuContext()


  return <Stack>

    <AppDynamicMenuContext.Provider value={AppDynamicMenuContextValue}>

      <Stack
        sx={{
          height: '100%'
        }}>

        <Stack
          component={'main'}
          sx={{
            flex: 1
          }}>

          <Container
            sx={{
              paddingTop: STYLES_POLICY.spacing[1],
              paddingBottom: STYLES_POLICY.spacing[1],
              position: 'relative'
            }}
          >

            <BusyAppLoaderComposition>
              <ViewLoaderComposition>

                <>

                  <Stack sx={{
                    position: 'sticky',
                    right: 0,
                    zIndex: 1,
                    top: `calc(${STYLES_POLICY.appBarDimension} + ${STYLES_POLICY.spacing[1]})`,
                    paddingBottom: STYLES_POLICY.spacing[2],
                    marginLeft: 'auto',
                    width: 'fit-content',
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                  }}>
                    <GoBackAtom/>
                  </Stack>


                  {children}


                </>

              </ViewLoaderComposition>
            </BusyAppLoaderComposition>

          </Container>

        </Stack>

      </Stack>

    </AppDynamicMenuContext.Provider>

  </Stack>
}

