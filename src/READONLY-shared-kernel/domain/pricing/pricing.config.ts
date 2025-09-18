import {PricingPlanTypes} from '../../policies/pricing.policy'
import {Account} from "../../models/db_models";
import {objectFlip, ValueOf} from "../../application/application.utils";


export const PricingPlanValue = Object.freeze({
  FREE: 10,
  MONTHLY_1: 1,
  MONTHLY_2: 2,
  MONTHLY_3: 3,
  ANNUAL_1: 4,
  ANNUAL_2: 5,
  ANNUAL_3: 6,
} as const)
export const PricingPlanValueFlipped = objectFlip(PricingPlanValue)
export type PricingPlan = ValueOf<typeof PricingPlanValue>


export const pricingPlanDataPLN: Record<PricingPlan, number> = Object.freeze({
  [PricingPlanValue.FREE]: 0,
  [PricingPlanValue.MONTHLY_1]: 30,
  [PricingPlanValue.MONTHLY_2]: 50,
  [PricingPlanValue.MONTHLY_3]: 100,
  [PricingPlanValue.ANNUAL_1]: 24,
  [PricingPlanValue.ANNUAL_2]: 40,
  [PricingPlanValue.ANNUAL_3]: 80
} as const)

export const pricingPlanValues = Array.from(Object.entries(pricingPlanDataPLN).keys())


export const bestsellersValues: Record<PricingPlanTypes, Account['pricing_plan']> = Object.freeze({
  monthly: PricingPlanValue.MONTHLY_2,
  annual: PricingPlanValue.ANNUAL_3
} as const)


export const defaultPricingPlanPeriod: PricingPlanTypes = 'annual' as const


export const annualDiscountPercentageNumber: number = 30 as const
