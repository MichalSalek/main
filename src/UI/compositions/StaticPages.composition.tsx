import {Box, Container, Stack} from '@mui/material'
import {ReactElement} from 'react'
import {BusyAppLoaderComposition} from './loaders/BusyAppLoader.composition';
import {ViewLoaderComposition} from './loaders/ViewLoader.composition';
import {StaticPagesFooterMolecule} from '../building-blocks/headers-and-footers/StaticPagesFooter.molecule';
import {HeaderMolecule} from '../building-blocks/headers-and-footers/Header.molecule';
import {STYLES_POLICY} from '../../READONLY-shared-kernel/policies/styles.policy';
import {GoBackAtom} from '../building-blocks/_wide-use-components/GoBack.atom';


type Props = {
  children: ReactElement,
}

export const StaticPagesComposition = ({children}: Props): ReactElement => {

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
          sx={{
            paddingTop: STYLES_POLICY.spacing[1],
            paddingBottom: STYLES_POLICY.spacing[1],
            minHeight: '100vh',
            position: 'relative'
          }}
        >

          <HeaderMolecule/>

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

    <StaticPagesFooterMolecule/>

  </Stack>
}

