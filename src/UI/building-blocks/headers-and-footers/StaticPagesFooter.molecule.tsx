import {Box, Stack} from '@mui/material'
import {theme} from '../../styles/theme'
import {CopyrightAtom} from "../_wide-use-components/Copyright.atom";


export const StaticPagesFooterMolecule = () => {

  return <Stack component={'footer'}>

    <Box sx={{
      paddingTop: '3rem',
      paddingBottom: '0.3rem',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }}>

      <CopyrightAtom/>

    </Box>

  </Stack>
}
