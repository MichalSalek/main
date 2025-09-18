import {Typography} from '@mui/material'
import {PricingPlanWithRedirectMolecule} from '../UI/building-blocks/pricing-plan/PricingPlanWithRedirect.molecule'


export default function Index() {

  return (
    <>

      <Typography variant={'h1'}>
        Sprawdź i wybierz opcję dostępu
      </Typography>

      <br/> <br/> <br/> <br/>

      <PricingPlanWithRedirectMolecule/>


    </>)
}


export async function getStaticProps() {
  return {
    props: {}
  }
}
