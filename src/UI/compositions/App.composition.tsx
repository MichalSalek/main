import {ReactElement} from 'react'
import {Container, Stack} from '@mui/material';
import {BusyAppLoaderComposition} from './loaders/BusyAppLoader.composition';
import {ViewLoaderComposition} from './loaders/ViewLoader.composition';
import {STYLES_POLICY} from '../styles/styles.policy';
import {PagePropsWrapper} from '../../pages/_app';
import {GoBackTitleBarOrganism} from '../building-blocks/floating-partials/GoBackTitleBar.organism';


type Props = {
  children: ReactElement,
} & PagePropsWrapper

export const AppComposition = ({children, pageProps}: Props): ReactElement => {

  return <Stack>

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
          disableGutters
          sx={{
            paddingBottom: `calc(${STYLES_POLICY.appBarDimension} + ${STYLES_POLICY.spacing[4]})`,
            position: 'relative'
          }}
        >

          <BusyAppLoaderComposition>
            <ViewLoaderComposition>

              <GoBackTitleBarOrganism pageProps={pageProps}/>

              {children}


            </ViewLoaderComposition>
          </BusyAppLoaderComposition>

        </Container>

      </Stack>

    </Stack>

  </Stack>
}

