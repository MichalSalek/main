import {Container} from '@mui/material'
import {LogoAtom} from "../_wide-use-components/logo/Logo.atom";
import {STYLES_POLICY} from "../../../READONLY-shared-kernel/policies/styles.policy";


export const HeaderMolecule = () => {

  return <Container
    component={'header'}
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      padding: STYLES_POLICY.spacing[1],
      height: STYLES_POLICY.appBarDimension
    }}>

    <LogoAtom/>

  </Container>
}
