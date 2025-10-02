import {Box, Typography} from '@mui/material'
import {PricingPlanWithRedirectMolecule} from '../UI/building-blocks/pricing-plan/PricingPlanWithRedirect.molecule'
import {STYLES_POLICY} from '../UI/styles/styles.policy';


export default function Index() {

  return (
    <Box sx={{
      padding: STYLES_POLICY.spacing[3]
    }}>

      <Typography variant={'h1'}>
        Sprawdź i wybierz opcję dostępu
      </Typography>

      <br/> <br/> <br/> <br/>

      <PricingPlanWithRedirectMolecule/>


    </Box>)
}


export async function getStaticProps() {
  return {
    props: {}
  }
}
