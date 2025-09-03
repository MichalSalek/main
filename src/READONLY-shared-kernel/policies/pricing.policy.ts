import {
  annualDiscountPercentageNumber,
  bestsellersValues,
  defaultPricingPlanPeriod,
  PricingPlan,
  pricingPlanDataPLN
} from '../domain/pricing/pricing.config'


export type PricingPlanTypes = 'monthly' | 'annual'


export type PRICING_POLICY_TYPE = {

  utils: {
    GET_ANNUAL_DISCOUNT_PERCENTAGE: () => string
    PRICING_PLAN_VALUE_TYPE_NARROWER: (maybePricingPlanValue: number | null) => boolean
    GET_DEFAULT_PRICING_PLANS_VALUE: (pricingType: PricingPlanTypes) => PricingPlan
    GET_PRICING_PLAN_TYPE_BY_VALUE: (option: PricingPlan | null) => PricingPlanTypes
    GET_BESTSELLER_BY_PRICING_TYPE: (type: PricingPlanTypes) => PricingPlan
  }
}
export const PRICING_POLICY: PRICING_POLICY_TYPE = {

  utils: {

    GET_ANNUAL_DISCOUNT_PERCENTAGE: () => `-${annualDiscountPercentageNumber}%`,

    PRICING_PLAN_VALUE_TYPE_NARROWER: (maybePricingPlanValue): maybePricingPlanValue is PricingPlan => {
      if (!maybePricingPlanValue) {
        return false
      } else {
        return Boolean(pricingPlanDataPLN[maybePricingPlanValue as PricingPlan])
      }
    },

    GET_DEFAULT_PRICING_PLANS_VALUE: (pricingType) => {
      if (pricingType) {
        return bestsellersValues[pricingType]
      } else {
        return bestsellersValues[defaultPricingPlanPeriod]
      }
    },

    GET_PRICING_PLAN_TYPE_BY_VALUE: (option) => {
      if (!option) {
        return defaultPricingPlanPeriod
      }
      if ([
        1,
        2,
        3
      ].includes(option)) {
        return 'monthly'
      }
      if ([
        4,
        5,
        6
      ].includes(option)) {
        return 'annual'
      }
      return defaultPricingPlanPeriod
    },

    GET_BESTSELLER_BY_PRICING_TYPE: (pricingValue) => {
      return bestsellersValues[pricingValue]
    }

  }

} as const


