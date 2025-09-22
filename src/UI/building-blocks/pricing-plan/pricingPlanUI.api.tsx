import {ReactElement} from 'react'
import {
  bestsellersValues,
  PricingPlan,
  pricingPlanDataPLN
} from '../../../READONLY-shared-kernel/domain/pricing/pricing.config';


export const getPricingPlanUI = (pricingValue: PricingPlan | null | undefined, showBestseller: boolean = true): ReactElement => {
  if (!pricingValue) {
    return <>Brak</>
  }
  const popular = () => {
    if (!showBestseller) {
      return <></>
    }
    const popularText = <strong>(popularny)</strong>
    if (pricingValue === bestsellersValues.monthly || pricingValue === bestsellersValues.annual) {
      return popularText
    }
  }

  return (
    <span>
    {pricingPlanDataPLN[pricingValue]} PLN {popular()} na miesiąc.
  </span>)
}

