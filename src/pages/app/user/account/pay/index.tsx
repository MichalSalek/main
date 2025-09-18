import {
  PricingPlanWithPaymentMolecule
} from '../../../../../UI/building-blocks/pricing-plan/PricingPlanWithPayment.molecule'


export default function Pay() {

  return <>

    <PricingPlanWithPaymentMolecule/>

  </>

}


export async function getStaticProps() {
  return {
    props: {}
  }
}

