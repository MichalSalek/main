import {ChangeEvent, useCallback, useMemo, useState} from 'react'
import {DataPassedBetweenViewsConfig} from '../../../application/data-between-views/dataBetweenViews.config'
import {PRICING_POLICY, PricingPlanTypes} from '../../../READONLY-shared-kernel/policies/pricing.policy'
import {getFromClientStorage} from "../../../application/client-device-storage/clientStorage.possibilities.api";
import {defaultPricingPlanPeriod, PricingPlan} from "../../../READONLY-shared-kernel/domain/pricing/pricing.config";
import {useFireOnMountHook} from "@msalek/utils";


type Returns = {
  pricingType: PricingPlanTypes
  pricingValue: PricingPlan
  setPricingValue: (pricingValue: PricingPlan) => void
  setPricingType: (pricingType: PricingPlanTypes) => void
  handleFormValueChange: (event: ChangeEvent<HTMLInputElement>) => void
  pricingValueStorageState: PricingPlan | null
}

export const usePricingPlanData = (): Returns => {


  const pricingValueStorageState__NOT_VALIDATED = useMemo(() =>
      Number(getFromClientStorage({key: DataPassedBetweenViewsConfig.KEYS.PRICING_PLAN}))
    , [])


  const pricingValueStorageState: PricingPlan | null = PRICING_POLICY.utils.PRICING_PLAN_VALUE_TYPE_NARROWER(pricingValueStorageState__NOT_VALIDATED)
    ? pricingValueStorageState__NOT_VALIDATED as PricingPlan
    : null


  const [pricingType, setType] = useState<PricingPlanTypes>(PRICING_POLICY.utils.GET_PRICING_PLAN_TYPE_BY_VALUE(pricingValueStorageState))

  const [pricingValue, setValue] = useState<PricingPlan>(pricingValueStorageState
    ?? PRICING_POLICY.utils.GET_DEFAULT_PRICING_PLANS_VALUE(defaultPricingPlanPeriod))


  const setPricingValue = useCallback(
    (pricingValue: PricingPlan) => {
      setValue(pricingValue)
      setType(PRICING_POLICY.utils.GET_PRICING_PLAN_TYPE_BY_VALUE(pricingValue))
    },
    [])

  const setPricingType = useCallback(
    (pricingType: PricingPlanTypes) => {
      setType(pricingType)
      setValue(PRICING_POLICY.utils.GET_DEFAULT_PRICING_PLANS_VALUE(pricingType))
    },
    [])

  const handleFormValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = (
        event.target as HTMLInputElement).value
      const maybePricingPlanConvertedToNumber = Number(value)
      if (PRICING_POLICY.utils.PRICING_PLAN_VALUE_TYPE_NARROWER(maybePricingPlanConvertedToNumber)) {
        setPricingValue(maybePricingPlanConvertedToNumber as PricingPlan)
      }
    },
    [setPricingValue])


  useFireOnMountHook(() => {
    if (pricingValueStorageState) {
      setPricingValue(pricingValueStorageState)
    }
  })


  return {
    pricingType,
    pricingValue,
    setPricingValue,
    setPricingType,
    handleFormValueChange,
    pricingValueStorageState
  }
}
