import {Box, Container, Stack} from '@mui/material'
import {ReactElement} from 'react'
import {BusyAppLoaderComposition} from './loaders/BusyAppLoader.composition';
import {ViewLoaderComposition} from './loaders/ViewLoader.composition';
import {StaticPagesFooterOrganism} from '../building-blocks/floating-partials/StaticPagesFooter.organism';
import {STYLES_POLICY} from '../styles/styles.policy';
import {GoBackAtom} from '../building-blocks/_wide-use-components/GoBack.atom';
import {PagePropsWrapper} from '../../pages/_app';


type Props = {
  children: ReactElement,
} & PagePropsWrapper

export const StaticPagesComposition = ({children}: Props): ReactElement => {

  return <Stack
    sx={{
      paddingBottom: STYLES_POLICY.appBarDimension
    }}>
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
          disableGutters={true}
          sx={{
            paddingTop: STYLES_POLICY.spacing[1],
            paddingBottom: STYLES_POLICY.spacing[1],
            minHeight: '100vh',
            position: 'relative'
          }}
        >

          <BusyAppLoaderComposition>
            <ViewLoaderComposition>

              <Box>

                <Stack sx={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
                }}>
                  <GoBackAtom/>
                </Stack>


                {children}

              </Box>


            </ViewLoaderComposition>
          </BusyAppLoaderComposition>


        </Container>

      </Stack>

    </Stack>

    <StaticPagesFooterOrganism/>

  </Stack>
}

